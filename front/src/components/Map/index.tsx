import { useEffect, useState } from "react";
import { RouteResponse } from "../../pages/RideOptions";

type StaticMapProps = {
  routeResponse: RouteResponse
};

export const StaticMap = ({ routeResponse }: StaticMapProps) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null)
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'

  useEffect(() => {
    const startLocation = routeResponse.legs[0].startLocation.latLng
    const endLocation = routeResponse.legs[0].endLocation.latLng
    const polyline = encodeURIComponent(routeResponse.polyline.encodedPolyline)
    const viewport = JSON.stringify(routeResponse.viewport)

    if (!startLocation || !endLocation || !polyline || !viewport) {
      console.error("Invalid route response data")
      return
    }

    fetch(`${backendUrl}/static-map?startLat=${startLocation.latitude}&startLng=${startLocation.longitude}&endLat=${endLocation.latitude}&endLng=${endLocation.longitude}&polyline=${polyline}&viewport=${viewport}`)
      .then((response) => response.json())
      .then((data) => setMapUrl(data.mapUrl))
      .catch((error) => console.error("Erro ao carregar o mapa:", error))
  }, [routeResponse])

  if (!mapUrl) {
    return <div>Carregando mapa...</div>
  }

  return (
    <div>
      <img src={mapUrl} alt="Mapa Estático com Rota" />
    </div>
  )
}
