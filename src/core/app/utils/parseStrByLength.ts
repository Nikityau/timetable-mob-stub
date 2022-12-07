export const parseStrByLength = (str:string):string => {
    const maxSymbols = 28
    if(!str) return "unk"
    if(str.length < maxSymbols) return str

    return str.slice(0, maxSymbols) + '...'
}