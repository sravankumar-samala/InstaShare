/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import LoadingView from "../components/loader";
import RenderProfileDetails from "../components/renderProfileDetails";
import FailureView from "../components/failureView";

export default function UserProfile() {
  const { id } = useParams();
  const [userProfileData, setUserProfileData] = useState(null);
  const [userProfilePending, setUserProfilePending] = useState(false);

  const getUserProfileData = useCallback(async () => {
    setUserProfilePending(true);
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(
        `https://apis.ccbp.in/insta-share/users/${id}`,
        options
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.err_msg);
      setUserProfileData(data.user_details);
    } catch (error) {
      console.log(error.message);
    } finally {
      setUserProfilePending(false);
    }
  }, [id]);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  return (
    <div className="profile-page-container">
      {userProfilePending ? (
        <LoadingView />
      ) : (
        <>
          {userProfileData !== null ? (
            <RenderProfileDetails profileObj={userProfileData} user="other" />
          ) : (
            <FailureView fetchData={getUserProfileData} />
          )}
        </>
      )}
    </div>
  );
}
