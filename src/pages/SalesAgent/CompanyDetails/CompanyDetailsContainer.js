import { Form } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { excelCompanyHeader } from "../../../constants/execelHeader";
import { companyColumnsForUserDetails } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewCompanyForm from "../../../core/Forms/NewCompanyForm";
import HeadAndContent from "../../../core/HeadAndContent";
import { useGetAllCompany } from "../../../hooks";
import moment from "moment";

const CompanyDetailsContainer = () => {
  const { tokenData } = useOutletContext();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [companyPageLimit, setCompanyPageLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [dateParam, setDateParam] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRow] = useState([]);
  const [showActions, setShowActions] = useState(false);

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
          selection
          selectedRowKeys={selectedRowKeys}
          exportData={{ header: excelCompanyHeader, data: selectedRows }}
          filename="SalesAgentCompanyStats"
          showActions={showActions}
          rowHandler={rowHandler}

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
