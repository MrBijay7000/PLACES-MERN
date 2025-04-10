import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export default function UserPlacesPage() {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5001/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.log(err);
        if (
          err.message === "Could not find a place for the provided user id."
        ) {
          setLoadedPlaces([]); // So PlaceList still renders with empty list
        }
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  async function placeDeletedHander(deletedPlaceId) {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  }

  return (
    <>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHander} />
      )}
    </>
  );
}
