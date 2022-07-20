
var wonframe;
class WinScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'WinScene',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 0},
                    debug: false
                }
            }
        });
    }
    preload(){
        this.load.spritesheet('youwon', 'assets/YouWon.png', {frameHeight:  320, frameWidth:600, spacing: 0});
    }
    create(){
        this.anims.create({
            key: 'ablaufYouWon',
            frames: this.anims.generateFrameNumbers('youwon', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        wonframe = this.physics.add.sprite(740, 355, 'youwon').setScale(2.2).setDepth(-1);
        wonframe.play('ablaufYouWon', true);
    }
    update(){

    }

}
