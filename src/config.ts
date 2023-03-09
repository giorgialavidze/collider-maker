import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#F5EDE4',
  physics: {
    default: 'matter',
    matter: {
        debug: true,
        gravity: {
            y: 0.5
        },
    }
}, 
  scale: {
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
