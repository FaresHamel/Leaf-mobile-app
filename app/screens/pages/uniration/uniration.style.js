import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tab: (activeJobType, item) => ({
    borderColor: activeJobType === item ? '#a75377' : 'red',
    borderWidth: activeJobType === item ? 2 : 0,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: activeJobType === item ? '#fff' : '#fff',
  }),
  tabText: (activeJobType, item) => ({
    color: activeJobType === item ? '#a75377' : '#000',
    fontSize: 10,
    marginTop: 3,
  }),
  tabImage: (activeJobType, item) => ({
    width: 25,
    height: 25,
    tintColor: activeJobType === item ? '#a75377' : '#f2a2e4',
  }),
});
export default styles;