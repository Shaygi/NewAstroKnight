var cursors;
var space;
var player;
var bodenLayer;
var baumLayer;
var platformLayer;
var todesLayer;
var blumeeins;
var blumezwei;
var blumedrei;
var energyzehn;
var energyelf;
var energyzwoelf;
var energydreizehn;
var energyvierzehn;
var energyfuenfzehn;
var energysechzehn;
var energysiebzehn;
var unsichtbareGrenzeLayer;
var canDoubleJump = true;
var jumpCount= 0;
var gesammeltdrei = 0;
var boss;
var raumschiff;
var jump;
var eatenAlive;
var stepthree;
var forest;
var onGrass = false;
class DritterDungeon extends Phaser.Scene {

    constructor() {

        super({
            key:'DritterDungeon',
        });

    }

    preload() {
        this.load.image('background', "assets/tilemaps/dritterDungeonBackground1.png");
        this.load.image('background2', "assets/tilemaps/dritterDungeonBackground2.png");
        this.load.image('background3', "assets/tilemaps/dritterDungeonBackground3.png");
        this.load.image('background4', "assets/tilemaps/dritterDungeonStart.png");
        this.load.image('Walk', "assets/Walk.png");
        this.load.image('Jump', "assets/Jump.png");
        this.load.image("sterne", "assets/tilemaps/star.png"); //Tileset
        this.load.tilemapTiledJSON('dungeon3', 'assets/tilemaps/DritterDungeon.json');
        this.load.spritesheet('astro3', 'assets/Astro2.png', { frameWidth: 320, frameHeight: 464 });//Spieler Spritesheet
        this.load.spritesheet('blume', 'assets/Blume.png', {frameWidth: 480, frameHeight: 480});
        this.load.spritesheet('energy', 'assets/energy.png', {frameWidth: 512,frameHeight: 512});
        this.load.spritesheet('boss', 'assets/boss.png', {frameWidth: 960,frameHeight: 800});
        this.load.image('raumschiff', "assets/Raumschiff.png");
        this.load.audio('jump', "assets/sound/jump.wav");
        this.load.audio('eaten', "assets/sound/eaten.wav");
        this.load.audio('stepthree', "assets/sound/stepthree.wav");
        this.load.audio('forest', "assets/sound/forest.wav");
    }

