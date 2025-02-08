import { Draggable, DomUtil } from "leaflet";

export const makePopupMovable = (e, map) => {
  //const map = useMap()

  const p = e.target._popup;
  p._wrapper.parentNode.latlng = p.getLatLng();
  try {
    p._wrapper.parentNode.popupAnchor =
      p._source.options.icon.options.popupAnchor;
  } catch {
    p._wrapper.parentNode.popupAnchor = [0, 0];
  }
  if (p.options.popupmovable === false) return;

  //Make Popup elements movable.
  const drag = new Draggable(p._container, p._wrapper).on("drag", (e) => {
    drawCss(e.target._element, e.target._newPos, map);
    //For ZoomLevel change Event,moved or not, it shall be possible to determine.
    // L.DomUtil.addClass(e.target._element, this._movedLabel);
  });
  drag.enable();
};

const drawCss = (el, newPosition, map = this._map) => {
  //Position of Popup before movging.
  const originalPos = map.latLngToLayerPoint(el.latlng),
    //Size of Popup.
    h = el.clientHeight,
    w = el.clientWidth,
    //Drawing rectangle with before and after as vertices.
    tip = 17, //Size of tip(=leader).
    x = Math.round(originalPos.x - newPosition.x + tip) + el.popupAnchor[0],
    y =
      Math.round(originalPos.y - (newPosition.y - h / 2 - tip)) +
      el.popupAnchor[1],
    //Leader's CSS of moved Popup.
    css = createPopupCss(x, y, w, h),
    div = el.children[1];

  for (const name in css) div.style[camelize(name)] = css[name];
  //Undisplay default tip.
  div.children[0].style.visibility = "hidden";
};

//Return css for Popup's leader
const createPopupCss = (x, y, w, h) => {
  //Drawing a rectangle using SVG and Triangulate part of it.
  const svgicon = (s, width, height) => {
    const xml = `<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" preserveAspectRatio="none" viewBox="0 0 100 100"><polygon points="${s}" stroke-width="0.1" stroke="gray" fill="#00000068" fill-opacity="0.3"  /></svg>`;
    //for easyPrint.js, convert svg's xml to base64.
    const encoded = btoa(xml);
    const uri = encodeURI(`data:image/svg+xml;charset=utf8;base64,${encoded}`);

    return `url(${uri})`;
  };
  const c = {
      //'z-index' : 900,
      "z-index": -1, //Placement on the back of Popup.
      position: "absolute",
      //If you want to emphasize the leader.
      filter: "drop-shadow(0px 0px 2px gray)",
      //For debbuging.(draw rectangle)
      /*
            'border-width': '1px',
            'border-color': 'black',
            'border-style': 'solid',
            */
    },
    //Width when Marker and Popup are parallel.
    para = 18,
    //Tweak leadline point.
    offset = 20,
    tweakH = 4,
    tweakW = 3;

  //Depending on The width of the balloon and distance, change the width of the base of the leader.
  function ww(width, minus = false) {
    const calc = (20 / width) * 100;
    //allways return 20px. this size can't over popup harf of width and heigth.
    if (minus) return String(100 - calc);
    else return String(calc);
  }
  //z-index ,When parallel position
  c["z-index"] = -1;
  //Change Processing depending on the position of Marker and Popup.
  if (Math.abs(y) + offset / 2 <= h / 2) {
    //parallel
    c["height"] = para;
    c["top"] = h / 2 - para / 2 + y - tweakH;
    if (x >= 0) {
      //left
      c["width"] = x - w / 2 - offset + tweakW;
      c["left"] = w + offset;
      c["background-image"] = svgicon("0,0 100,50 0,100", c["width"], para);
    } else {
      //right
      c["width"] = offset - tweakW - w / 2 - x;
      c["left"] = tweakW + x + w / 2;
      c["background-image"] = svgicon("0,50 100,0 100,100", c["width"], para);
    }
  } else if (Math.abs(x - offset) + offset <= w / 2) {
    //vertical
    c["width"] = para;
    c["left"] = w / 2 + x - para / 2 + tweakW;
    if (y >= 0) {
      //top
      c["height"] = y - h / 2;
      c["top"] = h - tweakH;
      c["background-image"] = svgicon("0,0 50,100 100,0", para, c["height"]);
    } else {
      //bottom
      c["height"] = tweakH - y;
      c["top"] = h / 2 + y - tweakH;
      c["background-image"] = svgicon("0,100 50,0 100,100", para, c["height"]);
    }
  } else if (x >= 0 && y >= 0) {
    //left-upper
    c["width"] = x;
    c["left"] = w / 2 + tweakW;
    c["height"] = y;
    c["top"] = h / 2 - tweakH;
    const width = ww(c["width"]),
      height = ww(c["height"]);
    c["background-image"] = svgicon(
      `${width},0 100,100 0,${height}`,
      c["width"],
      c["height"]
    );
  } else if (x < 0 && y >= 0) {
    //right-upper
    c["width"] = offset * 2 - x;
    c["left"] = w / 2 + x + tweakW;
    c["height"] = y;
    c["top"] = h / 2 - tweakH;
    const width = ww(c["width"], true),
      height = ww(c["height"]);
    c["background-image"] = svgicon(
      `0 100,${width},0 100,${height}`,
      c["width"],
      c["height"]
    );
  } else if (x < 0 && y < 0) {
    //right-lower
    c["width"] = offset * 2 - x;
    c["left"] = w / 2 + x + tweakW;
    c["height"] = offset - y;
    c["top"] = h / 2 + y - tweakH;
    const width = ww(c["width"], true),
      height = ww(c["height"], true);
    c["background-image"] = svgicon(
      `0,0 100,${height},${width} 100`,
      c["width"],
      c["height"]
    );
  } else if (x >= 0 && y < 0) {
    //left-lower
    c["width"] = x;
    c["left"] = w / 2 + tweakW;
    c["height"] = offset - y;
    c["top"] = h / 2 + y - tweakH;
    const width = ww(c["width"]),
      height = ww(c["height"], true);
    c["background-image"] = svgicon(
      `0,${height} ${width},100 100,0`,
      c["width"],
      c["height"]
    );
  }
  //Apply the retrieved css's values.
  Object.keys(c).forEach(function (key) {
    const lst = ["width", "left", "height", "top"];
    for (const i in lst) {
      if (lst[i] === key) c[key] = String(c[key]) + "px";
    }
  });
  return c;
};

