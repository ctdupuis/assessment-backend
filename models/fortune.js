class Fortune {
    constructor(text) {
        this.text = text;

        this.constructor.all.push(this);
    }

    static all = [];
}