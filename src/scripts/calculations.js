// Haushaltssteckdose: 2.3 kW
// Ladestationen: 3.7 kW, 11 kW, 22 kW

// var config = {
//     emotion: {
//         capacity: 400, // kWh
//         chargeSpeed: 120, // kWh
//         mileage: 22, // kWh per 100 KM
//         averageSpeed: 40 // km/h
//     },
//     car: {
//         capacity: 24, // kWh
//         chargeSpeed: 22, // kWh
//         mileage: 15 // kWh per 100 KM
//     },

//     // Static
//     // averageDistanceBetweenCharges: 800, // M
//     // averageDistanceToLocation:  25, // KM
//     // averageTruckUptime: 7, // Hours
//     // averageCarsToChargePerDay: 1000, // Amount of cars
//     // chargePercentage: 0.25, //decimal percentage (0.8 as 80%)
//     // deployedTrucks: 25, // Amount of trucks

//     // Random
//     averageDistanceBetweenCharges: random(500, 2000), // M
//     averageDistanceToLocation:  random(20, 40), // KM
//     averageTruckUptime: random(3, 8), // Hours
//     averageCarsToChargePerDay: random(250, 3000), // Amount of cars
//     chargePercentage: 0.25, //decimal percentage (0.8 as 80%)
//     deployedTrucks: random(5, 50), // Amount of trucks
// }


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
    if(from == 'w') { secs = time * 60 * 60 * 24 * 7 }
    if(from == 'm') { secs = time * 60 * 60 * 24 * 30.4375 }
    if(from == 'y') { secs = time * 60 * 60 * 24 * 365.25 }

    if(to == 's') { return secs }
    if(to == 'i') { return secs / 60 }
    if(to == 'h') { return secs / 60 / 60 }
    if(to == 'd') { return secs / 60 / 60 / 24 }
    if(to == 'w') { return secs / 60 / 60 / 24 / 7 }
    if(to == 'm') { return secs / 60 / 60 / 24 / 30.4375 }
    if(to == 'y') { return secs / 60 / 60 / 24 / 365.25 }

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
    console.log('   STATIC');
    console.log('      Percentage of the capacity a truck charges each car:      ', config.chargePercentage * 100, '%');
    console.log('   RANDOMIZED VALUES');
    console.log('      Average distance a truck has to travel between charges:   ', config.averageDistanceBetweenCharges, 'm');
    console.log('      Average distance between locations (villages etc):        ', config.averageDistanceToLocation, 'km');
    console.log('      Average time a truck is driving around and charging cars: ', config.averageTruckUptime, 'hours');
    console.log('      Average amount of cars that need to be charged each day:  ', config.averageCarsToChargePerDay, 'cars');
    console.log('      Amount of trucks that are deployed:                       ', config.deployedTrucks, 'trucks');
}

function fineRound(number) {
    return Math.floor(number * 10) / 10
}

function random(min, max) {
    return Math.floor(Math.random() * max) + min
}


// Calculate the mileage per KM
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
function calculateAmountOfCarsThatCanBeCharged(chargingCapacity, capacityOfCar, chargePercentage) {
    return chargingCapacity / (capacityOfCar * chargePercentage)
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

// Calculate how many trucks are needed to charge a specified amount of cars in a given timeframe
// chargeableCarsInTimeframe in amount is the result of calculateChargeableCarsInTimeframe()
// coverageRequirement in amount of cars that need to be charged
// returns amount of trucks needed to charge the cars
function calculateTrucksNeededForCoverage(chargeableCarsInTimeframe, coverageRequirement) {
    return coverageRequirement / chargeableCarsInTimeframe
}


// Test output
// var chargingCapacity = calculateChargingCapacity(config.emotion.capacity, config.emotion.mileage, config.averageDistanceToLocation)

// var amountOfCarsThatCanBeCharged = calculateAmountOfCarsThatCanBeCharged(chargingCapacity, config.car.capacity);
// var travelTime = calculateTravelTime(config.averageDistanceBetweenCharges, config.emotion.averageSpeed);
// var chargeTime = calculateChargeTime(config.car.capacity, config.car.chargeSpeed, config.chargePercentage);

// var chargeCycleTime = calculateChargeCycleTime(amountOfCarsThatCanBeCharged, travelTime, chargeTime) + calculateTravelTime(config.averageDistanceToLocation, config.emotion.averageSpeed) * 1000

// var averageChargeTime = calculateAverageChargeTime(amountOfCarsThatCanBeCharged, chargeCycleTime);

// var carsChargedPerTruck = calculateChargeableCarsInTimeframe(averageChargeTime, convertTime(config.averageTruckUptime, 'h', 's'));
// var carsChargedPerDay = Math.floor(carsChargedPerTruck * config.deployedTrucks);
// var carsChargedPerMonth = Math.floor(carsChargedPerDay * 30.4);
// var carsChargedPerYear = Math.floor(carsChargedPerDay * 365.25);

// console.log();

// prettyPrintConfig();

// console.log();

// console.log('RAW VALUES')

// console.log('chargingCapacity', chargingCapacity, 'kWh');
// console.log('amountOfCarsThatCanBeCharged', amountOfCarsThatCanBeCharged);
// console.log('travelTime', prettyTime(travelTime), travelTime);
// console.log('chargeTime', prettyTime(chargeTime), chargeTime);
// console.log('chargeCycleTime', prettyTime(chargeCycleTime), chargeCycleTime);
// console.log('averageChargeTime', prettyTime(averageChargeTime), averageChargeTime);
// console.log('carsChargedPerTruck', carsChargedPerTruck, carsChargedPerTruck);

// console.log()

// console.log('RESULTS')

// console.log('Charging each car by', config.chargePercentage * 100, '% allows them to travel', fineRound(calculateReach(config.car.capacity * config.chargePercentage, config.car.mileage)), 'KM')
// console.log('On average a truck takes', prettyTime(chargeCycleTime), 'to charge', fineRound(amountOfCarsThatCanBeCharged), 'cars until it needs to recharge')
// console.log('In', config.averageTruckUptime, 'hours a truck can charge', carsChargedPerTruck, 'cars by', config.chargePercentage * 100, '%');
// console.log('All', config.deployedTrucks, 'trucks can charge', carsChargedPerDay, 'cars per day');
// console.log('That\'s', fineRound(carsChargedPerMonth / config.deployedTrucks), 'cars per month, or', fineRound(carsChargedPerYear / config.deployedTrucks), 'cars per year which a single truck can charge')
// console.log('Or in total for', config.deployedTrucks, 'trucks,', carsChargedPerMonth, 'cars per month, or', carsChargedPerYear, 'cars per year');
// console.log('In order to charge', config.averageCarsToChargePerDay, 'cars in', config.averageTruckUptime, 'hours it would require', Math.ceil(calculateTrucksNeededForCoverage(carsChargedPerTruck, config.averageCarsToChargePerDay)), 'trucks')

// console.log();
