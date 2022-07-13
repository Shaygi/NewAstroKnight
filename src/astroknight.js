var config = {
    type: Phaser.AUTO,
    width: 1485,
    height: 700,
    scene: [MenueFenster, ErsterDungeon, ZweiterDungeon, DritterDungeon],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: false
        }
    }
};

var game = new Phaser.Game(config);
