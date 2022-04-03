import React from 'react'
import {
  Button,
  Divider,
  Accordion,
  Icon,
  Card,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isMobile, isBrowser } from 'react-device-detect'
import { getTheme } from 'formula_one'

import CardCarousel from './card-carousel'
import { getBdays, getPersonalDetails } from '../actions'
import {
  filterBatch,
  filterBhawan,
  filterGroup,
  filterYear,
} from '../filterFunctions'
import '../css/birthday-card.css'
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
    this.props.PersonalDetails()
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
    return (
      <Card fluid color={getTheme()} styleName='birthday-card'>
        <Card.Content style={{padding: isBrowser?'14px': '6px'}}>
          <Accordion vertical>
            {isBrowser && (
              <>
                <Accordion.Title
                  active={open === 0}
                  index={0}
                  onClick={this.handleClick}
                  style={{ margin: 0 }}
                >
                  <div styleName='accordion-title'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src='/static/feed/assets/giftbox.svg'
                        style={{
                          marginRight: '1rem',
                          height: '1.6em',
                        }}
                      />
                      Birthdays
                    </div>

                    <Icon name='dropdown' style={{ alignSelf: 'center' }} />
                  </div>
                </Accordion.Title>

                <Accordion.Content
                  styleName='accordion-content'
                  active={open === 0}
                >
                  <Divider fitted />

                  <div styleName='day-button-group'>
                    {['today', 'tomorrow', 'day-after-tomorrow'].map(day => (
                      <Button
                        styleName={
                          this.state.day === day
                            ? 'day-btn'
                            : 'day-btn standard-btn'
                        }
                        color={this.state.day === day ? getTheme() : 'white'}
                        content={CONTENT_OF_DAY[day]}
                        onClick={() => {
                          this.changeDay(day)
                        }}
                      />
                    ))}
                  </div>

                  <Divider fitted />

                  <div styleName='filter-button-group'>
                    <Card.Header styleName='filter-txt'>
                      <Icon name='filter' />
                      Filters:
                    </Card.Header>
                    {Object.entries(this.state.filters).map(([key, value]) => (
                      <Button
                        basic
                        color={value ? getTheme() : 'standard'}
                        styleName={
                          value ? 'filter-btn' : 'filter-btn basic-standard-btn'
                        }
                        content={CONTENT_OF_FILTERS[key]}
                        icon={value ? 'check circle outline' : false}
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
                  <div styleName='accordion-title-mobile'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src='/static/feed/assets/giftbox.svg'
                        style={{
                          margin: 'auto 0.5em',
                          height: '1.5em',
                        }}
                      />
                      Birthdays
                    </div>

                    <Icon name='dropdown' />
                  </div>
                </Accordion.Title>
                <Accordion.Content active={open === 0}>
                  <div styleName='btn-grp3'>
                    {['today', 'tomorrow'].map(day => (
                      <div styleName='btn-container'>
                        <Button
                          styleName={
                            this.state.day === day ? 'day-button-mobile clicked' : 'day-button-mobile'
                          }
                          content={CONTENT_OF_DAY[day]}
                          onClick={() => {
                            this.changeDay(day)
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    {this.props.personalDetails.details.id && (
                      <CardCarousel
                        filteredList={
                          bdayList.list
                        }
                        display={this.state.display}
                      />
                    )}
                  </div>
                </Accordion.Content>
              </>
            )}
          </Accordion>
        </Card.Content>
      </Card>
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
    PersonalDetails: () => {
      dispatch(getPersonalDetails())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BirthdayAccordion)
