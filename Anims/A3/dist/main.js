(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ball_1 = require("./objects/ball");
document.getElementById('rand-color').onclick = () => { balls.forEach(ball => ball.color = `hsl(${Math.round(360 * Math.random())}, 45%, 50%)`); };
document.getElementById('rand-speed').onclick = () => { balls.forEach(ball => ball.updateSpeed(25 * Math.random() + 1)); };
document.getElementById('rand-pos').onclick = () => { balls.forEach(ball => ball.setPosition((canvas.width - ball.r * 2) * Math.random() + ball.r, (canvas.height - ball.r * 2) * Math.random() + ball.r)); };
document.getElementById('rand-vec').onclick = () => { balls.forEach(ball => { const a = Math.random() * (Math.PI * 2); ball.setMovement(Math.cos(a), Math.sin(a)); }); };
document.getElementById('rand-size').onclick = () => { balls.forEach(ball => ball.setRadius(8 + Math.random() * 32)); };
document.getElementById('rainbow').onclick = () => { rainbow = !rainbow; colorH = 0; };
document.getElementById('setColor').onclick = () => {
    const color = document.getElementById('colorValue').value;
    if (!/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g.exec(color))
        return;
    defColor = color;
    balls.forEach(ball => ball.color = color);
};
document.getElementById('setRadius').onclick = () => {
    const radius = document.getElementById('radiusValue').value;
    if (!/\d+/g.exec(radius))
        return;
    defR = Number(radius);
    balls.forEach(ball => ball.setRadius(Number(radius)));
};
document.getElementById('setSpeed').onclick = () => {
    const speed = document.getElementById('speedValue').value;
    if (!/\d+/g.exec(speed))
        return;
    defS = Number(speed);
    balls.forEach(ball => ball.updateSpeed(Number(speed)));
};
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
let defColor = 'rgb(250, 30, 30)';
let defR = 100;
let defS = 10;
let colorH = 0;
let rainbow = true;
document.getElementById('colorValue').value = defColor;
document.getElementById('radiusValue').value = defR.toString();
document.getElementById('speedValue').value = defS.toString();
const balls = new Set();
balls.add(new ball_1.Ball((canvas.width - 32) * Math.random() + 16, (canvas.height - 32) * Math.random() + 16, defR, defS, defColor, canvas));
document.onkeydown = (k) => {
    if (k.code == 'Equal')
        balls.forEach(ball => ball.updateSpeed(ball.speed + 1));
    if (k.code == 'Minus')
        balls.forEach(ball => ball.updateSpeed(ball.speed - 1));
    if (k.code == 'KeyN')
        balls.add(new ball_1.Ball((canvas.width - 32) * Math.random() + 16, (canvas.height - 32) * Math.random() + 16, defR, defS, defColor, canvas));
};
const animate = () => {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.15)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    if (rainbow) {
        balls.forEach(ball => ball.color = `hsl(${colorH}, 50%, 50%)`);
        colorH += 0.2;
        colorH > 360 && (colorH = 0);
    }
    balls.forEach(ball => ball.update());
};
animate();

},{"./objects/ball":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
class Ball {
    constructor(x, y, r, speed, color, canvas) {
        this._x = x;
        this._y = y;
        this._r = r;
        this._speed = speed;
        this.color = color;
        this._canvas = canvas;
        this._c = canvas.getContext('2d');
        const a = Math.random() * (Math.PI * 2);
        this._movement = {
            x: Math.cos(a),
            y: Math.sin(a)
        };
    }
    updateSpeed(speed) {
        this._speed = speed;
    }
    setPosition(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }
    setMovement(x = 0, y = 0) {
        this._movement = { x, y };
    }
    setRadius(r = 1) {
        this._r = r;
    }
    update() {
        this.processMovement();
        this.draw();
    }
    processMovement() {
        this._x += this._movement.x * this._speed;
        this._y += this._movement.y * this._speed;
        if (this._x < this._r)
            this._x = this._r, this._movement.x *= -1;
        if (this._y < this._r)
            this._y = this._r, this._movement.y *= -1;
        if (this._x > this._canvas.width - this._r)
            this._x = this._canvas.width - this._r, this._movement.x *= -1;
        if (this._y > this._canvas.height - this._r)
            this._y = this._canvas.height - this._r, this._movement.y *= -1;
    }
    draw() {
        const c = this._c;
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this._x, this._y, this._r, 0, Math.PI * 2, true);
        c.fill();
    }
    get speed() { return this._speed; }
    get movement() { return this._movement; }
    get r() { return this._r; }
}
exports.Ball = Ball;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21waWxlZFRTL2luZGV4LmpzIiwiY29tcGlsZWRUUy9vYmplY3RzL2JhbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJhbGxfMSA9IHJlcXVpcmUoXCIuL29iamVjdHMvYmFsbFwiKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5kLWNvbG9yJykub25jbGljayA9ICgpID0+IHsgYmFsbHMuZm9yRWFjaChiYWxsID0+IGJhbGwuY29sb3IgPSBgaHNsKCR7TWF0aC5yb3VuZCgzNjAgKiBNYXRoLnJhbmRvbSgpKX0sIDQ1JSwgNTAlKWApOyB9O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmQtc3BlZWQnKS5vbmNsaWNrID0gKCkgPT4geyBiYWxscy5mb3JFYWNoKGJhbGwgPT4gYmFsbC51cGRhdGVTcGVlZCgyNSAqIE1hdGgucmFuZG9tKCkgKyAxKSk7IH07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuZC1wb3MnKS5vbmNsaWNrID0gKCkgPT4geyBiYWxscy5mb3JFYWNoKGJhbGwgPT4gYmFsbC5zZXRQb3NpdGlvbigoY2FudmFzLndpZHRoIC0gYmFsbC5yICogMikgKiBNYXRoLnJhbmRvbSgpICsgYmFsbC5yLCAoY2FudmFzLmhlaWdodCAtIGJhbGwuciAqIDIpICogTWF0aC5yYW5kb20oKSArIGJhbGwucikpOyB9O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmQtdmVjJykub25jbGljayA9ICgpID0+IHsgYmFsbHMuZm9yRWFjaChiYWxsID0+IHsgY29uc3QgYSA9IE1hdGgucmFuZG9tKCkgKiAoTWF0aC5QSSAqIDIpOyBiYWxsLnNldE1vdmVtZW50KE1hdGguY29zKGEpLCBNYXRoLnNpbihhKSk7IH0pOyB9O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmQtc2l6ZScpLm9uY2xpY2sgPSAoKSA9PiB7IGJhbGxzLmZvckVhY2goYmFsbCA9PiBiYWxsLnNldFJhZGl1cyg4ICsgTWF0aC5yYW5kb20oKSAqIDMyKSk7IH07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFpbmJvdycpLm9uY2xpY2sgPSAoKSA9PiB7IHJhaW5ib3cgPSAhcmFpbmJvdzsgY29sb3JIID0gMDsgfTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXRDb2xvcicpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgY29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3JWYWx1ZScpLnZhbHVlO1xuICAgIGlmICghL3JnYlxcKFxccypcXGQrXFxzKixcXHMqXFxkK1xccyosXFxzKlxcZCtcXHMqXFwpL2cuZXhlYyhjb2xvcikpXG4gICAgICAgIHJldHVybjtcbiAgICBkZWZDb2xvciA9IGNvbG9yO1xuICAgIGJhbGxzLmZvckVhY2goYmFsbCA9PiBiYWxsLmNvbG9yID0gY29sb3IpO1xufTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXRSYWRpdXMnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhZGl1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWRpdXNWYWx1ZScpLnZhbHVlO1xuICAgIGlmICghL1xcZCsvZy5leGVjKHJhZGl1cykpXG4gICAgICAgIHJldHVybjtcbiAgICBkZWZSID0gTnVtYmVyKHJhZGl1cyk7XG4gICAgYmFsbHMuZm9yRWFjaChiYWxsID0+IGJhbGwuc2V0UmFkaXVzKE51bWJlcihyYWRpdXMpKSk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldFNwZWVkJykub25jbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBzcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGVlZFZhbHVlJykudmFsdWU7XG4gICAgaWYgKCEvXFxkKy9nLmV4ZWMoc3BlZWQpKVxuICAgICAgICByZXR1cm47XG4gICAgZGVmUyA9IE51bWJlcihzcGVlZCk7XG4gICAgYmFsbHMuZm9yRWFjaChiYWxsID0+IGJhbGwudXBkYXRlU3BlZWQoTnVtYmVyKHNwZWVkKSkpO1xufTtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IGMgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmxldCBkZWZDb2xvciA9ICdyZ2IoMjUwLCAzMCwgMzApJztcbmxldCBkZWZSID0gMTAwO1xubGV0IGRlZlMgPSAxMDtcbmxldCBjb2xvckggPSAwO1xubGV0IHJhaW5ib3cgPSB0cnVlO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yVmFsdWUnKS52YWx1ZSA9IGRlZkNvbG9yO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhZGl1c1ZhbHVlJykudmFsdWUgPSBkZWZSLnRvU3RyaW5nKCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BlZWRWYWx1ZScpLnZhbHVlID0gZGVmUy50b1N0cmluZygpO1xuY29uc3QgYmFsbHMgPSBuZXcgU2V0KCk7XG5iYWxscy5hZGQobmV3IGJhbGxfMS5CYWxsKChjYW52YXMud2lkdGggLSAzMikgKiBNYXRoLnJhbmRvbSgpICsgMTYsIChjYW52YXMuaGVpZ2h0IC0gMzIpICogTWF0aC5yYW5kb20oKSArIDE2LCBkZWZSLCBkZWZTLCBkZWZDb2xvciwgY2FudmFzKSk7XG5kb2N1bWVudC5vbmtleWRvd24gPSAoaykgPT4ge1xuICAgIGlmIChrLmNvZGUgPT0gJ0VxdWFsJylcbiAgICAgICAgYmFsbHMuZm9yRWFjaChiYWxsID0+IGJhbGwudXBkYXRlU3BlZWQoYmFsbC5zcGVlZCArIDEpKTtcbiAgICBpZiAoay5jb2RlID09ICdNaW51cycpXG4gICAgICAgIGJhbGxzLmZvckVhY2goYmFsbCA9PiBiYWxsLnVwZGF0ZVNwZWVkKGJhbGwuc3BlZWQgLSAxKSk7XG4gICAgaWYgKGsuY29kZSA9PSAnS2V5TicpXG4gICAgICAgIGJhbGxzLmFkZChuZXcgYmFsbF8xLkJhbGwoKGNhbnZhcy53aWR0aCAtIDMyKSAqIE1hdGgucmFuZG9tKCkgKyAxNiwgKGNhbnZhcy5oZWlnaHQgLSAzMikgKiBNYXRoLnJhbmRvbSgpICsgMTYsIGRlZlIsIGRlZlMsIGRlZkNvbG9yLCBjYW52YXMpKTtcbn07XG5jb25zdCBhbmltYXRlID0gKCkgPT4ge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICBjLmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDAsIDAsIDAuMTUpJztcbiAgICBjLmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgaWYgKHJhaW5ib3cpIHtcbiAgICAgICAgYmFsbHMuZm9yRWFjaChiYWxsID0+IGJhbGwuY29sb3IgPSBgaHNsKCR7Y29sb3JIfSwgNTAlLCA1MCUpYCk7XG4gICAgICAgIGNvbG9ySCArPSAwLjI7XG4gICAgICAgIGNvbG9ySCA+IDM2MCAmJiAoY29sb3JIID0gMCk7XG4gICAgfVxuICAgIGJhbGxzLmZvckVhY2goYmFsbCA9PiBiYWxsLnVwZGF0ZSgpKTtcbn07XG5hbmltYXRlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmFsbCA9IHZvaWQgMDtcbmNsYXNzIEJhbGwge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHIsIHNwZWVkLCBjb2xvciwgY2FudmFzKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fciA9IHI7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGNvbnN0IGEgPSBNYXRoLnJhbmRvbSgpICogKE1hdGguUEkgKiAyKTtcbiAgICAgICAgdGhpcy5fbW92ZW1lbnQgPSB7XG4gICAgICAgICAgICB4OiBNYXRoLmNvcyhhKSxcbiAgICAgICAgICAgIHk6IE1hdGguc2luKGEpXG4gICAgICAgIH07XG4gICAgfVxuICAgIHVwZGF0ZVNwZWVkKHNwZWVkKSB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgfVxuICAgIHNldFBvc2l0aW9uKHggPSAwLCB5ID0gMCkge1xuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxuICAgIHNldE1vdmVtZW50KHggPSAwLCB5ID0gMCkge1xuICAgICAgICB0aGlzLl9tb3ZlbWVudCA9IHsgeCwgeSB9O1xuICAgIH1cbiAgICBzZXRSYWRpdXMociA9IDEpIHtcbiAgICAgICAgdGhpcy5fciA9IHI7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzTW92ZW1lbnQoKTtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfVxuICAgIHByb2Nlc3NNb3ZlbWVudCgpIHtcbiAgICAgICAgdGhpcy5feCArPSB0aGlzLl9tb3ZlbWVudC54ICogdGhpcy5fc3BlZWQ7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy5fbW92ZW1lbnQueSAqIHRoaXMuX3NwZWVkO1xuICAgICAgICBpZiAodGhpcy5feCA8IHRoaXMuX3IpXG4gICAgICAgICAgICB0aGlzLl94ID0gdGhpcy5fciwgdGhpcy5fbW92ZW1lbnQueCAqPSAtMTtcbiAgICAgICAgaWYgKHRoaXMuX3kgPCB0aGlzLl9yKVxuICAgICAgICAgICAgdGhpcy5feSA9IHRoaXMuX3IsIHRoaXMuX21vdmVtZW50LnkgKj0gLTE7XG4gICAgICAgIGlmICh0aGlzLl94ID4gdGhpcy5fY2FudmFzLndpZHRoIC0gdGhpcy5fcilcbiAgICAgICAgICAgIHRoaXMuX3ggPSB0aGlzLl9jYW52YXMud2lkdGggLSB0aGlzLl9yLCB0aGlzLl9tb3ZlbWVudC54ICo9IC0xO1xuICAgICAgICBpZiAodGhpcy5feSA+IHRoaXMuX2NhbnZhcy5oZWlnaHQgLSB0aGlzLl9yKVxuICAgICAgICAgICAgdGhpcy5feSA9IHRoaXMuX2NhbnZhcy5oZWlnaHQgLSB0aGlzLl9yLCB0aGlzLl9tb3ZlbWVudC55ICo9IC0xO1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fYztcbiAgICAgICAgYy5iZWdpblBhdGgoKTtcbiAgICAgICAgYy5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjLmFyYyh0aGlzLl94LCB0aGlzLl95LCB0aGlzLl9yLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICAgIGMuZmlsbCgpO1xuICAgIH1cbiAgICBnZXQgc3BlZWQoKSB7IHJldHVybiB0aGlzLl9zcGVlZDsgfVxuICAgIGdldCBtb3ZlbWVudCgpIHsgcmV0dXJuIHRoaXMuX21vdmVtZW50OyB9XG4gICAgZ2V0IHIoKSB7IHJldHVybiB0aGlzLl9yOyB9XG59XG5leHBvcnRzLkJhbGwgPSBCYWxsO1xuIl19
