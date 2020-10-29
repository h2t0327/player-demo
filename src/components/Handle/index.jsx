import React from 'react'
import { Row, Col, Button, Slider, Popover, Dropdown, Menu } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('xmplayer')
@observer
class Handle extends React.Component {
  constructor(props) {
    super(props)
    this.playMode = 0
  }

  handleMode = () => {
    const modeList = ['order', 'loop', 'random', 'single']
    const { onChangeMode } = this.props
    this.playMode += 1
    this.playMode %= 4
    onChangeMode && onChangeMode(modeList[this.playMode])
  }

  render() {
    const {
      onVolumeChange,
      onVolumeClick,
      onPlaybackRateClick,
      onPlayListClick, // 播放列表点击事件
      xmplayer: { volume, mode, playbackRate },
    } = this.props
    const playModeList = {
      order: '#icon-xunhuan',
      loop: '#icon-loop',
      random: '#icon-bofangye-caozuolan-suijibofang',
      single: '#icon-danqubofang',
    }
    const playListTitle = {
      order: '列表循环',
      loop: '单曲循环',
      random: '随机播放',
      single: '单曲结束',
    }
    return (
      <Row>
        <Col span={6}>
          <Popover
            content={
              <div className='h100'>
                <Slider
                  vertical
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  defaultValue={volume}
                  tipFormatter={null}
                  onChange={onVolumeChange}
                />
              </div>
            }
          >
            <Button shape='circle' onClick={onVolumeClick}>
              <svg className='icon' aria-hidden='true'>
                <use xlinkHref={volume > 0 ? '#icon-shengyin' : '#icon-mute'} />
              </svg>
            </Button>
          </Popover>
        </Col>

        <Col span={6}>
          <Button shape='circle' onClick={this.handleMode}>
            <svg className='icon' aria-hidden='true'>
              <use xlinkHref={playModeList[mode]} />
            </svg>
          </Button>
        </Col>

        <Col span={6}>
          <Dropdown
            overlay={
              <Menu selectedKeys={[playbackRate]} onClick={onPlaybackRateClick}>
                <Menu.Item key='3.0'>3.0</Menu.Item>
                <Menu.Item key='2.0'>2.0</Menu.Item>
                <Menu.Item key='1.0'>1.0</Menu.Item>
                <Menu.Item key='0.5'>0.5</Menu.Item>
              </Menu>
            }
            placement='topCenter'
          >
            <Button shape='circle'>{playbackRate}x</Button>
          </Dropdown>
        </Col>

        <Col span={6}>
          <Popover
            content={<div />}
            title={playListTitle[mode]}
            trigger='click'
            placement='topRight'
          >
            <Button shape='circle' onClick={onPlayListClick}>
              <svg className='icon' aria-hidden='true'>
                <use xlinkHref='#icon-gedan' />
              </svg>
            </Button>
          </Popover>
        </Col>
      </Row>
    )
  }
}

export default Handle
