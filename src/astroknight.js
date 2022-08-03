// Astroknight JS Code mit allen Scenes
var config = {
    type: Phaser.AUTO,
    width: 1485,//Größe des Bildschirms
    height: 700,
    scene: [LadeFenster, MenueFenster, Story, ErsterDungeon, ZweiterDungeon, DritterDungeon, WinScene, LostScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},//Gravitation
            debug: false
        }
    }
};
var game = new Phaser.Game(config);
