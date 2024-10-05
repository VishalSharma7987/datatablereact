import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserForm from "./Userform";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError("Error fetching users");
      setLoading(false);
    }
  };

  const createUser = async (newUser) => {
    try {
      // Send a POST request to create a new user
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
      // Assuming the response contains the newly created user, you can add it to the list
      setUsers([...users, response.data]);
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError("Error creating user");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUsers(users.filter((user) => user.id !== Number(id))); // Ensure id type is consistent
      } catch (error) {
        console.error(error); // Log the error for debugging
        setError("Error deleting user");
      }
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onSubmit={createUser} />
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,) => (
              <tr key={user.id} >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/user/${user.id}`}>View</Link>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
