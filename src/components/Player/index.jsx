import React from 'react'
import { Row, Col, Button } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('xmplayer')
@observer
class Player extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onPlay, xmplayer, onPrev, onNext, onStop } = this.props
    const { isPlaying } = xmplayer

    return (
      <Row>
        <Col span={6}>
          <Button shape='circle' onClick={onPrev}>
            <svg className='icon' aria-hidden='true'>
              <use xlinkHref='#icon-shangyishou' />
            </svg>
          </Button>
        </Col>

        <Col span={6}>
          <Button shape='circle' onClick={onPlay}>
            <svg className='icon' aria-hidden='true'>
              <use xlinkHref={isPlaying ? `#icon-bofang` : `#icon-Play`} />
            </svg>
          </Button>
        </Col>

        <Col span={6}>
          <Button shape='circle' onClick={onNext}>
            <svg className='icon' aria-hidden='true'>
              <use xlinkHref='#icon-next' />
            </svg>
          </Button>
        </Col>

        <Col span={6}>
          <Button shape='circle' onClick={onStop}>
            <svg className='icon' aria-hidden='true'>
              <use xlinkHref='#icon-stop' />
            </svg>
          </Button>
        </Col>
      </Row>
    )
  }
}

export default Player
