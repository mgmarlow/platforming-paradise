var menuState = {

    create: function(){
        // Add a background image
        game.add.image(0, 0, 'background');

        // Display the name of the game
        var nameLabel = game.add.text(game.world.centerX, -50, 'Platformer Paradise',
                                      { font: '50px Geo', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        //var tween = game.add.tween(nameLabel);

        //tween.to({y: 80}, 1000); // Change position of the label to 80 in 1000 ms
        //tween.start();
        game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out).start(); // shorthand

        // Mute button
        this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
        // When the mouse is over the button, change it to a hand cursor
        this.muteButton.input.useHandCursor = true;
        // Note that if the sound is already muted, we want the proper icon to show
        if (game.sound.mute){
            this.muteButton.frame = 1;
        }

        if (!localStorage.getItem('bestScore')){
            // first time playing, declare bestscore
            localStorage.setItem('bestScore', 0);
        }

        if (game.global.score > localStorage.getItem('bestScore')){
            localStorage.setItem('bestScore', game.global.score);
        }

        // Show the score at the center of the screen
        var text = 'score: ' + game.global.score + '\nbest score: ' +
            localStorage.getItem('bestScore');
        var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, text,
            { font: '30px Geo', fill: '#ffffff', align: 'center' });
        scoreLabel.anchor.setTo(0.5, 0.5);

        var startLabel = game.add.text(game.world.centerX, game.world.height - 80,
                                       'Press UP to start',
                                       { font: '25px Geo', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);
        //game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 500).loop().start();

        // Create keyboard variable
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

        // When 'upKey' is pressed, it will call 'start' once
        upKey.onDown.addOnce(this.start, this);
        // can the start function be put within these parentheses rather than being called separately?

    },

    start: function(){
        // Start the game!
        game.state.start('play');
    },

    toggleSound: function(){
        game.sound.mute = ! game.sound.mute;
        this.muteButton.frame = game.sound.mute ? 1 : 0;
    }
};
