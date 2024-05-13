/* eslint-disable react/no-unknown-property */
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import LoadingView from "../components/loader";
import SliderStories from "../components/slider";
import PostItem from "../components/postItem";
import FailureView from "../components/failureView";

export default function Home() {
  const [usersStories, setUsersStories] = useState(null);
  const [usersStoriesPending, setUsersStoriesPending] = useState(false);
  const [posts, setPosts] = useState(null);
  const [postsPending, setPostsPending] = useState(false);

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

  useEffect(() => {
    fetchStories();
    fetchPosts();
  }, []);

  return (
    <div className="home-page-container">
      <div className="slider-container min-h-[100px]">
        {usersStoriesPending ? (
          <LoadingView />
        ) : (
          <>
            {usersStories === null ? (
              <FailureView homePage={true} fetchData={fetchStories} />
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
            <FailureView homePage={true} fetchData={fetchPosts} />
          ) : (
            <ul className="grid justify-items-center gap-5">
              {posts?.map((each) => (
                <PostItem key={each.post_id} postObj={each} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
