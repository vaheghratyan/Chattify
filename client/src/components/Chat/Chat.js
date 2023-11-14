/**
 * Chat component
 *
 * @author Kratyan V.A.
 * @private
 */

import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import Axios from "axios";
import "./Chat.css";

require("dotenv").config();

/**
 * socket.io instance
 */
let socket = io();

/**
 * Function based Chat component
 * @param {location} string
 */
const Chat = ({ location }) => {
  /**
   * User name
   */
  const [name, setName] = useState("");

  /**
   * Room name
   */
  const [room, setRoom] = useState("");

  /**
   * User google acc image url
   */
  const [photo, setPhoto] = useState("");

  /**
   * User google acc specific ID
   */
  const [googleId, setGoogleId] = useState("");

  /**
   * Message text after input
   */
  const [message, setMessage] = useState("");

  /**
   * Current room messages
   */
  const [messages, setMessages] = useState([]);

  /**
   * Endpoint for requests
   */
  const ENDPOINT = "localhost:5000";

  /**
   * Lifecycle hook for getting our room messages from database
   */
  useEffect(() => {
    const { name, room, photo, googleId } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    setPhoto(photo);
    setGoogleId(googleId);

    socket.emit("join", { name, room, photo }, (error) => {
      try {
        Axios.get(`http://localhost:5000/messages/${room}`).then((response) => {
          setMessages(response.data);
        });
      } catch (err) {
        alert(err);
      }
    });
  }, [ENDPOINT, location.search]);

  /**
   * Lifecycle hook for receiving messages from different socket instances (users)
   */
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  /**
   * Function for saving our messages in database
   * @param {event} Event
   */
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      try {
        Axios.post("http://localhost:5000/messages", {
          text: message,
          authorId: googleId,
          time: new Date(),
        });
      } catch (err) {
        console.log(err);
      }

      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="chat">
      <InfoBar room={room} photo={photo} />
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
