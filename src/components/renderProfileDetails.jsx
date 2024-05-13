import { BsGrid3X3 } from "react-icons/bs";
import PropTypes from "prop-types";
import ProfileStories from "./renderProfileStories";
import ProfilePosts from "./renderProfilePosts";
import ProfileBio from "./renderProfileBio";

export default function RenderProfileDetails({ profileObj, user }) {
  return (
    <div className="profile-intro-container py-5">
      <ProfileBio profileObj={profileObj} user={user} />
      <ProfileStories stories={profileObj.stories} user={user} />
      <div className="grid gap-5">
        <div className="flex gap-4 items-center">
          <BsGrid3X3 />
          <h1 className="font-medium text-xl">Posts</h1>
        </div>
        <ProfilePosts posts={profileObj.posts} user={user} />
      </div>
    </div>
  );
}

RenderProfileDetails.propTypes = {
  profileObj: PropTypes.any.isRequired,
  user: PropTypes.string.isRequired,
};
