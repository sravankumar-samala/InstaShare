/* eslint-disable react/no-unknown-property */
import ReactLoading from "react-loading";

export default function LoadingView() {
  return (
    <div className="loader-container" testid="loader">
      <ReactLoading
        type="spinningBubbles"
        color="#4094EF"
        height={50}
        width={50}
      />
    </div>
  );
}
