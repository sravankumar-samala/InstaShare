import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useInstaShareContext } from "../context/instaShareContext";

export default function LargeScreenNavItems({
  goToSearchResults,
  handleSearchValue,
  handleLogout,
}) {
  const { searchValue } = useInstaShareContext();

  return (
    <nav className="flex items-center gap-5 text-lg">
      <form
        onSubmit={goToSearchResults}
        className="flex border border-gray-500 rounded-md overflow-hidden"
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
      <ul className="menu-items flex gap-5">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
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
  );
}

LargeScreenNavItems.propTypes = {
  goToSearchResults: PropTypes.func,
  handleSearchValue: PropTypes.func,
  handleLogout: PropTypes.func,
};
