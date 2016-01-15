var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var bgCanvas = document.createElement("canvas");
var bgCtx = bgCanvas.getContext("2d");
bgCanvas.width = canvas.width;
bgCanvas.height = canvas.height;

var container = document.getElementById("container");
var canvasContainer = document.getElementById("canvasContainer");
var index = 1;

var bgPath = "images/",
	smashPath = "images/glass/",
	maskPath = "images/masks/";


// Can add more smash and mask effects or change the images so long as the index of the mask and smash are the same
var effects = {
	bg: [bgPath+"colglass-grad.png", bgPath+"futurecity.jpg"],
	smashes: [smashPath+"smash-1-edit-colour.png",smashPath+"smash-2-edit-colour.png",smashPath+"smash-3-edit-colour.png"],
	masks: [maskPath+"mask-1-alpha.png",maskPath+"mask-2-alpha.png",maskPath+"mask-3-alpha.png"]
};

// var bgImages = [],
// 	smashImages = [],
// 	maskImages = [];


// var bgOK,
// 	smashOK,
// 	maskOK;

var imagesPaths = [bgPath+"colglass-grad.png", bgPath+"futurecity.jpg", smashPath+"smash-1-edit-colour.png",
			smashPath+"smash-2-edit-colour.png",smashPath+"smash-3-edit-colour.png",
			maskPath+"mask-1-alpha.png",maskPath+"mask-2-alpha.png",maskPath+"mask-3-alpha.png"];
var images = [];
var imageCount;
var imagesLoaded;

var foreground_image, 
	background_image;


var drawImg = function(context, image) {
	context.drawImage(image,0,0, canvas.width, canvas.height);
};
var clearCanvas = function(context) {
	context.clearRect(0,0,canvas.width, canvas.height);
};


var clickSmash = function() {
	
	if (index < 4) {
		clearCanvas(ctx);
		console.log(index);
		
		ctx.globalCompositeOperation = "source-over";	
		drawImg(ctx, foreground_image);

		
		// Draw smash effect
		console.log(index+1);
		var smashImage = images[index+1];
		ctx.globalCompositeOperation = "source-over";						
		drawImg(ctx, smashImage);
		
		
			
		console.log(index+4);
		var maskImage = images[index+4];	
		var maskedImg = createMaskedBG(background_image, maskImage);

		// Draw masked background
		ctx.globalCompositeOperation = "source-over";			
		drawImg(ctx, maskedImg);			
		
		
	}
	// If on final smash, clear smash effects and show the background image
	else if (index === 4) {
		clearCanvas(ctx);
		index++;	
		ctx.globalCompositeOperation = "source-over";		
		drawImg(ctx, background_image);
	}

	index++;

};

var createMaskedBG = function(bgImg, maskImg) {
	
	clearCanvas(bgCtx);

	//Default drawing behaviour
	bgCtx.globalCompositeOperation = "source-over";
	drawImg(bgCtx, bgImg);
	// destination-in : existing content is kept where it and new content overlap
	bgCtx.globalCompositeOperation = "destination-in";
	drawImg(bgCtx, maskImg);

	var result = new Image();
	result.src = bgCanvas.toDataURL('image/png');	
	return result;

	
};

var init = function() {	

	foreground_image = images[0];
	background_image = images[1];

	clearCanvas(ctx);	
	clearCanvas(bgCtx);
	
	ctx.globalCompositeOperation = "source-over";
	drawImg(ctx, foreground_image);		

	container.addEventListener("click", function(){
		clickSmash();
		if (index <= 6){
			//////////////	Hit animation   /////////////////////
			// To restart the hitting animation remove the class, change a property, then re-add the class
			// thanks to css-tricks.com
			
			canvasContainer.classList.remove("hit");

			canvasContainer.offsetWidth = canvasContainer.offsetWidth;
			
			canvasContainer.classList.add("hit");		
			
			///////////////////////////////////////////////
		}
	});	
	
};

// Preload image arrays to cache images
var preload = function() {
	// bgImages = [];
	// smashImages = [];
	// maskImages = [];

	// bgImagesOK = 0;
	// smashImagesOK = 0;
	// maskImagesOK = 0;
	console.log("in preload");
	imagesLoaded = 0;

	for (var j = 0; j < imagesPaths.length; j++) {
		var eemij = new Image();
		eemij.src = imagesPaths[j];
		images.push(eemij);
		console.log("pushed");
	}

	imageCount = images.length;
	imagesLoaded = 0;

	for(var i = 0; i < imageCount; i++){
	    images[i].onload = function(){
	        imagesLoaded++;
	        if(imagesLoaded == imageCount){
	        	console.log("all loaded");
	            allLoaded();
	        }
	    }
	}
	var allLoaded = function(){
		console.log("init");
	    init();
	}
		

};


preload();