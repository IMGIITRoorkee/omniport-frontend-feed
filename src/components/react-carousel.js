import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import UserCard from "./user-card";
import { Icon } from "semantic-ui-react";

export default class Carousel extends React.Component {
  render() {
    var newList = this.props.newList;
    if(!newList){
      newList=[]
    }
    const slides = Math.floor(newList.length / 4);
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={newList.length}
        visibleSlides={6}
        style={{ width: "100%", display: "flex", height: "200px" }}
      >
        <ButtonBack
          style={{
            alignSelf: "center",
            height: "45px",
            width: "45px",
            border: 0,
            borderRadius: "50%",
            background: "rgba(100, 53, 201, 0.75)",
          }}
        >
          <Icon name="chevron left" size="large" inverted color="white" />
        </ButtonBack>

        <Slider
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          {newList.map((card, index) => {
            return (
              <Slide index={index} style={{ width: "155px", height: "180px" }}>
                <UserCard name={card.person.fullName} />
              </Slide>
            );
          })}
        </Slider>

        <ButtonNext
          style={{
            JustifySelf: "flex-end",
            alignSelf: "center",
            height: "45px",
            width: "45px",
            border: 0,
            borderRadius: "50%",
            background: "rgba(100, 53, 201, 0.75)",
          }}
        >
          <Icon name="chevron right" size="large" inverted color="white" />
        </ButtonNext>
      </CarouselProvider>
    );
  }
}
