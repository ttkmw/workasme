// eslint-disable-next-line import/no-anonymous-default-export
import Grey from "src/graphic/color/grey";

const Colors = {
  dev: {},
  theme: {
    main: {
      work: "#d94d3b",
      workTimeBlock: "#FFF1C1",
      orgasme: "#802578",
      orgasmTimeBLock: "#EAE7AF"
    },
    form: {
      border: {
        default: "#ced4da"
      }
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
    navigator: {
      default: "#d94d3b"
    },
    text: {
      default: "black",
      soft: Grey.get('800'),
      white: "#ffffff",
      button: {
        default: "#ffffff",
      },
      box: {
        default: Grey.get('400')
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

export default Colors;
