const express = require("express");
const { check } = require("express-validator");

const podcastsControllers = require("../controllers/podcasts-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", podcastsControllers.getPodcastById);

router.get("/user/:uid", podcastsControllers.getPodcastsByUserId);

router.use(checkAuth);

router.post("/", podcastsControllers.createPodcast);

router.patch(
  "/:pid",
  // [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  podcastsControllers.updatePodcast
);

router.delete("/:pid", podcastsControllers.deletePodcast);

module.exports = router;
