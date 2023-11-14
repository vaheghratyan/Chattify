/**
 * Input component
 *
 * @author Kratyan V.A.
 * @private
 */

import React from "react";
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon";
import TelegramIcon from "@material-ui/icons/Telegram";
import MicIcon from "@material-ui/icons/Mic";
import "./Input.css";

/**
 * Function based Input component
 * @param {message} string
 * @param {setMessage} Function
 * @param {sendMessage} Function
 */
const Input = ({ message, setMessage, sendMessage }) => (
  <div className="footer">
    <InsertEmotionIcon />
    <form>
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
    </form>
    <MicIcon />
    <button
      className="sendButton"
      onClick={(event) => sendMessage(event)}
      value=""
    >
      <div className="sendIcon">
        <TelegramIcon className="telegramIcon" />
      </div>
    </button>
  </div>
);

export default Input;
