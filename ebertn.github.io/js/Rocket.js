function Rocket ()
{
	this.pos = createVector(500, 500);
	this.vel = createVector(0, 0);
	this.height = 40;
	this.width = 60;
	this.bullets = [];

	this.calcVel = function(myo)
	{
		this.vel = myo.vel;
	}

	this.update = function()
	{
		this.pos.add(this.vel);

		if (this.pos.x > width)
		{
			this.pos.x = width;
		}
		else if (this.pos.x < 0) 
		{
			this.pos.x = 0;
		}
		
		if (this.pos.y > height)
		{
			this.pos.y = height;
		}
		else if (this.pos.y < 0)
		{
			this.pos.y = 0;
		}

		this.bullets.forEach(function(bullet) {
			bullet.update();
			bullet.show();
		});
	}

	this.show = function()
	{	
		// console.log(this.pos.x, this.pos.y)
		push();
		stroke(255);
		fill(255);
		triangle(this.pos.x - this.width, this.pos.y - (this.height)/2, this.pos.x - this.width, this.pos.y + (this.height)/2, this.pos.x, this.pos.y)
		pop();
	}

	this.shoot = function() {
		this.bullets.push(new Bullet(this.pos.x, this.pos.y));
	}
}

function Bullet(x, y){
	this.pos = createVector(x, y);
	this.vel = createVector(10, 0);

	this.show = function(){
		push();
		ellipse(this.pos.x, this.pos.y, 20);
		pop();
	}

	this.update = function() {
		this.pos.add(this.vel)
	}
}