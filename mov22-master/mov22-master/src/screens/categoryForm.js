import { useRoute } from "@react-navigation/native";
import { TouchableOpacity, View, Alert } from "react-native";
import Text from "../components/text";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import InputComponent from "../components/inputComponent";
import useCategoryForm from "../hooks/useCategoryForm";
import LoadingScreen from "./loadingScreen";

export default function CategoryForm({ navigation }) {
  const route = useRoute();
  const { categoryId } = route.params || {};
  const {
    categoryData,
    handleInputChange,
    handleSubmit,
    handleDelete,
    loading,
    error, 
    setError,
  } = useCategoryForm(categoryId, navigation);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    Alert.alert(
      'Error', error, [
        {
          text: 'OK',
          onPress: () => setError(undefined),
        }
      ]);
  }

  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View className="flex-1 pb-36">
        <View className="bg-pink-800 h-60 rounded-br-[65px]">
          <View className="bg-pink-100 h-60 w-60 rounded-full absolute top-[-90px] right-[-79px]" />
          <View className="bg-pink-600 h-36 w-36 rounded-full absolute top-[-42px] right-[-34px]" />
          <View className="bg-pink-500 h-10 w-10 rounded-full absolute top-28 right-3" />
          <View className="bg-pink-300 h-20 w-20 rounded-full absolute top-3 right-32" />
          <View className="w-10/12 flex-1 absolute bottom-7 left-5">
            <InputComponent
              name="label"
              icon="view-headline"
              color="white"
              defaultValue={categoryData?.label}
              transparent={true}
              onChange={handleInputChange}
            />
          </View>
        </View>
        <View className="pl-5 pr-6 pt-7">
          <View className="flex-row justify-center gap-4">
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-pink-200 rounded-full py-3 px-6 flex-row items-center"
              onPress={handleSubmit}
            >
              <MaterialIcons name="save" size={20} color="#C2185B" />
              <Text className="text-pink-600 text-xl ml-2">Save category</Text>
            </TouchableOpacity>

            {/*solo mostrar para categorías existentes */}
            {categoryData && categoryData._id && (
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-red-100 rounded-full py-3 px-6 flex-row items-center"
                onPress={handleDelete}
              >
                <MaterialIcons name="delete" size={20} color="#C2185B" />
                <Text className="text-pink-600 text-xl ml-2">Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}