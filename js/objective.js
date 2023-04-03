class Objective {
    constructor(x, y, layers, upgrade) {
        this.x = x
        this.y = y
        this.layers = layers
        this.isAlive = true
        this.upgrade = upgrade
        this.img = new Image()
        if (upgrade >= 0) {
            this.img.src = Objective.upgradeImages[upgrade % 3]
        } else {
            this.img.src = Objective.layersImages[layers % 3]
        }

    }

    //void context.fillRect(x, y, width, height); crea un rectangulo
    draw(context) {
        if (!this.isAlive) return
        context.fillStyle = Objective.color
        context.fillRect(this.x, this.y, Objective.width, Objective.height,)
        context.imageSmoothingEnabled = true
        context.drawImage(this.img, this.x, this.y, Objective.width, Objective.height)

        //context.strokeStyle = '#000'
    }
    //TODO: continue
}

Objective.color = "black"
Objective.width = fieldWidth / 10 - 1.8
Objective.height = 25
Objective.layersImages = ["./img/layer1.png", "./img/layer2.png", "./img/layer3.png"]
Objective.upgradeImages = ["./img/width-.png", "./img/width.png", "./img/speed.png"]

drawObjectives = (objectives, context) => {
    for (let i = 0; i < objectiveRows; i++) {
        for (let j = 0; j < objectivePerRow; j++) {
            objectives[i][j].draw(context)
        }
    }
}

createObjectives = () => {
    const objectives = [objectiveRows]
    for (let i = 0; i < objectiveRows; i++) {
        objectives[i] = [objectivePerRow]
        let upgrade = Math.floor(Math.random() * 10);
        for (let x = 0; x < objectivePerRow; x++) {
            let a = (2 * x) + x * Objective.width
            let b = (2 * i) + i * Objective.height
            if (x == upgrade) {
                objectives[i][x] = new Objective(a, b, 0, Math.floor(Math.random() * 3))
            } else {
                objectives[i][x] = new Objective(a, b, i, -1)
            }

        }
    }
    return objectives
}