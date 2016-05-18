var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x3344ee});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var subTexture = PIXI.Texture.fromImage("submarine.png");
var subSprite = new PIXI.Sprite(subTexture); // submarine sprite

subSprite.anchor.x = 0.5;
subSprite.anchor.y = 0.5;

subSprite.position.x = 50;
subSprite.position.y = 200;

var sharkTexture = PIXI.Texture.fromImage("shark.png");
var sharkSprite = new PIXI.Sprite(sharkTexture); // shark sprite

var orangeFishTexture = PIXI.Texture.fromImage("fish1.png");
var orangeFishSprite = new PIXI.Sprite(orangeFishTexture); // orangeFish sprite

var blueFishTexture = PIXI.Texture.fromImage("fish2.png");
var blueFishSprite = new PIXI.Sprite(blueFishTexture);


function collision() {
    if (subSprite.position.x == sharkSprite.position.x){
        
    }
    if (subSprite.position.y == sharkSprite.position.y){
        
    }
}


sharkSprite.position.x = 700;
sharkSprite.position.y = Math.random()*(renderer.height-31)

orangeFishSprite.position.x = 700;
orangeFishSprite.position.y = Math.random()*(renderer.height-50)

blueFishSprite.position.x = 700;
blueFishSprite.position.y = Math.random()*(renderer.height-35)



stage.addChild(subSprite);
stage.addChild(sharkSprite);
stage.addChild(orangeFishSprite);
stage.addChild(blueFishSprite);

var keys = {};

function keyupEventHandler(e) {
    keys[e.which] = false;
}

function keydownEventHandler(e) {
    keys[e.which] = true;
}

document.addEventListener('keydown', keydownEventHandler);
document.addEventListener('keyup', keyupEventHandler);

function movePlayer() {
    if(keys[87]) { // W key pressed
        subSprite.position.y -= 5;
    }
    if(keys[83]) { // S key pressed
        subSprite.position.y += 5;
    }
    if(keys[65]) { // A key pressed
        subSprite.position.x -= 5;
    }
    if(keys[68]) { // D key pressed
        subSprite.position.x += 5;
    }
}

function animate() {
    requestAnimationFrame(animate);
    //sprite.rotation += 0.1;
    renderer.render(stage);
}
animate();
setInterval(function () {
    movePlayer();
}, 1000/60); // 1000ms/60 = refresh 60 times in 1 second
