var rocket;
var speed = 10;
var obs = [];

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	background(50);

	rocket = new Rocket(width, height);
}

function draw() {
	// put drawing code here
	if (frameCount % 100 == 0) {
		obs.push(new Obs);
	}

	background(50);

	rocket.update(); 
	rocket.show();

	obs.forEach(function(ob) {
		ob.update();
		ob.show();
	});

	check_collision()

	// orientation = request_orientation();

	orientation = {}
	$.get(
		"http://127.0.0.1:5000/output",
		function(data) {
			console.log('page content: ' + data);
			orientation = JSON.parse(data)
			rocket.pos.y = height*parseFloat(orientation.x)*2
			rocket.pos.x = width*parseFloat(orientation.y)*2
			console.log("orientation.x = " + orientation.x)
			console.log("parseFloat(orientation.x) = " + parseFloat(orientation.x))

			if (parseInt(orientation.status) == 1)
			{
				rocket.shoot();
			}
			
		}
	);

	// console.log("orientation = " + orientation)

	// rocket.pos.y = height*parseFloat(orientation.x)*2
	// rocket.pos.x = width*parseFloat(orientation.y)*2
	// console.log("orientation.x = " + orientation.x)
	// console.log("parseFloat(orientation.x) = " + parseFloat(orientation.x))

	// if (parseInt(orientation.status) == 1) {
	// 	rocket.shoot();
	// }
}

function check_collision() {
	i_bul = 0;
	i_obs = 0
	rocket.bullets.forEach(function(bullet){
		obs.forEach(function(ob) {
			if(between(bullet.pos.x, ob.pos.x, ob.pos.x + ob.width) && between(bullet.pos.y, ob.pos.y, ob.pos.y + ob.height)) {
				obs.splice(i_obs, 1);
			}
			i_obs += 1;
		});
		i_obs = 0;
		i_bul += 1;
	});
}

function between(x, min, max) {
	return x >= min && x <= max;
}

function request_orientation() {
	real_data = JSON.parse('{"x": 0, "y": 0, "status": 0}')
	$.get(
		"http://127.0.0.1:5000/output",
		function(data) {
			console.log('page content: ' + data);
			parsed = JSON.parse(data);
			console.log("parsed = " + parsed)
			real_data.x = parsed.x;
			real_data.y = parsed.y;
			real_data.status = parsed.status;
		}
	);

	console.log()

	return real_data;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		rocket.vel = createVector(-speed, 0);
	}
	if (keyCode === RIGHT_ARROW) {
		rocket.vel = createVector(speed, 0);
	}
	if (keyCode === UP_ARROW) {
		rocket.vel = createVector(0, -speed);
	}
	if (keyCode === DOWN_ARROW) {
		rocket.vel = createVector(0, speed);
	} 
	
	if (keyCode === DELETE) {
		console.log("Pressed space")
		rocket.shoot();
	}
}

function keyReleased() {
	if(keyCode !== DELETE){
		rocket.vel = createVector(0, 0);
	}
	
	return false; // prevent any default behavior
}

