import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./Profile.css";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user from localStorage:", parsedUser);

        if (parsedUser.name || parsedUser.email || parsedUser.phone) {
          setUser({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            phone: parsedUser.phone || "",
          });
        }
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    } else {
      console.warn("No user found in localStorage");
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-new">
            <div className="profile-box">{user.phone || "No phone found"}</div>
            <div className="profile-name-1">
              <p className="profile-name">Hello, {user.name || "Guest"}</p>
            </div>
            <div className="profile-box">{user.email || "No email found"}</div>
          </div>

          <button className="open-modal-button" onClick={openModal}>
            Update Profile
          </button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <button className="close-button" onClick={closeModal}>
              <FaTimes />
            </button>

            <div className="profile-edit">
              <h2 className="modal-title">Update Profile</h2>

              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />

              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={user.email}
                disabled
              />

              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />

              <button className="save-button" onClick={handleSave}>
                Update Profile
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
