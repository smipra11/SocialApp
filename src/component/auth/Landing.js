import React from 'react'
import {Text,View,Button } from 'react-native'

const  Landing =({navigation})  =>{
    return (
       <View style={{flex:1,justifyContent:'center'}}>
           <Text>
               <Button 
               title="Resister"
               onPress={()=>navigation.navigate("Register")}/>
               <Button
               title="Login" onPress={()=>navigation.navigate("Login")}/>

              

           </Text>
       </View>
    )
}

export default Landing