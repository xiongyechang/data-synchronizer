import str from './string';
import bool from './boolean';
import num from './number';
import sym from './symbol';
import bi from './bigint';
import obj from './object';
import nul from './null';
import func from './function';
import arr from './array';
import se from './set';
import ma from './map';
import dat from './date';
import reg from './regexp';
import und from './undefined';
import arrowFunction from './arrow-function';
import asyncFunction from './async-function';

const formatMap = [str, bool, num, sym, bi, obj, nul, func, arr, se, ma, dat, reg, und, arrowFunction, asyncFunction].reduce((cur, next) => {
  const [$type, from, to] = next;
  Object.assign(cur, {
    // @ts-ignore
    [$type]: {
      from,
      to,
    }
  })
  return cur;
}, {});

export default formatMap;


