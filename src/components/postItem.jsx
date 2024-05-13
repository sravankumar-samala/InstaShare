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
    <li className="border-2 max-w-[360px] grid rounded-md bg-white shadow-sm">
      <div className="flex gap-2 items-center px-5 py-4">
        <div className="w-10 p-[2px] bg-gradient-to-r from-[#e20337] to-[#7800c3] rounded-full">
          <img
            className="max-w-full rounded-full border-2 border-white"
            src={postObj.profile_pic}
            alt="post author profile"
          />
        </div>

        <p className="font-medium">
          <Link to={`/users/${postObj.user_id}`}>{postObj.user_name} </Link>
        </p>
      </div>
      <img
        src={postObj.post_details.image_url}
        alt="post"
        className="justify-self-center"
      />
      <div className="px-5 py-4">
        <div className="flex items-center gap-3 mb-3">
          <LikeIcon handlePostsLikes={handlePostsLikes} />
          <FaRegComment size={18} />
          <BiShareAlt size={18} />
        </div>

        <p className="font-medium">{`${likesCount} likes`}</p>
        <p className="mb-3">{postObj.post_details.caption}</p>

        {postObj.comments?.map((comment) => (
          <p key={comment.user_id}>
            {/* this span should be bold in font  */}
            <span className="font-medium mr-2">{comment.user_name}</span>
            {comment.comment}
          </p>
        ))}
        <p className="text-gray-500">{postObj.created_at}</p>
      </div>
    </li>
  );
}

PostItem.propTypes = {
  postObj: PropTypes.any.isRequired,
};
