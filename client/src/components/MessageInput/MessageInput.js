import React, {useEffect} from "react";
import autosize from 'autosize';
import "./MessageInput.css";

var textarea;
var form;
const MessageInput = (props) => {
    
    useEffect(() => {
        textarea = document.querySelector('textarea');
        autosize(textarea);
    },[]);

    function handleSubmit(event) {
        event.preventDefault();

        if (event.target.value !== "") {
          props.sendMessage(event.target.value);
          props.setMessage("");
          textarea.value="";
          autosize.update(textarea);
        }
    }

    function onEnterPress(e) {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          handleSubmit(e);
        }
      }

    return (
    <form
      ref={el => form = el}
      className="message-input-container"
      onSubmit={(event) => handleSubmit(event)}
    >
      <textarea
        className="message-input-input"
        placeholder="Entrez votre message"
        type="text"
        rows="1"
        value={props.message}
        maxLength="1024"
        onChange={(event) => {
          event.preventDefault();
          props.setMessage(event.target.value);
        }}
        onKeyDown={(event) => onEnterPress(event)}
      />
      <button className="message-input-button" type="submit">
        ✔️
      </button>
    </form>
  );
};

export default MessageInput;
