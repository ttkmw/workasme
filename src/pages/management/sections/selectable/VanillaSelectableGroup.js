"use strict";
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return { alias: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    }
    finally { if (e) throw e.error; }
  }
  return ar;
};
var __spread = (this && this.__spread) || function () {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
};
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

const exports = {};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));



const VanillaSelectableGroup = (function (_super) {
  __extends(VanillaSelectableGroup, _super)
  function VanillaSelectableGroup() {
    const _this = _super !== null && _super.apply(this, arguments) || this;
    _this.mouseDown = function (e) {
      console.log("vanilla selectable group mouse down!")
    }
    _this.vanillaSelectableGroup = null;
    _this.getGroupRef = function (ref) {
      _this.vanillaSelectableGroup = ref;
    }
  }


  VanillaSelectableGroup.prototype.componentDidMount = () => {
    this.vanillaSelectableGroup.addEventListener('mousedown', this.mouseDown)
  }

  VanillaSelectableGroup.prototype.render = function () {
    return (react_1.default.createElement(<div>haha</div>))
  }

  return VanillaSelectableGroup
}(react_1.Component))
exports.VanillaSelectableGroup = VanillaSelectableGroup;

export default VanillaSelectableGroup;
