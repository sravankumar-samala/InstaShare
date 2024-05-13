/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
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
          <BsHeart size={18} />
        </button>
      ) : (
        <button
          className="dislike-btn"
          type="button"
          testid="unLikeIcon"
          aria-label="disLike"
          onClick={decrementLikesCount}
        >
          <BsHeartFill size={18} fill="#F44336" />
        </button>
      )}
    </>
  );
}

LikeIcon.propTypes = {
  handlePostsLikes: PropTypes.func.isRequired,
};
