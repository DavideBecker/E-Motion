class Pathfinder{
	constructor(startNode,targetNode){

		this.start=startNode;
		this.target=targetNode;

		this.foundPaths = [];
	}

	startFinder(){
		this.foundPaths = [];
		this.goDeeper([],this.start);
		
		console.log(this.foundPaths.toString());		
	}

	goDeeper(pathSoFar,current){
		
		pathSoFar.push(current);

		if(current == this.target){

			//console.log(pathSoFar.toString());
			this.foundPaths.push(concat([],pathSoFar)); 
			
		}
		else{
			if(current.connectedTo.length>0){
				for(var i = 0; i < current.connectedTo.length;i++){
					this.goDeeper(pathSoFar,current.connectedTo[i]);
					
				}
				
			}
			else{
			}
	
		}
		pathSoFar.pop();
	
	}


}