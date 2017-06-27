let fs = require('fs');

var svgContent = fs.readFileSync('map.svg').toString();

var lines = /<line.*?x1\=\"(.*?)\".*?y1\=\"(.*?)\".*?x2\=\"(.*?)\".*?y2\=\"(.*?)\" \/>/gmi;
var circles = /<circle.*?cx=\"(.*?)\".*?cy=\"(.*?)\".*?r=\"(.*?)\" \/>/gmi;

var streetRegex = new RegExp(lines);
var cityRegex = new RegExp(circles);

var streetResult;
var cityResult;

var streets = [];
var cities = [];

function round5(num) {
    return Math.round(num / 5) * 5;
}

do {
    streetResult = streetRegex.exec(svgContent);
    if(streetResult) {
        //x.push([round5(streetResult[1])])//, streetResult[3]]); //
        //x.push([round5(streetResult[2])])//, streetResult[4]]); //

        var street = {
            x1: streetResult[1],
            y1: streetResult[2],
            x2: streetResult[3],
            y2: streetResult[4]
        }

        streets.push(JSON.stringify(street));
    }

} while(streetResult)


do {
    cityResult = cityRegex.exec(svgContent);
    if(cityResult) {
        //x.push([round5(cityResult[1])])//, cityResult[3]]); //
        //x.push([round5(cityResult[2])])//, cityResult[4]]); //

        var city = {
            x: cityResult[1],
            y: cityResult[2],
            r: cityResult[3]
        }

        cities.push(JSON.stringify(city));
    }

} while(cityResult)


console.log('[', streets.toString() + ']');
console.log('[', cities.toString() + ']');

// var re = /\s*([^[:]+):\"([^"]+)"/g;
// var s = '[description:"aoeu" uuid:"123sth"]';
// var m;

// do {
//     m = re.exec(s);
//     if (m) {
//         console.log(m[1], m[2]);
//     }
// } while (m);