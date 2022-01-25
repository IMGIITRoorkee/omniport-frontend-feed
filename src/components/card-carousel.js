import React, { Component } from "react";
import UserCard from './user-card';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
// import Slider from "react-slick";
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
function filterBatch(list,whoami){
  if(list.isLoaded){
    // console.log(whoami.id+"ok")
    return list.list.filter(function(item){
      return ((item.person.student.currentYear == whoami.student.currentYear) && (item.person.student.branch.id == whoami.student.branch.id));
   });
  }
  return list.list;
}

function filterYear(list,whoami){
  if(list.isLoaded){
    return list.list.filter(function(item){
      return (item.person.student.currentYear == whoami.student.currentYear);
   });
  }
  return list.list;
}

function filterBhawan(list,whoami){
  if(list.isLoaded){
    return list.list.filter(function(item){
      return (item.person.residentialinformation.residence.id == whoami.residentialinformation.residence.id);
   });
  }
  return list.list;
}

function filterGroup(list,whoami){
  if(list.isLoaded){
    // whoami.membershipSet.map(membership =>{
      return list.list.filter(function(item){
          console.log(membership.group + item.person.membershipSet.includes(membership.group))
          return item.person.membershipSet.group==1
          // console.log(item.person)
          // return membership.group=="9";     
    });
  // })
  }
  return list.list;
}

function filterList(list,whoami,array,newList){
  if(list.isLoaded){

    if(array[1]){

    }
    if(array[2]){
      newList = filterBatch(newList,whoami)
    }
    if(array[3]){
      newList =filterBhawan(newList,whoami)
    }
    if(array[4]){
      newList =filterYear(newList,whoami)
    }
    return newList.list
  }
  return list.list;
  
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
      console.log(this.props.filteredList)
      console.log("hi")
    }
    const when = this.props.when
    // console.log(this.props.whoami)
    return (
      <div style={{display:"flex"}}>
        {display && bdayList.isLoaded  && 
        // newList.map(card=>{
        //   return ( <div><UserCard name={card.person.fullName} /></div> )
        // })
        <Carousel newList={newList} styleName="carousel"/>
        }
        
        {/* {newList.length==0 &&
        <div styleName="remark">No Birthdays Found!</div>
        } */}
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