import { TextInput } from "react-native";
import BaseInputComponent from "./baseInputComponent";
import capitalize from "../utils/capitalize";

export default function InputComponent({
    name,
    icon,
    defaultValue,
    transparent = false,
    longText = false,
    onChange,
    disabled = false,
    keyboardType = "default",
    onPress = () => {},
    color = "black"
  }) {
    const colorClasses = {
      white: "border-b-white",
      black: "border-b-black",
    };
    const styling = transparent
      ? `mt-[-10px] pb-2 border-b-2 ${colorClasses[color]}`
      : "rounded-2xl bg-gray-100";
      
    return (
      <BaseInputComponent name={name} icon={icon} color={color}>
        <TextInput
          className={`text-lg text-${color} p-3 pt-1 ${styling}`}
          placeholderTextColor={color == "black" ? "lightGray" : "#ffffff70"}
          placeholder={capitalize(name)}
          defaultValue={defaultValue?.toString()}
          returnKeyType="next"
          accessibilityLabel={`Event ${name} input field`}
          keyboardType={keyboardType}
          style={{ fontFamily: "Nunito_400Regular" }}
          multiline={longText}
          numberOfLines={4}
          onPress={onPress}
          disabled={disabled}
          showSoftInputOnFocus={!disabled}
          onChangeText={(text) => onChange(name, text)}
        />
      </BaseInputComponent>
    );
  }