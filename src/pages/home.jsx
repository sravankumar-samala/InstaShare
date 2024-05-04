/* eslint-disable react/no-unknown-property */
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import LoadingView from "../components/loader";
import Header from "../components/header";
import SliderStories from "../components/slider";
import PostItem from "../components/postItem";
import HomeRequestFailureView from "../components/homeRequestsFailureView";
import SearchNotFound from "../components/searchNotFoundView";
import FailureView from "../components/searchErrorView";

// function formatStoryName(string) {
//   const newString = string.split(' ').join('_').slice(0, 12)
//   return `${newString}...`
// }

export default function Home() {
  const [usersStories, setUsersStories] = useState(null);
  const [usersStoriesPending, setUsersStoriesPending] = useState(false);
  const [posts, setPosts] = useState(null);
  const [postsPending, setPostsPending] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchResultsPending, setSearchResultsPending] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (e) => setSearchValue(e.target.value);

  //   Stories
  const fetchStories = useCallback(async () => {
    setUsersStoriesPending(true);
    const storiesApiUrl = "https://apis.ccbp.in/insta-share/stories";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(storiesApiUrl, options);
      const fetchedData = await response.json();
      if (!response.ok) throw new Error(fetchedData.error_msg);
      setUsersStories(fetchedData.users_stories);
    } catch (err) {
      console.log(err.message);
    } finally {
      setUsersStoriesPending(false);
    }
  }, []);

  //   Posts
  const fetchPosts = useCallback(async () => {
    setPostsPending(true);
    const postsApiUrl = "https://apis.ccbp.in/insta-share/posts";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(postsApiUrl, options);
      const fetchedData = await response.json();
      if (!response.ok) throw new Error(fetchedData.error_msg);
      setPosts(fetchedData.posts);
    } catch (err) {
      console.log(err.message);
    } finally {
      setPostsPending(false);
    }
  }, []);

  //   Search Results fetching
  const getSearchResults = useCallback(async () => {
    setSearchResultsPending(true);
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
      setSearchResults(data.posts);
    } catch (error) {
      console.log(error.message);
    } finally {
      setSearchResultsPending(false);
    }
  }, [searchValue]);

  const fetchSearchResults = () => {
    setShowSearchResults(true);
    getSearchResults();
  };
  //   End of search Fetch

  useEffect(() => {
    if (showSearchResults) setShowSearchResults(false);
    fetchStories();
    fetchPosts();
  }, [fetchPosts, fetchStories, showSearchResults]);

  return (
    <div className="home-page-container">
      <Header
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
        fetchSearchResults={fetchSearchResults}
      />
      {showSearchResults ? (
        <div className="search-container">
          <h1>Search Results</h1>
          {searchResultsPending ? (
            <LoadingView />
          ) : (
            <>
              {searchResults === null ? (
                <FailureView fetchAgain={getSearchResults} />
              ) : (
                <ul>
                  {searchResults.length !== 0 ? (
                    searchResults?.map((each) => (
                      <PostItem key={each.post_id} postObj={each} />
                    ))
                  ) : (
                    <SearchNotFound />
                  )}
                </ul>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="slider-container">
            {usersStoriesPending ? (
              <LoadingView />
            ) : (
              <>
                {usersStories === null ? (
                  <HomeRequestFailureView fetchData={fetchStories} />
                ) : (
                  <SliderStories usersStories={usersStories} />
                )}
              </>
            )}
          </div>
          {postsPending ? (
            <LoadingView />
          ) : (
            <>
              {posts === null ? (
                <HomeRequestFailureView fetchData={fetchPosts} />
              ) : (
                <ul>
                  {posts?.map((each) => (
                    <PostItem key={each.post_id} postObj={each} />
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
