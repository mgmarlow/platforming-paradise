var playState = {

    create: function(){

        // Make sure that the cursor keys do not capture browser movement
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        this.cursor = game.input.keyboard.createCursorKeys();

        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
        };

        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;
        // Player animations
        this.player.animations.add('right', [1, 2], 8, true);
        this.player.animations.add('left', [3, 4], 8, true);

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');

        this.nextEnemy = 0;

        this.coin = game.add.sprite(60, 140, 'coin');
        game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5, 0.5);

        // Audio
        this.jumpSound = game.add.audio('jump');
        this.coinSound = game.add.audio('coin');
        this.deadSound = game.add.audio('dead');

        // Particle Emitter
        this.emitter = game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel'); // Set the pixel image for particles
        this.emitter.setYSpeed(-150, 150); // Speed will randomly be picked between -150 and 150
        this.emitter.setXSpeed(-150, 150);
        this.emitter.gravity = 0; // No gravity for particles

        this.scoreLabel = game.add.text(30, 30, 'score: 0',
                                        { font: '18px Arial', fill: '#ffffff' });

        game.global.score = 0; // Global so that menu can use it

        this.createWorld();
        //game.time.events.loop(2200, this.addEnemy, this);
    },

    update: function(){
        // collision between walls and player
        game.physics.arcade.collide(this.player, this.walls); // this works because we enables Arcade physics for both the player and the walls
        // lets move our player!
        this.movePlayer();

        if(!this.player.inWorld){
            this.playerDie();
        }

        if (this.nextEnemy < game.time.now){
            var start = 4000, end = 1000, maxScore = 100;
            // Make it so difficulty is scaling, here we make it so that the game
            // puts forth more enemies the more score you have collected
            var delay = Math.max(start - (start-end)*game.global.score/maxScore, end);

            this.addEnemy();
            this.nextEnemy = game.time.now + delay; // Update nextEnemy to have a new enemy in 2.2 sec
        }

        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        // note that the two parameters from takeCoin are represented by this.player and this.coin in the overlap function

        // ENEMY COLLISIONS
        // enemies and walls
        game.physics.arcade.collide(this.enemies, this.walls);

        // call 'playerDie' function when the player and enemy overlap
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
    },

    movePlayer: function(){
        // if left arrow is pressed,
        if(this.cursor.left.isDown || this.wasd.left.isDown){
            // move the player to the left
            this.player.body.velocity.x = -200;
            this.player.animations.play('left'); // Begin left animation
        }
        else if(this.cursor.right.isDown || this.wasd.right.isDown){
            // move player to the right
            this.player.body.velocity.x = 200;
            this.player.animations.play('right'); // Begin right animation
        }
        else{
            // Stop the player if neither right nor left is pressed
            this.player.body.velocity.x = 0;
            this.player.animations.stop(); // Halt animations
            this.player.frame = 0; // Set player frame to 0 from spritesheet
        }

        // jumping
        if ((this.cursor.up.isDown || this.wasd.up.isDown) && this.player.body.touching.down){
            // if the up key is pressed and the player is touching the ground
            // jump player
            this.player.body.velocity.y = -320;
            this.jumpSound.play(); // If the player jumps, play this sound
        }
    },

    createWorld: function(){
        // lets add some walls
        this.walls = game.add.group(); // create a new group
        this.walls.enableBody = true;  // add Arcade physics to the whole group

        // create the 10 walls
        game.add.sprite(0, 0, 'wallV', 0, this.walls); // left
        game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right

        game.add.sprite(0, 0, 'wallH', 0, this.walls); // top left
        game.add.sprite(300, 0, 'wallH', 0, this.walls); // top right
        game.add.sprite(0, 320, 'wallH', 0, this.walls); // bottom left
        game.add.sprite(300, 320, 'wallH', 0, this.walls); // bottom right

        game.add.sprite(-100, 160, 'wallH', 0, this.walls); // middle left
        game.add.sprite(400, 160, 'wallH', 0, this.walls); // middle right

        var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
        middleTop.scale.setTo(1.5, 1);
        // (x scale: 1.5 = 150%, y scale: 1 = 100% = no change)

        var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
        middleBottom.scale.setTo(1.5, 1);

        // set all walls to be immovable
        this.walls.setAll('body.immovable', true);

    },

    playerDie: function(){
        // If the player is already dead, do nothing
        if (!this.player.alive){
            return;
        }

        // Make player disappear from the screen
        this.player.kill();

        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;
        this.emitter.start(true, 600, null, 15);

        this.deadSound.play();

        //game.state.start('menu');
        // Call startMenu in 1000ms;
        game.time.events.add(1000, function(){ game.state.start('menu'); }, this);
    },

    takeCoin: function(player, coin){
        game.global.score += 5;
        this.scoreLabel.text = 'score: ' + game.global.score;
        this.coinSound.play();
        game.add.tween(this.player.scale).to({x: 1.3, y: 1.3}, 50).to({x: 1, y: 1}, 150).start();
        this.updateCoinPosition();
        this.coin.scale.setTo(0,0);
        game.add.tween(this.coin.scale).to({x: 1, y: 1}, 300).start();
    },

    updateCoinPosition: function(){
        // store all possible coin positions in array
        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y: 60}, // top row
            {x: 60, y: 140}, {x: 440, y: 140}, // middle row
            {x: 130, y: 300}, {x: 370, y: 300} // bottom row
        ];

        // remove the current coin position from array
        // otherwise coin could appear at the same spot twice in a row
        for(var i = 0; i < coinPosition.length; i++){
            if(coinPosition[i].x === this.coin.x){
                coinPosition.splice(i, 1); // removes i from array
                // array.splice(start, deletecount, item1, item2)
                // remove as many items as deletecount starting from position i
            }
        }

        var newPosition = coinPosition[game.rnd.integerInRange(0, coinPosition.length - 1)];

        // set new position of coin
        this.coin.reset(newPosition.x, newPosition.y);
    },

    addEnemy: function(){
        // get the first dead enemy of the group
        var enemy = this.enemies.getFirstDead();
        // if there isnt a dead enemy, do nothing
        if(!enemy){
            return;
        }

        // initiate enemy
        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.world.centerX, 0);
        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    }

};
