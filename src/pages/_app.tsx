import { SessionProvider } from "next-auth/react";
import { PlacesProvider } from "@/context";
import { ProviderAuth } from "@/hooks/useAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { MapProvider } from "@/context/map/MapProvider";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hhb3NsZWNpb243MSIsImEiOiJjbGd2aDA2bTEwM29zM2lwczBsdjd4MjB5In0.HtbXtHcdZt0gtyzWJ3f00g";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  if (typeof window !== "undefined") {
    if (!navigator.geolocation) {
      alert("Tu navegador no tiene opción de Geolocation");
      throw new Error("Tu navegador no tiene opción de Geolocation");
    }
  }

  return (
    <SessionProvider session={session}>
      <ProviderAuth>
        <PlacesProvider>
          <MapProvider>
            <Component {...pageProps} />
          </MapProvider>
        </PlacesProvider>
      </ProviderAuth>
    </SessionProvider>
  );
}
