import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { createStory, updateStory } from "../../actions/stories";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [storyData, setStoryData] = useState({
    creator: "",
    title: "",
    message: "",
    selectedFile: "",
  });
  const story = useSelector((state) =>
    currentId
      ? state.stories.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (story) setStoryData(story);
  }, [story]);

  const clear = () => {
    setCurrentId(0);
    setStoryData({
      creator: "",
      title: "",
      message: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createStory(storyData));
      clear();
    } else {
      dispatch(updateStory(currentId, storyData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${story.title}"` : "Creating a Story"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={storyData.creator}
          onChange={(e) =>
            setStoryData({ ...storyData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={storyData.title}
          onChange={(e) =>
            setStoryData({ ...storyData, title: e.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={storyData.message}
          onChange={(e) =>
            setStoryData({ ...storyData, message: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setStoryData({ ...storyData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
