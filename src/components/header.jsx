/* eslint-disable react/no-unknown-property */
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export default function Header({
  searchValue,
  handleSearchValue,
  fetchSearchResults,
}) {
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    handleSearchValue(e);
    console.log(e.target.value);
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className="header-container bg-zinc-700">
      <Link to="/" className="logo">
        <img
          src="https://res.cloudinary.com/dug9vpon2/image/upload/v1698733302/Insta_share_logo_vlehyi.png"
          alt="website logo"
        />
        <h1>Insta Share</h1>
      </Link>

      <div className="nav-container">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search Caption"
            value={searchValue}
            onChange={handleOnChange}
          />
          <button
            type="button"
            aria-label="search"
            testid="searchIcon"
            onClick={fetchSearchResults}
          >
            <FaSearch />
          </button>
        </div>
        <ul className="menu-items-container">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/my-profile">Profile</Link>
          </li>
        </ul>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  searchValue: PropTypes.string,
  handleSearchValue: PropTypes.func,
  fetchSearchResults: PropTypes.func,
};
