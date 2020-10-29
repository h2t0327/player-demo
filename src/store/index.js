import { observable, action } from "mobx";
import { config, XMplayer } from "@xmly-fem/web-jssdk";

config({
  app_key: "b617866c20482d133d5de66fceb37da3", // 必传，官方提供的 app_key：b617866c20482d133d5de66fceb37da3 仅供测试，有调用次数限制，上线需替换为自己的 app_key。
  // 官方提供测试使用的 sig_url => https://api.ximalaya.com/openapi-collector-app/jssdk_sig
  // （限制了 app_key 必须是测试账号，并且限制了调用次数，上线需替换为自己的 sig_url）
  sig_url: "https://api.ximalaya.com/openapi-collector-app/jssdk_sig", // 免登录授权，必须传 sig_url，和 get_access_token 互斥
  debug: true // 是否在控制台打印日志
});

const player = new XMplayer({
  playlist: [182847535, 177874529, 183339305, 182889380, 182840229],
  autoSkip: true // 声音不可播时自动跳过播放下一个
});

class Store {
  // 创建实例前，确保已执行过 config() 初始化方法
  // 创建音频播放器，播放喜马拉雅声音
  @observable player = player;
  @observable position = 0; // 播放进度条位置
  @observable isPlaying = player.isPlaying(); // 是否正在播放中
  @observable playInfo = {}; // 当前播放信息
  @observable volume = player.getVolume(); // 音量
  @observable mode = "order"; // 播放模式
  @observable playbackRate = "1.0"; // 播放速率

  @action.bound
  setIsPlaying(isPlaying) {
    this.isPlaying = isPlaying;
  }

  @action.bound
  setPlayInfo(obj) {
    this.playInfo = obj;
  }

  @action.bound
  setVolume(volume) {
    this.volume = volume;
  }

  @action.bound
  setMode(mode) {
    this.mode = mode;
  }

  @action.bound
  setPosition(position) {
    this.position = position;
  }

  @action.bound
  setPlaybackRate(playbackRate) {
    this.playbackRate = playbackRate;
  }
}

export default {
  xmplayer: new Store()
};
