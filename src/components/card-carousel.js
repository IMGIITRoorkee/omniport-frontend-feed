import React, { Component } from 'react';
import '../css/bday-card.css';
import { connect } from 'react-redux';
import Carousel from './carousel';

class CardCarousel extends Component {
  render() {
    const { bdayList } = this.props;
    const { all } = this.props;
    const { display } = this.props;
    var newList = bdayList.list;
    if (!all) {
      newList = this.props.filteredList;
    }
    return (
      <div style={{ display: 'flex' }}>
        {display && bdayList.isLoaded && newList && newList.length != 0 && (
          <Carousel newList={newList} styleName="carousel" />
        )}

        {bdayList.isLoaded && newList.length == 0 && (
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
