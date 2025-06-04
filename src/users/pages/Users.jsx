import { useEffect, useState } from "react";
import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function UsersPage() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "https://places-mern-api.vercel.app/api/users",
          "GET",
          null,
          {
            "Content-Type": "application/json",
            // Add other headers if needed
          }
        );

        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </>
  );
}
