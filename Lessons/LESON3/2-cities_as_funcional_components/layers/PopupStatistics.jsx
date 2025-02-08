import { Button, DatePicker, Card, InputNumber, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";

const DEFAULT_RADIUS = 3000;

export const PopupStatistics = ({ feature, setRadiusFilter }) => {
  const [radius, setRadius] = useState(DEFAULT_RADIUS);

  const { name, adm0name, pop_max } = feature.properties;

  return (
    <>
      <Card type="inner" title="Name" style={{ marginTop: 16 }}>
        <b>{`${name}, ${adm0name}`}</b>
      </Card>
      <Card type="inner" title="Population" style={{ marginTop: 16 }}>
        <b>{`${pop_max}`}</b>
      </Card>
      <Card type="inner" title="Radius Filter" style={{ marginTop: 16 }}>
        <Space size="small">
          <InputNumber
            defaultValue={DEFAULT_RADIUS}
            min={0}
            onChange={(e) => setRadius(e)}
          ></InputNumber>
          <Button
            type="primary"
            shape="round"
            icon={<FilterOutlined />}
            onClick={() =>
              setRadiusFilter((prevState) => {
                // Mantener el estado anterior por defecto
                let newFilter = prevState;

                if (radius === 0) {
                  return prevState;
                } else {
                  const sameFeature = prevState?.feature === feature;
                  const sameRadius = prevState?.radius === radius;

                  // Si la feature o el radius no coinciden, actualizas el filtro
                  if (!sameFeature || !sameRadius) {
                    newFilter = { feature, radius };
                  }
                }

                return newFilter;
              })
            }
          >
            Filter by km
          </Button>
        </Space>
      </Card>

      <Card type="inner" title="Fecha">
        <Space size="small">
          <DatePicker />
        </Space>
      </Card>
    </>
  );
};
