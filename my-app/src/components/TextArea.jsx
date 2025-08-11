import { useState } from "react";

function TextArea(props) {
  return (
    <div>
      <textarea
        rows="10"
        cols="55"
        placeholder="Your Note"
        value={props.textState} // show the state value
        onChange={(e) => props.setText(e.target.value)} // update state
      ></textarea>
    </div>
  );
}

export default TextArea;
