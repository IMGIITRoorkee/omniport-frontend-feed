import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import Carousel from './carousel'
import '../css/birthday-card.css'

class CardCarousel extends Component {
  render() {
    const { bdayList } = this.props
    const { display } = this.props
    var newList = this.props.filteredList

    return (
      <div style={{ display: 'flex' }}>
        {display && bdayList.isLoaded && newList && newList.length != 0 && (
          <Carousel newList={newList} styleName='carousel' />
        )}

        {bdayList.isLoaded && newList.length == 0 && (
          <div styleName='remark'>
            <Icon name='frown outline' />
            No Birthdays Found!
          </div>
        )}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    bdayList: state.bdayList,
  }
}
export default connect(mapStateToProps)(CardCarousel)
