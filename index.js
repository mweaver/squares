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
                var topLeftX = initialOffsetX + x * gridElementSize,
                    topLeftY = initialOffsetY + (gridSize - y) * gridElementSize;

                gridElements.push({
                    gridX: x,
                    gridY: y,
                    renderX: topLeftX,
                    renderY: topLeftY,
                    top: topLeftX,
                    bottom: topLeftX + gridElementSize,
                    left: topLeftX,
                    right: topLeftY + gridElementSize
                });
            }
        }
    }

    function drawGrid () {
        var gridElementsLength = gridElements.length;

        for (var x = 0; x < gridElementsLength; x++) {
            ctx.strokeRect(gridElements[x].renderX, gridElements[x].renderY, gridElementSize, gridElementSize);
            ctx.fillText(gridElements[x].gridX + ',' + gridElements[x].gridY, gridElements[x].renderX + 5, gridElements[x].renderY + 10);
        }
    }

    function getPossibleSquares (pointA, pointB) {
        var slopeX = pointB.gridX - pointA.gridX,
            slopeY = pointB.gridY - pointA.gridY,
            invSlopeX = -1 * slopeY,
            invSlopeY = slopeX,
            pointC1, pointD1, pointC2, pointD2;

        pointC1 = {
            gridX: pointA.gridX + invSlopeX,
            gridY: pointA.gridY + invSlopeY
        };

        pointD1 = {
            gridX: pointB.gridX + invSlopeX,
            gridY: pointB.gridY + invSlopeY
        };

        pointC2 = {
            gridX: pointA.gridX - invSlopeX,
            gridY: pointA.gridY - invSlopeY
        };

        pointD2 = {
            gridX: pointB.gridX - invSlopeX,
            gridY: pointB.gridY - invSlopeY
        };

        console.log('point A: ', pointA, 'point B: ', pointB, 'point C1: ', pointC1, 'point D1: ', pointD1, 'point C2: ', pointC2, 'point D2: ', pointD2);
    }

    canvas.addEventListener('click', function (event) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        console.log('x: ', x, 'y: ', y);

        // detect click
    });

    initialize();
    drawGrid();
    getPossibleSquares({gridX: 1, gridY: 4}, {gridX: 6, gridY: 6})
})();