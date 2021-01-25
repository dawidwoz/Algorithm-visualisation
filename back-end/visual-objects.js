class CoordSet {
    constructor() {
        this.fromMiddleXY = [0, 0];
        this.toMiddleXY = [0, 0];
    }

    getFromXY() {
        return this.fromMiddleXY;
    }

    setFromXY(x, y) {
        this.fromMiddleXY = [x, y];
    }

    getToXY() {
        return this.toMiddleXY;
    }

    setToXY(x, y) {
        this.toMiddleXY = [x, y];
    }
}

class VisualObject {
    constructor() {
        this.middleXY = [0, 0];
        this.notDrawn = false;
        this.visualObjects = [];
        this.incomingArrows = [];
        this.outgoingArrows = [];
        this.coordSet = new CoordSet();
        this.animationProperties = new AnimationProperties();
    }

    getXY() {
        return this.middleXY;
    }

    setXY(x, y) {
        this.middleXY = [x, y];

        this.updateArrowsXY();
    }

    getToXY() {
        return this.coordSet.getToXY();
    }

    getFromXY(){
        return this.coordSet.getFromXY();
    }

    setCoordSet(coordSet) {
        this.coordSet = coordSet;
        this.middleXY = coordSet.getFromXY();
    }

    update(x, y, progress) {
        this.animationProperties.progress = progress;
        console.log(this);

        if (this.animationProperties.isMoving) {
            this.middleXY = [x, y];
            //this.setXY(x, y);
        }
        if (this.animationProperties.isFading) {
            this.updateOpacity();
        }

        this.updateArrowsXY();
    }

    updateArrowsXY() {
        for (let i = 0; i < this.outgoingArrows.length; i++) {
            this.outgoingArrows[i].setStartXY(this.middleXY[0], this.middleXY[1]);
        }

        for (let i = 0; i < this.incomingArrows.length; i++) {
            this.incomingArrows[i].setEndXY(this.middleXY[0], this.middleXY[1]);
        }
    }

    addIncomingArrow(visualArrow) {
        visualArrow.setEndXY(this.middleXY[0], this.middleXY[1]);

        this.incomingArrows.push(visualArrow);
    }

    addOutgoingArrow(visualArrow) {
        visualArrow.setStartXY(this.middleXY[0], this.middleXY[1]);

        this.outgoingArrows.push(visualArrow);
    }

    isBeingAnimated() {
        return this.animationProperties.isBeingAnimated();
    }

    setAnimationProperties(animationProperties) {
        this.animationProperties = animationProperties;

        for (let i = 0; i < this.visualObjects.length; i++) {
            this.visualObjects[i].setAnimationProperties(animationProperties);
        }
    }

    setNotDrawnState(state) {
        this.notDrawn = state;

        for (let i = 0; i < this.visualObjects; i++) {
            // Apply not drawn state to all contained VisualObjects
            this.visualObjects[i].setNotDrawnState(state);
        }
    }

    updateOpacity() {
        let newOpacity = 0;

        switch (this.animationProperties.fade) {
            case "none":
                return;
            case "in":
                newOpacity = this.animationProperties.progress / animationSteps;
                break;
            case "out":
                newOpacity = Math.abs(((this.animationProperties.progress - 1) / animationSteps) - 1);
                break;
        }

        this.animationProperties.opacity = newOpacity;

        for (let i = 0; i < this.visualObjects.length; i++) {
            this.visualObjects[i].animationProperties.opacity = newOpacity;
        }
    }

    resetAnimationProperties() {
        this.animationProperties = new AnimationProperties();

        for (let i = 0; i < this.visualObjects.length; i++) {
            this.visualObjects[i].resetAnimationProperties();
        }
    }

    draw() {
        if (!this.notDrawn) {
            for (let i = 0; i < this.visualObjects.length; i++) {
                // Draw all VisualObjects contained within this VisualObject
                this.visualObjects[i].draw();
            }
            for (let i = 0; i < this.outgoingArrows.length; i++) {
                // Draw all outoing arrows
                this.outgoingArrows[i].draw();
            }
        }
    }
}

