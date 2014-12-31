(function () {
    var canvas = document.getElementById('main'),
        ctx = canvas.getContext('2d'),
        elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop,
        gridSize = 9,
        gridElements = [],
        gridElementSize = 40,
        initialOffsetX = 30,
        initialOffsetY = 30;

    function initialize () {
        for (var x = 0; x < gridSize; x++) {
            for (var y = 0; y < gridSize; y++) {
                gridElements.push({
                    gridX: x,
                    gridY: y,
                    physX: initialOffsetX + x * gridElementSize,
                    physY: initialOffsetY + (gridSize - y) * gridElementSize
                });
            }
        }
    }

    function drawGrid () {
        var gridElementsLength = gridElements.length;

        for (var x = 0; x < gridElementsLength; x++) {
            ctx.strokeRect(gridElements[x].physX, gridElements[x].physY, gridElementSize, gridElementSize);
            ctx.fillText(gridElements[x].gridX + ',' + gridElements[x].gridY, gridElements[x].physX + 5, gridElements[x].physY + 10);
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