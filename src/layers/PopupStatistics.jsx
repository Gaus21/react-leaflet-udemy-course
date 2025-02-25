import { Button, DatePicker, Card, InputNumber, Space, Select } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { fetchMun, removeMun } from "../features/mun/munSlice";

import { useState } from "react";
//import { deleteAllMun } from "../features/mun/munSlice";

const { Option } = Select;

export const PopupStatistics = ({ feature }) => {
  const [selectValue, setSelectValue] = useState("0"); // State for Select value

  const dispatch = useDispatch();
  const { id, name, country } = feature.properties;

  const handleSelectChange = (value) => {
    setSelectValue(value); // Update state with new value
    //dispatch(fetchMun({ id, selectValue })); // Dispatch with the new value
  };

  return (
    <>
      <Card type="inner">
        id: <b>{`${id}`}</b>
      </Card>
      <Card type="inner">
        name: <b>{`${name}, ${country}`}</b>
      </Card>
      <Card type="inner">
        <Space size="small">
          <Select
            style={{ width: 180 }}
            value={selectValue} // Controlled value
            onChange={handleSelectChange} // Update state on change
          >
            <Option value="0">Nothing</Option>
            <Option value="1">TS Watch</Option>
            <Option value="2">TS Warning</Option>
            <Option value="3">H Watch</Option>
            <Option value="4">H Warning</Option>


          </Select>
          <Button
            type="primary"
            shape="round"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              dispatch(fetchMun({ id, selectValue }));
            }}
          >
          </Button>


        </Space>
      </Card>
    </>
  );
};