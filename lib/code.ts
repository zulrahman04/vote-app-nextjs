export const code = (length: number) =>{
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var characterslenght = characters.length
    for (var i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() *  characterslenght))
    }
    return result
}