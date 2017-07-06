var environment = {
    timeline: 0,
    daytime: 0,
    dayDuration: 500,
    scale: 1,

    simulation: {
        truckAmount: 20,
        truckUptime: 6, // h
        carAmount: 10,
        carChargeLimit: 0.25, // %
        averageCarCharge: 0.5,

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
var graph = new Graph(nodeGraph)

