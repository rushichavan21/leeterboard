import React from "react";
import { atom} from "recoil";

export const loadingAtom =atom({
    key:'LoadingAtom',
    default:(false)
})

export const leetcodeDataAtom=atom({
    key:'leetcodeDataAtom',
    default:[]
})
 

export const usernameAtom=atom({
    key:'usernameAtom',
    default:""
})

export const arrayDataAtom=atom({
    key:'arrayDataAtom',
    default:[]
})

export const roomFormAtom=atom({
    key:'roomFormAtom',
    default:{
        roomName:" ",
        myUsername:" ",
        roomCode:" ",  
    }
})

export const roomDataAtom=atom({
    key:'roomDataAtom',
    default:[],
})

export const myusernameAtom=atom({
    key:"myusername",
    default:"",
})
export const myuserAlertAtom=atom({
    key:"myusernameAlert",
    default:(false),
})
export const roomToCallAtom=atom({
    key:"roomToCallAtom",
    default:"",
})
export const roomObjectAtom=atom({
    key:"roomObjectAtom",
    default:{}
})
export const roomLeetcodeArrayAtom=atom({
    key:"roomLeetcodeArrayAtom",
    default:[],
})

export const roomLeetcodeDataAtom=atom({
    key:"roomLeetcodeDataAtom",
    default:[],
})