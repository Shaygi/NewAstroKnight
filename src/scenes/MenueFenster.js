
var optionsknopf;
var menue;
var  playknopf;
var playListener
var optionistener;
class MenueFenster extends Phaser.Scene {

    constructor() {
        super({
            key: 'MenueFenster',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 0},
                    debug: false
                }
            }
        });
    }

    preload() {

        this.load.spritesheet('menue', 'assets/Menuesprite.png', {frameHeight: 1290, frameWidth: 2410, spacing: 10});
        this.load.image('play', 'assets/Play.png');
        this.load.image('options', 'assets/Options.png');

    }

    create() {
        this.anims.create({
            key: 'ablauf',
            frames: this.anims.generateFrameNumbers('menue', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        menue = this.physics.add.sprite(740, 355, 'menue').setScale(0.57).setDepth(-1);
        menue.play('ablauf', true);
        playknopf = this.add.image(740, 360, 'play').setScale(0.56);
        optionsknopf = this.add.sprite(740, 420, 'options').setScale(0.4).setInteractive();

        playknopf.setInteractive();
        playknopf.on('pointerdown', () => this.scene.start('ErsterDungeon'));
        optionsknopf.on('pointerdown', () => this.scene.start('ErsterDungeon'));


    /*playknopf.on('pointerover', function (pointer){
        playknopf.setScale(1.2);

    })
    playknopf.on('pointerout', function (pointer){
        playknopf.setScale(-1.2);
        //playknopf.setInteractive({ useHandCursor: true });
    })*/

}

    createCursor(){
        this.playknopf.cursors = this.input.keyboard.createCursor();
    }
    update(){


    }

}


