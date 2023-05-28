import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles'
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

const Navbar = () => {

    const classes = useStyles();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar>
                {user ? (
                    <div className={classes.toolbar}>
                        <Avatar className={classes.purple} alt={user.result} src={user.result.name.charAt(0)} />

                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>

                    </div>
                ) : (<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>)}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar