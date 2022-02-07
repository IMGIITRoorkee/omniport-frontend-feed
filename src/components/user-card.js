import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import "../css/bday-card.css";
import { isMobile, isBrowser } from "react-device-detect";

var getInitials = function (string) {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};
const createImageFromInitials = (size, name, color) => {
  if (name == null) return;
  name = getInitials(name);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}50`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Roboto`;
  context.fillText(name, size / 2, size / 2);

  return canvas.toDataURL();
};
const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const UserCard = (props) => (
  <Card styleName={isBrowser ? "user-card" : "user-card2"}>
    {props.displayPicture ? (
      <Image
        src={props.displayPicture}
        avatar
        ui={false}
        style={{
          height: isBrowser ? "128px" : "69px",
          width: isBrowser ? "132px" : "71px",
        }}
      />
    ) : (
      <Image
        src={createImageFromInitials(128, props.name, "#6435C9")}
        avatar
        ui={false}
        style={{
          height: isBrowser ? "128px" : "69px",
          width: isBrowser ? "132px" : "71px",
        }}
      />
    )}
    <Card.Content styleName={isBrowser ? "card-font" : "card-font2"}>
      {props.name}
    </Card.Content>
  </Card>
);

export default UserCard;
