import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles, IconButton } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    typographyStyle: {
        flex: 1
    }
}))

const Header = (props) => {
    const classes = useStyles()

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.typographyStyle}>Les Bons Artisans</Typography>
                <IconButton onClick={props.openAddDialog}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header