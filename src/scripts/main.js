$(document).ready(function() {
    var path = anime.path('#bla path');

    var motionPath = anime({
        targets: '.block',
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        easing: 'linear',
        duration: 45000,
        loop: true
    });

    var viv = new Vivus('bla', {
        duration: 200
    })
})
