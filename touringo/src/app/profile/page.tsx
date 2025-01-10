"use client";

import React, { useState } from "react";

interface Profile {
  name: string;
  bio: string;
  about: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    bio: "Web Developer | Tech Enthusiast | Lifelong Learner",
    about:
      "I am a passionate web developer with experience in building responsive and dynamic web applications. I love exploring new technologies and sharing knowledge with others.",
  });
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setActiveField(null);
    // Additional save logic (e.g., API call) can be implemented here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  return (
    <div className="max-w-[1000px] my-4 mx-auto">
      <div className="text-3xl text-green-600 font-bold mb-4">Profile</div>
      <div>
        <div className="profile-header mb-6 text-center">
          <img
            id="profile-pic"
            className="rounded-full w-36 h-36 object-cover border-4 border-blue-500 mx-auto"
            src="/event_images/profilePicture.jpg"
            alt="Profile Picture"
          />
          <h1 id="name" className="mt-4 text-2xl text-blue-500">
            {activeField === "name" ? (
              <input
                id="name"
                className="border rounded-lg p-2 w-full max-w-md mx-auto"
                value={profile.name}
                onChange={handleChange}
              />
            ) : (
              profile.name
            )}
          </h1>
          <p id="bio" className="text-lg ">
            {activeField === "bio" ? (
              <textarea
                id="bio"
                className="border rounded-lg p-2 w-full max-w-md mx-auto"
                value={profile.bio}
                onChange={handleChange}
              />
            ) : (
              profile.bio
            )}
          </p>
        </div>
        <div className="profile-content mb-6 text-center">
          <h2 className="text-xl text-blue-500">About Me</h2>
          <p id="about" className="mt-2 ">
            {activeField === "about" ? (
              <textarea
                id="about"
                className="border rounded-lg p-2 w-full max-w-md mx-auto"
                value={profile.about}
                onChange={handleChange}
              />
            ) : (
              profile.about
            )}
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          {isEditing ? (
            <>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setActiveField("name")}
                disabled={activeField === "name"}
              >
                Edit Name
              </button>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setActiveField("bio")}
                disabled={activeField === "bio"}
              >
                Edit Bio
              </button>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setActiveField("about")}
                disabled={activeField === "about"}
              >
                Edit About
              </button>
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
