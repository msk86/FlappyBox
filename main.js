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

        // Add gravity to the world
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Allow gravity on bird
        this.game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // Call the 'jump' function when the space key is hit
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
    },

    update: function() {
        // Function called 60 times per second
    },

    // Make the bird jump
    jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    }
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);
game.state.start('main');