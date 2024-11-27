import { RouteResponse } from "../../pages/RideOptions";

type StaticMapProps = {
  routeResponse: RouteResponse;
};

export const StaticMap = ({ routeResponse }: StaticMapProps) => {
  const googleMapsAPIKey = "AIzaSyCLVgPY8En6RqlroAjDtk8N_gNSCOamxtw"

  const startLocation = routeResponse.legs[0].startLocation.latLng;
  const endLocation = routeResponse.legs[0].endLocation.latLng;
  const polyline = encodeURIComponent(routeResponse.polyline.encodedPolyline);
console.log(polyline)
  const centerLat = (startLocation.latitude + endLocation.latitude) / 2;
  const centerLng = (startLocation.longitude + endLocation.longitude) / 2;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLng}&zoom=14&size=600x400&markers=color:blue%7Clabel:A%7C${startLocation.latitude},${startLocation.longitude}&markers=color:red%7Clabel:B%7C${endLocation.latitude},${endLocation.longitude}&path=enc:${polyline}&key=${googleMapsAPIKey}`;
console.log(mapUrl)
  return (
    <div>
      <img src={mapUrl} alt="Mapa Estático com Rota" />
    </div>
  );
};
 