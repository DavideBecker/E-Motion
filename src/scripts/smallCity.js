class SmallCity extends StreetNode{
	

	constructor(atX,atY){
		super();
		
		this.x = atX;
		this.y = atY;
		//this.chargePercent;
		this.carsHomepoint = [];
		this.r = 10;
		

	}

	draw(){

		//fill(100);
		ellipse(this.x,this.y,this.r,this.r);

	}


}