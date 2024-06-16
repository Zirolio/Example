(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mech_1 = require("./objects/mech");
const mouse_1 = require("./objects/mouse");
const canvas = document.body.appendChild(document.createElement('canvas'));
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
const mouse = new mouse_1.Mouse(canvas);
const mech = new mech_1.Mech(3, mouse, c);
/* Кастомные листенеры */
document.onkeydown = (key) => {
    if (key.code == 'Minus')
        mech.followSpeed -= 0.5;
    if (key.code == 'Equal')
        mech.followSpeed += 0.5;
};
const clear = (c) => {
    c.fillStyle = '';
    c.shadowBlur = 0;
    c.shadowColor = '';
    c.strokeStyle = '';
    c.fillStyle = '';
    c.filter = '';
    c.lineWidth = 0;
};
const animate = () => {
    requestAnimationFrame(animate);
    clear(c);
    c.fillStyle = 'rgba(0, 0, 0, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    mech.update();
};
animate();

},{"./objects/mech":2,"./objects/mouse":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mech = void 0;
class Mech {
    constructor(followSpeed, mouse, c) {
        this.angle = 90;
        this.c = c;
        this.mouse = mouse;
        this.followSpeed = followSpeed;
        this.circles = [];
        const radius = 20, canvas = c.canvas, step = (canvas.height - radius * 5) / 360;
        for (let i = 0, x = canvas.width / 2, y = canvas.height / 2; i <= 360; i += 2, y += step) {
            this.circles.push(new Circle(x, y, radius, `hsl(${i}, 85%, 50%)`, i, c));
        }
        this.step = step;
    }
    update() {
        /* const   relX = this.mouse.x - this.c.canvas.width / 2,
                relY = this.mouse.y - this.c.canvas.height / 2;
        let angleTM = Math.atan2(relY, relX) * (180 / Math.PI);
        angleTM < 0 && (angleTM += 360);

        if (this.angle < angleTM) this.angle = Math.min(angleTM, this.angle + this.followSpeed);
        else if (this.angle > angleTM) this.angle = Math.max(angleTM, this.angle - this.followSpeed); */
        const relX = this.mouse.x - this.c.canvas.width / 2;
        const relY = this.mouse.y - this.c.canvas.height / 2;
        let angleTM = Math.atan2(relY, relX) * (180 / Math.PI);
        angleTM = (angleTM + 360) % 360;
        const angleDifference = (angleTM - this.angle + 360) % 360;
        if (angleDifference < 180)
            this.angle = (this.angle + this.followSpeed) % 360;
        else if (angleDifference >= 180)
            this.angle = (this.angle - this.followSpeed) % 360;
        if (Math.abs(angleDifference) < this.followSpeed)
            this.angle = angleTM;
        this.circles.forEach(circle => circle.draw(this.angle));
    }
}
exports.Mech = Mech;
class Circle {
    constructor(x, y, radius, color, id, c) {
        this.c = c;
        this.color = color;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.id = id;
    }
    draw(angle) {
        const c = this.c, canvas = c.canvas;
        if (angle > 180)
            angle -= 360;
        // Update Position
        this.x = canvas.width / 2 + Math.cos(angle / (180 / Math.PI)) * this.id;
        this.y = canvas.height / 2 + Math.sin(angle / (180 / Math.PI)) * this.id;
        c.beginPath();
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 2;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
    }
}

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mouse = void 0;
class Mouse {
    constructor(canvas) {
        this.x = 0;
        this.y = 0;
        window.onmousemove = (e) => {
            this.x = e.x;
            this.y = e.y;
        };
    }
}
exports.Mouse = Mouse;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21waWxlZFRTL2luZGV4LmpzIiwiY29tcGlsZWRUUy9vYmplY3RzL21lY2guanMiLCJjb21waWxlZFRTL29iamVjdHMvbW91c2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtZWNoXzEgPSByZXF1aXJlKFwiLi9vYmplY3RzL21lY2hcIik7XG5jb25zdCBtb3VzZV8xID0gcmVxdWlyZShcIi4vb2JqZWN0cy9tb3VzZVwiKTtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykpO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuY29uc3QgYyA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuY29uc3QgbW91c2UgPSBuZXcgbW91c2VfMS5Nb3VzZShjYW52YXMpO1xuY29uc3QgbWVjaCA9IG5ldyBtZWNoXzEuTWVjaCgzLCBtb3VzZSwgYyk7XG4vKiDQmtCw0YHRgtC+0LzQvdGL0LUg0LvQuNGB0YLQtdC90LXRgNGLICovXG5kb2N1bWVudC5vbmtleWRvd24gPSAoa2V5KSA9PiB7XG4gICAgaWYgKGtleS5jb2RlID09ICdNaW51cycpXG4gICAgICAgIG1lY2guZm9sbG93U3BlZWQgLT0gMC41O1xuICAgIGlmIChrZXkuY29kZSA9PSAnRXF1YWwnKVxuICAgICAgICBtZWNoLmZvbGxvd1NwZWVkICs9IDAuNTtcbn07XG5jb25zdCBjbGVhciA9IChjKSA9PiB7XG4gICAgYy5maWxsU3R5bGUgPSAnJztcbiAgICBjLnNoYWRvd0JsdXIgPSAwO1xuICAgIGMuc2hhZG93Q29sb3IgPSAnJztcbiAgICBjLnN0cm9rZVN0eWxlID0gJyc7XG4gICAgYy5maWxsU3R5bGUgPSAnJztcbiAgICBjLmZpbHRlciA9ICcnO1xuICAgIGMubGluZVdpZHRoID0gMDtcbn07XG5jb25zdCBhbmltYXRlID0gKCkgPT4ge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICBjbGVhcihjKTtcbiAgICBjLmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJztcbiAgICBjLmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgbWVjaC51cGRhdGUoKTtcbn07XG5hbmltYXRlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTWVjaCA9IHZvaWQgMDtcbmNsYXNzIE1lY2gge1xuICAgIGNvbnN0cnVjdG9yKGZvbGxvd1NwZWVkLCBtb3VzZSwgYykge1xuICAgICAgICB0aGlzLmFuZ2xlID0gOTA7XG4gICAgICAgIHRoaXMuYyA9IGM7XG4gICAgICAgIHRoaXMubW91c2UgPSBtb3VzZTtcbiAgICAgICAgdGhpcy5mb2xsb3dTcGVlZCA9IGZvbGxvd1NwZWVkO1xuICAgICAgICB0aGlzLmNpcmNsZXMgPSBbXTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gMjAsIGNhbnZhcyA9IGMuY2FudmFzLCBzdGVwID0gKGNhbnZhcy5oZWlnaHQgLSByYWRpdXMgKiA1KSAvIDM2MDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIHggPSBjYW52YXMud2lkdGggLyAyLCB5ID0gY2FudmFzLmhlaWdodCAvIDI7IGkgPD0gMzYwOyBpICs9IDIsIHkgKz0gc3RlcCkge1xuICAgICAgICAgICAgdGhpcy5jaXJjbGVzLnB1c2gobmV3IENpcmNsZSh4LCB5LCByYWRpdXMsIGBoc2woJHtpfSwgODUlLCA1MCUpYCwgaSwgYykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLyogY29uc3QgICByZWxYID0gdGhpcy5tb3VzZS54IC0gdGhpcy5jLmNhbnZhcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgcmVsWSA9IHRoaXMubW91c2UueSAtIHRoaXMuYy5jYW52YXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgbGV0IGFuZ2xlVE0gPSBNYXRoLmF0YW4yKHJlbFksIHJlbFgpICogKDE4MCAvIE1hdGguUEkpO1xuICAgICAgICBhbmdsZVRNIDwgMCAmJiAoYW5nbGVUTSArPSAzNjApO1xuXG4gICAgICAgIGlmICh0aGlzLmFuZ2xlIDwgYW5nbGVUTSkgdGhpcy5hbmdsZSA9IE1hdGgubWluKGFuZ2xlVE0sIHRoaXMuYW5nbGUgKyB0aGlzLmZvbGxvd1NwZWVkKTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hbmdsZSA+IGFuZ2xlVE0pIHRoaXMuYW5nbGUgPSBNYXRoLm1heChhbmdsZVRNLCB0aGlzLmFuZ2xlIC0gdGhpcy5mb2xsb3dTcGVlZCk7ICovXG4gICAgICAgIGNvbnN0IHJlbFggPSB0aGlzLm1vdXNlLnggLSB0aGlzLmMuY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgcmVsWSA9IHRoaXMubW91c2UueSAtIHRoaXMuYy5jYW52YXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgbGV0IGFuZ2xlVE0gPSBNYXRoLmF0YW4yKHJlbFksIHJlbFgpICogKDE4MCAvIE1hdGguUEkpO1xuICAgICAgICBhbmdsZVRNID0gKGFuZ2xlVE0gKyAzNjApICUgMzYwO1xuICAgICAgICBjb25zdCBhbmdsZURpZmZlcmVuY2UgPSAoYW5nbGVUTSAtIHRoaXMuYW5nbGUgKyAzNjApICUgMzYwO1xuICAgICAgICBpZiAoYW5nbGVEaWZmZXJlbmNlIDwgMTgwKVxuICAgICAgICAgICAgdGhpcy5hbmdsZSA9ICh0aGlzLmFuZ2xlICsgdGhpcy5mb2xsb3dTcGVlZCkgJSAzNjA7XG4gICAgICAgIGVsc2UgaWYgKGFuZ2xlRGlmZmVyZW5jZSA+PSAxODApXG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gKHRoaXMuYW5nbGUgLSB0aGlzLmZvbGxvd1NwZWVkKSAlIDM2MDtcbiAgICAgICAgaWYgKE1hdGguYWJzKGFuZ2xlRGlmZmVyZW5jZSkgPCB0aGlzLmZvbGxvd1NwZWVkKVxuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlVE07XG4gICAgICAgIHRoaXMuY2lyY2xlcy5mb3JFYWNoKGNpcmNsZSA9PiBjaXJjbGUuZHJhdyh0aGlzLmFuZ2xlKSk7XG4gICAgfVxufVxuZXhwb3J0cy5NZWNoID0gTWVjaDtcbmNsYXNzIENpcmNsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzLCBjb2xvciwgaWQsIGMpIHtcbiAgICAgICAgdGhpcy5jID0gYztcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cbiAgICBkcmF3KGFuZ2xlKSB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLmMsIGNhbnZhcyA9IGMuY2FudmFzO1xuICAgICAgICBpZiAoYW5nbGUgPiAxODApXG4gICAgICAgICAgICBhbmdsZSAtPSAzNjA7XG4gICAgICAgIC8vIFVwZGF0ZSBQb3NpdGlvblxuICAgICAgICB0aGlzLnggPSBjYW52YXMud2lkdGggLyAyICsgTWF0aC5jb3MoYW5nbGUgLyAoMTgwIC8gTWF0aC5QSSkpICogdGhpcy5pZDtcbiAgICAgICAgdGhpcy55ID0gY2FudmFzLmhlaWdodCAvIDIgKyBNYXRoLnNpbihhbmdsZSAvICgxODAgLyBNYXRoLlBJKSkgKiB0aGlzLmlkO1xuICAgICAgICBjLmJlZ2luUGF0aCgpO1xuICAgICAgICBjLmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGMuc2hhZG93Q29sb3IgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjLnNoYWRvd0JsdXIgPSAyO1xuICAgICAgICBjLmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgIGMuZmlsbCgpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Nb3VzZSA9IHZvaWQgMDtcbmNsYXNzIE1vdXNlIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMueCA9IGUueDtcbiAgICAgICAgICAgIHRoaXMueSA9IGUueTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLk1vdXNlID0gTW91c2U7XG4iXX0=
