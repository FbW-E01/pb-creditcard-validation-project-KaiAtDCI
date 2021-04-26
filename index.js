function validateCreditCard(creditCardNum) {

    // (1) check if argument has form dddd-dddd-dddd-dddd
    const regexp = new RegExp("[\\d]{4}-[\\d]{4}-[\\d]{4}-[\\d]{4}", "g");
    if (regexp.test(String(creditCardNum)) === false) {
        console.error('May only contain numbers.')
        return false;
    }

    // (2) check if argument contains two different digits
    const digits = Array.from(creditCardNum.replaceAll("-", ""));
    outerLoop: {
        for (let i = 0; i < digits.length; i++) {
            for (let j = i+1; j < digits.length; j++) {
                if (digits[i] !== digits[j]) break outerLoop;
            }
        }
        console.error('Must contain at least two different digits.')
        return false;
    }

    // (3) check if argument's last digit is even number
    const lastDigit = parseInt(creditCardNum[creditCardNum.length-1]);
    if (lastDigit % 2 !== 0) {
        console.error('Last digit must be an even number.')
        return false;
    }

    // (4) check if sum of all digits is greater than 16
    const numbers = [];
    digits.forEach((e) => numbers.push(parseInt(e)));
    const sum = numbers.reduce((accu, current) => accu += current);
    if (sum < 16) {
        console.error('Sum of digits must be greater than 16.')
    }

    // if none of the above checks failed return true
    return true;
}

/**** tests *****/
console.log(validateCreditCard('9999-7777-8888-0000')); //{ valid: true, number: '9999-7777-8888-0000' }
console.log(validateCreditCard('6666-6666-6666-1666')); //{ valid: true, number: '6666-6666-6666-1666' }
console.log(validateCreditCard('a923-3211-9c01-1112')); //{ valid: false,number: 'a923-3211-9c01-1112',error: '_invalid characters_' }
console.log(validateCreditCard('4444-4444-4444-4444')); //{ valid: false,number: '4444-4444-4444-4444',error: '_only one type of number_' }
console.log(validateCreditCard('1211-1111-1111-1112')); //{ valid: true, number: '1211-1111-1111-1112' }