    create() {
        jump = this.sound.add("jump",{loop:false, volume: 0.2});
        eatenAlive = this.sound.add("eaten",{loop:false});
        stepthree = this.sound.add("stepthree",{loop:true});
        forest = this.sound.add("forest",{loop:true, volume: 0.5});

        function gewonnen(){
            boss.setVelocityX(0);
            boss.setVelocityY(0);

            if (gesammeltdrei === 8){
                stepthree.stop();
                forest.stop();
                bgMusic.stop();
                this.scene.start('WinScene');
            }else{
                forest.stop();
                stepthree.stop();
                bgMusic.stop();
                this.scene.start('LostScene');
            }
        }
        function sammelnzehn(){
            ding.play();
            energyzehn.destroy();
            gesammeltdrei++;
        }
        function sammelnelf(){
            ding.play();
            energyelf.destroy();
            gesammeltdrei++;
        }
        function sammelnzwoelf(){
            ding.play();
            energyzwoelf.destroy();
            gesammeltdrei++;
        }
        function sammelndreizehn(){
            ding.play();
            energydreizehn.destroy();
            gesammeltdrei++;
        }
        function sammelnvierzehn(){
            ding.play();
            energyvierzehn.destroy();
            gesammeltdrei++;
        }
        function sammelnfuenfzehn(){
            ding.play();
            energyfuenfzehn.destroy();
            gesammeltdrei++;
        }
        function sammelnsechzehn(){
            ding.play();
            energysechzehn.destroy();
            gesammeltdrei++;
        }
        function sammelnsiebzehn(){
            ding.play();
            energysiebzehn.destroy();
            gesammeltdrei++;
        }
        function gestorben(){
            gesammeltdrei = 0;
            eatenAlive.play();
            forest.stop();
            this.scene.start('DritterDungeon');
        }
        this.add.image(2500, 300, 'background').setScale(25).setDepth(-2);
        this.add.image(2500, 100, 'background2').setScale(25).setDepth(-2);
        this.add.image(2500, 100, 'background3').setScale(25).setDepth(-2);
        this.add.image(-90, 650, 'background4').setScale(0.4).setDepth(-2);
        this.add.image(100, 400, 'Jump').setScale(0.1).setDepth(-2);
        this.add.image(300, 330, 'Walk').setScale(0.1).setDepth(-2);

        const dungeon = this.make.tilemap({key: "dungeon3"});
        let sterne = dungeon.addTilesetImage("light", "sterne");
        // layers

        let dekozweiLayer = dungeon.createLayer("dekozwei", sterne, 0, 0).setScale(2).setDepth(-1);
        let dekoLayer = dungeon.createLayer("deko", sterne, 0, 0).setScale(2).setDepth(-1);
        platformLayer = dungeon.createLayer("platform", sterne, 0, 0).setScale(2).setDepth(-1);
        todesLayer = dungeon.createLayer("todeszone", sterne, 0, 0).setScale(2).setDepth(-1);
        unsichtbareGrenzeLayer = dungeon.createLayer("unsichtbareGrenze", sterne, 0, 0).setScale(2).setDepth(-1);
        baumLayer = dungeon.createLayer("baum", sterne, 0, 0).setScale(2).setDepth(-1);
        bodenLayer = dungeon.createLayer("boden", sterne, 0, 0).setScale(2).setDepth(-1);

        blumeeins = this.physics.add.sprite(483.5, 450, 'blume').setScale(0.11);
        blumezwei = this.physics.add.sprite(870, 450, 'blume').setScale(0.11);
        blumedrei = this.physics.add.sprite(1555, 650, 'blume').setScale(0.180);

        energyzehn = this.physics.add.sprite(670, 150, 'energy').setScale( 0.05);
        energyelf = this.physics.add.sprite(3445, 150, 'energy').setScale( 0.05);
        energyzwoelf = this.physics.add.sprite(1070, 150, 'energy').setScale( 0.05);
        energydreizehn = this.physics.add.sprite(1440, 250, 'energy').setScale( 0.05);
        energyvierzehn = this.physics.add.sprite(2165, 150, 'energy').setScale( 0.05);
        energyfuenfzehn = this.physics.add.sprite(420, 150, 'energy').setScale( 0.05);
        energysechzehn= this.physics.add.sprite(750, 150, 'energy').setScale( 0.05);
        energysiebzehn= this.physics.add.sprite(1750, 650, 'energy').setScale( 0.05);

        boss = this.physics.add.sprite(4100,250, 'boss').setScale(0.48);
        boss.body.setSize(400,440);

        raumschiff = this.physics.add.sprite(3750, 250, 'raumschiff').setScale( 0.27);
        raumschiff.body.setSize(-10,440);
        player = this.physics.add.sprite(50,470, 'astro3').setScale(0.08);//50
        this.add.text(3200, 300, "Da ist dein Rauschiff!! Hast du alle Energiekerne gesammelt?\n               Wenn nicht, könnte es wieder abstürzen.\n                      Pass gut auf dich auf!");
        this.cameras.main.startFollow(player);
        this.cameras.main.roundPixels = true;

        this.anims.create({
            key:'bossAngriff',
            frames: this.anims.generateFrameNumbers('boss', {start: 0, end: 7}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key:'devour',
            frames: this.anims.generateFrameNumbers('blume', {start: 0, end: 2}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('astro3', {start: 17, end: 23}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up3',
            frames: this.anims.generateFrameNumbers('astro3', {start: 24, end: 25}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turnright',
            frames: this.anims.generateFrameNumbers('astro3', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turnleft',
            frames: this.anims.generateFrameNumbers('astro3', {start: 5, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('astro3', {start: 10, end: 16}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'shootright',
            frames: this.anims.generateFrameNumbers('astro3', {start: 34, end: 38}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shootleft',
            frames: this.anims.generateFrameNumbers('astro3', {start: 39, end: 43}),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, bodenLayer);
        this.physics.add.collider(blumeeins, bodenLayer);
        this.physics.add.collider(blumezwei, bodenLayer);
        this.physics.add.collider(blumedrei, bodenLayer);
        bodenLayer.setCollisionBetween(0, 197);

        this.physics.add.collider(player, platformLayer);
        platformLayer.setCollisionBetween(0, 197);

        this.physics.add.collider(player, todesLayer, gestorben, null, this)
        this.physics.add.collider(player, blumeeins, gestorben, null, this);
        this.physics.add.collider(player, blumezwei, gestorben, null, this);
        this.physics.add.collider(player, blumedrei, gestorben, null, this);
        todesLayer.setCollisionBetween(22, 64);

        this.physics.add.collider(player, unsichtbareGrenzeLayer);
        unsichtbareGrenzeLayer.setCollisionBetween(22, 64);

        this.physics.add.collider(player, baumLayer);
        baumLayer.setCollisionBetween(11, 161);

        this.physics.add.collider(player, energyzehn, sammelnzehn, null, this);
        this.physics.add.collider(player, energyelf, sammelnelf, null, this);
        this.physics.add.collider(player, energyzwoelf, sammelnzwoelf, null, this);
        this.physics.add.collider(player, energydreizehn, sammelndreizehn, null, this);
        this.physics.add.collider(player, energyvierzehn, sammelnvierzehn, null, this);
        this.physics.add.collider(player, energyfuenfzehn, sammelnfuenfzehn, null, this);
        this.physics.add.collider(player, energysechzehn, sammelnsechzehn, null, this);
        this.physics.add.collider(player, energysiebzehn, sammelnsiebzehn, null, this);

        this.physics.add.collider(boss, bodenLayer);

        this.physics.add.collider(raumschiff, bodenLayer);
        this.physics.add.collider(player, raumschiff, gewonnen, null, this);


        this.physics.add.collider(energyzehn, bodenLayer);
        this.physics.add.collider(energyelf, bodenLayer);
        this.physics.add.collider(energyzwoelf, bodenLayer);
        this.physics.add.collider(energydreizehn, bodenLayer);
        this.physics.add.collider(energyvierzehn, bodenLayer);
        this.physics.add.collider(energyfuenfzehn, bodenLayer);
        this.physics.add.collider(energysechzehn, bodenLayer);
        this.physics.add.collider(energysiebzehn, bodenLayer);
        this.physics.add.collider(energyzehn, platformLayer);
        this.physics.add.collider(energyelf, platformLayer);
        this.physics.add.collider(energyzwoelf, platformLayer);
        this.physics.add.collider(energydreizehn, platformLayer);
        this.physics.add.collider(energyvierzehn, platformLayer);
        this.physics.add.collider(energyfuenfzehn, platformLayer);
        this.physics.add.collider(energysechzehn, platformLayer);
        this.physics.add.collider(energysiebzehn, platformLayer);
        stepthree.play();
        forest.play();
    }

    update() {

        blumeeins.anims.play('devour', true);
        blumezwei.anims.play('devour', true);
        blumedrei.anims.play('devour', true);

        boss.anims.play('bossAngriff', true);
        const isJumpJustDown = Phaser.Input.Keyboard.JustDown(cursors.up);

        if (cursors.left.isDown)
        {   onGrass = true;
            player.setVelocityX(-160);
            player.anims.play('left', true);
            if(cursors.left.isUp)
            {   onGrass = true;
                player.setVelocityX(0);
                player.anims.play('turnleft', true);
            }
        }
        else if (cursors.right.isDown)
        {   onGrass = true;
            player.setVelocityX(160);
            player.anims.play('right', true);
        }

        else if(isJumpJustDown && (player.body.onFloor() || jumpCount < 2)){
            jump.play();
            onGrass = false;
            player.setVelocityY(-350);
            player.anims.play('up3', true);
            ++jumpCount;
        }else
        {
            player.setVelocityX(0);
            player.anims.play('turnright', true);
            onGrass = false;
        }

        if(player.body.onFloor() && !isJumpJustDown){
            jumpCount = 0;
            onGrass = false;
        }

        if (onGrass === true){
            stepthree.resume();
        }else{
            stepthree.pause();
        }
    }


}