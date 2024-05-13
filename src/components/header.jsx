import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";
import { FaSearch } from "react-icons/fa";
import { useInstaShareContext } from "../context/instaShareContext";
import LargeScreenNavItems from "./largeScreenNavItems";
import SmallScreenNavItems from "./smallScreenNavItems";

export default function Header({ goToSearchResults }) {
  const { handleDispatch, searchValue, toggleNavExpanded, isNavExpanded } =
    useInstaShareContext();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleSearchValue = (event) => {
    const value = event.target.value;
    handleDispatch("setSearchValue", { value });
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className="bg-white max-w-[1028px] py-5 mx-auto">
      <div className="flex justify-between items-center relative">
        <NavLink to="/" className="logo flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dug9vpon2/image/upload/v1698733302/Insta_share_logo_vlehyi.png"
            alt="website logo"
          />
          <h1>Insta Share</h1>
        </NavLink>
        {!isSmallScreen ? (
          <LargeScreenNavItems
            handleLogout={handleLogout}
            goToSearchResults={goToSearchResults}
            handleSearchValue={handleSearchValue}
          />
        ) : (
          <SmallScreenNavItems handleSearchValue={handleSearchValue} />
        )}

        {isSmallScreen && (
          <div className="text-2xl z-20">
            {isNavExpanded ? (
              <button type="button" onClick={toggleNavExpanded}>
                <RxCross2 />
              </button>
            ) : (
              <button type="button" onClick={toggleNavExpanded}>
                <FiMenu />
              </button>
            )}
          </div>
        )}
      </div>

      {isSmallScreen && path === "/search-results" && (
        <form
          onSubmit={goToSearchResults}
          className="w-fit mt-4 mx-auto flex border border-gray-500 rounded-md overflow-hidden"
        >
          <input
            className="px-1 text-md max-w-48"
            type="search"
            placeholder="Search Caption"
            value={searchValue}
            onChange={handleSearchValue}
          />
          <button
            className="bg-gray-500 px-3 py-[6px] text-white"
            type="submit"
            onClick={goToSearchResults}
          >
            <FaSearch />
          </button>
        </form>
      )}
    </div>
  );
}

Header.propTypes = {
  goToSearchResults: PropTypes.func,
};
