var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Space(game, spritesheet) {
    this.animation = new Animation(spritesheet, 800, 800, 2, 0.10, 2, true, 1);
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Space.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
};

Space.prototype.update = function () {
};

function Key(game, spritesheet) {
    this.animation = new Animation(spritesheet, 32, 32, 8, 0.175, 8, true, 5);
    this.grabbed = false;
    this.grabbedTimer = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.x = (this.ctx.canvas.width / 2) - ((this.animation.frameWidth * this.animation.scale) / 2);
    this.y = (this.ctx.canvas.height / 2) - ((this.animation.frameHeight * this.animation.scale) / 2);
}

Key.prototype.draw = function () {
    if (!this.grabbed) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        this.grabbedTimer -= 1;
        if (!this.grabbedTimer) {
            this.grabbed = false;
        }
    }
}

Key.prototype.update = function () {
    
}

function Potion1(game, spritesheet) {
    this.animation = new Animation(spritesheet, 32, 32, 2, 0.175, 2, true, 5);
    this.grabbed = false;
    this.grabbedTimer = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.centerX = (this.ctx.canvas.width / 2) - ((this.animation.frameWidth * this.animation.scale) / 2);
    this.centerY = (this.ctx.canvas.height / 2) - ((this.animation.frameHeight * this.animation.scale) / 2);
    this.x = this.centerX;
    this.y = this.centerY;
    this.t = 0;
}

Potion1.prototype.draw = function () {
    if (!this.grabbed) {
        this.x = this.centerX + (150 * (Math.cos((this.t / 180) * Math.PI)));
        this.y = this.centerY + (150 * (Math.sin((this.t / 180) * Math.PI)));
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }  else {
        this.grabbedTimer -= 1;
        if (!this.grabbedTimer) {
            this.grabbed = false;
        }
    }
}

Potion1.prototype.update = function () {
    this.t++;
    if (this.t === 360) {
        this.t = 0;
    }
}

function Potion2(game, spritesheet) {
    this.animation = new Animation(spritesheet, 32, 32, 2, 0.175, 2, true, 5);
    this.grabbed = false;
    this.grabbedTimer = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.centerX = (this.ctx.canvas.width / 2) - ((this.animation.frameWidth * this.animation.scale) / 2);
    this.centerY = (this.ctx.canvas.height / 2) - ((this.animation.frameHeight * this.animation.scale) / 2);
    this.x = this.centerX;
    this.y = this.centerY;
    this.t = 120;
}

Potion2.prototype.draw = function () {
    if (!this.grabbed) {
        this.x = this.centerX + (150 * (Math.cos((this.t / 180) * Math.PI)));
        this.y = this.centerY + (150 * (Math.sin((this.t / 180) * Math.PI)));
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }  else {
        this.grabbedTimer -= 1;
        if (!this.grabbedTimer) {
            this.grabbed = false;
        }
    }
}

Potion2.prototype.update = function () {
    this.t++;
    if (this.t === 360) {
        this.t = 0;
    }
}

function Potion3(game, spritesheet) {
    this.animation = new Animation(spritesheet, 32, 32, 2, 0.175, 2, true, 5);
    this.grabbed = false;
    this.grabbedTimer = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.centerX = (this.ctx.canvas.width / 2) - ((this.animation.frameWidth * this.animation.scale) / 2);
    this.centerY = (this.ctx.canvas.height / 2) - ((this.animation.frameHeight * this.animation.scale) / 2);
    this.x = this.centerX;
    this.y = this.centerY;
    this.t = 240;
}

Potion3.prototype.draw = function () {
    if (!this.grabbed) {
        this.x = this.centerX + (150 * (Math.cos((this.t / 180) * Math.PI)));
        this.y = this.centerY + (150 * (Math.sin((this.t / 180) * Math.PI)));
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        this.grabbedTimer -= 1;
        if (!this.grabbedTimer) {
            this.grabbed = false;
        }
    }
}

Potion3.prototype.update = function () {
    this.t++;
    if (this.t === 360) {
        this.t = 0;
    }
}

function Mario(game, spritesheet) {
    this.animation = new Animation(spritesheet, 32, 32, 8, 0.2, 8, true, 5);
    this.game = game;
    this.score = 0;
    this.ctx = game.ctx;
    this.x = -Infinity;
    this.y = -Infinity;
    this.xVelocity = 5;
    this.yVelocity = 5;
}

Mario.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    this.ctx.fillText(`Score: ${this.score}`, 20, 40);
}

Mario.prototype.update = function () {
    if (this.x < (0 - (this.animation.frameWidth * this.animation.scale))
                || this.x > this.ctx.canvas.width
                || this.y < (0 - (this.animation.frameHeight * this.animation.scale))
                || this.y > this.ctx.canvas.height) {
        let wid = this.animation.frameWidth * this.animation.scale;
        let hei = this.animation.frameHeight * this.animation.scale;
        this.x = Math.floor(Math.random() * (this.ctx.canvas.width + (wid * 2))) - wid;
        if (Math.floor(Math.random() * 10) % 2) {
            this.x = Math.floor(Math.random() * (this.ctx.canvas.width + (wid * 2))) - wid;
            this.xVelocity = ((this.ctx.canvas.width / 2) - this.x) / 85;
            if (Math.floor(Math.random() * 10) % 2) {
                this.y = this.ctx.canvas.height;
                this.yVelocity = -4;
            } else {
                this.y = 0 - hei;
                this.yVelocity = 4;
            }
        } else {
            this.y = Math.floor(Math.random() * (this.ctx.canvas.height + (hei * 2))) - hei;
            this.yVelocity = ((this.ctx.canvas.height / 2) - this.y) / 85;
            if (Math.floor(Math.random() * 10) % 2) {
                this.x = this.ctx.canvas.width;
                this.xVelocity = -4;
            } else {
                this.x = 0 - wid;
                this.xVelocity = 4;
            }
        }
        
    }
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    for (let i = 1; i < 5; i++) {
        let check = this.game.entities[i];
        if (!check.grabbed && Math.abs(this.x - check.x) < 42 && Math.abs(this.y - check.y) < 42) {
            check.grabbed = true;
            check.grabbedTimer = 400 + Math.floor(Math.random() * 100);
            this.score++;
        }
    }
}



AM.queueDownload("./img/space.png");
AM.queueDownload("./img/key.png");
AM.queueDownload("./img/potion1.png");
AM.queueDownload("./img/potion2.png");
AM.queueDownload("./img/potion3.png");
AM.queueDownload("./img/mario.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.font = '30px Arial';
    ctx.fillStyle = "white";

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Space(gameEngine, AM.getAsset("./img/space.png")));
    gameEngine.addEntity(new Key(gameEngine, AM.getAsset("./img/key.png")));
    gameEngine.addEntity(new Potion1(gameEngine, AM.getAsset("./img/potion1.png")));
    gameEngine.addEntity(new Potion2(gameEngine, AM.getAsset("./img/potion2.png")));
    gameEngine.addEntity(new Potion3(gameEngine, AM.getAsset("./img/potion3.png")));
    gameEngine.addEntity(new Mario(gameEngine, AM.getAsset("./img/mario.png")));
});