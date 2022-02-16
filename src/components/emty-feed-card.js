import React from 'react'
import { Card, Placeholder } from 'semantic-ui-react'

import '../css/feed-card.css'

export default class EmptyFeedCard extends React.Component {
  render() {
    const { image } = this.props
    return (
      <Card fluid>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Card.Content>
        <Card.Content>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line length='full' />
              <Placeholder.Line length='short' />
            </Placeholder.Paragraph>
            {image && <Placeholder.Paragraph />}
            {image && <Placeholder.Image rectangular />}
          </Placeholder>
        </Card.Content>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Card.Content>
      </Card>
    )
  }
}
