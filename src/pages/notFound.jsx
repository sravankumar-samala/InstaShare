import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="img-container">
        <img
          src="https://res.cloudinary.com/dug9vpon2/image/upload/v1698733346/Page_not_found_okaopd.png"
          alt="page not found"
        />
        <h1>PAGE NOT FOUND</h1>
        <p>we are sorry, the page you requested could not be found</p>
        <button type="button" onClick={() => navigate("/")}>
          Home Page
        </button>
      </div>
    </div>
  );
}
