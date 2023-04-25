import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  dom: {
    createContainer: true
},
  backgroundColor: '222221',
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
    width: window.innerWidth/1.5,
    height: window.innerHeight,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
