/**
 * Join component
 *
 * @author Kratyan V.A.
 * @private
 */

import React, { useState } from "react";
import GoogleLogo from "../../resources/GoogleLogo.png";
import AppLogo from "../../resources/AppLogo.png";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Join.css";

/**
 * Function based Join component
 */
const Join = () => {
  /**
   * User google account photo url
   */
  const [photo, setPhoto] = useState("");

  /**
   * User name
   */
  const [name, setName] = useState("");

  /**
   * Room name
   */
  const [room, setRoom] = useState("");

  /**
   * User google acc specific ID
   */
  const [googleId, setGoogleId] = useState("");

  /**
   * Checking if user logged in successfully
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * In case if login failed
   */
  const failToLogIn = () => {
    alert("Failed to log in!");
  };

  /**
   * Adding new room
   */
  const addRoom = (event) => {
    if (!name || !room) event.preventDefault();
    try {
      Axios.post("http://localhost:5000/user", { googleId, name });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Specific function if user loged into google acc successfully
   */
  const responseGoogle = (response) => {
    setIsLoggedIn(true);
    setPhoto(response.profileObj.imageUrl);
    setName(response.profileObj.name);
    setGoogleId(response.googleId);
  };

  return (
    <div className="cont">
      <div className="sign-in">
        <h2>Chattify</h2>
        <img className="appLogo" src={AppLogo} alt="Chattify" />
        {isLoggedIn && (
          <div className="block">
            <div className="join">
              <input
                placeholder="Room"
                className="textInput"
                type="text"
                onChange={(event) => setRoom(event.target.value)}
              />
              <input
                placeholder="Password"
                className="textInput"
                type="password"
              />
              <Link
                onClick={(event) => addRoom(event)}
                to={`/chat?name=${name}&room=${room}&photo=${photo}&googleId=${googleId}`}
              >
                <input
                  className="signinButton mt-20"
                  type="submit"
                  value="Join"
                />
              </Link>
            </div>
          </div>
        )}
        {isLoggedIn === false && (
          <div className="signInBlock">
            <div>
              <img src={GoogleLogo} alt="Google Login" />
            </div>
            <GoogleLogin
              render={(renderProps) => (
                <input
                  onClick={renderProps.onClick}
                  className="signinButton"
                  type="submit"
                  value="Sign In"
                />
              )}
              clientId="849423915979-g5giubl8fb8reqhuj8og28n6fvtkdbqd.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={failToLogIn}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;
