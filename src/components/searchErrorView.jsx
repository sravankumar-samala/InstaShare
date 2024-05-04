import PropTypes from "prop-types";

export default function FailureView({ fetchAgain }) {
  const fetchSearchResultsAgain = () => fetchAgain();

  return (
    <div className="error-view-container">
      <img
        src="https://res.cloudinary.com/dug9vpon2/image/upload/v1698733371/Something_went_wrong_ntbxzt.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={fetchSearchResultsAgain}>
        Try again
      </button>
    </div>
  );
}
FailureView.propTypes = {
  fetchAgain: PropTypes.func.isRequired,
};
