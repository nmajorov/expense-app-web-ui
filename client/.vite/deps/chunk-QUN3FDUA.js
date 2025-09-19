import {
  useBootstrapPrefix
} from "./chunk-B7HFHF7T.js";
import {
  require_classnames
} from "./chunk-MIU52A3V.js";
import {
  require_prop_types
} from "./chunk-I5SWOFQ3.js";
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

// node_modules/.deno/react-bootstrap@1.6.8/node_modules/react-bootstrap/esm/ModalHeader.js
var import_classnames2 = __toESM(require_classnames());
var import_react5 = __toESM(require_react());

// node_modules/.deno/@restart+hooks@0.4.16/node_modules/@restart/hooks/esm/useEventCallback.js
var import_react2 = __toESM(require_react());

// node_modules/.deno/@restart+hooks@0.4.16/node_modules/@restart/hooks/esm/useCommittedRef.js
var import_react = __toESM(require_react());
function useCommittedRef(value) {
  const ref = (0, import_react.useRef)(value);
  (0, import_react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
var useCommittedRef_default = useCommittedRef;

// node_modules/.deno/@restart+hooks@0.4.16/node_modules/@restart/hooks/esm/useEventCallback.js
function useEventCallback(fn) {
  const ref = useCommittedRef_default(fn);
  return (0, import_react2.useCallback)(function(...args) {
    return ref.current && ref.current(...args);
  }, [ref]);
}

// node_modules/.deno/react-bootstrap@1.6.8/node_modules/react-bootstrap/esm/CloseButton.js
var import_prop_types = __toESM(require_prop_types());
var import_react3 = __toESM(require_react());
var import_classnames = __toESM(require_classnames());
var _excluded = ["label", "onClick", "className"];
var propTypes = {
  label: import_prop_types.default.string.isRequired,
  onClick: import_prop_types.default.func
};
var defaultProps = {
  label: "Close"
};
var CloseButton = import_react3.default.forwardRef(function(_ref, ref) {
  var label = _ref.label, onClick = _ref.onClick, className = _ref.className, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return import_react3.default.createElement("button", _extends({
    ref,
    type: "button",
    className: (0, import_classnames.default)("close", className),
    onClick
  }, props), import_react3.default.createElement("span", {
    "aria-hidden": "true"
  }, "×"), import_react3.default.createElement("span", {
    className: "sr-only"
  }, label));
});
CloseButton.displayName = "CloseButton";
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;
var CloseButton_default = CloseButton;

// node_modules/.deno/react-bootstrap@1.6.8/node_modules/react-bootstrap/esm/ModalContext.js
var import_react4 = __toESM(require_react());
var ModalContext = import_react4.default.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide: function onHide() {
  }
});
var ModalContext_default = ModalContext;

// node_modules/.deno/react-bootstrap@1.6.8/node_modules/react-bootstrap/esm/ModalHeader.js
var _excluded2 = ["bsPrefix", "closeLabel", "closeButton", "onHide", "className", "children"];
var defaultProps2 = {
  closeLabel: "Close",
  closeButton: false
};
var ModalHeader = import_react5.default.forwardRef(function(_ref, ref) {
  var bsPrefix = _ref.bsPrefix, closeLabel = _ref.closeLabel, closeButton = _ref.closeButton, onHide2 = _ref.onHide, className = _ref.className, children = _ref.children, props = _objectWithoutPropertiesLoose(_ref, _excluded2);
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-header");
  var context = (0, import_react5.useContext)(ModalContext_default);
  var handleClick = useEventCallback(function() {
    if (context) context.onHide();
    if (onHide2) onHide2();
  });
  return import_react5.default.createElement("div", _extends({
    ref
  }, props, {
    className: (0, import_classnames2.default)(className, bsPrefix)
  }), children, closeButton && import_react5.default.createElement(CloseButton_default, {
    label: closeLabel,
    onClick: handleClick
  }));
});
ModalHeader.displayName = "ModalHeader";
ModalHeader.defaultProps = defaultProps2;
var ModalHeader_default = ModalHeader;

export {
  useCommittedRef_default,
  useEventCallback,
  CloseButton_default,
  ModalContext_default,
  ModalHeader_default
};
//# sourceMappingURL=chunk-QUN3FDUA.js.map
