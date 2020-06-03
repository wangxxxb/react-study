export function pickProperty(keys = [], obj = {}) {
    return keys.reduce(
        (prev, currentKey) =>
            obj.hasOwnProperty(currentKey)
                ? {
                      ...prev,
                      [currentKey]: obj[currentKey],
                  }
                : prev,
        {}
    );
}

function pickActions(keys = [], actions) {
    return keys.reduce(
        (prev, currentKey) =>
            typeof actions[currentKey] === 'function'
                ? {
                      ...prev,
                      [currentKey]: actions[currentKey],
                  }
                : prev,
        {}
    );
}

export { pickActions };
