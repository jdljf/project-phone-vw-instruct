import CryptoJS from 'crypto-js'
var settings = {
    key: CryptoJS.enc.Utf8.parse("0123456789abcdef"),  //十六位十六进制数作为密钥
    iv: CryptoJS.enc.Utf8.parse('0123456789abcdef'),  //十六位十六进制数作为密钥偏移量
    storageKey:CryptoJS.enc.Utf8.parse("2123a6cdef342431"),
    storageIv:CryptoJS.enc.Utf8.parse('ABCDEF1234123412'),
}
// 封装解密函数
function Decrypt(word, key, iv) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
// 封装加密函数
function Encrypt(word, key, iv) {
    let wordJSON=JSON.stringify(word)
    let srcs = CryptoJS.enc.Utf8.parse(wordJSON);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
export const encrypt = {
    // 设置key和iv
    setKeyAndIv(key,iv){
        settings.key=CryptoJS.enc.Utf8.parse(key);
        settings.iv=CryptoJS.enc.Utf8.parse(iv);
    },
    // 数据解密
    DecryptData(word) {
        return Decrypt(word,settings.key,settings.iv);
    },
    //数据加密
    EncryptData(word) {
        return Encrypt(word,settings.key,settings.iv);
    },
    // 缓存解密
    DecryptStorage(word){
        return Decrypt(word,settings.storageKey,settings.storageIv);
    },
    // 缓存加密
    EncryptStorage(word){
        return Encrypt(word,settings.storageKey,settings.storageIv);
    }
}