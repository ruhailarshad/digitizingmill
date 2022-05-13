import { Form, message } from "antd";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { companyColumns } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewCompanyForm from "../../../core/Forms/NewCompanyForm";
import HeadAndContent from "../../../core/HeadAndContent";
import {
  useBulkDeleteCompany,
  useBulkUpdateSalesAgent,
  useDeleteCompany,
  useGetAllCompany,
  useUpdateCompanySalesAgent,
} from "../../../hooks";
import DropdownActions from "./DropdownActions";

const CompanyDetailsContainer = () => {
  const queryClient = useQueryClient();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showActions, setShowActions] = useState(false);  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); 
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);

  const { data: AllCompany, isLoading: isAllCompanyLoading } =
    useGetAllCompany({
      page,
      limit: 10,
      search: ''
    });
  const { mutate: deleteCompany } = useDeleteCompany();
  const { mutate: deleteBulkCompany } = useBulkDeleteCompany();
  const onSalesAgentUpdate = () => {
    message.success("SalesAgent Updated Successfully");
    queryClient.invalidateQueries("company-add-query");
    setEditingKey("");
  };

  const { mutate: updateSalesAgent } =
    useUpdateCompanySalesAgent(onSalesAgentUpdate);
  const onBulkSalesAgentUpdate = () => {
    message.success("SalesAgent Updated Successfully");
    queryClient.invalidateQueries("company-add-query");
    setShowActions(false);
  };
  const { mutate: updateBulkSalesAgent } = useBulkUpdateSalesAgent(
    onBulkSalesAgentUpdate
  );

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
    const newData = [...selectedRowKeys];
    const ids = newData.map((item) => {
      return item;
    });
    deleteBulkCompany({ data: ids });
    setShowActions(false);
    setSelectedRowKeys([])
  };
  const bulkSalesAgentUpdate = (salesAgent) => {
    console.log(salesAgent)
    if (salesAgent) {
      const newData = selectedRowKeys.map((item) => {
        return { companyId: item,salesAgentId:salesAgent };
      });
      updateBulkSalesAgent(newData)
      setSelectedRowKeys([])
    }
    
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
    setSelectedRowKeys(selectedRowKeys)

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
          editable
          form={form}
          rowHandler={rowHandler}
          selectedRowKeys={selectedRowKeys}
          totalRecords={AllCompany?.count}
          DropdownActions={
            showActions && (
              <DropdownActions
                deleteHandler={bulkDeleteHandler}
                updateHandler={bulkSalesAgentUpdate}
              />
            )
          }
          page={page}
          onPageChange={(page)=> {
            setPage(page);
          }}
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
