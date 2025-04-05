/* eslint-disable no-undef */

const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }
  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    throw new HttpError(
      "Could not find a place for the provided user id.",
      404
    );
  }
  res.json({ place });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
