var streets = locations.streets;
var towns = locations.towns;
var cities = locations.cities;
var allCars = [];
var allKeys = Object.keys(nodes);
var BackgroundCounter = 0;
var allCities = [];
var allCitieNames = [];



var environment = {
    timeline: 0,
    daytime: 0,
    daytimeSteps: 0.1,
    scale: 1,

    simulation: {
        truckAmount: 6,
        truckUptime: 6, // In h
        carAmount: 10,
        carChargeLimit: 25 // In %
    }
}

var getStreetColor;
var getBackgroundColor;

// $(window).on('resize', function() {
//     //
// })

var graph = new Graph(nodeGraph);

graph.findCoolerPath = function(from,to){
    var umwegnode1 = allKeys[floor(random(0,allKeys.length))]
    var umwegnode2 = allKeys[floor(random(0,allKeys.length))]
    
    return graph.findShortestPath(from,umwegnode1).concat(graph.findShortestPath(umwegnode1,to));
}
	

// console.log(graph.findShortestPath('4341680', '152748987'))




class City{
	constructor(name,nodeID){
		this.id = name;
		this.name = this.id;
		this.nodeID = nodeID;
		this.node = nodes[this.nodeID];


		this.parkedCars = [];

		this.color;

	}
	draw(){

	}

	sendAway(to){

		if(this.parkedCars.length>0){

		this.parkedCars[this.parkedCars.length-1].visible = true;
		this.parkedCars.pop().startMoveWithoutPathfinder(graph.findCoolerPath(this.nodeID,to)); 
		}
	}

	getColor(){


	}




}

function createCities(){
	allCities.push(new City('Ditzingen',248169543));
	allCities.push(new City('Leonberg',89317467));
	allCities.push(new City('Sindelnfingen',58922085));
	allCities.push(new City('Musberg',249665541));
	allCities.push(new City('Steinbronn',157476409));
	allCities.push(new City('Filderstadt',124873928));
	allCities.push(new City('Ostfildern',78784342));
	allCities.push(new City('Neuhausen',98860443));
	allCities.push(new City('Esslingen',151269436));
	allCities.push(new City('Altbach',13734131));
	allCities.push(new City('Remseck',90947800));
	allCities.push(new City('Kornwestheim',216687444));
	allCities.push(new City('Korntal-Münchingen',7970225));

	allCitieNames = ['Ditzingen','Leonberg','Sindelnfingen','Musberg','Steinbronn','Filderstadt','Ostfildern','Neuhausen','Esslingen','Altbach','Remseck','Kornwestheim','Korntal-Münchingen'];
}









