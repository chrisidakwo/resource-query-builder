"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Parser = _interopRequireDefault(require("./Parser"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Query = /*#__PURE__*/function () {
  function Query() {
    var _options$base_url;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Query);
    (0, _defineProperty2["default"])(this, "include", void 0);
    (0, _defineProperty2["default"])(this, "model", void 0);
    (0, _defineProperty2["default"])(this, "base_url", void 0);
    (0, _defineProperty2["default"])(this, "queryParameters", void 0);
    (0, _defineProperty2["default"])(this, "append", void 0);
    (0, _defineProperty2["default"])(this, "sorts", void 0);
    (0, _defineProperty2["default"])(this, "fields", void 0);
    (0, _defineProperty2["default"])(this, "filters", void 0);
    (0, _defineProperty2["default"])(this, "pageValue", void 0);
    (0, _defineProperty2["default"])(this, "limitValue", void 0);
    (0, _defineProperty2["default"])(this, "paramsObj", void 0);
    (0, _defineProperty2["default"])(this, "parser", void 0);
    // the model to execute the query against
    // set by calling .for(model)
    this.model = null;

    // will use base_url if passed in
    this.base_url = (_options$base_url = options.base_url) !== null && _options$base_url !== void 0 ? _options$base_url : '';

    // default filter names
    var defaultFilterNames = {
      filters: 'filter',
      fields: 'fields',
      includes: 'include',
      appends: 'append',
      page: 'page',
      limit: 'limit',
      sort: 'sort'
    };
    this.queryParameters = options.queryParameters ? _objectSpread(_objectSpread({}, defaultFilterNames), options.queryParameters) : defaultFilterNames;

    // initialise variables to hold
    // the urls data
    this.include = [];
    this.append = [];
    this.sorts = [];
    this.fields = {};
    this.filters = {};
    this.pageValue = null;
    this.limitValue = null;
    this.paramsObj = null;
    this.parser = new _Parser["default"](this);
  }

  /**
   * Set the model for the query
   *
   * @param {string} model
   */
  (0, _createClass2["default"])(Query, [{
    key: "for",
    value: function _for(model) {
      this.model = model;
      return this;
    }

    /**
     * Return the parsed url
     */
  }, {
    key: "get",
    value: function get() {
      // generate the url
      var url = this.base_url + this.parseQuery();

      // reset the url so the query object can be re-used
      this.reset();
      return url;
    }
  }, {
    key: "url",
    value: function url() {
      return this.get();
    }
  }, {
    key: "reset",
    value: function reset() {
      // reset the uri
      this.parser.uri = '';
    }
  }, {
    key: "parseQuery",
    value: function parseQuery() {
      if (this.model) {
        return "/".concat(this.model).concat(this.parser.parse());
      }
      return "".concat(this.parser.parse());
    }

    /**
     * Query builder
     */
  }, {
    key: "includes",
    value: function includes() {
      for (var _len = arguments.length, include = new Array(_len), _key = 0; _key < _len; _key++) {
        include[_key] = arguments[_key];
      }
      if (!include.length) {
        throw new Error("The ".concat(this.queryParameters.includes, "s() function takes at least one argument."));
      }
      this.include = include;
      return this;
    }
  }, {
    key: "appends",
    value: function appends() {
      for (var _len2 = arguments.length, append = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        append[_key2] = arguments[_key2];
      }
      if (!append.length) {
        throw new Error("The ".concat(this.queryParameters.appends, "s() function takes at least one argument."));
      }
      this.append = append;
      return this;
    }
  }, {
    key: "select",
    value: function select(fields) {
      var _this = this;
      if (!fields.length) {
        throw new Error("The ".concat(this.queryParameters.fields, "() function takes a single argument of a valid array."));
      }

      // single entity .fields(['age', 'firstname'])
      if (Array.isArray(fields)) {
        this.fields = fields.join(',');
      } else {
        // related entities .fields({ posts: ['title', 'content'], user: ['age', 'firstname']} )
        Object.entries(fields).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          _this.fields = _objectSpread(_objectSpread({}, _this.fields), {}, (0, _defineProperty2["default"])({}, key, value.join(',')));
        });
      }
      return this;
    }
  }, {
    key: "where",
    value: function where(key, value) {
      this.filters[key] = value;
      return this;
    }
  }, {
    key: "whereIn",
    value: function whereIn(key, array) {
      if (!key || !array) {
        throw new Error('The whereIn() function takes 2 arguments of (string, array).');
      }
      if (!key && Array.isArray(key) || (0, _typeof2["default"])(key) === 'object') {
        throw new Error('The first argument for the whereIn() function must be a string or integer.');
      }
      if (!Array.isArray(array)) {
        throw new Error('The second argument for the whereIn() function must be an array.');
      }
      this.filters[key] = array.join(',');
      return this;
    }
  }, {
    key: "sort",
    value: function sort() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this.sorts = args;
      return this;
    }
  }, {
    key: "page",
    value: function page(value) {
      if (!Number.isInteger(value)) {
        throw new Error('The page() function takes a single argument of a number');
      }
      this.pageValue = value;
      return this;
    }
  }, {
    key: "limit",
    value: function limit(value) {
      if (!Number.isInteger(value)) {
        throw new Error('The limit() function takes a single argument of a number.');
      }
      this.limitValue = value;
      return this;
    }
  }, {
    key: "params",
    value: function params(_params) {
      if (_params.constructor !== Object) {
        throw new Error('The params() function takes a single argument of an object.');
      }
      this.paramsObj = _params;
      return this;
    }
  }]);
  return Query;
}();
exports["default"] = Query;