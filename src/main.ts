// import { Car } from "./utils";
/// <reference path="./utils.ts" />

let isLightsOn = false;
document.addEventListener("keyup", (e) => {
  if (e.key == "f") isLightsOn = !isLightsOn;
});
const infoDiv = document.querySelector(".info");
const road = <HTMLCanvasElement>document.querySelector("canvas");
road.height = window.innerHeight;
road.width = 500;

setTimeout(() => {
  infoDiv?.classList.add("hide-info");
}, 3000);

const context = road.getContext("2d");
const car: util.Car = new util.Car(
  window.innerWidth / 2,
  window.innerHeight - 80,
  80,
  160
);
car.draw(context, isLightsOn);

animate();

function animate() {
  car.update();
  road.height = window.innerHeight;
  road.width = window.innerWidth;
  car.draw(context, isLightsOn);
  requestAnimationFrame(animate);
}
