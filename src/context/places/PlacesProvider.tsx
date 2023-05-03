import { useEffect, useReducer, useState } from "react";
import { useSession } from "next-auth/react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "@/utils/getUserLocation";
import Cookies from "js-cookie";
import axios from "axios";
import endPoints from "@/services/api";

export interface PlaceState {
  isLoading: boolean;
  userLocation?: [number, number];
}

export const INITIAL_STATE: PlaceState = {
  isLoading: true,
  userLocation: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  const { data: dataSession }: any = useSession();

  useEffect(() => {
    // if (tokenData !== undefined) {
    if (dataSession?.user?.idCoordenadas === null) {
      getUserLocation().then((res) => {
        console.log("res", res);
        dispatch({
          type: "setUserLocation",
          payload: res,
        });
      });
    }
    if (dataSession?.user?.idCoordenadas != null) {
      const result = axios.get(
        endPoints.dashboard.coordenates.get(dataSession?.user?.idCoordenadas)
      );
      result
        .then((res: any) => {
          console.log(res);
          dispatch({
            type: "setUserLocation",
            payload: [res.data["longitude"], res.data["latitude"]],
          });
        })
        .catch((err) => console.log(err));
    }
    // }
    // if (tokenData === undefined) {
    //   console.log("entra aqui");
    //   getUserLocation().then((res) => {
    //     console.log("res", res);
    //     dispatch({
    //       type: "setUserLocation",
    //       payload: res,
    //     });
    //   });
    // } else {
    //   console.log("aquie entra");
    //   const result = axios.get(
    //     endPoints.dashboard.coordenates.get(tokenData.id_coordenada)
    //   );
    //   result
    //     .then((res: any) => {
    //       console.log(res);
    //       dispatch({
    //         type: "setUserLocation",
    //         payload: [res.data["longitude"], res.data["latitude"]],
    //       });
    //     })
    //     .catch((err) => console.log(err));
    // }
  }, [dataSession?.user?.idCoordenadas]);

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  );
};
