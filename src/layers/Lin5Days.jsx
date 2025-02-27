import { useState, useEffect } from "react";
import { LayersControl, GeoJSON, LayerGroup } from "react-leaflet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { advisnum, selectedStormId } from "../features/wwLin/wwLineQuerySlice";
import { fetchLinForecast } from "../features/tcForecast/tcLinForecastSlice";


const Lin5Days = () => {
    const dispatch = useDispatch();
    const lin5Days = useSelector((state) => state.tcLinForecast);
    const [update, setUpdate] = useState(false);
    const advisory = useSelector(advisnum);
    const stormId = useSelector(selectedStormId);
    useEffect(() => {
        dispatch(fetchLinForecast({ id: stormId, advis: advisory }))
    }, [advisory, stormId]);

    useEffect(() => {
        setUpdate((prev) => !prev);
    }, [lin5Days]);

    if (lin5Days.status === 'loading') {
        return null;
    }

    const layer = (
        <GeoJSON
            key="geo-json-layer"
            data={lin5Days.linForecast}
            style={(feature) => {
                return {
                    color: '#e28743',
                    weight: 1,
                    fillOpacity: 0.2,
                };
            }}
        ></GeoJSON>
    );

    return (
        <LayersControl.Overlay checked name="Forecast Track">
            <LayerGroup key={update}>{layer}
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

export default Lin5Days