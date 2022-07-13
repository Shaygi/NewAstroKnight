var cursors;
var player; //Spieler
var ogon;// Monster
var ogoneins;
var ogonzwei;
var ogondrei;
var ogonvier;
var ogonfuenf;
var ogonsechs;
var ogonsieben;
var ogonacht;
var ogonneun;
var ogonzehn;
var lavaLayer;
var wandLayer;
var randerLayer;
var ausgang;
var position = 0;
var anWand = 0;
var anWandzwei = 0;
var touched = 0;
var touchedzwei = 0;
var toucheddrei = 0;
var touchedvier = 0;
var toucheddreiTimes = 0;
var touchedzweiTimes = 0;
var touchedvierTimes = 0;
var touchedTimes = 0;
class ErsterDungeon extends Phaser.Scene{

    constructor() {
        super({key:'ErsterDungeon',
            physics: { //physics überschreiben
                default: 'arcade',
                arcade: {
                    gravity: {y: 0}, //Schwerkraft auf 0, weil wir ein Topdown Dungeon haben
                    debug: false
                }
            }
        });
    }

    preload() {
        this.load.image("cave", "assets/tilemaps/cave.png"); //Tileset laden
        this.load.tilemapTiledJSON('dungeon2', 'assets/tilemaps/ZweiterDungeon.json'); //Tilemap laden
        this.load.spritesheet('astro', 'assets/Astro2.png', { frameWidth: 320, frameHeight: 464 }); //Astroknight Spritesheet laden
        this.load.spritesheet('ogoni', 'assets/Ogoni.png', {frameWidth: 490,frameHeight: 490 }); //Ogoni Spritesheet laden
    }

