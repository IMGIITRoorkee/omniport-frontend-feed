import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import UserCard from './user-card';
import { Icon } from 'semantic-ui-react';
// import '../css/bday-card.css';

export default class Carousel extends React.Component {
  render() {
    const newList = this.props.newList
    const slides = Math.floor(newList.length/4)
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={newList.length}
        visibleSlides={4}
        style={{width:"100%" , display:"flex"}}
      >
        <ButtonBack><Icon name="chevron left"/></ButtonBack>

        <Slider style={{
          // display: "flex", 
          // flexDirection: "row",
          alignItems: "center"
          }}>
          { newList.map((card,index)=>{
            return ( <Slide index={index} style={{width:"155px", height:"180px"}}><UserCard name={card.person.fullName} /></Slide> )
           })}
        </Slider>
        
        <ButtonNext><Icon name="chevron right"/></ButtonNext>
      </CarouselProvider>
    );
  }
}