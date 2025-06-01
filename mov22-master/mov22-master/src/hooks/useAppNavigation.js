import { useNavigation } from "@react-navigation/native";

const useAppNavigation = () => {
  const navigation = useNavigation();

  const navigateToEventFeedback = (eventId) => {
    navigation.navigate("View Event", { screen: "Feedback", eventId });
  };

  const navigateToEventEdit = (eventId) => {
    navigation.navigate("View Event", { screen: "Edit", ...(eventId == undefined ? {} : { eventId }) });
  };

  const navigateToCategoryEdit = (categoryId) => {
    navigation.navigate("View Category", categoryId == undefined ? {} : { categoryId });
  };

  const navigateToSearch = (category) => {
    navigation.navigate("Search", category == undefined ? {} : { category });
  };

  return { navigateToEventFeedback, navigateToEventEdit, navigateToCategoryEdit };
};

export default useAppNavigation;
