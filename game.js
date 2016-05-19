var gameport = document.getElementById("gameport");
var playing = true;
var spawnProb = .020;
var bubbleSpawn = .25;

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

// extra features container
var extras = new PIXI.Container();
stage.addChild(extras);

var largeBubTexture = PIXI.Texture.fromImage("bubble_large.png");
var largeBubSprite = new PIXI.Sprite(largeBubTexture);
var smallBubTexture = PIXI.Texture.fromImage("bubble_small.png");
var smallBubSprite = new PIXI.Sprite(smallBubTexture);
var mediumBubTexture = PIXI.Texture.fromImage("bubble_medium.png");
var mediumBubSprite = new PIXI.Sprite(smallBubTexture);
bubbleTextures = [largeBubTexture, smallBubTexture, mediumBubTexture];



// create user sprite and texture
var subTexture = PIXI.Texture.fromImage("submarine.png");
var subSprite = new PIXI.Sprite(subTexture); // submarine sprite

// subSprite.anchor.x = 0.5;
// subSprite.anchor.y = 0.5;

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

// score
var score = 0;
var scoreCounter = new PIXI.Text("Score: 0", {font:"30px Comic Sans MS", fill: "#fff", strokeThickness: 5});
scoreCounter.position.x = 5;
scoreCounter.position.y = -5;
stage.addChild(scoreCounter);


// enemies.addChild(sharkSprite);
// enemies.addChild(orangeFishSprite);
// enemies.addChild(blueFishSprite);

var keys = {};

function keyupEventHandler(e) {
    keys[e.which] = false;
}

function keydownEventHandler(e) {
    keys[e.which] = true;
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}

document.addEventListener('keydown', keydownEventHandler);
document.addEventListener('keyup', keyupEventHandler);

function movePlayer() {
    if(keys[87] || keys[38]) { // W key pressed
        if(subSprite.position.y > 0){
        subSprite.position.y -= 5;
        }
    }
    if(keys[83] || keys[40]) { // S key pressed
        if(subSprite.position.y < renderer.height - subSprite.height)
        subSprite.position.y += 5;
    }
    if(keys[65] || keys[37]) { // A key pressed
        if(subSprite.position.x > 0)
        subSprite.position.x -= 5;
    }
    if(keys[68] || keys[39]) { // D key pressed
        if(subSprite.position.x < renderer.width - subSprite.width)
        subSprite.position.x += 5;
    }
}

function counter(){
    if (playing){
    scoreCounter.text = "Score: " + Math.floor(++score/60);
    }
}


function animate() {
    requestAnimationFrame(animate);
    movePlayer();
    if ( Math.random() < spawnProb){
        newFish = new PIXI.Sprite(fishTextures[Math.floor(Math.random() * fishTextures.length)]);
        newFish.position.x = 800;
        newFish.position.y = Math.random()*(renderer.height)
        enemies.addChild(newFish);
    }
    if (Math.random() < bubbleSpawn){
        newBubble = new PIXI.Sprite(bubbleTextures[Math.floor(Math.random() * bubbleTextures.length)]);
        newBubble.position.x = Math.random() * (renderer.width);
        newBubble.position.y = 600;
        extras.addChild(newBubble);
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
        fishies[i].position.x -= Math.random() * 3+2;
    }
    var bubs = extras.children;
    for (var i = 0; i < bubs.length; i++){
        bubs[i].position.y -= Math.random() * 2.5;
    }
    //sharkSprite.position.y -= Math.random() * 1;
    collision();
    //fishies[i].rotation += 1;
    spawnProb += .000008;
    counter();
    renderer.render(stage);

}
animate();

function collision() {
    var fishies = enemies.children;
    for (var i = 0; i < fishies.length; i++){
        if (!(fishies[i].position.x > (subSprite.position.x + subSprite.width) || (fishies[i].position.x + fishies[i].width) < subSprite.position.x || fishies[i].position.y > (subSprite.position.y + subSprite.height) || (fishies[i].position.y + fishies[i].height) < subSprite.position.y)){
            gameOverTexture.visible = true;
            document.removeEventListener('keydown', keydownEventHandler);
            playing = false;
        }
    
    }
}

// setInterval(function () {
//     movePlayer();
// }, 1000/60); // 1000ms/60 = refresh 60 times in 1 second
