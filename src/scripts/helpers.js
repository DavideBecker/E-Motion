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


function resize(canvas) {
    canvas.resizeCanvas(canvas.windowWidth - $('#sidebar').width() + 100, canvas.windowHeight);
}

function chargeToColor(charge) {
    var hue = 120 * charge
    var sat = abs(charge - 50) / 50

    return(hsv2rgb(hue, sat, 1))
}

var hsv2rgb = function(h, s, v) {
    // adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
    var rgb, i, data = [];
    if (s === 0) {
        rgb = [v,v,v];
    } else {
        h = h / 60;
        i = Math.floor(h);
        data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
        switch (i) {
        case 0:
            rgb = [v, data[2], data[0]];
            break;
        case 1:
            rgb = [data[1], v, data[0]];
            break;
        case 2:
            rgb = [data[0], v, data[2]];
            break;
        case 3:
            rgb = [data[0], data[1], v];
            break;
        case 4:
            rgb = [data[2], data[0], v];
            break;
        default:
            rgb = [v, data[0], data[1]];
            break;
        }
    }

    return '#' + rgb.map(function(x) {
        return ('0' + Math.round(x * 255).toString(16)).slice(-2);
    }).join('');
}
