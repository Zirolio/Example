(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ball_1 = require("./objects/ball");
const creator_1 = require("./objects/creator");
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
const clear = () => { c.beginPath(); c.fillStyle = 'rgb(0, 0, 0)'; c.fillRect(0, 0, canvas.width, canvas.height); };
clear();
document.getElementById('reset').onclick = () => {
    if (!creator)
        return;
    clearInterval(creator === null || creator === void 0 ? void 0 : creator.id);
    creator = undefined;
    points = [];
    pTS = config.points;
    clear();
};
document.getElementById('setColor').onclick = () => config.color = document.getElementById('colorValue').value;
document.getElementById('setDelay').onclick = () => config.delay = Number(document.getElementById('delayValue').value);
document.getElementById('setRadius').onclick = () => config.r = Number(document.getElementById('radiusValue').value);
const config = {
    r: 6,
    color: 'rgb(150, 150, 150)',
    delay: 20,
    points: 3
};
document.getElementById('colorValue').value = config.color;
document.getElementById('delayValue').value = config.delay.toString();
document.getElementById('radiusValue').value = config.r.toString();
let pTS = config.points;
let points = [];
canvas.onmousedown = (md) => {
    if (pTS) {
        pTS--;
        points.push({ x: md.x, y: md.y });
        new ball_1.Ball(md.x, md.y, config.r, config.color, canvas).update();
        document.getElementById('pC').innerText = `Всего точек: ${config.points - pTS}`;
        return;
    }
    if (!creator)
        creator = new creator_1.Creator(md.x, md.y, config.r, config.color, points, config.points, canvas);
};
let creator;
/* const animate = () => {
    requestAnimationFrame(animate);
    creator?.create();
}
animate(); */ 

},{"./objects/ball":2,"./objects/creator":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
class Ball {
    constructor(x, y, r, color, canvas) {
        this._x = x;
        this._y = y;
        this._r = r;
        this.color = color;
        this._canvas = canvas;
        this._c = canvas.getContext('2d');
    }
    setPosition(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }
    setRadius(r = 1) {
        this._r = r;
    }
    update() {
        this.draw();
    }
    draw() {
        const c = this._c;
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this._x, this._y, this._r, 0, Math.PI * 2, true);
        c.fill();
    }
    get r() { return this._r; }
}
exports.Ball = Ball;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Creator = void 0;
const ball_1 = require("./ball");
class Creator {
    constructor(x, y, r, color, points, pc, canvas) {
        this.pc = 1;
        this._x = x;
        this._y = y;
        this._r = r;
        this.color = color;
        this.points = points;
        this.canvas = canvas;
        this.pc = pc;
        this.id = setInterval(() => this === null || this === void 0 ? void 0 : this.create(), 1);
    }
    create() {
        this.pc++;
        const point = this.points[Math.round((this.points.length - 1) * Math.random())];
        this._x = (point.x + this._x) / 2;
        this._y = (point.y + this._y) / 2;
        new ball_1.Ball(this._x, this._y, this._r, this.color, this.canvas).update();
        document.getElementById('pC').innerText = `Всего точек: ${this.pc}`;
    }
    get r() { return this._r; }
}
exports.Creator = Creator;

},{"./ball":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21waWxlZFRTL2luZGV4LmpzIiwiY29tcGlsZWRUUy9vYmplY3RzL2JhbGwuanMiLCJjb21waWxlZFRTL29iamVjdHMvY3JlYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYmFsbF8xID0gcmVxdWlyZShcIi4vb2JqZWN0cy9iYWxsXCIpO1xuY29uc3QgY3JlYXRvcl8xID0gcmVxdWlyZShcIi4vb2JqZWN0cy9jcmVhdG9yXCIpO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuY29uc3QgYyA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuY29uc3QgY2xlYXIgPSAoKSA9PiB7IGMuYmVnaW5QYXRoKCk7IGMuZmlsbFN0eWxlID0gJ3JnYigwLCAwLCAwKSc7IGMuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTsgfTtcbmNsZWFyKCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmICghY3JlYXRvcilcbiAgICAgICAgcmV0dXJuO1xuICAgIGNsZWFySW50ZXJ2YWwoY3JlYXRvciA9PT0gbnVsbCB8fCBjcmVhdG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjcmVhdG9yLmlkKTtcbiAgICBjcmVhdG9yID0gdW5kZWZpbmVkO1xuICAgIHBvaW50cyA9IFtdO1xuICAgIHBUUyA9IGNvbmZpZy5wb2ludHM7XG4gICAgY2xlYXIoKTtcbn07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0Q29sb3InKS5vbmNsaWNrID0gKCkgPT4gY29uZmlnLmNvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yVmFsdWUnKS52YWx1ZTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXREZWxheScpLm9uY2xpY2sgPSAoKSA9PiBjb25maWcuZGVsYXkgPSBOdW1iZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbGF5VmFsdWUnKS52YWx1ZSk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0UmFkaXVzJykub25jbGljayA9ICgpID0+IGNvbmZpZy5yID0gTnVtYmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWRpdXNWYWx1ZScpLnZhbHVlKTtcbmNvbnN0IGNvbmZpZyA9IHtcbiAgICByOiA2LFxuICAgIGNvbG9yOiAncmdiKDE1MCwgMTUwLCAxNTApJyxcbiAgICBkZWxheTogMjAsXG4gICAgcG9pbnRzOiAzXG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yVmFsdWUnKS52YWx1ZSA9IGNvbmZpZy5jb2xvcjtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWxheVZhbHVlJykudmFsdWUgPSBjb25maWcuZGVsYXkudG9TdHJpbmcoKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWRpdXNWYWx1ZScpLnZhbHVlID0gY29uZmlnLnIudG9TdHJpbmcoKTtcbmxldCBwVFMgPSBjb25maWcucG9pbnRzO1xubGV0IHBvaW50cyA9IFtdO1xuY2FudmFzLm9ubW91c2Vkb3duID0gKG1kKSA9PiB7XG4gICAgaWYgKHBUUykge1xuICAgICAgICBwVFMtLTtcbiAgICAgICAgcG9pbnRzLnB1c2goeyB4OiBtZC54LCB5OiBtZC55IH0pO1xuICAgICAgICBuZXcgYmFsbF8xLkJhbGwobWQueCwgbWQueSwgY29uZmlnLnIsIGNvbmZpZy5jb2xvciwgY2FudmFzKS51cGRhdGUoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BDJykuaW5uZXJUZXh0ID0gYNCS0YHQtdCz0L4g0YLQvtGH0LXQujogJHtjb25maWcucG9pbnRzIC0gcFRTfWA7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFjcmVhdG9yKVxuICAgICAgICBjcmVhdG9yID0gbmV3IGNyZWF0b3JfMS5DcmVhdG9yKG1kLngsIG1kLnksIGNvbmZpZy5yLCBjb25maWcuY29sb3IsIHBvaW50cywgY29uZmlnLnBvaW50cywgY2FudmFzKTtcbn07XG5sZXQgY3JlYXRvcjtcbi8qIGNvbnN0IGFuaW1hdGUgPSAoKSA9PiB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIGNyZWF0b3I/LmNyZWF0ZSgpO1xufVxuYW5pbWF0ZSgpOyAqLyBcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CYWxsID0gdm9pZCAwO1xuY2xhc3MgQmFsbCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgciwgY29sb3IsIGNhbnZhcykge1xuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHRoaXMuX3IgPSByO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fYyA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH1cbiAgICBzZXRQb3NpdGlvbih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgIH1cbiAgICBzZXRSYWRpdXMociA9IDEpIHtcbiAgICAgICAgdGhpcy5fciA9IHI7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jO1xuICAgICAgICBjLmJlZ2luUGF0aCgpO1xuICAgICAgICBjLmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGMuYXJjKHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3IsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgYy5maWxsKCk7XG4gICAgfVxuICAgIGdldCByKCkgeyByZXR1cm4gdGhpcy5fcjsgfVxufVxuZXhwb3J0cy5CYWxsID0gQmFsbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DcmVhdG9yID0gdm9pZCAwO1xuY29uc3QgYmFsbF8xID0gcmVxdWlyZShcIi4vYmFsbFwiKTtcbmNsYXNzIENyZWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHIsIGNvbG9yLCBwb2ludHMsIHBjLCBjYW52YXMpIHtcbiAgICAgICAgdGhpcy5wYyA9IDE7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fciA9IHI7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLnBjID0gcGM7XG4gICAgICAgIHRoaXMuaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzID09PSBudWxsIHx8IHRoaXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRoaXMuY3JlYXRlKCksIDEpO1xuICAgIH1cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMucGMrKztcbiAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLnBvaW50c1tNYXRoLnJvdW5kKCh0aGlzLnBvaW50cy5sZW5ndGggLSAxKSAqIE1hdGgucmFuZG9tKCkpXTtcbiAgICAgICAgdGhpcy5feCA9IChwb2ludC54ICsgdGhpcy5feCkgLyAyO1xuICAgICAgICB0aGlzLl95ID0gKHBvaW50LnkgKyB0aGlzLl95KSAvIDI7XG4gICAgICAgIG5ldyBiYWxsXzEuQmFsbCh0aGlzLl94LCB0aGlzLl95LCB0aGlzLl9yLCB0aGlzLmNvbG9yLCB0aGlzLmNhbnZhcykudXBkYXRlKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwQycpLmlubmVyVGV4dCA9IGDQktGB0LXQs9C+INGC0L7Rh9C10Lo6ICR7dGhpcy5wY31gO1xuICAgIH1cbiAgICBnZXQgcigpIHsgcmV0dXJuIHRoaXMuX3I7IH1cbn1cbmV4cG9ydHMuQ3JlYXRvciA9IENyZWF0b3I7XG4iXX0=
