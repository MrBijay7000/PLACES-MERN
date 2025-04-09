import React, { useRef } from "react";

import "./ImageUpload.css";
import Button from "./Button";

export default function ImageUpload(props) {
  const filePickerRef = useRef();

  function pickedHandler(event) {
    console.log(event.target);
  }

  function pickImageHandler() {
    filePickerRef.current.click();
  }

  return (
    <div className="form-input">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className=" image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
}
