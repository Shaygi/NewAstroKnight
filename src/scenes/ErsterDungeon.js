/**
    Erster Level, der "Lava " heißt.
 **/
var cursors;
var player; //Spieler
var energy; //Energies, die Astronaut einsammeln muss.
var energytwo;
var energythree;
var energyfour;
var ogon;// Monsters 'Ogonis'
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
var ding; // Variablen für Audio
var lava;
var burned;
var next;
var step;
var fire;
var bgMusic;
var isWalking = false;
class ErsterDungeon extends Phaser.Scene{

    constructor() {
        super({key:'ErsterDungeon',
            physics: { //physics überschreiben
                default: 'arcade',
                arcade: {
                    gravity: {y: 0}, //Gravitation wird überschrieben. Schwerkraft auf 0, weil wir ein Topdown Dungeon haben
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
        this.load.audio('collect',"assets/sound/coincollect.wav");
        this.load.audio('lava', "assets/sound/lava.wav");
        this.load.audio('fire', "assets/sound/fire.wav");
        this.load.audio('burned', "assets/sound/burned.wav");
        //https://mixkit.co/free-sound-effects/volcano/
        this.load.audio('nextlevel', "assets/sound/nextlvl.wav");
        this.load.audio('step', "assets/sound/step.ogg");
        //https://opengameart.org/content/footsteps-leather-cloth-armor
        this.load.audio('bgMusic', "assets/sound/bgMusic.mp3");
    }

    create(){

        burned = this.sound.add("burned",{loop:false});
        ding = this.sound.add("collect",{loop:false});
        lava = this.sound.add("lava",{loop:true});
        fire = this.sound.add("fire",{loop:true, volume: 0.3});
        next = this.sound.add("nextlevel",{loop:false});
        step = this.sound.add("step",{loop:true, volume: 1});
        bgMusic = this.sound.add("bgMusic",{loop:true, volume: 0.2});

        //Funktionen um Energies einzusammeln.
        function sammeln(){
            energy.destroy();
            ding.play();
            gesammelt++;
        }
        function sammelnzwei(){
            energytwo.destroy();
            ding.play();
            gesammelt++;
        }
        function sammelndrei(){
            energythree.destroy();
            ding.play();
            gesammelt++;
        }
        function sammelnfour(){
            energyfour.destroy();
            ding.play();
            gesammelt++;
        }

        /*
        Funktion 'gestorben'.
        Wenn Astronaut stirb , er kehrt zurück zum Anfang des Levels.
         */
        function gestorben(){
            this.scene.start('ErsterDungeon');
            gesammelt = 0;
            burned.play();
            lava.stop();
            fire.stop();
            bgMusic.stop();
            this.sound.get('step').stop();
        }


        //Wenn alle Energies gesammelt sind und Astronaut den Ausgang erreicht, wird er zum nächsten Level weitergeleitet.
        function naechstesLevel(){
            if(gesammelt === 4) {
                next.play();
                step.stop();
                lava.stop();
                fire.stop();
                this.sound.get('lava').stop();
                this.sound.get('step').stop();
                this.scene.start('ZweiterDungeon'); //Starts next Scene
            }
        }
        //Hinweis für Spieler
        this.add.text(100, 100, "Sammle alle Energiekerne deines Raumschiffes!");
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

        //Player
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
        ogonneun = this.physics.add.sprite(1500, 700, 'ogoni').setScale(0.12);//läuft diagonal
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
        lava.play();
        fire.play();
        step.play();
        bgMusic.play();
    }

    update(){
        //Hier werden alle Spritesheets zur Bewegung gebracht.
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

        //Die Anzahl an Wandberührungen
        touchedTimes = touched % 2; // Bewegung der Sprites wird darauf festgelegt, ob die Anzahl an Berührungen mit den Wänden gerade oder ungerade ist.
        touchedzweiTimes = touchedzwei % 2;
        toucheddreiTimes = toucheddrei % 2;
        touchedvierTimes = touchedvier % 2;
        touchedfuenfTimes = touchedfuenf % 2;
        touchedsechsTimes = touchedsechs % 2;
        touchedsiebenTimes = touchedsieben % 2;
        touchedachtTimes = touchedacht % 2;


        if(anWand === 0 && touched === 0 ){//Keine Wand wurde berührt
              ogon.setVelocityX(160);

        }else if (anWand === 1 && touchedTimes > 0){//wenn die Anzahl an Berührungen größer als 0 ist, also ungerade, läuft das Monster nach links
                ogon.setVelocityX(-160);

        }else if(anWand === 1 && touchedTimes === 0){//wenn die Anzahl an Berührungen gleich 0 ist, also gerade, läuft das Monster nach rechts
            ogon.setVelocityX(160);
        }


        if(anWandzwei === 0 && touchedzwei === 0 ){
                ogoneins.setVelocityX(160);
        }else if (anWandzwei === 1 && touchedzweiTimes > 0){
                ogoneins.setVelocityX(-160);
        }else if(anWandzwei === 1 && touchedzweiTimes === 0){
                ogoneins.setVelocityX(160);
        }

        if(anWandzwei === 0 && toucheddrei === 0 ){
            ogonzwei.setVelocityX(-160);
            ogondrei.setVelocityX(160);
        }else if (anWandzwei === 1 && toucheddreiTimes > 0){
            ogonzwei.setVelocityX(160);
            ogondrei.setVelocityX(-160);
        }else if(anWandzwei === 1 && toucheddreiTimes === 0){
            ogonzwei.setVelocityX(-160);
            ogondrei.setVelocityX(160);
        }

        if(anWandzwei === 0 && touchedvier === 0 ){
            ogonsechs.setVelocityY(-160);
        }else if (anWandzwei === 1 && touchedvierTimes > 0){
            ogonsechs.setVelocityY(160);
        }else if(anWandzwei === 1 && touchedvierTimes === 0){
            ogonsechs.setVelocityY(-160);
        }


        if(anWandzwei === 0 && touchedfuenf === 0 ){
            ogonsieben.setVelocityY(-160);
            ogonacht.setVelocityY(160);
        }else if (anWandzwei === 1 && touchedfuenfTimes > 0){
            ogonsieben.setVelocityY(160);
            ogonacht.setVelocityY(-160);
        }else if(anWandzwei === 1 && touchedfuenfTimes === 0){
            ogonsieben.setVelocityY(-160);
            ogonacht.setVelocityY(160);
        }


        if(anWandzwei === 0 && touchedsechs === 0 ){
            ogonzwoelf.setVelocityX(160);
        }else if (anWandzwei === 1 && touchedsechsTimes > 0){
            ogonzwoelf.setVelocityX(-160);
        }else if(anWandzwei === 1 && touchedsechsTimes === 0){
            ogonzwoelf.setVelocityX(160);
        }



        if(anWandzwei === 0 && touchedsieben === 0 ){
            ogondreizehn.setVelocityY(160);
        }else if (anWandzwei === 1 && touchedsiebenTimes > 0){
            ogondreizehn.setVelocityY(-160);
        }else if(anWandzwei === 1 && touchedsiebenTimes === 0){
            ogondreizehn.setVelocityY(160);
        }

        if(anWandzwei === 0 && touchedacht === 0 ){
            ogonneun.setVelocityX(-260);
            ogonneun.setVelocityY(-260);
        }else if (anWandzwei === 1 && touchedachtTimes > 0){
            ogonneun.setVelocityX(260);
            ogonneun.setVelocityY(260);
        }else if(anWandzwei === 1 && touchedachtTimes === 0){
            ogonneun.setVelocityX(-260);
            ogonneun.setVelocityY(-260);
        }

        //Cursor Events
        if (cursors.left.isDown)//Wenn der linke cursor gedrückt wird, soll die X-Position des Spieler vermindert werden
        {
            isWalking = true;//prüft ob der Spieler läuft, um den Laufsound abspielen zu können
            player.setVelocityX(-160);//der Spieler läuft nach links
            player.anims.play('left', true);//Animation mit dem Key 'left' soll abgespielt werden

        }
        else if (cursors.right.isDown)
        { isWalking = true;
            player.setVelocityX(160);
            player.anims.play('right', true);

        }
        else if (cursors.up.isDown)
        { isWalking = true;
            player.setVelocityY(-160);
            player.anims.play('up', true);

        }
        else if (cursors.down.isDown) {
            isWalking = true;
            player.setVelocityY(160);
            player.anims.play('down', true);
        }
        else
        {
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('turnright', true);
            isWalking = false;
        }

        if (isWalking === true){
            step.resume();
        }else{
            step.pause();
        }
    }
}