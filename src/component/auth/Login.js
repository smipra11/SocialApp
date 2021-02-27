import React, { Component } from 'react'
import{View,Text,TextInput,Button,StyleSheet} from 'react-native'
import firebase from 'firebase'

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state ={
            email:'',
            password: '',
            
        }
        this.onSignIn = this.onSignIn.bind(this)
    }
    onSignIn() {
        const{email,password} = this.state
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result) =>{
            var user =result.user
            console.log(user)

        })
    }
    render() {
        return (
           <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <TextInput  placeholder="email" onChangeText= {(email)=> this.setState({email})}style ={styles.TextInput}/>
                <TextInput  placeholder="password"  secureTextEntry={true}  onChangeText= {(password)=> this.setState({password})}style ={styles.TextInput}/>

                <View style={{width:300}}>
               
               <Button title="Sign In" onPress ={()=> this.onSignIn()}/>
               </View>
            
           </View>
        )
    }
}

const styles =StyleSheet.create({
    TextInput:{
        height:50,
        width:300,
        borderWidth:0.5,
        marginHorizontal:40,
        marginBottom:15,
        padding:10,
        borderWidth:0.5,
        borderColor:'gray',
        backgroundColor:'white'


    }

})

