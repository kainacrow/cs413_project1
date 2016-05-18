var gameport = document.getElementById("gameport");

// create renderer
var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x3344ee});
gameport.appendChild(renderer.view);

// create main stage container
var stage = new PIXI.Container();

// create background texture
var backPicture = new PIXI.Sprite(PIXI.Texture.fromImage("background.png"));
backPicture.position.x = 0;
backPicture.position.y = 0;
stage.addChild(backPicture);

// create user sprite and texture
var subTexture = PIXI.Texture.fromImage("submarine.png");
var subSprite = new PIXI.Sprite(subTexture); // submarine sprite

subSprite.anchor.x = 0.5;
subSprite.anchor.y = 0.5;

subSprite.position.x = 50;
subSprite.position.y = 200;

stage.addChild(subSprite);

// create enemy container
var enemies = new PIXI.Container();
stage.addChild(enemies);

var sharkTexture = PIXI.Texture.fromImage("shark.png");
var sharkSprite = new PIXI.Sprite(sharkTexture); // shark sprite

var orangeFishTexture = PIXI.Texture.fromImage("fish1.png");
var orangeFishSprite = new PIXI.Sprite(orangeFishTexture); // orangeFish sprite

var blueFishTexture = PIXI.Texture.fromImage("fish2.png");
var blueFishSprite = new PIXI.Sprite(blueFishTexture);
fishTextures = [sharkTexture, orangeFishTexture, blueFishTexture];

sharkSprite.position.x = 700;
sharkSprite.position.y = Math.random()*(renderer.height-31)

orangeFishSprite.position.x = 700;
orangeFishSprite.position.y = Math.random()*(renderer.height-50)

blueFishSprite.position.x = 700;
blueFishSprite.position.y = Math.random()*(renderer.height-35)

// game over screen
gameOverTexture = new PIXI.Sprite(PIXI.Texture.fromImage("gameover.png"));
gameOverTexture.position.x = 0;
gameOverTexture.position.y = 0;
gameOverTexture.visible = false;
stage.addChild(gameOverTexture);




// enemies.addChild(sharkSprite);
// enemies.addChild(orangeFishSprite);
// enemies.addChild(blueFishSprite);

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
        if(subSprite.position.y > subSprite.height/2){
        subSprite.position.y -= 5;
        }
    }
    if(keys[83]) { // S key pressed
        if(subSprite.position.y < renderer.height - subSprite.height/2)
        subSprite.position.y += 5;
    }
    if(keys[65]) { // A key pressed
        if(subSprite.position.x > subSprite.width/2)
        subSprite.position.x -= 5;
    }
    if(keys[68]) { // D key pressed
        if(subSprite.position.x < renderer.width - subSprite.width/2)
        subSprite.position.x += 5;
    }
}

function animate() {
    requestAnimationFrame(animate);
    movePlayer();
    var spawnProb = .1;
    if ( Math.random() < spawnProb){
        newFish = new PIXI.Sprite(fishTextures[Math.floor(Math.random() * fishTextures.length)]);
        newFish.position.x = 800;
        newFish.position.y = Math.random()*(renderer.height-50)
        enemies.addChild(newFish);
    }
    //enemies.addChild(blueFishSprite) = Math.random() * 5;
    //sharkSprite.position.x -= 1;
    //blueFishSprite.position.x -= Math.random() * 5
    //orangeFishSprite.position.x -= Math.random() * 2.5;
    var fishies = enemies.children;
    for (var i = 0; i < fishies.length; i++){
        //console.log(fishies[i]);
        // if (fishies[i] == sharkSprite){
        //     fishies[i].rotation += 1;
        // }
        fishies[i].position.x -= Math.random() * 2.5;
    }
    //sharkSprite.position.y -= Math.random() * 1;
    collision();
    //fishies[i].rotation += 1;
    renderer.render(stage);
    
}
animate();

function collision() {
    var fishies = enemies.children;
    for (var i = 0; i < fishies.length; i++){
        if (!(fishies[i].position.x > (subSprite.position.x + subSprite.width) || (fishies[i].position.x + fishies[i].width) < subSprite.position.x || fishies[i].position.y > (subSprite.position.y + subSprite.height) || (fishies[i].position.y + fishies[i].height) < subSprite.position.y)){
            gameOverTexture.visible = true;
            document.removeEventListener('keydown', keydownEventHandler);
        }
    
    }
}

// setInterval(function () {
//     movePlayer();
// }, 1000/60); // 1000ms/60 = refresh 60 times in 1 second
