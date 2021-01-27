import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: "100%"
    },
    media: {
        height: 140,
    },
});

function SearchCard({ data }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea componenet={RouterLink} to={`/artists/${data.artistName}/${data._id}`}>
                <CardMedia
                    className={classes.media}
                    image={data.avatar}
                />
                <CardContent>
                    <Typography className="artist-name" gutterBottom variant="h5" component="h2">
                        { data.artistName }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default SearchCard;