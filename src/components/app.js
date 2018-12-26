import React from 'react'
import { connect } from 'react-redux'
import { isMobile, isBrowser } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'
import { Container } from 'semantic-ui-react'

import Sidebar from 'core/common/src/components/primary-sidebar'
import { AppHeader, AppFooter, AppMain } from 'formula_one'
import { initialiseList, getMoreFeed } from '../actions'
import AppContainer from './app-continer'

import main from 'formula_one/src/css/app.css'

class App extends React.PureComponent {
  componentDidMount () {
    this.props.InitialiseList()
  }
  handleScroll = values => {
    const { feedList } = this.props
    if (feedList.isLoaded) {
      if ((1 - values.top) * values.scrollHeight <= 800 && feedList.list.next) {
        this.props.GetMoreFeed(feedList.list.next)
      }
    }
  }
  render () {
    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Backend Developer'
      },
      {
        name: 'Praduman Goyal',
        role: 'Frontend Developer'
      }
    ]
    return (
      <React.Fragment>
        <div styleName='app'>
          <AppHeader mode='site' appName='feed' userDropdown />
          {isMobile && <Sidebar />}
          <AppMain>
            <div styleName='main.app-main'>
              {isBrowser && <Sidebar />}
              <Scrollbars autoHide onScrollFrame={this.handleScroll}>
                <Container textAlign='center'>
                  <AppContainer />
                </Container>
              </Scrollbars>
            </div>
          </AppMain>
          <AppFooter creators={creators} />
        </div>
      </React.Fragment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)