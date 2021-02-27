import React,{useState} from 'react'
import { StyleSheet, Text, View,TextInput,FlatList,TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import 'firebase/firestore'

const  Search =(props)  =>{
    const[users,setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsers(users);
            })
    }


    return (
        <View style={{marginTop:50}}>
        <TextInput placeholder ="Type Here" onChangeText ={(search)=>fetchUsers(search)}/>
       

        <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    
                    <TouchableOpacity
                    onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
                   

                )}
            />

        

        
        
        </View>
    )
}

export default Search
