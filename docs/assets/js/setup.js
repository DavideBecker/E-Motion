'use strict';

var queue = [];
var timer = 1;
var daytimeCycle = 1;
var backgroundBrightness = 0;
var brightDir = 0;
var staticMap = new p5(renderMap);

function setup() {
    frameRate(60);
    colorMode(HSB);
    rectMode(CENTER);
    noStroke();
    var canvas = createCanvas(500, 500);

    canvas.parent('canvas-wrapper');

    resize(window);

    for (var carIndex = 0; carIndex < environment.simulation.carAmount; carIndex++) {
        new Car();
    }

    for (var truckIndex = 0; truckIndex < environment.simulation.truckAmount; truckIndex++) {
        new Truck();
    }

    console.table(cars);
    console.table(trucks);

    Events.on('carStuck', function (wroom) {
        addToQueue(wroom);

        environment.statistics.stuckCarsToday += 1;
        environment.statistics.stuckCarsTotal += 1;

        updateAverageStuckCars();
    });

    Events.on('cityNeedsCharging', function (city) {
        addToQueue(city);
    });

    Events.on('nightChargeStart', function () {
        fillQueueWithCities();
    });

    Events.on('nightChargeEnd', function () {
        clearQueueFromCities();
    });

    Events.on('nightEnd', function () {
        brightDir = 0.3;

        environment.statistics.daysPassed += 1;
        environment.statistics.stuckCarsToday = 0;
        updateAverageStuckCars();
    });

    Events.on('nightStart', function () {
        brightDir = -1;
    });
}

function windowResized() {
    resize(window);
}
//# sourceMappingURL=setup.js.map
