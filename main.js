// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that will contain the game
var main_state = {

    preload: function() {
        // Function called first to load all the assets
        // Change the background color of the game
        this.game.stage.backgroundColor = '#71c5cf';

        // Load the bird sprite
        this.game.load.image('bird', 'assets/bird.png');
    },

    create: function() {
        // Function called after 'preload' to setup the game
        // Display the bird on the screen
        this.bird = this.game.add.sprite(100, 245, 'bird');
    },

    update: function() {
        // Function called 60 times per second
    }
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);
game.state.start('main');