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

        // Load the pipe sprite
        this.game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() {
        // Add gravity to the world
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Function called after 'preload' to setup the game
        // Display the bird on the screen
        this.bird = this.game.add.sprite(100, 245, 'bird');

        // Allow gravity on bird
        this.game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // Call the 'jump' function when the space key is hit
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        // Create pipes
        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');
        this.game.physics.arcade.enable(this.pipes);

        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
    },

    update: function() {
        // Function called 60 times per second

        // If the bird is out of the world (too high or too low), call the 'restart_game' function
        if (this.bird.inWorld == false) {
            this.restartGame();
        }

        // Collisions
        this.game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
    },

    // Make the bird jump
    jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        this.game.state.start('main');

        // Stop timer when restart
        this.game.time.events.remove(this.timer);
    },

    addOnePipe: function(x, y) {
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();

        // Set the new position of the pipe
        pipe.reset(x, y);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        // Kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++) {
            if (i != hole && i != hole +1) {
                this.addOnePipe(400, i*60+10);
            }
        }
    }
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);
game.state.start('main');