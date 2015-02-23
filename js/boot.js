var bootState = {
    preload: function(){
        // Load the image
        game.load.image('progressBar', 'assets/progressBar.png');
    },
    
    create: function(){
        // Set game settings
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Begin load state
        game.state.start('load');
    }
    
    // Note: no need for an update function!
};