class SmallCity extends StreetNode{
	constructor(){

		//this.chargePercent;
		this.carsHomepoint = [];
		this.r = 10;

	}

	draw(){

		ellipse(this.x,this.y,this.r,this.r);

	}


}