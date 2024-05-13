/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import LoadingView from "../components/loader";
import RenderProfileDetails from "../components/renderProfileDetails";
import FailureView from "../components/failureView";

export default function MyProfile() {
  const [myProfileData, setMyProfileData] = useState(null);
  const [myProfilePending, setMyProfilePending] = useState(false);

  const getMyProfileData = useCallback(async () => {
    setMyProfilePending(true);
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(
        "https://apis.ccbp.in/insta-share/my-profile",
        options
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.err_msg);
      setMyProfileData(data.profile);
    } catch (error) {
      console.log(error.message);
    } finally {
      setMyProfilePending(false);
    }
  }, []);

  useEffect(() => {
    getMyProfileData();
  }, [getMyProfileData]);

  return (
    <div className="profile-page-container">
      {myProfilePending ? (
        <LoadingView />
      ) : (
        <>
          {myProfileData === null ? (
            <FailureView fetchData={getMyProfileData} />
          ) : (
            <RenderProfileDetails profileObj={myProfileData} user="me" />
          )}
        </>
      )}
    </div>
  );
}
