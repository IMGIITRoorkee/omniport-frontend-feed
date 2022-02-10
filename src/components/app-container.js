import React from 'react';
import { connect } from 'react-redux';
import { Segment, Icon, Button, Grid } from 'semantic-ui-react';
import { getTheme } from 'formula_one';
import { isBrowser } from 'react-device-detect';
import { MasonryLayout, appDetails } from 'formula_one';
import FeedCard from './feed-card';
import '../css/feed-card.css';
import EmptyFeedCard from './emty-feed-card';

class AppContainer extends React.Component {
  loadMore = () => {
    this.props.handleScroll({}, true);
  };

  render() {
    const { feedList } = this.props;
    return (
      <div styleName="feed-container">
        {feedList.list.results && (
          <MasonryLayout columns={isBrowser ? 2 : 1} gap={28}>
            {feedList.list.results
              .filter((feed) => {
                return (
                  appDetails(feed.app.nomenclature.name).present && feed.person
                );
              })
              .map((feed) => {
                return (
                  <FeedCard
                    key={feed.id}
                    feed={feed}
                    image={Boolean(feed.image)}
                  />
                );
              })}
          </MasonryLayout>
        )}
        {!feedList.isLoaded && (
          <MasonryLayout columns={isBrowser ? 2 : 1} gap={28}>
            {[...Array(6)].map((item, index) => {
              return <EmptyFeedCard key={index} image={index % 3 === 1} />;
            })}
          </MasonryLayout>
        )}
        {feedList.isLoaded && !feedList.list.next ? (
          <Segment basic textAlign="center">
            <Icon name="frown outline" />
            No more bits available. You have scrolled enough for today.
          </Segment>
        ) : (
          <div styleName="feed-loadmore-button-container">
            <Grid>
              <Grid.Column textAlign="center">
                <Button
                  basic
                  animated="vertical"
                  color={getTheme()}
                  onClick={this.loadMore}
                >
                  <Button.Content visible>Show more</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow down" />
                  </Button.Content>
                </Button>
              </Grid.Column>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    feedList: state.feedList,
  };
}

export default connect(mapStateToProps)(AppContainer);
