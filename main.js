const road = document.querySelector("canvas");
road.height = window.innerHeight;
road.width = 500;

const context = road.getContext("2d");
const car = new Car(250, 200, 30, 50);
car.draw(context);
