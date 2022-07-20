var lostframe;
class LostScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'LostScene',
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
        this.load.spritesheet('youlost', 'assets/YouLost.png', {frameHeight: 320, frameWidth: 600, spacing: 0});
    }
    create(){
        this.anims.create({
            key: 'ablaufYouLost',
            frames: this.anims.generateFrameNumbers('youlost', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        lostframe = this.physics.add.sprite(740, 355, 'youlost').setScale(2.2).setDepth(-1);
        lostframe.play('ablaufYouLost', true);
    }
    update(){

    }
}
