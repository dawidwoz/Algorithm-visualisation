class AnimationSequencer {
    constructor() {
        this.sequenceQueue = [];
        this.numSequences = 0;
        this.currSequence = 0;
    }

    add(animationSequence) {
        // Add an AnimationSequence to be executed
        this.sequenceQueue.push(animationSequence);
        this.numSequences++;
    }

    go() {
        toggleControlInputs(false); // Disable visualization control inputs
        this.doNext();
    }

    doNext() {
        // Execute the next AnimationSequence or finish
        if (this.numSequences === this.currSequence) {
            // Finished animating sequences
            toggleControlInputs(true); // Enable visualization control inputs
            this.sequenceQueue = [];
            this.numSequences = 0;
            this.currSequence = 0;
        } else {
            // Execute next AnimationSequence
            this.sequenceQueue[this.currSequence].go();
            this.currSequence++;
        }
    }
}

class AnimationSequence {
    constructor() {
        this.animationSequencer = animationSequencer;
        this.animationQueue = [];
        this.numAnimations = 0;
        this.doNotDrawObjects = [];
        this.sequenceObjects = [];
        this.numSequenceObjects = 0;
        this.currObject = 0;

        this.executeConcurrently = false;
    }

    add(canvasObject, coordSet, animationProperties) {
        this.animationQueue.push({
            canvasObject: canvasObject,
            coordSet: coordSet,
            animationProperties: animationProperties
        });

        this.numAnimations++;
    }

    go() {
        this.setObjectDrawStates(true); // Set flags to stop VisualObjects from being drawn

        if (this.executeConcurrently) {
            for (let i = 0; i < this.numAnimations; i++) {
                this.animationQueue[i].canvasObject.setCoordSet(this.animationQueue[i].coordSet);
                this.animationQueue[i].canvasObject.setAnimationProperties(this.animationQueue[i].animationProperties);
            }

            this.animate(this.animationQueue, this.numAnimations) // Execute everything at once
        } else {
            this.doNext();
        }
    }

    doNext() {
        if (this.numAnimations === (this.currObject) || this.executeConcurrently) {
            this.finish();
        } else {
            // Apply the respective CoordSet and Animationproperties to the next object to animate
            this.animationQueue[this.currObject].canvasObject.setCoordSet(this.animationQueue[this.currObject].coordSet);
            this.animationQueue[this.currObject].canvasObject.setAnimationProperties(this.animationQueue[this.currObject].animationProperties);
            this.animate([this.animationQueue[this.currObject]], 1); // Execute animation
            this.currObject++;
        }
    }

    animate(visualObjects, numVisualObjects) {
        // Code loosely takes inspiration from https://codepen.io/beaucarnes/pen/ybzpZE?editors=1010

        let stopID = 0; // Will hold the current animation frame ID
        let progress = 0; // Progress of animation, is iterated by one each loop
        let sequenceReference = this;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            for (let i = 0; i < numVisualObjects; i++) {
                let currObject = visualObjects[i].canvasObject;
                let fromX = currObject.getFromXY()[0];
                let fromY = currObject.getFromXY()[1];
                let toX = currObject.getToXY()[0];
                let toY = currObject.getToXY()[1];
                let trajectoryAngle = Math.atan2(toY - fromY, toX - fromX);
                let lineLength = Math.hypot(toX - fromX, toY - fromY);
                let lineSegment = lineLength / animationSteps;

                let newX = currObject.getXY()[0] + (Math.cos(trajectoryAngle) * lineSegment);
                let newY = currObject.getXY()[1] + (Math.sin(trajectoryAngle) * lineSegment);

                // Update the VisualObject being animated with new vector and progress for animation effects
                currObject.update(newX, newY, progress);
            }

            adtController.visualDatastructure.draw();
            sequenceReference.drawObjects();

            if (progress !== animationSteps - 1) {
                progress += 1;
                stopID = window.requestAnimationFrame(step); // stopID becomes the next frame's ID
            } else {
                adtController.visualDatastructure.draw();
                window.cancelAnimationFrame(stopID);
                sequenceReference.doNext();
            }
        }
    }

    finish() {
        // Finished animating all items
        for (let i = 0; i < this.numAnimations; i++) {
            this.animationQueue[i].canvasObject.resetAnimationProperties();
        }
        this.setObjectDrawStates(false); // VisualObjects set as not being drawn during sequence can be drawn again
        this.animationSequencer.doNext();
    }

    setObjectDrawStates(setNotDrawObjects) {
        for (let i = 0; i < this.doNotDrawObjects.length; i++) {
            this.doNotDrawObjects[i].setNotDrawnState(setNotDrawObjects);
        }
    }

    // This function adds to the sequence's list of objects that need to be drawn. These can't be specified in the above
    // add function, as the object being added may be part of the data structure and so would be drawn twice
    addTempObject(visualObject) {
        this.sequenceObjects.push(visualObject);
        this.numSequenceObjects++;
    }

    drawObjects() {
        // Draws "temporary" VisualObjects belonging only to this sequence
        for (let i = 0; i < this.numSequenceObjects; i++) {
            this.sequenceObjects[i].draw();
        }
    }

    doNotDraw(visualObject) {
        // Add a VisualObject that is not to be drawn during this sequence
        this.doNotDrawObjects.push(visualObject);
    }
}