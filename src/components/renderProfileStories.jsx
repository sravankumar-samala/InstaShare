import PropTypes from "prop-types";

export default function ProfileStories({ stories, user }) {
  const userType = user === "me" ? "my" : "user";

  return (
    <ul className="flex gap-6 overflow-hidden py-10 border-b-2 mb-10">
      {stories?.map((story) => (
        <li key={story.id} className="w-20 bg-gray-400 p-[1px] rounded-full">
          <img
            className="rounded-full border-2 border-white"
            src={story.image}
            alt={`${userType} story`}
          />
        </li>
      ))}
    </ul>
  );
}

ProfileStories.propTypes = {
  stories: PropTypes.any.isRequired,
  user: PropTypes.string.isRequired,
};
