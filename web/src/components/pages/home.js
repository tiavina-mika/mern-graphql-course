import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {
        color: 'red',
        fontSize: 20
    }
})

const Home = () => {
    const classes = useStyles();
    return (
        <Box display="flex">
            <Typography className={classes.text}>
                Home
            </Typography>
        </Box>
    )
}

export default Home;


