// eslint-disable-next-line import/no-anonymous-default-export
import Grey from "src/graphic/color/grey";

export default {
  dev: {},
  theme: {
    main: {
      work: "#d94d3b",
      orgasme: "#802578"
    },
    bar: {
      top: '#ffffff'
    },
    table: {
      innerLine: Grey.get('200'),
      outLine: Grey.get('400')
    },
    button: {
      default: '#FFFFFF'
    },
    text: {
      default: "black",
      button: {
        default: "#ffffff",
      },
      box: {
        number: Grey.get('400')
      },
      tab: {
        active: "#495057",
        inactive: "#5A646E",
        disabled: "#6c757d"
      }
    },
    screen: {
      background: '#FFFFFF'
    }
  }
};
