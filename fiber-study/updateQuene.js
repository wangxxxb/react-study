// 链表状态更新

class Update {
    constructor(payload, nextUpdate = null) {
        this.payload = payload;
        this.nextUpdate = nextUpdate;
    }
}

class UpdateQuene {
    constructor() {
        this.baseState = null;
        this.firstUpdate = null;
        this.lastUpdate = null;
    }

    enqueueUpdate(update) {
        if (this.firstUpdate === null) {
            this.firstUpdate = this.lastUpdate = update;
        } else {
            this.lastUpdate.nextUpdate = update;
            this.lastUpdate = update;
        }
    }

    forceUpdate() {
        let currentState = this.baseState || {};
        let currentUpdate = this.firstUpdate;

        while (currentUpdate) {
            const newState = typeof currentUpdate.payload === 'function' ? currentUpdate.payload(currentState) : currentUpdate.payload;
            currentUpdate = currentUpdate.nextUpdate;
            currentState = {
                ...currentState,
                ...newState,
            };
        }
        this.baseState = currentState;
        // clear fiber
        this.firstUpdate = this.lastUpdate = null;
    }
}

const update1 = new Update({ name: 'zhu', age: 0 });
const update2 = new Update({ name: 'feng', age: 1 });
const update3 = new Update((state) => ({
    ...state,
    name: 'zhufeng',
    age: 2,
}));
const updateQuene = new UpdateQuene();

updateQuene.enqueueUpdate(update1);
updateQuene.enqueueUpdate(update2);
updateQuene.enqueueUpdate(update3);

updateQuene.forceUpdate();

console.log(updateQuene.baseState);
