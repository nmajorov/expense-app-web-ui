import {
  useBootstrapPrefix
} from "./chunk-B7HFHF7T.js";
import {
  require_classnames
} from "./chunk-MIU52A3V.js";
import {
  _extends,
  _objectWithoutPropertiesLoose
} from "./chunk-BE2S24IY.js";
import {
  require_react
} from "./chunk-6BNWFOCU.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/.deno/react-bootstrap@1.6.8/node_modules/react-bootstrap/esm/Table.js
var import_classnames = __toESM(require_classnames());
var import_react = __toESM(require_react());
var _excluded = ["bsPrefix", "className", "striped", "bordered", "borderless", "hover", "size", "variant", "responsive"];
var Table = import_react.default.forwardRef(function(_ref, ref) {
  var bsPrefix = _ref.bsPrefix, className = _ref.className, striped = _ref.striped, bordered = _ref.bordered, borderless = _ref.borderless, hover = _ref.hover, size = _ref.size, variant = _ref.variant, responsive = _ref.responsive, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "table");
  var classes = (0, import_classnames.default)(className, decoratedBsPrefix, variant && decoratedBsPrefix + "-" + variant, size && decoratedBsPrefix + "-" + size, striped && decoratedBsPrefix + "-striped", bordered && decoratedBsPrefix + "-bordered", borderless && decoratedBsPrefix + "-borderless", hover && decoratedBsPrefix + "-hover");
  var table = import_react.default.createElement("table", _extends({}, props, {
    className: classes,
    ref
  }));
  if (responsive) {
    var responsiveClass = decoratedBsPrefix + "-responsive";
    if (typeof responsive === "string") {
      responsiveClass = responsiveClass + "-" + responsive;
    }
    return import_react.default.createElement("div", {
      className: responsiveClass
    }, table);
  }
  return table;
});
var Table_default = Table;

export {
  Table_default
};
//# sourceMappingURL=chunk-AWNW2TEK.js.map
