import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  dataFlatListContainer: {
    backgroundColor: 'white',
    padding: 10,
    height: '100%',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#198E52',
    borderRadius: 10,
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;