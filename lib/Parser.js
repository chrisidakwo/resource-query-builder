"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _qs = _interopRequireDefault(require("qs"));
var Parser = /*#__PURE__*/function () {
  function Parser(query) {
    (0, _classCallCheck2["default"])(this, Parser);
    (0, _defineProperty2["default"])(this, "query", void 0);
    (0, _defineProperty2["default"])(this, "uri", void 0);
    this.query = query;
    this.uri = '';
  }

  // parse the final query string
  (0, _createClass2["default"])(Parser, [{
    key: "parse",
    value: function parse() {
      this.includes();
      this.appends();
      this.fields();
      this.filters();
      this.sorts();
      this.page();
      this.limit();
      this.params();
      return this.uri;
    }
  }, {
    key: "prepend",
    value: function prepend() {
      return this.uri === '' ? '?' : '&';
    }

    /**
     * Parsers
     */
  }, {
    key: "includes",
    value: function includes() {
      if (!(this.query.include.length > 0)) {
        return;
      }
      this.uri += "".concat(this.prepend() + this.query.queryParameters.includes, "=").concat(this.query.include);
    }
  }, {
    key: "appends",
    value: function appends() {
      if (!(this.query.append.length > 0)) {
        return;
      }
      this.uri += "".concat(this.prepend() + this.query.queryParameters.appends, "=").concat(this.query.append);
    }
  }, {
    key: "fields",
    value: function fields() {
      if (!(Object.keys(this.query.fields).length > 0)) {
        return;
      }
      var fields = (0, _defineProperty2["default"])({}, "".concat(this.query.queryParameters.fields, "[").concat(this.query.model, "]"), this.query.fields);
      this.uri += this.prepend() + _qs["default"].stringify(fields, {
        encode: false
      });
    }
  }, {
    key: "filters",
    value: function filters() {
      if (!(Object.keys(this.query.filters).length > 0)) {
        return;
      }
      var filters = (0, _defineProperty2["default"])({}, this.query.queryParameters.filters, this.query.filters);
      this.uri += this.prepend() + _qs["default"].stringify(filters, {
        encode: false
      });
    }
  }, {
    key: "sorts",
    value: function sorts() {
      if (!(this.query.sorts.length > 0)) {
        return;
      }
      this.uri += "".concat(this.prepend() + this.query.queryParameters.sort, "=").concat(this.query.sorts);
    }
  }, {
    key: "page",
    value: function page() {
      if (this.query.pageValue === null) {
        return;
      }
      this.uri += "".concat(this.prepend() + this.query.queryParameters.page, "=").concat(this.query.pageValue);
    }
  }, {
    key: "limit",
    value: function limit() {
      if (this.query.limitValue === null) {
        return;
      }
      this.uri += "".concat(this.prepend() + this.query.queryParameters.limit, "=").concat(this.query.limitValue);
    }
  }, {
    key: "params",
    value: function params() {
      if (this.query.paramsObj === null) {
        return;
      }
      this.uri += this.prepend() + _qs["default"].stringify(this.query.paramsObj, {
        encode: false
      });
    }
  }]);
  return Parser;
}();
exports["default"] = Parser;