function renderMap(sketch) {
    sketch.setup = function() {
        sketch.rectMode(sketch.CENTER);
        var canvas = sketch.createCanvas(sketch.windowWidth - $('#sidebar').width(), sketch.windowHeight - 3);
        //sketch.frameRate(1);
        canvas.parent('canvas-wrapper');

        for(var nodeIndex in nodes) {
            var node = nodes[nodeIndex];

            // stroke(51);
            // text(node.x + '\n' + node.   y, node.x, node.y);

            for(var connectionIndex = 0; connectionIndex < node.connectedTo.length; connectionIndex++) {
                var connectedNode = nodes[node.connectedTo[connectionIndex]];

                sketch.stroke(196);
                sketch.strokeWeight(3)
                sketch.line(node.x * environment.scale, node.y * environment.scale, connectedNode.x * environment.scale, connectedNode.y * environment.scale);
            }
        }

        for(var nodeIndex in nodes) {
            var node = nodes[nodeIndex];

            // stroke(51);
            // text(node.x + '\n' + node.   y, node.x, node.y);

            // for(var connectionIndex = 0; connectionIndex < node.connectedTo.length; connectionIndex++) {
            //     var connectedNode = nodes[node.connectedTo[connectionIndex]];

            //     stroke(196);
            //     strokeWeight(1)
            //     line(node.x * environment.scale, node.y * environment.scale, connectedNode.x * environment.scale, connectedNode.y * environment.scale);
            // }

            // fill(51)
            // ellipse(node.x * environment.scale, node.y * environment.scale, 10, 10);
        }

        for(var nodeIndex in nodes) {
            var node = nodes[nodeIndex];

            sketch.noStroke();

            // stroke(51);
            // text(node.x + '\n' + node.y, node.x, node.y);
            // sketch.fill(51)
            // sketch.ellipse(node.x * environment.scale, node.y * environment.scale, 10, 10);

            if(node.isTown) {
                sketch.fill(200, 0, 0);
                sketch.ellipse(node.x * environment.scale, node.y * environment.scale, 14, 14);
            }
        }
    }
    
       	//experimental
    sketch.draw = function(){
    	BackgroundCounter++;
    	sketch.clear();
    	sketch.fill(getBackgroundColor());
    	sketch.rect(-10,-10,1920,1080);
    	if(BackgroundCounter%60==0||true){
    		BackgroundCounter=0;

    		
    	for(var nodeIndex in nodes) {
            var node = nodes[nodeIndex];

            // stroke(51);
            // text(node.x + '\n' + node.   y, node.x, node.y);

            for(var connectionIndex = 0; connectionIndex < node.connectedTo.length; connectionIndex++) {
                var connectedNode = nodes[node.connectedTo[connectionIndex]];

                sketch.stroke(getStreetColor());
                sketch.strokeWeight(3)
                sketch.line(node.x * environment.scale, node.y * environment.scale, connectedNode.x * environment.scale, connectedNode.y * environment.scale);
            }
        }

        for(var nodeIndex in nodes) {
            var node = nodes[nodeIndex];

            // stroke(51);
            // text(node.x + '\n' + node.   y, node.x, node.y);

            // for(var connectionIndex = 0; connectionIndex < node.connectedTo.length; connectionIndex++) {
            //     var connectedNode = nodes[node.connectedTo[connectionIndex]];

            //     stroke(getStreetColor());
            //     strokeWeight(1)
            //     line(node.x * environment.scale, node.y * environment.scale, connectedNode.x * environment.scale, connectedNode.y * environment.scale);
            // }

            // fill(51)
            // ellipse(node.x * environment.scale, node.y * environment.scale, 10, 10);
        }

        for(var nodeIndex in nodes) {
            var node = nodes[nodeIndex];

            sketch.noStroke();

            // stroke(51);
            // text(node.x + '\n' + node.y, node.x, node.y);
            // sketch.fill(51)
            // sketch.ellipse(node.x * environment.scale, node.y * environment.scale, 10, 10);

            if(node.isTown) {
                sketch.fill(200, 0, 0);
                sketch.ellipse(node.x * environment.scale, node.y * environment.scale, 14, 14);
            }
        }
    }

}
 	
}


var map = new p5(renderMap);

function setup() {
//frameRate(60);

createCities();

getBackgroundColor = function(){
	return map(constrain(environment.daytime,0,100),0,100,79,255);
}


getStreetColor = function(){
	return map(constrain(environment.daytime,0,100),0,100,192,69);
}

	console.log(environment.simulation.carAmount);

	for(var i = 0 ; i <  environment.simulation.carAmount ; i++){
		
		allCars[i]=new Car( allCities[floor(random(0,allCities.length))]);
		allCars[i].visible = false;
		allCars[i].hometown.parkedCars.push(allCars[i]);
		//allCars[i].hometown 
		console.log(allCars[i].hometown);

		//allCars[i].startMoveWithoutPathfinder(graph.findCoolerPath( allCars[i].hometown.node.id ,  allKeys[floor(random(0,allKeys.length-1))]  ))

	}


    rectMode(CENTER);
    createCanvas(windowWidth /*- $('#sidebar').width() */, windowHeight - 3);
    console.log("finished setup");
}

console.log(nodes);









