import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux'
import {fetchUser} from "../redux/actions/index"
import { bindActionCreators } from 'redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from "./feed"
import Add from "./Add"
import Profile from "./Profile"


const Tab = createBottomTabNavigator();

const emptyScreen = () =>{
    return(null)
}

export class Main extends Component {
    componentDidMount(){
       this.props.fetchUser()
    }


    render() {
        
        return (
            <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="Feed" component={Feed} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}/>
      
      <Tab.Screen name="MainAdd" component={emptyScreen} 
      listeners = {({navigation}) =>({
          tabPress: event =>{
              event.preventDefault()
              navigation.navigate("Add")
          }

      })}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-box" color={color} size={26} />
        ),
      }}/>
    
      <Tab.Screen name="Profile" component={Profile} 
      options={{  
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-circle" color={color} size={26} />
        ),
      }}/>
       
      
    </Tab.Navigator>
        )
    }
}

const mapStateToProp = (store) =>({ 
    currentUser:store.userstate.currentUser

})
const mapDispatchToProp = (dispatch) => bindActionCreators({fetchUser},dispatch)

export default connect(mapStateToProp,mapDispatchToProp)(Main)
