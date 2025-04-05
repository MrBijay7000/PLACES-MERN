/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "HAHAHA",
    description: "HAHAHAHAHAHAHA",
    imageUrl:
      "https://i.pinimg.com/736x/2b/41/dc/2b41dca6ed3a700a2acc5124707cbce7.jpg",
    address: "ONE PUNCH",
    location: {
      lat: 40.7,
      lng: -73.7,
    },
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place });
});

module.exports = router;
