export function genAlphaNum(length: number): string {
    const charset = ("abcdefghijklmnopqrstuvwxyz".toUpperCase() + "0123456789").split("")
    let res = ""
    for (let i = 0; i < length; i++) {
        res += charset[Math.floor(Math.random() * charset.length)]
    }
    return res
}