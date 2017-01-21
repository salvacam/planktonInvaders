var fondoJuego;
var nave;
var cursores;
var botonDisparo;
var balas;
var tiempoBala = 0;

var enemigos;

var end;

var botonLeft;
var isBotonLeft = false;
var botonRight;
var isBotonRight = false;
var botonFire;
var isBotonFire = false;
var isMobile;
//var depurar;

var Juego = {
    
    preload: function(){
        juego.load.image('fondo', 'img/fondo.jpg');
        juego.load.image('personaje', 'img/bob-esponja.png');
        juego.load.image('laser', 'img/espatula.png');
        juego.load.image('arrow', 'img/arrow.png');
        juego.load.image('fire', 'img/blue-button.png');
        juego.load.image('enemigo', 'img/plankton.png');
    },
    
    create: function(){
        //fondoJuego = juego.add.tileSprite(0, 0, ancho, alto, 'fondo'); 

        fondoJuego = juego.add.sprite(0, 0, 'fondo');

        fondoJuego.height = juego.height;
        fondoJuego.width = juego.width;
        
        nave = juego.add.sprite(juego.width/2, juego.height - 30, 'personaje');
        nave.anchor.setTo(0.5);
        
        cursores = juego.input.keyboard.createCursorKeys();
        botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        balas = juego.add.group();
        balas.enableBody = true;
        balas.physicsBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(20, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('outOfBoundsKill', true);
        balas.setAll('checkWorldBounds', true);
        
        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.physicsBodyType = Phaser.Physics.ARCADE;
        
        //Crear enemigos y mostrarlos en pantalla        
        for(var y = 0; y < 6; y++) // 6
        {
            for(var x = 0; x < 7; x++)
            {
                var enemigo = enemigos.create(x*40, y*20, 'enemigo');
                enemigo.anchor.setTo(0.5);
            }
        }
        enemigos.x = 10;
        enemigos.y = 30;
        
        //var animacion = juego.add.tween(enemigos).to({x:120}, 1500, Phaser.Easing.Linear.None, true, 0, 1500, true);
        var animacion = juego.add.tween(enemigos).to({x:(juego.width - 240)}, (juego.width - 240) * 15, Phaser.Easing.Linear.None, true, 0, (juego.width - 240) * 15, true);
        animacion.onRepeat.add(descender, this);

        juego.input.maxPointers = 2;
        juego.input.multiInputOverride = Phaser.Input.TOUCH_OVERRIDES_MOUSE;
        
        isMobile = false;

        if(juego.device.iOS || juego.device.android) {
            isMobile = true;
        }
            
        if (isMobile){
    
            botonLeft = juego.add.image(15, juego.height - 50, 'arrow');
            botonLeft.angle = 180;
            botonLeft.anchor.setTo(0.5);
            botonLeft.scale.setTo(0.3);

            botonLeft.inputEnabled = true;
            botonLeft.input.useHandCursor = true;
            botonLeft.events.onInputDown.add(onPressed, this);
            botonLeft.events.onInputOver.add(onPressed, this);

            botonLeft.events.onInputUp.add(onReleased, this);
            botonLeft.events.onInputOut.add(onReleased, this);
            

            botonRight = juego.add.image(70, juego.height - 50, 'arrow');
            isBotonRight = false;
            botonRight.anchor.setTo(0.5);
            botonRight.scale.setTo(0.3);
            
            botonRight.inputEnabled = true;
            botonRight.input.useHandCursor = true;
            botonRight.events.onInputDown.add(onPressed, this);
            botonRight.events.onInputOver.add(onPressed, this);

            botonRight.events.onInputUp.add(onReleased, this);
            botonRight.events.onInputOut.add(onReleased, this);

            
            botonFire = juego.add.image(juego.width - 20, juego.height - 50, 'fire');
            isBotonFire = false;
            
            botonFire.anchor.setTo(0.5);
            botonFire.scale.setTo(0.75);

            botonFire.inputEnabled = true;
            botonFire.input.useHandCursor = true;
            botonFire.events.onInputDown.add(onPressed, this);
            botonFire.events.onInputOver.add(onPressed, this);

            botonFire.events.onInputUp.add(onReleased, this);
            botonFire.events.onInputOut.add(onReleased, this);
        }
        

        //depurar = juego.add.text(40, juego.height - 80, "Depurar", {font: "bold 14px sans-serif", fill:"#000", align:"center"});
    },
    
    update: function(){
        
        if(cursores.right.isDown){
            right();
        } else if(cursores.left.isDown) {
            left();
        }

        var bala;
        if(botonDisparo.isDown) {
            disparo();
        }
        var that = this;

        enemigos.forEachAlive(function(enemigo) {
            if(enemigo.previousPosition.y > juego.height - 50 ) {
                end = false;
                that.state.start('End');
            }
        });

        juego.physics.arcade.overlap(balas, enemigos, colision, null, this);

        if (isBotonRight) {
            right();
        } else if (isBotonLeft) {
            left();
        }

        if (isBotonFire) {
            disparo();
        }

        /*
        var textoDepurar = "left: " + isBotonLeft;
        textoDepurar += " right: " + isBotonRight;
        textoDepurar += " disparo: " + isBotonFire;

        depurar.text = textoDepurar;
        */
        
    }
    
};

function colision(bala, enemigo){
    bala.kill();
    enemigo.kill();

    if(!enemigos.getFirstExists()) {
        end = true;
        this.state.start('End');
    }
}

function descender(){
    enemigos.y += 10;
}

function right() {
    if(nave.position.x < juego.width - 10) {
        nave.position.x += 3;
    }
}

function left() {
    if(nave.position.x > 15) {
        nave.position.x -= 3;
    }
}

function disparo() {
    var bala1;
    if(juego.time.now > tiempoBala) {
         bala1 = balas.getFirstExists(false);
    }
    if(bala1) {
        bala1.reset(nave.x, nave.y);
        bala1.body.velocity.y = -300;
        tiempoBala = juego.time.now + 600;
    }
}

function onPressed(sprite){
    if (sprite == botonRight) {
        isBotonRight= true;
        isBotonLeft = false;
        right();
    }
    if (sprite == botonLeft) {
        isBotonRight= false;
        isBotonLeft = true;
        left();
    }
    if (sprite == botonFire) {
        isBotonFire = true;
        disparo();
    }
}

function onReleased(sprite){
    if (sprite == botonRight) {
        isBotonRight= false;
    }
    if (sprite == botonLeft) {
        isBotonLeft= false;
    }
    if (sprite == botonFire) {
        isBotonFire = false;
    }
}