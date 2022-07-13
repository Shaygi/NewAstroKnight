var cursors;
var spacebar;
var player;
var bodenLayer;
var baumLayer;
var platformLayer;
var todesLayer;
var blumeeins;
var blumezwei;
var blumedrei;
var unsichtbareGrenzeLayer;
var canDoubleJump = true;
var jumpCount= 0;
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
        this.load.image("sterne", "assets/tilemaps/star.png"); //Tileset
        this.load.tilemapTiledJSON('dungeon3', 'assets/tilemaps/DritterDungeon.json');
        this.load.spritesheet('astro3', 'assets/Astro2.png', { frameWidth: 320, frameHeight: 464 });//Spieler Spritesheet
        this.load.spritesheet('blume', 'assets/Blume.png', {frameWidth: 480, frameHeight: 480});

    }

    create() {
        function gestorben(){
            player.setPosition(200, 400);
        }

        this.add.image(2500, 300, 'background').setScale(25).setDepth(-2);
        this.add.image(2500, 100, 'background2').setScale(25).setDepth(-2);
        this.add.image(2500, 100, 'background3').setScale(25).setDepth(-2);
        const dungeon = this.make.tilemap({key: "dungeon3"});
        let sterne = dungeon.addTilesetImage("light", "sterne");
        // layers

        let dekozweiLayer = dungeon.createStaticLayer("dekozwei", sterne, 0, 0).setScale(2).setDepth(-1);
        let dekoLayer = dungeon.createStaticLayer("deko", sterne, 0, 0).setScale(2).setDepth(-1);
        platformLayer = dungeon.createStaticLayer("platform", sterne, 0, 0).setScale(2).setDepth(-1);
        todesLayer = dungeon.createStaticLayer("todeszone", sterne, 0, 0).setScale(2).setDepth(-1);
        unsichtbareGrenzeLayer = dungeon.createStaticLayer("unsichtbareGrenze", sterne, 0, 0).setScale(2).setDepth(-1);
        baumLayer = dungeon.createStaticLayer("baum", sterne, 0, 0).setScale(2).setDepth(-1);
        bodenLayer = dungeon.createStaticLayer("boden", sterne, 0, 0).setScale(2).setDepth(-1);
        player = this.physics.add.sprite(1500,150, 'astro3').setScale(0.08);
        blumeeins = this.physics.add.sprite(483.5, 450, 'blume').setScale(0.11);
        blumezwei = this.physics.add.sprite(870, 450, 'blume').setScale(0.11);
        blumedrei = this.physics.add.sprite(1555, 650, 'blume').setScale(0.180);

        this.cameras.main.startFollow(player);
        this.cameras.main.roundPixels = true;

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


    }

    update() {
        blumeeins.anims.play('devour', true);
        blumezwei.anims.play('devour', true);
        blumedrei.anims.play('devour', true);

        const isJumpJustDown = Phaser.Input.Keyboard.JustDown(cursors.up);

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('left', true);
            if(cursors.left.isUp)
            {
                player.setVelocityX(0);
                player.anims.play('turnleft', true);
            }
        }
       /* else if(this.input.keyboard.SPACE){
            player.anims.play('shootright', true);
            player.setVelocityX(160);
        }*/
        /*else if(cursors.left.isUp)
        {
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('turnleft', true);
        }*/
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }

        else if(isJumpJustDown && (player.body.onFloor() || jumpCount < 2)){

            player.setVelocityY(-350);
            player.anims.play('up3', true);
            ++jumpCount;



        }else
        {
            player.setVelocityX(0);
            player.anims.play('turnright', true);
        }

        if(player.body.onFloor() && !isJumpJustDown){
            jumpCount = 0;
        }

    }



    /*
    if(cursors.left.isDown){
        player.setVelocityX(-160);
    }else if (cursors.right.isDown){
        player.setVelocityX(160);
    }
    if (cursors.up.isDown){
        player.setVelocityY(-160);
    }else if (cursors.down.isDown){
        player.setVelocityY(160);
    }

    player.setVelocity(player.velocityX, player.velocityY);
    if(Math.abs(player.velocityX) > 0.1 || Math.abs(player.velocityY) > 0.1){
        player.anims.play('right', true);
    }else{
        player.anims.play('turnright', true);
    }*/

}