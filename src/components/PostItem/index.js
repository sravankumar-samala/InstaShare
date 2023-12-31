import {useState} from 'react'
import {FaRegHeart, FaRegComment, FaHeart} from 'react-icons/fa'
import {IoMdShare} from 'react-icons/io'
import './index.css'

export default function PostItem({postObject}) {
  const [isLiked, setIsLiked] = useState(false)

  const {postDetails} = postObject

  const {caption, imageUrl} = postDetails

  const toggleLike = () => setIsLiked(prev => !prev)

  return (
    <div className="post-item-container">
      <div className="user-profile-details">
        <div className="profile-pic-container">
          <img src={postObject.profilePic} alt="profile" />
        </div>
        <p>{postObject.userName}</p>
      </div>
      <div className="post-image-container">
        <img src={imageUrl} alt="post" />
      </div>
      <div className="post-details-container">
        <div className="post-reactions">
          <button
            type="button"
            className="reaction-btn"
            aria-label="like"
            onClick={toggleLike}
          >
            {isLiked ? <FaHeart className="like" /> : <FaRegHeart />}
          </button>
          <button type="button" className="reaction-btn" aria-label="comment">
            <FaRegComment />
          </button>
          <button type="button" className="reaction-btn" aria-label="share">
            <IoMdShare />
          </button>
        </div>
        <div className="post-details-data">
          <p className="likes-count">{postObject.likesCount} likes</p>
          <p>{caption}</p>
          <DisplayComent comments={postObject.comments} />
          <p className="post-date">{postObject.createdAt}</p>
        </div>
      </div>
    </div>
  )
}

const DisplayComent = ({comments}) =>
  comments.map(each => (
    <p className="comment" key={each.userId}>
      <span className="commented-user-name">{each.userName}</span>{' '}
      {each.comment}
    </p>
  ))
