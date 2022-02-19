import React from 'react'
import { Icon } from 'semantic-ui-react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { getTheme } from 'formula_one'
import UserCard from './user-card'

export default class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { windowWidth: window.innerWidth, visibleSlides: 5 }
  }

  handleResize = e => {
    this.setState({ windowWidth: window.innerWidth })
    var visibleSlides
    switch (true) {
      case this.state.windowWidth > 1440:
        this.setState({ visibleSlides: 5 })
        break
      case this.state.windowWidth > 1000 && this.state.windowWidth < 1440:
        this.setState({ visibleSlides: 4 })
        break
      case this.state.windowWidth > 770 && this.state.windowWidth < 1000:
        this.setState({ visibleSlides: 3 })
        break
      case this.state.windowWidth > 620 && this.state.windowWidth < 770:
        this.setState({ visibleSlides: 2 })
        break
      case this.state.windowWidth < 620:
        this.setState({ visibleSlides: 1 })
        break
    }
    return visibleSlides
  }

  componentWillMount() {
    this.handleResize()
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnMount() {
    window.addEventListener('resize', this.handleResize)
  }
  render() {
    var newList = this.props.newList

    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={newList.length}
        visibleSlides={this.state.visibleSlides}
        style={{ width: '100%', display: 'flex', height: '14rem' }}
      >
        <ButtonBack
          style={{
            alignSelf: 'center',
            height: '3em',
            width: '3em',
            border: 0,
            borderRadius: '50%',
            background: getTheme() === 'violet' ? '#6435C9' : getTheme(),
          }}
        >
          <Icon name='chevron left' size='large' inverted color='white' />
        </ButtonBack>

        <Slider
          style={{
            width: '100%',
            marginLeft: '1rem',
          }}
        >
          {newList.map((card, index) => {
            return (
              <Slide index={index} style={{ width: '11em', height: '13em' }}>
                <UserCard name={card.person.fullName} />
              </Slide>
            )
          })}
        </Slider>

        <ButtonNext
          style={{
            JustifySelf: 'flex-end',
            alignSelf: 'center',
            height: '3em',
            width: '3em',
            border: 0,
            borderRadius: '50%',
            background: getTheme() === 'violet' ? '#6435C9' : getTheme(),
          }}
        >
          <Icon name='chevron right' size='large' inverted color='white' />
        </ButtonNext>
      </CarouselProvider>
    )
  }
}
