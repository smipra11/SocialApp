import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function Add({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [GalleryPermission, setGalleryPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [startCamera, setStartCamera] = useState(false)

  useEffect(() => {
    (async () => {
      const  status  = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      const  galleryStatus  = await ImagePicker.requestCameraRollPermissionsAsync();
      

      setGalleryPermission(galleryStatus.status === "granted")
    })();
  }, []);


  const takepicture = async () => {

    const { status } = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.uri)
    }

  }


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

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }



  return (
    <View style= {{flex:1}}>
      {startCamera ? (
        <View style={styles.cameraContainer}>

          <Camera style={styles.fixedRatio}
            type={type}
            ratio={'1:1'}
            ref={ref => setCamera(ref)}></Camera>
        </View>) : (
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Button title="pick image from gallery" onPress={() => pickImage()} />
          <Button title="Save Picture" onPress={() => navigation.navigate("save", { image })} />

          <Button title="take Picture" onPress={() => takepicture()} />


          <Button

            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>

          </Button>
          </View>
          
      )}
      </View>


  );
}

const styles = StyleSheet.create({
        cameraContainer: {
        flex: 1,
      flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
      }

  })

