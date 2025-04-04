import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";

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

export default function UpdatePlacePage() {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifierPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifierPlace) {
      setFormData(
        {
          title: {
            value: identifierPlace.title,
            isValid: true,
          },
          description: {
            value: identifierPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifierPlace]);

  function placeUpdateSubmitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
  }

  if (!identifierPlace) {
    return (
      //   <div className="center">
      //     <h2>Could not find place!</h2>
      //   </div>
      <div className="place-list center">
        <Card className="no-places">
          <p>Could not find place!</p>
          {/* <button className="share-place-btn">Share Place</button> */}
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="place-list center">
        <Card className="no-places">
          <p>Loading....</p>
          {/* <button className="share-place-btn">Share Place</button> */}
        </Card>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (Atleast 5 Characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}
