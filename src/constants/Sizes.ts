// eslint-disable-next-line import/no-anonymous-default-export
import Pixel from "src/graphic/size/pixel";

export default {
  layout: {
    bar: {
      top: new Pixel(80),
    }
  },
  components: {
    bar: {
      logo: {
        height: new Pixel(70),
        width: new Pixel(70),
      }
    }
  }
};
