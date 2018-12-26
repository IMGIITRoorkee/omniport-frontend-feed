import React from 'react'
import { connect } from 'react-redux'
import { Card, Image, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { getTheme, DisplayDP, appDetails } from 'formula_one'
import { changeReport } from '../actions'

import '../css/feed-card.css'

class FeedCard extends React.Component {
  render () {
    const { feed } = this.props
    return (
      <Card fluid color={getTheme()}>
        <Card.Content>
          <div styleName='feed-header'>
            <div styleName='feed-user'>
              <div styleName='feed-user-pic'>
                {feed.person.displayPicture ? (
                  <Image src={feed.person.displayPicture} avatar />
                ) : (
                  <DisplayDP name={feed.person.shortName} />
                )}
              </div>
              <div styleName='feed-user-desc'>
                <Card.Header>
                  <span styleName='feed-user-name'>{feed.person.fullName}</span>
                </Card.Header>
                <Card.Meta>
                  <span>{moment(feed.datetimeCreated).fromNow()}</span>
                </Card.Meta>
              </div>
            </div>
            <div>
              <Dropdown icon='ellipsis vertical' pointing='top right'>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.ChangeReport(feed.id, !feed.reported)
                    }}
                  >
                    <Icon name={feed.reported ? 'circle outline' : 'ban'} />
                    {feed.reported ? 'Unreport' : 'Report'}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Card.Content>
        <Card.Content>
          <div styleName='feed-card-description'>{feed.text}</div>
          {feed.image && (
            <div styleName='feed-card-image-container'>
              <Image src={feed.image} alt='feed' styleName='feed-card-image' />
            </div>
          )}
        </Card.Content>
        <Card.Content styleName='feed-app-container'>
          <Link to={appDetails(feed.app.nomenclature.name).details.baseUrl}>
            {feed.app.assets && feed.app.assets.logo ? (
              <img
                src={`/static/${feed.app.baseUrls.static}${
                  feed.app.assets.favicon
                }`}
                alt={feed.app.nomenclature.name}
              />
            ) : (
              <Icon
                name={(feed.app.assets && feed.app.assets.icon) || 'cube'}
                color={getTheme()}
                styleName='feed-card-app-icon'
              />
            )}
            {feed.app.nomenclature.verboseName}
          </Link>
        </Card.Content>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ChangeReport: (id, status) => {
      dispatch(changeReport(id, status))
    }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(FeedCard)
