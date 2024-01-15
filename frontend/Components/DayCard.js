import { StyleSheet, View, Text } from "react-native";

export function DayCard() {
  const test = [
    { heureActiviteMat: { heure: 8, minutes: 30 }, activiteMat: "Football" },
    { repas: true },
    { heureActiviteAm: { heure: 18, minutes: 30 }, activiteAm: "Peinture" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Aujourd'hui </Text>
      {test.map((data, index) => (
        <View key={index}>
          {data.heureActiviteMat && (
            <Text>
              {data.heureActiviteMat.heure}:{data.heureActiviteMat.minutes} - {data.activiteMat}
            </Text>
          )}
          {data.repas && <Text>Repas</Text>}
          {data.heureActiviteAm && (
            <Text>
              {data.heureActiviteAm.heure}:{data.heureActiviteAm.minutes} - {data.activiteAm}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFF",
    borderRadius: 20,
  },
  title: {
    textAlign: "center",
  },
});
