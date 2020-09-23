import React, { Fragment } from "react";
import "../App.css";
import useDiscoverMovies from "../API/Movies";
import apiStates from "../API/apiStates";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '2vh'
  },
  container_list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  }
});

const PostList = () => {
  const classes = useStyles();
  const { state, error, data } = useDiscoverMovies();
  switch (state) {
    case apiStates.ERROR:
      return <p>ERROR: {error || "General error"}</p>;
    case apiStates.SUCCESS:
      return (
        <Fragment>
          <ul className={classes.container_list} >
            {data.results.map(element => (
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w300${element.poster_path}`}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {element.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {element.overview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ul>
        </Fragment>
      );
    default:
      return <p>loading..</p>;
  }
};

function Home() {
  return (
    <div className="App-header">
      <PostList />
    </div>
  );
}

export default Home;
