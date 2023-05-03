import { PlacesContext } from "@/context";
import { MapContext } from "@/context/map/MapContext";
import { Map, Popup } from "mapbox-gl";
import React, { useContext, useEffect, useRef } from "react";

const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
      setMap(map);
    }
  }, [isLoading]);

  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: "red",
        height: "250px",
        left: 0,
        position: "relative",
        top: 0,
        width: "100%",
      }}
    >
      hola map view
    </div>
  );
};

export default MapView;
