var util;
(function (util) {
    class Controls {
        constructor() {
            this.forward = false;
            this.left = false;
            this.right = false;
            this.reverse = false;
            this.addKeyboardListeners();
        }
        addKeyboardListeners() {
            document.onkeydown = (event) => {
                switch (event.key) {
                    case "ArrowLeft":
                        this.left = true;
                        break;
                    case "ArrowRight":
                        this.right = true;
                        break;
                    case "ArrowUp":
                        this.forward = true;
                        break;
                    case "ArrowDown":
                        this.reverse = true;
                        break;
                }
                // console.table(this);
            };
            document.onkeyup = (event) => {
                switch (event.key) {
                    case "ArrowLeft":
                        this.left = false;
                        break;
                    case "ArrowRight":
                        this.right = false;
                        break;
                    case "ArrowUp":
                        this.forward = false;
                        break;
                    case "ArrowDown":
                        this.reverse = false;
                        break;
                }
                // console.table(this);
            };
        }
    }
    util.Controls = Controls;
    class Car {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = 0;
            this.acceleration = 0.5; //0.2
            this.maxSpeed = 15; //3
            this.friction = 0.05;
            this.angle = 0;
            this.controls = new Controls();
        }
        update() {
            // Up control
            if (this.controls.forward) {
                this.speed += this.acceleration;
            }
            // Down control
            if (this.controls.reverse) {
                this.speed -= this.acceleration;
            }
            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            }
            if (this.speed < -this.maxSpeed / 2) {
                this.speed = -this.maxSpeed / 2;
            }
            if (this.speed > 0) {
                this.speed -= this.friction;
            }
            if (this.speed < 0) {
                this.speed += this.friction;
            }
            if (Math.abs(this.speed) < this.friction) {
                this.speed = 0;
            }
            if (this.speed != 0) {
                const flip = this.speed > 0 ? 1 : -1;
                if (this.controls.left) {
                    // Left control
                    this.angle += 0.03 * flip;
                }
                // Right control
                if (this.controls.right) {
                    this.angle -= 0.03 * flip;
                }
            }
            this.x -= Math.sin(this.angle) * this.speed;
            this.y -= Math.cos(this.angle) * this.speed;
        }
        /**
         *
         * @param {*} ctx Canvas context
         */
        draw(ctx, isLightsOn) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(-this.angle);
            // Body
            ctx.beginPath();
            ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, 15);
            ctx.fillStyle = "#333333";
            ctx.fill();
            ctx.closePath();
            // bumper
            ctx.beginPath();
            ctx.roundRect(-this.width / 2 + 3, -this.height / 2 - 10, this.width - 6, 10, 25);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
            // Left light
            ctx.beginPath();
            ctx.roundRect(-this.width / 2, -this.height / 2 - 2, 15, 10, 5);
            ctx.fillStyle = isLightsOn ? "#FBBC05" : "#ffffff";
            ctx.fill();
            ctx.closePath();
            // Right light
            ctx.beginPath();
            ctx.roundRect(this.width / 2 - 15, -this.height / 2 - 2, 15, 10, 5);
            ctx.fillStyle = isLightsOn ? "#FBBC05" : "#ffffff";
            ctx.fill();
            ctx.closePath();
            if (isLightsOn) {
                // Right lightbeam
                ctx.beginPath();
                ctx.roundRect(this.width / 2 - 20, -this.height / 2 - 85, 25, 85, 5);
                ctx.fillStyle = "#fbbd0549";
                ctx.fill();
                ctx.closePath();
                // Left lightbeam
                ctx.beginPath();
                ctx.roundRect(-this.width / 2 - 5, -this.height / 2 - 85, 25, 85, 5);
                ctx.fillStyle = "#fbbd0549";
                ctx.fill();
                ctx.closePath();
            }
            // Left front tire
            ctx.beginPath();
            ctx.roundRect(-this.width / 2 - 10, -this.height / 2, 10, 35, 5);
            ctx.fillStyle = "#000000";
            ctx.fill();
            // Right front tire
            ctx.beginPath();
            ctx.roundRect(this.width / 2, -this.height / 2, 10, 35, 5);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
            // Left rear tire
            ctx.beginPath();
            ctx.roundRect(-this.width / 2 - 10, this.height / 2 - 45, 10, 35, 5);
            ctx.fillStyle = "#000000";
            ctx.fill();
            // Right rear tire
            ctx.beginPath();
            ctx.roundRect(this.width / 2, this.height / 2 - 45, 10, 35, 5);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }
    util.Car = Car;
})(util || (util = {}));
// import { Car } from "./utils";
/// <reference path="./utils.ts" />
let isLightsOn = false;
document.addEventListener("keyup", (e) => {
    if (e.key == "f")
        isLightsOn = !isLightsOn;
});
const infoDiv = document.querySelector(".info");
const road = document.querySelector("canvas");
road.height = window.innerHeight;
road.width = 500;
setTimeout(() => {
    infoDiv === null || infoDiv === void 0 ? void 0 : infoDiv.classList.add("hide-info");
}, 3000);
const context = road.getContext("2d");
const car = new util.Car(window.innerWidth / 2, window.innerHeight - 80, 80, 160);
car.draw(context, isLightsOn);
animate();
function animate() {
    car.update();
    road.height = window.innerHeight;
    road.width = window.innerWidth;
    car.draw(context, isLightsOn);
    requestAnimationFrame(animate);
}
//# sourceMappingURL=bundle.js.map