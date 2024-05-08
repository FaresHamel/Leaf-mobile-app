import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  imageBackground: {flex: 1, padding: 20},
  btnContainer: {
    flex: 1,
    padding: 20,
    justifyContent:"flex-end"
  },
  btnSignIn: {
    backgroundColor: '#FDFDFD',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    opacity: 0.7,
    borderWidth: 3,
    borderColor: '#fff',
  },
  textSignIn: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
    opacity: 1,
  },
  btnSignUp: {
    backgroundColor: '#198E52',
    width: '100%',
    padding: 10,
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSignUp: {
    color: '#FDFDFD',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default styles;
