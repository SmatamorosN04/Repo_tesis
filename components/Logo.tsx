import React from "react";
import { View } from "react-native";
import { FontAwesome5} from '@expo/vector-icons'

interface LogoProps{
    size?: number;
}

export function Logo({size=22}: LogoProps){
    const circle = Math.max(28, size * 2);
    return(
        <View
            style={{ width: circle, height: circle, borderRadius: circle / 2 }}
            className="bg-slate-900 border-2 border-[#F5D547] items-center justify-center shadow-sm"
        >
            <FontAwesome5 name="shield-alt" size={size} color="#F5D547"/>
        </View>
    )
}
