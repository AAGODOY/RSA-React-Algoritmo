const alphabet = require('../data/alphabet.json');
const { gcd, modInverse, powModulus } = require('../helpers/mathFunctions');

function getE(phi) {
    let _E = [];
    let minE = 2;
    let maxE = phi - 1;
    for (let tempE = minE; tempE <= maxE; tempE++) {
        if (gcd(tempE, phi) === 1)
            _E.push(tempE);
    }
    return _E;
}

function getD(e, phi) {
    let _D = 0;
    let minBaseNumber = 0;
    let tempD = 1;
    while (tempD < phi) {
        tempD = (1 + (minBaseNumber * phi)) / e;
        if (Number.isInteger(tempD) && tempD !== e) {
            _D = tempD;
            break;
        } else
            minBaseNumber++;
    }
    if (tempD === modInverse(e, phi)) // EXTRA VALIDATION
        return _D;
    else return 0;
}

function getEncryptedNumbersFromText(originalText, _E, _N) {
    const charsOfText = originalText.toUpperCase().split('');
    const base = alphabet.base26.length;
    const maxExponent = getMaxExponentAllowed(base, _N);
    const charsGroupedByLimit = getArraySplited(charsOfText, maxExponent);
    let cipherNumbers = [];
    charsGroupedByLimit.forEach((charsGroup) => {
        let tempValue = 0;
        for (let i = 0; i < charsGroup.length; i++) {
            let charPosition = alphabet.base26.indexOf(charsGroup[i]);
            let charExponent = (charsGroup.length - (i + 1));
            if ((charExponent) === 0) tempValue += charPosition;
            else tempValue += charPosition * (base ** charExponent);
        }
        let _C = powModulus(tempValue, _E, _N);
        cipherNumbers.push(_C);
    })

    return cipherNumbers;
}

function getEncryptedTextFromNums(cipherNumbers) {
    let cipherNumbersTobase = cipherNumbers.map((num) => getNumbersToBase([num]));
    let cipherText = cipherNumbersTobase.map((numArray) => getAlphabetMatchValues(numArray));
    return cipherText;
}

function getDecryptedNumberFromText(cipherText, _D, _N) {
    const base = alphabet.base26.length;
    const charsOfText = cipherText.toUpperCase().split('');
    let finalValue = 0;

    for (let i = 0; i < charsOfText.length; i++) {
        let tempSum = 0;
        let charPosition = alphabet.base26.indexOf(charsOfText[i]);
        let charExponent = (charsOfText.length - (i + 1));
        if ((charExponent) === 0) tempSum = charPosition;
        else tempSum = charPosition * (base ** charExponent);

        finalValue += tempSum;
    }

    return finalValue;
}

function getDecryptedTextFromNum(cipherNumber, _D, _N) {
    const _M = powModulus(cipherNumber, _D, _N);
    const decipherNumberToBase = getNumbersToBase([_M]);
    const decipherText = getAlphabetMatchValues(decipherNumberToBase);
    return decipherText;
}

function getNumbersToBase(cipherNumbers) {
    const base = alphabet.base26.length;
    let cipherNumsCalculation = [];
    let minExponent = 1;
    let tempValue;
    let divisionValue;
    let subtotal;
    let reminder;
    let powValue = 0;

    cipherNumbers.forEach(cipherNum => {
        if (cipherNum <= base) {
            cipherNumsCalculation.push(cipherNum);
        } else {
            while (cipherNum !== 0) {
                if (cipherNum <= base) {
                    cipherNumsCalculation.push(cipherNum);
                    break;
                }
                for (let i = 0; i < 20; i++) { //RANDOM limit
                    tempValue = base ** minExponent;
                    if (tempValue < cipherNum) {
                        minExponent++;
                    } else {
                        minExponent--;
                        powValue = base ** minExponent;
                        break;
                    }
                }
                divisionValue = Math.floor(cipherNum / powValue);
                cipherNumsCalculation.push(divisionValue)
                subtotal = divisionValue * (powValue);
                reminder = cipherNum - subtotal;
                cipherNum = reminder;
            }
        }
    });
    return cipherNumsCalculation;
}

function getAlphabetMatchValues(numbers) {
    let text = "";
    for (let i = 0; i < numbers.length; i++) {
        text += alphabet.base26[numbers[i]];
    }
    return text;
}

function getMaxExponentAllowed(base, _N) {
    let temp = 0;
    let maxExponent = 1;
    while (temp < _N) {
        maxExponent++;
        temp = base ** maxExponent;
    }
    return maxExponent - 1;
}

function getArraySplited(arrValues, splitCount) {
    var tempArray = [];
    for (let i = 0; i < arrValues.length; i += splitCount) {
        let subArray = arrValues.slice(i, i + splitCount);
        tempArray.push(subArray);
    }
    return tempArray;
}

module.exports = {
    getE,
    getD,
    getEncryptedNumbersFromText,
    getEncryptedTextFromNums,
    getDecryptedNumberFromText,
    getDecryptedTextFromNum
}