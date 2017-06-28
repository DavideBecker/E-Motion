class Car{

	constructor(){
		//current position = 'relative'
		this.y;
		this.x;
		//returns home to this node when returnHome(); is called
		this.homeNode;
		//dist the car moves between two frames
		this.speed = 1; 
		//capacity
		this.capacity;
		//amount of energy used while driving
		//migth be useless
		this.mileage;			//kWh / kilometer
		//speed at which the car charges 
		//might also be useless
		this.chargingSpeed; 	
		//current charge left
		this.currentCharge;
		//for later use in move
		//this.fromNode;
		this.targetNode;
		this.toNode;
		this.moving = false;
		this.moveDir = createVector(0,0);
	
		this.stepsNeeded;
		this.currentStep;
	
		this.moveStack = [];
	}

	move(){

		if(this.moving){

			//move first, think later
			console.log("moved from "+this.x+" "+this.y+" to: "+this.x+this.moveDir.x+" "+this.y+this.moveDir.y)
			this.x+=this.moveDir.x;
			this.y+=this.moveDir.y;
			this.currentStep++;

			//check if it reached a Node;
			if(this.stepsNeeded-1<this.currentStep){

				//check if its not the targetNode
				if(this.moveStack.length<1){

					//if it reached it targetNode
					//stop Moving and get on the exact position of the Node
					//to hide behind it
					console.log("the car reached the target");
					
					this.moving = false;
					this.x = this.targetNode.x;
					this.y = this.targetNode.y;
					
					
				}
				
				else{


					//move to the next Node 
					
					this.startShortMove(this.toNode,this.moveStack.shift());

				}

			}

		}

	}	

	startShortMove(from,to){


		this.x = from.x;
		this.y = from.y;
		this.moveDir.set(to.x-from.x,to.y-from.y);
		var steps = dist(from.x,from.y,to.x,to.y);
		
		console.log("this car will take "+round(steps)+" frames to move between the nodes");
		
		//sets values
		this.toNode = to;
		this.stepsNeeded = round(steps)/this.speed;
		this.currentStep = 0;
		this.moveDir.div(round(steps));
		this.moveDir.mult(this.speed);	

		console.log(this.moveStack);



	}


	//ooohh ja was ein funktionsname
	startMoveWithPathfinder(from,to){
		this.x = from.x;
		this.y = from.y;
		var finder = new Pathfinder(from,to);
		finder.startFinder();
		if(finder.foundPaths.length>0){
			this.startMoveWithoutPathfinder(finder.foundPaths[round(random(0,finder.foundPaths.length-1))]);
		}


	}


	startMoveWithoutPathfinder(moveArray){
		
		this.x = moveArray[moveArray.length-1].x;
		this.y = moveArray[moveArray.length-1].y;

		this.moving = true;
		this.targetNode = moveArray[0];
		this.moveStack = moveArray;
		this.startShortMove(this.moveStack.shift(),this.moveStack.shift());

	}



}