// Haushaltssteckdose: 2.3 kW
// Ladestationen: 3.7 kW, 11 kW, 22 kW

var config = {
    emotion: {
        capacity: 400, // kWh
        chargeSpeed: 120, // kWh
        mileage: 22, // kWh per 100 KM
        averageSpeed: 40 // km/h
    },
    car: {
        capacity: 24, // kWh
        chargeSpeed: 22, // kWh
        mileage: 15 // kWh per 100 KM
    },
    averageDistanceBetweenCharges: 1000, // M
    averageDistanceToLocation:  20, // KM
    averageTruckUptime: 5, // Hours
    chargePercentage: 0.25, //decimal percentage (0.8 as 80%)
    deployedTrucks: 10, // Amount of trucks
}


// Helper functions
function prettyTime(time) {
    var hours   = Math.floor(time / 3600);
    var minutes = Math.floor((time - hours * 3600) / 60);
    var seconds = Math.floor(time - hours * 3600 - minutes * 60);

    if(hours < 10) { hours = '0' + hours; }
    if(minutes < 10) { minutes = '0' + minutes; }
    if(seconds < 10) { seconds = '0' + seconds; }

    return hours + ':' + minutes + ':' + seconds;
}

function convertTime(time, from, to) {
    var secs = time;

    if(from == 'i') { secs = time * 60 }
    if(from == 'h') { secs = time * 60 * 60 }
    if(from == 'd') { secs = time * 60 * 60 * 24 }

    if(to == 's') { return secs }
    if(to == 'i') { return secs / 60 }
    if(to == 'h') { return secs / 60 / 60 }
    if(to == 'd') { return secs / 60 / 60 / 24 }

    return false;
}

function prettyPrintConfig() {
    console.log('CONFIG');
    console.log('   EMOTION');
    console.log('      Capacity:              ', config.emotion.capacity, 'kWh');
    console.log('      Charging speed:        ', config.emotion.chargeSpeed, 'kWh');
    console.log('      Mileage:               ', config.emotion.mileage, 'kWh per 100 KM');
    console.log('      Average driving speed: ', config.emotion.averageSpeed, 'km/h');
    console.log('   CAR');
    console.log('      Capacity:              ', config.car.capacity, 'kWh');
    console.log('      Charging speed:        ', config.car.chargeSpeed, 'kWh');
    console.log('      Mileage:               ', config.car.mileage, 'kWh per 100 KM');
    console.log('   VALUES');
    console.log('      Average distance a truck has to travel between charges:   ', config.averageDistanceBetweenCharges, 'M');
    console.log('      Average distance between locations (villages etc):        ', config.averageDistanceToLocation, 'KM');
    console.log('      Average time a truck is driving around and charging cars: ', config.averageTruckUptime, 'hours');
    console.log('      Percentage of the capacity a truck charges each car:      ', config.chargePercentage * 100, '%');
    console.log('      Amount of trucks that are deployed:                       ', config.deployedTrucks, 'trucks');


    // averageDistanceBetweenCharges: 1000, // M
    // averageDistanceToLocation:  20, // KM
    // chargePercentage: 0.25 //decimal percentage (0.8 as 80%)

}

function fineRound(number) {
    return Math.floor(number * 10) / 10
}


// Calculates the mileage per KM
// mileage in kWh per 100 KM
// returns kWh per KM
function calculateMileagePerKilometre(mileage) {
    return mileage / 100
}

// Calculate distance in KM something can travel without recharging
// capacity in kWh
// mileage in kWh per 100 KM
// returns KM
function calculateReach(capacity, mileage) {
    return capacity / mileage * 100
}

// Calculate the capacity remaining after travel time
// reach in KM is the result of calculateReach()
// mileage in kWh per 100 KM
// distanceToLocation in KM
// returns KM
function calculateChargingCapacity(reach, mileage, distanceToLocation) {
    return reach - calculateMileagePerKilometre(mileage) * distanceToLocation * 2
}

// Calculate the amount of cars that can be charged by one truck
// chargingCapacity in KM is the result of calculateChargingCapacity()
// capacityOfCar in KM is the result of calculateReach()
// returns amount of cars a truck can charge
function calculateAmountOfCarsThatCanBeCharged(chargingCapacity, capacityOfCar) {
    return chargingCapacity / (capacityOfCar * config.chargePercentage)
}

