let A1 = { type: 'div', key: 'A1' };
let B1 = { type: 'div', key: 'B1', return: A1 };
let B2 = { type: 'div', key: 'B2', return: A1 };
let C1 = { type: 'div', key: 'C1', return: B1 };
let C2 = { type: 'div', key: 'C2', return: B1 };
A1.child = B1;
B1.sibling = B2;
B1.child = C1;
C1.sibling = C2;

const rootFiber = A1;

let nextUnitOfWork = null;

nextUnitOfWork = rootFiber;

const startTime = new Date();

requestIdleCallback(workLoop, { timeout: 1000 });

function sleep(delay) {
    for (var startTime = new Date(); new Date() - startTime < delay; ) {}
}

function workLoop(deadline) {
    while (nextUnitOfWork && (deadline.timeRemaining() > 0 || deadline.didTimeout)) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if (!nextUnitOfWork) {
        console.log('render阶段结束');
        console.log(new Date() - startTime);
    } else {
        requestIdleCallback(workLoop, { timeout: 1000 });
    }
}

// 链表递归遍历规则：优先找child，如果没有child，那就说明当前fiber结束，寻找sibling（兄弟），sibling没有下一个sibling，那么就结束当前fiber的
// 父级fiber得任务，然后再判断父级fiber是否存在sibling，依次执行到最后顶级fiber结束
function performUnitOfWork(fiber) {
    beginWork(fiber);
    if (fiber.child) {
        return fiber.child;
    }

    while (fiber) {
        completeUnitOfWork(fiber);
        if (fiber.sibling) {
            return fiber.sibling;
        }

        fiber = fiber.return;
    }
}

function beginWork(fiber) {
    console.log(fiber.key, '开始了');
    sleep(20);
}

function completeUnitOfWork(fiber) {
    console.log(fiber.key, '结束了');
}
