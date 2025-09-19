import {
  _extends
} from "./chunk-BE2S24IY.js";
import {
  require_react
} from "./chunk-6BNWFOCU.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/.deno/react-bootstrap@1.6.8/node_modules/react-bootstrap/esm/ThemeProvider.js
var import_react = __toESM(require_react());
var ThemeContext = import_react.default.createContext({});
var Consumer = ThemeContext.Consumer;
var Provider = ThemeContext.Provider;
function ThemeProvider(_ref) {
  var prefixes = _ref.prefixes, children = _ref.children;
  var copiedPrefixes = (0, import_react.useMemo)(function() {
    return _extends({}, prefixes);
  }, [prefixes]);
  return import_react.default.createElement(Provider, {
    value: copiedPrefixes
  }, children);
}
function useBootstrapPrefix(prefix, defaultPrefix) {
  var prefixes = (0, import_react.useContext)(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}
var ThemeProvider_default = ThemeProvider;

export {
  useBootstrapPrefix,
  ThemeProvider_default
};
//# sourceMappingURL=chunk-B7HFHF7T.js.map
