class EventManager {
    constructor() {
        this.tracker = {}
        this.flags = {}
    }

    enable(eventType) {
        console.log(eventType, 'enabled');

        this.flags[eventType] = true
    }

    disable(eventType) {
        console.log(eventType, 'disabled');

        this.flags[eventType] = false
    }

    isActive(eventType) {
        return this.flags[eventType]
    }

    on(eventType, func) {
        console.log(eventType, 'created');

        this.tracker[eventType] = func;
    }

    trigger(eventType, payload) {
        console.log(eventType, 'triggered');

        if(this.tracker[eventType]) {
            if(payload) {
                this.tracker[eventType](payload)
            } else {
                this.tracker[eventType]()
            }
        }
    }
}

var Events = new EventManager();
