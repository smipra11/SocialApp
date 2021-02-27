import React from 'react'
import { Text, View, Button ,StyleSheet,Image} from 'react-native'

const Landing = ({ navigation }) => {
    return (
        <View style={{ flex: 1 ,justifyContent:'center'}}>
<View style ={{ justifyContent:'center',alignItems:'center'}}>
<Image
        source={require('../../image/rn-social-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>RN Social App</Text>
      </View>


            <View style={{
                marginTop:20,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>


                <Button
                    title="Resister"
                    onPress={() => navigation.navigate("Register")} />


                <Button
                    title="Login" onPress={() => navigation.navigate("Login")} style={{ margin: 10 }} />

            </View>





        </View>
    )
}

export default Landing

const styles= StyleSheet.create({
    logo:{
        width:150,
        height:150,
        resizeMode: 'cover',

    },
    text:{
        
            fontFamily: 'Kufam-SemiBoldItalic',
            fontSize: 28,
            marginBottom: 10,
            color: '#051d5f',
          
    }
})