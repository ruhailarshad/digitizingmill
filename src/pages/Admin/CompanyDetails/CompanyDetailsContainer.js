import { Form } from "antd";
import React, { useState } from "react";
import { openErrorNotification } from "../../../alerts/commonAlert";
import { companyColumns } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewCompanyForm from "../../../core/Forms/NewCompanyForm";
import HeadAndContent from "../../../core/HeadAndContent";
import { useDeleteCompany } from "../../../hooks/useDeleteCompany";
import { useGetAllCompany } from "../../../hooks/useGetAllCompany";
const tableData = [
  {
    company_id: 2,
    registration_date: 2,
    company_name: "sada",
    contact_no: 123123123,
    email_address: "asdad",
    sales_agent: "Alex Josep",
  },
];
const CompanyDetailsContainer = () => {
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
 console.log(data,"data")
  const { data: AllCompany ,isLoading:isAllCompanyLoading} = useGetAllCompany();
  const { mutate } = useDeleteCompany();

  console.log(AllCompany,"all")
  const edit = (record) => {
    console.log(record,"record")
    form.setFieldsValue({
      company_name: "",
      contact_no: "",
      email_address: "",
      sales_agent: "",
      ...record,
    });
    setEditingKey(record.companyId);
  };
  const isEditing = (record) => record.companyId === editingKey;

  const cancel = () => {
    setEditingKey("");
  };
  const viewHandler = (values) => {
    setEditModal(true);
    setData(values);
  };
  const save = async (companyId) => {
    try {
      // eslint-disable-next-line no-undef
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => companyId === item.companyId);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const deleteHandler=(id)=>{
    mutate(id)
  }
  const columns = companyColumns(isEditing, save, cancel, edit, viewHandler,deleteHandler);
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "sales_agent" ? "select" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
 
  return (
    <>
      <HeadAndContent
        heading="Comapny Details"
        btn={{ name: "Add New Company", buttonHandler: () => setVisible(true) }}
      >
        <CustomTable column={mergedColumns}
          loading={isAllCompanyLoading}
          data={AllCompany?.companies} />
      </HeadAndContent>
      {editModal && (
        <NewCompanyForm
          id={data.companyId }
          visible={editModal}
          onCancel={() => setEditModal(false)}
        />
      )}
      {visible && (
        <NewCompanyForm
          visible={visible}
          onCancel={() => setVisible(false)}
        />
      )}
    </>
  );
};

export default CompanyDetailsContainer;
