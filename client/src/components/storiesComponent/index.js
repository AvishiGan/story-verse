import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Story from "../storyComponent";
import useStyles from "./styles";

const Stories = ({ setCurrentId }) => {
  const stories = useSelector((state) => state.stories);
  const classes = useStyles();

  return !stories.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {stories.map((story) => (
        <Grid key={story._id} item xs={12} sm={6} md={6}>
          <Story story={story} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Stories;
