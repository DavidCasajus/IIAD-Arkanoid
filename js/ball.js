class Ball {
    constructor() {
        this.x = fieldWidth / 2
        this.y = fieldHeight - Ball.radius - Platform.height
        this.angle = -(Math.random() * (Math.PI / 2) + Math.PI / 4)
        this.observerCollection = []
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, Ball.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = Ball.color
        ctx.fill()
    }
}

// Add an observer
Ball.prototype.registerObserver = function (observer) {
    this.observerCollection.push(observer)
}

// Remove an observer
Ball.prototype.unregisterObserver = function (observer) {
    var index = this.observerCollection.indexOf(observer)
    delete this.observerCollection[index]
}

// Notify all observers
Ball.prototype.notifyObservers = function () {
    for (var index in this.observerCollection) {
        var observer = this.observerCollection[index]
        observer.notify(this.x, this.y)
    }
}

Ball.color = '#BEBEBE'
Ball.radius = 8
Ball.speed = 4