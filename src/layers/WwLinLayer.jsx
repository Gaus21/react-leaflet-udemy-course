import { useEffect, useState, useMemo, memo } from 'react'
import { GeoJSON, LayersControl, LayerGroup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import useSpatialJoin from '../tools/useSpatialJoin'
import { fetchMun } from '../features/mun/munSlice';
import { removeAllMun } from '../features/mun/munSlice';

import { booleanPointOnLine } from '@turf/boolean-point-on-line';
import { featureCollection } from '@turf/helpers';


const WwLinLayer = () => {
    //const dispatch = useDispatch();
    const wwLinData = useSelector((state) => state.wwLin);
    const [update, setUpdate] = useState(false);
    
    //const breakpoints = useSelector((state) => state.breakpoints);
    //const stormId = useSelector((state) => state.wwLineQuery.stormid);
    //const advisNum = useSelector((state) => state.wwLineQuery.advisnum);

    useEffect(() => {
        setUpdate((prev) => !prev);
    }, [wwLinData]);

    const color = (status) => {
        if (status === 'TWA') {
            return 'purple';
        } else if (status === 'TWR') {
            return 'yellow';
        } else if (status === 'HWA') {
            return 'pink';
        } else if (status === 'HWR') {
            return 'red';
        } else {
            return 'green';
        }
    };

/*
    const joinedPoints = useSpatialJoin(breakpoints, wwLinData)
    useEffect(() => {
        if (joinedPoints === null || joinedPoints.features.length === 0) {
            return;
        }

        /*
        const updatedFeatures = joinedPoints.features.map(feature => ({

            id: feature.pid,
            selectValue: feature.tcww_i,

        }));

        dispatch(fetchMun({ updatedFeatures }));
        console.log(joinedPoints);

        dispatch(removeAllMun());
        joinedPoints.features.forEach((feature) => {

            dispatch(fetchMun({ id: feature.pid, selectValue: feature.tcww_i }));
        });

    }, [joinedPoints, stormId]);*/

    if (wwLinData.status === 'loading') {
        return null;
    }

    const layer = (
        <GeoJSON
            key="geo-json-layer"
            data={wwLinData}
            style={(feature) => {
                return {
                    color: color(feature.properties.tcww),                 
                    weight: 4,
                    fillOpacity: 0.2,
                };
            }}
        ></GeoJSON>
    );

    return (
        <LayersControl.Overlay name="WW Lines" checked>
            <LayerGroup key={update}>{layer}</LayerGroup>
        </LayersControl.Overlay>
    )
}

export default WwLinLayer