import { Form } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { companyColumnsForUserDetails } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewCompanyForm from "../../../core/Forms/NewCompanyForm";
import HeadAndContent from "../../../core/HeadAndContent";
import { useGetAllCompany } from "../../../hooks";

const CompanyDetailsContainer = () => {
  const { tokenData } = useOutletContext();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [companyPageLimit, setCompanyPageLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [dateParam, setDateParam] = useState([]);

  const [form] = Form.useForm();
  const { data: AllCompany, isLoading: isAllCompanyLoading } = useGetAllCompany(
    {
      role: "sales-agent",
      id: tokenData.userId,
      page,
      limit: companyPageLimit,
      search: searchParam,
      dateParam,
    }
  );

  const viewHandler = (values) => {
    setData(values);
    setEditModal(true);
  };

  const columns = companyColumnsForUserDetails(viewHandler);

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
          pageLimit={companyPageLimit}
          setPageLimit={setCompanyPageLimit}
          filterHandler={(value) => {
            setSearchParam(value);
            setPage(1);
          }}
          dateChangeHandler={(value) => {
            setDateParam(value);
            setPage(1);
          }}
          page={page}
          onPageChange={(page) => {
            setPage(page);
          }}
          totalRecords={AllCompany?.count}

        />
      </HeadAndContent>
      {editModal && (
        <NewCompanyForm
          editable={true}
          data={data}
          visible={editModal}
          onCancel={() => setEditModal(false)}
          role="sales-agent"
        />
      )}
      {visible && (
        <NewCompanyForm visible={visible} onCancel={() => setVisible(false)} />
      )}
    </>
  );
};

export default CompanyDetailsContainer;
