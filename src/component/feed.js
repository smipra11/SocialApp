import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

function Feed() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.userinfo}>

          <Image style={styles.userImage} source={require("../image/user/user-1.jpg")} />
          <View style={{ flexDirection: 'column', marginLeft:10,justifyContent:'center' }}>
            <Text style={styles.text}> John Doe</Text>
            <Text style={{ fontSize: 10, color: '#666' }}>4 hours ago</Text>
          </View>
          <Text> Hello this is Text</Text>
        </View>
      </View>
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  card: {
    backgroundColor: '#f8f8f8',
    width: '100%',
    marginBottom: 20,
    borderRadius: 10


  },
  userinfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10

  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25


  },
  text: {
    fontSize: 15,
    fontWeight: 'bold'
  }

})
