import PropTypes from "prop-types";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

function formatStoryName(string) {
  const newString = string.split(" ").join("_").slice(0, 10);
  return `${newString}...`;
}

export default function SliderStories({ usersStories }) {
  return (
    <ul className="border-b-2 border-gray-200 pb-4">
      <Slider {...settings}>
        {usersStories?.map((story) => (
          <li className="story-container" key={story.user_id}>
            <img
              src={story.story_url}
              alt="user story"
              className="rounded-full w-[50px] sm:w-[60px]"
            />
            <span className="story-heading my-2 text-sm break-words">
              {formatStoryName(story.user_name)}
            </span>
          </li>
        ))}
      </Slider>
    </ul>
  );
}

SliderStories.propTypes = {
  usersStories: PropTypes.any.isRequired,
};
