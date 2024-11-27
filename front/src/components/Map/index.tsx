import { useEffect, useState } from "react";
import { RouteResponse } from "../../pages/RideOptions";

type StaticMapProps = {
  routeResponse: RouteResponse;
};

export const StaticMap = ({ routeResponse }: StaticMapProps) => {
  const [googleMapsAPIKey, setGoogleMapsAPIKey] = useState<string | null>(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

  useEffect(() => {
    fetch(`${backendUrl}/config`)
      .then((response) => response.json())
      .then((data) => setGoogleMapsAPIKey(data.googleMapsAPIKey))
      .catch((error) => console.error("Erro ao carregar a chave:", error));
  }, []);

  if (!googleMapsAPIKey) {
    return <div>Carregando mapa...</div>;
  }

  const startLocation = routeResponse.legs[0].startLocation.latLng;
  const endLocation = routeResponse.legs[0].endLocation.latLng;
  const polyline = encodeURIComponent(routeResponse.polyline.encodedPolyline);

  const centerLat = (startLocation.latitude + endLocation.latitude) / 2;
  const centerLng = (startLocation.longitude + endLocation.longitude) / 2;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLng}&zoom=12&size=600x400&markers=color:blue%7Clabel:A%7C${startLocation.latitude},${startLocation.longitude}&markers=color:red%7Clabel:B%7C${endLocation.latitude},${endLocation.longitude}&path=enc:${polyline}&key=${googleMapsAPIKey}`;

  return (
    <div>
      <img src={mapUrl} alt="Mapa Estático com Rota" />
    </div>
  );
};
 