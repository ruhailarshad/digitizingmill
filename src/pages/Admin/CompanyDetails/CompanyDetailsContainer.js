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
import moment from "moment";
import { excelCompanyHeader } from "../../../constants/execelHeader";

const CompanyDetailsContainer = () => {
  const queryClient = useQueryClient();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRow] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [dateParam, setDateParam] = useState([]);
  const [companyPageLimit, setCompanyPageLimit] = useState(10);

  const [form] = Form.useForm();
  const [page, setPage] = useState(1);

  const { data: AllCompany, isLoading: isAllCompanyLoading } = useGetAllCompany(
    {
      page,
      limit: companyPageLimit,
      search: searchParam,
      dateParam
    }
  );
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
      ...record,
    });
    setSalesAgent(record.salesAgent);
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
    salesAgent !== row.salesAgent
      ? updateSalesAgent({
          companyId: record.companyId,
          salesAgentId: row.salesAgent,
        })
      : setEditingKey("");
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
    setSelectedRowKeys([]);
  };
  const bulkSalesAgentUpdate = (salesAgent) => {
    if (salesAgent) {
      const newData = selectedRowKeys.map((item) => {
        return { companyId: item, salesAgentId: salesAgent };
      });
      updateBulkSalesAgent(newData);
      setSelectedRowKeys([]);
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
      setSelectedRowKeys(selectedRowKeys);
      const filter=[...selectedRows].map((item) => {
        return {
          companyId: item.companyId,
          registrationDate:moment(item.createdAt).format("MMMM Do YYYY,h:mm:ss"),
          companyName: item.companyName,
          contactNo: item.phone,
          email: item.emailAddress,
          salesAgent: item.salesAgent,
          design_sizes:item.design_sizes.map((item) => item.size).join(", "),

        };
      });
      setSelectedRow(filter);
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
          filterHandler={(value) => {
            setSearchParam(value);
            setPage(1);
          }}
          dateChangeHandler={(value) => {
            setDateParam(value);
            setPage(1);
          }}
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
          onPageChange={(page) => {
            setPage(page);
          }}
          exportData={{ header: excelCompanyHeader, data: selectedRows }}
          filename="AdminCompanyStats"
          showActions={showActions}
          pageLimit={companyPageLimit}
          setPageLimit={setCompanyPageLimit}
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
