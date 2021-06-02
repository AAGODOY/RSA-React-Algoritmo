//Greatest Common ivisor
export const gcd = (a:number, b:number) => {
    let temp;
    while (1) {
        temp = a % b;
        if (temp === 0)
            return b;
        a = b;
        b = temp;
    }
}

export const modInverse = (a:number, m:number):number => {
    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
        return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
        return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while (b) {
        [a, b] = [b, a % b]
        s.push({ a, b })
    }
    if (a !== 1) {
        return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}

export const powModulus = (base:number, exponent:number, modulus:number):number => {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}

export const isPrime = (num:number):boolean => {
    for(var i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num > 1;
}
