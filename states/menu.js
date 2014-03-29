var menu_state = {
    create:function () {
        // Call the 'start' function when pressing the space bar
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.start, this);

        // Defining variables
        var style = { font:"30px Arial", fill:"#ffffff" };
        var x = game.world.width / 2, y = game.world.height / 2;

        // Adding a text centered on the screen
        var text = this.game.add.text(x, y - 50, "Press space to start", style);
        text.anchor.setTo(0.5, 0.5);

        // If the user already played
        if (window.score > 0) {
            // Display its score
            var scoreLabel = this.game.add.text(x, y + 50, "score: " + window.score, style);
            scoreLabel.anchor.setTo(0.5, 0.5);
        }
    },

    // Start the actual game
    start:function () {
        this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        this.game.state.start('play');
    }
};