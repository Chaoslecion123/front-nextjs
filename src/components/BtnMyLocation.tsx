import { PlacesContext } from "@/context";
import { useSession } from "next-auth/react";
import { MapContext } from "@/context/map/MapContext";
import endPoints from "@/services/api";
import axios from "axios";
import Cookies from "js-cookie";

import { useContext, useEffect, useState } from "react";

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);
  const [isCreated, setCreated] = useState(false);

  const { data: dataSession }: any = useSession();

  const onClick = () => {
    if (!isMapReady) throw new Error("Mapa no esta lista");
    if (!userLocation) throw new Error("No hay ubicacion del usuario");

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  useEffect(() => {
    axios.get(endPoints.dashboard.coordenates.list).then((e) => {
      const findCode = e.data?.results.find(
        (e: any) => e.code_id.code === dataSession?.user?.code
      );
      console.log("findCode", findCode);
      setCreated(!!findCode);
    });
  }, [dataSession?.user?.code]);

  const handlerRegisterCoordenate = async () => {
    const data = await axios.post(endPoints.dashboard.coordenates.add, {
      longitude: userLocation?.[0],
      latitude: userLocation?.[1],
      code_id: {
        code: dataSession?.user?.code,
      },
    });
    setCreated(!!data?.status);
  };

  return (
    <div className="bg-slate-500">
      {!isCreated && (
        <button
          className={"flex-initial  bg-emerald-500"}
          // disabled={isCreated}
          onClick={handlerRegisterCoordenate}
          style={{
            // position: "fixed",
            // top: "120px",
            // right: "150px",
            zIndex: 999,
            //   background: "blue",
            border: "10px",
            padding: "10px",
            color: "white",
            borderRadius: "4px",
          }}
        >
          Guardar Ubicacion
        </button>
      )}

      <button
        className="flex-initial"
        onClick={onClick}
        style={{
          // position: "fixed",
          // top: "120px",
          // right: "20px",
          zIndex: 999,
          background: "blue",
          border: "10px",
          padding: "10px",
          color: "white",
          borderRadius: "4px",
        }}
      >
        Mi Ubicacion
      </button>
    </div>
  );
};
