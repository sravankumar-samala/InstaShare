import { useInstaShareContext } from "../context/instaShareContext";
import { useEffect } from "react";
import SearchNotFound from "../components/searchNotFoundView";
import FailureView from "../components/failureView";
import LoadingView from "./loader";
import PostItem from "./postItem";

export default function SearchResults() {
  const {
    searchValue,
    searchError,
    searchResults,
    searchResultsPending,
    getSearchResults,
  } = useInstaShareContext();

  useEffect(() => {
    if (!searchValue) {
      getSearchResults();
    }
  }, []);

  return (
    <div className="search-results-container">
      <div className="search-container py-10">
        <h1 className="hidden sm:block font-medium text-2xl text-center my-5">
          Search Results
        </h1>
        {searchResultsPending ? (
          <LoadingView />
        ) : (
          <>
            {searchError ? (
              <FailureView fetchData={getSearchResults} />
            ) : (
              <ul className="grid justify-items-center gap-5">
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
    </div>
  );
}
