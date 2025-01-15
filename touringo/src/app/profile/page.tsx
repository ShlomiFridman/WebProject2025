"use client";

import { useAppContext } from "@/context/MainContext";
import { Account } from "@/utils/classes";
import { encryptData } from "@/utils/utils";
import Image from "next/image";
import React, { useState } from "react";
import { getLoggedAccount } from "@/utils/util_client";

interface Profile {
  name: string;
  bio: string;
  about: string;
}

const ProfilePage: React.FC = () => {
  // TODO use reducer to get the username
  // TODO use useEffect get the account info from server
  const loggedAccount = getLoggedAccount();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({
    name: loggedAccount?.username || "null",
    bio: loggedAccount?.bio || "null",
    about: loggedAccount?.about || "null",
  });
  const [activeField, setActiveField] = useState<string | null>(null);
  const { dispatch } = useAppContext();

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

  // TODO call the function on save click
  const updateRequest = (username: string, updatedAccount: Account) => {
    fetch('/api/accounts/update', {
      method: 'PUT',
      body: JSON.stringify(
        {
          data: encryptData(
            {
              username: username,
              updatedAccount: updatedAccount
            })
        }
      )
    }).then((response) => {
      const badRequestError = (400 <= response.status && response.status < 500);
      if (!response.ok && !badRequestError) {
        alert(response.statusText);
        throw new Error("Unknown Error");
      }
      return response.json();
    }).then((resBody) => {
      if (resBody.message) {
        alert(resBody.message);
      } else {
        const account = resBody.result as Account;
        console.log(`updated account`);
        dispatch({ type: 'SET_LOGGED_ACCOUNT', payload: account })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  //updateRequest("bob", new Account("", "", "", "", ""));

  return (
    <div className="max-w-[1000px] my-4 mx-auto">
      <div className="text-3xl text-green-600 font-bold mb-4">Profile</div>
      <div>
        <div className="profile-header mb-6 text-center">
          <div
            className="relative mx-auto"
            style={{
              aspectRatio: '2.75 / 3', // Define the desired aspect ratio
              width: '100%', // Makes it responsive
              maxWidth: '150px', //  Limit maximum width
            }}
          >
            <Image
              id="profile-pic"
              className="rounded-full object-cover border-4 border-blue-500"
              src="/event_images/profilePicture.jpg"
              alt="Profile Picture"
              layout="fill" // Uses the container's dimensions
            // objectFit="cover"
            />
          </div>

          <h1 id="name" className="mt-4 text-2xl text-blue-500">
            {activeField === "name" ? (
              <input
                id="name"
                className="border rounded-lg p-2 w-full max-w-md mx-auto"
                value={profile.name}
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
