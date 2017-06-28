// var streets = locations.streets;
// var towns = locations.cities;
// var cities = locations.cities;

var environment = {
    timeline: 0,
    daytime: 0,
    daytimeSteps: 0.001
}

console.log(JSON.retrocycle(rawNodes));

$(window).on('resize', function() {
    //
})

function setup() {
    rectMode(CENTER);
    createCanvas(windowWidth, windowHeight);

    // for(var streetsIndex = 0; streetsIndex < streets.length; streetsIndex++) {
    //     var c = streets[streetsIndex];

    //     line(c.x1, c.y1, c.x2, c.y2);
    // }

    // for(var townsIndex = 0; townsIndex < towns.length; townsIndex++) {
    //     var town = towns[townsIndex];

    //     ellipse(town.x, town.y, town.r * 4, town.r * 4);
    // }

    // for(var citiesIndex = 0; citiesIndex < cities.length; citiesIndex++) {
    //     var city = cities[citiesIndex];

    //     rect(city.x, city.y, city.w * 4, city.w * 4);
    // }
}