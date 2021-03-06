import React from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { Container } from 'semantic-ui-react'

import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { initialiseList, getMoreFeed } from '../actions'
import AppContainer from './app-container'

import main from 'formula_one/src/css/app.css'

class App extends React.PureComponent {
  componentDidMount () {
    this.props.InitialiseList()
  }
  handleScroll = (values, forceLoad = false) => {
    const { feedList } = this.props
    if (feedList.isLoaded) {
      if (
        (forceLoad || (1 - values.top) * values.scrollHeight <= 800) &&
        feedList.list.next
      ) {
        this.props.GetMoreFeed(feedList.list.next)
      }
    }
  }
  render () {
    return (
      <Scrollbars autoHide onScrollFrame={this.handleScroll}>
        <Container>
          <CustomBreadcrumb list={[{ name: 'Feed' }]} />
          <Container textAlign='center'>
            <AppContainer handleScroll={this.handleScroll} />
          </Container>
        </Container>
      </Scrollbars>
    )
  }
}

function mapStateToProps (state) {
  return {
    feedList: state.feedList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    InitialiseList: () => {
      dispatch(initialiseList())
    },
    GetMoreFeed: page => {
      dispatch(getMoreFeed(page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
