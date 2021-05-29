// eslint-disable-next-line import/no-anonymous-default-export
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";

const LOGO_HEIGHT_PER_WIDTH: Percentage = new Percentage(17.1);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  layout: {
    bar: {
      top: new Pixel(80),
    }
  },
  components: {
    bar: {
      logo: {
        width: new Pixel(120),
        height: new Pixel(120).multiply(LOGO_HEIGHT_PER_WIDTH),

      }
    }
  }
};
