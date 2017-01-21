var alto  = document.documentElement.clientHeight;
var ancho = document.documentElement.clientWidth;

var juego = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'bloque_juego');

juego.state.add('Inicio', Inicio);
juego.state.add('Juego', Juego);
juego.state.add('End', End);

juego.state.start('Inicio');
