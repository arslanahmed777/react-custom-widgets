import { store } from "../redux/Store";
const TOKEN = () => {
  //  let token = Store.getState().Login && Store.getState().Login.token.token.value
  let token = store.getState();
  return token;
};

const HOSTNAME = "http://localhost:5000";

export { TOKEN, HOSTNAME };
