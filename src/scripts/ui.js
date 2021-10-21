class Ui {
    element
    scoreElement
    logElement
    score = 0
    _log = []


    constructor() {
        this.element = document.querySelector('#ui');
        this.scoreElement = this.element.querySelector('.score');
        this.logElement = this.element.querySelector('.log');
    }

    log(group) {
        this._log.push(group);
    }

    update() {
        if (this.scoreElement.innerText != this.score) {
            this.scoreElement.innerText = this.score;
        }

        if (this.logElement.children.length !== this._log.length) {
            this.logElement.innerHTML = this._log.map( group => '<div class="log-row">'+new Array(group.points.length+1).join(`<img src="/public/images/${group.name}.png">`) + '</div>' ).join('')
        }
    }
}

export default new Ui();