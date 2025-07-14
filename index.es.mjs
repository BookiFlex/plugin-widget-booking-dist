import { effectScope as Ur, ref as ae, shallowRef as Yr, computed as be, watch as qe, isRef as jr, defineComponent as Bt, getCurrentInstance as Kt, h as zo, Fragment as ue, inject as ft, onMounted as Tt, onUnmounted as xn, createVNode as N, Text as Xr, createElementBlock as M, openBlock as C, renderSlot as ge, createBlock as ie, normalizeClass as Qe, withCtx as B, createElementVNode as w, renderList as Le, onBeforeUnmount as Gr, toDisplayString as D, unref as z, pushScopeId as Kr, popScopeId as Jr, nextTick as Zr, normalizeProps as Qr, guardReactiveProps as ea, resolveComponent as ii, mergeProps as xi, withScopeId as ta, withKeys as na, normalizeStyle as Mt, createCommentVNode as fe, resolveDynamicComponent as ia, withDirectives as Fe, vShow as It, createTextVNode as te, toRefs as oa, reactive as oi, vModelText as ln, withModifiers as Ho, vModelSelect as ra, vModelCheckbox as aa, provide as Wo, toRaw as sa, onBeforeMount as la, defineCustomElement as ca, createApp as da } from "vue";
const St = {
  INIT: "bflex/v1/cart/init",
  OFFERS: "bflex/v1/offers",
  CART: "bflex/v1/cart",
  CHANGE_PAYMENT_TYPE: "bflex/v1/cart/paymentType",
  CONFIRM_CART: "bflex/v1/cart/confirm",
  LOAD_RESERVATION: "bflex/v1/account/reservation",
  CANCEL_RESERVATION: "bflex/v1/account/reservation/cancel"
};
async function Et(e) {
  let t = null;
  try {
    t = await e.json();
  } catch {
    const l = new Error("Invalid JSON in response");
    throw l.code = "invalid_json", l.status = e.status, l;
  }
  if (e.ok && t.status === "success")
    return t.result;
  const n = t.message || "Unknown API error", i = t.code || "api_error", r = new Error(n);
  throw r.code = i, r.data = t.data, r.status = e.status, r;
}
async function Ct() {
  var t;
  if ((t = window.BookiFlex) != null && t.restUrl)
    return zi(window.BookiFlex.restUrl);
  const e = document.querySelector('link[rel="https://api.w.org/"]');
  if (e != null && e.href)
    return zi(e.href);
  try {
    if ((await fetch("/wp-json/", { method: "HEAD" })).ok) return "/wp-json/";
  } catch {
  }
  return "/index.php?rest_route=/";
}
function zi(e) {
  try {
    const t = new URL(e, location.href);
    return t.pathname + t.search;
  } catch {
    return e;
  }
}
const ua = async () => {
  const e = await Ct() + St.INIT;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await Et(t);
  } catch (t) {
    throw console.error("Error in init app", t), t;
  }
}, fa = async (e, t, n) => {
  console.debug("Loading data", e, t, n);
  let i = await Ct() + St.OFFERS;
  if (i = i.includes("?") ? i + "&" : i + "?", !e || !t)
    throw new Error("Invalid dates");
  const r = `${i}checkInDate=${e}&checkOutDate=${t}&promoCode=${n || ""}`;
  try {
    const s = await fetch(r);
    return await Et(s);
  } catch (s) {
    throw console.error("Failed to load offers:", s), s;
  }
}, ma = async () => {
  console.debug("Loading cart");
  const e = await Ct() + St.CART;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await Et(t);
  } catch (t) {
    throw console.error("Failed to load cart:", t), t;
  }
}, Vo = async (e) => {
  const t = await Ct() + St.CART;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: e })
    });
    return await Et(n);
  } catch (n) {
    throw console.error("Failed to add to cart:", n), n;
  }
}, pa = async (e) => {
  const t = await Ct() + St.CHANGE_PAYMENT_TYPE;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Et(n);
  } catch (n) {
    throw console.error("Failed to change payment type:", n), n;
  }
}, ha = async (e) => {
  console.debug("Confirming booking", e);
  const t = await Ct() + St.CONFIRM_CART;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Et(n);
  } catch (n) {
    throw console.error("Failed to confirm booking:", n), n;
  }
}, Uo = async (e) => {
  const t = await Ct() + St.LOAD_RESERVATION;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Et(n);
  } catch (n) {
    throw console.error("Failed to load reservation:", n), n;
  }
}, ga = async (e) => {
  const t = await Ct() + St.CANCEL_RESERVATION;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Et(n);
  } catch (n) {
    throw console.error("Failed to load reservation:", n), n;
  }
};
/*!
  * shared v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Fn = typeof window < "u", Pt = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), va = (e, t, n) => ya({ l: e, k: t, s: n }), ya = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Se = (e) => typeof e == "number" && isFinite(e), _a = (e) => ki(e) === "[object Date]", Jt = (e) => ki(e) === "[object RegExp]", Vn = (e) => Q(e) && Object.keys(e).length === 0, Ae = Object.assign, ba = Object.create, me = (e = null) => ba(e);
let Hi;
const Rt = () => Hi || (Hi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : me());
function Wi(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const wa = Object.prototype.hasOwnProperty;
function je(e, t) {
  return wa.call(e, t);
}
const Ee = Array.isArray, ve = (e) => typeof e == "function", W = (e) => typeof e == "string", le = (e) => typeof e == "boolean", ce = (e) => e !== null && typeof e == "object", xa = (e) => ce(e) && ve(e.then) && ve(e.catch), Yo = Object.prototype.toString, ki = (e) => Yo.call(e), Q = (e) => ki(e) === "[object Object]", ka = (e) => e == null ? "" : Ee(e) || Q(e) && e.toString === Yo ? JSON.stringify(e, null, 2) : String(e);
function Ti(e, t = "") {
  return e.reduce((n, i, r) => r === 0 ? n + i : n + t + i, "");
}
function Ta(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const An = (e) => !ce(e) || Ee(e);
function Nn(e, t) {
  if (An(e) || An(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: i, des: r } = n.pop();
    Object.keys(i).forEach((s) => {
      s !== "__proto__" && (ce(i[s]) && !ce(r[s]) && (r[s] = Array.isArray(i[s]) ? [] : me()), An(r[s]) || An(i[s]) ? r[s] = i[s] : n.push({ src: i[s], des: r[s] }));
    });
  }
}
/*!
  * message-compiler v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Sa(e, t, n) {
  return { line: e, column: t, offset: n };
}
function ri(e, t, n) {
  return { start: e, end: t };
}
const de = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14
}, Ea = 17;
function Un(e, t, n = {}) {
  const { domain: i, messages: r, args: s } = n, l = e, u = new SyntaxError(String(l));
  return u.code = e, t && (u.location = t), u.domain = i, u;
}
function Ca(e) {
  throw e;
}
const ct = " ", Pa = "\r", Me = `
`, Aa = "\u2028", La = "\u2029";
function Oa(e) {
  const t = e;
  let n = 0, i = 1, r = 1, s = 0;
  const l = ($) => t[$] === Pa && t[$ + 1] === Me, u = ($) => t[$] === Me, f = ($) => t[$] === La, d = ($) => t[$] === Aa, b = ($) => l($) || u($) || f($) || d($), g = () => n, p = () => i, x = () => r, k = () => s, S = ($) => l($) || f($) || d($) ? Me : t[$], P = () => S(n), h = () => S(n + s);
  function T() {
    return s = 0, b(n) && (i++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function I() {
    return l(n + s) && s++, s++, t[n + s];
  }
  function E() {
    n = 0, i = 1, r = 1, s = 0;
  }
  function F($ = 0) {
    s = $;
  }
  function q() {
    const $ = n + s;
    for (; $ !== n; )
      T();
    s = 0;
  }
  return {
    index: g,
    line: p,
    column: x,
    peekOffset: k,
    charAt: S,
    currentChar: P,
    currentPeek: h,
    next: T,
    peek: I,
    reset: E,
    resetPeek: F,
    skipToPeek: q
  };
}
const vt = void 0, $a = ".", Vi = "'", Ia = "tokenizer";
function Na(e, t = {}) {
  const n = t.location !== !1, i = Oa(e), r = () => i.index(), s = () => Sa(i.line(), i.column(), i.index()), l = s(), u = r(), f = {
    currentType: 13,
    offset: u,
    startLoc: l,
    endLoc: l,
    lastType: 13,
    lastOffset: u,
    lastStartLoc: l,
    lastEndLoc: l,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, d = () => f, { onError: b } = t;
  function g(v, y, R, ...Y) {
    const _e = d();
    if (y.column += R, y.offset += R, b) {
      const o = n ? ri(_e.startLoc, y) : null, a = Un(v, o, {
        domain: Ia,
        args: Y
      });
      b(a);
    }
  }
  function p(v, y, R) {
    v.endLoc = s(), v.currentType = y;
    const Y = { type: y };
    return n && (Y.loc = ri(v.startLoc, v.endLoc)), R != null && (Y.value = R), Y;
  }
  const x = (v) => p(
    v,
    13
    /* TokenTypes.EOF */
  );
  function k(v, y) {
    return v.currentChar() === y ? (v.next(), y) : (g(de.EXPECTED_TOKEN, s(), 0, y), "");
  }
  function S(v) {
    let y = "";
    for (; v.currentPeek() === ct || v.currentPeek() === Me; )
      y += v.currentPeek(), v.peek();
    return y;
  }
  function P(v) {
    const y = S(v);
    return v.skipToPeek(), y;
  }
  function h(v) {
    if (v === vt)
      return !1;
    const y = v.charCodeAt(0);
    return y >= 97 && y <= 122 || // a-z
    y >= 65 && y <= 90 || // A-Z
    y === 95;
  }
  function T(v) {
    if (v === vt)
      return !1;
    const y = v.charCodeAt(0);
    return y >= 48 && y <= 57;
  }
  function I(v, y) {
    const { currentType: R } = y;
    if (R !== 2)
      return !1;
    S(v);
    const Y = h(v.currentPeek());
    return v.resetPeek(), Y;
  }
  function E(v, y) {
    const { currentType: R } = y;
    if (R !== 2)
      return !1;
    S(v);
    const Y = v.currentPeek() === "-" ? v.peek() : v.currentPeek(), _e = T(Y);
    return v.resetPeek(), _e;
  }
  function F(v, y) {
    const { currentType: R } = y;
    if (R !== 2)
      return !1;
    S(v);
    const Y = v.currentPeek() === Vi;
    return v.resetPeek(), Y;
  }
  function q(v, y) {
    const { currentType: R } = y;
    if (R !== 7)
      return !1;
    S(v);
    const Y = v.currentPeek() === ".";
    return v.resetPeek(), Y;
  }
  function $(v, y) {
    const { currentType: R } = y;
    if (R !== 8)
      return !1;
    S(v);
    const Y = h(v.currentPeek());
    return v.resetPeek(), Y;
  }
  function J(v, y) {
    const { currentType: R } = y;
    if (!(R === 7 || R === 11))
      return !1;
    S(v);
    const Y = v.currentPeek() === ":";
    return v.resetPeek(), Y;
  }
  function G(v, y) {
    const { currentType: R } = y;
    if (R !== 9)
      return !1;
    const Y = () => {
      const o = v.currentPeek();
      return o === "{" ? h(v.peek()) : o === "@" || o === "|" || o === ":" || o === "." || o === ct || !o ? !1 : o === Me ? (v.peek(), Y()) : se(v, !1);
    }, _e = Y();
    return v.resetPeek(), _e;
  }
  function U(v) {
    S(v);
    const y = v.currentPeek() === "|";
    return v.resetPeek(), y;
  }
  function se(v, y = !0) {
    const R = (_e = !1, o = "") => {
      const a = v.currentPeek();
      return a === "{" || a === "@" || !a ? _e : a === "|" ? !(o === ct || o === Me) : a === ct ? (v.peek(), R(!0, ct)) : a === Me ? (v.peek(), R(!0, Me)) : !0;
    }, Y = R();
    return y && v.resetPeek(), Y;
  }
  function K(v, y) {
    const R = v.currentChar();
    return R === vt ? vt : y(R) ? (v.next(), R) : null;
  }
  function Te(v) {
    const y = v.charCodeAt(0);
    return y >= 97 && y <= 122 || // a-z
    y >= 65 && y <= 90 || // A-Z
    y >= 48 && y <= 57 || // 0-9
    y === 95 || // _
    y === 36;
  }
  function we(v) {
    return K(v, Te);
  }
  function Oe(v) {
    const y = v.charCodeAt(0);
    return y >= 97 && y <= 122 || // a-z
    y >= 65 && y <= 90 || // A-Z
    y >= 48 && y <= 57 || // 0-9
    y === 95 || // _
    y === 36 || // $
    y === 45;
  }
  function pe(v) {
    return K(v, Oe);
  }
  function oe(v) {
    const y = v.charCodeAt(0);
    return y >= 48 && y <= 57;
  }
  function Re(v) {
    return K(v, oe);
  }
  function ye(v) {
    const y = v.charCodeAt(0);
    return y >= 48 && y <= 57 || // 0-9
    y >= 65 && y <= 70 || // A-F
    y >= 97 && y <= 102;
  }
  function ot(v) {
    return K(v, ye);
  }
  function Ht(v) {
    let y = "", R = "";
    for (; y = Re(v); )
      R += y;
    return R;
  }
  function Qt(v) {
    let y = "";
    for (; ; ) {
      const R = v.currentChar();
      if (R === "{" || R === "}" || R === "@" || R === "|" || !R)
        break;
      if (R === ct || R === Me)
        if (se(v))
          y += R, v.next();
        else {
          if (U(v))
            break;
          y += R, v.next();
        }
      else
        y += R, v.next();
    }
    return y;
  }
  function Wt(v) {
    P(v);
    let y = "", R = "";
    for (; y = pe(v); )
      R += y;
    return v.currentChar() === vt && g(de.UNTERMINATED_CLOSING_BRACE, s(), 0), R;
  }
  function en(v) {
    P(v);
    let y = "";
    return v.currentChar() === "-" ? (v.next(), y += `-${Ht(v)}`) : y += Ht(v), v.currentChar() === vt && g(de.UNTERMINATED_CLOSING_BRACE, s(), 0), y;
  }
  function En(v) {
    return v !== Vi && v !== Me;
  }
  function Vt(v) {
    P(v), k(v, "'");
    let y = "", R = "";
    for (; y = K(v, En); )
      y === "\\" ? R += tn(v) : R += y;
    const Y = v.currentChar();
    return Y === Me || Y === vt ? (g(de.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, s(), 0), Y === Me && (v.next(), k(v, "'")), R) : (k(v, "'"), R);
  }
  function tn(v) {
    const y = v.currentChar();
    switch (y) {
      case "\\":
      case "'":
        return v.next(), `\\${y}`;
      case "u":
        return Ut(v, y, 4);
      case "U":
        return Ut(v, y, 6);
      default:
        return g(de.UNKNOWN_ESCAPE_SEQUENCE, s(), 0, y), "";
    }
  }
  function Ut(v, y, R) {
    k(v, y);
    let Y = "";
    for (let _e = 0; _e < R; _e++) {
      const o = ot(v);
      if (!o) {
        g(de.INVALID_UNICODE_ESCAPE_SEQUENCE, s(), 0, `\\${y}${Y}${v.currentChar()}`);
        break;
      }
      Y += o;
    }
    return `\\${y}${Y}`;
  }
  function nn(v) {
    return v !== "{" && v !== "}" && v !== ct && v !== Me;
  }
  function mt(v) {
    P(v);
    let y = "", R = "";
    for (; y = K(v, nn); )
      R += y;
    return R;
  }
  function pt(v) {
    let y = "", R = "";
    for (; y = we(v); )
      R += y;
    return R;
  }
  function on(v) {
    const y = (R) => {
      const Y = v.currentChar();
      return Y === "{" || Y === "@" || Y === "|" || Y === "(" || Y === ")" || !Y || Y === ct ? R : (R += Y, v.next(), y(R));
    };
    return y("");
  }
  function Ot(v) {
    P(v);
    const y = k(
      v,
      "|"
      /* TokenChars.Pipe */
    );
    return P(v), y;
  }
  function xe(v, y) {
    let R = null;
    switch (v.currentChar()) {
      case "{":
        return y.braceNest >= 1 && g(de.NOT_ALLOW_NEST_PLACEHOLDER, s(), 0), v.next(), R = p(
          y,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), P(v), y.braceNest++, R;
      case "}":
        return y.braceNest > 0 && y.currentType === 2 && g(de.EMPTY_PLACEHOLDER, s(), 0), v.next(), R = p(
          y,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), y.braceNest--, y.braceNest > 0 && P(v), y.inLinked && y.braceNest === 0 && (y.inLinked = !1), R;
      case "@":
        return y.braceNest > 0 && g(de.UNTERMINATED_CLOSING_BRACE, s(), 0), R = ht(v, y) || x(y), y.braceNest = 0, R;
      default: {
        let _e = !0, o = !0, a = !0;
        if (U(v))
          return y.braceNest > 0 && g(de.UNTERMINATED_CLOSING_BRACE, s(), 0), R = p(y, 1, Ot(v)), y.braceNest = 0, y.inLinked = !1, R;
        if (y.braceNest > 0 && (y.currentType === 4 || y.currentType === 5 || y.currentType === 6))
          return g(de.UNTERMINATED_CLOSING_BRACE, s(), 0), y.braceNest = 0, rt(v, y);
        if (_e = I(v, y))
          return R = p(y, 4, Wt(v)), P(v), R;
        if (o = E(v, y))
          return R = p(y, 5, en(v)), P(v), R;
        if (a = F(v, y))
          return R = p(y, 6, Vt(v)), P(v), R;
        if (!_e && !o && !a)
          return R = p(y, 12, mt(v)), g(de.INVALID_TOKEN_IN_PLACEHOLDER, s(), 0, R.value), P(v), R;
        break;
      }
    }
    return R;
  }
  function ht(v, y) {
    const { currentType: R } = y;
    let Y = null;
    const _e = v.currentChar();
    switch ((R === 7 || R === 8 || R === 11 || R === 9) && (_e === Me || _e === ct) && g(de.INVALID_LINKED_FORMAT, s(), 0), _e) {
      case "@":
        return v.next(), Y = p(
          y,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), y.inLinked = !0, Y;
      case ".":
        return P(v), v.next(), p(
          y,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return P(v), v.next(), p(
          y,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return U(v) ? (Y = p(y, 1, Ot(v)), y.braceNest = 0, y.inLinked = !1, Y) : q(v, y) || J(v, y) ? (P(v), ht(v, y)) : $(v, y) ? (P(v), p(y, 11, pt(v))) : G(v, y) ? (P(v), _e === "{" ? xe(v, y) || Y : p(y, 10, on(v))) : (R === 7 && g(de.INVALID_LINKED_FORMAT, s(), 0), y.braceNest = 0, y.inLinked = !1, rt(v, y));
    }
  }
  function rt(v, y) {
    let R = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (y.braceNest > 0)
      return xe(v, y) || x(y);
    if (y.inLinked)
      return ht(v, y) || x(y);
    switch (v.currentChar()) {
      case "{":
        return xe(v, y) || x(y);
      case "}":
        return g(de.UNBALANCED_CLOSING_BRACE, s(), 0), v.next(), p(
          y,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return ht(v, y) || x(y);
      default: {
        if (U(v))
          return R = p(y, 1, Ot(v)), y.braceNest = 0, y.inLinked = !1, R;
        if (se(v))
          return p(y, 0, Qt(v));
        break;
      }
    }
    return R;
  }
  function rn() {
    const { currentType: v, offset: y, startLoc: R, endLoc: Y } = f;
    return f.lastType = v, f.lastOffset = y, f.lastStartLoc = R, f.lastEndLoc = Y, f.offset = r(), f.startLoc = s(), i.currentChar() === vt ? p(
      f,
      13
      /* TokenTypes.EOF */
    ) : rt(i, f);
  }
  return {
    nextToken: rn,
    currentOffset: r,
    currentPosition: s,
    context: d
  };
}
const Ra = "parser", Da = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Ma(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    // eslint-disable-next-line no-useless-escape
    case "\\'":
      return "'";
    default: {
      const i = parseInt(t || n, 16);
      return i <= 55295 || i >= 57344 ? String.fromCodePoint(i) : "�";
    }
  }
}
function Fa(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function i(h, T, I, E, ...F) {
    const q = h.currentPosition();
    if (q.offset += E, q.column += E, n) {
      const $ = t ? ri(I, q) : null, J = Un(T, $, {
        domain: Ra,
        args: F
      });
      n(J);
    }
  }
  function r(h, T, I) {
    const E = { type: h };
    return t && (E.start = T, E.end = T, E.loc = { start: I, end: I }), E;
  }
  function s(h, T, I, E) {
    t && (h.end = T, h.loc && (h.loc.end = I));
  }
  function l(h, T) {
    const I = h.context(), E = r(3, I.offset, I.startLoc);
    return E.value = T, s(E, h.currentOffset(), h.currentPosition()), E;
  }
  function u(h, T) {
    const I = h.context(), { lastOffset: E, lastStartLoc: F } = I, q = r(5, E, F);
    return q.index = parseInt(T, 10), h.nextToken(), s(q, h.currentOffset(), h.currentPosition()), q;
  }
  function f(h, T) {
    const I = h.context(), { lastOffset: E, lastStartLoc: F } = I, q = r(4, E, F);
    return q.key = T, h.nextToken(), s(q, h.currentOffset(), h.currentPosition()), q;
  }
  function d(h, T) {
    const I = h.context(), { lastOffset: E, lastStartLoc: F } = I, q = r(9, E, F);
    return q.value = T.replace(Da, Ma), h.nextToken(), s(q, h.currentOffset(), h.currentPosition()), q;
  }
  function b(h) {
    const T = h.nextToken(), I = h.context(), { lastOffset: E, lastStartLoc: F } = I, q = r(8, E, F);
    return T.type !== 11 ? (i(h, de.UNEXPECTED_EMPTY_LINKED_MODIFIER, I.lastStartLoc, 0), q.value = "", s(q, E, F), {
      nextConsumeToken: T,
      node: q
    }) : (T.value == null && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, Ze(T)), q.value = T.value || "", s(q, h.currentOffset(), h.currentPosition()), {
      node: q
    });
  }
  function g(h, T) {
    const I = h.context(), E = r(7, I.offset, I.startLoc);
    return E.value = T, s(E, h.currentOffset(), h.currentPosition()), E;
  }
  function p(h) {
    const T = h.context(), I = r(6, T.offset, T.startLoc);
    let E = h.nextToken();
    if (E.type === 8) {
      const F = b(h);
      I.modifier = F.node, E = F.nextConsumeToken || h.nextToken();
    }
    switch (E.type !== 9 && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), E = h.nextToken(), E.type === 2 && (E = h.nextToken()), E.type) {
      case 10:
        E.value == null && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), I.key = g(h, E.value || "");
        break;
      case 4:
        E.value == null && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), I.key = f(h, E.value || "");
        break;
      case 5:
        E.value == null && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), I.key = u(h, E.value || "");
        break;
      case 6:
        E.value == null && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), I.key = d(h, E.value || "");
        break;
      default: {
        i(h, de.UNEXPECTED_EMPTY_LINKED_KEY, T.lastStartLoc, 0);
        const F = h.context(), q = r(7, F.offset, F.startLoc);
        return q.value = "", s(q, F.offset, F.startLoc), I.key = q, s(I, F.offset, F.startLoc), {
          nextConsumeToken: E,
          node: I
        };
      }
    }
    return s(I, h.currentOffset(), h.currentPosition()), {
      node: I
    };
  }
  function x(h) {
    const T = h.context(), I = T.currentType === 1 ? h.currentOffset() : T.offset, E = T.currentType === 1 ? T.endLoc : T.startLoc, F = r(2, I, E);
    F.items = [];
    let q = null;
    do {
      const G = q || h.nextToken();
      switch (q = null, G.type) {
        case 0:
          G.value == null && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(G)), F.items.push(l(h, G.value || ""));
          break;
        case 5:
          G.value == null && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(G)), F.items.push(u(h, G.value || ""));
          break;
        case 4:
          G.value == null && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(G)), F.items.push(f(h, G.value || ""));
          break;
        case 6:
          G.value == null && i(h, de.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(G)), F.items.push(d(h, G.value || ""));
          break;
        case 7: {
          const U = p(h);
          F.items.push(U.node), q = U.nextConsumeToken || null;
          break;
        }
      }
    } while (T.currentType !== 13 && T.currentType !== 1);
    const $ = T.currentType === 1 ? T.lastOffset : h.currentOffset(), J = T.currentType === 1 ? T.lastEndLoc : h.currentPosition();
    return s(F, $, J), F;
  }
  function k(h, T, I, E) {
    const F = h.context();
    let q = E.items.length === 0;
    const $ = r(1, T, I);
    $.cases = [], $.cases.push(E);
    do {
      const J = x(h);
      q || (q = J.items.length === 0), $.cases.push(J);
    } while (F.currentType !== 13);
    return q && i(h, de.MUST_HAVE_MESSAGES_IN_PLURAL, I, 0), s($, h.currentOffset(), h.currentPosition()), $;
  }
  function S(h) {
    const T = h.context(), { offset: I, startLoc: E } = T, F = x(h);
    return T.currentType === 13 ? F : k(h, I, E, F);
  }
  function P(h) {
    const T = Na(h, Ae({}, e)), I = T.context(), E = r(0, I.offset, I.startLoc);
    return t && E.loc && (E.loc.source = h), E.body = S(T), e.onCacheKey && (E.cacheKey = e.onCacheKey(h)), I.currentType !== 13 && i(T, de.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, h[I.offset] || ""), s(E, T.currentOffset(), T.currentPosition()), E;
  }
  return { parse: P };
}
function Ze(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function qa(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (s) => (n.helpers.add(s), s) };
}
function Ui(e, t) {
  for (let n = 0; n < e.length; n++)
    Si(e[n], t);
}
function Si(e, t) {
  switch (e.type) {
    case 1:
      Ui(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Ui(e.items, t);
      break;
    case 6: {
      Si(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function Ba(e, t = {}) {
  const n = qa(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Si(e.body, n);
  const i = n.context();
  e.helpers = Array.from(i.helpers);
}
function za(e) {
  const t = e.body;
  return t.type === 2 ? Yi(t) : t.cases.forEach((n) => Yi(n)), e;
}
function Yi(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const i = e.items[n];
      if (!(i.type === 3 || i.type === 9) || i.value == null)
        break;
      t.push(i.value);
    }
    if (t.length === e.items.length) {
      e.static = Ti(t);
      for (let n = 0; n < e.items.length; n++) {
        const i = e.items[n];
        (i.type === 3 || i.type === 9) && delete i.value;
      }
    }
  }
}
function jt(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      jt(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let i = 0; i < n.length; i++)
        jt(n[i]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let i = 0; i < n.length; i++)
        jt(n[i]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      jt(t.key), t.k = t.key, delete t.key, t.modifier && (jt(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
  }
  delete e.type;
}
function Ha(e, t) {
  const { filename: n, breakLineCode: i, needIndent: r } = t, s = t.location !== !1, l = {
    filename: n,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: i,
    needIndent: r,
    indentLevel: 0
  };
  s && e.loc && (l.source = e.loc.source);
  const u = () => l;
  function f(S, P) {
    l.code += S;
  }
  function d(S, P = !0) {
    const h = P ? i : "";
    f(r ? h + "  ".repeat(S) : h);
  }
  function b(S = !0) {
    const P = ++l.indentLevel;
    S && d(P);
  }
  function g(S = !0) {
    const P = --l.indentLevel;
    S && d(P);
  }
  function p() {
    d(l.indentLevel);
  }
  return {
    context: u,
    push: f,
    indent: b,
    deindent: g,
    newline: p,
    helper: (S) => `_${S}`,
    needIndent: () => l.needIndent
  };
}
function Wa(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Zt(e, t.key), t.modifier ? (e.push(", "), Zt(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Va(e, t) {
  const { helper: n, needIndent: i } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(i());
  const r = t.items.length;
  for (let s = 0; s < r && (Zt(e, t.items[s]), s !== r - 1); s++)
    e.push(", ");
  e.deindent(i()), e.push("])");
}
function Ua(e, t) {
  const { helper: n, needIndent: i } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(i());
    const r = t.cases.length;
    for (let s = 0; s < r && (Zt(e, t.cases[s]), s !== r - 1); s++)
      e.push(", ");
    e.deindent(i()), e.push("])");
  }
}
function Ya(e, t) {
  t.body ? Zt(e, t.body) : e.push("null");
}
function Zt(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Ya(e, t);
      break;
    case 1:
      Ua(e, t);
      break;
    case 2:
      Va(e, t);
      break;
    case 6:
      Wa(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
  }
}
const ja = (e, t = {}) => {
  const n = W(t.mode) ? t.mode : "normal", i = W(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, s = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], u = Ha(e, {
    filename: i,
    breakLineCode: r,
    needIndent: s
  });
  u.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), u.indent(s), l.length > 0 && (u.push(`const { ${Ti(l.map((b) => `${b}: _${b}`), ", ")} } = ctx`), u.newline()), u.push("return "), Zt(u, e), u.deindent(s), u.push("}"), delete e.helpers;
  const { code: f, map: d } = u.context();
  return {
    ast: e,
    code: f,
    map: d ? d.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Xa(e, t = {}) {
  const n = Ae({}, t), i = !!n.jit, r = !!n.minify, s = n.optimize == null ? !0 : n.optimize, u = Fa(n).parse(e);
  return i ? (s && za(u), r && jt(u), { ast: u, code: "" }) : (Ba(u, n), ja(u, n));
}
/*!
  * core-base v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ga() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Rt().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Rt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function et(e) {
  return ce(e) && Ei(e) === 0 && (je(e, "b") || je(e, "body"));
}
const jo = ["b", "body"];
function Ka(e) {
  return At(e, jo);
}
const Xo = ["c", "cases"];
function Ja(e) {
  return At(e, Xo, []);
}
const Go = ["s", "static"];
function Za(e) {
  return At(e, Go);
}
const Ko = ["i", "items"];
function Qa(e) {
  return At(e, Ko, []);
}
const Jo = ["t", "type"];
function Ei(e) {
  return At(e, Jo);
}
const Zo = ["v", "value"];
function Ln(e, t) {
  const n = At(e, Zo);
  if (n != null)
    return n;
  throw pn(t);
}
const Qo = ["m", "modifier"];
function es(e) {
  return At(e, Qo);
}
const er = ["k", "key"];
function ts(e) {
  const t = At(e, er);
  if (t)
    return t;
  throw pn(
    6
    /* NodeTypes.Linked */
  );
}
function At(e, t, n) {
  for (let i = 0; i < t.length; i++) {
    const r = t[i];
    if (je(e, r) && e[r] != null)
      return e[r];
  }
  return n;
}
const tr = [
  ...jo,
  ...Xo,
  ...Go,
  ...Ko,
  ...er,
  ...Qo,
  ...Zo,
  ...Jo
];
function pn(e) {
  return new Error(`unhandled node type: ${e}`);
}
function Jn(e) {
  return (n) => ns(n, e);
}
function ns(e, t) {
  const n = Ka(t);
  if (n == null)
    throw pn(
      0
      /* NodeTypes.Resource */
    );
  if (Ei(n) === 1) {
    const s = Ja(n);
    return e.plural(s.reduce((l, u) => [
      ...l,
      ji(e, u)
    ], []));
  } else
    return ji(e, n);
}
function ji(e, t) {
  const n = Za(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const i = Qa(t).reduce((r, s) => [...r, ai(e, s)], []);
    return e.normalize(i);
  }
}
function ai(e, t) {
  const n = Ei(t);
  switch (n) {
    case 3:
      return Ln(t, n);
    case 9:
      return Ln(t, n);
    case 4: {
      const i = t;
      if (je(i, "k") && i.k)
        return e.interpolate(e.named(i.k));
      if (je(i, "key") && i.key)
        return e.interpolate(e.named(i.key));
      throw pn(n);
    }
    case 5: {
      const i = t;
      if (je(i, "i") && Se(i.i))
        return e.interpolate(e.list(i.i));
      if (je(i, "index") && Se(i.index))
        return e.interpolate(e.list(i.index));
      throw pn(n);
    }
    case 6: {
      const i = t, r = es(i), s = ts(i);
      return e.linked(ai(e, s), r ? ai(e, r) : void 0, e.type);
    }
    case 7:
      return Ln(t, n);
    case 8:
      return Ln(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const is = (e) => e;
let On = me();
function os(e, t = {}) {
  let n = !1;
  const i = t.onError || Ca;
  return t.onError = (r) => {
    n = !0, i(r);
  }, { ...Xa(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function rs(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && W(e)) {
    le(t.warnHtmlMessage) && t.warnHtmlMessage;
    const i = (t.onCacheKey || is)(e), r = On[i];
    if (r)
      return r;
    const { ast: s, detectError: l } = os(e, {
      ...t,
      location: !1,
      jit: !0
    }), u = Jn(s);
    return l ? u : On[i] = u;
  } else {
    const n = e.cacheKey;
    if (n) {
      const i = On[n];
      return i || (On[n] = Jn(e));
    } else
      return Jn(e);
  }
}
let hn = null;
function as(e) {
  hn = e;
}
function ss(e, t, n) {
  hn && hn.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const ls = /* @__PURE__ */ cs("function:translate");
function cs(e) {
  return (t) => hn && hn.emit(e, t);
}
const dt = {
  INVALID_ARGUMENT: Ea,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, ds = 24;
function ut(e) {
  return Un(e, null, void 0);
}
function Ci(e, t) {
  return t.locale != null ? Xi(t.locale) : Xi(e.locale);
}
let Zn;
function Xi(e) {
  if (W(e))
    return e;
  if (ve(e)) {
    if (e.resolvedOnce && Zn != null)
      return Zn;
    if (e.constructor.name === "Function") {
      const t = e();
      if (xa(t))
        throw ut(dt.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Zn = t;
    } else
      throw ut(dt.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw ut(dt.NOT_SUPPORT_LOCALE_TYPE);
}
function us(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Ee(t) ? t : ce(t) ? Object.keys(t) : W(t) ? [t] : [n]
  ])];
}
function nr(e, t, n) {
  const i = W(n) ? n : gn, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let s = r.__localeChainCache.get(i);
  if (!s) {
    s = [];
    let l = [n];
    for (; Ee(l); )
      l = Gi(s, l, t);
    const u = Ee(t) || !Q(t) ? t : t.default ? t.default : null;
    l = W(u) ? [u] : u, Ee(l) && Gi(s, l, !1), r.__localeChainCache.set(i, s);
  }
  return s;
}
function Gi(e, t, n) {
  let i = !0;
  for (let r = 0; r < t.length && le(i); r++) {
    const s = t[r];
    W(s) && (i = fs(e, t[r], n));
  }
  return i;
}
function fs(e, t, n) {
  let i;
  const r = t.split("-");
  do {
    const s = r.join("-");
    i = ms(e, s, n), r.splice(-1, 1);
  } while (r.length && i === !0);
  return i;
}
function ms(e, t, n) {
  let i = !1;
  if (!e.includes(t) && (i = !0, t)) {
    i = t[t.length - 1] !== "!";
    const r = t.replace(/!/g, "");
    e.push(r), (Ee(n) || Q(n)) && n[r] && (i = n[r]);
  }
  return i;
}
const Lt = [];
Lt[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Lt[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Lt[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
Lt[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
Lt[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
Lt[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
Lt[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const ps = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function hs(e) {
  return ps.test(e);
}
function gs(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function vs(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return e;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function ys(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : hs(t) ? gs(t) : "*" + t;
}
function _s(e) {
  const t = [];
  let n = -1, i = 0, r = 0, s, l, u, f, d, b, g;
  const p = [];
  p[
    0
    /* Actions.APPEND */
  ] = () => {
    l === void 0 ? l = u : l += u;
  }, p[
    1
    /* Actions.PUSH */
  ] = () => {
    l !== void 0 && (t.push(l), l = void 0);
  }, p[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    p[
      0
      /* Actions.APPEND */
    ](), r++;
  }, p[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (r > 0)
      r--, i = 4, p[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (r = 0, l === void 0 || (l = ys(l), l === !1))
        return !1;
      p[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function x() {
    const k = e[n + 1];
    if (i === 5 && k === "'" || i === 6 && k === '"')
      return n++, u = "\\" + k, p[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; i !== null; )
    if (n++, s = e[n], !(s === "\\" && x())) {
      if (f = vs(s), g = Lt[i], d = g[f] || g.l || 8, d === 8 || (i = d[0], d[1] !== void 0 && (b = p[d[1]], b && (u = s, b() === !1))))
        return;
      if (i === 7)
        return t;
    }
}
const Ki = /* @__PURE__ */ new Map();
function bs(e, t) {
  return ce(e) ? e[t] : null;
}
function ws(e, t) {
  if (!ce(e))
    return null;
  let n = Ki.get(t);
  if (n || (n = _s(t), n && Ki.set(t, n)), !n)
    return null;
  const i = n.length;
  let r = e, s = 0;
  for (; s < i; ) {
    const l = n[s];
    if (tr.includes(l) && et(r))
      return null;
    const u = r[l];
    if (u === void 0 || ve(r))
      return null;
    r = u, s++;
  }
  return r;
}
const xs = "11.1.3", Yn = -1, gn = "en-US", Ji = "", Zi = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function ks() {
  return {
    upper: (e, t) => t === "text" && W(e) ? e.toUpperCase() : t === "vnode" && ce(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && W(e) ? e.toLowerCase() : t === "vnode" && ce(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && W(e) ? Zi(e) : t === "vnode" && ce(e) && "__v_isVNode" in e ? Zi(e.children) : e
  };
}
let ir;
function Ts(e) {
  ir = e;
}
let or;
function Ss(e) {
  or = e;
}
let rr;
function Es(e) {
  rr = e;
}
let ar = null;
const Cs = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  ar = e;
}, Ps = /* @__NO_SIDE_EFFECTS__ */ () => ar;
let sr = null;
const Qi = (e) => {
  sr = e;
}, As = () => sr;
let eo = 0;
function Ls(e = {}) {
  const t = ve(e.onWarn) ? e.onWarn : Ta, n = W(e.version) ? e.version : xs, i = W(e.locale) || ve(e.locale) ? e.locale : gn, r = ve(i) ? gn : i, s = Ee(e.fallbackLocale) || Q(e.fallbackLocale) || W(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Q(e.messages) ? e.messages : Qn(r), u = Q(e.datetimeFormats) ? e.datetimeFormats : Qn(r), f = Q(e.numberFormats) ? e.numberFormats : Qn(r), d = Ae(me(), e.modifiers, ks()), b = e.pluralRules || me(), g = ve(e.missing) ? e.missing : null, p = le(e.missingWarn) || Jt(e.missingWarn) ? e.missingWarn : !0, x = le(e.fallbackWarn) || Jt(e.fallbackWarn) ? e.fallbackWarn : !0, k = !!e.fallbackFormat, S = !!e.unresolving, P = ve(e.postTranslation) ? e.postTranslation : null, h = Q(e.processor) ? e.processor : null, T = le(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, I = !!e.escapeParameter, E = ve(e.messageCompiler) ? e.messageCompiler : ir, F = ve(e.messageResolver) ? e.messageResolver : or || bs, q = ve(e.localeFallbacker) ? e.localeFallbacker : rr || us, $ = ce(e.fallbackContext) ? e.fallbackContext : void 0, J = e, G = ce(J.__datetimeFormatters) ? J.__datetimeFormatters : /* @__PURE__ */ new Map(), U = ce(J.__numberFormatters) ? J.__numberFormatters : /* @__PURE__ */ new Map(), se = ce(J.__meta) ? J.__meta : {};
  eo++;
  const K = {
    version: n,
    cid: eo,
    locale: i,
    fallbackLocale: s,
    messages: l,
    modifiers: d,
    pluralRules: b,
    missing: g,
    missingWarn: p,
    fallbackWarn: x,
    fallbackFormat: k,
    unresolving: S,
    postTranslation: P,
    processor: h,
    warnHtmlMessage: T,
    escapeParameter: I,
    messageCompiler: E,
    messageResolver: F,
    localeFallbacker: q,
    fallbackContext: $,
    onWarn: t,
    __meta: se
  };
  return K.datetimeFormats = u, K.numberFormats = f, K.__datetimeFormatters = G, K.__numberFormatters = U, __INTLIFY_PROD_DEVTOOLS__ && ss(K, n, se), K;
}
const Qn = (e) => ({ [e]: me() });
function Pi(e, t, n, i, r) {
  const { missing: s, onWarn: l } = e;
  if (s !== null) {
    const u = s(e, n, t, r);
    return W(u) ? u : t;
  } else
    return t;
}
function sn(e, t, n) {
  const i = e;
  i.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Os(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function $s(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let i = n + 1; i < t.length; i++)
    if (Os(e, t[i]))
      return !0;
  return !1;
}
function to(e, ...t) {
  const { datetimeFormats: n, unresolving: i, fallbackLocale: r, onWarn: s, localeFallbacker: l } = e, { __datetimeFormatters: u } = e, [f, d, b, g] = si(...t), p = le(b.missingWarn) ? b.missingWarn : e.missingWarn;
  le(b.fallbackWarn) ? b.fallbackWarn : e.fallbackWarn;
  const x = !!b.part, k = Ci(e, b), S = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    k
  );
  if (!W(f) || f === "")
    return new Intl.DateTimeFormat(k, g).format(d);
  let P = {}, h, T = null;
  const I = "datetime format";
  for (let q = 0; q < S.length && (h = S[q], P = n[h] || {}, T = P[f], !Q(T)); q++)
    Pi(e, f, h, p, I);
  if (!Q(T) || !W(h))
    return i ? Yn : f;
  let E = `${h}__${f}`;
  Vn(g) || (E = `${E}__${JSON.stringify(g)}`);
  let F = u.get(E);
  return F || (F = new Intl.DateTimeFormat(h, Ae({}, T, g)), u.set(E, F)), x ? F.formatToParts(d) : F.format(d);
}
const lr = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function si(...e) {
  const [t, n, i, r] = e, s = me();
  let l = me(), u;
  if (W(t)) {
    const f = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!f)
      throw ut(dt.INVALID_ISO_DATE_ARGUMENT);
    const d = f[3] ? f[3].trim().startsWith("T") ? `${f[1].trim()}${f[3].trim()}` : `${f[1].trim()}T${f[3].trim()}` : f[1].trim();
    u = new Date(d);
    try {
      u.toISOString();
    } catch {
      throw ut(dt.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (_a(t)) {
    if (isNaN(t.getTime()))
      throw ut(dt.INVALID_DATE_ARGUMENT);
    u = t;
  } else if (Se(t))
    u = t;
  else
    throw ut(dt.INVALID_ARGUMENT);
  return W(n) ? s.key = n : Q(n) && Object.keys(n).forEach((f) => {
    lr.includes(f) ? l[f] = n[f] : s[f] = n[f];
  }), W(i) ? s.locale = i : Q(i) && (l = i), Q(r) && (l = r), [s.key || "", u, s, l];
}
function no(e, t, n) {
  const i = e;
  for (const r in n) {
    const s = `${t}__${r}`;
    i.__datetimeFormatters.has(s) && i.__datetimeFormatters.delete(s);
  }
}
function io(e, ...t) {
  const { numberFormats: n, unresolving: i, fallbackLocale: r, onWarn: s, localeFallbacker: l } = e, { __numberFormatters: u } = e, [f, d, b, g] = li(...t), p = le(b.missingWarn) ? b.missingWarn : e.missingWarn;
  le(b.fallbackWarn) ? b.fallbackWarn : e.fallbackWarn;
  const x = !!b.part, k = Ci(e, b), S = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    k
  );
  if (!W(f) || f === "")
    return new Intl.NumberFormat(k, g).format(d);
  let P = {}, h, T = null;
  const I = "number format";
  for (let q = 0; q < S.length && (h = S[q], P = n[h] || {}, T = P[f], !Q(T)); q++)
    Pi(e, f, h, p, I);
  if (!Q(T) || !W(h))
    return i ? Yn : f;
  let E = `${h}__${f}`;
  Vn(g) || (E = `${E}__${JSON.stringify(g)}`);
  let F = u.get(E);
  return F || (F = new Intl.NumberFormat(h, Ae({}, T, g)), u.set(E, F)), x ? F.formatToParts(d) : F.format(d);
}
const cr = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function li(...e) {
  const [t, n, i, r] = e, s = me();
  let l = me();
  if (!Se(t))
    throw ut(dt.INVALID_ARGUMENT);
  const u = t;
  return W(n) ? s.key = n : Q(n) && Object.keys(n).forEach((f) => {
    cr.includes(f) ? l[f] = n[f] : s[f] = n[f];
  }), W(i) ? s.locale = i : Q(i) && (l = i), Q(r) && (l = r), [s.key || "", u, s, l];
}
function oo(e, t, n) {
  const i = e;
  for (const r in n) {
    const s = `${t}__${r}`;
    i.__numberFormatters.has(s) && i.__numberFormatters.delete(s);
  }
}
const Is = (e) => e, Ns = (e) => "", Rs = "text", Ds = (e) => e.length === 0 ? "" : Ti(e), Ms = ka;
function ro(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Fs(e) {
  const t = Se(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Se(e.named.count) || Se(e.named.n)) ? Se(e.named.count) ? e.named.count : Se(e.named.n) ? e.named.n : t : t;
}
function qs(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Bs(e = {}) {
  const t = e.locale, n = Fs(e), i = ce(e.pluralRules) && W(t) && ve(e.pluralRules[t]) ? e.pluralRules[t] : ro, r = ce(e.pluralRules) && W(t) && ve(e.pluralRules[t]) ? ro : void 0, s = (h) => h[i(n, h.length, r)], l = e.list || [], u = (h) => l[h], f = e.named || me();
  Se(e.pluralIndex) && qs(n, f);
  const d = (h) => f[h];
  function b(h, T) {
    const I = ve(e.messages) ? e.messages(h, !!T) : ce(e.messages) ? e.messages[h] : !1;
    return I || (e.parent ? e.parent.message(h) : Ns);
  }
  const g = (h) => e.modifiers ? e.modifiers[h] : Is, p = Q(e.processor) && ve(e.processor.normalize) ? e.processor.normalize : Ds, x = Q(e.processor) && ve(e.processor.interpolate) ? e.processor.interpolate : Ms, k = Q(e.processor) && W(e.processor.type) ? e.processor.type : Rs, P = {
    list: u,
    named: d,
    plural: s,
    linked: (h, ...T) => {
      const [I, E] = T;
      let F = "text", q = "";
      T.length === 1 ? ce(I) ? (q = I.modifier || q, F = I.type || F) : W(I) && (q = I || q) : T.length === 2 && (W(I) && (q = I || q), W(E) && (F = E || F));
      const $ = b(h, !0)(P), J = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        F === "vnode" && Ee($) && q ? $[0] : $
      );
      return q ? g(q)(J, F) : J;
    },
    message: b,
    type: k,
    interpolate: x,
    normalize: p,
    values: Ae(me(), l, f)
  };
  return P;
}
const ao = () => "", Ve = (e) => ve(e);
function so(e, ...t) {
  const { fallbackFormat: n, postTranslation: i, unresolving: r, messageCompiler: s, fallbackLocale: l, messages: u } = e, [f, d] = ci(...t), b = le(d.missingWarn) ? d.missingWarn : e.missingWarn, g = le(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn, p = le(d.escapeParameter) ? d.escapeParameter : e.escapeParameter, x = !!d.resolvedMessage, k = W(d.default) || le(d.default) ? le(d.default) ? s ? f : () => f : d.default : n ? s ? f : () => f : null, S = n || k != null && (W(k) || ve(k)), P = Ci(e, d);
  p && zs(d);
  let [h, T, I] = x ? [
    f,
    P,
    u[P] || me()
  ] : dr(e, f, P, l, g, b), E = h, F = f;
  if (!x && !(W(E) || et(E) || Ve(E)) && S && (E = k, F = E), !x && (!(W(E) || et(E) || Ve(E)) || !W(T)))
    return r ? Yn : f;
  let q = !1;
  const $ = () => {
    q = !0;
  }, J = Ve(E) ? E : ur(e, f, T, E, F, $);
  if (q)
    return E;
  const G = Vs(e, T, I, d), U = Bs(G), se = Hs(e, J, U), K = i ? i(se, f) : se;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const Te = {
      timestamp: Date.now(),
      key: W(f) ? f : Ve(E) ? E.key : "",
      locale: T || (Ve(E) ? E.locale : ""),
      format: W(E) ? E : Ve(E) ? E.source : "",
      message: K
    };
    Te.meta = Ae({}, e.__meta, /* @__PURE__ */ Ps() || {}), ls(Te);
  }
  return K;
}
function zs(e) {
  Ee(e.list) ? e.list = e.list.map((t) => W(t) ? Wi(t) : t) : ce(e.named) && Object.keys(e.named).forEach((t) => {
    W(e.named[t]) && (e.named[t] = Wi(e.named[t]));
  });
}
function dr(e, t, n, i, r, s) {
  const { messages: l, onWarn: u, messageResolver: f, localeFallbacker: d } = e, b = d(e, i, n);
  let g = me(), p, x = null;
  const k = "translate";
  for (let S = 0; S < b.length && (p = b[S], g = l[p] || me(), (x = f(g, t)) === null && (x = g[t]), !(W(x) || et(x) || Ve(x))); S++)
    if (!$s(p, b)) {
      const P = Pi(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        p,
        s,
        k
      );
      P !== t && (x = P);
    }
  return [x, p, g];
}
function ur(e, t, n, i, r, s) {
  const { messageCompiler: l, warnHtmlMessage: u } = e;
  if (Ve(i)) {
    const d = i;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (l == null) {
    const d = () => i;
    return d.locale = n, d.key = t, d;
  }
  const f = l(i, Ws(e, n, r, i, u, s));
  return f.locale = n, f.key = t, f.source = i, f;
}
function Hs(e, t, n) {
  return t(n);
}
function ci(...e) {
  const [t, n, i] = e, r = me();
  if (!W(t) && !Se(t) && !Ve(t) && !et(t))
    throw ut(dt.INVALID_ARGUMENT);
  const s = Se(t) ? String(t) : (Ve(t), t);
  return Se(n) ? r.plural = n : W(n) ? r.default = n : Q(n) && !Vn(n) ? r.named = n : Ee(n) && (r.list = n), Se(i) ? r.plural = i : W(i) ? r.default = i : Q(i) && Ae(r, i), [s, r];
}
function Ws(e, t, n, i, r, s) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: r,
    onError: (l) => {
      throw s && s(l), l;
    },
    onCacheKey: (l) => va(t, n, l)
  };
}
function Vs(e, t, n, i) {
  const { modifiers: r, pluralRules: s, messageResolver: l, fallbackLocale: u, fallbackWarn: f, missingWarn: d, fallbackContext: b } = e, p = {
    locale: t,
    modifiers: r,
    pluralRules: s,
    messages: (x, k) => {
      let S = l(n, x);
      if (S == null && (b || k)) {
        const [, , P] = dr(
          b || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          x,
          t,
          u,
          f,
          d
        );
        S = l(P, x);
      }
      if (W(S) || et(S)) {
        let P = !1;
        const T = ur(e, x, t, S, x, () => {
          P = !0;
        });
        return P ? ao : T;
      } else return Ve(S) ? S : ao;
    }
  };
  return e.processor && (p.processor = e.processor), i.list && (p.list = i.list), i.named && (p.named = i.named), Se(i.plural) && (p.pluralIndex = i.plural), p;
}
Ga();
/*!
  * vue-i18n v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Us = "11.1.3";
function Ys() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (Rt().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (Rt().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Rt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Rt().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Be = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: ds,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32
};
function He(e, ...t) {
  return Un(e, null, void 0);
}
const di = /* @__PURE__ */ Pt("__translateVNode"), ui = /* @__PURE__ */ Pt("__datetimeParts"), fi = /* @__PURE__ */ Pt("__numberParts"), fr = Pt("__setPluralRules"), mr = /* @__PURE__ */ Pt("__injectWithOption"), mi = /* @__PURE__ */ Pt("__dispose");
function vn(e) {
  if (!ce(e) || et(e))
    return e;
  for (const t in e)
    if (je(e, t))
      if (!t.includes("."))
        ce(e[t]) && vn(e[t]);
      else {
        const n = t.split("."), i = n.length - 1;
        let r = e, s = !1;
        for (let l = 0; l < i; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = me()), !ce(r[n[l]])) {
            s = !0;
            break;
          }
          r = r[n[l]];
        }
        if (s || (et(r) ? tr.includes(n[i]) || delete e[t] : (r[n[i]] = e[t], delete e[t])), !et(r)) {
          const l = r[n[i]];
          ce(l) && vn(l);
        }
      }
  return e;
}
function Ai(e, t) {
  const { messages: n, __i18n: i, messageResolver: r, flatJson: s } = t, l = Q(n) ? n : Ee(i) ? me() : { [e]: me() };
  if (Ee(i) && i.forEach((u) => {
    if ("locale" in u && "resource" in u) {
      const { locale: f, resource: d } = u;
      f ? (l[f] = l[f] || me(), Nn(d, l[f])) : Nn(d, l);
    } else
      W(u) && Nn(JSON.parse(u), l);
  }), r == null && s)
    for (const u in l)
      je(l, u) && vn(l[u]);
  return l;
}
function pr(e) {
  return e.type;
}
function hr(e, t, n) {
  let i = ce(t.messages) ? t.messages : me();
  "__i18nGlobal" in n && (i = Ai(e.locale.value, {
    messages: i,
    __i18n: n.__i18nGlobal
  }));
  const r = Object.keys(i);
  r.length && r.forEach((s) => {
    e.mergeLocaleMessage(s, i[s]);
  });
  {
    if (ce(t.datetimeFormats)) {
      const s = Object.keys(t.datetimeFormats);
      s.length && s.forEach((l) => {
        e.mergeDateTimeFormat(l, t.datetimeFormats[l]);
      });
    }
    if (ce(t.numberFormats)) {
      const s = Object.keys(t.numberFormats);
      s.length && s.forEach((l) => {
        e.mergeNumberFormat(l, t.numberFormats[l]);
      });
    }
  }
}
function lo(e) {
  return N(Xr, null, e, 0);
}
const co = "__INTLIFY_META__", uo = () => [], js = () => !1;
let fo = 0;
function mo(e) {
  return (t, n, i, r) => e(n, i, Kt() || void 0, r);
}
const Xs = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Kt();
  let t = null;
  return e && (t = pr(e)[co]) ? { [co]: t } : null;
};
function Li(e = {}) {
  const { __root: t, __injectWithOption: n } = e, i = t === void 0, r = e.flatJson, s = Fn ? ae : Yr;
  let l = le(e.inheritLocale) ? e.inheritLocale : !0;
  const u = s(
    // prettier-ignore
    t && l ? t.locale.value : W(e.locale) ? e.locale : gn
  ), f = s(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : W(e.fallbackLocale) || Ee(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : u.value
  ), d = s(Ai(u.value, e)), b = s(Q(e.datetimeFormats) ? e.datetimeFormats : { [u.value]: {} }), g = s(Q(e.numberFormats) ? e.numberFormats : { [u.value]: {} });
  let p = t ? t.missingWarn : le(e.missingWarn) || Jt(e.missingWarn) ? e.missingWarn : !0, x = t ? t.fallbackWarn : le(e.fallbackWarn) || Jt(e.fallbackWarn) ? e.fallbackWarn : !0, k = t ? t.fallbackRoot : le(e.fallbackRoot) ? e.fallbackRoot : !0, S = !!e.fallbackFormat, P = ve(e.missing) ? e.missing : null, h = ve(e.missing) ? mo(e.missing) : null, T = ve(e.postTranslation) ? e.postTranslation : null, I = t ? t.warnHtmlMessage : le(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, E = !!e.escapeParameter;
  const F = t ? t.modifiers : Q(e.modifiers) ? e.modifiers : {};
  let q = e.pluralRules || t && t.pluralRules, $;
  $ = (() => {
    i && Qi(null);
    const a = {
      version: Us,
      locale: u.value,
      fallbackLocale: f.value,
      messages: d.value,
      modifiers: F,
      pluralRules: q,
      missing: h === null ? void 0 : h,
      missingWarn: p,
      fallbackWarn: x,
      fallbackFormat: S,
      unresolving: !0,
      postTranslation: T === null ? void 0 : T,
      warnHtmlMessage: I,
      escapeParameter: E,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    a.datetimeFormats = b.value, a.numberFormats = g.value, a.__datetimeFormatters = Q($) ? $.__datetimeFormatters : void 0, a.__numberFormatters = Q($) ? $.__numberFormatters : void 0;
    const c = Ls(a);
    return i && Qi(c), c;
  })(), sn($, u.value, f.value);
  function G() {
    return [
      u.value,
      f.value,
      d.value,
      b.value,
      g.value
    ];
  }
  const U = be({
    get: () => u.value,
    set: (a) => {
      $.locale = a, u.value = a;
    }
  }), se = be({
    get: () => f.value,
    set: (a) => {
      $.fallbackLocale = a, f.value = a, sn($, u.value, a);
    }
  }), K = be(() => d.value), Te = /* @__PURE__ */ be(() => b.value), we = /* @__PURE__ */ be(() => g.value);
  function Oe() {
    return ve(T) ? T : null;
  }
  function pe(a) {
    T = a, $.postTranslation = a;
  }
  function oe() {
    return P;
  }
  function Re(a) {
    a !== null && (h = mo(a)), P = a, $.missing = h;
  }
  const ye = (a, c, m, _, A, L) => {
    G();
    let O;
    try {
      __INTLIFY_PROD_DEVTOOLS__, i || ($.fallbackContext = t ? As() : void 0), O = a($);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, i || ($.fallbackContext = void 0);
    }
    if (m !== "translate exists" && // for not `te` (e.g `t`)
    Se(O) && O === Yn || m === "translate exists" && !O) {
      const [V, H] = c();
      return t && k ? _(t) : A(V);
    } else {
      if (L(O))
        return O;
      throw He(Be.UNEXPECTED_RETURN_TYPE);
    }
  };
  function ot(...a) {
    return ye((c) => Reflect.apply(so, null, [c, ...a]), () => ci(...a), "translate", (c) => Reflect.apply(c.t, c, [...a]), (c) => c, (c) => W(c));
  }
  function Ht(...a) {
    const [c, m, _] = a;
    if (_ && !ce(_))
      throw He(Be.INVALID_ARGUMENT);
    return ot(c, m, Ae({ resolvedMessage: !0 }, _ || {}));
  }
  function Qt(...a) {
    return ye((c) => Reflect.apply(to, null, [c, ...a]), () => si(...a), "datetime format", (c) => Reflect.apply(c.d, c, [...a]), () => Ji, (c) => W(c));
  }
  function Wt(...a) {
    return ye((c) => Reflect.apply(io, null, [c, ...a]), () => li(...a), "number format", (c) => Reflect.apply(c.n, c, [...a]), () => Ji, (c) => W(c));
  }
  function en(a) {
    return a.map((c) => W(c) || Se(c) || le(c) ? lo(String(c)) : c);
  }
  const Vt = {
    normalize: en,
    interpolate: (a) => a,
    type: "vnode"
  };
  function tn(...a) {
    return ye((c) => {
      let m;
      const _ = c;
      try {
        _.processor = Vt, m = Reflect.apply(so, null, [_, ...a]);
      } finally {
        _.processor = null;
      }
      return m;
    }, () => ci(...a), "translate", (c) => c[di](...a), (c) => [lo(c)], (c) => Ee(c));
  }
  function Ut(...a) {
    return ye((c) => Reflect.apply(io, null, [c, ...a]), () => li(...a), "number format", (c) => c[fi](...a), uo, (c) => W(c) || Ee(c));
  }
  function nn(...a) {
    return ye((c) => Reflect.apply(to, null, [c, ...a]), () => si(...a), "datetime format", (c) => c[ui](...a), uo, (c) => W(c) || Ee(c));
  }
  function mt(a) {
    q = a, $.pluralRules = q;
  }
  function pt(a, c) {
    return ye(() => {
      if (!a)
        return !1;
      const m = W(c) ? c : u.value, _ = xe(m), A = $.messageResolver(_, a);
      return et(A) || Ve(A) || W(A);
    }, () => [a], "translate exists", (m) => Reflect.apply(m.te, m, [a, c]), js, (m) => le(m));
  }
  function on(a) {
    let c = null;
    const m = nr($, f.value, u.value);
    for (let _ = 0; _ < m.length; _++) {
      const A = d.value[m[_]] || {}, L = $.messageResolver(A, a);
      if (L != null) {
        c = L;
        break;
      }
    }
    return c;
  }
  function Ot(a) {
    const c = on(a);
    return c ?? (t ? t.tm(a) || {} : {});
  }
  function xe(a) {
    return d.value[a] || {};
  }
  function ht(a, c) {
    if (r) {
      const m = { [a]: c };
      for (const _ in m)
        je(m, _) && vn(m[_]);
      c = m[a];
    }
    d.value[a] = c, $.messages = d.value;
  }
  function rt(a, c) {
    d.value[a] = d.value[a] || {};
    const m = { [a]: c };
    if (r)
      for (const _ in m)
        je(m, _) && vn(m[_]);
    c = m[a], Nn(c, d.value[a]), $.messages = d.value;
  }
  function rn(a) {
    return b.value[a] || {};
  }
  function v(a, c) {
    b.value[a] = c, $.datetimeFormats = b.value, no($, a, c);
  }
  function y(a, c) {
    b.value[a] = Ae(b.value[a] || {}, c), $.datetimeFormats = b.value, no($, a, c);
  }
  function R(a) {
    return g.value[a] || {};
  }
  function Y(a, c) {
    g.value[a] = c, $.numberFormats = g.value, oo($, a, c);
  }
  function _e(a, c) {
    g.value[a] = Ae(g.value[a] || {}, c), $.numberFormats = g.value, oo($, a, c);
  }
  fo++, t && Fn && (qe(t.locale, (a) => {
    l && (u.value = a, $.locale = a, sn($, u.value, f.value));
  }), qe(t.fallbackLocale, (a) => {
    l && (f.value = a, $.fallbackLocale = a, sn($, u.value, f.value));
  }));
  const o = {
    id: fo,
    locale: U,
    fallbackLocale: se,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(a) {
      l = a, a && t && (u.value = t.locale.value, f.value = t.fallbackLocale.value, sn($, u.value, f.value));
    },
    get availableLocales() {
      return Object.keys(d.value).sort();
    },
    messages: K,
    get modifiers() {
      return F;
    },
    get pluralRules() {
      return q || {};
    },
    get isGlobal() {
      return i;
    },
    get missingWarn() {
      return p;
    },
    set missingWarn(a) {
      p = a, $.missingWarn = p;
    },
    get fallbackWarn() {
      return x;
    },
    set fallbackWarn(a) {
      x = a, $.fallbackWarn = x;
    },
    get fallbackRoot() {
      return k;
    },
    set fallbackRoot(a) {
      k = a;
    },
    get fallbackFormat() {
      return S;
    },
    set fallbackFormat(a) {
      S = a, $.fallbackFormat = S;
    },
    get warnHtmlMessage() {
      return I;
    },
    set warnHtmlMessage(a) {
      I = a, $.warnHtmlMessage = a;
    },
    get escapeParameter() {
      return E;
    },
    set escapeParameter(a) {
      E = a, $.escapeParameter = a;
    },
    t: ot,
    getLocaleMessage: xe,
    setLocaleMessage: ht,
    mergeLocaleMessage: rt,
    getPostTranslationHandler: Oe,
    setPostTranslationHandler: pe,
    getMissingHandler: oe,
    setMissingHandler: Re,
    [fr]: mt
  };
  return o.datetimeFormats = Te, o.numberFormats = we, o.rt = Ht, o.te = pt, o.tm = Ot, o.d = Qt, o.n = Wt, o.getDateTimeFormat = rn, o.setDateTimeFormat = v, o.mergeDateTimeFormat = y, o.getNumberFormat = R, o.setNumberFormat = Y, o.mergeNumberFormat = _e, o[mr] = n, o[di] = tn, o[ui] = nn, o[fi] = Ut, o;
}
function Gs(e) {
  const t = W(e.locale) ? e.locale : gn, n = W(e.fallbackLocale) || Ee(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, i = ve(e.missing) ? e.missing : void 0, r = le(e.silentTranslationWarn) || Jt(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, s = le(e.silentFallbackWarn) || Jt(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, l = le(e.fallbackRoot) ? e.fallbackRoot : !0, u = !!e.formatFallbackMessages, f = Q(e.modifiers) ? e.modifiers : {}, d = e.pluralizationRules, b = ve(e.postTranslation) ? e.postTranslation : void 0, g = W(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, p = !!e.escapeParameterHtml, x = le(e.sync) ? e.sync : !0;
  let k = e.messages;
  if (Q(e.sharedMessages)) {
    const F = e.sharedMessages;
    k = Object.keys(F).reduce(($, J) => {
      const G = $[J] || ($[J] = {});
      return Ae(G, F[J]), $;
    }, k || {});
  }
  const { __i18n: S, __root: P, __injectWithOption: h } = e, T = e.datetimeFormats, I = e.numberFormats, E = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: k,
    flatJson: E,
    datetimeFormats: T,
    numberFormats: I,
    missing: i,
    missingWarn: r,
    fallbackWarn: s,
    fallbackRoot: l,
    fallbackFormat: u,
    modifiers: f,
    pluralRules: d,
    postTranslation: b,
    warnHtmlMessage: g,
    escapeParameter: p,
    messageResolver: e.messageResolver,
    inheritLocale: x,
    __i18n: S,
    __root: P,
    __injectWithOption: h
  };
}
function pi(e = {}) {
  const t = Li(Gs(e)), { __extender: n } = e, i = {
    // id
    id: t.id,
    // locale
    get locale() {
      return t.locale.value;
    },
    set locale(r) {
      t.locale.value = r;
    },
    // fallbackLocale
    get fallbackLocale() {
      return t.fallbackLocale.value;
    },
    set fallbackLocale(r) {
      t.fallbackLocale.value = r;
    },
    // messages
    get messages() {
      return t.messages.value;
    },
    // datetimeFormats
    get datetimeFormats() {
      return t.datetimeFormats.value;
    },
    // numberFormats
    get numberFormats() {
      return t.numberFormats.value;
    },
    // availableLocales
    get availableLocales() {
      return t.availableLocales;
    },
    // missing
    get missing() {
      return t.getMissingHandler();
    },
    set missing(r) {
      t.setMissingHandler(r);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return le(t.missingWarn) ? !t.missingWarn : t.missingWarn;
    },
    set silentTranslationWarn(r) {
      t.missingWarn = le(r) ? !r : r;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return le(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn;
    },
    set silentFallbackWarn(r) {
      t.fallbackWarn = le(r) ? !r : r;
    },
    // modifiers
    get modifiers() {
      return t.modifiers;
    },
    // formatFallbackMessages
    get formatFallbackMessages() {
      return t.fallbackFormat;
    },
    set formatFallbackMessages(r) {
      t.fallbackFormat = r;
    },
    // postTranslation
    get postTranslation() {
      return t.getPostTranslationHandler();
    },
    set postTranslation(r) {
      t.setPostTranslationHandler(r);
    },
    // sync
    get sync() {
      return t.inheritLocale;
    },
    set sync(r) {
      t.inheritLocale = r;
    },
    // warnInHtmlMessage
    get warnHtmlInMessage() {
      return t.warnHtmlMessage ? "warn" : "off";
    },
    set warnHtmlInMessage(r) {
      t.warnHtmlMessage = r !== "off";
    },
    // escapeParameterHtml
    get escapeParameterHtml() {
      return t.escapeParameter;
    },
    set escapeParameterHtml(r) {
      t.escapeParameter = r;
    },
    // pluralizationRules
    get pluralizationRules() {
      return t.pluralRules || {};
    },
    // for internal
    __composer: t,
    // t
    t(...r) {
      return Reflect.apply(t.t, t, [...r]);
    },
    // rt
    rt(...r) {
      return Reflect.apply(t.rt, t, [...r]);
    },
    // te
    te(r, s) {
      return t.te(r, s);
    },
    // tm
    tm(r) {
      return t.tm(r);
    },
    // getLocaleMessage
    getLocaleMessage(r) {
      return t.getLocaleMessage(r);
    },
    // setLocaleMessage
    setLocaleMessage(r, s) {
      t.setLocaleMessage(r, s);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(r, s) {
      t.mergeLocaleMessage(r, s);
    },
    // d
    d(...r) {
      return Reflect.apply(t.d, t, [...r]);
    },
    // getDateTimeFormat
    getDateTimeFormat(r) {
      return t.getDateTimeFormat(r);
    },
    // setDateTimeFormat
    setDateTimeFormat(r, s) {
      t.setDateTimeFormat(r, s);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(r, s) {
      t.mergeDateTimeFormat(r, s);
    },
    // n
    n(...r) {
      return Reflect.apply(t.n, t, [...r]);
    },
    // getNumberFormat
    getNumberFormat(r) {
      return t.getNumberFormat(r);
    },
    // setNumberFormat
    setNumberFormat(r, s) {
      t.setNumberFormat(r, s);
    },
    // mergeNumberFormat
    mergeNumberFormat(r, s) {
      t.mergeNumberFormat(r, s);
    }
  };
  return i.__extender = n, i;
}
function Ks(e, t, n) {
  return {
    beforeCreate() {
      const i = Kt();
      if (!i)
        throw He(Be.UNEXPECTED_ERROR);
      const r = this.$options;
      if (r.i18n) {
        const s = r.i18n;
        if (r.__i18n && (s.__i18n = r.__i18n), s.__root = t, this === this.$root)
          this.$i18n = po(e, s);
        else {
          s.__injectWithOption = !0, s.__extender = n.__vueI18nExtend, this.$i18n = pi(s);
          const l = this.$i18n;
          l.__extender && (l.__disposer = l.__extender(this.$i18n));
        }
      } else if (r.__i18n)
        if (this === this.$root)
          this.$i18n = po(e, r);
        else {
          this.$i18n = pi({
            __i18n: r.__i18n,
            __injectWithOption: !0,
            __extender: n.__vueI18nExtend,
            __root: t
          });
          const s = this.$i18n;
          s.__extender && (s.__disposer = s.__extender(this.$i18n));
        }
      else
        this.$i18n = e;
      r.__i18nGlobal && hr(t, r, r), this.$t = (...s) => this.$i18n.t(...s), this.$rt = (...s) => this.$i18n.rt(...s), this.$te = (s, l) => this.$i18n.te(s, l), this.$d = (...s) => this.$i18n.d(...s), this.$n = (...s) => this.$i18n.n(...s), this.$tm = (s) => this.$i18n.tm(s), n.__setInstance(i, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const i = Kt();
      if (!i)
        throw He(Be.UNEXPECTED_ERROR);
      const r = this.$i18n;
      delete this.$t, delete this.$rt, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, r.__disposer && (r.__disposer(), delete r.__disposer, delete r.__extender), n.__deleteInstance(i), delete this.$i18n;
    }
  };
}
function po(e, t) {
  e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[fr](t.pluralizationRules || e.pluralizationRules);
  const n = Ai(e.locale, {
    messages: t.messages,
    __i18n: t.__i18n
  });
  return Object.keys(n).forEach((i) => e.mergeLocaleMessage(i, n[i])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((i) => e.mergeDateTimeFormat(i, t.datetimeFormats[i])), t.numberFormats && Object.keys(t.numberFormats).forEach((i) => e.mergeNumberFormat(i, t.numberFormats[i])), e;
}
const Oi = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function Js({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((i, r) => [
    ...i,
    // prettier-ignore
    ...r.type === ue ? r.children : [r]
  ], []) : t.reduce((n, i) => {
    const r = e[i];
    return r && (n[i] = r()), n;
  }, me());
}
function gr() {
  return ue;
}
const Zs = /* @__PURE__ */ Bt({
  /* eslint-disable */
  name: "i18n-t",
  props: Ae({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: (e) => Se(e) || !isNaN(e)
    }
  }, Oi),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: i } = t, r = e.i18n || Ce({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const s = Object.keys(n).filter((g) => g !== "_"), l = me();
      e.locale && (l.locale = e.locale), e.plural !== void 0 && (l.plural = W(e.plural) ? +e.plural : e.plural);
      const u = Js(t, s), f = r[di](e.keypath, u, l), d = Ae(me(), i), b = W(e.tag) || ce(e.tag) ? e.tag : gr();
      return zo(b, d, f);
    };
  }
}), ho = Zs;
function Qs(e) {
  return Ee(e) && !W(e[0]);
}
function vr(e, t, n, i) {
  const { slots: r, attrs: s } = t;
  return () => {
    const l = { part: !0 };
    let u = me();
    e.locale && (l.locale = e.locale), W(e.format) ? l.key = e.format : ce(e.format) && (W(e.format.key) && (l.key = e.format.key), u = Object.keys(e.format).reduce((p, x) => n.includes(x) ? Ae(me(), p, { [x]: e.format[x] }) : p, me()));
    const f = i(e.value, l, u);
    let d = [l.key];
    Ee(f) ? d = f.map((p, x) => {
      const k = r[p.type], S = k ? k({ [p.type]: p.value, index: x, parts: f }) : [p.value];
      return Qs(S) && (S[0].key = `${p.type}-${x}`), S;
    }) : W(f) && (d = [f]);
    const b = Ae(me(), s), g = W(e.tag) || ce(e.tag) ? e.tag : gr();
    return zo(g, b, d);
  };
}
const el = /* @__PURE__ */ Bt({
  /* eslint-disable */
  name: "i18n-n",
  props: Ae({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Oi),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Ce({
      useScope: e.scope,
      __useComponent: !0
    });
    return vr(e, t, cr, (...i) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[fi](...i)
    ));
  }
}), go = el;
function tl(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const i = n.__getInstance(t);
    return i != null ? i.__composer : e.global.__composer;
  }
}
function nl(e) {
  const t = (l) => {
    const { instance: u, value: f } = l;
    if (!u || !u.$)
      throw He(Be.UNEXPECTED_ERROR);
    const d = tl(e, u.$), b = vo(f);
    return [
      Reflect.apply(d.t, d, [...yo(b)]),
      d
    ];
  };
  return {
    created: (l, u) => {
      const [f, d] = t(u);
      Fn && e.global === d && (l.__i18nWatcher = qe(d.locale, () => {
        u.instance && u.instance.$forceUpdate();
      })), l.__composer = d, l.textContent = f;
    },
    unmounted: (l) => {
      Fn && l.__i18nWatcher && (l.__i18nWatcher(), l.__i18nWatcher = void 0, delete l.__i18nWatcher), l.__composer && (l.__composer = void 0, delete l.__composer);
    },
    beforeUpdate: (l, { value: u }) => {
      if (l.__composer) {
        const f = l.__composer, d = vo(u);
        l.textContent = Reflect.apply(f.t, f, [
          ...yo(d)
        ]);
      }
    },
    getSSRProps: (l) => {
      const [u] = t(l);
      return { textContent: u };
    }
  };
}
function vo(e) {
  if (W(e))
    return { path: e };
  if (Q(e)) {
    if (!("path" in e))
      throw He(Be.REQUIRED_VALUE, "path");
    return e;
  } else
    throw He(Be.INVALID_VALUE);
}
function yo(e) {
  const { path: t, locale: n, args: i, choice: r, plural: s } = e, l = {}, u = i || {};
  return W(n) && (l.locale = n), Se(r) && (l.plural = r), Se(s) && (l.plural = s), [t, u, l];
}
function il(e, t, ...n) {
  const i = Q(n[0]) ? n[0] : {};
  (le(i.globalInstall) ? i.globalInstall : !0) && ([ho.name, "I18nT"].forEach((s) => e.component(s, ho)), [go.name, "I18nN"].forEach((s) => e.component(s, go)), [bo.name, "I18nD"].forEach((s) => e.component(s, bo))), e.directive("t", nl(t));
}
const ol = /* @__PURE__ */ Pt("global-vue-i18n");
function rl(e = {}) {
  const t = __VUE_I18N_LEGACY_API__ && le(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, n = le(e.globalInjection) ? e.globalInjection : !0, i = /* @__PURE__ */ new Map(), [r, s] = al(e, t), l = /* @__PURE__ */ Pt("");
  function u(g) {
    return i.get(g) || null;
  }
  function f(g, p) {
    i.set(g, p);
  }
  function d(g) {
    i.delete(g);
  }
  const b = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && t ? "legacy" : "composition";
    },
    // install plugin
    async install(g, ...p) {
      if (g.__VUE_I18N_SYMBOL__ = l, g.provide(g.__VUE_I18N_SYMBOL__, b), Q(p[0])) {
        const S = p[0];
        b.__composerExtend = S.__composerExtend, b.__vueI18nExtend = S.__vueI18nExtend;
      }
      let x = null;
      !t && n && (x = pl(g, b.global)), __VUE_I18N_FULL_INSTALL__ && il(g, b, ...p), __VUE_I18N_LEGACY_API__ && t && g.mixin(Ks(s, s.__composer, b));
      const k = g.unmount;
      g.unmount = () => {
        x && x(), b.dispose(), k();
      };
    },
    // global accessor
    get global() {
      return s;
    },
    dispose() {
      r.stop();
    },
    // @internal
    __instances: i,
    // @internal
    __getInstance: u,
    // @internal
    __setInstance: f,
    // @internal
    __deleteInstance: d
  };
  return b;
}
function Ce(e = {}) {
  const t = Kt();
  if (t == null)
    throw He(Be.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw He(Be.NOT_INSTALLED);
  const n = sl(t), i = cl(n), r = pr(t), s = ll(e, r);
  if (s === "global")
    return hr(i, e, r), i;
  if (s === "parent") {
    let f = dl(n, t, e.__useComponent);
    return f == null && (f = i), f;
  }
  const l = n;
  let u = l.__getInstance(t);
  if (u == null) {
    const f = Ae({}, e);
    "__i18n" in r && (f.__i18n = r.__i18n), i && (f.__root = i), u = Li(f), l.__composerExtend && (u[mi] = l.__composerExtend(u)), fl(l, t, u), l.__setInstance(t, u);
  }
  return u;
}
function al(e, t) {
  const n = Ur(), i = __VUE_I18N_LEGACY_API__ && t ? n.run(() => pi(e)) : n.run(() => Li(e));
  if (i == null)
    throw He(Be.UNEXPECTED_ERROR);
  return [n, i];
}
function sl(e) {
  const t = ft(e.isCE ? ol : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw He(e.isCE ? Be.NOT_INSTALLED_WITH_PROVIDE : Be.UNEXPECTED_ERROR);
  return t;
}
function ll(e, t) {
  return Vn(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function cl(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function dl(e, t, n = !1) {
  let i = null;
  const r = t.root;
  let s = ul(t, n);
  for (; s != null; ) {
    const l = e;
    if (e.mode === "composition")
      i = l.__getInstance(s);
    else if (__VUE_I18N_LEGACY_API__) {
      const u = l.__getInstance(s);
      u != null && (i = u.__composer, n && i && !i[mr] && (i = null));
    }
    if (i != null || r === s)
      break;
    s = s.parent;
  }
  return i;
}
function ul(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function fl(e, t, n) {
  Tt(() => {
  }, t), xn(() => {
    const i = n;
    e.__deleteInstance(t);
    const r = i[mi];
    r && (r(), delete i[mi]);
  }, t);
}
const ml = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], _o = ["t", "rt", "d", "n", "tm", "te"];
function pl(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return ml.forEach((r) => {
    const s = Object.getOwnPropertyDescriptor(t, r);
    if (!s)
      throw He(Be.UNEXPECTED_ERROR);
    const l = jr(s.value) ? {
      get() {
        return s.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(u) {
        s.value.value = u;
      }
    } : {
      get() {
        return s.get && s.get();
      }
    };
    Object.defineProperty(n, r, l);
  }), e.config.globalProperties.$i18n = n, _o.forEach((r) => {
    const s = Object.getOwnPropertyDescriptor(t, r);
    if (!s || !s.value)
      throw He(Be.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${r}`, s);
  }), () => {
    delete e.config.globalProperties.$i18n, _o.forEach((r) => {
      delete e.config.globalProperties[`$${r}`];
    });
  };
}
const hl = /* @__PURE__ */ Bt({
  /* eslint-disable */
  name: "i18n-d",
  props: Ae({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Oi),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Ce({
      useScope: e.scope,
      __useComponent: !0
    });
    return vr(e, t, lr, (...i) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[ui](...i)
    ));
  }
}), bo = hl;
Ys();
Ts(rs);
Ss(ws);
Es(nr);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = Rt();
  e.__INTLIFY__ = !0, as(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const gl = {
  en: {
    accommodationRules: {
      title: "Accommodation rules",
      agreementSentence: "I confirm that I have read and agree with",
      agreementSentenceShort: "I confirm that"
    },
    accommodationType: {
      thumbnail: "Thumbnail",
      notAvailable: {
        title: "Oops! Looks like this accommodation type is fully booked for the selected dates.",
        description: "Feel free to try different dates or explore other available options — we’re sure you’ll find something perfect!"
      }
    },
    chosenAccommodation: {
      title: "Accommodations",
      adults: "{n} adult | {n} adults",
      children: "{n} child | {n} children",
      willPay: "I will pay by",
      totalAmount: "Total amount",
      prepaymentAmount: "Pay now",
      onArrivalAmount: "Amount to be paid on arrival",
      delete: "Delete",
      penalty: "Cancellation Penalty"
    },
    contactInformation: {
      title: "Contact Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phoneNumber: "Phone number",
      confirmationInfo: "You will receive a booking confirmation by email. The owner of the place may contact you by phone to clarify the details."
    },
    specialRequest: {
      title: "Special request",
      comment: "Comment",
      checkInOutTime: "Check-in/out Time",
      checkInTimeFrom: "Check-in time from",
      checkOutTimeUntil: "Check-out time until",
      arrivalTime: "Your arrival time",
      noneTime: "I do not know"
    },
    globalError: {
      title: "Sorry, something went wrong",
      description: "We couldn't load the data. Please try refreshing the page or come back later.",
      reload: "Reload"
    },
    price: {
      free: "Free"
    },
    ratePlan: {
      payments: "Payments",
      or: "OR",
      los: "{n} night | {n} nights",
      action: "Book now",
      boardType: {
        ROOM_ONLY: "Room Only",
        BREAKFAST: "Breakfast",
        HALF_BOARD: "Half Board",
        FULL_BOARD: "Full Board",
        ALL_INCLUSIVE: "All Inclusive",
        BUFFET_BREAKFAST: "Buffet Breakfast",
        CARIBBEAN_BREAKFAST: "Caribbean Breakfast",
        CONTINENTAL_BREAKFAST: "Continental Breakfast",
        ENGLISH_BREAKFAST: "English Breakfast",
        FULL_BREAKFAST: "Full Breakfast",
        DINNER_BED_AND_BREAKFAST: "Dinner Bed And Breakfast",
        LUNCH: "Lunch",
        DINNER: "Dinner",
        FAMILY_PLAN: "Family Plan",
        AS_BROCHURED: "As Brochured",
        SELF_CATERING: "Self Catering",
        BERMUDA: "Bermuda",
        AMERICAN: "American",
        FAMILY_AMERICAN: "Family American",
        MODIFIED: "Modified"
      },
      scenario: {
        mainBeds: "Main bed(s)",
        extraBeds: "Extra bed(s)",
        family: "Adults + children",
        mainExtraBeds: "Main bed(s) + Extra bed(s)"
      }
    },
    cancellationPolicy: {
      free: "Free cancellation",
      paid: "Paid cancellation",
      beforeFree: "Free cancellation is possible before {date}",
      afterPenaltyStart: "If the cancellation is made after {date}, a penalty of ",
      penalty: {
        days: "{days} days of the booking cost",
        fixed: "{fixedPenalty}",
        percent: "{penaltyPercentage}% of the booking cost",
        percentAndFixed: "{penaltyPercentage}% of the booking cost + {fixedPenalty}",
        daysAndFixed: "{days} days of the booking cost + {fixedPenalty}"
      }
    },
    cancellationProcess: {
      title: "Cancel your reservation",
      description: "На этой странице вы сможете отменить вашу резервацию",
      rules: "Rules of cancellation",
      codeHelp: "Get a cancellation code from your reservation email",
      codeLabel: "Cancellation code",
      action: "Cancel reservation",
      result: {
        success: "Your reservation has been cancelled",
        error: "Problem with cancellation your reservation. Check your cancellation code. If code is valid please contact the administrator."
      }
    },
    summary: {
      complete: "Book Now",
      room: "{n} room | {n} rooms",
      los: "@:ratePlan.los"
    },
    reservation: {
      title: "Your booking is complete!",
      description: {
        waitingPayment: "Please make a prepayment to confirm your booking.",
        waitingConfirmation: "We will try to confirm your booking as soon as possible.",
        confirmed: "Your booking has been successfully confirmed.",
        cancelled: "Your booking has been cancelled.",
        overdue: "The payment time for your booking has expired. It will be cancelled soon."
      },
      nextStep: {
        waitingPayment: "You can pay now to secure your reservation. We’ll hold it for a limited time {untilTime} — if no payment is received, it may be automatically cancelled.",
        waitingConfirmation: "We’re checking availability and will notify you once your booking is confirmed. Please wait — this usually takes no more than 24 hours.",
        confirmed: "Thank you for your reservation! You’ll receive a confirmation email with all details shortly. If you have any questions, feel free to contact us.",
        cancelled: "Unfortunately, this booking is no longer valid. If you still wish to travel, please make a new reservation.",
        overdue: "If you still want to keep your booking, please contact us as soon as possible. Otherwise, it will be automatically cancelled."
      },
      whatIsNext: "What is your next step?",
      specialRequest: "Your request",
      hotelInfo: {
        title: "Contact Information",
        email: "Email"
      },
      payment: {
        action: "Pay Now",
        prepayment: "Prepayment"
      }
    },
    redirectTimer: {
      goToPay: "Proceed to payment",
      waitingLink: "Waiting link to payment...",
      doesntOpen: "Click if it doesn't open",
      windowBlocked: "Failed to open payment window. Please check your pop-up blocker settings OR click on button below."
    }
  }
}, vl = () => ({
  /**
   * @param choice {number} индекс выбора, переданный в $tc: `$tc('path.to.rule', choiceIndex)`
   * @param choicesLength {number} общее количество доступных вариантов
   * @returns финальный индекс для выбора соответственного варианта слова
   */
  ru: function(e, t) {
    if (e === 0)
      return 0;
    const n = e > 10 && e < 20, i = e % 10 === 1;
    return t < 4 ? !n && i ? 1 : 2 : !n && i ? 1 : !n && e % 10 >= 2 && e % 10 <= 4 || t < 4 ? 2 : 3;
  },
  /**
   * Otóż zasada jest taka, że liczebniki 2, 3, 4 oraz liczebniki, których ostatnim członem jest 2, 3, 4 (czyli np. 22, 23, 24, 152, 153, 154 itd.)
   * łączą się z rzeczownikami w mianowniku liczby mnogiej, np. trzy koty, dwadzieścia cztery koty, sto pięćdziesiąt dwa koty.
   *
   * Liczebniki od 5 do 21 i te, które są zakończone na 5-9 (np. 25, 36, 27, 58, 69), łączą się z rzeczownikiem w dopełniaczu liczby mnogiej,
   * np. pięć kotów, siedemnaście kotów, sto siedemdziesiąt siedem kotów.
   *
   * 1 noc | 2 noce | 5 nocy
   *
   * @param choice
   */
  pl: function(e) {
    return e === 0 ? 0 : e === 1 ? 1 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 2 : 3;
  }
}), qn = rl({
  legacy: !1,
  fallbackLocale: "en",
  locale: "en",
  messages: gl,
  pluralizationRules: vl()
}), cn = "choose_accommodation", yr = "empty_cart", Rn = "booking_confirmation", wo = "reservation_details", ei = "cancel_reservation", kn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, yl = {}, _l = { class: "information-block" };
function bl(e, t) {
  return C(), M("section", _l, [
    ge(e.$slots, "default")
  ]);
}
const Ge = /* @__PURE__ */ kn(yl, [["render", bl]]), wl = {}, xl = { class: "divider" };
function kl(e, t) {
  return C(), M("div", xl);
}
const Pe = /* @__PURE__ */ kn(wl, [["render", kl]]), Tl = { class: "header" }, Sl = { class: "content" }, El = { class: "amenities" }, Cl = { class: "footer" }, Tn = {
  __name: "BflexSkeletonLoader",
  props: {
    isResult: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (C(), ie(Ge, {
      class: Qe(["accommodation-skeleton", { "accommodation-result": e.isResult }])
    }, {
      default: B(() => [
        w("div", Tl, [
          n[2] || (n[2] = w("div", { class: "thumbnail" }, null, -1)),
          w("div", Sl, [
            n[0] || (n[0] = w("div", { class: "title-skeleton" }, null, -1)),
            n[1] || (n[1] = w("div", { class: "description" }, [
              w("div", { class: "line" }),
              w("div", { class: "line" }),
              w("div", { class: "line line-short" })
            ], -1)),
            w("div", El, [
              (C(), M(ue, null, Le(5, (i) => w("div", {
                key: i,
                class: "amenity-item"
              })), 64))
            ])
          ])
        ]),
        N(Pe),
        w("div", Cl, [
          n[4] || (n[4] = w("div", { class: "option-header" }, [
            w("div", { class: "option-title" }),
            w("div", { class: "option-value" })
          ], -1)),
          N(Pe),
          (C(), M(ue, null, Le(2, (i) => w("div", {
            key: i,
            class: "room-option"
          }, n[3] || (n[3] = [
            w("div", { class: "option-details" }, [
              w("div", { class: "option-name" }),
              w("div", { class: "option-description" })
            ], -1),
            w("div", { class: "price-section" }, [
              w("div", { class: "price" }),
              w("div", { class: "book-button" })
            ], -1)
          ]))), 64))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
};
function Pl(e, t, n = "en-GB") {
  const i = { day: "numeric", month: "short" }, r = { day: "numeric", month: "short", year: "numeric" }, s = new Date(e), l = new Date(t), u = s.getFullYear() === l.getFullYear() && s.getMonth() === l.getMonth(), f = s.getFullYear() === l.getFullYear();
  return u ? `${s.toLocaleDateString(n, i)} — ${l.toLocaleDateString(n, i)} ${l.getFullYear()}` : f ? `${s.toLocaleDateString(n, i)} — ${l.toLocaleDateString(n, i)} ${l.getFullYear()}` : `${s.toLocaleDateString(n, r)} — ${l.toLocaleDateString(n, r)}`;
}
function _r(e, t, n = "nights") {
  const i = new Date(e), l = (new Date(t) - i) / (1e3 * 60 * 60 * 24);
  if (n === "nights")
    return l;
  if (n === "days")
    return l + 1;
  throw new Error('Invalid unit. Use "nights" or "days".');
}
function Al(e, t, n = 60) {
  const i = [], [r, s] = e.split(":").map(Number), [l, u] = t.split(":").map(Number), f = /* @__PURE__ */ new Date();
  f.setHours(r, s, 0, 0);
  const d = /* @__PURE__ */ new Date();
  d.setHours(l, u, 0, 0);
  const b = new Date(f);
  for (; b <= d; ) {
    const g = b.getHours().toString().padStart(2, "0"), p = b.getMinutes().toString().padStart(2, "0");
    i.push(`${g}:${p}`), b.setMinutes(b.getMinutes() + n);
  }
  return i;
}
function Ll(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Dn = { exports: {} }, Ol = Dn.exports, xo;
function $l() {
  return xo || (xo = 1, function(e, t) {
    (function(n, i) {
      e.exports = i();
    })(Ol, function() {
      function n(o, a) {
        if (!(o instanceof a)) throw new TypeError("Cannot call a class as a function");
      }
      function i(o, a) {
        for (var c = 0; c < a.length; c++) {
          var m = a[c];
          m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(o, s(m.key), m);
        }
      }
      function r(o, a, c) {
        return a && i(o.prototype, a), Object.defineProperty(o, "prototype", { writable: !1 }), o;
      }
      function s(o) {
        var a = function(c, m) {
          if (typeof c != "object" || !c) return c;
          var _ = c[Symbol.toPrimitive];
          if (_ !== void 0) {
            var A = _.call(c, m);
            if (typeof A != "object") return A;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(c);
        }(o, "string");
        return typeof a == "symbol" ? a : a + "";
      }
      function l(o) {
        return (l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
          return typeof a;
        } : function(a) {
          return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
        })(o);
      }
      var u = Date.now();
      function f() {
        var o = {}, a = !0, c = 0, m = arguments.length;
        Object.prototype.toString.call(arguments[0]) === "[object Boolean]" && (a = arguments[0], c++);
        for (var _ = function(L) {
          for (var O in L) Object.prototype.hasOwnProperty.call(L, O) && (a && Object.prototype.toString.call(L[O]) === "[object Object]" ? o[O] = f(!0, o[O], L[O]) : o[O] = L[O]);
        }; c < m; c++) {
          var A = arguments[c];
          _(A);
        }
        return o;
      }
      function d(o, a) {
        if ((K(o) || o === window || o === document) && (o = [o]), we(o) || Oe(o) || (o = [o]), Re(o) != 0) {
          if (we(o) && !Oe(o)) for (var c = o.length, m = 0; m < c && a.call(o[m], o[m], m, o) !== !1; m++) ;
          else if (Oe(o)) {
            for (var _ in o) if (oe(o, _) && a.call(o[_], o[_], _, o) === !1) break;
          }
        }
      }
      function b(o) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, m = o[u] = o[u] || [], _ = { all: m, evt: null, found: null };
        return a && c && Re(m) > 0 && d(m, function(A, L) {
          if (A.eventName == a && A.fn.toString() == c.toString()) return _.found = !0, _.evt = L, !1;
        }), _;
      }
      function g(o) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = a.onElement, m = a.withCallback, _ = a.avoidDuplicate, A = _ === void 0 || _, L = a.once, O = L !== void 0 && L, V = a.useCapture, H = V !== void 0 && V, j = arguments.length > 2 ? arguments[2] : void 0, X = c || [];
        function Z(ee) {
          U(m) && m.call(j, ee, this), O && Z.destroy();
        }
        return se(X) && (X = document.querySelectorAll(X)), Z.destroy = function() {
          d(X, function(ee) {
            var ne = b(ee, o, Z);
            ne.found && ne.all.splice(ne.evt, 1), ee.removeEventListener && ee.removeEventListener(o, Z, H);
          });
        }, d(X, function(ee) {
          var ne = b(ee, o, Z);
          (ee.addEventListener && A && !ne.found || !A) && (ee.addEventListener(o, Z, H), ne.all.push({ eventName: o, fn: Z }));
        }), Z;
      }
      function p(o, a) {
        d(a.split(" "), function(c) {
          return o.classList.add(c);
        });
      }
      function x(o, a) {
        d(a.split(" "), function(c) {
          return o.classList.remove(c);
        });
      }
      function k(o, a) {
        return o.classList.contains(a);
      }
      function S(o, a) {
        for (; o !== document.body; ) {
          if (!(o = o.parentElement)) return !1;
          if (typeof o.matches == "function" ? o.matches(a) : o.msMatchesSelector(a)) return o;
        }
      }
      function P(o) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!o || a === "") return !1;
        if (a === "none") return U(c) && c(), !1;
        var m = q(), _ = a.split(" ");
        d(_, function(A) {
          p(o, "g" + A);
        }), g(m, { onElement: o, avoidDuplicate: !1, once: !0, withCallback: function(A, L) {
          d(_, function(O) {
            x(L, "g" + O);
          }), U(c) && c();
        } });
      }
      function h(o) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        if (a === "") return o.style.webkitTransform = "", o.style.MozTransform = "", o.style.msTransform = "", o.style.OTransform = "", o.style.transform = "", !1;
        o.style.webkitTransform = a, o.style.MozTransform = a, o.style.msTransform = a, o.style.OTransform = a, o.style.transform = a;
      }
      function T(o) {
        o.style.display = "block";
      }
      function I(o) {
        o.style.display = "none";
      }
      function E(o) {
        var a = document.createDocumentFragment(), c = document.createElement("div");
        for (c.innerHTML = o; c.firstChild; ) a.appendChild(c.firstChild);
        return a;
      }
      function F() {
        return { width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight };
      }
      function q() {
        var o, a = document.createElement("fakeelement"), c = { animation: "animationend", OAnimation: "oAnimationEnd", MozAnimation: "animationend", WebkitAnimation: "webkitAnimationEnd" };
        for (o in c) if (a.style[o] !== void 0) return c[o];
      }
      function $(o, a, c, m) {
        if (o()) a();
        else {
          var _;
          c || (c = 100);
          var A = setInterval(function() {
            o() && (clearInterval(A), _ && clearTimeout(_), a());
          }, c);
        }
      }
      function J(o, a, c) {
        if (pe(o)) console.error("Inject assets error");
        else if (U(a) && (c = a, a = !1), se(a) && a in window) U(c) && c();
        else {
          var m;
          if (o.indexOf(".css") !== -1) {
            if ((m = document.querySelectorAll('link[href="' + o + '"]')) && m.length > 0) return void (U(c) && c());
            var _ = document.getElementsByTagName("head")[0], A = _.querySelectorAll('link[rel="stylesheet"]'), L = document.createElement("link");
            return L.rel = "stylesheet", L.type = "text/css", L.href = o, L.media = "all", A ? _.insertBefore(L, A[0]) : _.appendChild(L), void (U(c) && c());
          }
          if ((m = document.querySelectorAll('script[src="' + o + '"]')) && m.length > 0) {
            if (U(c)) {
              if (se(a)) return $(function() {
                return window[a] !== void 0;
              }, function() {
                c();
              }), !1;
              c();
            }
          } else {
            var O = document.createElement("script");
            O.type = "text/javascript", O.src = o, O.onload = function() {
              if (U(c)) {
                if (se(a)) return $(function() {
                  return window[a] !== void 0;
                }, function() {
                  c();
                }), !1;
                c();
              }
            }, document.body.appendChild(O);
          }
        }
      }
      function G() {
        return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
      }
      function U(o) {
        return typeof o == "function";
      }
      function se(o) {
        return typeof o == "string";
      }
      function K(o) {
        return !(!o || !o.nodeType || o.nodeType != 1);
      }
      function Te(o) {
        return Array.isArray(o);
      }
      function we(o) {
        return o && o.length && isFinite(o.length);
      }
      function Oe(o) {
        return l(o) === "object" && o != null && !U(o) && !Te(o);
      }
      function pe(o) {
        return o == null;
      }
      function oe(o, a) {
        return o !== null && hasOwnProperty.call(o, a);
      }
      function Re(o) {
        if (Oe(o)) {
          if (o.keys) return o.keys().length;
          var a = 0;
          for (var c in o) oe(o, c) && a++;
          return a;
        }
        return o.length;
      }
      function ye(o) {
        return !isNaN(parseFloat(o)) && isFinite(o);
      }
      function ot() {
        var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1, a = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
        if (!a.length) return !1;
        if (a.length == 1) return a[0];
        typeof o == "string" && (o = parseInt(o));
        var c = [];
        d(a, function(O) {
          c.push(O.getAttribute("data-taborder"));
        });
        var m = Math.max.apply(Math, c.map(function(O) {
          return parseInt(O);
        })), _ = o < 0 ? 1 : o + 1;
        _ > m && (_ = "1");
        var A = c.filter(function(O) {
          return O >= parseInt(_);
        }), L = A.sort()[0];
        return document.querySelector('.gbtn[data-taborder="'.concat(L, '"]'));
      }
      function Ht(o) {
        if (o.events.hasOwnProperty("keyboard")) return !1;
        o.events.keyboard = g("keydown", { onElement: window, withCallback: function(a, c) {
          var m = (a = a || window.event).keyCode;
          if (m == 9) {
            var _ = document.querySelector(".gbtn.focused");
            if (!_) {
              var A = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
              if (A == "input" || A == "textarea" || A == "button") return;
            }
            a.preventDefault();
            var L = document.querySelectorAll(".gbtn[data-taborder]");
            if (!L || L.length <= 0) return;
            if (!_) {
              var O = ot();
              return void (O && (O.focus(), p(O, "focused")));
            }
            var V = ot(_.getAttribute("data-taborder"));
            x(_, "focused"), V && (V.focus(), p(V, "focused"));
          }
          m == 39 && o.nextSlide(), m == 37 && o.prevSlide(), m == 27 && o.close();
        } });
      }
      var Qt = r(function o(a, c) {
        var m = this, _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        if (n(this, o), this.img = a, this.slide = c, this.onclose = _, this.img.setZoomEvents) return !1;
        this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", function(A) {
          return m.dragStart(A);
        }, !1), this.img.addEventListener("mouseup", function(A) {
          return m.dragEnd(A);
        }, !1), this.img.addEventListener("mousemove", function(A) {
          return m.drag(A);
        }, !1), this.img.addEventListener("click", function(A) {
          return m.slide.classList.contains("dragging-nav") ? (m.zoomOut(), !1) : m.zoomedIn ? void (m.zoomedIn && !m.dragging && m.zoomOut()) : m.zoomIn();
        }, !1), this.img.setZoomEvents = !0;
      }, [{ key: "zoomIn", value: function() {
        var o = this.widowWidth();
        if (!(this.zoomedIn || o <= 768)) {
          var a = this.img;
          if (a.setAttribute("data-style", a.getAttribute("style")), a.style.maxWidth = a.naturalWidth + "px", a.style.maxHeight = a.naturalHeight + "px", a.naturalWidth > o) {
            var c = o / 2 - a.naturalWidth / 2;
            this.setTranslate(this.img.parentNode, c, 0);
          }
          this.slide.classList.add("zoomed"), this.zoomedIn = !0;
        }
      } }, { key: "zoomOut", value: function() {
        this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && typeof this.onclose == "function" && this.onclose();
      } }, { key: "dragStart", value: function(o) {
        o.preventDefault(), this.zoomedIn ? (o.type === "touchstart" ? (this.initialX = o.touches[0].clientX - this.xOffset, this.initialY = o.touches[0].clientY - this.yOffset) : (this.initialX = o.clientX - this.xOffset, this.initialY = o.clientY - this.yOffset), o.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1;
      } }, { key: "dragEnd", value: function(o) {
        var a = this;
        o.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(function() {
          a.dragging = !1, a.img.isDragging = !1, a.img.classList.remove("dragging");
        }, 100);
      } }, { key: "drag", value: function(o) {
        this.active && (o.preventDefault(), o.type === "touchmove" ? (this.currentX = o.touches[0].clientX - this.initialX, this.currentY = o.touches[0].clientY - this.initialY) : (this.currentX = o.clientX - this.initialX, this.currentY = o.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY));
      } }, { key: "onMove", value: function(o) {
        if (this.zoomedIn) {
          var a = o.clientX - this.img.naturalWidth / 2, c = o.clientY - this.img.naturalHeight / 2;
          this.setTranslate(this.img, a, c);
        }
      } }, { key: "setTranslate", value: function(o, a, c) {
        o.style.transform = "translate3d(" + a + "px, " + c + "px, 0)";
      } }, { key: "widowWidth", value: function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      } }]), Wt = r(function o() {
        var a = this, c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, o);
        var m = c.dragEl, _ = c.toleranceX, A = _ === void 0 ? 40 : _, L = c.toleranceY, O = L === void 0 ? 65 : L, V = c.slide, H = V === void 0 ? null : V, j = c.instance, X = j === void 0 ? null : j;
        this.el = m, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = A, this.toleranceY = O, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = H, this.instance = X, this.el.addEventListener("mousedown", function(Z) {
          return a.dragStart(Z);
        }, !1), this.el.addEventListener("mouseup", function(Z) {
          return a.dragEnd(Z);
        }, !1), this.el.addEventListener("mousemove", function(Z) {
          return a.drag(Z);
        }, !1);
      }, [{ key: "dragStart", value: function(o) {
        if (this.slide.classList.contains("zoomed")) this.active = !1;
        else {
          o.type === "touchstart" ? (this.initialX = o.touches[0].clientX - this.xOffset, this.initialY = o.touches[0].clientY - this.yOffset) : (this.initialX = o.clientX - this.xOffset, this.initialY = o.clientY - this.yOffset);
          var a = o.target.nodeName.toLowerCase();
          o.target.classList.contains("nodrag") || S(o.target, ".nodrag") || ["input", "select", "textarea", "button", "a"].indexOf(a) !== -1 ? this.active = !1 : (o.preventDefault(), (o.target === this.el || a !== "img" && S(o.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = S(o.target, ".ginner-container")));
        }
      } }, { key: "dragEnd", value: function(o) {
        var a = this;
        o && o.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, this.doSlideChange == "right" && this.instance.prevSlide(), this.doSlideChange == "left" && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout(function() {
          a.instance.preventOutsideClick = !1, a.toleranceReached = !1, a.lastDirection = null, a.dragging = !1, a.el.isDragging = !1, a.el.classList.remove("dragging"), a.slide.classList.remove("dragging-nav"), a.dragContainer.style.transform = "", a.dragContainer.style.transition = "";
        }, 100);
      } }, { key: "drag", value: function(o) {
        if (this.active) {
          o.preventDefault(), this.slide.classList.add("dragging-nav"), o.type === "touchmove" ? (this.currentX = o.touches[0].clientX - this.initialX, this.currentY = o.touches[0].clientY - this.initialY) : (this.currentX = o.clientX - this.initialX, this.currentY = o.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
          var a = Math.abs(this.currentX), c = Math.abs(this.currentY);
          if (a > 0 && a >= Math.abs(this.currentY) && (!this.lastDirection || this.lastDirection == "x")) {
            this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
            var m = this.shouldChange();
            if (!this.instance.settings.dragAutoSnap && m && (this.doSlideChange = m), this.instance.settings.dragAutoSnap && m) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), m == "right" && this.instance.prevSlide(), void (m == "left" && this.instance.nextSlide());
          }
          if (this.toleranceY > 0 && c > 0 && c >= a && (!this.lastDirection || this.lastDirection == "y")) {
            this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
            var _ = this.shouldClose();
            return !this.instance.settings.dragAutoSnap && _ && (this.doSlideClose = !0), void (this.instance.settings.dragAutoSnap && _ && this.instance.close());
          }
        }
      } }, { key: "shouldChange", value: function() {
        var o = !1;
        if (Math.abs(this.currentX) >= this.toleranceX) {
          var a = this.currentX > 0 ? "right" : "left";
          (a == "left" && this.slide !== this.slide.parentNode.lastChild || a == "right" && this.slide !== this.slide.parentNode.firstChild) && (o = a);
        }
        return o;
      } }, { key: "shouldClose", value: function() {
        var o = !1;
        return Math.abs(this.currentY) >= this.toleranceY && (o = !0), o;
      } }, { key: "setTranslate", value: function(o, a, c) {
        var m = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
        o.style.transition = m ? "all .2s ease" : "", o.style.transform = "translate3d(".concat(a, "px, ").concat(c, "px, 0)");
      } }]);
      function en(o, a, c, m) {
        var _ = o.querySelector(".gslide-media"), A = new Image(), L = "gSlideTitle_" + c, O = "gSlideDesc_" + c;
        A.addEventListener("load", function() {
          U(m) && m();
        }, !1), A.src = a.href, a.sizes != "" && a.srcset != "" && (A.sizes = a.sizes, A.srcset = a.srcset), A.alt = "", pe(a.alt) || a.alt === "" || (A.alt = a.alt), a.title !== "" && A.setAttribute("aria-labelledby", L), a.description !== "" && A.setAttribute("aria-describedby", O), a.hasOwnProperty("_hasCustomWidth") && a._hasCustomWidth && (A.style.width = a.width), a.hasOwnProperty("_hasCustomHeight") && a._hasCustomHeight && (A.style.height = a.height), _.insertBefore(A, _.firstChild);
      }
      function En(o, a, c, m) {
        var _ = this, A = o.querySelector(".ginner-container"), L = "gvideo" + c, O = o.querySelector(".gslide-media"), V = this.getAllPlayers();
        p(A, "gvideo-container"), O.insertBefore(E('<div class="gvideo-wrapper"></div>'), O.firstChild);
        var H = o.querySelector(".gvideo-wrapper");
        J(this.settings.plyr.css, "Plyr");
        var j = a.href, X = a == null ? void 0 : a.videoProvider, Z = !1;
        O.style.maxWidth = a.width, J(this.settings.plyr.js, "Plyr", function() {
          if (!X && j.match(/vimeo\.com\/([0-9]*)/) && (X = "vimeo"), !X && (j.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || j.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/)) && (X = "youtube"), X === "local" || !X) {
            X = "local";
            var ee = '<video id="' + L + '" ';
            ee += 'style="background:#000; max-width: '.concat(a.width, ';" '), ee += 'preload="metadata" ', ee += 'x-webkit-airplay="allow" ', ee += "playsinline ", ee += "controls ", ee += 'class="gvideo-local">', ee += '<source src="'.concat(j, '">'), Z = E(ee += "</video>");
          }
          var ne = Z || E('<div id="'.concat(L, '" data-plyr-provider="').concat(X, '" data-plyr-embed-id="').concat(j, '"></div>'));
          p(H, "".concat(X, "-video gvideo")), H.appendChild(ne), H.setAttribute("data-id", L), H.setAttribute("data-index", c);
          var ke = oe(_.settings.plyr, "config") ? _.settings.plyr.config : {}, We = new Plyr("#" + L, ke);
          We.on("ready", function(ze) {
            V[L] = ze.detail.plyr, U(m) && m();
          }), $(function() {
            return o.querySelector("iframe") && o.querySelector("iframe").dataset.ready == "true";
          }, function() {
            _.resize(o);
          }), We.on("enterfullscreen", Vt), We.on("exitfullscreen", Vt);
        });
      }
      function Vt(o) {
        var a = S(o.target, ".gslide-media");
        o.type === "enterfullscreen" && p(a, "fullscreen"), o.type === "exitfullscreen" && x(a, "fullscreen");
      }
      function tn(o, a, c, m) {
        var _, A = this, L = o.querySelector(".gslide-media"), O = !(!oe(a, "href") || !a.href) && a.href.split("#").pop().trim(), V = !(!oe(a, "content") || !a.content) && a.content;
        if (V && (se(V) && (_ = E('<div class="ginlined-content">'.concat(V, "</div>"))), K(V))) {
          V.style.display == "none" && (V.style.display = "block");
          var H = document.createElement("div");
          H.className = "ginlined-content", H.appendChild(V), _ = H;
        }
        if (O) {
          var j = document.getElementById(O);
          if (!j) return !1;
          var X = j.cloneNode(!0);
          X.style.height = a.height, X.style.maxWidth = a.width, p(X, "ginlined-content"), _ = X;
        }
        if (!_) return console.error("Unable to append inline slide content", a), !1;
        L.style.height = a.height, L.style.width = a.width, L.appendChild(_), this.events["inlineclose" + O] = g("click", { onElement: L.querySelectorAll(".gtrigger-close"), withCallback: function(Z) {
          Z.preventDefault(), A.close();
        } }), U(m) && m();
      }
      function Ut(o, a, c, m) {
        var _ = o.querySelector(".gslide-media"), A = function(L) {
          var O = L.url, V = L.allow, H = L.callback, j = L.appendTo, X = document.createElement("iframe");
          return X.className = "vimeo-video gvideo", X.src = O, X.style.width = "100%", X.style.height = "100%", V && X.setAttribute("allow", V), X.onload = function() {
            X.onload = null, p(X, "node-ready"), U(H) && H();
          }, j && j.appendChild(X), X;
        }({ url: a.href, callback: m });
        _.parentNode.style.maxWidth = a.width, _.parentNode.style.height = a.height, _.appendChild(A);
      }
      var nn = r(function o() {
        var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, o), this.defaults = { href: "", sizes: "", srcset: "", title: "", type: "", videoProvider: "", description: "", alt: "", descPosition: "bottom", effect: "", width: "", height: "", content: !1, zoomable: !0, draggable: !0 }, Oe(a) && (this.defaults = f(this.defaults, a));
      }, [{ key: "sourceType", value: function(o) {
        var a = o;
        return (o = o.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) !== null ? "image" : o.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || o.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || o.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || o.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/) || o.match(/vimeo\.com\/([0-9]*)/) || o.match(/\.(mp4|ogg|webm|mov)/) !== null ? "video" : o.match(/\.(mp3|wav|wma|aac|ogg)/) !== null ? "audio" : o.indexOf("#") > -1 && a.split("#").pop().trim() !== "" ? "inline" : o.indexOf("goajax=true") > -1 ? "ajax" : "external";
      } }, { key: "parseConfig", value: function(o, a) {
        var c = this, m = f({ descPosition: a.descPosition }, this.defaults);
        if (Oe(o) && !K(o)) {
          oe(o, "type") || (oe(o, "content") && o.content ? o.type = "inline" : oe(o, "href") && (o.type = this.sourceType(o.href)));
          var _ = f(m, o);
          return this.setSize(_, a), _;
        }
        var A = "", L = o.getAttribute("data-glightbox"), O = o.nodeName.toLowerCase();
        if (O === "a" && (A = o.href), O === "img" && (A = o.src, m.alt = o.alt), m.href = A, d(m, function(ee, ne) {
          oe(a, ne) && ne !== "width" && (m[ne] = a[ne]);
          var ke = o.dataset[ne];
          pe(ke) || (m[ne] = c.sanitizeValue(ke));
        }), m.content && (m.type = "inline"), !m.type && A && (m.type = this.sourceType(A)), pe(L)) {
          if (!m.title && O == "a") {
            var V = o.title;
            pe(V) || V === "" || (m.title = V);
          }
          if (!m.title && O == "img") {
            var H = o.alt;
            pe(H) || H === "" || (m.title = H);
          }
        } else {
          var j = [];
          d(m, function(ee, ne) {
            j.push(";\\s?" + ne);
          }), j = j.join("\\s?:|"), L.trim() !== "" && d(m, function(ee, ne) {
            var ke = L, We = new RegExp("s?" + ne + "s?:s?(.*?)(" + j + "s?:|$)"), ze = ke.match(We);
            if (ze && ze.length && ze[1]) {
              var at = ze[1].trim().replace(/;\s*$/, "");
              m[ne] = c.sanitizeValue(at);
            }
          });
        }
        if (m.description && m.description.substring(0, 1) === ".") {
          var X;
          try {
            X = document.querySelector(m.description).innerHTML;
          } catch (ee) {
            if (!(ee instanceof DOMException)) throw ee;
          }
          X && (m.description = X);
        }
        if (!m.description) {
          var Z = o.querySelector(".glightbox-desc");
          Z && (m.description = Z.innerHTML);
        }
        return this.setSize(m, a, o), this.slideConfig = m, m;
      } }, { key: "setSize", value: function(o, a) {
        var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, m = o.type == "video" ? this.checkSize(a.videosWidth) : this.checkSize(a.width), _ = this.checkSize(a.height);
        return o.width = oe(o, "width") && o.width !== "" ? this.checkSize(o.width) : m, o.height = oe(o, "height") && o.height !== "" ? this.checkSize(o.height) : _, c && o.type == "image" && (o._hasCustomWidth = !!c.dataset.width, o._hasCustomHeight = !!c.dataset.height), o;
      } }, { key: "checkSize", value: function(o) {
        return ye(o) ? "".concat(o, "px") : o;
      } }, { key: "sanitizeValue", value: function(o) {
        return o !== "true" && o !== "false" ? o : o === "true";
      } }]), mt = r(function o(a, c, m) {
        n(this, o), this.element = a, this.instance = c, this.index = m;
      }, [{ key: "setContent", value: function() {
        var o = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (k(a, "loaded")) return !1;
        var m = this.instance.settings, _ = this.slideConfig, A = G();
        U(m.beforeSlideLoad) && m.beforeSlideLoad({ index: this.index, slide: a, player: !1 });
        var L = _.type, O = _.descPosition, V = a.querySelector(".gslide-media"), H = a.querySelector(".gslide-title"), j = a.querySelector(".gslide-desc"), X = a.querySelector(".gdesc-inner"), Z = c, ee = "gSlideTitle_" + this.index, ne = "gSlideDesc_" + this.index;
        if (U(m.afterSlideLoad) && (Z = function() {
          U(c) && c(), m.afterSlideLoad({ index: o.index, slide: a, player: o.instance.getSlidePlayerInstance(o.index) });
        }), _.title == "" && _.description == "" ? X && X.parentNode.parentNode.removeChild(X.parentNode) : (H && _.title !== "" ? (H.id = ee, H.innerHTML = _.title) : H.parentNode.removeChild(H), j && _.description !== "" ? (j.id = ne, A && m.moreLength > 0 ? (_.smallDescription = this.slideShortDesc(_.description, m.moreLength, m.moreText), j.innerHTML = _.smallDescription, this.descriptionEvents(j, _)) : j.innerHTML = _.description) : j.parentNode.removeChild(j), p(V.parentNode, "desc-".concat(O)), p(X.parentNode, "description-".concat(O))), p(V, "gslide-".concat(L)), p(a, "loaded"), L !== "video") {
          if (L !== "external") return L === "inline" ? (tn.apply(this.instance, [a, _, this.index, Z]), void (_.draggable && new Wt({ dragEl: a.querySelector(".gslide-inline"), toleranceX: m.dragToleranceX, toleranceY: m.dragToleranceY, slide: a, instance: this.instance }))) : void (L !== "image" ? U(Z) && Z() : en(a, _, this.index, function() {
            var ke = a.querySelector("img");
            _.draggable && new Wt({ dragEl: ke, toleranceX: m.dragToleranceX, toleranceY: m.dragToleranceY, slide: a, instance: o.instance }), _.zoomable && ke.naturalWidth > ke.offsetWidth && (p(ke, "zoomable"), new Qt(ke, a, function() {
              o.instance.resize();
            })), U(Z) && Z();
          }));
          Ut.apply(this, [a, _, this.index, Z]);
        } else En.apply(this.instance, [a, _, this.index, Z]);
      } }, { key: "slideShortDesc", value: function(o) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], m = document.createElement("div");
        m.innerHTML = o;
        var _ = m.innerText, A = c;
        if ((o = _.trim()).length <= a) return o;
        var L = o.substr(0, a - 1);
        return A ? (m = null, L + '... <a href="#" class="desc-more">' + c + "</a>") : L;
      } }, { key: "descriptionEvents", value: function(o, a) {
        var c = this, m = o.querySelector(".desc-more");
        if (!m) return !1;
        g("click", { onElement: m, withCallback: function(_, A) {
          _.preventDefault();
          var L = document.body, O = S(A, ".gslide-desc");
          if (!O) return !1;
          O.innerHTML = a.description, p(L, "gdesc-open");
          var V = g("click", { onElement: [L, S(O, ".gslide-description")], withCallback: function(H, j) {
            H.target.nodeName.toLowerCase() !== "a" && (x(L, "gdesc-open"), p(L, "gdesc-closed"), O.innerHTML = a.smallDescription, c.descriptionEvents(O, a), setTimeout(function() {
              x(L, "gdesc-closed");
            }, 400), V.destroy());
          } });
        } });
      } }, { key: "create", value: function() {
        return E(this.instance.settings.slideHTML);
      } }, { key: "getConfig", value: function() {
        K(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
        var o = new nn(this.instance.settings.slideExtraAttributes);
        return this.slideConfig = o.parseConfig(this.element, this.instance.settings), this.slideConfig;
      } }]);
      function pt(o) {
        return Math.sqrt(o.x * o.x + o.y * o.y);
      }
      function on(o, a) {
        var c = function(m, _) {
          var A = pt(m) * pt(_);
          if (A === 0) return 0;
          var L = function(O, V) {
            return O.x * V.x + O.y * V.y;
          }(m, _) / A;
          return L > 1 && (L = 1), Math.acos(L);
        }(o, a);
        return function(m, _) {
          return m.x * _.y - _.x * m.y;
        }(o, a) > 0 && (c *= -1), 180 * c / Math.PI;
      }
      var Ot = r(function o(a) {
        n(this, o), this.handlers = [], this.el = a;
      }, [{ key: "add", value: function(o) {
        this.handlers.push(o);
      } }, { key: "del", value: function(o) {
        o || (this.handlers = []);
        for (var a = this.handlers.length; a >= 0; a--) this.handlers[a] === o && this.handlers.splice(a, 1);
      } }, { key: "dispatch", value: function() {
        for (var o = 0, a = this.handlers.length; o < a; o++) {
          var c = this.handlers[o];
          typeof c == "function" && c.apply(this.el, arguments);
        }
      } }]);
      function xe(o, a) {
        var c = new Ot(o);
        return c.add(a), c;
      }
      var ht = r(function o(a, c) {
        n(this, o), this.element = typeof a == "string" ? document.querySelector(a) : a, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = { x: null, y: null }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
        var m = function() {
        };
        this.rotate = xe(this.element, c.rotate || m), this.touchStart = xe(this.element, c.touchStart || m), this.multipointStart = xe(this.element, c.multipointStart || m), this.multipointEnd = xe(this.element, c.multipointEnd || m), this.pinch = xe(this.element, c.pinch || m), this.swipe = xe(this.element, c.swipe || m), this.tap = xe(this.element, c.tap || m), this.doubleTap = xe(this.element, c.doubleTap || m), this.longTap = xe(this.element, c.longTap || m), this.singleTap = xe(this.element, c.singleTap || m), this.pressMove = xe(this.element, c.pressMove || m), this.twoFingerPressMove = xe(this.element, c.twoFingerPressMove || m), this.touchMove = xe(this.element, c.touchMove || m), this.touchEnd = xe(this.element, c.touchEnd || m), this.touchCancel = xe(this.element, c.touchCancel || m), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = { x: null, y: null };
      }, [{ key: "start", value: function(o) {
        if (o.touches) if (o.target && o.target.nodeName && ["a", "button", "input"].indexOf(o.target.nodeName.toLowerCase()) >= 0) console.log("ignore drag for this touched element", o.target.nodeName.toLowerCase());
        else {
          this.now = Date.now(), this.x1 = o.touches[0].pageX, this.y1 = o.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(o, this.element), this.preTapPosition.x !== null && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
          var a = this.preV;
          if (o.touches.length > 1) {
            this._cancelLongTap(), this._cancelSingleTap();
            var c = { x: o.touches[1].pageX - this.x1, y: o.touches[1].pageY - this.y1 };
            a.x = c.x, a.y = c.y, this.pinchStartLen = pt(a), this.multipointStart.dispatch(o, this.element);
          }
          this._preventTap = !1, this.longTapTimeout = setTimeout((function() {
            this.longTap.dispatch(o, this.element), this._preventTap = !0;
          }).bind(this), 750);
        }
      } }, { key: "move", value: function(o) {
        if (o.touches) {
          var a = this.preV, c = o.touches.length, m = o.touches[0].pageX, _ = o.touches[0].pageY;
          if (this.isDoubleTap = !1, c > 1) {
            var A = o.touches[1].pageX, L = o.touches[1].pageY, O = { x: o.touches[1].pageX - m, y: o.touches[1].pageY - _ };
            a.x !== null && (this.pinchStartLen > 0 && (o.zoom = pt(O) / this.pinchStartLen, this.pinch.dispatch(o, this.element)), o.angle = on(O, a), this.rotate.dispatch(o, this.element)), a.x = O.x, a.y = O.y, this.x2 !== null && this.sx2 !== null ? (o.deltaX = (m - this.x2 + A - this.sx2) / 2, o.deltaY = (_ - this.y2 + L - this.sy2) / 2) : (o.deltaX = 0, o.deltaY = 0), this.twoFingerPressMove.dispatch(o, this.element), this.sx2 = A, this.sy2 = L;
          } else {
            if (this.x2 !== null) {
              o.deltaX = m - this.x2, o.deltaY = _ - this.y2;
              var V = Math.abs(this.x1 - this.x2), H = Math.abs(this.y1 - this.y2);
              (V > 10 || H > 10) && (this._preventTap = !0);
            } else o.deltaX = 0, o.deltaY = 0;
            this.pressMove.dispatch(o, this.element);
          }
          this.touchMove.dispatch(o, this.element), this._cancelLongTap(), this.x2 = m, this.y2 = _, c > 1 && o.preventDefault();
        }
      } }, { key: "end", value: function(o) {
        if (o.changedTouches) {
          this._cancelLongTap();
          var a = this;
          o.touches.length < 2 && (this.multipointEnd.dispatch(o, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (o.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function() {
            a.swipe.dispatch(o, a.element);
          }, 0)) : (this.tapTimeout = setTimeout(function() {
            a._preventTap || a.tap.dispatch(o, a.element), a.isDoubleTap && (a.doubleTap.dispatch(o, a.element), a.isDoubleTap = !1);
          }, 0), a.isDoubleTap || (a.singleTapTimeout = setTimeout(function() {
            a.singleTap.dispatch(o, a.element);
          }, 250))), this.touchEnd.dispatch(o, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null;
        }
      } }, { key: "cancelAll", value: function() {
        this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout);
      } }, { key: "cancel", value: function(o) {
        this.cancelAll(), this.touchCancel.dispatch(o, this.element);
      } }, { key: "_cancelLongTap", value: function() {
        clearTimeout(this.longTapTimeout);
      } }, { key: "_cancelSingleTap", value: function() {
        clearTimeout(this.singleTapTimeout);
      } }, { key: "_swipeDirection", value: function(o, a, c, m) {
        return Math.abs(o - a) >= Math.abs(c - m) ? o - a > 0 ? "Left" : "Right" : c - m > 0 ? "Up" : "Down";
      } }, { key: "on", value: function(o, a) {
        this[o] && this[o].add(a);
      } }, { key: "off", value: function(o, a) {
        this[o] && this[o].del(a);
      } }, { key: "destroy", value: function() {
        return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
      } }]);
      function rt(o) {
        var a = function() {
          var L, O = document.createElement("fakeelement"), V = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
          for (L in V) if (O.style[L] !== void 0) return V[L];
        }(), c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, m = k(o, "gslide-media") ? o : o.querySelector(".gslide-media"), _ = S(m, ".ginner-container"), A = o.querySelector(".gslide-description");
        c > 769 && (m = _), p(m, "greset"), h(m, "translate3d(0, 0, 0)"), g(a, { onElement: m, once: !0, withCallback: function(L, O) {
          x(m, "greset");
        } }), m.style.opacity = "", A && (A.style.opacity = "");
      }
      function rn(o) {
        if (o.events.hasOwnProperty("touch")) return !1;
        var a, c, m, _ = F(), A = _.width, L = _.height, O = !1, V = null, H = null, j = null, X = !1, Z = 1, ee = 1, ne = !1, ke = !1, We = null, ze = null, at = null, Ne = null, st = 0, lt = 0, an = !1, Yt = !1, Ke = {}, Je = {}, qi = 0, Bi = 0, Br = document.getElementById("glightbox-slider"), Cn = document.querySelector(".goverlay"), zr = new ht(Br, { touchStart: function(he) {
          if (O = !0, (k(he.targetTouches[0].target, "ginner-container") || S(he.targetTouches[0].target, ".gslide-desc") || he.targetTouches[0].target.nodeName.toLowerCase() == "a") && (O = !1), S(he.targetTouches[0].target, ".gslide-inline") && !k(he.targetTouches[0].target.parentNode, "gslide-inline") && (O = !1), O) {
            if (Je = he.targetTouches[0], Ke.pageX = he.targetTouches[0].pageX, Ke.pageY = he.targetTouches[0].pageY, qi = he.targetTouches[0].clientX, Bi = he.targetTouches[0].clientY, V = o.activeSlide, H = V.querySelector(".gslide-media"), m = V.querySelector(".gslide-inline"), j = null, k(H, "gslide-image") && (j = H.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (H = V.querySelector(".ginner-container")), x(Cn, "greset"), he.pageX > 20 && he.pageX < window.innerWidth - 20) return;
            he.preventDefault();
          }
        }, touchMove: function(he) {
          if (O && (Je = he.targetTouches[0], !ne && !ke)) {
            if (m && m.offsetHeight > L) {
              var De = Ke.pageX - Je.pageX;
              if (Math.abs(De) <= 13) return !1;
            }
            X = !0;
            var gt, Pn = he.targetTouches[0].clientX, Hr = he.targetTouches[0].clientY, Wr = qi - Pn, Vr = Bi - Hr;
            if (Math.abs(Wr) > Math.abs(Vr) ? (an = !1, Yt = !0) : (Yt = !1, an = !0), a = Je.pageX - Ke.pageX, st = 100 * a / A, c = Je.pageY - Ke.pageY, lt = 100 * c / L, an && j && (gt = 1 - Math.abs(c) / L, Cn.style.opacity = gt, o.settings.touchFollowAxis && (st = 0)), Yt && (gt = 1 - Math.abs(a) / A, H.style.opacity = gt, o.settings.touchFollowAxis && (lt = 0)), !j) return h(H, "translate3d(".concat(st, "%, 0, 0)"));
            h(H, "translate3d(".concat(st, "%, ").concat(lt, "%, 0)"));
          }
        }, touchEnd: function() {
          if (O) {
            if (X = !1, ke || ne) return at = We, void (Ne = ze);
            var he = Math.abs(parseInt(lt)), De = Math.abs(parseInt(st));
            if (!(he > 29 && j)) return he < 29 && De < 25 ? (p(Cn, "greset"), Cn.style.opacity = 1, rt(H)) : void 0;
            o.close();
          }
        }, multipointEnd: function() {
          setTimeout(function() {
            ne = !1;
          }, 50);
        }, multipointStart: function() {
          ne = !0, Z = ee || 1;
        }, pinch: function(he) {
          if (!j || X) return !1;
          ne = !0, j.scaleX = j.scaleY = Z * he.zoom;
          var De = Z * he.zoom;
          if (ke = !0, De <= 1) return ke = !1, De = 1, Ne = null, at = null, We = null, ze = null, void j.setAttribute("style", "");
          De > 4.5 && (De = 4.5), j.style.transform = "scale3d(".concat(De, ", ").concat(De, ", 1)"), ee = De;
        }, pressMove: function(he) {
          if (ke && !ne) {
            var De = Je.pageX - Ke.pageX, gt = Je.pageY - Ke.pageY;
            at && (De += at), Ne && (gt += Ne), We = De, ze = gt;
            var Pn = "translate3d(".concat(De, "px, ").concat(gt, "px, 0)");
            ee && (Pn += " scale3d(".concat(ee, ", ").concat(ee, ", 1)")), h(j, Pn);
          }
        }, swipe: function(he) {
          if (!ke) if (ne) ne = !1;
          else {
            if (he.direction == "Left") {
              if (o.index == o.elements.length - 1) return rt(H);
              o.nextSlide();
            }
            if (he.direction == "Right") {
              if (o.index == 0) return rt(H);
              o.prevSlide();
            }
          }
        } });
        o.events.touch = zr;
      }
      var v = G(), y = G() !== null || document.createTouch !== void 0 || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints, R = document.getElementsByTagName("html")[0], Y = { selector: ".glightbox", elements: null, skin: "clean", theme: "clean", closeButton: !0, startAt: null, autoplayVideos: !0, autofocusVideos: !0, descPosition: "bottom", width: "900px", height: "506px", videosWidth: "960px", beforeSlideChange: null, afterSlideChange: null, beforeSlideLoad: null, afterSlideLoad: null, slideInserted: null, slideRemoved: null, slideExtraAttributes: null, onOpen: null, onClose: null, loop: !1, zoomable: !0, draggable: !0, dragAutoSnap: !1, dragToleranceX: 40, dragToleranceY: 65, preload: !0, oneSlidePerOpen: !1, touchNavigation: !0, touchFollowAxis: !0, keyboardNavigation: !0, closeOnOutsideClick: !0, plugins: !1, plyr: { css: "https://cdn.plyr.io/3.6.12/plyr.css", js: "https://cdn.plyr.io/3.6.12/plyr.js", config: { ratio: "16:9", fullscreen: { enabled: !0, iosNative: !0 }, youtube: { noCookie: !0, rel: 0, showinfo: 0, iv_load_policy: 3 }, vimeo: { byline: !1, portrait: !1, title: !1, transparent: !1 } } }, openEffect: "zoom", closeEffect: "zoom", slideEffect: "slide", moreText: "See more", moreLength: 60, cssEfects: { fade: { in: "fadeIn", out: "fadeOut" }, zoom: { in: "zoomIn", out: "zoomOut" }, slide: { in: "slideInRight", out: "slideOutLeft" }, slideBack: { in: "slideInLeft", out: "slideOutRight" }, none: { in: "none", out: "none" } }, svg: { close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>', next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>', prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>' }, slideHTML: `<div class="gslide">
    <div class="gslide-inner-content">
        <div class="ginner-container">
            <div class="gslide-media">
            </div>
            <div class="gslide-description">
                <div class="gdesc-inner">
                    <h4 class="gslide-title"></h4>
                    <div class="gslide-desc"></div>
                </div>
            </div>
        </div>
    </div>
</div>`, lightboxHTML: `<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="gloader visible"></div>
    <div class="goverlay"></div>
    <div class="gcontainer">
    <div id="glightbox-slider" class="gslider"></div>
    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>
    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>
    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>
</div>
</div>` }, _e = r(function o() {
        var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, o), this.customOptions = a, this.settings = f(Y, a), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1;
      }, [{ key: "init", value: function() {
        var o = this, a = this.getSelector();
        a && (this.baseEvents = g("click", { onElement: a, withCallback: function(c, m) {
          c.preventDefault(), o.open(m);
        } })), this.elements = this.getElements();
      } }, { key: "open", value: function() {
        var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (this.elements.length === 0) return !1;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var c = ye(a) ? a : this.settings.startAt;
        if (K(o)) {
          var m = o.getAttribute("data-gallery");
          m && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, m)), pe(c) && (c = this.getElementIndex(o)) < 0 && (c = 0);
        }
        ye(c) || (c = 0), this.build(), P(this.overlay, this.settings.openEffect === "none" ? "none" : this.settings.cssEfects.fade.in);
        var _ = document.body, A = window.innerWidth - document.documentElement.clientWidth;
        if (A > 0) {
          var L = document.createElement("style");
          L.type = "text/css", L.className = "gcss-styles", L.innerText = ".gscrollbar-fixer {margin-right: ".concat(A, "px}"), document.head.appendChild(L), p(_, "gscrollbar-fixer");
        }
        p(_, "glightbox-open"), p(R, "glightbox-open"), v && (p(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(c, !0), this.elements.length === 1 ? (p(this.prevButton, "glightbox-button-hidden"), p(this.nextButton, "glightbox-button-hidden")) : (x(this.prevButton, "glightbox-button-hidden"), x(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), U(this.settings.onOpen) && this.settings.onOpen(), y && this.settings.touchNavigation && rn(this), this.settings.keyboardNavigation && Ht(this);
      } }, { key: "openAt", value: function() {
        var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        this.open(null, o);
      } }, { key: "showSlide", value: function() {
        var o = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        T(this.loader), this.index = parseInt(a);
        var m = this.slidesContainer.querySelector(".current");
        m && x(m, "current"), this.slideAnimateOut();
        var _ = this.slidesContainer.querySelectorAll(".gslide")[a];
        if (k(_, "loaded")) this.slideAnimateIn(_, c), I(this.loader);
        else {
          T(this.loader);
          var A = this.elements[a], L = { index: this.index, slide: _, slideNode: _, slideConfig: A.slideConfig, slideIndex: this.index, trigger: A.node, player: null };
          this.trigger("slide_before_load", L), A.instance.setContent(_, function() {
            I(o.loader), o.resize(), o.slideAnimateIn(_, c), o.trigger("slide_after_load", L);
          });
        }
        this.slideDescription = _.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && k(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(a + 1), this.preloadSlide(a - 1)), this.updateNavigationClasses(), this.activeSlide = _;
      } }, { key: "preloadSlide", value: function(o) {
        var a = this;
        if (o < 0 || o > this.elements.length - 1 || pe(this.elements[o])) return !1;
        var c = this.slidesContainer.querySelectorAll(".gslide")[o];
        if (k(c, "loaded")) return !1;
        var m = this.elements[o], _ = m.type, A = { index: o, slide: c, slideNode: c, slideConfig: m.slideConfig, slideIndex: o, trigger: m.node, player: null };
        this.trigger("slide_before_load", A), _ === "video" || _ === "external" ? setTimeout(function() {
          m.instance.setContent(c, function() {
            a.trigger("slide_after_load", A);
          });
        }, 200) : m.instance.setContent(c, function() {
          a.trigger("slide_after_load", A);
        });
      } }, { key: "prevSlide", value: function() {
        this.goToSlide(this.index - 1);
      } }, { key: "nextSlide", value: function() {
        this.goToSlide(this.index + 1);
      } }, { key: "goToSlide", value: function() {
        var o = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
        if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (o < 0 || o > this.elements.length - 1)) return !1;
        o < 0 ? o = this.elements.length - 1 : o >= this.elements.length && (o = 0), this.showSlide(o);
      } }, { key: "insertSlide", value: function() {
        var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
        a < 0 && (a = this.elements.length);
        var c = new mt(o, this, a), m = c.getConfig(), _ = f({}, m), A = c.create(), L = this.elements.length - 1;
        _.index = a, _.node = !1, _.instance = c, _.slideConfig = m, this.elements.splice(a, 0, _);
        var O = null, V = null;
        if (this.slidesContainer) {
          if (a > L) this.slidesContainer.appendChild(A);
          else {
            var H = this.slidesContainer.querySelectorAll(".gslide")[a];
            this.slidesContainer.insertBefore(A, H);
          }
          (this.settings.preload && this.index == 0 && a == 0 || this.index - 1 == a || this.index + 1 == a) && this.preloadSlide(a), this.index === 0 && a === 0 && (this.index = 1), this.updateNavigationClasses(), O = this.slidesContainer.querySelectorAll(".gslide")[a], V = this.getSlidePlayerInstance(a), _.slideNode = O;
        }
        this.trigger("slide_inserted", { index: a, slide: O, slideNode: O, slideConfig: m, slideIndex: a, trigger: null, player: V }), U(this.settings.slideInserted) && this.settings.slideInserted({ index: a, slide: O, player: V });
      } }, { key: "removeSlide", value: function() {
        var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
        if (o < 0 || o > this.elements.length - 1) return !1;
        var a = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[o];
        a && (this.getActiveSlideIndex() == o && (o == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), a.parentNode.removeChild(a)), this.elements.splice(o, 1), this.trigger("slide_removed", o), U(this.settings.slideRemoved) && this.settings.slideRemoved(o);
      } }, { key: "slideAnimateIn", value: function(o, a) {
        var c = this, m = o.querySelector(".gslide-media"), _ = o.querySelector(".gslide-description"), A = { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlide, slideConfig: pe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: pe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, L = { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideConfig: this.elements[this.index].slideConfig, slideIndex: this.index, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) };
        if (m.offsetWidth > 0 && _ && (I(_), _.style.display = ""), x(o, this.effectsClasses), a) P(o, this.settings.cssEfects[this.settings.openEffect].in, function() {
          c.settings.autoplayVideos && c.slidePlayerPlay(o), c.trigger("slide_changed", { prev: A, current: L }), U(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [A, L]);
        });
        else {
          var O = this.settings.slideEffect, V = O !== "none" ? this.settings.cssEfects[O].in : O;
          this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (V = this.settings.cssEfects.slideBack.in), P(o, V, function() {
            c.settings.autoplayVideos && c.slidePlayerPlay(o), c.trigger("slide_changed", { prev: A, current: L }), U(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [A, L]);
          });
        }
        setTimeout(function() {
          c.resize(o);
        }, 100), p(o, "current");
      } }, { key: "slideAnimateOut", value: function() {
        if (!this.prevActiveSlide) return !1;
        var o = this.prevActiveSlide;
        x(o, this.effectsClasses), p(o, "prev");
        var a = this.settings.slideEffect, c = a !== "none" ? this.settings.cssEfects[a].out : a;
        this.slidePlayerPause(o), this.trigger("slide_before_change", { prev: { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlideIndex, slideConfig: pe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: pe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, current: { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideIndex: this.index, slideConfig: this.elements[this.index].slideConfig, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) } }), U(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{ index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, { index: this.index, slide: this.activeSlide, player: this.getSlidePlayerInstance(this.index) }]), this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (c = this.settings.cssEfects.slideBack.out), P(o, c, function() {
          var m = o.querySelector(".ginner-container"), _ = o.querySelector(".gslide-media"), A = o.querySelector(".gslide-description");
          m.style.transform = "", _.style.transform = "", x(_, "greset"), _.style.opacity = "", A && (A.style.opacity = ""), x(o, "prev");
        });
      } }, { key: "getAllPlayers", value: function() {
        return this.videoPlayers;
      } }, { key: "getSlidePlayerInstance", value: function(o) {
        var a = "gvideo" + o, c = this.getAllPlayers();
        return !(!oe(c, a) || !c[a]) && c[a];
      } }, { key: "stopSlideVideo", value: function(o) {
        if (K(o)) {
          var a = o.querySelector(".gvideo-wrapper");
          a && (o = a.getAttribute("data-index"));
        }
        console.log("stopSlideVideo is deprecated, use slidePlayerPause");
        var c = this.getSlidePlayerInstance(o);
        c && c.playing && c.pause();
      } }, { key: "slidePlayerPause", value: function(o) {
        if (K(o)) {
          var a = o.querySelector(".gvideo-wrapper");
          a && (o = a.getAttribute("data-index"));
        }
        var c = this.getSlidePlayerInstance(o);
        c && c.playing && c.pause();
      } }, { key: "playSlideVideo", value: function(o) {
        if (K(o)) {
          var a = o.querySelector(".gvideo-wrapper");
          a && (o = a.getAttribute("data-index"));
        }
        console.log("playSlideVideo is deprecated, use slidePlayerPlay");
        var c = this.getSlidePlayerInstance(o);
        c && !c.playing && c.play();
      } }, { key: "slidePlayerPlay", value: function(o) {
        var a;
        if (!v || (a = this.settings.plyr.config) !== null && a !== void 0 && a.muted) {
          if (K(o)) {
            var c = o.querySelector(".gvideo-wrapper");
            c && (o = c.getAttribute("data-index"));
          }
          var m = this.getSlidePlayerInstance(o);
          m && !m.playing && (m.play(), this.settings.autofocusVideos && m.elements.container.focus());
        }
      } }, { key: "setElements", value: function(o) {
        var a = this;
        this.settings.elements = !1;
        var c = [];
        o && o.length && d(o, function(m, _) {
          var A = new mt(m, a, _), L = A.getConfig(), O = f({}, L);
          O.slideConfig = L, O.instance = A, O.index = _, c.push(O);
        }), this.elements = c, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (d(this.elements, function() {
          var m = E(a.settings.slideHTML);
          a.slidesContainer.appendChild(m);
        }), this.showSlide(0, !0)));
      } }, { key: "getElementIndex", value: function(o) {
        var a = !1;
        return d(this.elements, function(c, m) {
          if (oe(c, "node") && c.node == o) return a = m, !0;
        }), a;
      } }, { key: "getElements", value: function() {
        var o = this, a = [];
        this.elements = this.elements ? this.elements : [], !pe(this.settings.elements) && Te(this.settings.elements) && this.settings.elements.length && d(this.settings.elements, function(m, _) {
          var A = new mt(m, o, _), L = A.getConfig(), O = f({}, L);
          O.node = !1, O.index = _, O.instance = A, O.slideConfig = L, a.push(O);
        });
        var c = !1;
        return this.getSelector() && (c = document.querySelectorAll(this.getSelector())), c && d(c, function(m, _) {
          var A = new mt(m, o, _), L = A.getConfig(), O = f({}, L);
          O.node = m, O.index = _, O.instance = A, O.slideConfig = L, O.gallery = m.getAttribute("data-gallery"), a.push(O);
        }), a;
      } }, { key: "getGalleryElements", value: function(o, a) {
        return o.filter(function(c) {
          return c.gallery == a;
        });
      } }, { key: "getSelector", value: function() {
        return !this.settings.elements && (this.settings.selector && this.settings.selector.substring(0, 5) == "data-" ? "*[".concat(this.settings.selector, "]") : this.settings.selector);
      } }, { key: "getActiveSlide", value: function() {
        return this.slidesContainer.querySelectorAll(".gslide")[this.index];
      } }, { key: "getActiveSlideIndex", value: function() {
        return this.index;
      } }, { key: "getAnimationClasses", value: function() {
        var o = [];
        for (var a in this.settings.cssEfects) if (this.settings.cssEfects.hasOwnProperty(a)) {
          var c = this.settings.cssEfects[a];
          o.push("g".concat(c.in)), o.push("g".concat(c.out));
        }
        return o.join(" ");
      } }, { key: "build", value: function() {
        var o = this;
        if (this.built) return !1;
        var a = document.body.childNodes, c = [];
        d(a, function(H) {
          H.parentNode == document.body && H.nodeName.charAt(0) !== "#" && H.hasAttribute && !H.hasAttribute("aria-hidden") && (c.push(H), H.setAttribute("aria-hidden", "true"));
        });
        var m = oe(this.settings.svg, "next") ? this.settings.svg.next : "", _ = oe(this.settings.svg, "prev") ? this.settings.svg.prev : "", A = oe(this.settings.svg, "close") ? this.settings.svg.close : "", L = this.settings.lightboxHTML;
        L = E(L = (L = (L = L.replace(/{nextSVG}/g, m)).replace(/{prevSVG}/g, _)).replace(/{closeSVG}/g, A)), document.body.appendChild(L);
        var O = document.getElementById("glightbox-body");
        this.modal = O;
        var V = O.querySelector(".gclose");
        this.prevButton = O.querySelector(".gprev"), this.nextButton = O.querySelector(".gnext"), this.overlay = O.querySelector(".goverlay"), this.loader = O.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = c, this.events = {}, p(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && V && (this.events.close = g("click", { onElement: V, withCallback: function(H, j) {
          H.preventDefault(), o.close();
        } })), V && !this.settings.closeButton && V.parentNode.removeChild(V), this.nextButton && (this.events.next = g("click", { onElement: this.nextButton, withCallback: function(H, j) {
          H.preventDefault(), o.nextSlide();
        } })), this.prevButton && (this.events.prev = g("click", { onElement: this.prevButton, withCallback: function(H, j) {
          H.preventDefault(), o.prevSlide();
        } })), this.settings.closeOnOutsideClick && (this.events.outClose = g("click", { onElement: O, withCallback: function(H, j) {
          o.preventOutsideClick || k(document.body, "glightbox-mobile") || S(H.target, ".ginner-container") || S(H.target, ".gbtn") || k(H.target, "gnext") || k(H.target, "gprev") || o.close();
        } })), d(this.elements, function(H, j) {
          o.slidesContainer.appendChild(H.instance.create()), H.slideNode = o.slidesContainer.querySelectorAll(".gslide")[j];
        }), y && p(document.body, "glightbox-touch"), this.events.resize = g("resize", { onElement: window, withCallback: function() {
          o.resize();
        } }), this.built = !0;
      } }, { key: "resize", value: function() {
        var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        if ((o = o || this.activeSlide) && !k(o, "zoomed")) {
          var a = F(), c = o.querySelector(".gvideo-wrapper"), m = o.querySelector(".gslide-image"), _ = this.slideDescription, A = a.width, L = a.height;
          if (A <= 768 ? p(document.body, "glightbox-mobile") : x(document.body, "glightbox-mobile"), c || m) {
            var O = !1;
            if (_ && (k(_, "description-bottom") || k(_, "description-top")) && !k(_, "gabsolute") && (O = !0), m) {
              if (A <= 768) m.querySelector("img");
              else if (O) {
                var V, H, j = _.offsetHeight, X = m.querySelector("img"), Z = (V = this.elements[this.index]) === null || V === void 0 ? void 0 : V.node, ee = "100vh";
                Z && (ee = (H = Z.getAttribute("data-height")) !== null && H !== void 0 ? H : ee), X.setAttribute("style", "max-height: calc(".concat(ee, " - ").concat(j, "px)")), _.setAttribute("style", "max-width: ".concat(X.offsetWidth, "px;"));
              }
            }
            if (c) {
              var ne = oe(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
              if (!ne) {
                var ke = c.clientWidth, We = c.clientHeight, ze = ke / We;
                ne = "".concat(ke / ze, ":").concat(We / ze);
              }
              var at = ne.split(":"), Ne = this.settings.videosWidth, st = this.settings.videosWidth, lt = (st = ye(Ne) || Ne.indexOf("px") !== -1 ? parseInt(Ne) : Ne.indexOf("vw") !== -1 ? A * parseInt(Ne) / 100 : Ne.indexOf("vh") !== -1 ? L * parseInt(Ne) / 100 : Ne.indexOf("%") !== -1 ? A * parseInt(Ne) / 100 : parseInt(c.clientWidth)) / (parseInt(at[0]) / parseInt(at[1]));
              if (lt = Math.floor(lt), O && (L -= _.offsetHeight), st > A || lt > L || L < lt && A > st) {
                var an = c.offsetWidth, Yt = c.offsetHeight, Ke = L / Yt, Je = { width: an * Ke, height: Yt * Ke };
                c.parentNode.setAttribute("style", "max-width: ".concat(Je.width, "px")), O && _.setAttribute("style", "max-width: ".concat(Je.width, "px;"));
              } else c.parentNode.style.maxWidth = "".concat(Ne), O && _.setAttribute("style", "max-width: ".concat(Ne, ";"));
            }
          }
        }
      } }, { key: "reload", value: function() {
        this.init();
      } }, { key: "updateNavigationClasses", value: function() {
        var o = this.loop();
        x(this.nextButton, "disabled"), x(this.prevButton, "disabled"), this.index == 0 && this.elements.length - 1 == 0 ? (p(this.prevButton, "disabled"), p(this.nextButton, "disabled")) : this.index !== 0 || o ? this.index !== this.elements.length - 1 || o || p(this.nextButton, "disabled") : p(this.prevButton, "disabled");
      } }, { key: "loop", value: function() {
        var o = oe(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
        return o = oe(this.settings, "loop") ? this.settings.loop : o, o;
      } }, { key: "close", value: function() {
        var o = this;
        if (!this.lightboxOpen) {
          if (this.events) {
            for (var a in this.events) this.events.hasOwnProperty(a) && this.events[a].destroy();
            this.events = null;
          }
          return !1;
        }
        if (this.closing) return !1;
        this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && d(this.bodyHiddenChildElms, function(c) {
          c.removeAttribute("aria-hidden");
        }), p(this.modal, "glightbox-closing"), P(this.overlay, this.settings.openEffect == "none" ? "none" : this.settings.cssEfects.fade.out), P(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function() {
          if (o.activeSlide = null, o.prevActiveSlideIndex = null, o.prevActiveSlide = null, o.built = !1, o.events) {
            for (var c in o.events) o.events.hasOwnProperty(c) && o.events[c].destroy();
            o.events = null;
          }
          var m = document.body;
          x(R, "glightbox-open"), x(m, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), o.modal.parentNode.removeChild(o.modal), o.trigger("close"), U(o.settings.onClose) && o.settings.onClose();
          var _ = document.querySelector(".gcss-styles");
          _ && _.parentNode.removeChild(_), o.lightboxOpen = !1, o.closing = null;
        });
      } }, { key: "destroy", value: function() {
        this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
      } }, { key: "on", value: function(o, a) {
        var c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!o || !U(a)) throw new TypeError("Event name and callback must be defined");
        this.apiEvents.push({ evt: o, once: c, callback: a });
      } }, { key: "once", value: function(o, a) {
        this.on(o, a, !0);
      } }, { key: "trigger", value: function(o) {
        var a = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, m = [];
        d(this.apiEvents, function(_, A) {
          var L = _.evt, O = _.once, V = _.callback;
          L == o && (V(c), O && m.push(A));
        }), m.length && d(m, function(_) {
          return a.apiEvents.splice(_, 1);
        });
      } }, { key: "clearAllEvents", value: function() {
        this.apiEvents.splice(0, this.apiEvents.length);
      } }, { key: "version", value: function() {
        return "3.3.1";
      } }]);
      return function() {
        var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new _e(o);
        return a.init(), a;
      };
    });
  }(Dn)), Dn.exports;
}
var Il = $l();
const Nl = /* @__PURE__ */ Ll(Il), Rl = {
  __name: "BflexImageGallery",
  props: {
    images: Array,
    // List of images [{ src: "...", title: "...", description: "..." }]
    modelValue: Boolean
    // Open/close state
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, i = t;
    let r = null;
    return Tt(() => {
      r = Nl({
        elements: n.images.map((s) => ({
          href: s.url,
          type: "image",
          title: s.title || "",
          description: s.description || ""
        })),
        openEffect: "zoom",
        // Анимация открытия
        closeEffect: "fade",
        // Анимация закрытия
        touchNavigation: !0
      }), n.modelValue && r.open(), r.on("close", () => {
        i("update:modelValue", !1);
      });
    }), qe(
      () => n.modelValue,
      (s) => {
        s ? r.open() : r.close();
      }
    ), Gr(() => {
      r && r.destroy();
    }), (s, l) => ge(s.$slots, "default");
  }
}, Dl = { class: "accommodation-type-card" }, Ml = ["src", "alt"], Fl = { key: 1 }, ql = { class: "accommodation-type-card__body" }, Bl = { class: "accommodation-type-card__body-description" }, zl = { class: "amenities" }, Hl = {
  __name: "BflexAccommodationTypeItem",
  props: {
    /**
     * @type {{
     *   name: string,
     *   description: string,
     *   thumbnail: {
     *     url: string,
     *     name: string
     *   } | null,
     *   gallery: Array<{
     *      src: string,
     *      title: string,
     *      description: string
     *      }>,
     *   amenities: Array<{
     *     title: string
     *   }>
     * }}
     */
    data: {
      type: Object,
      default: () => ({
        name: "",
        description: "",
        thumbnail: null,
        gallery: [],
        amenities: []
      })
    }
  },
  setup(e) {
    const { t } = Ce(), n = ae(!1), i = () => {
      n.value = !0;
    };
    return (r, s) => (C(), M("article", Dl, [
      w("section", {
        onClick: i,
        class: "accommodation-type-card__img"
      }, [
        N(Rl, {
          modelValue: n.value,
          "onUpdate:modelValue": s[0] || (s[0] = (l) => n.value = l),
          images: e.data.gallery
        }, {
          default: B(() => [
            e.data.thumbnail && e.data.thumbnail.url ? (C(), M("img", {
              key: 0,
              onClick: i,
              src: e.data.thumbnail.url,
              alt: e.data.thumbnail.name
            }, null, 8, Ml)) : (C(), M("span", Fl, D(z(t)("accommodationType.thumbnail")), 1))
          ]),
          _: 1
        }, 8, ["modelValue", "images"])
      ]),
      w("section", ql, [
        w("div", Bl, [
          w("h2", null, D(e.data.name), 1),
          ge(r.$slots, "description", {}, () => [
            w("p", null, D(e.data.description), 1)
          ]),
          w("div", zl, [
            (C(!0), M(ue, null, Le(e.data.amenities, (l, u) => (C(), M("span", {
              key: u,
              class: "amenities__item"
            }, D(l.title), 1))), 128))
          ])
        ])
      ])
    ]));
  }
}, Wl = ["top", "right", "bottom", "left"], ko = ["start", "end"], To = /* @__PURE__ */ Wl.reduce((e, t) => e.concat(t, t + "-" + ko[0], t + "-" + ko[1]), []), yn = Math.min, Nt = Math.max, Vl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ul = {
  start: "end",
  end: "start"
};
function hi(e, t, n) {
  return Nt(e, yn(t, n));
}
function zt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function it(e) {
  return e.split("-")[0];
}
function Xe(e) {
  return e.split("-")[1];
}
function br(e) {
  return e === "x" ? "y" : "x";
}
function $i(e) {
  return e === "y" ? "height" : "width";
}
function qt(e) {
  return ["top", "bottom"].includes(it(e)) ? "y" : "x";
}
function Ii(e) {
  return br(qt(e));
}
function wr(e, t, n) {
  n === void 0 && (n = !1);
  const i = Xe(e), r = Ii(e), s = $i(r);
  let l = r === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (l = zn(l)), [l, zn(l)];
}
function Yl(e) {
  const t = zn(e);
  return [Bn(e), t, Bn(t)];
}
function Bn(e) {
  return e.replace(/start|end/g, (t) => Ul[t]);
}
function jl(e, t, n) {
  const i = ["left", "right"], r = ["right", "left"], s = ["top", "bottom"], l = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? r : i : t ? i : r;
    case "left":
    case "right":
      return t ? s : l;
    default:
      return [];
  }
}
function Xl(e, t, n, i) {
  const r = Xe(e);
  let s = jl(it(e), n === "start", i);
  return r && (s = s.map((l) => l + "-" + r), t && (s = s.concat(s.map(Bn)))), s;
}
function zn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Vl[t]);
}
function Gl(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function xr(e) {
  return typeof e != "number" ? Gl(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function dn(e) {
  const {
    x: t,
    y: n,
    width: i,
    height: r
  } = e;
  return {
    width: i,
    height: r,
    top: n,
    left: t,
    right: t + i,
    bottom: n + r,
    x: t,
    y: n
  };
}
function So(e, t, n) {
  let {
    reference: i,
    floating: r
  } = e;
  const s = qt(t), l = Ii(t), u = $i(l), f = it(t), d = s === "y", b = i.x + i.width / 2 - r.width / 2, g = i.y + i.height / 2 - r.height / 2, p = i[u] / 2 - r[u] / 2;
  let x;
  switch (f) {
    case "top":
      x = {
        x: b,
        y: i.y - r.height
      };
      break;
    case "bottom":
      x = {
        x: b,
        y: i.y + i.height
      };
      break;
    case "right":
      x = {
        x: i.x + i.width,
        y: g
      };
      break;
    case "left":
      x = {
        x: i.x - r.width,
        y: g
      };
      break;
    default:
      x = {
        x: i.x,
        y: i.y
      };
  }
  switch (Xe(t)) {
    case "start":
      x[l] -= p * (n && d ? -1 : 1);
      break;
    case "end":
      x[l] += p * (n && d ? -1 : 1);
      break;
  }
  return x;
}
const Kl = async (e, t, n) => {
  const {
    placement: i = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: l
  } = n, u = s.filter(Boolean), f = await (l.isRTL == null ? void 0 : l.isRTL(t));
  let d = await l.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: b,
    y: g
  } = So(d, i, f), p = i, x = {}, k = 0;
  for (let S = 0; S < u.length; S++) {
    const {
      name: P,
      fn: h
    } = u[S], {
      x: T,
      y: I,
      data: E,
      reset: F
    } = await h({
      x: b,
      y: g,
      initialPlacement: i,
      placement: p,
      strategy: r,
      middlewareData: x,
      rects: d,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    b = T ?? b, g = I ?? g, x = {
      ...x,
      [P]: {
        ...x[P],
        ...E
      }
    }, F && k <= 50 && (k++, typeof F == "object" && (F.placement && (p = F.placement), F.rects && (d = F.rects === !0 ? await l.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : F.rects), {
      x: b,
      y: g
    } = So(d, p, f)), S = -1);
  }
  return {
    x: b,
    y: g,
    placement: p,
    strategy: r,
    middlewareData: x
  };
};
async function jn(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: i,
    y: r,
    platform: s,
    rects: l,
    elements: u,
    strategy: f
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: b = "viewport",
    elementContext: g = "floating",
    altBoundary: p = !1,
    padding: x = 0
  } = zt(t, e), k = xr(x), P = u[p ? g === "floating" ? "reference" : "floating" : g], h = dn(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(P))) == null || n ? P : P.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(u.floating)),
    boundary: d,
    rootBoundary: b,
    strategy: f
  })), T = g === "floating" ? {
    x: i,
    y: r,
    width: l.floating.width,
    height: l.floating.height
  } : l.reference, I = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u.floating)), E = await (s.isElement == null ? void 0 : s.isElement(I)) ? await (s.getScale == null ? void 0 : s.getScale(I)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, F = dn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: u,
    rect: T,
    offsetParent: I,
    strategy: f
  }) : T);
  return {
    top: (h.top - F.top + k.top) / E.y,
    bottom: (F.bottom - h.bottom + k.bottom) / E.y,
    left: (h.left - F.left + k.left) / E.x,
    right: (F.right - h.right + k.right) / E.x
  };
}
const Jl = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: i,
      placement: r,
      rects: s,
      platform: l,
      elements: u,
      middlewareData: f
    } = t, {
      element: d,
      padding: b = 0
    } = zt(e, t) || {};
    if (d == null)
      return {};
    const g = xr(b), p = {
      x: n,
      y: i
    }, x = Ii(r), k = $i(x), S = await l.getDimensions(d), P = x === "y", h = P ? "top" : "left", T = P ? "bottom" : "right", I = P ? "clientHeight" : "clientWidth", E = s.reference[k] + s.reference[x] - p[x] - s.floating[k], F = p[x] - s.reference[x], q = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(d));
    let $ = q ? q[I] : 0;
    (!$ || !await (l.isElement == null ? void 0 : l.isElement(q))) && ($ = u.floating[I] || s.floating[k]);
    const J = E / 2 - F / 2, G = $ / 2 - S[k] / 2 - 1, U = yn(g[h], G), se = yn(g[T], G), K = U, Te = $ - S[k] - se, we = $ / 2 - S[k] / 2 + J, Oe = hi(K, we, Te), pe = !f.arrow && Xe(r) != null && we !== Oe && s.reference[k] / 2 - (we < K ? U : se) - S[k] / 2 < 0, oe = pe ? we < K ? we - K : we - Te : 0;
    return {
      [x]: p[x] + oe,
      data: {
        [x]: Oe,
        centerOffset: we - Oe - oe,
        ...pe && {
          alignmentOffset: oe
        }
      },
      reset: pe
    };
  }
});
function Zl(e, t, n) {
  return (e ? [...n.filter((r) => Xe(r) === e), ...n.filter((r) => Xe(r) !== e)] : n.filter((r) => it(r) === r)).filter((r) => e ? Xe(r) === e || (t ? Bn(r) !== r : !1) : !0);
}
const Ql = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    async fn(t) {
      var n, i, r;
      const {
        rects: s,
        middlewareData: l,
        placement: u,
        platform: f,
        elements: d
      } = t, {
        crossAxis: b = !1,
        alignment: g,
        allowedPlacements: p = To,
        autoAlignment: x = !0,
        ...k
      } = zt(e, t), S = g !== void 0 || p === To ? Zl(g || null, x, p) : p, P = await jn(t, k), h = ((n = l.autoPlacement) == null ? void 0 : n.index) || 0, T = S[h];
      if (T == null)
        return {};
      const I = wr(T, s, await (f.isRTL == null ? void 0 : f.isRTL(d.floating)));
      if (u !== T)
        return {
          reset: {
            placement: S[0]
          }
        };
      const E = [P[it(T)], P[I[0]], P[I[1]]], F = [...((i = l.autoPlacement) == null ? void 0 : i.overflows) || [], {
        placement: T,
        overflows: E
      }], q = S[h + 1];
      if (q)
        return {
          data: {
            index: h + 1,
            overflows: F
          },
          reset: {
            placement: q
          }
        };
      const $ = F.map((U) => {
        const se = Xe(U.placement);
        return [U.placement, se && b ? (
          // Check along the mainAxis and main crossAxis side.
          U.overflows.slice(0, 2).reduce((K, Te) => K + Te, 0)
        ) : (
          // Check only the mainAxis.
          U.overflows[0]
        ), U.overflows];
      }).sort((U, se) => U[1] - se[1]), G = ((r = $.filter((U) => U[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        Xe(U[0]) ? 2 : 3
      ).every((se) => se <= 0))[0]) == null ? void 0 : r[0]) || $[0][0];
      return G !== u ? {
        data: {
          index: h + 1,
          overflows: F
        },
        reset: {
          placement: G
        }
      } : {};
    }
  };
}, ec = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, i;
      const {
        placement: r,
        middlewareData: s,
        rects: l,
        initialPlacement: u,
        platform: f,
        elements: d
      } = t, {
        mainAxis: b = !0,
        crossAxis: g = !0,
        fallbackPlacements: p,
        fallbackStrategy: x = "bestFit",
        fallbackAxisSideDirection: k = "none",
        flipAlignment: S = !0,
        ...P
      } = zt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const h = it(r), T = qt(u), I = it(u) === u, E = await (f.isRTL == null ? void 0 : f.isRTL(d.floating)), F = p || (I || !S ? [zn(u)] : Yl(u)), q = k !== "none";
      !p && q && F.push(...Xl(u, S, k, E));
      const $ = [u, ...F], J = await jn(t, P), G = [];
      let U = ((i = s.flip) == null ? void 0 : i.overflows) || [];
      if (b && G.push(J[h]), g) {
        const we = wr(r, l, E);
        G.push(J[we[0]], J[we[1]]);
      }
      if (U = [...U, {
        placement: r,
        overflows: G
      }], !G.every((we) => we <= 0)) {
        var se, K;
        const we = (((se = s.flip) == null ? void 0 : se.index) || 0) + 1, Oe = $[we];
        if (Oe)
          return {
            data: {
              index: we,
              overflows: U
            },
            reset: {
              placement: Oe
            }
          };
        let pe = (K = U.filter((oe) => oe.overflows[0] <= 0).sort((oe, Re) => oe.overflows[1] - Re.overflows[1])[0]) == null ? void 0 : K.placement;
        if (!pe)
          switch (x) {
            case "bestFit": {
              var Te;
              const oe = (Te = U.filter((Re) => {
                if (q) {
                  const ye = qt(Re.placement);
                  return ye === T || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ye === "y";
                }
                return !0;
              }).map((Re) => [Re.placement, Re.overflows.filter((ye) => ye > 0).reduce((ye, ot) => ye + ot, 0)]).sort((Re, ye) => Re[1] - ye[1])[0]) == null ? void 0 : Te[0];
              oe && (pe = oe);
              break;
            }
            case "initialPlacement":
              pe = u;
              break;
          }
        if (r !== pe)
          return {
            reset: {
              placement: pe
            }
          };
      }
      return {};
    }
  };
};
async function tc(e, t) {
  const {
    placement: n,
    platform: i,
    elements: r
  } = e, s = await (i.isRTL == null ? void 0 : i.isRTL(r.floating)), l = it(n), u = Xe(n), f = qt(n) === "y", d = ["left", "top"].includes(l) ? -1 : 1, b = s && f ? -1 : 1, g = zt(t, e);
  let {
    mainAxis: p,
    crossAxis: x,
    alignmentAxis: k
  } = typeof g == "number" ? {
    mainAxis: g,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: g.mainAxis || 0,
    crossAxis: g.crossAxis || 0,
    alignmentAxis: g.alignmentAxis
  };
  return u && typeof k == "number" && (x = u === "end" ? k * -1 : k), f ? {
    x: x * b,
    y: p * d
  } : {
    x: p * d,
    y: x * b
  };
}
const nc = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, i;
      const {
        x: r,
        y: s,
        placement: l,
        middlewareData: u
      } = t, f = await tc(t, e);
      return l === ((n = u.offset) == null ? void 0 : n.placement) && (i = u.arrow) != null && i.alignmentOffset ? {} : {
        x: r + f.x,
        y: s + f.y,
        data: {
          ...f,
          placement: l
        }
      };
    }
  };
}, ic = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: i,
        placement: r
      } = t, {
        mainAxis: s = !0,
        crossAxis: l = !1,
        limiter: u = {
          fn: (P) => {
            let {
              x: h,
              y: T
            } = P;
            return {
              x: h,
              y: T
            };
          }
        },
        ...f
      } = zt(e, t), d = {
        x: n,
        y: i
      }, b = await jn(t, f), g = qt(it(r)), p = br(g);
      let x = d[p], k = d[g];
      if (s) {
        const P = p === "y" ? "top" : "left", h = p === "y" ? "bottom" : "right", T = x + b[P], I = x - b[h];
        x = hi(T, x, I);
      }
      if (l) {
        const P = g === "y" ? "top" : "left", h = g === "y" ? "bottom" : "right", T = k + b[P], I = k - b[h];
        k = hi(T, k, I);
      }
      const S = u.fn({
        ...t,
        [p]: x,
        [g]: k
      });
      return {
        ...S,
        data: {
          x: S.x - n,
          y: S.y - i,
          enabled: {
            [p]: s,
            [g]: l
          }
        }
      };
    }
  };
}, oc = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, i;
      const {
        placement: r,
        rects: s,
        platform: l,
        elements: u
      } = t, {
        apply: f = () => {
        },
        ...d
      } = zt(e, t), b = await jn(t, d), g = it(r), p = Xe(r), x = qt(r) === "y", {
        width: k,
        height: S
      } = s.floating;
      let P, h;
      g === "top" || g === "bottom" ? (P = g, h = p === (await (l.isRTL == null ? void 0 : l.isRTL(u.floating)) ? "start" : "end") ? "left" : "right") : (h = g, P = p === "end" ? "top" : "bottom");
      const T = S - b.top - b.bottom, I = k - b.left - b.right, E = yn(S - b[P], T), F = yn(k - b[h], I), q = !t.middlewareData.shift;
      let $ = E, J = F;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (J = I), (i = t.middlewareData.shift) != null && i.enabled.y && ($ = T), q && !p) {
        const U = Nt(b.left, 0), se = Nt(b.right, 0), K = Nt(b.top, 0), Te = Nt(b.bottom, 0);
        x ? J = k - 2 * (U !== 0 || se !== 0 ? U + se : Nt(b.left, b.right)) : $ = S - 2 * (K !== 0 || Te !== 0 ? K + Te : Nt(b.top, b.bottom));
      }
      await f({
        ...t,
        availableWidth: J,
        availableHeight: $
      });
      const G = await l.getDimensions(u.floating);
      return k !== G.width || S !== G.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ue(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function tt(e) {
  return Ue(e).getComputedStyle(e);
}
const Eo = Math.min, un = Math.max, Hn = Math.round;
function kr(e) {
  const t = tt(e);
  let n = parseFloat(t.width), i = parseFloat(t.height);
  const r = e.offsetWidth, s = e.offsetHeight, l = Hn(n) !== r || Hn(i) !== s;
  return l && (n = r, i = s), { width: n, height: i, fallback: l };
}
function xt(e) {
  return Sr(e) ? (e.nodeName || "").toLowerCase() : "";
}
let $n;
function Tr() {
  if ($n) return $n;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? ($n = e.brands.map((t) => t.brand + "/" + t.version).join(" "), $n) : navigator.userAgent;
}
function nt(e) {
  return e instanceof Ue(e).HTMLElement;
}
function bt(e) {
  return e instanceof Ue(e).Element;
}
function Sr(e) {
  return e instanceof Ue(e).Node;
}
function Co(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof Ue(e).ShadowRoot || e instanceof ShadowRoot;
}
function Xn(e) {
  const { overflow: t, overflowX: n, overflowY: i, display: r } = tt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + i + n) && !["inline", "contents"].includes(r);
}
function rc(e) {
  return ["table", "td", "th"].includes(xt(e));
}
function gi(e) {
  const t = /firefox/i.test(Tr()), n = tt(e), i = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!i && i !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some((r) => n.willChange.includes(r)) || ["paint", "layout", "strict", "content"].some((r) => {
    const s = n.contain;
    return s != null && s.includes(r);
  });
}
function Er() {
  return !/^((?!chrome|android).)*safari/i.test(Tr());
}
function Ni(e) {
  return ["html", "body", "#document"].includes(xt(e));
}
function Cr(e) {
  return bt(e) ? e : e.contextElement;
}
const Pr = { x: 1, y: 1 };
function Gt(e) {
  const t = Cr(e);
  if (!nt(t)) return Pr;
  const n = t.getBoundingClientRect(), { width: i, height: r, fallback: s } = kr(t);
  let l = (s ? Hn(n.width) : n.width) / i, u = (s ? Hn(n.height) : n.height) / r;
  return l && Number.isFinite(l) || (l = 1), u && Number.isFinite(u) || (u = 1), { x: l, y: u };
}
function _n(e, t, n, i) {
  var r, s;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const l = e.getBoundingClientRect(), u = Cr(e);
  let f = Pr;
  t && (i ? bt(i) && (f = Gt(i)) : f = Gt(e));
  const d = u ? Ue(u) : window, b = !Er() && n;
  let g = (l.left + (b && ((r = d.visualViewport) == null ? void 0 : r.offsetLeft) || 0)) / f.x, p = (l.top + (b && ((s = d.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / f.y, x = l.width / f.x, k = l.height / f.y;
  if (u) {
    const S = Ue(u), P = i && bt(i) ? Ue(i) : i;
    let h = S.frameElement;
    for (; h && i && P !== S; ) {
      const T = Gt(h), I = h.getBoundingClientRect(), E = getComputedStyle(h);
      I.x += (h.clientLeft + parseFloat(E.paddingLeft)) * T.x, I.y += (h.clientTop + parseFloat(E.paddingTop)) * T.y, g *= T.x, p *= T.y, x *= T.x, k *= T.y, g += I.x, p += I.y, h = Ue(h).frameElement;
    }
  }
  return { width: x, height: k, top: p, right: g + x, bottom: p + k, left: g, x: g, y: p };
}
function wt(e) {
  return ((Sr(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Gn(e) {
  return bt(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Ar(e) {
  return _n(wt(e)).left + Gn(e).scrollLeft;
}
function bn(e) {
  if (xt(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || Co(e) && e.host || wt(e);
  return Co(t) ? t.host : t;
}
function Lr(e) {
  const t = bn(e);
  return Ni(t) ? t.ownerDocument.body : nt(t) && Xn(t) ? t : Lr(t);
}
function Wn(e, t) {
  var n;
  t === void 0 && (t = []);
  const i = Lr(e), r = i === ((n = e.ownerDocument) == null ? void 0 : n.body), s = Ue(i);
  return r ? t.concat(s, s.visualViewport || [], Xn(i) ? i : []) : t.concat(i, Wn(i));
}
function Po(e, t, n) {
  return t === "viewport" ? dn(function(i, r) {
    const s = Ue(i), l = wt(i), u = s.visualViewport;
    let f = l.clientWidth, d = l.clientHeight, b = 0, g = 0;
    if (u) {
      f = u.width, d = u.height;
      const p = Er();
      (p || !p && r === "fixed") && (b = u.offsetLeft, g = u.offsetTop);
    }
    return { width: f, height: d, x: b, y: g };
  }(e, n)) : bt(t) ? dn(function(i, r) {
    const s = _n(i, !0, r === "fixed"), l = s.top + i.clientTop, u = s.left + i.clientLeft, f = nt(i) ? Gt(i) : { x: 1, y: 1 };
    return { width: i.clientWidth * f.x, height: i.clientHeight * f.y, x: u * f.x, y: l * f.y };
  }(t, n)) : dn(function(i) {
    const r = wt(i), s = Gn(i), l = i.ownerDocument.body, u = un(r.scrollWidth, r.clientWidth, l.scrollWidth, l.clientWidth), f = un(r.scrollHeight, r.clientHeight, l.scrollHeight, l.clientHeight);
    let d = -s.scrollLeft + Ar(i);
    const b = -s.scrollTop;
    return tt(l).direction === "rtl" && (d += un(r.clientWidth, l.clientWidth) - u), { width: u, height: f, x: d, y: b };
  }(wt(e)));
}
function Ao(e) {
  return nt(e) && tt(e).position !== "fixed" ? e.offsetParent : null;
}
function Lo(e) {
  const t = Ue(e);
  let n = Ao(e);
  for (; n && rc(n) && tt(n).position === "static"; ) n = Ao(n);
  return n && (xt(n) === "html" || xt(n) === "body" && tt(n).position === "static" && !gi(n)) ? t : n || function(i) {
    let r = bn(i);
    for (; nt(r) && !Ni(r); ) {
      if (gi(r)) return r;
      r = bn(r);
    }
    return null;
  }(e) || t;
}
function ac(e, t, n) {
  const i = nt(t), r = wt(t), s = _n(e, !0, n === "fixed", t);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const u = { x: 0, y: 0 };
  if (i || !i && n !== "fixed") if ((xt(t) !== "body" || Xn(r)) && (l = Gn(t)), nt(t)) {
    const f = _n(t, !0);
    u.x = f.x + t.clientLeft, u.y = f.y + t.clientTop;
  } else r && (u.x = Ar(r));
  return { x: s.left + l.scrollLeft - u.x, y: s.top + l.scrollTop - u.y, width: s.width, height: s.height };
}
const sc = { getClippingRect: function(e) {
  let { element: t, boundary: n, rootBoundary: i, strategy: r } = e;
  const s = n === "clippingAncestors" ? function(d, b) {
    const g = b.get(d);
    if (g) return g;
    let p = Wn(d).filter((P) => bt(P) && xt(P) !== "body"), x = null;
    const k = tt(d).position === "fixed";
    let S = k ? bn(d) : d;
    for (; bt(S) && !Ni(S); ) {
      const P = tt(S), h = gi(S);
      (k ? h || x : h || P.position !== "static" || !x || !["absolute", "fixed"].includes(x.position)) ? x = P : p = p.filter((T) => T !== S), S = bn(S);
    }
    return b.set(d, p), p;
  }(t, this._c) : [].concat(n), l = [...s, i], u = l[0], f = l.reduce((d, b) => {
    const g = Po(t, b, r);
    return d.top = un(g.top, d.top), d.right = Eo(g.right, d.right), d.bottom = Eo(g.bottom, d.bottom), d.left = un(g.left, d.left), d;
  }, Po(t, u, r));
  return { width: f.right - f.left, height: f.bottom - f.top, x: f.left, y: f.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: n, strategy: i } = e;
  const r = nt(n), s = wt(n);
  if (n === s) return t;
  let l = { scrollLeft: 0, scrollTop: 0 }, u = { x: 1, y: 1 };
  const f = { x: 0, y: 0 };
  if ((r || !r && i !== "fixed") && ((xt(n) !== "body" || Xn(s)) && (l = Gn(n)), nt(n))) {
    const d = _n(n);
    u = Gt(n), f.x = d.x + n.clientLeft, f.y = d.y + n.clientTop;
  }
  return { width: t.width * u.x, height: t.height * u.y, x: t.x * u.x - l.scrollLeft * u.x + f.x, y: t.y * u.y - l.scrollTop * u.y + f.y };
}, isElement: bt, getDimensions: function(e) {
  return nt(e) ? kr(e) : e.getBoundingClientRect();
}, getOffsetParent: Lo, getDocumentElement: wt, getScale: Gt, async getElementRects(e) {
  let { reference: t, floating: n, strategy: i } = e;
  const r = this.getOffsetParent || Lo, s = this.getDimensions;
  return { reference: ac(t, await r(n), i), floating: { x: 0, y: 0, ...await s(n) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => tt(e).direction === "rtl" }, lc = (e, t, n) => {
  const i = /* @__PURE__ */ new Map(), r = { platform: sc, ...n }, s = { ...r.platform, _c: i };
  return Kl(e, t, { ...r, platform: s });
}, Ft = {
  // Disable popper components
  disabled: !1,
  // Default position offset along main axis (px)
  distance: 5,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: "body",
  // Element used to compute position and size boundaries
  boundary: void 0,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: !1,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 150,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: "absolute",
  // Prevent overflow
  preventOverflow: !0,
  // Flip to the opposite placement if needed
  flip: !0,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: !0,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: !0,
  /**
   * By default, compute autohide on 'click'.
   */
  autoHideOnMousedown: !1,
  // Themes
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: "top",
      // Default events that trigger the tooltip
      triggers: ["hover", "focus", "touch"],
      // Close tooltip on click on tooltip target
      hideTriggers: (e) => [...e, "click"],
      // Delay (ms)
      delay: {
        show: 200,
        hide: 0
      },
      // Update popper on content resize
      handleResize: !1,
      // Enable HTML content in directive
      html: !1,
      // Displayed when tooltip content is loading
      loadingContent: "..."
    },
    dropdown: {
      // Default dropdown placement relative to target element
      placement: "bottom",
      // Default events that trigger the dropdown
      triggers: ["click"],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: !0,
      // Hide on clock outside
      autoHide: !0
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function vi(e, t) {
  let n = Ft.themes[e] || {}, i;
  do
    i = n[t], typeof i > "u" ? n.$extend ? n = Ft.themes[n.$extend] || {} : (n = null, i = Ft[t]) : n = null;
  while (n);
  return i;
}
function cc(e) {
  const t = [e];
  let n = Ft.themes[e] || {};
  do
    n.$extend && !n.$resetCss ? (t.push(n.$extend), n = Ft.themes[n.$extend] || {}) : n = null;
  while (n);
  return t.map((i) => `v-popper--theme-${i}`);
}
function Oo(e) {
  const t = [e];
  let n = Ft.themes[e] || {};
  do
    n.$extend ? (t.push(n.$extend), n = Ft.themes[n.$extend] || {}) : n = null;
  while (n);
  return t;
}
let wn = !1;
if (typeof window < "u") {
  wn = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        wn = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let Or = !1;
typeof window < "u" && typeof navigator < "u" && (Or = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const dc = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), $o = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, Io = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function No(e, t) {
  const n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}
function ti() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const Ye = [];
let $t = null;
const Ro = {};
function Do(e) {
  let t = Ro[e];
  return t || (t = Ro[e] = []), t;
}
let yi = function() {
};
typeof window < "u" && (yi = window.Element);
function re(e) {
  return function(t) {
    return vi(t.theme, e);
  };
}
const ni = "__floating-vue__popper", $r = () => Bt({
  name: "VPopper",
  provide() {
    return {
      [ni]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [ni]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: !0
    },
    targetNodes: {
      type: Function,
      required: !0
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: !0
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: re("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: re("positioningDisabled")
    },
    placement: {
      type: String,
      default: re("placement"),
      validator: (e) => dc.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: re("delay")
    },
    distance: {
      type: [Number, String],
      default: re("distance")
    },
    skidding: {
      type: [Number, String],
      default: re("skidding")
    },
    triggers: {
      type: Array,
      default: re("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: re("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: re("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: re("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: re("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: re("popperHideTriggers")
    },
    container: {
      type: [String, Object, yi, Boolean],
      default: re("container")
    },
    boundary: {
      type: [String, yi],
      default: re("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: re("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: re("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: re("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: re("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: re("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: re("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: re("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: re("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: re("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: re("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: re("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: re("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: re("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: re("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: re("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: re("flip")
    },
    shift: {
      type: Boolean,
      default: re("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: re("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: re("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: re("disposeTimeout")
    }
  },
  emits: {
    show: () => !0,
    hide: () => !0,
    "update:shown": (e) => !0,
    "apply-show": () => !0,
    "apply-hide": () => !0,
    "close-group": () => !0,
    "close-directive": () => !0,
    "auto-hide": () => !0,
    resize: () => !0
  },
  data() {
    return {
      isShown: !1,
      isMounted: !1,
      skipTransition: !1,
      classes: {
        showFrom: !1,
        showTo: !1,
        hideFrom: !1,
        hideTo: !0
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      randomId: `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`,
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: !0,
      pendingHide: !1,
      containsGlobalTarget: !1,
      isDisposed: !0,
      mouseDownContains: !1
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e;
      return (e = this[ni]) == null ? void 0 : e.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e, t;
      return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e) {
      e ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    triggers: {
      handler: "$_refreshListeners",
      deep: !0
    },
    positioningDisabled: "$_refreshListeners",
    ...[
      "placement",
      "distance",
      "skidding",
      "boundary",
      "strategy",
      "overflowPadding",
      "arrowPadding",
      "preventOverflow",
      "shift",
      "shiftCrossAxis",
      "flip"
    ].reduce((e, t) => (e[t] = "$_computePosition", e), {})
  },
  created() {
    this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: e = null, skipDelay: t = !1, force: n = !1 } = {}) {
      var i, r;
      (i = this.parentPopper) != null && i.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = !1, (n || !this.disabled) && (((r = this.parentPopper) == null ? void 0 : r.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
        this.$_showFrameLocked = !1;
      })), this.$emit("update:shown", !0));
    },
    hide({ event: e = null, skipDelay: t = !1 } = {}) {
      var n;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.pendingHide = !0;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((n = this.parentPopper) == null ? void 0 : n.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = !1, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", !1);
      }
    },
    init() {
      var e;
      this.isDisposed && (this.isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = ((e = this.referenceNode) == null ? void 0 : e.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.isDisposed || (this.isDisposed = !0, this.$_removeEventListeners(), this.hide({ skipDelay: !0 }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      if (this.isDisposed || this.positioningDisabled)
        return;
      const e = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e.middleware.push(nc({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(Ql({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(ic({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(ec({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(Jl({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: i, rects: r, middlewareData: s }) => {
          let l;
          const { centerOffset: u } = s.arrow;
          return i.startsWith("top") || i.startsWith("bottom") ? l = Math.abs(u) > r.reference.width / 2 : l = Math.abs(u) > r.reference.height / 2, {
            data: {
              overflow: l
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const i = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: r, placement: s, middlewareData: l }) => {
            var u;
            if ((u = l.autoSize) != null && u.skip)
              return {};
            let f, d;
            return s.startsWith("top") || s.startsWith("bottom") ? f = r.reference.width : d = r.reference.height, this.$_innerNode.style[i === "min" ? "minWidth" : i === "max" ? "maxWidth" : "width"] = f != null ? `${f}px` : null, this.$_innerNode.style[i === "min" ? "minHeight" : i === "max" ? "maxHeight" : "height"] = d != null ? `${d}px` : null, {
              data: {
                skip: !0
              },
              reset: {
                rects: !0
              }
            };
          }
        });
      }
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(oc({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: i, availableHeight: r }) => {
          this.$_innerNode.style.maxWidth = i != null ? `${i}px` : null, this.$_innerNode.style.maxHeight = r != null ? `${r}px` : null;
        }
      })));
      const n = await lc(this.$_referenceNode, this.$_popperNode, e);
      Object.assign(this.result, {
        x: n.x,
        y: n.y,
        placement: n.placement,
        strategy: n.strategy,
        arrow: {
          ...n.middlewareData.arrow,
          ...n.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e, t = !1) {
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), $t && this.instantMove && $t.instantMove && $t !== this.parentPopper) {
        $t.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && ($t = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await ti(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...Wn(this.$_referenceNode),
        ...Wn(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), n = this.$_popperNode.querySelector(".v-popper__wrapper"), i = n.parentNode.getBoundingClientRect(), r = t.x + t.width / 2 - (i.left + n.offsetLeft), s = t.y + t.height / 2 - (i.top + n.offsetTop);
        this.result.transformOrigin = `${r}px ${s}px`;
      }
      this.isShown = !0, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let n = 0; n < Ye.length; n++)
          t = Ye[n], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      Ye.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of Oo(this.theme))
        Do(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await ti(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, No(Ye, this), Ye.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const n of Oo(this.theme)) {
        const i = Do(n);
        No(i, this), i.length === 0 && document.body.classList.remove(`v-popper--some-open--${n}`);
      }
      $t === this && ($t = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await ti(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.isDisposed)
        return;
      let e = this.container;
      if (typeof e == "string" ? e = window.document.querySelector(e) : e === !1 && (e = this.$_targetNodes[0].parentNode), !e)
        throw new Error("No container for popover: " + this.container);
      e.appendChild(this.$_popperNode), this.isMounted = !0;
    },
    $_addEventListeners() {
      const e = (n) => {
        this.isShown && !this.$_hideInProgress || (n.usedByTooltip = !0, !this.$_preventShow && this.show({ event: n }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, $o, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], $o, this.popperTriggers, this.popperShowTriggers, e);
      const t = (n) => {
        n.usedByTooltip || this.hide({ event: n });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, Io, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], Io, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, n) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: n }), e.forEach((i) => i.addEventListener(t, n, wn ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(e, t, n, i, r) {
      let s = n;
      i != null && (s = typeof i == "function" ? i(s) : i), s.forEach((l) => {
        const u = t[l];
        u && this.$_registerEventListeners(e, u, r);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((n) => {
        const { targetNodes: i, eventType: r, handler: s } = n;
        !e || e === r ? i.forEach((l) => l.removeEventListener(r, s)) : t.push(n);
      }), this.$_events = t;
    },
    $_refreshListeners() {
      this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e, t = !1) {
      this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = !0, setTimeout(() => {
        this.$_preventShow = !1;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e, t) {
      for (const n of this.$_targetNodes) {
        const i = n.getAttribute(e);
        i && (n.removeAttribute(e), n.setAttribute(t, i));
      }
    },
    $_applyAttrsToTarget(e) {
      for (const t of this.$_targetNodes)
        for (const n in e) {
          const i = e[n];
          i == null ? t.removeAttribute(n) : t.setAttribute(n, i);
        }
    },
    $_updateParentShownChildren(e) {
      let t = this.parentPopper;
      for (; t; )
        e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.pendingHide && t.hide()), t = t.parentPopper;
    },
    $_isAimingPopper() {
      const e = this.$_referenceNode.getBoundingClientRect();
      if (fn >= e.left && fn <= e.right && mn >= e.top && mn <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), n = fn - yt, i = mn - _t, r = t.left + t.width / 2 - yt + (t.top + t.height / 2) - _t + t.width + t.height, s = yt + n * r, l = _t + i * r;
        return In(yt, _t, s, l, t.left, t.top, t.left, t.bottom) || // Left edge
        In(yt, _t, s, l, t.left, t.top, t.right, t.top) || // Top edge
        In(yt, _t, s, l, t.right, t.top, t.right, t.bottom) || // Right edge
        In(yt, _t, s, l, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (Or) {
    const e = wn ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => Mo(t), e), document.addEventListener("touchend", (t) => Fo(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => Mo(e), !0), window.addEventListener("click", (e) => Fo(e, !1), !0);
  window.addEventListener("resize", mc);
}
function Mo(e, t) {
  for (let n = 0; n < Ye.length; n++) {
    const i = Ye[n];
    try {
      i.mouseDownContains = i.popperNode().contains(e.target);
    } catch {
    }
  }
}
function Fo(e, t) {
  uc(e, t);
}
function uc(e, t) {
  const n = {};
  for (let i = Ye.length - 1; i >= 0; i--) {
    const r = Ye[i];
    try {
      const s = r.containsGlobalTarget = r.mouseDownContains || r.popperNode().contains(e.target);
      r.pendingHide = !1, requestAnimationFrame(() => {
        if (r.pendingHide = !1, !n[r.randomId] && qo(r, s, e)) {
          if (r.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let u = r.parentPopper;
            for (; u; )
              n[u.randomId] = !0, u = u.parentPopper;
            return;
          }
          let l = r.parentPopper;
          for (; l && qo(l, l.containsGlobalTarget, e); )
            l.$_handleGlobalClose(e, t), l = l.parentPopper;
        }
      });
    } catch {
    }
  }
}
function qo(e, t, n) {
  return n.closeAllPopover || n.closePopover && t || fc(e, n) && !t;
}
function fc(e, t) {
  if (typeof e.autoHide == "function") {
    const n = e.autoHide(t);
    return e.lastAutoHide = n, n;
  }
  return e.autoHide;
}
function mc() {
  for (let e = 0; e < Ye.length; e++)
    Ye[e].$_computePosition();
}
let yt = 0, _t = 0, fn = 0, mn = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  yt = fn, _t = mn, fn = e.clientX, mn = e.clientY;
}, wn ? {
  passive: !0
} : void 0);
function In(e, t, n, i, r, s, l, u) {
  const f = ((l - r) * (t - s) - (u - s) * (e - r)) / ((u - s) * (n - e) - (l - r) * (i - t)), d = ((n - e) * (t - s) - (i - t) * (e - r)) / ((u - s) * (n - e) - (l - r) * (i - t));
  return f >= 0 && f <= 1 && d >= 0 && d <= 1;
}
const pc = {
  extends: $r()
}, Ri = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
};
function hc(e, t, n, i, r, s) {
  return C(), M("div", {
    ref: "reference",
    class: Qe(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    ge(e.$slots, "default", Qr(ea(e.slotData)))
  ], 2);
}
const gc = /* @__PURE__ */ Ri(pc, [["render", hc]]);
function vc() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var n = e.indexOf("Trident/");
  if (n > 0) {
    var i = e.indexOf("rv:");
    return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
  }
  var r = e.indexOf("Edge/");
  return r > 0 ? parseInt(e.substring(r + 5, e.indexOf(".", r)), 10) : -1;
}
let Mn;
function _i() {
  _i.init || (_i.init = !0, Mn = vc() !== -1);
}
var Kn = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: !1
    },
    ignoreWidth: {
      type: Boolean,
      default: !1
    },
    ignoreHeight: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    _i(), Zr(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", Mn && this.$el.appendChild(e), e.data = "about:blank", Mn || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!Mn && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const yc = /* @__PURE__ */ ta("data-v-b329ee4c");
Kr("data-v-b329ee4c");
const _c = {
  class: "resize-observer",
  tabindex: "-1"
};
Jr();
const bc = /* @__PURE__ */ yc((e, t, n, i, r, s) => (C(), ie("div", _c)));
Kn.render = bc;
Kn.__scopeId = "data-v-b329ee4c";
Kn.__file = "src/components/ResizeObserver.vue";
const Ir = (e = "theme") => ({
  computed: {
    themeClass() {
      return cc(this[e]);
    }
  }
}), wc = Bt({
  name: "VPopperContent",
  components: {
    ResizeObserver: Kn
  },
  mixins: [
    Ir()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e) {
      return e != null && !isNaN(e) ? `${e}px` : null;
    }
  }
}), xc = ["id", "aria-hidden", "tabindex", "data-popper-placement"], kc = {
  ref: "inner",
  class: "v-popper__inner"
}, Tc = /* @__PURE__ */ w("div", { class: "v-popper__arrow-outer" }, null, -1), Sc = /* @__PURE__ */ w("div", { class: "v-popper__arrow-inner" }, null, -1), Ec = [
  Tc,
  Sc
];
function Cc(e, t, n, i, r, s) {
  const l = ii("ResizeObserver");
  return C(), M("div", {
    id: e.popperId,
    ref: "popover",
    class: Qe(["v-popper__popper", [
      e.themeClass,
      e.classes.popperClass,
      {
        "v-popper__popper--shown": e.shown,
        "v-popper__popper--hidden": !e.shown,
        "v-popper__popper--show-from": e.classes.showFrom,
        "v-popper__popper--show-to": e.classes.showTo,
        "v-popper__popper--hide-from": e.classes.hideFrom,
        "v-popper__popper--hide-to": e.classes.hideTo,
        "v-popper__popper--skip-transition": e.skipTransition,
        "v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e.result
      }
    ]]),
    style: Mt(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = na((u) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    w("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (u) => e.autoHide && e.$emit("hide"))
    }),
    w("div", {
      class: "v-popper__wrapper",
      style: Mt(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      w("div", kc, [
        e.mounted ? (C(), M(ue, { key: 0 }, [
          w("div", null, [
            ge(e.$slots, "default")
          ]),
          e.handleResize ? (C(), ie(l, {
            key: 0,
            onNotify: t[1] || (t[1] = (u) => e.$emit("resize", u))
          })) : fe("", !0)
        ], 64)) : fe("", !0)
      ], 512),
      w("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: Mt(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, Ec, 4)
    ], 4)
  ], 46, xc);
}
const Nr = /* @__PURE__ */ Ri(wc, [["render", Cc]]), Rr = {
  methods: {
    show(...e) {
      return this.$refs.popper.show(...e);
    },
    hide(...e) {
      return this.$refs.popper.hide(...e);
    },
    dispose(...e) {
      return this.$refs.popper.dispose(...e);
    },
    onResize(...e) {
      return this.$refs.popper.onResize(...e);
    }
  }
};
let bi = function() {
};
typeof window < "u" && (bi = window.Element);
const Pc = Bt({
  name: "VPopperWrapper",
  components: {
    Popper: gc,
    PopperContent: Nr
  },
  mixins: [
    Rr,
    Ir("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
    referenceNode: {
      type: Function,
      default: null
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    positioningDisabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: void 0
    },
    delay: {
      type: [String, Number, Object],
      default: void 0
    },
    distance: {
      type: [Number, String],
      default: void 0
    },
    skidding: {
      type: [Number, String],
      default: void 0
    },
    triggers: {
      type: Array,
      default: void 0
    },
    showTriggers: {
      type: [Array, Function],
      default: void 0
    },
    hideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperTriggers: {
      type: Array,
      default: void 0
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    container: {
      type: [String, Object, bi, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, bi],
      default: void 0
    },
    strategy: {
      type: String,
      default: void 0
    },
    autoHide: {
      type: [Boolean, Function],
      default: void 0
    },
    handleResize: {
      type: Boolean,
      default: void 0
    },
    instantMove: {
      type: Boolean,
      default: void 0
    },
    eagerMount: {
      type: Boolean,
      default: void 0
    },
    popperClass: {
      type: [String, Array, Object],
      default: void 0
    },
    computeTransformOrigin: {
      type: Boolean,
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: void 0
    },
    autoSize: {
      type: [Boolean, String],
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: void 0
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: void 0
    },
    preventOverflow: {
      type: Boolean,
      default: void 0
    },
    overflowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowOverflow: {
      type: Boolean,
      default: void 0
    },
    flip: {
      type: Boolean,
      default: void 0
    },
    shift: {
      type: Boolean,
      default: void 0
    },
    shiftCrossAxis: {
      type: Boolean,
      default: void 0
    },
    noAutoFocus: {
      type: Boolean,
      default: void 0
    },
    disposeTimeout: {
      type: Number,
      default: void 0
    }
  },
  emits: {
    show: () => !0,
    hide: () => !0,
    "update:shown": (e) => !0,
    "apply-show": () => !0,
    "apply-hide": () => !0,
    "close-group": () => !0,
    "close-directive": () => !0,
    "auto-hide": () => !0,
    resize: () => !0
  },
  computed: {
    finalTheme() {
      return this.theme ?? this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
    }
  }
});
function Ac(e, t, n, i, r, s) {
  const l = ii("PopperContent"), u = ii("Popper");
  return C(), ie(u, xi({ ref: "popper" }, e.$props, {
    theme: e.finalTheme,
    "target-nodes": e.getTargetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    class: [
      e.themeClass
    ],
    onShow: t[0] || (t[0] = () => e.$emit("show")),
    onHide: t[1] || (t[1] = () => e.$emit("hide")),
    "onUpdate:shown": t[2] || (t[2] = (f) => e.$emit("update:shown", f)),
    onApplyShow: t[3] || (t[3] = () => e.$emit("apply-show")),
    onApplyHide: t[4] || (t[4] = () => e.$emit("apply-hide")),
    onCloseGroup: t[5] || (t[5] = () => e.$emit("close-group")),
    onCloseDirective: t[6] || (t[6] = () => e.$emit("close-directive")),
    onAutoHide: t[7] || (t[7] = () => e.$emit("auto-hide")),
    onResize: t[8] || (t[8] = () => e.$emit("resize"))
  }), {
    default: B(({
      popperId: f,
      isShown: d,
      shouldMountContent: b,
      skipTransition: g,
      autoHide: p,
      show: x,
      hide: k,
      handleResize: S,
      onResize: P,
      classes: h,
      result: T
    }) => [
      ge(e.$slots, "default", {
        shown: d,
        show: x,
        hide: k
      }),
      N(l, {
        ref: "popperContent",
        "popper-id": f,
        theme: e.finalTheme,
        shown: d,
        mounted: b,
        "skip-transition": g,
        "auto-hide": p,
        "handle-resize": S,
        classes: h,
        result: T,
        onHide: k,
        onResize: P
      }, {
        default: B(() => [
          ge(e.$slots, "popper", {
            shown: d,
            hide: k
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const Di = /* @__PURE__ */ Ri(Pc, [["render", Ac]]);
({
  ...Di
});
({
  ...Di
});
const Lc = {
  ...Di,
  name: "VTooltip",
  vPopperTheme: "tooltip"
};
Bt({
  name: "VTooltipDirective",
  components: {
    Popper: $r(),
    PopperContent: Nr
  },
  mixins: [
    Rr
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => vi(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => vi(e.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: !0
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(!0);
      },
      immediate: !0
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e) {
      if (typeof this.content == "function" && this.$_isShown && (e || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = !0;
        const t = ++this.$_fetchId, n = this.content(this);
        n.then ? n.then((i) => this.onResult(t, i)) : this.onResult(t, n);
      }
    },
    onResult(e, t) {
      e === this.$_fetchId && (this.$_loading = !1, this.asyncContent = t);
    },
    onShow() {
      this.$_isShown = !0, this.fetchContent();
    },
    onHide() {
      this.$_isShown = !1;
    }
  }
});
const Oc = Lc, wi = {
  __name: "BflexTooltip",
  props: {
    trigger: {
      type: [String, Array],
      default: () => ["click", "touch"]
    },
    distance: {
      type: Number,
      default: 0
    },
    skidding: {
      type: Number,
      default: 0
    },
    placement: {
      type: String,
      default: "top"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    shown: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (C(), ie(z(Oc), xi({
      triggers: e.trigger,
      disabled: e.disabled,
      placement: e.placement,
      container: !1
    }, t.$attrs, { "auto-hide": "" }), {
      popper: B(() => [
        ge(t.$slots, "popper")
      ]),
      default: B(() => [
        ge(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["triggers", "disabled", "placement"]));
  }
};
function $c(e = 0, t = "USD") {
  return new Intl.NumberFormat(window.navigator.language, {
    style: "currency",
    currency: t
  }).formatToParts(e);
}
function Ic(e = 0, t = "USD", n = "", i = !0) {
  const r = $c(e, t);
  let s = "";
  return r.forEach((l) => {
    l.type === "currency" && (s += `<span class="${n}">${l.value}</span>`), l.type === "literal" && (s += `${l.value}`), l.type === "integer" && (s += `${l.value}`), i && l.type === "decimal" && (s += `${l.value}`), i && l.type === "fraction" && (s += `${l.value}`);
  }), s;
}
const Nc = { class: "price-block" }, Rc = {
  key: 0,
  class: "price-block__discount"
}, Dc = { class: "price-block__discount-size" }, Mc = { class: "price-block__old" }, Fc = ["innerHTML"], qc = { class: "price-block__amount" }, Bc = { class: "price-block__icons" }, zc = {
  key: 0,
  class: "price-block__current"
}, Hc = ["innerHTML"], Wc = { key: 1 }, Vc = {
  key: 2,
  class: "price-block__details"
}, Uc = { class: "price-block__schedule" }, Yc = {
  __name: "BflexPriceBlock",
  props: {
    sellingPrice: {
      type: String || null,
      default: null
    },
    originalSellingPrice: {
      type: String || null,
      default: null
    },
    discount: {
      type: String || null,
      default: null
    },
    currency: {
      type: String,
      required: !0
    },
    details: {
      type: String || null,
      default: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, { t: n } = Ce(), i = be(() => s(t.originalSellingPrice, "currency")), r = be(() => s(t.sellingPrice, "price-block__current-currency")), s = (l, u = "", f = !0) => Ic(l, t.currency, u, f);
    return (l, u) => (C(), M("div", Nc, [
      e.discount ? (C(), M("div", Rc, [
        w("span", Dc, [
          w("span", null, "-" + D(e.discount), 1),
          u[0] || (u[0] = w("span", { class: "price-block__percent" }, "%", -1))
        ]),
        w("span", Mc, [
          w("span", {
            class: "amount",
            innerHTML: i.value
          }, null, 8, Fc)
        ])
      ])) : fe("", !0),
      w("div", qc, [
        w("div", Bc, [
          ge(l.$slots, "icons")
        ]),
        e.sellingPrice ? (C(), M("span", zc, [
          w("span", {
            class: "price-block__current-amount",
            innerHTML: r.value
          }, null, 8, Hc)
        ])) : e.sellingPrice === 0 ? (C(), M("span", Wc, D(z(n)("price.free")), 1)) : fe("", !0),
        e.sellingPrice && e.details ? (C(), M("div", Vc)) : fe("", !0)
      ]),
      w("div", Uc, [
        ge(l.$slots, "schedule")
      ])
    ]));
  }
}, jc = { class: "variant-line" }, Xc = { class: "variant-line__content" }, Gc = { class: "variant-line__actions" }, Kc = { class: "variant-line__footer" }, Jc = {
  __name: "BflexRatePlanVariantItem",
  props: {
    /**
     * @type {{
     *   currency: string,
     *   sellingPrice: string,
     *   originalSellingPrice: string,
     *   discount: string,
     *   details: {
     *     subtotal: string,
     *     taxes: string,
     *     charges: string,
     *     discounts: string
     *   }
     * }}
     */
    price: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return (t, n) => (C(), M("div", jc, [
      w("div", Xc, [
        N(Yc, {
          "selling-price": e.price.sellingPrice,
          "original-selling-price": e.price.originalSellingPrice,
          discount: e.price.discount || null,
          currency: e.price.currency
        }, {
          icons: B(() => [
            ge(t.$slots, "icons")
          ]),
          _: 3
        }, 8, ["selling-price", "original-selling-price", "discount", "currency"]),
        w("div", Gc, [
          ge(t.$slots, "default")
        ])
      ]),
      w("div", Kc, [
        ge(t.$slots, "action")
      ])
    ]));
  }
};
function Mi() {
  const { t: e } = Ce();
  function t(n) {
    return n.map((i) => i.map((r) => {
      const s = Zc(r.text);
      return e(s, r.params || {});
    }).join(""));
  }
  return { formatDescription: t };
}
function Zc(e) {
  const n = {
    "Free cancellation": "cancellationPolicy.free",
    "Paid cancellation": "cancellationPolicy.paid",
    "Free cancellation is possible before {date}": "cancellationPolicy.beforeFree",
    "If the cancellation is made after {date}, a penalty of ": "cancellationPolicy.afterPenaltyStart",
    "{days} days of the booking cost": "cancellationPolicy.penalty.days",
    "{fixedPenalty}": "cancellationPolicy.penalty.fixed",
    "{penaltyPercentage}% of the booking cost": "cancellationPolicy.penalty.percent",
    "{penaltyPercentage}% of the booking cost + {fixedPenalty}": "cancellationPolicy.penalty.percentAndFixed",
    "{days} days of the booking cost + {fixedPenalty}": "cancellationPolicy.penalty.daysAndFixed"
  }[e];
  return n || (console.warn(`Missing translation key for: "${e}"`), e);
}
const Qc = (e) => e.toLowerCase().replace(/_([a-z])/g, (t, n) => n.toUpperCase()), ed = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function td(e, t) {
  return C(), M("svg", ed, t[0] || (t[0] = [
    w("path", { d: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z" }, null, -1)
  ]));
}
const nd = { render: td }, id = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function od(e, t) {
  return C(), M("svg", id, t[0] || (t[0] = [
    w("path", { d: "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56z" }, null, -1)
  ]));
}
const rd = { render: od }, ad = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function sd(e, t) {
  return C(), M("svg", ad, t[0] || (t[0] = [
    w("path", { d: "M382-240 154-468l57-57 171 171 367-367 57 57z" }, null, -1)
  ]));
}
const ld = { render: sd }, cd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function dd(e, t) {
  return C(), M("svg", cd, t[0] || (t[0] = [
    w("path", { d: "m424-296 282-282-56-56-226 226-114-114-56 56zm56 216q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const ud = { render: dd }, fd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function md(e, t) {
  return C(), M("svg", fd, t[0] || (t[0] = [
    w("path", { d: "M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720m-720 80h640v-80H160zm0 160v240h640v-240zm0 240v-480z" }, null, -1)
  ]));
}
const pd = { render: md }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function gd(e, t) {
  return C(), M("svg", hd, t[0] || (t[0] = [
    w("path", { d: "M320-400q-17 0-28.5-11.5T280-440t11.5-28.5T320-480t28.5 11.5T360-440t-11.5 28.5T320-400m160 0q-17 0-28.5-11.5T440-440t11.5-28.5T480-480t28.5 11.5T520-440t-11.5 28.5T480-400m160 0q-17 0-28.5-11.5T600-440t11.5-28.5T640-480t28.5 11.5T680-440t-11.5 28.5T640-400M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80zm0-80h560v-400H200zm0-480h560v-80H200zm0 0v-80z" }, null, -1)
  ]));
}
const vd = { render: gd }, yd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function _d(e, t) {
  return C(), M("svg", yd, t[0] || (t[0] = [
    w("path", { d: "M480-344 240-584l56-56 184 184 184-184 56 56z" }, null, -1)
  ]));
}
const bd = { render: _d }, wd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function xd(e, t) {
  return C(), M("svg", wd, t[0] || (t[0] = [
    w("path", { d: "M480-528 296-344l-56-56 240-240 240 240-56 56z" }, null, -1)
  ]));
}
const kd = { render: xd }, Td = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Sd(e, t) {
  return C(), M("svg", Td, t[0] || (t[0] = [
    w("path", { d: "M440-280h80v-240h-80zm40-320q17 0 28.5-11.5T520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600m0 520q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const Ed = { render: Sd }, Cd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Pd(e, t) {
  return C(), M("svg", Cd, t[0] || (t[0] = [
    w("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const Ad = { render: Pd }, Ld = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Od(e, t) {
  return C(), M("svg", Ld, t[0] || (t[0] = [
    w("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112z" }, null, -1)
  ]));
}
const $d = { render: Od }, Id = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Nd(e, t) {
  return C(), M("svg", Id, t[0] || (t[0] = [
    w("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320" }, null, -1)
  ]));
}
const Rd = { render: Nd }, Dd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Md(e, t) {
  return C(), M("svg", Dd, t[0] || (t[0] = [
    w("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const Fd = { render: Md }, qd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Bd(e, t) {
  return C(), M("svg", qd, t[0] || (t[0] = [
    w("path", { d: "M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800z" }, null, -1)
  ]));
}
const zd = { render: Bd }, Hd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Wd(e, t) {
  return C(), M("svg", Hd, t[0] || (t[0] = [
    w("path", { d: "M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480t-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77 77 114T840-480t-28.5 140.5-77 114-114 77T480-120m112-192L440-464v-216h80v184l128 128z" }, null, -1)
  ]));
}
const Vd = { render: Wd }, Ud = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Yd(e, t) {
  return C(), M("svg", Ud, t[0] || (t[0] = [
    w("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm320-280 320-200v-80L480-520 160-720v80z" }, null, -1)
  ]));
}
const jd = { render: Yd }, Xd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Gd(e, t) {
  return C(), M("svg", Xd, t[0] || (t[0] = [
    w("path", { d: "M160-120v-480l320-240 320 240v480H560v-280H400v280z" }, null, -1)
  ]));
}
const Kd = { render: Gd }, Jd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Zd(e, t) {
  return C(), M("svg", Jd, t[0] || (t[0] = [
    w("path", { d: "M120-120v-560h240v-80l120-120 120 120v240h240v400zm80-80h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 320h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 480h80v-80h-80zm0-160h80v-80h-80z" }, null, -1)
  ]));
}
const Qd = { render: Zd }, eu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function tu(e, t) {
  return C(), M("svg", eu, t[0] || (t[0] = [
    w("path", { d: "M798-120q-125 0-247-54.5T329-329 174.5-551 120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12" }, null, -1)
  ]));
}
const nu = { render: tu }, iu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Add: nd,
  ArrowForward: rd,
  Check: ld,
  CheckCycle: ud,
  CreditCard: pd,
  DateRange: vd,
  Email: jd,
  ExpandLess: bd,
  ExpandMore: kd,
  Home: Kd,
  Hotel: Qd,
  Info: Ed,
  People: Ad,
  Person: $d,
  PersonOutline: Rd,
  Persons: Fd,
  Phone: nu,
  Restaurant: zd,
  Restore: Vd
}, Symbol.toStringTag, { value: "Module" })), $e = {
  __name: "BflexIcon",
  props: {
    name: { type: String, required: !0 },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, n = be(() => iu[t.name] || null);
    return (i, r) => (C(), ie(ia(n.value), xi(i.$attrs, {
      class: ["icon", e.small ? "icon--small" : ""]
    }), null, 16, ["class"]));
  }
}, ou = {
  key: 0,
  class: "icons"
}, ru = {
  key: 1,
  class: "scenario-text"
}, au = ["title"], su = {
  __name: "BflexScenarioIcon",
  props: {
    kind: {
      type: String,
      required: !0
    },
    main: {
      type: Number,
      required: !0
    },
    extraBed: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const { t } = Ce();
    return (n, i) => e.kind === "adults" ? (C(), M("div", ou, [
      Fe(N($e, {
        title: z(t)("ratePlan.scenario.mainBeds"),
        name: "Person"
      }, null, 8, ["title"]), [
        [It, e.main === 2]
      ]),
      Fe(w("span", null, D(e.main), 513), [
        [It, e.main > 2]
      ]),
      Fe(w("span", null, "x", 512), [
        [It, e.main > 2]
      ]),
      N($e, {
        name: "Person",
        title: z(t)("ratePlan.scenario.mainBeds")
      }, null, 8, ["title"]),
      e.extraBed ? (C(), M(ue, { key: 0 }, [
        N($e, { name: "Add" }, {
          default: B(() => i[0] || (i[0] = [
            te("add")
          ])),
          _: 1
        }),
        Fe(N($e, {
          title: z(t)("ratePlan.scenario.extraBeds"),
          name: "PersonOutline"
        }, null, 8, ["title"]), [
          [It, e.extraBed === 2]
        ]),
        Fe(w("span", null, D(e.main), 513), [
          [It, e.extraBed > 2]
        ]),
        Fe(w("span", null, "x", 512), [
          [It, e.extraBed > 2]
        ]),
        N($e, {
          name: "PersonOutline",
          title: z(t)("ratePlan.scenario.extraBeds")
        }, null, 8, ["title"])
      ], 64)) : fe("", !0)
    ])) : e.kind === "child" ? (C(), M("span", ru, D(z(t)("ratePlan.scenario.family")), 1)) : (C(), M("div", {
      key: 2,
      class: "icons",
      title: z(t)("ratePlan.scenario.mainExtraBeds")
    }, [
      N($e, { name: "People" }),
      N($e, { name: "Add" }),
      N($e, { name: "PeopleOutline" })
    ], 8, au));
  }
}, lu = { class: "cycle-loader" }, cu = {
  __name: "BflexCycleLoader",
  props: {
    color: {
      type: String,
      default: "#1f73b7"
    },
    size: {
      type: String,
      default: "40px"
    },
    margin: {
      type: String,
      default: "3px"
    },
    radius: {
      type: String,
      default: "100%"
    }
  },
  setup(e) {
    const t = e, { color: n, size: i, margin: r, radius: s } = oa(t), l = be(() => ({
      backgroundColor: n.value,
      width: i.value,
      height: i.value,
      margin: r.value,
      borderRadius: s.value,
      display: "inline-block",
      animationName: "v-pulseStretchDelay",
      animationDuration: "0.75s",
      animationIterationCount: "infinite",
      animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
      animationFillMode: "both"
    })), u = be(() => ({ animationDelay: "0.12s" })), f = be(() => ({ animationDelay: "0.24s" })), d = be(() => ({ animationDelay: "0.36s" }));
    return (b, g) => (C(), M("div", lu, [
      w("div", {
        style: Mt([l.value, u.value])
      }, null, 4),
      w("div", {
        style: Mt([l.value, f.value])
      }, null, 4),
      w("div", {
        style: Mt([l.value, d.value])
      }, null, 4)
    ]));
  }
}, du = ["disabled"], Dr = {
  __name: "BflexButton",
  props: {
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => (C(), M("button", {
      class: "button",
      disabled: e.disabled
    }, [
      e.loading ? (C(), ie(cu, {
        key: 0,
        size: "10px",
        color: "#fff"
      })) : ge(t.$slots, "default", { key: 1 })
    ], 8, du));
  }
}, uu = { class: "rate-plan-card" }, fu = { class: "rate-plan-card__wrapper" }, mu = { class: "rate-plan-card__description" }, pu = { class: "rate-plan-card__offers" }, hu = { class: "rate-plan-card__offers-item cancellation-policy-offer" }, gu = ["title"], vu = { class: "rate-plan-card__offers-item payment-type-offers" }, yu = { style: { "margin-right": "0.375rem" } }, _u = {
  key: 0,
  style: { margin: "0 0.375rem" }
}, bu = { class: "rate-plan-card__actions" }, wu = { class: "rate-plan-card__variants" }, xu = { class: "length-of-stay" }, ku = {
  __name: "BflexRatePlanItem",
  props: {
    /**
     * @type {{
     *   name: string,
     *   description: string,
     *   cancellationPolicy: {
     *     name: string,
     *     consequences: string
     *   },
     *   paymentTypes: Array<{
     *     name: string,
     *     description: string
     *   }>,
     *   feed: {
     *     name: string,
     *   },
     *   variations: {
     *     occupancyOptions: {
     *       kind: string,
     *       main: number,
     *       extraBed: number
     *     },
     *     price: {
     *       currency: string,
     *       sellingPrice: string,
     *       originalSellingPrice: string,
     *       discount: string,
     *       details: {
     *         subtotal: string,
     *         taxes: string,
     *         charges: string,
     *         discounts: string
     *       }
     *     }
     *   },
     *   extras: Array<{
     *     name: string,
     *     icon: string,
     *     color: string
     *   }>,
     * }}
     */
    data: {
      type: Object,
      required: !0
    },
    lengthOfStay: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["variant-chosen"],
  setup(e, { emit: t }) {
    const n = e, { t: i } = Ce(), r = ae(!1), s = ae({}), l = be(() => {
      var b;
      return ((b = n.data.feed) == null ? void 0 : b.name) !== "ROOM_ONLY";
    }), u = t, f = (b, g) => {
      s.value[g] || (s.value[g] = !0, u("variant-chosen", b));
    }, { formatDescription: d } = Mi();
    return (b, g) => (C(), M("div", uu, [
      w("div", fu, [
        w("div", mu, [
          w("h2", {
            onClick: g[0] || (g[0] = (p) => r.value = !r.value),
            class: "rate-plan-card__title cursor-pointer"
          }, [
            te(D(e.data.name) + " ", 1),
            N($e, {
              name: r.value ? "ExpandLess" : "ExpandMore"
            }, null, 8, ["name"])
          ]),
          Fe(w("blockquote", null, D(e.data.description), 513), [
            [It, r.value]
          ]),
          w("div", pu, [
            w("div", hu, [
              N($e, { name: "Restore" }),
              N(wi, { class: "inline" }, {
                popper: B(() => [
                  (C(!0), M(ue, null, Le(z(d)(e.data.cancellationPolicy.consequences), (p, x) => (C(), M("p", { key: x }, D(p), 1))), 128))
                ]),
                default: B(() => [
                  w("abbr", null, D(e.data.cancellationPolicy.name || ""), 1)
                ]),
                _: 1
              })
            ]),
            e.data.feed ? (C(), M("div", {
              key: 0,
              class: Qe(["rate-plan-card__offers-item", { "feed-offer": l.value }]),
              title: e.data.feed.description
            }, [
              N($e, { name: "Restaurant" }),
              w("span", null, D(e.data.feed.name ? z(i)(`ratePlan.boardType.${e.data.feed.name}`) : ""), 1)
            ], 10, gu)) : fe("", !0),
            w("div", vu, [
              N($e, { name: "CreditCard" }),
              w("span", null, [
                w("strong", yu, D(z(i)("ratePlan.payments")) + ":", 1),
                (C(!0), M(ue, null, Le(e.data.paymentTypes, (p, x) => (C(), M(ue, {
                  key: p.name
                }, [
                  N(wi, { class: "inline" }, {
                    popper: B(() => [
                      te(D(p.description), 1)
                    ]),
                    default: B(() => [
                      w("abbr", null, D(p.name), 1)
                    ]),
                    _: 2
                  }, 1024),
                  e.data.paymentTypes.length - 1 !== x ? (C(), M("strong", _u, D(z(i)("ratePlan.or")), 1)) : fe("", !0)
                ], 64))), 128))
              ])
            ]),
            e.data.extras.length ? (C(!0), M(ue, { key: 1 }, Le(e.data.extras, (p, x) => (C(), M("div", {
              key: x,
              class: "rate-plan-card__offers-item extra-offer",
              style: Mt({ color: p.color })
            }, [
              N($e, { name: "Check" }, {
                default: B(() => g[1] || (g[1] = [
                  te("credit_card")
                ])),
                _: 1
              }),
              w("span", null, D(p.name), 1)
            ], 4))), 128)) : fe("", !0)
          ])
        ])
      ]),
      w("div", bu, [
        ge(b.$slots, "default", {}, () => [
          w("div", wu, [
            w("span", xu, D(z(i)("ratePlan.los", e.lengthOfStay)), 1),
            (C(!0), M(ue, null, Le(e.data.variations || [], (p, x) => (C(), ie(Jc, {
              key: x,
              price: p.price
            }, {
              icons: B(() => [
                N(su, {
                  kind: p.occupancyOptions.kind,
                  main: p.occupancyOptions.main,
                  "extra-bed": p.occupancyOptions.extraBed
                }, null, 8, ["kind", "main", "extra-bed"])
              ]),
              default: B(() => [
                N(Dr, {
                  loading: s.value[x],
                  disabled: e.disabled && !s.value[x],
                  onClick: () => f(p, x),
                  class: "book-button"
                }, {
                  default: B(() => [
                    te(D(z(i)("ratePlan.action")), 1)
                  ]),
                  _: 2
                }, 1032, ["loading", "disabled", "onClick"])
              ]),
              _: 2
            }, 1032, ["price"]))), 128))
          ])
        ])
      ])
    ]));
  }
}, Tu = {}, Su = { class: "information-block__content" };
function Eu(e, t) {
  return C(), M("div", Su, [
    ge(e.$slots, "default")
  ]);
}
const Ie = /* @__PURE__ */ kn(Tu, [["render", Eu]]), Cu = { class: "rate-plan-list__wrapper" }, Pu = {
  __name: "BflexAccommodationOfferCard",
  props: {
    accommodationOffer: { type: Object, required: !0 },
    lengthOfStay: { type: Number, required: !0 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["accommodationOfferChosen"],
  setup(e, { emit: t }) {
    const { t: n } = Ce(), i = t, r = (s, l, u) => {
      i("accommodationOfferChosen", {
        accommodationOffer: s,
        ratePlan: l,
        variant: u
      });
    };
    return (s, l) => (C(), ie(Ge, { class: "accommodation-offer" }, {
      default: B(() => [
        N(Hl, {
          data: e.accommodationOffer.accommodationType
        }, null, 8, ["data"]),
        w("div", Cu, [
          w("div", {
            class: Qe(["rate-plan-list", { "rate-plan-list--single": e.accommodationOffer.ratePlans.length <= 1 }])
          }, [
            (C(!0), M(ue, null, Le(e.accommodationOffer.ratePlans, (u) => (C(), M(ue, {
              key: u.id
            }, [
              N(Pe),
              N(ku, {
                data: u,
                "length-of-stay": e.lengthOfStay,
                disabled: e.loading,
                onVariantChosen: (f) => r(e.accommodationOffer, u, f)
              }, null, 8, ["data", "length-of-stay", "disabled", "onVariantChosen"])
            ], 64))), 128)),
            e.accommodationOffer.ratePlans.length ? fe("", !0) : (C(), M(ue, { key: 0 }, [
              N(Pe),
              N(Ie, null, {
                default: B(() => [
                  w("p", null, [
                    w("strong", null, D(z(n)("accommodationType.notAvailable.title")), 1),
                    l[0] || (l[0] = w("br", null, null, -1)),
                    te(D(z(n)("accommodationType.notAvailable.description")), 1)
                  ])
                ]),
                _: 1
              })
            ], 64))
          ], 2)
        ])
      ]),
      _: 1
    }));
  }
}, Au = {}, Lu = { class: "information-block-grid" };
function Ou(e, t) {
  return C(), M("div", Lu, [
    ge(e.$slots, "default")
  ]);
}
const Sn = /* @__PURE__ */ kn(Au, [["render", Ou]]), $u = {
  __name: "ChooseAccommodationPage",
  props: {
    dateRange: {
      type: Object,
      default: () => ({
        start: null,
        end: null
      })
    },
    promoCode: {
      type: String,
      default: null
    }
  },
  emits: ["released"],
  setup(e, { emit: t }) {
    const n = e, i = be(() => !n.dateRange.start || !n.dateRange.end ? 0 : _r(n.dateRange.start, n.dateRange.end)), r = ae([]), s = ae(!1), { setError: l } = ft("globalError");
    qe(
      () => n.dateRange,
      async (g) => {
        if (!(!g.start || !g.end)) {
          s.value = !0;
          try {
            const p = await fa(g.start, g.end, n.promoCode);
            r.value = u(p.searchResults);
          } catch (p) {
            l(p);
          } finally {
            s.value = !1;
          }
        }
      },
      {
        deep: !0,
        immediate: !0
      }
    );
    function u(g) {
      return [
        ...g.filter((p) => p.ratePlans && p.ratePlans.length > 0),
        ...g.filter((p) => !p.ratePlans || p.ratePlans.length === 0)
      ];
    }
    const f = t, d = ae(!1), b = async ({ accommodationOffer: g, ratePlan: p, variant: x }) => {
      d.value = !0;
      try {
        const k = await Vo({
          checkInDate: n.dateRange.start,
          checkOutDate: n.dateRange.end,
          accommodationType: g.accommodationType.id,
          ratePlan: p.id,
          adults: x.occupancyOptions.main + x.occupancyOptions.extraBed,
          children: [],
          quantity: 1
        });
        f("released", { action: cn, cart: k.cart });
      } catch (k) {
        l(k);
      } finally {
        d.value = !1;
      }
    };
    return (g, p) => (C(), ie(Sn, null, {
      default: B(() => [
        s.value ? (C(), M(ue, { key: 0 }, Le(3, (x) => N(Tn, { key: x })), 64)) : (C(!0), M(ue, { key: 1 }, Le(r.value, (x) => (C(), ie(Pu, {
          "accommodation-offer": x,
          "length-of-stay": i.value,
          loading: d.value,
          key: x.accommodationType.id,
          onAccommodationOfferChosen: b
        }, null, 8, ["accommodation-offer", "length-of-stay", "loading"]))), 128))
      ]),
      _: 1
    }));
  }
}, Iu = { class: "field-decorator" }, Nu = { class: "field-decorator__input-group" }, Ru = { class: "field-decorator__label" }, Du = {
  key: 0,
  class: "field-decorator__required"
}, Mu = { class: "field-decorator__slot" }, Fu = {
  key: 0,
  class: "field-decorator__hint"
}, Dt = {
  __name: "BflexFieldDecorator",
  props: {
    label: {
      type: String,
      required: !0
    },
    hint: {
      type: String,
      default: ""
    },
    hideHint: {
      type: Boolean,
      default: !1
    },
    required: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (C(), M("div", Iu, [
      w("div", Nu, [
        w("label", Ru, [
          te(D(e.label), 1),
          e.required ? (C(), M("span", Du, "*")) : fe("", !0)
        ]),
        w("div", Mu, [
          ge(t.$slots, "default")
        ])
      ]),
      e.hideHint ? fe("", !0) : (C(), M("div", Fu, D(e.hint), 1))
    ]));
  }
}, qu = { class: "information-block__header-additional" }, kt = {
  __name: "BflexHeader",
  props: {
    dense: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, i) => (C(), M("header", {
      class: Qe({ dense: t.dense })
    }, [
      w("span", null, [
        ge(n.$slots, "default")
      ]),
      w("span", qu, [
        ge(n.$slots, "additional")
      ])
    ], 2));
  }
}, Bu = { class: "details-info" }, zu = { class: "details-info__icon" }, Hu = {
  __name: "BflexDetailsInfo",
  props: {
    icon: {
      type: String,
      default: "info"
    },
    hideIcon: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (C(), M("div", Bu, [
      w("div", zu, [
        e.hideIcon ? fe("", !0) : (C(), ie($e, {
          key: 0,
          name: e.icon
        }, null, 8, ["name"]))
      ]),
      ge(t.$slots, "default")
    ]));
  }
}, Wu = {
  id: "customer-data-form",
  class: "customer-data-form"
}, Vu = {
  __name: "BflexContactInformationCard",
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      })
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, { t: i } = Ce(), r = t, s = oi({ ...n.modelValue }), l = oi({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }), u = (f) => {
      const d = f.target;
      l[d.name] = d.validity.valid ? "" : d.validationMessage;
    };
    return qe(
      s,
      (f) => {
        r("update:modelValue", f);
      },
      { deep: !0 }
    ), (f, d) => (C(), ie(Ge, null, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(D(z(i)("contactInformation.title")), 1)
          ]),
          _: 1
        }),
        N(Pe),
        N(Ie, null, {
          default: B(() => [
            w("section", Wu, [
              N(Dt, {
                label: z(i)("contactInformation.firstName"),
                required: "",
                hint: l.firstName,
                class: Qe({ "form-group--error": l.firstName })
              }, {
                default: B(() => [
                  Fe(w("input", {
                    "onUpdate:modelValue": d[0] || (d[0] = (b) => s.firstName = b),
                    type: "text",
                    name: "firstName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: d[1] || (d[1] = (b) => u(b))
                  }, null, 544), [
                    [
                      ln,
                      s.firstName,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"]),
              N(Dt, {
                label: z(i)("contactInformation.lastName"),
                required: "",
                hint: l.lastName,
                class: Qe({ "form-group--error": l.lastName })
              }, {
                default: B(() => [
                  Fe(w("input", {
                    "onUpdate:modelValue": d[2] || (d[2] = (b) => s.lastName = b),
                    type: "text",
                    name: "lastName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: d[3] || (d[3] = (b) => u(b))
                  }, null, 544), [
                    [
                      ln,
                      s.lastName,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"]),
              N(Dt, {
                label: z(i)("contactInformation.email"),
                required: "",
                hint: l.email,
                class: Qe({ "form-group--error": l.email })
              }, {
                default: B(() => [
                  Fe(w("input", {
                    "onUpdate:modelValue": d[4] || (d[4] = (b) => s.email = b),
                    type: "email",
                    name: "email",
                    maxlength: "100",
                    required: "",
                    onInput: d[5] || (d[5] = (b) => u(b))
                  }, null, 544), [
                    [
                      ln,
                      s.email,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"]),
              N(Dt, {
                label: z(i)("contactInformation.phoneNumber"),
                hint: l.phone,
                class: Qe({ "form-group--error": l.phone })
              }, {
                default: B(() => [
                  Fe(w("input", {
                    "onUpdate:modelValue": d[6] || (d[6] = (b) => s.phone = b),
                    type: "tel",
                    name: "phone",
                    minlength: "7",
                    maxlength: "100",
                    onInput: d[7] || (d[7] = (b) => u(b))
                  }, null, 544), [
                    [
                      ln,
                      s.phone,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"])
            ]),
            N(Hu, { icon: "Info" }, {
              default: B(() => [
                te(D(z(i)("contactInformation.confirmationInfo")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, Uu = { class: "icon-text" }, Yu = { class: "icon-text__icon" }, ju = { class: "icon-text__text" }, Xt = {
  __name: "BflexIconText",
  props: {
    icon: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    return (t, n) => (C(), M("div", Uu, [
      w("span", Yu, [
        N($e, { name: e.icon }, null, 8, ["name"])
      ]),
      w("span", ju, [
        ge(t.$slots, "default")
      ])
    ]));
  }
}, Xu = { class: "text-sm" }, Gu = { class: "accommodation-list__item" }, Ku = {
  key: 0,
  style: { "font-size": "0.9em", opacity: "0.7" }
}, Ju = {
  class: "text-sm",
  style: { "line-height": "1.25", "font-weight": "lighter" }
}, Zu = {
  key: 1,
  style: { opacity: "0.7" }
}, Qu = {
  key: 0,
  class: "payment-type"
}, ef = { class: "payment-type__label" }, tf = { class: "payment-type__variants" }, nf = ["for"], of = ["name", "id", "value", "checked", "onChange"], rf = { class: "accommodation-list__total" }, af = { class: "accommodation-list__payment-rules" }, sf = { class: "highlighted" }, lf = { class: "highlighted" }, Fi = {
  __name: "BflexChosenAccommodationsCard",
  props: {
    mode: {
      type: String,
      default: "choose",
      required: !0,
      validator: (e) => ["choose", "info", "cancellation"].includes(e)
    },
    reservation: {
      type: Object,
      required: !0
    },
    payment: {
      type: Object,
      default: () => ({
        prepayment: "0.00",
        onArrival: "0.00"
      })
    },
    summary: {
      type: Object,
      default: () => ({
        subtotal: "0.00",
        taxes: "0.00",
        fees: "0.00",
        discounts: "0.00",
        total: "0.00"
      })
    },
    locale: {
      type: String,
      default: "en"
    },
    loading: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["changePaymentType", "deleteAccommodationRequest"],
  setup(e, { emit: t }) {
    const n = e, { t: i } = Ce(), r = t, { formatDescription: s } = Mi(), l = (d) => {
      r("changePaymentType", d);
    }, u = (d) => {
      r("deleteAccommodationRequest", {
        checkInDate: d.checkInDate,
        checkOutDate: d.checkOutDate,
        accommodationType: d.accommodationType.id,
        ratePlan: d.ratePlan.id,
        adults: d.adults,
        children: d.children,
        quantity: 0
      });
    }, f = ae({});
    return Tt(() => {
      f.value = n.reservation.paymentType.id;
    }), (d, b) => e.loading ? (C(), ie(Tn, {
      key: 0,
      "is-result": ""
    })) : (C(), ie(Ge, {
      key: 1,
      class: "accommodation-list"
    }, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(D(z(i)("chosenAccommodation.title")), 1)
          ]),
          _: 1
        }),
        N(Pe),
        N(Ie, null, {
          default: B(() => [
            w("dl", Xu, [
              w("dt", null, [
                N(Xt, { icon: "DateRange" }, {
                  default: B(() => [
                    te(D(z(Pl)(e.reservation.checkInDate, e.reservation.checkOutDate, e.locale)), 1)
                  ]),
                  _: 1
                })
              ]),
              w("dd", null, [
                N(Xt, { icon: "Persons" }, {
                  default: B(() => [
                    te(D(z(i)("chosenAccommodation.adults", e.reservation.adults)) + ", " + D(z(i)("chosenAccommodation.children", e.reservation.children.length)), 1)
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }),
        N(Pe),
        N(Ie, null, {
          default: B(() => [
            w("dl", Gu, [
              w("dt", null, [
                w("h3", null, [
                  te(D(e.reservation.accommodationType.name) + " ", 1),
                  e.reservation.quantity > 1 ? (C(), M("span", Ku, "x" + D(e.reservation.quantity), 1)) : fe("", !0)
                ]),
                w("div", Ju, [
                  te(D(e.reservation.ratePlan.name), 1),
                  b[1] || (b[1] = w("br", null, null, -1)),
                  N(wi, { class: "inline" }, {
                    popper: B(() => [
                      (C(!0), M(ue, null, Le(z(s)(
                        e.reservation.cancellationPolicy.consequences
                      ), (g, p) => (C(), M("p", { key: p }, D(g), 1))), 128))
                    ]),
                    default: B(() => [
                      w("abbr", null, D(e.reservation.cancellationPolicy.name || ""), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              w("dd", null, [
                e.mode === "choose" ? (C(), M("div", {
                  key: 0,
                  onClick: b[0] || (b[0] = () => u(e.reservation)),
                  class: "accommodation-list__item-delete text-sm cursor-pointer"
                }, D(z(i)("chosenAccommodation.delete")), 1)) : fe("", !0),
                e.reservation.quantity > 1 ? (C(), M("span", Zu, D(e.reservation.quantity) + " x", 1)) : fe("", !0),
                te(" " + D(e.reservation.summary.total.amount) + " " + D(e.reservation.summary.total.currency), 1)
              ])
            ]),
            e.mode === "choose" ? (C(), M("div", Qu, [
              w("div", ef, D(z(i)("chosenAccommodation.willPay")) + ":", 1),
              w("div", tf, [
                (C(!0), M(ue, null, Le(e.reservation.availablePaymentTypes, (g) => (C(), M("label", {
                  key: g.id,
                  for: `payment-type-${d.index}-${e.reservation.ratePlan.id}-${g.id}`
                }, [
                  w("input", {
                    type: "radio",
                    name: `payment-type-${d.index}`,
                    id: `payment-type-${d.index}-${e.reservation.ratePlan.id}-${g.id}`,
                    value: e.reservation.paymentType.id,
                    checked: +e.reservation.paymentType.id == +g.id,
                    onChange: () => l(g.id)
                  }, null, 40, of),
                  te(" " + D(g.name), 1)
                ], 8, nf))), 128))
              ])
            ])) : fe("", !0)
          ]),
          _: 1
        }),
        N(Pe),
        N(Ie, null, {
          default: B(() => [
            w("dl", rf, [
              w("dt", null, D(z(i)("chosenAccommodation.totalAmount")) + ":", 1),
              w("dd", null, [
                w("strong", null, [
                  w("span", null, D(e.summary.total.amount), 1),
                  te(" " + D(e.summary.total.currency), 1)
                ])
              ])
            ])
          ]),
          _: 1
        }),
        N(Pe),
        ge(d.$slots, "default", {}, () => [
          N(Ie, null, {
            default: B(() => [
              w("dl", af, [
                w("dt", sf, D(z(i)("chosenAccommodation.prepaymentAmount")) + ":", 1),
                w("dd", lf, D(e.payment.details.prepayment.amount) + " " + D(e.payment.details.prepayment.currency), 1),
                w("dt", null, D(z(i)("chosenAccommodation.onArrivalAmount")) + ":", 1),
                w("dd", null, [
                  w("span", null, D(e.payment.details.onArrival.amount), 1),
                  te(" " + D(e.payment.details.onArrival.currency), 1)
                ])
              ])
            ]),
            _: 1
          })
        ])
      ]),
      _: 3
    }));
  }
}, cf = { class: "summary-block" }, df = { class: "summary-block__content" }, uf = { class: "summary-block__content-info" }, ff = { class: "summary-block__content-info__price" }, mf = { class: "summary-block__content-info__text" }, pf = {
  class: "button",
  type: "submit"
}, hf = {
  __name: "BflexSummaryPanel",
  props: {
    totalAmount: {
      type: Object,
      required: !0
    },
    lengthOfStay: {
      type: Number,
      default: 0
    },
    accommodationUnits: {
      type: Number,
      default: 0
    }
  },
  emits: ["onAccommodationSummaryClick"],
  setup(e, { emit: t }) {
    const { t: n } = Ce(), i = t;
    return (r, s) => (C(), M("div", cf, [
      w("div", df, [
        w("div", uf, [
          w("div", ff, [
            w("span", null, D(e.totalAmount.amount), 1),
            te(" " + D(e.totalAmount.currency), 1)
          ]),
          w("div", mf, [
            te(D(z(n)("summary.room", e.accommodationUnits)) + ", " + D(z(n)("summary.los", e.lengthOfStay)) + " ", 1),
            N($e, {
              onClick: s[0] || (s[0] = Ho((l) => i("onAccommodationSummaryClick"), ["stop"])),
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        w("button", pf, D(z(n)("summary.complete")), 1)
      ])
    ]));
  }
}, gf = { class: "text-sm" }, vf = {
  value: "none",
  selected: ""
}, yf = ["value"], _f = {
  __name: "BflexSpecialRequestCard",
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        comment: "",
        arrivalTime: "none"
      })
    },
    arrivalPolicy: {
      type: Object,
      default: () => ({
        checkInTime: "14:00",
        checkOutTime: "11:00"
      })
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, { t: i } = Ce(), r = t, s = oi({ ...n.modelValue }), l = Al("00:00", "23:00");
    return qe(
      s,
      (u) => {
        r("update:modelValue", u);
      },
      { deep: !0 }
    ), (u, f) => (C(), ie(Ge, { class: "customer-request-block" }, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(D(z(i)("specialRequest.title")), 1)
          ]),
          _: 1
        }),
        N(Pe),
        N(Ie, null, {
          default: B(() => [
            N(Dt, {
              label: z(i)("specialRequest.comment")
            }, {
              default: B(() => [
                Fe(w("textarea", {
                  "onUpdate:modelValue": f[0] || (f[0] = (d) => s.comment = d),
                  name: "comment",
                  rows: "3",
                  maxlength: "500"
                }, null, 512), [
                  [ln, s.comment]
                ])
              ]),
              _: 1
            }, 8, ["label"])
          ]),
          _: 1
        }),
        N(Pe),
        N(Ie, null, {
          default: B(() => [
            w("dl", gf, [
              w("dt", null, D(z(i)("specialRequest.checkInOutTime")) + ":", 1),
              w("dd", null, D(z(i)("specialRequest.checkInTimeFrom")) + ": " + D(e.arrivalPolicy.checkInTime) + "; " + D(z(i)("specialRequest.checkOutTimeUntil")) + ": " + D(e.arrivalPolicy.checkOutTime), 1)
            ])
          ]),
          _: 1
        }),
        N(Pe),
        N(Ie, null, {
          default: B(() => [
            N(Dt, {
              label: z(i)("specialRequest.arrivalTime"),
              style: { width: "50%" }
            }, {
              default: B(() => [
                Fe(w("select", {
                  name: "arrivalTime",
                  "onUpdate:modelValue": f[1] || (f[1] = (d) => s.arrivalTime = d)
                }, [
                  w("option", vf, D(z(i)("specialRequest.noneTime")), 1),
                  (C(!0), M(ue, null, Le(z(l), (d) => (C(), M("option", {
                    value: d,
                    key: d
                  }, D(d), 9, yf))), 128))
                ], 512), [
                  [ra, s.arrivalTime]
                ])
              ]),
              _: 1
            }, 8, ["label"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, bf = { class: "custom-checkbox" }, wf = ["required"], Bo = {
  __name: "BflexCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      required: !0
    },
    required: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, i = t, r = be({
      get: () => n.modelValue,
      set: (s) => i("update:modelValue", s)
    });
    return (s, l) => (C(), M("label", bf, [
      Fe(w("input", {
        type: "checkbox",
        "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
        required: e.required
      }, null, 8, wf), [
        [aa, r.value]
      ]),
      l[1] || (l[1] = w("span", { class: "custom-checkbox__box" }, null, -1)),
      ge(s.$slots, "default")
    ]));
  }
}, xf = { class: "agreement-rules-list__rules" }, kf = { class: "agreement-rules-list__agreements" }, Tf = {
  key: 0,
  class: "agreement-rules-list__agreements-item"
}, Sf = ["href"], Ef = {
  key: 0,
  class: "agreement-rules-list__agreements-item"
}, Cf = ["href"], Pf = {
  __name: "BflexAccommodationRulesCard",
  props: {
    agreements: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = e, { t: n } = Ce(), i = be(() => t.agreements.filter((u) => u.combined)), r = be(() => t.agreements.length > 0 || t.rules.length > 0), s = ae(!1), l = ae(t.agreements.map(() => !1));
    return (u, f) => r.value ? (C(), ie(Ge, {
      key: 0,
      class: "agreement-rules-list"
    }, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(D(z(n)("accommodationRules.title")), 1)
          ]),
          _: 1
        }),
        e.rules.length > 0 ? (C(), M(ue, { key: 0 }, [
          N(Pe),
          N(Ie, null, {
            default: B(() => [
              w("ul", xf, [
                (C(!0), M(ue, null, Le(e.rules, (d, b) => (C(), M("li", { key: b }, D(d.text), 1))), 128))
              ])
            ]),
            _: 1
          })
        ], 64)) : fe("", !0),
        N(Pe),
        N(Ie, null, {
          default: B(() => [
            w("div", kf, [
              i.value.length > 0 ? (C(), M("div", Tf, [
                N(Bo, {
                  modelValue: s.value,
                  "onUpdate:modelValue": f[0] || (f[0] = (d) => s.value = d),
                  required: ""
                }, {
                  default: B(() => [
                    w("span", null, [
                      te(D(z(n)("accommodationRules.agreementSentence")) + " ", 1),
                      (C(!0), M(ue, null, Le(i.value, (d, b) => (C(), M("a", {
                        class: "agreement-rules-list__combined-agreement",
                        target: "_blank",
                        href: d.url,
                        key: b
                      }, D(d.anchor), 9, Sf))), 128)),
                      f[1] || (f[1] = te("."))
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ])) : fe("", !0),
              (C(!0), M(ue, null, Le(e.agreements, (d, b) => (C(), M(ue, { key: b }, [
                d.combined === !1 ? (C(), M("div", Ef, [
                  N(Bo, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (g) => l.value[b] = g,
                    required: d.required
                  }, {
                    default: B(() => [
                      w("span", null, [
                        te(D(z(n)("accommodationRules.agreementSentenceShort")) + " ", 1),
                        w("a", {
                          target: "_blank",
                          href: d.url
                        }, D(d.anchor), 9, Cf)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "required"])
                ])) : fe("", !0)
              ], 64))), 128))
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : fe("", !0);
  }
}, Af = {
  __name: "ConfirmationPage",
  emits: ["released"],
  setup(e, { emit: t }) {
    const n = ae({
      customerInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      },
      specialRequest: {
        comment: "",
        arrivalTime: "none"
      },
      agreementList: []
    }), i = t, r = async ({
      checkInDate: P,
      checkOutDate: h,
      accommodationType: T,
      ratePlan: I,
      adults: E,
      children: F,
      quantity: q
    }) => {
      f.value = !0;
      try {
        const $ = await Vo({
          checkInDate: P,
          checkOutDate: h,
          accommodationType: T,
          ratePlan: I,
          adults: E,
          children: F,
          quantity: q
        });
        d.value = $.cart, $.cart.requests.length === 0 && i("released", { action: yr, result: $ });
      } catch ($) {
        b($);
      } finally {
        f.value = !1;
      }
    }, s = ae(null), l = ft("settings"), u = async (P) => {
      if (P.preventDefault(), s.value.reportValidity()) {
        f.value = !0;
        try {
          const h = await ha({
            customer: {
              ...n.value.customerInfo
            },
            specialRequest: n.value.specialRequest.comment,
            arrivalTime: n.value.specialRequest.arrivalTime
          });
          h && h.reservations && i("released", { action: Rn, result: h });
        } catch (h) {
          b(h);
        } finally {
          f.value = !1;
        }
      }
    }, f = ae(!0), d = ae(null), { setError: b } = ft("globalError");
    Tt(async () => {
      f.value = !0;
      try {
        const P = await ma();
        d.value = P.cart;
      } catch (P) {
        b(P);
      } finally {
        f.value = !1;
      }
    });
    const g = async (P) => {
      try {
        const h = await pa({
          request: Object.keys(d.value.requests)[0],
          paymentType: P
        });
        d.value = h.cart;
      } catch (h) {
        b(h);
      }
    }, p = be(() => !d.value || !d.value.requests || Object.keys(d.value.requests).length === 0 ? 0 : Object.keys(d.value.requests).reduce((P, h) => {
      const T = d.value.requests[h];
      return P + T.quantity;
    }, 0)), x = be(() => d.value && d.value.requests && Object.keys(d.value.requests).length > 0), k = be(() => d.value.requests[Object.keys(d.value.requests)[0]]), S = be(() => x.value ? (console.log("hasRequests.value:", x.value), console.log("cart.value.requests:", Object.keys(d.value.requests)), _r(k.value.checkInDate, k.value.checkOutDate)) : 0);
    return (P, h) => (C(), M("form", {
      onSubmit: u,
      ref_key: "confirmForm",
      ref: s
    }, [
      N(Sn, null, {
        default: B(() => [
          N(Vu, {
            modelValue: n.value.customerInfo,
            "onUpdate:modelValue": h[0] || (h[0] = (T) => n.value.customerInfo = T)
          }, null, 8, ["modelValue"]),
          d.value && x.value ? (C(), ie(Fi, {
            key: 0,
            mode: "choose",
            loading: f.value,
            locale: z(l).widget.locale,
            payment: d.value.payment,
            summary: d.value.summary,
            reservation: k.value,
            onChangePaymentType: g,
            onDeleteAccommodationRequest: r
          }, null, 8, ["loading", "locale", "payment", "summary", "reservation"])) : fe("", !0),
          N(_f, {
            modelValue: n.value.specialRequest,
            "onUpdate:modelValue": h[1] || (h[1] = (T) => n.value.specialRequest = T)
          }, null, 8, ["modelValue"]),
          N(Pf, {
            agreements: z(l).hotelRules.agreements,
            rules: z(l).hotelRules.rules
          }, null, 8, ["agreements", "rules"]),
          !f.value && d.value ? (C(), ie(hf, {
            key: 1,
            "total-amount": d.value.summary.total,
            currency: d.value.currency,
            "accommodation-units": p.value,
            "length-of-stay": S.value
          }, null, 8, ["total-amount", "currency", "accommodation-units", "length-of-stay"])) : fe("", !0)
        ]),
        _: 1
      })
    ], 544));
  }
}, Lf = { class: "hotel-information" }, Of = ["href"], $f = { href: "#" }, Mr = {
  __name: "BflexHotelInformationCard",
  props: {
    hotelInfo: {
      type: Object
    }
  },
  setup(e) {
    const { t } = Ce();
    return (n, i) => (C(), ie(Ge, null, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(D(z(t)("reservation.hotelInfo.title")), 1)
          ]),
          _: 1
        }),
        N(Pe),
        N(Ie, null, {
          default: B(() => [
            w("div", Lf, [
              N(Xt, { icon: "Hotel" }, {
                default: B(() => [
                  te(D(e.hotelInfo.name), 1)
                ]),
                _: 1
              }),
              N(Xt, { icon: "Home" }, {
                default: B(() => [
                  te(D(e.hotelInfo.address.address), 1)
                ]),
                _: 1
              }),
              N(Xt, { icon: "Phone" }, {
                default: B(() => [
                  w("a", {
                    href: `tel:${e.hotelInfo.phone}`
                  }, D(e.hotelInfo.phone), 9, Of)
                ]),
                _: 1
              }),
              N(Xt, { icon: "Email" }, {
                default: B(() => [
                  w("a", $f, D(e.hotelInfo.email), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, If = { class: "summary-block" }, Nf = { class: "summary-block__content" }, Rf = { class: "summary-block__content-info" }, Df = { class: "summary-block__content-info__price" }, Mf = { class: "summary-block__content-info__text" }, Ff = {
  __name: "BflexPaymentPanel",
  props: {
    prepayment: {
      type: String,
      default: "0"
    },
    currency: {
      type: String,
      default: "EUR"
    }
  },
  setup(e) {
    const { t } = Ce();
    return (n, i) => (C(), M("div", If, [
      w("div", Nf, [
        w("div", Rf, [
          w("div", Df, [
            w("span", null, D(e.prepayment), 1),
            te(" " + D(e.currency), 1)
          ]),
          w("div", Mf, [
            te(D(z(t)("reservation.payment.prepayment")) + " ", 1),
            N($e, {
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        ge(n.$slots, "default")
      ])
    ]));
  }
}, qf = { class: "payment-timer-container" }, Bf = {
  key: 0,
  class: "timer-wrapper"
}, zf = { class: "timer-circle" }, Hf = {
  class: "timer-svg",
  width: "120",
  height: "120"
}, Wf = ["stroke-dashoffset"], Vf = { class: "timer-text" }, Uf = ["disabled"], Yf = {
  key: 1,
  class: "no-token-message"
}, jf = 50, Xf = {
  __name: "BflexRedirectTimer",
  props: {
    captureToken: {
      type: String,
      required: !1,
      default: ""
    },
    timeout: {
      type: Number,
      required: !1,
      default: 60
    },
    blank: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    const t = e, n = ae(t.timeout), i = ae(null), r = 2 * Math.PI * jf, s = ae(null), l = be(() => {
      const x = n.value / t.timeout;
      return r * (1 - x);
    }), { t: u } = Ce(), f = (x) => {
      const k = Math.floor(x / 60), S = x % 60;
      return `${k.toString().padStart(2, "0")}:${S.toString().padStart(2, "0")}`;
    }, d = () => {
      console.info("proceedToPayment:", s.value), s.value.click();
    }, b = () => {
      t.captureToken && (p(), t.blank ? window.open(t.captureToken, "_blank") || (s.value.innerHTML = u("redirectTimer.doesntOpen"), alert(u("redirectTimer.windowBlocked"))) : window.location.href = t.captureToken);
    }, g = () => {
      t.captureToken && (p(), n.value = t.timeout, i.value = setInterval(() => {
        n.value--, n.value <= 0 && d();
      }, 1e3));
    }, p = () => {
      i.value && (clearInterval(i.value), i.value = null);
    };
    return qe(() => t.captureToken, (x) => {
      x ? g() : p();
    }, { immediate: !0 }), qe(() => t.timeout, (x) => {
      n.value = x, t.captureToken && g();
    }), Tt(() => {
      t.captureToken && g();
    }), xn(() => {
      p();
    }), (x, k) => (C(), M("div", qf, [
      e.captureToken ? (C(), M("div", Bf, [
        w("div", zf, [
          (C(), M("svg", Hf, [
            k[0] || (k[0] = w("circle", {
              cx: "60",
              cy: "60",
              r: "50",
              fill: "none",
              stroke: "#e5e7eb",
              "stroke-width": "4"
            }, null, -1)),
            w("circle", {
              cx: "60",
              cy: "60",
              r: "50",
              fill: "none",
              stroke: "#ff0000",
              "stroke-width": "4",
              "stroke-linecap": "round",
              "stroke-dasharray": r,
              "stroke-dashoffset": l.value,
              transform: "rotate(-90 60 60)",
              class: "timer-progress"
            }, null, 8, Wf)
          ])),
          w("div", Vf, D(f(n.value)), 1)
        ]),
        w("button", {
          ref_key: "manualOpenBtn",
          ref: s,
          onClick: b,
          class: "button proceed-button",
          disabled: !e.captureToken
        }, D(z(u)("redirectTimer.goToPay")), 9, Uf)
      ])) : (C(), M("div", Yf, [
        w("p", null, D(z(u)("redirectTimer.waitingLink")), 1)
      ]))
    ]));
  }
}, Gf = { class: "reservation-result" }, Kf = { class: "reservation-result__title" }, Jf = { class: "reservation-result__description" }, Zf = {
  __name: "ResultPage",
  props: {
    sid: {
      type: String,
      required: !0,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = Ce(), i = ft("settings"), r = ae(null), s = ae([]), l = ae(!0), { setError: u } = ft("globalError"), f = async () => {
      if (t.sid) {
        l.value = !0;
        try {
          const g = await Uo({ sid: t.sid });
          r.value = g.data;
        } catch (g) {
          u(g);
        } finally {
          l.value = !1;
        }
      }
    }, d = be(() => {
      var g;
      return (g = r.value) != null && g.reservation ? Qc(r.value.reservation.status) : "";
    }), b = () => {
      s.value.forEach((g) => {
        console.log(g), window.open(g, "_blank");
      });
    };
    return qe(() => t.sid, f), Tt(f), (g, p) => (C(), ie(Sn, null, {
      default: B(() => [
        l.value ? (C(), ie(Tn, { key: 0 })) : (C(), M(ue, { key: 1 }, [
          w("section", Gf, [
            w("div", Kf, D(z(n)("reservation.title")), 1),
            w("div", Jf, D(z(n)(`reservation.description.${d.value}`)), 1)
          ]),
          N(Fi, {
            mode: "info",
            reservation: r.value.reservation,
            summary: r.value.summary,
            payment: r.value.payment,
            locale: z(i).widget.locale
          }, null, 8, ["reservation", "summary", "payment", "locale"]),
          N(Ge, { class: "information-block--attention" }, {
            default: B(() => [
              N(kt, null, {
                default: B(() => [
                  te(D(z(n)("reservation.whatIsNext")), 1)
                ]),
                _: 1
              }),
              N(Pe),
              N(Ie, null, {
                default: B(() => [
                  te(D(z(n)(`reservation.nextStep.${d.value}`, { untilTime: "" })), 1)
                ]),
                _: 1
              }),
              r.value.payment.captureToken ? (C(), ie(Xf, {
                key: 0,
                "capture-token": r.value.payment.captureToken,
                timeout: 30,
                blank: ""
              }, null, 8, ["capture-token"])) : fe("", !0)
            ]),
            _: 1
          }),
          r.value.reservation.specialRequest ? (C(), ie(Ge, { key: 0 }, {
            default: B(() => [
              N(kt, null, {
                default: B(() => [
                  te(D(z(n)("reservation.specialRequest")), 1)
                ]),
                _: 1
              }),
              N(Pe),
              N(Ie, null, {
                default: B(() => [
                  te(D(r.value.reservation.specialRequest), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : fe("", !0),
          N(Mr, {
            "hotel-info": z(i).hotelInfo
          }, null, 8, ["hotel-info"]),
          s.value.length ? (C(), ie(Ff, {
            key: 1,
            prepayment: r.value.payment.prepayment,
            currency: r.value.currency,
            onClick: b
          }, null, 8, ["prepayment", "currency"])) : fe("", !0)
        ], 64))
      ]),
      _: 1
    }));
  }
}, Qf = { class: "reservation-result" }, em = { class: "reservation-result__title" }, tm = { class: "reservation-result__description" }, nm = { class: "accommodation-list__payment-rules" }, im = { style: { color: "orangered" } }, om = { style: { color: "orangered" } }, rm = { style: { display: "flex", "flex-direction": "row", "justify-content": "end", "column-gap": "0.5rem", padding: "1rem", "align-items": "center" } }, am = ["value"], sm = { class: "agreement-rules-list__rules" }, lm = {
  __name: "CancelReservationPage",
  props: {
    sid: {
      type: String,
      required: !0,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = Ce(), i = ft("settings"), r = ae(null), s = ae(!0), { setError: l } = ft("globalError"), u = async () => {
      if (t.sid) {
        s.value = !0;
        try {
          const p = await Uo({ sid: atob(t.sid) });
          r.value = p.data;
        } catch (p) {
          l(p);
        } finally {
          s.value = !1;
        }
      }
    }, { formatDescription: f } = Mi(), d = ae(""), b = ae(!1), g = async () => {
      b.value = !1, (await ga({ sid: atob(t.sid), code: d.value })).successful ? (alert(n("cancellationProcess.result.success")), window.location.replace(window.location.origin)) : (alert(n("cancellationProcess.result.error")), d.value = "");
    };
    return qe(() => t.sid, u), Tt(u), (p, x) => (C(), ie(Sn, null, {
      default: B(() => [
        s.value ? (C(), ie(Tn, { key: 0 })) : (C(), M(ue, { key: 1 }, [
          w("section", Qf, [
            w("div", em, D(z(n)("cancellationProcess.title")), 1),
            w("div", tm, D(z(n)("cancellationProcess.description")), 1)
          ]),
          N(Fi, {
            mode: "cancellation",
            reservation: r.value.reservation,
            summary: r.value.summary,
            payment: r.value.payment,
            locale: z(i).widget.locale
          }, {
            default: B(() => [
              N(Ie, null, {
                default: B(() => [
                  w("dl", nm, [
                    w("dt", im, D(z(n)("chosenAccommodation.penalty")) + ":", 1),
                    w("dd", om, D(r.value.reservation.penalties.total.amount) + " " + D(r.value.reservation.penalties.total.currency), 1)
                  ])
                ]),
                _: 1
              }),
              N(Pe),
              w("div", rm, [
                w("div", null, D(z(n)("cancellationProcess.codeHelp")), 1),
                N(Dt, {
                  label: z(n)("cancellationProcess.codeLabel"),
                  "hide-hint": ""
                }, {
                  default: B(() => [
                    w("input", {
                      name: "cancellationCode",
                      value: d.value,
                      onInput: x[0] || (x[0] = Ho((k) => d.value = k.currentTarget.value, ["stop"]))
                    }, null, 40, am)
                  ]),
                  _: 1
                }, 8, ["label"]),
                N(Dr, {
                  onClick: g,
                  disabled: !d.value
                }, {
                  default: B(() => [
                    te(D(z(n)("cancellationProcess.action")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ]),
            _: 1
          }, 8, ["reservation", "summary", "payment", "locale"]),
          N(Ge, { class: "information-block--attention" }, {
            default: B(() => [
              N(kt, null, {
                default: B(() => [
                  te(D(z(n)("cancellationProcess.rules")), 1)
                ]),
                _: 1
              }),
              N(Pe),
              N(Ie, null, {
                default: B(() => [
                  w("ul", sm, [
                    (C(!0), M(ue, null, Le(z(f)(
                      r.value.reservation.cancellationPolicy.consequences
                    ), (k, S) => (C(), M("li", { key: S }, D(k), 1))), 128))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          N(Mr, {
            "hotel-info": z(i).hotelInfo
          }, null, 8, ["hotel-info"])
        ], 64))
      ]),
      _: 1
    }));
  }
}, cm = { id: "bflex-booking-widget" }, dm = { class: "booking-widget" }, Fr = {
  __name: "BookingWidget",
  props: {
    start: {
      type: String,
      default: ""
    },
    end: {
      type: String,
      default: ""
    },
    promoCode: {
      type: String,
      default: null
    },
    accommodationTypes: {
      type: Array,
      default: () => []
    },
    ratePlans: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = e, n = ae({
      hotelRules: {
        rules: [],
        agreements: []
      },
      policies: {
        arrivalPolicy: {
          checkInTime: "14:00",
          checkOutTime: "12:00"
        }
      }
    });
    Wo("settings", n);
    const i = [cn, Rn, wo], r = ae(null), s = (k) => {
      if (!k)
        r.value = cn;
      else if (k === ei)
        r.value = ei;
      else {
        const S = i.indexOf(k);
        S >= 0 && S < i.length - 1 && (r.value = i[S + 1]);
      }
      f.value.scrollTop = 0, window.dispatchEvent(
        new CustomEvent("bflex:booking-widget:action", { detail: { action: r.value } })
      );
    }, l = ae(!1), u = ae(""), f = ae(null), d = ae({
      start: t.start,
      end: t.end,
      promoCode: t.promoCode
    });
    qe(
      () => ({ start: t.start, end: t.end, promoCode: t.promoCode }),
      () => {
        d.value = {
          start: t.start,
          end: t.end,
          promoCode: t.promoCode
        };
      }
    ), qe(
      d,
      (k, S) => {
        !k.start || !k.end || (!S || !S.start || !S.end || S.start !== k.start || S.end !== k.end) && window.dispatchEvent(
          new CustomEvent("bflex:booking-widget:changed", { detail: sa(d.value) })
        );
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    const { setError: b } = ft("globalError"), g = (k) => {
      const { start: S, end: P, promoCode: h } = k.detail;
      d.value = { start: S, end: P, promoCode: h }, k.stopPropagation();
    };
    Tt(async () => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:ready")), window.addEventListener("bflex:search-bar:search", g), l.value = !0;
      try {
        const { inProgress: k, settings: S } = await ua();
        n.value = S;
        const { widget: P } = S;
        P && P.locale && P.l10n && Object.keys(P.l10n).length && (qn.global.locale.value = P.locale, qn.global.setLocaleMessage(P.locale, P.l10n));
        const h = new URLSearchParams(window.location.search);
        h.has("cancelReservation") ? (x.value = h.get("cancelReservation"), console.log("Cancel reservation", x.value), s(ei)) : k ? s(cn) : s();
      } catch (k) {
        b(k);
      } finally {
        setTimeout(() => {
          l.value = !1;
        }, 1e3);
      }
    }), xn(() => {
      window.removeEventListener("bflex:search-bar:search", g);
    });
    const p = ({ action: k, result: S }) => {
      k === yr ? s() : (k === Rn && (u.value = S.reservations[0]), s(k));
    }, x = ae(null);
    return (k, S) => (C(), M("main", cm, [
      w("div", dm, [
        w("section", {
          ref_key: "container",
          ref: f,
          class: "booking-widget__content"
        }, [
          l.value ? (C(), ie(Sn, { key: 0 }, {
            default: B(() => [
              (C(), M(ue, null, Le(3, (P) => N(Tn, { key: P })), 64))
            ]),
            _: 1
          })) : fe("", !0),
          x.value ? (C(), ie(lm, {
            key: 1,
            sid: x.value,
            onCancelReservation: S[0] || (S[0] = (P) => x.value = null)
          }, null, 8, ["sid"])) : r.value === z(cn) ? (C(), ie($u, {
            key: 2,
            dateRange: d.value,
            promoCode: e.promoCode,
            onReleased: p
          }, null, 8, ["dateRange", "promoCode"])) : r.value === z(Rn) ? (C(), ie(Af, {
            key: 3,
            onReleased: p
          })) : r.value === z(wo) ? (C(), ie(Zf, {
            key: 4,
            sid: u.value,
            onReleased: p
          }, null, 8, ["sid"])) : fe("", !0)
        ], 512)
      ])
    ]));
  }
}, um = { style: { display: "flex", "flex-direction": "column", "min-height": "300px", "justify-content": "center", "align-items": "center" } }, qr = {
  __name: "BflexErrorProvider",
  setup(e) {
    const { t } = Ce(), n = ae(null);
    Wo("globalError", { setError: (l) => {
      n.value = l;
    }, clearError: () => {
      n.value = null;
    } });
    const s = () => {
      location.reload();
    };
    return (l, u) => n.value ? (C(), ie(Ge, { key: 1 }, {
      default: B(() => [
        N(Ie, null, {
          default: B(() => [
            w("section", um, [
              w("h1", null, D(z(t)("globalError.title")), 1),
              w("p", null, D(z(t)("globalError.description")), 1),
              w("button", {
                class: "button",
                onClick: s
              }, D(z(t)("globalError.reload")), 1)
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : ge(l.$slots, "default", { key: 0 });
  }
}, fm = '@charset "UTF-8";.resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}.v-popper__popper{z-index:10000;top:0;left:0;outline:none}.v-popper__popper.v-popper__popper--hidden{visibility:hidden;opacity:0;transition:opacity .15s,visibility .15s;pointer-events:none}.v-popper__popper.v-popper__popper--shown{visibility:visible;opacity:1;transition:opacity .15s}.v-popper__popper.v-popper__popper--skip-transition,.v-popper__popper.v-popper__popper--skip-transition>.v-popper__wrapper{transition:none!important}.v-popper__backdrop{position:absolute;top:0;left:0;width:100%;height:100%;display:none}.v-popper__inner{position:relative;box-sizing:border-box;overflow-y:auto}.v-popper__inner>div{position:relative;z-index:1;max-width:inherit;max-height:inherit}.v-popper__arrow-container{position:absolute;width:10px;height:10px}.v-popper__popper--arrow-overflow .v-popper__arrow-container,.v-popper__popper--no-positioning .v-popper__arrow-container{display:none}.v-popper__arrow-inner,.v-popper__arrow-outer{border-style:solid;position:absolute;top:0;left:0;width:0;height:0}.v-popper__arrow-inner{visibility:hidden;border-width:7px}.v-popper__arrow-outer{border-width:6px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{left:-2px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{left:-1px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer{border-bottom-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-container{top:0}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{border-top-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-top-color:transparent!important}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{top:-4px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{top:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{top:-1px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{border-left-width:0;border-left-color:transparent!important;border-top-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{left:-4px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{left:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-container{right:-10px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer{border-right-width:0;border-top-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner{left:-2px}.v-popper--theme-tooltip .v-popper__inner{background:#000c;color:#fff;border-radius:6px;padding:7px 12px 6px}.v-popper--theme-tooltip .v-popper__arrow-outer{border-color:#000c}.v-popper--theme-dropdown .v-popper__inner{background:#fff;color:#000;border-radius:6px;border:1px solid #ddd;box-shadow:0 6px 30px #0000001a}.v-popper--theme-dropdown .v-popper__arrow-inner{visibility:visible;border-color:#fff}.v-popper--theme-dropdown .v-popper__arrow-outer{border-color:#ddd}:host,.booking-widget{font-family:var(--font-base, "Roboto"),sans-serif;font-size:var(--base-font, 16px);color:#4a5568;line-height:1.5;box-sizing:border-box;display:flex;flex-direction:column;max-width:960px;margin:0 auto}*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}.booking-widget__content{position:relative;min-height:450px}h1{font-size:1.5rem;font-weight:600;margin-bottom:1rem}h2{font-size:1.25rem;font-weight:600;margin-bottom:.75rem;color:var(--base-header-color, #1a202c)}h3{font-size:1.125rem;font-weight:600;margin-bottom:.75rem;color:var(--base-header-color, #1a202c)}h4{font-size:1rem;font-weight:600;margin-bottom:.5rem;color:var(--base-header-color, #1a202c)}h5{font-size:.875rem;font-weight:600;margin-bottom:.5rem;color:var(--base-header-color, #1a202c)}p{font-size:1rem;margin-bottom:.75rem;color:#4a5568}small,.text-sm{font-size:.875rem}.button{display:inline-flex;align-items:center;justify-content:center;font-size:.875rem;padding:.5rem 1rem;border-radius:.375rem;background:var(--base-button-bg, #ea580c);color:var(--base-button-color, #ffffff);border:none;cursor:pointer;text-decoration:none;text-wrap:nowrap;transition:background-color .2s}.button:hover{background:var(--base-button-bg-hover, #c2410c)}.button:disabled{background:#ccc;cursor:not-allowed}.section{padding:1.5rem}.card+.card{margin-top:1rem}blockquote,.blockquote{border-left:3px solid #696969;padding-left:1rem;margin-bottom:1rem;font-size:.875rem;color:#696969}.cursor-pointer{cursor:pointer}abbr,.abbreviation{display:inline;border-bottom-style:dotted;border-bottom-width:1px;cursor:pointer;white-space:pre-line}.inline{display:inline}strong{font-weight:700}a{color:#ea580c;cursor:pointer;text-decoration:underline}a:hover{text-decoration:none}ul{margin:0}ul li{display:block;margin-bottom:.5rem;list-style:disc}ul li:before{content:"";display:inline-flex;margin-right:.25rem}#bflex-booking-widget{position:relative;container-type:inline-size;container-name:widget}@container widget (max-width: 480px){.booking-widget{font-size:var(--base-font, 14px);line-height:1.4}}.details-info{display:flex;background-color:#f9f9fa;border-radius:5px;padding:1rem 1.25rem;font-size:.875rem;column-gap:.5rem}.details-info--icon{flex:0 0 1rem}.accommodation-list__item{margin-bottom:.5rem}.accommodation-list__item-delete{margin-bottom:.5rem;color:#a1a1a1}.accommodation-list__item-delete:hover{color:#1b1b1f}.accommodation-list__total{color:#000}.accommodation-list__payment-rules dd,.accommodation-list__payment-rules dt{margin-bottom:.25rem;font-size:.875rem}.accommodation-list__payment-rules .highlighted{color:var(--chosen-accommodation-payment-types, #ea580c)}.accommodation-list .payment-type{display:inline-flex;flex-direction:row;align-items:center;font-size:.875rem;border:1px solid var(--chosen-accommodation-payment-types, #ea580c);border-radius:5px;margin-top:1rem}.accommodation-list .payment-type__label{font-weight:700;background-color:var(--chosen-accommodation-payment-types, #ea580c);color:#fff;height:100%;padding:.5rem 1rem;flex-wrap:nowrap;text-wrap:nowrap}.accommodation-list .payment-type__variants{display:flex;flex-direction:row;align-items:start;justify-content:start;width:100%;padding:.5rem 1rem;box-sizing:border-box}.accommodation-list .payment-type label{display:flex;flex-direction:row;font-weight:400;margin-right:1rem;cursor:pointer}.accommodation-list .payment-type label input[type=radio]{margin:0 .25rem;padding:0}@container widget (max-width: 480px){.accommodation-list .payment-type{flex-direction:column;align-items:start;width:100%}.accommodation-list .payment-type__label{margin-right:0;width:100%}.accommodation-list .payment-type__variants{flex-direction:column;align-items:start;justify-content:start;width:100%}.accommodation-list .payment-type label{flex-direction:row;padding:.5rem .5rem .5rem 0}}.rate-plan-list{display:flex;flex-flow:column}.rate-plan-list .rate-plan-card:last-child{border-bottom-left-radius:var(--main-border-radius, 10px);border-bottom-right-radius:var(--main-border-radius, 10px)}@container widget (max-width: 480px){.accommodation-offer{overflow-x:hidden}.rate-plan-list__wrapper{padding:.5rem}.rate-plan-list{overflow-x:scroll;scroll-snap-type:x mandatory;flex-direction:row;column-gap:.5rem}}.agreement-rules-list__rules li{padding-left:.25rem}.agreement-rules-list__rules li:before{display:inline-block;content:"—";margin-right:.25rem}.agreement-rules-list__agreements-item{display:flex;flex-direction:row;margin-bottom:.5rem}.agreement-rules-list__combined-agreement{padding:0}.agreement-rules-list__combined-agreement:after{display:inline-block;padding-right:0;content:", ";text-decoration:none}.agreement-rules-list__combined-agreement:last-child:after{content:"";display:none}.accommodation-type-card{display:flex;color:var(--accommodation-type-card-color);border-top-left-radius:var(--main-border-radius, 10px);border-top-right-radius:var(--main-border-radius, 10px);background:var(--accommodation-type-card-background, transparent)}.accommodation-type-card__img{width:300px;flex-shrink:0;border-top-left-radius:var(--main-border-radius, 10px);overflow:hidden;background:#f0f0f0;cursor:pointer;display:flex;color:#718096}.accommodation-type-card__img img{width:100%;height:100%;object-fit:cover;object-position:center}.accommodation-type-card__img span{text-align:center;width:100%;display:flex;align-items:center;justify-content:center;min-height:180px}.accommodation-type-card__body{display:flex;flex-flow:column;justify-content:space-between;padding:1.5rem;width:100%}.amenities{font-size:.75rem;background:transparent;margin-top:.75rem;display:inline-flex;flex-wrap:wrap;gap:.5rem;font-weight:500}.amenities__item{border:none;padding:.375rem .5rem;line-height:1;background:var(--amenities-item-bg, #ebf8ff);color:var(--amenities-item-text-color, #2b6cb0);border-radius:var(--amenities-item-border-radius, 4px)}.amenities__item:nth-last-child(2){background:var(--amenities-item-secondary-bg, #faf5ff);color:var(--amenities-item-text-secondary-color, #553c9a)}.amenities__item:last-child{background:var(--amenities-item-tertiary-bg, #f0fff4);color:var(--amenities-item-text-tertiary-color, #22543d)}@container widget (max-width: 480px){.accommodation-type-card{flex-flow:column;max-height:initial;height:auto}.accommodation-type-card__img{width:auto;border-top-right-radius:var(--main-border-radius, 10px);line-height:1}.accommodation-type-card__img img{height:220px}.accommodation-type-card__body{width:auto}}.custom-checkbox{display:flex;align-items:center;cursor:pointer}.custom-checkbox input[type=checkbox]{position:absolute;opacity:0;width:1.25rem;height:1.25rem;cursor:pointer}.custom-checkbox__box{width:1rem;height:1rem;flex:0 0 1rem;border:2px solid rgba(34,34,34,.2);border-radius:3px;position:relative;margin-right:.5rem;transition:background-color .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box{background-color:#fff}.custom-checkbox__box:after{content:"";position:absolute;top:50%;left:50%;width:.5rem;height:.5rem;background-color:#ea580c;transform:translate(-50%,-50%) scale(0);transition:transform .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box:after{transform:translate(-50%,-50%) scale(1)}.customer-data-form{display:grid;grid-template-columns:1fr 1fr;row-gap:1rem;column-gap:1.5rem;padding:1rem 0 0}@container widget (max-width: 480px){.customer-data-form{grid-template-columns:1fr}}.field-decorator__required{padding-left:3px;color:red}.field-decorator__input-group{border:1px solid #e5e5e5;border-radius:5px;background-color:#fff;padding:.25rem .5rem;display:flex;flex-direction:column}.field-decorator__label{font-size:.875em;margin-bottom:.25em;line-height:1;color:#2226}.field-decorator__slot{display:flex;flex-direction:column;width:100%;height:auto}.field-decorator__slot textarea,.field-decorator__slot select,.field-decorator__slot input{border:0!important;outline:0!important;background:#fff;width:100%;height:100%;font-size:.875rem;padding:.25rem 0}.field-decorator__slot textarea{resize:vertical}.field-decorator__hint{height:1.25rem;color:#3d3d3d;text-align:right;font-size:.725rem;overflow:hidden}.form-group--error .field-decorator__input-group{border-color:red}.form-group--error .field-decorator__hint{color:red}.information-block-grid{display:grid;grid-row-gap:1.25rem}.information-block{background-color:var(--information-block-bg, #ffffff);border-radius:var(--main-border-radius, 10px);box-shadow:0 4px 12px #00000014}.information-block--attention{border:3px solid red}.information-block__content{padding:1rem 1.25rem}.information-block__content dl{display:grid;grid-template-columns:1fr 1fr;gap:.25rem;align-items:center}.information-block__content dl dt{font-weight:700;line-height:1}.information-block__content dl dd{text-align:right;line-height:1}.information-block__content a{padding:0 .25rem}.information-block .divider{margin:0;height:var(--information-block-divider-height, 1px);background-color:var(--information-block-divider-bg, #e5e5e5)}.information-block header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin:0;padding:1rem 1.25rem;border-radius:10px 10px 0 0;font-size:1.25rem;font-weight:700}.information-block header .additional{color:gray;font-weight:400}.information-block header.dense{padding:.5rem 1.25rem}@container widget (max-width: 480px){.information-block header{flex-direction:column;align-items:flex-start}}.cycle-loader{display:flex}@-webkit-keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}@keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}.price-block{display:grid;grid-template-columns:1fr;grid-template-areas:"discount" "amount";line-height:1;height:100%;width:100%}.price-block__discount{grid-area:discount;line-height:1;display:flex;align-items:center;justify-self:end;font-size:.75rem;font-weight:lighter;color:var(--price-block-discount-old-value, #4a5568)}.price-block__discount-size{display:block;padding:.125rem;margin-right:.25rem;background:var(--price-block-discount-bg, #dc2626);color:var(--price-block-discount-color, white);border-radius:.25rem}.price-block__old{text-decoration-line:line-through;opacity:.5}.price-block__schedule{font-size:.75rem}.price-block__icons .icon{font-size:1rem;fill:var(--price-block-person-icon-color)}.price-block__amount{grid-area:amount;display:flex;flex-direction:row;align-items:center;justify-content:space-between;line-height:1;font-size:1.25rem}.price-block__current{margin-left:.5rem}.price-block__current-currency{font-weight:lighter;padding:0 .125rem}@container widget (max-width: 480px){.price-block{grid-template-columns:1fr;grid-template-areas:"amount discount";column-gap:1rem}}.rate-plan-card{display:grid;grid-template-columns:1fr 1fr;grid-template-areas:"description actions" "bottom actions";width:100%;position:relative;background-color:var(--rate-plan-background);font-size:var(--rate-plan-font-size);color:var(--rate-plan-color)}.rate-plan-card--blocked{display:flex;justify-content:center;height:100%;width:100%;position:absolute;background:#0000001a;z-index:1}.rate-plan-card__title{display:inline-flex;align-items:center}.rate-plan-card__wrapper{grid-area:description;padding:0}.rate-plan-card blockquote{border-left-color:var(--rate-plan-secondary-color);color:var(--rate-plan-secondary-color)}.rate-plan-card__description{padding:1.5rem}.rate-plan-card__offers{font-size:var(--rate-plan-font-size, .875rem);color:var(--rate-plan-secondary-color)}.rate-plan-card__offers-item{display:flex;align-items:center;padding:.375rem 0}.rate-plan-card__offers-item .icon{margin-right:.375rem;color:var(--rate-plan-icon-color);fill:var(--rate-plan-icon-color, #696969)}.rate-plan-card__offers-item.extra-offer .icon{color:inherit}.rate-plan-card__offers-item.feed-offer{color:var(--rate-plan-feed-text-color, #059669)}.rate-plan-card__offers-item.feed-offer .icon{color:var(--rate-plan-feed-icon-color, #059669);fill:var(--rate-plan-feed-icon-color, #059669)}.rate-plan-card__offers-item.cancellation-policy-offer{color:var(--rate-plan-cancellation-policy-text-color)}.rate-plan-card__offers-item.cancellation-policy-offer .icon{color:var(--rate-plan-cancellation-policy-icon-color, #696969);fill:var(--rate-plan-cancellation-policy-icon-color, #696969)}.rate-plan-card__offers-item.payment-type-offers{color:var(--rate-plan-payment-type-text-color)}.rate-plan-card__offers-item.payment-type-offers .icon{color:var(--rate-plan-payment-type-icon-color, #696969);fill:var(--rate-plan-payment-type-icon-color, #696969)}.rate-plan-card__variants{display:flex;flex-direction:column;align-items:end;padding:1rem 0}.rate-plan-card__variants .length-of-stay{display:block;font-size:.875rem;text-align:right;padding:0 1rem;color:var(--rate-plan-los-color)}@container widget (max-width: 480px){.rate-plan-list--single .rate-plan-card{width:100%;flex:0 0 100%}.rate-plan-card{display:flex;flex:0 0 90%;flex-direction:column;min-width:90%;scroll-snap-align:start;justify-content:space-between;background-color:var(--rate-plan-mobile-background);border-radius:var(--rate-plan-mobile-border-radius, 10px);border:var(--rate-plan-mobile-border, 1px dashed #e5e5e5)}.rate-plan-card__actions{justify-self:stretch}.rate-plan-card__offers{color:var(--rate-plan-mobile-secondary-color)}.rate-plan-card__offers-item .icon{color:var(--rate-plan-mobile-icon-color, #696969);fill:var(--rate-plan-mobile-icon-color, #696969)}.rate-plan-card__offers-item.feed-offer{color:var(--rate-plan-mobile-feed-text-color, #059669)}.rate-plan-card__offers-item.feed-offer .icon{color:var(--rate-plan-mobile-feed-icon-color, #059669);fill:var(--rate-plan-mobile-feed-icon-color, #059669)}.rate-plan-card__offers-item.cancellation-policy-offer{color:var(--rate-plan-mobile-cancellation-policy-text-color)}.rate-plan-card__offers-item.cancellation-policy-offer .icon{color:var(--rate-plan-mobile-cancellation-policy-icon-color, #696969);fill:var(--rate-plan-mobile-cancellation-policy-icon-color, #696969)}.rate-plan-card__offers-item.payment-type-offers{color:var(--rate-plan-mobile-payment-type-text-color)}.rate-plan-card__offers-item.payment-type-offers .icon{color:var(--rate-plan-mobile-payment-type-icon-color, #696969);fill:var(--rate-plan-mobile-payment-type-icon-color, #696969)}}.variant-line{text-align:right;font-size:var(--variant-line-font-size);color:var(--variant-line-color, #000000)}.variant-line:hover,.variant-line.selected{background:var(--variant-line-selected, #e0e0e0)}.variant-line.selected:hover{background:var(--variant-line-hover, #d7d7d7)}.variant-line__content{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;padding:.5rem 1rem}.variant-line__actions{margin-left:1rem}.variant-line__actions .book-button{background:var(--variant-line-button-bg, #ea580c);color:var(--variant-line-button-color, #ffffff)}.variant-line__actions .book-button:hover{background:var(--variant-line-button-bg-hover, #c2410c)}@container widget (max-width: 480px){.rate-plan-card__variants .variant-line:nth-of-type(odd){background:#f5f5f5}.variant-line{width:100%}.variant-line__content{flex-direction:column;row-gap:.5rem;width:100%;padding:1rem}.variant-line__actions{align-self:end;width:100%}.variant-line__actions button{width:100%}}.reservation-result{display:flex;flex-direction:column;margin-top:2rem;margin-bottom:1rem}.reservation-result__title{font-size:1.5rem;font-weight:700;text-align:center}.reservation-result__description{font-size:1.2rem;text-align:center}.hotel-information{display:flex;flex-direction:column;row-gap:.25rem;font-size:.875rem;justify-content:center;justify-items:center}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.accommodation-skeleton.accommodation-result .header .thumbnail,.accommodation-skeleton.accommodation-result .header .content .description,.accommodation-skeleton.accommodation-result .header .content .amenities{display:none}.accommodation-skeleton.accommodation-result .header .content .title-skeleton{width:220px;margin-bottom:0}.accommodation-skeleton .header{display:flex;flex-direction:column}@media (min-width: 768px){.accommodation-skeleton .header{flex-direction:row}}.accommodation-skeleton .header .thumbnail{width:100%;height:192px;border-top-left-radius:10px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0}@media (min-width: 768px){.accommodation-skeleton .header .thumbnail{width:300px}}.accommodation-skeleton .header .content{flex:1;padding:16px}.accommodation-skeleton .header .content .title-skeleton{height:32px;width:96px;margin-bottom:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description{margin-bottom:16px;display:flex;flex-direction:column;gap:8px}.accommodation-skeleton .header .content .description .line{height:16px;width:100%;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description .line.line-short{width:75%}.accommodation-skeleton .header .content .amenities{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.accommodation-skeleton .header .content .amenities .amenity-item{height:32px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header{padding:16px;display:flex;justify-content:space-between;align-items:center}.accommodation-skeleton .footer .option-header .option-title{height:24px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header .option-value{height:24px;width:64px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option{padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start}@media (min-width: 768px){.accommodation-skeleton .footer .room-option{flex-direction:row;align-items:center}}.accommodation-skeleton .footer .room-option .option-details{display:flex;flex-direction:column;gap:8px;width:100%}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .option-details{width:50%}}.accommodation-skeleton .footer .room-option .option-details .option-name{height:20px;width:192px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .option-details .option-description{height:16px;width:128px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section{display:flex;align-items:center;margin-top:8px}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .price-section{margin-top:0}}.accommodation-skeleton .footer .room-option .price-section .price{height:24px;width:64px;margin-right:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section .book-button{height:40px;width:96px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.icons{display:flex;align-items:end;color:#323232;fill:#323232}.scenario-text{font-size:var(--base-font);font-weight:lighter}.summary-block{position:sticky;width:auto;bottom:0;right:0;padding:1rem;box-shadow:0 -4px 54px #9e9e9e33;background:#fff;z-index:4;border-radius:10px}.summary-block__content{display:flex;justify-content:space-between;align-items:center}.summary-block__content-info{display:flex;flex-direction:column;align-items:flex-start}.summary-block__content-info__price{font-size:1rem;font-weight:700;color:#ea580c}.summary-block__content-info__text{display:flex;align-items:center;font-size:.875rem;color:#2229;vertical-align:center}.summary-block__content-info__text .icon{font-size:1rem;margin-left:.25rem}.summary-block .accommodation-summary-trigger{cursor:pointer}.summary-block .accommodation-summary-trigger:hover{color:#ea580c}@container widget (max-width: 480px){.summary-block{position:sticky;box-sizing:border-box;left:0;width:100%}}.v-popper__popper p{line-height:1;padding:.125rem 0;margin:.5rem;font-size:.875rem;color:#fff}.icon{fill:currentColor}.icon--small{width:16px}.icon-text{display:inline-flex;flex-direction:row;align-items:center;column-gap:.375rem}.icon-text__icon{display:inline-flex;color:#ea580c;flex:0 0 1rem}.icon-text__icon .icon{width:1.5rem}.icon-text__text{line-height:1}.payment-timer-container{display:flex;flex-direction:column;align-items:center;padding:20px;font-family:Arial,sans-serif}.timer-wrapper{display:flex;flex-direction:column;align-items:center;gap:8px}.timer-circle{position:relative;display:flex;align-items:center;justify-content:center}.timer-svg{transform:rotate(-90deg)}.timer-progress{transition:stroke-dashoffset 1s linear}.timer-text{position:absolute;font-size:20px;font-weight:700;color:#374151;text-align:center}.proceed-button{background-color:#3b82f6}.proceed-button:hover:not(:disabled){background-color:#2563eb}.proceed-button:disabled{background-color:#9ca3af}.no-token-message{text-align:center;color:#6b7280;font-size:16px}.no-token-message p{margin:0}', mm = {
  __name: "BookingWidget.ce",
  props: {
    start: {
      type: String,
      default: ""
    },
    end: {
      type: String,
      default: ""
    },
    promoCode: {
      type: String,
      default: ""
    },
    accommodationTypes: {
      type: String,
      default: ""
    },
    ratePlans: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, n = ae({
      accommodationTypes: [],
      ratePlans: []
    });
    return qe(
      () => ({ accommodationTypes: t.accommodationTypes, ratePlans: t.ratePlans }),
      (i) => {
        (i.accommodationTypes.length || i.ratePlans.length) && (n.value = {
          accommodationTypes: i.accommodationTypes.split(","),
          ratePlans: i.accommodationTypes.split(",")
        });
      }
    ), la(() => {
      var r;
      const i = (r = Kt()) == null ? void 0 : r.appContext.app;
      i && !i.__i18n_installed && (i.use(qn), i.__i18n_installed = !0);
    }), xn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (i, r) => (C(), ie(qr, null, {
      default: B(() => [
        N(Fr, {
          start: e.start,
          end: e.end,
          "promo-code": e.promoCode,
          "accommodation-types": n.value.accommodationTypes,
          ratePlans: n.value.ratePlans
        }, null, 8, ["start", "end", "promo-code", "accommodation-types", "ratePlans"])
      ]),
      _: 1
    }));
  }
}, pm = /* @__PURE__ */ kn(mm, [["styles", [fm]]]), hm = {
  __name: "App",
  props: {
    start: {
      type: String,
      default: ""
    },
    end: {
      type: String,
      default: ""
    },
    promoCode: {
      type: String,
      default: ""
    },
    accommodationTypes: {
      type: Array,
      default: () => []
    },
    ratePlans: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    return xn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (t, n) => (C(), ie(qr, null, {
      default: B(() => [
        N(Fr, {
          start: e.start,
          end: e.end,
          "promo-code": e.promoCode,
          "accommodation-types": e.accommodationTypes,
          ratePlans: e.ratePlans
        }, null, 8, ["start", "end", "promo-code", "accommodation-types", "ratePlans"])
      ]),
      _: 1
    }));
  }
};
globalThis.window && window.customElements.define("bflex-booking-widget", ca(pm));
function vm(e) {
  da(hm, { initOptions: e }).use(qn).mount("#bflex-booking-widget");
}
export {
  Fr as BookingWidget,
  vm as mountWidget
};
