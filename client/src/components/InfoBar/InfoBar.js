/**
 * InfoBar component
 *
 * @author Kratyan V.A.
 * @private
 */

import React from "react";
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import "./InfoBar.css";

/**
 * Function based InfoBar component
 */
const InfoBar = ({ room, photo }) => (
  <div className="header">
    <div className="header-info">
      <h3>{room}</h3>
    </div>

    <IconButton>
      <SearchOutlined />
    </IconButton>
    <IconButton>
      <AttachFile />
    </IconButton>
    <div>
      <img src={photo} alt="Profile" className="profile-image" />
    </div>
  </div>
);

export default InfoBar;
