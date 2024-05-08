import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  modalView: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '95%',
    height: '87%',
  },
  header: {
    backgroundColor: 'transparent',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    borderBottomColor: '#daeaf6',
    borderBottomWidth: 1,
    height: 50,
  },
  btnGoback: {backgroundColor: 'transparent', alignSelf: 'center'},
  imgGoback: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginRight: 20,
  },
  textGoback: {
    alignSelf: 'center',
    fontSize: 17,
    color: '#000',
  },
  descriptionContainer: {
    paddingVertical: 5,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
  },
  title: {fontSize: 17, color: '#000', marginBottom: 5},
  description: {fontSize: 13, color: '#6a737b'},
  containerSymptoms: {
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 10,
  },
  symptomsTitle: {fontSize: 14, color: '#000', marginBottom: 5},
  symptoms: {backgroundColor: 'transparent', flexDirection: 'row'},
});

export default styles;