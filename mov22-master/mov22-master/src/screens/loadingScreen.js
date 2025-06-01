import { View, ActivityIndicator } from "react-native"
import Text from "../components/text"

export default function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900 relative overflow-hidden">
      <View className="bg-pink-100 h-60 w-60 rounded-full absolute top-[-90px] right-[-79px]" />
      <View className="bg-pink-600 h-36 w-36 rounded-full absolute top-[-42px] right-[-34px]" />
      <View className="bg-pink-500 h-10 w-10 rounded-full absolute top-28 right-3" />
      <View className="bg-pink-300 h-20 w-20 rounded-full absolute top-3 right-32" />

      <View className="bg-pink-100 h-40 w-40 rounded-full absolute bottom-[-50px] left-[-50px]" />
      <View className="bg-pink-300 h-16 w-16 rounded-full absolute bottom-20 left-10" />

      <View className="items-center space-y-4 px-6 py-8 rounded-2xl bg-white/80">
        <ActivityIndicator size="large" color="#db2777" /* pink-600 */ />
        <Text className="text-xl font-semibold text-pink-700 dark:text-pink-300">Loading...</Text>
       
      </View>
    </View>
  )
}
