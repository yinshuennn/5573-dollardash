import Launch from "./Launch"
import Login from "./Login"
import SignUp from "./SignUp"
import Home from "./Home"
import ForgotPassword from "./ForgotPassword"
import SendEmail from "./SendEmail"
import { registerRootComponent } from 'expo';
import App from './App';

export {
    Launch,
    Login,
    SignUp,
    Home,
    ForgotPassword,
    SendEmail,
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
