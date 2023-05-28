import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid, Paper, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const query = useQuery();
    //read page parameter from url;
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);



    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }

    }

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }
        else {
            navigate('/');
        }
    }

    return (
        <div><Grow in>
            <Container maxwidth="xl">
                <Grid classes={classes.gridContainer} justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </Grow></div>
    )
}

export default Home