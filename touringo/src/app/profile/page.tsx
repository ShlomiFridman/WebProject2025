"use client";

import { useAppContext } from "@/context/MainContext";  // Custom hook for accessing the app context
import { Account } from "@/utils/classes";  // Account class for handling user details
import { encryptData } from "@/utils/utils";  // Utility function to encrypt data
import React, { useEffect, useState } from "react";  // React imports for component state and lifecycle methods
import { getLoggedAccount, ImageElement, logAccount } from "@/utils/util_client";  // Utilities for account handling and image rendering
import { useRouter } from "next/navigation";  // Hook for Next.js router
import { myStyles } from "@/components/styles";  // Custom styles

const ProfilePage: React.FC = () => {
  // State variables for managing profile data and edit state
  const [loggedAccount, setLoggedAccount] = useState<Account | null>(null);  // Stores the logged-in account
  const [isEditing, setIsEditing] = useState<boolean>(false);  // Tracks whether the profile is in editing mode
  const [profile, setProfile] = useState({ name: "", bio: "", about: "" });  // Stores current profile data
  const [initialProfile, setInitialProfile] = useState({ name: "", bio: "", about: "" });  // Stores initial profile data
  const router = useRouter();  // Next.js router instance for navigation
  const { dispatch } = useAppContext();  // Access to global state dispatcher

  useEffect(() => {
    // Fetch the logged-in account data when the component mounts
    const account = getLoggedAccount();
    if (!account) {
      // If no account is logged in, redirect to login page
      router.push('/login');
      return;
    }
    setLoggedAccount(account);  // Set logged account data in state
    const currentProfile = {
      name: account?.username || "",
      bio: account?.bio || "",
      about: account?.about || "",
    };
    setProfile(currentProfile);  // Set profile data for the user
    setInitialProfile(currentProfile);  // Store initial profile data for comparison
  }, [router]);

  // Toggle the editing state when the user clicks the edit button
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      setProfile(initialProfile);  // Revert to initial profile values when cancelling edit
    }
  };

  // Handle changes in the profile input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,  // Update the specific field (bio or about) in the profile state
    }));
  };

  // Save the updated profile information when the user clicks 'Save Changes'
  const handleSave = () => {
    if (!isEditing) return;  // Prevent saving if not in editing mode

    setIsEditing(false);  // Exit editing mode

    // If no changes were made, prevent saving
    if (
      profile.bio === initialProfile.bio &&
      profile.about === initialProfile.about
    ) {
      return;
    }

    // If the account is logged in, proceed with updating the account details
    if (loggedAccount != null) {
      const updatedAccount = new Account(
        loggedAccount.username,
        loggedAccount.password,
        loggedAccount.name,
        profile.bio,
        profile.about
      );
      updateRequest(loggedAccount.username, updatedAccount);  // Send update request to server
    }
  };

  // Cancel the editing and revert to the initial profile data
  const handleCancelEdit = () => {
    setIsEditing(false);
    setProfile(initialProfile);  // Revert to initial profile data
  };

  // Update the account information by sending a PUT request to the API
  const updateRequest = (username: string, updatedAccount: Account) => {
    fetch('/api/accounts/update', {
      method: 'PUT',
      body: JSON.stringify({
        data: encryptData({ username, updatedAccount }),  // Encrypt the data before sending
      }),
    })
      .then((response) => {
        const badRequestError = response.status >= 400 && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText);  // Display error if the request fails
          throw new Error("Unknown Error");
        }
        return response.json();  // Parse response JSON
      })
      .then((resBody) => {
        if (resBody.message) {
          alert(resBody.message);  // Show message from the server if any
        } else {
          const account = resBody.result as Account;
          dispatch({ type: "SET_LOGGED_ACCOUNT", payload: account });  // Update global state with new account data
          logAccount(account);  // Log the account for further use
          setInitialProfile({ bio: account.bio, about: account.about, name: account.username });  // Update initial profile with new data
          alert("Changes saved successfully!");  // Notify the user of successful update
        }
      })
      .catch((err) => {
        console.error(err);  // Log any errors encountered during the request
      });
  };

  return (
    <div className={myStyles.container_max_width}>
      {/* Profile Page Header and Edit Buttons */}
      <div className="flex justify-between items-center">
        <div className={`${myStyles.page_title} mb-4`}>Profile</div>
        <div className="flex space-x-4">
          <button
            onClick={isEditing ? handleSave : handleEditToggle}  // Toggle between editing and saving profile
            className={`px-6 py-2 ${myStyles.button_green} rounded-lg`}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
          {isEditing && (
            <button
              onClick={handleCancelEdit}  // Cancel edit action
              className="px-6 py-2 bg-gray-500 rounded-lg hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div>
        {/* Profile Header with Profile Picture */}
        <div className="profile-header mb-6 text-center">
          <div
            className="relative mx-auto"
            style={{
              aspectRatio: "2.75 / 3",
              width: "100%",
              maxWidth: "150px",
            }}
          >
            <ImageElement
              src="/event_images/profilePicture.png"
              title="Profile Picture"
              className="rounded-full object-cover border-4 border-green-500"
            />
          </div>

          <h1 id="name" className="mt-4 text-2xl text-green-500">
            {profile.name}  {/* Display profile name */}
          </h1>
        </div>

        {/* Profile Bio and About Sections */}
        <div className="profile-content mb-6 text-center">
          {/* Bio Field */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-green-800 dark:text-green-300" htmlFor="bio">
              Bio
            </label>
            {isEditing ? (
              <textarea
                id="bio"
                className="border rounded-lg p-2 w-full max-w-md mx-auto resize-none"
                value={profile.bio}
                onChange={handleChange}  // Handle bio changes
              />
            ) : (
              <p className="text-lg ">{profile.bio}</p>  // Display bio when not editing
            )}
          </div>

          {/* About Me Field */}
          <div>
            <label className="block text-lg font-medium text-green-800 dark:text-green-300" htmlFor="about">
              About Me
            </label>
            {isEditing ? (
              <textarea
                id="about"
                className="border rounded-lg p-2 w-full max-w-md mx-auto resize-none"
                value={profile.about}
                onChange={handleChange}  // Handle about field changes
              />
            ) : (
              <p className="text-lg ">{profile.about}</p>  // Display about text when not editing
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
