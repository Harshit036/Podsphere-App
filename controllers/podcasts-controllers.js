const fs = require("fs");

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Podcast = require("../models/podcast");
const User = require("../models/user");

const getUserId = async (req, res, next) => {
  const { email } = req.body.email;
  let user;
  try {
    user = await User.find({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Creating podcast failed, please try again.",
      500
    );
    return next(error);
  }

  res.json(user);
};

const getPodcastsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let podcasts;
  let userWithPodcasts;
  try {
    userWithPodcasts = await User.findById(userId).populate("podcasts");
  } catch (err) {
    const error = new HttpError(
      "Fetching podcasts failed, please try again later.",
      500
    );
    return next(error);
  }

  // if (!podcasts || podcasts.length === 0) {
  if (!userWithPodcasts || userWithPodcasts.podcasts.length === 0) {
    return next(
      new HttpError("Could not find podcasts for the provided user id.", 404)
    );
  }

  res.json({
    podcasts: userWithPodcasts.podcasts.map((podcast) =>
      podcast.toObject({ getters: true })
    ),
  });
};

const createPodcast = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, artist, song, img, userId } = req.body;

  const createdPodcast = new Podcast({
    title: name,
    artist: artist,
    image: img,
    audio: song,
    playback: 0,
    likes: 0,
    creator: userId,
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Creating podcast failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  console.log("Create Podcast -> ", user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPodcast.save({ session: sess });
    user.podcasts.push(createdPodcast);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating podcast failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ podcast: createdPodcast });
};

const updatePodcast = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description } = req.body;
  const podcastId = req.params.pid;

  let podcast;
  try {
    podcast = await Podcast.findById(podcastId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update podcast.",
      500
    );
    return next(error);
  }

  if (podcast.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to edit this podcast.",
      401
    );
    return next(error);
  }

  podcast.title = title;
  podcast.description = description;

  try {
    await podcast.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update podcast.",
      500
    );
    return next(error);
  }

  res.status(200).json({ podcast: podcast.toObject({ getters: true }) });
};

const deletePodcast = async (req, res, next) => {
  const podcastId = req.params.pid;

  let podcast;
  try {
    podcast = await Podcast.findById(podcastId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete podcast.",
      500
    );
    return next(error);
  }

  if (!podcast) {
    const error = new HttpError("Could not find podcast for this id.", 404);
    return next(error);
  }

  if (podcast.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this podcast.",
      401
    );
    return next(error);
  }

  const imagePath = podcast.image;
  const audioPath = podcast.audio;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await podcast.remove({ session: sess });
    podcast.creator.podcasts.pull(podcast);
    await podcast.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete podcast.",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });
  fs.unlink(audioPath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted podcast." });
};

exports.getUserId = getUserId;
exports.getPodcastsByUserId = getPodcastsByUserId;
exports.createPodcast = createPodcast;
exports.updatePodcast = updatePodcast;
exports.deletePodcast = deletePodcast;
