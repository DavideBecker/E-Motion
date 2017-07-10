
function updateAmountOfCars(diff) {
    environment.simulation.carAmount += diff

    if(diff > 0) {
        for(var i = 0; i < diff; i++) {
            new Car()
        }
    }

    if(diff < 0) {
        var removed = cars.splice(0, diff * -1);

        console.log('removed', diff * -1, 'cars', removed)
    }
}

function updateAmountOfTrucks(diff) {
    environment.simulation.truckAmount += diff

    if(diff > 0) {
        for(var i = 0; i < diff; i++) {
            new Truck()
        }
    }

    if(diff < 0) {
        var removed = trucks.splice(0, diff);

        for(var rem in removed) {
            if(rem.workTarget && rem.isBusy) {
                addToQueue(rem.workTarget)
            }
        }
    }
}

function updateAverageStuckCars() {
    $('#stuckCarsAverage').html(environment.statistics.stuckCarsTotal / environment.statistics.daysPassed)
    $('#stuckCarsToday').html(environment.statistics.stuckCarsToday)
    $('#stuckCarsTotal').html(environment.statistics.stuckCarsTotal)
}


// Not implementing, is kind of hard to do with the current setup
function updateTruckUptime(newValue) {
    // environment.simulation.truckUptime = newValue;
    // eventTimes.nightCharge.start = Math.round(environment.dayDuration * (1 - environment.simulation.truckUptime / 24));
}
