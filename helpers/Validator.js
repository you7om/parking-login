// utils/validator.js

export default class Validator {
  // Beispiel: Text prüfen, ob leer
  static validateTextMessage(value) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    let isValid = regex.test(value);
    if (!isValid) {
      return "Dieses Feld darf keine Sonderzeichen enthalten!";
    }

    return "";
  }

  static isEmptyMessage(value) {
    if (!value.length) {
      return "Dieses Feld darf nicht leer sein!";
    }
    return "";
  }

  static isEmpty(value) {
    if (!value || !value.length) {
      return true;
    }
    return false;
  }

  static stringIsLongerThanError(value, length){
    if(value.length <= length && value.length > 0){
        return `Der Wert ist zu kurz und muss länger als ${length} ${length <= 1 ? 'Symbol' : 'Symbole'} sein`
    }
    return "";
  }

  static validateEmailMessage(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = emailRegex.test(email);
   if (!isValid) {
      return "Geben Sie eine gültige E-Mail ein!";
    }

    return "";
}

static passwordsAreTheSame(firstPassword, secondPassword) {
if(firstPassword === secondPassword && firstPassword && secondPassword){
    return "";
} else {
    return "Die angegebenen Passwörter stimmen nicht überein!"
}
}

static passwordSpellingMessage(firstPassword){
  if (!/[A-Z]/.test(firstPassword)) {
    return "Das Passwort muss mindestens einen Großbuchstaben enthalten!";
  }

  if (!/[0-9]/.test(firstPassword)) {
    return "Das Passwort muss mindestens eine Zahl enthalten!";
  }

  if (!/[!@#$%^&*(),.?":{}|<>_]/.test(firstPassword)) {
    return "Das Passwort muss mindestens ein Sonderzeichen enthalten!";
  }

  return "";

}

static validatePhoneMessage(phone){
const phoneRegex = /^[0-9+\-() ]{7,20}$/;

  if (!phoneRegex.test(phone)) {
    return "Bitte geben Sie eine gültige Telefonnummer ein!";
  }

  return "";
}

}
