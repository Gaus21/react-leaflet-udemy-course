import { useState, useEffect } from "react";
import { LayersControl, GeoJSON, LayerGroup } from "react-leaflet";
import { useSelector } from "react-redux";
import { fetchConePolygon } from '../features/tcForecast/conePolygonSlice'
import { useDispatch } from "react-redux";
import { advisnum, selectedStormId } from "../features/wwLin/wwLineQuerySlice";


const Pol5Days = () => {
    const dispatch = useDispatch();
    const conePolygon = useSelector((state) => state.conePolygon);
    const [update, setUpdate] = useState(false);
    const advisory = useSelector(advisnum);
    const stormId = useSelector(selectedStormId);

    useEffect(() => {
        dispatch(fetchConePolygon({ id: stormId, advis: advisory }))
    }, [advisory, stormId]);

    useEffect(() => {
        setUpdate((prev) => !prev);
    }, [conePolygon]);

    if (conePolygon.status === 'loading') {
        return null;
    }

    const layer = (
        <GeoJSON
            key="geo-json-layer"
            data={conePolygon.conePolygon}
            style={(feature) => {
                return {
                    color: 'white',
                    weight: 0.7,
                    fillOpacity: 0.2,
                };
            }}
        ></GeoJSON>
    );

    return (
        <LayersControl.Overlay checked name="Uncertainty cone">
            <LayerGroup key={update}>{layer}
            </LayerGroup>

        </LayersControl.Overlay>

    )
}

export default Pol5Days