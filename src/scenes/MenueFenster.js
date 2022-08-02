var optionsknopf;
var menue;
var playknopf;
var buttonSound;

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
        this.load.audio('click', "assets/sound/Button.wav");

    }

    create() {

        buttonSound = this.sound.add("click", {loop: false});
        this.anims.create({
            key: 'ablauf',
            frames: this.anims.generateFrameNumbers('menue', {start: 0, end: 3}),
            frameRate: 7,
            repeat: -1
        });
        menue = this.physics.add.sprite(740, 355, 'menue').setScale(0.57).setDepth(-1);
        menue.play('ablauf', true);
        playknopf = this.add.image(740, 500, 'play').setScale(0.56);
        optionsknopf = this.add.image(740, 620, 'options').setScale(0.4);

        playknopf.setInteractive();
        optionsknopf.setInteractive();

        playknopf.on('pointerdown', () => this.scene.start('ErsterDungeon'));
        playknopf.on('pointerdown', () => buttonSound.play());

        optionsknopf.on('pointerdown', () => this.scene.start('Story'));
        optionsknopf.on('pointerdown', () => buttonSound.play());
        optionsknopf.on('pointerdown', () => storySound.resume());
        backgroundSong.resume();
}

    createCursor(){
        this.playknopf.cursors = this.input.keyboard.createCursor();
    }
    update(){
        playknopf.on('pointerdown', () => backgroundSong.pause());
        optionsknopf.on('pointerdown', () =>  backgroundSong.pause());

        playknopf.on('pointerover', () => playknopf.setScale(0.58));
        playknopf.on('pointerout', () => playknopf.setScale(0.56));

        optionsknopf.on('pointerover', () => optionsknopf.setScale(0.45));
        optionsknopf.on('pointerout', () => optionsknopf.setScale(0.4));
    }

}


