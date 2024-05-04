import { BsGrid3X3 } from "react-icons/bs";
import PropTypes from "prop-types";
import ProfileStories from "./renderProfileStories";
import ProfilePosts from "./renderProfilePosts";

export default function RenderProfileDetails({ profileObj, user }) {
  const userType = user === "me" ? "my" : "user";

  return (
    <div className="profile-intro-container">
      <div className="profile-bio-container">
        <img src={profileObj.profile_pic} alt={`${userType} profile`} />
        <div className="profile-bio">
          <h1>{profileObj.user_name}</h1>
          <div className="profile-details">
            <p>
              <span>{profileObj.posts_count}</span> posts
            </p>
            <p>
              <span>{profileObj.followers_count}</span> followers
            </p>
            <p>
              <span>{profileObj.following_count}</span> following
            </p>
          </div>
          <p>{profileObj.user_id}</p>
          <p>{profileObj.user_bio}</p>
        </div>
      </div>
      <ProfileStories stories={profileObj.stories} user={user} />
      <div className="posts-container">
        <div className="posts-header">
          <BsGrid3X3 />
          <h1>Posts</h1>
          <ProfilePosts posts={profileObj.posts} user={user} />
        </div>
      </div>
    </div>
  );
}
RenderProfileDetails.propTypes = {
  profileObj: PropTypes.any.isRequired,
  user: PropTypes.string.isRequired,
};
