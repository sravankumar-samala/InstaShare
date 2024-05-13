import { BiCamera } from "react-icons/bi";
import PropTypes from "prop-types";

export default function ProfilePosts({ posts, user }) {
  const userType = user === "me" ? "my" : "user";

  return (
    <>
      {posts.length === 0 ? (
        <div className="no-posts-view">
          <BiCamera />
          <h1>No Posts</h1>
        </div>
      ) : (
        <ul className="grid grid-cols-3 gap-2 md:gap-3">
          {posts?.map((post) => (
            <li key={post.id}>
              <img src={post.image} alt={`${userType} post`} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

ProfilePosts.propTypes = {
  posts: PropTypes.any.isRequired,
  user: PropTypes.string.isRequired,
};
