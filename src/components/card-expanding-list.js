import React, { Component } from 'react';
import UserCard from './user-card';
import { Button, Divider, Input, Segment } from 'semantic-ui-react';
import '../css/bday-card.css';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

class CardExpand extends Component {
  state = { expanded: false, visible: 3 };
  showMoreItems = () => {
    var visible = this.state.visible;
    this.setState({ visible: visible + 3 });
  };
  showLessItems = () => {
    this.setState({ visible: 3 });
  };
  handleExpandClick = () => {
    this.setState({ expanded: !expanded });
  };
  render() {
    const { bdayList } = this.props;
    const { all } = this.props;
    const { display } = this.props;

    var newList = bdayList.list;
    if (!all) {
      newList = this.props.filteredList;
    }

    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {display &&
            bdayList.isLoaded &&
            newList.slice(0, this.state.visible).map((card) => {
              return (
                <div>
                  <UserCard name={card.person.fullName} />
                </div>
              );
            })}
        </div>
        <div>
          {this.state.visible < newList.length && newList.length != 0 && (
            <Button
              styleName="show"
              onClick={() => {
                this.showMoreItems();
              }}
            >
              <div style={{ marginRight: '4.5px', display: 'inline' }}>
                Show More
              </div>
              <Icon name="chevron down" />
            </Button>
          )}
          {this.state.visible >= newList.length && newList.length != 0 && (
            <Button
              styleName="show"
              onClick={() => {
                this.showLessItems();
              }}
            >
              <div style={{ marginRight: '4.5px', display: 'inline' }}>
                Show Less
              </div>
              <Icon name="chevron up" />
            </Button>
          )}
          {newList.length == 0 && (
            <div styleName="remark2">No Birthdays Found!</div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    bdayList: state.bdayList,
  };
}
export default connect(mapStateToProps)(CardExpand);
