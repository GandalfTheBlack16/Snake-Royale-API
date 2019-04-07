const buildObjectNoNull = (keys) => {
    let obj = {}
    for (let[key,value] of Object.entries(keys)){
        if (value) obj[key] = value
    }
    return obj;
}

exports.buildObjectNoNull = buildObjectNoNull