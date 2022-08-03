var storyVid;
var text;
class Story extends Phaser.Scene {

    constructor() {
        super({
            key: 'Story',
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
        this.load.video('story', 'assets/video/beginning.mp4');
    }
    create(){
        storyVid =  this.add.video(750, 350, 'story').setScale(2.5);
        storyVid.play(true);

        text = this.add.text(1000, 100, "Click to skip!").setScale(2);
        storyVid.setInteractive();
    }
    update(){
       storyVid.on('pointerdown', () => this.scene.start('MenueFenster'));
       storyVid.on('pointerdown', () => storyVid.stop());
       storyVid.on('pointerdown', () => backgroundSong.resume());
        storyVid.on('pointerdown', () => storySound.pause());

    }
}