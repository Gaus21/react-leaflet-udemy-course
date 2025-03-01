import { List } from "antd";

const ShowActiveFiltersControl = ({ getFilters }) => {
    const { geoFilter, radiusFilter } = getFilters();

    const getDisplayFilters = () => {
        const filtersToDisplay = [];
        const round = (num) => Math.round(num * 100) / 100;

        if (geoFilter) {
            filtersToDisplay.push(geoFilter.properties.CONTINENT);
        }

        if (radiusFilter) {
            console.log(radiusFilter);

            const { coordinates } = radiusFilter.feature.geometry;
            const { radius } = radiusFilter;
            const radiusFilterToDisplay = `
          Center: (Lat: ${round(coordinates[1])}, Lon: ${round(coordinates[0])})
          Radius: ${radius} km`;
            filtersToDisplay.push(radiusFilterToDisplay);
        }

        return filtersToDisplay.length > 0
            ? filtersToDisplay
            : ["No Filter Active"];
    };

    const RenderActiveFilters = () => {
        return (
            <List
                size="small"
                header={
                    <div>
                        <b>Active Filters: </b>
                    </div>
                }
                bordered
                dataSource={getDisplayFilters()}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        );
    };

    return (
        <div className="leaflet-bottom leaflet-left">
            <div className="leaflet-control leaflet-bar leaflet-control-layers">
                <RenderActiveFilters />
            </div>
        </div>
    );
};


export default ShowActiveFiltersControl;