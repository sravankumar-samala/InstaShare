import PropTypes from "prop-types";
import "../profile-bio.css";

export default function ProfileBio({ profileObj, user }) {
  const userType = user === "me" ? "my" : "user";
  // const imageSrc =
  //   userType === "my" ? "/profile_pic.png" : profileObj.profile_pic;

  return (
    <div className="profile-bio-container">
      <div className="profile-image">
        <img src={profileObj.profile_pic} alt={`${userType} profile`} />
      </div>
      <h1 className="font-normal text-2xl md:text-3xl profile-name">
        {profileObj.user_name}
      </h1>
      <div className="flex gap-3 sm:gap-5 profile-stats">
        <UserStats>
          <span className="font-bold text-lg">{profileObj.posts_count}</span>
          posts
        </UserStats>
        <UserStats>
          <span className="font-bold text-lg">
            {profileObj.followers_count}
          </span>
          followers
        </UserStats>
        <UserStats>
          <span className="font-bold text-lg">
            {profileObj.following_count}
          </span>
          following
        </UserStats>
      </div>
      <div className="profile-description flex flex-col gap-2">
        <p className="font-medium text-xl">{profileObj.user_id}</p>
        <p>{profileObj.user_bio}</p>
      </div>
    </div>
  );
}

ProfileBio.propTypes = {
  profileObj: PropTypes.any.isRequired,
  user: PropTypes.string.isRequired,
};

function UserStats({ children }) {
  return (
    <p className="flex flex-col sm:flex-row items-center sm:gap-2">
      {children}
    </p>
  );
}
UserStats.propTypes = {
  children: PropTypes.node,
};