class Car{
    constructor(hometown){
        this.targetNode;
        this.fromNode;
        this.maxEnergy = 24;
        this.energy = 24;
        this.tempEnergy =24;

        this.color;
        this.getColor();

        this.milage = 15;
        this.currNode;
    	this.hometown = hometown;


        this.currPos={
            x:0,
            y:0
        
        }

        this.currPos.x = this.hometown.node.x;
        this.currPos.y = this.hometown.node.y;
        

        //aus meinem alten Auto
        this.moving = false;
        this.moveDir = createVector(0,0);
        this.currentStep;
        this.stepsNeeded;
        this.speed = 1; 

        this.stuck = false;

        this.image;
        this.moveStack = [];
        this.visible = true;

        }
    getColor(){
    		
		var input = constrain(map(this.energy,0,this.maxEnergy,0,200),0,200);
		var r,g,b;
		r = map(input,0,100,235,242);
		g = map(input,0,100,87,153);
		b = map(input,0,100,87,74);

		if(input>100){

			r = map(input,100,200,242,39);
			g = map(input,100,200,153,174);
			b = map(input,100,200,74,96);
				} 

				var temp=color(r,g,b); 
			this.color = temp;	
  		}


    draw(){
        
       if(this.visible){
        	
			/*
			rect(0,0,10,10);
        	push();
        	rectMode(CENTER);
            
            rotate(this.moveDir.heading());
            translate(this.currPos.x,this.currPos.y);
            pop();
            */
            if( round(this.energy/0.25)*0.25!= round(this.tempEnergy/0.25)*0.25){
           		this.getColor();
           		this.tempEnergy=this.energy;
            }


            rectMode(CENTER);
            fill(this.color);
            noStroke();
            rect(this.currPos.x*environment.scale, this.currPos.y*environment.scale, 12,12);
        // /*
        // image(this.image,this.currPos.x,this.currPos.y);
        // */
        }
    }   
    goHome(){
    	this.startMoveWithoutPathfinder(graph.findShortestPath(this.toNode.id,this.hometown.nodeID));
    }

    move(){
        if(this.moving){

        	if(this.energy < 0 || this.energy > this.maxEnergy){
        		//this.stuck = true;
        		this.milage*=-1;
        	}


        	this.energy -= this.milage/100;
            //move first, think later
            //console.log("moved from "+this.currPos.x+" "+this.currPos.y+" to: "+this.currPos.x+this.moveDir.x+" "+this.currPos.y+this.moveDir.y)
            
 			if(!this.stuck){
            this.currPos.x+=this.moveDir.x;
            this.currPos.y+=this.moveDir.y;
            this.currentStep++;
        	}
            //check if it reached a Node;

           
            if(this.stepsNeeded-1<this.currentStep){

                //check if its not the targetNode
                if(this.moveStack.length<1){

                    //if it reached it targetNode
                    //stop Moving and get on the exact position of the Node
                    //to hide behind it
                    //console.log("the car reached the target");
                   
                   var inCity = false;
                   var cityNum = 0;
                   for(var i = 0; i < allCities.length;i++){
                   	if(this.toNode.id == allCities[i].nodeID){
                   	inCity = true;
                   	cityNum  = i;
                   		}
                   }

                   if(inCity){
                   	this.visible = false;
                   	allCities[cityNum].parkedCars.push(this);

                   }
                    this.moving = false;
                    this.currPos.x = this.toNode.x;
                    this.currPos.y = this.toNode.y;
                   

                    var extremelyTemp;
                    do {
                    	extremelyTemp = allKeys[floor(random(0,allKeys.length-1))]

                    } while(this.toNode.id == extremelyTemp)

                    //console.log(this.toNode)	

    			
               		//this.startMoveWithoutPathfinder(graph.findCoolerPath(this.toNode.id,extremelyTemp));
	                    
                }
                
                else{


                    //move to the next Node 
                    
                    this.startShortMove(this.toNode.id,this.moveStack.shift());

                }


            }
        

        }

    }   



    startShortMove(from,to){


        this.currPos.x = nodes[from].x;
        this.currPos.y = nodes[from].y;
        this.moveDir.set(nodes[to].x-nodes[from].x,nodes[to].y-nodes[from].y);
        var steps = dist(nodes[from].x,nodes[from].y,nodes[to].x,nodes[to].y);
        
        //console.log("this car will take "+round(steps)+" frames to move between the nodes");
        
        //sets values
        this.toNode = nodes[to];
        this.stepsNeeded = round(steps)/this.speed;
        this.currentStep = 0;
        this.moveDir.div(round(steps));
        this.moveDir.mult(this.speed);  

        console.log(this.moveStack);



    }


