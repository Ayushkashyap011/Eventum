import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./profile.css";


const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save updated user data to local storage (or send to backend)
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  return (
    <>
      <Navbar />
    <div className="profile-container">
      <div className="profile-content">
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-email">{user.email}</p>
        <p className="profile-phone">{user.phone}</p>

        <div className="profile-edit">
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />

          <label>Email:</label>
          <input type="text" name="email" value={user.email} disabled />

          <label>Phone:</label>
          <input type="text" name="phone" value={user.phone} onChange={handleChange} />

          <button className="save-button" onClick={handleSave}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default Profile;
