import "./chunk-DC5AMYBS.js";

// node_modules/.deno/typesafe-actions@5.1.0/node_modules/typesafe-actions/dist/typesafe-actions.es.production.js
function n(n2) {
  return null == n2;
}
function t(n2) {
  throw new Error("Argument " + n2 + " is empty.");
}
function r(n2) {
  return "function" == typeof n2 && "getType" in n2;
}
function e(n2) {
  throw new Error("Argument " + n2 + ' is invalid, it should be an action-creator instance from "typesafe-actions"');
}
function i(n2, t2) {
  if (null == n2) throw new Error("Argument contains array with empty element at index " + t2);
  if (null == n2.getType) throw new Error("Argument contains array with invalid element at index " + t2 + ', it should be an action-creator instance from "typesafe-actions"');
}
function o(n2) {
  return "string" == typeof n2 || "symbol" == typeof n2;
}
function u(n2) {
  return !o(n2);
}
function a(n2) {
  throw new Error("Argument " + n2 + " is invalid, it should be an action type of type: string | symbol");
}
function c(n2, t2) {
  if (null == n2) throw new Error("Argument contains array with empty element at index " + t2);
  if ("string" != typeof n2 && "symbol" != typeof n2) throw new Error("Argument contains array with invalid element at index " + t2 + ", it should be of type: string | symbol");
}
function f(r2, i2, o2, a2) {
  return n(r2) && t(1), u(r2) && e(1), { type: r2, payload: i2, meta: o2, error: a2 };
}
function s(r2, e2) {
  n(r2) && t(1), u(r2) && a(1);
  return Object.assign(function() {
    var n2 = null != e2 ? e2.apply(void 0, arguments) : void 0;
    return Object.assign({ type: r2 }, n2);
  }, { getType: function() {
    return r2;
  }, toString: function() {
    return r2;
  } });
}
function y(r2, e2, i2) {
  return n(r2) && t(1), u(r2) && a(1), function() {
    return s(r2, function() {
      var n2 = arguments.length <= 0 ? void 0 : arguments[0], t2 = arguments.length <= 1 ? void 0 : arguments[1];
      return null == e2 && null == i2 || (n2 = null != e2 ? e2.apply(void 0, arguments) : void 0, t2 = null != i2 ? i2.apply(void 0, arguments) : void 0), Object.assign({}, void 0 !== n2 && { payload: n2 }, {}, void 0 !== t2 && { meta: t2 });
    });
  };
}
function l(n2, t2, r2, e2) {
  return function() {
    var i2 = [n2, t2, r2, e2].map(function(n3, t3) {
      return Array.isArray(n3) ? y(n3[0], n3[1], n3[2])() : "string" == typeof n3 || "symbol" == typeof n3 ? y(n3)() : void (t3 < 3 && function(n4) {
        throw new Error("Argument " + n4 + ' is invalid, it should be an action type of "string | symbol" or a tuple of "[string | symbol, Function, Function?]"');
      }(t3));
    });
    return { request: i2[0], success: i2[1], failure: i2[2], cancel: i2[3] };
  };
}
function p(i2) {
  return n(i2) && t(1), r(i2) || e(1), i2.getType();
}
function d(n2, t2) {
  void 0 === t2 && (t2 = {});
  var e2 = Object.assign({}, t2), i2 = function(t3, i3) {
    var u2 = Array.isArray(t3) ? t3 : [t3], a2 = {};
    return u2.map(function(n3, t4) {
      return r(n3) ? p(n3) : o(n3) ? n3 : function(n4) {
        throw new Error("Argument " + n4 + ' is invalid, it should be an action-creator instance from "typesafe-actions" or action type of type: string | symbol');
      }(t4 + 1);
    }).forEach(function(n3) {
      return a2[n3] = i3;
    }), d(n2, Object.assign({}, e2, {}, a2));
  };
  return Object.assign(function(t3, r2) {
    if (void 0 === t3 && (t3 = n2), e2.hasOwnProperty(r2.type)) {
      var i3 = e2[r2.type];
      if ("function" != typeof i3) throw Error('Reducer under "' + r2.type + '" key is not a valid reducer');
      return i3(t3, r2);
    }
    return t3;
  }, { handlers: Object.assign({}, e2), handleAction: i2, handleType: i2 });
}
function g(r2, e2) {
  n(r2) && t(1);
  var i2 = Array.isArray(r2) ? r2 : [r2];
  i2.forEach(c);
  var o2 = function(n2) {
    return i2.includes(n2.type);
  };
  return void 0 === e2 ? o2 : o2(e2);
}
function m(r2, e2) {
  n(r2) && t(1);
  var o2 = Array.isArray(r2) ? r2 : [r2];
  o2.forEach(i);
  var u2 = function(n2) {
    return o2.some(function(t2) {
      return n2.type === t2.getType();
    });
  };
  return void 0 === e2 ? u2 : u2(e2);
}
function v(r2, e2) {
  n(r2) && t(1), u(r2) && a(1);
  var i2 = null != e2 ? e2(r2) : function() {
    return { type: r2 };
  };
  return Object.assign(i2, { getType: function() {
    return r2;
  }, toString: function() {
    return r2;
  } });
}
var h = { createAction: function(n2, t2) {
  var r2 = null == t2 ? function() {
    return f(n2);
  } : t2(f.bind(null, n2));
  return Object.assign(r2, { getType: function() {
    return n2;
  }, toString: function() {
    return n2;
  } });
}, createCustomAction: v, createStandardAction: function(r2) {
  return n(r2) && t(1), u(r2) && a(1), Object.assign(function() {
    return v(r2, function(n2) {
      return function(t2, r3) {
        return { type: n2, payload: t2, meta: r3 };
      };
    });
  }, { map: function(n2) {
    return v(r2, function(t2) {
      return function(r3, e2) {
        return Object.assign(n2(r3, e2), { type: t2 });
      };
    });
  } });
} };
export {
  f as action,
  y as createAction,
  l as createAsyncAction,
  s as createCustomAction,
  d as createReducer,
  h as deprecated,
  p as getType,
  m as isActionOf,
  g as isOfType
};
//# sourceMappingURL=typesafe-actions.js.map
