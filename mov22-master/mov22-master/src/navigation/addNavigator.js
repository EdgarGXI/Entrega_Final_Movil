import { createStackNavigator } from "@react-navigation/stack";
import EventNavigator from "./eventNavigator";
import CategoryForm from "../screens/categoryForm";
import AddScreen from "../screens/addScreen";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const AddTab = createStackNavigator();

const AddNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate("Add Navigator", { screen: "Add New" })
    });

    return unsubscribe; // Cleanup listener on unmount
  }, [navigation]);
  
  return (
    <AddTab.Navigator initialRouteName="Add New">
      <AddTab.Screen name="Add New" component={AddScreen} options={{ headerShown: false }} />
      <AddTab.Screen name="View Event" component={EventNavigator} options={{ unmountOnBlur: true }} />
      <AddTab.Screen name="View Category" component={CategoryForm} options={{ unmountOnBlur: true }} />
    </AddTab.Navigator>
  );
}

export default AddNavigator;