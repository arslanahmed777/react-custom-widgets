import { store } from '../redux/Store'
const TOKEN = () => {
    //  let token = Store.getState().Login && Store.getState().Login.token.token.value
    let token = store.getState()
    return token
}

const HostName = "http://192.168.104.156"

export { TOKEN, HostName }