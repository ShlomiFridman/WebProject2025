"use client";

import { useAppContext } from "@/context/MainContext";
import { Account } from "@/utils/classes";
import { encryptData } from "@/utils/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getLoggedAccount, logAccount } from "@/utils/util_client";

const ProfilePage: React.FC = () => {
  const [loggedAccount, setLoggedAccount] = useState<Account | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState({ name: "", bio: "", about: "" });
  const [initialProfile, setInitialProfile] = useState({ name: "", bio: "", about: "" });
  const { dispatch } = useAppContext();

  useEffect(() => {
    const account = getLoggedAccount();
    setLoggedAccount(account);
    const currentProfile = {
      name: account?.username || "",
      bio: account?.bio || "",
      about: account?.about || "",
    };
    setProfile(currentProfile);
    setInitialProfile(currentProfile);
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      setProfile(initialProfile);
    }
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

  const handleSave = () => {
    if (!isEditing) return;

    setIsEditing(false);

    if (
      profile.bio === initialProfile.bio &&
      profile.about === initialProfile.about
    ) {
      return;
    }

    if (loggedAccount != null) {
      const updatedAccount = new Account(
        loggedAccount.username,
        loggedAccount.password,
        loggedAccount.name,
        profile.bio,
        profile.about
      );
      updateRequest(loggedAccount.username, updatedAccount);
    }
  };

  const updateRequest = (username: string, updatedAccount: Account) => {
    fetch('/api/accounts/update', {
      method: 'PUT',
      body: JSON.stringify({
        data: encryptData({ username, updatedAccount }),
      }),
    })
      .then((response) => {
        const badRequestError = response.status >= 400 && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText);
          throw new Error("Unknown Error");
        }
        return response.json();
      })
      .then((resBody) => {
        if (resBody.message) {
          alert(resBody.message);
        } else {
          const account = resBody.result as Account;
          dispatch({ type: "SET_LOGGED_ACCOUNT", payload: account });
          logAccount(account);
          setInitialProfile({ bio: account.bio, about: account.about, name: account.username });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="max-w-[1000px] my-4 mx-auto">
      <div className="flex justify-between items-center">
        <div className="text-3xl text-green-600 font-bold mb-4">Profile</div>
        <button
          onClick={isEditing ? handleSave : handleEditToggle}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-500"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div>
        <div className="profile-header mb-6 text-center">
          <div
            className="relative mx-auto"
            style={{
              aspectRatio: "2.75 / 3",
              width: "100%",
              maxWidth: "150px",
            }}
          >
            <Image
              id="profile-pic"
              className="rounded-full object-cover border-4 border-green-500"
              src="/event_images/profilePicture.png"
              alt="Profile Picture"
              layout="fill"
            />
          </div>

          <h1 id="name" className="mt-4 text-2xl text-green-500">
            {profile.name}
          </h1>
        </div>
        <div className="profile-content mb-6 text-center">
          <div className="mb-4">
            <label className="block text-lg font-medium text-green-700" htmlFor="bio">
              Bio
            </label>
            {isEditing ? (
              <textarea
                id="bio"
                className="border rounded-lg p-2 w-full max-w-md mx-auto"
                value={profile.bio}
                onChange={handleChange}
              />
            ) : (
              <p className="text-lg ">{profile.bio}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-green-700" htmlFor="about">
              About Me
            </label>
            {isEditing ? (
              <textarea
                id="about"
                className="border rounded-lg p-2 w-full max-w-md mx-auto"
                value={profile.about}
                onChange={handleChange}
              />
            ) : (
              <p className="text-lg ">{profile.about}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
