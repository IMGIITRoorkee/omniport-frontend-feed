import React from 'react'
import { Card, Image, Popup } from 'semantic-ui-react'
import { isBrowser } from 'react-device-detect'
import { DefaultDP } from 'formula_one'

import { getStudentBranch, getStudentYearVerbose } from '../utils'
import '../css/birthday-card.css'

const UserCard = props => (
  <Card styleName={isBrowser ? 'user-card' : 'user-card user-card-mobile'}>
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
    <Card.Content styleName='card-font-container'>
      <Popup
        trigger={<div styleName={isBrowser ? 'card-font' : 'card-font-mobile'}>{props.name}</div>}
        content={
          <div>
            <div style={{ fontWeight: 'bold' }}>{getStudentBranch(props.student)}</div>
            <div>Year: {getStudentYearVerbose(props.student)}</div>
          </div>
        }
        position='bottom center'
      />
    </Card.Content>
  </Card>
)

export default UserCard
