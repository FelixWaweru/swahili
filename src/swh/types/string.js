const util = require('util');
const colors = require('colors');
const SWValue = require('./value');
const SWBoolean = require('./boolean');
const SWNumber = require('./number');
const { RTError } = require('../error');

/**  String data type */
class SWString extends SWValue {
  /**
   * instantiates a string
   * @param {String} value value to set
   */
  constructor(value) {
    super();
    this.value = value;
  }

  /**
   * concatenates two strings and returns a new string with their combination
   * @param {SWString} other string to be added to the current
   * @returns {SWString}
   */
  addedTo(other) {
    if (other instanceof SWString) {
      return [
        new SWString(this.value + other.value).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * repeats a string for as many times as the number provided
   * @param {SWNumber} other number of times to repeat the string
   * @returns {String}
   */
  multedBy(other) {
    if (other instanceof SWNumber) {
      if (other.value < 0) {
        return [
          null,
          new RTError(
            other.posStart,
            other.posEnd,
            `Invalid repeat count (${other.value})`,
            this.context
          ),
        ];
      }
      return [
        new SWString(this.value.repeat(other.value)).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * logically compares two strings and returns true if the strings are equal
   * @param {SWString} other string to be compared to the current
   * @returns {SWBoolean}
   */
  getComparisonEQ(other) {
    if (other instanceof SWString) {
      return [
        new SWBoolean(this.value === other.value).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * logically compares two strings and returns true if the strings are not equal
   * @param {SWString} other string to be compared to the current
   * @returns {SWBoolean}
   */
  getComparisonNE(other) {
    if (other instanceof SWString) {
      return [
        new SWBoolean(this.value !== other.value).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * logically compares two strings and returns the other string if the current is truthy
   * @param {SWString} other string to show if current is truthy
   * @returns {SWString}
   */
  andedBy(other) {
    if (other instanceof SWString) {
      return [
        new SWString(this.value && other.value).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * logically compares two strings and returns which one of the strings is truthy
   * @param {SWString} other string to be compared to the current
   * @returns {SWString}
   */
  oredBy(other) {
    if (other instanceof SWString) {
      return [
        new SWString(this.value || other.value).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * creates a new instance of the string
   * @returns {SWString}
   */
  copy() {
    let copy = new SWString(this.value);
    copy.setPosition(this.posStart, this.posEnd);
    copy.setContext(this.context);
    return copy;
  }

  /**
   * returns true if the string value is truthy
   * @returns {Boolean}
   */
  isTrue() {
    return this.value.length > 0;
  }

  [util.inspect.custom](depth, options) {
    return this.toString();
  }

  /**
   * string representation of the string class
   * @returns {String}
   */
  toString() {
    return colors.green(`"${this.value}"`);
  }
}

module.exports = SWString;