    startMoveWithoutPathfinder(moveArray){
        
        this.currPos.x = nodes[moveArray[moveArray.length-1]].x;
        this.currPos.y = nodes[moveArray[moveArray.length-1]].y;

        this.moving = true;
        this.targetNode = moveArray[0];
        this.moveStack = moveArray;
        this.startShortMove(this.moveStack.shift(),this.moveStack.shift());

    }

    

}






var SendCount = 0;

function draw() {

	SendCount++;

	if(SendCount % 5 == 0 ){ 
		//console.log("send event");
	
		SendCount = 0;
	
		if(environment.daytime>50){
			for(var i = 0; i < allCities.length; i++){
				allCities[i].sendAway(199885805);
			}
		}

	}

    //background(255);
    clear();

   //fill(51)
    
    fill(50, 200, 0)

    environment.daytime+=environment.daytimeSteps;
    	if(environment.daytime>=150||environment.daytime<=-100){
    		environment.daytimeSteps*=-1;
    		environment.daytime+=environment.daytimeSteps*2;
    	}
    //anim.animate();
    //SpawnCount++;

    //check amount of cars

    
    if(allCars.length!=environment.simulation.carAmount){
	    while(allCars.length>environment.simulation.carAmount){
	    	allCars.pop();	
	    }
	    while(allCars.length<environment.simulation.carAmount){
	    	//push cars from random cities
	    	allCars.push(new Car(allCities[floor(random(0,allCities.length))]))
	    	allCars[allCars.length-1].visible = false;
	    	allCars[allCars.length-1].hometown.parkedCars.push(allCars[allCars.length-1]);

	    }
	}
	
    //draw all cars
    for(var i = 0; i < allCars.length; i++){
        
        allCars[i].move();
        allCars[i].draw();
    
    }   
    


    // if(SpawnCount%5 == 0){
    //     if(allCars.length>300){
    //         allCars.shift();
    //     }
    //     allCars[allCars.length] = new Car();
    //     // allCars[allCars.length-1].startMoveWithoutPathfinder(graph.findShortestPath(46207908,4341680));
    //      allCars[allCars.length-1].startMoveWithoutPathfinder(graph.findCoolerPath(46207908,4341680));
    // }

    
    //testCar.move();
    //testCar.draw();
    

}
function mousePressed(){
    for(var nodeIndex in nodes){
        if(dist(mouseX,mouseY,nodes[nodeIndex].x,nodes[nodeIndex].y)<5){
            console.log(nodeIndex);
        }
    }
}

$(document).ready(function() {
    $('#sidebar-toggle').click((event) => {
        event.preventDefault()
        $('body').toggleClass('nav-active');
    })

    $('.param.draggable').each((i, el) => {
        $(el).attr('data-value', $(el).val())
    })

    $('.param.draggable').on('input', function(event) {
        $(this).attr('data-value', $(this).val())
    })

    $('.param.numbers .subtract').click(function(event) {
        var $input = $(this).siblings('.amount')
        var val = Number($input.val())

        if(val > 0) {
            $input.val(val - 1)
        }

        $input.trigger('change')
    })

    $('.param.numbers .amount').change(function() {
        var $input = $(this)
        var val = Number($input.val())
        var max = Number($input.attr('max'))

        if(val > max) {
            $input.val(max)
        }

        if(val < 0) {
            $input.val(0)
        }
    })

    $('.param.numbers .add').click(function(event) {
        var $input = $(this).siblings('.amount')
        var val = Number($input.val())
        var max = Number($input.attr('max'))

        if(val < max) {
            $input.val(val + 1)
        } else {
            $input.val(max)
        }

        $input.trigger('change')
    })

    $('#truckAmount').change(function() {
        console.log('truckAmount changed')

        environment.simulation.truckAmount = Number($(this).val())
    })

    $('#truckUptime').change(function() {
        console.log('truckUptime changed')

        environment.simulation.truckUptime = Number($(this).val())
    })

    $('#carChargeLimit').change(function() {
        console.log('carChargeLimit changed')

        environment.simulation.carChargeLimit = Number($(this).val())
    })
})
