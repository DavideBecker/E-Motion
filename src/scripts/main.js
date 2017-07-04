var streets = locations.streets;
var towns = locations.towns;
var cities = locations.cities;
var allCars = [];
var allKeys = Object.keys(nodes);

var environment = {
    timeline: 0,
    daytime: 0,
    daytimeSteps: 0.001,
    scale: 1.6,

    simulation: {
        truckAmount: 6,
        truckUptime: 6, // In h
        carAmount: 10,
        carChargeLimit: 25 // In %
    }
}

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

function renderMap(sketch) {
    sketch.setup = function() {
        sketch.rectMode(sketch.CENTER);
        var canvas = sketch.createCanvas(sketch.windowWidth - $('#sidebar').width(), sketch.windowHeight - 3);

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

            for(var connectionIndex = 0; connectionIndex < node.connectedTo.length; connectionIndex++) {
                var connectedNode = nodes[node.connectedTo[connectionIndex]];

                stroke(196);
                strokeWeight(1)
                line(node.x * environment.scale, node.y * environment.scale, connectedNode.x * environment.scale, connectedNode.y * environment.scale);
            }

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

var map = new p5(renderMap);

function setup() {
    rectMode(CENTER);
    createCanvas(windowWidth /*- $('#sidebar').width() */, windowHeight - 3);

}

console.log(nodes);









class Car{
    constructor(){
        this.targetNode;
        this.fromNode;
        this.energy;
        this.milage;
        this.currNode;
    
        this.currPos={
            x:0,
            y:0
        }


        //aus meinem alten Auto
        this.moving = false;
        this.moveDir = createVector(0,0);
        this.currentStep;
        this.stepsNeeded;
        this.speed = 1; 


        this.image;
        this.moveStack = [];

        }

    draw(){
        
        if(this.moving){

            // rectMode(CENTER);
            // rect(0,0,10,10);
            // rotate(this.moveDir.heading());
            // translate(this.currPos.x,this.currPos.y);

            rectMode(CENTER);
            rect(this.currPos.x*environment.scale, this.currPos.y*environment.scale, 10,10);
        // /*
        // image(this.image,this.currPos.x,this.currPos.y);
        // */
        }
    }   

    move(){
        if(this.moving){


            //move first, think later
            //console.log("moved from "+this.currPos.x+" "+this.currPos.y+" to: "+this.currPos.x+this.moveDir.x+" "+this.currPos.y+this.moveDir.y)
            this.currPos.x+=this.moveDir.x;
            this.currPos.y+=this.moveDir.y;
            this.currentStep++;

            //check if it reached a Node;
            if(this.stepsNeeded-1<this.currentStep){

                //check if its not the targetNode
                if(this.moveStack.length<1){

                    //if it reached it targetNode
                    //stop Moving and get on the exact position of the Node
                    //to hide behind it
                    //console.log("the car reached the target");
                    
                    this.moving = false;
                    this.currPos.x = this.toNode.x;
                    this.currPos.y = this.toNode.y;
                    
                    //this.startMoveWithoutPathfinder(graph.findShortestPath(this.toNode.id,allKeys[floor(random(0,allKeys.length-1))]));
                    
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






var SpawnCount = 0;
function draw() {
    background(255);
    fill(51)
    
    fill(50, 200, 0)
    //anim.animate();
    SpawnCount++;

    for(var i = 0; i < allCars.length; i++){
        
        allCars[i].move();
        allCars[i].draw();
    }   
    
    if(SpawnCount%5 == 0){
        if(allCars.length>300){
            allCars.shift();
        }
        allCars[allCars.length] = new Car();
        // allCars[allCars.length-1].startMoveWithoutPathfinder(graph.findShortestPath(46207908,4341680));
         allCars[allCars.length-1].startMoveWithoutPathfinder(graph.findCoolerPath(46207908,4341680));
    }

    
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
