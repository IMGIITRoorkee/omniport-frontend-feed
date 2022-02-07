import React, { Component } from "react";
import "../css/bday-card.css";
import { connect } from "react-redux";
import Carousel from "./react-carousel";

class CardCarousel extends Component {
  render() {
    const { bdayList } = this.props;
    const { array } = this.props;
    const { display } = this.props;
    var newList = bdayList.list;
    if (!array[0]) {
      newList = this.props.filteredList;
    }
    const when = this.props.when;
    return (
      <div style={{ display: "flex" }}>
        {display && bdayList.isLoaded && newList && newList.length != 0 && (
          <Carousel newList={newList} styleName="carousel" />
        )}

        {newList.length == 0 && (
          <div styleName="remark">No Birthdays Found!</div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    bdayList: state.bdayList,
  };
}
export default connect(mapStateToProps)(CardCarousel);
