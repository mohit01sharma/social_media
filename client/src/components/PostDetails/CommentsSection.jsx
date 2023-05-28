import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentsSection = ({ post }) => {

    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();


    const user = JSON.parse(localStorage.getItem('profile'));


    const handleClick = () => {
        const finalComment = `${user.result.name}: ${comment}`;
        setComments(prevValue => [finalComment, ...prevValue]);
        dispatch(commentPost({ finalComment }, post._id));
        console.log(post?.comments);
        setComment('');

    }



    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {
                    comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))

                }

            </div>
            {user && (
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                    <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>Comment</Button>
                </div>
            )}

        </div>
    )
}

export default CommentsSection;