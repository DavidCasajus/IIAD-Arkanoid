class Ball {
    constructor() {
        this.x = fieldWidth / 2
        this.y = fieldHeight - Ball.radius - Platform.height
        this.angle = -(Math.random() * (Math.PI / 2) + Math.PI / 4)
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, Ball.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = Ball.color
        ctx.fill()
    }
}

Ball.color = '#BEBEBE'
Ball.radius = 8
Ball.speed = 4