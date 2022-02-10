import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import '../css/bday-card.css';
import { isMobile, isBrowser } from 'react-device-detect';
import { createImageFromInitials } from '../utils';


const UserCard = (props) => (
  <Card styleName={isBrowser ? 'user-card' : 'user-card2'}>
    {props.displayPicture ? (
      <Image
        src={props.displayPicture}
        avatar
        ui={false}
        style={{
          height: isBrowser ? '128px' : '69px',
          width: isBrowser ? '132px' : '71px',
        }}
      />
    ) : (
      <Image
        src={createImageFromInitials(128, props.name, '#6435C9')}
        avatar
        ui={false}
        style={{
          height: isBrowser ? '128px' : '69px',
          width: isBrowser ? '132px' : '71px',
        }}
      />
    )}
    <Card.Content styleName={isBrowser ? 'card-font' : 'card-font2'}>
      {props.name}
    </Card.Content>
  </Card>
);

export default UserCard;
