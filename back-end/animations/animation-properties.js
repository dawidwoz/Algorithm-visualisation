class AnimationProperties{
    constructor(isMoving=false, isFading=false){
        this.isMoving = isMoving;
        this.isFading = isFading;
        this.progress = 0;
        this.fade = "none";
        this.opacity = 1;
    }
    isBeingAnimated(){
        // An object is being animated if it is moving or fading
        return this.isMoving || this.isFading;
    }
}

class MoveNoFade extends AnimationProperties{
    constructor(){
        super(true, false);
    }
}

class MoveFadeIn extends AnimationProperties{
    constructor(){
        super(true, true);
        this.fade = "in";
    }
}

class MoveFadeOut extends AnimationProperties{
    constructor(){
        super(true, true);
        this.fade = "out";
    }
}