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
        
        // load all assets
        game.load.image('player', 'assets/player.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        
        // Load a new asset that we will use in the menu state
        game.load.image('background', 'assets/background.png');
    },
    
    create: function(){
        // Go to menu state
        game.state.start('menu');
    }
};