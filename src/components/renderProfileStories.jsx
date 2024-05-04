import PropTypes from "prop-types";

export default function ProfileStories({ stories, user }) {
  const userType = user === "me" ? "my" : "user";

  return (
    <ul className="my-stories-container">
      {stories?.map((story) => (
        <li key={story.id} className="story-item">
          <img src={story.image} alt={`${userType} story`} />
        </li>
      ))}
    </ul>
  );
}

ProfileStories.propTypes = {
  stories: PropTypes.any.isRequired,
  user: PropTypes.string.isRequired,
};
