import { useEffect, useState } from 'react'
import { GeoJSON, LayersControl, LayerGroup } from 'react-leaflet';
import { useSelector, } from 'react-redux';

const WwLinLayer = () => {

    const wwLinData = useSelector((state) => state.wwLin);
    const [update, setUpdate] = useState(false);

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