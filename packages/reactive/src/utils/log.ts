export function log(message:any,level:'log' | 'error' | 'warn'='log'){
    let msg = typeof(message) === 'function' ? message() : (message instanceof Error ? message.stack : message)
    try{
        console[level]("[@speedform/reactive] ",...Array.isArray(msg) ? msg : [msg])
    }catch{}
}
