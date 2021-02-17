
import React, { Component } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import Register from "./src/component/auth/Register"
import Login from "./src/component/auth/Login"
import {Provider} from 'react-redux'
import{createStore,applyMiddleware} from 'redux'
import rootReducer from './src/redux/reducer'
import thunk from 'redux-thunk'

const store = createStore(rootReducer,applyMiddleware(thunk))


const firebaseConfig = {
  apiKey: "AIzaSyAird-St1hVPC5_7wl-ARjX2hleoOhCz9c",
  authDomain: "socialapp-d2572.firebaseapp.com",
  projectId: "socialapp-d2572",
  storageBucket: "socialapp-d2572.appspot.com",
  messagingSenderId: "378042014835",
  appId: "1:378042014835:web:e4cd4e4406d2deb9e51e06",
  measurementId: "G-QQD8ECPYTD"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from "./src/component/auth/Landing"
import Main from "./src/component/main"





import * as firebase from 'firebase';
import 'firebase/firestore';


const Stack = createStackNavigator();


export default class App extends Component {
  

  constructor(props) {
    super()
    this.state = {
      loaded: false,

    }

  }
  
  componentDidMount() {
    
  
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      }
      else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }


    })
  }
  render() {
    const { loggedIn, loaded } = this.state

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {

      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />


          </Stack.Navigator>

        </NavigationContainer>

      );

    }
    if(loggedIn){
      return(
        <Provider store={store}>
          <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            

          </Stack.Navigator>
          </NavigationContainer>

        </Provider>
        

      )
    }


  }
};














