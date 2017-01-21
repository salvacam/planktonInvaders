var musicEnd;

var End = {

	preload: function(){		
		juego.load.image('boton', 'img/btn.png');
		if (end) {
			juego.load.image('fondo', 'img/fondo_end_good.jpg');
		} else {
			juego.load.image('fondo', 'img/fondo_end_bad.jpg');
		}    

		juego.load.audio('musicEnd', 'music/end.mp3');    
	},

	create: function(){
        //juego.add.tileSprite(0, 0, juego.width, juego.height, 'fondo');

        fondoEnd = juego.add.sprite(0, 0, 'fondo');

		fondoEnd.height = juego.height;
		fondoEnd.width = juego.width;

		var boton = this.add.button(juego.width/2, juego.height/2, 'boton', this.iniciarJuego, this);
		boton.anchor.setTo(0.5);
		boton.scale.setTo(0.75);

		botonInicio = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		        
		var texto = "Muy bien has ganado"
		if (!end){
			texto = "Has perdido"
		}

		//var txtIniciar = juego.add.text(juego.width/2, (juego.height/2) - 75, "Volver a jugar", {font: "bold 24px sans-serif", fill:"#000", align:"center"});
		//txtIniciar.anchor.setTo(0.5);

		var txtTitulo = juego.add.text(juego.width/2, (juego.height/2) - 75, texto, {font: "bold 30px sans-serif", fill:"#F6E801", align:"center"});
		txtTitulo.anchor.setTo(0.5);

		musicEnd = juego.add.audio('musicEnd');
		musicEnd.loop = true;
		musicEnd.play();
	},

	update: function(){
		if(botonInicio.isDown) {
        	this.iniciarJuego();
        }
	},

	iniciarJuego: function(){
		musicEnd.stop();
		this.state.start('Juego');
	}
}