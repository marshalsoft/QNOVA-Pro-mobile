/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */
import {AppRegistry,View,Text,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './Redux/store';
import { ToastProvider } from 'react-native-toast-notifications';
import AppStyles  from './includes/styles';
import InfoIcon from './components/svgs/infoIcon';
import 'react-native-gesture-handler';
const store = configureStore();
LogBox.ignoreAllLogs();
const ReduxOp = () => (
  <Provider 
  store={store} >
    <ToastProvider
    renderToast={(toastOptions) =><View style={{paddingHorizontal:2}}>
    <View 
      style={[AppStyles.toastContainer,{...toastOptions.style}]}
      >
      <Text style={[toastOptions.textStyle]}>{toastOptions.message}</Text>
    </View>
    </View>
    }
    >
    <App />
    </ToastProvider>
  </Provider>
);
AppRegistry.registerComponent(appName, () => ReduxOp);
