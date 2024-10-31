import React from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

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