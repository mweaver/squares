(function () {
    console.log('hey');

    var canvas = document.getElementById('main'),
        elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop;

    canvas.addEventListener('click', function (event) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        console.log('x: ', x, 'y: ', y);
    });
})();