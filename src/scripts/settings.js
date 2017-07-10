var environment = {
    timeline: 0,
    daytime: 0,
    dayDuration: 10000,
    scale: 1,

    carSize: 10,
    truckSize: 20,

    statistics: {
        stuckCarsToday: 0,
        stuckCarsTotal: 0,
        daysPassed: 0
    },

    simulation: {
        truckAmount: 6,
        truckUptime: 7, // h

        carAmount: 100,
        carCapacity: 24,
        carChargeLimit: 0.25, // %
        averageCarCharge: 0.5,
        totalCarCharge: 0,

        static: {
            truck: {
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
            distanceToLocations: 27,
            distanceBetweenCharges: 738
        }
    }
}

var cars = []
var trucks = []
var graph = new Graph(nodeGraph)

var eventTimes = {
    startOfWorkday: {
        start: Math.round(environment.dayDuration * 0.05),
        end: Math.round(environment.dayDuration * 0.35)
    },
    endOfWorkday: {
        start: Math.round(environment.dayDuration * 0.4),
        end: environment.dayDuration - 1
    },
    nightCharge: {
        start: Math.round(environment.dayDuration * (1 - environment.simulation.truckUptime / 24)),
        end: environment.dayDuration - 1
    },
}
