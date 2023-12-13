import { useEffect, useState } from 'react';
import { message } from 'antd';
import avatarIcon from "/src/assets/avatar.png";
import PropTypes from 'prop-types';
import { handleGetCommentsByRecipeId } from "../../action/recipesAction";

const Comment = ({ comments }) => {
    // useEffect(() => {
    //     const fetchComments = async () => {
    //         try {
    //             const result = await handleGetCommentsByRecipeId(recipeId);

    //             if (result.success === true) {
    //                 setComments(result.comments);
    //             } else {
    //                 message.error(result.message);
    //             }
    //         } catch (err) {
    //             console.log(err);
    //             message.error('Failed to get comments');
    //         }
    //     };

    //     fetchComments();
    // }, [recipeId]);

    return (
        <div>
            <ul>
                {comments && comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="mb-2 flex">
                            <img
                                src={avatarIcon}
                                alt="Avatar"
                                className="h-8 w-8 rounded-full mr-3 mt-1"
                            />
                            <div>
                                <p className="font-bold">{comment.user_id.name}</p>
                                <p>{comment.content}</p>

                            </div>
                        </div>
                    ))
                ) : (
                    <li>No comments available.</li>
                )}
            </ul>
        </div>
    );
};

// Comment.propTypes = {
//     recipeId: PropTypes.string.isRequired,
// };

export default Comment;

