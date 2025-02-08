import L from "leaflet"
import mountainPng from "../images/mountain.png"


const LeafletIcon = L.Icon.extend ({
    options :{
        iconSize:[35,23],
        iconAnchor: [17,16],
        tooltipAchor:[15, -5]
    }
})


export const mountainIcon = new LeafletIcon({iconUrl:mountainPng})