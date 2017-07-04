var streets = locations.streets;
var towns = locations.towns;
var cities = locations.cities;

var environment = {
    timeline: 0,
    daytime: 0,
    daytimeSteps: 0.001,
    scale: 1.6,

    simulation: {
        trucks: 6,
        cars: 10,
        truckUptime: 6, // In h
        carChargeLimit: 25 // In %
    }
}

// $(window).on('resize', function() {
//     //
// })

var graph = new Graph(nodeGraph);

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
            sketch.fill(51)
            sketch.ellipse(node.x * environment.scale, node.y * environment.scale, 10, 10);

            if(node.isTown) {
                sketch.fill(200, 0, 0);
                sketch.ellipse(node.x * environment.scale, node.y * environment.scale, 20, 20);
            }
        }
    }
}

var map = new p5(renderMap);

function setup() {
    rectMode(CENTER);
    createCanvas(windowWidth /*- $('#sidebar').width() */, windowHeight - 3);

    // strokeWeight(2);

    // for(var streetsIndex = 0; streetsIndex < streets.length; streetsIndex++) {
    //     var c = streets[streetsIndex];

    //     line(c.x1 * environment.scale, c.y1 * environment.scale, c.x2 * environment.scale, c.y2 * environment.scale);
    // }

    // for(var citiesIndex = 0; citiesIndex < cities.length; citiesIndex++) {
    //     var city = cities[citiesIndex];

    //     rect(city.x * environment.scale, city.y * environment.scale, city.w * 4, city.w * 4);
    // }

    // var startNode = nodes[floor(0, nodes.length - 1)];

    // ellipse(startNode.x, startNode.y, 20, 20);


    // for(var vertical = 0; vertical < width / 30; vertical++) {
    //     line(vertical * 30, 0, vertical * 30, height)
    // }

    // for(var horizontal = 0; horizontal < height / 30; horizontal++) {
    //     line(0, horizontal * 30, width, horizontal * 30)
    // }

    // for(var citiesIndex = 0; citiesIndex < cities.length; citiesIndex++) {
    //     var city = cities[citiesIndex];

    //     rect(city.x * environment.scale, city.y * environment.scale, city.w * 4, city.w * 4);
    // }

    // var startNode = nodes[floor(0, nodes.length - 1)];

    // ellipse(startNode.x, startNode.y, 20, 20);


    // for(var vertical = 0; vertical < width / 30; vertical++) {
    //     line(vertical * 30, 0, vertical * 30, height)
    // }

    // for(var horizontal = 0; horizontal < height / 30; horizontal++) {
    //     line(0, horizontal * 30, width, horizontal * 30)
    // }
}

console.log(nodes);

function draw() {
    background(255);
    fill(51)
    // renderMap();
    fill(50, 200, 0)
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
    })
})



/* exeeds callstack size :(
class Pathfinder{
    constructor(startNode,targetNode){

        this.start=startNode;
        this.target=targetNode;

        this.foundPaths = [];
    }

    startFinder(){
        this.foundPaths = [];
        this.goDeeper([],this.start);

        for(var i in nodes){
            nodes[i].visited = false;
        }
        
        console.log(this.foundPaths.toString());        
    }

    goDeeper(pathSoFar,current,count){
        this.val = count;

        
        pathSoFar.push(current);

        if(this.val>5){
            return;
        } 


        //console.log(current);
        if(current == this.target){

            //console.log(pathSoFar.toString());
            this.foundPaths.push(concat([],pathSoFar)); 
            
        }
        else{

                for(var i = 0; i < current.connectedTo.length;i++){
                    
                    this.visited = true;
                    


                    //console.log(nodes[current.connectedTo[i]].visited);
                    

                    if(nodes[current.connectedTo[i]].visited!=true){  
                        this.goDeeper(pathSoFar,nodes[current.connectedTo[i]],this.val++);
                        console.log("go deeper into"+ current.connectedTo[i]);
                    }    

                }
                this.visited = false;
    
        }
        pathSoFar.pop();
    
    }


}
*/