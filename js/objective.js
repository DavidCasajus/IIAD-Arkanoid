class Objective {
    constructor(x, y, layers) {
        this.x = x
        this.y = y
        this.layers = layers
        this.isAlive = true
        this.img = new Image()
        this.img.src = Objective.layersImages[layers % 3]
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
        for (let x = 0; x < objectivePerRow; x++) {
            let a = (2 * x) + x * Objective.width
            let b = (2 * i) + i * Objective.height
            objectives[i][x] = new Objective(a, b, i)
        }
    }
    return objectives
}