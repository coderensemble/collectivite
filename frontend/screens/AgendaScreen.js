import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function AgendaScreen({ navigation }) {
return(
    <SafeAreaView style={styles.body}>
    <View>
       <Text> HELLO </Text>
    </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: "rgba(216, 200, 139, 0.5)",
      alignItems: "center",
      justifyContent: "center",
    },
});