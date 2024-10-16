import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import database from '@react-native-firebase/database';

export const  Sendmsg = async(currentuid , reciveruid , msg, image)=>{
await database().ref('Messages/'+currentuid)

.child(reciveruid)
.push({
    message:{

        currid : currentuid,
        reciverid : reciveruid,
        message : msg,
        image: image,
    },

})
}


export const Recivemsg = async(currentuid , reciveruid , msg , image)=>{
    await database().ref('Messages/'+ reciveruid)
    .child(currentuid)
    .push({
        message:{

            currid : currentuid,
            reciverid : reciveruid,
            message : msg,
            image:image,
        },
    
    
    })
    }


const styles = StyleSheet.create({})