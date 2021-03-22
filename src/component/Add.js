import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../../styles/addstyle';

import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'



const  Add =(props)  =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [GalleryPermission, setGalleryPermission] = useState(null)
  const [post, setPost] = useState(null);
  


  useEffect(() => {
  

    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted")

    })();
  }, []);




  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasPermission === null || GalleryPermission === false) {
    return <View />;
  }
  if (hasPermission === false || GalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }




  const uploadImage = async () => {
    const uri = image;
    console.log("image is " + uri)

    const response = await fetch(uri)
    const blob = await response.blob();
    const childPath = `post/${props.route.params.uid}/${Math.random().toString(36)}`;
    const task = firebase.
      storage().ref().
      child(childPath)
      .put(blob)

    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        console.log(snapshot)
        savePostData(snapshot)


      })
    }

    const taskerror = snapshot => {


    }

    task.on("state_changed", taskProgress, taskerror, taskCompleted);


  }

  const savePostData = (downloadURL) => {
    firebase.firestore().
      collection('posts')
      .doc(props.route.params.uid)
      .collection('userPosts')
      .add({
        userId:props.route.params.uid,
        post: post,
        postImg: downloadURL,
        postTime: firebase.firestore.FieldValue.serverTimestamp(),
        likes: null,
        comments: null,

      })
      .then(() => {
        console.log('Post Added!');
        
        setPost(null);
      })
      .catch((error) => {
        console.log('Something went wrong with added post to firestore.', error);
      });
    }
    







  return (
  <View style={styles.container}>
    <InputWrapper>
      {image != null ? <AddImage source={{ uri: image }} /> : null}

      <InputField
        placeholder="What's on your mind?"
        multiline
        numberOfLines={4}
        value={post}
        onChangeText={(content) => setPost(content)}
      />

      <SubmitBtn onPress ={() => uploadImage()}>
        <SubmitBtnText>MYPost</SubmitBtnText>
      </SubmitBtn>

    </InputWrapper>
    <ActionButton buttonColor="#2e64e5">

      <ActionButton.Item
        buttonColor="#3498db"
        title="Choose Photo"
        onPress={pickImage}
      >
        <Ionicons name="md-images-outline" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  </View>



);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})


const mapStateToProps = (store) => ({
  currentUser: store.userstate.currentUser,
  
})
export default Add

