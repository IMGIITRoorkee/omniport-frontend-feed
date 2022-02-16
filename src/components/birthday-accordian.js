import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import { Button, Divider } from 'semantic-ui-react'
import CardCarousel from './card-carousel'
import { getBdays } from '../actions'
import { connect } from 'react-redux'
import { isMobile, isBrowser } from 'react-device-detect'
import '../css/bday-card.css'
import {
  filterBatch,
  filterBhawan,
  filterGroup,
  filterYear,
} from '../filterFunctions'
import CardExpand from './card-expanding-list'
import { CONTENT_OF_DAY, CONTENT_OF_FILTERS } from '../constants'

class BirthdayAccordion extends React.Component {
  state = {
    open: 0,
    day: 'today',
    filters: {
      all: true,
      group: false,
      batch: false,
      bhawan: false,
      year: false,
    },
    filteredList: [],
    display: true,
  }
  componentWillMount() {
    this.props.BdayList(this.state.day)
  }

  filterList(list, details, newList, filters) {
    if (list.isLoaded) {
      newList = newList.list
      if (filters.group) {
        newList = filterGroup(newList, details)
      }
      if (filters.batch) {
        newList = filterBatch(newList, details)
      }
      if (filters.bhawan) {
        newList = filterBhawan(newList, details)
      }
      if (filters.year) {
        newList = filterYear(newList, details)
      }
      this.setState({ display: true })
      this.setState({ filteredList: newList })
      return newList
    }
    this.setState({ filteredList: list })
    return list.list
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { open } = this.state
    const newIndex = open === index ? -1 : index

    this.setState({ open: newIndex })
  }

  filterClick(key) {
    if (key == 'all') {
      this.AllClick()
      return
    }
    var newFilters = this.state.filters
    newFilters[key] = !newFilters[key]
    let result = Object.values(newFilters).every(function (e) {
      return e === false
    })
    if (result) {
      newFilters['all'] = true
    } else {
      newFilters['all'] = false
    }
    this.setState({ filters: newFilters })
    this.setState({ display: false })

    var filteredList = this.filterList(
      this.props.bdayList,
      this.props.personalDetails.details,
      this.props.bdayList,
      newFilters
    )
    this.setState({ filteredList: filteredList })
  }

  AllClick = e => {
    this.setState({
      filters: {
        all: true,
        group: false,
        batch: false,
        bhawan: false,
        year: false,
      },
    })
  }

  changeDay(day) {
    this.AllClick()
    this.setState({ day: day })
    this.props.BdayList(day)
  }

  render() {
    const { open } = this.state
    const { bdayList } = this.props
    const { personalDetails } = this.props
    return (
      <Accordion vertical styleName={isBrowser ? 'accordion' : 'accordion2'}>
        {isBrowser && (
          <>
            <Accordion.Title
              active={open === 0}
              index={0}
              onClick={this.handleClick}
            >
              <div styleName='acc-title'>
                <div>
                  <img
                    src='/branding/site/giftbox.svg'
                    style={{
                      marginRight: '14px',
                      height: '40px',
                      width: '40px',
                    }}
                  />
                  Birthdays
                </div>

                <Icon name='dropdown' />
              </div>
            </Accordion.Title>
            <Accordion.Content active={open === 0}>
              <Divider style={{ border: '1px solid #F3F4F4', height: '0px' }} />
              <div styleName='btn-grp1'>
                {['today', 'tomorrow', 'day-after-tomorrow'].map(day => (
                  <Button
                    styleName={
                      this.state.day === day ? 'day-btn clicked' : 'day-btn'
                    }
                    content={CONTENT_OF_DAY[day]}
                    onClick={() => {
                      this.changeDay(day)
                    }}
                  />
                ))}
              </div>
              <Divider style={{ border: '1px solid #F3F4F4', height: '0px' }} />
              <div styleName='btn-grp2'>
                <div style={{ marginRight: '6px' }}>
                  <Icon size='large' name='filter' />
                </div>
                <div styleName='filter-txt'>Filters:</div>
                {Object.entries(this.state.filters).map(([key, value]) => (
                  <Button
                    styleName={value ? 'filter-btn clicked' : 'filter-btn'}
                    content={CONTENT_OF_FILTERS[key]}
                    onClick={() => {
                      this.filterClick(key)
                    }}
                  />
                ))}
              </div>

              <div>
                {this.props.personalDetails.details.id && (
                  <CardCarousel
                    filteredList={
                      this.state.filters.all
                        ? bdayList.list
                        : this.state.filteredList
                    }
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
              active={open === 0}
              index={0}
              onClick={this.handleClick}
            >
              <div styleName='acc-title2'>
                <div>
                  <img
                    src='/branding/site/giftbox.svg'
                    style={{
                      marginRight: '7px',
                      height: '16px',
                      width: '16px',
                    }}
                  />
                  Birthdays
                </div>

                <Icon name='dropdown' />
              </div>
            </Accordion.Title>
            <Accordion.Content active={open === 0}>
              <div styleName='btn-grp3'>
                {['today', 'tomorrow', 'day-after-tomorrow'].map(day => (
                  <div styleName='btn-container'>
                    <Button
                      styleName={
                        this.state.day === day ? 'day-btn2 clicked' : 'day-btn2'
                      }
                      content={CONTENT_OF_DAY[day]}
                      onClick={() => {
                        this.changeDay(day)
                      }}
                    />
                  </div>
                ))}
              </div>

              <div styleName='btn-grp4'>
                {Object.entries(this.state.filters).map(([key, value]) => (
                  <Button
                    styleName={value ? 'filter-btn2 clicked' : 'filter-btn2'}
                    style={{
                      display: key === 'all' ? 'none' : 'block',
                    }}
                    content={CONTENT_OF_FILTERS[key]}
                    onClick={() => {
                      this.filterClick(key)
                    }}
                  />
                ))}
              </div>
              <div>
                {this.props.personalDetails.details.id && (
                  <CardExpand
                    filteredList={
                      this.state.filters.all
                        ? bdayList.list
                        : this.state.filteredList
                    }
                    display={this.state.display}
                  />
                )}
              </div>
            </Accordion.Content>
          </>
        )}
      </Accordion>
    )
  }
}
function mapStateToProps(state) {
  return {
    bdayList: state.bdayList,
    filteredList: state.filteredList,
    personalDetails: state.personalDetails,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    BdayList: day => {
      dispatch(getBdays(day))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BirthdayAccordion)
