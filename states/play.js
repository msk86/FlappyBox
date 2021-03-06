// Creates a new 'play' state that will contain the game
var play_state = {
    create: function() {
        // Add gravity to the world
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Function called after 'preload' to setup the game
        // Display the bird on the screen
        this.bird = this.game.add.sprite(100, 245, 'bird');

        // Change anchor of bird, make jumping looks better
        this.bird.anchor.setTo(-0.2, 0.5);

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

        this.jumpSound = this.game.add.audio('jump');

        window.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
    },

    update: function() {
        // Function called 60 times per second

        // If the bird is out of the world (too high or too low), call the 'restart_game' function
        if (this.bird.inWorld == false) {
            this.restartGame();
        }

        // Change bird angle
        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }

        // Collisions
        this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    },

    // Make the bird jump
    jump: function() {
        if (this.bird.alive == false) return;
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
        // Angle change
        // create an animation on the bird
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();

        this.jumpSound.play();
    },

    // Hit pipe
    hitPipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    // Restart the game
    restartGame: function() {
        // Stop timer when restart
        this.game.time.events.remove(this.timer);

        // Go back to the 'menu' state
        this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        this.game.state.start('menu');
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
        if(this.pipes.getFirstAlive()) {
            window.score += 1;
            this.labelScore.text = window.score;
        }

        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++) {
            if (i != hole && i != hole +1) {
                this.addOnePipe(400, i*60+10);
            }
        }
    }
};