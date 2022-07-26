import { useQuery } from "react-query";
import instance from "../../services/AxiosConfig";
import qs from "qs";
import moment from "moment";

const fetchAllCompany = ({ limit, page, search, role, id, dateParam }) => {
  const checkRole = id && role ? `/by-${role}/${id}` : "";
  const checkId = id && !role ? `/by-userId/${id}` : "";
  console.log(checkId,checkRole,'AllCompany')
  const startEndDate =
    !dateParam?.length < 1
      ? `&companyStartDate=${moment(dateParam[0]?._d).format(
          "YYYY-MM-DD"
        )}&companyEndDate=${moment(dateParam[1]?._d).format("YYYY-MM-DD")}`
      : `&companyStartDate=${moment()
          .subtract(30, "days")
          .format("YYYY-MM-DD")}&companyEndDate=${moment().format(
          "YYYY-MM-DD"
        )}`;
  const queryString =
    limit && page ? qs.stringify({ limit, page, search }) : "";
  return instance.get(
    `/api/company${checkId}${checkRole}?${queryString}${startEndDate}`
  );
};

export const useGetAllCompany = ({
  limit,
  page,
  search,
  role = "",
  id = "",
  dateParam,
  skip = true,
} = {}) => {
  return useQuery(
    ["company-add-query", role, id, search, dateParam, limit],
    () =>
      fetchAllCompany({
        limit,
        page,
        search,
        id,
        role,
        dateParam,
      }),
    {
      select: (data) => {
        const newData = data?.companies.map((item) => {
          return {
            ...item,
            salesAgent: item?.user?.name,
            key: item?.companyId,
          };
        });
        return { companies: newData, count: data?.count };
      },
      enabled: skip,
    }
  );
};
