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
        slidesToShow: 7,
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

export default function SliderStories({ usersStories }) {
  return (
    <ul>
      <Slider {...settings}>
        {usersStories?.map((story) => (
          <li className="story-container" key={story.user_id}>
            <img src={story.story_url} alt="user story" />
            <span className="story-heading">{story.user_name}</span>
          </li>
        ))}
      </Slider>
    </ul>
  );
}

SliderStories.propTypes = {
  usersStories: PropTypes.any.isRequired,
};
