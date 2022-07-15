import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import WorkoutComponent from "../components/WorkoutComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation, route }) => {
  // [ [ NAME OF WORKOUT, NUM EXERCISES, LAST TIME DID WORKOUT ], ... ]
  // const [workoutList, setWorkoutList] = useState([["", 0, ""]]);
  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    loadHomescreenData();
    loadWorkoutSpecifics();
  }, []);

  const loadHomescreenData = async () => {
    try {
      const workoutNames = await AsyncStorage.getAllKeys();

      if (workoutNames !== null) {
        setWorkoutList(workoutNames);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error retrieving homescreen data");
    }
    // console.log("NO DATA TO LOAD");
  };

  const loadWorkoutSpecifics = async () => {
    try {
      let name = workoutList[0];
      const unparsedWorkoutData = await AsyncStorage.getItem(name);
      // await AsyncStorage.clear();
      console.log(
        "\n--------------------\n",
        name,
        "\n",
        JSON.parse(unparsedWorkoutData)
      );
    } catch {
      console.log("couldnt map through workout names");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.workoutContainer}>
        {workoutList.map((workout, i) => {
          return (
            <WorkoutComponent key={i} navigation={navigation} name={workout} />
          );
        })}
      </View>

      <View style={styles.createWorkoutContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("WorkoutScreen", { name: "" })}
        >
          <Text>Create Workout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workoutContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  createWorkoutContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default HomeScreen;
