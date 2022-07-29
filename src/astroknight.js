var config = {
    type: Phaser.AUTO,
    width: 1485,
    height: 700,
    scene: [LadeFenster, MenueFenster, ErsterDungeon, ZweiterDungeon, DritterDungeon, LostScene, WinScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: false
        }
    }
};

var game = new Phaser.Game(config);
