import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserForm from "./Userform";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrap fetchUser in useCallback to memoize it
  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
      setLoading(false);
    } catch {
      setError("Error fetching user");
      setLoading(false);
    }
  }, [id]); // Add id as a dependency

  // Use useEffect to call fetchUser when id changes
  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Include fetchUser in the dependency array

  return (
    <div>
      <h1>User Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <UserForm user={user} isEditing={true} />
      )}
    </div>
  );
};

export default UserDetails;
