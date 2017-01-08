var juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloque_juego');

juego.state.add('Inicio', Inicio);
juego.state.add('Juego', Juego);
juego.state.add('End', End);

juego.state.start('Inicio');
