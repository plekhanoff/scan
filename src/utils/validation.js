/**
 * Функция для проверки корректности ИНН (российского идентификационного номера налогоплательщика)
 * @param {string|number} inn - ИНН для проверки
 * @param {object} errorObj - Объект для записи ошибок (опционально)
 * @returns {boolean} Результат проверки
 */
export function validateInn(inn, errorObj) {
    // Начальное состояние 
    let result = false;
    const error = { code: null, message: '' };

    // Приводим вход к строке
    if (typeof inn === 'number') {
        inn = inn.toString();
    } else if (typeof inn !== 'string') {
        inn = '';
    }
    
    // Очищаем от пробелов и тире
    inn = inn.replace(/[^0-9]/g, '');
    
    // Проверки основных ошибок
    if (!inn.length) {
        error.code = 1;
        error.message = 'ИНН не указан';
    } else if (/[^0-9]/.test(inn)) {
        error.code = 2;
        error.message = 'ИНН может состоять только из цифр';
    } else if ([10, 12].indexOf(inn.length) === -1) {
        error.code = 3;
        error.message = 'ИНН может состоять только из 10 или 12 цифр';
    } else {
        // Функция для вычисления контрольной цифры
        const calculateCheckDigit = (innDigits, coefficients) => {
            let sum = 0;
            for (let i = 0; i < coefficients.length; i++) {
                sum += coefficients[i] * parseInt(innDigits[i]);
            }
            return parseInt(sum % 11 % 10);
        };
        
        // Проверка в зависимости от длины ИНН
        switch (inn.length) {
            case 10: // ИНН юридического лица
                const n10 = calculateCheckDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (n10 === parseInt(inn[9])) {
                    result = true;
                }
                break;
            case 12: // ИНН физического лица
                const n11 = calculateCheckDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                const n12 = calculateCheckDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                    result = true;
                }
                break;
            default:
                error.code = 5;
                error.message = 'Неизвестная длина ИНН';
                break;
        }
        
        // Если контрольные цифры не совпали
        if (!result) {
            error.code = 4;
            error.message = 'Неправильное контрольное число';
        }
    }
    
    // Если передан объект для ошибки, заполняем его
    if (errorObj && !result) {
        errorObj.code = error.code;
        errorObj.message = error.message;
    }
    
    return result;
}

/**
 * Функция для простой проверки формата email
 * @param {string} email - Адрес электронной почты для проверки
 * @returns {boolean} Результат проверки
 */
export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

/**
 * Функция для проверки корректности пароля
 * @param {string} password - Пароль для проверки
 * @param {number} minLength - Минимальная длина пароля (по умолчанию 8)
 * @returns {boolean} Результат проверки
 */
export function validatePassword(password, minLength = 8) {
    return typeof password === 'string' && password.length >= minLength;
}
