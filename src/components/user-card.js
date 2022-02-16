import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import '../css/bday-card.css'
import { isBrowser } from 'react-device-detect'
import { createImageFromInitials } from '../utils'
import { getThemeObject } from 'formula_one'

const UserCard = props => (
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
        src={createImageFromInitials(128, props.name, '#ffffff')}
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
)

export default UserCard
