import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  containerView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    height: 150,
    marginTop: 50,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#198E52',
    textAlign: 'left',
  },
  backText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  explainText: {
    color: '#444262',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 30,
    textAlign: 'left',
  },
  formContainer: {
    height: 330,
    justifyContent: 'space-around',
    paddingTop: 60,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#C1C0C8',
    paddingLeft: 30,
  },
  forgotText: {
    color: 'red',
    fontWeight: '500',
    textAlign: 'left',
  },
  btnLoginContainer: {
    backgroundColor: '#198E52',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#FDFDFD',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
  },
  footerContainer: {
    flex: 2,
    justifyContent: 'space-around',
  },
  orText: {
    width: '100%',
    alignItems: 'center',
  },
  btnGoogle: {
    backgroundColor: '#FDFDFD',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C1C0C8',
    flexDirection: 'row',
  },
  googleLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  googleText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },
  createAccount: {
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'right',
  },
  createAcountText: {
    color: '#198E52',
    fontWeight: '600',
    marginLeft: 10,
    textAlign: 'right',
  },
  errorTextmessage: {color: 'red'},
  inputText: {textAlign: 'left'},
});

export default styles;