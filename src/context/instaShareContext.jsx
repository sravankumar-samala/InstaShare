import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useReducer, createContext, useContext, useCallback } from "react";

const InstaShareContext = createContext();

const initialState = {
  // isLightTheme: localStorage.getItem("isLightTheme") !== "false",
  searchValue: "",
  searchResults: [],
  searchResultsPending: false,
  searchError: true,
  isNavExpanded: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setSearchValue":
      return { ...state, searchValue: action.payload.value };
    case "setSearchResults":
      return { ...state, searchResults: action.payload.data };
    case "searchPending":
      return { ...state, searchResultsPending: action.payload.pending };
    case "setSearchError":
      return { ...state, searchError: action.payload.error };
    case "setIsNavExpanded":
      return { ...state, isNavExpanded: action.payload.toggle };
    default:
      throw new Error("Unknown action");
  }
};

function InstaShareContextProvider({ children }) {
  const [
    {
      searchValue,
      searchResults,
      searchResultsPending,
      searchError,
      isNavExpanded,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleDispatch = (type, payload) => dispatch({ type, payload });

  const toggleNavExpanded = () =>
    handleDispatch("setIsNavExpanded", { toggle: !isNavExpanded });

  // +++++++++++ Fetch search results function +++++++++++++
  const getSearchResults = useCallback(async () => {
    handleDispatch("searchPending", { pending: true });
    const searchApi = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(searchApi, options);
      const data = await response.json();
      if (!response.ok) throw new Error(data.err_msg);
      handleDispatch("setSearchResults", { data: data.posts });
      handleDispatch("setSearchError", { error: false });
    } catch (error) {
      console.log(error.message);
      handleDispatch("setSearchError", { error: false });
    } finally {
      handleDispatch("searchPending", { pending: false });
    }
  }, [searchValue]);

  return (
    <InstaShareContext.Provider
      value={{
        searchValue,
        searchResults,
        searchResultsPending,
        getSearchResults,
        searchError,
        isNavExpanded,
        toggleNavExpanded,
        handleDispatch,
      }}
    >
      {children}
    </InstaShareContext.Provider>
  );
}

InstaShareContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useInstaShareContext() {
  const context = useContext(InstaShareContext);
  if (context === undefined)
    throw new Error("Context was used outside the Context Provider.");
  return context;
}

export { useInstaShareContext, InstaShareContextProvider };
