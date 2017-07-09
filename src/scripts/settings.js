var environment = {
    timeline: 0,
    daytime: 0,
    dayDuration: 10000,
    scale: 1,

    carSize: 10,
    truckSize: 20,

    simulation: {
        truckAmount: 5,
        truckUptime: 6, // h
        carAmount: 100,
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
        start: Math.round(environment.dayDuration * 0.3),
        end: environment.dayDuration - 1
    },
    nightCharge: {
        start: Math.round(environment.dayDuration * 0.7),
        end: environment.dayDuration - 1
    },
}
