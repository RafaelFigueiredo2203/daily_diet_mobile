import React from 'react'
import { Image, View } from 'react-native'

export function Header() {
  return (
    <View className="flex flex-row items-center justify-between mt-6">
      <Image
        source={require('../assets/Logo.png')}
        style={{ width: 82, height: 37 }}
      />

      <Image
        source={require('../assets/profile.jpeg')}
        style={{ width: 40, height: 40 }}
        className="rounded-full"
      />
    </View>
  )
}