class VisualArrow {
    constructor(startMargin = 0, endMargin = 0) {
        this.startMargin = startMargin;
        this.startXY = [];
        this.endMargin = endMargin;
        this.endXY = [];
    }

    setStartXY(x, y) {
        this.startXY = [x, y];
    }

    setEndXY(x, y) {
        this.endXY = [x, y];
    }

    draw() {
        let lineAngle = Math.atan2(this.endXY[1] - this.startXY[1], this.endXY[0] - this.startXY[0]);

        // Adjusted start and end take the start and end margins respectively into account

        let adjustedStartX = this.startXY[0] + Math.cos(lineAngle) * this.startMargin;
        let adjustedStartY = this.startXY[1] + Math.sin(lineAngle) * this.startMargin;

        let adjustedEndX = this.endXY[0] - Math.cos(lineAngle) * this.endMargin;
        let adjustedEndY = this.endXY[1] - Math.sin(lineAngle) * this.endMargin;

        let angleFromShaftToArrowHeadCorner = Math.PI / 8;
        let lengthOfArrowHeadSide = 10;

        // Draw the line
        ctx.beginPath();
        ctx.moveTo(adjustedStartX, adjustedStartY);
        ctx.lineTo(adjustedEndX, adjustedEndY);
        ctx.stroke();

        // Calculate the vectors at which the pointer arrow head corners should be
        let angleFromShaftToArrowHeadCornerTop = lineAngle + Math.PI + angleFromShaftToArrowHeadCorner;
        let arrowHeadCornerTopX = adjustedEndX + Math.cos(angleFromShaftToArrowHeadCornerTop) * lengthOfArrowHeadSide;
        let arrowHeadCornerTopY = adjustedEndY + Math.sin(angleFromShaftToArrowHeadCornerTop) * lengthOfArrowHeadSide;

        let angleFromShaftToArrowHeadCornerBottom = lineAngle + Math.PI - angleFromShaftToArrowHeadCorner;
        let arrowHeadCornerBottomX = adjustedEndX + Math.cos(angleFromShaftToArrowHeadCornerBottom) * lengthOfArrowHeadSide;
        let arrowHeadCornerBottomY = adjustedEndY + Math.sin(angleFromShaftToArrowHeadCornerBottom) * lengthOfArrowHeadSide;

        // Draw the pointer head at the end of the line
        ctx.beginPath();
        ctx.moveTo(arrowHeadCornerTopX, arrowHeadCornerTopY);
        ctx.lineTo(adjustedEndX, adjustedEndY);
        ctx.lineTo(arrowHeadCornerBottomX, arrowHeadCornerBottomY);
        ctx.lineTo(arrowHeadCornerTopX, arrowHeadCornerTopY);
        ctx.fill();
    }
}

class VisualCircle extends VisualObject {
    constructor(radius=circleRadius) {
        super();

        this.radius = radius;
    }

    draw() {
        ctx.save(); // Save canvas context, i.e. settings such as opacity

        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.beginPath();
        ctx.arc(this.middleXY[0], this.middleXY[1], this.radius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.restore(); // Restore canvas context settings
    }
}

class VisualBox extends VisualObject {
    constructor(width = boxWidth, height = boxHeight) {
        super();

        this.width = width;
        this.height = height;
        this.crossedThrough = false;
    }

    draw() {
        super.draw();

        ctx.save();

        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.strokeRect(this.getXY()[0] - (this.width / 2), this.getXY()[1] - (this.height / 2), this.width, this.height);

        if (this.crossedThrough) {
            // Draw a slanted line
            ctx.beginPath();
            ctx.moveTo(this.getXY()[0] - (this.width / 2), this.getXY()[1] + (this.height / 2));
            ctx.lineTo(this.getXY()[0] + (this.width / 2), this.getXY()[1] - (this.height / 2));
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }
}

class VisualValue extends VisualObject {
    constructor(value) {
        super();

        this.value = value;
    }

    setValue(value) {
        this.value = value;
    }

    draw() {
        super.draw();

        ctx.save();

        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.fillText(this.value, this.getXY()[0], this.getXY()[1]);

        ctx.restore();
    }
}