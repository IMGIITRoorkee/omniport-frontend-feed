import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import '../css/bday-card.css'
import { isBrowser } from 'react-device-detect'
import { DefaultDP } from 'formula_one'

const UserCard = props => (
  <Card styleName={isBrowser ? 'user-card' : 'user-card2'}>
    {props.displayPicture ? (
      <Image
        src={props.displayPicture}
        avatar
        ui={false}
        style={{
          height: isBrowser ? '128px' : '69px',
          width: '100%',
        }}
      />
    ) : (
      <DefaultDP
        name={props.name}
        dualInitials={true}
        size={isBrowser ? '4rem' : '3rem'}
      />
    )}
    <Card.Content styleName={isBrowser ? 'card-font' : 'card-font2'}>
      {props.name}
    </Card.Content>
  </Card>
)

export default UserCard
