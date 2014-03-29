// Initialize Phaser
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game');

// Define 'score' global variable
window.score = 0;

// Define all the states
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

// Start with the 'load' state
game.state.start('load');