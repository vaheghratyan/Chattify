/**
 * Message component
 *
 * @author Igityan V.A.
 * @private
 */

import React from "react";
import "./Message.css";

/**
 * Function based Chat component
 * @param {message} object
 */
const Message = ({ message: { text, user, time, photo }, name }) => {
  /**
   * Checks if message was sent by current user
   */
  let isSentByCurrentUser = false;

  /**
   * User trimmed name
   */
  const trimmedName = name.trim();

  const setMessageType = () => {
    switch (user) {
      case "admin":
        return (
          <div className="messageContainer justifyCenter admin-message">
            {text}
          </div>
        );

      default:
        return (
          <div className="messageContainer justifyStart">
            <div>
              <div className="sentText pl-10">{user}</div>
              <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{text}</p>
                <div className="messageTime colorDark">
                  <p>{time}</p>
                </div>
              </div>
              <img src={photo} alt="Profile" className="profileImage" />
            </div>
          </div>
        );
    }
  };

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
        <div className="messageTime">
          <p>{time}</p>
        </div>
      </div>
    </div>
  ) : (
    setMessageType()
  );
};

export default Message;
