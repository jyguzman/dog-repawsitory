import { makeStyles, Grid, Typography, Paper, CardMedia } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
		marginTop: "25px"
	},
	title: {
	  flexGrow: 1
	},
	media: {
		maxHeight: 400,
		maxWidth: 400,
        borderRadius: "15px",
        border: "black solid"
	},
    greeting: {
        marginTop: "75px",
        padding: "15px",
        borderRadius: "15px",
    }
}));

const Greeting = () => {
    const classes = useStyles();
    return (
        <Paper elevation={4} className={classes.greeting}>
				<Grid item container direction="column" justify="center" alignItems="center" spacing={2} >
                    <Grid item>
                        <Typography>
                            Search for images of your favorite breeds! <br></br> Sign up or log in to save your favorites.
                        </Typography>	
                    </Grid>	
						<Grid item>
							<CardMedia className={classes.media} 
								component="img"
								src={"dog.jpg"}
							/>
						</Grid>
				</Grid>
		</Paper>
    );
};

export default Greeting;