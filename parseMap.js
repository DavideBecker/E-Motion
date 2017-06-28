const fs = require('fs');
const cycle = require('json-cycle');

var linesExpression = /<line.*?x1="(.*?)".*?y1="(.*?)".*?x2="(.*?)".*?y2="(.*?)" ?\/>/gmi;
var circlesExpression = /<circle.*?cx="(.*?)".*?cy="(.*?)".*?r="(.*?)" ?\/>/gmi;
var rectsExpression = /<rect.*?x="(.*?)".*?y="(.*?)".*?width="(.*?)".*?height="(.*?)" ?\/>/gmi;

class SvgParser {
    match(content) {
        var content = content;

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

var svg = fs.readFileSync('prototypes/map.svg').toString();

var streets = parser.match(svg).withPattern(linesExpression).format(function(result) {
    return {
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

function strHash(s) {
    /* Simple hash function. */
    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a<<6&268435455) + o + (o<<14);
            c = a & 266338304;
            a = c!==0?a^c>>21:a;
        }
    }
    return String(a);
};

function estimate(val) {
    return Math.round(val / 10) * 10
}

function pushToGrid(connection) {
    var yPos = estimate(connection.y1);

    if(!grid[yPos]) {
        grid[yPos] = {};
    }

    grid[yPos][estimate(connection.x1)] = [estimate(connection.x2), estimate(connection.y2)];
}

function setConnection(a, b) {
    aHash = strHash(a[0] + '-' + a[1]);
    bHash = strHash(b[0] + '-' + b[1]);

    if(!nodes[aHash]) {
        nodes[aHash] = {
            x: a[0],
            y: a[1],
            connectedTo: []
        }
    }

    nodes[aHash].connectedTo.push(nodes[bHash]);
}

for(var i = 0; i < streets.length; i++) {
    var street = streets[i];

    pushToGrid(street);
}


Object.keys(grid).map(function(y) {
    var row = grid[y];

    Object.keys(row).map(function(x) {
        var to = row[x];
        var from = [parseInt(x, 10), parseInt(y, 10)];

        setConnection(from, to);
        setConnection(to, from);

        console.log(from, '-->', to);
    })
})

console.log(nodes);

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
    }
});

fs.writeFile('src/data/nodes.js', 'var rawNodes = ' + JSON.stringify(cycle.decycle(nodes)) + '', (err) => {
    if(err) {
        console.log(err);
    }
});