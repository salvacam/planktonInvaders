var botonInicio;
var musicInit;

var Inicio = {

	preload: function(){
		juego.load.image('boton', 'img/btn.png');
		juego.load.image('fondo', 'img/fondo_inicio.jpg'); 
		juego.load.audio('musicInit', 'music/inicio.mp3');
	},

	create: function(){
        //juego.add.tileSprite(0, 0, juego.width, juego.height, 'fondo');
        fondoInicio = juego.add.sprite(0, 0, 'fondo');

		fondoInicio.height = juego.height;
		fondoInicio.width = juego.width;

		var boton = this.add.button(juego.width/2, juego.height/2, 'boton', this.iniciarJuego, this);
		boton.anchor.setTo(0.5);
		boton.scale.setTo(0.75);
		
		botonInicio = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		//var txtIniciar = juego.add.text(juego.width/2, (juego.height/2) + 75, "Iniciar juego", {font: "bold 34px sans-serif", fill:"#000", align:"center"});
		//txtIniciar.anchor.setTo(0.5);

		var txtTitulo = juego.add.text(juego.width/2, (juego.height/2) + 75, "Plankton Invader", {font: "bold 44px Arial", fill:"#F6E801", align:"center"});
		txtTitulo.anchor.setTo(0.5);

		musicInit = juego.add.audio('musicInit');
		musicInit.loop = true;
		musicInit.play();
	},

	update: function(){
		if(botonInicio.isDown) {
        	this.iniciarJuego();
        }
	},

	iniciarJuego: function(){
		musicInit.stop();
		this.state.start('Juego');
	}
}