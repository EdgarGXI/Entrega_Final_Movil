import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/homeScreen";
import CustomTabBar from "../components/customTabBar";
import SearchScreen from "../screens/searchScreen";
import AddNavigator from "./addNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator 
    tabBar={props => <CustomTabBar {...props} />} 
    screenOptions={{ headerShown: false }}
    >
    <Tab.Screen name="Home" component={HomeScreen} options={{ unmountOnBlur: true }} />
    <Tab.Screen name="Add Navigator" component={AddNavigator} options={{ unmountOnBlur: true }} />
    <Tab.Screen name="Search" component={SearchScreen} />
  </Tab.Navigator>
);

export default AppNavigator;
