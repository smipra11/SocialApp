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



const  Postcard = ({item})  =>{
   let  likeicon  =item.liked? "heart" : 'heart-outline'
    let likeIconColor = item.liked ? '#2e64e5' : '#333';
   let likeText, commentText

   if(item.likes ==1){
       likeText = "1 Like"
   }
   else if ( item.likes > 1){
       likeText = item.likes + " likes"
   }
   else{
       likeText = 'likes'
   }



   if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }

    return (
        
            <Card>
                <UserInfo>
                    <UserImg  source={item.userImg}/>
                    <UserInfoText>
                        <UserName> {item.userName}</UserName>
                          <PostTime> {item.postTime}</PostTime>
                    </UserInfoText>
                </UserInfo>
                <PostText> {item.post} </PostText>
                {item.postImg !== 'none'? <PostImg  source={item.postImg}/>: <Divider/>}
                <InteractionWrapper>
                    <Interaction active ={item.liked}>
                        <Ionicons name= {likeicon} size={25} color ={likeIconColor}/>
                         <InteractionText active  ={item.liked}> {likeText}</InteractionText>

                    </Interaction>

                    <Interaction active>
                        <Ionicons name="md-chatbubble=outline" size={25} />
                         <InteractionText > {commentText}</InteractionText>

                    </Interaction>
                </InteractionWrapper>

            </Card>

      

    )
}

export default Postcard
