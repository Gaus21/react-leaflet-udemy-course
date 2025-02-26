import React from 'react';
import { useMap } from 'react-leaflet';
import { Button, Select } from 'antd';
import { BorderInnerOutlined, BorderOuterOutlined, DeleteOutlined } from '@ant-design/icons';
import Control from 'react-leaflet-custom-control';
import { removeAllMun } from '../features/mun/munSlice';
import { useDispatch } from 'react-redux';

const FitBoundsButton = () => {
  const dispatch = useDispatch();
  // Obtener el objeto del mapa usando el hook `useMap` de `react-leaflet`
  const map = useMap();
  //Zoom  a una zona específica, puede aplicar a ciclones. 
  const doFitDataToBounds = () => {
    const latLngs = [];
    map.eachLayer((layer) => {
      const latLng = layer.options.doFitToBounds && layer.getLatLng();
      if (latLng) {
        latLngs.push(latLng)
      }
    })

    if (latLngs.length > 0) {
      map.fitBounds(latLngs);

    } else {
      console.log('No se encontraron capas con la opción `doFitToBounds`.');
    }
  }

  const deleteMunicipalities = () => {
    dispatch(removeAllMun());
  }

  return (
    <>
      <Control
        position='topleft'
      >
      </Control>
      <Control
        position='topleft'>
        <Button
          style={{ height: '33px', width: '33px' }}
          title='Fit bounds to layer'
          icon={<BorderInnerOutlined />}
          onClick={() => doFitDataToBounds()}
        />
      </Control>

      <Control
        position='topleft'>
        <Button
          style={{ height: '33px', width: '33px' }}
          title='Fit bounds to layer'
          icon={<DeleteOutlined />}
          onClick={() => deleteMunicipalities()}
        />
      </Control>
     
    </>


  );
};

export default FitBoundsButton;
