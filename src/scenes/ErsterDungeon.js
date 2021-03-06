var cursors;
var player; //Spieler
var energy;
var energytwo;
var energythree;
var energyfour;
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
var ogonelf;
var ogonzwoelf;
var ogondreizehn;
var ogonvierzehn;
var ogonfuenfzehn;
var lavaLayer;
var wandLayer;
var randerLayer;
var ausgang;
var grenzLayer;
var position = 0;
var anWand = 0;
var anWandzwei = 0;
var touched = 0;
var touchedzwei = 0;
var toucheddrei = 0;
var touchedvier = 0;
var touchedfuenf = 0;
var touchedsechs = 0;
var touchedsieben = 0;
var touchedacht = 0;
var toucheddreiTimes = 0;
var touchedzweiTimes = 0;
var touchedvierTimes = 0;
var touchedfuenfTimes = 0;
var touchedsechsTimes = 0;
var touchedsiebenTimes = 0;
var touchedachtTimes = 0;
var touchedTimes = 0;
var gesammelt = 0;

class ErsterDungeon extends Phaser.Scene{

    constructor() {
        super({key:'ErsterDungeon',
            physics: { //physics ├╝berschreiben
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
        this.load.spritesheet('ogoni', 'assets/Ogoni.png', {frameWidth: 512,frameHeight: 512}); //Ogoni Spritesheet laden
        this.load.spritesheet('energy', 'assets/energy.png', {frameWidth: 512,frameHeight: 512}); //Ogoni Spritesheet laden

    }

    create(){
        function sammeln(){
            energy.destroy();
            gesammelt++;
        }
        function sammelnzwei(){
            energytwo.destroy();
            gesammelt++;
        }
        function sammelndrei(){
            energythree.destroy();
            gesammelt++;
        }
        function sammelnfour(){
            energyfour.destroy();
            gesammelt++;
        }

        function gestorben(){
            //Spieler auf die Ausgangsposition zur├╝cksetzen
            player.setPosition(600, 200);
            // damit ogons nicht weggeschubst werden, X und Y fixieren
            ogon.setVelocityX(0);
            ogon.setVelocityY(0);
            ogoneins.setVelocityX(0);
            ogoneins.setVelocityY(0);
            ogonzwei.setVelocityX(0);
            ogonzwei.setVelocityY(0);
            ogondrei.setVelocityX(0);
            ogondrei.setVelocityY(0);
            ogonvier.setVelocityX(0);
            ogonvier.setVelocityY(0);
            ogonfuenf.setVelocityX(0);
            ogonfuenf.setVelocityY(0);
            ogonsechs.setVelocityX(0);
            ogonsechs.setVelocityY(0);
            ogonsieben.setVelocityX(0);
            ogonsieben.setVelocityY(0);
            ogonacht.setVelocityX(0);
            ogonacht.setVelocityY(0);
            ogonneun.setVelocityX(0);
            ogonneun.setVelocityY(0);
            ogonzehn.setVelocityX(0);
            ogonzehn.setVelocityY(0);
            ogonelf.setVelocityX(0);
            ogonelf.setVelocityY(0);
            ogonzwoelf.setVelocityX(0);
            ogonzwoelf.setVelocityY(0);
            ogondreizehn.setVelocityX(0);
            ogondreizehn.setVelocityY(0);
        }

        function naechstesLevel(){
            if(gesammelt === 4) {
                this.scene.start('ZweiterDungeon'); //Starts next Scene
            }
        }

        this.add.text(100, 100, "Sammle alle Bruchteile deines Raumschiffes!");
        //Map key
        const dungeon2 = this.make.tilemap({ key: "dungeon2" });
        let cave = dungeon2.addTilesetImage("cave", "cave");

        // layers
        lavaLayer = dungeon2.createLayer("lava", cave, -600, 0).setScale(5).setDepth(-1);
        let bodenLayer = dungeon2.createLayer("boden", cave, 60, 0).setScale(3).setDepth(-1);
        wandLayer = dungeon2.createLayer("wand", cave, 60, 0).setScale(3).setDepth(-1);
        randerLayer = dungeon2.createLayer("raender", cave, 60, 0).setScale(3).setDepth(-1);
        let eingang = dungeon2.createLayer("Eingang", cave, 60, 0).setScale(3).setDepth(-1);
        ausgang = dungeon2.createLayer("Ausgang", cave, 60, 0).setScale(3).setDepth(-1);
        let dekorLayer = dungeon2.createLayer("dekor", cave, 60, 0).setScale(3).setDepth(-1);
        grenzLayer = dungeon2.createLayer("grenze",cave, 60,0).setScale(3).setDepth(-1);
        //player = this.physics.add.sprite(610, 170, 'astro').setScale(0.15);
        player = this.physics.add.sprite(600, 170, 'astro').setScale(0.15);
        //add enemies
        energy = this.physics.add.sprite(500, 800, 'energy').setScale( 0.1);
        energytwo = this.physics.add.sprite(1000, 900, 'energy').setScale( 0.1);
        energythree = this.physics.add.sprite(2100, 920, 'energy').setScale( 0.1);
        energyfour = this.physics.add.sprite(1750, 400, 'energy').setScale( 0.1);

        ogon = this.physics.add.sprite(600, 300, 'ogoni').setScale( 0.12);
        ogoneins = this.physics.add.sprite(700, 370, 'ogoni').setScale(0.12);
        ogonzwei = this.physics.add.sprite(400, 500, 'ogoni').setScale(0.12);
        ogondrei = this.physics.add.sprite(600, 500, 'ogoni').setScale(0.12);
        ogonvier = this.physics.add.sprite(600, 800, 'ogoni').setScale(0.12);
        ogonfuenf = this.physics.add.sprite(400, 800, 'ogoni').setScale(0.12);
        ogonsechs = this.physics.add.sprite(800, 800, 'ogoni').setScale(0.12);
        ogonsieben = this.physics.add.sprite(1000, 750, 'ogoni').setScale(0.12);
        ogonacht = this.physics.add.sprite(1000, 950, 'ogoni').setScale(0.12);
        ogonneun = this.physics.add.sprite(1500, 700, 'ogoni').setScale(0.12);//l├Ąuft diagonal
        ogonzehn = this.physics.add.sprite(1500, 300, 'ogoni').setScale(0.12);
        ogonelf = this.physics.add.sprite(1900, 450, 'ogoni').setScale(0.12);
        ogonzwoelf = this.physics.add.sprite(1900, 750, 'ogoni').setScale(0.12);
        ogondreizehn = this.physics.add.sprite(1750, 1000, 'ogoni').setScale(0.12);
        ogonvierzehn = this.physics.add.sprite(1600, 450, 'ogoni').setScale(0.12);
        ogonfuenfzehn = this.physics.add.sprite(2000, 300, 'ogoni').setScale(0.12);

        player.body.setSize(30, 80);

        this.cameras.main.startFollow(player); //Kamera folgt Spieler
        this.cameras.main.roundPixels = true;

        cursors = this.input.keyboard.createCursorKeys();

        //Animationen
        this.anims.create({
            key: 'shine',
            frames: this.anims.generateFrameNumbers('energy', {start:0 , end: 2}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('ogoni', {start:0 , end: 4}),
            frameRate: 16,
            repeat: -1
        });

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
            anWand = 1; //Wenn das erste mal eine Wand ber├╝hrt wird
            touched ++; //Wie oft die Wand ber├╝hrt wurde
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
        function anWandAngekommenFuenf(){
            anWandzwei = 1;
            touchedfuenf++;
        }
        function anWandAngekommenSechs(){
            touchedsechs++;
        }
        function anWandAngekommenSieben(){
            touchedsieben++;
        }
        function anWandAngekommenAcht(){
            touchedacht++;
        }
        function abprallen(){
            toucheddrei++;
        }
        function abprallenzwei(){
            touchedfuenf++;
        }

        //player Collisions
        this.physics.add.collider(player, wandLayer);
        this.physics.add.collider(player, randerLayer);
        this.physics.add.collider(player, grenzLayer);
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
        this.physics.add.collider(ogonsieben, wandLayer, anWandAngekommenFuenf, null, this);
        this.physics.add.collider(ogonsieben, randerLayer, anWandAngekommenFuenf, null, this);
        this.physics.add.collider(ogonacht, wandLayer, anWandAngekommenFuenf, null, this);
        this.physics.add.collider(ogonacht, randerLayer, anWandAngekommenFuenf, null, this);
        this.physics.add.collider(ogonneun, wandLayer, anWandAngekommenAcht, null, this);
        this.physics.add.collider(ogonneun, randerLayer, anWandAngekommenAcht, null, this);
        this.physics.add.collider(ogonzehn, wandLayer);
        this.physics.add.collider(ogonzehn, randerLayer);
        this.physics.add.collider(ogonelf, wandLayer);
        this.physics.add.collider(ogonelf, randerLayer);
        this.physics.add.collider(ogonzwoelf, wandLayer,anWandAngekommenSechs, null, this);
        this.physics.add.collider(ogonzwoelf, randerLayer,anWandAngekommenSechs, null, this);
        this.physics.add.collider(ogondreizehn, wandLayer,anWandAngekommenSieben, null, this);
        this.physics.add.collider(ogondreizehn, randerLayer,anWandAngekommenSieben, null, this);

        //player energy collsion
        this.physics.add.collider(player, energy, sammeln, null, this);
        this.physics.add.collider(player, energytwo, sammelnzwei, null, this);
        this.physics.add.collider(player, energythree, sammelndrei, null, this);
        this.physics.add.collider(player, energyfour, sammelnfour, null, this);

        //player enemy collision
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
        this.physics.add.collider(player, ogonelf, gestorben, null, this);
        this.physics.add.collider(player, ogonzwoelf, gestorben, null, this);
        this.physics.add.collider(player, ogondreizehn, gestorben, null, this);
        this.physics.add.collider(player, ogonvierzehn, gestorben, null, this);
        this.physics.add.collider(player, ogonfuenfzehn, gestorben, null, this);

        //enemy enemy Collision
        this.physics.add.collider(ogonzwei, ogondrei, abprallen, null, this);
        this.physics.add.collider(ogonsieben, ogonacht, abprallenzwei, null, this);
        //Kollisionsreichweite Tileset
        wandLayer.setCollisionBetween(12, 293);
        randerLayer.setCollisionBetween(176,293);
        ausgang.setCollisionBetween(0, 200);
        randerLayer.setCollisionBetween(176,293);

    }

    update(){

        ogon.anims.play('walk', true);
        ogoneins.anims.play('walk', true);
        ogonzwei.anims.play('walk', true);
        ogondrei.anims.play('walk', true);
        ogonvier.anims.play('walk', true);
        ogonfuenf.anims.play('walk', true);
        ogonsechs.anims.play('walk', true);
        ogonsieben.anims.play('walk', true);
        ogonacht.anims.play('walk', true);
        ogonneun.anims.play('walk', true);
        ogonzehn.anims.play('walk', true);
        ogonelf.anims.play('walk', true);
        ogonzwoelf.anims.play('walk', true);
        ogondreizehn.anims.play('walk', true);
        ogonvierzehn.anims.play('walk', true);
        ogonfuenfzehn.anims.play('walk', true);

        touchedTimes = touched % 2;
        touchedzweiTimes = touchedzwei % 2;
        toucheddreiTimes = toucheddrei % 2;
        touchedvierTimes = touchedvier % 2;
        touchedfuenfTimes = touchedfuenf % 2;
        touchedsechsTimes = touchedsechs % 2;
        touchedsiebenTimes = touchedsieben % 2;
        touchedachtTimes = touchedacht % 2;


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


        if(anWandzwei == 0 && touchedfuenf == 0 ){
            ogonsieben.setVelocityY(-160);
            ogonacht.setVelocityY(160);
        }else if (anWandzwei == 1 && touchedfuenfTimes > 0){
            ogonsieben.setVelocityY(160);
            ogonacht.setVelocityY(-160);
        }else if(anWandzwei == 1 && touchedfuenfTimes == 0){
            ogonsieben.setVelocityY(-160);
            ogonacht.setVelocityY(160);
        }


        if(anWandzwei == 0 && touchedsechs == 0 ){
            ogonzwoelf.setVelocityX(160);
        }else if (anWandzwei == 1 && touchedsechsTimes > 0){
            ogonzwoelf.setVelocityX(-160);
        }else if(anWandzwei == 1 && touchedsechsTimes == 0){
            ogonzwoelf.setVelocityX(160);
        }



        if(anWandzwei == 0 && touchedsieben == 0 ){
            ogondreizehn.setVelocityY(160);
        }else if (anWandzwei == 1 && touchedsiebenTimes > 0){
            ogondreizehn.setVelocityY(-160);
        }else if(anWandzwei == 1 && touchedsiebenTimes == 0){
            ogondreizehn.setVelocityY(160);
        }

        if(anWandzwei == 0 && touchedacht == 0 ){
            ogonneun.setVelocityX(-260);
            ogonneun.setVelocityY(-260);
        }else if (anWandzwei == 1 && touchedachtTimes > 0){
            ogonneun.setVelocityX(260);
            ogonneun.setVelocityY(260);
        }else if(anWandzwei == 1 && touchedachtTimes == 0){
            ogonneun.setVelocityX(-260);
            ogonneun.setVelocityY(-260);
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