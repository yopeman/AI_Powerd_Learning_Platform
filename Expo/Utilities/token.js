import React from 'react';
import store from './data-storage';
import {useNavigation} from "@react-navigation/native";
import {View} from "react-native";

export default function Token() {
    const navigation = useNavigation();
    const token = store.get('token');
    if (!token) {
        navigation.navigate('Register');
        return <></>;
    }
    return (<></>);
}
