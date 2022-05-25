import { Form } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {  companyColumnsForUserDetails } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewCompanyForm from "../../../core/Forms/NewCompanyForm";
import HeadAndContent from "../../../core/HeadAndContent";
import {
  useGetAllCompany,
} from "../../../hooks";

const CompanyDetailsContainer = () => {
  const{tokenData}=useOutletContext()
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const { data: AllCompany, isLoading: isAllCompanyLoading } =
  useGetAllCompany({role:"sales-agent",id:tokenData.userId});
 
  const viewHandler = (values) => {
    setData(values);
    setEditModal(true);
  };
 

  const columns = companyColumnsForUserDetails(
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
        />
      </HeadAndContent>
      {editModal && (
        <NewCompanyForm
          editable={true}
          data={data}
          visible={editModal}
          onCancel={() => setEditModal(false)}
         role='sales-agent'

        />
      )}
      {visible && (
        <NewCompanyForm visible={visible} onCancel={() => setVisible(false)} />
      )}
    </>
  );
};

export default CompanyDetailsContainer;
