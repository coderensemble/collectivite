import {
    StyleSheet,
    View,
    Text,
  } from "react-native";

  export function Classe() {
    return(
    <View style={styles.container}>
    <Text style={styles.title}> Classe </Text>
    <Text style={styles.classe}></Text>
    </View>
    )
  };

  const styles = StyleSheet.create({
    container:{
        margin: 20,
        padding: 20,
        borderRadius: 20
    },
    title:{
        textAlign: "center",
    },
    classe:{
        textAlign: "center",
    }
  })