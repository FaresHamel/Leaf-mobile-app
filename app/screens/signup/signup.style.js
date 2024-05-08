import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  header: {
    height: 150,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerWelcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#198E52',
    marginLeft: -10,
  },
  headerDescriptionText: {
    color: '#444262',
    fontSize: 16,
    marginTop: 30,
  },
  formContainer: {
    height: 330,
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  footer: {
    height: 220,
    justifyContent: 'space-around',
  },
  singupGoogle: {
    backgroundColor: '#FDFDFD',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C1C0C8',
    flexDirection: 'row',
  },
  googleIcon: {width: 30, height: 30, marginRight: 10},
  googleText: {color: '#000000', fontSize: 16, fontWeight: '500'},
  anotherAcountText: {
    marginTop: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signInText: {color: '#198E52', fontWeight: '600', marginLeft: 10},
  createAcountText: {
    color: '#FDFDFD',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  createAcountBotton: {
    backgroundColor: '#198E52',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {width: '100%', alignItems: 'center'},
  inputContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#C1C0C8',
    paddingLeft: 30,
  },
  alertDimmention: {width: 170, height: 120},
  textInputStyle: {textAlign: 'left'},
  errorText: {color: 'red'},
});

export default styles;
