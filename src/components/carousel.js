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
import '../css/birthday-card.css'

export default class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { windowWidth: window.innerWidth, visibleSlides: 5 }
  }

  handleResize = e => {
    this.setState({ windowWidth: window.innerWidth })

    const width = this.carouselSliderElement ? this.carouselSliderElement.clientWidth : 0

    var visibleSlides = Math.max(Math.floor(width / 150), 1)
    visibleSlides = Math.min(visibleSlides, this.props.newList.length)
    this.setState({ visibleSlides })

    return visibleSlides
  }

  componentWillMount() {
    this.handleResize()
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
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
        touchEnabled={false}
        dragEnabled={false}
      >
        <ButtonBack
          style={{
            alignSelf: 'center',
            height: '3em',
            width: '3em',
            minWidth: '3rem',
            border: 0,
            borderRadius: '50%',
            background: getTheme() === 'violet' ? '#6435C9' : getTheme(),
          }}
        >
          <Icon name='chevron left' size='large' inverted color='white' fitted />
        </ButtonBack>

        <div
          ref={carouselSliderElement => {
            this.carouselSliderElement = carouselSliderElement
          }}
          style={{
            width: '100%',
            overflow: 'hidden',
          }}>
          <Slider
            style={{
              width: '100%',
              margin: '0 1rem',
            }}
          >
            {newList.map((card, index) => {
              return (
                <Slide
                  index={index}
                  style={{
                    width: '9rem',
                    height: '11rem',
                    marginLeft: '0.5rem',
                    marginRight: '1rem',
                  }}
                >
                  <UserCard
                    name={card.person.fullName}
                    displayPicture={card.person.displayPicture}
                    student={card.person.student}
                  />
                </Slide>
              )
            })}
          </Slider>
        </div>

        <ButtonNext
          style={{
            JustifySelf: 'flex-end',
            alignSelf: 'center',
            height: '3em',
            width: '3em',
            minWidth: '3rem',
            border: 0,
            borderRadius: '50%',
            background: getTheme() === 'violet' ? '#6435C9' : getTheme(),
          }}
        >
          <Icon name='chevron right' size='large' inverted color='white' fitted />
        </ButtonNext>
      </CarouselProvider>
    )
  }
}
