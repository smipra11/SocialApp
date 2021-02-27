import React, { Component } from 'react'
import{View,Text,TextInput,Button,StyleSheet} from 'react-native'
import firebase from 'firebase'

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state ={
            email:'',
            password: '',
            name:''
        }
        this.onSignup = this.onSignup.bind(this)
    }

    onSignup(){
        const{email,password,name} = this.state
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((result)=>{
            firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                    console.log(result)
            
        })
        .catch((error) => {
            console.log(error)
            // ..
          });

    }
    render() {

        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TextInput  placeholder="name" onChangeText= {(name)=> this.setState({name})}style ={styles.TextInput}/>

                <TextInput  placeholder="email" onChangeText= {(email)=> this.setState({email})} style={styles.TextInput}/>
                <TextInput  placeholder="password"  secureTextEntry={true}  onChangeText= {(password)=> this.setState({password})} style={styles.TextInput}/>

               <View style={{width:300}}>
               <Button title="Sign Up" onPress ={()=> this.onSignup()} />

               </View>
               
            
            </View>
                
            
        )
    }
}

const styles =StyleSheet.create({
    TextInput:{
        height:50,
        width:300,
        marginHorizontal:40,
        marginBottom:15,
        padding:10,
        borderWidth:0.5,
        borderColor:'gray',
        backgroundColor:'white'

    }

})
