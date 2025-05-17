import { effectScope as zr, ref as ve, shallowRef as Hr, computed as Te, watch as je, isRef as Wr, defineComponent as Nt, getCurrentInstance as Xt, h as Fo, Fragment as ue, inject as Ot, onMounted as Jt, onUnmounted as qn, createVNode as M, Text as Vr, createElementBlock as D, openBlock as P, renderSlot as ge, createBlock as ae, normalizeClass as Je, withCtx as z, createElementVNode as x, renderList as Ae, onBeforeUnmount as Ur, toDisplayString as F, unref as U, pushScopeId as Yr, popScopeId as jr, nextTick as Xr, normalizeProps as Gr, guardReactiveProps as Kr, resolveComponent as ti, mergeProps as wi, withScopeId as Jr, withKeys as Zr, normalizeStyle as Pt, createCommentVNode as me, resolveDynamicComponent as Qr, withDirectives as Ze, vShow as ni, createTextVNode as oe, toRefs as es, reactive as ii, vModelText as an, withModifiers as Bo, vModelSelect as ts, vModelCheckbox as ns, provide as qo, toRaw as is, onBeforeMount as os, defineCustomElement as rs, createApp as ss } from "vue";
const Rt = {
  INIT: "bflex/v1/cart/init",
  OFFERS: "bflex/v1/offers",
  CART: "bflex/v1/cart",
  CHANGE_PAYMENT_TYPE: "bflex/v1/cart/paymentType",
  CONFIRM_CART: "bflex/v1/cart/confirm",
  LOAD_RESERVATION: "bflex/v1/account/reservation"
};
async function Dt(e) {
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
async function Mt() {
  var t;
  if ((t = window.BookiFlex) != null && t.restUrl)
    return Fi(window.BookiFlex.restUrl);
  const e = document.querySelector('link[rel="https://api.w.org/"]');
  if (e != null && e.href)
    return Fi(e.href);
  try {
    if ((await fetch("/wp-json/", { method: "HEAD" })).ok) return "/wp-json/";
  } catch {
  }
  return "/index.php?rest_route=/";
}
function Fi(e) {
  try {
    const t = new URL(e, location.href);
    return t.pathname + t.search;
  } catch {
    return e;
  }
}
const as = async () => {
  const e = await Mt() + Rt.INIT;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await Dt(t);
  } catch (t) {
    throw console.error("Error in init app", t), t;
  }
}, ls = async (e, t, n) => {
  console.debug("Loading data", e, t, n);
  let o = await Mt() + Rt.OFFERS;
  if (o = o.includes("?") ? o + "&" : o + "?", !e || !t)
    throw new Error("Invalid dates");
  const r = `${o}checkInDate=${e}&checkOutDate=${t}&promoCode=${n || ""}`;
  try {
    const a = await fetch(r);
    return await Dt(a);
  } catch (a) {
    throw console.error("Failed to load offers:", a), a;
  }
}, cs = async () => {
  console.debug("Loading cart");
  const e = await Mt() + Rt.CART;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await Dt(t);
  } catch (t) {
    throw console.error("Failed to load cart:", t), t;
  }
}, zo = async (e) => {
  const t = await Mt() + Rt.CART;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: e })
    });
    return await Dt(n);
  } catch (n) {
    throw console.error("Failed to add to cart:", n), n;
  }
}, us = async (e) => {
  const t = await Mt() + Rt.CHANGE_PAYMENT_TYPE;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Dt(n);
  } catch (n) {
    throw console.error("Failed to change payment type:", n), n;
  }
}, ds = async (e) => {
  console.debug("Confirming booking", e);
  const t = await Mt() + Rt.CONFIRM_CART;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Dt(n);
  } catch (n) {
    throw console.error("Failed to confirm booking:", n), n;
  }
}, fs = async (e) => {
  const t = await Mt() + Rt.LOAD_RESERVATION;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Dt(n);
  } catch (n) {
    throw console.error("Failed to load reservation:", n), n;
  }
};
/*!
  * shared v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Nn = typeof window < "u", xt = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), hs = (e, t, n) => ms({ l: e, k: t, s: n }), ms = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Se = (e) => typeof e == "number" && isFinite(e), ps = (e) => xi(e) === "[object Date]", Gt = (e) => xi(e) === "[object RegExp]", zn = (e) => Q(e) && Object.keys(e).length === 0, Ce = Object.assign, gs = Object.create, de = (e = null) => gs(e);
let Bi;
const At = () => Bi || (Bi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : de());
function qi(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const vs = Object.prototype.hasOwnProperty;
function Ue(e, t) {
  return vs.call(e, t);
}
const Ee = Array.isArray, pe = (e) => typeof e == "function", H = (e) => typeof e == "string", se = (e) => typeof e == "boolean", le = (e) => e !== null && typeof e == "object", ys = (e) => le(e) && pe(e.then) && pe(e.catch), Ho = Object.prototype.toString, xi = (e) => Ho.call(e), Q = (e) => xi(e) === "[object Object]", _s = (e) => e == null ? "" : Ee(e) || Q(e) && e.toString === Ho ? JSON.stringify(e, null, 2) : String(e);
function ki(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
function bs(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Sn = (e) => !le(e) || Ee(e);
function Ln(e, t) {
  if (Sn(e) || Sn(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((a) => {
      a !== "__proto__" && (le(o[a]) && !le(r[a]) && (r[a] = Array.isArray(o[a]) ? [] : de()), Sn(r[a]) || Sn(o[a]) ? r[a] = o[a] : n.push({ src: o[a], des: r[a] }));
    });
  }
}
/*!
  * message-compiler v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function ws(e, t, n) {
  return { line: e, column: t, offset: n };
}
function oi(e, t, n) {
  return { start: e, end: t };
}
const ce = {
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
}, xs = 17;
function Hn(e, t, n = {}) {
  const { domain: o, messages: r, args: a } = n, l = e, d = new SyntaxError(String(l));
  return d.code = e, t && (d.location = t), d.domain = o, d;
}
function ks(e) {
  throw e;
}
const ct = " ", Ts = "\r", De = `
`, Ss = "\u2028", Es = "\u2029";
function Cs(e) {
  const t = e;
  let n = 0, o = 1, r = 1, a = 0;
  const l = (I) => t[I] === Ts && t[I + 1] === De, d = (I) => t[I] === De, f = (I) => t[I] === Es, u = (I) => t[I] === Ss, y = (I) => l(I) || d(I) || f(I) || u(I), g = () => n, m = () => o, w = () => r, k = () => a, S = (I) => l(I) || f(I) || u(I) ? De : t[I], O = () => S(n), b = () => S(n + a);
  function T() {
    return a = 0, y(n) && (o++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function $() {
    return l(n + a) && a++, a++, t[n + a];
  }
  function E() {
    n = 0, o = 1, r = 1, a = 0;
  }
  function N(I = 0) {
    a = I;
  }
  function B() {
    const I = n + a;
    for (; I !== n; )
      T();
    a = 0;
  }
  return {
    index: g,
    line: m,
    column: w,
    peekOffset: k,
    charAt: S,
    currentChar: O,
    currentPeek: b,
    next: T,
    peek: $,
    reset: E,
    resetPeek: N,
    skipToPeek: B
  };
}
const gt = void 0, As = ".", zi = "'", Ps = "tokenizer";
function Ls(e, t = {}) {
  const n = t.location !== !1, o = Cs(e), r = () => o.index(), a = () => ws(o.line(), o.column(), o.index()), l = a(), d = r(), f = {
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
  }, u = () => f, { onError: y } = t;
  function g(p, v, R, ...Y) {
    const _e = u();
    if (v.column += R, v.offset += R, y) {
      const i = n ? oi(_e.startLoc, v) : null, s = Hn(p, i, {
        domain: Ps,
        args: Y
      });
      y(s);
    }
  }
  function m(p, v, R) {
    p.endLoc = a(), p.currentType = v;
    const Y = { type: v };
    return n && (Y.loc = oi(p.startLoc, p.endLoc)), R != null && (Y.value = R), Y;
  }
  const w = (p) => m(
    p,
    13
    /* TokenTypes.EOF */
  );
  function k(p, v) {
    return p.currentChar() === v ? (p.next(), v) : (g(ce.EXPECTED_TOKEN, a(), 0, v), "");
  }
  function S(p) {
    let v = "";
    for (; p.currentPeek() === ct || p.currentPeek() === De; )
      v += p.currentPeek(), p.peek();
    return v;
  }
  function O(p) {
    const v = S(p);
    return p.skipToPeek(), v;
  }
  function b(p) {
    if (p === gt)
      return !1;
    const v = p.charCodeAt(0);
    return v >= 97 && v <= 122 || // a-z
    v >= 65 && v <= 90 || // A-Z
    v === 95;
  }
  function T(p) {
    if (p === gt)
      return !1;
    const v = p.charCodeAt(0);
    return v >= 48 && v <= 57;
  }
  function $(p, v) {
    const { currentType: R } = v;
    if (R !== 2)
      return !1;
    S(p);
    const Y = b(p.currentPeek());
    return p.resetPeek(), Y;
  }
  function E(p, v) {
    const { currentType: R } = v;
    if (R !== 2)
      return !1;
    S(p);
    const Y = p.currentPeek() === "-" ? p.peek() : p.currentPeek(), _e = T(Y);
    return p.resetPeek(), _e;
  }
  function N(p, v) {
    const { currentType: R } = v;
    if (R !== 2)
      return !1;
    S(p);
    const Y = p.currentPeek() === zi;
    return p.resetPeek(), Y;
  }
  function B(p, v) {
    const { currentType: R } = v;
    if (R !== 7)
      return !1;
    S(p);
    const Y = p.currentPeek() === ".";
    return p.resetPeek(), Y;
  }
  function I(p, v) {
    const { currentType: R } = v;
    if (R !== 8)
      return !1;
    S(p);
    const Y = b(p.currentPeek());
    return p.resetPeek(), Y;
  }
  function J(p, v) {
    const { currentType: R } = v;
    if (!(R === 7 || R === 11))
      return !1;
    S(p);
    const Y = p.currentPeek() === ":";
    return p.resetPeek(), Y;
  }
  function G(p, v) {
    const { currentType: R } = v;
    if (R !== 9)
      return !1;
    const Y = () => {
      const i = p.currentPeek();
      return i === "{" ? b(p.peek()) : i === "@" || i === "|" || i === ":" || i === "." || i === ct || !i ? !1 : i === De ? (p.peek(), Y()) : re(p, !1);
    }, _e = Y();
    return p.resetPeek(), _e;
  }
  function V(p) {
    S(p);
    const v = p.currentPeek() === "|";
    return p.resetPeek(), v;
  }
  function re(p, v = !0) {
    const R = (_e = !1, i = "") => {
      const s = p.currentPeek();
      return s === "{" || s === "@" || !s ? _e : s === "|" ? !(i === ct || i === De) : s === ct ? (p.peek(), R(!0, ct)) : s === De ? (p.peek(), R(!0, De)) : !0;
    }, Y = R();
    return v && p.resetPeek(), Y;
  }
  function K(p, v) {
    const R = p.currentChar();
    return R === gt ? gt : v(R) ? (p.next(), R) : null;
  }
  function ke(p) {
    const v = p.charCodeAt(0);
    return v >= 97 && v <= 122 || // a-z
    v >= 65 && v <= 90 || // A-Z
    v >= 48 && v <= 57 || // 0-9
    v === 95 || // _
    v === 36;
  }
  function be(p) {
    return K(p, ke);
  }
  function Pe(p) {
    const v = p.charCodeAt(0);
    return v >= 97 && v <= 122 || // a-z
    v >= 65 && v <= 90 || // A-Z
    v >= 48 && v <= 57 || // 0-9
    v === 95 || // _
    v === 36 || // $
    v === 45;
  }
  function fe(p) {
    return K(p, Pe);
  }
  function ne(p) {
    const v = p.charCodeAt(0);
    return v >= 48 && v <= 57;
  }
  function Ne(p) {
    return K(p, ne);
  }
  function ye(p) {
    const v = p.charCodeAt(0);
    return v >= 48 && v <= 57 || // 0-9
    v >= 65 && v <= 70 || // A-F
    v >= 97 && v <= 102;
  }
  function ot(p) {
    return K(p, ye);
  }
  function Bt(p) {
    let v = "", R = "";
    for (; v = Ne(p); )
      R += v;
    return R;
  }
  function Zt(p) {
    let v = "";
    for (; ; ) {
      const R = p.currentChar();
      if (R === "{" || R === "}" || R === "@" || R === "|" || !R)
        break;
      if (R === ct || R === De)
        if (re(p))
          v += R, p.next();
        else {
          if (V(p))
            break;
          v += R, p.next();
        }
      else
        v += R, p.next();
    }
    return v;
  }
  function qt(p) {
    O(p);
    let v = "", R = "";
    for (; v = fe(p); )
      R += v;
    return p.currentChar() === gt && g(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), R;
  }
  function Qt(p) {
    O(p);
    let v = "";
    return p.currentChar() === "-" ? (p.next(), v += `-${Bt(p)}`) : v += Bt(p), p.currentChar() === gt && g(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), v;
  }
  function xn(p) {
    return p !== zi && p !== De;
  }
  function zt(p) {
    O(p), k(p, "'");
    let v = "", R = "";
    for (; v = K(p, xn); )
      v === "\\" ? R += en(p) : R += v;
    const Y = p.currentChar();
    return Y === De || Y === gt ? (g(ce.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), Y === De && (p.next(), k(p, "'")), R) : (k(p, "'"), R);
  }
  function en(p) {
    const v = p.currentChar();
    switch (v) {
      case "\\":
      case "'":
        return p.next(), `\\${v}`;
      case "u":
        return Ht(p, v, 4);
      case "U":
        return Ht(p, v, 6);
      default:
        return g(ce.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, v), "";
    }
  }
  function Ht(p, v, R) {
    k(p, v);
    let Y = "";
    for (let _e = 0; _e < R; _e++) {
      const i = ot(p);
      if (!i) {
        g(ce.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${v}${Y}${p.currentChar()}`);
        break;
      }
      Y += i;
    }
    return `\\${v}${Y}`;
  }
  function tn(p) {
    return p !== "{" && p !== "}" && p !== ct && p !== De;
  }
  function ft(p) {
    O(p);
    let v = "", R = "";
    for (; v = K(p, tn); )
      R += v;
    return R;
  }
  function ht(p) {
    let v = "", R = "";
    for (; v = be(p); )
      R += v;
    return R;
  }
  function nn(p) {
    const v = (R) => {
      const Y = p.currentChar();
      return Y === "{" || Y === "@" || Y === "|" || Y === "(" || Y === ")" || !Y || Y === ct ? R : (R += Y, p.next(), v(R));
    };
    return v("");
  }
  function St(p) {
    O(p);
    const v = k(
      p,
      "|"
      /* TokenChars.Pipe */
    );
    return O(p), v;
  }
  function we(p, v) {
    let R = null;
    switch (p.currentChar()) {
      case "{":
        return v.braceNest >= 1 && g(ce.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), p.next(), R = m(
          v,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), O(p), v.braceNest++, R;
      case "}":
        return v.braceNest > 0 && v.currentType === 2 && g(ce.EMPTY_PLACEHOLDER, a(), 0), p.next(), R = m(
          v,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), v.braceNest--, v.braceNest > 0 && O(p), v.inLinked && v.braceNest === 0 && (v.inLinked = !1), R;
      case "@":
        return v.braceNest > 0 && g(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), R = mt(p, v) || w(v), v.braceNest = 0, R;
      default: {
        let _e = !0, i = !0, s = !0;
        if (V(p))
          return v.braceNest > 0 && g(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), R = m(v, 1, St(p)), v.braceNest = 0, v.inLinked = !1, R;
        if (v.braceNest > 0 && (v.currentType === 4 || v.currentType === 5 || v.currentType === 6))
          return g(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), v.braceNest = 0, rt(p, v);
        if (_e = $(p, v))
          return R = m(v, 4, qt(p)), O(p), R;
        if (i = E(p, v))
          return R = m(v, 5, Qt(p)), O(p), R;
        if (s = N(p, v))
          return R = m(v, 6, zt(p)), O(p), R;
        if (!_e && !i && !s)
          return R = m(v, 12, ft(p)), g(ce.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, R.value), O(p), R;
        break;
      }
    }
    return R;
  }
  function mt(p, v) {
    const { currentType: R } = v;
    let Y = null;
    const _e = p.currentChar();
    switch ((R === 7 || R === 8 || R === 11 || R === 9) && (_e === De || _e === ct) && g(ce.INVALID_LINKED_FORMAT, a(), 0), _e) {
      case "@":
        return p.next(), Y = m(
          v,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), v.inLinked = !0, Y;
      case ".":
        return O(p), p.next(), m(
          v,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return O(p), p.next(), m(
          v,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return V(p) ? (Y = m(v, 1, St(p)), v.braceNest = 0, v.inLinked = !1, Y) : B(p, v) || J(p, v) ? (O(p), mt(p, v)) : I(p, v) ? (O(p), m(v, 11, ht(p))) : G(p, v) ? (O(p), _e === "{" ? we(p, v) || Y : m(v, 10, nn(p))) : (R === 7 && g(ce.INVALID_LINKED_FORMAT, a(), 0), v.braceNest = 0, v.inLinked = !1, rt(p, v));
    }
  }
  function rt(p, v) {
    let R = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (v.braceNest > 0)
      return we(p, v) || w(v);
    if (v.inLinked)
      return mt(p, v) || w(v);
    switch (p.currentChar()) {
      case "{":
        return we(p, v) || w(v);
      case "}":
        return g(ce.UNBALANCED_CLOSING_BRACE, a(), 0), p.next(), m(
          v,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return mt(p, v) || w(v);
      default: {
        if (V(p))
          return R = m(v, 1, St(p)), v.braceNest = 0, v.inLinked = !1, R;
        if (re(p))
          return m(v, 0, Zt(p));
        break;
      }
    }
    return R;
  }
  function on() {
    const { currentType: p, offset: v, startLoc: R, endLoc: Y } = f;
    return f.lastType = p, f.lastOffset = v, f.lastStartLoc = R, f.lastEndLoc = Y, f.offset = r(), f.startLoc = a(), o.currentChar() === gt ? m(
      f,
      13
      /* TokenTypes.EOF */
    ) : rt(o, f);
  }
  return {
    nextToken: on,
    currentOffset: r,
    currentPosition: a,
    context: u
  };
}
const Os = "parser", $s = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Is(e, t, n) {
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
function Ns(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function o(b, T, $, E, ...N) {
    const B = b.currentPosition();
    if (B.offset += E, B.column += E, n) {
      const I = t ? oi($, B) : null, J = Hn(T, I, {
        domain: Os,
        args: N
      });
      n(J);
    }
  }
  function r(b, T, $) {
    const E = { type: b };
    return t && (E.start = T, E.end = T, E.loc = { start: $, end: $ }), E;
  }
  function a(b, T, $, E) {
    t && (b.end = T, b.loc && (b.loc.end = $));
  }
  function l(b, T) {
    const $ = b.context(), E = r(3, $.offset, $.startLoc);
    return E.value = T, a(E, b.currentOffset(), b.currentPosition()), E;
  }
  function d(b, T) {
    const $ = b.context(), { lastOffset: E, lastStartLoc: N } = $, B = r(5, E, N);
    return B.index = parseInt(T, 10), b.nextToken(), a(B, b.currentOffset(), b.currentPosition()), B;
  }
  function f(b, T) {
    const $ = b.context(), { lastOffset: E, lastStartLoc: N } = $, B = r(4, E, N);
    return B.key = T, b.nextToken(), a(B, b.currentOffset(), b.currentPosition()), B;
  }
  function u(b, T) {
    const $ = b.context(), { lastOffset: E, lastStartLoc: N } = $, B = r(9, E, N);
    return B.value = T.replace($s, Is), b.nextToken(), a(B, b.currentOffset(), b.currentPosition()), B;
  }
  function y(b) {
    const T = b.nextToken(), $ = b.context(), { lastOffset: E, lastStartLoc: N } = $, B = r(8, E, N);
    return T.type !== 11 ? (o(b, ce.UNEXPECTED_EMPTY_LINKED_MODIFIER, $.lastStartLoc, 0), B.value = "", a(B, E, N), {
      nextConsumeToken: T,
      node: B
    }) : (T.value == null && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, $.lastStartLoc, 0, Ke(T)), B.value = T.value || "", a(B, b.currentOffset(), b.currentPosition()), {
      node: B
    });
  }
  function g(b, T) {
    const $ = b.context(), E = r(7, $.offset, $.startLoc);
    return E.value = T, a(E, b.currentOffset(), b.currentPosition()), E;
  }
  function m(b) {
    const T = b.context(), $ = r(6, T.offset, T.startLoc);
    let E = b.nextToken();
    if (E.type === 8) {
      const N = y(b);
      $.modifier = N.node, E = N.nextConsumeToken || b.nextToken();
    }
    switch (E.type !== 9 && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), E = b.nextToken(), E.type === 2 && (E = b.nextToken()), E.type) {
      case 10:
        E.value == null && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), $.key = g(b, E.value || "");
        break;
      case 4:
        E.value == null && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), $.key = f(b, E.value || "");
        break;
      case 5:
        E.value == null && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), $.key = d(b, E.value || "");
        break;
      case 6:
        E.value == null && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), $.key = u(b, E.value || "");
        break;
      default: {
        o(b, ce.UNEXPECTED_EMPTY_LINKED_KEY, T.lastStartLoc, 0);
        const N = b.context(), B = r(7, N.offset, N.startLoc);
        return B.value = "", a(B, N.offset, N.startLoc), $.key = B, a($, N.offset, N.startLoc), {
          nextConsumeToken: E,
          node: $
        };
      }
    }
    return a($, b.currentOffset(), b.currentPosition()), {
      node: $
    };
  }
  function w(b) {
    const T = b.context(), $ = T.currentType === 1 ? b.currentOffset() : T.offset, E = T.currentType === 1 ? T.endLoc : T.startLoc, N = r(2, $, E);
    N.items = [];
    let B = null;
    do {
      const G = B || b.nextToken();
      switch (B = null, G.type) {
        case 0:
          G.value == null && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(G)), N.items.push(l(b, G.value || ""));
          break;
        case 5:
          G.value == null && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(G)), N.items.push(d(b, G.value || ""));
          break;
        case 4:
          G.value == null && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(G)), N.items.push(f(b, G.value || ""));
          break;
        case 6:
          G.value == null && o(b, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(G)), N.items.push(u(b, G.value || ""));
          break;
        case 7: {
          const V = m(b);
          N.items.push(V.node), B = V.nextConsumeToken || null;
          break;
        }
      }
    } while (T.currentType !== 13 && T.currentType !== 1);
    const I = T.currentType === 1 ? T.lastOffset : b.currentOffset(), J = T.currentType === 1 ? T.lastEndLoc : b.currentPosition();
    return a(N, I, J), N;
  }
  function k(b, T, $, E) {
    const N = b.context();
    let B = E.items.length === 0;
    const I = r(1, T, $);
    I.cases = [], I.cases.push(E);
    do {
      const J = w(b);
      B || (B = J.items.length === 0), I.cases.push(J);
    } while (N.currentType !== 13);
    return B && o(b, ce.MUST_HAVE_MESSAGES_IN_PLURAL, $, 0), a(I, b.currentOffset(), b.currentPosition()), I;
  }
  function S(b) {
    const T = b.context(), { offset: $, startLoc: E } = T, N = w(b);
    return T.currentType === 13 ? N : k(b, $, E, N);
  }
  function O(b) {
    const T = Ls(b, Ce({}, e)), $ = T.context(), E = r(0, $.offset, $.startLoc);
    return t && E.loc && (E.loc.source = b), E.body = S(T), e.onCacheKey && (E.cacheKey = e.onCacheKey(b)), $.currentType !== 13 && o(T, ce.UNEXPECTED_LEXICAL_ANALYSIS, $.lastStartLoc, 0, b[$.offset] || ""), a(E, T.currentOffset(), T.currentPosition()), E;
  }
  return { parse: O };
}
function Ke(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Rs(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (a) => (n.helpers.add(a), a) };
}
function Hi(e, t) {
  for (let n = 0; n < e.length; n++)
    Ti(e[n], t);
}
function Ti(e, t) {
  switch (e.type) {
    case 1:
      Hi(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Hi(e.items, t);
      break;
    case 6: {
      Ti(e.key, t), t.helper(
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
function Ds(e, t = {}) {
  const n = Rs(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Ti(e.body, n);
  const o = n.context();
  e.helpers = Array.from(o.helpers);
}
function Ms(e) {
  const t = e.body;
  return t.type === 2 ? Wi(t) : t.cases.forEach((n) => Wi(n)), e;
}
function Wi(e) {
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
      e.static = ki(t);
      for (let n = 0; n < e.items.length; n++) {
        const o = e.items[n];
        (o.type === 3 || o.type === 9) && delete o.value;
      }
    }
  }
}
function Vt(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Vt(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let o = 0; o < n.length; o++)
        Vt(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        Vt(n[o]);
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
      Vt(t.key), t.k = t.key, delete t.key, t.modifier && (Vt(t.modifier), t.m = t.modifier, delete t.modifier);
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
function Fs(e, t) {
  const { filename: n, breakLineCode: o, needIndent: r } = t, a = t.location !== !1, l = {
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
  a && e.loc && (l.source = e.loc.source);
  const d = () => l;
  function f(S, O) {
    l.code += S;
  }
  function u(S, O = !0) {
    const b = O ? o : "";
    f(r ? b + "  ".repeat(S) : b);
  }
  function y(S = !0) {
    const O = ++l.indentLevel;
    S && u(O);
  }
  function g(S = !0) {
    const O = --l.indentLevel;
    S && u(O);
  }
  function m() {
    u(l.indentLevel);
  }
  return {
    context: d,
    push: f,
    indent: y,
    deindent: g,
    newline: m,
    helper: (S) => `_${S}`,
    needIndent: () => l.needIndent
  };
}
function Bs(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Kt(e, t.key), t.modifier ? (e.push(", "), Kt(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function qs(e, t) {
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let a = 0; a < r && (Kt(e, t.items[a]), a !== r - 1); a++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function zs(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let a = 0; a < r && (Kt(e, t.cases[a]), a !== r - 1); a++)
      e.push(", ");
    e.deindent(o()), e.push("])");
  }
}
function Hs(e, t) {
  t.body ? Kt(e, t.body) : e.push("null");
}
function Kt(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Hs(e, t);
      break;
    case 1:
      zs(e, t);
      break;
    case 2:
      qs(e, t);
      break;
    case 6:
      Bs(e, t);
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
const Ws = (e, t = {}) => {
  const n = H(t.mode) ? t.mode : "normal", o = H(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, a = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], d = Fs(e, {
    filename: o,
    breakLineCode: r,
    needIndent: a
  });
  d.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), d.indent(a), l.length > 0 && (d.push(`const { ${ki(l.map((y) => `${y}: _${y}`), ", ")} } = ctx`), d.newline()), d.push("return "), Kt(d, e), d.deindent(a), d.push("}"), delete e.helpers;
  const { code: f, map: u } = d.context();
  return {
    ast: e,
    code: f,
    map: u ? u.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Vs(e, t = {}) {
  const n = Ce({}, t), o = !!n.jit, r = !!n.minify, a = n.optimize == null ? !0 : n.optimize, d = Ns(n).parse(e);
  return o ? (a && Ms(d), r && Vt(d), { ast: d, code: "" }) : (Ds(d, n), Ws(d, n));
}
/*!
  * core-base v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Us() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (At().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (At().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Qe(e) {
  return le(e) && Si(e) === 0 && (Ue(e, "b") || Ue(e, "body"));
}
const Wo = ["b", "body"];
function Ys(e) {
  return kt(e, Wo);
}
const Vo = ["c", "cases"];
function js(e) {
  return kt(e, Vo, []);
}
const Uo = ["s", "static"];
function Xs(e) {
  return kt(e, Uo);
}
const Yo = ["i", "items"];
function Gs(e) {
  return kt(e, Yo, []);
}
const jo = ["t", "type"];
function Si(e) {
  return kt(e, jo);
}
const Xo = ["v", "value"];
function En(e, t) {
  const n = kt(e, Xo);
  if (n != null)
    return n;
  throw hn(t);
}
const Go = ["m", "modifier"];
function Ks(e) {
  return kt(e, Go);
}
const Ko = ["k", "key"];
function Js(e) {
  const t = kt(e, Ko);
  if (t)
    return t;
  throw hn(
    6
    /* NodeTypes.Linked */
  );
}
function kt(e, t, n) {
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    if (Ue(e, r) && e[r] != null)
      return e[r];
  }
  return n;
}
const Jo = [
  ...Wo,
  ...Vo,
  ...Uo,
  ...Yo,
  ...Ko,
  ...Go,
  ...Xo,
  ...jo
];
function hn(e) {
  return new Error(`unhandled node type: ${e}`);
}
function Kn(e) {
  return (n) => Zs(n, e);
}
function Zs(e, t) {
  const n = Ys(t);
  if (n == null)
    throw hn(
      0
      /* NodeTypes.Resource */
    );
  if (Si(n) === 1) {
    const a = js(n);
    return e.plural(a.reduce((l, d) => [
      ...l,
      Vi(e, d)
    ], []));
  } else
    return Vi(e, n);
}
function Vi(e, t) {
  const n = Xs(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const o = Gs(t).reduce((r, a) => [...r, ri(e, a)], []);
    return e.normalize(o);
  }
}
function ri(e, t) {
  const n = Si(t);
  switch (n) {
    case 3:
      return En(t, n);
    case 9:
      return En(t, n);
    case 4: {
      const o = t;
      if (Ue(o, "k") && o.k)
        return e.interpolate(e.named(o.k));
      if (Ue(o, "key") && o.key)
        return e.interpolate(e.named(o.key));
      throw hn(n);
    }
    case 5: {
      const o = t;
      if (Ue(o, "i") && Se(o.i))
        return e.interpolate(e.list(o.i));
      if (Ue(o, "index") && Se(o.index))
        return e.interpolate(e.list(o.index));
      throw hn(n);
    }
    case 6: {
      const o = t, r = Ks(o), a = Js(o);
      return e.linked(ri(e, a), r ? ri(e, r) : void 0, e.type);
    }
    case 7:
      return En(t, n);
    case 8:
      return En(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const Qs = (e) => e;
let Cn = de();
function ea(e, t = {}) {
  let n = !1;
  const o = t.onError || ks;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ...Vs(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function ta(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && H(e)) {
    se(t.warnHtmlMessage) && t.warnHtmlMessage;
    const o = (t.onCacheKey || Qs)(e), r = Cn[o];
    if (r)
      return r;
    const { ast: a, detectError: l } = ea(e, {
      ...t,
      location: !1,
      jit: !0
    }), d = Kn(a);
    return l ? d : Cn[o] = d;
  } else {
    const n = e.cacheKey;
    if (n) {
      const o = Cn[n];
      return o || (Cn[n] = Kn(e));
    } else
      return Kn(e);
  }
}
let mn = null;
function na(e) {
  mn = e;
}
function ia(e, t, n) {
  mn && mn.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const oa = /* @__PURE__ */ ra("function:translate");
function ra(e) {
  return (t) => mn && mn.emit(e, t);
}
const ut = {
  INVALID_ARGUMENT: xs,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, sa = 24;
function dt(e) {
  return Hn(e, null, void 0);
}
function Ei(e, t) {
  return t.locale != null ? Ui(t.locale) : Ui(e.locale);
}
let Jn;
function Ui(e) {
  if (H(e))
    return e;
  if (pe(e)) {
    if (e.resolvedOnce && Jn != null)
      return Jn;
    if (e.constructor.name === "Function") {
      const t = e();
      if (ys(t))
        throw dt(ut.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Jn = t;
    } else
      throw dt(ut.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw dt(ut.NOT_SUPPORT_LOCALE_TYPE);
}
function aa(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Ee(t) ? t : le(t) ? Object.keys(t) : H(t) ? [t] : [n]
  ])];
}
function Zo(e, t, n) {
  const o = H(n) ? n : pn, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let a = r.__localeChainCache.get(o);
  if (!a) {
    a = [];
    let l = [n];
    for (; Ee(l); )
      l = Yi(a, l, t);
    const d = Ee(t) || !Q(t) ? t : t.default ? t.default : null;
    l = H(d) ? [d] : d, Ee(l) && Yi(a, l, !1), r.__localeChainCache.set(o, a);
  }
  return a;
}
function Yi(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && se(o); r++) {
    const a = t[r];
    H(a) && (o = la(e, t[r], n));
  }
  return o;
}
function la(e, t, n) {
  let o;
  const r = t.split("-");
  do {
    const a = r.join("-");
    o = ca(e, a, n), r.splice(-1, 1);
  } while (r.length && o === !0);
  return o;
}
function ca(e, t, n) {
  let o = !1;
  if (!e.includes(t) && (o = !0, t)) {
    o = t[t.length - 1] !== "!";
    const r = t.replace(/!/g, "");
    e.push(r), (Ee(n) || Q(n)) && n[r] && (o = n[r]);
  }
  return o;
}
const Tt = [];
Tt[
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
Tt[
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
Tt[
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
Tt[
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
Tt[
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
Tt[
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
Tt[
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
const ua = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function da(e) {
  return ua.test(e);
}
function fa(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function ha(e) {
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
function ma(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : da(t) ? fa(t) : "*" + t;
}
function pa(e) {
  const t = [];
  let n = -1, o = 0, r = 0, a, l, d, f, u, y, g;
  const m = [];
  m[
    0
    /* Actions.APPEND */
  ] = () => {
    l === void 0 ? l = d : l += d;
  }, m[
    1
    /* Actions.PUSH */
  ] = () => {
    l !== void 0 && (t.push(l), l = void 0);
  }, m[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    m[
      0
      /* Actions.APPEND */
    ](), r++;
  }, m[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (r > 0)
      r--, o = 4, m[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (r = 0, l === void 0 || (l = ma(l), l === !1))
        return !1;
      m[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function w() {
    const k = e[n + 1];
    if (o === 5 && k === "'" || o === 6 && k === '"')
      return n++, d = "\\" + k, m[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; o !== null; )
    if (n++, a = e[n], !(a === "\\" && w())) {
      if (f = ha(a), g = Tt[o], u = g[f] || g.l || 8, u === 8 || (o = u[0], u[1] !== void 0 && (y = m[u[1]], y && (d = a, y() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const ji = /* @__PURE__ */ new Map();
function ga(e, t) {
  return le(e) ? e[t] : null;
}
function va(e, t) {
  if (!le(e))
    return null;
  let n = ji.get(t);
  if (n || (n = pa(t), n && ji.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, a = 0;
  for (; a < o; ) {
    const l = n[a];
    if (Jo.includes(l) && Qe(r))
      return null;
    const d = r[l];
    if (d === void 0 || pe(r))
      return null;
    r = d, a++;
  }
  return r;
}
const ya = "11.1.3", Wn = -1, pn = "en-US", Xi = "", Gi = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function _a() {
  return {
    upper: (e, t) => t === "text" && H(e) ? e.toUpperCase() : t === "vnode" && le(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && H(e) ? e.toLowerCase() : t === "vnode" && le(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && H(e) ? Gi(e) : t === "vnode" && le(e) && "__v_isVNode" in e ? Gi(e.children) : e
  };
}
let Qo;
function ba(e) {
  Qo = e;
}
let er;
function wa(e) {
  er = e;
}
let tr;
function xa(e) {
  tr = e;
}
let nr = null;
const ka = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  nr = e;
}, Ta = /* @__NO_SIDE_EFFECTS__ */ () => nr;
let ir = null;
const Ki = (e) => {
  ir = e;
}, Sa = () => ir;
let Ji = 0;
function Ea(e = {}) {
  const t = pe(e.onWarn) ? e.onWarn : bs, n = H(e.version) ? e.version : ya, o = H(e.locale) || pe(e.locale) ? e.locale : pn, r = pe(o) ? pn : o, a = Ee(e.fallbackLocale) || Q(e.fallbackLocale) || H(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Q(e.messages) ? e.messages : Zn(r), d = Q(e.datetimeFormats) ? e.datetimeFormats : Zn(r), f = Q(e.numberFormats) ? e.numberFormats : Zn(r), u = Ce(de(), e.modifiers, _a()), y = e.pluralRules || de(), g = pe(e.missing) ? e.missing : null, m = se(e.missingWarn) || Gt(e.missingWarn) ? e.missingWarn : !0, w = se(e.fallbackWarn) || Gt(e.fallbackWarn) ? e.fallbackWarn : !0, k = !!e.fallbackFormat, S = !!e.unresolving, O = pe(e.postTranslation) ? e.postTranslation : null, b = Q(e.processor) ? e.processor : null, T = se(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, $ = !!e.escapeParameter, E = pe(e.messageCompiler) ? e.messageCompiler : Qo, N = pe(e.messageResolver) ? e.messageResolver : er || ga, B = pe(e.localeFallbacker) ? e.localeFallbacker : tr || aa, I = le(e.fallbackContext) ? e.fallbackContext : void 0, J = e, G = le(J.__datetimeFormatters) ? J.__datetimeFormatters : /* @__PURE__ */ new Map(), V = le(J.__numberFormatters) ? J.__numberFormatters : /* @__PURE__ */ new Map(), re = le(J.__meta) ? J.__meta : {};
  Ji++;
  const K = {
    version: n,
    cid: Ji,
    locale: o,
    fallbackLocale: a,
    messages: l,
    modifiers: u,
    pluralRules: y,
    missing: g,
    missingWarn: m,
    fallbackWarn: w,
    fallbackFormat: k,
    unresolving: S,
    postTranslation: O,
    processor: b,
    warnHtmlMessage: T,
    escapeParameter: $,
    messageCompiler: E,
    messageResolver: N,
    localeFallbacker: B,
    fallbackContext: I,
    onWarn: t,
    __meta: re
  };
  return K.datetimeFormats = d, K.numberFormats = f, K.__datetimeFormatters = G, K.__numberFormatters = V, __INTLIFY_PROD_DEVTOOLS__ && ia(K, n, re), K;
}
const Zn = (e) => ({ [e]: de() });
function Ci(e, t, n, o, r) {
  const { missing: a, onWarn: l } = e;
  if (a !== null) {
    const d = a(e, n, t, r);
    return H(d) ? d : t;
  } else
    return t;
}
function sn(e, t, n) {
  const o = e;
  o.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Ca(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Aa(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let o = n + 1; o < t.length; o++)
    if (Ca(e, t[o]))
      return !0;
  return !1;
}
function Zi(e, ...t) {
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: a, localeFallbacker: l } = e, { __datetimeFormatters: d } = e, [f, u, y, g] = si(...t), m = se(y.missingWarn) ? y.missingWarn : e.missingWarn;
  se(y.fallbackWarn) ? y.fallbackWarn : e.fallbackWarn;
  const w = !!y.part, k = Ei(e, y), S = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    k
  );
  if (!H(f) || f === "")
    return new Intl.DateTimeFormat(k, g).format(u);
  let O = {}, b, T = null;
  const $ = "datetime format";
  for (let B = 0; B < S.length && (b = S[B], O = n[b] || {}, T = O[f], !Q(T)); B++)
    Ci(e, f, b, m, $);
  if (!Q(T) || !H(b))
    return o ? Wn : f;
  let E = `${b}__${f}`;
  zn(g) || (E = `${E}__${JSON.stringify(g)}`);
  let N = d.get(E);
  return N || (N = new Intl.DateTimeFormat(b, Ce({}, T, g)), d.set(E, N)), w ? N.formatToParts(u) : N.format(u);
}
const or = [
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
  const [t, n, o, r] = e, a = de();
  let l = de(), d;
  if (H(t)) {
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
  } else if (ps(t)) {
    if (isNaN(t.getTime()))
      throw dt(ut.INVALID_DATE_ARGUMENT);
    d = t;
  } else if (Se(t))
    d = t;
  else
    throw dt(ut.INVALID_ARGUMENT);
  return H(n) ? a.key = n : Q(n) && Object.keys(n).forEach((f) => {
    or.includes(f) ? l[f] = n[f] : a[f] = n[f];
  }), H(o) ? a.locale = o : Q(o) && (l = o), Q(r) && (l = r), [a.key || "", d, a, l];
}
function Qi(e, t, n) {
  const o = e;
  for (const r in n) {
    const a = `${t}__${r}`;
    o.__datetimeFormatters.has(a) && o.__datetimeFormatters.delete(a);
  }
}
function eo(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: a, localeFallbacker: l } = e, { __numberFormatters: d } = e, [f, u, y, g] = ai(...t), m = se(y.missingWarn) ? y.missingWarn : e.missingWarn;
  se(y.fallbackWarn) ? y.fallbackWarn : e.fallbackWarn;
  const w = !!y.part, k = Ei(e, y), S = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    k
  );
  if (!H(f) || f === "")
    return new Intl.NumberFormat(k, g).format(u);
  let O = {}, b, T = null;
  const $ = "number format";
  for (let B = 0; B < S.length && (b = S[B], O = n[b] || {}, T = O[f], !Q(T)); B++)
    Ci(e, f, b, m, $);
  if (!Q(T) || !H(b))
    return o ? Wn : f;
  let E = `${b}__${f}`;
  zn(g) || (E = `${E}__${JSON.stringify(g)}`);
  let N = d.get(E);
  return N || (N = new Intl.NumberFormat(b, Ce({}, T, g)), d.set(E, N)), w ? N.formatToParts(u) : N.format(u);
}
const rr = [
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
function ai(...e) {
  const [t, n, o, r] = e, a = de();
  let l = de();
  if (!Se(t))
    throw dt(ut.INVALID_ARGUMENT);
  const d = t;
  return H(n) ? a.key = n : Q(n) && Object.keys(n).forEach((f) => {
    rr.includes(f) ? l[f] = n[f] : a[f] = n[f];
  }), H(o) ? a.locale = o : Q(o) && (l = o), Q(r) && (l = r), [a.key || "", d, a, l];
}
function to(e, t, n) {
  const o = e;
  for (const r in n) {
    const a = `${t}__${r}`;
    o.__numberFormatters.has(a) && o.__numberFormatters.delete(a);
  }
}
const Pa = (e) => e, La = (e) => "", Oa = "text", $a = (e) => e.length === 0 ? "" : ki(e), Ia = _s;
function no(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Na(e) {
  const t = Se(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Se(e.named.count) || Se(e.named.n)) ? Se(e.named.count) ? e.named.count : Se(e.named.n) ? e.named.n : t : t;
}
function Ra(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Da(e = {}) {
  const t = e.locale, n = Na(e), o = le(e.pluralRules) && H(t) && pe(e.pluralRules[t]) ? e.pluralRules[t] : no, r = le(e.pluralRules) && H(t) && pe(e.pluralRules[t]) ? no : void 0, a = (b) => b[o(n, b.length, r)], l = e.list || [], d = (b) => l[b], f = e.named || de();
  Se(e.pluralIndex) && Ra(n, f);
  const u = (b) => f[b];
  function y(b, T) {
    const $ = pe(e.messages) ? e.messages(b, !!T) : le(e.messages) ? e.messages[b] : !1;
    return $ || (e.parent ? e.parent.message(b) : La);
  }
  const g = (b) => e.modifiers ? e.modifiers[b] : Pa, m = Q(e.processor) && pe(e.processor.normalize) ? e.processor.normalize : $a, w = Q(e.processor) && pe(e.processor.interpolate) ? e.processor.interpolate : Ia, k = Q(e.processor) && H(e.processor.type) ? e.processor.type : Oa, O = {
    list: d,
    named: u,
    plural: a,
    linked: (b, ...T) => {
      const [$, E] = T;
      let N = "text", B = "";
      T.length === 1 ? le($) ? (B = $.modifier || B, N = $.type || N) : H($) && (B = $ || B) : T.length === 2 && (H($) && (B = $ || B), H(E) && (N = E || N));
      const I = y(b, !0)(O), J = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        N === "vnode" && Ee(I) && B ? I[0] : I
      );
      return B ? g(B)(J, N) : J;
    },
    message: y,
    type: k,
    interpolate: w,
    normalize: m,
    values: Ce(de(), l, f)
  };
  return O;
}
const io = () => "", He = (e) => pe(e);
function oo(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: a, fallbackLocale: l, messages: d } = e, [f, u] = li(...t), y = se(u.missingWarn) ? u.missingWarn : e.missingWarn, g = se(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = se(u.escapeParameter) ? u.escapeParameter : e.escapeParameter, w = !!u.resolvedMessage, k = H(u.default) || se(u.default) ? se(u.default) ? a ? f : () => f : u.default : n ? a ? f : () => f : null, S = n || k != null && (H(k) || pe(k)), O = Ei(e, u);
  m && Ma(u);
  let [b, T, $] = w ? [
    f,
    O,
    d[O] || de()
  ] : sr(e, f, O, l, g, y), E = b, N = f;
  if (!w && !(H(E) || Qe(E) || He(E)) && S && (E = k, N = E), !w && (!(H(E) || Qe(E) || He(E)) || !H(T)))
    return r ? Wn : f;
  let B = !1;
  const I = () => {
    B = !0;
  }, J = He(E) ? E : ar(e, f, T, E, N, I);
  if (B)
    return E;
  const G = qa(e, T, $, u), V = Da(G), re = Fa(e, J, V), K = o ? o(re, f) : re;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const ke = {
      timestamp: Date.now(),
      key: H(f) ? f : He(E) ? E.key : "",
      locale: T || (He(E) ? E.locale : ""),
      format: H(E) ? E : He(E) ? E.source : "",
      message: K
    };
    ke.meta = Ce({}, e.__meta, /* @__PURE__ */ Ta() || {}), oa(ke);
  }
  return K;
}
function Ma(e) {
  Ee(e.list) ? e.list = e.list.map((t) => H(t) ? qi(t) : t) : le(e.named) && Object.keys(e.named).forEach((t) => {
    H(e.named[t]) && (e.named[t] = qi(e.named[t]));
  });
}
function sr(e, t, n, o, r, a) {
  const { messages: l, onWarn: d, messageResolver: f, localeFallbacker: u } = e, y = u(e, o, n);
  let g = de(), m, w = null;
  const k = "translate";
  for (let S = 0; S < y.length && (m = y[S], g = l[m] || de(), (w = f(g, t)) === null && (w = g[t]), !(H(w) || Qe(w) || He(w))); S++)
    if (!Aa(m, y)) {
      const O = Ci(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        m,
        a,
        k
      );
      O !== t && (w = O);
    }
  return [w, m, g];
}
function ar(e, t, n, o, r, a) {
  const { messageCompiler: l, warnHtmlMessage: d } = e;
  if (He(o)) {
    const u = o;
    return u.locale = u.locale || n, u.key = u.key || t, u;
  }
  if (l == null) {
    const u = () => o;
    return u.locale = n, u.key = t, u;
  }
  const f = l(o, Ba(e, n, r, o, d, a));
  return f.locale = n, f.key = t, f.source = o, f;
}
function Fa(e, t, n) {
  return t(n);
}
function li(...e) {
  const [t, n, o] = e, r = de();
  if (!H(t) && !Se(t) && !He(t) && !Qe(t))
    throw dt(ut.INVALID_ARGUMENT);
  const a = Se(t) ? String(t) : (He(t), t);
  return Se(n) ? r.plural = n : H(n) ? r.default = n : Q(n) && !zn(n) ? r.named = n : Ee(n) && (r.list = n), Se(o) ? r.plural = o : H(o) ? r.default = o : Q(o) && Ce(r, o), [a, r];
}
function Ba(e, t, n, o, r, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: r,
    onError: (l) => {
      throw a && a(l), l;
    },
    onCacheKey: (l) => hs(t, n, l)
  };
}
function qa(e, t, n, o) {
  const { modifiers: r, pluralRules: a, messageResolver: l, fallbackLocale: d, fallbackWarn: f, missingWarn: u, fallbackContext: y } = e, m = {
    locale: t,
    modifiers: r,
    pluralRules: a,
    messages: (w, k) => {
      let S = l(n, w);
      if (S == null && (y || k)) {
        const [, , O] = sr(
          y || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          w,
          t,
          d,
          f,
          u
        );
        S = l(O, w);
      }
      if (H(S) || Qe(S)) {
        let O = !1;
        const T = ar(e, w, t, S, w, () => {
          O = !0;
        });
        return O ? io : T;
      } else return He(S) ? S : io;
    }
  };
  return e.processor && (m.processor = e.processor), o.list && (m.list = o.list), o.named && (m.named = o.named), Se(o.plural) && (m.pluralIndex = o.plural), m;
}
Us();
/*!
  * vue-i18n v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const za = "11.1.3";
function Ha() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (At().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (At().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (At().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (At().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Fe = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: sa,
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
function qe(e, ...t) {
  return Hn(e, null, void 0);
}
const ci = /* @__PURE__ */ xt("__translateVNode"), ui = /* @__PURE__ */ xt("__datetimeParts"), di = /* @__PURE__ */ xt("__numberParts"), lr = xt("__setPluralRules"), cr = /* @__PURE__ */ xt("__injectWithOption"), fi = /* @__PURE__ */ xt("__dispose");
function gn(e) {
  if (!le(e) || Qe(e))
    return e;
  for (const t in e)
    if (Ue(e, t))
      if (!t.includes("."))
        le(e[t]) && gn(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, a = !1;
        for (let l = 0; l < o; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = de()), !le(r[n[l]])) {
            a = !0;
            break;
          }
          r = r[n[l]];
        }
        if (a || (Qe(r) ? Jo.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !Qe(r)) {
          const l = r[n[o]];
          le(l) && gn(l);
        }
      }
  return e;
}
function Ai(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: a } = t, l = Q(n) ? n : Ee(o) ? de() : { [e]: de() };
  if (Ee(o) && o.forEach((d) => {
    if ("locale" in d && "resource" in d) {
      const { locale: f, resource: u } = d;
      f ? (l[f] = l[f] || de(), Ln(u, l[f])) : Ln(u, l);
    } else
      H(d) && Ln(JSON.parse(d), l);
  }), r == null && a)
    for (const d in l)
      Ue(l, d) && gn(l[d]);
  return l;
}
function ur(e) {
  return e.type;
}
function dr(e, t, n) {
  let o = le(t.messages) ? t.messages : de();
  "__i18nGlobal" in n && (o = Ai(e.locale.value, {
    messages: o,
    __i18n: n.__i18nGlobal
  }));
  const r = Object.keys(o);
  r.length && r.forEach((a) => {
    e.mergeLocaleMessage(a, o[a]);
  });
  {
    if (le(t.datetimeFormats)) {
      const a = Object.keys(t.datetimeFormats);
      a.length && a.forEach((l) => {
        e.mergeDateTimeFormat(l, t.datetimeFormats[l]);
      });
    }
    if (le(t.numberFormats)) {
      const a = Object.keys(t.numberFormats);
      a.length && a.forEach((l) => {
        e.mergeNumberFormat(l, t.numberFormats[l]);
      });
    }
  }
}
function ro(e) {
  return M(Vr, null, e, 0);
}
const so = "__INTLIFY_META__", ao = () => [], Wa = () => !1;
let lo = 0;
function co(e) {
  return (t, n, o, r) => e(n, o, Xt() || void 0, r);
}
const Va = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Xt();
  let t = null;
  return e && (t = ur(e)[so]) ? { [so]: t } : null;
};
function Pi(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, a = Nn ? ve : Hr;
  let l = se(e.inheritLocale) ? e.inheritLocale : !0;
  const d = a(
    // prettier-ignore
    t && l ? t.locale.value : H(e.locale) ? e.locale : pn
  ), f = a(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : H(e.fallbackLocale) || Ee(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : d.value
  ), u = a(Ai(d.value, e)), y = a(Q(e.datetimeFormats) ? e.datetimeFormats : { [d.value]: {} }), g = a(Q(e.numberFormats) ? e.numberFormats : { [d.value]: {} });
  let m = t ? t.missingWarn : se(e.missingWarn) || Gt(e.missingWarn) ? e.missingWarn : !0, w = t ? t.fallbackWarn : se(e.fallbackWarn) || Gt(e.fallbackWarn) ? e.fallbackWarn : !0, k = t ? t.fallbackRoot : se(e.fallbackRoot) ? e.fallbackRoot : !0, S = !!e.fallbackFormat, O = pe(e.missing) ? e.missing : null, b = pe(e.missing) ? co(e.missing) : null, T = pe(e.postTranslation) ? e.postTranslation : null, $ = t ? t.warnHtmlMessage : se(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, E = !!e.escapeParameter;
  const N = t ? t.modifiers : Q(e.modifiers) ? e.modifiers : {};
  let B = e.pluralRules || t && t.pluralRules, I;
  I = (() => {
    o && Ki(null);
    const s = {
      version: za,
      locale: d.value,
      fallbackLocale: f.value,
      messages: u.value,
      modifiers: N,
      pluralRules: B,
      missing: b === null ? void 0 : b,
      missingWarn: m,
      fallbackWarn: w,
      fallbackFormat: S,
      unresolving: !0,
      postTranslation: T === null ? void 0 : T,
      warnHtmlMessage: $,
      escapeParameter: E,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    s.datetimeFormats = y.value, s.numberFormats = g.value, s.__datetimeFormatters = Q(I) ? I.__datetimeFormatters : void 0, s.__numberFormatters = Q(I) ? I.__numberFormatters : void 0;
    const c = Ea(s);
    return o && Ki(c), c;
  })(), sn(I, d.value, f.value);
  function G() {
    return [
      d.value,
      f.value,
      u.value,
      y.value,
      g.value
    ];
  }
  const V = Te({
    get: () => d.value,
    set: (s) => {
      I.locale = s, d.value = s;
    }
  }), re = Te({
    get: () => f.value,
    set: (s) => {
      I.fallbackLocale = s, f.value = s, sn(I, d.value, s);
    }
  }), K = Te(() => u.value), ke = /* @__PURE__ */ Te(() => y.value), be = /* @__PURE__ */ Te(() => g.value);
  function Pe() {
    return pe(T) ? T : null;
  }
  function fe(s) {
    T = s, I.postTranslation = s;
  }
  function ne() {
    return O;
  }
  function Ne(s) {
    s !== null && (b = co(s)), O = s, I.missing = b;
  }
  const ye = (s, c, h, _, C, A) => {
    G();
    let L;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || (I.fallbackContext = t ? Sa() : void 0), L = s(I);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || (I.fallbackContext = void 0);
    }
    if (h !== "translate exists" && // for not `te` (e.g `t`)
    Se(L) && L === Wn || h === "translate exists" && !L) {
      const [W, q] = c();
      return t && k ? _(t) : C(W);
    } else {
      if (A(L))
        return L;
      throw qe(Fe.UNEXPECTED_RETURN_TYPE);
    }
  };
  function ot(...s) {
    return ye((c) => Reflect.apply(oo, null, [c, ...s]), () => li(...s), "translate", (c) => Reflect.apply(c.t, c, [...s]), (c) => c, (c) => H(c));
  }
  function Bt(...s) {
    const [c, h, _] = s;
    if (_ && !le(_))
      throw qe(Fe.INVALID_ARGUMENT);
    return ot(c, h, Ce({ resolvedMessage: !0 }, _ || {}));
  }
  function Zt(...s) {
    return ye((c) => Reflect.apply(Zi, null, [c, ...s]), () => si(...s), "datetime format", (c) => Reflect.apply(c.d, c, [...s]), () => Xi, (c) => H(c));
  }
  function qt(...s) {
    return ye((c) => Reflect.apply(eo, null, [c, ...s]), () => ai(...s), "number format", (c) => Reflect.apply(c.n, c, [...s]), () => Xi, (c) => H(c));
  }
  function Qt(s) {
    return s.map((c) => H(c) || Se(c) || se(c) ? ro(String(c)) : c);
  }
  const zt = {
    normalize: Qt,
    interpolate: (s) => s,
    type: "vnode"
  };
  function en(...s) {
    return ye((c) => {
      let h;
      const _ = c;
      try {
        _.processor = zt, h = Reflect.apply(oo, null, [_, ...s]);
      } finally {
        _.processor = null;
      }
      return h;
    }, () => li(...s), "translate", (c) => c[ci](...s), (c) => [ro(c)], (c) => Ee(c));
  }
  function Ht(...s) {
    return ye((c) => Reflect.apply(eo, null, [c, ...s]), () => ai(...s), "number format", (c) => c[di](...s), ao, (c) => H(c) || Ee(c));
  }
  function tn(...s) {
    return ye((c) => Reflect.apply(Zi, null, [c, ...s]), () => si(...s), "datetime format", (c) => c[ui](...s), ao, (c) => H(c) || Ee(c));
  }
  function ft(s) {
    B = s, I.pluralRules = B;
  }
  function ht(s, c) {
    return ye(() => {
      if (!s)
        return !1;
      const h = H(c) ? c : d.value, _ = we(h), C = I.messageResolver(_, s);
      return Qe(C) || He(C) || H(C);
    }, () => [s], "translate exists", (h) => Reflect.apply(h.te, h, [s, c]), Wa, (h) => se(h));
  }
  function nn(s) {
    let c = null;
    const h = Zo(I, f.value, d.value);
    for (let _ = 0; _ < h.length; _++) {
      const C = u.value[h[_]] || {}, A = I.messageResolver(C, s);
      if (A != null) {
        c = A;
        break;
      }
    }
    return c;
  }
  function St(s) {
    const c = nn(s);
    return c ?? (t ? t.tm(s) || {} : {});
  }
  function we(s) {
    return u.value[s] || {};
  }
  function mt(s, c) {
    if (r) {
      const h = { [s]: c };
      for (const _ in h)
        Ue(h, _) && gn(h[_]);
      c = h[s];
    }
    u.value[s] = c, I.messages = u.value;
  }
  function rt(s, c) {
    u.value[s] = u.value[s] || {};
    const h = { [s]: c };
    if (r)
      for (const _ in h)
        Ue(h, _) && gn(h[_]);
    c = h[s], Ln(c, u.value[s]), I.messages = u.value;
  }
  function on(s) {
    return y.value[s] || {};
  }
  function p(s, c) {
    y.value[s] = c, I.datetimeFormats = y.value, Qi(I, s, c);
  }
  function v(s, c) {
    y.value[s] = Ce(y.value[s] || {}, c), I.datetimeFormats = y.value, Qi(I, s, c);
  }
  function R(s) {
    return g.value[s] || {};
  }
  function Y(s, c) {
    g.value[s] = c, I.numberFormats = g.value, to(I, s, c);
  }
  function _e(s, c) {
    g.value[s] = Ce(g.value[s] || {}, c), I.numberFormats = g.value, to(I, s, c);
  }
  lo++, t && Nn && (je(t.locale, (s) => {
    l && (d.value = s, I.locale = s, sn(I, d.value, f.value));
  }), je(t.fallbackLocale, (s) => {
    l && (f.value = s, I.fallbackLocale = s, sn(I, d.value, f.value));
  }));
  const i = {
    id: lo,
    locale: V,
    fallbackLocale: re,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(s) {
      l = s, s && t && (d.value = t.locale.value, f.value = t.fallbackLocale.value, sn(I, d.value, f.value));
    },
    get availableLocales() {
      return Object.keys(u.value).sort();
    },
    messages: K,
    get modifiers() {
      return N;
    },
    get pluralRules() {
      return B || {};
    },
    get isGlobal() {
      return o;
    },
    get missingWarn() {
      return m;
    },
    set missingWarn(s) {
      m = s, I.missingWarn = m;
    },
    get fallbackWarn() {
      return w;
    },
    set fallbackWarn(s) {
      w = s, I.fallbackWarn = w;
    },
    get fallbackRoot() {
      return k;
    },
    set fallbackRoot(s) {
      k = s;
    },
    get fallbackFormat() {
      return S;
    },
    set fallbackFormat(s) {
      S = s, I.fallbackFormat = S;
    },
    get warnHtmlMessage() {
      return $;
    },
    set warnHtmlMessage(s) {
      $ = s, I.warnHtmlMessage = s;
    },
    get escapeParameter() {
      return E;
    },
    set escapeParameter(s) {
      E = s, I.escapeParameter = s;
    },
    t: ot,
    getLocaleMessage: we,
    setLocaleMessage: mt,
    mergeLocaleMessage: rt,
    getPostTranslationHandler: Pe,
    setPostTranslationHandler: fe,
    getMissingHandler: ne,
    setMissingHandler: Ne,
    [lr]: ft
  };
  return i.datetimeFormats = ke, i.numberFormats = be, i.rt = Bt, i.te = ht, i.tm = St, i.d = Zt, i.n = qt, i.getDateTimeFormat = on, i.setDateTimeFormat = p, i.mergeDateTimeFormat = v, i.getNumberFormat = R, i.setNumberFormat = Y, i.mergeNumberFormat = _e, i[cr] = n, i[ci] = en, i[ui] = tn, i[di] = Ht, i;
}
function Ua(e) {
  const t = H(e.locale) ? e.locale : pn, n = H(e.fallbackLocale) || Ee(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, o = pe(e.missing) ? e.missing : void 0, r = se(e.silentTranslationWarn) || Gt(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = se(e.silentFallbackWarn) || Gt(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, l = se(e.fallbackRoot) ? e.fallbackRoot : !0, d = !!e.formatFallbackMessages, f = Q(e.modifiers) ? e.modifiers : {}, u = e.pluralizationRules, y = pe(e.postTranslation) ? e.postTranslation : void 0, g = H(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, m = !!e.escapeParameterHtml, w = se(e.sync) ? e.sync : !0;
  let k = e.messages;
  if (Q(e.sharedMessages)) {
    const N = e.sharedMessages;
    k = Object.keys(N).reduce((I, J) => {
      const G = I[J] || (I[J] = {});
      return Ce(G, N[J]), I;
    }, k || {});
  }
  const { __i18n: S, __root: O, __injectWithOption: b } = e, T = e.datetimeFormats, $ = e.numberFormats, E = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: k,
    flatJson: E,
    datetimeFormats: T,
    numberFormats: $,
    missing: o,
    missingWarn: r,
    fallbackWarn: a,
    fallbackRoot: l,
    fallbackFormat: d,
    modifiers: f,
    pluralRules: u,
    postTranslation: y,
    warnHtmlMessage: g,
    escapeParameter: m,
    messageResolver: e.messageResolver,
    inheritLocale: w,
    __i18n: S,
    __root: O,
    __injectWithOption: b
  };
}
function hi(e = {}) {
  const t = Pi(Ua(e)), { __extender: n } = e, o = {
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
    te(r, a) {
      return t.te(r, a);
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
    setLocaleMessage(r, a) {
      t.setLocaleMessage(r, a);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(r, a) {
      t.mergeLocaleMessage(r, a);
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
    setDateTimeFormat(r, a) {
      t.setDateTimeFormat(r, a);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(r, a) {
      t.mergeDateTimeFormat(r, a);
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
    setNumberFormat(r, a) {
      t.setNumberFormat(r, a);
    },
    // mergeNumberFormat
    mergeNumberFormat(r, a) {
      t.mergeNumberFormat(r, a);
    }
  };
  return o.__extender = n, o;
}
function Ya(e, t, n) {
  return {
    beforeCreate() {
      const o = Xt();
      if (!o)
        throw qe(Fe.UNEXPECTED_ERROR);
      const r = this.$options;
      if (r.i18n) {
        const a = r.i18n;
        if (r.__i18n && (a.__i18n = r.__i18n), a.__root = t, this === this.$root)
          this.$i18n = uo(e, a);
        else {
          a.__injectWithOption = !0, a.__extender = n.__vueI18nExtend, this.$i18n = hi(a);
          const l = this.$i18n;
          l.__extender && (l.__disposer = l.__extender(this.$i18n));
        }
      } else if (r.__i18n)
        if (this === this.$root)
          this.$i18n = uo(e, r);
        else {
          this.$i18n = hi({
            __i18n: r.__i18n,
            __injectWithOption: !0,
            __extender: n.__vueI18nExtend,
            __root: t
          });
          const a = this.$i18n;
          a.__extender && (a.__disposer = a.__extender(this.$i18n));
        }
      else
        this.$i18n = e;
      r.__i18nGlobal && dr(t, r, r), this.$t = (...a) => this.$i18n.t(...a), this.$rt = (...a) => this.$i18n.rt(...a), this.$te = (a, l) => this.$i18n.te(a, l), this.$d = (...a) => this.$i18n.d(...a), this.$n = (...a) => this.$i18n.n(...a), this.$tm = (a) => this.$i18n.tm(a), n.__setInstance(o, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const o = Xt();
      if (!o)
        throw qe(Fe.UNEXPECTED_ERROR);
      const r = this.$i18n;
      delete this.$t, delete this.$rt, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, r.__disposer && (r.__disposer(), delete r.__disposer, delete r.__extender), n.__deleteInstance(o), delete this.$i18n;
    }
  };
}
function uo(e, t) {
  e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[lr](t.pluralizationRules || e.pluralizationRules);
  const n = Ai(e.locale, {
    messages: t.messages,
    __i18n: t.__i18n
  });
  return Object.keys(n).forEach((o) => e.mergeLocaleMessage(o, n[o])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((o) => e.mergeDateTimeFormat(o, t.datetimeFormats[o])), t.numberFormats && Object.keys(t.numberFormats).forEach((o) => e.mergeNumberFormat(o, t.numberFormats[o])), e;
}
const Li = {
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
function ja({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((o, r) => [
    ...o,
    // prettier-ignore
    ...r.type === ue ? r.children : [r]
  ], []) : t.reduce((n, o) => {
    const r = e[o];
    return r && (n[o] = r()), n;
  }, de());
}
function fr() {
  return ue;
}
const Xa = /* @__PURE__ */ Nt({
  /* eslint-disable */
  name: "i18n-t",
  props: Ce({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: (e) => Se(e) || !isNaN(e)
    }
  }, Li),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: o } = t, r = e.i18n || Oe({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter((g) => g !== "_"), l = de();
      e.locale && (l.locale = e.locale), e.plural !== void 0 && (l.plural = H(e.plural) ? +e.plural : e.plural);
      const d = ja(t, a), f = r[ci](e.keypath, d, l), u = Ce(de(), o), y = H(e.tag) || le(e.tag) ? e.tag : fr();
      return Fo(y, u, f);
    };
  }
}), fo = Xa;
function Ga(e) {
  return Ee(e) && !H(e[0]);
}
function hr(e, t, n, o) {
  const { slots: r, attrs: a } = t;
  return () => {
    const l = { part: !0 };
    let d = de();
    e.locale && (l.locale = e.locale), H(e.format) ? l.key = e.format : le(e.format) && (H(e.format.key) && (l.key = e.format.key), d = Object.keys(e.format).reduce((m, w) => n.includes(w) ? Ce(de(), m, { [w]: e.format[w] }) : m, de()));
    const f = o(e.value, l, d);
    let u = [l.key];
    Ee(f) ? u = f.map((m, w) => {
      const k = r[m.type], S = k ? k({ [m.type]: m.value, index: w, parts: f }) : [m.value];
      return Ga(S) && (S[0].key = `${m.type}-${w}`), S;
    }) : H(f) && (u = [f]);
    const y = Ce(de(), a), g = H(e.tag) || le(e.tag) ? e.tag : fr();
    return Fo(g, y, u);
  };
}
const Ka = /* @__PURE__ */ Nt({
  /* eslint-disable */
  name: "i18n-n",
  props: Ce({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Li),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Oe({
      useScope: e.scope,
      __useComponent: !0
    });
    return hr(e, t, rr, (...o) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[di](...o)
    ));
  }
}), ho = Ka;
function Ja(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const o = n.__getInstance(t);
    return o != null ? o.__composer : e.global.__composer;
  }
}
function Za(e) {
  const t = (l) => {
    const { instance: d, value: f } = l;
    if (!d || !d.$)
      throw qe(Fe.UNEXPECTED_ERROR);
    const u = Ja(e, d.$), y = mo(f);
    return [
      Reflect.apply(u.t, u, [...po(y)]),
      u
    ];
  };
  return {
    created: (l, d) => {
      const [f, u] = t(d);
      Nn && e.global === u && (l.__i18nWatcher = je(u.locale, () => {
        d.instance && d.instance.$forceUpdate();
      })), l.__composer = u, l.textContent = f;
    },
    unmounted: (l) => {
      Nn && l.__i18nWatcher && (l.__i18nWatcher(), l.__i18nWatcher = void 0, delete l.__i18nWatcher), l.__composer && (l.__composer = void 0, delete l.__composer);
    },
    beforeUpdate: (l, { value: d }) => {
      if (l.__composer) {
        const f = l.__composer, u = mo(d);
        l.textContent = Reflect.apply(f.t, f, [
          ...po(u)
        ]);
      }
    },
    getSSRProps: (l) => {
      const [d] = t(l);
      return { textContent: d };
    }
  };
}
function mo(e) {
  if (H(e))
    return { path: e };
  if (Q(e)) {
    if (!("path" in e))
      throw qe(Fe.REQUIRED_VALUE, "path");
    return e;
  } else
    throw qe(Fe.INVALID_VALUE);
}
function po(e) {
  const { path: t, locale: n, args: o, choice: r, plural: a } = e, l = {}, d = o || {};
  return H(n) && (l.locale = n), Se(r) && (l.plural = r), Se(a) && (l.plural = a), [t, d, l];
}
function Qa(e, t, ...n) {
  const o = Q(n[0]) ? n[0] : {};
  (se(o.globalInstall) ? o.globalInstall : !0) && ([fo.name, "I18nT"].forEach((a) => e.component(a, fo)), [ho.name, "I18nN"].forEach((a) => e.component(a, ho)), [vo.name, "I18nD"].forEach((a) => e.component(a, vo))), e.directive("t", Za(t));
}
const el = /* @__PURE__ */ xt("global-vue-i18n");
function tl(e = {}) {
  const t = __VUE_I18N_LEGACY_API__ && se(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, n = se(e.globalInjection) ? e.globalInjection : !0, o = /* @__PURE__ */ new Map(), [r, a] = nl(e, t), l = /* @__PURE__ */ xt("");
  function d(g) {
    return o.get(g) || null;
  }
  function f(g, m) {
    o.set(g, m);
  }
  function u(g) {
    o.delete(g);
  }
  const y = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && t ? "legacy" : "composition";
    },
    // install plugin
    async install(g, ...m) {
      if (g.__VUE_I18N_SYMBOL__ = l, g.provide(g.__VUE_I18N_SYMBOL__, y), Q(m[0])) {
        const S = m[0];
        y.__composerExtend = S.__composerExtend, y.__vueI18nExtend = S.__vueI18nExtend;
      }
      let w = null;
      !t && n && (w = ul(g, y.global)), __VUE_I18N_FULL_INSTALL__ && Qa(g, y, ...m), __VUE_I18N_LEGACY_API__ && t && g.mixin(Ya(a, a.__composer, y));
      const k = g.unmount;
      g.unmount = () => {
        w && w(), y.dispose(), k();
      };
    },
    // global accessor
    get global() {
      return a;
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
  return y;
}
function Oe(e = {}) {
  const t = Xt();
  if (t == null)
    throw qe(Fe.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw qe(Fe.NOT_INSTALLED);
  const n = il(t), o = rl(n), r = ur(t), a = ol(e, r);
  if (a === "global")
    return dr(o, e, r), o;
  if (a === "parent") {
    let f = sl(n, t, e.__useComponent);
    return f == null && (f = o), f;
  }
  const l = n;
  let d = l.__getInstance(t);
  if (d == null) {
    const f = Ce({}, e);
    "__i18n" in r && (f.__i18n = r.__i18n), o && (f.__root = o), d = Pi(f), l.__composerExtend && (d[fi] = l.__composerExtend(d)), ll(l, t, d), l.__setInstance(t, d);
  }
  return d;
}
function nl(e, t) {
  const n = zr(), o = __VUE_I18N_LEGACY_API__ && t ? n.run(() => hi(e)) : n.run(() => Pi(e));
  if (o == null)
    throw qe(Fe.UNEXPECTED_ERROR);
  return [n, o];
}
function il(e) {
  const t = Ot(e.isCE ? el : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw qe(e.isCE ? Fe.NOT_INSTALLED_WITH_PROVIDE : Fe.UNEXPECTED_ERROR);
  return t;
}
function ol(e, t) {
  return zn(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function rl(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function sl(e, t, n = !1) {
  let o = null;
  const r = t.root;
  let a = al(t, n);
  for (; a != null; ) {
    const l = e;
    if (e.mode === "composition")
      o = l.__getInstance(a);
    else if (__VUE_I18N_LEGACY_API__) {
      const d = l.__getInstance(a);
      d != null && (o = d.__composer, n && o && !o[cr] && (o = null));
    }
    if (o != null || r === a)
      break;
    a = a.parent;
  }
  return o;
}
function al(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function ll(e, t, n) {
  Jt(() => {
  }, t), qn(() => {
    const o = n;
    e.__deleteInstance(t);
    const r = o[fi];
    r && (r(), delete o[fi]);
  }, t);
}
const cl = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], go = ["t", "rt", "d", "n", "tm", "te"];
function ul(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return cl.forEach((r) => {
    const a = Object.getOwnPropertyDescriptor(t, r);
    if (!a)
      throw qe(Fe.UNEXPECTED_ERROR);
    const l = Wr(a.value) ? {
      get() {
        return a.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(d) {
        a.value.value = d;
      }
    } : {
      get() {
        return a.get && a.get();
      }
    };
    Object.defineProperty(n, r, l);
  }), e.config.globalProperties.$i18n = n, go.forEach((r) => {
    const a = Object.getOwnPropertyDescriptor(t, r);
    if (!a || !a.value)
      throw qe(Fe.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${r}`, a);
  }), () => {
    delete e.config.globalProperties.$i18n, go.forEach((r) => {
      delete e.config.globalProperties[`$${r}`];
    });
  };
}
const dl = /* @__PURE__ */ Nt({
  /* eslint-disable */
  name: "i18n-d",
  props: Ce({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Li),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Oe({
      useScope: e.scope,
      __useComponent: !0
    });
    return hr(e, t, or, (...o) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[ui](...o)
    ));
  }
}), vo = dl;
Ha();
ba(ta);
wa(va);
xa(Zo);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = At();
  e.__INTLIFY__ = !0, na(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const fl = {
  en: {
    accommodationRules: {
      title: "Accommodation rules",
      agreementSentence: "I confirm that I have read and agree with",
      agreementSentenceShort: "I confirm that"
    },
    accommodationType: {
      thumbnail: "Thumbnail"
    },
    chosenAccommodation: {
      title: "Accommodations",
      adults: "{n} adult | {n} adults",
      children: "{n} child | {n} children",
      willPay: "I will pay by",
      totalAmount: "Total amount",
      prepaymentAmount: "Pay now",
      onArrivalAmount: "Amount to be paid on arrival",
      delete: "Delete"
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
}, hl = () => ({
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
}), Rn = tl({
  legacy: !1,
  fallbackLocale: "en",
  locale: "en",
  messages: fl,
  pluralizationRules: hl()
}), ln = "choose_accommodation", mr = "empty_cart", On = "booking_confirmation", yo = "reservation_details", wn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, ml = {}, pl = { class: "information-block" };
function gl(e, t) {
  return P(), D("section", pl, [
    ge(e.$slots, "default")
  ]);
}
const nt = /* @__PURE__ */ wn(ml, [["render", gl]]), vl = {}, yl = { class: "divider" };
function _l(e, t) {
  return P(), D("div", yl);
}
const Ie = /* @__PURE__ */ wn(vl, [["render", _l]]), bl = { class: "header" }, wl = { class: "content" }, xl = { class: "amenities" }, kl = { class: "footer" }, Vn = {
  __name: "BflexSkeletonLoader",
  props: {
    isResult: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (P(), ae(nt, {
      class: Je(["accommodation-skeleton", { "accommodation-result": e.isResult }])
    }, {
      default: z(() => [
        x("div", bl, [
          n[2] || (n[2] = x("div", { class: "thumbnail" }, null, -1)),
          x("div", wl, [
            n[0] || (n[0] = x("div", { class: "title-skeleton" }, null, -1)),
            n[1] || (n[1] = x("div", { class: "description" }, [
              x("div", { class: "line" }),
              x("div", { class: "line" }),
              x("div", { class: "line line-short" })
            ], -1)),
            x("div", xl, [
              (P(), D(ue, null, Ae(5, (o) => x("div", {
                key: o,
                class: "amenity-item"
              })), 64))
            ])
          ])
        ]),
        M(Ie),
        x("div", kl, [
          n[4] || (n[4] = x("div", { class: "option-header" }, [
            x("div", { class: "option-title" }),
            x("div", { class: "option-value" })
          ], -1)),
          M(Ie),
          (P(), D(ue, null, Ae(2, (o) => x("div", {
            key: o,
            class: "room-option"
          }, n[3] || (n[3] = [
            x("div", { class: "option-details" }, [
              x("div", { class: "option-name" }),
              x("div", { class: "option-description" })
            ], -1),
            x("div", { class: "price-section" }, [
              x("div", { class: "price" }),
              x("div", { class: "book-button" })
            ], -1)
          ]))), 64))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
};
function Tl(e, t, n = "en-GB") {
  const o = { day: "numeric", month: "short" }, r = { day: "numeric", month: "short", year: "numeric" }, a = new Date(e), l = new Date(t), d = a.getFullYear() === l.getFullYear() && a.getMonth() === l.getMonth(), f = a.getFullYear() === l.getFullYear();
  return d ? `${a.toLocaleDateString(n, o)} — ${l.toLocaleDateString(n, o)} ${l.getFullYear()}` : f ? `${a.toLocaleDateString(n, o)} — ${l.toLocaleDateString(n, o)} ${l.getFullYear()}` : `${a.toLocaleDateString(n, r)} — ${l.toLocaleDateString(n, r)}`;
}
function pr(e, t, n = "nights") {
  const o = new Date(e), l = (new Date(t) - o) / (1e3 * 60 * 60 * 24);
  if (n === "nights")
    return l;
  if (n === "days")
    return l + 1;
  throw new Error('Invalid unit. Use "nights" or "days".');
}
function Sl(e, t, n = 60) {
  const o = [], [r, a] = e.split(":").map(Number), [l, d] = t.split(":").map(Number), f = /* @__PURE__ */ new Date();
  f.setHours(r, a, 0, 0);
  const u = /* @__PURE__ */ new Date();
  u.setHours(l, d, 0, 0);
  const y = new Date(f);
  for (; y <= u; ) {
    const g = y.getHours().toString().padStart(2, "0"), m = y.getMinutes().toString().padStart(2, "0");
    o.push(`${g}:${m}`), y.setMinutes(y.getMinutes() + n);
  }
  return o;
}
function El(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $n = { exports: {} }, Cl = $n.exports, _o;
function Al() {
  return _o || (_o = 1, function(e, t) {
    (function(n, o) {
      e.exports = o();
    })(Cl, function() {
      function n(i, s) {
        if (!(i instanceof s)) throw new TypeError("Cannot call a class as a function");
      }
      function o(i, s) {
        for (var c = 0; c < s.length; c++) {
          var h = s[c];
          h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(i, a(h.key), h);
        }
      }
      function r(i, s, c) {
        return s && o(i.prototype, s), Object.defineProperty(i, "prototype", { writable: !1 }), i;
      }
      function a(i) {
        var s = function(c, h) {
          if (typeof c != "object" || !c) return c;
          var _ = c[Symbol.toPrimitive];
          if (_ !== void 0) {
            var C = _.call(c, h);
            if (typeof C != "object") return C;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(c);
        }(i, "string");
        return typeof s == "symbol" ? s : s + "";
      }
      function l(i) {
        return (l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
          return typeof s;
        } : function(s) {
          return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
        })(i);
      }
      var d = Date.now();
      function f() {
        var i = {}, s = !0, c = 0, h = arguments.length;
        Object.prototype.toString.call(arguments[0]) === "[object Boolean]" && (s = arguments[0], c++);
        for (var _ = function(A) {
          for (var L in A) Object.prototype.hasOwnProperty.call(A, L) && (s && Object.prototype.toString.call(A[L]) === "[object Object]" ? i[L] = f(!0, i[L], A[L]) : i[L] = A[L]);
        }; c < h; c++) {
          var C = arguments[c];
          _(C);
        }
        return i;
      }
      function u(i, s) {
        if ((K(i) || i === window || i === document) && (i = [i]), be(i) || Pe(i) || (i = [i]), Ne(i) != 0) {
          if (be(i) && !Pe(i)) for (var c = i.length, h = 0; h < c && s.call(i[h], i[h], h, i) !== !1; h++) ;
          else if (Pe(i)) {
            for (var _ in i) if (ne(i, _) && s.call(i[_], i[_], _, i) === !1) break;
          }
        }
      }
      function y(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, h = i[d] = i[d] || [], _ = { all: h, evt: null, found: null };
        return s && c && Ne(h) > 0 && u(h, function(C, A) {
          if (C.eventName == s && C.fn.toString() == c.toString()) return _.found = !0, _.evt = A, !1;
        }), _;
      }
      function g(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = s.onElement, h = s.withCallback, _ = s.avoidDuplicate, C = _ === void 0 || _, A = s.once, L = A !== void 0 && A, W = s.useCapture, q = W !== void 0 && W, j = arguments.length > 2 ? arguments[2] : void 0, X = c || [];
        function Z(ee) {
          V(h) && h.call(j, ee, this), L && Z.destroy();
        }
        return re(X) && (X = document.querySelectorAll(X)), Z.destroy = function() {
          u(X, function(ee) {
            var te = y(ee, i, Z);
            te.found && te.all.splice(te.evt, 1), ee.removeEventListener && ee.removeEventListener(i, Z, q);
          });
        }, u(X, function(ee) {
          var te = y(ee, i, Z);
          (ee.addEventListener && C && !te.found || !C) && (ee.addEventListener(i, Z, q), te.all.push({ eventName: i, fn: Z }));
        }), Z;
      }
      function m(i, s) {
        u(s.split(" "), function(c) {
          return i.classList.add(c);
        });
      }
      function w(i, s) {
        u(s.split(" "), function(c) {
          return i.classList.remove(c);
        });
      }
      function k(i, s) {
        return i.classList.contains(s);
      }
      function S(i, s) {
        for (; i !== document.body; ) {
          if (!(i = i.parentElement)) return !1;
          if (typeof i.matches == "function" ? i.matches(s) : i.msMatchesSelector(s)) return i;
        }
      }
      function O(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!i || s === "") return !1;
        if (s === "none") return V(c) && c(), !1;
        var h = B(), _ = s.split(" ");
        u(_, function(C) {
          m(i, "g" + C);
        }), g(h, { onElement: i, avoidDuplicate: !1, once: !0, withCallback: function(C, A) {
          u(_, function(L) {
            w(A, "g" + L);
          }), V(c) && c();
        } });
      }
      function b(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        if (s === "") return i.style.webkitTransform = "", i.style.MozTransform = "", i.style.msTransform = "", i.style.OTransform = "", i.style.transform = "", !1;
        i.style.webkitTransform = s, i.style.MozTransform = s, i.style.msTransform = s, i.style.OTransform = s, i.style.transform = s;
      }
      function T(i) {
        i.style.display = "block";
      }
      function $(i) {
        i.style.display = "none";
      }
      function E(i) {
        var s = document.createDocumentFragment(), c = document.createElement("div");
        for (c.innerHTML = i; c.firstChild; ) s.appendChild(c.firstChild);
        return s;
      }
      function N() {
        return { width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight };
      }
      function B() {
        var i, s = document.createElement("fakeelement"), c = { animation: "animationend", OAnimation: "oAnimationEnd", MozAnimation: "animationend", WebkitAnimation: "webkitAnimationEnd" };
        for (i in c) if (s.style[i] !== void 0) return c[i];
      }
      function I(i, s, c, h) {
        if (i()) s();
        else {
          var _;
          c || (c = 100);
          var C = setInterval(function() {
            i() && (clearInterval(C), _ && clearTimeout(_), s());
          }, c);
        }
      }
      function J(i, s, c) {
        if (fe(i)) console.error("Inject assets error");
        else if (V(s) && (c = s, s = !1), re(s) && s in window) V(c) && c();
        else {
          var h;
          if (i.indexOf(".css") !== -1) {
            if ((h = document.querySelectorAll('link[href="' + i + '"]')) && h.length > 0) return void (V(c) && c());
            var _ = document.getElementsByTagName("head")[0], C = _.querySelectorAll('link[rel="stylesheet"]'), A = document.createElement("link");
            return A.rel = "stylesheet", A.type = "text/css", A.href = i, A.media = "all", C ? _.insertBefore(A, C[0]) : _.appendChild(A), void (V(c) && c());
          }
          if ((h = document.querySelectorAll('script[src="' + i + '"]')) && h.length > 0) {
            if (V(c)) {
              if (re(s)) return I(function() {
                return window[s] !== void 0;
              }, function() {
                c();
              }), !1;
              c();
            }
          } else {
            var L = document.createElement("script");
            L.type = "text/javascript", L.src = i, L.onload = function() {
              if (V(c)) {
                if (re(s)) return I(function() {
                  return window[s] !== void 0;
                }, function() {
                  c();
                }), !1;
                c();
              }
            }, document.body.appendChild(L);
          }
        }
      }
      function G() {
        return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
      }
      function V(i) {
        return typeof i == "function";
      }
      function re(i) {
        return typeof i == "string";
      }
      function K(i) {
        return !(!i || !i.nodeType || i.nodeType != 1);
      }
      function ke(i) {
        return Array.isArray(i);
      }
      function be(i) {
        return i && i.length && isFinite(i.length);
      }
      function Pe(i) {
        return l(i) === "object" && i != null && !V(i) && !ke(i);
      }
      function fe(i) {
        return i == null;
      }
      function ne(i, s) {
        return i !== null && hasOwnProperty.call(i, s);
      }
      function Ne(i) {
        if (Pe(i)) {
          if (i.keys) return i.keys().length;
          var s = 0;
          for (var c in i) ne(i, c) && s++;
          return s;
        }
        return i.length;
      }
      function ye(i) {
        return !isNaN(parseFloat(i)) && isFinite(i);
      }
      function ot() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1, s = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
        if (!s.length) return !1;
        if (s.length == 1) return s[0];
        typeof i == "string" && (i = parseInt(i));
        var c = [];
        u(s, function(L) {
          c.push(L.getAttribute("data-taborder"));
        });
        var h = Math.max.apply(Math, c.map(function(L) {
          return parseInt(L);
        })), _ = i < 0 ? 1 : i + 1;
        _ > h && (_ = "1");
        var C = c.filter(function(L) {
          return L >= parseInt(_);
        }), A = C.sort()[0];
        return document.querySelector('.gbtn[data-taborder="'.concat(A, '"]'));
      }
      function Bt(i) {
        if (i.events.hasOwnProperty("keyboard")) return !1;
        i.events.keyboard = g("keydown", { onElement: window, withCallback: function(s, c) {
          var h = (s = s || window.event).keyCode;
          if (h == 9) {
            var _ = document.querySelector(".gbtn.focused");
            if (!_) {
              var C = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
              if (C == "input" || C == "textarea" || C == "button") return;
            }
            s.preventDefault();
            var A = document.querySelectorAll(".gbtn[data-taborder]");
            if (!A || A.length <= 0) return;
            if (!_) {
              var L = ot();
              return void (L && (L.focus(), m(L, "focused")));
            }
            var W = ot(_.getAttribute("data-taborder"));
            w(_, "focused"), W && (W.focus(), m(W, "focused"));
          }
          h == 39 && i.nextSlide(), h == 37 && i.prevSlide(), h == 27 && i.close();
        } });
      }
      var Zt = r(function i(s, c) {
        var h = this, _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        if (n(this, i), this.img = s, this.slide = c, this.onclose = _, this.img.setZoomEvents) return !1;
        this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", function(C) {
          return h.dragStart(C);
        }, !1), this.img.addEventListener("mouseup", function(C) {
          return h.dragEnd(C);
        }, !1), this.img.addEventListener("mousemove", function(C) {
          return h.drag(C);
        }, !1), this.img.addEventListener("click", function(C) {
          return h.slide.classList.contains("dragging-nav") ? (h.zoomOut(), !1) : h.zoomedIn ? void (h.zoomedIn && !h.dragging && h.zoomOut()) : h.zoomIn();
        }, !1), this.img.setZoomEvents = !0;
      }, [{ key: "zoomIn", value: function() {
        var i = this.widowWidth();
        if (!(this.zoomedIn || i <= 768)) {
          var s = this.img;
          if (s.setAttribute("data-style", s.getAttribute("style")), s.style.maxWidth = s.naturalWidth + "px", s.style.maxHeight = s.naturalHeight + "px", s.naturalWidth > i) {
            var c = i / 2 - s.naturalWidth / 2;
            this.setTranslate(this.img.parentNode, c, 0);
          }
          this.slide.classList.add("zoomed"), this.zoomedIn = !0;
        }
      } }, { key: "zoomOut", value: function() {
        this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && typeof this.onclose == "function" && this.onclose();
      } }, { key: "dragStart", value: function(i) {
        i.preventDefault(), this.zoomedIn ? (i.type === "touchstart" ? (this.initialX = i.touches[0].clientX - this.xOffset, this.initialY = i.touches[0].clientY - this.yOffset) : (this.initialX = i.clientX - this.xOffset, this.initialY = i.clientY - this.yOffset), i.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1;
      } }, { key: "dragEnd", value: function(i) {
        var s = this;
        i.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(function() {
          s.dragging = !1, s.img.isDragging = !1, s.img.classList.remove("dragging");
        }, 100);
      } }, { key: "drag", value: function(i) {
        this.active && (i.preventDefault(), i.type === "touchmove" ? (this.currentX = i.touches[0].clientX - this.initialX, this.currentY = i.touches[0].clientY - this.initialY) : (this.currentX = i.clientX - this.initialX, this.currentY = i.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY));
      } }, { key: "onMove", value: function(i) {
        if (this.zoomedIn) {
          var s = i.clientX - this.img.naturalWidth / 2, c = i.clientY - this.img.naturalHeight / 2;
          this.setTranslate(this.img, s, c);
        }
      } }, { key: "setTranslate", value: function(i, s, c) {
        i.style.transform = "translate3d(" + s + "px, " + c + "px, 0)";
      } }, { key: "widowWidth", value: function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      } }]), qt = r(function i() {
        var s = this, c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i);
        var h = c.dragEl, _ = c.toleranceX, C = _ === void 0 ? 40 : _, A = c.toleranceY, L = A === void 0 ? 65 : A, W = c.slide, q = W === void 0 ? null : W, j = c.instance, X = j === void 0 ? null : j;
        this.el = h, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = C, this.toleranceY = L, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = q, this.instance = X, this.el.addEventListener("mousedown", function(Z) {
          return s.dragStart(Z);
        }, !1), this.el.addEventListener("mouseup", function(Z) {
          return s.dragEnd(Z);
        }, !1), this.el.addEventListener("mousemove", function(Z) {
          return s.drag(Z);
        }, !1);
      }, [{ key: "dragStart", value: function(i) {
        if (this.slide.classList.contains("zoomed")) this.active = !1;
        else {
          i.type === "touchstart" ? (this.initialX = i.touches[0].clientX - this.xOffset, this.initialY = i.touches[0].clientY - this.yOffset) : (this.initialX = i.clientX - this.xOffset, this.initialY = i.clientY - this.yOffset);
          var s = i.target.nodeName.toLowerCase();
          i.target.classList.contains("nodrag") || S(i.target, ".nodrag") || ["input", "select", "textarea", "button", "a"].indexOf(s) !== -1 ? this.active = !1 : (i.preventDefault(), (i.target === this.el || s !== "img" && S(i.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = S(i.target, ".ginner-container")));
        }
      } }, { key: "dragEnd", value: function(i) {
        var s = this;
        i && i.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, this.doSlideChange == "right" && this.instance.prevSlide(), this.doSlideChange == "left" && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout(function() {
          s.instance.preventOutsideClick = !1, s.toleranceReached = !1, s.lastDirection = null, s.dragging = !1, s.el.isDragging = !1, s.el.classList.remove("dragging"), s.slide.classList.remove("dragging-nav"), s.dragContainer.style.transform = "", s.dragContainer.style.transition = "";
        }, 100);
      } }, { key: "drag", value: function(i) {
        if (this.active) {
          i.preventDefault(), this.slide.classList.add("dragging-nav"), i.type === "touchmove" ? (this.currentX = i.touches[0].clientX - this.initialX, this.currentY = i.touches[0].clientY - this.initialY) : (this.currentX = i.clientX - this.initialX, this.currentY = i.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
          var s = Math.abs(this.currentX), c = Math.abs(this.currentY);
          if (s > 0 && s >= Math.abs(this.currentY) && (!this.lastDirection || this.lastDirection == "x")) {
            this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
            var h = this.shouldChange();
            if (!this.instance.settings.dragAutoSnap && h && (this.doSlideChange = h), this.instance.settings.dragAutoSnap && h) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), h == "right" && this.instance.prevSlide(), void (h == "left" && this.instance.nextSlide());
          }
          if (this.toleranceY > 0 && c > 0 && c >= s && (!this.lastDirection || this.lastDirection == "y")) {
            this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
            var _ = this.shouldClose();
            return !this.instance.settings.dragAutoSnap && _ && (this.doSlideClose = !0), void (this.instance.settings.dragAutoSnap && _ && this.instance.close());
          }
        }
      } }, { key: "shouldChange", value: function() {
        var i = !1;
        if (Math.abs(this.currentX) >= this.toleranceX) {
          var s = this.currentX > 0 ? "right" : "left";
          (s == "left" && this.slide !== this.slide.parentNode.lastChild || s == "right" && this.slide !== this.slide.parentNode.firstChild) && (i = s);
        }
        return i;
      } }, { key: "shouldClose", value: function() {
        var i = !1;
        return Math.abs(this.currentY) >= this.toleranceY && (i = !0), i;
      } }, { key: "setTranslate", value: function(i, s, c) {
        var h = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
        i.style.transition = h ? "all .2s ease" : "", i.style.transform = "translate3d(".concat(s, "px, ").concat(c, "px, 0)");
      } }]);
      function Qt(i, s, c, h) {
        var _ = i.querySelector(".gslide-media"), C = new Image(), A = "gSlideTitle_" + c, L = "gSlideDesc_" + c;
        C.addEventListener("load", function() {
          V(h) && h();
        }, !1), C.src = s.href, s.sizes != "" && s.srcset != "" && (C.sizes = s.sizes, C.srcset = s.srcset), C.alt = "", fe(s.alt) || s.alt === "" || (C.alt = s.alt), s.title !== "" && C.setAttribute("aria-labelledby", A), s.description !== "" && C.setAttribute("aria-describedby", L), s.hasOwnProperty("_hasCustomWidth") && s._hasCustomWidth && (C.style.width = s.width), s.hasOwnProperty("_hasCustomHeight") && s._hasCustomHeight && (C.style.height = s.height), _.insertBefore(C, _.firstChild);
      }
      function xn(i, s, c, h) {
        var _ = this, C = i.querySelector(".ginner-container"), A = "gvideo" + c, L = i.querySelector(".gslide-media"), W = this.getAllPlayers();
        m(C, "gvideo-container"), L.insertBefore(E('<div class="gvideo-wrapper"></div>'), L.firstChild);
        var q = i.querySelector(".gvideo-wrapper");
        J(this.settings.plyr.css, "Plyr");
        var j = s.href, X = s == null ? void 0 : s.videoProvider, Z = !1;
        L.style.maxWidth = s.width, J(this.settings.plyr.js, "Plyr", function() {
          if (!X && j.match(/vimeo\.com\/([0-9]*)/) && (X = "vimeo"), !X && (j.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || j.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/)) && (X = "youtube"), X === "local" || !X) {
            X = "local";
            var ee = '<video id="' + A + '" ';
            ee += 'style="background:#000; max-width: '.concat(s.width, ';" '), ee += 'preload="metadata" ', ee += 'x-webkit-airplay="allow" ', ee += "playsinline ", ee += "controls ", ee += 'class="gvideo-local">', ee += '<source src="'.concat(j, '">'), Z = E(ee += "</video>");
          }
          var te = Z || E('<div id="'.concat(A, '" data-plyr-provider="').concat(X, '" data-plyr-embed-id="').concat(j, '"></div>'));
          m(q, "".concat(X, "-video gvideo")), q.appendChild(te), q.setAttribute("data-id", A), q.setAttribute("data-index", c);
          var xe = ne(_.settings.plyr, "config") ? _.settings.plyr.config : {}, ze = new Plyr("#" + A, xe);
          ze.on("ready", function(Be) {
            W[A] = Be.detail.plyr, V(h) && h();
          }), I(function() {
            return i.querySelector("iframe") && i.querySelector("iframe").dataset.ready == "true";
          }, function() {
            _.resize(i);
          }), ze.on("enterfullscreen", zt), ze.on("exitfullscreen", zt);
        });
      }
      function zt(i) {
        var s = S(i.target, ".gslide-media");
        i.type === "enterfullscreen" && m(s, "fullscreen"), i.type === "exitfullscreen" && w(s, "fullscreen");
      }
      function en(i, s, c, h) {
        var _, C = this, A = i.querySelector(".gslide-media"), L = !(!ne(s, "href") || !s.href) && s.href.split("#").pop().trim(), W = !(!ne(s, "content") || !s.content) && s.content;
        if (W && (re(W) && (_ = E('<div class="ginlined-content">'.concat(W, "</div>"))), K(W))) {
          W.style.display == "none" && (W.style.display = "block");
          var q = document.createElement("div");
          q.className = "ginlined-content", q.appendChild(W), _ = q;
        }
        if (L) {
          var j = document.getElementById(L);
          if (!j) return !1;
          var X = j.cloneNode(!0);
          X.style.height = s.height, X.style.maxWidth = s.width, m(X, "ginlined-content"), _ = X;
        }
        if (!_) return console.error("Unable to append inline slide content", s), !1;
        A.style.height = s.height, A.style.width = s.width, A.appendChild(_), this.events["inlineclose" + L] = g("click", { onElement: A.querySelectorAll(".gtrigger-close"), withCallback: function(Z) {
          Z.preventDefault(), C.close();
        } }), V(h) && h();
      }
      function Ht(i, s, c, h) {
        var _ = i.querySelector(".gslide-media"), C = function(A) {
          var L = A.url, W = A.allow, q = A.callback, j = A.appendTo, X = document.createElement("iframe");
          return X.className = "vimeo-video gvideo", X.src = L, X.style.width = "100%", X.style.height = "100%", W && X.setAttribute("allow", W), X.onload = function() {
            X.onload = null, m(X, "node-ready"), V(q) && q();
          }, j && j.appendChild(X), X;
        }({ url: s.href, callback: h });
        _.parentNode.style.maxWidth = s.width, _.parentNode.style.height = s.height, _.appendChild(C);
      }
      var tn = r(function i() {
        var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i), this.defaults = { href: "", sizes: "", srcset: "", title: "", type: "", videoProvider: "", description: "", alt: "", descPosition: "bottom", effect: "", width: "", height: "", content: !1, zoomable: !0, draggable: !0 }, Pe(s) && (this.defaults = f(this.defaults, s));
      }, [{ key: "sourceType", value: function(i) {
        var s = i;
        return (i = i.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) !== null ? "image" : i.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || i.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || i.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || i.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/) || i.match(/vimeo\.com\/([0-9]*)/) || i.match(/\.(mp4|ogg|webm|mov)/) !== null ? "video" : i.match(/\.(mp3|wav|wma|aac|ogg)/) !== null ? "audio" : i.indexOf("#") > -1 && s.split("#").pop().trim() !== "" ? "inline" : i.indexOf("goajax=true") > -1 ? "ajax" : "external";
      } }, { key: "parseConfig", value: function(i, s) {
        var c = this, h = f({ descPosition: s.descPosition }, this.defaults);
        if (Pe(i) && !K(i)) {
          ne(i, "type") || (ne(i, "content") && i.content ? i.type = "inline" : ne(i, "href") && (i.type = this.sourceType(i.href)));
          var _ = f(h, i);
          return this.setSize(_, s), _;
        }
        var C = "", A = i.getAttribute("data-glightbox"), L = i.nodeName.toLowerCase();
        if (L === "a" && (C = i.href), L === "img" && (C = i.src, h.alt = i.alt), h.href = C, u(h, function(ee, te) {
          ne(s, te) && te !== "width" && (h[te] = s[te]);
          var xe = i.dataset[te];
          fe(xe) || (h[te] = c.sanitizeValue(xe));
        }), h.content && (h.type = "inline"), !h.type && C && (h.type = this.sourceType(C)), fe(A)) {
          if (!h.title && L == "a") {
            var W = i.title;
            fe(W) || W === "" || (h.title = W);
          }
          if (!h.title && L == "img") {
            var q = i.alt;
            fe(q) || q === "" || (h.title = q);
          }
        } else {
          var j = [];
          u(h, function(ee, te) {
            j.push(";\\s?" + te);
          }), j = j.join("\\s?:|"), A.trim() !== "" && u(h, function(ee, te) {
            var xe = A, ze = new RegExp("s?" + te + "s?:s?(.*?)(" + j + "s?:|$)"), Be = xe.match(ze);
            if (Be && Be.length && Be[1]) {
              var st = Be[1].trim().replace(/;\s*$/, "");
              h[te] = c.sanitizeValue(st);
            }
          });
        }
        if (h.description && h.description.substring(0, 1) === ".") {
          var X;
          try {
            X = document.querySelector(h.description).innerHTML;
          } catch (ee) {
            if (!(ee instanceof DOMException)) throw ee;
          }
          X && (h.description = X);
        }
        if (!h.description) {
          var Z = i.querySelector(".glightbox-desc");
          Z && (h.description = Z.innerHTML);
        }
        return this.setSize(h, s, i), this.slideConfig = h, h;
      } }, { key: "setSize", value: function(i, s) {
        var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, h = i.type == "video" ? this.checkSize(s.videosWidth) : this.checkSize(s.width), _ = this.checkSize(s.height);
        return i.width = ne(i, "width") && i.width !== "" ? this.checkSize(i.width) : h, i.height = ne(i, "height") && i.height !== "" ? this.checkSize(i.height) : _, c && i.type == "image" && (i._hasCustomWidth = !!c.dataset.width, i._hasCustomHeight = !!c.dataset.height), i;
      } }, { key: "checkSize", value: function(i) {
        return ye(i) ? "".concat(i, "px") : i;
      } }, { key: "sanitizeValue", value: function(i) {
        return i !== "true" && i !== "false" ? i : i === "true";
      } }]), ft = r(function i(s, c, h) {
        n(this, i), this.element = s, this.instance = c, this.index = h;
      }, [{ key: "setContent", value: function() {
        var i = this, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (k(s, "loaded")) return !1;
        var h = this.instance.settings, _ = this.slideConfig, C = G();
        V(h.beforeSlideLoad) && h.beforeSlideLoad({ index: this.index, slide: s, player: !1 });
        var A = _.type, L = _.descPosition, W = s.querySelector(".gslide-media"), q = s.querySelector(".gslide-title"), j = s.querySelector(".gslide-desc"), X = s.querySelector(".gdesc-inner"), Z = c, ee = "gSlideTitle_" + this.index, te = "gSlideDesc_" + this.index;
        if (V(h.afterSlideLoad) && (Z = function() {
          V(c) && c(), h.afterSlideLoad({ index: i.index, slide: s, player: i.instance.getSlidePlayerInstance(i.index) });
        }), _.title == "" && _.description == "" ? X && X.parentNode.parentNode.removeChild(X.parentNode) : (q && _.title !== "" ? (q.id = ee, q.innerHTML = _.title) : q.parentNode.removeChild(q), j && _.description !== "" ? (j.id = te, C && h.moreLength > 0 ? (_.smallDescription = this.slideShortDesc(_.description, h.moreLength, h.moreText), j.innerHTML = _.smallDescription, this.descriptionEvents(j, _)) : j.innerHTML = _.description) : j.parentNode.removeChild(j), m(W.parentNode, "desc-".concat(L)), m(X.parentNode, "description-".concat(L))), m(W, "gslide-".concat(A)), m(s, "loaded"), A !== "video") {
          if (A !== "external") return A === "inline" ? (en.apply(this.instance, [s, _, this.index, Z]), void (_.draggable && new qt({ dragEl: s.querySelector(".gslide-inline"), toleranceX: h.dragToleranceX, toleranceY: h.dragToleranceY, slide: s, instance: this.instance }))) : void (A !== "image" ? V(Z) && Z() : Qt(s, _, this.index, function() {
            var xe = s.querySelector("img");
            _.draggable && new qt({ dragEl: xe, toleranceX: h.dragToleranceX, toleranceY: h.dragToleranceY, slide: s, instance: i.instance }), _.zoomable && xe.naturalWidth > xe.offsetWidth && (m(xe, "zoomable"), new Zt(xe, s, function() {
              i.instance.resize();
            })), V(Z) && Z();
          }));
          Ht.apply(this, [s, _, this.index, Z]);
        } else xn.apply(this.instance, [s, _, this.index, Z]);
      } }, { key: "slideShortDesc", value: function(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], h = document.createElement("div");
        h.innerHTML = i;
        var _ = h.innerText, C = c;
        if ((i = _.trim()).length <= s) return i;
        var A = i.substr(0, s - 1);
        return C ? (h = null, A + '... <a href="#" class="desc-more">' + c + "</a>") : A;
      } }, { key: "descriptionEvents", value: function(i, s) {
        var c = this, h = i.querySelector(".desc-more");
        if (!h) return !1;
        g("click", { onElement: h, withCallback: function(_, C) {
          _.preventDefault();
          var A = document.body, L = S(C, ".gslide-desc");
          if (!L) return !1;
          L.innerHTML = s.description, m(A, "gdesc-open");
          var W = g("click", { onElement: [A, S(L, ".gslide-description")], withCallback: function(q, j) {
            q.target.nodeName.toLowerCase() !== "a" && (w(A, "gdesc-open"), m(A, "gdesc-closed"), L.innerHTML = s.smallDescription, c.descriptionEvents(L, s), setTimeout(function() {
              w(A, "gdesc-closed");
            }, 400), W.destroy());
          } });
        } });
      } }, { key: "create", value: function() {
        return E(this.instance.settings.slideHTML);
      } }, { key: "getConfig", value: function() {
        K(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
        var i = new tn(this.instance.settings.slideExtraAttributes);
        return this.slideConfig = i.parseConfig(this.element, this.instance.settings), this.slideConfig;
      } }]);
      function ht(i) {
        return Math.sqrt(i.x * i.x + i.y * i.y);
      }
      function nn(i, s) {
        var c = function(h, _) {
          var C = ht(h) * ht(_);
          if (C === 0) return 0;
          var A = function(L, W) {
            return L.x * W.x + L.y * W.y;
          }(h, _) / C;
          return A > 1 && (A = 1), Math.acos(A);
        }(i, s);
        return function(h, _) {
          return h.x * _.y - _.x * h.y;
        }(i, s) > 0 && (c *= -1), 180 * c / Math.PI;
      }
      var St = r(function i(s) {
        n(this, i), this.handlers = [], this.el = s;
      }, [{ key: "add", value: function(i) {
        this.handlers.push(i);
      } }, { key: "del", value: function(i) {
        i || (this.handlers = []);
        for (var s = this.handlers.length; s >= 0; s--) this.handlers[s] === i && this.handlers.splice(s, 1);
      } }, { key: "dispatch", value: function() {
        for (var i = 0, s = this.handlers.length; i < s; i++) {
          var c = this.handlers[i];
          typeof c == "function" && c.apply(this.el, arguments);
        }
      } }]);
      function we(i, s) {
        var c = new St(i);
        return c.add(s), c;
      }
      var mt = r(function i(s, c) {
        n(this, i), this.element = typeof s == "string" ? document.querySelector(s) : s, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = { x: null, y: null }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
        var h = function() {
        };
        this.rotate = we(this.element, c.rotate || h), this.touchStart = we(this.element, c.touchStart || h), this.multipointStart = we(this.element, c.multipointStart || h), this.multipointEnd = we(this.element, c.multipointEnd || h), this.pinch = we(this.element, c.pinch || h), this.swipe = we(this.element, c.swipe || h), this.tap = we(this.element, c.tap || h), this.doubleTap = we(this.element, c.doubleTap || h), this.longTap = we(this.element, c.longTap || h), this.singleTap = we(this.element, c.singleTap || h), this.pressMove = we(this.element, c.pressMove || h), this.twoFingerPressMove = we(this.element, c.twoFingerPressMove || h), this.touchMove = we(this.element, c.touchMove || h), this.touchEnd = we(this.element, c.touchEnd || h), this.touchCancel = we(this.element, c.touchCancel || h), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = { x: null, y: null };
      }, [{ key: "start", value: function(i) {
        if (i.touches) if (i.target && i.target.nodeName && ["a", "button", "input"].indexOf(i.target.nodeName.toLowerCase()) >= 0) console.log("ignore drag for this touched element", i.target.nodeName.toLowerCase());
        else {
          this.now = Date.now(), this.x1 = i.touches[0].pageX, this.y1 = i.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(i, this.element), this.preTapPosition.x !== null && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
          var s = this.preV;
          if (i.touches.length > 1) {
            this._cancelLongTap(), this._cancelSingleTap();
            var c = { x: i.touches[1].pageX - this.x1, y: i.touches[1].pageY - this.y1 };
            s.x = c.x, s.y = c.y, this.pinchStartLen = ht(s), this.multipointStart.dispatch(i, this.element);
          }
          this._preventTap = !1, this.longTapTimeout = setTimeout((function() {
            this.longTap.dispatch(i, this.element), this._preventTap = !0;
          }).bind(this), 750);
        }
      } }, { key: "move", value: function(i) {
        if (i.touches) {
          var s = this.preV, c = i.touches.length, h = i.touches[0].pageX, _ = i.touches[0].pageY;
          if (this.isDoubleTap = !1, c > 1) {
            var C = i.touches[1].pageX, A = i.touches[1].pageY, L = { x: i.touches[1].pageX - h, y: i.touches[1].pageY - _ };
            s.x !== null && (this.pinchStartLen > 0 && (i.zoom = ht(L) / this.pinchStartLen, this.pinch.dispatch(i, this.element)), i.angle = nn(L, s), this.rotate.dispatch(i, this.element)), s.x = L.x, s.y = L.y, this.x2 !== null && this.sx2 !== null ? (i.deltaX = (h - this.x2 + C - this.sx2) / 2, i.deltaY = (_ - this.y2 + A - this.sy2) / 2) : (i.deltaX = 0, i.deltaY = 0), this.twoFingerPressMove.dispatch(i, this.element), this.sx2 = C, this.sy2 = A;
          } else {
            if (this.x2 !== null) {
              i.deltaX = h - this.x2, i.deltaY = _ - this.y2;
              var W = Math.abs(this.x1 - this.x2), q = Math.abs(this.y1 - this.y2);
              (W > 10 || q > 10) && (this._preventTap = !0);
            } else i.deltaX = 0, i.deltaY = 0;
            this.pressMove.dispatch(i, this.element);
          }
          this.touchMove.dispatch(i, this.element), this._cancelLongTap(), this.x2 = h, this.y2 = _, c > 1 && i.preventDefault();
        }
      } }, { key: "end", value: function(i) {
        if (i.changedTouches) {
          this._cancelLongTap();
          var s = this;
          i.touches.length < 2 && (this.multipointEnd.dispatch(i, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (i.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function() {
            s.swipe.dispatch(i, s.element);
          }, 0)) : (this.tapTimeout = setTimeout(function() {
            s._preventTap || s.tap.dispatch(i, s.element), s.isDoubleTap && (s.doubleTap.dispatch(i, s.element), s.isDoubleTap = !1);
          }, 0), s.isDoubleTap || (s.singleTapTimeout = setTimeout(function() {
            s.singleTap.dispatch(i, s.element);
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
      } }, { key: "_swipeDirection", value: function(i, s, c, h) {
        return Math.abs(i - s) >= Math.abs(c - h) ? i - s > 0 ? "Left" : "Right" : c - h > 0 ? "Up" : "Down";
      } }, { key: "on", value: function(i, s) {
        this[i] && this[i].add(s);
      } }, { key: "off", value: function(i, s) {
        this[i] && this[i].del(s);
      } }, { key: "destroy", value: function() {
        return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
      } }]);
      function rt(i) {
        var s = function() {
          var A, L = document.createElement("fakeelement"), W = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
          for (A in W) if (L.style[A] !== void 0) return W[A];
        }(), c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, h = k(i, "gslide-media") ? i : i.querySelector(".gslide-media"), _ = S(h, ".ginner-container"), C = i.querySelector(".gslide-description");
        c > 769 && (h = _), m(h, "greset"), b(h, "translate3d(0, 0, 0)"), g(s, { onElement: h, once: !0, withCallback: function(A, L) {
          w(h, "greset");
        } }), h.style.opacity = "", C && (C.style.opacity = "");
      }
      function on(i) {
        if (i.events.hasOwnProperty("touch")) return !1;
        var s, c, h, _ = N(), C = _.width, A = _.height, L = !1, W = null, q = null, j = null, X = !1, Z = 1, ee = 1, te = !1, xe = !1, ze = null, Be = null, st = null, $e = null, at = 0, lt = 0, rn = !1, Wt = !1, Xe = {}, Ge = {}, Di = 0, Mi = 0, Dr = document.getElementById("glightbox-slider"), kn = document.querySelector(".goverlay"), Mr = new mt(Dr, { touchStart: function(he) {
          if (L = !0, (k(he.targetTouches[0].target, "ginner-container") || S(he.targetTouches[0].target, ".gslide-desc") || he.targetTouches[0].target.nodeName.toLowerCase() == "a") && (L = !1), S(he.targetTouches[0].target, ".gslide-inline") && !k(he.targetTouches[0].target.parentNode, "gslide-inline") && (L = !1), L) {
            if (Ge = he.targetTouches[0], Xe.pageX = he.targetTouches[0].pageX, Xe.pageY = he.targetTouches[0].pageY, Di = he.targetTouches[0].clientX, Mi = he.targetTouches[0].clientY, W = i.activeSlide, q = W.querySelector(".gslide-media"), h = W.querySelector(".gslide-inline"), j = null, k(q, "gslide-image") && (j = q.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (q = W.querySelector(".ginner-container")), w(kn, "greset"), he.pageX > 20 && he.pageX < window.innerWidth - 20) return;
            he.preventDefault();
          }
        }, touchMove: function(he) {
          if (L && (Ge = he.targetTouches[0], !te && !xe)) {
            if (h && h.offsetHeight > A) {
              var Re = Xe.pageX - Ge.pageX;
              if (Math.abs(Re) <= 13) return !1;
            }
            X = !0;
            var pt, Tn = he.targetTouches[0].clientX, Fr = he.targetTouches[0].clientY, Br = Di - Tn, qr = Mi - Fr;
            if (Math.abs(Br) > Math.abs(qr) ? (rn = !1, Wt = !0) : (Wt = !1, rn = !0), s = Ge.pageX - Xe.pageX, at = 100 * s / C, c = Ge.pageY - Xe.pageY, lt = 100 * c / A, rn && j && (pt = 1 - Math.abs(c) / A, kn.style.opacity = pt, i.settings.touchFollowAxis && (at = 0)), Wt && (pt = 1 - Math.abs(s) / C, q.style.opacity = pt, i.settings.touchFollowAxis && (lt = 0)), !j) return b(q, "translate3d(".concat(at, "%, 0, 0)"));
            b(q, "translate3d(".concat(at, "%, ").concat(lt, "%, 0)"));
          }
        }, touchEnd: function() {
          if (L) {
            if (X = !1, xe || te) return st = ze, void ($e = Be);
            var he = Math.abs(parseInt(lt)), Re = Math.abs(parseInt(at));
            if (!(he > 29 && j)) return he < 29 && Re < 25 ? (m(kn, "greset"), kn.style.opacity = 1, rt(q)) : void 0;
            i.close();
          }
        }, multipointEnd: function() {
          setTimeout(function() {
            te = !1;
          }, 50);
        }, multipointStart: function() {
          te = !0, Z = ee || 1;
        }, pinch: function(he) {
          if (!j || X) return !1;
          te = !0, j.scaleX = j.scaleY = Z * he.zoom;
          var Re = Z * he.zoom;
          if (xe = !0, Re <= 1) return xe = !1, Re = 1, $e = null, st = null, ze = null, Be = null, void j.setAttribute("style", "");
          Re > 4.5 && (Re = 4.5), j.style.transform = "scale3d(".concat(Re, ", ").concat(Re, ", 1)"), ee = Re;
        }, pressMove: function(he) {
          if (xe && !te) {
            var Re = Ge.pageX - Xe.pageX, pt = Ge.pageY - Xe.pageY;
            st && (Re += st), $e && (pt += $e), ze = Re, Be = pt;
            var Tn = "translate3d(".concat(Re, "px, ").concat(pt, "px, 0)");
            ee && (Tn += " scale3d(".concat(ee, ", ").concat(ee, ", 1)")), b(j, Tn);
          }
        }, swipe: function(he) {
          if (!xe) if (te) te = !1;
          else {
            if (he.direction == "Left") {
              if (i.index == i.elements.length - 1) return rt(q);
              i.nextSlide();
            }
            if (he.direction == "Right") {
              if (i.index == 0) return rt(q);
              i.prevSlide();
            }
          }
        } });
        i.events.touch = Mr;
      }
      var p = G(), v = G() !== null || document.createTouch !== void 0 || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints, R = document.getElementsByTagName("html")[0], Y = { selector: ".glightbox", elements: null, skin: "clean", theme: "clean", closeButton: !0, startAt: null, autoplayVideos: !0, autofocusVideos: !0, descPosition: "bottom", width: "900px", height: "506px", videosWidth: "960px", beforeSlideChange: null, afterSlideChange: null, beforeSlideLoad: null, afterSlideLoad: null, slideInserted: null, slideRemoved: null, slideExtraAttributes: null, onOpen: null, onClose: null, loop: !1, zoomable: !0, draggable: !0, dragAutoSnap: !1, dragToleranceX: 40, dragToleranceY: 65, preload: !0, oneSlidePerOpen: !1, touchNavigation: !0, touchFollowAxis: !0, keyboardNavigation: !0, closeOnOutsideClick: !0, plugins: !1, plyr: { css: "https://cdn.plyr.io/3.6.12/plyr.css", js: "https://cdn.plyr.io/3.6.12/plyr.js", config: { ratio: "16:9", fullscreen: { enabled: !0, iosNative: !0 }, youtube: { noCookie: !0, rel: 0, showinfo: 0, iv_load_policy: 3 }, vimeo: { byline: !1, portrait: !1, title: !1, transparent: !1 } } }, openEffect: "zoom", closeEffect: "zoom", slideEffect: "slide", moreText: "See more", moreLength: 60, cssEfects: { fade: { in: "fadeIn", out: "fadeOut" }, zoom: { in: "zoomIn", out: "zoomOut" }, slide: { in: "slideInRight", out: "slideOutLeft" }, slideBack: { in: "slideInLeft", out: "slideOutRight" }, none: { in: "none", out: "none" } }, svg: { close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>', next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>', prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>' }, slideHTML: `<div class="gslide">
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
        var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i), this.customOptions = s, this.settings = f(Y, s), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1;
      }, [{ key: "init", value: function() {
        var i = this, s = this.getSelector();
        s && (this.baseEvents = g("click", { onElement: s, withCallback: function(c, h) {
          c.preventDefault(), i.open(h);
        } })), this.elements = this.getElements();
      } }, { key: "open", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (this.elements.length === 0) return !1;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var c = ye(s) ? s : this.settings.startAt;
        if (K(i)) {
          var h = i.getAttribute("data-gallery");
          h && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, h)), fe(c) && (c = this.getElementIndex(i)) < 0 && (c = 0);
        }
        ye(c) || (c = 0), this.build(), O(this.overlay, this.settings.openEffect === "none" ? "none" : this.settings.cssEfects.fade.in);
        var _ = document.body, C = window.innerWidth - document.documentElement.clientWidth;
        if (C > 0) {
          var A = document.createElement("style");
          A.type = "text/css", A.className = "gcss-styles", A.innerText = ".gscrollbar-fixer {margin-right: ".concat(C, "px}"), document.head.appendChild(A), m(_, "gscrollbar-fixer");
        }
        m(_, "glightbox-open"), m(R, "glightbox-open"), p && (m(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(c, !0), this.elements.length === 1 ? (m(this.prevButton, "glightbox-button-hidden"), m(this.nextButton, "glightbox-button-hidden")) : (w(this.prevButton, "glightbox-button-hidden"), w(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), V(this.settings.onOpen) && this.settings.onOpen(), v && this.settings.touchNavigation && on(this), this.settings.keyboardNavigation && Bt(this);
      } }, { key: "openAt", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        this.open(null, i);
      } }, { key: "showSlide", value: function() {
        var i = this, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        T(this.loader), this.index = parseInt(s);
        var h = this.slidesContainer.querySelector(".current");
        h && w(h, "current"), this.slideAnimateOut();
        var _ = this.slidesContainer.querySelectorAll(".gslide")[s];
        if (k(_, "loaded")) this.slideAnimateIn(_, c), $(this.loader);
        else {
          T(this.loader);
          var C = this.elements[s], A = { index: this.index, slide: _, slideNode: _, slideConfig: C.slideConfig, slideIndex: this.index, trigger: C.node, player: null };
          this.trigger("slide_before_load", A), C.instance.setContent(_, function() {
            $(i.loader), i.resize(), i.slideAnimateIn(_, c), i.trigger("slide_after_load", A);
          });
        }
        this.slideDescription = _.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && k(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(s + 1), this.preloadSlide(s - 1)), this.updateNavigationClasses(), this.activeSlide = _;
      } }, { key: "preloadSlide", value: function(i) {
        var s = this;
        if (i < 0 || i > this.elements.length - 1 || fe(this.elements[i])) return !1;
        var c = this.slidesContainer.querySelectorAll(".gslide")[i];
        if (k(c, "loaded")) return !1;
        var h = this.elements[i], _ = h.type, C = { index: i, slide: c, slideNode: c, slideConfig: h.slideConfig, slideIndex: i, trigger: h.node, player: null };
        this.trigger("slide_before_load", C), _ === "video" || _ === "external" ? setTimeout(function() {
          h.instance.setContent(c, function() {
            s.trigger("slide_after_load", C);
          });
        }, 200) : h.instance.setContent(c, function() {
          s.trigger("slide_after_load", C);
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
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
        s < 0 && (s = this.elements.length);
        var c = new ft(i, this, s), h = c.getConfig(), _ = f({}, h), C = c.create(), A = this.elements.length - 1;
        _.index = s, _.node = !1, _.instance = c, _.slideConfig = h, this.elements.splice(s, 0, _);
        var L = null, W = null;
        if (this.slidesContainer) {
          if (s > A) this.slidesContainer.appendChild(C);
          else {
            var q = this.slidesContainer.querySelectorAll(".gslide")[s];
            this.slidesContainer.insertBefore(C, q);
          }
          (this.settings.preload && this.index == 0 && s == 0 || this.index - 1 == s || this.index + 1 == s) && this.preloadSlide(s), this.index === 0 && s === 0 && (this.index = 1), this.updateNavigationClasses(), L = this.slidesContainer.querySelectorAll(".gslide")[s], W = this.getSlidePlayerInstance(s), _.slideNode = L;
        }
        this.trigger("slide_inserted", { index: s, slide: L, slideNode: L, slideConfig: h, slideIndex: s, trigger: null, player: W }), V(this.settings.slideInserted) && this.settings.slideInserted({ index: s, slide: L, player: W });
      } }, { key: "removeSlide", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
        if (i < 0 || i > this.elements.length - 1) return !1;
        var s = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[i];
        s && (this.getActiveSlideIndex() == i && (i == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), s.parentNode.removeChild(s)), this.elements.splice(i, 1), this.trigger("slide_removed", i), V(this.settings.slideRemoved) && this.settings.slideRemoved(i);
      } }, { key: "slideAnimateIn", value: function(i, s) {
        var c = this, h = i.querySelector(".gslide-media"), _ = i.querySelector(".gslide-description"), C = { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlide, slideConfig: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, A = { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideConfig: this.elements[this.index].slideConfig, slideIndex: this.index, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) };
        if (h.offsetWidth > 0 && _ && ($(_), _.style.display = ""), w(i, this.effectsClasses), s) O(i, this.settings.cssEfects[this.settings.openEffect].in, function() {
          c.settings.autoplayVideos && c.slidePlayerPlay(i), c.trigger("slide_changed", { prev: C, current: A }), V(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [C, A]);
        });
        else {
          var L = this.settings.slideEffect, W = L !== "none" ? this.settings.cssEfects[L].in : L;
          this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (W = this.settings.cssEfects.slideBack.in), O(i, W, function() {
            c.settings.autoplayVideos && c.slidePlayerPlay(i), c.trigger("slide_changed", { prev: C, current: A }), V(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [C, A]);
          });
        }
        setTimeout(function() {
          c.resize(i);
        }, 100), m(i, "current");
      } }, { key: "slideAnimateOut", value: function() {
        if (!this.prevActiveSlide) return !1;
        var i = this.prevActiveSlide;
        w(i, this.effectsClasses), m(i, "prev");
        var s = this.settings.slideEffect, c = s !== "none" ? this.settings.cssEfects[s].out : s;
        this.slidePlayerPause(i), this.trigger("slide_before_change", { prev: { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlideIndex, slideConfig: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, current: { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideIndex: this.index, slideConfig: this.elements[this.index].slideConfig, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) } }), V(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{ index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, { index: this.index, slide: this.activeSlide, player: this.getSlidePlayerInstance(this.index) }]), this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (c = this.settings.cssEfects.slideBack.out), O(i, c, function() {
          var h = i.querySelector(".ginner-container"), _ = i.querySelector(".gslide-media"), C = i.querySelector(".gslide-description");
          h.style.transform = "", _.style.transform = "", w(_, "greset"), _.style.opacity = "", C && (C.style.opacity = ""), w(i, "prev");
        });
      } }, { key: "getAllPlayers", value: function() {
        return this.videoPlayers;
      } }, { key: "getSlidePlayerInstance", value: function(i) {
        var s = "gvideo" + i, c = this.getAllPlayers();
        return !(!ne(c, s) || !c[s]) && c[s];
      } }, { key: "stopSlideVideo", value: function(i) {
        if (K(i)) {
          var s = i.querySelector(".gvideo-wrapper");
          s && (i = s.getAttribute("data-index"));
        }
        console.log("stopSlideVideo is deprecated, use slidePlayerPause");
        var c = this.getSlidePlayerInstance(i);
        c && c.playing && c.pause();
      } }, { key: "slidePlayerPause", value: function(i) {
        if (K(i)) {
          var s = i.querySelector(".gvideo-wrapper");
          s && (i = s.getAttribute("data-index"));
        }
        var c = this.getSlidePlayerInstance(i);
        c && c.playing && c.pause();
      } }, { key: "playSlideVideo", value: function(i) {
        if (K(i)) {
          var s = i.querySelector(".gvideo-wrapper");
          s && (i = s.getAttribute("data-index"));
        }
        console.log("playSlideVideo is deprecated, use slidePlayerPlay");
        var c = this.getSlidePlayerInstance(i);
        c && !c.playing && c.play();
      } }, { key: "slidePlayerPlay", value: function(i) {
        var s;
        if (!p || (s = this.settings.plyr.config) !== null && s !== void 0 && s.muted) {
          if (K(i)) {
            var c = i.querySelector(".gvideo-wrapper");
            c && (i = c.getAttribute("data-index"));
          }
          var h = this.getSlidePlayerInstance(i);
          h && !h.playing && (h.play(), this.settings.autofocusVideos && h.elements.container.focus());
        }
      } }, { key: "setElements", value: function(i) {
        var s = this;
        this.settings.elements = !1;
        var c = [];
        i && i.length && u(i, function(h, _) {
          var C = new ft(h, s, _), A = C.getConfig(), L = f({}, A);
          L.slideConfig = A, L.instance = C, L.index = _, c.push(L);
        }), this.elements = c, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (u(this.elements, function() {
          var h = E(s.settings.slideHTML);
          s.slidesContainer.appendChild(h);
        }), this.showSlide(0, !0)));
      } }, { key: "getElementIndex", value: function(i) {
        var s = !1;
        return u(this.elements, function(c, h) {
          if (ne(c, "node") && c.node == i) return s = h, !0;
        }), s;
      } }, { key: "getElements", value: function() {
        var i = this, s = [];
        this.elements = this.elements ? this.elements : [], !fe(this.settings.elements) && ke(this.settings.elements) && this.settings.elements.length && u(this.settings.elements, function(h, _) {
          var C = new ft(h, i, _), A = C.getConfig(), L = f({}, A);
          L.node = !1, L.index = _, L.instance = C, L.slideConfig = A, s.push(L);
        });
        var c = !1;
        return this.getSelector() && (c = document.querySelectorAll(this.getSelector())), c && u(c, function(h, _) {
          var C = new ft(h, i, _), A = C.getConfig(), L = f({}, A);
          L.node = h, L.index = _, L.instance = C, L.slideConfig = A, L.gallery = h.getAttribute("data-gallery"), s.push(L);
        }), s;
      } }, { key: "getGalleryElements", value: function(i, s) {
        return i.filter(function(c) {
          return c.gallery == s;
        });
      } }, { key: "getSelector", value: function() {
        return !this.settings.elements && (this.settings.selector && this.settings.selector.substring(0, 5) == "data-" ? "*[".concat(this.settings.selector, "]") : this.settings.selector);
      } }, { key: "getActiveSlide", value: function() {
        return this.slidesContainer.querySelectorAll(".gslide")[this.index];
      } }, { key: "getActiveSlideIndex", value: function() {
        return this.index;
      } }, { key: "getAnimationClasses", value: function() {
        var i = [];
        for (var s in this.settings.cssEfects) if (this.settings.cssEfects.hasOwnProperty(s)) {
          var c = this.settings.cssEfects[s];
          i.push("g".concat(c.in)), i.push("g".concat(c.out));
        }
        return i.join(" ");
      } }, { key: "build", value: function() {
        var i = this;
        if (this.built) return !1;
        var s = document.body.childNodes, c = [];
        u(s, function(q) {
          q.parentNode == document.body && q.nodeName.charAt(0) !== "#" && q.hasAttribute && !q.hasAttribute("aria-hidden") && (c.push(q), q.setAttribute("aria-hidden", "true"));
        });
        var h = ne(this.settings.svg, "next") ? this.settings.svg.next : "", _ = ne(this.settings.svg, "prev") ? this.settings.svg.prev : "", C = ne(this.settings.svg, "close") ? this.settings.svg.close : "", A = this.settings.lightboxHTML;
        A = E(A = (A = (A = A.replace(/{nextSVG}/g, h)).replace(/{prevSVG}/g, _)).replace(/{closeSVG}/g, C)), document.body.appendChild(A);
        var L = document.getElementById("glightbox-body");
        this.modal = L;
        var W = L.querySelector(".gclose");
        this.prevButton = L.querySelector(".gprev"), this.nextButton = L.querySelector(".gnext"), this.overlay = L.querySelector(".goverlay"), this.loader = L.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = c, this.events = {}, m(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && W && (this.events.close = g("click", { onElement: W, withCallback: function(q, j) {
          q.preventDefault(), i.close();
        } })), W && !this.settings.closeButton && W.parentNode.removeChild(W), this.nextButton && (this.events.next = g("click", { onElement: this.nextButton, withCallback: function(q, j) {
          q.preventDefault(), i.nextSlide();
        } })), this.prevButton && (this.events.prev = g("click", { onElement: this.prevButton, withCallback: function(q, j) {
          q.preventDefault(), i.prevSlide();
        } })), this.settings.closeOnOutsideClick && (this.events.outClose = g("click", { onElement: L, withCallback: function(q, j) {
          i.preventOutsideClick || k(document.body, "glightbox-mobile") || S(q.target, ".ginner-container") || S(q.target, ".gbtn") || k(q.target, "gnext") || k(q.target, "gprev") || i.close();
        } })), u(this.elements, function(q, j) {
          i.slidesContainer.appendChild(q.instance.create()), q.slideNode = i.slidesContainer.querySelectorAll(".gslide")[j];
        }), v && m(document.body, "glightbox-touch"), this.events.resize = g("resize", { onElement: window, withCallback: function() {
          i.resize();
        } }), this.built = !0;
      } }, { key: "resize", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        if ((i = i || this.activeSlide) && !k(i, "zoomed")) {
          var s = N(), c = i.querySelector(".gvideo-wrapper"), h = i.querySelector(".gslide-image"), _ = this.slideDescription, C = s.width, A = s.height;
          if (C <= 768 ? m(document.body, "glightbox-mobile") : w(document.body, "glightbox-mobile"), c || h) {
            var L = !1;
            if (_ && (k(_, "description-bottom") || k(_, "description-top")) && !k(_, "gabsolute") && (L = !0), h) {
              if (C <= 768) h.querySelector("img");
              else if (L) {
                var W, q, j = _.offsetHeight, X = h.querySelector("img"), Z = (W = this.elements[this.index]) === null || W === void 0 ? void 0 : W.node, ee = "100vh";
                Z && (ee = (q = Z.getAttribute("data-height")) !== null && q !== void 0 ? q : ee), X.setAttribute("style", "max-height: calc(".concat(ee, " - ").concat(j, "px)")), _.setAttribute("style", "max-width: ".concat(X.offsetWidth, "px;"));
              }
            }
            if (c) {
              var te = ne(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
              if (!te) {
                var xe = c.clientWidth, ze = c.clientHeight, Be = xe / ze;
                te = "".concat(xe / Be, ":").concat(ze / Be);
              }
              var st = te.split(":"), $e = this.settings.videosWidth, at = this.settings.videosWidth, lt = (at = ye($e) || $e.indexOf("px") !== -1 ? parseInt($e) : $e.indexOf("vw") !== -1 ? C * parseInt($e) / 100 : $e.indexOf("vh") !== -1 ? A * parseInt($e) / 100 : $e.indexOf("%") !== -1 ? C * parseInt($e) / 100 : parseInt(c.clientWidth)) / (parseInt(st[0]) / parseInt(st[1]));
              if (lt = Math.floor(lt), L && (A -= _.offsetHeight), at > C || lt > A || A < lt && C > at) {
                var rn = c.offsetWidth, Wt = c.offsetHeight, Xe = A / Wt, Ge = { width: rn * Xe, height: Wt * Xe };
                c.parentNode.setAttribute("style", "max-width: ".concat(Ge.width, "px")), L && _.setAttribute("style", "max-width: ".concat(Ge.width, "px;"));
              } else c.parentNode.style.maxWidth = "".concat($e), L && _.setAttribute("style", "max-width: ".concat($e, ";"));
            }
          }
        }
      } }, { key: "reload", value: function() {
        this.init();
      } }, { key: "updateNavigationClasses", value: function() {
        var i = this.loop();
        w(this.nextButton, "disabled"), w(this.prevButton, "disabled"), this.index == 0 && this.elements.length - 1 == 0 ? (m(this.prevButton, "disabled"), m(this.nextButton, "disabled")) : this.index !== 0 || i ? this.index !== this.elements.length - 1 || i || m(this.nextButton, "disabled") : m(this.prevButton, "disabled");
      } }, { key: "loop", value: function() {
        var i = ne(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
        return i = ne(this.settings, "loop") ? this.settings.loop : i, i;
      } }, { key: "close", value: function() {
        var i = this;
        if (!this.lightboxOpen) {
          if (this.events) {
            for (var s in this.events) this.events.hasOwnProperty(s) && this.events[s].destroy();
            this.events = null;
          }
          return !1;
        }
        if (this.closing) return !1;
        this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && u(this.bodyHiddenChildElms, function(c) {
          c.removeAttribute("aria-hidden");
        }), m(this.modal, "glightbox-closing"), O(this.overlay, this.settings.openEffect == "none" ? "none" : this.settings.cssEfects.fade.out), O(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function() {
          if (i.activeSlide = null, i.prevActiveSlideIndex = null, i.prevActiveSlide = null, i.built = !1, i.events) {
            for (var c in i.events) i.events.hasOwnProperty(c) && i.events[c].destroy();
            i.events = null;
          }
          var h = document.body;
          w(R, "glightbox-open"), w(h, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), i.modal.parentNode.removeChild(i.modal), i.trigger("close"), V(i.settings.onClose) && i.settings.onClose();
          var _ = document.querySelector(".gcss-styles");
          _ && _.parentNode.removeChild(_), i.lightboxOpen = !1, i.closing = null;
        });
      } }, { key: "destroy", value: function() {
        this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
      } }, { key: "on", value: function(i, s) {
        var c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!i || !V(s)) throw new TypeError("Event name and callback must be defined");
        this.apiEvents.push({ evt: i, once: c, callback: s });
      } }, { key: "once", value: function(i, s) {
        this.on(i, s, !0);
      } }, { key: "trigger", value: function(i) {
        var s = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, h = [];
        u(this.apiEvents, function(_, C) {
          var A = _.evt, L = _.once, W = _.callback;
          A == i && (W(c), L && h.push(C));
        }), h.length && u(h, function(_) {
          return s.apiEvents.splice(_, 1);
        });
      } }, { key: "clearAllEvents", value: function() {
        this.apiEvents.splice(0, this.apiEvents.length);
      } }, { key: "version", value: function() {
        return "3.3.1";
      } }]);
      return function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, s = new _e(i);
        return s.init(), s;
      };
    });
  }($n)), $n.exports;
}
var Pl = Al();
const Ll = /* @__PURE__ */ El(Pl), Ol = {
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
    return Jt(() => {
      r = Ll({
        elements: n.images.map((a) => ({
          href: a.url,
          type: "image",
          title: a.title || "",
          description: a.description || ""
        })),
        openEffect: "zoom",
        // Анимация открытия
        closeEffect: "fade",
        // Анимация закрытия
        touchNavigation: !0
      }), n.modelValue && r.open(), r.on("close", () => {
        o("update:modelValue", !1);
      });
    }), je(
      () => n.modelValue,
      (a) => {
        a ? r.open() : r.close();
      }
    ), Ur(() => {
      r && r.destroy();
    }), (a, l) => ge(a.$slots, "default");
  }
}, $l = { class: "accommodation-type-card" }, Il = ["src", "alt"], Nl = { key: 1 }, Rl = { class: "accommodation-type-card__body" }, Dl = { class: "accommodation-type-card__body-description" }, Ml = { class: "amenities" }, Fl = {
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
    const { t } = Oe(), n = ve(!1), o = () => {
      n.value = !0;
    };
    return (r, a) => (P(), D("article", $l, [
      x("section", {
        onClick: o,
        class: "accommodation-type-card__img"
      }, [
        M(Ol, {
          modelValue: n.value,
          "onUpdate:modelValue": a[0] || (a[0] = (l) => n.value = l),
          images: e.data.gallery
        }, {
          default: z(() => [
            e.data.thumbnail && e.data.thumbnail.url ? (P(), D("img", {
              key: 0,
              onClick: o,
              src: e.data.thumbnail.url,
              alt: e.data.thumbnail.name
            }, null, 8, Il)) : (P(), D("span", Nl, F(U(t)("accommodationType.thumbnail")), 1))
          ]),
          _: 1
        }, 8, ["modelValue", "images"])
      ]),
      x("section", Rl, [
        x("div", Dl, [
          x("h2", null, F(e.data.name), 1),
          ge(r.$slots, "description", {}, () => [
            x("p", null, F(e.data.description), 1)
          ]),
          x("div", Ml, [
            (P(!0), D(ue, null, Ae(e.data.amenities, (l, d) => (P(), D("span", {
              key: d,
              class: "amenities__item"
            }, F(l.title), 1))), 128))
          ])
        ])
      ])
    ]));
  }
}, Bl = ["top", "right", "bottom", "left"], bo = ["start", "end"], wo = /* @__PURE__ */ Bl.reduce((e, t) => e.concat(t, t + "-" + bo[0], t + "-" + bo[1]), []), vn = Math.min, Ct = Math.max, ql = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, zl = {
  start: "end",
  end: "start"
};
function mi(e, t, n) {
  return Ct(e, vn(t, n));
}
function Ft(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function it(e) {
  return e.split("-")[0];
}
function Ye(e) {
  return e.split("-")[1];
}
function gr(e) {
  return e === "x" ? "y" : "x";
}
function Oi(e) {
  return e === "y" ? "height" : "width";
}
function $t(e) {
  return ["top", "bottom"].includes(it(e)) ? "y" : "x";
}
function $i(e) {
  return gr($t(e));
}
function vr(e, t, n) {
  n === void 0 && (n = !1);
  const o = Ye(e), r = $i(e), a = Oi(r);
  let l = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (l = Mn(l)), [l, Mn(l)];
}
function Hl(e) {
  const t = Mn(e);
  return [Dn(e), t, Dn(t)];
}
function Dn(e) {
  return e.replace(/start|end/g, (t) => zl[t]);
}
function Wl(e, t, n) {
  const o = ["left", "right"], r = ["right", "left"], a = ["top", "bottom"], l = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? r : o : t ? o : r;
    case "left":
    case "right":
      return t ? a : l;
    default:
      return [];
  }
}
function Vl(e, t, n, o) {
  const r = Ye(e);
  let a = Wl(it(e), n === "start", o);
  return r && (a = a.map((l) => l + "-" + r), t && (a = a.concat(a.map(Dn)))), a;
}
function Mn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => ql[t]);
}
function Ul(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function yr(e) {
  return typeof e != "number" ? Ul(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function cn(e) {
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
function xo(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const a = $t(t), l = $i(t), d = Oi(l), f = it(t), u = a === "y", y = o.x + o.width / 2 - r.width / 2, g = o.y + o.height / 2 - r.height / 2, m = o[d] / 2 - r[d] / 2;
  let w;
  switch (f) {
    case "top":
      w = {
        x: y,
        y: o.y - r.height
      };
      break;
    case "bottom":
      w = {
        x: y,
        y: o.y + o.height
      };
      break;
    case "right":
      w = {
        x: o.x + o.width,
        y: g
      };
      break;
    case "left":
      w = {
        x: o.x - r.width,
        y: g
      };
      break;
    default:
      w = {
        x: o.x,
        y: o.y
      };
  }
  switch (Ye(t)) {
    case "start":
      w[l] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      w[l] += m * (n && u ? -1 : 1);
      break;
  }
  return w;
}
const Yl = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: a = [],
    platform: l
  } = n, d = a.filter(Boolean), f = await (l.isRTL == null ? void 0 : l.isRTL(t));
  let u = await l.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: y,
    y: g
  } = xo(u, o, f), m = o, w = {}, k = 0;
  for (let S = 0; S < d.length; S++) {
    const {
      name: O,
      fn: b
    } = d[S], {
      x: T,
      y: $,
      data: E,
      reset: N
    } = await b({
      x: y,
      y: g,
      initialPlacement: o,
      placement: m,
      strategy: r,
      middlewareData: w,
      rects: u,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    y = T ?? y, g = $ ?? g, w = {
      ...w,
      [O]: {
        ...w[O],
        ...E
      }
    }, N && k <= 50 && (k++, typeof N == "object" && (N.placement && (m = N.placement), N.rects && (u = N.rects === !0 ? await l.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : N.rects), {
      x: y,
      y: g
    } = xo(u, m, f)), S = -1);
  }
  return {
    x: y,
    y: g,
    placement: m,
    strategy: r,
    middlewareData: w
  };
};
async function Un(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: a,
    rects: l,
    elements: d,
    strategy: f
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: y = "viewport",
    elementContext: g = "floating",
    altBoundary: m = !1,
    padding: w = 0
  } = Ft(t, e), k = yr(w), O = d[m ? g === "floating" ? "reference" : "floating" : g], b = cn(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(O))) == null || n ? O : O.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(d.floating)),
    boundary: u,
    rootBoundary: y,
    strategy: f
  })), T = g === "floating" ? {
    x: o,
    y: r,
    width: l.floating.width,
    height: l.floating.height
  } : l.reference, $ = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(d.floating)), E = await (a.isElement == null ? void 0 : a.isElement($)) ? await (a.getScale == null ? void 0 : a.getScale($)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, N = cn(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: d,
    rect: T,
    offsetParent: $,
    strategy: f
  }) : T);
  return {
    top: (b.top - N.top + k.top) / E.y,
    bottom: (N.bottom - b.bottom + k.bottom) / E.y,
    left: (b.left - N.left + k.left) / E.x,
    right: (N.right - b.right + k.right) / E.x
  };
}
const jl = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: a,
      platform: l,
      elements: d,
      middlewareData: f
    } = t, {
      element: u,
      padding: y = 0
    } = Ft(e, t) || {};
    if (u == null)
      return {};
    const g = yr(y), m = {
      x: n,
      y: o
    }, w = $i(r), k = Oi(w), S = await l.getDimensions(u), O = w === "y", b = O ? "top" : "left", T = O ? "bottom" : "right", $ = O ? "clientHeight" : "clientWidth", E = a.reference[k] + a.reference[w] - m[w] - a.floating[k], N = m[w] - a.reference[w], B = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(u));
    let I = B ? B[$] : 0;
    (!I || !await (l.isElement == null ? void 0 : l.isElement(B))) && (I = d.floating[$] || a.floating[k]);
    const J = E / 2 - N / 2, G = I / 2 - S[k] / 2 - 1, V = vn(g[b], G), re = vn(g[T], G), K = V, ke = I - S[k] - re, be = I / 2 - S[k] / 2 + J, Pe = mi(K, be, ke), fe = !f.arrow && Ye(r) != null && be !== Pe && a.reference[k] / 2 - (be < K ? V : re) - S[k] / 2 < 0, ne = fe ? be < K ? be - K : be - ke : 0;
    return {
      [w]: m[w] + ne,
      data: {
        [w]: Pe,
        centerOffset: be - Pe - ne,
        ...fe && {
          alignmentOffset: ne
        }
      },
      reset: fe
    };
  }
});
function Xl(e, t, n) {
  return (e ? [...n.filter((r) => Ye(r) === e), ...n.filter((r) => Ye(r) !== e)] : n.filter((r) => it(r) === r)).filter((r) => e ? Ye(r) === e || (t ? Dn(r) !== r : !1) : !0);
}
const Gl = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    async fn(t) {
      var n, o, r;
      const {
        rects: a,
        middlewareData: l,
        placement: d,
        platform: f,
        elements: u
      } = t, {
        crossAxis: y = !1,
        alignment: g,
        allowedPlacements: m = wo,
        autoAlignment: w = !0,
        ...k
      } = Ft(e, t), S = g !== void 0 || m === wo ? Xl(g || null, w, m) : m, O = await Un(t, k), b = ((n = l.autoPlacement) == null ? void 0 : n.index) || 0, T = S[b];
      if (T == null)
        return {};
      const $ = vr(T, a, await (f.isRTL == null ? void 0 : f.isRTL(u.floating)));
      if (d !== T)
        return {
          reset: {
            placement: S[0]
          }
        };
      const E = [O[it(T)], O[$[0]], O[$[1]]], N = [...((o = l.autoPlacement) == null ? void 0 : o.overflows) || [], {
        placement: T,
        overflows: E
      }], B = S[b + 1];
      if (B)
        return {
          data: {
            index: b + 1,
            overflows: N
          },
          reset: {
            placement: B
          }
        };
      const I = N.map((V) => {
        const re = Ye(V.placement);
        return [V.placement, re && y ? (
          // Check along the mainAxis and main crossAxis side.
          V.overflows.slice(0, 2).reduce((K, ke) => K + ke, 0)
        ) : (
          // Check only the mainAxis.
          V.overflows[0]
        ), V.overflows];
      }).sort((V, re) => V[1] - re[1]), G = ((r = I.filter((V) => V[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        Ye(V[0]) ? 2 : 3
      ).every((re) => re <= 0))[0]) == null ? void 0 : r[0]) || I[0][0];
      return G !== d ? {
        data: {
          index: b + 1,
          overflows: N
        },
        reset: {
          placement: G
        }
      } : {};
    }
  };
}, Kl = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: a,
        rects: l,
        initialPlacement: d,
        platform: f,
        elements: u
      } = t, {
        mainAxis: y = !0,
        crossAxis: g = !0,
        fallbackPlacements: m,
        fallbackStrategy: w = "bestFit",
        fallbackAxisSideDirection: k = "none",
        flipAlignment: S = !0,
        ...O
      } = Ft(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const b = it(r), T = $t(d), $ = it(d) === d, E = await (f.isRTL == null ? void 0 : f.isRTL(u.floating)), N = m || ($ || !S ? [Mn(d)] : Hl(d)), B = k !== "none";
      !m && B && N.push(...Vl(d, S, k, E));
      const I = [d, ...N], J = await Un(t, O), G = [];
      let V = ((o = a.flip) == null ? void 0 : o.overflows) || [];
      if (y && G.push(J[b]), g) {
        const be = vr(r, l, E);
        G.push(J[be[0]], J[be[1]]);
      }
      if (V = [...V, {
        placement: r,
        overflows: G
      }], !G.every((be) => be <= 0)) {
        var re, K;
        const be = (((re = a.flip) == null ? void 0 : re.index) || 0) + 1, Pe = I[be];
        if (Pe)
          return {
            data: {
              index: be,
              overflows: V
            },
            reset: {
              placement: Pe
            }
          };
        let fe = (K = V.filter((ne) => ne.overflows[0] <= 0).sort((ne, Ne) => ne.overflows[1] - Ne.overflows[1])[0]) == null ? void 0 : K.placement;
        if (!fe)
          switch (w) {
            case "bestFit": {
              var ke;
              const ne = (ke = V.filter((Ne) => {
                if (B) {
                  const ye = $t(Ne.placement);
                  return ye === T || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ye === "y";
                }
                return !0;
              }).map((Ne) => [Ne.placement, Ne.overflows.filter((ye) => ye > 0).reduce((ye, ot) => ye + ot, 0)]).sort((Ne, ye) => Ne[1] - ye[1])[0]) == null ? void 0 : ke[0];
              ne && (fe = ne);
              break;
            }
            case "initialPlacement":
              fe = d;
              break;
          }
        if (r !== fe)
          return {
            reset: {
              placement: fe
            }
          };
      }
      return {};
    }
  };
};
async function Jl(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, a = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), l = it(n), d = Ye(n), f = $t(n) === "y", u = ["left", "top"].includes(l) ? -1 : 1, y = a && f ? -1 : 1, g = Ft(t, e);
  let {
    mainAxis: m,
    crossAxis: w,
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
  return d && typeof k == "number" && (w = d === "end" ? k * -1 : k), f ? {
    x: w * y,
    y: m * u
  } : {
    x: m * u,
    y: w * y
  };
}
const Zl = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: a,
        placement: l,
        middlewareData: d
      } = t, f = await Jl(t, e);
      return l === ((n = d.offset) == null ? void 0 : n.placement) && (o = d.arrow) != null && o.alignmentOffset ? {} : {
        x: r + f.x,
        y: a + f.y,
        data: {
          ...f,
          placement: l
        }
      };
    }
  };
}, Ql = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r
      } = t, {
        mainAxis: a = !0,
        crossAxis: l = !1,
        limiter: d = {
          fn: (O) => {
            let {
              x: b,
              y: T
            } = O;
            return {
              x: b,
              y: T
            };
          }
        },
        ...f
      } = Ft(e, t), u = {
        x: n,
        y: o
      }, y = await Un(t, f), g = $t(it(r)), m = gr(g);
      let w = u[m], k = u[g];
      if (a) {
        const O = m === "y" ? "top" : "left", b = m === "y" ? "bottom" : "right", T = w + y[O], $ = w - y[b];
        w = mi(T, w, $);
      }
      if (l) {
        const O = g === "y" ? "top" : "left", b = g === "y" ? "bottom" : "right", T = k + y[O], $ = k - y[b];
        k = mi(T, k, $);
      }
      const S = d.fn({
        ...t,
        [m]: w,
        [g]: k
      });
      return {
        ...S,
        data: {
          x: S.x - n,
          y: S.y - o,
          enabled: {
            [m]: a,
            [g]: l
          }
        }
      };
    }
  };
}, ec = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: a,
        platform: l,
        elements: d
      } = t, {
        apply: f = () => {
        },
        ...u
      } = Ft(e, t), y = await Un(t, u), g = it(r), m = Ye(r), w = $t(r) === "y", {
        width: k,
        height: S
      } = a.floating;
      let O, b;
      g === "top" || g === "bottom" ? (O = g, b = m === (await (l.isRTL == null ? void 0 : l.isRTL(d.floating)) ? "start" : "end") ? "left" : "right") : (b = g, O = m === "end" ? "top" : "bottom");
      const T = S - y.top - y.bottom, $ = k - y.left - y.right, E = vn(S - y[O], T), N = vn(k - y[b], $), B = !t.middlewareData.shift;
      let I = E, J = N;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (J = $), (o = t.middlewareData.shift) != null && o.enabled.y && (I = T), B && !m) {
        const V = Ct(y.left, 0), re = Ct(y.right, 0), K = Ct(y.top, 0), ke = Ct(y.bottom, 0);
        w ? J = k - 2 * (V !== 0 || re !== 0 ? V + re : Ct(y.left, y.right)) : I = S - 2 * (K !== 0 || ke !== 0 ? K + ke : Ct(y.top, y.bottom));
      }
      await f({
        ...t,
        availableWidth: J,
        availableHeight: I
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
function We(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function et(e) {
  return We(e).getComputedStyle(e);
}
const ko = Math.min, un = Math.max, Fn = Math.round;
function _r(e) {
  const t = et(e);
  let n = parseFloat(t.width), o = parseFloat(t.height);
  const r = e.offsetWidth, a = e.offsetHeight, l = Fn(n) !== r || Fn(o) !== a;
  return l && (n = r, o = a), { width: n, height: o, fallback: l };
}
function wt(e) {
  return wr(e) ? (e.nodeName || "").toLowerCase() : "";
}
let An;
function br() {
  if (An) return An;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (An = e.brands.map((t) => t.brand + "/" + t.version).join(" "), An) : navigator.userAgent;
}
function tt(e) {
  return e instanceof We(e).HTMLElement;
}
function _t(e) {
  return e instanceof We(e).Element;
}
function wr(e) {
  return e instanceof We(e).Node;
}
function To(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof We(e).ShadowRoot || e instanceof ShadowRoot;
}
function Yn(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = et(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !["inline", "contents"].includes(r);
}
function tc(e) {
  return ["table", "td", "th"].includes(wt(e));
}
function pi(e) {
  const t = /firefox/i.test(br()), n = et(e), o = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!o && o !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some((r) => n.willChange.includes(r)) || ["paint", "layout", "strict", "content"].some((r) => {
    const a = n.contain;
    return a != null && a.includes(r);
  });
}
function xr() {
  return !/^((?!chrome|android).)*safari/i.test(br());
}
function Ii(e) {
  return ["html", "body", "#document"].includes(wt(e));
}
function kr(e) {
  return _t(e) ? e : e.contextElement;
}
const Tr = { x: 1, y: 1 };
function jt(e) {
  const t = kr(e);
  if (!tt(t)) return Tr;
  const n = t.getBoundingClientRect(), { width: o, height: r, fallback: a } = _r(t);
  let l = (a ? Fn(n.width) : n.width) / o, d = (a ? Fn(n.height) : n.height) / r;
  return l && Number.isFinite(l) || (l = 1), d && Number.isFinite(d) || (d = 1), { x: l, y: d };
}
function yn(e, t, n, o) {
  var r, a;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const l = e.getBoundingClientRect(), d = kr(e);
  let f = Tr;
  t && (o ? _t(o) && (f = jt(o)) : f = jt(e));
  const u = d ? We(d) : window, y = !xr() && n;
  let g = (l.left + (y && ((r = u.visualViewport) == null ? void 0 : r.offsetLeft) || 0)) / f.x, m = (l.top + (y && ((a = u.visualViewport) == null ? void 0 : a.offsetTop) || 0)) / f.y, w = l.width / f.x, k = l.height / f.y;
  if (d) {
    const S = We(d), O = o && _t(o) ? We(o) : o;
    let b = S.frameElement;
    for (; b && o && O !== S; ) {
      const T = jt(b), $ = b.getBoundingClientRect(), E = getComputedStyle(b);
      $.x += (b.clientLeft + parseFloat(E.paddingLeft)) * T.x, $.y += (b.clientTop + parseFloat(E.paddingTop)) * T.y, g *= T.x, m *= T.y, w *= T.x, k *= T.y, g += $.x, m += $.y, b = We(b).frameElement;
    }
  }
  return { width: w, height: k, top: m, right: g + w, bottom: m + k, left: g, x: g, y: m };
}
function bt(e) {
  return ((wr(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function jn(e) {
  return _t(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Sr(e) {
  return yn(bt(e)).left + jn(e).scrollLeft;
}
function _n(e) {
  if (wt(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || To(e) && e.host || bt(e);
  return To(t) ? t.host : t;
}
function Er(e) {
  const t = _n(e);
  return Ii(t) ? t.ownerDocument.body : tt(t) && Yn(t) ? t : Er(t);
}
function Bn(e, t) {
  var n;
  t === void 0 && (t = []);
  const o = Er(e), r = o === ((n = e.ownerDocument) == null ? void 0 : n.body), a = We(o);
  return r ? t.concat(a, a.visualViewport || [], Yn(o) ? o : []) : t.concat(o, Bn(o));
}
function So(e, t, n) {
  return t === "viewport" ? cn(function(o, r) {
    const a = We(o), l = bt(o), d = a.visualViewport;
    let f = l.clientWidth, u = l.clientHeight, y = 0, g = 0;
    if (d) {
      f = d.width, u = d.height;
      const m = xr();
      (m || !m && r === "fixed") && (y = d.offsetLeft, g = d.offsetTop);
    }
    return { width: f, height: u, x: y, y: g };
  }(e, n)) : _t(t) ? cn(function(o, r) {
    const a = yn(o, !0, r === "fixed"), l = a.top + o.clientTop, d = a.left + o.clientLeft, f = tt(o) ? jt(o) : { x: 1, y: 1 };
    return { width: o.clientWidth * f.x, height: o.clientHeight * f.y, x: d * f.x, y: l * f.y };
  }(t, n)) : cn(function(o) {
    const r = bt(o), a = jn(o), l = o.ownerDocument.body, d = un(r.scrollWidth, r.clientWidth, l.scrollWidth, l.clientWidth), f = un(r.scrollHeight, r.clientHeight, l.scrollHeight, l.clientHeight);
    let u = -a.scrollLeft + Sr(o);
    const y = -a.scrollTop;
    return et(l).direction === "rtl" && (u += un(r.clientWidth, l.clientWidth) - d), { width: d, height: f, x: u, y };
  }(bt(e)));
}
function Eo(e) {
  return tt(e) && et(e).position !== "fixed" ? e.offsetParent : null;
}
function Co(e) {
  const t = We(e);
  let n = Eo(e);
  for (; n && tc(n) && et(n).position === "static"; ) n = Eo(n);
  return n && (wt(n) === "html" || wt(n) === "body" && et(n).position === "static" && !pi(n)) ? t : n || function(o) {
    let r = _n(o);
    for (; tt(r) && !Ii(r); ) {
      if (pi(r)) return r;
      r = _n(r);
    }
    return null;
  }(e) || t;
}
function nc(e, t, n) {
  const o = tt(t), r = bt(t), a = yn(e, !0, n === "fixed", t);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const d = { x: 0, y: 0 };
  if (o || !o && n !== "fixed") if ((wt(t) !== "body" || Yn(r)) && (l = jn(t)), tt(t)) {
    const f = yn(t, !0);
    d.x = f.x + t.clientLeft, d.y = f.y + t.clientTop;
  } else r && (d.x = Sr(r));
  return { x: a.left + l.scrollLeft - d.x, y: a.top + l.scrollTop - d.y, width: a.width, height: a.height };
}
const ic = { getClippingRect: function(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e;
  const a = n === "clippingAncestors" ? function(u, y) {
    const g = y.get(u);
    if (g) return g;
    let m = Bn(u).filter((O) => _t(O) && wt(O) !== "body"), w = null;
    const k = et(u).position === "fixed";
    let S = k ? _n(u) : u;
    for (; _t(S) && !Ii(S); ) {
      const O = et(S), b = pi(S);
      (k ? b || w : b || O.position !== "static" || !w || !["absolute", "fixed"].includes(w.position)) ? w = O : m = m.filter((T) => T !== S), S = _n(S);
    }
    return y.set(u, m), m;
  }(t, this._c) : [].concat(n), l = [...a, o], d = l[0], f = l.reduce((u, y) => {
    const g = So(t, y, r);
    return u.top = un(g.top, u.top), u.right = ko(g.right, u.right), u.bottom = ko(g.bottom, u.bottom), u.left = un(g.left, u.left), u;
  }, So(t, d, r));
  return { width: f.right - f.left, height: f.bottom - f.top, x: f.left, y: f.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: n, strategy: o } = e;
  const r = tt(n), a = bt(n);
  if (n === a) return t;
  let l = { scrollLeft: 0, scrollTop: 0 }, d = { x: 1, y: 1 };
  const f = { x: 0, y: 0 };
  if ((r || !r && o !== "fixed") && ((wt(n) !== "body" || Yn(a)) && (l = jn(n)), tt(n))) {
    const u = yn(n);
    d = jt(n), f.x = u.x + n.clientLeft, f.y = u.y + n.clientTop;
  }
  return { width: t.width * d.x, height: t.height * d.y, x: t.x * d.x - l.scrollLeft * d.x + f.x, y: t.y * d.y - l.scrollTop * d.y + f.y };
}, isElement: _t, getDimensions: function(e) {
  return tt(e) ? _r(e) : e.getBoundingClientRect();
}, getOffsetParent: Co, getDocumentElement: bt, getScale: jt, async getElementRects(e) {
  let { reference: t, floating: n, strategy: o } = e;
  const r = this.getOffsetParent || Co, a = this.getDimensions;
  return { reference: nc(t, await r(n), o), floating: { x: 0, y: 0, ...await a(n) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => et(e).direction === "rtl" }, oc = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = { platform: ic, ...n }, a = { ...r.platform, _c: o };
  return Yl(e, t, { ...r, platform: a });
}, Lt = {
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
function gi(e, t) {
  let n = Lt.themes[e] || {}, o;
  do
    o = n[t], typeof o > "u" ? n.$extend ? n = Lt.themes[n.$extend] || {} : (n = null, o = Lt[t]) : n = null;
  while (n);
  return o;
}
function rc(e) {
  const t = [e];
  let n = Lt.themes[e] || {};
  do
    n.$extend && !n.$resetCss ? (t.push(n.$extend), n = Lt.themes[n.$extend] || {}) : n = null;
  while (n);
  return t.map((o) => `v-popper--theme-${o}`);
}
function Ao(e) {
  const t = [e];
  let n = Lt.themes[e] || {};
  do
    n.$extend ? (t.push(n.$extend), n = Lt.themes[n.$extend] || {}) : n = null;
  while (n);
  return t;
}
let bn = !1;
if (typeof window < "u") {
  bn = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        bn = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let Cr = !1;
typeof window < "u" && typeof navigator < "u" && (Cr = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const sc = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), Po = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, Lo = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function Oo(e, t) {
  const n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}
function Qn() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const Ve = [];
let Et = null;
const $o = {};
function Io(e) {
  let t = $o[e];
  return t || (t = $o[e] = []), t;
}
let vi = function() {
};
typeof window < "u" && (vi = window.Element);
function ie(e) {
  return function(t) {
    return gi(t.theme, e);
  };
}
const ei = "__floating-vue__popper", Ar = () => Nt({
  name: "VPopper",
  provide() {
    return {
      [ei]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [ei]: { default: null }
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
      default: ie("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: ie("positioningDisabled")
    },
    placement: {
      type: String,
      default: ie("placement"),
      validator: (e) => sc.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: ie("delay")
    },
    distance: {
      type: [Number, String],
      default: ie("distance")
    },
    skidding: {
      type: [Number, String],
      default: ie("skidding")
    },
    triggers: {
      type: Array,
      default: ie("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: ie("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: ie("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: ie("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: ie("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: ie("popperHideTriggers")
    },
    container: {
      type: [String, Object, vi, Boolean],
      default: ie("container")
    },
    boundary: {
      type: [String, vi],
      default: ie("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: ie("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: ie("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: ie("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: ie("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: ie("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: ie("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: ie("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: ie("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: ie("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: ie("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: ie("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: ie("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: ie("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: ie("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: ie("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: ie("flip")
    },
    shift: {
      type: Boolean,
      default: ie("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: ie("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: ie("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: ie("disposeTimeout")
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
      return (e = this[ei]) == null ? void 0 : e.parentPopper;
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
      (this.distance || this.skidding) && e.middleware.push(Zl({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(Gl({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(Ql({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(Kl({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(jl({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: o, rects: r, middlewareData: a }) => {
          let l;
          const { centerOffset: d } = a.arrow;
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
          fn: ({ rects: r, placement: a, middlewareData: l }) => {
            var d;
            if ((d = l.autoSize) != null && d.skip)
              return {};
            let f, u;
            return a.startsWith("top") || a.startsWith("bottom") ? f = r.reference.width : u = r.reference.height, this.$_innerNode.style[o === "min" ? "minWidth" : o === "max" ? "maxWidth" : "width"] = f != null ? `${f}px` : null, this.$_innerNode.style[o === "min" ? "minHeight" : o === "max" ? "maxHeight" : "height"] = u != null ? `${u}px` : null, {
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
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(ec({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: o, availableHeight: r }) => {
          this.$_innerNode.style.maxWidth = o != null ? `${o}px` : null, this.$_innerNode.style.maxHeight = r != null ? `${r}px` : null;
        }
      })));
      const n = await oc(this.$_referenceNode, this.$_popperNode, e);
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
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), Et && this.instantMove && Et.instantMove && Et !== this.parentPopper) {
        Et.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (Et = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await Qn(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...Bn(this.$_referenceNode),
        ...Bn(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), n = this.$_popperNode.querySelector(".v-popper__wrapper"), o = n.parentNode.getBoundingClientRect(), r = t.x + t.width / 2 - (o.left + n.offsetLeft), a = t.y + t.height / 2 - (o.top + n.offsetTop);
        this.result.transformOrigin = `${r}px ${a}px`;
      }
      this.isShown = !0, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let n = 0; n < Ve.length; n++)
          t = Ve[n], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      Ve.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of Ao(this.theme))
        Io(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await Qn(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, Oo(Ve, this), Ve.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const n of Ao(this.theme)) {
        const o = Io(n);
        Oo(o, this), o.length === 0 && document.body.classList.remove(`v-popper--some-open--${n}`);
      }
      Et === this && (Et = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await Qn(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
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
      this.$_registerTriggerListeners(this.$_targetNodes, Po, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], Po, this.popperTriggers, this.popperShowTriggers, e);
      const t = (n) => {
        n.usedByTooltip || this.hide({ event: n });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, Lo, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], Lo, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, n) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: n }), e.forEach((o) => o.addEventListener(t, n, bn ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(e, t, n, o, r) {
      let a = n;
      o != null && (a = typeof o == "function" ? o(a) : o), a.forEach((l) => {
        const d = t[l];
        d && this.$_registerEventListeners(e, d, r);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((n) => {
        const { targetNodes: o, eventType: r, handler: a } = n;
        !e || e === r ? o.forEach((l) => l.removeEventListener(r, a)) : t.push(n);
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
      if (dn >= e.left && dn <= e.right && fn >= e.top && fn <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), n = dn - vt, o = fn - yt, r = t.left + t.width / 2 - vt + (t.top + t.height / 2) - yt + t.width + t.height, a = vt + n * r, l = yt + o * r;
        return Pn(vt, yt, a, l, t.left, t.top, t.left, t.bottom) || // Left edge
        Pn(vt, yt, a, l, t.left, t.top, t.right, t.top) || // Top edge
        Pn(vt, yt, a, l, t.right, t.top, t.right, t.bottom) || // Right edge
        Pn(vt, yt, a, l, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (Cr) {
    const e = bn ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => No(t), e), document.addEventListener("touchend", (t) => Ro(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => No(e), !0), window.addEventListener("click", (e) => Ro(e, !1), !0);
  window.addEventListener("resize", cc);
}
function No(e, t) {
  for (let n = 0; n < Ve.length; n++) {
    const o = Ve[n];
    try {
      o.mouseDownContains = o.popperNode().contains(e.target);
    } catch {
    }
  }
}
function Ro(e, t) {
  ac(e, t);
}
function ac(e, t) {
  const n = {};
  for (let o = Ve.length - 1; o >= 0; o--) {
    const r = Ve[o];
    try {
      const a = r.containsGlobalTarget = r.mouseDownContains || r.popperNode().contains(e.target);
      r.pendingHide = !1, requestAnimationFrame(() => {
        if (r.pendingHide = !1, !n[r.randomId] && Do(r, a, e)) {
          if (r.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && a) {
            let d = r.parentPopper;
            for (; d; )
              n[d.randomId] = !0, d = d.parentPopper;
            return;
          }
          let l = r.parentPopper;
          for (; l && Do(l, l.containsGlobalTarget, e); )
            l.$_handleGlobalClose(e, t), l = l.parentPopper;
        }
      });
    } catch {
    }
  }
}
function Do(e, t, n) {
  return n.closeAllPopover || n.closePopover && t || lc(e, n) && !t;
}
function lc(e, t) {
  if (typeof e.autoHide == "function") {
    const n = e.autoHide(t);
    return e.lastAutoHide = n, n;
  }
  return e.autoHide;
}
function cc() {
  for (let e = 0; e < Ve.length; e++)
    Ve[e].$_computePosition();
}
let vt = 0, yt = 0, dn = 0, fn = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  vt = dn, yt = fn, dn = e.clientX, fn = e.clientY;
}, bn ? {
  passive: !0
} : void 0);
function Pn(e, t, n, o, r, a, l, d) {
  const f = ((l - r) * (t - a) - (d - a) * (e - r)) / ((d - a) * (n - e) - (l - r) * (o - t)), u = ((n - e) * (t - a) - (o - t) * (e - r)) / ((d - a) * (n - e) - (l - r) * (o - t));
  return f >= 0 && f <= 1 && u >= 0 && u <= 1;
}
const uc = {
  extends: Ar()
}, Ni = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
};
function dc(e, t, n, o, r, a) {
  return P(), D("div", {
    ref: "reference",
    class: Je(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    ge(e.$slots, "default", Gr(Kr(e.slotData)))
  ], 2);
}
const fc = /* @__PURE__ */ Ni(uc, [["render", dc]]);
function hc() {
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
let In;
function yi() {
  yi.init || (yi.init = !0, In = hc() !== -1);
}
var Xn = {
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
    yi(), Xr(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", In && this.$el.appendChild(e), e.data = "about:blank", In || this.$el.appendChild(e);
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
      this._resizeObject && this._resizeObject.onload && (!In && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const mc = /* @__PURE__ */ Jr("data-v-b329ee4c");
Yr("data-v-b329ee4c");
const pc = {
  class: "resize-observer",
  tabindex: "-1"
};
jr();
const gc = /* @__PURE__ */ mc((e, t, n, o, r, a) => (P(), ae("div", pc)));
Xn.render = gc;
Xn.__scopeId = "data-v-b329ee4c";
Xn.__file = "src/components/ResizeObserver.vue";
const Pr = (e = "theme") => ({
  computed: {
    themeClass() {
      return rc(this[e]);
    }
  }
}), vc = Nt({
  name: "VPopperContent",
  components: {
    ResizeObserver: Xn
  },
  mixins: [
    Pr()
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
}), yc = ["id", "aria-hidden", "tabindex", "data-popper-placement"], _c = {
  ref: "inner",
  class: "v-popper__inner"
}, bc = /* @__PURE__ */ x("div", { class: "v-popper__arrow-outer" }, null, -1), wc = /* @__PURE__ */ x("div", { class: "v-popper__arrow-inner" }, null, -1), xc = [
  bc,
  wc
];
function kc(e, t, n, o, r, a) {
  const l = ti("ResizeObserver");
  return P(), D("div", {
    id: e.popperId,
    ref: "popover",
    class: Je(["v-popper__popper", [
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
    style: Pt(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = Zr((d) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    x("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (d) => e.autoHide && e.$emit("hide"))
    }),
    x("div", {
      class: "v-popper__wrapper",
      style: Pt(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      x("div", _c, [
        e.mounted ? (P(), D(ue, { key: 0 }, [
          x("div", null, [
            ge(e.$slots, "default")
          ]),
          e.handleResize ? (P(), ae(l, {
            key: 0,
            onNotify: t[1] || (t[1] = (d) => e.$emit("resize", d))
          })) : me("", !0)
        ], 64)) : me("", !0)
      ], 512),
      x("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: Pt(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, xc, 4)
    ], 4)
  ], 46, yc);
}
const Lr = /* @__PURE__ */ Ni(vc, [["render", kc]]), Or = {
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
let _i = function() {
};
typeof window < "u" && (_i = window.Element);
const Tc = Nt({
  name: "VPopperWrapper",
  components: {
    Popper: fc,
    PopperContent: Lr
  },
  mixins: [
    Or,
    Pr("finalTheme")
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
      type: [String, Object, _i, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, _i],
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
function Sc(e, t, n, o, r, a) {
  const l = ti("PopperContent"), d = ti("Popper");
  return P(), ae(d, wi({ ref: "popper" }, e.$props, {
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
    default: z(({
      popperId: f,
      isShown: u,
      shouldMountContent: y,
      skipTransition: g,
      autoHide: m,
      show: w,
      hide: k,
      handleResize: S,
      onResize: O,
      classes: b,
      result: T
    }) => [
      ge(e.$slots, "default", {
        shown: u,
        show: w,
        hide: k
      }),
      M(l, {
        ref: "popperContent",
        "popper-id": f,
        theme: e.finalTheme,
        shown: u,
        mounted: y,
        "skip-transition": g,
        "auto-hide": m,
        "handle-resize": S,
        classes: b,
        result: T,
        onHide: k,
        onResize: O
      }, {
        default: z(() => [
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
const Ri = /* @__PURE__ */ Ni(Tc, [["render", Sc]]);
({
  ...Ri
});
({
  ...Ri
});
const Ec = {
  ...Ri,
  name: "VTooltip",
  vPopperTheme: "tooltip"
};
Nt({
  name: "VTooltipDirective",
  components: {
    Popper: Ar(),
    PopperContent: Lr
  },
  mixins: [
    Or
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => gi(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => gi(e.theme, "loadingContent")
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
const Cc = Ec, bi = {
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
    return (t, n) => (P(), ae(U(Cc), wi({
      disabled: e.disabled,
      placement: e.placement,
      container: !1
    }, t.$attrs), {
      popper: z(() => [
        ge(t.$slots, "popper")
      ]),
      default: z(() => [
        ge(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["disabled", "placement"]));
  }
};
function Ac(e = 0, t = "USD") {
  return new Intl.NumberFormat(window.navigator.language, {
    style: "currency",
    currency: t
  }).formatToParts(e);
}
function Pc(e = 0, t = "USD", n = "", o = !0) {
  const r = Ac(e, t);
  let a = "";
  return r.forEach((l) => {
    l.type === "currency" && (a += `<span class="${n}">${l.value}</span>`), l.type === "literal" && (a += `${l.value}`), l.type === "integer" && (a += `${l.value}`), o && l.type === "decimal" && (a += `${l.value}`), o && l.type === "fraction" && (a += `${l.value}`);
  }), a;
}
const Lc = { class: "price-block" }, Oc = {
  key: 0,
  class: "price-block__discount"
}, $c = { class: "price-block__discount-size" }, Ic = { class: "price-block__old" }, Nc = ["innerHTML"], Rc = { class: "price-block__amount" }, Dc = { class: "price-block__icons" }, Mc = {
  key: 0,
  class: "price-block__current"
}, Fc = ["innerHTML"], Bc = { key: 1 }, qc = {
  key: 2,
  class: "price-block__details"
}, zc = { class: "price-block__schedule" }, Hc = {
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
    const t = e, { t: n } = Oe(), o = Te(() => a(t.originalSellingPrice, "currency")), r = Te(() => a(t.sellingPrice, "price-block__current-currency")), a = (l, d = "", f = !0) => Pc(l, t.currency, d, f);
    return (l, d) => (P(), D("div", Lc, [
      e.discount ? (P(), D("div", Oc, [
        x("span", $c, [
          x("span", null, "-" + F(e.discount), 1),
          d[0] || (d[0] = x("span", { class: "price-block__percent" }, "%", -1))
        ]),
        x("span", Ic, [
          x("span", {
            class: "amount",
            innerHTML: o.value
          }, null, 8, Nc)
        ])
      ])) : me("", !0),
      x("div", Rc, [
        x("div", Dc, [
          ge(l.$slots, "icons")
        ]),
        e.sellingPrice ? (P(), D("span", Mc, [
          x("span", {
            class: "price-block__current-amount",
            innerHTML: r.value
          }, null, 8, Fc)
        ])) : e.sellingPrice === 0 ? (P(), D("span", Bc, F(U(n)("price.free")), 1)) : me("", !0),
        e.sellingPrice && e.details ? (P(), D("div", qc)) : me("", !0)
      ]),
      x("div", zc, [
        ge(l.$slots, "schedule")
      ])
    ]));
  }
}, Wc = { class: "variant-line" }, Vc = { class: "variant-line__content" }, Uc = { class: "variant-line__actions" }, Yc = { class: "variant-line__footer" }, jc = {
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
    return (t, n) => (P(), D("div", Wc, [
      x("div", Vc, [
        M(Hc, {
          "selling-price": e.price.sellingPrice,
          "original-selling-price": e.price.originalSellingPrice,
          discount: e.price.discount || null,
          currency: e.price.currency
        }, {
          icons: z(() => [
            ge(t.$slots, "icons")
          ]),
          _: 3
        }, 8, ["selling-price", "original-selling-price", "discount", "currency"]),
        x("div", Uc, [
          ge(t.$slots, "default")
        ])
      ]),
      x("div", Yc, [
        ge(t.$slots, "action")
      ])
    ]));
  }
};
function $r() {
  const { t: e } = Oe();
  function t(n) {
    return n.map((o) => o.map((r) => {
      const a = Xc(r.text);
      return e(a, r.params || {});
    }).join(""));
  }
  return { formatDescription: t };
}
function Xc(e) {
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
const Gc = (e) => e.toLowerCase().replace(/_([a-z])/g, (t, n) => n.toUpperCase()), Kc = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Jc(e, t) {
  return P(), D("svg", Kc, t[0] || (t[0] = [
    x("path", { d: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z" }, null, -1)
  ]));
}
const Zc = { render: Jc }, Qc = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function eu(e, t) {
  return P(), D("svg", Qc, t[0] || (t[0] = [
    x("path", { d: "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56z" }, null, -1)
  ]));
}
const tu = { render: eu }, nu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function iu(e, t) {
  return P(), D("svg", nu, t[0] || (t[0] = [
    x("path", { d: "M382-240 154-468l57-57 171 171 367-367 57 57z" }, null, -1)
  ]));
}
const ou = { render: iu }, ru = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function su(e, t) {
  return P(), D("svg", ru, t[0] || (t[0] = [
    x("path", { d: "m424-296 282-282-56-56-226 226-114-114-56 56zm56 216q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const au = { render: su }, lu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function cu(e, t) {
  return P(), D("svg", lu, t[0] || (t[0] = [
    x("path", { d: "M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720m-720 80h640v-80H160zm0 160v240h640v-240zm0 240v-480z" }, null, -1)
  ]));
}
const uu = { render: cu }, du = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function fu(e, t) {
  return P(), D("svg", du, t[0] || (t[0] = [
    x("path", { d: "M320-400q-17 0-28.5-11.5T280-440t11.5-28.5T320-480t28.5 11.5T360-440t-11.5 28.5T320-400m160 0q-17 0-28.5-11.5T440-440t11.5-28.5T480-480t28.5 11.5T520-440t-11.5 28.5T480-400m160 0q-17 0-28.5-11.5T600-440t11.5-28.5T640-480t28.5 11.5T680-440t-11.5 28.5T640-400M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80zm0-80h560v-400H200zm0-480h560v-80H200zm0 0v-80z" }, null, -1)
  ]));
}
const hu = { render: fu }, mu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function pu(e, t) {
  return P(), D("svg", mu, t[0] || (t[0] = [
    x("path", { d: "M480-344 240-584l56-56 184 184 184-184 56 56z" }, null, -1)
  ]));
}
const gu = { render: pu }, vu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function yu(e, t) {
  return P(), D("svg", vu, t[0] || (t[0] = [
    x("path", { d: "M480-528 296-344l-56-56 240-240 240 240-56 56z" }, null, -1)
  ]));
}
const _u = { render: yu }, bu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function wu(e, t) {
  return P(), D("svg", bu, t[0] || (t[0] = [
    x("path", { d: "M440-280h80v-240h-80zm40-320q17 0 28.5-11.5T520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600m0 520q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const xu = { render: wu }, ku = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Tu(e, t) {
  return P(), D("svg", ku, t[0] || (t[0] = [
    x("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const Su = { render: Tu }, Eu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Cu(e, t) {
  return P(), D("svg", Eu, t[0] || (t[0] = [
    x("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112z" }, null, -1)
  ]));
}
const Au = { render: Cu }, Pu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Lu(e, t) {
  return P(), D("svg", Pu, t[0] || (t[0] = [
    x("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320" }, null, -1)
  ]));
}
const Ou = { render: Lu }, $u = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Iu(e, t) {
  return P(), D("svg", $u, t[0] || (t[0] = [
    x("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const Nu = { render: Iu }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Du(e, t) {
  return P(), D("svg", Ru, t[0] || (t[0] = [
    x("path", { d: "M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800z" }, null, -1)
  ]));
}
const Mu = { render: Du }, Fu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Bu(e, t) {
  return P(), D("svg", Fu, t[0] || (t[0] = [
    x("path", { d: "M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480t-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77 77 114T840-480t-28.5 140.5-77 114-114 77T480-120m112-192L440-464v-216h80v184l128 128z" }, null, -1)
  ]));
}
const qu = { render: Bu }, zu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Hu(e, t) {
  return P(), D("svg", zu, t[0] || (t[0] = [
    x("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm320-280 320-200v-80L480-520 160-720v80z" }, null, -1)
  ]));
}
const Wu = { render: Hu }, Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Uu(e, t) {
  return P(), D("svg", Vu, t[0] || (t[0] = [
    x("path", { d: "M160-120v-480l320-240 320 240v480H560v-280H400v280z" }, null, -1)
  ]));
}
const Yu = { render: Uu }, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Xu(e, t) {
  return P(), D("svg", ju, t[0] || (t[0] = [
    x("path", { d: "M120-120v-560h240v-80l120-120 120 120v240h240v400zm80-80h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 320h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 480h80v-80h-80zm0-160h80v-80h-80z" }, null, -1)
  ]));
}
const Gu = { render: Xu }, Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Ju(e, t) {
  return P(), D("svg", Ku, t[0] || (t[0] = [
    x("path", { d: "M798-120q-125 0-247-54.5T329-329 174.5-551 120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12" }, null, -1)
  ]));
}
const Zu = { render: Ju }, Qu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Add: Zc,
  ArrowForward: tu,
  Check: ou,
  CheckCycle: au,
  CreditCard: uu,
  DateRange: hu,
  Email: Wu,
  ExpandLess: gu,
  ExpandMore: _u,
  Home: Yu,
  Hotel: Gu,
  Info: xu,
  People: Su,
  Person: Au,
  PersonOutline: Ou,
  Persons: Nu,
  Phone: Zu,
  Restaurant: Mu,
  Restore: qu
}, Symbol.toStringTag, { value: "Module" })), Le = {
  __name: "BflexIcon",
  props: {
    name: { type: String, required: !0 },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, n = Te(() => Qu[t.name] || null);
    return (o, r) => (P(), ae(Qr(n.value), wi(o.$attrs, {
      class: ["icon", e.small ? "icon--small" : ""]
    }), null, 16, ["class"]));
  }
}, ed = {
  key: 0,
  class: "icons"
}, td = {
  key: 1,
  class: "scenario-text"
}, nd = ["title"], id = {
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
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const { t } = Oe();
    return (n, o) => e.kind === "adults" ? (P(), D("div", ed, [
      Ze(M(Le, {
        title: U(t)("ratePlan.scenario.mainBeds"),
        name: "Person"
      }, null, 8, ["title"]), [
        [ni, e.main === 2]
      ]),
      Ze(x("i", null, [
        M(Le, {
          name: "Person",
          title: U(t)("ratePlan.scenario.mainBeds")
        }, null, 8, ["title"]),
        oe(F(e.main), 1)
      ], 512), [
        [ni, e.main > 2]
      ]),
      M(Le, {
        name: "Person",
        title: U(t)("ratePlan.scenario.mainBeds")
      }, null, 8, ["title"]),
      e.extraBed ? (P(), D(ue, { key: 0 }, [
        M(Le, { name: "Add" }, {
          default: z(() => o[0] || (o[0] = [
            oe("add")
          ])),
          _: 1
        }),
        M(Le, {
          name: "PersonOutline",
          title: U(t)("ratePlan.scenario.extraBeds")
        }, null, 8, ["title"])
      ], 64)) : me("", !0)
    ])) : e.kind === "child" ? (P(), D("span", td, F(U(t)("ratePlan.scenario.family")), 1)) : (P(), D("div", {
      key: 2,
      class: "icons",
      title: U(t)("ratePlan.scenario.mainExtraBeds")
    }, [
      M(Le, { name: "People" }),
      M(Le, { name: "Add" }),
      M(Le, { name: "PeopleOutline" })
    ], 8, nd));
  }
}, od = { class: "cycle-loader" }, rd = {
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
    const t = e, { color: n, size: o, margin: r, radius: a } = es(t), l = Te(() => ({
      backgroundColor: n.value,
      width: o.value,
      height: o.value,
      margin: r.value,
      borderRadius: a.value,
      display: "inline-block",
      animationName: "v-pulseStretchDelay",
      animationDuration: "0.75s",
      animationIterationCount: "infinite",
      animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
      animationFillMode: "both"
    })), d = Te(() => ({ animationDelay: "0.12s" })), f = Te(() => ({ animationDelay: "0.24s" })), u = Te(() => ({ animationDelay: "0.36s" }));
    return (y, g) => (P(), D("div", od, [
      x("div", {
        style: Pt([l.value, d.value])
      }, null, 4),
      x("div", {
        style: Pt([l.value, f.value])
      }, null, 4),
      x("div", {
        style: Pt([l.value, u.value])
      }, null, 4)
    ]));
  }
}, sd = ["disabled"], ad = {
  __name: "BflexButton",
  props: {
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => (P(), D("button", {
      class: "button",
      disabled: e.disabled
    }, [
      e.loading ? (P(), ae(rd, {
        key: 0,
        size: "10px",
        color: "#fff"
      })) : ge(t.$slots, "default", { key: 1 })
    ], 8, sd));
  }
}, ld = { class: "rate-plan-card" }, cd = { class: "rate-plan-card__wrapper" }, ud = { class: "rate-plan-card__description" }, dd = { class: "rate-plan-card__offers" }, fd = { class: "rate-plan-card__offers-item" }, hd = ["title"], md = { class: "rate-plan-card__offers-item" }, pd = { style: { "margin-right": "0.375rem" } }, gd = {
  key: 0,
  style: { margin: "0 0.375rem" }
}, vd = { class: "rate-plan-card__actions" }, yd = { class: "rate-plan-card__variants" }, _d = { class: "length-of-stay" }, bd = {
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
     *       extraBed: boolean
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
    const n = e, { t: o } = Oe(), r = ve(!1), a = ve({}), l = Te(() => {
      var y;
      return ((y = n.data.feed) == null ? void 0 : y.name) !== "ROOM_ONLY";
    }), d = t, f = (y, g) => {
      a.value[g] || (a.value[g] = !0, d("variant-chosen", y));
    }, { formatDescription: u } = $r();
    return (y, g) => (P(), D("div", ld, [
      x("div", cd, [
        x("div", ud, [
          x("h2", {
            onClick: g[0] || (g[0] = (m) => r.value = !r.value),
            class: "rate-plan-card__title cursor-pointer"
          }, [
            oe(F(e.data.name) + " ", 1),
            M(Le, {
              name: r.value ? "ExpandLess" : "ExpandMore"
            }, null, 8, ["name"])
          ]),
          Ze(x("blockquote", null, F(e.data.description), 513), [
            [ni, r.value]
          ]),
          x("div", dd, [
            x("div", fd, [
              M(Le, { name: "Restore" }),
              M(bi, { class: "inline" }, {
                popper: z(() => [
                  (P(!0), D(ue, null, Ae(U(u)(e.data.cancellationPolicy.consequences), (m, w) => (P(), D("p", { key: w }, F(m), 1))), 128))
                ]),
                default: z(() => [
                  x("abbr", null, F(e.data.cancellationPolicy.name || ""), 1)
                ]),
                _: 1
              })
            ]),
            e.data.feed ? (P(), D("div", {
              key: 0,
              class: Je(["rate-plan-card__offers-item", { "feed-offer": l.value }]),
              title: e.data.feed.description
            }, [
              M(Le, { name: "Restaurant" }),
              x("span", null, F(e.data.feed.name ? U(o)(`ratePlan.boardType.${e.data.feed.name}`) : ""), 1)
            ], 10, hd)) : me("", !0),
            x("div", md, [
              M(Le, { name: "CreditCard" }),
              x("span", null, [
                x("strong", pd, F(U(o)("ratePlan.payments")) + ":", 1),
                (P(!0), D(ue, null, Ae(e.data.paymentTypes, (m, w) => (P(), D(ue, {
                  key: m.name
                }, [
                  M(bi, { class: "inline" }, {
                    popper: z(() => [
                      oe(F(m.description), 1)
                    ]),
                    default: z(() => [
                      x("abbr", null, F(m.name), 1)
                    ]),
                    _: 2
                  }, 1024),
                  e.data.paymentTypes.length - 1 !== w ? (P(), D("strong", gd, F(U(o)("ratePlan.or")), 1)) : me("", !0)
                ], 64))), 128))
              ])
            ]),
            e.data.extras.length ? (P(!0), D(ue, { key: 1 }, Ae(e.data.extras, (m, w) => (P(), D("div", {
              key: w,
              class: "rate-plan-card__offers-item extra-offer",
              style: Pt({ color: m.color })
            }, [
              M(Le, { name: "Check" }, {
                default: z(() => g[1] || (g[1] = [
                  oe("credit_card")
                ])),
                _: 1
              }),
              x("span", null, F(m.name), 1)
            ], 4))), 128)) : me("", !0)
          ])
        ])
      ]),
      x("div", vd, [
        ge(y.$slots, "default", {}, () => [
          x("div", yd, [
            x("span", _d, F(U(o)("ratePlan.los", e.lengthOfStay)), 1),
            (P(!0), D(ue, null, Ae(e.data.variations || [], (m, w) => (P(), ae(jc, {
              key: w,
              price: m.price
            }, {
              icons: z(() => [
                M(id, {
                  kind: m.occupancyOptions.kind,
                  main: m.occupancyOptions.main,
                  "extra-bed": m.occupancyOptions.extraBed
                }, null, 8, ["kind", "main", "extra-bed"])
              ]),
              default: z(() => [
                M(ad, {
                  loading: a.value[w],
                  disabled: e.disabled && !a.value[w],
                  onClick: () => f(m, w)
                }, {
                  default: z(() => [
                    oe(F(U(o)("ratePlan.action")), 1)
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
}, wd = { class: "rate-plan-list__wrapper" }, xd = {
  __name: "BflexAccommodationOfferCard",
  props: {
    accommodationOffer: { type: Object, required: !0 },
    lengthOfStay: { type: Number, required: !0 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["accommodationOfferChosen"],
  setup(e, { emit: t }) {
    const n = t, o = (r, a, l) => {
      n("accommodationOfferChosen", {
        accommodationOffer: r,
        ratePlan: a,
        variant: l
      });
    };
    return (r, a) => (P(), ae(nt, { class: "accommodation-offer" }, {
      default: z(() => [
        M(Fl, {
          data: e.accommodationOffer.accommodationType
        }, null, 8, ["data"]),
        x("div", wd, [
          x("div", {
            class: Je(["rate-plan-list", { "rate-plan-list--single": e.accommodationOffer.ratePlans.length <= 1 }])
          }, [
            (P(!0), D(ue, null, Ae(e.accommodationOffer.ratePlans, (l) => (P(), D(ue, {
              key: l.id
            }, [
              M(Ie),
              M(bd, {
                data: l,
                "length-of-stay": e.lengthOfStay,
                disabled: e.loading,
                onVariantChosen: (d) => o(e.accommodationOffer, l, d)
              }, null, 8, ["data", "length-of-stay", "disabled", "onVariantChosen"])
            ], 64))), 128))
          ], 2)
        ])
      ]),
      _: 1
    }));
  }
}, kd = {}, Td = { class: "information-block-grid" };
function Sd(e, t) {
  return P(), D("div", Td, [
    ge(e.$slots, "default")
  ]);
}
const Gn = /* @__PURE__ */ wn(kd, [["render", Sd]]), Ed = {
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
    const n = e, o = Te(() => !n.dateRange.start || !n.dateRange.end ? 0 : pr(n.dateRange.start, n.dateRange.end)), r = ve([]), a = ve(!1), { setError: l } = Ot("globalError");
    je(
      () => n.dateRange,
      async (y) => {
        if (!(!y.start || !y.end)) {
          a.value = !0;
          try {
            const g = await ls(y.start, y.end, n.promoCode);
            r.value = g.searchResults;
          } catch (g) {
            l(g);
          } finally {
            a.value = !1;
          }
        }
      },
      {
        deep: !0,
        immediate: !0
      }
    );
    const d = t, f = ve(!1), u = async ({ accommodationOffer: y, ratePlan: g, variant: m }) => {
      f.value = !0;
      try {
        const w = await zo({
          checkInDate: n.dateRange.start,
          checkOutDate: n.dateRange.end,
          accommodationType: y.accommodationType.id,
          ratePlan: g.id,
          adults: m.occupancyOptions.main + (m.occupancyOptions.extraBed ? 1 : 0),
          children: [],
          quantity: 1
        });
        d("released", { action: ln, cart: w.cart });
      } catch (w) {
        l(w);
      } finally {
        f.value = !1;
      }
    };
    return (y, g) => (P(), ae(Gn, null, {
      default: z(() => [
        a.value ? (P(), D(ue, { key: 0 }, Ae(3, (m) => M(Vn, { key: m })), 64)) : (P(!0), D(ue, { key: 1 }, Ae(r.value, (m) => (P(), ae(xd, {
          "accommodation-offer": m,
          "length-of-stay": o.value,
          loading: f.value,
          key: m.accommodationType.id,
          onAccommodationOfferChosen: u
        }, null, 8, ["accommodation-offer", "length-of-stay", "loading"]))), 128))
      ]),
      _: 1
    }));
  }
}, Cd = { class: "field-decorator" }, Ad = { class: "field-decorator__input-group" }, Pd = { class: "field-decorator__label" }, Ld = {
  key: 0,
  class: "field-decorator__required"
}, Od = { class: "field-decorator__slot" }, $d = {
  key: 0,
  class: "field-decorator__hint"
}, Ut = {
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
    return (t, n) => (P(), D("div", Cd, [
      x("div", Ad, [
        x("label", Pd, [
          oe(F(e.label), 1),
          e.required ? (P(), D("span", Ld, "*")) : me("", !0)
        ]),
        x("div", Od, [
          ge(t.$slots, "default")
        ])
      ]),
      e.hideHint ? me("", !0) : (P(), D("div", $d, F(e.hint), 1))
    ]));
  }
}, Id = {}, Nd = { class: "information-block__content" };
function Rd(e, t) {
  return P(), D("div", Nd, [
    ge(e.$slots, "default")
  ]);
}
const Me = /* @__PURE__ */ wn(Id, [["render", Rd]]), Dd = { class: "information-block__header-additional" }, It = {
  __name: "BflexHeader",
  props: {
    dense: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, o) => (P(), D("header", {
      class: Je({ dense: t.dense })
    }, [
      x("span", null, [
        ge(n.$slots, "default")
      ]),
      x("span", Dd, [
        ge(n.$slots, "additional")
      ])
    ], 2));
  }
}, Md = { class: "details-info" }, Fd = { class: "details-info__icon" }, Bd = {
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
    return (t, n) => (P(), D("div", Md, [
      x("div", Fd, [
        e.hideIcon ? me("", !0) : (P(), ae(Le, {
          key: 0,
          name: e.icon
        }, null, 8, ["name"]))
      ]),
      ge(t.$slots, "default")
    ]));
  }
}, qd = {
  id: "customer-data-form",
  class: "customer-data-form"
}, zd = {
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
    const n = e, { t: o } = Oe(), r = t, a = ii({ ...n.modelValue }), l = ii({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }), d = (f) => {
      const u = f.target;
      l[u.name] = u.validity.valid ? "" : u.validationMessage;
    };
    return je(
      a,
      (f) => {
        r("update:modelValue", f);
      },
      { deep: !0 }
    ), (f, u) => (P(), ae(nt, null, {
      default: z(() => [
        M(It, null, {
          default: z(() => [
            oe(F(U(o)("contactInformation.title")), 1)
          ]),
          _: 1
        }),
        M(Ie),
        M(Me, null, {
          default: z(() => [
            x("section", qd, [
              M(Ut, {
                label: U(o)("contactInformation.firstName"),
                required: "",
                hint: l.firstName,
                class: Je({ "form-group--error": l.firstName })
              }, {
                default: z(() => [
                  Ze(x("input", {
                    "onUpdate:modelValue": u[0] || (u[0] = (y) => a.firstName = y),
                    type: "text",
                    name: "firstName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: u[1] || (u[1] = (y) => d(y))
                  }, null, 544), [
                    [
                      an,
                      a.firstName,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"]),
              M(Ut, {
                label: U(o)("contactInformation.lastName"),
                required: "",
                hint: l.lastName,
                class: Je({ "form-group--error": l.lastName })
              }, {
                default: z(() => [
                  Ze(x("input", {
                    "onUpdate:modelValue": u[2] || (u[2] = (y) => a.lastName = y),
                    type: "text",
                    name: "lastName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: u[3] || (u[3] = (y) => d(y))
                  }, null, 544), [
                    [
                      an,
                      a.lastName,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"]),
              M(Ut, {
                label: U(o)("contactInformation.email"),
                required: "",
                hint: l.email,
                class: Je({ "form-group--error": l.email })
              }, {
                default: z(() => [
                  Ze(x("input", {
                    "onUpdate:modelValue": u[4] || (u[4] = (y) => a.email = y),
                    type: "email",
                    name: "email",
                    maxlength: "100",
                    required: "",
                    onInput: u[5] || (u[5] = (y) => d(y))
                  }, null, 544), [
                    [
                      an,
                      a.email,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"]),
              M(Ut, {
                label: U(o)("contactInformation.phoneNumber"),
                hint: l.phone,
                class: Je({ "form-group--error": l.phone })
              }, {
                default: z(() => [
                  Ze(x("input", {
                    "onUpdate:modelValue": u[6] || (u[6] = (y) => a.phone = y),
                    type: "tel",
                    name: "phone",
                    minlength: "7",
                    maxlength: "100",
                    onInput: u[7] || (u[7] = (y) => d(y))
                  }, null, 544), [
                    [
                      an,
                      a.phone,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"])
            ]),
            M(Bd, { icon: "Info" }, {
              default: z(() => [
                oe(F(U(o)("contactInformation.confirmationInfo")), 1)
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
}, Hd = { class: "icon-text" }, Wd = { class: "icon-text__icon" }, Vd = { class: "icon-text__text" }, Yt = {
  __name: "BflexIconText",
  props: {
    icon: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    return (t, n) => (P(), D("div", Hd, [
      x("span", Wd, [
        M(Le, { name: e.icon }, null, 8, ["name"])
      ]),
      x("span", Vd, [
        ge(t.$slots, "default")
      ])
    ]));
  }
}, Ud = { class: "text-sm" }, Yd = { class: "accommodation-list__item" }, jd = {
  key: 0,
  style: { "font-size": "0.9em", opacity: "0.7" }
}, Xd = {
  class: "text-sm",
  style: { "line-height": "1.25", "font-weight": "lighter" }
}, Gd = ["onClick"], Kd = {
  key: 1,
  style: { opacity: "0.7" }
}, Jd = {
  key: 0,
  class: "payment-type"
}, Zd = { class: "payment-type__label" }, Qd = { class: "payment-type__variants" }, ef = ["for"], tf = ["name", "id", "value", "checked", "onChange"], nf = { class: "accommodation-list__total" }, of = { class: "accommodation-list__payment-rules" }, rf = { style: { color: "orangered" } }, sf = { style: { color: "orangered" } }, Ir = {
  __name: "BflexChosenAccommodationsCard",
  props: {
    dummy: {
      type: Boolean,
      default: !1
    },
    currency: {
      type: String,
      default: "EUR"
    },
    locale: {
      type: String,
      default: "en"
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
    items: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["changePaymentType", "deleteAccommodationRequest"],
  setup(e, { emit: t }) {
    const n = e, { t: o } = Oe(), r = t, { formatDescription: a } = $r(), l = (u, y) => {
      r("changePaymentType", { request: u, paymentType: y });
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
    }, f = ve({});
    return Jt(() => {
      Object.keys(n.items).forEach((u) => {
        f.value[u] = n.items[u].paymentType.id;
      });
    }), (u, y) => e.loading ? (P(), ae(Vn, {
      key: 0,
      "is-result": ""
    })) : (P(), ae(nt, {
      key: 1,
      class: "accommodation-list"
    }, {
      default: z(() => [
        M(It, null, {
          default: z(() => [
            oe(F(U(o)("chosenAccommodation.title")), 1)
          ]),
          _: 1
        }),
        M(Ie),
        (P(!0), D(ue, null, Ae(e.items, (g, m, w) => (P(), D(ue, { key: w }, [
          M(Me, null, {
            default: z(() => [
              x("dl", Ud, [
                x("dt", null, [
                  M(Yt, { icon: "DateRange" }, {
                    default: z(() => [
                      oe(F(U(Tl)(g.checkInDate, g.checkOutDate, e.locale)), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                x("dd", null, [
                  M(Yt, { icon: "Persons" }, {
                    default: z(() => [
                      oe(F(U(o)("chosenAccommodation.adults", g.adults)) + ", " + F(U(o)("chosenAccommodation.children", g.children.length)), 1)
                    ]),
                    _: 2
                  }, 1024)
                ])
              ])
            ]),
            _: 2
          }, 1024),
          M(Ie),
          M(Me, null, {
            default: z(() => [
              x("dl", Yd, [
                x("dt", null, [
                  x("h3", null, [
                    oe(F(g.accommodationType.name) + " ", 1),
                    g.quantity > 1 ? (P(), D("span", jd, "x" + F(g.quantity), 1)) : me("", !0)
                  ]),
                  x("div", Xd, [
                    oe(F(g.ratePlan.name), 1),
                    y[0] || (y[0] = x("br", null, null, -1)),
                    M(bi, { class: "inline" }, {
                      popper: z(() => [
                        (P(!0), D(ue, null, Ae(U(a)(g.cancellationPolicy.consequences), (k, S) => (P(), D("p", { key: S }, F(k), 1))), 128))
                      ]),
                      default: z(() => [
                        x("abbr", null, F(g.cancellationPolicy.name || ""), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                x("dd", null, [
                  e.dummy ? me("", !0) : (P(), D("div", {
                    key: 0,
                    onClick: () => d(g),
                    class: "accommodation-list__item-delete text-sm cursor-pointer"
                  }, F(U(o)("chosenAccommodation.delete")), 9, Gd)),
                  g.quantity > 1 ? (P(), D("span", Kd, F(g.quantity) + " x", 1)) : me("", !0),
                  oe(" " + F(g.summary.total) + " " + F(e.currency), 1)
                ])
              ]),
              e.dummy ? me("", !0) : (P(), D("div", Jd, [
                x("div", Zd, F(U(o)("chosenAccommodation.willPay")) + ":", 1),
                x("div", Qd, [
                  (P(!0), D(ue, null, Ae(g.availablePaymentTypes, (k) => (P(), D("label", {
                    key: k.id,
                    for: `payment-type-${w}-${g.ratePlan.id}-${k.id}`
                  }, [
                    x("input", {
                      type: "radio",
                      name: `payment-type-${w}`,
                      id: `payment-type-${w}-${g.ratePlan.id}-${k.id}`,
                      value: f.value[m],
                      checked: +f.value[m] == +k.id,
                      onChange: () => l(m, k.id)
                    }, null, 40, tf),
                    oe(" " + F(k.name), 1)
                  ], 8, ef))), 128))
                ])
              ]))
            ]),
            _: 2
          }, 1024),
          M(Ie)
        ], 64))), 128)),
        M(Me, null, {
          default: z(() => [
            x("dl", nf, [
              x("dt", null, F(U(o)("chosenAccommodation.totalAmount")) + ":", 1),
              x("dd", null, [
                x("strong", null, [
                  x("span", null, F(e.summary.total), 1),
                  oe(" " + F(e.currency), 1)
                ])
              ])
            ])
          ]),
          _: 1
        }),
        M(Ie),
        M(Me, null, {
          default: z(() => [
            x("dl", of, [
              x("dt", rf, F(U(o)("chosenAccommodation.prepaymentAmount")) + ":", 1),
              x("dd", sf, F(e.payment.prepayment) + " " + F(e.currency), 1),
              x("dt", null, F(U(o)("chosenAccommodation.onArrivalAmount")) + ":", 1),
              x("dd", null, [
                x("span", null, F(e.payment.onArrival), 1),
                oe(" " + F(e.currency), 1)
              ])
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, af = { class: "summary-block" }, lf = { class: "summary-block__content" }, cf = { class: "summary-block__content-info" }, uf = { class: "summary-block__content-info__price" }, df = { class: "summary-block__content-info__text" }, ff = {
  class: "button",
  type: "submit"
}, hf = {
  __name: "BflexSummaryPanel",
  props: {
    totalAmount: {
      type: String,
      default: "0"
    },
    lengthOfStay: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: "EUR"
    },
    accommodationUnits: {
      type: Number,
      default: 0
    }
  },
  emits: ["onAccommodationSummaryClick"],
  setup(e, { emit: t }) {
    const { t: n } = Oe(), o = t;
    return (r, a) => (P(), D("div", af, [
      x("div", lf, [
        x("div", cf, [
          x("div", uf, [
            x("span", null, F(e.totalAmount), 1),
            oe(" " + F(e.currency), 1)
          ]),
          x("div", df, [
            oe(F(U(n)("summary.room", e.accommodationUnits)) + ", " + F(U(n)("summary.los", e.lengthOfStay)) + " ", 1),
            M(Le, {
              onClick: a[0] || (a[0] = Bo((l) => o("onAccommodationSummaryClick"), ["stop"])),
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        x("button", ff, F(U(n)("summary.complete")), 1)
      ])
    ]));
  }
}, mf = { class: "text-sm" }, pf = {
  value: "none",
  selected: ""
}, gf = ["value"], vf = {
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
    const n = e, { t: o } = Oe(), r = t, a = ii({ ...n.modelValue }), l = Sl("00:00", "23:00");
    return je(
      a,
      (d) => {
        r("update:modelValue", d);
      },
      { deep: !0 }
    ), (d, f) => (P(), ae(nt, { class: "customer-request-block" }, {
      default: z(() => [
        M(It, null, {
          default: z(() => [
            oe(F(U(o)("customerRequest.title")), 1)
          ]),
          _: 1
        }),
        M(Ie),
        M(Me, null, {
          default: z(() => [
            M(Ut, {
              label: U(o)("customerRequest.comment")
            }, {
              default: z(() => [
                Ze(x("textarea", {
                  "onUpdate:modelValue": f[0] || (f[0] = (u) => a.comment = u),
                  name: "comment",
                  rows: "3",
                  maxlength: "500"
                }, null, 512), [
                  [an, a.comment]
                ])
              ]),
              _: 1
            }, 8, ["label"])
          ]),
          _: 1
        }),
        M(Ie),
        M(Me, null, {
          default: z(() => [
            x("dl", mf, [
              x("dt", null, F(U(o)("customerRequest.checkInOutTime")) + ":", 1),
              x("dd", null, F(U(o)("customerRequest.checkInTimeFrom")) + ": " + F(e.arrivalPolicy.checkInTime) + "; " + F(U(o)("customerRequest.checkOutTimeUntil")) + ": " + F(e.arrivalPolicy.checkOutTime), 1)
            ])
          ]),
          _: 1
        }),
        M(Ie),
        M(Me, null, {
          default: z(() => [
            M(Ut, {
              label: U(o)("customerRequest.arrivalTime"),
              style: { width: "50%" }
            }, {
              default: z(() => [
                Ze(x("select", {
                  name: "arrivalTime",
                  "onUpdate:modelValue": f[1] || (f[1] = (u) => a.arrivalTime = u)
                }, [
                  x("option", pf, F(U(o)("customerRequest.noneTime")), 1),
                  (P(!0), D(ue, null, Ae(U(l), (u) => (P(), D("option", {
                    value: u,
                    key: u
                  }, F(u), 9, gf))), 128))
                ], 512), [
                  [ts, a.arrivalTime]
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
}, yf = { class: "custom-checkbox" }, _f = ["required"], Mo = {
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
    const n = e, o = t, r = Te({
      get: () => n.modelValue,
      set: (a) => o("update:modelValue", a)
    });
    return (a, l) => (P(), D("label", yf, [
      Ze(x("input", {
        type: "checkbox",
        "onUpdate:modelValue": l[0] || (l[0] = (d) => r.value = d),
        required: e.required
      }, null, 8, _f), [
        [ns, r.value]
      ]),
      l[1] || (l[1] = x("span", { class: "custom-checkbox__box" }, null, -1)),
      ge(a.$slots, "default")
    ]));
  }
}, bf = { class: "agreement-rules-list__rules" }, wf = { class: "agreement-rules-list__agreements" }, xf = {
  key: 0,
  class: "agreement-rules-list__agreements-item"
}, kf = ["href"], Tf = {
  key: 0,
  class: "agreement-rules-list__agreements-item"
}, Sf = ["href"], Ef = {
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
    const t = e, { t: n } = Oe(), o = Te(() => t.agreements.filter((d) => d.combined)), r = Te(() => t.agreements.length > 0 || t.rules.length > 0), a = ve(!1), l = ve(t.agreements.map(() => !1));
    return (d, f) => r.value ? (P(), ae(nt, {
      key: 0,
      class: "agreement-rules-list"
    }, {
      default: z(() => [
        M(It, null, {
          default: z(() => [
            oe(F(U(n)("accommodationRules.title")), 1)
          ]),
          _: 1
        }),
        e.rules.length > 0 ? (P(), D(ue, { key: 0 }, [
          M(Ie),
          M(Me, null, {
            default: z(() => [
              x("ul", bf, [
                (P(!0), D(ue, null, Ae(e.rules, (u, y) => (P(), D("li", { key: y }, F(u.text), 1))), 128))
              ])
            ]),
            _: 1
          })
        ], 64)) : me("", !0),
        M(Ie),
        M(Me, null, {
          default: z(() => [
            x("div", wf, [
              o.value.length > 0 ? (P(), D("div", xf, [
                M(Mo, {
                  modelValue: a.value,
                  "onUpdate:modelValue": f[0] || (f[0] = (u) => a.value = u),
                  required: ""
                }, {
                  default: z(() => [
                    x("span", null, [
                      oe(F(U(n)("accommodationRules.agreementSentence")) + " ", 1),
                      (P(!0), D(ue, null, Ae(o.value, (u, y) => (P(), D("a", {
                        class: "agreement-rules-list__combined-agreement",
                        target: "_blank",
                        href: u.url,
                        key: y
                      }, F(u.anchor), 9, kf))), 128)),
                      f[1] || (f[1] = oe("."))
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ])) : me("", !0),
              (P(!0), D(ue, null, Ae(e.agreements, (u, y) => (P(), D(ue, { key: y }, [
                u.combined === !1 ? (P(), D("div", Tf, [
                  M(Mo, {
                    modelValue: l.value[y],
                    "onUpdate:modelValue": (g) => l.value[y] = g,
                    required: u.required
                  }, {
                    default: z(() => [
                      x("span", null, [
                        oe(F(U(n)("accommodationRules.agreementSentenceShort")) + " ", 1),
                        x("a", {
                          target: "_blank",
                          href: u.url
                        }, F(u.anchor), 9, Sf)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "required"])
                ])) : me("", !0)
              ], 64))), 128))
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : me("", !0);
  }
}, Cf = {
  __name: "ConfirmationPage",
  emits: ["released"],
  setup(e, { emit: t }) {
    const n = ve({
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
      checkInDate: k,
      checkOutDate: S,
      accommodationType: O,
      ratePlan: b,
      adults: T,
      children: $,
      quantity: E
    }) => {
      f.value = !0;
      try {
        const N = await zo({
          checkInDate: k,
          checkOutDate: S,
          accommodationType: O,
          ratePlan: b,
          adults: T,
          children: $,
          quantity: E
        });
        u.value = N.cart, N.cart.requests.length === 0 && o("released", { action: mr, result: N });
      } catch (N) {
        y(N);
      } finally {
        f.value = !1;
      }
    }, a = ve(null), l = Ot("settings"), d = async (k) => {
      if (k.preventDefault(), a.value.reportValidity()) {
        f.value = !0;
        try {
          const S = await ds({
            customer: {
              ...n.value.customerInfo
            },
            comment: n.value.comment,
            arrivalTime: n.value.arrivalTime
          });
          S && S.reservations && o("released", { action: On, result: S });
        } catch (S) {
          y(S);
        } finally {
          f.value = !1;
        }
      }
    }, f = ve(!0), u = ve(null), { setError: y } = Ot("globalError");
    Jt(async () => {
      f.value = !0;
      try {
        const k = await cs();
        u.value = k.cart;
      } catch (k) {
        y(k);
      } finally {
        f.value = !1;
      }
    });
    const g = async (k) => {
      try {
        const S = await us(k);
        u.value = S.cart;
      } catch (S) {
        y(S);
      }
    }, m = Te(() => !u.value || !u.value.requests || Object.keys(u.value.requests).length === 0 ? 0 : Object.keys(u.value.requests).reduce((k, S) => {
      const O = u.value.requests[S];
      return k + O.quantity;
    }, 0)), w = Te(() => !u.value || !u.value.requests || Object.keys(u.value.requests).length === 0 ? 0 : pr(
      u.value.requests[Object.keys(u.value.requests)[0]].checkInDate,
      u.value.requests[Object.keys(u.value.requests)[0]].checkOutDate
    ));
    return (k, S) => (P(), D("form", {
      onSubmit: d,
      ref_key: "confirmForm",
      ref: a
    }, [
      M(Gn, null, {
        default: z(() => [
          M(zd, {
            modelValue: n.value.customerInfo,
            "onUpdate:modelValue": S[0] || (S[0] = (O) => n.value.customerInfo = O)
          }, null, 8, ["modelValue"]),
          u.value ? (P(), ae(Ir, {
            key: 0,
            loading: f.value,
            cart: u.value,
            currency: u.value.currency,
            locale: U(l).widget.locale,
            payment: u.value.payment,
            summary: u.value.summary,
            items: u.value.requests,
            onChangePaymentType: g,
            onDeleteAccommodationRequest: r
          }, null, 8, ["loading", "cart", "currency", "locale", "payment", "summary", "items"])) : me("", !0),
          M(vf, {
            modelValue: n.value.customerRequest,
            "onUpdate:modelValue": S[1] || (S[1] = (O) => n.value.customerRequest = O)
          }, null, 8, ["modelValue"]),
          M(Ef, {
            agreements: U(l).hotelRules.agreements,
            rules: U(l).hotelRules.rules
          }, null, 8, ["agreements", "rules"]),
          !f.value && u.value ? (P(), ae(hf, {
            key: 1,
            "total-amount": u.value.summary.total,
            currency: u.value.currency,
            "accommodation-units": m.value,
            "length-of-stay": w.value
          }, null, 8, ["total-amount", "currency", "accommodation-units", "length-of-stay"])) : me("", !0)
        ]),
        _: 1
      })
    ], 544));
  }
}, Af = { class: "hotel-information" }, Pf = ["href"], Lf = { href: "#" }, Of = {
  __name: "BflexHotelInformationCard",
  props: {
    hotelInfo: {
      type: Object
    }
  },
  setup(e) {
    const { t } = Oe();
    return (n, o) => (P(), ae(nt, null, {
      default: z(() => [
        M(It, null, {
          default: z(() => [
            oe(F(U(t)("reservation.hotelInfo.title")), 1)
          ]),
          _: 1
        }),
        M(Ie),
        M(Me, null, {
          default: z(() => [
            x("div", Af, [
              M(Yt, { icon: "Hotel" }, {
                default: z(() => [
                  oe(F(e.hotelInfo.name), 1)
                ]),
                _: 1
              }),
              M(Yt, { icon: "Home" }, {
                default: z(() => [
                  oe(F(e.hotelInfo.address.address), 1)
                ]),
                _: 1
              }),
              M(Yt, { icon: "Phone" }, {
                default: z(() => [
                  x("a", {
                    href: `tel:${e.hotelInfo.phone}`
                  }, F(e.hotelInfo.phone), 9, Pf)
                ]),
                _: 1
              }),
              M(Yt, { icon: "Email" }, {
                default: z(() => [
                  x("a", Lf, F(e.hotelInfo.email), 1)
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
}, $f = { class: "summary-block" }, If = { class: "summary-block__content" }, Nf = { class: "summary-block__content-info" }, Rf = { class: "summary-block__content-info__price" }, Df = { class: "summary-block__content-info__text" }, Mf = {
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
    const { t: n } = Oe(), o = t, r = () => o("click");
    return (a, l) => (P(), D("div", $f, [
      x("div", If, [
        x("div", Nf, [
          x("div", Rf, [
            x("span", null, F(e.prepayment), 1),
            oe(" " + F(e.currency), 1)
          ]),
          x("div", Df, [
            oe(F(U(n)("reservation.payment.prepayment")) + " ", 1),
            M(Le, {
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        x("button", {
          class: "button",
          onClick: Bo(r, ["stop"])
        }, F(U(n)("reservation.payment.action")), 1)
      ])
    ]));
  }
}, Ff = { class: "reservation-result" }, Bf = { class: "reservation-result__title" }, qf = { class: "reservation-result__description" }, zf = {
  __name: "ResultPage",
  props: {
    sid: {
      type: String,
      required: !0,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = Oe(), o = Ot("settings"), r = ve(null), a = ve([]), l = ve(!0), { setError: d } = Ot("globalError"), f = async () => {
      if (t.sid) {
        l.value = !0;
        try {
          const g = await fs({ sid: t.sid });
          r.value = g.data, a.value = g.captureTokens;
        } catch (g) {
          d(g);
        } finally {
          l.value = !1;
        }
      }
    }, u = Te(() => r.value.reservations.length ? Gc(r.value.reservations[0].status) : ""), y = () => {
      a.value.forEach((g) => {
        console.log(g), window.open(g, "_blank");
      });
    };
    return je(() => t.sid, f), Jt(f), (g, m) => (P(), ae(Gn, null, {
      default: z(() => [
        l.value ? (P(), ae(Vn, { key: 0 })) : (P(), D(ue, { key: 1 }, [
          x("section", Ff, [
            x("div", Bf, F(U(n)("reservation.title")), 1),
            x("div", qf, F(U(n)(`reservation.description.${u.value}`)), 1)
          ]),
          M(Ir, {
            items: r.value.reservations,
            summary: r.value.summary,
            payment: r.value.payment,
            locale: U(o).widget.locale,
            dummy: ""
          }, null, 8, ["items", "summary", "payment", "locale"]),
          M(nt, { class: "information-block--attention" }, {
            default: z(() => [
              M(It, null, {
                default: z(() => [
                  oe(F(U(n)("reservation.whatIsNext")), 1)
                ]),
                _: 1
              }),
              M(Ie),
              M(Me, null, {
                default: z(() => [
                  oe(F(U(n)(`reservation.nextStep.${u.value}`, { untilTime: "" })), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          r.value.note ? (P(), ae(nt, { key: 0 }, {
            default: z(() => [
              M(It, null, {
                default: z(() => [
                  oe(F(U(n)("reservation.customerRequest")), 1)
                ]),
                _: 1
              }),
              M(Ie),
              M(Me, null, {
                default: z(() => [
                  oe(F(r.value.note), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : me("", !0),
          M(Of, {
            "hotel-info": U(o).hotelInfo
          }, null, 8, ["hotel-info"]),
          a.value.length ? (P(), ae(Mf, {
            key: 1,
            prepayment: r.value.payment.prepayment,
            currency: r.value.currency,
            onClick: y
          }, null, 8, ["prepayment", "currency"])) : me("", !0)
        ], 64))
      ]),
      _: 1
    }));
  }
}, Hf = { id: "bflex-booking-widget" }, Wf = { class: "booking-widget" }, Vf = { class: "booking-widget__content" }, Nr = {
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
    const t = e, n = ve({
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
    qo("settings", n);
    const o = [ln, On, yo], r = ve(null), a = (m) => {
      if (!m)
        r.value = ln;
      else {
        const w = o.indexOf(m);
        w >= 0 && w < o.length - 1 && (r.value = o[w + 1]);
      }
      window.dispatchEvent(
        new CustomEvent("bflex:booking-widget:action", { detail: { action: r.value } })
      );
    }, l = ve(!1), d = ve(""), f = ve({
      start: t.start,
      end: t.end,
      promoCode: t.promoCode
    });
    je(
      () => ({ start: t.start, end: t.end, promoCode: t.promoCode }),
      () => {
        f.value = {
          start: t.start,
          end: t.end,
          promoCode: t.promoCode
        };
      }
    ), je(
      f,
      (m, w) => {
        !m.start || !m.end || (!w || !w.start || !w.end || w.start !== m.start || w.end !== m.end) && window.dispatchEvent(
          new CustomEvent("bflex:booking-widget:changed", { detail: is(f.value) })
        );
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    const { setError: u } = Ot("globalError"), y = (m) => {
      const { start: w, end: k, promoCode: S } = m.detail;
      f.value = { start: w, end: k, promoCode: S }, m.stopPropagation();
    };
    Jt(async () => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:ready")), window.addEventListener("bflex:search-bar:search", y), l.value = !0;
      try {
        const { inProgress: m, settings: w } = await as();
        n.value = w;
        const { widget: k } = w;
        k && k.locale && k.l10n && Object.keys(k.l10n).length && (Rn.global.locale.value = k.locale, Rn.global.setLocaleMessage(k.locale, k.l10n)), m ? a(ln) : a();
      } catch (m) {
        u(m);
      } finally {
        setTimeout(() => {
          l.value = !1;
        }, 1e3);
      }
    }), qn(() => {
      window.removeEventListener("bflex:search-bar:search", y);
    });
    const g = ({ action: m, result: w }) => {
      m === mr ? a() : (m === On && (d.value = w.reservations[0]), a(m));
    };
    return (m, w) => (P(), D("main", Hf, [
      x("div", Wf, [
        x("section", Vf, [
          l.value ? (P(), ae(Gn, { key: 0 }, {
            default: z(() => [
              (P(), D(ue, null, Ae(3, (k) => M(Vn, { key: k })), 64))
            ]),
            _: 1
          })) : me("", !0),
          r.value === U(ln) ? (P(), ae(Ed, {
            key: 1,
            dateRange: f.value,
            promoCode: e.promoCode,
            onReleased: g
          }, null, 8, ["dateRange", "promoCode"])) : r.value === U(On) ? (P(), ae(Cf, {
            key: 2,
            onReleased: g
          })) : r.value === U(yo) ? (P(), ae(zf, {
            key: 3,
            sid: d.value,
            onReleased: g
          }, null, 8, ["sid"])) : me("", !0)
        ])
      ])
    ]));
  }
}, Uf = { style: { display: "flex", "flex-direction": "column", "min-height": "300px", "justify-content": "center", "align-items": "center" } }, Rr = {
  __name: "BflexErrorProvider",
  setup(e) {
    const { t } = Oe(), n = ve(null);
    qo("globalError", { setError: (l) => {
      n.value = l;
    }, clearError: () => {
      n.value = null;
    } });
    const a = () => {
      location.reload();
    };
    return (l, d) => n.value ? (P(), ae(nt, { key: 1 }, {
      default: z(() => [
        M(Me, null, {
          default: z(() => [
            x("section", Uf, [
              x("h1", null, F(U(t)("globalError.title")), 1),
              x("p", null, F(U(t)("globalError.description")), 1),
              x("button", {
                class: "button",
                onClick: a
              }, F(U(t)("globalError.reload")), 1)
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : ge(l.$slots, "default", { key: 0 });
  }
}, Yf = '@charset "UTF-8";.resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}.v-popper__popper{z-index:10000;top:0;left:0;outline:none}.v-popper__popper.v-popper__popper--hidden{visibility:hidden;opacity:0;transition:opacity .15s,visibility .15s;pointer-events:none}.v-popper__popper.v-popper__popper--shown{visibility:visible;opacity:1;transition:opacity .15s}.v-popper__popper.v-popper__popper--skip-transition,.v-popper__popper.v-popper__popper--skip-transition>.v-popper__wrapper{transition:none!important}.v-popper__backdrop{position:absolute;top:0;left:0;width:100%;height:100%;display:none}.v-popper__inner{position:relative;box-sizing:border-box;overflow-y:auto}.v-popper__inner>div{position:relative;z-index:1;max-width:inherit;max-height:inherit}.v-popper__arrow-container{position:absolute;width:10px;height:10px}.v-popper__popper--arrow-overflow .v-popper__arrow-container,.v-popper__popper--no-positioning .v-popper__arrow-container{display:none}.v-popper__arrow-inner,.v-popper__arrow-outer{border-style:solid;position:absolute;top:0;left:0;width:0;height:0}.v-popper__arrow-inner{visibility:hidden;border-width:7px}.v-popper__arrow-outer{border-width:6px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{left:-2px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{left:-1px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer{border-bottom-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-container{top:0}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{border-top-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-top-color:transparent!important}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{top:-4px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{top:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{top:-1px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{border-left-width:0;border-left-color:transparent!important;border-top-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{left:-4px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{left:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-container{right:-10px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer{border-right-width:0;border-top-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner{left:-2px}.v-popper--theme-tooltip .v-popper__inner{background:#000c;color:#fff;border-radius:6px;padding:7px 12px 6px}.v-popper--theme-tooltip .v-popper__arrow-outer{border-color:#000c}.v-popper--theme-dropdown .v-popper__inner{background:#fff;color:#000;border-radius:6px;border:1px solid #ddd;box-shadow:0 6px 30px #0000001a}.v-popper--theme-dropdown .v-popper__arrow-inner{visibility:visible;border-color:#fff}.v-popper--theme-dropdown .v-popper__arrow-outer{border-color:#ddd}:host,.booking-widget{font-family:var(--font-base, "Roboto"),sans-serif;font-size:var(--base-font, 16px);color:#696969;line-height:1.5;box-sizing:border-box;display:flex;flex-direction:column;max-width:960px;margin:0 auto}*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}.booking-widget__content{position:relative;min-height:450px}h1{font-size:1.5rem;font-weight:600;margin-bottom:1rem}h2{font-size:1.25rem;font-weight:600;margin-bottom:.75rem}h3{font-size:1.125rem;font-weight:600;margin-bottom:.75rem}h4{font-size:1rem;font-weight:600;margin-bottom:.5rem}h5{font-size:.875rem;font-weight:600;margin-bottom:.5rem}p{font-size:1rem;margin-bottom:.75rem}small,.text-sm{font-size:.875rem}.button{display:inline-flex;align-items:center;justify-content:center;font-size:.875rem;padding:.5rem 1rem;border-radius:.375rem;background:#007aff;color:#fff;border:none;cursor:pointer;text-decoration:none;text-wrap:nowrap}.button:hover{background:#0062cc}.button:disabled{background:#ccc;cursor:not-allowed}.section{padding:1.5rem}.card+.card{margin-top:1rem}blockquote,.blockquote{border-left:3px solid #696969;padding-left:1rem;margin-bottom:1rem;font-size:.875rem;color:#696969}.cursor-pointer{cursor:pointer}abbr,.abbreviation{display:inline;border-bottom-style:dotted;border-bottom-width:1px;cursor:pointer}.inline{display:inline}strong{font-weight:700}a{color:#ff4500;cursor:pointer;text-decoration:underline}a:hover{text-decoration:none}ul{margin:0}ul li{display:block;margin-bottom:.5rem;list-style:disc}ul li:before{content:"";display:inline-flex;margin-right:.25rem}#bflex-booking-widget{position:relative;container-type:inline-size;container-name:widget}@container widget (max-width: 480px){.booking-widget{font-size:var(--base-font, 14px);line-height:1.4}}.details-info{display:flex;background-color:#f9f9fa;border-radius:5px;padding:1rem 1.25rem;font-size:.875rem;column-gap:.5rem}.details-info--icon{flex:0 0 1rem}.accommodation-list__item{margin-bottom:.5rem}.accommodation-list__item-delete{margin-bottom:.5rem;color:#a1a1a1}.accommodation-list__item-delete:hover{color:#1b1b1f}.accommodation-list__total{color:#000}.accommodation-list__payment-rules dd,.accommodation-list__payment-rules dt{margin-bottom:.25rem;font-size:.875rem}.accommodation-list .payment-type{display:inline-flex;flex-direction:row;align-items:center;font-size:.875rem;border:1px solid orangered;border-radius:5px;margin-top:1rem}.accommodation-list .payment-type__label{font-weight:700;background-color:#ff4500;color:#fff;height:100%;padding:.5rem 1rem;flex-wrap:nowrap;text-wrap:nowrap}.accommodation-list .payment-type__variants{display:flex;flex-direction:row;align-items:start;justify-content:start;width:100%;padding:.5rem 1rem;box-sizing:border-box}.accommodation-list .payment-type label{display:flex;flex-direction:row;font-weight:400;margin-right:1rem;cursor:pointer}.accommodation-list .payment-type label input[type=radio]{margin:0 .25rem;padding:0}@container widget (max-width: 480px){.accommodation-list .payment-type{flex-direction:column;align-items:start;width:100%}.accommodation-list .payment-type__label{margin-right:0;width:100%}.accommodation-list .payment-type__variants{flex-direction:column;align-items:start;justify-content:start;width:100%}.accommodation-list .payment-type label{flex-direction:row;padding:.5rem .5rem .5rem 0}}.rate-plan-list{display:flex;flex-flow:column}.rate-plan-list .rate-plan-card:last-child{border-bottom-left-radius:var(--main-border-radius, 10px);border-bottom-right-radius:var(--main-border-radius, 10px)}@container widget (max-width: 480px){.accommodation-offer{overflow-x:hidden}.rate-plan-list__wrapper{padding:.5rem}.rate-plan-list{overflow-x:scroll;scroll-snap-type:x mandatory;flex-direction:row;column-gap:.5rem}}.agreement-rules-list__rules li{padding-left:.25rem}.agreement-rules-list__rules li:before{display:inline-block;content:"—";margin-right:.25rem}.agreement-rules-list__agreements-item{display:flex;flex-direction:row;margin-bottom:.5rem}.agreement-rules-list__combined-agreement{padding:0}.agreement-rules-list__combined-agreement:after{display:inline-block;padding-right:0;content:", ";text-decoration:none}.agreement-rules-list__combined-agreement:last-child:after{content:"";display:none}.accommodation-type-card{display:flex;color:var(--accommodation-type-card-color);border-top-left-radius:var(--main-border-radius, 10px);border-top-right-radius:var(--main-border-radius, 10px);background:var(--accommodation-type-card-background, transparent)}.accommodation-type-card__img{width:300px;flex-shrink:0;border-top-left-radius:var(--main-border-radius, 10px);overflow:hidden;background:#e0e0e0;cursor:pointer;display:flex}.accommodation-type-card__img img{width:100%;height:100%;object-fit:cover;object-position:center}.accommodation-type-card__body{display:flex;flex-flow:column;justify-content:space-between;padding:1.5rem;width:100%}.amenities{font-size:.75rem;background:transparent;margin-top:.75rem;display:inline-flex;flex-wrap:wrap;gap:.5rem}.amenities__item{border:1px solid var(--main-border-color, #e0e0e0);padding:.5rem;background:transparent;line-height:1;border-radius:3px}@container widget (max-width: 480px){.accommodation-type-card{flex-flow:column;max-height:initial;height:auto}.accommodation-type-card__img{width:auto;border-top-right-radius:var(--accommodation-type-card-border-radius, 3px);line-height:1}.accommodation-type-card__img img{height:220px}.accommodation-type-card__body{width:auto}}.custom-checkbox{display:flex;align-items:center;cursor:pointer}.custom-checkbox input[type=checkbox]{position:absolute;opacity:0;width:1.25rem;height:1.25rem;cursor:pointer}.custom-checkbox__box{width:1rem;height:1rem;flex:0 0 1rem;border:2px solid rgba(34,34,34,.2);border-radius:3px;position:relative;margin-right:.5rem;transition:background-color .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box{background-color:#fff}.custom-checkbox__box:after{content:"";position:absolute;top:50%;left:50%;width:.5rem;height:.5rem;background-color:#ff4500;transform:translate(-50%,-50%) scale(0);transition:transform .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box:after{transform:translate(-50%,-50%) scale(1)}.customer-data-form{display:grid;grid-template-columns:1fr 1fr;row-gap:1rem;column-gap:1.5rem;padding:1rem 0 0}@container widget (max-width: 480px){.customer-data-form{grid-template-columns:1fr}}.field-decorator__required{padding-left:3px;color:red}.field-decorator__input-group{border:1px solid rgba(34,34,34,.2);border-radius:5px;background-color:#fff;padding:.25rem .5rem;display:flex;flex-direction:column}.field-decorator__label{font-size:.875em;margin-bottom:.25em;line-height:1;color:#2226}.field-decorator__slot{display:flex;flex-direction:column;width:100%;height:auto}.field-decorator__slot textarea,.field-decorator__slot select,.field-decorator__slot input{border:0!important;outline:0!important;background:#fff;width:100%;height:100%;font-size:.875rem;padding:.25rem 0}.field-decorator__slot textarea{resize:vertical}.field-decorator__hint{height:1.25rem;color:#3d3d3d;text-align:right;font-size:.725rem;overflow:hidden}.form-group--error .field-decorator__input-group{border-color:red}.form-group--error .field-decorator__hint{color:red}.information-block-grid{display:grid;grid-row-gap:1.25rem}.information-block{background-color:#fff;border-radius:var(--main-border-radius, 10px)}.information-block--attention{border:3px solid red}.information-block__content{padding:1rem 1.25rem}.information-block__content dl{display:grid;grid-template-columns:1fr 1fr;gap:.25rem;align-items:center}.information-block__content dl dt{font-weight:700;line-height:1}.information-block__content dl dd{text-align:right;line-height:1}.information-block__content a{padding:0 .25rem}.information-block .divider{margin:0;height:1px;background-color:#e0e0e0}.information-block header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin:0;padding:1rem 1.25rem;border-radius:10px 10px 0 0;font-size:1.25rem;font-weight:700}.information-block header .additional{color:gray;font-weight:400}.information-block header.dense{padding:.5rem 1.25rem}@container widget (max-width: 480px){.information-block header{flex-direction:column;align-items:flex-start}}.cycle-loader{display:flex}@-webkit-keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}@keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}.price-block{display:grid;grid-template-columns:1fr;grid-template-areas:"discount" "amount";line-height:1;height:100%;width:100%}.price-block__discount{grid-area:discount;line-height:1;display:flex;align-items:center;justify-self:end;font-size:.75rem;font-weight:lighter}.price-block__discount-size{display:block;padding:.125rem;margin-right:.25rem;background:red;color:#fff}.price-block__old{text-decoration-line:line-through;opacity:.5}.price-block__schedule{font-size:.75rem}.price-block__icons .icon{font-size:1rem}.price-block__amount{grid-area:amount;display:flex;flex-direction:row;align-items:center;justify-content:space-between;line-height:1;font-size:1.25rem}.price-block__current{margin-left:.5rem}.price-block__current-currency{font-weight:lighter;padding:0 .125rem}@container widget (max-width: 480px){.price-block{grid-template-columns:1fr;grid-template-areas:"amount discount";column-gap:1rem}}.rate-plan-card{display:grid;grid-template-columns:1fr 1fr;grid-template-areas:"description actions" "bottom actions";width:100%;position:relative;background-color:var(--rate-plan-background);font-size:var(--rate-plan-font-size);color:var(--rate-plan-color)}.rate-plan-card--blocked{display:flex;justify-content:center;height:100%;width:100%;position:absolute;background:#0000001a;z-index:1}.rate-plan-card__title{display:inline-flex;align-items:center}.rate-plan-card__wrapper{grid-area:description;padding:0}.rate-plan-card blockquote{border-left-color:var(--rate-plan-secondary-color);color:var(--rate-plan-secondary-color)}.rate-plan-card__description{padding:1.5rem}.rate-plan-card__offers{font-size:var(--rate-plan-font-size, .875rem);color:var(--rate-plan-secondary-color)}.rate-plan-card__offers-item{display:flex;align-items:center;padding:.375rem 0}.rate-plan-card__offers-item .icon{margin-right:.375rem;color:var(--rate-plan-icon-primary-color, #696969);fill:var(--rate-plan-icon-primary-color, #696969)}.rate-plan-card__offers-item.extra-offer .icon{color:inherit}.rate-plan-card__offers-item.feed-offer{color:var(--rate-plan-icon-secondary-color, #28a745)}.rate-plan-card__offers-item.feed-offer .icon{color:var(--rate-plan-icon-secondary-color, #28a745);fill:var(--rate-plan-icon-secondary-color, #28a745)}.rate-plan-card__variants{display:flex;flex-direction:column;align-items:end;padding:1rem 0}.rate-plan-card__variants .length-of-stay{display:block;font-size:.875rem;text-align:right;padding:0 1rem}@container widget (max-width: 480px){.rate-plan-list--single .rate-plan-card{width:100%;flex:0 0 100%}.rate-plan-card{display:flex;flex:0 0 90%;flex-direction:column;min-width:90%;scroll-snap-align:start;border-radius:var(--main-border-radius, 10px);border:1px solid var(--main-border-color, #e0e0e0)}.rate-plan-card__actions{justify-self:stretch}}.variant-line{text-align:right;font-size:var(--variant-line-font-size);color:var(--variant-line-color, #000000)}.variant-line:hover,.variant-line.selected{background:var(--variant-line-selected, #e0e0e0)}.variant-line.selected:hover{background:var(--variant-line-hover, #d7d7d7)}.variant-line__content{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;padding:.5rem 1rem}.variant-line__actions{margin-left:1rem}@container widget (max-width: 480px){.rate-plan-card__variants .variant-line:nth-of-type(odd){background:#f5f5f5}.variant-line{width:100%}.variant-line__content{flex-direction:column;row-gap:.5rem;width:100%}.variant-line__actions{align-self:end;width:100%}.variant-line__actions button{width:100%}}.reservation-result{display:flex;flex-direction:column;margin-top:2rem;margin-bottom:1rem}.reservation-result__title{font-size:1.5rem;font-weight:700;text-align:center}.reservation-result__description{font-size:1.2rem;text-align:center}.hotel-information{display:flex;flex-direction:column;row-gap:.25rem;font-size:.875rem;justify-content:center;justify-items:center}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.accommodation-skeleton.accommodation-result .header .thumbnail,.accommodation-skeleton.accommodation-result .header .content .description,.accommodation-skeleton.accommodation-result .header .content .amenities{display:none}.accommodation-skeleton.accommodation-result .header .content .title-skeleton{width:220px;margin-bottom:0}.accommodation-skeleton .header{display:flex;flex-direction:column}@media (min-width: 768px){.accommodation-skeleton .header{flex-direction:row}}.accommodation-skeleton .header .thumbnail{width:100%;height:192px;border-top-left-radius:10px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0}@media (min-width: 768px){.accommodation-skeleton .header .thumbnail{width:300px}}.accommodation-skeleton .header .content{flex:1;padding:16px}.accommodation-skeleton .header .content .title-skeleton{height:32px;width:96px;margin-bottom:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description{margin-bottom:16px;display:flex;flex-direction:column;gap:8px}.accommodation-skeleton .header .content .description .line{height:16px;width:100%;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description .line.line-short{width:75%}.accommodation-skeleton .header .content .amenities{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.accommodation-skeleton .header .content .amenities .amenity-item{height:32px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header{padding:16px;display:flex;justify-content:space-between;align-items:center}.accommodation-skeleton .footer .option-header .option-title{height:24px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header .option-value{height:24px;width:64px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option{padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start}@media (min-width: 768px){.accommodation-skeleton .footer .room-option{flex-direction:row;align-items:center}}.accommodation-skeleton .footer .room-option .option-details{display:flex;flex-direction:column;gap:8px;width:100%}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .option-details{width:50%}}.accommodation-skeleton .footer .room-option .option-details .option-name{height:20px;width:192px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .option-details .option-description{height:16px;width:128px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section{display:flex;align-items:center;margin-top:8px}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .price-section{margin-top:0}}.accommodation-skeleton .footer .room-option .price-section .price{height:24px;width:64px;margin-right:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section .book-button{height:40px;width:96px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.icons{display:flex;align-items:baseline;color:#323232;fill:#323232}.scenario-text{font-size:var(--base-font);font-weight:lighter}.summary-block{position:sticky;width:auto;bottom:0;right:0;padding:1rem;box-shadow:0 -4px 54px #9e9e9e33;background:#fff;z-index:4;border-radius:10px}.summary-block__content{display:flex;justify-content:space-between;align-items:center}.summary-block__content-info{display:flex;flex-direction:column;align-items:flex-start}.summary-block__content-info__price{font-size:1rem;font-weight:700;color:#ff4500}.summary-block__content-info__text{display:flex;align-items:center;font-size:.875rem;color:#2229;vertical-align:center}.summary-block__content-info__text .icon{font-size:1rem;margin-left:.25rem}.summary-block .accommodation-summary-trigger{cursor:pointer}.summary-block .accommodation-summary-trigger:hover{color:#ff4500}@container widget (max-width: 480px){.summary-block{position:sticky;box-sizing:border-box;left:0;width:100%}}.v-popper__popper p{line-height:1;padding:.125rem 0;margin:.5rem;font-size:.875rem}.icon{fill:currentColor}.icon--small{width:16px}.icon-text{display:inline-flex;flex-direction:row;align-items:center;column-gap:.375rem}.icon-text__icon{display:inline-flex;color:#ff4500;flex:0 0 1rem}.icon-text__icon .icon{width:1.5rem}.icon-text__text{line-height:1}', jf = {
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
    const t = e, n = ve({
      accommodationTypes: [],
      ratePlans: []
    });
    return je(
      () => ({ accommodationTypes: t.accommodationTypes, ratePlans: t.ratePlans }),
      (o) => {
        (o.accommodationTypes.length || o.ratePlans.length) && (n.value = {
          accommodationTypes: o.accommodationTypes.split(","),
          ratePlans: o.accommodationTypes.split(",")
        });
      }
    ), os(() => {
      var r;
      const o = (r = Xt()) == null ? void 0 : r.appContext.app;
      o && !o.__i18n_installed && (o.use(Rn), o.__i18n_installed = !0);
    }), qn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (o, r) => (P(), ae(Rr, null, {
      default: z(() => [
        M(Nr, {
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
}, Xf = /* @__PURE__ */ wn(jf, [["styles", [Yf]]]), Gf = {
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
    return qn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (t, n) => (P(), ae(Rr, null, {
      default: z(() => [
        M(Nr, {
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
globalThis.window && window.customElements.define("bflex-booking-widget", rs(Xf));
function Jf(e) {
  ss(Gf, { initOptions: e }).use(Rn).mount("#bflex-booking-widget");
}
export {
  Nr as BookingWidget,
  Jf as mountWidget
};
