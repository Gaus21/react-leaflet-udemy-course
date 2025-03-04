import React from 'react';
import { useMap } from 'react-leaflet';
import { Button, Select } from 'antd';
import { BorderInnerOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Control from 'react-leaflet-custom-control';
import { removeAllMun, fetchMun } from '../features/mun/munSlice';
import  useSpatialJoin  from '../tools/useSpatialJoin';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const FitBoundsButton = () => {
  const dispatch = useDispatch();
  const map = useMap();

  const breakpoints = useSelector((state) => state.breakpoints);
  const wwLinData = useSelector((state) => state.wwLin);
  //const stormId = useSelector((state) => state.wwLineQuery.stormid);
  //const advisNum = useSelector((state) => state.wwLineQuery.advisnum);


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

  const joinedPoints = useSpatialJoin(breakpoints, wwLinData)
  
  const addMunicipalities = () => {
    if (joinedPoints === null || joinedPoints.features.length === 0) {
      return;
    }

    joinedPoints.features.forEach((feature) => {

      dispatch(fetchMun({ id: feature.pid, selectValue: feature.tcww_i }));
    });
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
          icon={<PlusCircleOutlined />}
          onClick={() => addMunicipalities()}
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
