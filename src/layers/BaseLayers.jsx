import React from 'react'
import { LayersControl, TileLayer } from 'react-leaflet'


const BaseLayers = () => {
    return (
        <>
            <LayersControl.BaseLayer checked name="Vacío">
                <TileLayer
                    attribution=''
                    url=""
                />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="OSM Streets">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer checked name="ESRI World Imagery">
                <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="DEM Mex">
                <TileLayer
                    attribution='&copy; <a href="https://smn.conagua.gob.mx/es/">Servicio Meteorológico Nacional</a>'
                    url="http://172.29.60.18/src/dem_mex/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name="Estados y Municipios">
                <TileLayer
                    attribution='&copy; <a href="https://smn.conagua.gob.mx/es/">Servicio Meteorológico Nacional</a>'
                    url="http://172.29.60.18/tile_layer/entidades_municipios_2024/{z}/{x}/{y}.png"
                    opacity={1}
                    maxNativeZoom={13}
                />
            </LayersControl.Overlay>
        </>
    )
}

export default BaseLayers