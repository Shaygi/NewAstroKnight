/**
 * Szene, in der das Spiel geladen wird. Nachdem wird Cat-Logo gezeigt.
 */



//Variablen
var catlogo;
var starttext;
var backgroundSong;
var storySound;

class LadeFenster extends Phaser.Scene {

    constructor() {
        super('LadeFenster');
    }
    //Preload Funktion
    preload(){
        //Hintergrundmsuik für das Menü laden
        this.load.audio('storySound', "assets/sound/storyBg.mp3");
        this.load.audio('menuSong', "assets/sound/menuMusic.mp3");
        //Variablen für den Ladebalken, die die quadratischen Formen beinhalten
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        //Füllstil, Farbe und Transparenz
        progressBox.fillStyle(0x222222, 0.8);
        //Position und Größe des Quadraten, das gefüllt werden soll
        progressBox.fillRect(570, 270, 320, 50);


        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        //Textstil
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        //Textposition
        loadingText.setOrigin(0.5, -3);

        //Prozentanzahl als Text
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

        //Erhöhung der Prozentanzahl
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(580, 280, 300 * value, 30);
        });
        //Alle Ladebalkenelemente zerstören, sobald alles geladen wurde
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        //Auftauchen des Logos beim Erreichen der Vollständigkeit des Balkens
        for (var i = 0; i < 500; i++) {
            this.load.image('logo' + i, 'assets/logo.png');
        }
        this.load.image('logo', 'assets/logo.png');

    }

    create() {
        //Sound für die Storyszene wird eingefügt und fürs erste pausiert
        storySound = this.sound.add("storySound", {loop: true});
        storySound.play();
        storySound.pause();
        //Hintergrundmusik des Menüs wird hinzugefügt, aber noch nicht abgespielt
        backgroundSong = this.sound.add("menuSong",{loop:false, volume: 0.5});
        //Logo wird hinzugefügt und positioniert
        catlogo = this.add.image(740, 360, 'logo');
        catlogo.setInteractive();//Logo auf interaktiv stellen, damit es angeklickt werden kann
        //Pointerevents
        catlogo.on('pointerdown', () => this.scene.start('MenueFenster'));
        catlogo.on('pointerdown', () => backgroundSong.play());
        //Texthinweis
        starttext = this.add.text(650, 600, "Click to start")
    }

    update() {
        //Pointevents zur Vergrößerung und Verkleinerung beim Hovern
        catlogo.on('pointerover', () => catlogo.setScale(1.1));
        catlogo.on('pointerout', () => catlogo.setScale(1));
    }
}
