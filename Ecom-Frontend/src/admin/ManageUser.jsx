import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, deleteUser } from "../Slices/userSlices";
import "./manageuser.css";
import Navbar from "../includes/Navbar";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";

const ManageUser = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUser(id))
      
        .then(() => {
          toast.success("User deleted", {
            style: { borderRadius: "10px", background: "#333", color: "#fff" },
          });
          dispatch(fetchUser()); // Refresh the list
        })
        .catch((err) =>
          toast.error(err || "Delete failed", {
            style: { borderRadius: "10px", background: "#333", color: "#fff" },
          })
        );
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
    <h2>👥 Manage Users</h2>
      <Navbar />
      <Sidebar/>
      <div className="manage-user-container">
        <h2 className="m-user">👥 Manage Users</h2>
      
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.length === 0 ? (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            ) : (
              user.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.password}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(u._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUser;
