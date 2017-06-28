function JSONtoNodes(objArray){
	//bc i hate myself
	//lets go
	console.log("start conversion");
	var createdNodes = [];

	for(var i = 0 ; i<objArray.length ; i++){ 

		var instance = objArray.pop();
		var tempObj1 = new StreetNode(round(parseInt(instance.x1)/10)*10,round(parseInt(instance.y1)/10)*10);
		var tempObj2 = new StreetNode(round(parseInt(instance.x2)/10)*10,round(parseInt(instance.y2)/10)*10);

		tempObj1.connectedTo.push(tempObj2);
		tempObj2.connectedTo.push(tempObj1);

		var objfound = false;
		var foundat = 0;
		
		for(var i = 0 ; i<createdNodes.length;i++){
			if(tempObj1.x == createdNodes[i].x && tempObj1.y == createdNodes[i].y){
				objfound = true;


	}



	return createdNodes;
	

}
