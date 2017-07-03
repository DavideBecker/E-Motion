class StreetNode{
	
	constructor(atX,atY){
		//super();

		this.name;
		this.x = atX;
		this.y = atY;
		
		this.connectedTo = [];

	}

	draw(){};

	drawStreets(){
		for(var i = 0 ; i < this.connectedTo.length ; i++){
			//draw Street to all connected Nodes
			line(this.x,this.y,this.connectedTo[i].x,this.connectedTo[i].y);

		}

	}

	toString(){
		return this.name;
	}

	



}