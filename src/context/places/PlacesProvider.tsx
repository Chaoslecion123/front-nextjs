import { useEffect, useReducer, useState } from "react";
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

  const tokenData = Cookies.get("token")
    ? JSON.parse(Cookies.get("token") as string)
    : undefined;

  useEffect(() => {
    // if (tokenData !== undefined) {
    console.log("tokenData", tokenData);
    if (tokenData?.id_coordenada === null) {
      getUserLocation().then((res) => {
        console.log("res", res);
        dispatch({
          type: "setUserLocation",
          payload: res,
        });
      });
    }
    if (tokenData?.id_coordenada != null) {
      const result = axios.get(
        endPoints.dashboard.coordenates.get(tokenData.id_coordenada)
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
  }, [tokenData?.id_coordenada]);

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  );
};
