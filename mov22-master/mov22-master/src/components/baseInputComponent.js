import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "./text";
import capitalize from "../utils/capitalize";

export default function BaseInputComponent({
  name,
  icon,
  color = "black",
  children
}) {
  return (
    <View className="flex-1 gap-1">
      <View className="flex-row items-center gap-2">
        {icon && (
          <MaterialIcons
            name={icon}
            size={18}
            color={color == "white" ? color : "#be185d"}
          />
        )}
        <Text className={`font-bold text-${color}`}>{capitalize(name)}</Text>
      </View>
      {children}
    </View>
  );
}