    create(){
        function gestorben(){
            //Spieler auf die Ausgangsposition zurücksetzen
            player.setPosition(600, 200);
        }

        function naechstesLevel(){
            this.scene.start('ZweiterDungeon'); //Starts next Scene
        }

        //Map key
        const dungeon2 = this.make.tilemap({ key: "dungeon2" });
        let cave = dungeon2.addTilesetImage("cave", "cave");

        // layers

        lavaLayer = dungeon2.createStaticLayer("lava", cave, -600, 0).setScale(5).setDepth(-1);
        let bodenLayer = dungeon2.createStaticLayer("boden", cave, 60, 0).setScale(3).setDepth(-1);
        wandLayer = dungeon2.createStaticLayer("wand", cave, 60, 0).setScale(3).setDepth(-1);
        randerLayer = dungeon2.createStaticLayer("ränder", cave, 60, 0).setScale(3).setDepth(-1);
        let eingang = dungeon2.createStaticLayer("Eingang", cave, 60, 0).setScale(3).setDepth(-1);
        ausgang = dungeon2.createStaticLayer("Ausgang", cave, 60, 0).setScale(3).setDepth(-1);
        let dekorLayer = dungeon2.createStaticLayer("dekor", cave, 60, 0).setScale(3).setDepth(-1);
        player = this.physics.add.sprite(610, 170, 'astro').setScale(0.15);
        //fertig
        ogon = this.physics.add.sprite(600, 300, 'ogoni').setScale( 0.12);
        ogoneins = this.physics.add.sprite(700, 370, 'ogoni').setScale(0.12);
        ogonzwei = this.physics.add.sprite(400, 500, 'ogoni').setScale(0.12);
        ogondrei = this.physics.add.sprite(600, 500, 'ogoni').setScale(0.12);
        ogonvier = this.physics.add.sprite(600, 800, 'ogoni').setScale(0.12);
        ogonfuenf = this.physics.add.sprite(400, 800, 'ogoni').setScale(0.12);
        ogonsechs = this.physics.add.sprite(800, 800, 'ogoni').setScale(0.12);
        //noch nicht fertig
        ogonsieben = this.physics.add.sprite(1000, 750, 'ogoni').setScale(0.12);
        ogonacht = this.physics.add.sprite(1000, 950, 'ogoni').setScale(0.12);
        ogonneun = this.physics.add.sprite(1500, 800, 'ogoni').setScale(0.12);
        ogonzehn = this.physics.add.sprite(1500, 300, 'ogoni').setScale(0.12);



        this.cameras.main.startFollow(player); //Kamera folgt Spieler

        cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('astro', { start: 17, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'tod',
            frames: this.anims.generateFrameNumbers('astro', { start: 44, end: 49 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('astro', { start: 30, end: 33 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('astro', { start: 17, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turnright',
            frames:  this.anims.generateFrameNumbers('astro', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turnleft',
            frames:  this.anims.generateFrameNumbers('astro', { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('astro', { start: 10, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shootright',
            frames: this.anims.generateFrameNumbers('astro', { start: 34, end: 38 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shootleft',
            frames: this.anims.generateFrameNumbers('astro', { start: 39, end: 43 }),
            frameRate: 10,
            repeat: -1
        });

        function anWandAngekommen(){
            anWand = 1; //Wenn das erste mal eine Wand berührt wird
            touched ++; //Wie oft die Wand berührt wurde
        }
        function anWandAngekommenZwei(){
            anWandzwei = 1;
            touchedzwei++;
        }
        function anWandAngekommenDrei(){
            anWandzwei = 1;
            toucheddrei++;
        }
        function anWandAngekommenVier(){
            anWandzwei = 1;
            touchedvier++;
        }
        function abprallen(){
            toucheddrei++;
        }


        //player Collisions
        this.physics.add.collider(player, wandLayer);
        this.physics.add.collider(player, randerLayer);
        this.physics.add.collider(player, ausgang, naechstesLevel, null, this);
        //enemy Collisions
        this.physics.add.collider(ogon, wandLayer, anWandAngekommen, null, this);
        this.physics.add.collider(ogon, randerLayer, anWandAngekommen, null,this);
        this.physics.add.collider(ogoneins, wandLayer, anWandAngekommenZwei, null, this);
        this.physics.add.collider(ogoneins, randerLayer, anWandAngekommenZwei, null, this);
        this.physics.add.collider(ogonzwei, wandLayer, anWandAngekommenDrei, null, this);
        this.physics.add.collider(ogonzwei, randerLayer, anWandAngekommenDrei, null, this);
        this.physics.add.collider(ogondrei, wandLayer, anWandAngekommenDrei, null, this);
        this.physics.add.collider(ogondrei, randerLayer, anWandAngekommenDrei, null, this);
        this.physics.add.collider(ogonvier, wandLayer);
        this.physics.add.collider(ogonvier, randerLayer);
        this.physics.add.collider(ogonfuenf, wandLayer);
        this.physics.add.collider(ogonfuenf, randerLayer);
        this.physics.add.collider(ogonsechs, wandLayer, anWandAngekommenVier, null, this);
        this.physics.add.collider(ogonsechs, randerLayer, anWandAngekommenVier, null, this);
        this.physics.add.collider(ogonsieben, wandLayer);
        this.physics.add.collider(ogonsieben, randerLayer);
        this.physics.add.collider(ogonacht, wandLayer);
        this.physics.add.collider(ogonacht, randerLayer);
        this.physics.add.collider(ogonneun, wandLayer);
        this.physics.add.collider(ogonneun, randerLayer);
        this.physics.add.collider(ogonzehn, wandLayer);
        this.physics.add.collider(ogonzehn, randerLayer);

        //player enemy Collision
        this.physics.add.collider(player, ogon, gestorben, null, this);
        this.physics.add.collider(player, ogoneins, gestorben, null, this);
        this.physics.add.collider(player, ogonzwei, gestorben, null, this);
        this.physics.add.collider(player, ogondrei, gestorben, null, this);
        this.physics.add.collider(player, ogonvier, gestorben, null, this);
        this.physics.add.collider(player, ogonfuenf, gestorben, null, this);
        this.physics.add.collider(player, ogonsechs, gestorben, null, this);
        this.physics.add.collider(player, ogonsieben, gestorben, null, this);
        this.physics.add.collider(player, ogonacht, gestorben, null, this);
        this.physics.add.collider(player, ogonneun, gestorben, null, this);
        this.physics.add.collider(player, ogonzehn, gestorben, null, this);
        //enemy enemy Collision
        this.physics.add.collider(ogonzwei, ogondrei, abprallen, null, this);
        //Kollisionsreichweite Tileset
        wandLayer.setCollisionBetween(12, 293);
        randerLayer.setCollisionBetween(176,293);
        ausgang.setCollisionBetween(0, 200);
        randerLayer.setCollisionBetween(176,293);

    }

    update(){
        touchedTimes = touched % 2;
        touchedzweiTimes = touchedzwei % 2;
        toucheddreiTimes = toucheddrei % 2;
        touchedvierTimes = touchedvier % 2;

        if(anWand == 0 && touched == 0 ){
              ogon.setVelocityX(160);
        }else if (anWand == 1 && touchedTimes > 0){
                ogon.setVelocityX(-160);
        }else if(anWand == 1 && touchedTimes == 0){
            ogon.setVelocityX(160);
        }


        if(anWandzwei == 0 && touchedzwei == 0 ){
                ogoneins.setVelocityX(160);
        }else if (anWandzwei == 1 && touchedzweiTimes > 0){
                ogoneins.setVelocityX(-160);
        }else if(anWandzwei == 1 && touchedzweiTimes == 0){
                ogoneins.setVelocityX(160);
        }

        if(anWandzwei == 0 && toucheddrei == 0 ){
            ogonzwei.setVelocityX(-160);
            ogondrei.setVelocityX(160);
        }else if (anWandzwei == 1 && toucheddreiTimes > 0){
            ogonzwei.setVelocityX(160);
            ogondrei.setVelocityX(-160);
        }else if(anWandzwei == 1 && toucheddreiTimes == 0){
            ogonzwei.setVelocityX(-160);
            ogondrei.setVelocityX(160);
        }

        if(anWandzwei == 0 && touchedvier == 0 ){
            ogonsechs.setVelocityY(-160);
        }else if (anWandzwei == 1 && touchedvierTimes > 0){
            ogonsechs.setVelocityY(160);
        }else if(anWandzwei == 1 && touchedvierTimes == 0){
            ogonsechs.setVelocityY(-160);
        }




        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);

        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else if (cursors.up.isDown)
        {
            player.setVelocityY(-160);
            player.anims.play('up', true);
        }
        else if (cursors.down.isDown) {
            player.setVelocityY(160);
            player.anims.play('down', true);
        }
        else
        {
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('turnright', true);
        }

    }
}