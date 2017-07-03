class BigCity extends StreetNode{
	
	constructor(atX,atY){

		super();
		
		this.x = atX;
		this.y = atY;
		this.carsTargetpoint = [];
		this.s = 15;

		
	}

	draw(){

		rectMode(CENTER);
		//stroke(0);
		strokeWeight(5);
		rect(this.x, this.y, this.s, this.s);
		

	}

}