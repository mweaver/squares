(function () {
    var canvas = document.getElementById('main'),
        ctx = canvas.getContext('2d'),
        elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop,
        gridSize = 12,
        gridElements = [],
        gridElementSize = 40,
        gridTop = 0,
        gridBottom = 0,
        gridLeft = 0,
        gridRight = 0,
        initialOffsetX = 30,
        initialOffsetY = 30,

        selectedGridElement,
        allSelectedGridElements = [];

    function initialize () {

        gridTop = initialOffsetY;
        gridBottom = initialOffsetY + (gridSize * gridElementSize);
        gridLeft = initialOffsetX;
        gridRight = initialOffsetX + (gridSize * gridElementSize);

        console.log('gridTop: ', gridTop);
        console.log('gridBottom: ', gridBottom);
        console.log('gridLeft: ', gridLeft);
        console.log('gridRight: ', gridRight);

        for (var x = 0; x < gridSize; x++) {
            gridElements.push([]);
            for (var y = 0; y < gridSize; y++) {
                var topLeftX = initialOffsetX + x * gridElementSize,
                    topLeftY = initialOffsetY + (gridSize - 1 - y) * gridElementSize,
                    top = topLeftY,
                    bottom = topLeftY + gridElementSize,
                    left = topLeftX,
                    right = topLeftX + gridElementSize;

                gridElements[x].push({
                    gridX: x,
                    gridY: y,
                    renderX: topLeftX,
                    renderY: topLeftY,
                    top: top,
                    bottom: bottom,
                    left: left,
                    right: right,
                    getPhysicalCenter: function () {
                        var circleX, circleY;

                        circleX = (this.right + this.left)/ 2;
                        circleY = (this.bottom + this.top)/2;

                        console.log('circle x: ', circleX, 'circle y: ', circleY);

                        return {
                            x: circleX,
                            y: circleY
                        };
                    }
                });
            }
        }
    }

    function drawGrid () {
        var gridElementsLength = gridElements.length;

        for (var y = 0; y < gridElementsLength; y++) {
            var gridElement;

            for (var x = 0; x < gridElementsLength; x++) {
                gridElement = gridElements[x][y];
                ctx.strokeRect(gridElement.renderX, gridElement.renderY, gridElementSize, gridElementSize);
                ctx.fillText(gridElement.gridX + ',' + gridElement.gridY, gridElement.renderX + 5, gridElement.renderY + 10);
            }
        }
    }

    function drawCircle (gridElement) {
        var radius = 0.3 * gridElementSize,
            physicalCenterPoint = gridElement.getPhysicalCenter();

        ctx.beginPath();
        ctx.arc(physicalCenterPoint.x, physicalCenterPoint.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 102, 255, 0.4)';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }

    function drawLineBetweenPoints(gridPoint1, gridPoint2) {
        var start, end;

        start = gridPoint1.getPhysicalCenter();
        end = gridPoint2.getPhysicalCenter();

        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(0, 102, 255, 0.8)';

        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
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

        return {
            secondSquare: [pointC1, pointD1],
            thirdSquare: [pointC2, pointD2]
        }
    }

    function resolveSquares () {

        var allElementsLength = allSelectedGridElements.length,
            potentialSquarePoints;

        function findGridElementInArray (gridX, gridY) {
            var arrayLength = allSelectedGridElements.length,
                currentElement,
                rtnValue;

            for (var x = 0; x < arrayLength; x++) {
                currentElement = allSelectedGridElements[x];

                if (currentElement.gridX === gridX && currentElement.gridY === gridY) {
                    rtnValue = currentElement;
                }
            }

            return rtnValue;
        }

        if (allElementsLength > 2) {
            console.log('start resolving');
            for (var x = 0; x < allElementsLength; x++) {
                potentialSquarePoints = getPossibleSquares(selectedGridElement, allSelectedGridElements[x]);

                var objectKeys = Object.keys(potentialSquarePoints),
                    objectKeysLength = objectKeys.length;

                for (var y = 0; y < objectKeysLength; y++) {
                    var psp = potentialSquarePoints[objectKeys[y]];

                    if (findGridElementInArray(psp[0].gridX, psp[0].gridY) &&
                        findGridElementInArray(psp[1].gridX, psp[1].gridY)) {

                        // draw square between found points

                        console.log('potential square points: ', psp);

                        console.log('drawing from ', selectedGridElement.gridX, selectedGridElement.gridY, 'to ', allSelectedGridElements[x].gridX, allSelectedGridElements[x].gridY);
                        drawLineBetweenPoints(selectedGridElement, allSelectedGridElements[x]);

                        console.log('drawing from ', allSelectedGridElements[x].gridX, allSelectedGridElements[x].gridY, 'to ', gridElements[psp[1].gridX][psp[1].gridY].gridX, gridElements[psp[1].gridX][psp[1].gridY].gridY);
                        drawLineBetweenPoints(allSelectedGridElements[x], gridElements[psp[1].gridX][psp[1].gridY]);

                        console.log('drawing from ', gridElements[psp[1].gridX][psp[1].gridY].gridX, gridElements[psp[1].gridX][psp[1].gridY].gridY, 'to ', gridElements[psp[0].gridX][psp[0].gridY].gridX, gridElements[psp[0].gridX][psp[0].gridY].gridY);
                        drawLineBetweenPoints(gridElements[psp[1].gridX][psp[1].gridY], gridElements[psp[0].gridX][psp[0].gridY]);

                        console.log('drawing from ', gridElements[psp[0].gridX][psp[0].gridY].gridX, gridElements[psp[0].gridX][psp[0].gridY].gridY, 'to ', selectedGridElement.gridX, selectedGridElement.gridY);
                        drawLineBetweenPoints(gridElements[psp[0].gridX][psp[0].gridY], selectedGridElement);

                        break;

                        //drawLineBetweenPoints(gridElements[psp[0].gridX][psp[0].gridY], gridElements[psp[1].gridX][psp[1].gridY]);
                    }
                }
            }
        }
        console.log('pushing: ', selectedGridElement);
        allSelectedGridElements.push(selectedGridElement);
        console.log(allSelectedGridElements.length);
    }

    canvas.addEventListener('click', function (event) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop,
            clickedGridX = Math.floor((x - gridLeft) / gridElementSize),
            clickedGridY = (gridSize - 1) - Math.floor((y - gridTop) / gridElementSize),
            clickedGridElement = gridElements[clickedGridX][clickedGridY];

        console.log('I clicked: ', clickedGridElement);

        selectedGridElement = clickedGridElement;

        if (x < gridLeft || x > gridRight || y < gridTop || y > gridBottom) {
            console.log('outside the grid');
        }
        else {
            console.log('clicked x coord: ', clickedGridX);
            console.log('clicked y coord: ', clickedGridY);
            console.log('clicked coord: ', clickedGridElement);

            drawCircle(clickedGridElement);
        }

        resolveSquares();
    });

    initialize();
    drawGrid();
    //drawLine();
    getPossibleSquares({gridX: 2, gridY: 4}, {gridX: 7, gridY: 6})
})();
