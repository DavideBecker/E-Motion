var streets = locations.streets;
var towns = locations.towns;
var cities = locations.cities;

var environment = {
    timeline: 0,
    daytime: 0,
    daytimeSteps: 0.001,
    scale: 1.65
}

class Animation {
    constructor(anim, duration, easing, done) {
        var bezierTransitions = {
            'ease':        [0.25, 0.1, 0.25, 1.0],
            'linear':      [0.00, 0.0, 1.00, 1.0],
            'ease-in':     [0.42, 0.0, 1.00, 1.0],
            'ease-out':    [0.00, 0.0, 0.58, 1.0],
            'ease-in-out': [0.42, 0.0, 0.58, 1.0]
        }

        this.anim = anim;
        this.done = done;

        this.duration = duration || 500;
        this.easing = bezierTransitions[easing] || bezierTransitions.ease;
        this.spline = new KeySpline(this.easing);

        this.frame = 1;
        this.frameDuration = this.duration / 1000 * 60;
        this.progress = 0;
        this.direction = 1;
        this.isRunning = false;
        this.isLooping = false;
    }

    restart() {
        this.frame = 1;
        this.progress = 0;
        this.direction = 1;
        this.isRunning = true;
    }

    animate() {
        this.progress = this.frame / this.frameDuration;

        if(this.progress <= 0) {
            this.direction = 1;
        }

        if(this.isLooping) {
            this.progress *= 2;
        }

        if(this.isRunning) {
            if(this.progress <= 1) {
                this.anim(this.spline.get(this.progress));
                this.frame += this.direction;
            } else if(this.isLooping) {
                // this.frame = 1;
                this.anim(this.spline.get(this.progress));
                this.direction = -1;
                this.frame += this.direction;
                if(this.progress >= 2) {
                    this.frame = 1;
                    if(this.done) {
                        this.done(this);
                    }
                }
            } else {
                this.anim(this.spline.get(1));
                if(this.done) {
                    this.done(this);
                }
            }
        }
    }
}

var nodes = JSON.retrocycle(rawNodes);
var startNode, targetNode, anim;
var endNode = nodes['208244183'];

$(window).on('resize', function() {
    //
})

var graph = new Graph(nodeGraph);

console.log(graph.findShortestPath('4341680', '152748987'))

function renderMap() {
    for(var nodeIndex in nodes) {
        var node = nodes[nodeIndex];

        // stroke(51);
        // text(node.x + '\n' + node.y, node.x, node.y);

        for(var connectionIndex = 0; connectionIndex < node.connectedTo.length; connectionIndex++) {
            var connectedNode = nodes[node.connectedTo[connectionIndex]];

            stroke(196);
            strokeWeight(3)
            line(node.x * environment.scale, node.y * environment.scale, connectedNode.x * environment.scale, connectedNode.y * environment.scale);
        }

        fill(51)
        ellipse(node.x * environment.scale, node.y * environment.scale, 10, 10);
    }

    for(var townsIndex = 0; townsIndex < towns.length; townsIndex++) {
        var town = towns[townsIndex];

        fill(200, 0, 0);
        ellipse(town.x * environment.scale, town.y * environment.scale, 20, 20);
    }
}

function setup() {
    // rectMode(CENTER);
    // createCanvas(windowWidth - $('#sidebar').width(), windowHeight - 3);

    // // strokeWeight(2);

    // // for(var streetsIndex = 0; streetsIndex < streets.length; streetsIndex++) {
    // //     var c = streets[streetsIndex];

    // //     line(c.x1 * environment.scale, c.y1 * environment.scale, c.x2 * environment.scale, c.y2 * environment.scale);
    // // }

    // // for(var citiesIndex = 0; citiesIndex < cities.length; citiesIndex++) {
    // //     var city = cities[citiesIndex];

    // //     rect(city.x * environment.scale, city.y * environment.scale, city.w * 4, city.w * 4);
    // // }

    // startNode = nodes['256062347'];
    // targetNode = nodes[startNode.connectedTo[floor(random(0, startNode.connectedTo.length - 1))]];

    // // var startNode = nodes[floor(0, nodes.length - 1)];

    // // ellipse(startNode.x, startNode.y, 20, 20);


    // // for(var vertical = 0; vertical < width / 30; vertical++) {
    // //     line(vertical * 30, 0, vertical * 30, height)
    // // }

    // // for(var horizontal = 0; horizontal < height / 30; horizontal++) {
    // //     line(0, horizontal * 30, width, horizontal * 30)
    // // }

    // renderMap();

    // anim = new Animation(function(step) {
    //     var progressX = (targetNode.x - startNode.x) * step
    //     var progressY = (targetNode.y - startNode.y) * step

    //     // console.log(targetNode.x, startNode.x, step)

    //     rect((startNode.x + progressX) * environment.scale, (startNode.y + progressY) * environment.scale, 15, 15);
    // }, 500, 'ease', function(ani) {
    //     startNode = nodes[targetNode.id];
    //     targetNode = nodes[startNode.connectedTo[floor(random(0, startNode.connectedTo.length - 1))]];
    //     ani.restart();
    // })

    // anim.isRunning = true;
}

console.log(nodes);

function draw() {
    background(255);
    fill(51)
    renderMap();
    fill(50, 200, 0)
    anim.animate();
}


$(document).ready(function() {
    $('#toggle-button').click((e) => {
        e.preventDefault()
        $('body').toggleClass('nav-active');
    })
})
