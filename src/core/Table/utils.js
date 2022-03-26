import React from "react";
import {
  Form,
  Input,
  Select,
  Radio,
} from "antd";
// import moment from "moment";

const constant = [
  {
    name: "allowanceType",
    data: [
      { name: "Benefit", value: 1 },
      { name: "Deduction", value: 2 },
    ],
  },

  {
    name: "allowanceUnit",
    data: [
      { name: "Percent", value: 1 },
      { name: "Amount", value: 2 },
    ],
  },

  {
    name: "isTaxable",
    data: [
      { name: "Taxable", value: false },
      { name: "Non-Taxable", value: true },
    ],
  },
];

const FormItem = Form.Item;
const Option = Select.Option;

const EditableCell = (props) => {
  const getInput = (record, dataIndex, title) => {
      console.log(record)
    switch (props.inputType) {
    
    //   case "numberValue":
    //     return (
    //       <FormItem
    //         name={dataIndex}
    //         style={{ margin: 0 }}
    //         rules={[
    //           {
    //             required: true,
    //             message: `Please Input ${title}!`,
    //           },
    //         ]}
    //         initialValue={record[dataIndex]}
    //       >
    //         <InputNumber
    //           min={0}
    //           max={2147483647}
    //           formatter={(value) => value}
    //           parser={(value) => value}
    //         />
    //       </FormItem>
    //     );
      //   case "date":
      //     return (
      //       <FormItem style={{ margin: 0 }}>
      //         {getFieldDecorator(dataIndex, {
      //           initialValue: moment(record[dataIndex], dateFormat)
      //         })(<DatePicker format={dateFormat} />)}
      //       </FormItem>
      //     );
      //   case "time":
      //     return (
      //       <FormItem style={{ margin: 0 }}>
      //         {getFieldDecorator(dataIndex, {
      //           initialValue: moment(record[dataIndex], timeFormat)
      //         })(<TimePicker format={timeFormat} />)}
      //       </FormItem>
      //     );
    //   case "checkbox":
    //     return (
    //       <FormItem
    //         name={dataIndex}
    //         style={{ margin: 0 }}
    //         valuePropName="checked"
    //       >
    //         <Checkbox />
    //       </FormItem>
    //     );

    //   case "radio":
    //     return (
    //       <FormItem name={dataIndex} style={{ margin: 0 }}>
    //         <RadioGroup>
    //           <Radio value={"a"}>a</Radio>
    //           <Radio value={"b"}>b</Radio>
    //         </RadioGroup>
    //       </FormItem>
    //     );
    case "select": 
    return (
      <FormItem name={dataIndex} style={{ margin: 0 }} initialValue={record[dataIndex]}>
        <Select style={{ width: 150 }} >
          {constant[0].data.map((p, index) => (
            <Option value={p.id} key={index}>
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
  const { editing, dataIndex, title, inputType, record, index, ...restProps } =
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
    case "sales_agent":
      return "select";
    default:
      return "text";
  }
};
