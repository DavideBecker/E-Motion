class StreetNode{
	
	constructor(atX,atY){

		this.x =  atX;
		this.y = atY;
		this.connectedTo = [];

	}

	drawStreets(){
		for(var i = 0 ; i < this.connectedTo.length ; i++){
			//draw Street to all connected Nodes
			line(this.x,this.y,this.connectedTo[i].x,this.connectedTo[i].y);

		}

	}



}