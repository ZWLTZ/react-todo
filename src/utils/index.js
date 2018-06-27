const add = function (x, y) {
    return x + y
}

function resetPhone(phone) {
    var str = String(phone)
    var len = str.length;
    var prev, next;
    if (len >= 7) {
        prev = str.slice(-len, -7)
        next = str.slice(-3)
        str = prev + "****" + next
    } else if (len < 7 && len >= 6) {
        prev = str.slice(-len, -4)
        next = str.slice(-2)
        str = prev + "**" + next
    }
    console.log(str)
    return str
}

export {
    add,
    resetPhone
}