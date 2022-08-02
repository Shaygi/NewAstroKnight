var cursors;
var playerzwei;
var wandLayer;
var dekoLayer;
var wasserLayer;
var ausgangsLayer;
var blob;
var blobeins;
var blobzwei;
var blobdrei;
var blobvier;
var blobfuenf;
var blobsechs;
var speed;
var rechtsoderlinks = 0;
var blobtouched = 0;
var blobTouchedTimes = 0;
var blobtouchedZwei = 0;
var blobTouchedTimesZwei = 0;
var blobAnWand = 0;
var blobAnWandZwei = 0;
var energyfuenf;
var energysechs;
var energysieben;
var energyacht;
var energyneun;
var gesammeltzwei = 0;
var walking = false;
var steptwo;
var blobsplash;
class ZweiterDungeon extends Phaser.Scene {

    constructor() {
        super({key:'ZweiterDungeon',
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
        this.load.image("terrain", "assets/tilemaps/tiles.png"); //Tileset
        this.load.tilemapTiledJSON('dungeon', 'assets/tilemaps/Dungeon.json');
        this.load.spritesheet('astro2', 'assets/Astro2.png', { frameWidth: 320, frameHeight: 464 });
        this.load.spritesheet('blob', 'assets/blob.png', {frameWidth: 960 , frameHeight: 960});
        this.load.spritesheet('energy', 'assets/energy.png', {frameWidth: 512,frameHeight: 512}); //Ogoni Spritesheet laden
        this.load.audio('steptwo', "assets/sound/steptwo.ogg");
        this.load.audio('splash', "assets/sound/splash.wav");
    }

    create() {
        steptwo = this.sound.add("steptwo",{loop:true, volume: 1});
        blobsplash = this.sound.add("splash",{loop:true, volume: 0.2});
        function sammelnfuenf(){
            energyfuenf.destroy();
            ding.play();
            gesammeltzwei++;
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

        function blobAnWandAngekommen(){
            blobAnWand = 1; //Wenn das erste mal eine Wand berührt wird
            blobtouched ++; //Wie oft die Wand berührt wurde
        }
        function blobAnWandAngekommenZwei(){
            blobAnWandZwei = 1; //Wenn das erste mal eine Wand berührt wird
            blobtouchedZwei ++; //Wie oft die Wand berührt wurde
        }
        function naechstesLevel(){
            if(gesammeltzwei === 5){
                steptwo.stop();
                blobsplash.stop();
                this.scene.start('DritterDungeon');
            }
        }
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


        if(blobAnWand === 0 && blobtouched === 0 ){
            blobvier.setVelocityY(160);
            blobvier.anims.play('blub', true);
        }else if (blobAnWand === 1 && blobTouchedTimes > 0){
            blobvier.setVelocityY(-160);
            blobvier.anims.play('blubup', true);
        }else if(blobAnWand === 1 && blobTouchedTimes === 0){
            blobvier.setVelocityY(160);
            blobvier.anims.play('blub', true);
        }

        if(blobAnWandZwei === 0 && blobtouchedZwei === 0 ){
            blob.setVelocityX(160);
        }else if (blobAnWandZwei === 1 && blobTouchedTimesZwei > 0){
            blob.setVelocityX(-160);
        }else if(blobAnWandZwei === 1 && blobTouchedTimesZwei === 0){
            blob.setVelocityX(160);
        }

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
