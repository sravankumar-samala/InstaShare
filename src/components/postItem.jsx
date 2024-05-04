/* eslint-disable react/no-unknown-property */
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import LikeIcon from "./likeIcon";

export default function PostItem({ postObj }) {
  const [likesCount, setLikesCount] = useState(postObj.likes_count);

  const handlePostsLikes = useCallback(
    async (change) => {
      const likeUrl = `https://apis.ccbp.in/insta-share/posts/${postObj.post_id}/like`;
      const jwtToken = Cookies.get("jwt_token");
      const likeStatus = { like_status: change === "addLike" };
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(likeStatus),
      };

      try {
        const response = await fetch(likeUrl, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.err_msg);
        console.log(data);
        setLikesCount(change === "addLike" ? likesCount + 1 : likesCount - 1);
      } catch (error) {
        console.log(error.message);
      }
    },
    [postObj.post_id, likesCount]
  );

  return (
    <li>
      <img src={postObj.post_details.image_url} alt="post" />
      <p>{postObj.post_details.caption}</p>
      <img src={postObj.profile_pic} alt="post author profile" />

      <p>
        <Link to={`/users/${postObj.user_id}`}>{postObj.user_name} </Link>
      </p>
      <p>{`${likesCount} likes`}</p>
      <LikeIcon handlePostsLikes={handlePostsLikes} />
      <FaRegComment />
      <BiShareAlt />
      {postObj.comments?.map((comment) => (
        <p key={comment.user_id}>
          {/* this span should be bold in font  */}
          <span>{comment.user_name}</span>
          {comment.comment}
        </p>
      ))}
      <p>{postObj.created_at}</p>
    </li>
  );
}

PostItem.propTypes = {
  postObj: PropTypes.any.isRequired,
};
