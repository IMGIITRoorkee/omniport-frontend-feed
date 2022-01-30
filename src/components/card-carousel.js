import React, { Component } from "react";
import UserCard from './user-card';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import '../css/bday-card.css';
import { connect } from 'react-redux'
import { bool } from "prop-types";
import Carousel from "./react-carousel";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

class CardCarousel extends Component {
 
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    const { bdayList } = this.props
    const { array } = this.props
    const { display } = this.props
    var newList= bdayList.list
    if(!array[0]){
      newList = this.props.filteredList
    }
    const when = this.props.when
    return (
      <div style={{display:"flex"}}>
        {display && bdayList.isLoaded  && 
        newList.length!=0 &&
        <Carousel newList={newList} styleName="carousel"/>
        }
        
        {newList.length==0 &&
        <div styleName="remark">No Birthdays Found!</div>
        }
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    bdayList: state.bdayList
  }
}
export default connect(mapStateToProps)(CardCarousel);