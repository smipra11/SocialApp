import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    Container,
    Card,
    UserInfo,
    UserImg,
    UserName,
    UserInfoText,
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divider,
} from '../../styles/feedstyle';



const  Postcard = ()  =>{
    return (
        
            <Card>
                <UserInfo>
                    <UserImg  source={require('../image/user/user-3.jpg')}/>
                    <UserInfoText>
                        <UserName> John Doe</UserName>
                        <PostTime> 4 hours ago</PostTime>
                    </UserInfoText>
                </UserInfo>
                <PostText> This is Text Message </PostText>
                <InteractionWrapper>
                    <Interaction active>
                        <Ionicons name="heart" size={25} />
                        <InteractionText active> 12 likes</InteractionText>

                    </Interaction>

                    <Interaction active>
                        <Ionicons name="md-chatbubble=outline" size={25} />
                        <InteractionText > comment</InteractionText>

                    </Interaction>
                </InteractionWrapper>

            </Card>

      

    )
}

export default Postcard
