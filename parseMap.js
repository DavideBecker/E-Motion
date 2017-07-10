const fs = require('fs');
const cycle = require('json-cycle');

var streetPercision = 1;

var linesExpression = /<line.*?x1="(.*?)".*?y1="(.*?)".*?x2="(.*?)".*?y2="(.*?)" ?\/>/gmi;
var circlesExpression = /<circle.*?cx="(.*?)".*?cy="(.*?)".*?r="(.*?)" ?\/>/gmi;
var rectsExpression = /<rect.*?x="(.*?)".*?y="(.*?)".*?width="(.*?)".*?height="(.*?)" ?\/>/gmi;

class SvgParser {
    match(c) {
        var content = c;

        return {
            withPattern: function(pattern) {

                return {
                    format: function(fn) {
                        var regex = new RegExp(pattern);
                        var match;
                        var results = [];

                        do {
                            match = regex.exec(content);
                            if(match) {
                                results.push(fn(match));
                            }
                        } while(match);

                        return results;
                    }
                }
            }
        }
    }
}

var parser = new SvgParser();

var svg = fs.readFileSync('prototypes/finalMap.svg').toString();

var streets = parser.match(svg).withPattern(linesExpression).format(function(result) {
    return {
        start: [result[1], result[2]],
        end: [result[3], result[4]],
        path: [[result[1], result[2]], [result[3], result[4]]],
        x1: result[1],
        y1: result[2],
        x2: result[3],
        y2: result[4]
    }
});

var towns = parser.match(svg).withPattern(circlesExpression).format(function(result) {
    return {
        x: result[1],
        y: result[2],
        r: result[3]
    }
})

var cities = parser.match(svg).withPattern(rectsExpression).format(function(result) {
    return {
        x: result[1],
        y: result[2],
        w: result[3],
        h: result[4]
    }
})


class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.connectedTo = [];
    }
}


var grid = {};
var nodes = {};

function diff(num1, num2) {
    if(num1 > num2) {
        return num1 - num2;
    }

    return num2 - num1;
}

function dist(x1, y1, x2, y2) {
    var deltaX = diff(x1, x2);
    var deltaY = diff(y1, y2);

    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

/* Simple hash function. */
function strHash(str) {
    var a = 1,
        c = 0,
        h,
        o;

    if(str) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for(h = str.length - 1; h >= 0; h--) {
            o = str.charCodeAt(h);
            a = (a << 6 & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ c >> 21 : a;
        }
    }

    return String(a);
}

function estimate(val) {
    return Math.round(val / streetPercision) * streetPercision
}

function pushToGrid(connection) {
    var yPos = estimate(connection.y1);

    if(!grid[yPos]) {
        grid[yPos] = {};
    }

    grid[yPos][estimate(connection.x1)] = [estimate(connection.x2), estimate(connection.y2)];
}

function setNode(node) {
    if(!nodes[node.id]) {
        nodes[node.id] = node;
    }

    return node;
}

function createNode(x, y) {
    return {
        id: strHash(x + '-' + y),
        x: Math.round(x),
        y: Math.round(y),
        connectedTo: []
    }
}

function makeNode(coords) {
    return setNode(createNode(estimate(coords[0]), estimate(coords[1])));
}

function setConnection(coordsA, coordsB) {
    var nodeA = makeNode(coordsA);

    if(coordsA != coordsB) {
        nodes[nodeA.id].connectedTo.push(setNode(createNode(estimate(coordsB[0]), estimate(coordsB[1]))).id);
    }
}

for(var i in streets) {
    var street1 = streets[i].path; // [ [ 123, 456 ], [ 789, 101 ] ]

    for(var j in streets) {
        var street2 = streets[j].path; // [ [ 123, 456 ], [ 789, 101 ] ]

        for(var s1 in street1) {
            // console.log('s1', s1);
            var s1c = street1[s1]; // [ 123, 456 ] --- [ 789, 101 ]

            for(var s2 in street2) {
                // console.log('s2', s2, i, j, s1, s2);
                var s2c = street2[s2]; // [ 123, 456 ] --- [ 789, 101 ]

                var distance = dist(s1c[0], s1c[1], s2c[0], s2c[1]);

                // console.log(s1c[0], s1c[1], s2c[0], s2c[1], distance);

                // console.log(street, s1, s2, distance);

                if(distance <= 2 && i != j) {
                    // var node = nakeNode(street1[s1])

                    // console.log('Street', i, 'with street', j, '(', s1c, ', ', s2c, ')', '-->', distance);
                    // setConnection(street1[Math.pow(0, s1)], street2[Math.pow(0, s2)]);
                    setConnection(street1[s1], street2[Math.pow(0, s2)]);
                    setConnection(street1[Math.pow(0, s1)], street2[s2]);
                }
            }

            // console.log(s1c);
        }
        // console.log(street, street2)
    }
    // pushToGrid(street);
}

var graph = {}
var cityIDs = [];
var nodeIDs = [];

//Generate graph
for(var id in nodes) {
    var node = nodes[id];

    graph[node.id] = {}

    nodeIDs.push(id);

    for(var i in towns) {
        var town = towns[i];

        if(dist(node.x, node.y, town.x, town.y) <= 1) {
            node.isCity = true
            cityIDs.push(node.id)
        }
    }

    if(!node.isCity) {
        node.isCity = false
    }

    for(var i = 0; i < node.connectedTo.length; i++) {
        var targetNode = nodes[node.connectedTo[i]];

        graph[node.id][targetNode.id] = Math.round(dist(node.x, node.y, targetNode.x, targetNode.y));
    }
}

for(var y in grid) {
    var row = grid[y];

    for(var x in row) {
        var to = row[x];
        var from = [parseInt(x, 10), parseInt(y, 10)];

        // console.log()
        // console.log(from, to);

        setConnection(from, to);
        setConnection(to, from);

        // console.log(from, '-->', to);
    }
}

// console.log(nodes);

// console.log(grid);

// console.log(streets);
// console.log(towns);
// console.log(cities);

var data = {
    streets: streets,
    towns: towns,
    cities: cities
}

fs.writeFile('src/data/locations.js', 'var locations = ' + JSON.stringify(data), (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('locations.js updated');
    }
});

var nodesContent =
    'var rawNodes = ' + JSON.stringify(nodes) +
    ';var cityIDs=' + JSON.stringify(cityIDs) +
    ';var nodeIDs=' + JSON.stringify(nodeIDs)

fs.writeFile('src/data/nodes.js', nodesContent, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('nodes.js updated');
    }
});

fs.writeFile('src/data/nodeGraph.js', 'var nodeGraph = ' + JSON.stringify(graph), (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('nodeGraph.js updated');
    }
});
