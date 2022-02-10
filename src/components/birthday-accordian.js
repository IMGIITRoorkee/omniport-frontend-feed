import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { Button, Divider } from 'semantic-ui-react';
import CardCarousel from './card-carousel';
import { getBdays, whoami } from '../actions';
import { connect } from 'react-redux';
import '../css/bday-card.css';
import {
  filterBatch,
  filterBhawan,
  filterGroup,
  filterYear,
} from '../filterFunctions';
import { isMobile, isBrowser } from 'react-device-detect';
import CardExpand from './card-expanding-list';
import { IndextoDay } from '../constants';

class BirthdayAccordion extends React.Component {
  state = {
    activeIndex: 0,
    day: 0,
    filterState: {
      all: true,
      group: false,
      batch: false,
      bhawan: false,
      year: false,
    },
    whoami: {},
    filteredList: [],
    display: true,
  };
  componentWillMount() {
    this.props.BdayList(IndextoDay[this.state.day]);
  }

  filterList(list, whoami, newList, filterArray) {
    if (list.isLoaded) {
      newList = newList.list;
      if (filterArray[1]) {
        newList = filterGroup(newList, whoami);
      }
      if (filterArray[2]) {
        newList = filterBatch(newList, whoami);
      }
      if (filterArray[3]) {
        newList = filterBhawan(newList, whoami);
      }
      if (filterArray[4]) {
        newList = filterYear(newList, whoami);
      }
      this.setState({ display: true });
      this.setState({ filteredList: newList });
      return newList;
    }
    this.setState({ filteredList: list });
    return list.list;
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  changeFilters(currentFilters, filterArray) {
    currentFilters.group = filterArray[1];
    currentFilters.batch = filterArray[2];
    currentFilters.bhawan = filterArray[3];
    currentFilters.year = filterArray[4];
    return currentFilters;
  }

  filterClick(index) {
    var currentFilters = this.state.filterState;
    var filterArray = Object.values(currentFilters);
    filterArray[index] = !filterArray[index];
    let result = filterArray.every(function (e) {
      return e === false;
    });
    currentFilters = this.changeFilters(currentFilters, filterArray);

    if (result) {
      currentFilters.all = true;
    } else {
      currentFilters.all = false;
    }

    this.setState({ filterState: currentFilters });
    this.setState({ display: false });

    var filteredList = this.filterList(
      this.props.bdayList,
      this.props.whoami.whoami,
      this.props.bdayList,
      Object.values(currentFilters)
    );
    this.setState({ filteredList: filteredList });
  }

  AllClick = (e) => {
    this.setState({
      filterState: {
        all: true,
        group: false,
        batch: false,
        bhawan: false,
        year: false,
      },
    });
  };

  changeIndex(i) {
    this.AllClick();
    this.setState({ day: i });
    this.props.BdayList(IndextoDay[i]);
  }

  render() {
    const { activeIndex } = this.state;
    const { bdayList } = this.props;
    const { whoami } = this.props;
    return (
      <Accordion vertical styleName={isBrowser ? 'accordion' : 'accordion2'}>
        {isBrowser && (
          <>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <div styleName="acc-title">
                <div>
                  <img
                    src="/branding/site/giftbox.svg"
                    style={{
                      marginRight: '14px',
                      height: '40px',
                      width: '40px',
                    }}
                  />
                  Birthdays
                </div>

                <Icon name="dropdown" />
              </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Divider style={{ border: '1px solid #F3F4F4', height: '0px' }} />
              <div styleName="btn-grp1">
                <Button
                  styleName={
                    this.state.day === 0 ? 'day-btn clicked' : 'day-btn'
                  }
                  content="Today"
                  onClick={() => {
                    this.changeIndex(0);
                  }}
                />
                <Button
                  styleName={
                    this.state.day === 1 ? 'day-btn clicked' : 'day-btn'
                  }
                  content="Tomorrow"
                  onClick={() => {
                    this.changeIndex(1);
                  }}
                />
                <Button
                  styleName={
                    this.state.day === 2 ? 'day-btn clicked' : 'day-btn'
                  }
                  content="Day After Tomorrow"
                  onClick={() => {
                    this.changeIndex(2);
                  }}
                />
              </div>
              <Divider style={{ border: '1px solid #F3F4F4', height: '0px' }} />
              <div styleName="btn-grp2">
                <div style={{ marginRight: '6px' }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2492 0H0.750872C0.0846841 0 -0.251472 0.808313 0.220559 1.28034L6 7.06066V13.5C6 13.7447 6.1194 13.9741 6.3199 14.1144L8.8199 15.8638C9.31312 16.2091 10 15.8592 10 15.2494V7.06066L15.7796 1.28034C16.2507 0.80925 15.9168 0 15.2492 0Z"
                      fill="#454545"
                    />
                  </svg>
                </div>
                <div styleName="filter-txt">Filters:</div>
                <Button
                  styleName={
                    this.state.filterState.all
                      ? 'filter-btn clicked'
                      : 'filter-btn'
                  }
                  content="All"
                  onClick={() => {
                    this.AllClick();
                  }}
                />
                <Button
                  styleName={
                    this.state.filterState.group
                      ? 'filter-btn clicked'
                      : 'filter-btn'
                  }
                  content="Same Group"
                  onClick={() => {
                    this.filterClick(1);
                  }}
                />
                <Button
                  styleName={
                    this.state.filterState.batch
                      ? 'filter-btn clicked'
                      : 'filter-btn'
                  }
                  content="Same Batch"
                  onClick={() => {
                    this.filterClick(2);
                  }}
                />
                <Button
                  styleName={
                    this.state.filterState.bhawan
                      ? 'filter-btn clicked'
                      : 'filter-btn'
                  }
                  content="Same Bhawan"
                  onClick={() => {
                    this.filterClick(3);
                  }}
                />
                <Button
                  styleName={
                    this.state.filterState.year
                      ? 'filter-btn clicked'
                      : 'filter-btn'
                  }
                  content="Same Year"
                  onClick={() => {
                    this.filterClick(4);
                  }}
                />
              </div>
              <div>
                {this.props.whoami.whoami.id && (
                  <CardCarousel
                    all={this.state.filterState.all}
                    filteredList={this.state.filteredList}
                    display={this.state.display}
                  />
                )}
              </div>
            </Accordion.Content>
          </>
        )}
        {isMobile && (
          <>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <div styleName="acc-title2">
                <div></div>
                <div>Birthdays</div>

                <Icon name="dropdown" />
              </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <div styleName="btn-grp3">
                <div styleName="btn-container">
                  <Button
                    styleName={
                      this.state.day === 0 ? 'day-btn2 clicked' : 'day-btn2'
                    }
                    content="Today"
                    onClick={() => {
                      this.changeIndex(0);
                    }}
                  />
                </div>
                <div
                  styleName="btn-container"
                  style={{ border: '0.5px solid #E7E7E7' }}
                >
                  <Button
                    styleName={
                      this.state.day === 1 ? 'day-btn2 clicked' : 'day-btn2'
                    }
                    content="Tomorrow"
                    onClick={() => {
                      this.changeIndex(1);
                    }}
                  />
                </div>
                <div styleName="btn-container">
                  <Button
                    styleName={
                      this.state.day === 2 ? 'day-btn2 clicked' : 'day-btn2'
                    }
                    content="Day after Tomorrow"
                    onClick={() => {
                      this.changeIndex(2);
                    }}
                  />
                </div>
              </div>

              <div styleName="btn-grp4">
                <Button
                  styleName={
                    this.state.filterState.group
                      ? 'filter-btn2 clicked'
                      : 'filter-btn2'
                  }
                  content="Same Group"
                  onClick={() => {
                    this.filterClick(1);
                  }}
                />
                <Button
                  styleName={
                    this.state.filterState.batch
                      ? 'filter-btn2 clicked'
                      : 'filter-btn2'
                  }
                  content="Same Batch"
                  onClick={() => {
                    this.filterClick(2);
                  }}
                />
                <Button
                  styleName={
                    this.state.filterState.bhawan
                      ? 'filter-btn2 clicked'
                      : 'filter-btn2'
                  }
                  content="Same Bhawan"
                  onClick={() => {
                    this.filterClick(3);
                  }}
                />
                <Button
                  styleName={
                    this.state.filterState.year
                      ? 'filter-btn2 clicked'
                      : 'filter-btn2'
                  }
                  content="Same Year"
                  onClick={() => {
                    this.filterClick(4);
                  }}
                />
              </div>
              <div>
                {this.props.whoami.whoami.id && (
                  <CardExpand
                    all={this.state.filterState.all}
                    whoami={this.props.whoami.whoami}
                    filteredList={this.state.filteredList}
                    display={this.state.display}
                  />
                )}
              </div>
            </Accordion.Content>
          </>
        )}
      </Accordion>
    );
  }
}
function mapStateToProps(state) {
  return {
    bdayList: state.bdayList,
    filteredList: state.filteredList,
    whoami: state.whoami,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    BdayList: (day) => {
      dispatch(getBdays(day));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BirthdayAccordion);
