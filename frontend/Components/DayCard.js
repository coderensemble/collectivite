import {
    StyleSheet,
    View,
    Text,
  } from "react-native";

  export function DayCard() {
    return(
    <View style={styles.container}>
    <Text style={styles.title}> Aujourd'hui </Text>
    <Text></Text>
    </View>
    )
  };

  const styles = StyleSheet.create({
    container:{
        padding: 20,
        backgroundColor: "#FFFF",
        borderRadius: 20
    },
    title:{
        textAlign: "center",
    },
  })