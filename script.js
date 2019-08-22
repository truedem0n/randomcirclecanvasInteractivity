const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouse = {
    x: undefined,
    y: undefined
}
const c = canvas.getContext("2d");
window.addEventListener("mousemove", event => {
    mouse.x = event.x
    mouse.y = event.y
})
function Circle(x = 500, y = 500, dx = 1, dy = 1, r = 10, color = "#000000") {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.r = r
    this.oR=r
    this.color = color
    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = () => {

        if (this.x < this.r || this.x > innerWidth - this.r) {
            this.dx = -this.dx
        } else if (this.y < this.r || this.y + this.r > innerHeight) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        // interactivity
        if (mouse.x-this.x<70 && mouse.x-this.x>-70 && mouse.y-this.y<70 && mouse.y-this.y>-70){
            if(this.r<100)
            this.r+=5
        }else if (this.r>this.oR){
            this.r-=5
        }


        this.draw()
    }
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init()
})
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let particles = [], colors = ["#F85B4E", "#03A6A6", "#F2E530", "#F27507", "#54264D"]

function init() {
    particles = []
    c.fillStyle="#000000"
    c.fillRect(0,0,canvas.width,canvas.height)    
    for (let i = 0; i < 1000; i++) {
        let r = Math.floor(Math.random() * 5) + 5,
            x = randomIntFromInterval(r, innerWidth - r),
            y = randomIntFromInterval(r, innerHeight - r),
            dx = (Math.random() - .5) * 1,
            dy = (Math.random() - .5) * 1

        fillStyle = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},1)`
        particles.push(new Circle(x, y, dx, dy, r, colors[Math.floor(Math.random() * colors.length)]))
    }
}
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    c.fillStyle="#FFFFFF"
    c.fillRect(0,0,canvas.width,canvas.height) 
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }




}
animate();
init();