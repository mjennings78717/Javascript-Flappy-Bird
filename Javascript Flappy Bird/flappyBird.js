//Original code transcribed from https://www.youtube.com/watch?v=L07i4g-zhDA
//Gravity modified.  Included the ability to glide forward, backwards and drop down.

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 95;
var constant;

var bX = 10;
var bY = 150;

var gravity = 0.85;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown", event => {
	if (event.keyCode == 38){
		moveUp();
	} else if (event.keyCode == 39){
		glideForward();
	} else if (event.keyCode == 37){
		glideBackward();
	} else if (event.keyCode == 40){
		moveDown();
	}
});

function moveUp(){
	bY -= 15;
    fly.play();
	gravity = 0.85;
}

function glideForward(){
	if (bX < cvs.width - 100){
		bX += 5;
		gravity = 0.45;
	}
}

function glideBackward() {
	if (bX > 10){
		bX -= 5;
		gravity = 0.45;
	}
}	

function moveDown(){
	bY +=5;
}


// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0); 
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);	
		
		pipe[i].x--;
		
		if( pipe[i].x == 110 ) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
			});
		}
		
		// detect collision

		if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+ bird.height >= pipe[i].y+constant) || bY + bird.height >= cvs.height - fg.height){
				location.reload(); // reload the page 
		}
		
		if(pipe[i].x == 5){
			score++;
			scor.play();
		}
		
		
	}	
		
	ctx.drawImage(fg,0,cvs.height - fg.height);
	
	ctx.drawImage(bird,bX,bY);
	
	bY += gravity;
	
	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Score : "+score,10,cvs.height-20);
	
	requestAnimationFrame(draw);
	
}
	
draw();
