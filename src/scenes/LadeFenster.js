var catlogo;
var starttext;
var backgroundSong;
class LadeFenster extends Phaser.Scene {

    constructor() {
        super('LadeFenster');
    }
// Create a new Phaser Game object

    preload(){

        this.load.audio('menuSong', "assets/sound/menuMusic.wav");
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(570, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, -3);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, -3);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(580, 280, 300 * value, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });


        for (var i = 0; i < 500; i++) {
            this.load.image('logo' + i, 'assets/logo.png');
        }
        this.load.image('logo', 'assets/logo.png');

    }

    create() {
        backgroundSong = this.sound.add("menuSong",{loop:false, volume: 1});
        catlogo = this.add.image(740, 360, 'logo');
        catlogo.setInteractive();
        catlogo.on('pointerdown', () => this.scene.start('MenueFenster'));
        catlogo.on('pointerdown', () => backgroundSong.play());
        starttext = this.add.text(650, 600, "Click to start")
    }
    createCursor(){
        this.catlogo.cursors = this.input.keyboard.createCursor();
    }

    update() {
        catlogo.on('pointerover', () => catlogo.setScale(1.1));
        catlogo.on('pointerout', () => catlogo.setScale(1));

        /*if(this.input.mousePointer.isDown){
            this.scene.start('MenueFenster');
        }*/
    }
}
