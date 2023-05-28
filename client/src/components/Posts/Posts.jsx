import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core'

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    // const s = useSelector((state) => state);
    // console.log(s);
    const { posts, isLoading } = useSelector((state) => state.posts)
    console.log(posts);
    const classes = useStyles();

    if (!posts.length && !isLoading) return 'No posts';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} isRecommended={false} />
                    </Grid>
                ))}

            </Grid>
        )
    )
}

export default Posts