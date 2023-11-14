/**
 * Messages component
 *
 * @author Kratyan V.R.
 * @private
 */

import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";
import "./Messages.css";

/**
 * Function based Messages component
 * @param {messages} object[]
 * @param {name} string
 */
const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