const camelize = (str) => {
  return str.replace(/-([a-z])/g, (a, b) => b.toUpperCase());
};

export const restorePopupOrig = (e) => {
  const div = [],
    tip = [],
    css = {},
    dic = [
      "z-index",
      "width",
      "height",
      "position",
      "left",
      "top",
      "margin-left",
      "margin-top",
      "margin-bottom",
      "background-image",
      "filter",
    ];
  //When ZoomLeve change, all Popups's css are restore default css.
  if (e.type === "zoomstart") {
    document
      .querySelectorAll(".leaflet-popup-tip-container")
      .forEach((c) => div.push(c));
    document.querySelectorAll(".leaflet-popup-tip").forEach((c) => tip.push(c));
  } else if (e.type === "popupclose") {
    div.push(e.popup._tipContainer);
    tip.push(e.popup._tipContainer.children[0]);
    DomUtil.removeClass(e.popup.getElement(), this._movedLabel);
  } else if (e instanceof L.Popup) {
    div.push(e._tipContainer);
    tip.push(e._tipContainer.children[0]);
    DomUtil.removeClass(e.getElement(), this._movedLabel);
  }

  for (const s in dic) css[dic[s]] = "";
  for (const d in div)
    for (const name in css) div[d].style[camelize(name)] = css[name];
  //redraw default tooltip
  for (const t in tip) tip[t].style.visibility = "visible";
  //Marker, which has not been moved, shall be excluded,
};

export const restorePopup = (e) => {
  const div = [],
    tip = [],
    css = {},
    dic = [
      "z-index",
      "width",
      "height",
      "position",
      "left",
      "top",
      "margin-left",
      "margin-top",
      "margin-bottom",
      "background-image",
      "filter",
    ];
  if (e.type === "zoomstart") {
    document
      .querySelectorAll(".leaflet-popup-tip-container")
      .forEach((c) => div.push(c));
    document.querySelectorAll(".leaflet-popup-tip").forEach((c) => tip.push(c));
  } else if (e.type === "popupclose") {
    div.push(e.popup._tipContainer);
    tip.push(e.popup._tipContainer.children[0]);
    //DomUtil.removeClass(e.popup.getElement());
  }

  for (const s in dic) css[dic[s]] = "";
  for (const d in div)
    for (const name in css) div[d].style[camelize(name)] = css[name];
  //redraw default tooltip
  for (const t in tip) tip[t].style.visibility = "visible";
  //Marker, which has not been moved, shall be excluded,
};
