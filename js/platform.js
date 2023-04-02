class Platform {
    constructor() {
        this.x = (fieldWidth - Platform.width) / 2
        this.y = fieldHeight - Platform.height
        this.img = new Image()
        this.img.src = Platform.imgSrc
    }

    draw(context) {
        context.imageSmoothingEnabled = true
        context.drawImage(this.img, this.x, this.y, Platform.width, Platform.height)
        //context.fillStyle = Platform.color

    }

    movePlatformByEvent(e) {
        const modifier = 1
        switch (e.keyCode) {
            case 37: { //left button
                if (this.x > 10) {
                    this.x -= Platform.speed * modifier
                }
                break
            }
            case 39: { //right button
                if (this.x < fieldWidth - Platform.width) {
                    this.x += Platform.speed * modifier
                }
                break
            }
        }
    }

    movePlatformByButton(direction) {
        const modifier = 1
        if (direction == 'left') {
            if (this.x > 0) {
                this.x -= Platform.speed * modifier
            }
        } else {
            if (this.x < fieldWidth - Platform.width) {
                this.x += Platform.speed * modifier
            }
        }
    }
}

Platform.width = 150
Platform.height = 10
Platform.speed = 20
Platform.imgSrc = "./img/bar.png"

