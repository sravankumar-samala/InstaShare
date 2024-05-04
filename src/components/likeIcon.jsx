/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import PropTypes from "prop-types";

export default function LikeIcon({ handlePostsLikes }) {
  const [isLiked, setIsLiked] = useState(false);
  const incrementLikesCount = () => {
    handlePostsLikes("addLike");
    setIsLiked(true);
  };
  const decrementLikesCount = () => {
    handlePostsLikes("removeLike");
    setIsLiked(false);
  };

  return (
    <>
      {!isLiked ? (
        <button
          type="button"
          testid="likeIcon"
          aria-label="like"
          onClick={incrementLikesCount}
        >
          <BsHeart />
        </button>
      ) : (
        <button
          className="dislike-btn"
          type="button"
          testid="unLikeIcon"
          aria-label="disLike"
          onClick={decrementLikesCount}
        >
          <FcLike />
        </button>
      )}
    </>
  );
}

LikeIcon.propTypes = {
  handlePostsLikes: PropTypes.func.isRequired,
};
