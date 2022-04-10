import { Form } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {  companyColumnsForSalesAgent } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewCompanyForm from "../../../core/Forms/NewCompanyForm";
import HeadAndContent from "../../../core/HeadAndContent";
import {
  useGetCompanyByRole,
} from "../../../hooks";

const CompanyDetailsContainer = () => {
  const{tokenData}=useOutletContext()
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const { data: AllCompany, isLoading: isAllCompanyLoading } =
  useGetCompanyByRole({role:"sales-agent",id:tokenData.userId});
 
  const viewHandler = (values) => {
    setData(values);
    setEditModal(true);
  };
 

  const columns = companyColumnsForSalesAgent(
    viewHandler,
  );
 

  return (
    <>
      <HeadAndContent
        heading="Comapny Details"
        btn={{ name: "Add New Company", buttonHandler: () => setVisible(true) }}
      >
        <CustomTable
          column={columns}
          loading={isAllCompanyLoading}
          data={AllCompany?.companies}
          form={form}
          selectedRowKeys={selectedRowKeys}
         
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
