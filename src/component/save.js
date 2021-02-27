import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'

const Save = (props) => {
    console.log(props.route.params.image)
    const [caption,setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const response = await fetch(uri)
        const blob = await response.blob();
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const task = firebase.
            storage().ref().
            child(childPath)   
            .put(blob)

            const taskProgress = snapshot =>{
                console.log(`transferred: ${snapshot.bytesTransferred}`)
            }

            const taskCompleted =() =>{
                task.snapshot.ref.getDownloadURL().then((snapshot) =>{
                    savePostData(snapshot)
                    

                })
            }

            const taskerror =snapshot =>{
               
                
            }

            task.on("state_changed", taskProgress, taskerror, taskCompleted);


    }
     const savePostData = (downloadURL) =>{
         firebase.firestore().
         collection('posts')
         .doc(firebase.auth().currentUser.uid)
         .collection('userPosts')
         .add({
            downloadURL,
            caption,
            likesCount: 0,
            creation: firebase.firestore.FieldValue.serverTimestamp()
         }).then((function () {
            props.navigation.popToTop()
        }))

     }

    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: props.route.params.image }} />
            <TextInput placeholder="write a captain"
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save" onPress={() => uploadImage()} />

        </View>
    )
}
export default Save
