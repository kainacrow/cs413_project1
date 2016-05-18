var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x3344ee});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage("submarine.png");

var sprite = new PIXI.Sprite(texture);

sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

sprite.position.x = 200;
sprite.position.y = 380;

stage.addChild(sprite);
var keys = {};

function keyupEventHandler(e) {
    keys[e.which] = false;
}

function keydownEventHandler(e) {
    keys[e.which] = true;
    
    // if(e.keyCode == 87) { // W key pressed
    //     sprite.position.y -= 1;
    // }
    // if(e.keyCode == 83) { // S key pressed
    //     sprite.position.y += 1;
    // }
    // if(e.keyCode == 65) { // A key pressed
    //     sprite.position.x -= 1;
    // }
    // if(e.keyCode == 68) { // D key pressed
    //     sprite.position.x += 1;
    // }
}

document.addEventListener('keydown', keydownEventHandler);
document.addEventListener('keyup', keyupEventHandler);

var fallingObject = PIXI.Texture.fromImage("shark.png");



function animate() {
    requestAnimationFrame(animate);
    //sprite.rotation += 0.1;
    renderer.render(stage);
}
animate();
setInterval(function () {
    if(keys[87]) { // W key pressed
        sprite.position.y -= 5;
    }
    if(keys[83]) { // S key pressed
        sprite.position.y += 5;
    }
    if(keys[65]) { // A key pressed
        sprite.position.x -= 5;
    }
    if(keys[68]) { // D key pressed
        sprite.position.x += 5;
    }
}, 1000/60); // 1000ms/60 = refresh 60 times in 1 second
