var loadState = {

    preload: function(){
        // Add loading... label
        var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...',
                                         { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        // Display progress bar
        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        // Load all assets
        game.load.spritesheet('player', 'assets/player2.png', 20, 20);
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('coin', 'assets/coin.png');
        //game.load.image('wallV', 'assets/wallVertical.png');
        //game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('pixel', 'assets/pixel.png');

        // Tile Map with Tiled
        game.load.image('tileset', 'assets/tileset.png');
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);

        // Load a new asset that we will use in the menu state
        game.load.image('background', 'assets/background.png');

        // Load sounds
        // Note: Phaser will use the correct sound depending on the browser automatically
        game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
    },

    create: function(){
        // Go to menu state
        game.state.start('menu');
    }
};
