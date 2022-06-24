const road = document.querySelector("canvas");
road.height = window.innerHeight;
road.width = 500;

const context = road.getContext("2d");
const car = new Car(window.innerWidth / 2, window.innerHeight - 80, 40, 80);
car.draw(context);

animate();

function animate() {
  car.update();
  road.height = window.innerHeight;
  road.width = window.innerWidth;
  car.draw(context);
  requestAnimationFrame(animate);
}
