import React, { Component } from 'react'
import UserCard from './user-card'
import { Button } from 'semantic-ui-react'
import '../css/birthday-card.css'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

class CardExpand extends Component {
  state = { windowWidth: window.innerWidth, expanded: false, visible: 3, initialVisible: 3 }

  showMoreItems = () => {
    var visible = this.state.visible
    this.setState({ visible: this.props.filteredList.length })
  }

  showLessItems = () => {
    this.setState({ visible: this.state.initialVisible })
  }

  handleExpandClick = () => {
    this.setState({ expanded: !expanded })
  }

  handleVisibleCards = e => {
    this.setState({ windowWidth: window.innerWidth })
    const width = this.containerDivRef ? this.containerDivRef.clientWidth : 0

    let visibleSlides = Math.max(Math.floor(width / 80), 1)
    visibleSlides = Math.min(visibleSlides, this.props.filteredList.length)
    this.setState({ visible: visibleSlides })
    this.setState({ initialVisible: visibleSlides })
  }

  componentDidMount() {
    this.handleVisibleCards()
  }

  render() {
    const { bdayList } = this.props
    const { display } = this.props
    var newList = this.props.filteredList

    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
          ref={containerDivRef => {
            this.containerDivRef = containerDivRef
          }}
        >
          {newList &&
            display &&
            bdayList.isLoaded &&
            newList.slice(0, this.state.visible).map(card => {
              return (
                <UserCard
                  name={card.person.fullName}
                  displayPicture={card.person.displayPicture}
                  student={card.person.student}
                />
              )
            })}
        </div>
        <div>
          {newList &&
            this.state.visible < newList.length &&
            newList.length != 0 && (
              <Button
                styleName='show'
                onClick={() => {
                  this.showMoreItems()
                }}
              >
                <div style={{ marginRight: '4.5px', display: 'inline' }}>
                  Show More
                </div>
                <Icon name='chevron down' />
              </Button>
            )}
          {newList &&
            this.state.visible >= newList.length &&
            this.state.visible > this.state.initialVisible &&
            newList.length != 0 && (
              <Button
                styleName='show'
                onClick={() => {
                  this.showLessItems()
                }}
              >
                <div style={{ marginRight: '4.5px', display: 'inline' }}>
                  Show Less
                </div>
                <Icon name='chevron up' />
              </Button>
            )}
          {newList && newList.length == 0 && (
            <div styleName='remark'>
              <Icon name='frown outline' />
              No Birthdays Found!
            </div>
          )}
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    bdayList: state.bdayList,
  }
}
export default connect(mapStateToProps)(CardExpand)
