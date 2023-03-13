import "pathseg"
import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import Preload from './scenes/Preload';
import Road from './scenes/road';


new Phaser.Game(
  Object.assign(config, {
    scene: [Preload,GameScene,Road]
  })
);
