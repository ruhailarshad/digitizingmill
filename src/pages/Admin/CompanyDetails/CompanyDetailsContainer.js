import { Form, message } from "antd";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { companyColumns } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewCompanyForm from "../../../core/Forms/NewCompanyForm";
import HeadAndContent from "../../../core/HeadAndContent";
import { useBulkDeleteCompany } from "../../../hooks/useDeleteBulkCompany";
import { useDeleteCompany } from "../../../hooks/useDeleteCompany";
import { useGetAllCompany } from "../../../hooks/useGetAllCompany";
import { useUpdateCompanySalesAgent } from "../../../hooks/User/useUpdateCompanySalesAgent";
import DropdownActions from "./DropdownActions";

const CompanyDetailsContainer = () => {
  const queryClient = useQueryClient();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [form] = Form.useForm();
  const { data: AllCompany, isLoading: isAllCompanyLoading } =
    useGetAllCompany();
  const { mutate: deleteCompany } = useDeleteCompany();
  const {mutate:deleteBulkCompany}=useBulkDeleteCompany()
  const onSalesAgentUpdate = () => {
    message.success("SalesAgent Updated Successfully");
    queryClient.invalidateQueries("company-add-query");
    setEditingKey("");
  };

  const { mutate: updateSalesAgent } =
    useUpdateCompanySalesAgent(onSalesAgentUpdate);

  const edit = (record) => {
    form.setFieldsValue({
      salesAgent: "",
      ...record,
    });
    setEditingKey(record.companyId);
  };
  const isEditing = (record) => record.companyId === editingKey;

  const cancel = () => {
    setEditingKey("");
  };
  const viewHandler = (values) => {
    setData(values);
    setEditModal(true);
  };
  const save = (record) => {
    const row = form.getFieldValue();
    updateSalesAgent({
      companyId: record.companyId,
      salesAgentId: row.salesAgent,
    });
  };
  const deleteHandler = (id) => {
    deleteCompany(id);
  };

  const columns = companyColumns(
    isEditing,
    save,
    cancel,
    edit,
    viewHandler,
    deleteHandler
  );
  const bulkDeleteHandler = () => {
    const newData = [...selectedRow];
    const ids = newData.map((item) => {
      return item.companyId;
    });
    deleteBulkCompany({data:ids})
    setShowActions(false)
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "salesAgent" ? "select" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const rowHandler = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectedRows.length >= 1 ? setShowActions(true) : setShowActions(false);
      setSelectedRow(selectedRows)
    },
  };
  return (
    <>
      <HeadAndContent
        heading="Comapny Details"
        btn={{ name: "Add New Company", buttonHandler: () => setVisible(true) }}
      >
        <CustomTable
          column={mergedColumns}
          loading={isAllCompanyLoading}
          data={AllCompany?.companies}
          selection
          form={form}
          rowHandler={rowHandler}
          DropdownActions={
            showActions && <DropdownActions deleteHandler={bulkDeleteHandler} />
          }
        />
      </HeadAndContent>
      {editModal && (
        <NewCompanyForm
          editable={true}
          data={data}
          visible={editModal}
          onCancel={() => setEditModal(false)}
        />
      )}
      {visible && (
        <NewCompanyForm visible={visible} onCancel={() => setVisible(false)} />
      )}
    </>
  );
};

export default CompanyDetailsContainer;
