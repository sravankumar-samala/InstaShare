import PropTypes from "prop-types";

export default function FailureView({ fetchData, homePage }) {
  const imgUrl = homePage
    ? "https://res.cloudinary.com/dug9vpon2/image/upload/v1714563036/xlnavurxbz5n5zd07zkx.png"
    : "https://res.cloudinary.com/dug9vpon2/image/upload/v1698733371/Something_went_wrong_ntbxzt.png";

  return (
    <div className="min-h-[100px] grid place-items-center gap-5 text-center">
      <div className="max-w-md">
        <img src={imgUrl} alt="failure view" className="max-w-full" />
      </div>
      <p className={`${homePage ? "text-lg" : "text-xl"}`}>
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        onClick={fetchData}
        className={`px-5 py-1 bg-blue-400 text-white ${
          homePage ? "text-md" : "text-lg"
        } rounded-md`}
      >
        Try again
      </button>
    </div>
  );
}

FailureView.propTypes = {
  fetchData: PropTypes.func.isRequired,
  homePage: PropTypes.bool,
};
