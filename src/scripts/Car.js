class Car{

	constructor(){

		//current position = 'relative'
		this.y;
		this.x;
		//returns home to this node when returnHome(); is called
		this.homeNode = homeNode
		//dist the car moves between two frames
		this.speed = 3; 
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
		this.moveDir = new Vector(0,0);
	
		this.stepsNeeded;
		this.currentStep;
	
		this.moveStack = [];
		
	}

	move(){

		if(this.moving){

			//move first, think later
			this.x+=moveDir.x;
			this.y+=moveDir.y;
			this.currentStep++;

			//check if it reached a Node;
			if(this.stepsNeeded-1>this.currentStep){

				//check if its not the targetNode
				if(this.moveStack[this.moveStack.length-1]!=this.targetNode){
					
					//move to the next Node 
					this.startShortMove(this.toNode,this.moveStack.pop());
					
				}
				
				else{

					//if it reached it targetNode
					//stop Moving and get on the exact position of the Node
					//to hide behind it
					this.moving = false;
					this.x = targetNode.x;
					this.y = targetNode.y;

				}

			}

		}

	}	

	startShortMove(from,to){


		this.moveDir = (to.x-from.x,to.y-from.y);
		var steps = dist(from.x,from.y,to.x,to.y);
		
		console.log("this car will take "+round(steps)+" frames to move between the nodes");
		
		//sets values
		this.stepsNeeded = round(steps);
		this.currentStep = 0;
		this.moveDir /= round(steps);

	}

	//ooohh ja was ein funktionsname
	startMoveWithPathfinder(from,to){
		

	}

	startMoveWithoutPathfinder(){

	}



}