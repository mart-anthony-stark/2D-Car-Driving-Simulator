var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
define("utils", ["require", "exports"], function (require, exports) {
    "use strict";
    var _Controls_instances, _Controls_addKeyboardListeners;
    exports.__esModule = true;
    exports.Car = exports.Controls = void 0;
    var Controls = /** @class */ (function () {
        function Controls() {
            _Controls_instances.add(this);
            this.forward = false;
            this.left = false;
            this.right = false;
            this.reverse = false;
            __classPrivateFieldGet(this, _Controls_instances, "m", _Controls_addKeyboardListeners).call(this);
        }
        return Controls;
    }());
    exports.Controls = Controls;
    _Controls_instances = new WeakSet(), _Controls_addKeyboardListeners = function _Controls_addKeyboardListeners() {
        var _this = this;
        document.onkeydown = function (event) {
            switch (event.key) {
                case "ArrowLeft":
                    _this.left = true;
                    break;
                case "ArrowRight":
                    _this.right = true;
                    break;
                case "ArrowUp":
                    _this.forward = true;
                    break;
                case "ArrowDown":
                    _this.reverse = true;
                    break;
            }
            // console.table(this);
        };
        document.onkeyup = function (event) {
            switch (event.key) {
                case "ArrowLeft":
                    _this.left = false;
                    break;
                case "ArrowRight":
                    _this.right = false;
                    break;
                case "ArrowUp":
                    _this.forward = false;
                    break;
                case "ArrowDown":
                    _this.reverse = false;
                    break;
            }
            // console.table(this);
        };
    };
    var Car = /** @class */ (function () {
        function Car(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = 0;
            this.acceleration = 0.5; //0.2
            this.maxSpeed = 5; //3
            this.friction = 0.05;
            this.angle = 0;
            this.controls = new Controls();
        }
        Car.prototype.update = function () {
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
                var flip = this.speed > 0 ? 1 : -1;
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
        };
        /**
         *
         * @param {*} ctx Canvas context
         */
        Car.prototype.draw = function (ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(-this.angle);
            ctx.beginPath();
            ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, 5);
            ctx.fillStyle = "#053869";
            ctx.fill();
            ctx.restore();
        };
        return Car;
    }());
    exports.Car = Car;
});
define("main", ["require", "exports", "utils"], function (require, exports, utils_1) {
    "use strict";
    exports.__esModule = true;
    var road = document.querySelector("canvas");
    road.height = window.innerHeight;
    road.width = 500;
    var context = road.getContext("2d");
    var car = new utils_1.Car(window.innerWidth / 2, window.innerHeight - 80, 40, 80);
    car.draw(context);
    animate();
    function animate() {
        car.update();
        road.height = window.innerHeight;
        road.width = window.innerWidth;
        car.draw(context);
        requestAnimationFrame(animate);
    }
});
//# sourceMappingURL=bundle.js.map