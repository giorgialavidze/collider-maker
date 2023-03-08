import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import Preload from './scenes/Preload';
import Road from './scenes/road';
import BlackWork from "./scenes/blackworkscene"
import empty from "./scenes/empty"

new Phaser.Game(
  Object.assign(config, {
    scene: [Preload,GameScene,Road,BlackWork,empty]
  })
);
