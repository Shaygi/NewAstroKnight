/**
 * Zweiter Level, also wie 'Cave - Level' bennant.
 */

//Variablen
var cursors;
var playerzwei; //Astronaut
var wandLayer;
var dekoLayer;
var wasserLayer;
var ausgangsLayer;
var blob; //Enemies, mit der Name 'Blob'
var blobeins;
var blobzwei;
var blobdrei;
var blobvier;
var blobfuenf;
var blobsechs;
var blobtouched = 0; //Variablen, die für Kollision benutzt wurden.
var blobTouchedTimes = 0;
var blobtouchedZwei = 0;
var blobTouchedTimesZwei = 0;
var blobAnWand = 0;
var blobAnWandZwei = 0;
var energyfuenf;  //Weitere Energiekerne
var energysechs;
var energysieben;
var energyacht;
var energyneun;
var gesammeltzwei = 0;
var walking = false;
var steptwo;
var blobsplash;
var grunerMonster; // Noch paar Enemies 'gruner Monster'
var grunerMonsterEins;
var monstertouched = 0;
var monsterAnWand = 0;
var monsterTouchedTimes = 0;

class ZweiterDungeon extends Phaser.Scene {

    constructor() {
        super({key:'ZweiterDungeon',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 0}, //Gravitation wird überschrieben. Schwerkraft auf 0, weil wir ein Topdown Dungeon haben
                    debug: false
                }
            }
        });
    }

    /*
    Preload
     */
    preload() {
        //Inhalte laden
        this.load.image("terrain", "assets/tilemaps/tiles.png"); //Tileset
        this.load.tilemapTiledJSON('dungeon', 'assets/tilemaps/Dungeon.json');
        this.load.spritesheet('astro2', 'assets/Astro2.png', { frameWidth: 320, frameHeight: 464 });
        this.load.spritesheet('blob', 'assets/blob.png', {frameWidth: 960 , frameHeight: 960});
        this.load.spritesheet('energy', 'assets/energy.png', {frameWidth: 512,frameHeight: 512}); //Ogoni Spritesheet laden
        this.load.audio('steptwo', "assets/sound/steptwo.ogg");
        this.load.audio('splash', "assets/sound/splash.wav");
        this.load.spritesheet('grunerMonster', 'assets/grunMon.png', { frameWidth: 512, frameHeight:512});
    }

    /*
      Create
     */
    create() {

        grunerMonster = this.physics.add.sprite(1700, 390, 'grunerMonster').setScale(0.11);
        grunerMonsterEins = this.physics.add.sprite(1940, 850, 'grunerMonster').setScale(0.11);
        steptwo = this.sound.add("steptwo",{loop:true, volume: 1});
        blobsplash = this.sound.add("splash",{loop:true, volume: 0.2});

        //Funktionen, um Energies einzusammeln.
        function sammelnfuenf(){
            energyfuenf.destroy();//Energiekern wird entfernt
            ding.play();//sound wird abgespielt
            gesammeltzwei++;//variable gesammeltzwei wird um 1 erhöht
        }
        function sammelnsechs(){
            energysechs.destroy();
            ding.play();
            gesammeltzwei++;
        }
        function sammelnsieben(){
            energysieben.destroy();
            ding.play();
            gesammeltzwei++;
        }
        function sammelnacht(){
            energyacht.destroy();
            ding.play();
            gesammeltzwei++;
        }
        function sammelnneun(){
            energyneun.destroy();
            ding.play();
            gesammeltzwei++;
        }

        //Kolission Funktionen
        function blobAnWandAngekommen(){
            blobAnWand = 1; //Wenn das erste Mal eine Wand berührt wird
            blobtouched ++; //Wie oft die Wand berührt wurde
        }
        function blobAnWandAngekommenZwei(){
            blobAnWandZwei = 1; //Wenn das erste Mal eine Wand berührt wird
            blobtouchedZwei ++; //Wie oft die Wand berührt wurde
            // function
        }
        function monsterAnWandAngekommen(){
                monsterAnWand = 1; //Wenn das erste Mal eine Wand berührt wird
                monstertouched ++; //Wie oft die Wand berührt wurde

        }
        //Wenn alle Energiekerne gesammelt sind und der Astronaut den Ausgang erreicht, wird er zum nächsten Level weitergeleitet.
        function naechstesLevel(){
                //nicht zum dritten Level zugehörige sounds werden stummgestellt
                steptwo.stop();
                blobsplash.stop();
                this.scene.start('DritterDungeon');//nächste Szene wird aufgerufen
        }

        /*
        Funktion 'gestorben'.
        Wenn der Astronaut stirb, kehrt er zurück zum Anfang des Levels.
         */
        function gestorben(){
            gesammeltzwei = 0;
            steptwo.stop();
            blobsplash.stop();

            this.scene.start('ZweiterDungeon');
        }
        const dungeon = this.make.tilemap({ key: "dungeon" });
        let terrain = dungeon.addTilesetImage("DungeonTiles", "terrain");
        // layers
        let schattenLayer = dungeon.createLayer("schatten", terrain, -600, -200).setScale(10).setDepth(-1);
        let bodenLayer = dungeon.createLayer("boden", terrain, 60, 0).setDepth(-1);
        wandLayer = dungeon.createLayer("wand", terrain, 60, 0).setDepth(-1);
        let eingangLayer = dungeon.createLayer("Eingang", terrain, 60, 0).setDepth(-1);
        ausgangsLayer = dungeon.createLayer("Ausgang", terrain, 60, 0).setDepth(-1);
        dekoLayer = dungeon.createLayer("deko", terrain, 60, 0).setDepth(-1);
        wasserLayer = dungeon.createLayer("wasser", terrain, 60, 0).setDepth(-1);
        playerzwei = this.physics.add.sprite(300, 590, 'astro2').setScale(0.15);

        //Schleim Monster
        blob = this.physics.add.sprite(330, 790, 'blob').setScale(0.05);
        blobeins = this.physics.add.sprite(350, 1000, 'blob').setScale(0.05);
        blobzwei = this.physics.add.sprite(800, 690, 'blob').setScale(0.05);
        blobdrei = this.physics.add.sprite(1210, 590, 'blob').setScale(0.05);
        blobvier = this.physics.add.sprite(400, 200, 'blob').setScale(0.05);
        blobfuenf = this.physics.add.sprite(855, 500, 'blob').setScale(0.05);
        blobsechs = this.physics.add.sprite(800, 310, 'blob').setScale(0.05);
        this.cameras.main.startFollow(playerzwei); //Kamera folgt dem Spieler
        this.cameras.main.roundPixels = true; //verhindert tilebleeding

        //Animations
        this.anims.create({
            key: 'blub',
            frames: this.anims.generateFrameNumbers('blob', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'blubup',
            frames: this.anims.generateFrameNumbers('blob', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('astro2', { start: 17, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'tod',
            frames: this.anims.generateFrameNumbers('astro2', { start: 43, end: 48 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('astro2', { start: 30, end: 33 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('astro2', { start: 17, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turnright',
            frames:  this.anims.generateFrameNumbers('astro2', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turnleft',
            frames:  this.anims.generateFrameNumbers('astro2', { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('astro2', { start: 10, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shootright',
            frames: this.anims.generateFrameNumbers('astro2', { start: 34, end: 38 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shootleft',
            frames: this.anims.generateFrameNumbers('astro2', { start: 39, end: 43 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(playerzwei, blob, gestorben, null, this);
        this.physics.add.collider(playerzwei, blobeins, gestorben, null, this);
        this.physics.add.collider(playerzwei, blobzwei, gestorben, null, this);
        this.physics.add.collider(playerzwei, blobdrei, gestorben, null, this);
        this.physics.add.collider(playerzwei, blobvier, gestorben, null, this);
        this.physics.add.collider(playerzwei, blobfuenf, gestorben, null, this);
        this.physics.add.collider(playerzwei, blobsechs, gestorben, null, this);
        //spacebar = this.input.keyboard.addKey(Phaser.input.Keyboard.KeyCodes.SPACE);
        this.physics.add.collider(blob, wandLayer, blobAnWandAngekommenZwei, null, this);
        this.physics.add.collider(blobeins, wandLayer);
        this.physics.add.collider(blobzwei, wandLayer);
        this.physics.add.collider(blobdrei, wandLayer);
        this.physics.add.collider(blobvier, wandLayer, blobAnWandAngekommen, null, this);
        this.physics.add.collider(playerzwei, wandLayer);

        energyfuenf = this.physics.add.sprite(350, 1050, 'energy').setScale( 0.1);
        energysechs = this.physics.add.sprite(1000, 900, 'energy').setScale( 0.1);
        energysieben = this.physics.add.sprite(2300, 1000, 'energy').setScale( 0.1);
        energyacht = this.physics.add.sprite(1450, 400, 'energy').setScale( 0.1);
        energyneun = this.physics.add.sprite(300, 250, 'energy').setScale( 0.1);

        //player energy collsion
        this.physics.add.collider(playerzwei, energyfuenf, sammelnfuenf, null, this);
        this.physics.add.collider(playerzwei, energysechs, sammelnsechs, null, this);
        this.physics.add.collider(playerzwei, energysieben, sammelnsieben, null, this);
        this.physics.add.collider(playerzwei, energyacht, sammelnacht, null, this);
        this.physics.add.collider(playerzwei, energyneun, sammelnneun, null, this);

        this.anims.create({
            key: 'mOben',
            frames: this.anims.generateFrameNumbers('grunerMonster', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'mUnten',
            frames: this.anims.generateFrameNumbers('grunerMonster', { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        //Kollisions
        this.physics.add.collider(playerzwei, grunerMonster, gestorben, null, this);
        this.physics.add.collider(playerzwei, grunerMonsterEins, gestorben, null, this);

        this.physics.add.collider(grunerMonsterEins, wandLayer, monsterAnWandAngekommen, null, this);
        this.physics.add.collider(grunerMonster, wandLayer, monsterAnWandAngekommen, null, this);

        wandLayer.setCollisionBetween(265,352);
        wandLayer.setCollisionBetween(372, 376);
        wandLayer.setCollision(251);
        wandLayer.setCollision(279);
        this.physics.add.collider(playerzwei, dekoLayer);
        dekoLayer.setCollisionBetween(297,355);
        this.physics.add.collider(playerzwei, wasserLayer);
        wasserLayer.setCollisionBetween(186,211);
        wasserLayer.setCollisionBetween(214,242);
        this.physics.add.collider(playerzwei, ausgangsLayer, naechstesLevel, null, this);

        ausgangsLayer.setCollisionBetween(0, 200);

        //Audios
        steptwo.play();
        blobsplash.play();
    }

    update() {

        blobTouchedTimes = blobtouched % 2;
        blobTouchedTimesZwei = blobtouchedZwei % 2;
        blob.anims.play('blub', true);
        blobeins.anims.play('blub', true);
        blobzwei.anims.play('blub', true);
        blobdrei.anims.play('blub', true);
        blobfuenf.anims.play('blub', true);
        blobsechs.anims.play('blub', true);

        monsterTouchedTimes = monstertouched % 2;
        //grunerMonster.anims.play('grunerMonster',true);
        //grunerMonsterEins.anims.play('grunerMonster',true);

        if(monsterAnWand=== 0 && monstertouched === 0){//Keine Wand wurde berührt
            grunerMonsterEins.setVelocityY(160);
            grunerMonsterEins.anims.play('mOben',true);
            grunerMonster.setVelocityY(160);
            grunerMonster.anims.play('mOben',true);
        }else if(monsterAnWand ===1 && monsterTouchedTimes > 0){
            grunerMonsterEins.setVelocityY(-160);
            grunerMonsterEins.anims.play('mUnten', true);
            grunerMonster.setVelocityY(-160);
            grunerMonster.anims.play('mUnten', true);
        }else if(monsterAnWand ===1 && monsterTouchedTimes === 0){
            grunerMonsterEins.setVelocityY(160);
            grunerMonsterEins.anims.play('mOben', true);
            grunerMonster.setVelocityY(160);
            grunerMonster.anims.play('mOben', true);
        }


        if(blobAnWand === 0 && blobtouched === 0 ){//Keine Wand wurde berührt
            blobvier.setVelocityY(160);
            blobvier.anims.play('blub', true);
        }else if (blobAnWand === 1 && blobTouchedTimes > 0){
            blobvier.setVelocityY(-160);
            blobvier.anims.play('blubup', true);
        }else if(blobAnWand === 1 && blobTouchedTimes === 0){
            blobvier.setVelocityY(160);
            blobvier.anims.play('blub', true);
        }

        if(blobAnWandZwei === 0 && blobtouchedZwei === 0 ){//Keine Wand wurde berührt
            blob.setVelocityX(160);
        }else if (blobAnWandZwei === 1 && blobTouchedTimesZwei > 0){
            blob.setVelocityX(-160);
        }else if(blobAnWandZwei === 1 && blobTouchedTimesZwei === 0){
            blob.setVelocityX(160);
        }

        //Cursor events für den Spieler
        if (cursors.left.isDown)
        {
            walking = true;
            playerzwei.setVelocityX(-160);
            playerzwei.anims.play('left', true);

        }
        else if (cursors.right.isDown)
        {
            walking = true;
            playerzwei.setVelocityX(160);
            playerzwei.anims.play('right', true);
        }
        else if (cursors.up.isDown)
        {
            walking = true;
            playerzwei.setVelocityY(-160);
            playerzwei.anims.play('up', true);
        }
        else if (cursors.down.isDown)
        {
            walking = true;
            playerzwei.setVelocityY(160);
            playerzwei.anims.play('down', true);
        }
        else
        {
            walking = false;
            playerzwei.setVelocityX(0);
            playerzwei.setVelocityY(0);
            playerzwei.anims.play('turnright', true);
        }
        if (walking === true){
            steptwo.resume();
        }else{
            steptwo.pause();
        }
    }
}
