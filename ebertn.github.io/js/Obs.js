function Obs () 
{
	this.pos = createVector(width+20, random(height));
	this.vel = createVector(-random(10), 0);

	this.width = 10;
	this.height = 100;

	this.update = function()
	{
		this.pos.add(this.vel);
	}

	this.show = function()
	{
		push();
		fill(255);
		stroke(255);
		rect(this.pos.x, this.pos.y, this.width, this.height);
		pop();
	}
}
