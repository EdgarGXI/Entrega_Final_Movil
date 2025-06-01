import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventForm from "../screens/eventForm";
import FeedbackDashboard from "../screens/feedbackDashboard";
import { useRoute } from "@react-navigation/native";
import CustomTabBar from "../components/customTabBar";


const EventTab = createBottomTabNavigator();

const EventNavigator = () => {
  const route = useRoute();
  const { eventId } = route.params || {};

  return (
    <EventTab.Navigator 
      tabBar={props => <CustomTabBar {...props} />} 
      screenOptions={{ headerShown: false }}
      >
      <EventTab.Screen name="Edit" component={EventForm} initialParams={{ eventId }} />
      <EventTab.Screen name="Feedback" component={FeedbackDashboard} initialParams={{ eventId }} />
    </EventTab.Navigator>
  );
}

export default EventNavigator;
