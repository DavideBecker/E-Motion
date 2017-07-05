"use strict";

var _createClass = function() {
    function 🌟(🌟, 🐸) {
        for (var 🍻 = 0; 🍻 < 🐸.length; 🍻++) {
            var 😜 = 🐸[🍻];
            😜.🚀 = 😜.🚀 || false;
            😜.💩 = true;
            if ("value" in 😜) 😜.🔥 = true;
            Object.defineProperty(🌟, 😜.🍕, 😜);
        }
    }
    return function(🐸, 🍻, 😜) {
        if (🍻) 🌟(🐸.prototype, 🍻);
        if (😜) 🌟(🐸, 😜);
        return 🐸;
    };
}();

function _classCallCheck(🌟, 🐸) {
    if (!(🌟 instanceof 🐸)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var streets = locations.streets;

var towns = locations.towns;

var cities = locations.cities;

var allCars = [];

var allKeys = Object.keys(nodes);

var environment = {
    "🍔": 0,
    "🍟": 0,
    "🍺": .001,
    "🍻": 1.6,
    "🐒": {
        "🐶": 6,
        "🐱": 6,
        "🐹": 10,
        "🐼": 25
    }
};

var graph = new Graph(nodeGraph);

graph.🐧 = function(🌟, 🐸) {
    var 🍻 = allKeys[floor(random(0, allKeys.length))];
    var 😜 = allKeys[floor(random(0, allKeys.length))];
    return graph.findShortestPath(🌟, 🍻).concat(graph.findShortestPath(🍻, 🐸));
};

function renderMap(🌟) {
    var 🐸 = function 🍻(🌟) {
        🌟.rectMode(🌟.CENTER);
        var 🐸 = 🌟.createCanvas(🌟.windowWidth, 🌟.windowHeight - 3);
        🐸.parent("canvas-wrapper");
        for (var 🍻 in nodes) {
            var 😜 = nodes[🍻];
            for (var 😂 = 0; 😂 < 😜.connectedTo.length; 😂++) {
                var 💨 = nodes[😜.connectedTo[😂]];
                🌟.stroke(196);
                🌟.strokeWeight(3);
                🌟.line(😜.🌟 * environment.🍻, 😜.🐸 * environment.🍻, 💨.🌟 * environment.🍻, 💨.🐸 * environment.🍻);
            }
        }
        for (var 🍻 in nodes) {
            var 😜 = nodes[🍻];
            for (var 😂 = 0; 😂 < 😜.connectedTo.length; 😂++) {
                var 💨 = nodes[😜.connectedTo[😂]];
                stroke(196);
                strokeWeight(1);
                line(😜.🌟 * environment.🍻, 😜.🐸 * environment.🍻, 💨.🌟 * environment.🍻, 💨.🐸 * environment.🍻);
            }
            fill(51);
            ellipse(😜.🌟 * environment.🍻, 😜.🐸 * environment.🍻, 10, 10);
        }
        for (var 🍻 in nodes) {
            var 😜 = nodes[🍻];
            🌟.noStroke();
            if (😜.isTown) {
                🌟.fill(200, 0, 0);
                🌟.ellipse(😜.🌟 * environment.🍻, 😜.🐸 * environment.🍻, 14, 14);
            }
        }
    };
    🌟.⛄ = function() {
        🌟.resizeCanvas(🌟.windowWidth, 🌟.windowHeight);
        🐸(🌟);
    };
    🌟.🎩 = function() {
        🐸(🌟);
    };
}

var staticMap = new p5(renderMap);

function setup() {
    frameRate(1);
    rectMode(CENTER);
    var 🌟 = createCanvas(windowWidth, windowHeight - 3);
    🌟.parent("canvas-wrapper");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

var Car = function() {
    function 🌟() {
        _classCallCheck(this, 🌟);
        this.👀;
        this.fromNode;
        this.energy;
        this.milage;
        this.currNode;
        this.😜 = {
            "🌟": 0,
            "🐸": 0
        };
        this.😄 = false;
        this.😂 = createVector(0, 0);
        this.😲;
        this.😻;
        this.🌍 = 1;
        this.image;
        this.💨 = [];
    }
    _createClass(🌟, [ {
        "🍕": "draw",
        "⛵": function 🐸() {
            if (this.😄) {
                rectMode(CENTER);
                rect(this.😜.🌟 * environment.🍻, this.😜.🐸 * environment.🍻, 10, 10);
            }
        }
    }, {
        "🍕": "move",
        "⛵": function 🍻() {
            if (this.😄) {
                this.😜.🌟 += this.😂.🌟;
                this.😜.🐸 += this.😂.🐸;
                this.😲++;
                if (this.😻 - 1 < this.😲) {
                    if (this.💨.length < 1) {
                        this.😄 = false;
                        this.😜.🌟 = this.🏡.🌟;
                        this.😜.🐸 = this.🏡.🐸;
                    } else {
                        this.startShortMove(this.🏡.id, this.💨.shift());
                    }
                }
            }
        }
    }, {
        "🍕": "startShortMove",
        "⛵": function 😜(🌟, 🐸) {
            this.😜.🌟 = nodes[🌟].🌟;
            this.😜.🐸 = nodes[🌟].🐸;
            this.😂.set(nodes[🐸].🌟 - nodes[🌟].🌟, nodes[🐸].🐸 - nodes[🌟].🐸);
            var 🍻 = dist(nodes[🌟].🌟, nodes[🌟].🐸, nodes[🐸].🌟, nodes[🐸].🐸);
            this.🏡 = nodes[🐸];
            this.😻 = round(🍻) / this.🌍;
            this.😲 = 0;
            this.😂.div(round(🍻));
            this.😂.mult(this.🌍);
        }
    }, {
        "🍕": "startMoveWithoutPathfinder",
        "⛵": function 😂(🌟) {
            this.😜.🌟 = nodes[🌟[🌟.length - 1]].🌟;
            this.😜.🐸 = nodes[🌟[🌟.length - 1]].🐸;
            this.😄 = true;
            this.👀 = 🌟[0];
            this.💨 = 🌟;
            this.startShortMove(this.💨.shift(), this.💨.shift());
        }
    } ]);
    return 🌟;
}();

var SpawnCount = 0;

function draw() {
    clear();
    fill(51);
    fill(50, 200, 0);
    SpawnCount++;
    for (var 🌟 = 0; 🌟 < allCars.length; 🌟++) {
        allCars[🌟].move();
        allCars[🌟].draw();
    }
    if (SpawnCount % 5 == 0) {
        if (allCars.length > 300) {
            allCars.shift();
        }
        allCars[allCars.length] = new Car();
        allCars[allCars.length - 1].startMoveWithoutPathfinder(graph.🐧(46207908, 4341680));
    }
}

function mousePressed() {
    for (var 🌟 in nodes) {
        if (dist(mouseX, mouseY, nodes[🌟].🌟, nodes[🌟].🐸) < 5) {
            console.log(🌟);
        }
    }
}

$(document).ready(function() {
    $("#sidebar-toggle").click(function(🌟) {
        🌟.preventDefault();
        $("body").toggleClass("nav-active");
    });
    $(".param.draggable").each(function(🌟, 🐸) {
        $(🐸).attr("data-value", $(🐸).val());
    });
    $(".param.draggable").on("input", function(🌟) {
        $(this).attr("data-value", $(this).val());
    });
    $(".param.numbers .subtract").click(function(🌟) {
        var 🐸 = $(this).siblings(".amount");
        var 🍻 = Number(🐸.val());
        if (🍻 > 0) {
            🐸.val(🍻 - 1);
        }
        🐸.trigger("change");
    });
    $(".param.numbers .amount").change(function() {
        var 🌟 = $(this);
        var 🐸 = Number(🌟.val());
        var 🍻 = Number(🌟.attr("max"));
        if (🐸 > 🍻) {
            🌟.val(🍻);
        }
        if (🐸 < 0) {
            🌟.val(0);
        }
    });
    $(".param.numbers .add").click(function(🌟) {
        var 🐸 = $(this).siblings(".amount");
        var 🍻 = Number(🐸.val());
        var 😜 = Number(🐸.attr("max"));
        if (🍻 < 😜) {
            🐸.val(🍻 + 1);
        } else {
            🐸.val(😜);
        }
        🐸.trigger("change");
    });
    $("#truckAmount").change(function() {
        console.log("truckAmount changed");
        environment.🐒.🐶 = Number($(this).val());
    });
    $("#truckUptime").change(function() {
        console.log("truckUptime changed");
        environment.🐒.🐱 = Number($(this).val());
    });
    $("#carChargeLimit").change(function() {
        console.log("carChargeLimit changed");
        environment.🐒.🐼 = Number($(this).val());
    });
});
