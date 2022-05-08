const ProximaNovaBold = {
  fontFamily: 'ProximaNova-Bold',
  fontWeight: '500'
};

const ProximaNovaRegular = {
  fontFamily: 'ProximaNova-Regular',
  fontWeight: '400'
};

const ProximaNovaLight = {
  fontFamily: 'ProximaNovaA-Light',
  fontWeight: '300'
};

const ProximaNova = {
  light: ProximaNovaLight,
  medium: ProximaNovaBold,
  regular: ProximaNovaRegular,
  thin: ProximaNovaLight
};

const fontConfig = {
  web: ProximaNova,
  ios: ProximaNova,
  android: ProximaNova
};

export default fontConfig;
