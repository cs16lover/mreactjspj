/*global self*/
/*eslint no-restricted-globals: ["off", "self"]*/
/*eslint no-undef: "off"*/

//Hello MJS edit from underscore
//28/6/2018
//17/8/2018
//28/8/2018 add xor string

(function() {
  var root =
    //////eslint-disable-next-line
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global) ||
    this ||
    {};
  var M = function(obj) {
    if (obj instanceof M) return obj;
    if (!(this instanceof M)) return new M(obj);
    this._wrapped = obj;
  };

  //export
  if (typeof exports != "undefined" && !exports.nodeType) {
    if (typeof module != "undefined" && !module.nodeType && module.exports) {
      exports = module.exports = M;
    }
    exports.M = M;
  } else {
    root.M = M;
  }

  // Current version.
  M.VERSION = "1.0.5";

  /*
  - - - - - - - - - - - - - - - - - Start Content - - - - - - - - - - - - - - - - -
  */
  var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== "undefined" ? Symbol.prototype : null;
  var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;
  var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeCreate = Object.create;

  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1:
        return function(value) {
          return func.call(context, value);
        };
      // The 2-argument case is omitted because we’re not using it.
      case 3:
        return function(value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function(accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };
  var builtinIteratee;
  var cb = function(value, context, argCount) {
    if (M.iteratee !== builtinIteratee) return M.iteratee(value, context);
    if (value == null) return M.identity;
    if (M.isFunction(value)) return optimizeCb(value, context, argCount);
    if (M.isObject(value) && !M.isArray(value)) return M.matcher(value);
    return M.property(value);
  };
  M.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };
  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty("length");
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return (
      typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX
    );
  };
  M.each = M.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = M.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  /* Objects*/
  M.keys = function(obj) {
    if (!M.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (M.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };
  M.allKeys = function(obj) {
    if (!M.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };
  M.values = function(obj) {
    var keys = M.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };
  M.property = function(path) {
    if (!M.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };

  // Generates a function for a given object that returns a given property.
  M.propertyOf = function(obj) {
    if (obj == null) {
      return function() {};
    }
    return function(path) {
      return !M.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };
  M.getObjWithPath = function(obj, path, defaultValue) {
    var p = M.property(path);
    return p(obj) || defaultValue;
  };
  M.arrayObj2ObjWithKey = function(arr, keyField) {
    var rv = {};
    if (arr != null) {
      for (var i = 0; i < arr.length; i++) {
        var _vf = arr[i][keyField] || i;
        rv[_vf] = arr[i];
      }
    } else {
      console.log("arrayObj2ObjWithKey: arr null");
    }

    return rv;
  };
  M.getObjInArrObjWithValue = function(arr, field, value) {
    if (arr != null) {
      return arr.find(function(e) {
        return e[field] == value;
      });
    }
  };
  M.getObjOfObjInArrObjWithValue = function(arr, field, value, fieldNeed) {
    var _obj = M.getObjInArrObjWithValue(arr, field, value);
    if (_obj != null) {
      return _obj[fieldNeed];
    }
  };

  /*- - - - - - - - - - - - - - - - - Utils */
  M.toggleItemInArray = function(collection, item) {
    var idx = collection.indexOf(item);
    if (idx !== -1) {
      collection.splice(idx, 1);
    } else {
      collection.push(item);
    }
  };
  M.isEmpty = function(obj) {
    if (obj == null) return true;
    if (
      isArrayLike(obj) &&
      (M.isArray(obj) || M.isString(obj) || M.isArguments(obj))
    )
      return obj.length === 0;
    return M.keys(obj).length === 0;
  };
  M.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };
  M.isArray =
    nativeIsArray ||
    function(obj) {
      return toString.call(obj) === "[object Array]";
    };
  M.isObject = function(obj) {
    var type = typeof obj;
    return type === "function" || (type === "object" && !!obj);
  };
  M.each(
    [
      "Arguments",
      "Function",
      "String",
      "Number",
      "Date",
      "RegExp",
      "Error",
      "Symbol",
      "Map",
      "WeakMap",
      "Set",
      "WeakSet"
    ],
    function(name) {
      M["is" + name] = function(obj) {
        return toString.call(obj) === "[object " + name + "]";
      };
    }
  );
  if (!M.isArguments(arguments)) {
    M.isArguments = function(obj) {
      return M.has(obj, "callee");
    };
  }
  var nodelist = root.document && root.document.childNodes;
  if (
    typeof /./ != "function" &&
    typeof Int8Array != "object" &&
    typeof nodelist != "function"
  ) {
    M.isFunction = function(obj) {
      return typeof obj == "function" || false;
    };
  }
  M.isFinite = function(obj) {
    return !M.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };
  M.isNaN = function(obj) {
    return M.isNumber(obj) && isNaN(obj);
  };
  M.isBoolean = function(obj) {
    return (
      obj === true || obj === false || toString.call(obj) === "[object Boolean]"
    );
  };
  M.isNull = function(obj) {
    return obj === null;
  };
  M.isUndefined = function(obj) {
    return obj === void 0;
  };

  M.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };
  M.randomString = function(numberOfChar) {
    return Math.random()
      .toString(36)
      .substr(2, numberOfChar);
  };
  M.randomColor = function() {
    return (
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8)
    );
    //     return '#'+'0123456789abcdef'.split('').map(function(v,i,a){
    //     return i>5 ? null : a[Math.floor(Math.random()*16)]; }).join('');
  };
  M.xorCrypt = function(str, key) {
    var output = "";
    if (!key) {
      key = 6;
    }
    for (var i = 0; i < str.length; ++i) {
      output += String.fromCharCode(key ^ str.charCodeAt(i));
    }
    return output;
  };

  /*- - - - - - - - - - - - - - - - - Helper */
  M.Web = {
    Position: {
      getCurrentPosY() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
          return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
      },
      getPosYOfElement(eID) {
        var elm = document.getElementById(eID);
        if (elm) {
          var y = elm.offsetTop;
          var node = elm;
          while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
          }
          return y;
        }
        return null;
      },
      smoothScrollToPosY(startY, stopY) {
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
          scrollTo(0, stopY);
          return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
          for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
          }
          return;
        }
        for (var i = startY; i > stopY; i -= step) {
          setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
          leapY -= step;
          if (leapY < stopY) leapY = stopY;
          timer++;
        }
      },
      smoothScrollToElement(eID) {
        var startY = M.Web.Position.getCurrentPosY();
        var stopY = M.Web.Position.getPosYOfElement(eID);
        if (stopY) {
          M.Web.Position.smoothScrollToPosY(startY, stopY);
        }
      }
    }
  };

  /*- - - - - - - - - - - - - - - - - LocalStorage */
  M.LocalStorage = {
    getString(key, defaultValue) {
      return localStorage.getItem(key) || defaultValue;
    },
    getObject(key, defaultValue) {
      let _s = this.getString(key);
      if (_s != null) {
        try {
          let _obj = JSON.parse(_s);
          return _obj;
        } catch (error) {
          console.log("LocalStore getObject failed:", _s, error);
        }
      }
      return defaultValue;
    },
    setString(key, string) {
      if (key != null && string != null) {
        localStorage.setItem(key, string);
      } else {
        console.log("LocalStore setString failed:", key, string);
      }
    },
    setObject(key, obj) {
      if (key != null && obj != null) {
        let _s = JSON.stringify(obj);
        localStorage.setItem(key, _s);
      } else {
        console.log("LocalStore setObject failed:", key, obj);
      }
    }
  };

  /*- - - - - - - - - - - - - - - - - Matcher */
  var matcher = (function() {
    var CSS_INTEGER = "[-\\+]?\\d+%?";
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
    var PERMISSIVE_MATCH3 =
      "[\\s|\\(]+(" +
      CSS_UNIT +
      ")[,|\\s]+(" +
      CSS_UNIT +
      ")[,|\\s]+(" +
      CSS_UNIT +
      ")\\s*\\)?";
    var PERMISSIVE_MATCH4 =
      "[\\s|\\(]+(" +
      CSS_UNIT +
      ")[,|\\s]+(" +
      CSS_UNIT +
      ")[,|\\s]+(" +
      CSS_UNIT +
      ")[,|\\s]+(" +
      CSS_UNIT +
      ")\\s*\\)?";

    return {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      extSquareBracket: /\[(.[^\]]*)\]/gm
    };
  })();

  /*- - - - - - - - - - - - - - - - - Valid */
  M.Valid = {};

  /*- - - - - - - - - - - - - - - - - Color */
  var mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;
  function stringInputToObject(color) {}
  function isValidHexColor(hexString) {
    var isOk = /^#[0-9A-F]{6}$/i.test(hexString);
    return isOk;
  }
  function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1,
      s = null,
      v = null,
      l = null,
      ok = false;
    if (typeof color == "string") {
      // color = stringInputToObject(color);
      ok = isValidHexColor(color);
      if (ok == true) {
        var rgbInt = parseInt(color.substring(1), 16);
        rgb.r = (rgbInt >> 16) & 0xff; // extract red
        rgb.g = (rgbInt >> 8) & 0xff; // extract green
        rgb.b = (rgbInt >> 0) & 0xff; // extract blue
      }
    }
    return {
      ok: ok,
      r: mathMin(255, mathMax(rgb.r, 0)),
      g: mathMin(255, mathMax(rgb.g, 0)),
      b: mathMin(255, mathMax(rgb.b, 0)),
      a: a
    };
  }

  M.Color = function(color, opts) {
    color = color ? color : "";
    opts = opts || {};

    if (!(this instanceof M.Color)) {
      return new M.Color(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color;
    this._r = rgb.r;
    this._g = rgb.g;
    this._b = rgb.b;
    this._a = rgb.a;
    this._ok = rgb.ok;
  };

  M.Color.prototype = {
    getBrightness: function() {
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLumina: function() {
      return 0.2126 * this._r + 0.7152 * this._g + 0.0722 * this._b;
    },
    getTextWB: function({ light = "#000000", dark = "#ffffff" } = {}) {
      let _l = light;
      let _d = dark;
      return this.isLight() == true ? _l : _d;
    },
    toRgb: function() {
      return {
        r: mathRound(this._r),
        g: mathRound(this._g),
        b: mathRound(this._b),
        a: this._a
      };
    },
    isValid: function() {
      return this._ok;
    },
    isDark: function() {
      return this.getBrightness() < 128;
    },
    isLight: function() {
      return !this.isDark();
    }
  };
  /*- - - - - - - - - - - - - - - - - Extract */
  M.SquareBracket = {
    extract: function(s) {
      var _result = [];
      if (s != null) {
        var _m;
        while ((_m = matcher.extSquareBracket.exec(s)) !== null) {
          if (_m.index === matcher.lastIndex) {
            matcher.lastIndex++;
          }
          if (_m.length > 1) {
            _result.push(_m[1]);
          }
        }
      }
      return _result;
    },
    replace: function(s, obj) {
      var extract = M.SquareBracket.extract(s);
      var newS = s;
      if (extract != null) {
        for (var _item of extract) {
          if (obj[_item] != null) {
            var rg = new RegExp(`\\[${_item}\\]`, "g");
            newS = newS.replace(rg, obj[_item]);
          }
        }
      }
      return newS;
    }
  };
  M.extractTextInSquareBracket = function(s) {
    M.logWarningOldFunction(
      "extractTextInSquareBracket",
      "M.SquareBracket.extract(s)"
    );
    return M.SquareBracket.extract(s);
  };

  /*- - - - - - - - - - - - - - - - - Currency */
  M.Currency_thousandSeparator = function(x, sepChar = ".", sepCount = 3) {
    var regex = new RegExp("\\B(?=(\\d{" + sepCount + "})+(?!\\d))", "g");
    // console.log(regex);
    return x.toString().replace(regex, sepChar);
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  function Currency_getDigitsFromValue(value = "") {
    return value.replace(/(-(?!\d))|[^0-9|-]/g, "") || "";
  }
  function Currency_padDigits(digits) {
    const desiredLength = 3;
    const actualLength = digits.length;

    if (actualLength >= desiredLength) {
      return digits;
    }

    const amountToAdd = desiredLength - actualLength;
    const padding = "0".repeat(amountToAdd);

    return padding + digits;
  }
  function Currency_removeLeadingZeros(number) {
    return number.replace(/^0+([0-9]+)/, "$1");
  }
  function Currency_addDecimalToNumber(number) {
    const centsStartingPosition = number.length - 2;
    const dollars = Currency_removeLeadingZeros(
      number.substring(0, centsStartingPosition)
    );
    const cents = number.substring(centsStartingPosition);
    return `${dollars}.${cents}`;
  }
  M.Currency_toCurrency = function(value) {
    const digits = Currency_getDigitsFromValue(value);
    const digitsWithPadding = Currency_padDigits(digits);
    return Currency_addDecimalToNumber(digitsWithPadding);
  };

  /*- - - - - - - - - - - - - - - - - Pattern */
  var ESCAPE_CHAR = "\\";
  var ONLY_NUMBER = /^\d*$/;
  var DIGIT_RE = /^\d$/;
  var LETTER_RE = /^[A-Za-z]$/;
  var ALPHANNUMERIC_RE = /^[\dA-Za-z]$/;
  var DEFAULT_PLACEHOLDER_CHAR = "_";
  var DEFAULT_FORMAT_CHARACTERS = {
    "*": {
      validate: function(char) {
        return ALPHANNUMERIC_RE.test(char);
      }
    },
    "1": {
      validate: function(char) {
        return DIGIT_RE.test(char);
      }
    },
    a: {
      validate: function(char) {
        return LETTER_RE.test(char);
      }
    },
    c: {
      validate: function(char) {
        // console.log("validate char:", char);
        return ONLY_NUMBER.test(char);
      },
      transform: function(char) {
        // console.log("transform char:", char);
        char = M.Currency_thousandSeparator(char);
        return char;
      }
    },
    A: {
      validate: function(char) {
        return LETTER_RE.test(char);
      },
      transform: function(char) {
        return char.toUpperCase();
      }
    },
    "#": {
      validate: function(char) {
        return ALPHANNUMERIC_RE.test(char);
      },
      transform: function(char) {
        return char.toUpperCase();
      }
    }
  };

  M.Pattern = function(
    source,
    formatCharacters,
    placeholderChar,
    isRevealingMask
  ) {
    if (!(this instanceof M.Pattern)) {
      return new M.Pattern(source, formatCharacters, placeholderChar);
    }

    /** Placeholder character */
    this.placeholderChar = placeholderChar || DEFAULT_PLACEHOLDER_CHAR;
    /** Format character definitions. */
    this.formatCharacters = formatCharacters || DEFAULT_FORMAT_CHARACTERS;
    /** Pattern definition string with escape characters. */
    this.source = source;
    /** Pattern characters after escape characters have been processed. */
    this.pattern = [];
    /** Length of the pattern after escape characters have been processed. */
    this.length = 0;
    /** Index of the first editable character. */
    this.firstEditableIndex = null;
    /** Index of the last editable character. */
    this.lastEditableIndex = null;
    /** Lookup for indices of editable characters in the pattern. */
    this._editableIndices = {};
    /** If true, only the pattern before the last valid value character shows. */
    this.isRevealingMask = isRevealingMask || false;

    this._parse();
  };
  M.Pattern.prototype._parse = function parse() {
    var sourceChars = this.source.split("");
    var patternIndex = 0;
    var pattern = [];

    for (var i = 0, l = sourceChars.length; i < l; i++) {
      var char = sourceChars[i];
      if (char === ESCAPE_CHAR) {
        if (i === l - 1) {
          throw new Error("InputMask: pattern ends with a raw " + ESCAPE_CHAR);
        }
        char = sourceChars[++i];
      } else if (char in this.formatCharacters) {
        if (this.firstEditableIndex === null) {
          this.firstEditableIndex = patternIndex;
        }
        this.lastEditableIndex = patternIndex;
        this._editableIndices[patternIndex] = true;
      }

      pattern.push(char);
      patternIndex++;
    }

    if (this.firstEditableIndex === null) {
      throw new Error(
        'InputMask: pattern "' +
          this.source +
          '" does not contain any editable characters.'
      );
    }

    this.pattern = pattern;
    this.length = pattern.length;
  };

  /**
   * @param {Array<string>} value
   * @return {Array<string>}
   */
  M.Pattern.prototype.formatValue = function format(value) {
    var valueBuffer = new Array(this.length);
    var valueIndex = 0;

    for (var i = 0, l = this.length; i < l; i++) {
      if (this.isEditableIndex(i)) {
        if (
          this.isRevealingMask &&
          value.length <= valueIndex &&
          !this.isValidAtIndex(value[valueIndex], i)
        ) {
          break;
        }
        valueBuffer[i] =
          value.length > valueIndex && this.isValidAtIndex(value[valueIndex], i)
            ? this.transform(value[valueIndex], i)
            : this.placeholderChar;
        valueIndex++;
      } else {
        valueBuffer[i] = this.pattern[i];
        // Also allow the value to contain static values from the pattern by
        // advancing its index.
        if (
          value.length > valueIndex &&
          value[valueIndex] === this.pattern[i]
        ) {
          valueIndex++;
        }
      }
    }

    return valueBuffer;
  };

  /**
   * @param {number} index
   * @return {boolean}
   */
  M.Pattern.prototype.isEditableIndex = function isEditableIndex(index) {
    return !!this._editableIndices[index];
  };

  /**
   * @param {string} char
   * @param {number} index
   * @return {boolean}
   */
  M.Pattern.prototype.isValidAtIndex = function isValidAtIndex(char, index) {
    return this.formatCharacters[this.pattern[index]].validate(char);
  };

  M.Pattern.prototype.transform = function transform(char, index) {
    var format = this.formatCharacters[this.pattern[index]];
    return typeof format.transform == "function"
      ? format.transform(char)
      : char;
  };
  /*- - - - - - - - - - - - - - - - - InputMask */
  function InputMask_extend(dest, src) {
    if (src) {
      var props = Object.keys(src);
      for (var i = 0, l = props.length; i < l; i++) {
        dest[props[i]] = src[props[i]];
      }
    }
    return dest;
  }

  function InputMask_copy(obj) {
    return InputMask_extend({}, obj);
  }

  function InputMask_mergeFormatCharacters(formatCharacters) {
    var merged = InputMask_copy(DEFAULT_FORMAT_CHARACTERS);
    if (formatCharacters) {
      var chars = Object.keys(formatCharacters);
      for (var i = 0, l = chars.length; i < l; i++) {
        var char = chars[i];
        if (formatCharacters[char] == null) {
          delete merged[char];
        } else {
          merged[char] = formatCharacters[char];
        }
      }
    }
    return merged;
  }

  M.InputMask = function(options) {
    if (!(this instanceof M.InputMask)) {
      return new M.InputMask(options);
    }
    options = InputMask_extend(
      {
        formatCharacters: null,
        pattern: null,
        isRevealingMask: false,
        placeholderChar: DEFAULT_PLACEHOLDER_CHAR,
        selection: { start: 0, end: 0 },
        value: ""
      },
      options
    );

    if (options.pattern == null) {
      throw new Error("InputMask: you must provide a pattern.");
    }

    if (
      typeof options.placeholderChar !== "string" ||
      options.placeholderChar.length > 1
    ) {
      throw new Error(
        "InputMask: placeholderChar should be a single character or an empty string."
      );
    }

    this.placeholderChar = options.placeholderChar;
    this.formatCharacters = InputMask_mergeFormatCharacters(
      options.formatCharacters
    );
    this.setPattern(options.pattern, {
      value: options.value,
      selection: options.selection,
      isRevealingMask: options.isRevealingMask
    });
  };
  M.InputMask.prototype.input = function input(char) {
    // Ignore additional input if the cursor's at the end of the pattern
    if (
      this.selection.start === this.selection.end &&
      this.selection.start === this.pattern.length
    ) {
      return false;
    }

    var selectionBefore = InputMask_copy(this.selection);
    var valueBefore = this.getValue();

    var inputIndex = this.selection.start;

    // If the cursor or selection is prior to the first editable character, make
    // sure any input given is applied to it.
    if (inputIndex < this.pattern.firstEditableIndex) {
      inputIndex = this.pattern.firstEditableIndex;
    }

    // Bail out or add the character to input
    if (this.pattern.isEditableIndex(inputIndex)) {
      if (!this.pattern.isValidAtIndex(char, inputIndex)) {
        return false;
      }
      this.value[inputIndex] = this.pattern.transform(char, inputIndex);
    }

    // If multiple characters were selected, blank the remainder out based on the
    // pattern.
    var end = this.selection.end - 1;
    while (end > inputIndex) {
      if (this.pattern.isEditableIndex(end)) {
        this.value[end] = this.placeholderChar;
      }
      end--;
    }

    // Advance the cursor to the next character
    this.selection.start = this.selection.end = inputIndex + 1;

    // Skip over any subsequent static characters
    while (
      this.pattern.length > this.selection.start &&
      !this.pattern.isEditableIndex(this.selection.start)
    ) {
      this.selection.start++;
      this.selection.end++;
    }

    // History
    if (this._historyIndex != null) {
      // Took more input after undoing, so blow any subsequent history away
      this._history.splice(
        this._historyIndex,
        this._history.length - this._historyIndex
      );
      this._historyIndex = null;
    }
    if (
      this._lastOp !== "input" ||
      selectionBefore.start !== selectionBefore.end ||
      (this._lastSelection !== null &&
        selectionBefore.start !== this._lastSelection.start)
    ) {
      this._history.push({
        value: valueBefore,
        selection: selectionBefore,
        lastOp: this._lastOp
      });
    }
    this._lastOp = "input";
    this._lastSelection = InputMask_copy(this.selection);

    return true;
  };

  M.InputMask.prototype.backspace = function backspace() {
    // If the cursor is at the start there's nothing to do
    if (this.selection.start === 0 && this.selection.end === 0) {
      return false;
    }

    var selectionBefore = InputMask_copy(this.selection);
    var valueBefore = this.getValue();

    // No range selected - work on the character preceding the cursor
    if (this.selection.start === this.selection.end) {
      if (this.pattern.isEditableIndex(this.selection.start - 1)) {
        if (this.pattern.isRevealingMask) {
          this.value.splice(this.selection.start - 1);
        } else {
          this.value[this.selection.start - 1] = this.placeholderChar;
        }
      }
      this.selection.start--;
      this.selection.end--;
    } else {
      // Range selected - delete characters and leave the cursor at the start of the selection
      var end = this.selection.end - 1;
      while (end >= this.selection.start) {
        if (this.pattern.isEditableIndex(end)) {
          this.value[end] = this.placeholderChar;
        }
        end--;
      }
      this.selection.end = this.selection.start;
    }

    // History
    if (this._historyIndex != null) {
      // Took more input after undoing, so blow any subsequent history away
      this._history.splice(
        this._historyIndex,
        this._history.length - this._historyIndex
      );
    }
    if (
      this._lastOp !== "backspace" ||
      selectionBefore.start !== selectionBefore.end ||
      (this._lastSelection !== null &&
        selectionBefore.start !== this._lastSelection.start)
    ) {
      this._history.push({
        value: valueBefore,
        selection: selectionBefore,
        lastOp: this._lastOp
      });
    }
    this._lastOp = "backspace";
    this._lastSelection = InputMask_copy(this.selection);

    return true;
  };

  /**
   * Attempts to paste a string of input at the current cursor position or over
   * the top of the current selection.
   * Invalid content at any position will cause the paste to be rejected, and it
   * may contain static parts of the mask's pattern.
   * @param {string} input
   * @return {boolean} true if the paste was successful, false otherwise.
   */
  M.InputMask.prototype.paste = function paste(input) {
    // This is necessary because we're just calling input() with each character
    // and rolling back if any were invalid, rather than checking up-front.
    var initialState = {
      value: this.value.slice(),
      selection: InputMask_copy(this.selection),
      _lastOp: this._lastOp,
      _history: this._history.slice(),
      _historyIndex: this._historyIndex,
      _lastSelection: InputMask_copy(this._lastSelection)
    };

    // If there are static characters at the start of the pattern and the cursor
    // or selection is within them, the static characters must match for a valid
    // paste.
    if (this.selection.start < this.pattern.firstEditableIndex) {
      for (
        var i = 0, l = this.pattern.firstEditableIndex - this.selection.start;
        i < l;
        i++
      ) {
        if (input.charAt(i) !== this.pattern.pattern[i]) {
          return false;
        }
      }

      // Continue as if the selection and input started from the editable part of
      // the pattern.
      input = input.substring(
        this.pattern.firstEditableIndex - this.selection.start
      );
      this.selection.start = this.pattern.firstEditableIndex;
    }

    for (
      i = 0, l = input.length;
      i < l && this.selection.start <= this.pattern.lastEditableIndex;
      i++
    ) {
      var valid = this.input(input.charAt(i));
      // Allow static parts of the pattern to appear in pasted input - they will
      // already have been stepped over by input(), so verify that the value
      // deemed invalid by input() was the expected static character.
      if (!valid) {
        if (this.selection.start > 0) {
          // XXX This only allows for one static character to be skipped
          var patternIndex = this.selection.start - 1;
          if (
            !this.pattern.isEditableIndex(patternIndex) &&
            input.charAt(i) === this.pattern.pattern[patternIndex]
          ) {
            continue;
          }
        }
        InputMask_extend(this, initialState);
        return false;
      }
    }

    return true;
  };

  // History

  M.InputMask.prototype.undo = function undo() {
    // If there is no history, or nothing more on the history stack, we can't undo
    if (this._history.length === 0 || this._historyIndex === 0) {
      return false;
    }

    var historyItem;
    if (this._historyIndex == null) {
      // Not currently undoing, set up the initial history index
      this._historyIndex = this._history.length - 1;
      historyItem = this._history[this._historyIndex];
      // Add a new history entry if anything has changed since the last one, so we
      // can redo back to the initial state we started undoing from.
      var value = this.getValue();
      if (
        historyItem.value !== value ||
        historyItem.selection.start !== this.selection.start ||
        historyItem.selection.end !== this.selection.end
      ) {
        this._history.push({
          value: value,
          selection: copy(this.selection),
          lastOp: this._lastOp,
          startUndo: true
        });
      }
    } else {
      historyItem = this._history[--this._historyIndex];
    }

    this.value = historyItem.value.split("");
    this.selection = historyItem.selection;
    this._lastOp = historyItem.lastOp;
    return true;
  };

  M.InputMask.prototype.redo = function redo() {
    if (this._history.length === 0 || this._historyIndex == null) {
      return false;
    }
    var historyItem = this._history[++this._historyIndex];
    // If this is the last history item, we're done redoing
    if (this._historyIndex === this._history.length - 1) {
      this._historyIndex = null;
      // If the last history item was only added to start undoing, remove it
      if (historyItem.startUndo) {
        this._history.pop();
      }
    }
    this.value = historyItem.value.split("");
    this.selection = historyItem.selection;
    this._lastOp = historyItem.lastOp;
    return true;
  };

  // Getters & setters

  M.InputMask.prototype.setPattern = function setPattern(pattern, options) {
    options = InputMask_extend(
      {
        selection: { start: 0, end: 0 },
        value: ""
      },
      options
    );
    this.pattern = new M.Pattern(
      pattern,
      this.formatCharacters,
      this.placeholderChar,
      options.isRevealingMask
    );
    this.setValue(options.value);
    this.emptyValue = this.pattern.formatValue([]).join("");
    this.selection = options.selection;
    this._resetHistory();
  };

  M.InputMask.prototype.setSelection = function setSelection(selection) {
    this.selection = InputMask_copy(selection);
    if (this.selection.start === this.selection.end) {
      if (this.selection.start < this.pattern.firstEditableIndex) {
        this.selection.start = this.selection.end = this.pattern.firstEditableIndex;
        return true;
      }
      // Set selection to the first editable, non-placeholder character before the selection
      // OR to the beginning of the pattern
      var index = this.selection.start;
      while (index >= this.pattern.firstEditableIndex) {
        if (
          (this.pattern.isEditableIndex(index - 1) &&
            this.value[index - 1] !== this.placeholderChar) ||
          index === this.pattern.firstEditableIndex
        ) {
          this.selection.start = this.selection.end = index;
          break;
        }
        index--;
      }
      return true;
    }
    return false;
  };

  M.InputMask.prototype.setValue = function setValue(value) {
    if (value == null) {
      value = "";
    }
    this.value = this.pattern.formatValue(value.split(""));
  };

  M.InputMask.prototype.getValue = function getValue() {
    if (this.pattern.isRevealingMask) {
      this.value = this.pattern.formatValue(this.getRawValue().split(""));
    }
    return this.value.join("");
  };

  M.InputMask.prototype.getRawValue = function getRawValue() {
    var rawValue = [];
    for (var i = 0; i < this.value.length; i++) {
      if (this.pattern._editableIndices[i] === true) {
        rawValue.push(this.value[i]);
      }
    }
    return rawValue.join("");
  };

  M.InputMask.prototype._resetHistory = function _resetHistory() {
    this._history = [];
    this._historyIndex = null;
    this._lastOp = null;
    this._lastSelection = InputMask_copy(this.selection);
  };

  M.InputMask.Pattern = M.Pattern;

  /*- - - - - - - - - - - - - - - - - EventEmitter */

  M.EventEmitter = function() {};
  function indexOfListener(listeners, listener) {
    var i = listeners.length;
    while (i--) {
      if (listeners[i].listener === listener) {
        return i;
      }
    }
    return -1;
  }
  function alias(name) {
    return function aliasClosure() {
      return this[name].apply(this, arguments);
    };
  }
  function isValidListener(listener) {
    if (typeof listener === "function" || listener instanceof RegExp) {
      return true;
    } else if (listener && typeof listener === "object") {
      return isValidListener(listener.listener);
    } else {
      return false;
    }
  }
  M.EventEmitter.prototype = {
    getListeners: function(evt) {
      var events = this._getEvents();
      var response;
      var key;
      // Return a concatenated array of all matching events if
      // the selector is a regular expression.
      if (evt instanceof RegExp) {
        response = {};
        for (key in events) {
          if (events.hasOwnProperty(key) && evt.test(key)) {
            response[key] = events[key];
          }
        }
      } else {
        response = events[evt] || (events[evt] = []);
      }
      return response;
    },
    flattenListeners: function(listeners) {
      var flatListeners = [];
      var i;
      for (i = 0; i < listeners.length; i += 1) {
        flatListeners.push(listeners[i].listener);
      }
      return flatListeners;
    },
    getListenersAsObject: function(evt) {
      var listeners = this.getListeners(evt);
      var response;

      if (listeners instanceof Array) {
        response = {};
        response[evt] = listeners;
      }

      return response || listeners;
    },
    addListener: function(evt, listener) {
      if (!isValidListener(listener)) {
        throw new TypeError("listener must be a function");
      }

      var listeners = this.getListenersAsObject(evt);
      var listenerIsWrapped = typeof listener === "object";
      var key;

      for (key in listeners) {
        if (
          listeners.hasOwnProperty(key) &&
          indexOfListener(listeners[key], listener) === -1
        ) {
          listeners[key].push(
            listenerIsWrapped
              ? listener
              : {
                  listener: listener,
                  once: false
                }
          );
        }
      }

      return this;
    },
    on: alias("addListener"),
    once: alias("addOnceListener"),
    off: alias("removeListener"),
    trigger: alias("emitEvent"),
    removeAllListeners: alias("removeEvent"),
    addOnceListener: function(evt, listener) {
      return this.addListener(evt, {
        listener: listener,
        once: true
      });
    },
    defineEvent: function(evt) {
      this.getListeners(evt);
      return this;
    },
    defineEvents: function defineEvents(evts) {
      for (var i = 0; i < evts.length; i += 1) {
        this.defineEvent(evts[i]);
      }
      return this;
    },
    removeListener: function(evt, listener) {
      var listeners = this.getListenersAsObject(evt);
      var index;
      var key;

      for (key in listeners) {
        if (listeners.hasOwnProperty(key)) {
          index = indexOfListener(listeners[key], listener);

          if (index !== -1) {
            listeners[key].splice(index, 1);
          }
        }
      }

      return this;
    },
    addListeners: function(evt, listeners) {
      // Pass through to manipulateListeners
      return this.manipulateListeners(false, evt, listeners);
    },
    removeListeners: function(evt, listeners) {
      // Pass through to manipulateListeners
      return this.manipulateListeners(true, evt, listeners);
    },
    manipulateListeners: function(remove, evt, listeners) {
      var i;
      var value;
      var single = remove ? this.removeListener : this.addListener;
      var multiple = remove ? this.removeListeners : this.addListeners;

      // If evt is an object then pass each of its properties to this method
      if (typeof evt === "object" && !(evt instanceof RegExp)) {
        for (i in evt) {
          if (evt.hasOwnProperty(i) && (value = evt[i])) {
            // Pass the single listener straight through to the singular method
            if (typeof value === "function") {
              single.call(this, i, value);
            } else {
              // Otherwise pass back to the multiple function
              multiple.call(this, i, value);
            }
          }
        }
      } else {
        // So evt must be a string
        // And listeners must be an array of listeners
        // Loop over it and pass each one to the multiple method
        i = listeners.length;
        while (i--) {
          single.call(this, evt, listeners[i]);
        }
      }

      return this;
    },
    removeEvent: function(evt) {
      var type = typeof evt;
      var events = this._getEvents();
      var key;

      // Remove different things depending on the state of evt
      if (type === "string") {
        // Remove all listeners for the specified event
        delete events[evt];
      } else if (evt instanceof RegExp) {
        // Remove all events matching the regex.
        for (key in events) {
          if (events.hasOwnProperty(key) && evt.test(key)) {
            delete events[key];
          }
        }
      } else {
        // Remove all listeners in all events
        delete this._events;
      }

      return this;
    },
    emitEvent: function(evt, args) {
      var listenersMap = this.getListenersAsObject(evt);
      var listeners;
      var listener;
      var i;
      var key;
      var response;

      for (key in listenersMap) {
        if (listenersMap.hasOwnProperty(key)) {
          listeners = listenersMap[key].slice(0);

          for (i = 0; i < listeners.length; i++) {
            // If the listener returns true then it shall be removed from the event
            // The function is executed either with a basic call or an apply if there is an args array
            listener = listeners[i];

            if (listener.once === true) {
              this.removeListener(evt, listener.listener);
            }

            response = listener.listener.apply(this, args || []);

            if (response === this._getOnceReturnValue()) {
              this.removeListener(evt, listener.listener);
            }
          }
        }
      }

      return this;
    },
    emit: function(evt) {
      var args = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(evt, args);
    },
    setOnceReturnValue: function(value) {
      this._onceReturnValue = value;
      return this;
    },
    _getOnceReturnValue: function() {
      if (this.hasOwnProperty("_onceReturnValue")) {
        return this._onceReturnValue;
      } else {
        return true;
      }
    },
    _getEvents: function _getEvents() {
      return this._events || (this._events = {});
    }
  };
  M.ee = new M.EventEmitter();

  /*- - - - - - - - - - - - - - - - - Tester */
  var clog = console.log;
  M.log = function() {
    clog.apply(console, arguments);
  };
  M.logStyle = function({ color, bg, title } = {}) {
    var msgs = [];
    if (color != null || bg != null) {
      let _style = `background: ${bg || "#fff"}; color: ${color || "#000"}`;
      msgs.push(`%c>>> ${title || "LOG"} <<<`);
      msgs.push(_style);
    }
    let _count = 0;
    while (arguments.length) {
      _count++;
      if (_count > 1) {
        msgs.push([].shift.call(arguments));
      } else {
        [].shift.call(arguments);
      }
    }
    clog.apply(console, msgs);
  };
  M.logAlert = function() {
    var msgs = [];
    msgs.push({
      bg: "red",
      color: "yellow",
      title: "ALERT"
    });
    while (arguments.length) {
      msgs.push([].shift.call(arguments));
    }
    M.logStyle.apply(this, msgs);
  };
  M.logObjectPrettyPrint = function() {
    for (var i = 0; i < arguments.length; i++) {
      console.log(JSON.stringify(arguments[i], 0, 2));
    }
  };
  M.logObjectForCopy = function() {
    for (var i = 0; i < arguments.length; i++) {
      var _s = JSON.stringify(arguments[i], 0, 2);
      _s = _s.replace(/"([^"]+)":/gm, "$1:");
      console.log(_s);
    }
  };

  M.logTodo = function(todos) {
    M.logStartLine({ title: "Toto list" });
    var _icons = {
      stick: " 📌 ",
      item: " 🔶 ",
      done: " ✅ "
    };
    var _color = {
      stick: "red",
      item: "orange",
      done: "green"
    };
    for (let _item of todos) {
      if (typeof _item === "string") {
        if (_item.startsWith("[done]")) {
          M.log(
            `%c ${_icons.done}${_item.replace("[done]", "")}`,
            `color: ${_color.done}`
          );
        } else if (_item.startsWith("[stick]")) {
          M.log(
            `%c ${_icons.stick}${_item.replace("[stick]", "")}`,
            `color: ${_color.stick}`
          );
        } else {
          M.log(`%c ${_icons.item}${_item}`, `color: ${_color.item}`);
        }
      } else if (typeof _item === "object") {
        let _i = _icons[_item.icon] || _icons.item;
        let _c = _color[_item.icon] || _color.item;
        M.log(`%c ${_i}${_item.text}`, `color: ${_c}`);
      }
    }
    M.logEndLine({ title: "Toto list" });
  };
  M.logDisable = function() {
    clog = function() {};
  };
  M.test = function() {
    var objTest = { a: 1, b: 2, c: { d: { e: { e1: "1", e2: "2" } } } };
    var objDate = new Date();

    M.logStartLine({ title: "M Test" });
    M.log("Current:", new Date());
    M.log("-Version:", M.VERSION);
    M.log("-Random 2-15:", M.random(2, 15));
    M.log("-Random String 4 char:", M.randomString(4));
    M.log("-Random Color:", M.randomColor());
    M.log("-Valid date:", M.isDate(objDate));
    M.LocalStorage.setString("m_test", "haha");
    var m_test = M.LocalStorage.getString("m_test");
    M.log("-LocalStorage m_test:", m_test);
    var _ext = M.SquareBracket.extract("/abc[ten1]/[ten2]/haha/[ten3]");
    M.log("-ExtractTextInSquareBracket _ext:", _ext);
    var m_colortest = "#f2f2f2";
    M.log("Color obj:", M.Color(m_colortest));
    M.logStyle({ color: "red", bg: "yellow" }, "Test M.logStyle", {
      a: 1,
      b: 2
    });
    M.logAlert("Test M.logAlert", "OK");

    M.logAlert("InputMask");
    var mask = new M.InputMask({ pattern: "11/11/1111" });
    M.log('mask.input("a"):', mask.input("a"));
    M.log('mask.input("1")', mask.input("1"));
    M.log("mask.getValue()", mask.getValue());
    M.logObjectPrettyPrint(objTest);
    M.logObjectForCopy(objTest);

    M.logEndLine({ title: "M Test" });
  };

  M.logStartLine = function({ title } = {}) {
    console.warn(
      `/*--- --- --- --- --- ${title || "Start"} --- --- --- --- ---*/`
    );
  };
  M.logEndLine = function({ title } = {}) {
    console.warn(
      `/*--- --- --- --- --- ${
        title ? "End " + title : "End"
      } --- --- --- --- ---*/`
    );
  };
  M.logWarningOldFunction = function(o, n) {
    console.warn(
      `/*--- --- --- --- --- ${o} -> using ${n} --- --- --- --- ---*/`
    );
  };

  /*
  - - - - - - - - - - - - - - - - - End Content - - - - - - - - - - - - - - - - - 
  */

  M.prototype.toString = function() {
    return String(this._wrapped);
  };

  if (typeof define === "function" && define.amd) {
    define("M", [], function() {
      return M;
    });
  }

  window.M = M;
})();

M.test();

/* 
- - - - - - - - - Class:
M.Class = function(){
  if (!(this instanceof M.Class)) {
    return new M.Class();
  }
}
M.Class.prototype = {
  test: function(){
    //using this === M.Class
  }
}

- - - - - - - - - Obj Helper:
M.Obj = {
  v: 'v',
  f: funcion(){

  }
}
*/
