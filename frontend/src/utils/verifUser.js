export default () => {
    const local = localStorage.getItem('auth')
    if(local){
        return true
    }
    return false
}