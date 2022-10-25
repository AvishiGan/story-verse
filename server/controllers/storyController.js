import mongoose from "mongoose";

import StoryModel from "../models/storyModel.js";

export const getStories = async (req, res) => {
  try {
    const storyMessages = await StoryModel.find();

    res.status(200).json(storyMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStory = async (req, res) => {
  const { id } = req.params;

  try {
    const story = await StoryModel.findById(id);

    res.status(200).json(story);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStory = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newStoryMessage = new StoryModel({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });

  try {
    await newStoryMessage.save();

    res.status(201).json(newStoryMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateStory = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No story with id: ${id}`);

  const updatedStory = { creator, title, message, tags, selectedFile, _id: id };

  await StoryModel.findByIdAndUpdate(id, updatedStory, { new: true });

  res.json(updatedStory);
};

export const deleteStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No story with id: ${id}`);

  await StoryModel.findByIdAndRemove(id);

  res.json({ message: "Story deleted successfully." });
};
