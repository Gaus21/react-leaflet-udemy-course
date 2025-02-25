import { useEffect, useRef, useState } from "react";
import { Popup, useMapEvents } from "react-leaflet";

import { Draggable } from "leaflet";
//import L from "leaflet";

const MovablePopup = ({ children }) => {
  const popupRef = useRef();
  const [popupContent, setPopupContent] = useState("Initial content");

  /*
  const map = useMapEvents({
    popupopen: (e) => {
      const p = e.popup;
      p._wrapper.parentNode.latlng = p.getLatLng();
      try {
        p._wrapper.parentNode.popupAnchor =
          p._source.options.icon.options.popupAnchor;
      } catch {
        p._wrapper.parentNode.popupAnchor = [0, 0];
      }
      if (p.options.popupmovable === false) return;

      //Make Popup elements movable.
      const drag = new Draggable(p._container, p._wrapper).on(
        "dragend",
        (e) => {
          //console.log(e.target._element);
          console.log(e.target._newPos);
        }
      );

      drag.enable();
    },
  });*/

  return (
    <Popup autoClose={false} closeOnClick={false}>
      {children}
    </Popup>
  );
};

export default MovablePopup;
