import crypto from "crypto-js";

const secret = "kZKaszyuKnTWqKo";

export function AESEncrypt(password,toString) {
    if(typeof(toString) !== "boolean"){
        throw new Error("The argument value is malformed.")
    }
    const cryptoPassword = crypto.AES.encrypt(password,secret);
    if(toString){
        return cryptoPassword.toString();
    }else{
        return cryptoPassword;
    }
}

export function AESDecrypt(encPassword) {
    const decryptPassword = crypto.AES.decrypt(encPassword,secret);
    return decryptPassword.toString(crypto.enc.Utf8);
}

export function confirmPassword(encPassword, password) {
    const encpw = AESDecrypt(encPassword);
    return encpw === password.toString()
}
