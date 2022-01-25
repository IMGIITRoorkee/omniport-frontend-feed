import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import '../css/bday-card.css'
import { CarouselProvider, Slider } from "pure-react-carousel";
import { isMobile, isBrowser } from 'react-device-detect';

const UserCard = (props) => (
  <Card styleName={isBrowser? "user-card": "user-card2"}>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'  ui={false} style={{height:isBrowser? "128px":"69px"}}/>
    <Card.Content styleName={isBrowser? "card-font": "card-font2"}>
    {props.name}
    {/* Branch Code :: Year */}
      {/* <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta> */}
      {/* <Card.Description styleName="card-font">
        
      </Card.Description> */}
    </Card.Content>
  </Card>
  
)

export default UserCard
