// import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useInstaShareContext } from "../context/instaShareContext";

export default function SmallScreenNavItems({ handleLogout }) {
  const { isNavExpanded, toggleNavExpanded } = useInstaShareContext();

  return (
    <>
      <nav
        className={`p-5 w-48 flex flex-col items-center gap-5 text-xl absolute top-full right-0 backdrop-blur-lg bg-white/40 shadow-xl font-medium rounded-lg ${
          isNavExpanded
            ? "translate-x-0 duration-300"
            : "translate-x-[120%] duration-300"
        } z-10`}
      >
        <ul className="menu-items flex flex-col gap-5 ">
          <li onClick={toggleNavExpanded}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={toggleNavExpanded}>
            <NavLink to="/search-results">Search</NavLink>
          </li>
          <li onClick={toggleNavExpanded}>
            <NavLink to="/my-profile">Profile</NavLink>
          </li>
        </ul>
        <button
          type="button"
          className="px-4 text-md bg-blue-500 text-white rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      {isNavExpanded && (
        <div
          className="fixed top-0 bottom-0 w-screen"
          onClick={toggleNavExpanded}
        ></div>
      )}
    </>
  );
}

SmallScreenNavItems.propTypes = {
  //   goToSearchResults: PropTypes.func,
  //   handleSearchValue: PropTypes.func,
  handleLogout: PropTypes.func,
};
