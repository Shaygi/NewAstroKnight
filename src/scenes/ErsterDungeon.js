var cursors;
var player;
var ogon;



var lavaLayer;
var wandLayer;
var randerLayer;
var ausgang;
class ErsterDungeon extends Phaser.Scene{

    constructor() {
        super({key:'ErsterDungeon',
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
        this.platforms
        this.load.image("cave", "assets/tilemaps/cave.png"); //Tileset
        this.load.tilemapTiledJSON('dungeon2', 'assets/tilemaps/ZweiterDungeon.json');
        this.load.spritesheet('astro', 'assets/Astro2.png', { frameWidth: 320, frameHeight: 464 });
        this.load.spritesheet('ogoni', 'assets/Ogoni.png', {frameWidth: 490,frameHeight: 490 });
    }

    create(){
        function gestorben(){
            //player.anims.play('tod', true);
            player.setPosition(600, 200);
        }

        this.platforms = this.physics.add.staticGroup()
        function naechstesLevel(){
            this.scene.start('ZweiterDungeon');
        }
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
        ogon = this.physics.add.sprite(600, 300, 'ogoni').setScale(0.12);
        let ogoneins = this.physics.add.sprite(700, 300, 'ogoni').setScale(0.12);
        let ogonzwei = this.physics.add.sprite(300, 500, 'ogoni').setScale(0.12);
        let ogondrei = this.physics.add.sprite(500, 500, 'ogoni').setScale(0.12);
        let ogonvier = this.physics.add.sprite(700, 800, 'ogoni').setScale(0.12);
        let ogonfuenf = this.physics.add.sprite(500, 500, 'ogoni').setScale(0.12);
        let ogonsechs = this.physics.add.sprite(500, 500, 'ogoni').setScale(0.12);
        let ogonsieben = this.physics.add.sprite(500, 500, 'ogoni').setScale(0.12);
        let ogonacht = this.physics.add.sprite(500, 500, 'ogoni').setScale(0.12);
        let ogonneun = this.physics.add.sprite(500, 500, 'ogoni').setScale(0.12);
        let ogonzehn = this.physics.add.sprite(500, 500, 'ogoni').setScale(0.12);

        player.body.setSize(22, 25, true);
        player.setBounce(0.2);
        this.cameras.main.startFollow(player);

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


        this.physics.add.collider(player, wandLayer);
        this.physics.add.collider(player, randerLayer);
        this.physics.add.collider(player, ausgang, naechstesLevel, null, this);

        this.physics.add.collider(ogon, wandLayer);
        this.physics.add.collider(ogon, randerLayer);
        this.physics.add.collider(ogoneins, wandLayer);
        this.physics.add.collider(ogoneins, randerLayer);
        this.physics.add.collider(ogonzwei, wandLayer);
        this.physics.add.collider(ogonzwei, randerLayer);
        this.physics.add.collider(ogondrei, wandLayer);
        this.physics.add.collider(ogondrei, randerLayer);
        this.physics.add.collider(ogonvier, wandLayer);
        this.physics.add.collider(ogonvier, randerLayer);
        this.physics.add.collider(ogonfuenf, wandLayer);
        this.physics.add.collider(ogonfuenf, randerLayer);
        this.physics.add.collider(ogonsechs, wandLayer);
        this.physics.add.collider(ogonsechs, randerLayer);
        this.physics.add.collider(ogonsieben, wandLayer);
        this.physics.add.collider(ogonsieben, randerLayer);
        this.physics.add.collider(ogonacht, wandLayer);
        this.physics.add.collider(ogonacht, randerLayer);
        this.physics.add.collider(ogonneun, wandLayer);
        this.physics.add.collider(ogonneun, randerLayer);
        this.physics.add.collider(ogonzehn, wandLayer);
        this.physics.add.collider(ogonzehn, randerLayer);


        this.physics.add.collider(player, ogon, gestorben, null, this);
        this.physics.add.collider(player, ogoneins, gestorben, null, this);
        this.physics.add.collider(player, ogonzwei, gestorben, null, this);
        this.physics.add.collider(player, ogondrei, gestorben, null, this);

        wandLayer.setCollisionBetween(12, 293);
        randerLayer.setCollisionBetween(176,293);
        ausgang.setCollisionBetween(0, 200);
        randerLayer.setCollisionBetween(176,293);

    }


    update(){
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