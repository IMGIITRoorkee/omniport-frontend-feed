import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { Container } from 'semantic-ui-react'
import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { initialiseList, getMoreFeed ,getBdaysToday} from '../actions'
import AppContainer from './app-container'
import { urlWhoAmI } from '../urls';
import BirthdayAccordion from './birthday-accordian';

class App extends React.PureComponent {
  state={ whoami:{}}
  componentDidMount () {
    this.props.InitialiseList()
    axios
          .get(urlWhoAmI())
          .then(response => {
            this.setState({whoami:  response.data})
          })
          .catch(e => {
            console.warn(`Error while getting details`);
          }); 
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
    console.log(this.props)
    return (
      <Scrollbars autoHide onScrollFrame={this.handleScroll}>
        <Container>
          <CustomBreadcrumb list={[{ name: 'Feed' }]} />
          <Container textAlign='center'>
            {this.state.whoami.student &&
            <BirthdayAccordion/>
            }
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
