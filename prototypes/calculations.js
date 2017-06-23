// Haushaltssteckdose: 2.3 kW
// Ladestationen: 3.7 kW, 11 kW, 22 kW

var config = {
    emotion: {
        capacity: 400, // kWh
        chargeSpeed: 120, // kWh
        milage: 22, // kWh per 100 KM
        averageSpeed: 40 // km/h
    },
    car: {
        capacity: 24, // kWh
        chargeSpeed: 22, // kWh
        mileage: 15 // kWh per 100 KM
    },
    averageDistanceBetweenCharges: 800, // M
    averageDistanceToLocation:  20 // KM
}


// Helper functions
function prettyTime(secs) {
    if(secs < 60) return secs + ' second(s)';
    if(secs < 3600) return Math.floor(secs / 60) + ' minute(s)';
    if(secs < 86400) return Math.floor(secs / 3600) + ' hour(s)';
    if(secs < 604800) return Math.floor(secs / 86400) + ' day(s)';

    return date.toDateString();
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
    return chargingCapacity / (capacityOfCar / 2)
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


// Test output
var chargingCapacity = calculateChargingCapacity(config.emotion.capacity, config.emotion.milage, config.averageDistanceToLocation)

var amountOfCarsThatCanBeCharged = calculateAmountOfCarsThatCanBeCharged(chargingCapacity, config.car.capacity);
var travelTime = calculateTravelTime(config.averageDistanceBetweenCharges, config.emotion.averageSpeed);
var chargeTime = calculateChargeTime(config.car.capacity, config.car.chargeSpeed, 0.5);

var chargeCycleTime = calculateChargeCycleTime(amountOfCarsThatCanBeCharged, travelTime, chargeTime);
// + calculateTravelTime(config.averageDistanceToLocation * 2, config.emotion.averageSpeed)

console.log('');

console.log('config = ' + JSON.stringify(config, null, 4));

console.log('');

console.log('chargingCapacity', chargingCapacity, 'kWh');

console.log('amountOfCarsThatCanBeCharged', amountOfCarsThatCanBeCharged);
console.log('travelTime', prettyTime(travelTime), travelTime);
console.log('chargeTime', prettyTime(chargeTime), chargeTime);

console.log('chargeCycleTime', prettyTime(chargeCycleTime), chargeCycleTime);

console.log('');

console.log('On average a truck takes about', prettyTime(chargeCycleTime), 'to charge', amountOfCarsThatCanBeCharged, 'cars until it needs to recharge')

console.log('');
