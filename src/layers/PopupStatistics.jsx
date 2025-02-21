import { Button, DatePicker, Card, InputNumber, Space } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";


export const PopupStatistics = ({ feature }) => {
  const { id, name, country } = feature.properties;
  return (
    <>
      <Card type="inner"  >
        id:  <b>{`${id}`}</b>
      </Card>
      <Card type="inner" >
        name:   <b>{`${name}, ${country}`}</b>
      </Card>
      <Card type="inner" >
        <Space size="small">
          <Button
            type="primary"
            shape="round"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              alert("Adding municipality to filter");
            }}
          >
          </Button>

          <Button
            type="primary"
            shape="round"
            icon={<MinusCircleOutlined />}
            onClick={() => {
              alert("Removing municipality from filter");
            }}
          >

          </Button>
        </Space>
      </Card>
    </>
  );
};
