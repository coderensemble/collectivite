import { SafeAreaView, StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import { Classe } from "../Components/Classe";
import { Meteo } from "../Components/Meteo";
import { DayCard } from "../Components/DayCard";
import MainContainer from "../../../../Formation/La_Capsule-Developpeur_web_et_mobile/Bootcamp/DressMeUP/dressMeUp-frontend/Components/css/MainContainer";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.mainContainer}>
        <View style={styles.head}>
          <Text style={styles.title}> Nom Prénom </Text>
        </View>
        <View style={styles.blocUn}>
          <View>
            <Classe />
          </View>
          <View>
            <Meteo />
          </View>
        </View>
        <View>
          <DayCard />
        </View>
        <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate("Agenda")}>
          <Text style={styles.buttonText}>Agenda</Text>
        </TouchableOpacity>
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
  mainContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.75,
    justifyContent: "space-between",
  },
  head: {
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 40,
    fontFamily: "MavenPro",
  },

  blocUn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customButton: {
    backgroundColor: "rgba(216, 200, 139, 1)",
    borderRadius: 20,
    paddingVertical: 10,
  },
  buttonText: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "MavenPro",
    color: "#ffff",
  },
});
