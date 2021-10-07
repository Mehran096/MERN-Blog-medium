import React from 'react'
import moment from 'moment'
import { BsTrashFill } from "react-icons/bs";
const Comments = ({ comments, deleteComment }) => {
    return (
        
            comments.length > 0 ? comments.map(comment => (
                <div key = {comment._id} className="commentSection">
                <div className="post__header">
                <div className="post__header__avator">
                    {comment.userName ? comment.userName[0] : ''}
                </div>
                <div className="post__header__user">
                    <span>{comment.userName}</span>
                    <span>{moment(comment.updatedAt).format("MMM Do YY")}</span>
                </div>
            </div> 
            <div className="comment__body">
            {comment.comment}
            <BsTrashFill onClick = {() => deleteComment(comment._id)}  className="icon" />
            </div>
            
            </div>
            ))
           
            : 'No Comments'
        
    ) 

    
}

export default Comments
