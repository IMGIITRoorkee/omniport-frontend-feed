import React from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { Container } from 'semantic-ui-react'
import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { initialiseList, getMoreFeed ,whoami} from '../actions'
import AppContainer from './app-container'
import BirthdayAccordion from './birthday-accordian';

class App extends React.PureComponent {
  componentDidMount () {
    this.props.InitialiseList()
    this.props.PersonalDetails()
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
    const { whoami } = this.props
    return (
      <Scrollbars autoHide onScrollFrame={this.handleScroll}>
        <Container>
          <CustomBreadcrumb list={[{ name: 'Feed' }]} />
          <Container textAlign='center'>
            {whoami.whoami && whoami.whoami.student &&
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
    whoami : state.whoami,
    feedList: state.feedList,
    
  }
}
const mapDispatchToProps = dispatch => {
  return {
    InitialiseList: () => {
      dispatch(initialiseList())
    },
    GetMoreFeed: page => {
      dispatch(getMoreFeed(page))
    },
    PersonalDetails : ()=>{
      dispatch(whoami())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
