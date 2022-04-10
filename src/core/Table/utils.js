import React from "react";
import {
  Form,
  Input,
  Select,
  Radio,
} from "antd";
import { useGetUserByRole } from "../../hooks";
// import moment from "moment";



const FormItem = Form.Item;
const Option = Select.Option;

const EditableCell = (props) => {
  const { isLoading: isUserLoading, data: salesAgentData } = useGetUserByRole({
    role: "sales-agent",
  });
  const getInput = (record, dataIndex, title) => {
    switch (props.inputType) {
    case "select": 
    return (
      <FormItem name={dataIndex} style={{ margin: 0 }} initialValue={record[dataIndex]}>
        <Select loading={isUserLoading}  >
          {salesAgentData?.map((p) => (
            <Option value={p.userId} key={p.userId}>
              {p.name}
            </Option>
          ))}
        </Select>
      </FormItem>
    );

      default:
        return (
          <FormItem
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
            initialValue={record[dataIndex]}
          >
            <Input />
          </FormItem>
        );
    }
  };
  const { editing, dataIndex, title, inputType, record, index,...restProps } =
    props;

  return (
    <td {...restProps}>
      {editing
        ? 
          getInput(record, dataIndex, title)
        : restProps.children}
    </td>
  );
};

export default EditableCell;

export const checkInput = (index) => {
  switch (index) {
    case "salesAgent":
      return "text";
    default:
      return "text";
  }
};
