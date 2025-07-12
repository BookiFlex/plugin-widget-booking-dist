import { effectScope as Ur, ref as ce, shallowRef as Yr, computed as ke, watch as Ue, isRef as jr, defineComponent as qt, getCurrentInstance as Kt, h as Ho, Fragment as de, inject as ft, onMounted as Bt, onUnmounted as Wn, createVNode as N, Text as Xr, createElementBlock as F, openBlock as C, renderSlot as ge, createBlock as re, normalizeClass as Qe, withCtx as B, createElementVNode as w, renderList as Le, onBeforeUnmount as Gr, toDisplayString as M, unref as z, pushScopeId as Kr, popScopeId as Jr, nextTick as Zr, normalizeProps as Qr, guardReactiveProps as ea, resolveComponent as ii, mergeProps as xi, withScopeId as ta, withKeys as na, normalizeStyle as Dt, createCommentVNode as pe, resolveDynamicComponent as ia, withDirectives as Fe, vShow as $t, createTextVNode as te, toRefs as oa, reactive as oi, vModelText as ln, withModifiers as ki, vModelSelect as ra, vModelCheckbox as aa, provide as Wo, toRaw as sa, onBeforeMount as la, defineCustomElement as ca, createApp as ua } from "vue";
const Tt = {
  INIT: "bflex/v1/cart/init",
  OFFERS: "bflex/v1/offers",
  CART: "bflex/v1/cart",
  CHANGE_PAYMENT_TYPE: "bflex/v1/cart/paymentType",
  CONFIRM_CART: "bflex/v1/cart/confirm",
  LOAD_RESERVATION: "bflex/v1/account/reservation",
  CANCEL_RESERVATION: "bflex/v1/account/reservation/cancel"
};
async function St(e) {
  let t = null;
  try {
    t = await e.json();
  } catch {
    const l = new Error("Invalid JSON in response");
    throw l.code = "invalid_json", l.status = e.status, l;
  }
  if (e.ok && t.status === "success")
    return t.result;
  const n = t.message || "Unknown API error", o = t.code || "api_error", r = new Error(n);
  throw r.code = o, r.data = t.data, r.status = e.status, r;
}
async function Et() {
  var t;
  if ((t = window.BookiFlex) != null && t.restUrl)
    return Hi(window.BookiFlex.restUrl);
  const e = document.querySelector('link[rel="https://api.w.org/"]');
  if (e != null && e.href)
    return Hi(e.href);
  try {
    if ((await fetch("/wp-json/", { method: "HEAD" })).ok) return "/wp-json/";
  } catch {
  }
  return "/index.php?rest_route=/";
}
function Hi(e) {
  try {
    const t = new URL(e, location.href);
    return t.pathname + t.search;
  } catch {
    return e;
  }
}
const da = async () => {
  const e = await Et() + Tt.INIT;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await St(t);
  } catch (t) {
    throw console.error("Error in init app", t), t;
  }
}, fa = async (e, t, n) => {
  console.debug("Loading data", e, t, n);
  let o = await Et() + Tt.OFFERS;
  if (o = o.includes("?") ? o + "&" : o + "?", !e || !t)
    throw new Error("Invalid dates");
  const r = `${o}checkInDate=${e}&checkOutDate=${t}&promoCode=${n || ""}`;
  try {
    const s = await fetch(r);
    return await St(s);
  } catch (s) {
    throw console.error("Failed to load offers:", s), s;
  }
}, ma = async () => {
  console.debug("Loading cart");
  const e = await Et() + Tt.CART;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await St(t);
  } catch (t) {
    throw console.error("Failed to load cart:", t), t;
  }
}, Vo = async (e) => {
  const t = await Et() + Tt.CART;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: e })
    });
    return await St(n);
  } catch (n) {
    throw console.error("Failed to add to cart:", n), n;
  }
}, ha = async (e) => {
  const t = await Et() + Tt.CHANGE_PAYMENT_TYPE;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await St(n);
  } catch (n) {
    throw console.error("Failed to change payment type:", n), n;
  }
}, pa = async (e) => {
  console.debug("Confirming booking", e);
  const t = await Et() + Tt.CONFIRM_CART;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await St(n);
  } catch (n) {
    throw console.error("Failed to confirm booking:", n), n;
  }
}, Uo = async (e) => {
  const t = await Et() + Tt.LOAD_RESERVATION;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await St(n);
  } catch (n) {
    throw console.error("Failed to load reservation:", n), n;
  }
}, ga = async (e) => {
  const t = await Et() + Tt.CANCEL_RESERVATION;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await St(n);
  } catch (n) {
    throw console.error("Failed to load reservation:", n), n;
  }
};
/*!
  * shared v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Mn = typeof window < "u", Ct = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), va = (e, t, n) => ya({ l: e, k: t, s: n }), ya = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Se = (e) => typeof e == "number" && isFinite(e), _a = (e) => Ti(e) === "[object Date]", Jt = (e) => Ti(e) === "[object RegExp]", Vn = (e) => Q(e) && Object.keys(e).length === 0, Pe = Object.assign, ba = Object.create, fe = (e = null) => ba(e);
let Wi;
const Nt = () => Wi || (Wi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : fe());
function Vi(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const wa = Object.prototype.hasOwnProperty;
function je(e, t) {
  return wa.call(e, t);
}
const Ee = Array.isArray, ve = (e) => typeof e == "function", W = (e) => typeof e == "string", se = (e) => typeof e == "boolean", le = (e) => e !== null && typeof e == "object", xa = (e) => le(e) && ve(e.then) && ve(e.catch), Yo = Object.prototype.toString, Ti = (e) => Yo.call(e), Q = (e) => Ti(e) === "[object Object]", ka = (e) => e == null ? "" : Ee(e) || Q(e) && e.toString === Yo ? JSON.stringify(e, null, 2) : String(e);
function Si(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
function Ta(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Pn = (e) => !le(e) || Ee(e);
function In(e, t) {
  if (Pn(e) || Pn(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((s) => {
      s !== "__proto__" && (le(o[s]) && !le(r[s]) && (r[s] = Array.isArray(o[s]) ? [] : fe()), Pn(r[s]) || Pn(o[s]) ? r[s] = o[s] : n.push({ src: o[s], des: r[s] }));
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
const ue = {
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
  const { domain: o, messages: r, args: s } = n, l = e, d = new SyntaxError(String(l));
  return d.code = e, t && (d.location = t), d.domain = o, d;
}
function Ca(e) {
  throw e;
}
const ct = " ", Pa = "\r", Me = `
`, Aa = "\u2028", La = "\u2029";
function Oa(e) {
  const t = e;
  let n = 0, o = 1, r = 1, s = 0;
  const l = ($) => t[$] === Pa && t[$ + 1] === Me, d = ($) => t[$] === Me, f = ($) => t[$] === La, u = ($) => t[$] === Aa, b = ($) => l($) || d($) || f($) || u($), v = () => n, h = () => o, x = () => r, k = () => s, S = ($) => l($) || f($) || u($) ? Me : t[$], P = () => S(n), p = () => S(n + s);
  function T() {
    return s = 0, b(n) && (o++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function I() {
    return l(n + s) && s++, s++, t[n + s];
  }
  function E() {
    n = 0, o = 1, r = 1, s = 0;
  }
  function D($ = 0) {
    s = $;
  }
  function q() {
    const $ = n + s;
    for (; $ !== n; )
      T();
    s = 0;
  }
  return {
    index: v,
    line: h,
    column: x,
    peekOffset: k,
    charAt: S,
    currentChar: P,
    currentPeek: p,
    next: T,
    peek: I,
    reset: E,
    resetPeek: D,
    skipToPeek: q
  };
}
const vt = void 0, $a = ".", Ui = "'", Ia = "tokenizer";
function Na(e, t = {}) {
  const n = t.location !== !1, o = Oa(e), r = () => o.index(), s = () => Sa(o.line(), o.column(), o.index()), l = s(), d = r(), f = {
    currentType: 13,
    offset: d,
    startLoc: l,
    endLoc: l,
    lastType: 13,
    lastOffset: d,
    lastStartLoc: l,
    lastEndLoc: l,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, u = () => f, { onError: b } = t;
  function v(g, y, R, ...Y) {
    const _e = u();
    if (y.column += R, y.offset += R, b) {
      const i = n ? ri(_e.startLoc, y) : null, a = Un(g, i, {
        domain: Ia,
        args: Y
      });
      b(a);
    }
  }
  function h(g, y, R) {
    g.endLoc = s(), g.currentType = y;
    const Y = { type: y };
    return n && (Y.loc = ri(g.startLoc, g.endLoc)), R != null && (Y.value = R), Y;
  }
  const x = (g) => h(
    g,
    13
    /* TokenTypes.EOF */
  );
  function k(g, y) {
    return g.currentChar() === y ? (g.next(), y) : (v(ue.EXPECTED_TOKEN, s(), 0, y), "");
  }
  function S(g) {
    let y = "";
    for (; g.currentPeek() === ct || g.currentPeek() === Me; )
      y += g.currentPeek(), g.peek();
    return y;
  }
  function P(g) {
    const y = S(g);
    return g.skipToPeek(), y;
  }
  function p(g) {
    if (g === vt)
      return !1;
    const y = g.charCodeAt(0);
    return y >= 97 && y <= 122 || // a-z
    y >= 65 && y <= 90 || // A-Z
    y === 95;
  }
  function T(g) {
    if (g === vt)
      return !1;
    const y = g.charCodeAt(0);
    return y >= 48 && y <= 57;
  }
  function I(g, y) {
    const { currentType: R } = y;
    if (R !== 2)
      return !1;
    S(g);
    const Y = p(g.currentPeek());
    return g.resetPeek(), Y;
  }
  function E(g, y) {
    const { currentType: R } = y;
    if (R !== 2)
      return !1;
    S(g);
    const Y = g.currentPeek() === "-" ? g.peek() : g.currentPeek(), _e = T(Y);
    return g.resetPeek(), _e;
  }
  function D(g, y) {
    const { currentType: R } = y;
    if (R !== 2)
      return !1;
    S(g);
    const Y = g.currentPeek() === Ui;
    return g.resetPeek(), Y;
  }
  function q(g, y) {
    const { currentType: R } = y;
    if (R !== 7)
      return !1;
    S(g);
    const Y = g.currentPeek() === ".";
    return g.resetPeek(), Y;
  }
  function $(g, y) {
    const { currentType: R } = y;
    if (R !== 8)
      return !1;
    S(g);
    const Y = p(g.currentPeek());
    return g.resetPeek(), Y;
  }
  function J(g, y) {
    const { currentType: R } = y;
    if (!(R === 7 || R === 11))
      return !1;
    S(g);
    const Y = g.currentPeek() === ":";
    return g.resetPeek(), Y;
  }
  function G(g, y) {
    const { currentType: R } = y;
    if (R !== 9)
      return !1;
    const Y = () => {
      const i = g.currentPeek();
      return i === "{" ? p(g.peek()) : i === "@" || i === "|" || i === ":" || i === "." || i === ct || !i ? !1 : i === Me ? (g.peek(), Y()) : ae(g, !1);
    }, _e = Y();
    return g.resetPeek(), _e;
  }
  function U(g) {
    S(g);
    const y = g.currentPeek() === "|";
    return g.resetPeek(), y;
  }
  function ae(g, y = !0) {
    const R = (_e = !1, i = "") => {
      const a = g.currentPeek();
      return a === "{" || a === "@" || !a ? _e : a === "|" ? !(i === ct || i === Me) : a === ct ? (g.peek(), R(!0, ct)) : a === Me ? (g.peek(), R(!0, Me)) : !0;
    }, Y = R();
    return y && g.resetPeek(), Y;
  }
  function K(g, y) {
    const R = g.currentChar();
    return R === vt ? vt : y(R) ? (g.next(), R) : null;
  }
  function Te(g) {
    const y = g.charCodeAt(0);
    return y >= 97 && y <= 122 || // a-z
    y >= 65 && y <= 90 || // A-Z
    y >= 48 && y <= 57 || // 0-9
    y === 95 || // _
    y === 36;
  }
  function be(g) {
    return K(g, Te);
  }
  function Oe(g) {
    const y = g.charCodeAt(0);
    return y >= 97 && y <= 122 || // a-z
    y >= 65 && y <= 90 || // A-Z
    y >= 48 && y <= 57 || // 0-9
    y === 95 || // _
    y === 36 || // $
    y === 45;
  }
  function me(g) {
    return K(g, Oe);
  }
  function ie(g) {
    const y = g.charCodeAt(0);
    return y >= 48 && y <= 57;
  }
  function Re(g) {
    return K(g, ie);
  }
  function ye(g) {
    const y = g.charCodeAt(0);
    return y >= 48 && y <= 57 || // 0-9
    y >= 65 && y <= 70 || // A-F
    y >= 97 && y <= 102;
  }
  function ot(g) {
    return K(g, ye);
  }
  function Ht(g) {
    let y = "", R = "";
    for (; y = Re(g); )
      R += y;
    return R;
  }
  function Qt(g) {
    let y = "";
    for (; ; ) {
      const R = g.currentChar();
      if (R === "{" || R === "}" || R === "@" || R === "|" || !R)
        break;
      if (R === ct || R === Me)
        if (ae(g))
          y += R, g.next();
        else {
          if (U(g))
            break;
          y += R, g.next();
        }
      else
        y += R, g.next();
    }
    return y;
  }
  function Wt(g) {
    P(g);
    let y = "", R = "";
    for (; y = me(g); )
      R += y;
    return g.currentChar() === vt && v(ue.UNTERMINATED_CLOSING_BRACE, s(), 0), R;
  }
  function en(g) {
    P(g);
    let y = "";
    return g.currentChar() === "-" ? (g.next(), y += `-${Ht(g)}`) : y += Ht(g), g.currentChar() === vt && v(ue.UNTERMINATED_CLOSING_BRACE, s(), 0), y;
  }
  function Sn(g) {
    return g !== Ui && g !== Me;
  }
  function Vt(g) {
    P(g), k(g, "'");
    let y = "", R = "";
    for (; y = K(g, Sn); )
      y === "\\" ? R += tn(g) : R += y;
    const Y = g.currentChar();
    return Y === Me || Y === vt ? (v(ue.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, s(), 0), Y === Me && (g.next(), k(g, "'")), R) : (k(g, "'"), R);
  }
  function tn(g) {
    const y = g.currentChar();
    switch (y) {
      case "\\":
      case "'":
        return g.next(), `\\${y}`;
      case "u":
        return Ut(g, y, 4);
      case "U":
        return Ut(g, y, 6);
      default:
        return v(ue.UNKNOWN_ESCAPE_SEQUENCE, s(), 0, y), "";
    }
  }
  function Ut(g, y, R) {
    k(g, y);
    let Y = "";
    for (let _e = 0; _e < R; _e++) {
      const i = ot(g);
      if (!i) {
        v(ue.INVALID_UNICODE_ESCAPE_SEQUENCE, s(), 0, `\\${y}${Y}${g.currentChar()}`);
        break;
      }
      Y += i;
    }
    return `\\${y}${Y}`;
  }
  function nn(g) {
    return g !== "{" && g !== "}" && g !== ct && g !== Me;
  }
  function mt(g) {
    P(g);
    let y = "", R = "";
    for (; y = K(g, nn); )
      R += y;
    return R;
  }
  function ht(g) {
    let y = "", R = "";
    for (; y = be(g); )
      R += y;
    return R;
  }
  function on(g) {
    const y = (R) => {
      const Y = g.currentChar();
      return Y === "{" || Y === "@" || Y === "|" || Y === "(" || Y === ")" || !Y || Y === ct ? R : (R += Y, g.next(), y(R));
    };
    return y("");
  }
  function Lt(g) {
    P(g);
    const y = k(
      g,
      "|"
      /* TokenChars.Pipe */
    );
    return P(g), y;
  }
  function we(g, y) {
    let R = null;
    switch (g.currentChar()) {
      case "{":
        return y.braceNest >= 1 && v(ue.NOT_ALLOW_NEST_PLACEHOLDER, s(), 0), g.next(), R = h(
          y,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), P(g), y.braceNest++, R;
      case "}":
        return y.braceNest > 0 && y.currentType === 2 && v(ue.EMPTY_PLACEHOLDER, s(), 0), g.next(), R = h(
          y,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), y.braceNest--, y.braceNest > 0 && P(g), y.inLinked && y.braceNest === 0 && (y.inLinked = !1), R;
      case "@":
        return y.braceNest > 0 && v(ue.UNTERMINATED_CLOSING_BRACE, s(), 0), R = pt(g, y) || x(y), y.braceNest = 0, R;
      default: {
        let _e = !0, i = !0, a = !0;
        if (U(g))
          return y.braceNest > 0 && v(ue.UNTERMINATED_CLOSING_BRACE, s(), 0), R = h(y, 1, Lt(g)), y.braceNest = 0, y.inLinked = !1, R;
        if (y.braceNest > 0 && (y.currentType === 4 || y.currentType === 5 || y.currentType === 6))
          return v(ue.UNTERMINATED_CLOSING_BRACE, s(), 0), y.braceNest = 0, rt(g, y);
        if (_e = I(g, y))
          return R = h(y, 4, Wt(g)), P(g), R;
        if (i = E(g, y))
          return R = h(y, 5, en(g)), P(g), R;
        if (a = D(g, y))
          return R = h(y, 6, Vt(g)), P(g), R;
        if (!_e && !i && !a)
          return R = h(y, 12, mt(g)), v(ue.INVALID_TOKEN_IN_PLACEHOLDER, s(), 0, R.value), P(g), R;
        break;
      }
    }
    return R;
  }
  function pt(g, y) {
    const { currentType: R } = y;
    let Y = null;
    const _e = g.currentChar();
    switch ((R === 7 || R === 8 || R === 11 || R === 9) && (_e === Me || _e === ct) && v(ue.INVALID_LINKED_FORMAT, s(), 0), _e) {
      case "@":
        return g.next(), Y = h(
          y,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), y.inLinked = !0, Y;
      case ".":
        return P(g), g.next(), h(
          y,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return P(g), g.next(), h(
          y,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return U(g) ? (Y = h(y, 1, Lt(g)), y.braceNest = 0, y.inLinked = !1, Y) : q(g, y) || J(g, y) ? (P(g), pt(g, y)) : $(g, y) ? (P(g), h(y, 11, ht(g))) : G(g, y) ? (P(g), _e === "{" ? we(g, y) || Y : h(y, 10, on(g))) : (R === 7 && v(ue.INVALID_LINKED_FORMAT, s(), 0), y.braceNest = 0, y.inLinked = !1, rt(g, y));
    }
  }
  function rt(g, y) {
    let R = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (y.braceNest > 0)
      return we(g, y) || x(y);
    if (y.inLinked)
      return pt(g, y) || x(y);
    switch (g.currentChar()) {
      case "{":
        return we(g, y) || x(y);
      case "}":
        return v(ue.UNBALANCED_CLOSING_BRACE, s(), 0), g.next(), h(
          y,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return pt(g, y) || x(y);
      default: {
        if (U(g))
          return R = h(y, 1, Lt(g)), y.braceNest = 0, y.inLinked = !1, R;
        if (ae(g))
          return h(y, 0, Qt(g));
        break;
      }
    }
    return R;
  }
  function rn() {
    const { currentType: g, offset: y, startLoc: R, endLoc: Y } = f;
    return f.lastType = g, f.lastOffset = y, f.lastStartLoc = R, f.lastEndLoc = Y, f.offset = r(), f.startLoc = s(), o.currentChar() === vt ? h(
      f,
      13
      /* TokenTypes.EOF */
    ) : rt(o, f);
  }
  return {
    nextToken: rn,
    currentOffset: r,
    currentPosition: s,
    context: u
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
      const o = parseInt(t || n, 16);
      return o <= 55295 || o >= 57344 ? String.fromCodePoint(o) : "�";
    }
  }
}
function Fa(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function o(p, T, I, E, ...D) {
    const q = p.currentPosition();
    if (q.offset += E, q.column += E, n) {
      const $ = t ? ri(I, q) : null, J = Un(T, $, {
        domain: Ra,
        args: D
      });
      n(J);
    }
  }
  function r(p, T, I) {
    const E = { type: p };
    return t && (E.start = T, E.end = T, E.loc = { start: I, end: I }), E;
  }
  function s(p, T, I, E) {
    t && (p.end = T, p.loc && (p.loc.end = I));
  }
  function l(p, T) {
    const I = p.context(), E = r(3, I.offset, I.startLoc);
    return E.value = T, s(E, p.currentOffset(), p.currentPosition()), E;
  }
  function d(p, T) {
    const I = p.context(), { lastOffset: E, lastStartLoc: D } = I, q = r(5, E, D);
    return q.index = parseInt(T, 10), p.nextToken(), s(q, p.currentOffset(), p.currentPosition()), q;
  }
  function f(p, T) {
    const I = p.context(), { lastOffset: E, lastStartLoc: D } = I, q = r(4, E, D);
    return q.key = T, p.nextToken(), s(q, p.currentOffset(), p.currentPosition()), q;
  }
  function u(p, T) {
    const I = p.context(), { lastOffset: E, lastStartLoc: D } = I, q = r(9, E, D);
    return q.value = T.replace(Da, Ma), p.nextToken(), s(q, p.currentOffset(), p.currentPosition()), q;
  }
  function b(p) {
    const T = p.nextToken(), I = p.context(), { lastOffset: E, lastStartLoc: D } = I, q = r(8, E, D);
    return T.type !== 11 ? (o(p, ue.UNEXPECTED_EMPTY_LINKED_MODIFIER, I.lastStartLoc, 0), q.value = "", s(q, E, D), {
      nextConsumeToken: T,
      node: q
    }) : (T.value == null && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, Ze(T)), q.value = T.value || "", s(q, p.currentOffset(), p.currentPosition()), {
      node: q
    });
  }
  function v(p, T) {
    const I = p.context(), E = r(7, I.offset, I.startLoc);
    return E.value = T, s(E, p.currentOffset(), p.currentPosition()), E;
  }
  function h(p) {
    const T = p.context(), I = r(6, T.offset, T.startLoc);
    let E = p.nextToken();
    if (E.type === 8) {
      const D = b(p);
      I.modifier = D.node, E = D.nextConsumeToken || p.nextToken();
    }
    switch (E.type !== 9 && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), E = p.nextToken(), E.type === 2 && (E = p.nextToken()), E.type) {
      case 10:
        E.value == null && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), I.key = v(p, E.value || "");
        break;
      case 4:
        E.value == null && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), I.key = f(p, E.value || "");
        break;
      case 5:
        E.value == null && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), I.key = d(p, E.value || "");
        break;
      case 6:
        E.value == null && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(E)), I.key = u(p, E.value || "");
        break;
      default: {
        o(p, ue.UNEXPECTED_EMPTY_LINKED_KEY, T.lastStartLoc, 0);
        const D = p.context(), q = r(7, D.offset, D.startLoc);
        return q.value = "", s(q, D.offset, D.startLoc), I.key = q, s(I, D.offset, D.startLoc), {
          nextConsumeToken: E,
          node: I
        };
      }
    }
    return s(I, p.currentOffset(), p.currentPosition()), {
      node: I
    };
  }
  function x(p) {
    const T = p.context(), I = T.currentType === 1 ? p.currentOffset() : T.offset, E = T.currentType === 1 ? T.endLoc : T.startLoc, D = r(2, I, E);
    D.items = [];
    let q = null;
    do {
      const G = q || p.nextToken();
      switch (q = null, G.type) {
        case 0:
          G.value == null && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(G)), D.items.push(l(p, G.value || ""));
          break;
        case 5:
          G.value == null && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(G)), D.items.push(d(p, G.value || ""));
          break;
        case 4:
          G.value == null && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(G)), D.items.push(f(p, G.value || ""));
          break;
        case 6:
          G.value == null && o(p, ue.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ze(G)), D.items.push(u(p, G.value || ""));
          break;
        case 7: {
          const U = h(p);
          D.items.push(U.node), q = U.nextConsumeToken || null;
          break;
        }
      }
    } while (T.currentType !== 13 && T.currentType !== 1);
    const $ = T.currentType === 1 ? T.lastOffset : p.currentOffset(), J = T.currentType === 1 ? T.lastEndLoc : p.currentPosition();
    return s(D, $, J), D;
  }
  function k(p, T, I, E) {
    const D = p.context();
    let q = E.items.length === 0;
    const $ = r(1, T, I);
    $.cases = [], $.cases.push(E);
    do {
      const J = x(p);
      q || (q = J.items.length === 0), $.cases.push(J);
    } while (D.currentType !== 13);
    return q && o(p, ue.MUST_HAVE_MESSAGES_IN_PLURAL, I, 0), s($, p.currentOffset(), p.currentPosition()), $;
  }
  function S(p) {
    const T = p.context(), { offset: I, startLoc: E } = T, D = x(p);
    return T.currentType === 13 ? D : k(p, I, E, D);
  }
  function P(p) {
    const T = Na(p, Pe({}, e)), I = T.context(), E = r(0, I.offset, I.startLoc);
    return t && E.loc && (E.loc.source = p), E.body = S(T), e.onCacheKey && (E.cacheKey = e.onCacheKey(p)), I.currentType !== 13 && o(T, ue.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, p[I.offset] || ""), s(E, T.currentOffset(), T.currentPosition()), E;
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
function Yi(e, t) {
  for (let n = 0; n < e.length; n++)
    Ei(e[n], t);
}
function Ei(e, t) {
  switch (e.type) {
    case 1:
      Yi(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Yi(e.items, t);
      break;
    case 6: {
      Ei(e.key, t), t.helper(
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
  ), e.body && Ei(e.body, n);
  const o = n.context();
  e.helpers = Array.from(o.helpers);
}
function za(e) {
  const t = e.body;
  return t.type === 2 ? ji(t) : t.cases.forEach((n) => ji(n)), e;
}
function ji(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const o = e.items[n];
      if (!(o.type === 3 || o.type === 9) || o.value == null)
        break;
      t.push(o.value);
    }
    if (t.length === e.items.length) {
      e.static = Si(t);
      for (let n = 0; n < e.items.length; n++) {
        const o = e.items[n];
        (o.type === 3 || o.type === 9) && delete o.value;
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
      for (let o = 0; o < n.length; o++)
        jt(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        jt(n[o]);
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
  const { filename: n, breakLineCode: o, needIndent: r } = t, s = t.location !== !1, l = {
    filename: n,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: o,
    needIndent: r,
    indentLevel: 0
  };
  s && e.loc && (l.source = e.loc.source);
  const d = () => l;
  function f(S, P) {
    l.code += S;
  }
  function u(S, P = !0) {
    const p = P ? o : "";
    f(r ? p + "  ".repeat(S) : p);
  }
  function b(S = !0) {
    const P = ++l.indentLevel;
    S && u(P);
  }
  function v(S = !0) {
    const P = --l.indentLevel;
    S && u(P);
  }
  function h() {
    u(l.indentLevel);
  }
  return {
    context: d,
    push: f,
    indent: b,
    deindent: v,
    newline: h,
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
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let s = 0; s < r && (Zt(e, t.items[s]), s !== r - 1); s++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function Ua(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let s = 0; s < r && (Zt(e, t.cases[s]), s !== r - 1); s++)
      e.push(", ");
    e.deindent(o()), e.push("])");
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
  const n = W(t.mode) ? t.mode : "normal", o = W(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, s = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], d = Ha(e, {
    filename: o,
    breakLineCode: r,
    needIndent: s
  });
  d.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), d.indent(s), l.length > 0 && (d.push(`const { ${Si(l.map((b) => `${b}: _${b}`), ", ")} } = ctx`), d.newline()), d.push("return "), Zt(d, e), d.deindent(s), d.push("}"), delete e.helpers;
  const { code: f, map: u } = d.context();
  return {
    ast: e,
    code: f,
    map: u ? u.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Xa(e, t = {}) {
  const n = Pe({}, t), o = !!n.jit, r = !!n.minify, s = n.optimize == null ? !0 : n.optimize, d = Fa(n).parse(e);
  return o ? (s && za(d), r && jt(d), { ast: d, code: "" }) : (Ba(d, n), ja(d, n));
}
/*!
  * core-base v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ga() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Nt().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Nt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function et(e) {
  return le(e) && Ci(e) === 0 && (je(e, "b") || je(e, "body"));
}
const jo = ["b", "body"];
function Ka(e) {
  return Pt(e, jo);
}
const Xo = ["c", "cases"];
function Ja(e) {
  return Pt(e, Xo, []);
}
const Go = ["s", "static"];
function Za(e) {
  return Pt(e, Go);
}
const Ko = ["i", "items"];
function Qa(e) {
  return Pt(e, Ko, []);
}
const Jo = ["t", "type"];
function Ci(e) {
  return Pt(e, Jo);
}
const Zo = ["v", "value"];
function An(e, t) {
  const n = Pt(e, Zo);
  if (n != null)
    return n;
  throw hn(t);
}
const Qo = ["m", "modifier"];
function es(e) {
  return Pt(e, Qo);
}
const er = ["k", "key"];
function ts(e) {
  const t = Pt(e, er);
  if (t)
    return t;
  throw hn(
    6
    /* NodeTypes.Linked */
  );
}
function Pt(e, t, n) {
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
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
function hn(e) {
  return new Error(`unhandled node type: ${e}`);
}
function Jn(e) {
  return (n) => ns(n, e);
}
function ns(e, t) {
  const n = Ka(t);
  if (n == null)
    throw hn(
      0
      /* NodeTypes.Resource */
    );
  if (Ci(n) === 1) {
    const s = Ja(n);
    return e.plural(s.reduce((l, d) => [
      ...l,
      Xi(e, d)
    ], []));
  } else
    return Xi(e, n);
}
function Xi(e, t) {
  const n = Za(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const o = Qa(t).reduce((r, s) => [...r, ai(e, s)], []);
    return e.normalize(o);
  }
}
function ai(e, t) {
  const n = Ci(t);
  switch (n) {
    case 3:
      return An(t, n);
    case 9:
      return An(t, n);
    case 4: {
      const o = t;
      if (je(o, "k") && o.k)
        return e.interpolate(e.named(o.k));
      if (je(o, "key") && o.key)
        return e.interpolate(e.named(o.key));
      throw hn(n);
    }
    case 5: {
      const o = t;
      if (je(o, "i") && Se(o.i))
        return e.interpolate(e.list(o.i));
      if (je(o, "index") && Se(o.index))
        return e.interpolate(e.list(o.index));
      throw hn(n);
    }
    case 6: {
      const o = t, r = es(o), s = ts(o);
      return e.linked(ai(e, s), r ? ai(e, r) : void 0, e.type);
    }
    case 7:
      return An(t, n);
    case 8:
      return An(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const is = (e) => e;
let Ln = fe();
function os(e, t = {}) {
  let n = !1;
  const o = t.onError || Ca;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ...Xa(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function rs(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && W(e)) {
    se(t.warnHtmlMessage) && t.warnHtmlMessage;
    const o = (t.onCacheKey || is)(e), r = Ln[o];
    if (r)
      return r;
    const { ast: s, detectError: l } = os(e, {
      ...t,
      location: !1,
      jit: !0
    }), d = Jn(s);
    return l ? d : Ln[o] = d;
  } else {
    const n = e.cacheKey;
    if (n) {
      const o = Ln[n];
      return o || (Ln[n] = Jn(e));
    } else
      return Jn(e);
  }
}
let pn = null;
function as(e) {
  pn = e;
}
function ss(e, t, n) {
  pn && pn.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const ls = /* @__PURE__ */ cs("function:translate");
function cs(e) {
  return (t) => pn && pn.emit(e, t);
}
const ut = {
  INVALID_ARGUMENT: Ea,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, us = 24;
function dt(e) {
  return Un(e, null, void 0);
}
function Pi(e, t) {
  return t.locale != null ? Gi(t.locale) : Gi(e.locale);
}
let Zn;
function Gi(e) {
  if (W(e))
    return e;
  if (ve(e)) {
    if (e.resolvedOnce && Zn != null)
      return Zn;
    if (e.constructor.name === "Function") {
      const t = e();
      if (xa(t))
        throw dt(ut.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Zn = t;
    } else
      throw dt(ut.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw dt(ut.NOT_SUPPORT_LOCALE_TYPE);
}
function ds(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Ee(t) ? t : le(t) ? Object.keys(t) : W(t) ? [t] : [n]
  ])];
}
function nr(e, t, n) {
  const o = W(n) ? n : gn, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let s = r.__localeChainCache.get(o);
  if (!s) {
    s = [];
    let l = [n];
    for (; Ee(l); )
      l = Ki(s, l, t);
    const d = Ee(t) || !Q(t) ? t : t.default ? t.default : null;
    l = W(d) ? [d] : d, Ee(l) && Ki(s, l, !1), r.__localeChainCache.set(o, s);
  }
  return s;
}
function Ki(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && se(o); r++) {
    const s = t[r];
    W(s) && (o = fs(e, t[r], n));
  }
  return o;
}
function fs(e, t, n) {
  let o;
  const r = t.split("-");
  do {
    const s = r.join("-");
    o = ms(e, s, n), r.splice(-1, 1);
  } while (r.length && o === !0);
  return o;
}
function ms(e, t, n) {
  let o = !1;
  if (!e.includes(t) && (o = !0, t)) {
    o = t[t.length - 1] !== "!";
    const r = t.replace(/!/g, "");
    e.push(r), (Ee(n) || Q(n)) && n[r] && (o = n[r]);
  }
  return o;
}
const At = [];
At[
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
At[
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
At[
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
At[
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
At[
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
At[
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
At[
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
const hs = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function ps(e) {
  return hs.test(e);
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
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : ps(t) ? gs(t) : "*" + t;
}
function _s(e) {
  const t = [];
  let n = -1, o = 0, r = 0, s, l, d, f, u, b, v;
  const h = [];
  h[
    0
    /* Actions.APPEND */
  ] = () => {
    l === void 0 ? l = d : l += d;
  }, h[
    1
    /* Actions.PUSH */
  ] = () => {
    l !== void 0 && (t.push(l), l = void 0);
  }, h[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    h[
      0
      /* Actions.APPEND */
    ](), r++;
  }, h[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (r > 0)
      r--, o = 4, h[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (r = 0, l === void 0 || (l = ys(l), l === !1))
        return !1;
      h[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function x() {
    const k = e[n + 1];
    if (o === 5 && k === "'" || o === 6 && k === '"')
      return n++, d = "\\" + k, h[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; o !== null; )
    if (n++, s = e[n], !(s === "\\" && x())) {
      if (f = vs(s), v = At[o], u = v[f] || v.l || 8, u === 8 || (o = u[0], u[1] !== void 0 && (b = h[u[1]], b && (d = s, b() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const Ji = /* @__PURE__ */ new Map();
function bs(e, t) {
  return le(e) ? e[t] : null;
}
function ws(e, t) {
  if (!le(e))
    return null;
  let n = Ji.get(t);
  if (n || (n = _s(t), n && Ji.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, s = 0;
  for (; s < o; ) {
    const l = n[s];
    if (tr.includes(l) && et(r))
      return null;
    const d = r[l];
    if (d === void 0 || ve(r))
      return null;
    r = d, s++;
  }
  return r;
}
const xs = "11.1.3", Yn = -1, gn = "en-US", Zi = "", Qi = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function ks() {
  return {
    upper: (e, t) => t === "text" && W(e) ? e.toUpperCase() : t === "vnode" && le(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && W(e) ? e.toLowerCase() : t === "vnode" && le(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && W(e) ? Qi(e) : t === "vnode" && le(e) && "__v_isVNode" in e ? Qi(e.children) : e
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
const eo = (e) => {
  sr = e;
}, As = () => sr;
let to = 0;
function Ls(e = {}) {
  const t = ve(e.onWarn) ? e.onWarn : Ta, n = W(e.version) ? e.version : xs, o = W(e.locale) || ve(e.locale) ? e.locale : gn, r = ve(o) ? gn : o, s = Ee(e.fallbackLocale) || Q(e.fallbackLocale) || W(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Q(e.messages) ? e.messages : Qn(r), d = Q(e.datetimeFormats) ? e.datetimeFormats : Qn(r), f = Q(e.numberFormats) ? e.numberFormats : Qn(r), u = Pe(fe(), e.modifiers, ks()), b = e.pluralRules || fe(), v = ve(e.missing) ? e.missing : null, h = se(e.missingWarn) || Jt(e.missingWarn) ? e.missingWarn : !0, x = se(e.fallbackWarn) || Jt(e.fallbackWarn) ? e.fallbackWarn : !0, k = !!e.fallbackFormat, S = !!e.unresolving, P = ve(e.postTranslation) ? e.postTranslation : null, p = Q(e.processor) ? e.processor : null, T = se(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, I = !!e.escapeParameter, E = ve(e.messageCompiler) ? e.messageCompiler : ir, D = ve(e.messageResolver) ? e.messageResolver : or || bs, q = ve(e.localeFallbacker) ? e.localeFallbacker : rr || ds, $ = le(e.fallbackContext) ? e.fallbackContext : void 0, J = e, G = le(J.__datetimeFormatters) ? J.__datetimeFormatters : /* @__PURE__ */ new Map(), U = le(J.__numberFormatters) ? J.__numberFormatters : /* @__PURE__ */ new Map(), ae = le(J.__meta) ? J.__meta : {};
  to++;
  const K = {
    version: n,
    cid: to,
    locale: o,
    fallbackLocale: s,
    messages: l,
    modifiers: u,
    pluralRules: b,
    missing: v,
    missingWarn: h,
    fallbackWarn: x,
    fallbackFormat: k,
    unresolving: S,
    postTranslation: P,
    processor: p,
    warnHtmlMessage: T,
    escapeParameter: I,
    messageCompiler: E,
    messageResolver: D,
    localeFallbacker: q,
    fallbackContext: $,
    onWarn: t,
    __meta: ae
  };
  return K.datetimeFormats = d, K.numberFormats = f, K.__datetimeFormatters = G, K.__numberFormatters = U, __INTLIFY_PROD_DEVTOOLS__ && ss(K, n, ae), K;
}
const Qn = (e) => ({ [e]: fe() });
function Ai(e, t, n, o, r) {
  const { missing: s, onWarn: l } = e;
  if (s !== null) {
    const d = s(e, n, t, r);
    return W(d) ? d : t;
  } else
    return t;
}
function sn(e, t, n) {
  const o = e;
  o.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Os(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function $s(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let o = n + 1; o < t.length; o++)
    if (Os(e, t[o]))
      return !0;
  return !1;
}
function no(e, ...t) {
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: s, localeFallbacker: l } = e, { __datetimeFormatters: d } = e, [f, u, b, v] = si(...t), h = se(b.missingWarn) ? b.missingWarn : e.missingWarn;
  se(b.fallbackWarn) ? b.fallbackWarn : e.fallbackWarn;
  const x = !!b.part, k = Pi(e, b), S = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    k
  );
  if (!W(f) || f === "")
    return new Intl.DateTimeFormat(k, v).format(u);
  let P = {}, p, T = null;
  const I = "datetime format";
  for (let q = 0; q < S.length && (p = S[q], P = n[p] || {}, T = P[f], !Q(T)); q++)
    Ai(e, f, p, h, I);
  if (!Q(T) || !W(p))
    return o ? Yn : f;
  let E = `${p}__${f}`;
  Vn(v) || (E = `${E}__${JSON.stringify(v)}`);
  let D = d.get(E);
  return D || (D = new Intl.DateTimeFormat(p, Pe({}, T, v)), d.set(E, D)), x ? D.formatToParts(u) : D.format(u);
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
  const [t, n, o, r] = e, s = fe();
  let l = fe(), d;
  if (W(t)) {
    const f = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!f)
      throw dt(ut.INVALID_ISO_DATE_ARGUMENT);
    const u = f[3] ? f[3].trim().startsWith("T") ? `${f[1].trim()}${f[3].trim()}` : `${f[1].trim()}T${f[3].trim()}` : f[1].trim();
    d = new Date(u);
    try {
      d.toISOString();
    } catch {
      throw dt(ut.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (_a(t)) {
    if (isNaN(t.getTime()))
      throw dt(ut.INVALID_DATE_ARGUMENT);
    d = t;
  } else if (Se(t))
    d = t;
  else
    throw dt(ut.INVALID_ARGUMENT);
  return W(n) ? s.key = n : Q(n) && Object.keys(n).forEach((f) => {
    lr.includes(f) ? l[f] = n[f] : s[f] = n[f];
  }), W(o) ? s.locale = o : Q(o) && (l = o), Q(r) && (l = r), [s.key || "", d, s, l];
}
function io(e, t, n) {
  const o = e;
  for (const r in n) {
    const s = `${t}__${r}`;
    o.__datetimeFormatters.has(s) && o.__datetimeFormatters.delete(s);
  }
}
function oo(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: s, localeFallbacker: l } = e, { __numberFormatters: d } = e, [f, u, b, v] = li(...t), h = se(b.missingWarn) ? b.missingWarn : e.missingWarn;
  se(b.fallbackWarn) ? b.fallbackWarn : e.fallbackWarn;
  const x = !!b.part, k = Pi(e, b), S = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    k
  );
  if (!W(f) || f === "")
    return new Intl.NumberFormat(k, v).format(u);
  let P = {}, p, T = null;
  const I = "number format";
  for (let q = 0; q < S.length && (p = S[q], P = n[p] || {}, T = P[f], !Q(T)); q++)
    Ai(e, f, p, h, I);
  if (!Q(T) || !W(p))
    return o ? Yn : f;
  let E = `${p}__${f}`;
  Vn(v) || (E = `${E}__${JSON.stringify(v)}`);
  let D = d.get(E);
  return D || (D = new Intl.NumberFormat(p, Pe({}, T, v)), d.set(E, D)), x ? D.formatToParts(u) : D.format(u);
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
  const [t, n, o, r] = e, s = fe();
  let l = fe();
  if (!Se(t))
    throw dt(ut.INVALID_ARGUMENT);
  const d = t;
  return W(n) ? s.key = n : Q(n) && Object.keys(n).forEach((f) => {
    cr.includes(f) ? l[f] = n[f] : s[f] = n[f];
  }), W(o) ? s.locale = o : Q(o) && (l = o), Q(r) && (l = r), [s.key || "", d, s, l];
}
function ro(e, t, n) {
  const o = e;
  for (const r in n) {
    const s = `${t}__${r}`;
    o.__numberFormatters.has(s) && o.__numberFormatters.delete(s);
  }
}
const Is = (e) => e, Ns = (e) => "", Rs = "text", Ds = (e) => e.length === 0 ? "" : Si(e), Ms = ka;
function ao(e, t) {
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
  const t = e.locale, n = Fs(e), o = le(e.pluralRules) && W(t) && ve(e.pluralRules[t]) ? e.pluralRules[t] : ao, r = le(e.pluralRules) && W(t) && ve(e.pluralRules[t]) ? ao : void 0, s = (p) => p[o(n, p.length, r)], l = e.list || [], d = (p) => l[p], f = e.named || fe();
  Se(e.pluralIndex) && qs(n, f);
  const u = (p) => f[p];
  function b(p, T) {
    const I = ve(e.messages) ? e.messages(p, !!T) : le(e.messages) ? e.messages[p] : !1;
    return I || (e.parent ? e.parent.message(p) : Ns);
  }
  const v = (p) => e.modifiers ? e.modifiers[p] : Is, h = Q(e.processor) && ve(e.processor.normalize) ? e.processor.normalize : Ds, x = Q(e.processor) && ve(e.processor.interpolate) ? e.processor.interpolate : Ms, k = Q(e.processor) && W(e.processor.type) ? e.processor.type : Rs, P = {
    list: d,
    named: u,
    plural: s,
    linked: (p, ...T) => {
      const [I, E] = T;
      let D = "text", q = "";
      T.length === 1 ? le(I) ? (q = I.modifier || q, D = I.type || D) : W(I) && (q = I || q) : T.length === 2 && (W(I) && (q = I || q), W(E) && (D = E || D));
      const $ = b(p, !0)(P), J = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        D === "vnode" && Ee($) && q ? $[0] : $
      );
      return q ? v(q)(J, D) : J;
    },
    message: b,
    type: k,
    interpolate: x,
    normalize: h,
    values: Pe(fe(), l, f)
  };
  return P;
}
const so = () => "", We = (e) => ve(e);
function lo(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: s, fallbackLocale: l, messages: d } = e, [f, u] = ci(...t), b = se(u.missingWarn) ? u.missingWarn : e.missingWarn, v = se(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, h = se(u.escapeParameter) ? u.escapeParameter : e.escapeParameter, x = !!u.resolvedMessage, k = W(u.default) || se(u.default) ? se(u.default) ? s ? f : () => f : u.default : n ? s ? f : () => f : null, S = n || k != null && (W(k) || ve(k)), P = Pi(e, u);
  h && zs(u);
  let [p, T, I] = x ? [
    f,
    P,
    d[P] || fe()
  ] : ur(e, f, P, l, v, b), E = p, D = f;
  if (!x && !(W(E) || et(E) || We(E)) && S && (E = k, D = E), !x && (!(W(E) || et(E) || We(E)) || !W(T)))
    return r ? Yn : f;
  let q = !1;
  const $ = () => {
    q = !0;
  }, J = We(E) ? E : dr(e, f, T, E, D, $);
  if (q)
    return E;
  const G = Vs(e, T, I, u), U = Bs(G), ae = Hs(e, J, U), K = o ? o(ae, f) : ae;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const Te = {
      timestamp: Date.now(),
      key: W(f) ? f : We(E) ? E.key : "",
      locale: T || (We(E) ? E.locale : ""),
      format: W(E) ? E : We(E) ? E.source : "",
      message: K
    };
    Te.meta = Pe({}, e.__meta, /* @__PURE__ */ Ps() || {}), ls(Te);
  }
  return K;
}
function zs(e) {
  Ee(e.list) ? e.list = e.list.map((t) => W(t) ? Vi(t) : t) : le(e.named) && Object.keys(e.named).forEach((t) => {
    W(e.named[t]) && (e.named[t] = Vi(e.named[t]));
  });
}
function ur(e, t, n, o, r, s) {
  const { messages: l, onWarn: d, messageResolver: f, localeFallbacker: u } = e, b = u(e, o, n);
  let v = fe(), h, x = null;
  const k = "translate";
  for (let S = 0; S < b.length && (h = b[S], v = l[h] || fe(), (x = f(v, t)) === null && (x = v[t]), !(W(x) || et(x) || We(x))); S++)
    if (!$s(h, b)) {
      const P = Ai(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        h,
        s,
        k
      );
      P !== t && (x = P);
    }
  return [x, h, v];
}
function dr(e, t, n, o, r, s) {
  const { messageCompiler: l, warnHtmlMessage: d } = e;
  if (We(o)) {
    const u = o;
    return u.locale = u.locale || n, u.key = u.key || t, u;
  }
  if (l == null) {
    const u = () => o;
    return u.locale = n, u.key = t, u;
  }
  const f = l(o, Ws(e, n, r, o, d, s));
  return f.locale = n, f.key = t, f.source = o, f;
}
function Hs(e, t, n) {
  return t(n);
}
function ci(...e) {
  const [t, n, o] = e, r = fe();
  if (!W(t) && !Se(t) && !We(t) && !et(t))
    throw dt(ut.INVALID_ARGUMENT);
  const s = Se(t) ? String(t) : (We(t), t);
  return Se(n) ? r.plural = n : W(n) ? r.default = n : Q(n) && !Vn(n) ? r.named = n : Ee(n) && (r.list = n), Se(o) ? r.plural = o : W(o) ? r.default = o : Q(o) && Pe(r, o), [s, r];
}
function Ws(e, t, n, o, r, s) {
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
function Vs(e, t, n, o) {
  const { modifiers: r, pluralRules: s, messageResolver: l, fallbackLocale: d, fallbackWarn: f, missingWarn: u, fallbackContext: b } = e, h = {
    locale: t,
    modifiers: r,
    pluralRules: s,
    messages: (x, k) => {
      let S = l(n, x);
      if (S == null && (b || k)) {
        const [, , P] = ur(
          b || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          x,
          t,
          d,
          f,
          u
        );
        S = l(P, x);
      }
      if (W(S) || et(S)) {
        let P = !1;
        const T = dr(e, x, t, S, x, () => {
          P = !0;
        });
        return P ? so : T;
      } else return We(S) ? S : so;
    }
  };
  return e.processor && (h.processor = e.processor), o.list && (h.list = o.list), o.named && (h.named = o.named), Se(o.plural) && (h.pluralIndex = o.plural), h;
}
Ga();
/*!
  * vue-i18n v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Us = "11.1.3";
function Ys() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (Nt().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (Nt().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Nt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Nt().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const qe = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: us,
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
function ze(e, ...t) {
  return Un(e, null, void 0);
}
const ui = /* @__PURE__ */ Ct("__translateVNode"), di = /* @__PURE__ */ Ct("__datetimeParts"), fi = /* @__PURE__ */ Ct("__numberParts"), fr = Ct("__setPluralRules"), mr = /* @__PURE__ */ Ct("__injectWithOption"), mi = /* @__PURE__ */ Ct("__dispose");
function vn(e) {
  if (!le(e) || et(e))
    return e;
  for (const t in e)
    if (je(e, t))
      if (!t.includes("."))
        le(e[t]) && vn(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, s = !1;
        for (let l = 0; l < o; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = fe()), !le(r[n[l]])) {
            s = !0;
            break;
          }
          r = r[n[l]];
        }
        if (s || (et(r) ? tr.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !et(r)) {
          const l = r[n[o]];
          le(l) && vn(l);
        }
      }
  return e;
}
function Li(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: s } = t, l = Q(n) ? n : Ee(o) ? fe() : { [e]: fe() };
  if (Ee(o) && o.forEach((d) => {
    if ("locale" in d && "resource" in d) {
      const { locale: f, resource: u } = d;
      f ? (l[f] = l[f] || fe(), In(u, l[f])) : In(u, l);
    } else
      W(d) && In(JSON.parse(d), l);
  }), r == null && s)
    for (const d in l)
      je(l, d) && vn(l[d]);
  return l;
}
function hr(e) {
  return e.type;
}
function pr(e, t, n) {
  let o = le(t.messages) ? t.messages : fe();
  "__i18nGlobal" in n && (o = Li(e.locale.value, {
    messages: o,
    __i18n: n.__i18nGlobal
  }));
  const r = Object.keys(o);
  r.length && r.forEach((s) => {
    e.mergeLocaleMessage(s, o[s]);
  });
  {
    if (le(t.datetimeFormats)) {
      const s = Object.keys(t.datetimeFormats);
      s.length && s.forEach((l) => {
        e.mergeDateTimeFormat(l, t.datetimeFormats[l]);
      });
    }
    if (le(t.numberFormats)) {
      const s = Object.keys(t.numberFormats);
      s.length && s.forEach((l) => {
        e.mergeNumberFormat(l, t.numberFormats[l]);
      });
    }
  }
}
function co(e) {
  return N(Xr, null, e, 0);
}
const uo = "__INTLIFY_META__", fo = () => [], js = () => !1;
let mo = 0;
function ho(e) {
  return (t, n, o, r) => e(n, o, Kt() || void 0, r);
}
const Xs = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Kt();
  let t = null;
  return e && (t = hr(e)[uo]) ? { [uo]: t } : null;
};
function Oi(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, s = Mn ? ce : Yr;
  let l = se(e.inheritLocale) ? e.inheritLocale : !0;
  const d = s(
    // prettier-ignore
    t && l ? t.locale.value : W(e.locale) ? e.locale : gn
  ), f = s(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : W(e.fallbackLocale) || Ee(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : d.value
  ), u = s(Li(d.value, e)), b = s(Q(e.datetimeFormats) ? e.datetimeFormats : { [d.value]: {} }), v = s(Q(e.numberFormats) ? e.numberFormats : { [d.value]: {} });
  let h = t ? t.missingWarn : se(e.missingWarn) || Jt(e.missingWarn) ? e.missingWarn : !0, x = t ? t.fallbackWarn : se(e.fallbackWarn) || Jt(e.fallbackWarn) ? e.fallbackWarn : !0, k = t ? t.fallbackRoot : se(e.fallbackRoot) ? e.fallbackRoot : !0, S = !!e.fallbackFormat, P = ve(e.missing) ? e.missing : null, p = ve(e.missing) ? ho(e.missing) : null, T = ve(e.postTranslation) ? e.postTranslation : null, I = t ? t.warnHtmlMessage : se(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, E = !!e.escapeParameter;
  const D = t ? t.modifiers : Q(e.modifiers) ? e.modifiers : {};
  let q = e.pluralRules || t && t.pluralRules, $;
  $ = (() => {
    o && eo(null);
    const a = {
      version: Us,
      locale: d.value,
      fallbackLocale: f.value,
      messages: u.value,
      modifiers: D,
      pluralRules: q,
      missing: p === null ? void 0 : p,
      missingWarn: h,
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
    a.datetimeFormats = b.value, a.numberFormats = v.value, a.__datetimeFormatters = Q($) ? $.__datetimeFormatters : void 0, a.__numberFormatters = Q($) ? $.__numberFormatters : void 0;
    const c = Ls(a);
    return o && eo(c), c;
  })(), sn($, d.value, f.value);
  function G() {
    return [
      d.value,
      f.value,
      u.value,
      b.value,
      v.value
    ];
  }
  const U = ke({
    get: () => d.value,
    set: (a) => {
      $.locale = a, d.value = a;
    }
  }), ae = ke({
    get: () => f.value,
    set: (a) => {
      $.fallbackLocale = a, f.value = a, sn($, d.value, a);
    }
  }), K = ke(() => u.value), Te = /* @__PURE__ */ ke(() => b.value), be = /* @__PURE__ */ ke(() => v.value);
  function Oe() {
    return ve(T) ? T : null;
  }
  function me(a) {
    T = a, $.postTranslation = a;
  }
  function ie() {
    return P;
  }
  function Re(a) {
    a !== null && (p = ho(a)), P = a, $.missing = p;
  }
  const ye = (a, c, m, _, A, L) => {
    G();
    let O;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || ($.fallbackContext = t ? As() : void 0), O = a($);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || ($.fallbackContext = void 0);
    }
    if (m !== "translate exists" && // for not `te` (e.g `t`)
    Se(O) && O === Yn || m === "translate exists" && !O) {
      const [V, H] = c();
      return t && k ? _(t) : A(V);
    } else {
      if (L(O))
        return O;
      throw ze(qe.UNEXPECTED_RETURN_TYPE);
    }
  };
  function ot(...a) {
    return ye((c) => Reflect.apply(lo, null, [c, ...a]), () => ci(...a), "translate", (c) => Reflect.apply(c.t, c, [...a]), (c) => c, (c) => W(c));
  }
  function Ht(...a) {
    const [c, m, _] = a;
    if (_ && !le(_))
      throw ze(qe.INVALID_ARGUMENT);
    return ot(c, m, Pe({ resolvedMessage: !0 }, _ || {}));
  }
  function Qt(...a) {
    return ye((c) => Reflect.apply(no, null, [c, ...a]), () => si(...a), "datetime format", (c) => Reflect.apply(c.d, c, [...a]), () => Zi, (c) => W(c));
  }
  function Wt(...a) {
    return ye((c) => Reflect.apply(oo, null, [c, ...a]), () => li(...a), "number format", (c) => Reflect.apply(c.n, c, [...a]), () => Zi, (c) => W(c));
  }
  function en(a) {
    return a.map((c) => W(c) || Se(c) || se(c) ? co(String(c)) : c);
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
        _.processor = Vt, m = Reflect.apply(lo, null, [_, ...a]);
      } finally {
        _.processor = null;
      }
      return m;
    }, () => ci(...a), "translate", (c) => c[ui](...a), (c) => [co(c)], (c) => Ee(c));
  }
  function Ut(...a) {
    return ye((c) => Reflect.apply(oo, null, [c, ...a]), () => li(...a), "number format", (c) => c[fi](...a), fo, (c) => W(c) || Ee(c));
  }
  function nn(...a) {
    return ye((c) => Reflect.apply(no, null, [c, ...a]), () => si(...a), "datetime format", (c) => c[di](...a), fo, (c) => W(c) || Ee(c));
  }
  function mt(a) {
    q = a, $.pluralRules = q;
  }
  function ht(a, c) {
    return ye(() => {
      if (!a)
        return !1;
      const m = W(c) ? c : d.value, _ = we(m), A = $.messageResolver(_, a);
      return et(A) || We(A) || W(A);
    }, () => [a], "translate exists", (m) => Reflect.apply(m.te, m, [a, c]), js, (m) => se(m));
  }
  function on(a) {
    let c = null;
    const m = nr($, f.value, d.value);
    for (let _ = 0; _ < m.length; _++) {
      const A = u.value[m[_]] || {}, L = $.messageResolver(A, a);
      if (L != null) {
        c = L;
        break;
      }
    }
    return c;
  }
  function Lt(a) {
    const c = on(a);
    return c ?? (t ? t.tm(a) || {} : {});
  }
  function we(a) {
    return u.value[a] || {};
  }
  function pt(a, c) {
    if (r) {
      const m = { [a]: c };
      for (const _ in m)
        je(m, _) && vn(m[_]);
      c = m[a];
    }
    u.value[a] = c, $.messages = u.value;
  }
  function rt(a, c) {
    u.value[a] = u.value[a] || {};
    const m = { [a]: c };
    if (r)
      for (const _ in m)
        je(m, _) && vn(m[_]);
    c = m[a], In(c, u.value[a]), $.messages = u.value;
  }
  function rn(a) {
    return b.value[a] || {};
  }
  function g(a, c) {
    b.value[a] = c, $.datetimeFormats = b.value, io($, a, c);
  }
  function y(a, c) {
    b.value[a] = Pe(b.value[a] || {}, c), $.datetimeFormats = b.value, io($, a, c);
  }
  function R(a) {
    return v.value[a] || {};
  }
  function Y(a, c) {
    v.value[a] = c, $.numberFormats = v.value, ro($, a, c);
  }
  function _e(a, c) {
    v.value[a] = Pe(v.value[a] || {}, c), $.numberFormats = v.value, ro($, a, c);
  }
  mo++, t && Mn && (Ue(t.locale, (a) => {
    l && (d.value = a, $.locale = a, sn($, d.value, f.value));
  }), Ue(t.fallbackLocale, (a) => {
    l && (f.value = a, $.fallbackLocale = a, sn($, d.value, f.value));
  }));
  const i = {
    id: mo,
    locale: U,
    fallbackLocale: ae,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(a) {
      l = a, a && t && (d.value = t.locale.value, f.value = t.fallbackLocale.value, sn($, d.value, f.value));
    },
    get availableLocales() {
      return Object.keys(u.value).sort();
    },
    messages: K,
    get modifiers() {
      return D;
    },
    get pluralRules() {
      return q || {};
    },
    get isGlobal() {
      return o;
    },
    get missingWarn() {
      return h;
    },
    set missingWarn(a) {
      h = a, $.missingWarn = h;
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
    getLocaleMessage: we,
    setLocaleMessage: pt,
    mergeLocaleMessage: rt,
    getPostTranslationHandler: Oe,
    setPostTranslationHandler: me,
    getMissingHandler: ie,
    setMissingHandler: Re,
    [fr]: mt
  };
  return i.datetimeFormats = Te, i.numberFormats = be, i.rt = Ht, i.te = ht, i.tm = Lt, i.d = Qt, i.n = Wt, i.getDateTimeFormat = rn, i.setDateTimeFormat = g, i.mergeDateTimeFormat = y, i.getNumberFormat = R, i.setNumberFormat = Y, i.mergeNumberFormat = _e, i[mr] = n, i[ui] = tn, i[di] = nn, i[fi] = Ut, i;
}
function Gs(e) {
  const t = W(e.locale) ? e.locale : gn, n = W(e.fallbackLocale) || Ee(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, o = ve(e.missing) ? e.missing : void 0, r = se(e.silentTranslationWarn) || Jt(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, s = se(e.silentFallbackWarn) || Jt(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, l = se(e.fallbackRoot) ? e.fallbackRoot : !0, d = !!e.formatFallbackMessages, f = Q(e.modifiers) ? e.modifiers : {}, u = e.pluralizationRules, b = ve(e.postTranslation) ? e.postTranslation : void 0, v = W(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, h = !!e.escapeParameterHtml, x = se(e.sync) ? e.sync : !0;
  let k = e.messages;
  if (Q(e.sharedMessages)) {
    const D = e.sharedMessages;
    k = Object.keys(D).reduce(($, J) => {
      const G = $[J] || ($[J] = {});
      return Pe(G, D[J]), $;
    }, k || {});
  }
  const { __i18n: S, __root: P, __injectWithOption: p } = e, T = e.datetimeFormats, I = e.numberFormats, E = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: k,
    flatJson: E,
    datetimeFormats: T,
    numberFormats: I,
    missing: o,
    missingWarn: r,
    fallbackWarn: s,
    fallbackRoot: l,
    fallbackFormat: d,
    modifiers: f,
    pluralRules: u,
    postTranslation: b,
    warnHtmlMessage: v,
    escapeParameter: h,
    messageResolver: e.messageResolver,
    inheritLocale: x,
    __i18n: S,
    __root: P,
    __injectWithOption: p
  };
}
function hi(e = {}) {
  const t = Oi(Gs(e)), { __extender: n } = e, o = {
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
      return se(t.missingWarn) ? !t.missingWarn : t.missingWarn;
    },
    set silentTranslationWarn(r) {
      t.missingWarn = se(r) ? !r : r;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return se(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn;
    },
    set silentFallbackWarn(r) {
      t.fallbackWarn = se(r) ? !r : r;
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
  return o.__extender = n, o;
}
function Ks(e, t, n) {
  return {
    beforeCreate() {
      const o = Kt();
      if (!o)
        throw ze(qe.UNEXPECTED_ERROR);
      const r = this.$options;
      if (r.i18n) {
        const s = r.i18n;
        if (r.__i18n && (s.__i18n = r.__i18n), s.__root = t, this === this.$root)
          this.$i18n = po(e, s);
        else {
          s.__injectWithOption = !0, s.__extender = n.__vueI18nExtend, this.$i18n = hi(s);
          const l = this.$i18n;
          l.__extender && (l.__disposer = l.__extender(this.$i18n));
        }
      } else if (r.__i18n)
        if (this === this.$root)
          this.$i18n = po(e, r);
        else {
          this.$i18n = hi({
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
      r.__i18nGlobal && pr(t, r, r), this.$t = (...s) => this.$i18n.t(...s), this.$rt = (...s) => this.$i18n.rt(...s), this.$te = (s, l) => this.$i18n.te(s, l), this.$d = (...s) => this.$i18n.d(...s), this.$n = (...s) => this.$i18n.n(...s), this.$tm = (s) => this.$i18n.tm(s), n.__setInstance(o, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const o = Kt();
      if (!o)
        throw ze(qe.UNEXPECTED_ERROR);
      const r = this.$i18n;
      delete this.$t, delete this.$rt, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, r.__disposer && (r.__disposer(), delete r.__disposer, delete r.__extender), n.__deleteInstance(o), delete this.$i18n;
    }
  };
}
function po(e, t) {
  e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[fr](t.pluralizationRules || e.pluralizationRules);
  const n = Li(e.locale, {
    messages: t.messages,
    __i18n: t.__i18n
  });
  return Object.keys(n).forEach((o) => e.mergeLocaleMessage(o, n[o])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((o) => e.mergeDateTimeFormat(o, t.datetimeFormats[o])), t.numberFormats && Object.keys(t.numberFormats).forEach((o) => e.mergeNumberFormat(o, t.numberFormats[o])), e;
}
const $i = {
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
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((o, r) => [
    ...o,
    // prettier-ignore
    ...r.type === de ? r.children : [r]
  ], []) : t.reduce((n, o) => {
    const r = e[o];
    return r && (n[o] = r()), n;
  }, fe());
}
function gr() {
  return de;
}
const Zs = /* @__PURE__ */ qt({
  /* eslint-disable */
  name: "i18n-t",
  props: Pe({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: (e) => Se(e) || !isNaN(e)
    }
  }, $i),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: o } = t, r = e.i18n || Ae({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const s = Object.keys(n).filter((v) => v !== "_"), l = fe();
      e.locale && (l.locale = e.locale), e.plural !== void 0 && (l.plural = W(e.plural) ? +e.plural : e.plural);
      const d = Js(t, s), f = r[ui](e.keypath, d, l), u = Pe(fe(), o), b = W(e.tag) || le(e.tag) ? e.tag : gr();
      return Ho(b, u, f);
    };
  }
}), go = Zs;
function Qs(e) {
  return Ee(e) && !W(e[0]);
}
function vr(e, t, n, o) {
  const { slots: r, attrs: s } = t;
  return () => {
    const l = { part: !0 };
    let d = fe();
    e.locale && (l.locale = e.locale), W(e.format) ? l.key = e.format : le(e.format) && (W(e.format.key) && (l.key = e.format.key), d = Object.keys(e.format).reduce((h, x) => n.includes(x) ? Pe(fe(), h, { [x]: e.format[x] }) : h, fe()));
    const f = o(e.value, l, d);
    let u = [l.key];
    Ee(f) ? u = f.map((h, x) => {
      const k = r[h.type], S = k ? k({ [h.type]: h.value, index: x, parts: f }) : [h.value];
      return Qs(S) && (S[0].key = `${h.type}-${x}`), S;
    }) : W(f) && (u = [f]);
    const b = Pe(fe(), s), v = W(e.tag) || le(e.tag) ? e.tag : gr();
    return Ho(v, b, u);
  };
}
const el = /* @__PURE__ */ qt({
  /* eslint-disable */
  name: "i18n-n",
  props: Pe({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, $i),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Ae({
      useScope: e.scope,
      __useComponent: !0
    });
    return vr(e, t, cr, (...o) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[fi](...o)
    ));
  }
}), vo = el;
function tl(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const o = n.__getInstance(t);
    return o != null ? o.__composer : e.global.__composer;
  }
}
function nl(e) {
  const t = (l) => {
    const { instance: d, value: f } = l;
    if (!d || !d.$)
      throw ze(qe.UNEXPECTED_ERROR);
    const u = tl(e, d.$), b = yo(f);
    return [
      Reflect.apply(u.t, u, [..._o(b)]),
      u
    ];
  };
  return {
    created: (l, d) => {
      const [f, u] = t(d);
      Mn && e.global === u && (l.__i18nWatcher = Ue(u.locale, () => {
        d.instance && d.instance.$forceUpdate();
      })), l.__composer = u, l.textContent = f;
    },
    unmounted: (l) => {
      Mn && l.__i18nWatcher && (l.__i18nWatcher(), l.__i18nWatcher = void 0, delete l.__i18nWatcher), l.__composer && (l.__composer = void 0, delete l.__composer);
    },
    beforeUpdate: (l, { value: d }) => {
      if (l.__composer) {
        const f = l.__composer, u = yo(d);
        l.textContent = Reflect.apply(f.t, f, [
          ..._o(u)
        ]);
      }
    },
    getSSRProps: (l) => {
      const [d] = t(l);
      return { textContent: d };
    }
  };
}
function yo(e) {
  if (W(e))
    return { path: e };
  if (Q(e)) {
    if (!("path" in e))
      throw ze(qe.REQUIRED_VALUE, "path");
    return e;
  } else
    throw ze(qe.INVALID_VALUE);
}
function _o(e) {
  const { path: t, locale: n, args: o, choice: r, plural: s } = e, l = {}, d = o || {};
  return W(n) && (l.locale = n), Se(r) && (l.plural = r), Se(s) && (l.plural = s), [t, d, l];
}
function il(e, t, ...n) {
  const o = Q(n[0]) ? n[0] : {};
  (se(o.globalInstall) ? o.globalInstall : !0) && ([go.name, "I18nT"].forEach((s) => e.component(s, go)), [vo.name, "I18nN"].forEach((s) => e.component(s, vo)), [wo.name, "I18nD"].forEach((s) => e.component(s, wo))), e.directive("t", nl(t));
}
const ol = /* @__PURE__ */ Ct("global-vue-i18n");
function rl(e = {}) {
  const t = __VUE_I18N_LEGACY_API__ && se(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, n = se(e.globalInjection) ? e.globalInjection : !0, o = /* @__PURE__ */ new Map(), [r, s] = al(e, t), l = /* @__PURE__ */ Ct("");
  function d(v) {
    return o.get(v) || null;
  }
  function f(v, h) {
    o.set(v, h);
  }
  function u(v) {
    o.delete(v);
  }
  const b = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && t ? "legacy" : "composition";
    },
    // install plugin
    async install(v, ...h) {
      if (v.__VUE_I18N_SYMBOL__ = l, v.provide(v.__VUE_I18N_SYMBOL__, b), Q(h[0])) {
        const S = h[0];
        b.__composerExtend = S.__composerExtend, b.__vueI18nExtend = S.__vueI18nExtend;
      }
      let x = null;
      !t && n && (x = hl(v, b.global)), __VUE_I18N_FULL_INSTALL__ && il(v, b, ...h), __VUE_I18N_LEGACY_API__ && t && v.mixin(Ks(s, s.__composer, b));
      const k = v.unmount;
      v.unmount = () => {
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
    __instances: o,
    // @internal
    __getInstance: d,
    // @internal
    __setInstance: f,
    // @internal
    __deleteInstance: u
  };
  return b;
}
function Ae(e = {}) {
  const t = Kt();
  if (t == null)
    throw ze(qe.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw ze(qe.NOT_INSTALLED);
  const n = sl(t), o = cl(n), r = hr(t), s = ll(e, r);
  if (s === "global")
    return pr(o, e, r), o;
  if (s === "parent") {
    let f = ul(n, t, e.__useComponent);
    return f == null && (f = o), f;
  }
  const l = n;
  let d = l.__getInstance(t);
  if (d == null) {
    const f = Pe({}, e);
    "__i18n" in r && (f.__i18n = r.__i18n), o && (f.__root = o), d = Oi(f), l.__composerExtend && (d[mi] = l.__composerExtend(d)), fl(l, t, d), l.__setInstance(t, d);
  }
  return d;
}
function al(e, t) {
  const n = Ur(), o = __VUE_I18N_LEGACY_API__ && t ? n.run(() => hi(e)) : n.run(() => Oi(e));
  if (o == null)
    throw ze(qe.UNEXPECTED_ERROR);
  return [n, o];
}
function sl(e) {
  const t = ft(e.isCE ? ol : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw ze(e.isCE ? qe.NOT_INSTALLED_WITH_PROVIDE : qe.UNEXPECTED_ERROR);
  return t;
}
function ll(e, t) {
  return Vn(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function cl(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function ul(e, t, n = !1) {
  let o = null;
  const r = t.root;
  let s = dl(t, n);
  for (; s != null; ) {
    const l = e;
    if (e.mode === "composition")
      o = l.__getInstance(s);
    else if (__VUE_I18N_LEGACY_API__) {
      const d = l.__getInstance(s);
      d != null && (o = d.__composer, n && o && !o[mr] && (o = null));
    }
    if (o != null || r === s)
      break;
    s = s.parent;
  }
  return o;
}
function dl(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function fl(e, t, n) {
  Bt(() => {
  }, t), Wn(() => {
    const o = n;
    e.__deleteInstance(t);
    const r = o[mi];
    r && (r(), delete o[mi]);
  }, t);
}
const ml = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], bo = ["t", "rt", "d", "n", "tm", "te"];
function hl(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return ml.forEach((r) => {
    const s = Object.getOwnPropertyDescriptor(t, r);
    if (!s)
      throw ze(qe.UNEXPECTED_ERROR);
    const l = jr(s.value) ? {
      get() {
        return s.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(d) {
        s.value.value = d;
      }
    } : {
      get() {
        return s.get && s.get();
      }
    };
    Object.defineProperty(n, r, l);
  }), e.config.globalProperties.$i18n = n, bo.forEach((r) => {
    const s = Object.getOwnPropertyDescriptor(t, r);
    if (!s || !s.value)
      throw ze(qe.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${r}`, s);
  }), () => {
    delete e.config.globalProperties.$i18n, bo.forEach((r) => {
      delete e.config.globalProperties[`$${r}`];
    });
  };
}
const pl = /* @__PURE__ */ qt({
  /* eslint-disable */
  name: "i18n-d",
  props: Pe({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, $i),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Ae({
      useScope: e.scope,
      __useComponent: !0
    });
    return vr(e, t, lr, (...o) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[di](...o)
    ));
  }
}), wo = pl;
Ys();
Ts(rs);
Ss(ws);
Es(nr);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = Nt();
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
    customerRequest: {
      title: "Customer request",
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
      customerRequest: "Your request",
      hotelInfo: {
        title: "Contact Information",
        email: "Email"
      },
      payment: {
        action: "Pay Now",
        prepayment: "Prepayment"
      }
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
    const n = e > 10 && e < 20, o = e % 10 === 1;
    return t < 4 ? !n && o ? 1 : 2 : !n && o ? 1 : !n && e % 10 >= 2 && e % 10 <= 4 || t < 4 ? 2 : 3;
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
}), Fn = rl({
  legacy: !1,
  fallbackLocale: "en",
  locale: "en",
  messages: gl,
  pluralizationRules: vl()
}), cn = "choose_accommodation", yr = "empty_cart", Nn = "booking_confirmation", xo = "reservation_details", ei = "cancel_reservation", xn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, yl = {}, _l = { class: "information-block" };
function bl(e, t) {
  return C(), F("section", _l, [
    ge(e.$slots, "default")
  ]);
}
const Ge = /* @__PURE__ */ xn(yl, [["render", bl]]), wl = {}, xl = { class: "divider" };
function kl(e, t) {
  return C(), F("div", xl);
}
const Ce = /* @__PURE__ */ xn(wl, [["render", kl]]), Tl = { class: "header" }, Sl = { class: "content" }, El = { class: "amenities" }, Cl = { class: "footer" }, kn = {
  __name: "BflexSkeletonLoader",
  props: {
    isResult: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (C(), re(Ge, {
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
              (C(), F(de, null, Le(5, (o) => w("div", {
                key: o,
                class: "amenity-item"
              })), 64))
            ])
          ])
        ]),
        N(Ce),
        w("div", Cl, [
          n[4] || (n[4] = w("div", { class: "option-header" }, [
            w("div", { class: "option-title" }),
            w("div", { class: "option-value" })
          ], -1)),
          N(Ce),
          (C(), F(de, null, Le(2, (o) => w("div", {
            key: o,
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
  const o = { day: "numeric", month: "short" }, r = { day: "numeric", month: "short", year: "numeric" }, s = new Date(e), l = new Date(t), d = s.getFullYear() === l.getFullYear() && s.getMonth() === l.getMonth(), f = s.getFullYear() === l.getFullYear();
  return d ? `${s.toLocaleDateString(n, o)} — ${l.toLocaleDateString(n, o)} ${l.getFullYear()}` : f ? `${s.toLocaleDateString(n, o)} — ${l.toLocaleDateString(n, o)} ${l.getFullYear()}` : `${s.toLocaleDateString(n, r)} — ${l.toLocaleDateString(n, r)}`;
}
function _r(e, t, n = "nights") {
  const o = new Date(e), l = (new Date(t) - o) / (1e3 * 60 * 60 * 24);
  if (n === "nights")
    return l;
  if (n === "days")
    return l + 1;
  throw new Error('Invalid unit. Use "nights" or "days".');
}
function Al(e, t, n = 60) {
  const o = [], [r, s] = e.split(":").map(Number), [l, d] = t.split(":").map(Number), f = /* @__PURE__ */ new Date();
  f.setHours(r, s, 0, 0);
  const u = /* @__PURE__ */ new Date();
  u.setHours(l, d, 0, 0);
  const b = new Date(f);
  for (; b <= u; ) {
    const v = b.getHours().toString().padStart(2, "0"), h = b.getMinutes().toString().padStart(2, "0");
    o.push(`${v}:${h}`), b.setMinutes(b.getMinutes() + n);
  }
  return o;
}
function Ll(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Rn = { exports: {} }, Ol = Rn.exports, ko;
function $l() {
  return ko || (ko = 1, function(e, t) {
    (function(n, o) {
      e.exports = o();
    })(Ol, function() {
      function n(i, a) {
        if (!(i instanceof a)) throw new TypeError("Cannot call a class as a function");
      }
      function o(i, a) {
        for (var c = 0; c < a.length; c++) {
          var m = a[c];
          m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(i, s(m.key), m);
        }
      }
      function r(i, a, c) {
        return a && o(i.prototype, a), Object.defineProperty(i, "prototype", { writable: !1 }), i;
      }
      function s(i) {
        var a = function(c, m) {
          if (typeof c != "object" || !c) return c;
          var _ = c[Symbol.toPrimitive];
          if (_ !== void 0) {
            var A = _.call(c, m);
            if (typeof A != "object") return A;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(c);
        }(i, "string");
        return typeof a == "symbol" ? a : a + "";
      }
      function l(i) {
        return (l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
          return typeof a;
        } : function(a) {
          return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
        })(i);
      }
      var d = Date.now();
      function f() {
        var i = {}, a = !0, c = 0, m = arguments.length;
        Object.prototype.toString.call(arguments[0]) === "[object Boolean]" && (a = arguments[0], c++);
        for (var _ = function(L) {
          for (var O in L) Object.prototype.hasOwnProperty.call(L, O) && (a && Object.prototype.toString.call(L[O]) === "[object Object]" ? i[O] = f(!0, i[O], L[O]) : i[O] = L[O]);
        }; c < m; c++) {
          var A = arguments[c];
          _(A);
        }
        return i;
      }
      function u(i, a) {
        if ((K(i) || i === window || i === document) && (i = [i]), be(i) || Oe(i) || (i = [i]), Re(i) != 0) {
          if (be(i) && !Oe(i)) for (var c = i.length, m = 0; m < c && a.call(i[m], i[m], m, i) !== !1; m++) ;
          else if (Oe(i)) {
            for (var _ in i) if (ie(i, _) && a.call(i[_], i[_], _, i) === !1) break;
          }
        }
      }
      function b(i) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, m = i[d] = i[d] || [], _ = { all: m, evt: null, found: null };
        return a && c && Re(m) > 0 && u(m, function(A, L) {
          if (A.eventName == a && A.fn.toString() == c.toString()) return _.found = !0, _.evt = L, !1;
        }), _;
      }
      function v(i) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = a.onElement, m = a.withCallback, _ = a.avoidDuplicate, A = _ === void 0 || _, L = a.once, O = L !== void 0 && L, V = a.useCapture, H = V !== void 0 && V, j = arguments.length > 2 ? arguments[2] : void 0, X = c || [];
        function Z(ee) {
          U(m) && m.call(j, ee, this), O && Z.destroy();
        }
        return ae(X) && (X = document.querySelectorAll(X)), Z.destroy = function() {
          u(X, function(ee) {
            var ne = b(ee, i, Z);
            ne.found && ne.all.splice(ne.evt, 1), ee.removeEventListener && ee.removeEventListener(i, Z, H);
          });
        }, u(X, function(ee) {
          var ne = b(ee, i, Z);
          (ee.addEventListener && A && !ne.found || !A) && (ee.addEventListener(i, Z, H), ne.all.push({ eventName: i, fn: Z }));
        }), Z;
      }
      function h(i, a) {
        u(a.split(" "), function(c) {
          return i.classList.add(c);
        });
      }
      function x(i, a) {
        u(a.split(" "), function(c) {
          return i.classList.remove(c);
        });
      }
      function k(i, a) {
        return i.classList.contains(a);
      }
      function S(i, a) {
        for (; i !== document.body; ) {
          if (!(i = i.parentElement)) return !1;
          if (typeof i.matches == "function" ? i.matches(a) : i.msMatchesSelector(a)) return i;
        }
      }
      function P(i) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!i || a === "") return !1;
        if (a === "none") return U(c) && c(), !1;
        var m = q(), _ = a.split(" ");
        u(_, function(A) {
          h(i, "g" + A);
        }), v(m, { onElement: i, avoidDuplicate: !1, once: !0, withCallback: function(A, L) {
          u(_, function(O) {
            x(L, "g" + O);
          }), U(c) && c();
        } });
      }
      function p(i) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        if (a === "") return i.style.webkitTransform = "", i.style.MozTransform = "", i.style.msTransform = "", i.style.OTransform = "", i.style.transform = "", !1;
        i.style.webkitTransform = a, i.style.MozTransform = a, i.style.msTransform = a, i.style.OTransform = a, i.style.transform = a;
      }
      function T(i) {
        i.style.display = "block";
      }
      function I(i) {
        i.style.display = "none";
      }
      function E(i) {
        var a = document.createDocumentFragment(), c = document.createElement("div");
        for (c.innerHTML = i; c.firstChild; ) a.appendChild(c.firstChild);
        return a;
      }
      function D() {
        return { width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight };
      }
      function q() {
        var i, a = document.createElement("fakeelement"), c = { animation: "animationend", OAnimation: "oAnimationEnd", MozAnimation: "animationend", WebkitAnimation: "webkitAnimationEnd" };
        for (i in c) if (a.style[i] !== void 0) return c[i];
      }
      function $(i, a, c, m) {
        if (i()) a();
        else {
          var _;
          c || (c = 100);
          var A = setInterval(function() {
            i() && (clearInterval(A), _ && clearTimeout(_), a());
          }, c);
        }
      }
      function J(i, a, c) {
        if (me(i)) console.error("Inject assets error");
        else if (U(a) && (c = a, a = !1), ae(a) && a in window) U(c) && c();
        else {
          var m;
          if (i.indexOf(".css") !== -1) {
            if ((m = document.querySelectorAll('link[href="' + i + '"]')) && m.length > 0) return void (U(c) && c());
            var _ = document.getElementsByTagName("head")[0], A = _.querySelectorAll('link[rel="stylesheet"]'), L = document.createElement("link");
            return L.rel = "stylesheet", L.type = "text/css", L.href = i, L.media = "all", A ? _.insertBefore(L, A[0]) : _.appendChild(L), void (U(c) && c());
          }
          if ((m = document.querySelectorAll('script[src="' + i + '"]')) && m.length > 0) {
            if (U(c)) {
              if (ae(a)) return $(function() {
                return window[a] !== void 0;
              }, function() {
                c();
              }), !1;
              c();
            }
          } else {
            var O = document.createElement("script");
            O.type = "text/javascript", O.src = i, O.onload = function() {
              if (U(c)) {
                if (ae(a)) return $(function() {
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
      function U(i) {
        return typeof i == "function";
      }
      function ae(i) {
        return typeof i == "string";
      }
      function K(i) {
        return !(!i || !i.nodeType || i.nodeType != 1);
      }
      function Te(i) {
        return Array.isArray(i);
      }
      function be(i) {
        return i && i.length && isFinite(i.length);
      }
      function Oe(i) {
        return l(i) === "object" && i != null && !U(i) && !Te(i);
      }
      function me(i) {
        return i == null;
      }
      function ie(i, a) {
        return i !== null && hasOwnProperty.call(i, a);
      }
      function Re(i) {
        if (Oe(i)) {
          if (i.keys) return i.keys().length;
          var a = 0;
          for (var c in i) ie(i, c) && a++;
          return a;
        }
        return i.length;
      }
      function ye(i) {
        return !isNaN(parseFloat(i)) && isFinite(i);
      }
      function ot() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1, a = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
        if (!a.length) return !1;
        if (a.length == 1) return a[0];
        typeof i == "string" && (i = parseInt(i));
        var c = [];
        u(a, function(O) {
          c.push(O.getAttribute("data-taborder"));
        });
        var m = Math.max.apply(Math, c.map(function(O) {
          return parseInt(O);
        })), _ = i < 0 ? 1 : i + 1;
        _ > m && (_ = "1");
        var A = c.filter(function(O) {
          return O >= parseInt(_);
        }), L = A.sort()[0];
        return document.querySelector('.gbtn[data-taborder="'.concat(L, '"]'));
      }
      function Ht(i) {
        if (i.events.hasOwnProperty("keyboard")) return !1;
        i.events.keyboard = v("keydown", { onElement: window, withCallback: function(a, c) {
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
              return void (O && (O.focus(), h(O, "focused")));
            }
            var V = ot(_.getAttribute("data-taborder"));
            x(_, "focused"), V && (V.focus(), h(V, "focused"));
          }
          m == 39 && i.nextSlide(), m == 37 && i.prevSlide(), m == 27 && i.close();
        } });
      }
      var Qt = r(function i(a, c) {
        var m = this, _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        if (n(this, i), this.img = a, this.slide = c, this.onclose = _, this.img.setZoomEvents) return !1;
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
        var i = this.widowWidth();
        if (!(this.zoomedIn || i <= 768)) {
          var a = this.img;
          if (a.setAttribute("data-style", a.getAttribute("style")), a.style.maxWidth = a.naturalWidth + "px", a.style.maxHeight = a.naturalHeight + "px", a.naturalWidth > i) {
            var c = i / 2 - a.naturalWidth / 2;
            this.setTranslate(this.img.parentNode, c, 0);
          }
          this.slide.classList.add("zoomed"), this.zoomedIn = !0;
        }
      } }, { key: "zoomOut", value: function() {
        this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && typeof this.onclose == "function" && this.onclose();
      } }, { key: "dragStart", value: function(i) {
        i.preventDefault(), this.zoomedIn ? (i.type === "touchstart" ? (this.initialX = i.touches[0].clientX - this.xOffset, this.initialY = i.touches[0].clientY - this.yOffset) : (this.initialX = i.clientX - this.xOffset, this.initialY = i.clientY - this.yOffset), i.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1;
      } }, { key: "dragEnd", value: function(i) {
        var a = this;
        i.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(function() {
          a.dragging = !1, a.img.isDragging = !1, a.img.classList.remove("dragging");
        }, 100);
      } }, { key: "drag", value: function(i) {
        this.active && (i.preventDefault(), i.type === "touchmove" ? (this.currentX = i.touches[0].clientX - this.initialX, this.currentY = i.touches[0].clientY - this.initialY) : (this.currentX = i.clientX - this.initialX, this.currentY = i.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY));
      } }, { key: "onMove", value: function(i) {
        if (this.zoomedIn) {
          var a = i.clientX - this.img.naturalWidth / 2, c = i.clientY - this.img.naturalHeight / 2;
          this.setTranslate(this.img, a, c);
        }
      } }, { key: "setTranslate", value: function(i, a, c) {
        i.style.transform = "translate3d(" + a + "px, " + c + "px, 0)";
      } }, { key: "widowWidth", value: function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      } }]), Wt = r(function i() {
        var a = this, c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i);
        var m = c.dragEl, _ = c.toleranceX, A = _ === void 0 ? 40 : _, L = c.toleranceY, O = L === void 0 ? 65 : L, V = c.slide, H = V === void 0 ? null : V, j = c.instance, X = j === void 0 ? null : j;
        this.el = m, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = A, this.toleranceY = O, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = H, this.instance = X, this.el.addEventListener("mousedown", function(Z) {
          return a.dragStart(Z);
        }, !1), this.el.addEventListener("mouseup", function(Z) {
          return a.dragEnd(Z);
        }, !1), this.el.addEventListener("mousemove", function(Z) {
          return a.drag(Z);
        }, !1);
      }, [{ key: "dragStart", value: function(i) {
        if (this.slide.classList.contains("zoomed")) this.active = !1;
        else {
          i.type === "touchstart" ? (this.initialX = i.touches[0].clientX - this.xOffset, this.initialY = i.touches[0].clientY - this.yOffset) : (this.initialX = i.clientX - this.xOffset, this.initialY = i.clientY - this.yOffset);
          var a = i.target.nodeName.toLowerCase();
          i.target.classList.contains("nodrag") || S(i.target, ".nodrag") || ["input", "select", "textarea", "button", "a"].indexOf(a) !== -1 ? this.active = !1 : (i.preventDefault(), (i.target === this.el || a !== "img" && S(i.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = S(i.target, ".ginner-container")));
        }
      } }, { key: "dragEnd", value: function(i) {
        var a = this;
        i && i.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, this.doSlideChange == "right" && this.instance.prevSlide(), this.doSlideChange == "left" && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout(function() {
          a.instance.preventOutsideClick = !1, a.toleranceReached = !1, a.lastDirection = null, a.dragging = !1, a.el.isDragging = !1, a.el.classList.remove("dragging"), a.slide.classList.remove("dragging-nav"), a.dragContainer.style.transform = "", a.dragContainer.style.transition = "";
        }, 100);
      } }, { key: "drag", value: function(i) {
        if (this.active) {
          i.preventDefault(), this.slide.classList.add("dragging-nav"), i.type === "touchmove" ? (this.currentX = i.touches[0].clientX - this.initialX, this.currentY = i.touches[0].clientY - this.initialY) : (this.currentX = i.clientX - this.initialX, this.currentY = i.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
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
        var i = !1;
        if (Math.abs(this.currentX) >= this.toleranceX) {
          var a = this.currentX > 0 ? "right" : "left";
          (a == "left" && this.slide !== this.slide.parentNode.lastChild || a == "right" && this.slide !== this.slide.parentNode.firstChild) && (i = a);
        }
        return i;
      } }, { key: "shouldClose", value: function() {
        var i = !1;
        return Math.abs(this.currentY) >= this.toleranceY && (i = !0), i;
      } }, { key: "setTranslate", value: function(i, a, c) {
        var m = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
        i.style.transition = m ? "all .2s ease" : "", i.style.transform = "translate3d(".concat(a, "px, ").concat(c, "px, 0)");
      } }]);
      function en(i, a, c, m) {
        var _ = i.querySelector(".gslide-media"), A = new Image(), L = "gSlideTitle_" + c, O = "gSlideDesc_" + c;
        A.addEventListener("load", function() {
          U(m) && m();
        }, !1), A.src = a.href, a.sizes != "" && a.srcset != "" && (A.sizes = a.sizes, A.srcset = a.srcset), A.alt = "", me(a.alt) || a.alt === "" || (A.alt = a.alt), a.title !== "" && A.setAttribute("aria-labelledby", L), a.description !== "" && A.setAttribute("aria-describedby", O), a.hasOwnProperty("_hasCustomWidth") && a._hasCustomWidth && (A.style.width = a.width), a.hasOwnProperty("_hasCustomHeight") && a._hasCustomHeight && (A.style.height = a.height), _.insertBefore(A, _.firstChild);
      }
      function Sn(i, a, c, m) {
        var _ = this, A = i.querySelector(".ginner-container"), L = "gvideo" + c, O = i.querySelector(".gslide-media"), V = this.getAllPlayers();
        h(A, "gvideo-container"), O.insertBefore(E('<div class="gvideo-wrapper"></div>'), O.firstChild);
        var H = i.querySelector(".gvideo-wrapper");
        J(this.settings.plyr.css, "Plyr");
        var j = a.href, X = a == null ? void 0 : a.videoProvider, Z = !1;
        O.style.maxWidth = a.width, J(this.settings.plyr.js, "Plyr", function() {
          if (!X && j.match(/vimeo\.com\/([0-9]*)/) && (X = "vimeo"), !X && (j.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || j.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/)) && (X = "youtube"), X === "local" || !X) {
            X = "local";
            var ee = '<video id="' + L + '" ';
            ee += 'style="background:#000; max-width: '.concat(a.width, ';" '), ee += 'preload="metadata" ', ee += 'x-webkit-airplay="allow" ', ee += "playsinline ", ee += "controls ", ee += 'class="gvideo-local">', ee += '<source src="'.concat(j, '">'), Z = E(ee += "</video>");
          }
          var ne = Z || E('<div id="'.concat(L, '" data-plyr-provider="').concat(X, '" data-plyr-embed-id="').concat(j, '"></div>'));
          h(H, "".concat(X, "-video gvideo")), H.appendChild(ne), H.setAttribute("data-id", L), H.setAttribute("data-index", c);
          var xe = ie(_.settings.plyr, "config") ? _.settings.plyr.config : {}, He = new Plyr("#" + L, xe);
          He.on("ready", function(Be) {
            V[L] = Be.detail.plyr, U(m) && m();
          }), $(function() {
            return i.querySelector("iframe") && i.querySelector("iframe").dataset.ready == "true";
          }, function() {
            _.resize(i);
          }), He.on("enterfullscreen", Vt), He.on("exitfullscreen", Vt);
        });
      }
      function Vt(i) {
        var a = S(i.target, ".gslide-media");
        i.type === "enterfullscreen" && h(a, "fullscreen"), i.type === "exitfullscreen" && x(a, "fullscreen");
      }
      function tn(i, a, c, m) {
        var _, A = this, L = i.querySelector(".gslide-media"), O = !(!ie(a, "href") || !a.href) && a.href.split("#").pop().trim(), V = !(!ie(a, "content") || !a.content) && a.content;
        if (V && (ae(V) && (_ = E('<div class="ginlined-content">'.concat(V, "</div>"))), K(V))) {
          V.style.display == "none" && (V.style.display = "block");
          var H = document.createElement("div");
          H.className = "ginlined-content", H.appendChild(V), _ = H;
        }
        if (O) {
          var j = document.getElementById(O);
          if (!j) return !1;
          var X = j.cloneNode(!0);
          X.style.height = a.height, X.style.maxWidth = a.width, h(X, "ginlined-content"), _ = X;
        }
        if (!_) return console.error("Unable to append inline slide content", a), !1;
        L.style.height = a.height, L.style.width = a.width, L.appendChild(_), this.events["inlineclose" + O] = v("click", { onElement: L.querySelectorAll(".gtrigger-close"), withCallback: function(Z) {
          Z.preventDefault(), A.close();
        } }), U(m) && m();
      }
      function Ut(i, a, c, m) {
        var _ = i.querySelector(".gslide-media"), A = function(L) {
          var O = L.url, V = L.allow, H = L.callback, j = L.appendTo, X = document.createElement("iframe");
          return X.className = "vimeo-video gvideo", X.src = O, X.style.width = "100%", X.style.height = "100%", V && X.setAttribute("allow", V), X.onload = function() {
            X.onload = null, h(X, "node-ready"), U(H) && H();
          }, j && j.appendChild(X), X;
        }({ url: a.href, callback: m });
        _.parentNode.style.maxWidth = a.width, _.parentNode.style.height = a.height, _.appendChild(A);
      }
      var nn = r(function i() {
        var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i), this.defaults = { href: "", sizes: "", srcset: "", title: "", type: "", videoProvider: "", description: "", alt: "", descPosition: "bottom", effect: "", width: "", height: "", content: !1, zoomable: !0, draggable: !0 }, Oe(a) && (this.defaults = f(this.defaults, a));
      }, [{ key: "sourceType", value: function(i) {
        var a = i;
        return (i = i.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) !== null ? "image" : i.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || i.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || i.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || i.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/) || i.match(/vimeo\.com\/([0-9]*)/) || i.match(/\.(mp4|ogg|webm|mov)/) !== null ? "video" : i.match(/\.(mp3|wav|wma|aac|ogg)/) !== null ? "audio" : i.indexOf("#") > -1 && a.split("#").pop().trim() !== "" ? "inline" : i.indexOf("goajax=true") > -1 ? "ajax" : "external";
      } }, { key: "parseConfig", value: function(i, a) {
        var c = this, m = f({ descPosition: a.descPosition }, this.defaults);
        if (Oe(i) && !K(i)) {
          ie(i, "type") || (ie(i, "content") && i.content ? i.type = "inline" : ie(i, "href") && (i.type = this.sourceType(i.href)));
          var _ = f(m, i);
          return this.setSize(_, a), _;
        }
        var A = "", L = i.getAttribute("data-glightbox"), O = i.nodeName.toLowerCase();
        if (O === "a" && (A = i.href), O === "img" && (A = i.src, m.alt = i.alt), m.href = A, u(m, function(ee, ne) {
          ie(a, ne) && ne !== "width" && (m[ne] = a[ne]);
          var xe = i.dataset[ne];
          me(xe) || (m[ne] = c.sanitizeValue(xe));
        }), m.content && (m.type = "inline"), !m.type && A && (m.type = this.sourceType(A)), me(L)) {
          if (!m.title && O == "a") {
            var V = i.title;
            me(V) || V === "" || (m.title = V);
          }
          if (!m.title && O == "img") {
            var H = i.alt;
            me(H) || H === "" || (m.title = H);
          }
        } else {
          var j = [];
          u(m, function(ee, ne) {
            j.push(";\\s?" + ne);
          }), j = j.join("\\s?:|"), L.trim() !== "" && u(m, function(ee, ne) {
            var xe = L, He = new RegExp("s?" + ne + "s?:s?(.*?)(" + j + "s?:|$)"), Be = xe.match(He);
            if (Be && Be.length && Be[1]) {
              var at = Be[1].trim().replace(/;\s*$/, "");
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
          var Z = i.querySelector(".glightbox-desc");
          Z && (m.description = Z.innerHTML);
        }
        return this.setSize(m, a, i), this.slideConfig = m, m;
      } }, { key: "setSize", value: function(i, a) {
        var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, m = i.type == "video" ? this.checkSize(a.videosWidth) : this.checkSize(a.width), _ = this.checkSize(a.height);
        return i.width = ie(i, "width") && i.width !== "" ? this.checkSize(i.width) : m, i.height = ie(i, "height") && i.height !== "" ? this.checkSize(i.height) : _, c && i.type == "image" && (i._hasCustomWidth = !!c.dataset.width, i._hasCustomHeight = !!c.dataset.height), i;
      } }, { key: "checkSize", value: function(i) {
        return ye(i) ? "".concat(i, "px") : i;
      } }, { key: "sanitizeValue", value: function(i) {
        return i !== "true" && i !== "false" ? i : i === "true";
      } }]), mt = r(function i(a, c, m) {
        n(this, i), this.element = a, this.instance = c, this.index = m;
      }, [{ key: "setContent", value: function() {
        var i = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (k(a, "loaded")) return !1;
        var m = this.instance.settings, _ = this.slideConfig, A = G();
        U(m.beforeSlideLoad) && m.beforeSlideLoad({ index: this.index, slide: a, player: !1 });
        var L = _.type, O = _.descPosition, V = a.querySelector(".gslide-media"), H = a.querySelector(".gslide-title"), j = a.querySelector(".gslide-desc"), X = a.querySelector(".gdesc-inner"), Z = c, ee = "gSlideTitle_" + this.index, ne = "gSlideDesc_" + this.index;
        if (U(m.afterSlideLoad) && (Z = function() {
          U(c) && c(), m.afterSlideLoad({ index: i.index, slide: a, player: i.instance.getSlidePlayerInstance(i.index) });
        }), _.title == "" && _.description == "" ? X && X.parentNode.parentNode.removeChild(X.parentNode) : (H && _.title !== "" ? (H.id = ee, H.innerHTML = _.title) : H.parentNode.removeChild(H), j && _.description !== "" ? (j.id = ne, A && m.moreLength > 0 ? (_.smallDescription = this.slideShortDesc(_.description, m.moreLength, m.moreText), j.innerHTML = _.smallDescription, this.descriptionEvents(j, _)) : j.innerHTML = _.description) : j.parentNode.removeChild(j), h(V.parentNode, "desc-".concat(O)), h(X.parentNode, "description-".concat(O))), h(V, "gslide-".concat(L)), h(a, "loaded"), L !== "video") {
          if (L !== "external") return L === "inline" ? (tn.apply(this.instance, [a, _, this.index, Z]), void (_.draggable && new Wt({ dragEl: a.querySelector(".gslide-inline"), toleranceX: m.dragToleranceX, toleranceY: m.dragToleranceY, slide: a, instance: this.instance }))) : void (L !== "image" ? U(Z) && Z() : en(a, _, this.index, function() {
            var xe = a.querySelector("img");
            _.draggable && new Wt({ dragEl: xe, toleranceX: m.dragToleranceX, toleranceY: m.dragToleranceY, slide: a, instance: i.instance }), _.zoomable && xe.naturalWidth > xe.offsetWidth && (h(xe, "zoomable"), new Qt(xe, a, function() {
              i.instance.resize();
            })), U(Z) && Z();
          }));
          Ut.apply(this, [a, _, this.index, Z]);
        } else Sn.apply(this.instance, [a, _, this.index, Z]);
      } }, { key: "slideShortDesc", value: function(i) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], m = document.createElement("div");
        m.innerHTML = i;
        var _ = m.innerText, A = c;
        if ((i = _.trim()).length <= a) return i;
        var L = i.substr(0, a - 1);
        return A ? (m = null, L + '... <a href="#" class="desc-more">' + c + "</a>") : L;
      } }, { key: "descriptionEvents", value: function(i, a) {
        var c = this, m = i.querySelector(".desc-more");
        if (!m) return !1;
        v("click", { onElement: m, withCallback: function(_, A) {
          _.preventDefault();
          var L = document.body, O = S(A, ".gslide-desc");
          if (!O) return !1;
          O.innerHTML = a.description, h(L, "gdesc-open");
          var V = v("click", { onElement: [L, S(O, ".gslide-description")], withCallback: function(H, j) {
            H.target.nodeName.toLowerCase() !== "a" && (x(L, "gdesc-open"), h(L, "gdesc-closed"), O.innerHTML = a.smallDescription, c.descriptionEvents(O, a), setTimeout(function() {
              x(L, "gdesc-closed");
            }, 400), V.destroy());
          } });
        } });
      } }, { key: "create", value: function() {
        return E(this.instance.settings.slideHTML);
      } }, { key: "getConfig", value: function() {
        K(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
        var i = new nn(this.instance.settings.slideExtraAttributes);
        return this.slideConfig = i.parseConfig(this.element, this.instance.settings), this.slideConfig;
      } }]);
      function ht(i) {
        return Math.sqrt(i.x * i.x + i.y * i.y);
      }
      function on(i, a) {
        var c = function(m, _) {
          var A = ht(m) * ht(_);
          if (A === 0) return 0;
          var L = function(O, V) {
            return O.x * V.x + O.y * V.y;
          }(m, _) / A;
          return L > 1 && (L = 1), Math.acos(L);
        }(i, a);
        return function(m, _) {
          return m.x * _.y - _.x * m.y;
        }(i, a) > 0 && (c *= -1), 180 * c / Math.PI;
      }
      var Lt = r(function i(a) {
        n(this, i), this.handlers = [], this.el = a;
      }, [{ key: "add", value: function(i) {
        this.handlers.push(i);
      } }, { key: "del", value: function(i) {
        i || (this.handlers = []);
        for (var a = this.handlers.length; a >= 0; a--) this.handlers[a] === i && this.handlers.splice(a, 1);
      } }, { key: "dispatch", value: function() {
        for (var i = 0, a = this.handlers.length; i < a; i++) {
          var c = this.handlers[i];
          typeof c == "function" && c.apply(this.el, arguments);
        }
      } }]);
      function we(i, a) {
        var c = new Lt(i);
        return c.add(a), c;
      }
      var pt = r(function i(a, c) {
        n(this, i), this.element = typeof a == "string" ? document.querySelector(a) : a, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = { x: null, y: null }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
        var m = function() {
        };
        this.rotate = we(this.element, c.rotate || m), this.touchStart = we(this.element, c.touchStart || m), this.multipointStart = we(this.element, c.multipointStart || m), this.multipointEnd = we(this.element, c.multipointEnd || m), this.pinch = we(this.element, c.pinch || m), this.swipe = we(this.element, c.swipe || m), this.tap = we(this.element, c.tap || m), this.doubleTap = we(this.element, c.doubleTap || m), this.longTap = we(this.element, c.longTap || m), this.singleTap = we(this.element, c.singleTap || m), this.pressMove = we(this.element, c.pressMove || m), this.twoFingerPressMove = we(this.element, c.twoFingerPressMove || m), this.touchMove = we(this.element, c.touchMove || m), this.touchEnd = we(this.element, c.touchEnd || m), this.touchCancel = we(this.element, c.touchCancel || m), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = { x: null, y: null };
      }, [{ key: "start", value: function(i) {
        if (i.touches) if (i.target && i.target.nodeName && ["a", "button", "input"].indexOf(i.target.nodeName.toLowerCase()) >= 0) console.log("ignore drag for this touched element", i.target.nodeName.toLowerCase());
        else {
          this.now = Date.now(), this.x1 = i.touches[0].pageX, this.y1 = i.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(i, this.element), this.preTapPosition.x !== null && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
          var a = this.preV;
          if (i.touches.length > 1) {
            this._cancelLongTap(), this._cancelSingleTap();
            var c = { x: i.touches[1].pageX - this.x1, y: i.touches[1].pageY - this.y1 };
            a.x = c.x, a.y = c.y, this.pinchStartLen = ht(a), this.multipointStart.dispatch(i, this.element);
          }
          this._preventTap = !1, this.longTapTimeout = setTimeout((function() {
            this.longTap.dispatch(i, this.element), this._preventTap = !0;
          }).bind(this), 750);
        }
      } }, { key: "move", value: function(i) {
        if (i.touches) {
          var a = this.preV, c = i.touches.length, m = i.touches[0].pageX, _ = i.touches[0].pageY;
          if (this.isDoubleTap = !1, c > 1) {
            var A = i.touches[1].pageX, L = i.touches[1].pageY, O = { x: i.touches[1].pageX - m, y: i.touches[1].pageY - _ };
            a.x !== null && (this.pinchStartLen > 0 && (i.zoom = ht(O) / this.pinchStartLen, this.pinch.dispatch(i, this.element)), i.angle = on(O, a), this.rotate.dispatch(i, this.element)), a.x = O.x, a.y = O.y, this.x2 !== null && this.sx2 !== null ? (i.deltaX = (m - this.x2 + A - this.sx2) / 2, i.deltaY = (_ - this.y2 + L - this.sy2) / 2) : (i.deltaX = 0, i.deltaY = 0), this.twoFingerPressMove.dispatch(i, this.element), this.sx2 = A, this.sy2 = L;
          } else {
            if (this.x2 !== null) {
              i.deltaX = m - this.x2, i.deltaY = _ - this.y2;
              var V = Math.abs(this.x1 - this.x2), H = Math.abs(this.y1 - this.y2);
              (V > 10 || H > 10) && (this._preventTap = !0);
            } else i.deltaX = 0, i.deltaY = 0;
            this.pressMove.dispatch(i, this.element);
          }
          this.touchMove.dispatch(i, this.element), this._cancelLongTap(), this.x2 = m, this.y2 = _, c > 1 && i.preventDefault();
        }
      } }, { key: "end", value: function(i) {
        if (i.changedTouches) {
          this._cancelLongTap();
          var a = this;
          i.touches.length < 2 && (this.multipointEnd.dispatch(i, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (i.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function() {
            a.swipe.dispatch(i, a.element);
          }, 0)) : (this.tapTimeout = setTimeout(function() {
            a._preventTap || a.tap.dispatch(i, a.element), a.isDoubleTap && (a.doubleTap.dispatch(i, a.element), a.isDoubleTap = !1);
          }, 0), a.isDoubleTap || (a.singleTapTimeout = setTimeout(function() {
            a.singleTap.dispatch(i, a.element);
          }, 250))), this.touchEnd.dispatch(i, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null;
        }
      } }, { key: "cancelAll", value: function() {
        this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout);
      } }, { key: "cancel", value: function(i) {
        this.cancelAll(), this.touchCancel.dispatch(i, this.element);
      } }, { key: "_cancelLongTap", value: function() {
        clearTimeout(this.longTapTimeout);
      } }, { key: "_cancelSingleTap", value: function() {
        clearTimeout(this.singleTapTimeout);
      } }, { key: "_swipeDirection", value: function(i, a, c, m) {
        return Math.abs(i - a) >= Math.abs(c - m) ? i - a > 0 ? "Left" : "Right" : c - m > 0 ? "Up" : "Down";
      } }, { key: "on", value: function(i, a) {
        this[i] && this[i].add(a);
      } }, { key: "off", value: function(i, a) {
        this[i] && this[i].del(a);
      } }, { key: "destroy", value: function() {
        return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
      } }]);
      function rt(i) {
        var a = function() {
          var L, O = document.createElement("fakeelement"), V = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
          for (L in V) if (O.style[L] !== void 0) return V[L];
        }(), c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, m = k(i, "gslide-media") ? i : i.querySelector(".gslide-media"), _ = S(m, ".ginner-container"), A = i.querySelector(".gslide-description");
        c > 769 && (m = _), h(m, "greset"), p(m, "translate3d(0, 0, 0)"), v(a, { onElement: m, once: !0, withCallback: function(L, O) {
          x(m, "greset");
        } }), m.style.opacity = "", A && (A.style.opacity = "");
      }
      function rn(i) {
        if (i.events.hasOwnProperty("touch")) return !1;
        var a, c, m, _ = D(), A = _.width, L = _.height, O = !1, V = null, H = null, j = null, X = !1, Z = 1, ee = 1, ne = !1, xe = !1, He = null, Be = null, at = null, Ne = null, st = 0, lt = 0, an = !1, Yt = !1, Ke = {}, Je = {}, Bi = 0, zi = 0, Br = document.getElementById("glightbox-slider"), En = document.querySelector(".goverlay"), zr = new pt(Br, { touchStart: function(he) {
          if (O = !0, (k(he.targetTouches[0].target, "ginner-container") || S(he.targetTouches[0].target, ".gslide-desc") || he.targetTouches[0].target.nodeName.toLowerCase() == "a") && (O = !1), S(he.targetTouches[0].target, ".gslide-inline") && !k(he.targetTouches[0].target.parentNode, "gslide-inline") && (O = !1), O) {
            if (Je = he.targetTouches[0], Ke.pageX = he.targetTouches[0].pageX, Ke.pageY = he.targetTouches[0].pageY, Bi = he.targetTouches[0].clientX, zi = he.targetTouches[0].clientY, V = i.activeSlide, H = V.querySelector(".gslide-media"), m = V.querySelector(".gslide-inline"), j = null, k(H, "gslide-image") && (j = H.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (H = V.querySelector(".ginner-container")), x(En, "greset"), he.pageX > 20 && he.pageX < window.innerWidth - 20) return;
            he.preventDefault();
          }
        }, touchMove: function(he) {
          if (O && (Je = he.targetTouches[0], !ne && !xe)) {
            if (m && m.offsetHeight > L) {
              var De = Ke.pageX - Je.pageX;
              if (Math.abs(De) <= 13) return !1;
            }
            X = !0;
            var gt, Cn = he.targetTouches[0].clientX, Hr = he.targetTouches[0].clientY, Wr = Bi - Cn, Vr = zi - Hr;
            if (Math.abs(Wr) > Math.abs(Vr) ? (an = !1, Yt = !0) : (Yt = !1, an = !0), a = Je.pageX - Ke.pageX, st = 100 * a / A, c = Je.pageY - Ke.pageY, lt = 100 * c / L, an && j && (gt = 1 - Math.abs(c) / L, En.style.opacity = gt, i.settings.touchFollowAxis && (st = 0)), Yt && (gt = 1 - Math.abs(a) / A, H.style.opacity = gt, i.settings.touchFollowAxis && (lt = 0)), !j) return p(H, "translate3d(".concat(st, "%, 0, 0)"));
            p(H, "translate3d(".concat(st, "%, ").concat(lt, "%, 0)"));
          }
        }, touchEnd: function() {
          if (O) {
            if (X = !1, xe || ne) return at = He, void (Ne = Be);
            var he = Math.abs(parseInt(lt)), De = Math.abs(parseInt(st));
            if (!(he > 29 && j)) return he < 29 && De < 25 ? (h(En, "greset"), En.style.opacity = 1, rt(H)) : void 0;
            i.close();
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
          if (xe = !0, De <= 1) return xe = !1, De = 1, Ne = null, at = null, He = null, Be = null, void j.setAttribute("style", "");
          De > 4.5 && (De = 4.5), j.style.transform = "scale3d(".concat(De, ", ").concat(De, ", 1)"), ee = De;
        }, pressMove: function(he) {
          if (xe && !ne) {
            var De = Je.pageX - Ke.pageX, gt = Je.pageY - Ke.pageY;
            at && (De += at), Ne && (gt += Ne), He = De, Be = gt;
            var Cn = "translate3d(".concat(De, "px, ").concat(gt, "px, 0)");
            ee && (Cn += " scale3d(".concat(ee, ", ").concat(ee, ", 1)")), p(j, Cn);
          }
        }, swipe: function(he) {
          if (!xe) if (ne) ne = !1;
          else {
            if (he.direction == "Left") {
              if (i.index == i.elements.length - 1) return rt(H);
              i.nextSlide();
            }
            if (he.direction == "Right") {
              if (i.index == 0) return rt(H);
              i.prevSlide();
            }
          }
        } });
        i.events.touch = zr;
      }
      var g = G(), y = G() !== null || document.createTouch !== void 0 || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints, R = document.getElementsByTagName("html")[0], Y = { selector: ".glightbox", elements: null, skin: "clean", theme: "clean", closeButton: !0, startAt: null, autoplayVideos: !0, autofocusVideos: !0, descPosition: "bottom", width: "900px", height: "506px", videosWidth: "960px", beforeSlideChange: null, afterSlideChange: null, beforeSlideLoad: null, afterSlideLoad: null, slideInserted: null, slideRemoved: null, slideExtraAttributes: null, onOpen: null, onClose: null, loop: !1, zoomable: !0, draggable: !0, dragAutoSnap: !1, dragToleranceX: 40, dragToleranceY: 65, preload: !0, oneSlidePerOpen: !1, touchNavigation: !0, touchFollowAxis: !0, keyboardNavigation: !0, closeOnOutsideClick: !0, plugins: !1, plyr: { css: "https://cdn.plyr.io/3.6.12/plyr.css", js: "https://cdn.plyr.io/3.6.12/plyr.js", config: { ratio: "16:9", fullscreen: { enabled: !0, iosNative: !0 }, youtube: { noCookie: !0, rel: 0, showinfo: 0, iv_load_policy: 3 }, vimeo: { byline: !1, portrait: !1, title: !1, transparent: !1 } } }, openEffect: "zoom", closeEffect: "zoom", slideEffect: "slide", moreText: "See more", moreLength: 60, cssEfects: { fade: { in: "fadeIn", out: "fadeOut" }, zoom: { in: "zoomIn", out: "zoomOut" }, slide: { in: "slideInRight", out: "slideOutLeft" }, slideBack: { in: "slideInLeft", out: "slideOutRight" }, none: { in: "none", out: "none" } }, svg: { close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>', next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>', prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>' }, slideHTML: `<div class="gslide">
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
</div>` }, _e = r(function i() {
        var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i), this.customOptions = a, this.settings = f(Y, a), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1;
      }, [{ key: "init", value: function() {
        var i = this, a = this.getSelector();
        a && (this.baseEvents = v("click", { onElement: a, withCallback: function(c, m) {
          c.preventDefault(), i.open(m);
        } })), this.elements = this.getElements();
      } }, { key: "open", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (this.elements.length === 0) return !1;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var c = ye(a) ? a : this.settings.startAt;
        if (K(i)) {
          var m = i.getAttribute("data-gallery");
          m && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, m)), me(c) && (c = this.getElementIndex(i)) < 0 && (c = 0);
        }
        ye(c) || (c = 0), this.build(), P(this.overlay, this.settings.openEffect === "none" ? "none" : this.settings.cssEfects.fade.in);
        var _ = document.body, A = window.innerWidth - document.documentElement.clientWidth;
        if (A > 0) {
          var L = document.createElement("style");
          L.type = "text/css", L.className = "gcss-styles", L.innerText = ".gscrollbar-fixer {margin-right: ".concat(A, "px}"), document.head.appendChild(L), h(_, "gscrollbar-fixer");
        }
        h(_, "glightbox-open"), h(R, "glightbox-open"), g && (h(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(c, !0), this.elements.length === 1 ? (h(this.prevButton, "glightbox-button-hidden"), h(this.nextButton, "glightbox-button-hidden")) : (x(this.prevButton, "glightbox-button-hidden"), x(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), U(this.settings.onOpen) && this.settings.onOpen(), y && this.settings.touchNavigation && rn(this), this.settings.keyboardNavigation && Ht(this);
      } }, { key: "openAt", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        this.open(null, i);
      } }, { key: "showSlide", value: function() {
        var i = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        T(this.loader), this.index = parseInt(a);
        var m = this.slidesContainer.querySelector(".current");
        m && x(m, "current"), this.slideAnimateOut();
        var _ = this.slidesContainer.querySelectorAll(".gslide")[a];
        if (k(_, "loaded")) this.slideAnimateIn(_, c), I(this.loader);
        else {
          T(this.loader);
          var A = this.elements[a], L = { index: this.index, slide: _, slideNode: _, slideConfig: A.slideConfig, slideIndex: this.index, trigger: A.node, player: null };
          this.trigger("slide_before_load", L), A.instance.setContent(_, function() {
            I(i.loader), i.resize(), i.slideAnimateIn(_, c), i.trigger("slide_after_load", L);
          });
        }
        this.slideDescription = _.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && k(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(a + 1), this.preloadSlide(a - 1)), this.updateNavigationClasses(), this.activeSlide = _;
      } }, { key: "preloadSlide", value: function(i) {
        var a = this;
        if (i < 0 || i > this.elements.length - 1 || me(this.elements[i])) return !1;
        var c = this.slidesContainer.querySelectorAll(".gslide")[i];
        if (k(c, "loaded")) return !1;
        var m = this.elements[i], _ = m.type, A = { index: i, slide: c, slideNode: c, slideConfig: m.slideConfig, slideIndex: i, trigger: m.node, player: null };
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
        var i = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
        if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (i < 0 || i > this.elements.length - 1)) return !1;
        i < 0 ? i = this.elements.length - 1 : i >= this.elements.length && (i = 0), this.showSlide(i);
      } }, { key: "insertSlide", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
        a < 0 && (a = this.elements.length);
        var c = new mt(i, this, a), m = c.getConfig(), _ = f({}, m), A = c.create(), L = this.elements.length - 1;
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
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
        if (i < 0 || i > this.elements.length - 1) return !1;
        var a = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[i];
        a && (this.getActiveSlideIndex() == i && (i == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), a.parentNode.removeChild(a)), this.elements.splice(i, 1), this.trigger("slide_removed", i), U(this.settings.slideRemoved) && this.settings.slideRemoved(i);
      } }, { key: "slideAnimateIn", value: function(i, a) {
        var c = this, m = i.querySelector(".gslide-media"), _ = i.querySelector(".gslide-description"), A = { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlide, slideConfig: me(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: me(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, L = { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideConfig: this.elements[this.index].slideConfig, slideIndex: this.index, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) };
        if (m.offsetWidth > 0 && _ && (I(_), _.style.display = ""), x(i, this.effectsClasses), a) P(i, this.settings.cssEfects[this.settings.openEffect].in, function() {
          c.settings.autoplayVideos && c.slidePlayerPlay(i), c.trigger("slide_changed", { prev: A, current: L }), U(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [A, L]);
        });
        else {
          var O = this.settings.slideEffect, V = O !== "none" ? this.settings.cssEfects[O].in : O;
          this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (V = this.settings.cssEfects.slideBack.in), P(i, V, function() {
            c.settings.autoplayVideos && c.slidePlayerPlay(i), c.trigger("slide_changed", { prev: A, current: L }), U(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [A, L]);
          });
        }
        setTimeout(function() {
          c.resize(i);
        }, 100), h(i, "current");
      } }, { key: "slideAnimateOut", value: function() {
        if (!this.prevActiveSlide) return !1;
        var i = this.prevActiveSlide;
        x(i, this.effectsClasses), h(i, "prev");
        var a = this.settings.slideEffect, c = a !== "none" ? this.settings.cssEfects[a].out : a;
        this.slidePlayerPause(i), this.trigger("slide_before_change", { prev: { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlideIndex, slideConfig: me(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: me(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, current: { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideIndex: this.index, slideConfig: this.elements[this.index].slideConfig, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) } }), U(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{ index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, { index: this.index, slide: this.activeSlide, player: this.getSlidePlayerInstance(this.index) }]), this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (c = this.settings.cssEfects.slideBack.out), P(i, c, function() {
          var m = i.querySelector(".ginner-container"), _ = i.querySelector(".gslide-media"), A = i.querySelector(".gslide-description");
          m.style.transform = "", _.style.transform = "", x(_, "greset"), _.style.opacity = "", A && (A.style.opacity = ""), x(i, "prev");
        });
      } }, { key: "getAllPlayers", value: function() {
        return this.videoPlayers;
      } }, { key: "getSlidePlayerInstance", value: function(i) {
        var a = "gvideo" + i, c = this.getAllPlayers();
        return !(!ie(c, a) || !c[a]) && c[a];
      } }, { key: "stopSlideVideo", value: function(i) {
        if (K(i)) {
          var a = i.querySelector(".gvideo-wrapper");
          a && (i = a.getAttribute("data-index"));
        }
        console.log("stopSlideVideo is deprecated, use slidePlayerPause");
        var c = this.getSlidePlayerInstance(i);
        c && c.playing && c.pause();
      } }, { key: "slidePlayerPause", value: function(i) {
        if (K(i)) {
          var a = i.querySelector(".gvideo-wrapper");
          a && (i = a.getAttribute("data-index"));
        }
        var c = this.getSlidePlayerInstance(i);
        c && c.playing && c.pause();
      } }, { key: "playSlideVideo", value: function(i) {
        if (K(i)) {
          var a = i.querySelector(".gvideo-wrapper");
          a && (i = a.getAttribute("data-index"));
        }
        console.log("playSlideVideo is deprecated, use slidePlayerPlay");
        var c = this.getSlidePlayerInstance(i);
        c && !c.playing && c.play();
      } }, { key: "slidePlayerPlay", value: function(i) {
        var a;
        if (!g || (a = this.settings.plyr.config) !== null && a !== void 0 && a.muted) {
          if (K(i)) {
            var c = i.querySelector(".gvideo-wrapper");
            c && (i = c.getAttribute("data-index"));
          }
          var m = this.getSlidePlayerInstance(i);
          m && !m.playing && (m.play(), this.settings.autofocusVideos && m.elements.container.focus());
        }
      } }, { key: "setElements", value: function(i) {
        var a = this;
        this.settings.elements = !1;
        var c = [];
        i && i.length && u(i, function(m, _) {
          var A = new mt(m, a, _), L = A.getConfig(), O = f({}, L);
          O.slideConfig = L, O.instance = A, O.index = _, c.push(O);
        }), this.elements = c, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (u(this.elements, function() {
          var m = E(a.settings.slideHTML);
          a.slidesContainer.appendChild(m);
        }), this.showSlide(0, !0)));
      } }, { key: "getElementIndex", value: function(i) {
        var a = !1;
        return u(this.elements, function(c, m) {
          if (ie(c, "node") && c.node == i) return a = m, !0;
        }), a;
      } }, { key: "getElements", value: function() {
        var i = this, a = [];
        this.elements = this.elements ? this.elements : [], !me(this.settings.elements) && Te(this.settings.elements) && this.settings.elements.length && u(this.settings.elements, function(m, _) {
          var A = new mt(m, i, _), L = A.getConfig(), O = f({}, L);
          O.node = !1, O.index = _, O.instance = A, O.slideConfig = L, a.push(O);
        });
        var c = !1;
        return this.getSelector() && (c = document.querySelectorAll(this.getSelector())), c && u(c, function(m, _) {
          var A = new mt(m, i, _), L = A.getConfig(), O = f({}, L);
          O.node = m, O.index = _, O.instance = A, O.slideConfig = L, O.gallery = m.getAttribute("data-gallery"), a.push(O);
        }), a;
      } }, { key: "getGalleryElements", value: function(i, a) {
        return i.filter(function(c) {
          return c.gallery == a;
        });
      } }, { key: "getSelector", value: function() {
        return !this.settings.elements && (this.settings.selector && this.settings.selector.substring(0, 5) == "data-" ? "*[".concat(this.settings.selector, "]") : this.settings.selector);
      } }, { key: "getActiveSlide", value: function() {
        return this.slidesContainer.querySelectorAll(".gslide")[this.index];
      } }, { key: "getActiveSlideIndex", value: function() {
        return this.index;
      } }, { key: "getAnimationClasses", value: function() {
        var i = [];
        for (var a in this.settings.cssEfects) if (this.settings.cssEfects.hasOwnProperty(a)) {
          var c = this.settings.cssEfects[a];
          i.push("g".concat(c.in)), i.push("g".concat(c.out));
        }
        return i.join(" ");
      } }, { key: "build", value: function() {
        var i = this;
        if (this.built) return !1;
        var a = document.body.childNodes, c = [];
        u(a, function(H) {
          H.parentNode == document.body && H.nodeName.charAt(0) !== "#" && H.hasAttribute && !H.hasAttribute("aria-hidden") && (c.push(H), H.setAttribute("aria-hidden", "true"));
        });
        var m = ie(this.settings.svg, "next") ? this.settings.svg.next : "", _ = ie(this.settings.svg, "prev") ? this.settings.svg.prev : "", A = ie(this.settings.svg, "close") ? this.settings.svg.close : "", L = this.settings.lightboxHTML;
        L = E(L = (L = (L = L.replace(/{nextSVG}/g, m)).replace(/{prevSVG}/g, _)).replace(/{closeSVG}/g, A)), document.body.appendChild(L);
        var O = document.getElementById("glightbox-body");
        this.modal = O;
        var V = O.querySelector(".gclose");
        this.prevButton = O.querySelector(".gprev"), this.nextButton = O.querySelector(".gnext"), this.overlay = O.querySelector(".goverlay"), this.loader = O.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = c, this.events = {}, h(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && V && (this.events.close = v("click", { onElement: V, withCallback: function(H, j) {
          H.preventDefault(), i.close();
        } })), V && !this.settings.closeButton && V.parentNode.removeChild(V), this.nextButton && (this.events.next = v("click", { onElement: this.nextButton, withCallback: function(H, j) {
          H.preventDefault(), i.nextSlide();
        } })), this.prevButton && (this.events.prev = v("click", { onElement: this.prevButton, withCallback: function(H, j) {
          H.preventDefault(), i.prevSlide();
        } })), this.settings.closeOnOutsideClick && (this.events.outClose = v("click", { onElement: O, withCallback: function(H, j) {
          i.preventOutsideClick || k(document.body, "glightbox-mobile") || S(H.target, ".ginner-container") || S(H.target, ".gbtn") || k(H.target, "gnext") || k(H.target, "gprev") || i.close();
        } })), u(this.elements, function(H, j) {
          i.slidesContainer.appendChild(H.instance.create()), H.slideNode = i.slidesContainer.querySelectorAll(".gslide")[j];
        }), y && h(document.body, "glightbox-touch"), this.events.resize = v("resize", { onElement: window, withCallback: function() {
          i.resize();
        } }), this.built = !0;
      } }, { key: "resize", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        if ((i = i || this.activeSlide) && !k(i, "zoomed")) {
          var a = D(), c = i.querySelector(".gvideo-wrapper"), m = i.querySelector(".gslide-image"), _ = this.slideDescription, A = a.width, L = a.height;
          if (A <= 768 ? h(document.body, "glightbox-mobile") : x(document.body, "glightbox-mobile"), c || m) {
            var O = !1;
            if (_ && (k(_, "description-bottom") || k(_, "description-top")) && !k(_, "gabsolute") && (O = !0), m) {
              if (A <= 768) m.querySelector("img");
              else if (O) {
                var V, H, j = _.offsetHeight, X = m.querySelector("img"), Z = (V = this.elements[this.index]) === null || V === void 0 ? void 0 : V.node, ee = "100vh";
                Z && (ee = (H = Z.getAttribute("data-height")) !== null && H !== void 0 ? H : ee), X.setAttribute("style", "max-height: calc(".concat(ee, " - ").concat(j, "px)")), _.setAttribute("style", "max-width: ".concat(X.offsetWidth, "px;"));
              }
            }
            if (c) {
              var ne = ie(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
              if (!ne) {
                var xe = c.clientWidth, He = c.clientHeight, Be = xe / He;
                ne = "".concat(xe / Be, ":").concat(He / Be);
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
        var i = this.loop();
        x(this.nextButton, "disabled"), x(this.prevButton, "disabled"), this.index == 0 && this.elements.length - 1 == 0 ? (h(this.prevButton, "disabled"), h(this.nextButton, "disabled")) : this.index !== 0 || i ? this.index !== this.elements.length - 1 || i || h(this.nextButton, "disabled") : h(this.prevButton, "disabled");
      } }, { key: "loop", value: function() {
        var i = ie(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
        return i = ie(this.settings, "loop") ? this.settings.loop : i, i;
      } }, { key: "close", value: function() {
        var i = this;
        if (!this.lightboxOpen) {
          if (this.events) {
            for (var a in this.events) this.events.hasOwnProperty(a) && this.events[a].destroy();
            this.events = null;
          }
          return !1;
        }
        if (this.closing) return !1;
        this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && u(this.bodyHiddenChildElms, function(c) {
          c.removeAttribute("aria-hidden");
        }), h(this.modal, "glightbox-closing"), P(this.overlay, this.settings.openEffect == "none" ? "none" : this.settings.cssEfects.fade.out), P(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function() {
          if (i.activeSlide = null, i.prevActiveSlideIndex = null, i.prevActiveSlide = null, i.built = !1, i.events) {
            for (var c in i.events) i.events.hasOwnProperty(c) && i.events[c].destroy();
            i.events = null;
          }
          var m = document.body;
          x(R, "glightbox-open"), x(m, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), i.modal.parentNode.removeChild(i.modal), i.trigger("close"), U(i.settings.onClose) && i.settings.onClose();
          var _ = document.querySelector(".gcss-styles");
          _ && _.parentNode.removeChild(_), i.lightboxOpen = !1, i.closing = null;
        });
      } }, { key: "destroy", value: function() {
        this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
      } }, { key: "on", value: function(i, a) {
        var c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!i || !U(a)) throw new TypeError("Event name and callback must be defined");
        this.apiEvents.push({ evt: i, once: c, callback: a });
      } }, { key: "once", value: function(i, a) {
        this.on(i, a, !0);
      } }, { key: "trigger", value: function(i) {
        var a = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, m = [];
        u(this.apiEvents, function(_, A) {
          var L = _.evt, O = _.once, V = _.callback;
          L == i && (V(c), O && m.push(A));
        }), m.length && u(m, function(_) {
          return a.apiEvents.splice(_, 1);
        });
      } }, { key: "clearAllEvents", value: function() {
        this.apiEvents.splice(0, this.apiEvents.length);
      } }, { key: "version", value: function() {
        return "3.3.1";
      } }]);
      return function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new _e(i);
        return a.init(), a;
      };
    });
  }(Rn)), Rn.exports;
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
    const n = e, o = t;
    let r = null;
    return Bt(() => {
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
        o("update:modelValue", !1);
      });
    }), Ue(
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
    const { t } = Ae(), n = ce(!1), o = () => {
      n.value = !0;
    };
    return (r, s) => (C(), F("article", Dl, [
      w("section", {
        onClick: o,
        class: "accommodation-type-card__img"
      }, [
        N(Rl, {
          modelValue: n.value,
          "onUpdate:modelValue": s[0] || (s[0] = (l) => n.value = l),
          images: e.data.gallery
        }, {
          default: B(() => [
            e.data.thumbnail && e.data.thumbnail.url ? (C(), F("img", {
              key: 0,
              onClick: o,
              src: e.data.thumbnail.url,
              alt: e.data.thumbnail.name
            }, null, 8, Ml)) : (C(), F("span", Fl, M(z(t)("accommodationType.thumbnail")), 1))
          ]),
          _: 1
        }, 8, ["modelValue", "images"])
      ]),
      w("section", ql, [
        w("div", Bl, [
          w("h2", null, M(e.data.name), 1),
          ge(r.$slots, "description", {}, () => [
            w("p", null, M(e.data.description), 1)
          ]),
          w("div", zl, [
            (C(!0), F(de, null, Le(e.data.amenities, (l, d) => (C(), F("span", {
              key: d,
              class: "amenities__item"
            }, M(l.title), 1))), 128))
          ])
        ])
      ])
    ]));
  }
}, Wl = ["top", "right", "bottom", "left"], To = ["start", "end"], So = /* @__PURE__ */ Wl.reduce((e, t) => e.concat(t, t + "-" + To[0], t + "-" + To[1]), []), yn = Math.min, It = Math.max, Vl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ul = {
  start: "end",
  end: "start"
};
function pi(e, t, n) {
  return It(e, yn(t, n));
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
function Ii(e) {
  return e === "y" ? "height" : "width";
}
function Ft(e) {
  return ["top", "bottom"].includes(it(e)) ? "y" : "x";
}
function Ni(e) {
  return br(Ft(e));
}
function wr(e, t, n) {
  n === void 0 && (n = !1);
  const o = Xe(e), r = Ni(e), s = Ii(r);
  let l = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (l = Bn(l)), [l, Bn(l)];
}
function Yl(e) {
  const t = Bn(e);
  return [qn(e), t, qn(t)];
}
function qn(e) {
  return e.replace(/start|end/g, (t) => Ul[t]);
}
function jl(e, t, n) {
  const o = ["left", "right"], r = ["right", "left"], s = ["top", "bottom"], l = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? r : o : t ? o : r;
    case "left":
    case "right":
      return t ? s : l;
    default:
      return [];
  }
}
function Xl(e, t, n, o) {
  const r = Xe(e);
  let s = jl(it(e), n === "start", o);
  return r && (s = s.map((l) => l + "-" + r), t && (s = s.concat(s.map(qn)))), s;
}
function Bn(e) {
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
function un(e) {
  const {
    x: t,
    y: n,
    width: o,
    height: r
  } = e;
  return {
    width: o,
    height: r,
    top: n,
    left: t,
    right: t + o,
    bottom: n + r,
    x: t,
    y: n
  };
}
function Eo(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = Ft(t), l = Ni(t), d = Ii(l), f = it(t), u = s === "y", b = o.x + o.width / 2 - r.width / 2, v = o.y + o.height / 2 - r.height / 2, h = o[d] / 2 - r[d] / 2;
  let x;
  switch (f) {
    case "top":
      x = {
        x: b,
        y: o.y - r.height
      };
      break;
    case "bottom":
      x = {
        x: b,
        y: o.y + o.height
      };
      break;
    case "right":
      x = {
        x: o.x + o.width,
        y: v
      };
      break;
    case "left":
      x = {
        x: o.x - r.width,
        y: v
      };
      break;
    default:
      x = {
        x: o.x,
        y: o.y
      };
  }
  switch (Xe(t)) {
    case "start":
      x[l] -= h * (n && u ? -1 : 1);
      break;
    case "end":
      x[l] += h * (n && u ? -1 : 1);
      break;
  }
  return x;
}
const Kl = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: l
  } = n, d = s.filter(Boolean), f = await (l.isRTL == null ? void 0 : l.isRTL(t));
  let u = await l.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: b,
    y: v
  } = Eo(u, o, f), h = o, x = {}, k = 0;
  for (let S = 0; S < d.length; S++) {
    const {
      name: P,
      fn: p
    } = d[S], {
      x: T,
      y: I,
      data: E,
      reset: D
    } = await p({
      x: b,
      y: v,
      initialPlacement: o,
      placement: h,
      strategy: r,
      middlewareData: x,
      rects: u,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    b = T ?? b, v = I ?? v, x = {
      ...x,
      [P]: {
        ...x[P],
        ...E
      }
    }, D && k <= 50 && (k++, typeof D == "object" && (D.placement && (h = D.placement), D.rects && (u = D.rects === !0 ? await l.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : D.rects), {
      x: b,
      y: v
    } = Eo(u, h, f)), S = -1);
  }
  return {
    x: b,
    y: v,
    placement: h,
    strategy: r,
    middlewareData: x
  };
};
async function jn(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: s,
    rects: l,
    elements: d,
    strategy: f
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: b = "viewport",
    elementContext: v = "floating",
    altBoundary: h = !1,
    padding: x = 0
  } = zt(t, e), k = xr(x), P = d[h ? v === "floating" ? "reference" : "floating" : v], p = un(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(P))) == null || n ? P : P.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(d.floating)),
    boundary: u,
    rootBoundary: b,
    strategy: f
  })), T = v === "floating" ? {
    x: o,
    y: r,
    width: l.floating.width,
    height: l.floating.height
  } : l.reference, I = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d.floating)), E = await (s.isElement == null ? void 0 : s.isElement(I)) ? await (s.getScale == null ? void 0 : s.getScale(I)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, D = un(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: d,
    rect: T,
    offsetParent: I,
    strategy: f
  }) : T);
  return {
    top: (p.top - D.top + k.top) / E.y,
    bottom: (D.bottom - p.bottom + k.bottom) / E.y,
    left: (p.left - D.left + k.left) / E.x,
    right: (D.right - p.right + k.right) / E.x
  };
}
const Jl = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: s,
      platform: l,
      elements: d,
      middlewareData: f
    } = t, {
      element: u,
      padding: b = 0
    } = zt(e, t) || {};
    if (u == null)
      return {};
    const v = xr(b), h = {
      x: n,
      y: o
    }, x = Ni(r), k = Ii(x), S = await l.getDimensions(u), P = x === "y", p = P ? "top" : "left", T = P ? "bottom" : "right", I = P ? "clientHeight" : "clientWidth", E = s.reference[k] + s.reference[x] - h[x] - s.floating[k], D = h[x] - s.reference[x], q = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(u));
    let $ = q ? q[I] : 0;
    (!$ || !await (l.isElement == null ? void 0 : l.isElement(q))) && ($ = d.floating[I] || s.floating[k]);
    const J = E / 2 - D / 2, G = $ / 2 - S[k] / 2 - 1, U = yn(v[p], G), ae = yn(v[T], G), K = U, Te = $ - S[k] - ae, be = $ / 2 - S[k] / 2 + J, Oe = pi(K, be, Te), me = !f.arrow && Xe(r) != null && be !== Oe && s.reference[k] / 2 - (be < K ? U : ae) - S[k] / 2 < 0, ie = me ? be < K ? be - K : be - Te : 0;
    return {
      [x]: h[x] + ie,
      data: {
        [x]: Oe,
        centerOffset: be - Oe - ie,
        ...me && {
          alignmentOffset: ie
        }
      },
      reset: me
    };
  }
});
function Zl(e, t, n) {
  return (e ? [...n.filter((r) => Xe(r) === e), ...n.filter((r) => Xe(r) !== e)] : n.filter((r) => it(r) === r)).filter((r) => e ? Xe(r) === e || (t ? qn(r) !== r : !1) : !0);
}
const Ql = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    async fn(t) {
      var n, o, r;
      const {
        rects: s,
        middlewareData: l,
        placement: d,
        platform: f,
        elements: u
      } = t, {
        crossAxis: b = !1,
        alignment: v,
        allowedPlacements: h = So,
        autoAlignment: x = !0,
        ...k
      } = zt(e, t), S = v !== void 0 || h === So ? Zl(v || null, x, h) : h, P = await jn(t, k), p = ((n = l.autoPlacement) == null ? void 0 : n.index) || 0, T = S[p];
      if (T == null)
        return {};
      const I = wr(T, s, await (f.isRTL == null ? void 0 : f.isRTL(u.floating)));
      if (d !== T)
        return {
          reset: {
            placement: S[0]
          }
        };
      const E = [P[it(T)], P[I[0]], P[I[1]]], D = [...((o = l.autoPlacement) == null ? void 0 : o.overflows) || [], {
        placement: T,
        overflows: E
      }], q = S[p + 1];
      if (q)
        return {
          data: {
            index: p + 1,
            overflows: D
          },
          reset: {
            placement: q
          }
        };
      const $ = D.map((U) => {
        const ae = Xe(U.placement);
        return [U.placement, ae && b ? (
          // Check along the mainAxis and main crossAxis side.
          U.overflows.slice(0, 2).reduce((K, Te) => K + Te, 0)
        ) : (
          // Check only the mainAxis.
          U.overflows[0]
        ), U.overflows];
      }).sort((U, ae) => U[1] - ae[1]), G = ((r = $.filter((U) => U[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        Xe(U[0]) ? 2 : 3
      ).every((ae) => ae <= 0))[0]) == null ? void 0 : r[0]) || $[0][0];
      return G !== d ? {
        data: {
          index: p + 1,
          overflows: D
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
      var n, o;
      const {
        placement: r,
        middlewareData: s,
        rects: l,
        initialPlacement: d,
        platform: f,
        elements: u
      } = t, {
        mainAxis: b = !0,
        crossAxis: v = !0,
        fallbackPlacements: h,
        fallbackStrategy: x = "bestFit",
        fallbackAxisSideDirection: k = "none",
        flipAlignment: S = !0,
        ...P
      } = zt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const p = it(r), T = Ft(d), I = it(d) === d, E = await (f.isRTL == null ? void 0 : f.isRTL(u.floating)), D = h || (I || !S ? [Bn(d)] : Yl(d)), q = k !== "none";
      !h && q && D.push(...Xl(d, S, k, E));
      const $ = [d, ...D], J = await jn(t, P), G = [];
      let U = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (b && G.push(J[p]), v) {
        const be = wr(r, l, E);
        G.push(J[be[0]], J[be[1]]);
      }
      if (U = [...U, {
        placement: r,
        overflows: G
      }], !G.every((be) => be <= 0)) {
        var ae, K;
        const be = (((ae = s.flip) == null ? void 0 : ae.index) || 0) + 1, Oe = $[be];
        if (Oe)
          return {
            data: {
              index: be,
              overflows: U
            },
            reset: {
              placement: Oe
            }
          };
        let me = (K = U.filter((ie) => ie.overflows[0] <= 0).sort((ie, Re) => ie.overflows[1] - Re.overflows[1])[0]) == null ? void 0 : K.placement;
        if (!me)
          switch (x) {
            case "bestFit": {
              var Te;
              const ie = (Te = U.filter((Re) => {
                if (q) {
                  const ye = Ft(Re.placement);
                  return ye === T || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ye === "y";
                }
                return !0;
              }).map((Re) => [Re.placement, Re.overflows.filter((ye) => ye > 0).reduce((ye, ot) => ye + ot, 0)]).sort((Re, ye) => Re[1] - ye[1])[0]) == null ? void 0 : Te[0];
              ie && (me = ie);
              break;
            }
            case "initialPlacement":
              me = d;
              break;
          }
        if (r !== me)
          return {
            reset: {
              placement: me
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
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), l = it(n), d = Xe(n), f = Ft(n) === "y", u = ["left", "top"].includes(l) ? -1 : 1, b = s && f ? -1 : 1, v = zt(t, e);
  let {
    mainAxis: h,
    crossAxis: x,
    alignmentAxis: k
  } = typeof v == "number" ? {
    mainAxis: v,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: v.mainAxis || 0,
    crossAxis: v.crossAxis || 0,
    alignmentAxis: v.alignmentAxis
  };
  return d && typeof k == "number" && (x = d === "end" ? k * -1 : k), f ? {
    x: x * b,
    y: h * u
  } : {
    x: h * u,
    y: x * b
  };
}
const nc = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: s,
        placement: l,
        middlewareData: d
      } = t, f = await tc(t, e);
      return l === ((n = d.offset) == null ? void 0 : n.placement) && (o = d.arrow) != null && o.alignmentOffset ? {} : {
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
        y: o,
        placement: r
      } = t, {
        mainAxis: s = !0,
        crossAxis: l = !1,
        limiter: d = {
          fn: (P) => {
            let {
              x: p,
              y: T
            } = P;
            return {
              x: p,
              y: T
            };
          }
        },
        ...f
      } = zt(e, t), u = {
        x: n,
        y: o
      }, b = await jn(t, f), v = Ft(it(r)), h = br(v);
      let x = u[h], k = u[v];
      if (s) {
        const P = h === "y" ? "top" : "left", p = h === "y" ? "bottom" : "right", T = x + b[P], I = x - b[p];
        x = pi(T, x, I);
      }
      if (l) {
        const P = v === "y" ? "top" : "left", p = v === "y" ? "bottom" : "right", T = k + b[P], I = k - b[p];
        k = pi(T, k, I);
      }
      const S = d.fn({
        ...t,
        [h]: x,
        [v]: k
      });
      return {
        ...S,
        data: {
          x: S.x - n,
          y: S.y - o,
          enabled: {
            [h]: s,
            [v]: l
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
      var n, o;
      const {
        placement: r,
        rects: s,
        platform: l,
        elements: d
      } = t, {
        apply: f = () => {
        },
        ...u
      } = zt(e, t), b = await jn(t, u), v = it(r), h = Xe(r), x = Ft(r) === "y", {
        width: k,
        height: S
      } = s.floating;
      let P, p;
      v === "top" || v === "bottom" ? (P = v, p = h === (await (l.isRTL == null ? void 0 : l.isRTL(d.floating)) ? "start" : "end") ? "left" : "right") : (p = v, P = h === "end" ? "top" : "bottom");
      const T = S - b.top - b.bottom, I = k - b.left - b.right, E = yn(S - b[P], T), D = yn(k - b[p], I), q = !t.middlewareData.shift;
      let $ = E, J = D;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (J = I), (o = t.middlewareData.shift) != null && o.enabled.y && ($ = T), q && !h) {
        const U = It(b.left, 0), ae = It(b.right, 0), K = It(b.top, 0), Te = It(b.bottom, 0);
        x ? J = k - 2 * (U !== 0 || ae !== 0 ? U + ae : It(b.left, b.right)) : $ = S - 2 * (K !== 0 || Te !== 0 ? K + Te : It(b.top, b.bottom));
      }
      await f({
        ...t,
        availableWidth: J,
        availableHeight: $
      });
      const G = await l.getDimensions(d.floating);
      return k !== G.width || S !== G.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ve(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function tt(e) {
  return Ve(e).getComputedStyle(e);
}
const Co = Math.min, dn = Math.max, zn = Math.round;
function kr(e) {
  const t = tt(e);
  let n = parseFloat(t.width), o = parseFloat(t.height);
  const r = e.offsetWidth, s = e.offsetHeight, l = zn(n) !== r || zn(o) !== s;
  return l && (n = r, o = s), { width: n, height: o, fallback: l };
}
function xt(e) {
  return Sr(e) ? (e.nodeName || "").toLowerCase() : "";
}
let On;
function Tr() {
  if (On) return On;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (On = e.brands.map((t) => t.brand + "/" + t.version).join(" "), On) : navigator.userAgent;
}
function nt(e) {
  return e instanceof Ve(e).HTMLElement;
}
function bt(e) {
  return e instanceof Ve(e).Element;
}
function Sr(e) {
  return e instanceof Ve(e).Node;
}
function Po(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof Ve(e).ShadowRoot || e instanceof ShadowRoot;
}
function Xn(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = tt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !["inline", "contents"].includes(r);
}
function rc(e) {
  return ["table", "td", "th"].includes(xt(e));
}
function gi(e) {
  const t = /firefox/i.test(Tr()), n = tt(e), o = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!o && o !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some((r) => n.willChange.includes(r)) || ["paint", "layout", "strict", "content"].some((r) => {
    const s = n.contain;
    return s != null && s.includes(r);
  });
}
function Er() {
  return !/^((?!chrome|android).)*safari/i.test(Tr());
}
function Ri(e) {
  return ["html", "body", "#document"].includes(xt(e));
}
function Cr(e) {
  return bt(e) ? e : e.contextElement;
}
const Pr = { x: 1, y: 1 };
function Gt(e) {
  const t = Cr(e);
  if (!nt(t)) return Pr;
  const n = t.getBoundingClientRect(), { width: o, height: r, fallback: s } = kr(t);
  let l = (s ? zn(n.width) : n.width) / o, d = (s ? zn(n.height) : n.height) / r;
  return l && Number.isFinite(l) || (l = 1), d && Number.isFinite(d) || (d = 1), { x: l, y: d };
}
function _n(e, t, n, o) {
  var r, s;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const l = e.getBoundingClientRect(), d = Cr(e);
  let f = Pr;
  t && (o ? bt(o) && (f = Gt(o)) : f = Gt(e));
  const u = d ? Ve(d) : window, b = !Er() && n;
  let v = (l.left + (b && ((r = u.visualViewport) == null ? void 0 : r.offsetLeft) || 0)) / f.x, h = (l.top + (b && ((s = u.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / f.y, x = l.width / f.x, k = l.height / f.y;
  if (d) {
    const S = Ve(d), P = o && bt(o) ? Ve(o) : o;
    let p = S.frameElement;
    for (; p && o && P !== S; ) {
      const T = Gt(p), I = p.getBoundingClientRect(), E = getComputedStyle(p);
      I.x += (p.clientLeft + parseFloat(E.paddingLeft)) * T.x, I.y += (p.clientTop + parseFloat(E.paddingTop)) * T.y, v *= T.x, h *= T.y, x *= T.x, k *= T.y, v += I.x, h += I.y, p = Ve(p).frameElement;
    }
  }
  return { width: x, height: k, top: h, right: v + x, bottom: h + k, left: v, x: v, y: h };
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
  const t = e.assignedSlot || e.parentNode || Po(e) && e.host || wt(e);
  return Po(t) ? t.host : t;
}
function Lr(e) {
  const t = bn(e);
  return Ri(t) ? t.ownerDocument.body : nt(t) && Xn(t) ? t : Lr(t);
}
function Hn(e, t) {
  var n;
  t === void 0 && (t = []);
  const o = Lr(e), r = o === ((n = e.ownerDocument) == null ? void 0 : n.body), s = Ve(o);
  return r ? t.concat(s, s.visualViewport || [], Xn(o) ? o : []) : t.concat(o, Hn(o));
}
function Ao(e, t, n) {
  return t === "viewport" ? un(function(o, r) {
    const s = Ve(o), l = wt(o), d = s.visualViewport;
    let f = l.clientWidth, u = l.clientHeight, b = 0, v = 0;
    if (d) {
      f = d.width, u = d.height;
      const h = Er();
      (h || !h && r === "fixed") && (b = d.offsetLeft, v = d.offsetTop);
    }
    return { width: f, height: u, x: b, y: v };
  }(e, n)) : bt(t) ? un(function(o, r) {
    const s = _n(o, !0, r === "fixed"), l = s.top + o.clientTop, d = s.left + o.clientLeft, f = nt(o) ? Gt(o) : { x: 1, y: 1 };
    return { width: o.clientWidth * f.x, height: o.clientHeight * f.y, x: d * f.x, y: l * f.y };
  }(t, n)) : un(function(o) {
    const r = wt(o), s = Gn(o), l = o.ownerDocument.body, d = dn(r.scrollWidth, r.clientWidth, l.scrollWidth, l.clientWidth), f = dn(r.scrollHeight, r.clientHeight, l.scrollHeight, l.clientHeight);
    let u = -s.scrollLeft + Ar(o);
    const b = -s.scrollTop;
    return tt(l).direction === "rtl" && (u += dn(r.clientWidth, l.clientWidth) - d), { width: d, height: f, x: u, y: b };
  }(wt(e)));
}
function Lo(e) {
  return nt(e) && tt(e).position !== "fixed" ? e.offsetParent : null;
}
function Oo(e) {
  const t = Ve(e);
  let n = Lo(e);
  for (; n && rc(n) && tt(n).position === "static"; ) n = Lo(n);
  return n && (xt(n) === "html" || xt(n) === "body" && tt(n).position === "static" && !gi(n)) ? t : n || function(o) {
    let r = bn(o);
    for (; nt(r) && !Ri(r); ) {
      if (gi(r)) return r;
      r = bn(r);
    }
    return null;
  }(e) || t;
}
function ac(e, t, n) {
  const o = nt(t), r = wt(t), s = _n(e, !0, n === "fixed", t);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const d = { x: 0, y: 0 };
  if (o || !o && n !== "fixed") if ((xt(t) !== "body" || Xn(r)) && (l = Gn(t)), nt(t)) {
    const f = _n(t, !0);
    d.x = f.x + t.clientLeft, d.y = f.y + t.clientTop;
  } else r && (d.x = Ar(r));
  return { x: s.left + l.scrollLeft - d.x, y: s.top + l.scrollTop - d.y, width: s.width, height: s.height };
}
const sc = { getClippingRect: function(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e;
  const s = n === "clippingAncestors" ? function(u, b) {
    const v = b.get(u);
    if (v) return v;
    let h = Hn(u).filter((P) => bt(P) && xt(P) !== "body"), x = null;
    const k = tt(u).position === "fixed";
    let S = k ? bn(u) : u;
    for (; bt(S) && !Ri(S); ) {
      const P = tt(S), p = gi(S);
      (k ? p || x : p || P.position !== "static" || !x || !["absolute", "fixed"].includes(x.position)) ? x = P : h = h.filter((T) => T !== S), S = bn(S);
    }
    return b.set(u, h), h;
  }(t, this._c) : [].concat(n), l = [...s, o], d = l[0], f = l.reduce((u, b) => {
    const v = Ao(t, b, r);
    return u.top = dn(v.top, u.top), u.right = Co(v.right, u.right), u.bottom = Co(v.bottom, u.bottom), u.left = dn(v.left, u.left), u;
  }, Ao(t, d, r));
  return { width: f.right - f.left, height: f.bottom - f.top, x: f.left, y: f.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: n, strategy: o } = e;
  const r = nt(n), s = wt(n);
  if (n === s) return t;
  let l = { scrollLeft: 0, scrollTop: 0 }, d = { x: 1, y: 1 };
  const f = { x: 0, y: 0 };
  if ((r || !r && o !== "fixed") && ((xt(n) !== "body" || Xn(s)) && (l = Gn(n)), nt(n))) {
    const u = _n(n);
    d = Gt(n), f.x = u.x + n.clientLeft, f.y = u.y + n.clientTop;
  }
  return { width: t.width * d.x, height: t.height * d.y, x: t.x * d.x - l.scrollLeft * d.x + f.x, y: t.y * d.y - l.scrollTop * d.y + f.y };
}, isElement: bt, getDimensions: function(e) {
  return nt(e) ? kr(e) : e.getBoundingClientRect();
}, getOffsetParent: Oo, getDocumentElement: wt, getScale: Gt, async getElementRects(e) {
  let { reference: t, floating: n, strategy: o } = e;
  const r = this.getOffsetParent || Oo, s = this.getDimensions;
  return { reference: ac(t, await r(n), o), floating: { x: 0, y: 0, ...await s(n) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => tt(e).direction === "rtl" }, lc = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = { platform: sc, ...n }, s = { ...r.platform, _c: o };
  return Kl(e, t, { ...r, platform: s });
}, Mt = {
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
  let n = Mt.themes[e] || {}, o;
  do
    o = n[t], typeof o > "u" ? n.$extend ? n = Mt.themes[n.$extend] || {} : (n = null, o = Mt[t]) : n = null;
  while (n);
  return o;
}
function cc(e) {
  const t = [e];
  let n = Mt.themes[e] || {};
  do
    n.$extend && !n.$resetCss ? (t.push(n.$extend), n = Mt.themes[n.$extend] || {}) : n = null;
  while (n);
  return t.map((o) => `v-popper--theme-${o}`);
}
function $o(e) {
  const t = [e];
  let n = Mt.themes[e] || {};
  do
    n.$extend ? (t.push(n.$extend), n = Mt.themes[n.$extend] || {}) : n = null;
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
const uc = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), Io = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, No = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function Ro(e, t) {
  const n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}
function ti() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const Ye = [];
let Ot = null;
const Do = {};
function Mo(e) {
  let t = Do[e];
  return t || (t = Do[e] = []), t;
}
let yi = function() {
};
typeof window < "u" && (yi = window.Element);
function oe(e) {
  return function(t) {
    return vi(t.theme, e);
  };
}
const ni = "__floating-vue__popper", $r = () => qt({
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
      default: oe("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: oe("positioningDisabled")
    },
    placement: {
      type: String,
      default: oe("placement"),
      validator: (e) => uc.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: oe("delay")
    },
    distance: {
      type: [Number, String],
      default: oe("distance")
    },
    skidding: {
      type: [Number, String],
      default: oe("skidding")
    },
    triggers: {
      type: Array,
      default: oe("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: oe("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: oe("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: oe("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: oe("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: oe("popperHideTriggers")
    },
    container: {
      type: [String, Object, yi, Boolean],
      default: oe("container")
    },
    boundary: {
      type: [String, yi],
      default: oe("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: oe("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: oe("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: oe("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: oe("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: oe("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: oe("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: oe("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: oe("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: oe("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: oe("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: oe("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: oe("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: oe("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: oe("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: oe("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: oe("flip")
    },
    shift: {
      type: Boolean,
      default: oe("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: oe("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: oe("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: oe("disposeTimeout")
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
      var o, r;
      (o = this.parentPopper) != null && o.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = !1, (n || !this.disabled) && (((r = this.parentPopper) == null ? void 0 : r.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
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
        fn: ({ placement: o, rects: r, middlewareData: s }) => {
          let l;
          const { centerOffset: d } = s.arrow;
          return o.startsWith("top") || o.startsWith("bottom") ? l = Math.abs(d) > r.reference.width / 2 : l = Math.abs(d) > r.reference.height / 2, {
            data: {
              overflow: l
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const o = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: r, placement: s, middlewareData: l }) => {
            var d;
            if ((d = l.autoSize) != null && d.skip)
              return {};
            let f, u;
            return s.startsWith("top") || s.startsWith("bottom") ? f = r.reference.width : u = r.reference.height, this.$_innerNode.style[o === "min" ? "minWidth" : o === "max" ? "maxWidth" : "width"] = f != null ? `${f}px` : null, this.$_innerNode.style[o === "min" ? "minHeight" : o === "max" ? "maxHeight" : "height"] = u != null ? `${u}px` : null, {
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
        apply: ({ availableWidth: o, availableHeight: r }) => {
          this.$_innerNode.style.maxWidth = o != null ? `${o}px` : null, this.$_innerNode.style.maxHeight = r != null ? `${r}px` : null;
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
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), Ot && this.instantMove && Ot.instantMove && Ot !== this.parentPopper) {
        Ot.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (Ot = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await ti(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...Hn(this.$_referenceNode),
        ...Hn(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), n = this.$_popperNode.querySelector(".v-popper__wrapper"), o = n.parentNode.getBoundingClientRect(), r = t.x + t.width / 2 - (o.left + n.offsetLeft), s = t.y + t.height / 2 - (o.top + n.offsetTop);
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
      for (const t of $o(this.theme))
        Mo(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await ti(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, Ro(Ye, this), Ye.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const n of $o(this.theme)) {
        const o = Mo(n);
        Ro(o, this), o.length === 0 && document.body.classList.remove(`v-popper--some-open--${n}`);
      }
      Ot === this && (Ot = null), this.isShown = !1, this.$_applyAttrsToTarget({
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
      this.$_registerTriggerListeners(this.$_targetNodes, Io, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], Io, this.popperTriggers, this.popperShowTriggers, e);
      const t = (n) => {
        n.usedByTooltip || this.hide({ event: n });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, No, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], No, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, n) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: n }), e.forEach((o) => o.addEventListener(t, n, wn ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(e, t, n, o, r) {
      let s = n;
      o != null && (s = typeof o == "function" ? o(s) : o), s.forEach((l) => {
        const d = t[l];
        d && this.$_registerEventListeners(e, d, r);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((n) => {
        const { targetNodes: o, eventType: r, handler: s } = n;
        !e || e === r ? o.forEach((l) => l.removeEventListener(r, s)) : t.push(n);
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
        const o = n.getAttribute(e);
        o && (n.removeAttribute(e), n.setAttribute(t, o));
      }
    },
    $_applyAttrsToTarget(e) {
      for (const t of this.$_targetNodes)
        for (const n in e) {
          const o = e[n];
          o == null ? t.removeAttribute(n) : t.setAttribute(n, o);
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
        const t = this.$_popperNode.getBoundingClientRect(), n = fn - yt, o = mn - _t, r = t.left + t.width / 2 - yt + (t.top + t.height / 2) - _t + t.width + t.height, s = yt + n * r, l = _t + o * r;
        return $n(yt, _t, s, l, t.left, t.top, t.left, t.bottom) || // Left edge
        $n(yt, _t, s, l, t.left, t.top, t.right, t.top) || // Top edge
        $n(yt, _t, s, l, t.right, t.top, t.right, t.bottom) || // Right edge
        $n(yt, _t, s, l, t.left, t.bottom, t.right, t.bottom);
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
    document.addEventListener("touchstart", (t) => Fo(t), e), document.addEventListener("touchend", (t) => qo(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => Fo(e), !0), window.addEventListener("click", (e) => qo(e, !1), !0);
  window.addEventListener("resize", mc);
}
function Fo(e, t) {
  for (let n = 0; n < Ye.length; n++) {
    const o = Ye[n];
    try {
      o.mouseDownContains = o.popperNode().contains(e.target);
    } catch {
    }
  }
}
function qo(e, t) {
  dc(e, t);
}
function dc(e, t) {
  const n = {};
  for (let o = Ye.length - 1; o >= 0; o--) {
    const r = Ye[o];
    try {
      const s = r.containsGlobalTarget = r.mouseDownContains || r.popperNode().contains(e.target);
      r.pendingHide = !1, requestAnimationFrame(() => {
        if (r.pendingHide = !1, !n[r.randomId] && Bo(r, s, e)) {
          if (r.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let d = r.parentPopper;
            for (; d; )
              n[d.randomId] = !0, d = d.parentPopper;
            return;
          }
          let l = r.parentPopper;
          for (; l && Bo(l, l.containsGlobalTarget, e); )
            l.$_handleGlobalClose(e, t), l = l.parentPopper;
        }
      });
    } catch {
    }
  }
}
function Bo(e, t, n) {
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
function $n(e, t, n, o, r, s, l, d) {
  const f = ((l - r) * (t - s) - (d - s) * (e - r)) / ((d - s) * (n - e) - (l - r) * (o - t)), u = ((n - e) * (t - s) - (o - t) * (e - r)) / ((d - s) * (n - e) - (l - r) * (o - t));
  return f >= 0 && f <= 1 && u >= 0 && u <= 1;
}
const hc = {
  extends: $r()
}, Di = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
};
function pc(e, t, n, o, r, s) {
  return C(), F("div", {
    ref: "reference",
    class: Qe(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    ge(e.$slots, "default", Qr(ea(e.slotData)))
  ], 2);
}
const gc = /* @__PURE__ */ Di(hc, [["render", pc]]);
function vc() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var n = e.indexOf("Trident/");
  if (n > 0) {
    var o = e.indexOf("rv:");
    return parseInt(e.substring(o + 3, e.indexOf(".", o)), 10);
  }
  var r = e.indexOf("Edge/");
  return r > 0 ? parseInt(e.substring(r + 5, e.indexOf(".", r)), 10) : -1;
}
let Dn;
function _i() {
  _i.init || (_i.init = !0, Dn = vc() !== -1);
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
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", Dn && this.$el.appendChild(e), e.data = "about:blank", Dn || this.$el.appendChild(e);
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
      this._resizeObject && this._resizeObject.onload && (!Dn && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
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
const bc = /* @__PURE__ */ yc((e, t, n, o, r, s) => (C(), re("div", _c)));
Kn.render = bc;
Kn.__scopeId = "data-v-b329ee4c";
Kn.__file = "src/components/ResizeObserver.vue";
const Ir = (e = "theme") => ({
  computed: {
    themeClass() {
      return cc(this[e]);
    }
  }
}), wc = qt({
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
function Cc(e, t, n, o, r, s) {
  const l = ii("ResizeObserver");
  return C(), F("div", {
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
    style: Dt(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = na((d) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    w("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (d) => e.autoHide && e.$emit("hide"))
    }),
    w("div", {
      class: "v-popper__wrapper",
      style: Dt(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      w("div", kc, [
        e.mounted ? (C(), F(de, { key: 0 }, [
          w("div", null, [
            ge(e.$slots, "default")
          ]),
          e.handleResize ? (C(), re(l, {
            key: 0,
            onNotify: t[1] || (t[1] = (d) => e.$emit("resize", d))
          })) : pe("", !0)
        ], 64)) : pe("", !0)
      ], 512),
      w("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: Dt(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, Ec, 4)
    ], 4)
  ], 46, xc);
}
const Nr = /* @__PURE__ */ Di(wc, [["render", Cc]]), Rr = {
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
const Pc = qt({
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
function Ac(e, t, n, o, r, s) {
  const l = ii("PopperContent"), d = ii("Popper");
  return C(), re(d, xi({ ref: "popper" }, e.$props, {
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
      isShown: u,
      shouldMountContent: b,
      skipTransition: v,
      autoHide: h,
      show: x,
      hide: k,
      handleResize: S,
      onResize: P,
      classes: p,
      result: T
    }) => [
      ge(e.$slots, "default", {
        shown: u,
        show: x,
        hide: k
      }),
      N(l, {
        ref: "popperContent",
        "popper-id": f,
        theme: e.finalTheme,
        shown: u,
        mounted: b,
        "skip-transition": v,
        "auto-hide": h,
        "handle-resize": S,
        classes: p,
        result: T,
        onHide: k,
        onResize: P
      }, {
        default: B(() => [
          ge(e.$slots, "popper", {
            shown: u,
            hide: k
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const Mi = /* @__PURE__ */ Di(Pc, [["render", Ac]]);
({
  ...Mi
});
({
  ...Mi
});
const Lc = {
  ...Mi,
  name: "VTooltip",
  vPopperTheme: "tooltip"
};
qt({
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
        n.then ? n.then((o) => this.onResult(t, o)) : this.onResult(t, n);
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
    return (t, n) => (C(), re(z(Oc), xi({
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
function Ic(e = 0, t = "USD", n = "", o = !0) {
  const r = $c(e, t);
  let s = "";
  return r.forEach((l) => {
    l.type === "currency" && (s += `<span class="${n}">${l.value}</span>`), l.type === "literal" && (s += `${l.value}`), l.type === "integer" && (s += `${l.value}`), o && l.type === "decimal" && (s += `${l.value}`), o && l.type === "fraction" && (s += `${l.value}`);
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
    const t = e, { t: n } = Ae(), o = ke(() => s(t.originalSellingPrice, "currency")), r = ke(() => s(t.sellingPrice, "price-block__current-currency")), s = (l, d = "", f = !0) => Ic(l, t.currency, d, f);
    return (l, d) => (C(), F("div", Nc, [
      e.discount ? (C(), F("div", Rc, [
        w("span", Dc, [
          w("span", null, "-" + M(e.discount), 1),
          d[0] || (d[0] = w("span", { class: "price-block__percent" }, "%", -1))
        ]),
        w("span", Mc, [
          w("span", {
            class: "amount",
            innerHTML: o.value
          }, null, 8, Fc)
        ])
      ])) : pe("", !0),
      w("div", qc, [
        w("div", Bc, [
          ge(l.$slots, "icons")
        ]),
        e.sellingPrice ? (C(), F("span", zc, [
          w("span", {
            class: "price-block__current-amount",
            innerHTML: r.value
          }, null, 8, Hc)
        ])) : e.sellingPrice === 0 ? (C(), F("span", Wc, M(z(n)("price.free")), 1)) : pe("", !0),
        e.sellingPrice && e.details ? (C(), F("div", Vc)) : pe("", !0)
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
    return (t, n) => (C(), F("div", jc, [
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
function Fi() {
  const { t: e } = Ae();
  function t(n) {
    return n.map((o) => o.map((r) => {
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
const Qc = (e) => e.toLowerCase().replace(/_([a-z])/g, (t, n) => n.toUpperCase()), eu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function tu(e, t) {
  return C(), F("svg", eu, t[0] || (t[0] = [
    w("path", { d: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z" }, null, -1)
  ]));
}
const nu = { render: tu }, iu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function ou(e, t) {
  return C(), F("svg", iu, t[0] || (t[0] = [
    w("path", { d: "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56z" }, null, -1)
  ]));
}
const ru = { render: ou }, au = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function su(e, t) {
  return C(), F("svg", au, t[0] || (t[0] = [
    w("path", { d: "M382-240 154-468l57-57 171 171 367-367 57 57z" }, null, -1)
  ]));
}
const lu = { render: su }, cu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function uu(e, t) {
  return C(), F("svg", cu, t[0] || (t[0] = [
    w("path", { d: "m424-296 282-282-56-56-226 226-114-114-56 56zm56 216q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const du = { render: uu }, fu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function mu(e, t) {
  return C(), F("svg", fu, t[0] || (t[0] = [
    w("path", { d: "M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720m-720 80h640v-80H160zm0 160v240h640v-240zm0 240v-480z" }, null, -1)
  ]));
}
const hu = { render: mu }, pu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function gu(e, t) {
  return C(), F("svg", pu, t[0] || (t[0] = [
    w("path", { d: "M320-400q-17 0-28.5-11.5T280-440t11.5-28.5T320-480t28.5 11.5T360-440t-11.5 28.5T320-400m160 0q-17 0-28.5-11.5T440-440t11.5-28.5T480-480t28.5 11.5T520-440t-11.5 28.5T480-400m160 0q-17 0-28.5-11.5T600-440t11.5-28.5T640-480t28.5 11.5T680-440t-11.5 28.5T640-400M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80zm0-80h560v-400H200zm0-480h560v-80H200zm0 0v-80z" }, null, -1)
  ]));
}
const vu = { render: gu }, yu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function _u(e, t) {
  return C(), F("svg", yu, t[0] || (t[0] = [
    w("path", { d: "M480-344 240-584l56-56 184 184 184-184 56 56z" }, null, -1)
  ]));
}
const bu = { render: _u }, wu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function xu(e, t) {
  return C(), F("svg", wu, t[0] || (t[0] = [
    w("path", { d: "M480-528 296-344l-56-56 240-240 240 240-56 56z" }, null, -1)
  ]));
}
const ku = { render: xu }, Tu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Su(e, t) {
  return C(), F("svg", Tu, t[0] || (t[0] = [
    w("path", { d: "M440-280h80v-240h-80zm40-320q17 0 28.5-11.5T520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600m0 520q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const Eu = { render: Su }, Cu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Pu(e, t) {
  return C(), F("svg", Cu, t[0] || (t[0] = [
    w("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const Au = { render: Pu }, Lu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Ou(e, t) {
  return C(), F("svg", Lu, t[0] || (t[0] = [
    w("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112z" }, null, -1)
  ]));
}
const $u = { render: Ou }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Nu(e, t) {
  return C(), F("svg", Iu, t[0] || (t[0] = [
    w("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320" }, null, -1)
  ]));
}
const Ru = { render: Nu }, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Mu(e, t) {
  return C(), F("svg", Du, t[0] || (t[0] = [
    w("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const Fu = { render: Mu }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Bu(e, t) {
  return C(), F("svg", qu, t[0] || (t[0] = [
    w("path", { d: "M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800z" }, null, -1)
  ]));
}
const zu = { render: Bu }, Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Wu(e, t) {
  return C(), F("svg", Hu, t[0] || (t[0] = [
    w("path", { d: "M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480t-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77 77 114T840-480t-28.5 140.5-77 114-114 77T480-120m112-192L440-464v-216h80v184l128 128z" }, null, -1)
  ]));
}
const Vu = { render: Wu }, Uu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Yu(e, t) {
  return C(), F("svg", Uu, t[0] || (t[0] = [
    w("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm320-280 320-200v-80L480-520 160-720v80z" }, null, -1)
  ]));
}
const ju = { render: Yu }, Xu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Gu(e, t) {
  return C(), F("svg", Xu, t[0] || (t[0] = [
    w("path", { d: "M160-120v-480l320-240 320 240v480H560v-280H400v280z" }, null, -1)
  ]));
}
const Ku = { render: Gu }, Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Zu(e, t) {
  return C(), F("svg", Ju, t[0] || (t[0] = [
    w("path", { d: "M120-120v-560h240v-80l120-120 120 120v240h240v400zm80-80h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 320h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 480h80v-80h-80zm0-160h80v-80h-80z" }, null, -1)
  ]));
}
const Qu = { render: Zu }, ed = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function td(e, t) {
  return C(), F("svg", ed, t[0] || (t[0] = [
    w("path", { d: "M798-120q-125 0-247-54.5T329-329 174.5-551 120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12" }, null, -1)
  ]));
}
const nd = { render: td }, id = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Add: nu,
  ArrowForward: ru,
  Check: lu,
  CheckCycle: du,
  CreditCard: hu,
  DateRange: vu,
  Email: ju,
  ExpandLess: bu,
  ExpandMore: ku,
  Home: Ku,
  Hotel: Qu,
  Info: Eu,
  People: Au,
  Person: $u,
  PersonOutline: Ru,
  Persons: Fu,
  Phone: nd,
  Restaurant: zu,
  Restore: Vu
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
    const t = e, n = ke(() => id[t.name] || null);
    return (o, r) => (C(), re(ia(n.value), xi(o.$attrs, {
      class: ["icon", e.small ? "icon--small" : ""]
    }), null, 16, ["class"]));
  }
}, od = {
  key: 0,
  class: "icons"
}, rd = {
  key: 1,
  class: "scenario-text"
}, ad = ["title"], sd = {
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
    const { t } = Ae();
    return (n, o) => e.kind === "adults" ? (C(), F("div", od, [
      Fe(N($e, {
        title: z(t)("ratePlan.scenario.mainBeds"),
        name: "Person"
      }, null, 8, ["title"]), [
        [$t, e.main === 2]
      ]),
      Fe(w("span", null, M(e.main), 513), [
        [$t, e.main > 2]
      ]),
      Fe(w("span", null, "x", 512), [
        [$t, e.main > 2]
      ]),
      N($e, {
        name: "Person",
        title: z(t)("ratePlan.scenario.mainBeds")
      }, null, 8, ["title"]),
      e.extraBed ? (C(), F(de, { key: 0 }, [
        N($e, { name: "Add" }, {
          default: B(() => o[0] || (o[0] = [
            te("add")
          ])),
          _: 1
        }),
        Fe(N($e, {
          title: z(t)("ratePlan.scenario.extraBeds"),
          name: "PersonOutline"
        }, null, 8, ["title"]), [
          [$t, e.extraBed === 2]
        ]),
        Fe(w("span", null, M(e.main), 513), [
          [$t, e.extraBed > 2]
        ]),
        Fe(w("span", null, "x", 512), [
          [$t, e.extraBed > 2]
        ]),
        N($e, {
          name: "PersonOutline",
          title: z(t)("ratePlan.scenario.extraBeds")
        }, null, 8, ["title"])
      ], 64)) : pe("", !0)
    ])) : e.kind === "child" ? (C(), F("span", rd, M(z(t)("ratePlan.scenario.family")), 1)) : (C(), F("div", {
      key: 2,
      class: "icons",
      title: z(t)("ratePlan.scenario.mainExtraBeds")
    }, [
      N($e, { name: "People" }),
      N($e, { name: "Add" }),
      N($e, { name: "PeopleOutline" })
    ], 8, ad));
  }
}, ld = { class: "cycle-loader" }, cd = {
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
    const t = e, { color: n, size: o, margin: r, radius: s } = oa(t), l = ke(() => ({
      backgroundColor: n.value,
      width: o.value,
      height: o.value,
      margin: r.value,
      borderRadius: s.value,
      display: "inline-block",
      animationName: "v-pulseStretchDelay",
      animationDuration: "0.75s",
      animationIterationCount: "infinite",
      animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
      animationFillMode: "both"
    })), d = ke(() => ({ animationDelay: "0.12s" })), f = ke(() => ({ animationDelay: "0.24s" })), u = ke(() => ({ animationDelay: "0.36s" }));
    return (b, v) => (C(), F("div", ld, [
      w("div", {
        style: Dt([l.value, d.value])
      }, null, 4),
      w("div", {
        style: Dt([l.value, f.value])
      }, null, 4),
      w("div", {
        style: Dt([l.value, u.value])
      }, null, 4)
    ]));
  }
}, ud = ["disabled"], Dr = {
  __name: "BflexButton",
  props: {
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => (C(), F("button", {
      class: "button",
      disabled: e.disabled
    }, [
      e.loading ? (C(), re(cd, {
        key: 0,
        size: "10px",
        color: "#fff"
      })) : ge(t.$slots, "default", { key: 1 })
    ], 8, ud));
  }
}, dd = { class: "rate-plan-card" }, fd = { class: "rate-plan-card__wrapper" }, md = { class: "rate-plan-card__description" }, hd = { class: "rate-plan-card__offers" }, pd = { class: "rate-plan-card__offers-item cancellation-policy-offer" }, gd = ["title"], vd = { class: "rate-plan-card__offers-item payment-type-offers" }, yd = { style: { "margin-right": "0.375rem" } }, _d = {
  key: 0,
  style: { margin: "0 0.375rem" }
}, bd = { class: "rate-plan-card__actions" }, wd = { class: "rate-plan-card__variants" }, xd = { class: "length-of-stay" }, kd = {
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
    const n = e, { t: o } = Ae(), r = ce(!1), s = ce({}), l = ke(() => {
      var b;
      return ((b = n.data.feed) == null ? void 0 : b.name) !== "ROOM_ONLY";
    }), d = t, f = (b, v) => {
      s.value[v] || (s.value[v] = !0, d("variant-chosen", b));
    }, { formatDescription: u } = Fi();
    return (b, v) => (C(), F("div", dd, [
      w("div", fd, [
        w("div", md, [
          w("h2", {
            onClick: v[0] || (v[0] = (h) => r.value = !r.value),
            class: "rate-plan-card__title cursor-pointer"
          }, [
            te(M(e.data.name) + " ", 1),
            N($e, {
              name: r.value ? "ExpandLess" : "ExpandMore"
            }, null, 8, ["name"])
          ]),
          Fe(w("blockquote", null, M(e.data.description), 513), [
            [$t, r.value]
          ]),
          w("div", hd, [
            w("div", pd, [
              N($e, { name: "Restore" }),
              N(wi, { class: "inline" }, {
                popper: B(() => [
                  (C(!0), F(de, null, Le(z(u)(e.data.cancellationPolicy.consequences), (h, x) => (C(), F("p", { key: x }, M(h), 1))), 128))
                ]),
                default: B(() => [
                  w("abbr", null, M(e.data.cancellationPolicy.name || ""), 1)
                ]),
                _: 1
              })
            ]),
            e.data.feed ? (C(), F("div", {
              key: 0,
              class: Qe(["rate-plan-card__offers-item", { "feed-offer": l.value }]),
              title: e.data.feed.description
            }, [
              N($e, { name: "Restaurant" }),
              w("span", null, M(e.data.feed.name ? z(o)(`ratePlan.boardType.${e.data.feed.name}`) : ""), 1)
            ], 10, gd)) : pe("", !0),
            w("div", vd, [
              N($e, { name: "CreditCard" }),
              w("span", null, [
                w("strong", yd, M(z(o)("ratePlan.payments")) + ":", 1),
                (C(!0), F(de, null, Le(e.data.paymentTypes, (h, x) => (C(), F(de, {
                  key: h.name
                }, [
                  N(wi, { class: "inline" }, {
                    popper: B(() => [
                      te(M(h.description), 1)
                    ]),
                    default: B(() => [
                      w("abbr", null, M(h.name), 1)
                    ]),
                    _: 2
                  }, 1024),
                  e.data.paymentTypes.length - 1 !== x ? (C(), F("strong", _d, M(z(o)("ratePlan.or")), 1)) : pe("", !0)
                ], 64))), 128))
              ])
            ]),
            e.data.extras.length ? (C(!0), F(de, { key: 1 }, Le(e.data.extras, (h, x) => (C(), F("div", {
              key: x,
              class: "rate-plan-card__offers-item extra-offer",
              style: Dt({ color: h.color })
            }, [
              N($e, { name: "Check" }, {
                default: B(() => v[1] || (v[1] = [
                  te("credit_card")
                ])),
                _: 1
              }),
              w("span", null, M(h.name), 1)
            ], 4))), 128)) : pe("", !0)
          ])
        ])
      ]),
      w("div", bd, [
        ge(b.$slots, "default", {}, () => [
          w("div", wd, [
            w("span", xd, M(z(o)("ratePlan.los", e.lengthOfStay)), 1),
            (C(!0), F(de, null, Le(e.data.variations || [], (h, x) => (C(), re(Jc, {
              key: x,
              price: h.price
            }, {
              icons: B(() => [
                N(sd, {
                  kind: h.occupancyOptions.kind,
                  main: h.occupancyOptions.main,
                  "extra-bed": h.occupancyOptions.extraBed
                }, null, 8, ["kind", "main", "extra-bed"])
              ]),
              default: B(() => [
                N(Dr, {
                  loading: s.value[x],
                  disabled: e.disabled && !s.value[x],
                  onClick: () => f(h, x),
                  class: "book-button"
                }, {
                  default: B(() => [
                    te(M(z(o)("ratePlan.action")), 1)
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
}, Td = {}, Sd = { class: "information-block__content" };
function Ed(e, t) {
  return C(), F("div", Sd, [
    ge(e.$slots, "default")
  ]);
}
const Ie = /* @__PURE__ */ xn(Td, [["render", Ed]]), Cd = { class: "rate-plan-list__wrapper" }, Pd = {
  __name: "BflexAccommodationOfferCard",
  props: {
    accommodationOffer: { type: Object, required: !0 },
    lengthOfStay: { type: Number, required: !0 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["accommodationOfferChosen"],
  setup(e, { emit: t }) {
    const { t: n } = Ae(), o = t, r = (s, l, d) => {
      o("accommodationOfferChosen", {
        accommodationOffer: s,
        ratePlan: l,
        variant: d
      });
    };
    return (s, l) => (C(), re(Ge, { class: "accommodation-offer" }, {
      default: B(() => [
        N(Hl, {
          data: e.accommodationOffer.accommodationType
        }, null, 8, ["data"]),
        w("div", Cd, [
          w("div", {
            class: Qe(["rate-plan-list", { "rate-plan-list--single": e.accommodationOffer.ratePlans.length <= 1 }])
          }, [
            (C(!0), F(de, null, Le(e.accommodationOffer.ratePlans, (d) => (C(), F(de, {
              key: d.id
            }, [
              N(Ce),
              N(kd, {
                data: d,
                "length-of-stay": e.lengthOfStay,
                disabled: e.loading,
                onVariantChosen: (f) => r(e.accommodationOffer, d, f)
              }, null, 8, ["data", "length-of-stay", "disabled", "onVariantChosen"])
            ], 64))), 128)),
            e.accommodationOffer.ratePlans.length ? pe("", !0) : (C(), F(de, { key: 0 }, [
              N(Ce),
              N(Ie, null, {
                default: B(() => [
                  w("p", null, [
                    w("strong", null, M(z(n)("accommodationType.notAvailable.title")), 1),
                    l[0] || (l[0] = w("br", null, null, -1)),
                    te(M(z(n)("accommodationType.notAvailable.description")), 1)
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
}, Ad = {}, Ld = { class: "information-block-grid" };
function Od(e, t) {
  return C(), F("div", Ld, [
    ge(e.$slots, "default")
  ]);
}
const Tn = /* @__PURE__ */ xn(Ad, [["render", Od]]), $d = {
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
    const n = e, o = ke(() => !n.dateRange.start || !n.dateRange.end ? 0 : _r(n.dateRange.start, n.dateRange.end)), r = ce([]), s = ce(!1), { setError: l } = ft("globalError");
    Ue(
      () => n.dateRange,
      async (v) => {
        if (!(!v.start || !v.end)) {
          s.value = !0;
          try {
            const h = await fa(v.start, v.end, n.promoCode);
            r.value = d(h.searchResults);
          } catch (h) {
            l(h);
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
    function d(v) {
      return [
        ...v.filter((h) => h.ratePlans && h.ratePlans.length > 0),
        ...v.filter((h) => !h.ratePlans || h.ratePlans.length === 0)
      ];
    }
    const f = t, u = ce(!1), b = async ({ accommodationOffer: v, ratePlan: h, variant: x }) => {
      u.value = !0;
      try {
        const k = await Vo({
          checkInDate: n.dateRange.start,
          checkOutDate: n.dateRange.end,
          accommodationType: v.accommodationType.id,
          ratePlan: h.id,
          adults: x.occupancyOptions.main + x.occupancyOptions.extraBed,
          children: [],
          quantity: 1
        });
        f("released", { action: cn, cart: k.cart });
      } catch (k) {
        l(k);
      } finally {
        u.value = !1;
      }
    };
    return (v, h) => (C(), re(Tn, null, {
      default: B(() => [
        s.value ? (C(), F(de, { key: 0 }, Le(3, (x) => N(kn, { key: x })), 64)) : (C(!0), F(de, { key: 1 }, Le(r.value, (x) => (C(), re(Pd, {
          "accommodation-offer": x,
          "length-of-stay": o.value,
          loading: u.value,
          key: x.accommodationType.id,
          onAccommodationOfferChosen: b
        }, null, 8, ["accommodation-offer", "length-of-stay", "loading"]))), 128))
      ]),
      _: 1
    }));
  }
}, Id = { class: "field-decorator" }, Nd = { class: "field-decorator__input-group" }, Rd = { class: "field-decorator__label" }, Dd = {
  key: 0,
  class: "field-decorator__required"
}, Md = { class: "field-decorator__slot" }, Fd = {
  key: 0,
  class: "field-decorator__hint"
}, Rt = {
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
    return (t, n) => (C(), F("div", Id, [
      w("div", Nd, [
        w("label", Rd, [
          te(M(e.label), 1),
          e.required ? (C(), F("span", Dd, "*")) : pe("", !0)
        ]),
        w("div", Md, [
          ge(t.$slots, "default")
        ])
      ]),
      e.hideHint ? pe("", !0) : (C(), F("div", Fd, M(e.hint), 1))
    ]));
  }
}, qd = { class: "information-block__header-additional" }, kt = {
  __name: "BflexHeader",
  props: {
    dense: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), F("header", {
      class: Qe({ dense: t.dense })
    }, [
      w("span", null, [
        ge(n.$slots, "default")
      ]),
      w("span", qd, [
        ge(n.$slots, "additional")
      ])
    ], 2));
  }
}, Bd = { class: "details-info" }, zd = { class: "details-info__icon" }, Hd = {
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
    return (t, n) => (C(), F("div", Bd, [
      w("div", zd, [
        e.hideIcon ? pe("", !0) : (C(), re($e, {
          key: 0,
          name: e.icon
        }, null, 8, ["name"]))
      ]),
      ge(t.$slots, "default")
    ]));
  }
}, Wd = {
  id: "customer-data-form",
  class: "customer-data-form"
}, Vd = {
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
    const n = e, { t: o } = Ae(), r = t, s = oi({ ...n.modelValue }), l = oi({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }), d = (f) => {
      const u = f.target;
      l[u.name] = u.validity.valid ? "" : u.validationMessage;
    };
    return Ue(
      s,
      (f) => {
        r("update:modelValue", f);
      },
      { deep: !0 }
    ), (f, u) => (C(), re(Ge, null, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(M(z(o)("contactInformation.title")), 1)
          ]),
          _: 1
        }),
        N(Ce),
        N(Ie, null, {
          default: B(() => [
            w("section", Wd, [
              N(Rt, {
                label: z(o)("contactInformation.firstName"),
                required: "",
                hint: l.firstName,
                class: Qe({ "form-group--error": l.firstName })
              }, {
                default: B(() => [
                  Fe(w("input", {
                    "onUpdate:modelValue": u[0] || (u[0] = (b) => s.firstName = b),
                    type: "text",
                    name: "firstName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: u[1] || (u[1] = (b) => d(b))
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
              N(Rt, {
                label: z(o)("contactInformation.lastName"),
                required: "",
                hint: l.lastName,
                class: Qe({ "form-group--error": l.lastName })
              }, {
                default: B(() => [
                  Fe(w("input", {
                    "onUpdate:modelValue": u[2] || (u[2] = (b) => s.lastName = b),
                    type: "text",
                    name: "lastName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: u[3] || (u[3] = (b) => d(b))
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
              N(Rt, {
                label: z(o)("contactInformation.email"),
                required: "",
                hint: l.email,
                class: Qe({ "form-group--error": l.email })
              }, {
                default: B(() => [
                  Fe(w("input", {
                    "onUpdate:modelValue": u[4] || (u[4] = (b) => s.email = b),
                    type: "email",
                    name: "email",
                    maxlength: "100",
                    required: "",
                    onInput: u[5] || (u[5] = (b) => d(b))
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
              N(Rt, {
                label: z(o)("contactInformation.phoneNumber"),
                hint: l.phone,
                class: Qe({ "form-group--error": l.phone })
              }, {
                default: B(() => [
                  Fe(w("input", {
                    "onUpdate:modelValue": u[6] || (u[6] = (b) => s.phone = b),
                    type: "tel",
                    name: "phone",
                    minlength: "7",
                    maxlength: "100",
                    onInput: u[7] || (u[7] = (b) => d(b))
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
            N(Hd, { icon: "Info" }, {
              default: B(() => [
                te(M(z(o)("contactInformation.confirmationInfo")), 1)
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
}, Ud = { class: "icon-text" }, Yd = { class: "icon-text__icon" }, jd = { class: "icon-text__text" }, Xt = {
  __name: "BflexIconText",
  props: {
    icon: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    return (t, n) => (C(), F("div", Ud, [
      w("span", Yd, [
        N($e, { name: e.icon }, null, 8, ["name"])
      ]),
      w("span", jd, [
        ge(t.$slots, "default")
      ])
    ]));
  }
}, Xd = { class: "text-sm" }, Gd = { class: "accommodation-list__item" }, Kd = {
  key: 0,
  style: { "font-size": "0.9em", opacity: "0.7" }
}, Jd = {
  class: "text-sm",
  style: { "line-height": "1.25", "font-weight": "lighter" }
}, Zd = {
  key: 1,
  style: { opacity: "0.7" }
}, Qd = {
  key: 0,
  class: "payment-type"
}, ef = { class: "payment-type__label" }, tf = { class: "payment-type__variants" }, nf = ["for"], of = ["name", "id", "value", "checked", "onChange"], rf = { class: "accommodation-list__total" }, af = { class: "accommodation-list__payment-rules" }, sf = { class: "highlighted" }, lf = { class: "highlighted" }, qi = {
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
    const n = e, { t: o } = Ae(), r = t, { formatDescription: s } = Fi(), l = (u) => {
      r("changePaymentType", u);
    }, d = (u) => {
      r("deleteAccommodationRequest", {
        checkInDate: u.checkInDate,
        checkOutDate: u.checkOutDate,
        accommodationType: u.accommodationType.id,
        ratePlan: u.ratePlan.id,
        adults: u.adults,
        children: u.children,
        quantity: 0
      });
    }, f = ce({});
    return Bt(() => {
      f.value = n.reservation.paymentType.id;
    }), (u, b) => e.loading ? (C(), re(kn, {
      key: 0,
      "is-result": ""
    })) : (C(), re(Ge, {
      key: 1,
      class: "accommodation-list"
    }, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(M(z(o)("chosenAccommodation.title")), 1)
          ]),
          _: 1
        }),
        N(Ce),
        N(Ie, null, {
          default: B(() => [
            w("dl", Xd, [
              w("dt", null, [
                N(Xt, { icon: "DateRange" }, {
                  default: B(() => [
                    te(M(z(Pl)(e.reservation.checkInDate, e.reservation.checkOutDate, e.locale)), 1)
                  ]),
                  _: 1
                })
              ]),
              w("dd", null, [
                N(Xt, { icon: "Persons" }, {
                  default: B(() => [
                    te(M(z(o)("chosenAccommodation.adults", e.reservation.adults)) + ", " + M(z(o)("chosenAccommodation.children", e.reservation.children.length)), 1)
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }),
        N(Ce),
        N(Ie, null, {
          default: B(() => [
            w("dl", Gd, [
              w("dt", null, [
                w("h3", null, [
                  te(M(e.reservation.accommodationType.name) + " ", 1),
                  e.reservation.quantity > 1 ? (C(), F("span", Kd, "x" + M(e.reservation.quantity), 1)) : pe("", !0)
                ]),
                w("div", Jd, [
                  te(M(e.reservation.ratePlan.name), 1),
                  b[1] || (b[1] = w("br", null, null, -1)),
                  N(wi, { class: "inline" }, {
                    popper: B(() => [
                      (C(!0), F(de, null, Le(z(s)(
                        e.reservation.cancellationPolicy.consequences
                      ), (v, h) => (C(), F("p", { key: h }, M(v), 1))), 128))
                    ]),
                    default: B(() => [
                      w("abbr", null, M(e.reservation.cancellationPolicy.name || ""), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              w("dd", null, [
                e.mode === "choose" ? (C(), F("div", {
                  key: 0,
                  onClick: b[0] || (b[0] = () => d(e.reservation)),
                  class: "accommodation-list__item-delete text-sm cursor-pointer"
                }, M(z(o)("chosenAccommodation.delete")), 1)) : pe("", !0),
                e.reservation.quantity > 1 ? (C(), F("span", Zd, M(e.reservation.quantity) + " x", 1)) : pe("", !0),
                te(" " + M(e.reservation.summary.total.amount) + " " + M(e.reservation.summary.total.currency), 1)
              ])
            ]),
            e.mode === "choose" ? (C(), F("div", Qd, [
              w("div", ef, M(z(o)("chosenAccommodation.willPay")) + ":", 1),
              w("div", tf, [
                (C(!0), F(de, null, Le(e.reservation.availablePaymentTypes, (v) => (C(), F("label", {
                  key: v.id,
                  for: `payment-type-${u.index}-${e.reservation.ratePlan.id}-${v.id}`
                }, [
                  w("input", {
                    type: "radio",
                    name: `payment-type-${u.index}`,
                    id: `payment-type-${u.index}-${e.reservation.ratePlan.id}-${v.id}`,
                    value: e.reservation.paymentType.id,
                    checked: +e.reservation.paymentType.id == +v.id,
                    onChange: () => l(v.id)
                  }, null, 40, of),
                  te(" " + M(v.name), 1)
                ], 8, nf))), 128))
              ])
            ])) : pe("", !0)
          ]),
          _: 1
        }),
        N(Ce),
        N(Ie, null, {
          default: B(() => [
            w("dl", rf, [
              w("dt", null, M(z(o)("chosenAccommodation.totalAmount")) + ":", 1),
              w("dd", null, [
                w("strong", null, [
                  w("span", null, M(e.summary.total.amount), 1),
                  te(" " + M(e.summary.total.currency), 1)
                ])
              ])
            ])
          ]),
          _: 1
        }),
        N(Ce),
        ge(u.$slots, "default", {}, () => [
          N(Ie, null, {
            default: B(() => [
              w("dl", af, [
                w("dt", sf, M(z(o)("chosenAccommodation.prepaymentAmount")) + ":", 1),
                w("dd", lf, M(e.payment.details.prepayment.amount) + " " + M(e.payment.details.prepayment.currency), 1),
                w("dt", null, M(z(o)("chosenAccommodation.onArrivalAmount")) + ":", 1),
                w("dd", null, [
                  w("span", null, M(e.payment.details.onArrival.amount), 1),
                  te(" " + M(e.payment.details.onArrival.currency), 1)
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
}, cf = { class: "summary-block" }, uf = { class: "summary-block__content" }, df = { class: "summary-block__content-info" }, ff = { class: "summary-block__content-info__price" }, mf = { class: "summary-block__content-info__text" }, hf = {
  class: "button",
  type: "submit"
}, pf = {
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
    const { t: n } = Ae(), o = t;
    return (r, s) => (C(), F("div", cf, [
      w("div", uf, [
        w("div", df, [
          w("div", ff, [
            w("span", null, M(e.totalAmount.amount), 1),
            te(" " + M(e.totalAmount.currency), 1)
          ]),
          w("div", mf, [
            te(M(z(n)("summary.room", e.accommodationUnits)) + ", " + M(z(n)("summary.los", e.lengthOfStay)) + " ", 1),
            N($e, {
              onClick: s[0] || (s[0] = ki((l) => o("onAccommodationSummaryClick"), ["stop"])),
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        w("button", hf, M(z(n)("summary.complete")), 1)
      ])
    ]));
  }
}, gf = { class: "text-sm" }, vf = {
  value: "none",
  selected: ""
}, yf = ["value"], _f = {
  __name: "BflexCustomerRequestCard",
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
    const n = e, { t: o } = Ae(), r = t, s = oi({ ...n.modelValue }), l = Al("00:00", "23:00");
    return Ue(
      s,
      (d) => {
        r("update:modelValue", d);
      },
      { deep: !0 }
    ), (d, f) => (C(), re(Ge, { class: "customer-request-block" }, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(M(z(o)("customerRequest.title")), 1)
          ]),
          _: 1
        }),
        N(Ce),
        N(Ie, null, {
          default: B(() => [
            N(Rt, {
              label: z(o)("customerRequest.comment")
            }, {
              default: B(() => [
                Fe(w("textarea", {
                  "onUpdate:modelValue": f[0] || (f[0] = (u) => s.comment = u),
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
        N(Ce),
        N(Ie, null, {
          default: B(() => [
            w("dl", gf, [
              w("dt", null, M(z(o)("customerRequest.checkInOutTime")) + ":", 1),
              w("dd", null, M(z(o)("customerRequest.checkInTimeFrom")) + ": " + M(e.arrivalPolicy.checkInTime) + "; " + M(z(o)("customerRequest.checkOutTimeUntil")) + ": " + M(e.arrivalPolicy.checkOutTime), 1)
            ])
          ]),
          _: 1
        }),
        N(Ce),
        N(Ie, null, {
          default: B(() => [
            N(Rt, {
              label: z(o)("customerRequest.arrivalTime"),
              style: { width: "50%" }
            }, {
              default: B(() => [
                Fe(w("select", {
                  name: "arrivalTime",
                  "onUpdate:modelValue": f[1] || (f[1] = (u) => s.arrivalTime = u)
                }, [
                  w("option", vf, M(z(o)("customerRequest.noneTime")), 1),
                  (C(!0), F(de, null, Le(z(l), (u) => (C(), F("option", {
                    value: u,
                    key: u
                  }, M(u), 9, yf))), 128))
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
}, bf = { class: "custom-checkbox" }, wf = ["required"], zo = {
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
    const n = e, o = t, r = ke({
      get: () => n.modelValue,
      set: (s) => o("update:modelValue", s)
    });
    return (s, l) => (C(), F("label", bf, [
      Fe(w("input", {
        type: "checkbox",
        "onUpdate:modelValue": l[0] || (l[0] = (d) => r.value = d),
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
    const t = e, { t: n } = Ae(), o = ke(() => t.agreements.filter((d) => d.combined)), r = ke(() => t.agreements.length > 0 || t.rules.length > 0), s = ce(!1), l = ce(t.agreements.map(() => !1));
    return (d, f) => r.value ? (C(), re(Ge, {
      key: 0,
      class: "agreement-rules-list"
    }, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(M(z(n)("accommodationRules.title")), 1)
          ]),
          _: 1
        }),
        e.rules.length > 0 ? (C(), F(de, { key: 0 }, [
          N(Ce),
          N(Ie, null, {
            default: B(() => [
              w("ul", xf, [
                (C(!0), F(de, null, Le(e.rules, (u, b) => (C(), F("li", { key: b }, M(u.text), 1))), 128))
              ])
            ]),
            _: 1
          })
        ], 64)) : pe("", !0),
        N(Ce),
        N(Ie, null, {
          default: B(() => [
            w("div", kf, [
              o.value.length > 0 ? (C(), F("div", Tf, [
                N(zo, {
                  modelValue: s.value,
                  "onUpdate:modelValue": f[0] || (f[0] = (u) => s.value = u),
                  required: ""
                }, {
                  default: B(() => [
                    w("span", null, [
                      te(M(z(n)("accommodationRules.agreementSentence")) + " ", 1),
                      (C(!0), F(de, null, Le(o.value, (u, b) => (C(), F("a", {
                        class: "agreement-rules-list__combined-agreement",
                        target: "_blank",
                        href: u.url,
                        key: b
                      }, M(u.anchor), 9, Sf))), 128)),
                      f[1] || (f[1] = te("."))
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ])) : pe("", !0),
              (C(!0), F(de, null, Le(e.agreements, (u, b) => (C(), F(de, { key: b }, [
                u.combined === !1 ? (C(), F("div", Ef, [
                  N(zo, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (v) => l.value[b] = v,
                    required: u.required
                  }, {
                    default: B(() => [
                      w("span", null, [
                        te(M(z(n)("accommodationRules.agreementSentenceShort")) + " ", 1),
                        w("a", {
                          target: "_blank",
                          href: u.url
                        }, M(u.anchor), 9, Cf)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "required"])
                ])) : pe("", !0)
              ], 64))), 128))
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : pe("", !0);
  }
}, Af = {
  __name: "ConfirmationPage",
  emits: ["released"],
  setup(e, { emit: t }) {
    const n = ce({
      customerInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      },
      customerRequest: {
        comment: "",
        arrivalTime: "none"
      },
      agreementList: []
    }), o = t, r = async ({
      checkInDate: P,
      checkOutDate: p,
      accommodationType: T,
      ratePlan: I,
      adults: E,
      children: D,
      quantity: q
    }) => {
      f.value = !0;
      try {
        const $ = await Vo({
          checkInDate: P,
          checkOutDate: p,
          accommodationType: T,
          ratePlan: I,
          adults: E,
          children: D,
          quantity: q
        });
        u.value = $.cart, $.cart.requests.length === 0 && o("released", { action: yr, result: $ });
      } catch ($) {
        b($);
      } finally {
        f.value = !1;
      }
    }, s = ce(null), l = ft("settings"), d = async (P) => {
      if (P.preventDefault(), s.value.reportValidity()) {
        f.value = !0;
        try {
          const p = await pa({
            customer: {
              ...n.value.customerInfo
            },
            customerRequest: n.value.customerRequest.comment,
            arrivalTime: n.value.customerRequest.arrivalTime
          });
          p && p.reservations && o("released", { action: Nn, result: p });
        } catch (p) {
          b(p);
        } finally {
          f.value = !1;
        }
      }
    }, f = ce(!0), u = ce(null), { setError: b } = ft("globalError");
    Bt(async () => {
      f.value = !0;
      try {
        const P = await ma();
        u.value = P.cart;
      } catch (P) {
        b(P);
      } finally {
        f.value = !1;
      }
    });
    const v = async (P) => {
      try {
        const p = await ha({
          request: Object.keys(u.value.requests)[0],
          paymentType: P
        });
        u.value = p.cart;
      } catch (p) {
        b(p);
      }
    }, h = ke(() => !u.value || !u.value.requests || Object.keys(u.value.requests).length === 0 ? 0 : Object.keys(u.value.requests).reduce((P, p) => {
      const T = u.value.requests[p];
      return P + T.quantity;
    }, 0)), x = ke(() => u.value && u.value.requests && Object.keys(u.value.requests).length > 0), k = ke(() => u.value.requests[Object.keys(u.value.requests)[0]]), S = ke(() => x.value ? (console.log("hasRequests.value:", x.value), console.log("cart.value.requests:", Object.keys(u.value.requests)), _r(k.value.checkInDate, k.value.checkOutDate)) : 0);
    return (P, p) => (C(), F("form", {
      onSubmit: d,
      ref_key: "confirmForm",
      ref: s
    }, [
      N(Tn, null, {
        default: B(() => [
          N(Vd, {
            modelValue: n.value.customerInfo,
            "onUpdate:modelValue": p[0] || (p[0] = (T) => n.value.customerInfo = T)
          }, null, 8, ["modelValue"]),
          u.value && x.value ? (C(), re(qi, {
            key: 0,
            mode: "choose",
            loading: f.value,
            locale: z(l).widget.locale,
            payment: u.value.payment,
            summary: u.value.summary,
            reservation: k.value,
            onChangePaymentType: v,
            onDeleteAccommodationRequest: r
          }, null, 8, ["loading", "locale", "payment", "summary", "reservation"])) : pe("", !0),
          N(_f, {
            modelValue: n.value.customerRequest,
            "onUpdate:modelValue": p[1] || (p[1] = (T) => n.value.customerRequest = T)
          }, null, 8, ["modelValue"]),
          N(Pf, {
            agreements: z(l).hotelRules.agreements,
            rules: z(l).hotelRules.rules
          }, null, 8, ["agreements", "rules"]),
          !f.value && u.value ? (C(), re(pf, {
            key: 1,
            "total-amount": u.value.summary.total,
            currency: u.value.currency,
            "accommodation-units": h.value,
            "length-of-stay": S.value
          }, null, 8, ["total-amount", "currency", "accommodation-units", "length-of-stay"])) : pe("", !0)
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
    const { t } = Ae();
    return (n, o) => (C(), re(Ge, null, {
      default: B(() => [
        N(kt, null, {
          default: B(() => [
            te(M(z(t)("reservation.hotelInfo.title")), 1)
          ]),
          _: 1
        }),
        N(Ce),
        N(Ie, null, {
          default: B(() => [
            w("div", Lf, [
              N(Xt, { icon: "Hotel" }, {
                default: B(() => [
                  te(M(e.hotelInfo.name), 1)
                ]),
                _: 1
              }),
              N(Xt, { icon: "Home" }, {
                default: B(() => [
                  te(M(e.hotelInfo.address.address), 1)
                ]),
                _: 1
              }),
              N(Xt, { icon: "Phone" }, {
                default: B(() => [
                  w("a", {
                    href: `tel:${e.hotelInfo.phone}`
                  }, M(e.hotelInfo.phone), 9, Of)
                ]),
                _: 1
              }),
              N(Xt, { icon: "Email" }, {
                default: B(() => [
                  w("a", $f, M(e.hotelInfo.email), 1)
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
  emits: ["click"],
  setup(e, { emit: t }) {
    const { t: n } = Ae(), o = t, r = () => o("click");
    return (s, l) => (C(), F("div", If, [
      w("div", Nf, [
        w("div", Rf, [
          w("div", Df, [
            w("span", null, M(e.prepayment), 1),
            te(" " + M(e.currency), 1)
          ]),
          w("div", Mf, [
            te(M(z(n)("reservation.payment.prepayment")) + " ", 1),
            N($e, {
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        w("button", {
          class: "button",
          onClick: ki(r, ["stop"])
        }, M(z(n)("reservation.payment.action")), 1)
      ])
    ]));
  }
}, qf = { class: "reservation-result" }, Bf = { class: "reservation-result__title" }, zf = { class: "reservation-result__description" }, Hf = {
  __name: "ResultPage",
  props: {
    sid: {
      type: String,
      required: !0,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = Ae(), o = ft("settings"), r = ce(null), s = ce([]), l = ce(!0), { setError: d } = ft("globalError"), f = async () => {
      if (t.sid) {
        l.value = !0;
        try {
          const v = await Uo({ sid: t.sid });
          r.value = v.data;
        } catch (v) {
          d(v);
        } finally {
          l.value = !1;
        }
      }
    }, u = ke(() => {
      var v;
      return (v = r.value) != null && v.reservation ? Qc(r.value.reservation.status) : "";
    }), b = () => {
      s.value.forEach((v) => {
        console.log(v), window.open(v, "_blank");
      });
    };
    return Ue(() => t.sid, f), Bt(f), (v, h) => (C(), re(Tn, null, {
      default: B(() => [
        l.value ? (C(), re(kn, { key: 0 })) : (C(), F(de, { key: 1 }, [
          w("section", qf, [
            w("div", Bf, M(z(n)("reservation.title")), 1),
            w("div", zf, M(z(n)(`reservation.description.${u.value}`)), 1)
          ]),
          N(qi, {
            mode: "info",
            reservation: r.value.reservation,
            summary: r.value.summary,
            payment: r.value.payment,
            locale: z(o).widget.locale
          }, null, 8, ["reservation", "summary", "payment", "locale"]),
          N(Ge, { class: "information-block--attention" }, {
            default: B(() => [
              N(kt, null, {
                default: B(() => [
                  te(M(z(n)("reservation.whatIsNext")), 1)
                ]),
                _: 1
              }),
              N(Ce),
              N(Ie, null, {
                default: B(() => [
                  te(M(z(n)(`reservation.nextStep.${u.value}`, { untilTime: "" })), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          r.value.note ? (C(), re(Ge, { key: 0 }, {
            default: B(() => [
              N(kt, null, {
                default: B(() => [
                  te(M(z(n)("reservation.customerRequest")), 1)
                ]),
                _: 1
              }),
              N(Ce),
              N(Ie, null, {
                default: B(() => [
                  te(M(r.value.note), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : pe("", !0),
          N(Mr, {
            "hotel-info": z(o).hotelInfo
          }, null, 8, ["hotel-info"]),
          s.value.length ? (C(), re(Ff, {
            key: 1,
            prepayment: r.value.payment.prepayment,
            currency: r.value.currency,
            onClick: b
          }, null, 8, ["prepayment", "currency"])) : pe("", !0)
        ], 64))
      ]),
      _: 1
    }));
  }
}, Wf = { class: "reservation-result" }, Vf = { class: "reservation-result__title" }, Uf = { class: "reservation-result__description" }, Yf = { class: "accommodation-list__payment-rules" }, jf = { style: { color: "orangered" } }, Xf = { style: { color: "orangered" } }, Gf = { style: { display: "flex", "flex-direction": "row", "justify-content": "end", "column-gap": "0.5rem", padding: "1rem", "align-items": "center" } }, Kf = ["value"], Jf = { class: "agreement-rules-list__rules" }, Zf = {
  __name: "CancelReservationPage",
  props: {
    sid: {
      type: String,
      required: !0,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = Ae(), o = ft("settings"), r = ce(null), s = ce(!0), { setError: l } = ft("globalError"), d = async () => {
      if (t.sid) {
        s.value = !0;
        try {
          const h = await Uo({ sid: atob(t.sid) });
          r.value = h.data;
        } catch (h) {
          l(h);
        } finally {
          s.value = !1;
        }
      }
    }, { formatDescription: f } = Fi(), u = ce(""), b = ce(!1), v = async () => {
      b.value = !1, (await ga({ sid: atob(t.sid), code: u.value })).successful ? (alert(n("cancellationProcess.result.success")), window.location.replace(window.location.origin)) : (alert(n("cancellationProcess.result.error")), u.value = "");
    };
    return Ue(() => t.sid, d), Bt(d), (h, x) => (C(), re(Tn, null, {
      default: B(() => [
        s.value ? (C(), re(kn, { key: 0 })) : (C(), F(de, { key: 1 }, [
          w("section", Wf, [
            w("div", Vf, M(z(n)("cancellationProcess.title")), 1),
            w("div", Uf, M(z(n)("cancellationProcess.description")), 1)
          ]),
          N(qi, {
            mode: "cancellation",
            reservation: r.value.reservation,
            summary: r.value.summary,
            payment: r.value.payment,
            locale: z(o).widget.locale
          }, {
            default: B(() => [
              N(Ie, null, {
                default: B(() => [
                  w("dl", Yf, [
                    w("dt", jf, M(z(n)("chosenAccommodation.penalty")) + ":", 1),
                    w("dd", Xf, M(r.value.reservation.penalties.total.amount) + " " + M(r.value.reservation.penalties.total.currency), 1)
                  ])
                ]),
                _: 1
              }),
              N(Ce),
              w("div", Gf, [
                w("div", null, M(z(n)("cancellationProcess.codeHelp")), 1),
                N(Rt, {
                  label: z(n)("cancellationProcess.codeLabel"),
                  "hide-hint": ""
                }, {
                  default: B(() => [
                    w("input", {
                      name: "cancellationCode",
                      value: u.value,
                      onInput: x[0] || (x[0] = ki((k) => u.value = k.currentTarget.value, ["stop"]))
                    }, null, 40, Kf)
                  ]),
                  _: 1
                }, 8, ["label"]),
                N(Dr, {
                  onClick: v,
                  disabled: !u.value
                }, {
                  default: B(() => [
                    te(M(z(n)("cancellationProcess.action")), 1)
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
                  te(M(z(n)("cancellationProcess.rules")), 1)
                ]),
                _: 1
              }),
              N(Ce),
              N(Ie, null, {
                default: B(() => [
                  w("ul", Jf, [
                    (C(!0), F(de, null, Le(z(f)(
                      r.value.reservation.cancellationPolicy.consequences
                    ), (k, S) => (C(), F("li", { key: S }, M(k), 1))), 128))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          N(Mr, {
            "hotel-info": z(o).hotelInfo
          }, null, 8, ["hotel-info"])
        ], 64))
      ]),
      _: 1
    }));
  }
}, Qf = { id: "bflex-booking-widget" }, em = { class: "booking-widget" }, Fr = {
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
    const t = e, n = ce({
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
    const o = [cn, Nn, xo], r = ce(null), s = (k) => {
      if (!k)
        r.value = cn;
      else if (k === ei)
        r.value = ei;
      else {
        const S = o.indexOf(k);
        S >= 0 && S < o.length - 1 && (r.value = o[S + 1]);
      }
      f.value.scrollTop = 0, window.dispatchEvent(
        new CustomEvent("bflex:booking-widget:action", { detail: { action: r.value } })
      );
    }, l = ce(!1), d = ce(""), f = ce(null), u = ce({
      start: t.start,
      end: t.end,
      promoCode: t.promoCode
    });
    Ue(
      () => ({ start: t.start, end: t.end, promoCode: t.promoCode }),
      () => {
        u.value = {
          start: t.start,
          end: t.end,
          promoCode: t.promoCode
        };
      }
    ), Ue(
      u,
      (k, S) => {
        !k.start || !k.end || (!S || !S.start || !S.end || S.start !== k.start || S.end !== k.end) && window.dispatchEvent(
          new CustomEvent("bflex:booking-widget:changed", { detail: sa(u.value) })
        );
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    const { setError: b } = ft("globalError"), v = (k) => {
      const { start: S, end: P, promoCode: p } = k.detail;
      u.value = { start: S, end: P, promoCode: p }, k.stopPropagation();
    };
    Bt(async () => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:ready")), window.addEventListener("bflex:search-bar:search", v), l.value = !0;
      try {
        const { inProgress: k, settings: S } = await da();
        n.value = S;
        const { widget: P } = S;
        P && P.locale && P.l10n && Object.keys(P.l10n).length && (Fn.global.locale.value = P.locale, Fn.global.setLocaleMessage(P.locale, P.l10n));
        const p = new URLSearchParams(window.location.search);
        p.has("cancelReservation") ? (x.value = p.get("cancelReservation"), console.log("Cancel reservation", x.value), s(ei)) : k ? s(cn) : s();
      } catch (k) {
        b(k);
      } finally {
        setTimeout(() => {
          l.value = !1;
        }, 1e3);
      }
    }), Wn(() => {
      window.removeEventListener("bflex:search-bar:search", v);
    });
    const h = ({ action: k, result: S }) => {
      k === yr ? s() : (k === Nn && (d.value = S.reservations[0]), s(k));
    }, x = ce(null);
    return (k, S) => (C(), F("main", Qf, [
      w("div", em, [
        w("section", {
          ref_key: "container",
          ref: f,
          class: "booking-widget__content"
        }, [
          l.value ? (C(), re(Tn, { key: 0 }, {
            default: B(() => [
              (C(), F(de, null, Le(3, (P) => N(kn, { key: P })), 64))
            ]),
            _: 1
          })) : pe("", !0),
          x.value ? (C(), re(Zf, {
            key: 1,
            sid: x.value,
            onCancelReservation: S[0] || (S[0] = (P) => x.value = null)
          }, null, 8, ["sid"])) : r.value === z(cn) ? (C(), re($d, {
            key: 2,
            dateRange: u.value,
            promoCode: e.promoCode,
            onReleased: h
          }, null, 8, ["dateRange", "promoCode"])) : r.value === z(Nn) ? (C(), re(Af, {
            key: 3,
            onReleased: h
          })) : r.value === z(xo) ? (C(), re(Hf, {
            key: 4,
            sid: d.value,
            onReleased: h
          }, null, 8, ["sid"])) : pe("", !0)
        ], 512)
      ])
    ]));
  }
}, tm = { style: { display: "flex", "flex-direction": "column", "min-height": "300px", "justify-content": "center", "align-items": "center" } }, qr = {
  __name: "BflexErrorProvider",
  setup(e) {
    const { t } = Ae(), n = ce(null);
    Wo("globalError", { setError: (l) => {
      n.value = l;
    }, clearError: () => {
      n.value = null;
    } });
    const s = () => {
      location.reload();
    };
    return (l, d) => n.value ? (C(), re(Ge, { key: 1 }, {
      default: B(() => [
        N(Ie, null, {
          default: B(() => [
            w("section", tm, [
              w("h1", null, M(z(t)("globalError.title")), 1),
              w("p", null, M(z(t)("globalError.description")), 1),
              w("button", {
                class: "button",
                onClick: s
              }, M(z(t)("globalError.reload")), 1)
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : ge(l.$slots, "default", { key: 0 });
  }
}, nm = '@charset "UTF-8";.resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}.v-popper__popper{z-index:10000;top:0;left:0;outline:none}.v-popper__popper.v-popper__popper--hidden{visibility:hidden;opacity:0;transition:opacity .15s,visibility .15s;pointer-events:none}.v-popper__popper.v-popper__popper--shown{visibility:visible;opacity:1;transition:opacity .15s}.v-popper__popper.v-popper__popper--skip-transition,.v-popper__popper.v-popper__popper--skip-transition>.v-popper__wrapper{transition:none!important}.v-popper__backdrop{position:absolute;top:0;left:0;width:100%;height:100%;display:none}.v-popper__inner{position:relative;box-sizing:border-box;overflow-y:auto}.v-popper__inner>div{position:relative;z-index:1;max-width:inherit;max-height:inherit}.v-popper__arrow-container{position:absolute;width:10px;height:10px}.v-popper__popper--arrow-overflow .v-popper__arrow-container,.v-popper__popper--no-positioning .v-popper__arrow-container{display:none}.v-popper__arrow-inner,.v-popper__arrow-outer{border-style:solid;position:absolute;top:0;left:0;width:0;height:0}.v-popper__arrow-inner{visibility:hidden;border-width:7px}.v-popper__arrow-outer{border-width:6px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{left:-2px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{left:-1px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer{border-bottom-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-container{top:0}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{border-top-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-top-color:transparent!important}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{top:-4px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{top:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{top:-1px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{border-left-width:0;border-left-color:transparent!important;border-top-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{left:-4px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{left:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-container{right:-10px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer{border-right-width:0;border-top-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner{left:-2px}.v-popper--theme-tooltip .v-popper__inner{background:#000c;color:#fff;border-radius:6px;padding:7px 12px 6px}.v-popper--theme-tooltip .v-popper__arrow-outer{border-color:#000c}.v-popper--theme-dropdown .v-popper__inner{background:#fff;color:#000;border-radius:6px;border:1px solid #ddd;box-shadow:0 6px 30px #0000001a}.v-popper--theme-dropdown .v-popper__arrow-inner{visibility:visible;border-color:#fff}.v-popper--theme-dropdown .v-popper__arrow-outer{border-color:#ddd}:host,.booking-widget{font-family:var(--font-base, "Roboto"),sans-serif;font-size:var(--base-font, 16px);color:#4a5568;line-height:1.5;box-sizing:border-box;display:flex;flex-direction:column;max-width:960px;margin:0 auto}*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}.booking-widget__content{position:relative;min-height:450px}h1{font-size:1.5rem;font-weight:600;margin-bottom:1rem}h2{font-size:1.25rem;font-weight:600;margin-bottom:.75rem;color:var(--base-header-color, #1a202c)}h3{font-size:1.125rem;font-weight:600;margin-bottom:.75rem;color:var(--base-header-color, #1a202c)}h4{font-size:1rem;font-weight:600;margin-bottom:.5rem;color:var(--base-header-color, #1a202c)}h5{font-size:.875rem;font-weight:600;margin-bottom:.5rem;color:var(--base-header-color, #1a202c)}p{font-size:1rem;margin-bottom:.75rem;color:#4a5568}small,.text-sm{font-size:.875rem}.button{display:inline-flex;align-items:center;justify-content:center;font-size:.875rem;padding:.5rem 1rem;border-radius:.375rem;background:var(--base-button-bg, #ea580c);color:var(--base-button-color, #ffffff);border:none;cursor:pointer;text-decoration:none;text-wrap:nowrap;transition:background-color .2s}.button:hover{background:var(--base-button-bg-hover, #c2410c)}.button:disabled{background:#ccc;cursor:not-allowed}.section{padding:1.5rem}.card+.card{margin-top:1rem}blockquote,.blockquote{border-left:3px solid #696969;padding-left:1rem;margin-bottom:1rem;font-size:.875rem;color:#696969}.cursor-pointer{cursor:pointer}abbr,.abbreviation{display:inline;border-bottom-style:dotted;border-bottom-width:1px;cursor:pointer;white-space:pre-line}.inline{display:inline}strong{font-weight:700}a{color:#ea580c;cursor:pointer;text-decoration:underline}a:hover{text-decoration:none}ul{margin:0}ul li{display:block;margin-bottom:.5rem;list-style:disc}ul li:before{content:"";display:inline-flex;margin-right:.25rem}#bflex-booking-widget{position:relative;container-type:inline-size;container-name:widget}@container widget (max-width: 480px){.booking-widget{font-size:var(--base-font, 14px);line-height:1.4}}.details-info{display:flex;background-color:#f9f9fa;border-radius:5px;padding:1rem 1.25rem;font-size:.875rem;column-gap:.5rem}.details-info--icon{flex:0 0 1rem}.accommodation-list__item{margin-bottom:.5rem}.accommodation-list__item-delete{margin-bottom:.5rem;color:#a1a1a1}.accommodation-list__item-delete:hover{color:#1b1b1f}.accommodation-list__total{color:#000}.accommodation-list__payment-rules dd,.accommodation-list__payment-rules dt{margin-bottom:.25rem;font-size:.875rem}.accommodation-list__payment-rules .highlighted{color:var(--chosen-accommodation-payment-types, #ea580c)}.accommodation-list .payment-type{display:inline-flex;flex-direction:row;align-items:center;font-size:.875rem;border:1px solid var(--chosen-accommodation-payment-types, #ea580c);border-radius:5px;margin-top:1rem}.accommodation-list .payment-type__label{font-weight:700;background-color:var(--chosen-accommodation-payment-types, #ea580c);color:#fff;height:100%;padding:.5rem 1rem;flex-wrap:nowrap;text-wrap:nowrap}.accommodation-list .payment-type__variants{display:flex;flex-direction:row;align-items:start;justify-content:start;width:100%;padding:.5rem 1rem;box-sizing:border-box}.accommodation-list .payment-type label{display:flex;flex-direction:row;font-weight:400;margin-right:1rem;cursor:pointer}.accommodation-list .payment-type label input[type=radio]{margin:0 .25rem;padding:0}@container widget (max-width: 480px){.accommodation-list .payment-type{flex-direction:column;align-items:start;width:100%}.accommodation-list .payment-type__label{margin-right:0;width:100%}.accommodation-list .payment-type__variants{flex-direction:column;align-items:start;justify-content:start;width:100%}.accommodation-list .payment-type label{flex-direction:row;padding:.5rem .5rem .5rem 0}}.rate-plan-list{display:flex;flex-flow:column}.rate-plan-list .rate-plan-card:last-child{border-bottom-left-radius:var(--main-border-radius, 10px);border-bottom-right-radius:var(--main-border-radius, 10px)}@container widget (max-width: 480px){.accommodation-offer{overflow-x:hidden}.rate-plan-list__wrapper{padding:.5rem}.rate-plan-list{overflow-x:scroll;scroll-snap-type:x mandatory;flex-direction:row;column-gap:.5rem}}.agreement-rules-list__rules li{padding-left:.25rem}.agreement-rules-list__rules li:before{display:inline-block;content:"—";margin-right:.25rem}.agreement-rules-list__agreements-item{display:flex;flex-direction:row;margin-bottom:.5rem}.agreement-rules-list__combined-agreement{padding:0}.agreement-rules-list__combined-agreement:after{display:inline-block;padding-right:0;content:", ";text-decoration:none}.agreement-rules-list__combined-agreement:last-child:after{content:"";display:none}.accommodation-type-card{display:flex;color:var(--accommodation-type-card-color);border-top-left-radius:var(--main-border-radius, 10px);border-top-right-radius:var(--main-border-radius, 10px);background:var(--accommodation-type-card-background, transparent)}.accommodation-type-card__img{width:300px;flex-shrink:0;border-top-left-radius:var(--main-border-radius, 10px);overflow:hidden;background:#f0f0f0;cursor:pointer;display:flex;color:#718096}.accommodation-type-card__img img{width:100%;height:100%;object-fit:cover;object-position:center}.accommodation-type-card__img span{text-align:center;width:100%;display:flex;align-items:center;justify-content:center;min-height:180px}.accommodation-type-card__body{display:flex;flex-flow:column;justify-content:space-between;padding:1.5rem;width:100%}.amenities{font-size:.75rem;background:transparent;margin-top:.75rem;display:inline-flex;flex-wrap:wrap;gap:.5rem;font-weight:500}.amenities__item{border:none;padding:.375rem .5rem;line-height:1;background:var(--amenities-item-bg, #ebf8ff);color:var(--amenities-item-text-color, #2b6cb0);border-radius:var(--amenities-item-border-radius, 4px)}.amenities__item:nth-last-child(2){background:var(--amenities-item-secondary-bg, #faf5ff);color:var(--amenities-item-text-secondary-color, #553c9a)}.amenities__item:last-child{background:var(--amenities-item-tertiary-bg, #f0fff4);color:var(--amenities-item-text-tertiary-color, #22543d)}@container widget (max-width: 480px){.accommodation-type-card{flex-flow:column;max-height:initial;height:auto}.accommodation-type-card__img{width:auto;border-top-right-radius:var(--main-border-radius, 10px);line-height:1}.accommodation-type-card__img img{height:220px}.accommodation-type-card__body{width:auto}}.custom-checkbox{display:flex;align-items:center;cursor:pointer}.custom-checkbox input[type=checkbox]{position:absolute;opacity:0;width:1.25rem;height:1.25rem;cursor:pointer}.custom-checkbox__box{width:1rem;height:1rem;flex:0 0 1rem;border:2px solid rgba(34,34,34,.2);border-radius:3px;position:relative;margin-right:.5rem;transition:background-color .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box{background-color:#fff}.custom-checkbox__box:after{content:"";position:absolute;top:50%;left:50%;width:.5rem;height:.5rem;background-color:#ea580c;transform:translate(-50%,-50%) scale(0);transition:transform .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box:after{transform:translate(-50%,-50%) scale(1)}.customer-data-form{display:grid;grid-template-columns:1fr 1fr;row-gap:1rem;column-gap:1.5rem;padding:1rem 0 0}@container widget (max-width: 480px){.customer-data-form{grid-template-columns:1fr}}.field-decorator__required{padding-left:3px;color:red}.field-decorator__input-group{border:1px solid #e5e5e5;border-radius:5px;background-color:#fff;padding:.25rem .5rem;display:flex;flex-direction:column}.field-decorator__label{font-size:.875em;margin-bottom:.25em;line-height:1;color:#2226}.field-decorator__slot{display:flex;flex-direction:column;width:100%;height:auto}.field-decorator__slot textarea,.field-decorator__slot select,.field-decorator__slot input{border:0!important;outline:0!important;background:#fff;width:100%;height:100%;font-size:.875rem;padding:.25rem 0}.field-decorator__slot textarea{resize:vertical}.field-decorator__hint{height:1.25rem;color:#3d3d3d;text-align:right;font-size:.725rem;overflow:hidden}.form-group--error .field-decorator__input-group{border-color:red}.form-group--error .field-decorator__hint{color:red}.information-block-grid{display:grid;grid-row-gap:1.25rem}.information-block{background-color:var(--information-block-bg, #ffffff);border-radius:var(--main-border-radius, 10px);box-shadow:0 4px 12px #00000014}.information-block--attention{border:3px solid red}.information-block__content{padding:1rem 1.25rem}.information-block__content dl{display:grid;grid-template-columns:1fr 1fr;gap:.25rem;align-items:center}.information-block__content dl dt{font-weight:700;line-height:1}.information-block__content dl dd{text-align:right;line-height:1}.information-block__content a{padding:0 .25rem}.information-block .divider{margin:0;height:var(--information-block-divider-height, 1px);background-color:var(--information-block-divider-bg, #e5e5e5)}.information-block header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin:0;padding:1rem 1.25rem;border-radius:10px 10px 0 0;font-size:1.25rem;font-weight:700}.information-block header .additional{color:gray;font-weight:400}.information-block header.dense{padding:.5rem 1.25rem}@container widget (max-width: 480px){.information-block header{flex-direction:column;align-items:flex-start}}.cycle-loader{display:flex}@-webkit-keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}@keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}.price-block{display:grid;grid-template-columns:1fr;grid-template-areas:"discount" "amount";line-height:1;height:100%;width:100%}.price-block__discount{grid-area:discount;line-height:1;display:flex;align-items:center;justify-self:end;font-size:.75rem;font-weight:lighter;color:var(--price-block-discount-old-value, #4a5568)}.price-block__discount-size{display:block;padding:.125rem;margin-right:.25rem;background:var(--price-block-discount-bg, #dc2626);color:var(--price-block-discount-color, white);border-radius:.25rem}.price-block__old{text-decoration-line:line-through;opacity:.5}.price-block__schedule{font-size:.75rem}.price-block__icons .icon{font-size:1rem;fill:var(--price-block-person-icon-color)}.price-block__amount{grid-area:amount;display:flex;flex-direction:row;align-items:center;justify-content:space-between;line-height:1;font-size:1.25rem}.price-block__current{margin-left:.5rem}.price-block__current-currency{font-weight:lighter;padding:0 .125rem}@container widget (max-width: 480px){.price-block{grid-template-columns:1fr;grid-template-areas:"amount discount";column-gap:1rem}}.rate-plan-card{display:grid;grid-template-columns:1fr 1fr;grid-template-areas:"description actions" "bottom actions";width:100%;position:relative;background-color:var(--rate-plan-background);font-size:var(--rate-plan-font-size);color:var(--rate-plan-color)}.rate-plan-card--blocked{display:flex;justify-content:center;height:100%;width:100%;position:absolute;background:#0000001a;z-index:1}.rate-plan-card__title{display:inline-flex;align-items:center}.rate-plan-card__wrapper{grid-area:description;padding:0}.rate-plan-card blockquote{border-left-color:var(--rate-plan-secondary-color);color:var(--rate-plan-secondary-color)}.rate-plan-card__description{padding:1.5rem}.rate-plan-card__offers{font-size:var(--rate-plan-font-size, .875rem);color:var(--rate-plan-secondary-color)}.rate-plan-card__offers-item{display:flex;align-items:center;padding:.375rem 0}.rate-plan-card__offers-item .icon{margin-right:.375rem;color:var(--rate-plan-icon-color);fill:var(--rate-plan-icon-color, #696969)}.rate-plan-card__offers-item.extra-offer .icon{color:inherit}.rate-plan-card__offers-item.feed-offer{color:var(--rate-plan-feed-text-color, #059669)}.rate-plan-card__offers-item.feed-offer .icon{color:var(--rate-plan-feed-icon-color, #059669);fill:var(--rate-plan-feed-icon-color, #059669)}.rate-plan-card__offers-item.cancellation-policy-offer{color:var(--rate-plan-cancellation-policy-text-color)}.rate-plan-card__offers-item.cancellation-policy-offer .icon{color:var(--rate-plan-cancellation-policy-icon-color, #696969);fill:var(--rate-plan-cancellation-policy-icon-color, #696969)}.rate-plan-card__offers-item.payment-type-offers{color:var(--rate-plan-payment-type-text-color)}.rate-plan-card__offers-item.payment-type-offers .icon{color:var(--rate-plan-payment-type-icon-color, #696969);fill:var(--rate-plan-payment-type-icon-color, #696969)}.rate-plan-card__variants{display:flex;flex-direction:column;align-items:end;padding:1rem 0}.rate-plan-card__variants .length-of-stay{display:block;font-size:.875rem;text-align:right;padding:0 1rem;color:var(--rate-plan-los-color)}@container widget (max-width: 480px){.rate-plan-list--single .rate-plan-card{width:100%;flex:0 0 100%}.rate-plan-card{display:flex;flex:0 0 90%;flex-direction:column;min-width:90%;scroll-snap-align:start;justify-content:space-between;background-color:var(--rate-plan-mobile-background);border-radius:var(--rate-plan-mobile-border-radius, 10px);border:var(--rate-plan-mobile-border, 1px dashed #e5e5e5)}.rate-plan-card__actions{justify-self:stretch}.rate-plan-card__offers{color:var(--rate-plan-mobile-secondary-color)}.rate-plan-card__offers-item .icon{color:var(--rate-plan-mobile-icon-color, #696969);fill:var(--rate-plan-mobile-icon-color, #696969)}.rate-plan-card__offers-item.feed-offer{color:var(--rate-plan-mobile-feed-text-color, #059669)}.rate-plan-card__offers-item.feed-offer .icon{color:var(--rate-plan-mobile-feed-icon-color, #059669);fill:var(--rate-plan-mobile-feed-icon-color, #059669)}.rate-plan-card__offers-item.cancellation-policy-offer{color:var(--rate-plan-mobile-cancellation-policy-text-color)}.rate-plan-card__offers-item.cancellation-policy-offer .icon{color:var(--rate-plan-mobile-cancellation-policy-icon-color, #696969);fill:var(--rate-plan-mobile-cancellation-policy-icon-color, #696969)}.rate-plan-card__offers-item.payment-type-offers{color:var(--rate-plan-mobile-payment-type-text-color)}.rate-plan-card__offers-item.payment-type-offers .icon{color:var(--rate-plan-mobile-payment-type-icon-color, #696969);fill:var(--rate-plan-mobile-payment-type-icon-color, #696969)}}.variant-line{text-align:right;font-size:var(--variant-line-font-size);color:var(--variant-line-color, #000000)}.variant-line:hover,.variant-line.selected{background:var(--variant-line-selected, #e0e0e0)}.variant-line.selected:hover{background:var(--variant-line-hover, #d7d7d7)}.variant-line__content{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;padding:.5rem 1rem}.variant-line__actions{margin-left:1rem}.variant-line__actions .book-button{background:var(--variant-line-button-bg, #ea580c);color:var(--variant-line-button-color, #ffffff)}.variant-line__actions .book-button:hover{background:var(--variant-line-button-bg-hover, #c2410c)}@container widget (max-width: 480px){.rate-plan-card__variants .variant-line:nth-of-type(odd){background:#f5f5f5}.variant-line{width:100%}.variant-line__content{flex-direction:column;row-gap:.5rem;width:100%;padding:1rem}.variant-line__actions{align-self:end;width:100%}.variant-line__actions button{width:100%}}.reservation-result{display:flex;flex-direction:column;margin-top:2rem;margin-bottom:1rem}.reservation-result__title{font-size:1.5rem;font-weight:700;text-align:center}.reservation-result__description{font-size:1.2rem;text-align:center}.hotel-information{display:flex;flex-direction:column;row-gap:.25rem;font-size:.875rem;justify-content:center;justify-items:center}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.accommodation-skeleton.accommodation-result .header .thumbnail,.accommodation-skeleton.accommodation-result .header .content .description,.accommodation-skeleton.accommodation-result .header .content .amenities{display:none}.accommodation-skeleton.accommodation-result .header .content .title-skeleton{width:220px;margin-bottom:0}.accommodation-skeleton .header{display:flex;flex-direction:column}@media (min-width: 768px){.accommodation-skeleton .header{flex-direction:row}}.accommodation-skeleton .header .thumbnail{width:100%;height:192px;border-top-left-radius:10px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0}@media (min-width: 768px){.accommodation-skeleton .header .thumbnail{width:300px}}.accommodation-skeleton .header .content{flex:1;padding:16px}.accommodation-skeleton .header .content .title-skeleton{height:32px;width:96px;margin-bottom:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description{margin-bottom:16px;display:flex;flex-direction:column;gap:8px}.accommodation-skeleton .header .content .description .line{height:16px;width:100%;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description .line.line-short{width:75%}.accommodation-skeleton .header .content .amenities{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.accommodation-skeleton .header .content .amenities .amenity-item{height:32px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header{padding:16px;display:flex;justify-content:space-between;align-items:center}.accommodation-skeleton .footer .option-header .option-title{height:24px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header .option-value{height:24px;width:64px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option{padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start}@media (min-width: 768px){.accommodation-skeleton .footer .room-option{flex-direction:row;align-items:center}}.accommodation-skeleton .footer .room-option .option-details{display:flex;flex-direction:column;gap:8px;width:100%}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .option-details{width:50%}}.accommodation-skeleton .footer .room-option .option-details .option-name{height:20px;width:192px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .option-details .option-description{height:16px;width:128px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section{display:flex;align-items:center;margin-top:8px}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .price-section{margin-top:0}}.accommodation-skeleton .footer .room-option .price-section .price{height:24px;width:64px;margin-right:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section .book-button{height:40px;width:96px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.icons{display:flex;align-items:end;color:#323232;fill:#323232}.scenario-text{font-size:var(--base-font);font-weight:lighter}.summary-block{position:sticky;width:auto;bottom:0;right:0;padding:1rem;box-shadow:0 -4px 54px #9e9e9e33;background:#fff;z-index:4;border-radius:10px}.summary-block__content{display:flex;justify-content:space-between;align-items:center}.summary-block__content-info{display:flex;flex-direction:column;align-items:flex-start}.summary-block__content-info__price{font-size:1rem;font-weight:700;color:#ea580c}.summary-block__content-info__text{display:flex;align-items:center;font-size:.875rem;color:#2229;vertical-align:center}.summary-block__content-info__text .icon{font-size:1rem;margin-left:.25rem}.summary-block .accommodation-summary-trigger{cursor:pointer}.summary-block .accommodation-summary-trigger:hover{color:#ea580c}@container widget (max-width: 480px){.summary-block{position:sticky;box-sizing:border-box;left:0;width:100%}}.v-popper__popper p{line-height:1;padding:.125rem 0;margin:.5rem;font-size:.875rem;color:#fff}.icon{fill:currentColor}.icon--small{width:16px}.icon-text{display:inline-flex;flex-direction:row;align-items:center;column-gap:.375rem}.icon-text__icon{display:inline-flex;color:#ea580c;flex:0 0 1rem}.icon-text__icon .icon{width:1.5rem}.icon-text__text{line-height:1}', im = {
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
    const t = e, n = ce({
      accommodationTypes: [],
      ratePlans: []
    });
    return Ue(
      () => ({ accommodationTypes: t.accommodationTypes, ratePlans: t.ratePlans }),
      (o) => {
        (o.accommodationTypes.length || o.ratePlans.length) && (n.value = {
          accommodationTypes: o.accommodationTypes.split(","),
          ratePlans: o.accommodationTypes.split(",")
        });
      }
    ), la(() => {
      var r;
      const o = (r = Kt()) == null ? void 0 : r.appContext.app;
      o && !o.__i18n_installed && (o.use(Fn), o.__i18n_installed = !0);
    }), Wn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (o, r) => (C(), re(qr, null, {
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
}, om = /* @__PURE__ */ xn(im, [["styles", [nm]]]), rm = {
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
    return Wn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (t, n) => (C(), re(qr, null, {
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
globalThis.window && window.customElements.define("bflex-booking-widget", ca(om));
function sm(e) {
  ua(rm, { initOptions: e }).use(Fn).mount("#bflex-booking-widget");
}
export {
  Fr as BookingWidget,
  sm as mountWidget
};
