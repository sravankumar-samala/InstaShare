import PropTypes from "prop-types";

export default function HomeRequestFailureView({ fetchData }) {
  const fetchHomeRequestAgain = () => fetchData();

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dug9vpon2/image/upload/v1714563036/xlnavurxbz5n5zd07zkx.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={fetchHomeRequestAgain}>
        Try again
      </button>
    </div>
  );
}

HomeRequestFailureView.propTypes = {
  fetchData: PropTypes.func.isRequired,
};
