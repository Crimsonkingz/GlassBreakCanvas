var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var bgCanvas = document.createElement("canvas");
var bgCtx = bgCanvas.getContext("2d");
bgCanvas.width = canvas.width;
bgCanvas.height = canvas.height;

var container = document.getElementById("container");

var index = -1;

var bgPath = "images/";
var smashPath = "images/glass/";
var maskPath = "images/masks/";

// Can add more smash and mask effects or change the images so long as the index of the mask and smash are the same
var effects = {
	bg: ["colglass-grad.png", "futurecity.jpg"],
	smash: ["smash-1-edit-colour.png","smash-2-edit-colour.png","smash-3-edit-colour.png"],
	mask: ["mask-1-alpha.png","mask-2-alpha.png","mask-3-alpha.png"]
};

var foreground_image = new Image();
foreground_image.src = bgPath + effects.bg[0];

var background_image = new Image();
background_image.src = bgPath + effects.bg[1];

var drawImg = function(context, image) {
	context.drawImage(image,0,0, canvas.width, canvas.height);
};
var clearCanvas = function(context) {
	context.clearRect(0,0,canvas.width, canvas.height);
};


var clickSmash = function() {
	if (index < effects.smash.length - 1) {
		index++;
		// Draw smash effect
		var smashImage = new Image();
		smashImage.src = smashPath + effects.smash[index];
		smashImage.addEventListener("load", function(){
			ctx.globalCompositeOperation = "source-over";
			drawImg(ctx, smashImage);
		});
		

		var maskImage = new Image();
		maskImage.src = maskPath + effects.mask[index];
		maskImage.addEventListener("load", function() {	

			var maskedImg = createMaskedBG(background_image, maskImage);
			// Draw masked background
			ctx.globalCompositeOperation = "source-over";
			drawImg(ctx, maskedImg);
		});
	}
	// If on final smash, clear smash effects and show the background image
	else if (index === effects.smash.length - 1) {
		index++;
		clearCanvas(ctx);
		ctx.globalCompositeOperation = "source-over";
		drawImg(ctx, background_image);
	}	
};

var createMaskedBG = function(bgImg, maskImg) {
	bgCtx.globalCompositeOperation = "source-over";
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
	bgCtx.globalCompositeOperation = "source-over";
	clearCanvas(ctx);	
	clearCanvas(bgCtx);

	foreground_image.addEventListener("load", function(){
		ctx.globalCompositeOperation = "source-over";
		drawImg(ctx, foreground_image);

		container.addEventListener("click", function(){
			clickSmash();
		});
	});
	
};

init();