import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from 'antd';
import { BorderOuterOutlined } from '@ant-design/icons';
import { createControlComponent } from '@react-leaflet/core';
import { Control, DomUtil } from 'leaflet';

const node = DomUtil.create("div");
const root = ReactDOM.createRoot(node);

Control.FitBoundsToDataControl = Control.extend({
    options: {
        position: "topleft"
    },
    onAdd: function (map) {
        const renderButton = () => {
            root.render(
                <Button
                    title='Fit bounds to world'
                    icon={<BorderOuterOutlined />}
                    onClick={() => map.fitWorld()}
                />
            );
        };

        renderButton();

        return node;
    },
    onRemove: function (map) {
        //console.log('removed from map', map);
    }
});

export const FitBoundsToDataControl = createControlComponent(
    (props) => new Control.FitBoundsToDataControl(props)
);
