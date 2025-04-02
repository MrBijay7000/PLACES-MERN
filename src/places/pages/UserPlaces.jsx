import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "HAHAHA",
    description: "HAHAHAHAHAHAHA",
    imageUrl:
      "https://i.pinimg.com/736x/2b/41/dc/2b41dca6ed3a700a2acc5124707cbce7.jpg",
    address: "ONE PUNCH",
    location: {
      lat: 40.7,
      lng: -73.7,
    },
    creator: "u1",
  },
];
export default function UserPlacesPage() {
  const userId = useParams().userId;
  const loadedPlace = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlace} />;
}
