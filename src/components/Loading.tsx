import { ActivityIndicator, View } from 'react-native'

export function RoutesLoading() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-200">
      <ActivityIndicator size="small" color="#000" />
    </View>
  )
}
