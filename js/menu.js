var menuState = {
    
    create: function(){
        // Add a background image
        game.add.image(0, 0, 'background');
        
        // Display the name of the game
        var nameLabel = game.add.text(game.world.centerX, 80, 'Platformer Paradise', 
                                      { font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        
        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, 'score: ' +
                                      game.global.score, { font: '50px Arial', fill: '#ffffff' });
        scoreLabel.anchor.setTo(0.5, 0.5);
        
        var startLabel = game.add.text(game.world.centerX, game.world.height - 80, 
                                       'Press UP to start', 
                                       { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);
        
        // Create keyboard variable
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
        // When 'upKey' is pressed, it will call 'start' once
        upKey.onDown.addOnce(this.start, this);
        // can the start function be put within these parentheses rather than being called separately?
    },
    
    start: function(){
        // Start the game!
        game.state.start('play');
    }
};