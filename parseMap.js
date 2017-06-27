let fs = require('fs');

var linesExpression = /<line.*?x1\=\"(.*?)\".*?y1\=\"(.*?)\".*?x2\=\"(.*?)\".*?y2\=\"(.*?)\" ?\/>/gmi;
var circlesExpression = /<circle.*?cx=\"(.*?)\".*?cy=\"(.*?)\".*?r=\"(.*?)\" ?\/>/gmi;

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

var svg = fs.readFileSync('prototypes/test.svg').toString();

var streets = parser.match(svg).withPattern(linesExpression).format(function(result) {
    return {
        x1: result[1],
        y1: result[2],
        x2: result[3],
        y2: result[4]
    }
});

var cities = parser.match(svg).withPattern(circlesExpression).format(function(result) {
    return {
        x: result[1],
        y: result[2],
        r: result[3]
    }
})

console.log(streets);
console.log(cities);

var data = {
    streets: streets,
    cities: cities
}

fs.writeFileSync('src/data/locations.js', 'var locations = ' + JSON.stringify(data));