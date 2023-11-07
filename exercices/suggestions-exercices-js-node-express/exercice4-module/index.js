const geometry = require('./geometry');

console.log(geometry.perimeterOfCircle(2));
console.log(geometry.surfaceOfCircle(1));
console.log(geometry.volumeOfSphere(1));

const circle1 = { x: 0, y: 0, radius: 1 }
const circle2 = { x: 2, y: 0, radius: 1 }

console.log(geometry.areOverlapping(circle1.x, circle1.y, circle1.radius, circle2.x, circle2.y, circle2.radius));