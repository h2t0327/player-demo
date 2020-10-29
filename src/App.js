import React from "react";
import { Layout } from "antd";
import { inject, observer } from "mobx-react";
import Audio from "./components/Audio";
import TopBar from "./components/TopBar";
import Show from "./components/Show";
import { throttle } from "lodash-es";
import "./app.css";

const { Header, Footer, Content } = Layout;

@inject("xmplayer")
@observer
class XMPlayer extends React.Component {
  constructor(props) {
    super(props);
    const {
      player,
      setPlayInfo,
      setIsPlaying,
      setPosition,
      setPlaybackRate
    } = props.xmplayer;

    this.isChangePlay = false; // 是否正在拖动播放进度

    // 监听暂停事件
    player.on("pause", sound => {
      setIsPlaying(false);
    });
    // 监听播放事件
    player.on("play", sound => {
      setIsPlaying(true);
    });

    player.on("resume", sound => {
      setIsPlaying(true);
    });

    player.on("stop", sound => {
      setIsPlaying(false);
    });

    player.on("change.sound", sound => {
      setPosition(0);
      setPlaybackRate("1.0");
      player.setPlaybackRate(Number("1.0"));
    });

    // 监听播放进度
    player.on(
      "timeupdate",
      // 节流处理事件
      throttle((position, sound) => {
        // 设置当前播放信息
        setPlayInfo(sound);
        !this.isChangePlay && setPosition(position); // 拖动快进后退时不执行
      }, 80)
    );
  }

  onPlay = () => {
    const { player } = this.props.xmplayer;
    const isPlaying = player.isPlaying(); // 是否正在播放
    isPlaying
      ? player.pause() // 正在播放中就暂停
      : player.play(); // 暂停的话就播放
  };

  onVolumeChange = volume => {
    const { setVolume, player } = this.props.xmplayer;
    volume > 0 && player.unmute();
    setVolume(volume);
    player.setVolume(volume);
  };

  onVolumeClick = () => {
    const { setVolume, player, volume } = this.props.xmplayer;
    // 这里要说明一下， 音量分为直接设置音量等级，和直接设置静音或者恢复声音。
    // 类似mac电脑可以分开来控制，如果静音，有音量也是没有声音的，这里没有分开控制
    if (volume > 0) {
      player.mute(); // 静音
      setVolume(0); // 设置音量为0
    } else {
      player.unmute(); // 恢复音量
      setVolume(player.getVolume()); // 恢复为静音之前的音量
    }
  };

  onChangeMode = mode => {
    const { setMode, player } = this.props.xmplayer;
    setMode(mode);
    player.setPlayMode(mode);
  };

  onPrev = () => {
    const { player } = this.props.xmplayer;
    player.prev();
  };

  onNext = () => {
    const { player } = this.props.xmplayer;
    player.next();
  };

  onStop = () => {
    const { player } = this.props.xmplayer;
    player.stop();
  };

  onChangePlay = val => {
    const { setPosition } = this.props.xmplayer;
    this.isChangePlay = true;
    setPosition(val);
  };

  onChangePlayAfter = val => {
    const { player } = this.props.xmplayer;
    this.isChangePlay = false;
    player.seek(val);
  };

  onPlayListClick = () => {};

  onPlaybackRateClick = e => {
    const { player, setPlaybackRate } = this.props.xmplayer;
    setPlaybackRate(e.key);
    player.setPlaybackRate(Number(e.key));
  };

  render() {
    const {
      onPlay, // 播放点击事件
      onChangePlay, // 播放进度条变化事件
      onChangePlayAfter, // 播放进度拖动放手之后事件
      onVolumeChange, // 音量进度条拖动变化事件
      onVolumeClick, // 音量点击事件
      onChangeMode, // 模式变化事件
      onPrev, // 上一首点击事件
      onNext, // 下一首点击事件
      onPlayListClick, // 歌单点击事件
      onPlaybackRateClick, // 播放速率点击事件
      onStop
    } = this;
    return (
      <div className="xm-player-component">
        <Layout>
          <Header className="h100">
            <TopBar />
          </Header>
          <Content>
            <Show />
          </Content>
          <Footer>
            <Audio
              onPlay={onPlay}
              onChangePlay={onChangePlay}
              onChangePlayAfter={onChangePlayAfter}
              onVolumeChange={onVolumeChange}
              onVolumeClick={onVolumeClick}
              onChangeMode={onChangeMode}
              onPrev={onPrev}
              onNext={onNext}
              onPlayListClick={onPlayListClick}
              onPlaybackRateClick={onPlaybackRateClick}
              onStop={onStop}
            />
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default XMPlayer;
