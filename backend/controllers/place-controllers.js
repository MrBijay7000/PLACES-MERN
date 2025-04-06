/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const bodyParser = require("body-parser");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    throw new HttpError(
      "Could not find a places for the provided user id.",
      404
    );
  }
  res.json({ places });
};

const createPlace = async (req, res, nest) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = {
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ palce: updatedPlace, message: "Place Updated" });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Place deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
