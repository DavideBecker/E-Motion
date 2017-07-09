var cityDict = {
    '248169543': 'Ditzingen',
    '89317467': 'Leonberg',
    '58922085': 'Sindelnfingen',
    '249665541': 'Musberg',
    '157476409': 'Steinbronn',
    '124873928': 'Filderstadt',
    '78784342': 'Ostfildern',
    '98860443': 'Neuhausen',
    '151269436': 'Esslingen',
    '13734131': 'Altbach',
    '90947800': 'Remseck',
    '216687444': 'Kornwestheim',
    '7970225': 'Korntal-Münchingen',
    '199885805': 'Stuttgart',

    'Ditzingen': '248169543',
    'Leonberg': '89317467',
    'Sindelnfingen': '58922085',
    'Musberg': '249665541',
    'Steinbronn': '157476409',
    'Filderstadt': '124873928',
    'Ostfildern': '78784342',
    'Neuhausen': '98860443',
    'Esslingen': '151269436',
    'Altbach': '13734131',
    'Remseck': '90947800',
    'Kornwestheim': '216687444',
    'Korntal-Münchingen': '7970225',
    'Stuttgart': '199885805'
}

var cityIDsWithoutStuttgart = cityIDs.slice()

cityIDsWithoutStuttgart.splice(cityIDs.indexOf(cityDict.Stuttgart), 1)

var debugged = []

function attatchDebugger(obj) {
    debugged.push(obj)
}

function resize(canvas) {
    var sidebarWidth = $('body').hasClass('nav-active') ? $('#sidebar').width() : 0

    environment.scale = min(canvas.windowHeight / 500, (canvas.windowWidth - sidebarWidth) / 550);
    canvas.resizeCanvas(canvas.windowWidth - sidebarWidth, canvas.windowHeight);
}

function findStuckCar() {
    var stuckCars = cars.map(function(car) { return car.isStuck })

    return stuckCars[floor(random(0, stuckCars.length))]
}

function hsv2rgb(hue, saturation, vibrancy) {
    // adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
    var rgb, i,
        data = [];

    if(saturation === 0) {
        rgb = [vibrancy, vibrancy, vibrancy];
    } else {
        hue /= 60;

        i = Math.floor(hue);
        data = [
            vibrancy * (1 - saturation),
            vibrancy * (1 - saturation * (hue - i)),
            vibrancy * (1 - saturation * (1 - (hue - i)))
        ];
        switch (i) {
        case 0:
            rgb = [vibrancy, data[2], data[0]];
            break;
        case 1:
            rgb = [data[1], vibrancy, data[0]];
            break;
        case 2:
            rgb = [data[0], vibrancy, data[2]];
            break;
        case 3:
            rgb = [data[0], data[1], vibrancy];
            break;
        case 4:
            rgb = [data[2], data[0], vibrancy];
            break;
        default:
            rgb = [vibrancy, data[0], data[1]];
            break;
        }
    }

    return '#' + rgb.map(function(x) {
        return ('0' + Math.round(x * 255).toString(16)).slice(-2);
    }).join('');
}

function chargeToColor(charge) {
    charge *= 1 / environment.simulation.carChargeLimit
    if(charge > 1) {
        charge = 1
    }
    var hue = 120 * charge
    var sat = abs(charge - 50) / 50

    return hsv2rgb(hue, sat, 1)
}
