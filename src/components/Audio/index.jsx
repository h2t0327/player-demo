import React from 'react'
// import ReactPlayer from "react-player";
import { Slider, Row, Col } from 'antd'
import Player from '../Player'
import Handle from '../Handle'
import { inject, observer } from 'mobx-react'
import { debounce } from 'lodash-es'
import './style.css'

@inject('xmplayer')
@observer
class Audio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
    }
    this.resize = debounce(() => {
      this.setState({ width: window.innerWidth })
    }, 80)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.resize)
  }

  tipFormatter(value) {
    let min = Math.floor(value / 60)
    let sec = Math.floor(value % 60)

    min = min > 9 ? min : `0${min}`
    sec = sec > 9 ? sec : `0${sec}`

    return `${min}:${sec}`
  }

  render() {
    const {
      onPlay, // 播放监听
      onChangePlay, // 播放进度条变化事件
      onChangePlayAfter, // 拖动滑条之后触发事件
      onVolumeChange, // 音量变化
      onVolumeClick, // 音量点击
      onChangeMode, // 播放模式点击
      onPrev, // 上一首
      onNext, // 下一首
      onStop, // 停止播放
      onPlayListClick, // 播放列表点击事件
      onPlaybackRateClick, // 播放速率点击事件
      xmplayer: { playInfo, position },
    } = this.props
    const temp =
      window.innerWidth < 576
        ? [{ order: 1 }, { order: 2 }, { order: 3 }]
        : [{ order: 1 }, { order: 1 }, { order: 1 }]
    return (
      <div className='audio-component'>
        <Row>
          <Col xxl={2} xl={3} lg={4} md={5} sm={7} xs={12} {...temp[1]}>
            <Player
              onPlay={onPlay}
              onPrev={onPrev}
              onNext={onNext}
              onStop={onStop}
            />
          </Col>

          <Col xxl={20} xl={18} lg={16} md={14} sm={10} xs={24} {...temp[0]}>
            <div className='slider'>
              <div style={{ flex: 1 }}>
                <Slider
                  min={0}
                  step={1}
                  max={playInfo.duration || 0}
                  value={position || 0}
                  onChange={onChangePlay}
                  onAfterChange={onChangePlayAfter}
                  tipFormatter={this.tipFormatter}
                />
              </div>
              <div style={{ padding: '0 8px', lineHeight: '32px' }}>
                {this.tipFormatter(playInfo.position || 0)} /{' '}
                {this.tipFormatter(playInfo.duration || 0)}
              </div>
            </div>
          </Col>

          <Col xxl={2} xl={3} lg={4} md={5} sm={7} xs={12} {...temp[2]}>
            <Handle
              onVolumeChange={onVolumeChange}
              onVolumeClick={onVolumeClick}
              onChangeMode={onChangeMode}
              onPlayListClick={onPlayListClick}
              onPlaybackRateClick={onPlaybackRateClick}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Audio
