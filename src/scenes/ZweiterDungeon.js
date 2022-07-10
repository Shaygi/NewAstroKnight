var cursors;
var spacebar;
var player;
var wandLayer;
var dekoLayer;
var wasserLayer;
var ausgangsLayer;
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
    }



    create() {
        function naechstesLevel(){
            this.scene.start('DritterDungeon');
        }
        const dungeon = this.make.tilemap({ key: "dungeon" });
        let terrain = dungeon.addTilesetImage("DungeonTiles", "terrain");
        // layers
        let schattenLayer = dungeon.createStaticLayer("schatten", terrain, -500, 0).setScale(5).setDepth(-1);
        let bodenLayer = dungeon.createStaticLayer("boden", terrain, 60, 0).setDepth(-1);
        wandLayer = dungeon.createStaticLayer("wand", terrain, 60, 0).setDepth(-1);
        let eingangLayer = dungeon.createStaticLayer("Eingang", terrain, 60, 0).setDepth(-1);
        ausgangsLayer = dungeon.createStaticLayer("Ausgang", terrain, 60, 0).setDepth(-1);
        dekoLayer = dungeon.createStaticLayer("deko", terrain, 60, 0).setDepth(-1);
        wasserLayer = dungeon.createStaticLayer("wasser", terrain, 60, 0).setDepth(-1);
        player = this.physics.add.sprite(300, 590, 'astro2').setScale(0.15);
        //player.body.setSize(22, 25, true);
        player.setBounce(0.2);

        this.cameras.main.startFollow(player);
        this.cameras.main.roundPixels = true;


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('astro', { start: 17, end: 23 }),
            frameRate: 10,
            repeat: -1
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

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
        //spacebar = this.input.keyboard.addKey(Phaser.input.Keyboard.KeyCodes.SPACE);
        this.physics.add.collider(player, wandLayer);
        wandLayer.setCollisionBetween(265,352);
        wandLayer.setCollisionBetween(372, 376);
        wandLayer.setCollision(251);
        wandLayer.setCollision(279);
        this.physics.add.collider(player, dekoLayer);
        dekoLayer.setCollisionBetween(297,355);
        this.physics.add.collider(player, wasserLayer);
        wasserLayer.setCollisionBetween(186,211);
        wasserLayer.setCollisionBetween(214,242);
        this.physics.add.collider(player, ausgangsLayer, naechstesLevel, null, this);
        ausgangsLayer.setCollisionBetween(0, 200);
    }

    update() {

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('left', true);
            if(cursors.left.isUp)
            {
                player.setVelocityX(0);
                player.setVelocityY(0);
                player.anims.play('turnleft', true);
            }
        }
        else if(this.input.keyboard.SPACE){
            player.anims.play('shootright', true);
            player.setVelocityX(160);
        }
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
        /*else if(cursors.right.isUp)
        {
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('turnright', true);
        }*/
        else if (cursors.up.isDown)
        {
            player.setVelocityY(-160);

            player.anims.play('up', true);
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(160);

            player.anims.play('down', true);
        }
        else
        {
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('turnright', true);
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
}
