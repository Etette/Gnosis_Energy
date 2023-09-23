// format xDai input and output

exports.formatXDai = (amount) => {
    let value = amount / 10**18;
    return value;
}

exports.parseXDai = (amount) => {
    let value = amount * 10**18;
    return value;
}

exports.generateRandom16DigitNumber = () => {
    const min = 1e15;
    const max = 9e15;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

