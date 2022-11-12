export const areObjectsEqual = (obj1, obj2) => {
    const props1 = Object.getOwnPropertyNames(obj1);
    const props2 = Object.getOwnPropertyNames(obj2);

    if(props1.length !== props2.length) return false;

    for(let i = 0; i < props1.length; i++) {
        let val1 = obj1[props1[i]];
        let val2 = obj2[props2[i]];

        let areObjects = isObject(val1) && isObject(val2);

        if((areObjects && !areObjectsEqual(val1, val2)) || (!areObjects && val1 !== val2)) return false;
    }

    return true
}

const isObject = (object) => object != null && typeof object === 'object';