// Calculate the time it takes for something to charge
// capacity in kWh
// chargeSpeed in kWH
// percentage in decimal percentage (0.8 as 80%)
// returns seconds
function calculateChargeTime(capacity, chargeSpeed, percentage) {
    return capacity / chargeSpeed * percentage * 3600
}

// Calculate the time it takes to travel a specified distance
// distance in m
// speed in m/h
// returns seconds
function calculateTravelTime(distance, speed) {
    return distance * 3600 / (speed * 1000)
}

// Calculate how long it takes for a truck to do a charge cycle
// asuming there's no downtime and always a demand
// chargeableCars in amount is the result of calculateAmountOfCarsThatCanBeCharged()
// averageTimeBetweenCharges in seconds is the result of calculateTravelTime()
// chargeTime in hours is the result of calculateChargeTime()
// returns seconds
function calculateChargeCycleTime(chargeableCars, averageTimeBetweenCharges, chargeTime) {
    return chargeableCars * chargeTime + chargeableCars * averageTimeBetweenCharges
}

// Calculate how long it takes on average for a single car to get charged
// chargeableCars in amount is the result of calculateAmountOfCarsThatCanBeCharged()
// chargeCycleTime in seconds is the result of calculateChargeCycleTime()
// returns seconds
function calculateAverageChargeTime(chargeableCars, chargeCycleTime) {
    return chargeCycleTime / chargeableCars
}

// Caclulate how many cars a truck can charge per day
// averageChargeTime in seconds is the result of calculateAverageChargeTime()
// availableTime in seconds
// returns amount of cars charged per day
function calculateChargeableCarsInTimeframe(averageChargeTime, availableTime) {
    return Math.floor(availableTime / averageChargeTime * 10) / 10
}


// Test output
var chargingCapacity = calculateChargingCapacity(config.emotion.capacity, config.emotion.mileage, config.averageDistanceToLocation)

var amountOfCarsThatCanBeCharged = calculateAmountOfCarsThatCanBeCharged(chargingCapacity, config.car.capacity);
var travelTime = calculateTravelTime(config.averageDistanceBetweenCharges, config.emotion.averageSpeed);
var chargeTime = calculateChargeTime(config.car.capacity, config.car.chargeSpeed, config.chargePercentage);

var chargeCycleTime = calculateChargeCycleTime(amountOfCarsThatCanBeCharged, travelTime, chargeTime);
// + calculateTravelTime(config.averageDistanceToLocation * 2, config.emotion.averageSpeed)

var averageChargeTime = calculateAverageChargeTime(amountOfCarsThatCanBeCharged, chargeCycleTime);

var carsChargedPerTruck = calculateChargeableCarsInTimeframe(averageChargeTime, convertTime(config.averageTruckUptime, 'h', 's'));
var carsChargedPerDay = carsChargedPerTruck * config.deployedTrucks;
var carsChargedPerMonth = Math.floor(carsChargedPerDay * 30.4);
var carsChargedPerYear = Math.floor(carsChargedPerDay * 365.25);

console.log();

prettyPrintConfig();

console.log();

console.log('RAW VALUES')

console.log('chargingCapacity', chargingCapacity, 'kWh');

console.log('amountOfCarsThatCanBeCharged', amountOfCarsThatCanBeCharged);
console.log('travelTime', prettyTime(travelTime), travelTime);
console.log('chargeTime', prettyTime(chargeTime), chargeTime);

console.log('chargeCycleTime', prettyTime(chargeCycleTime), chargeCycleTime);

console.log('averageChargeTime', prettyTime(averageChargeTime), averageChargeTime);

console.log()

console.log('RESULTS')

console.log('Charging each car by', config.chargePercentage * 100, '% allows them to travel', fineRound(calculateReach(config.car.capacity * config.chargePercentage, config.car.mileage)), 'KM')
console.log('On average a truck takes', prettyTime(chargeCycleTime), 'to charge', fineRound(amountOfCarsThatCanBeCharged), 'cars until it needs to recharge')
console.log('In', config.averageTruckUptime, 'hours a truck can charge', carsChargedPerTruck, 'cars by', config.chargePercentage * 100, '%');
console.log('All', config.deployedTrucks, 'trucks can charge', carsChargedPerDay, 'cars per day');
console.log('In total, that\'s', carsChargedPerMonth, 'cars per month, or', carsChargedPerYear, 'cars per year');

console.log();
