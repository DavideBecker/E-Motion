var coords = locations.streets;
var cities = locations.cities;

var environment = {
    timeline: 0,
    daytime: 0,
    daytimeSteps: 0.001
}

class Position {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

class Street {
    constructor(fromX, fromY, toX, toY) {
        this.from = new Position(fromX, fromY);
        this.to = new Position(toX, toY);
    }

    render() {
        stroke(50 + 205 * (1 - environment.daytime));
        strokeWeight(10);
        line(this.from.x, this.from.y, this.to.x, this.to.y);
    }
}

class Intersection {
    constructor(x, y) {
        this.position = new Position(x, y);
        this.intersections = [];
    }

    renderRoads() {
        for(var i = 0; i < this.intersections.length; i++) {
            var targetIntersection = this.intersections[i];

            line(this.position.x, this.position.y, targetIntersection.position.x, targetIntersection.position.y);
        }
    }

    render() {
        ellipse(this.position.x, this.position.y, 20, 20);
    }
}

$(window).on('resize', function() {
    //
})

function setup() {
    createCanvas(windowWidth, windowHeight);
    // for(var i = 0; i < 10; i++) {
    //     var instance = new Intersection(random(0, width), random(0, height));

    //     intersections.push(instance);
    // }

    // for(var i = 0; i < 20; i++) {
    //     var i1 = intersections[Math.floor(random(0, intersections.length - 1))];
    //     var i2 = intersections[Math.floor(random(0, intersections.length - 1))];

    //     i1.intersections.push(i2);
    //     i2.intersections.push(i1);
    // }

    // for (var i = 0; i < intersections.length; i++) {
    //     var instance = intersections[i];

    //     instance.render();
    //     instance.renderRoads();
    // }

    for(var coordsIndex = 0; coordsIndex < coords.length; coordsIndex++) {
        var c = coords[coordsIndex];

        line(c.x1, c.y1, c.x2, c.y2);
    }

    for(var citiesIndex = 0; citiesIndex < cities.length; citiesIndex++) {
        var city = cities[citiesIndex];

        ellipse(city.x, city.y, city.r * 2, city.r * 2);
    }
}

// function draw() {
//     // rgb(25, 68, 85)
//     // rgb(54, 70, 78)
//     background(54 + 201 * environment.daytime, 70 + 185 * environment.daytime, 78 + 177 * environment.daytime)
//     new Street(10, 90, 100, 291).render();
//     new Street(100, 291, 500, 180).render();
//     new Street(500, 180, 270, 100).render();
//     environment.daytime += environment.daytimeSteps;
//     if(environment.daytime >= 1 || environment.daytime <= 0) {
//         environment.daytimeSteps = -environment.daytimeSteps;
//     }
//     environment.timeline += 1;
// }
