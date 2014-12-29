(function () {
    var canvas = document.getElementById('main'),
        ctx = canvas.getContext('2d'),
        elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop,
        gridSize = 9,
        gridElements = [];

    function initialize () {
        var totalGridElements = gridSize * gridSize;

        for (var x = 0; x < gridSize; x++) {
            for (var y = 0; y < gridSize; y++) {
                gridElements.push({
                    x: x,
                    y: y
                });
            }
        }
    }

    function drawGrid () {
        var gridElementSize = 25,
            initialOffsetX = 30,
            initialOffsetY = 30,
            initialXRender = initialOffsetX,
            initialYRender = initialOffsetY * gridSize;

            for (var x = 0; x < gridSize; x++) {
                for (var y = 0; y < gridSize; y++) {
                    ctx.strokeRect(initialXRender, initialYRender, gridElementSize, gridElementSize);
                }
            }
    }

    canvas.addEventListener('click', function (event) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        console.log('x: ', x, 'y: ', y);
    });

    initialize();
    drawGrid();
})();