'use strict';

function draw() {
    clear();

    var dt = timer % environment.dayDuration;

    backgroundBrightness = constrain(backgroundBrightness + brightDir, 0, 255);
    var grey = constrain(backgroundBrightness, 0, 255);

    background(255, 0, grey, 0.5);

    environment.daytime = dt / environment.dayDuration;

    fill(255, 0, 255 - grey);
    rect(0, 0, environment.daytime * width, 50);

    // console.log(environment.daytime)

    for (var carIndex = 0; carIndex < cars.length; carIndex++) {
        var car = cars[carIndex];

        car.update();
    }
    for (var truckIndex = 0; truckIndex < trucks.length; truckIndex++) {
        var truck = trucks[truckIndex];

        truck.update();
    }
    for (var cityIndex = 0; cityIndex < cities.length; cityIndex++) {
        var city = cities[cityIndex];

        if (Events.isActive('startOfWorkday') && city.id != cityDict.Stuttgart && dt % 10 < 1) {
            city.sendCarTo(Nodes.getByName('Stuttgart'));
        }

        if (Events.isActive('endOfWorkday') && city.id == cityDict.Stuttgart && dt % 10 < 1) {
            city.sendCarHome();
        }

        city.update();
    }

    var evnt = 0;

    for (var eventType in eventTimes) {
        var event = eventTimes[eventType];

        if (dt == event.start) {
            Events.enable(eventType);

            if (eventType == 'nightCharge') {
                Events.trigger('nightChargeStart');
            }
        }

        if (dt == event.end) {
            Events.disable(eventType);

            if (eventType == 'nightCharge') {
                Events.trigger('nightChargeEnd');
            }
        }

        fill(51);

        // text(eventType + ' - ' + Events.isActive(eventType), 100, 100 + 20 * evnt)

        evnt += 1;
    }

    if (dt == Math.round(eventTimes.startOfWorkday.start / 2)) {
        Events.trigger('nightEnd');
    }

    if (dt == Math.round(eventTimes.endOfWorkday.start + environment.dayDuration / 20)) {
        Events.trigger('nightStart');
    }

    timer += 1;

    // renderAllNodes()

    // showPathFor(trucks[0])

    debugMagic();
}
//# sourceMappingURL=draw.js.map
