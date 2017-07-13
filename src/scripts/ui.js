var stuttgart = Nodes.getByName('Stuttgart');

function calculateCarsChargedPerTruck() {
    var chargingCapacity = calculateChargingCapacity(
        environment.simulation.static.truck.capacity,
        environment.simulation.static.truck.mileage,
        environment.simulation.static.distanceToLocations
    )

    var amountOfCarsThatCanBeCharged = calculateAmountOfCarsThatCanBeCharged(
        chargingCapacity,
        environment.simulation.static.car.capacity,
        environment.simulation.carChargeLimit
    );
    var travelTime = calculateTravelTime(
        environment.simulation.static.distanceBetweenCharges,
        environment.simulation.static.truck.averageSpeed
    );
    var chargeTime = calculateChargeTime(
        environment.simulation.static.car.capacity,
        environment.simulation.static.car.chargeSpeed,
        environment.simulation.carChargeLimit
    );

    var chargeCycleTime = calculateChargeCycleTime(
        amountOfCarsThatCanBeCharged,
        travelTime,
        chargeTime
    ) + calculateTravelTime(
            environment.simulation.static.distanceToLocations,
            environment.simulation.static.truck.averageSpeed
        ) * 1000

    var averageChargeTime = calculateAverageChargeTime(
        amountOfCarsThatCanBeCharged,
        chargeCycleTime
    );

    return calculateChargeableCarsInTimeframe(
        averageChargeTime,
        convertTime(environment.simulation.truckUptime, 'h', 's')
    );
}

function calulateCarsChargedPerDay() {
    return Math.floor(calculateCarsChargedPerTruck() * environment.simulation.truckAmount);
}

function calulateCarsChargedPerMonth() {
    return Math.floor(calculateCarsChargedPerTruck() * environment.simulation.truckAmount * 30.4);
}

function calulateCarsChargedPerYear() {
    return Math.floor(calculateCarsChargedPerTruck() * environment.simulation.truckAmount * 365.25);
}

function calulateMaxTruckUptime() {
    var chargingCapacity = calculateChargingCapacity(
        environment.simulation.static.truck.capacity,
        environment.simulation.static.truck.mileage,
        environment.simulation.static.distanceToLocations
    )

    var amountOfCarsThatCanBeCharged = calculateAmountOfCarsThatCanBeCharged(
        chargingCapacity,
        environment.simulation.static.car.capacity,
        environment.simulation.carChargeLimit
    );
    var travelTime = calculateTravelTime(
        environment.simulation.static.distanceBetweenCharges,
        environment.simulation.static.truck.averageSpeed
    );
    var chargeTime = calculateChargeTime(
        environment.simulation.static.car.capacity,
        environment.simulation.static.car.chargeSpeed,
        environment.simulation.carChargeLimit
    );

    var chargeCycleTime = calculateChargeCycleTime(
        amountOfCarsThatCanBeCharged,
        travelTime,
        chargeTime) + calculateTravelTime(
            environment.simulation.static.distanceToLocations,
            environment.simulation.static.truck.averageSpeed
        ) * 1000

    return prettyTime(chargeCycleTime);
}

var outputs

function updateCalculations() {
    for(var outputId in outputs) {
        var output = outputs[outputId]

        output.element.html(output.calculate())
    }
}

$(document).ready(function() {
    outputs = {
        chargesPerDay: {
            element: $('#chargesPerDay'),
            calculate: function() {
                return calulateCarsChargedPerDay()
            }
        },
        chargesPerMonth: {
            element: $('#chargesPerMonth'),
            calculate: function() {
                return calulateCarsChargedPerMonth()
            }
        },
        chargesPerYear: {
            element: $('#chargesPerYear'),
            calculate: function() {
                return calulateCarsChargedPerYear()
            }
        },
        maxTruckUptime: {
            element: $('#maxTruckUptime'),
            calculate: function() {
                return calulateMaxTruckUptime()
            }
        }
    }

    updateCalculations()

    $('#truckAmount').val(environment.simulation.truckAmount);
    $('#truckUptime').val(environment.simulation.truckUptime);
    $('#carAmount').val(environment.simulation.carAmount);
    $('#carChargeLimit').val(environment.simulation.carChargeLimit);

    $('#sidebar-toggle').click((event) => {
        event.preventDefault()
        $('body').toggleClass('nav-active');
        window.dispatchEvent(new Event('resize'));
    })

    $('.param.draggable').each(function(i, el) {
        var val = $(el).val()

        if($(el).hasClass('unit-percent')) {
            val *= 100
        }

        $(el).attr('data-value', Math.floor(val))
    })

    $('.param.draggable').on('input', function() {
        var val = $(this).val()

        if($(this).hasClass('unit-percent')) {
            val *= 100
        }

        $(this).attr('data-value', Math.floor(val))
    })

    $('.param.numbers .subtract').click(function() {
        var $input = $(this).siblings('.amount')
        var val = Number($input.val())

        if(val > 0) {
            $input.val(val - 1)
        }

        $input.trigger('change')
    })

    $('.param.numbers .amount').change(function() {
        var $input = $(this)
        var val = Number($input.val())
        var max = Number($input.attr('max'))

        if(val > max) {
            $input.val(max)
        }

        if(val < 0) {
            $input.val(0)
        }
    })

    $('.param.numbers .add').click(function() {
        var $input = $(this).siblings('.amount')
        var val = Number($input.val())
        var max = Number($input.attr('max'))

        if(val < max) {
            $input.val(val + 1)
        } else {
            $input.val(max)
        }

        $input.trigger('change')
    })

    $('#truckAmount').change(function() {
        var diff = Number($(this).val()) - environment.simulation.truckAmount

        console.log('truckAmount changed by', diff)
        updateAmountOfTrucks(diff)
    })

    $('#carAmount').change(function() {
        var diff = Number($(this).val()) - environment.simulation.carAmount

        console.log('carAmount changed by', diff)
        updateAmountOfCars(diff)
    })

    $('#truckUptime').change(function() {
        console.log('truckUptime changed')

        // updateTruckUptime(Number($(this).val()))
        environment.simulation.truckUptime = Number($(this).val());
    })

    $('#carChargeLimit').change(function() {
        console.log('carChargeLimit changed')

        environment.simulation.carChargeLimit = Number($(this).val())
    })

    $('.update-sim').change(function() {
        updateCalculations()
    })

    var $chargeLabel = $('#average-charge > .bar > .progress > .amount')
    var $chargeValue = $('#average-charge > .bar > .progress')

    function updateAverageCharge() {
        var val = Math.min(Math.max(Math.round(
            environment.simulation.totalCarCharge /
            environment.simulation.carCapacity /
            environment.simulation.carChargeLimit
        ), 0), 100) + '%'

        $chargeLabel.html(val)
        $chargeValue.css('width', val)
    }

    function delayedTick() {
        updateAverageCharge()
    }

    delayedTick()

    var tick = setInterval(delayedTick, 250)
})

