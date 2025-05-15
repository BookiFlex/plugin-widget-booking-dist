import { effectScope as Br, ref as _e, shallowRef as qr, computed as Ce, watch as Ye, isRef as Hr, defineComponent as $t, getCurrentInstance as Yt, h as Fo, Fragment as de, inject as Ot, onMounted as Kt, onUnmounted as Bn, createVNode as M, Text as Wr, createElementBlock as D, openBlock as L, renderSlot as pe, createBlock as le, normalizeClass as Je, withCtx as H, createElementVNode as x, renderList as Ae, onBeforeUnmount as Vr, toDisplayString as z, unref as U, pushScopeId as Ur, popScopeId as jr, nextTick as Yr, normalizeProps as Xr, guardReactiveProps as Gr, resolveComponent as ti, mergeProps as wi, withScopeId as Kr, withKeys as Jr, normalizeStyle as Pt, createCommentVNode as ge, resolveDynamicComponent as Zr, withDirectives as Ze, vShow as ni, createTextVNode as ae, toRefs as Qr, reactive as ii, vModelText as an, withModifiers as es, vModelSelect as ts, vModelCheckbox as ns, provide as zo, toRaw as is, onBeforeMount as os, defineCustomElement as rs, createApp as ss } from "vue";
const Nt = {
  INIT: "bflex/v1/cart/init",
  OFFERS: "bflex/v1/offers",
  CART: "bflex/v1/cart",
  CHANGE_PAYMENT_TYPE: "bflex/v1/cart/paymentType",
  CONFIRM_CART: "bflex/v1/cart/confirm",
  LOAD_RESERVATION: "bflex/v1/account/reservation"
};
async function Rt(e) {
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
async function Dt() {
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
  const e = await Dt() + Nt.INIT;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await Rt(t);
  } catch (t) {
    throw console.error("Error in init app", t), t;
  }
}, ls = async (e, t, n) => {
  console.debug("Loading data", e, t, n);
  let o = await Dt() + Nt.OFFERS;
  if (o = o.includes("?") ? o + "&" : o + "?", !e || !t)
    throw new Error("Invalid dates");
  const r = `${o}checkInDate=${e}&checkOutDate=${t}&promoCode=${n || ""}`;
  try {
    const a = await fetch(r);
    return await Rt(a);
  } catch (a) {
    throw console.error("Failed to load offers:", a), a;
  }
}, cs = async () => {
  console.debug("Loading cart");
  const e = await Dt() + Nt.CART;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await Rt(t);
  } catch (t) {
    throw console.error("Failed to load cart:", t), t;
  }
}, Bo = async (e) => {
  const t = await Dt() + Nt.CART;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: e })
    });
    return await Rt(n);
  } catch (n) {
    throw console.error("Failed to add to cart:", n), n;
  }
}, ds = async (e) => {
  const t = await Dt() + Nt.CHANGE_PAYMENT_TYPE;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Rt(n);
  } catch (n) {
    throw console.error("Failed to change payment type:", n), n;
  }
}, us = async (e) => {
  console.debug("Confirming booking", e);
  const t = await Dt() + Nt.CONFIRM_CART;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Rt(n);
  } catch (n) {
    throw console.error("Failed to confirm booking:", n), n;
  }
}, fs = async (e) => {
  const t = await Dt() + Nt.LOAD_RESERVATION;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Rt(n);
  } catch (n) {
    throw console.error("Failed to load reservation:", n), n;
  }
};
/*!
  * shared v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Nn = typeof window < "u", xt = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), hs = (e, t, n) => ms({ l: e, k: t, s: n }), ms = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Te = (e) => typeof e == "number" && isFinite(e), ps = (e) => xi(e) === "[object Date]", Xt = (e) => xi(e) === "[object RegExp]", qn = (e) => Q(e) && Object.keys(e).length === 0, Ee = Object.assign, gs = Object.create, ue = (e = null) => gs(e);
let zi;
const At = () => zi || (zi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : ue());
function Bi(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const vs = Object.prototype.hasOwnProperty;
function Ue(e, t) {
  return vs.call(e, t);
}
const Se = Array.isArray, me = (e) => typeof e == "function", q = (e) => typeof e == "string", re = (e) => typeof e == "boolean", se = (e) => e !== null && typeof e == "object", ys = (e) => se(e) && me(e.then) && me(e.catch), qo = Object.prototype.toString, xi = (e) => qo.call(e), Q = (e) => xi(e) === "[object Object]", _s = (e) => e == null ? "" : Se(e) || Q(e) && e.toString === qo ? JSON.stringify(e, null, 2) : String(e);
function ki(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
function bs(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Sn = (e) => !se(e) || Se(e);
function Ln(e, t) {
  if (Sn(e) || Sn(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((a) => {
      a !== "__proto__" && (se(o[a]) && !se(r[a]) && (r[a] = Array.isArray(o[a]) ? [] : ue()), Sn(r[a]) || Sn(o[a]) ? r[a] = o[a] : n.push({ src: o[a], des: r[a] }));
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
const lt = " ", Ts = "\r", Re = `
`, Ss = "\u2028", Es = "\u2029";
function Cs(e) {
  const t = e;
  let n = 0, o = 1, r = 1, a = 0;
  const l = ($) => t[$] === Ts && t[$ + 1] === Re, d = ($) => t[$] === Re, f = ($) => t[$] === Es, u = ($) => t[$] === Ss, b = ($) => l($) || d($) || f($) || u($), g = () => n, m = () => o, w = () => r, k = () => a, S = ($) => l($) || f($) || u($) ? Re : t[$], O = () => S(n), _ = () => S(n + a);
  function T() {
    return a = 0, b(n) && (o++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function I() {
    return l(n + a) && a++, a++, t[n + a];
  }
  function E() {
    n = 0, o = 1, r = 1, a = 0;
  }
  function N($ = 0) {
    a = $;
  }
  function F() {
    const $ = n + a;
    for (; $ !== n; )
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
    currentPeek: _,
    next: T,
    peek: I,
    reset: E,
    resetPeek: N,
    skipToPeek: F
  };
}
const gt = void 0, As = ".", qi = "'", Ps = "tokenizer";
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
  }, u = () => f, { onError: b } = t;
  function g(p, v, R, ...j) {
    const ye = u();
    if (v.column += R, v.offset += R, b) {
      const i = n ? oi(ye.startLoc, v) : null, s = Hn(p, i, {
        domain: Ps,
        args: j
      });
      b(s);
    }
  }
  function m(p, v, R) {
    p.endLoc = a(), p.currentType = v;
    const j = { type: v };
    return n && (j.loc = oi(p.startLoc, p.endLoc)), R != null && (j.value = R), j;
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
    for (; p.currentPeek() === lt || p.currentPeek() === Re; )
      v += p.currentPeek(), p.peek();
    return v;
  }
  function O(p) {
    const v = S(p);
    return p.skipToPeek(), v;
  }
  function _(p) {
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
  function I(p, v) {
    const { currentType: R } = v;
    if (R !== 2)
      return !1;
    S(p);
    const j = _(p.currentPeek());
    return p.resetPeek(), j;
  }
  function E(p, v) {
    const { currentType: R } = v;
    if (R !== 2)
      return !1;
    S(p);
    const j = p.currentPeek() === "-" ? p.peek() : p.currentPeek(), ye = T(j);
    return p.resetPeek(), ye;
  }
  function N(p, v) {
    const { currentType: R } = v;
    if (R !== 2)
      return !1;
    S(p);
    const j = p.currentPeek() === qi;
    return p.resetPeek(), j;
  }
  function F(p, v) {
    const { currentType: R } = v;
    if (R !== 7)
      return !1;
    S(p);
    const j = p.currentPeek() === ".";
    return p.resetPeek(), j;
  }
  function $(p, v) {
    const { currentType: R } = v;
    if (R !== 8)
      return !1;
    S(p);
    const j = _(p.currentPeek());
    return p.resetPeek(), j;
  }
  function J(p, v) {
    const { currentType: R } = v;
    if (!(R === 7 || R === 11))
      return !1;
    S(p);
    const j = p.currentPeek() === ":";
    return p.resetPeek(), j;
  }
  function G(p, v) {
    const { currentType: R } = v;
    if (R !== 9)
      return !1;
    const j = () => {
      const i = p.currentPeek();
      return i === "{" ? _(p.peek()) : i === "@" || i === "|" || i === ":" || i === "." || i === lt || !i ? !1 : i === Re ? (p.peek(), j()) : oe(p, !1);
    }, ye = j();
    return p.resetPeek(), ye;
  }
  function V(p) {
    S(p);
    const v = p.currentPeek() === "|";
    return p.resetPeek(), v;
  }
  function oe(p, v = !0) {
    const R = (ye = !1, i = "") => {
      const s = p.currentPeek();
      return s === "{" || s === "@" || !s ? ye : s === "|" ? !(i === lt || i === Re) : s === lt ? (p.peek(), R(!0, lt)) : s === Re ? (p.peek(), R(!0, Re)) : !0;
    }, j = R();
    return v && p.resetPeek(), j;
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
  function $e(p) {
    return K(p, ne);
  }
  function ve(p) {
    const v = p.charCodeAt(0);
    return v >= 48 && v <= 57 || // 0-9
    v >= 65 && v <= 70 || // A-F
    v >= 97 && v <= 102;
  }
  function it(p) {
    return K(p, ve);
  }
  function Ft(p) {
    let v = "", R = "";
    for (; v = $e(p); )
      R += v;
    return R;
  }
  function Zt(p) {
    let v = "";
    for (; ; ) {
      const R = p.currentChar();
      if (R === "{" || R === "}" || R === "@" || R === "|" || !R)
        break;
      if (R === lt || R === Re)
        if (oe(p))
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
  function zt(p) {
    O(p);
    let v = "", R = "";
    for (; v = fe(p); )
      R += v;
    return p.currentChar() === gt && g(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), R;
  }
  function Qt(p) {
    O(p);
    let v = "";
    return p.currentChar() === "-" ? (p.next(), v += `-${Ft(p)}`) : v += Ft(p), p.currentChar() === gt && g(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), v;
  }
  function xn(p) {
    return p !== qi && p !== Re;
  }
  function Bt(p) {
    O(p), k(p, "'");
    let v = "", R = "";
    for (; v = K(p, xn); )
      v === "\\" ? R += en(p) : R += v;
    const j = p.currentChar();
    return j === Re || j === gt ? (g(ce.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), j === Re && (p.next(), k(p, "'")), R) : (k(p, "'"), R);
  }
  function en(p) {
    const v = p.currentChar();
    switch (v) {
      case "\\":
      case "'":
        return p.next(), `\\${v}`;
      case "u":
        return qt(p, v, 4);
      case "U":
        return qt(p, v, 6);
      default:
        return g(ce.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, v), "";
    }
  }
  function qt(p, v, R) {
    k(p, v);
    let j = "";
    for (let ye = 0; ye < R; ye++) {
      const i = it(p);
      if (!i) {
        g(ce.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${v}${j}${p.currentChar()}`);
        break;
      }
      j += i;
    }
    return `\\${v}${j}`;
  }
  function tn(p) {
    return p !== "{" && p !== "}" && p !== lt && p !== Re;
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
      const j = p.currentChar();
      return j === "{" || j === "@" || j === "|" || j === "(" || j === ")" || !j || j === lt ? R : (R += j, p.next(), v(R));
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
        let ye = !0, i = !0, s = !0;
        if (V(p))
          return v.braceNest > 0 && g(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), R = m(v, 1, St(p)), v.braceNest = 0, v.inLinked = !1, R;
        if (v.braceNest > 0 && (v.currentType === 4 || v.currentType === 5 || v.currentType === 6))
          return g(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), v.braceNest = 0, ot(p, v);
        if (ye = I(p, v))
          return R = m(v, 4, zt(p)), O(p), R;
        if (i = E(p, v))
          return R = m(v, 5, Qt(p)), O(p), R;
        if (s = N(p, v))
          return R = m(v, 6, Bt(p)), O(p), R;
        if (!ye && !i && !s)
          return R = m(v, 12, ft(p)), g(ce.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, R.value), O(p), R;
        break;
      }
    }
    return R;
  }
  function mt(p, v) {
    const { currentType: R } = v;
    let j = null;
    const ye = p.currentChar();
    switch ((R === 7 || R === 8 || R === 11 || R === 9) && (ye === Re || ye === lt) && g(ce.INVALID_LINKED_FORMAT, a(), 0), ye) {
      case "@":
        return p.next(), j = m(
          v,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), v.inLinked = !0, j;
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
        return V(p) ? (j = m(v, 1, St(p)), v.braceNest = 0, v.inLinked = !1, j) : F(p, v) || J(p, v) ? (O(p), mt(p, v)) : $(p, v) ? (O(p), m(v, 11, ht(p))) : G(p, v) ? (O(p), ye === "{" ? we(p, v) || j : m(v, 10, nn(p))) : (R === 7 && g(ce.INVALID_LINKED_FORMAT, a(), 0), v.braceNest = 0, v.inLinked = !1, ot(p, v));
    }
  }
  function ot(p, v) {
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
        if (oe(p))
          return m(v, 0, Zt(p));
        break;
      }
    }
    return R;
  }
  function on() {
    const { currentType: p, offset: v, startLoc: R, endLoc: j } = f;
    return f.lastType = p, f.lastOffset = v, f.lastStartLoc = R, f.lastEndLoc = j, f.offset = r(), f.startLoc = a(), o.currentChar() === gt ? m(
      f,
      13
      /* TokenTypes.EOF */
    ) : ot(o, f);
  }
  return {
    nextToken: on,
    currentOffset: r,
    currentPosition: a,
    context: u
  };
}
const Os = "parser", Is = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function $s(e, t, n) {
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
  function o(_, T, I, E, ...N) {
    const F = _.currentPosition();
    if (F.offset += E, F.column += E, n) {
      const $ = t ? oi(I, F) : null, J = Hn(T, $, {
        domain: Os,
        args: N
      });
      n(J);
    }
  }
  function r(_, T, I) {
    const E = { type: _ };
    return t && (E.start = T, E.end = T, E.loc = { start: I, end: I }), E;
  }
  function a(_, T, I, E) {
    t && (_.end = T, _.loc && (_.loc.end = I));
  }
  function l(_, T) {
    const I = _.context(), E = r(3, I.offset, I.startLoc);
    return E.value = T, a(E, _.currentOffset(), _.currentPosition()), E;
  }
  function d(_, T) {
    const I = _.context(), { lastOffset: E, lastStartLoc: N } = I, F = r(5, E, N);
    return F.index = parseInt(T, 10), _.nextToken(), a(F, _.currentOffset(), _.currentPosition()), F;
  }
  function f(_, T) {
    const I = _.context(), { lastOffset: E, lastStartLoc: N } = I, F = r(4, E, N);
    return F.key = T, _.nextToken(), a(F, _.currentOffset(), _.currentPosition()), F;
  }
  function u(_, T) {
    const I = _.context(), { lastOffset: E, lastStartLoc: N } = I, F = r(9, E, N);
    return F.value = T.replace(Is, $s), _.nextToken(), a(F, _.currentOffset(), _.currentPosition()), F;
  }
  function b(_) {
    const T = _.nextToken(), I = _.context(), { lastOffset: E, lastStartLoc: N } = I, F = r(8, E, N);
    return T.type !== 11 ? (o(_, ce.UNEXPECTED_EMPTY_LINKED_MODIFIER, I.lastStartLoc, 0), F.value = "", a(F, E, N), {
      nextConsumeToken: T,
      node: F
    }) : (T.value == null && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, Ke(T)), F.value = T.value || "", a(F, _.currentOffset(), _.currentPosition()), {
      node: F
    });
  }
  function g(_, T) {
    const I = _.context(), E = r(7, I.offset, I.startLoc);
    return E.value = T, a(E, _.currentOffset(), _.currentPosition()), E;
  }
  function m(_) {
    const T = _.context(), I = r(6, T.offset, T.startLoc);
    let E = _.nextToken();
    if (E.type === 8) {
      const N = b(_);
      I.modifier = N.node, E = N.nextConsumeToken || _.nextToken();
    }
    switch (E.type !== 9 && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), E = _.nextToken(), E.type === 2 && (E = _.nextToken()), E.type) {
      case 10:
        E.value == null && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), I.key = g(_, E.value || "");
        break;
      case 4:
        E.value == null && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), I.key = f(_, E.value || "");
        break;
      case 5:
        E.value == null && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), I.key = d(_, E.value || "");
        break;
      case 6:
        E.value == null && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(E)), I.key = u(_, E.value || "");
        break;
      default: {
        o(_, ce.UNEXPECTED_EMPTY_LINKED_KEY, T.lastStartLoc, 0);
        const N = _.context(), F = r(7, N.offset, N.startLoc);
        return F.value = "", a(F, N.offset, N.startLoc), I.key = F, a(I, N.offset, N.startLoc), {
          nextConsumeToken: E,
          node: I
        };
      }
    }
    return a(I, _.currentOffset(), _.currentPosition()), {
      node: I
    };
  }
  function w(_) {
    const T = _.context(), I = T.currentType === 1 ? _.currentOffset() : T.offset, E = T.currentType === 1 ? T.endLoc : T.startLoc, N = r(2, I, E);
    N.items = [];
    let F = null;
    do {
      const G = F || _.nextToken();
      switch (F = null, G.type) {
        case 0:
          G.value == null && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(G)), N.items.push(l(_, G.value || ""));
          break;
        case 5:
          G.value == null && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(G)), N.items.push(d(_, G.value || ""));
          break;
        case 4:
          G.value == null && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(G)), N.items.push(f(_, G.value || ""));
          break;
        case 6:
          G.value == null && o(_, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Ke(G)), N.items.push(u(_, G.value || ""));
          break;
        case 7: {
          const V = m(_);
          N.items.push(V.node), F = V.nextConsumeToken || null;
          break;
        }
      }
    } while (T.currentType !== 13 && T.currentType !== 1);
    const $ = T.currentType === 1 ? T.lastOffset : _.currentOffset(), J = T.currentType === 1 ? T.lastEndLoc : _.currentPosition();
    return a(N, $, J), N;
  }
  function k(_, T, I, E) {
    const N = _.context();
    let F = E.items.length === 0;
    const $ = r(1, T, I);
    $.cases = [], $.cases.push(E);
    do {
      const J = w(_);
      F || (F = J.items.length === 0), $.cases.push(J);
    } while (N.currentType !== 13);
    return F && o(_, ce.MUST_HAVE_MESSAGES_IN_PLURAL, I, 0), a($, _.currentOffset(), _.currentPosition()), $;
  }
  function S(_) {
    const T = _.context(), { offset: I, startLoc: E } = T, N = w(_);
    return T.currentType === 13 ? N : k(_, I, E, N);
  }
  function O(_) {
    const T = Ls(_, Ee({}, e)), I = T.context(), E = r(0, I.offset, I.startLoc);
    return t && E.loc && (E.loc.source = _), E.body = S(T), e.onCacheKey && (E.cacheKey = e.onCacheKey(_)), I.currentType !== 13 && o(T, ce.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, _[I.offset] || ""), a(E, T.currentOffset(), T.currentPosition()), E;
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
function Wt(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Wt(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let o = 0; o < n.length; o++)
        Wt(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        Wt(n[o]);
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
      Wt(t.key), t.k = t.key, delete t.key, t.modifier && (Wt(t.modifier), t.m = t.modifier, delete t.modifier);
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
    const _ = O ? o : "";
    f(r ? _ + "  ".repeat(S) : _);
  }
  function b(S = !0) {
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
    indent: b,
    deindent: g,
    newline: m,
    helper: (S) => `_${S}`,
    needIndent: () => l.needIndent
  };
}
function zs(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Gt(e, t.key), t.modifier ? (e.push(", "), Gt(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Bs(e, t) {
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let a = 0; a < r && (Gt(e, t.items[a]), a !== r - 1); a++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function qs(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let a = 0; a < r && (Gt(e, t.cases[a]), a !== r - 1); a++)
      e.push(", ");
    e.deindent(o()), e.push("])");
  }
}
function Hs(e, t) {
  t.body ? Gt(e, t.body) : e.push("null");
}
function Gt(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Hs(e, t);
      break;
    case 1:
      qs(e, t);
      break;
    case 2:
      Bs(e, t);
      break;
    case 6:
      zs(e, t);
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
  const n = q(t.mode) ? t.mode : "normal", o = q(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, a = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], d = Fs(e, {
    filename: o,
    breakLineCode: r,
    needIndent: a
  });
  d.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), d.indent(a), l.length > 0 && (d.push(`const { ${ki(l.map((b) => `${b}: _${b}`), ", ")} } = ctx`), d.newline()), d.push("return "), Gt(d, e), d.deindent(a), d.push("}"), delete e.helpers;
  const { code: f, map: u } = d.context();
  return {
    ast: e,
    code: f,
    map: u ? u.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Vs(e, t = {}) {
  const n = Ee({}, t), o = !!n.jit, r = !!n.minify, a = n.optimize == null ? !0 : n.optimize, d = Ns(n).parse(e);
  return o ? (a && Ms(d), r && Wt(d), { ast: d, code: "" }) : (Ds(d, n), Ws(d, n));
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
  return se(e) && Si(e) === 0 && (Ue(e, "b") || Ue(e, "body"));
}
const Ho = ["b", "body"];
function js(e) {
  return kt(e, Ho);
}
const Wo = ["c", "cases"];
function Ys(e) {
  return kt(e, Wo, []);
}
const Vo = ["s", "static"];
function Xs(e) {
  return kt(e, Vo);
}
const Uo = ["i", "items"];
function Gs(e) {
  return kt(e, Uo, []);
}
const jo = ["t", "type"];
function Si(e) {
  return kt(e, jo);
}
const Yo = ["v", "value"];
function En(e, t) {
  const n = kt(e, Yo);
  if (n != null)
    return n;
  throw hn(t);
}
const Xo = ["m", "modifier"];
function Ks(e) {
  return kt(e, Xo);
}
const Go = ["k", "key"];
function Js(e) {
  const t = kt(e, Go);
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
const Ko = [
  ...Ho,
  ...Wo,
  ...Vo,
  ...Uo,
  ...Go,
  ...Xo,
  ...Yo,
  ...jo
];
function hn(e) {
  return new Error(`unhandled node type: ${e}`);
}
function Kn(e) {
  return (n) => Zs(n, e);
}
function Zs(e, t) {
  const n = js(t);
  if (n == null)
    throw hn(
      0
      /* NodeTypes.Resource */
    );
  if (Si(n) === 1) {
    const a = Ys(n);
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
      if (Ue(o, "i") && Te(o.i))
        return e.interpolate(e.list(o.i));
      if (Ue(o, "index") && Te(o.index))
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
let Cn = ue();
function ea(e, t = {}) {
  let n = !1;
  const o = t.onError || ks;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ...Vs(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function ta(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && q(e)) {
    re(t.warnHtmlMessage) && t.warnHtmlMessage;
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
const ct = {
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
  if (q(e))
    return e;
  if (me(e)) {
    if (e.resolvedOnce && Jn != null)
      return Jn;
    if (e.constructor.name === "Function") {
      const t = e();
      if (ys(t))
        throw dt(ct.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Jn = t;
    } else
      throw dt(ct.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw dt(ct.NOT_SUPPORT_LOCALE_TYPE);
}
function aa(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Se(t) ? t : se(t) ? Object.keys(t) : q(t) ? [t] : [n]
  ])];
}
function Jo(e, t, n) {
  const o = q(n) ? n : pn, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let a = r.__localeChainCache.get(o);
  if (!a) {
    a = [];
    let l = [n];
    for (; Se(l); )
      l = ji(a, l, t);
    const d = Se(t) || !Q(t) ? t : t.default ? t.default : null;
    l = q(d) ? [d] : d, Se(l) && ji(a, l, !1), r.__localeChainCache.set(o, a);
  }
  return a;
}
function ji(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && re(o); r++) {
    const a = t[r];
    q(a) && (o = la(e, t[r], n));
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
    e.push(r), (Se(n) || Q(n)) && n[r] && (o = n[r]);
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
const da = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function ua(e) {
  return da.test(e);
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
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : ua(t) ? fa(t) : "*" + t;
}
function pa(e) {
  const t = [];
  let n = -1, o = 0, r = 0, a, l, d, f, u, b, g;
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
      if (f = ha(a), g = Tt[o], u = g[f] || g.l || 8, u === 8 || (o = u[0], u[1] !== void 0 && (b = m[u[1]], b && (d = a, b() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const Yi = /* @__PURE__ */ new Map();
function ga(e, t) {
  return se(e) ? e[t] : null;
}
function va(e, t) {
  if (!se(e))
    return null;
  let n = Yi.get(t);
  if (n || (n = pa(t), n && Yi.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, a = 0;
  for (; a < o; ) {
    const l = n[a];
    if (Ko.includes(l) && Qe(r))
      return null;
    const d = r[l];
    if (d === void 0 || me(r))
      return null;
    r = d, a++;
  }
  return r;
}
const ya = "11.1.3", Wn = -1, pn = "en-US", Xi = "", Gi = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function _a() {
  return {
    upper: (e, t) => t === "text" && q(e) ? e.toUpperCase() : t === "vnode" && se(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && q(e) ? e.toLowerCase() : t === "vnode" && se(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && q(e) ? Gi(e) : t === "vnode" && se(e) && "__v_isVNode" in e ? Gi(e.children) : e
  };
}
let Zo;
function ba(e) {
  Zo = e;
}
let Qo;
function wa(e) {
  Qo = e;
}
let er;
function xa(e) {
  er = e;
}
let tr = null;
const ka = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  tr = e;
}, Ta = /* @__NO_SIDE_EFFECTS__ */ () => tr;
let nr = null;
const Ki = (e) => {
  nr = e;
}, Sa = () => nr;
let Ji = 0;
function Ea(e = {}) {
  const t = me(e.onWarn) ? e.onWarn : bs, n = q(e.version) ? e.version : ya, o = q(e.locale) || me(e.locale) ? e.locale : pn, r = me(o) ? pn : o, a = Se(e.fallbackLocale) || Q(e.fallbackLocale) || q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Q(e.messages) ? e.messages : Zn(r), d = Q(e.datetimeFormats) ? e.datetimeFormats : Zn(r), f = Q(e.numberFormats) ? e.numberFormats : Zn(r), u = Ee(ue(), e.modifiers, _a()), b = e.pluralRules || ue(), g = me(e.missing) ? e.missing : null, m = re(e.missingWarn) || Xt(e.missingWarn) ? e.missingWarn : !0, w = re(e.fallbackWarn) || Xt(e.fallbackWarn) ? e.fallbackWarn : !0, k = !!e.fallbackFormat, S = !!e.unresolving, O = me(e.postTranslation) ? e.postTranslation : null, _ = Q(e.processor) ? e.processor : null, T = re(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, I = !!e.escapeParameter, E = me(e.messageCompiler) ? e.messageCompiler : Zo, N = me(e.messageResolver) ? e.messageResolver : Qo || ga, F = me(e.localeFallbacker) ? e.localeFallbacker : er || aa, $ = se(e.fallbackContext) ? e.fallbackContext : void 0, J = e, G = se(J.__datetimeFormatters) ? J.__datetimeFormatters : /* @__PURE__ */ new Map(), V = se(J.__numberFormatters) ? J.__numberFormatters : /* @__PURE__ */ new Map(), oe = se(J.__meta) ? J.__meta : {};
  Ji++;
  const K = {
    version: n,
    cid: Ji,
    locale: o,
    fallbackLocale: a,
    messages: l,
    modifiers: u,
    pluralRules: b,
    missing: g,
    missingWarn: m,
    fallbackWarn: w,
    fallbackFormat: k,
    unresolving: S,
    postTranslation: O,
    processor: _,
    warnHtmlMessage: T,
    escapeParameter: I,
    messageCompiler: E,
    messageResolver: N,
    localeFallbacker: F,
    fallbackContext: $,
    onWarn: t,
    __meta: oe
  };
  return K.datetimeFormats = d, K.numberFormats = f, K.__datetimeFormatters = G, K.__numberFormatters = V, __INTLIFY_PROD_DEVTOOLS__ && ia(K, n, oe), K;
}
const Zn = (e) => ({ [e]: ue() });
function Ci(e, t, n, o, r) {
  const { missing: a, onWarn: l } = e;
  if (a !== null) {
    const d = a(e, n, t, r);
    return q(d) ? d : t;
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
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: a, localeFallbacker: l } = e, { __datetimeFormatters: d } = e, [f, u, b, g] = si(...t), m = re(b.missingWarn) ? b.missingWarn : e.missingWarn;
  re(b.fallbackWarn) ? b.fallbackWarn : e.fallbackWarn;
  const w = !!b.part, k = Ei(e, b), S = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    k
  );
  if (!q(f) || f === "")
    return new Intl.DateTimeFormat(k, g).format(u);
  let O = {}, _, T = null;
  const I = "datetime format";
  for (let F = 0; F < S.length && (_ = S[F], O = n[_] || {}, T = O[f], !Q(T)); F++)
    Ci(e, f, _, m, I);
  if (!Q(T) || !q(_))
    return o ? Wn : f;
  let E = `${_}__${f}`;
  qn(g) || (E = `${E}__${JSON.stringify(g)}`);
  let N = d.get(E);
  return N || (N = new Intl.DateTimeFormat(_, Ee({}, T, g)), d.set(E, N)), w ? N.formatToParts(u) : N.format(u);
}
const ir = [
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
  const [t, n, o, r] = e, a = ue();
  let l = ue(), d;
  if (q(t)) {
    const f = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!f)
      throw dt(ct.INVALID_ISO_DATE_ARGUMENT);
    const u = f[3] ? f[3].trim().startsWith("T") ? `${f[1].trim()}${f[3].trim()}` : `${f[1].trim()}T${f[3].trim()}` : f[1].trim();
    d = new Date(u);
    try {
      d.toISOString();
    } catch {
      throw dt(ct.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (ps(t)) {
    if (isNaN(t.getTime()))
      throw dt(ct.INVALID_DATE_ARGUMENT);
    d = t;
  } else if (Te(t))
    d = t;
  else
    throw dt(ct.INVALID_ARGUMENT);
  return q(n) ? a.key = n : Q(n) && Object.keys(n).forEach((f) => {
    ir.includes(f) ? l[f] = n[f] : a[f] = n[f];
  }), q(o) ? a.locale = o : Q(o) && (l = o), Q(r) && (l = r), [a.key || "", d, a, l];
}
function Qi(e, t, n) {
  const o = e;
  for (const r in n) {
    const a = `${t}__${r}`;
    o.__datetimeFormatters.has(a) && o.__datetimeFormatters.delete(a);
  }
}
function eo(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: a, localeFallbacker: l } = e, { __numberFormatters: d } = e, [f, u, b, g] = ai(...t), m = re(b.missingWarn) ? b.missingWarn : e.missingWarn;
  re(b.fallbackWarn) ? b.fallbackWarn : e.fallbackWarn;
  const w = !!b.part, k = Ei(e, b), S = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    k
  );
  if (!q(f) || f === "")
    return new Intl.NumberFormat(k, g).format(u);
  let O = {}, _, T = null;
  const I = "number format";
  for (let F = 0; F < S.length && (_ = S[F], O = n[_] || {}, T = O[f], !Q(T)); F++)
    Ci(e, f, _, m, I);
  if (!Q(T) || !q(_))
    return o ? Wn : f;
  let E = `${_}__${f}`;
  qn(g) || (E = `${E}__${JSON.stringify(g)}`);
  let N = d.get(E);
  return N || (N = new Intl.NumberFormat(_, Ee({}, T, g)), d.set(E, N)), w ? N.formatToParts(u) : N.format(u);
}
const or = [
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
  const [t, n, o, r] = e, a = ue();
  let l = ue();
  if (!Te(t))
    throw dt(ct.INVALID_ARGUMENT);
  const d = t;
  return q(n) ? a.key = n : Q(n) && Object.keys(n).forEach((f) => {
    or.includes(f) ? l[f] = n[f] : a[f] = n[f];
  }), q(o) ? a.locale = o : Q(o) && (l = o), Q(r) && (l = r), [a.key || "", d, a, l];
}
function to(e, t, n) {
  const o = e;
  for (const r in n) {
    const a = `${t}__${r}`;
    o.__numberFormatters.has(a) && o.__numberFormatters.delete(a);
  }
}
const Pa = (e) => e, La = (e) => "", Oa = "text", Ia = (e) => e.length === 0 ? "" : ki(e), $a = _s;
function no(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Na(e) {
  const t = Te(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Te(e.named.count) || Te(e.named.n)) ? Te(e.named.count) ? e.named.count : Te(e.named.n) ? e.named.n : t : t;
}
function Ra(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Da(e = {}) {
  const t = e.locale, n = Na(e), o = se(e.pluralRules) && q(t) && me(e.pluralRules[t]) ? e.pluralRules[t] : no, r = se(e.pluralRules) && q(t) && me(e.pluralRules[t]) ? no : void 0, a = (_) => _[o(n, _.length, r)], l = e.list || [], d = (_) => l[_], f = e.named || ue();
  Te(e.pluralIndex) && Ra(n, f);
  const u = (_) => f[_];
  function b(_, T) {
    const I = me(e.messages) ? e.messages(_, !!T) : se(e.messages) ? e.messages[_] : !1;
    return I || (e.parent ? e.parent.message(_) : La);
  }
  const g = (_) => e.modifiers ? e.modifiers[_] : Pa, m = Q(e.processor) && me(e.processor.normalize) ? e.processor.normalize : Ia, w = Q(e.processor) && me(e.processor.interpolate) ? e.processor.interpolate : $a, k = Q(e.processor) && q(e.processor.type) ? e.processor.type : Oa, O = {
    list: d,
    named: u,
    plural: a,
    linked: (_, ...T) => {
      const [I, E] = T;
      let N = "text", F = "";
      T.length === 1 ? se(I) ? (F = I.modifier || F, N = I.type || N) : q(I) && (F = I || F) : T.length === 2 && (q(I) && (F = I || F), q(E) && (N = E || N));
      const $ = b(_, !0)(O), J = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        N === "vnode" && Se($) && F ? $[0] : $
      );
      return F ? g(F)(J, N) : J;
    },
    message: b,
    type: k,
    interpolate: w,
    normalize: m,
    values: Ee(ue(), l, f)
  };
  return O;
}
const io = () => "", He = (e) => me(e);
function oo(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: a, fallbackLocale: l, messages: d } = e, [f, u] = li(...t), b = re(u.missingWarn) ? u.missingWarn : e.missingWarn, g = re(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = re(u.escapeParameter) ? u.escapeParameter : e.escapeParameter, w = !!u.resolvedMessage, k = q(u.default) || re(u.default) ? re(u.default) ? a ? f : () => f : u.default : n ? a ? f : () => f : null, S = n || k != null && (q(k) || me(k)), O = Ei(e, u);
  m && Ma(u);
  let [_, T, I] = w ? [
    f,
    O,
    d[O] || ue()
  ] : rr(e, f, O, l, g, b), E = _, N = f;
  if (!w && !(q(E) || Qe(E) || He(E)) && S && (E = k, N = E), !w && (!(q(E) || Qe(E) || He(E)) || !q(T)))
    return r ? Wn : f;
  let F = !1;
  const $ = () => {
    F = !0;
  }, J = He(E) ? E : sr(e, f, T, E, N, $);
  if (F)
    return E;
  const G = Ba(e, T, I, u), V = Da(G), oe = Fa(e, J, V), K = o ? o(oe, f) : oe;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const ke = {
      timestamp: Date.now(),
      key: q(f) ? f : He(E) ? E.key : "",
      locale: T || (He(E) ? E.locale : ""),
      format: q(E) ? E : He(E) ? E.source : "",
      message: K
    };
    ke.meta = Ee({}, e.__meta, /* @__PURE__ */ Ta() || {}), oa(ke);
  }
  return K;
}
function Ma(e) {
  Se(e.list) ? e.list = e.list.map((t) => q(t) ? Bi(t) : t) : se(e.named) && Object.keys(e.named).forEach((t) => {
    q(e.named[t]) && (e.named[t] = Bi(e.named[t]));
  });
}
function rr(e, t, n, o, r, a) {
  const { messages: l, onWarn: d, messageResolver: f, localeFallbacker: u } = e, b = u(e, o, n);
  let g = ue(), m, w = null;
  const k = "translate";
  for (let S = 0; S < b.length && (m = b[S], g = l[m] || ue(), (w = f(g, t)) === null && (w = g[t]), !(q(w) || Qe(w) || He(w))); S++)
    if (!Aa(m, b)) {
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
function sr(e, t, n, o, r, a) {
  const { messageCompiler: l, warnHtmlMessage: d } = e;
  if (He(o)) {
    const u = o;
    return u.locale = u.locale || n, u.key = u.key || t, u;
  }
  if (l == null) {
    const u = () => o;
    return u.locale = n, u.key = t, u;
  }
  const f = l(o, za(e, n, r, o, d, a));
  return f.locale = n, f.key = t, f.source = o, f;
}
function Fa(e, t, n) {
  return t(n);
}
function li(...e) {
  const [t, n, o] = e, r = ue();
  if (!q(t) && !Te(t) && !He(t) && !Qe(t))
    throw dt(ct.INVALID_ARGUMENT);
  const a = Te(t) ? String(t) : (He(t), t);
  return Te(n) ? r.plural = n : q(n) ? r.default = n : Q(n) && !qn(n) ? r.named = n : Se(n) && (r.list = n), Te(o) ? r.plural = o : q(o) ? r.default = o : Q(o) && Ee(r, o), [a, r];
}
function za(e, t, n, o, r, a) {
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
function Ba(e, t, n, o) {
  const { modifiers: r, pluralRules: a, messageResolver: l, fallbackLocale: d, fallbackWarn: f, missingWarn: u, fallbackContext: b } = e, m = {
    locale: t,
    modifiers: r,
    pluralRules: a,
    messages: (w, k) => {
      let S = l(n, w);
      if (S == null && (b || k)) {
        const [, , O] = rr(
          b || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          w,
          t,
          d,
          f,
          u
        );
        S = l(O, w);
      }
      if (q(S) || Qe(S)) {
        let O = !1;
        const T = sr(e, w, t, S, w, () => {
          O = !0;
        });
        return O ? io : T;
      } else return He(S) ? S : io;
    }
  };
  return e.processor && (m.processor = e.processor), o.list && (m.list = o.list), o.named && (m.named = o.named), Te(o.plural) && (m.pluralIndex = o.plural), m;
}
Us();
/*!
  * vue-i18n v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const qa = "11.1.3";
function Ha() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (At().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (At().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (At().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (At().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Me = {
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
function Be(e, ...t) {
  return Hn(e, null, void 0);
}
const ci = /* @__PURE__ */ xt("__translateVNode"), di = /* @__PURE__ */ xt("__datetimeParts"), ui = /* @__PURE__ */ xt("__numberParts"), ar = xt("__setPluralRules"), lr = /* @__PURE__ */ xt("__injectWithOption"), fi = /* @__PURE__ */ xt("__dispose");
function gn(e) {
  if (!se(e) || Qe(e))
    return e;
  for (const t in e)
    if (Ue(e, t))
      if (!t.includes("."))
        se(e[t]) && gn(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, a = !1;
        for (let l = 0; l < o; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = ue()), !se(r[n[l]])) {
            a = !0;
            break;
          }
          r = r[n[l]];
        }
        if (a || (Qe(r) ? Ko.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !Qe(r)) {
          const l = r[n[o]];
          se(l) && gn(l);
        }
      }
  return e;
}
function Ai(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: a } = t, l = Q(n) ? n : Se(o) ? ue() : { [e]: ue() };
  if (Se(o) && o.forEach((d) => {
    if ("locale" in d && "resource" in d) {
      const { locale: f, resource: u } = d;
      f ? (l[f] = l[f] || ue(), Ln(u, l[f])) : Ln(u, l);
    } else
      q(d) && Ln(JSON.parse(d), l);
  }), r == null && a)
    for (const d in l)
      Ue(l, d) && gn(l[d]);
  return l;
}
function cr(e) {
  return e.type;
}
function dr(e, t, n) {
  let o = se(t.messages) ? t.messages : ue();
  "__i18nGlobal" in n && (o = Ai(e.locale.value, {
    messages: o,
    __i18n: n.__i18nGlobal
  }));
  const r = Object.keys(o);
  r.length && r.forEach((a) => {
    e.mergeLocaleMessage(a, o[a]);
  });
  {
    if (se(t.datetimeFormats)) {
      const a = Object.keys(t.datetimeFormats);
      a.length && a.forEach((l) => {
        e.mergeDateTimeFormat(l, t.datetimeFormats[l]);
      });
    }
    if (se(t.numberFormats)) {
      const a = Object.keys(t.numberFormats);
      a.length && a.forEach((l) => {
        e.mergeNumberFormat(l, t.numberFormats[l]);
      });
    }
  }
}
function ro(e) {
  return M(Wr, null, e, 0);
}
const so = "__INTLIFY_META__", ao = () => [], Wa = () => !1;
let lo = 0;
function co(e) {
  return (t, n, o, r) => e(n, o, Yt() || void 0, r);
}
const Va = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Yt();
  let t = null;
  return e && (t = cr(e)[so]) ? { [so]: t } : null;
};
function Pi(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, a = Nn ? _e : qr;
  let l = re(e.inheritLocale) ? e.inheritLocale : !0;
  const d = a(
    // prettier-ignore
    t && l ? t.locale.value : q(e.locale) ? e.locale : pn
  ), f = a(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : q(e.fallbackLocale) || Se(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : d.value
  ), u = a(Ai(d.value, e)), b = a(Q(e.datetimeFormats) ? e.datetimeFormats : { [d.value]: {} }), g = a(Q(e.numberFormats) ? e.numberFormats : { [d.value]: {} });
  let m = t ? t.missingWarn : re(e.missingWarn) || Xt(e.missingWarn) ? e.missingWarn : !0, w = t ? t.fallbackWarn : re(e.fallbackWarn) || Xt(e.fallbackWarn) ? e.fallbackWarn : !0, k = t ? t.fallbackRoot : re(e.fallbackRoot) ? e.fallbackRoot : !0, S = !!e.fallbackFormat, O = me(e.missing) ? e.missing : null, _ = me(e.missing) ? co(e.missing) : null, T = me(e.postTranslation) ? e.postTranslation : null, I = t ? t.warnHtmlMessage : re(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, E = !!e.escapeParameter;
  const N = t ? t.modifiers : Q(e.modifiers) ? e.modifiers : {};
  let F = e.pluralRules || t && t.pluralRules, $;
  $ = (() => {
    o && Ki(null);
    const s = {
      version: qa,
      locale: d.value,
      fallbackLocale: f.value,
      messages: u.value,
      modifiers: N,
      pluralRules: F,
      missing: _ === null ? void 0 : _,
      missingWarn: m,
      fallbackWarn: w,
      fallbackFormat: S,
      unresolving: !0,
      postTranslation: T === null ? void 0 : T,
      warnHtmlMessage: I,
      escapeParameter: E,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    s.datetimeFormats = b.value, s.numberFormats = g.value, s.__datetimeFormatters = Q($) ? $.__datetimeFormatters : void 0, s.__numberFormatters = Q($) ? $.__numberFormatters : void 0;
    const c = Ea(s);
    return o && Ki(c), c;
  })(), sn($, d.value, f.value);
  function G() {
    return [
      d.value,
      f.value,
      u.value,
      b.value,
      g.value
    ];
  }
  const V = Ce({
    get: () => d.value,
    set: (s) => {
      $.locale = s, d.value = s;
    }
  }), oe = Ce({
    get: () => f.value,
    set: (s) => {
      $.fallbackLocale = s, f.value = s, sn($, d.value, s);
    }
  }), K = Ce(() => u.value), ke = /* @__PURE__ */ Ce(() => b.value), be = /* @__PURE__ */ Ce(() => g.value);
  function Pe() {
    return me(T) ? T : null;
  }
  function fe(s) {
    T = s, $.postTranslation = s;
  }
  function ne() {
    return O;
  }
  function $e(s) {
    s !== null && (_ = co(s)), O = s, $.missing = _;
  }
  const ve = (s, c, h, y, C, A) => {
    G();
    let P;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || ($.fallbackContext = t ? Sa() : void 0), P = s($);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || ($.fallbackContext = void 0);
    }
    if (h !== "translate exists" && // for not `te` (e.g `t`)
    Te(P) && P === Wn || h === "translate exists" && !P) {
      const [W, B] = c();
      return t && k ? y(t) : C(W);
    } else {
      if (A(P))
        return P;
      throw Be(Me.UNEXPECTED_RETURN_TYPE);
    }
  };
  function it(...s) {
    return ve((c) => Reflect.apply(oo, null, [c, ...s]), () => li(...s), "translate", (c) => Reflect.apply(c.t, c, [...s]), (c) => c, (c) => q(c));
  }
  function Ft(...s) {
    const [c, h, y] = s;
    if (y && !se(y))
      throw Be(Me.INVALID_ARGUMENT);
    return it(c, h, Ee({ resolvedMessage: !0 }, y || {}));
  }
  function Zt(...s) {
    return ve((c) => Reflect.apply(Zi, null, [c, ...s]), () => si(...s), "datetime format", (c) => Reflect.apply(c.d, c, [...s]), () => Xi, (c) => q(c));
  }
  function zt(...s) {
    return ve((c) => Reflect.apply(eo, null, [c, ...s]), () => ai(...s), "number format", (c) => Reflect.apply(c.n, c, [...s]), () => Xi, (c) => q(c));
  }
  function Qt(s) {
    return s.map((c) => q(c) || Te(c) || re(c) ? ro(String(c)) : c);
  }
  const Bt = {
    normalize: Qt,
    interpolate: (s) => s,
    type: "vnode"
  };
  function en(...s) {
    return ve((c) => {
      let h;
      const y = c;
      try {
        y.processor = Bt, h = Reflect.apply(oo, null, [y, ...s]);
      } finally {
        y.processor = null;
      }
      return h;
    }, () => li(...s), "translate", (c) => c[ci](...s), (c) => [ro(c)], (c) => Se(c));
  }
  function qt(...s) {
    return ve((c) => Reflect.apply(eo, null, [c, ...s]), () => ai(...s), "number format", (c) => c[ui](...s), ao, (c) => q(c) || Se(c));
  }
  function tn(...s) {
    return ve((c) => Reflect.apply(Zi, null, [c, ...s]), () => si(...s), "datetime format", (c) => c[di](...s), ao, (c) => q(c) || Se(c));
  }
  function ft(s) {
    F = s, $.pluralRules = F;
  }
  function ht(s, c) {
    return ve(() => {
      if (!s)
        return !1;
      const h = q(c) ? c : d.value, y = we(h), C = $.messageResolver(y, s);
      return Qe(C) || He(C) || q(C);
    }, () => [s], "translate exists", (h) => Reflect.apply(h.te, h, [s, c]), Wa, (h) => re(h));
  }
  function nn(s) {
    let c = null;
    const h = Jo($, f.value, d.value);
    for (let y = 0; y < h.length; y++) {
      const C = u.value[h[y]] || {}, A = $.messageResolver(C, s);
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
      for (const y in h)
        Ue(h, y) && gn(h[y]);
      c = h[s];
    }
    u.value[s] = c, $.messages = u.value;
  }
  function ot(s, c) {
    u.value[s] = u.value[s] || {};
    const h = { [s]: c };
    if (r)
      for (const y in h)
        Ue(h, y) && gn(h[y]);
    c = h[s], Ln(c, u.value[s]), $.messages = u.value;
  }
  function on(s) {
    return b.value[s] || {};
  }
  function p(s, c) {
    b.value[s] = c, $.datetimeFormats = b.value, Qi($, s, c);
  }
  function v(s, c) {
    b.value[s] = Ee(b.value[s] || {}, c), $.datetimeFormats = b.value, Qi($, s, c);
  }
  function R(s) {
    return g.value[s] || {};
  }
  function j(s, c) {
    g.value[s] = c, $.numberFormats = g.value, to($, s, c);
  }
  function ye(s, c) {
    g.value[s] = Ee(g.value[s] || {}, c), $.numberFormats = g.value, to($, s, c);
  }
  lo++, t && Nn && (Ye(t.locale, (s) => {
    l && (d.value = s, $.locale = s, sn($, d.value, f.value));
  }), Ye(t.fallbackLocale, (s) => {
    l && (f.value = s, $.fallbackLocale = s, sn($, d.value, f.value));
  }));
  const i = {
    id: lo,
    locale: V,
    fallbackLocale: oe,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(s) {
      l = s, s && t && (d.value = t.locale.value, f.value = t.fallbackLocale.value, sn($, d.value, f.value));
    },
    get availableLocales() {
      return Object.keys(u.value).sort();
    },
    messages: K,
    get modifiers() {
      return N;
    },
    get pluralRules() {
      return F || {};
    },
    get isGlobal() {
      return o;
    },
    get missingWarn() {
      return m;
    },
    set missingWarn(s) {
      m = s, $.missingWarn = m;
    },
    get fallbackWarn() {
      return w;
    },
    set fallbackWarn(s) {
      w = s, $.fallbackWarn = w;
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
      S = s, $.fallbackFormat = S;
    },
    get warnHtmlMessage() {
      return I;
    },
    set warnHtmlMessage(s) {
      I = s, $.warnHtmlMessage = s;
    },
    get escapeParameter() {
      return E;
    },
    set escapeParameter(s) {
      E = s, $.escapeParameter = s;
    },
    t: it,
    getLocaleMessage: we,
    setLocaleMessage: mt,
    mergeLocaleMessage: ot,
    getPostTranslationHandler: Pe,
    setPostTranslationHandler: fe,
    getMissingHandler: ne,
    setMissingHandler: $e,
    [ar]: ft
  };
  return i.datetimeFormats = ke, i.numberFormats = be, i.rt = Ft, i.te = ht, i.tm = St, i.d = Zt, i.n = zt, i.getDateTimeFormat = on, i.setDateTimeFormat = p, i.mergeDateTimeFormat = v, i.getNumberFormat = R, i.setNumberFormat = j, i.mergeNumberFormat = ye, i[lr] = n, i[ci] = en, i[di] = tn, i[ui] = qt, i;
}
function Ua(e) {
  const t = q(e.locale) ? e.locale : pn, n = q(e.fallbackLocale) || Se(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, o = me(e.missing) ? e.missing : void 0, r = re(e.silentTranslationWarn) || Xt(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = re(e.silentFallbackWarn) || Xt(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, l = re(e.fallbackRoot) ? e.fallbackRoot : !0, d = !!e.formatFallbackMessages, f = Q(e.modifiers) ? e.modifiers : {}, u = e.pluralizationRules, b = me(e.postTranslation) ? e.postTranslation : void 0, g = q(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, m = !!e.escapeParameterHtml, w = re(e.sync) ? e.sync : !0;
  let k = e.messages;
  if (Q(e.sharedMessages)) {
    const N = e.sharedMessages;
    k = Object.keys(N).reduce(($, J) => {
      const G = $[J] || ($[J] = {});
      return Ee(G, N[J]), $;
    }, k || {});
  }
  const { __i18n: S, __root: O, __injectWithOption: _ } = e, T = e.datetimeFormats, I = e.numberFormats, E = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: k,
    flatJson: E,
    datetimeFormats: T,
    numberFormats: I,
    missing: o,
    missingWarn: r,
    fallbackWarn: a,
    fallbackRoot: l,
    fallbackFormat: d,
    modifiers: f,
    pluralRules: u,
    postTranslation: b,
    warnHtmlMessage: g,
    escapeParameter: m,
    messageResolver: e.messageResolver,
    inheritLocale: w,
    __i18n: S,
    __root: O,
    __injectWithOption: _
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
      return re(t.missingWarn) ? !t.missingWarn : t.missingWarn;
    },
    set silentTranslationWarn(r) {
      t.missingWarn = re(r) ? !r : r;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return re(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn;
    },
    set silentFallbackWarn(r) {
      t.fallbackWarn = re(r) ? !r : r;
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
function ja(e, t, n) {
  return {
    beforeCreate() {
      const o = Yt();
      if (!o)
        throw Be(Me.UNEXPECTED_ERROR);
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
      const o = Yt();
      if (!o)
        throw Be(Me.UNEXPECTED_ERROR);
      const r = this.$i18n;
      delete this.$t, delete this.$rt, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, r.__disposer && (r.__disposer(), delete r.__disposer, delete r.__extender), n.__deleteInstance(o), delete this.$i18n;
    }
  };
}
function uo(e, t) {
  e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[ar](t.pluralizationRules || e.pluralizationRules);
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
function Ya({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((o, r) => [
    ...o,
    // prettier-ignore
    ...r.type === de ? r.children : [r]
  ], []) : t.reduce((n, o) => {
    const r = e[o];
    return r && (n[o] = r()), n;
  }, ue());
}
function ur() {
  return de;
}
const Xa = /* @__PURE__ */ $t({
  /* eslint-disable */
  name: "i18n-t",
  props: Ee({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: (e) => Te(e) || !isNaN(e)
    }
  }, Li),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: o } = t, r = e.i18n || Ie({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter((g) => g !== "_"), l = ue();
      e.locale && (l.locale = e.locale), e.plural !== void 0 && (l.plural = q(e.plural) ? +e.plural : e.plural);
      const d = Ya(t, a), f = r[ci](e.keypath, d, l), u = Ee(ue(), o), b = q(e.tag) || se(e.tag) ? e.tag : ur();
      return Fo(b, u, f);
    };
  }
}), fo = Xa;
function Ga(e) {
  return Se(e) && !q(e[0]);
}
function fr(e, t, n, o) {
  const { slots: r, attrs: a } = t;
  return () => {
    const l = { part: !0 };
    let d = ue();
    e.locale && (l.locale = e.locale), q(e.format) ? l.key = e.format : se(e.format) && (q(e.format.key) && (l.key = e.format.key), d = Object.keys(e.format).reduce((m, w) => n.includes(w) ? Ee(ue(), m, { [w]: e.format[w] }) : m, ue()));
    const f = o(e.value, l, d);
    let u = [l.key];
    Se(f) ? u = f.map((m, w) => {
      const k = r[m.type], S = k ? k({ [m.type]: m.value, index: w, parts: f }) : [m.value];
      return Ga(S) && (S[0].key = `${m.type}-${w}`), S;
    }) : q(f) && (u = [f]);
    const b = Ee(ue(), a), g = q(e.tag) || se(e.tag) ? e.tag : ur();
    return Fo(g, b, u);
  };
}
const Ka = /* @__PURE__ */ $t({
  /* eslint-disable */
  name: "i18n-n",
  props: Ee({
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
    const n = e.i18n || Ie({
      useScope: e.scope,
      __useComponent: !0
    });
    return fr(e, t, or, (...o) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[ui](...o)
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
      throw Be(Me.UNEXPECTED_ERROR);
    const u = Ja(e, d.$), b = mo(f);
    return [
      Reflect.apply(u.t, u, [...po(b)]),
      u
    ];
  };
  return {
    created: (l, d) => {
      const [f, u] = t(d);
      Nn && e.global === u && (l.__i18nWatcher = Ye(u.locale, () => {
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
  if (q(e))
    return { path: e };
  if (Q(e)) {
    if (!("path" in e))
      throw Be(Me.REQUIRED_VALUE, "path");
    return e;
  } else
    throw Be(Me.INVALID_VALUE);
}
function po(e) {
  const { path: t, locale: n, args: o, choice: r, plural: a } = e, l = {}, d = o || {};
  return q(n) && (l.locale = n), Te(r) && (l.plural = r), Te(a) && (l.plural = a), [t, d, l];
}
function Qa(e, t, ...n) {
  const o = Q(n[0]) ? n[0] : {};
  (re(o.globalInstall) ? o.globalInstall : !0) && ([fo.name, "I18nT"].forEach((a) => e.component(a, fo)), [ho.name, "I18nN"].forEach((a) => e.component(a, ho)), [vo.name, "I18nD"].forEach((a) => e.component(a, vo))), e.directive("t", Za(t));
}
const el = /* @__PURE__ */ xt("global-vue-i18n");
function tl(e = {}) {
  const t = __VUE_I18N_LEGACY_API__ && re(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, n = re(e.globalInjection) ? e.globalInjection : !0, o = /* @__PURE__ */ new Map(), [r, a] = nl(e, t), l = /* @__PURE__ */ xt("");
  function d(g) {
    return o.get(g) || null;
  }
  function f(g, m) {
    o.set(g, m);
  }
  function u(g) {
    o.delete(g);
  }
  const b = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && t ? "legacy" : "composition";
    },
    // install plugin
    async install(g, ...m) {
      if (g.__VUE_I18N_SYMBOL__ = l, g.provide(g.__VUE_I18N_SYMBOL__, b), Q(m[0])) {
        const S = m[0];
        b.__composerExtend = S.__composerExtend, b.__vueI18nExtend = S.__vueI18nExtend;
      }
      let w = null;
      !t && n && (w = dl(g, b.global)), __VUE_I18N_FULL_INSTALL__ && Qa(g, b, ...m), __VUE_I18N_LEGACY_API__ && t && g.mixin(ja(a, a.__composer, b));
      const k = g.unmount;
      g.unmount = () => {
        w && w(), b.dispose(), k();
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
  return b;
}
function Ie(e = {}) {
  const t = Yt();
  if (t == null)
    throw Be(Me.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw Be(Me.NOT_INSTALLED);
  const n = il(t), o = rl(n), r = cr(t), a = ol(e, r);
  if (a === "global")
    return dr(o, e, r), o;
  if (a === "parent") {
    let f = sl(n, t, e.__useComponent);
    return f == null && (f = o), f;
  }
  const l = n;
  let d = l.__getInstance(t);
  if (d == null) {
    const f = Ee({}, e);
    "__i18n" in r && (f.__i18n = r.__i18n), o && (f.__root = o), d = Pi(f), l.__composerExtend && (d[fi] = l.__composerExtend(d)), ll(l, t, d), l.__setInstance(t, d);
  }
  return d;
}
function nl(e, t) {
  const n = Br(), o = __VUE_I18N_LEGACY_API__ && t ? n.run(() => hi(e)) : n.run(() => Pi(e));
  if (o == null)
    throw Be(Me.UNEXPECTED_ERROR);
  return [n, o];
}
function il(e) {
  const t = Ot(e.isCE ? el : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw Be(e.isCE ? Me.NOT_INSTALLED_WITH_PROVIDE : Me.UNEXPECTED_ERROR);
  return t;
}
function ol(e, t) {
  return qn(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
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
      d != null && (o = d.__composer, n && o && !o[lr] && (o = null));
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
  Kt(() => {
  }, t), Bn(() => {
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
function dl(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return cl.forEach((r) => {
    const a = Object.getOwnPropertyDescriptor(t, r);
    if (!a)
      throw Be(Me.UNEXPECTED_ERROR);
    const l = Hr(a.value) ? {
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
      throw Be(Me.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${r}`, a);
  }), () => {
    delete e.config.globalProperties.$i18n, go.forEach((r) => {
      delete e.config.globalProperties[`$${r}`];
    });
  };
}
const ul = /* @__PURE__ */ $t({
  /* eslint-disable */
  name: "i18n-d",
  props: Ee({
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
    const n = e.i18n || Ie({
      useScope: e.scope,
      __useComponent: !0
    });
    return fr(e, t, ir, (...o) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[di](...o)
    ));
  }
}), vo = ul;
Ha();
ba(ta);
wa(va);
xa(Jo);
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
      title: "Your reservation is complete!",
      description: "Wait for confirmation from the hotel",
      customerRequest: "Your request",
      hotelInfo: {
        title: "Hotel Information",
        email: "Email"
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
}), ln = "choose_accommodation", hr = "empty_cart", On = "booking_confirmation", yo = "reservation_details", wn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, ml = {}, pl = { class: "information-block" };
function gl(e, t) {
  return L(), D("section", pl, [
    pe(e.$slots, "default")
  ]);
}
const ut = /* @__PURE__ */ wn(ml, [["render", gl]]), vl = {}, yl = { class: "divider" };
function _l(e, t) {
  return L(), D("div", yl);
}
const De = /* @__PURE__ */ wn(vl, [["render", _l]]), bl = { class: "header" }, wl = { class: "content" }, xl = { class: "amenities" }, kl = { class: "footer" }, Vn = {
  __name: "BflexSkeletonLoader",
  props: {
    isResult: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (L(), le(ut, {
      class: Je(["accommodation-skeleton", { "accommodation-result": e.isResult }])
    }, {
      default: H(() => [
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
              (L(), D(de, null, Ae(5, (o) => x("div", {
                key: o,
                class: "amenity-item"
              })), 64))
            ])
          ])
        ]),
        M(De),
        x("div", kl, [
          n[4] || (n[4] = x("div", { class: "option-header" }, [
            x("div", { class: "option-title" }),
            x("div", { class: "option-value" })
          ], -1)),
          M(De),
          (L(), D(de, null, Ae(2, (o) => x("div", {
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
function mr(e, t, n = "nights") {
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
  const b = new Date(f);
  for (; b <= u; ) {
    const g = b.getHours().toString().padStart(2, "0"), m = b.getMinutes().toString().padStart(2, "0");
    o.push(`${g}:${m}`), b.setMinutes(b.getMinutes() + n);
  }
  return o;
}
function El(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var In = { exports: {} }, Cl = In.exports, _o;
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
          var y = c[Symbol.toPrimitive];
          if (y !== void 0) {
            var C = y.call(c, h);
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
        for (var y = function(A) {
          for (var P in A) Object.prototype.hasOwnProperty.call(A, P) && (s && Object.prototype.toString.call(A[P]) === "[object Object]" ? i[P] = f(!0, i[P], A[P]) : i[P] = A[P]);
        }; c < h; c++) {
          var C = arguments[c];
          y(C);
        }
        return i;
      }
      function u(i, s) {
        if ((K(i) || i === window || i === document) && (i = [i]), be(i) || Pe(i) || (i = [i]), $e(i) != 0) {
          if (be(i) && !Pe(i)) for (var c = i.length, h = 0; h < c && s.call(i[h], i[h], h, i) !== !1; h++) ;
          else if (Pe(i)) {
            for (var y in i) if (ne(i, y) && s.call(i[y], i[y], y, i) === !1) break;
          }
        }
      }
      function b(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, h = i[d] = i[d] || [], y = { all: h, evt: null, found: null };
        return s && c && $e(h) > 0 && u(h, function(C, A) {
          if (C.eventName == s && C.fn.toString() == c.toString()) return y.found = !0, y.evt = A, !1;
        }), y;
      }
      function g(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = s.onElement, h = s.withCallback, y = s.avoidDuplicate, C = y === void 0 || y, A = s.once, P = A !== void 0 && A, W = s.useCapture, B = W !== void 0 && W, Y = arguments.length > 2 ? arguments[2] : void 0, X = c || [];
        function Z(ee) {
          V(h) && h.call(Y, ee, this), P && Z.destroy();
        }
        return oe(X) && (X = document.querySelectorAll(X)), Z.destroy = function() {
          u(X, function(ee) {
            var te = b(ee, i, Z);
            te.found && te.all.splice(te.evt, 1), ee.removeEventListener && ee.removeEventListener(i, Z, B);
          });
        }, u(X, function(ee) {
          var te = b(ee, i, Z);
          (ee.addEventListener && C && !te.found || !C) && (ee.addEventListener(i, Z, B), te.all.push({ eventName: i, fn: Z }));
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
        var h = F(), y = s.split(" ");
        u(y, function(C) {
          m(i, "g" + C);
        }), g(h, { onElement: i, avoidDuplicate: !1, once: !0, withCallback: function(C, A) {
          u(y, function(P) {
            w(A, "g" + P);
          }), V(c) && c();
        } });
      }
      function _(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        if (s === "") return i.style.webkitTransform = "", i.style.MozTransform = "", i.style.msTransform = "", i.style.OTransform = "", i.style.transform = "", !1;
        i.style.webkitTransform = s, i.style.MozTransform = s, i.style.msTransform = s, i.style.OTransform = s, i.style.transform = s;
      }
      function T(i) {
        i.style.display = "block";
      }
      function I(i) {
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
      function F() {
        var i, s = document.createElement("fakeelement"), c = { animation: "animationend", OAnimation: "oAnimationEnd", MozAnimation: "animationend", WebkitAnimation: "webkitAnimationEnd" };
        for (i in c) if (s.style[i] !== void 0) return c[i];
      }
      function $(i, s, c, h) {
        if (i()) s();
        else {
          var y;
          c || (c = 100);
          var C = setInterval(function() {
            i() && (clearInterval(C), y && clearTimeout(y), s());
          }, c);
        }
      }
      function J(i, s, c) {
        if (fe(i)) console.error("Inject assets error");
        else if (V(s) && (c = s, s = !1), oe(s) && s in window) V(c) && c();
        else {
          var h;
          if (i.indexOf(".css") !== -1) {
            if ((h = document.querySelectorAll('link[href="' + i + '"]')) && h.length > 0) return void (V(c) && c());
            var y = document.getElementsByTagName("head")[0], C = y.querySelectorAll('link[rel="stylesheet"]'), A = document.createElement("link");
            return A.rel = "stylesheet", A.type = "text/css", A.href = i, A.media = "all", C ? y.insertBefore(A, C[0]) : y.appendChild(A), void (V(c) && c());
          }
          if ((h = document.querySelectorAll('script[src="' + i + '"]')) && h.length > 0) {
            if (V(c)) {
              if (oe(s)) return $(function() {
                return window[s] !== void 0;
              }, function() {
                c();
              }), !1;
              c();
            }
          } else {
            var P = document.createElement("script");
            P.type = "text/javascript", P.src = i, P.onload = function() {
              if (V(c)) {
                if (oe(s)) return $(function() {
                  return window[s] !== void 0;
                }, function() {
                  c();
                }), !1;
                c();
              }
            }, document.body.appendChild(P);
          }
        }
      }
      function G() {
        return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
      }
      function V(i) {
        return typeof i == "function";
      }
      function oe(i) {
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
      function $e(i) {
        if (Pe(i)) {
          if (i.keys) return i.keys().length;
          var s = 0;
          for (var c in i) ne(i, c) && s++;
          return s;
        }
        return i.length;
      }
      function ve(i) {
        return !isNaN(parseFloat(i)) && isFinite(i);
      }
      function it() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1, s = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
        if (!s.length) return !1;
        if (s.length == 1) return s[0];
        typeof i == "string" && (i = parseInt(i));
        var c = [];
        u(s, function(P) {
          c.push(P.getAttribute("data-taborder"));
        });
        var h = Math.max.apply(Math, c.map(function(P) {
          return parseInt(P);
        })), y = i < 0 ? 1 : i + 1;
        y > h && (y = "1");
        var C = c.filter(function(P) {
          return P >= parseInt(y);
        }), A = C.sort()[0];
        return document.querySelector('.gbtn[data-taborder="'.concat(A, '"]'));
      }
      function Ft(i) {
        if (i.events.hasOwnProperty("keyboard")) return !1;
        i.events.keyboard = g("keydown", { onElement: window, withCallback: function(s, c) {
          var h = (s = s || window.event).keyCode;
          if (h == 9) {
            var y = document.querySelector(".gbtn.focused");
            if (!y) {
              var C = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
              if (C == "input" || C == "textarea" || C == "button") return;
            }
            s.preventDefault();
            var A = document.querySelectorAll(".gbtn[data-taborder]");
            if (!A || A.length <= 0) return;
            if (!y) {
              var P = it();
              return void (P && (P.focus(), m(P, "focused")));
            }
            var W = it(y.getAttribute("data-taborder"));
            w(y, "focused"), W && (W.focus(), m(W, "focused"));
          }
          h == 39 && i.nextSlide(), h == 37 && i.prevSlide(), h == 27 && i.close();
        } });
      }
      var Zt = r(function i(s, c) {
        var h = this, y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        if (n(this, i), this.img = s, this.slide = c, this.onclose = y, this.img.setZoomEvents) return !1;
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
      } }]), zt = r(function i() {
        var s = this, c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i);
        var h = c.dragEl, y = c.toleranceX, C = y === void 0 ? 40 : y, A = c.toleranceY, P = A === void 0 ? 65 : A, W = c.slide, B = W === void 0 ? null : W, Y = c.instance, X = Y === void 0 ? null : Y;
        this.el = h, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = C, this.toleranceY = P, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = B, this.instance = X, this.el.addEventListener("mousedown", function(Z) {
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
            var y = this.shouldClose();
            return !this.instance.settings.dragAutoSnap && y && (this.doSlideClose = !0), void (this.instance.settings.dragAutoSnap && y && this.instance.close());
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
        var y = i.querySelector(".gslide-media"), C = new Image(), A = "gSlideTitle_" + c, P = "gSlideDesc_" + c;
        C.addEventListener("load", function() {
          V(h) && h();
        }, !1), C.src = s.href, s.sizes != "" && s.srcset != "" && (C.sizes = s.sizes, C.srcset = s.srcset), C.alt = "", fe(s.alt) || s.alt === "" || (C.alt = s.alt), s.title !== "" && C.setAttribute("aria-labelledby", A), s.description !== "" && C.setAttribute("aria-describedby", P), s.hasOwnProperty("_hasCustomWidth") && s._hasCustomWidth && (C.style.width = s.width), s.hasOwnProperty("_hasCustomHeight") && s._hasCustomHeight && (C.style.height = s.height), y.insertBefore(C, y.firstChild);
      }
      function xn(i, s, c, h) {
        var y = this, C = i.querySelector(".ginner-container"), A = "gvideo" + c, P = i.querySelector(".gslide-media"), W = this.getAllPlayers();
        m(C, "gvideo-container"), P.insertBefore(E('<div class="gvideo-wrapper"></div>'), P.firstChild);
        var B = i.querySelector(".gvideo-wrapper");
        J(this.settings.plyr.css, "Plyr");
        var Y = s.href, X = s == null ? void 0 : s.videoProvider, Z = !1;
        P.style.maxWidth = s.width, J(this.settings.plyr.js, "Plyr", function() {
          if (!X && Y.match(/vimeo\.com\/([0-9]*)/) && (X = "vimeo"), !X && (Y.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || Y.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || Y.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || Y.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/)) && (X = "youtube"), X === "local" || !X) {
            X = "local";
            var ee = '<video id="' + A + '" ';
            ee += 'style="background:#000; max-width: '.concat(s.width, ';" '), ee += 'preload="metadata" ', ee += 'x-webkit-airplay="allow" ', ee += "playsinline ", ee += "controls ", ee += 'class="gvideo-local">', ee += '<source src="'.concat(Y, '">'), Z = E(ee += "</video>");
          }
          var te = Z || E('<div id="'.concat(A, '" data-plyr-provider="').concat(X, '" data-plyr-embed-id="').concat(Y, '"></div>'));
          m(B, "".concat(X, "-video gvideo")), B.appendChild(te), B.setAttribute("data-id", A), B.setAttribute("data-index", c);
          var xe = ne(y.settings.plyr, "config") ? y.settings.plyr.config : {}, qe = new Plyr("#" + A, xe);
          qe.on("ready", function(Fe) {
            W[A] = Fe.detail.plyr, V(h) && h();
          }), $(function() {
            return i.querySelector("iframe") && i.querySelector("iframe").dataset.ready == "true";
          }, function() {
            y.resize(i);
          }), qe.on("enterfullscreen", Bt), qe.on("exitfullscreen", Bt);
        });
      }
      function Bt(i) {
        var s = S(i.target, ".gslide-media");
        i.type === "enterfullscreen" && m(s, "fullscreen"), i.type === "exitfullscreen" && w(s, "fullscreen");
      }
      function en(i, s, c, h) {
        var y, C = this, A = i.querySelector(".gslide-media"), P = !(!ne(s, "href") || !s.href) && s.href.split("#").pop().trim(), W = !(!ne(s, "content") || !s.content) && s.content;
        if (W && (oe(W) && (y = E('<div class="ginlined-content">'.concat(W, "</div>"))), K(W))) {
          W.style.display == "none" && (W.style.display = "block");
          var B = document.createElement("div");
          B.className = "ginlined-content", B.appendChild(W), y = B;
        }
        if (P) {
          var Y = document.getElementById(P);
          if (!Y) return !1;
          var X = Y.cloneNode(!0);
          X.style.height = s.height, X.style.maxWidth = s.width, m(X, "ginlined-content"), y = X;
        }
        if (!y) return console.error("Unable to append inline slide content", s), !1;
        A.style.height = s.height, A.style.width = s.width, A.appendChild(y), this.events["inlineclose" + P] = g("click", { onElement: A.querySelectorAll(".gtrigger-close"), withCallback: function(Z) {
          Z.preventDefault(), C.close();
        } }), V(h) && h();
      }
      function qt(i, s, c, h) {
        var y = i.querySelector(".gslide-media"), C = function(A) {
          var P = A.url, W = A.allow, B = A.callback, Y = A.appendTo, X = document.createElement("iframe");
          return X.className = "vimeo-video gvideo", X.src = P, X.style.width = "100%", X.style.height = "100%", W && X.setAttribute("allow", W), X.onload = function() {
            X.onload = null, m(X, "node-ready"), V(B) && B();
          }, Y && Y.appendChild(X), X;
        }({ url: s.href, callback: h });
        y.parentNode.style.maxWidth = s.width, y.parentNode.style.height = s.height, y.appendChild(C);
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
          var y = f(h, i);
          return this.setSize(y, s), y;
        }
        var C = "", A = i.getAttribute("data-glightbox"), P = i.nodeName.toLowerCase();
        if (P === "a" && (C = i.href), P === "img" && (C = i.src, h.alt = i.alt), h.href = C, u(h, function(ee, te) {
          ne(s, te) && te !== "width" && (h[te] = s[te]);
          var xe = i.dataset[te];
          fe(xe) || (h[te] = c.sanitizeValue(xe));
        }), h.content && (h.type = "inline"), !h.type && C && (h.type = this.sourceType(C)), fe(A)) {
          if (!h.title && P == "a") {
            var W = i.title;
            fe(W) || W === "" || (h.title = W);
          }
          if (!h.title && P == "img") {
            var B = i.alt;
            fe(B) || B === "" || (h.title = B);
          }
        } else {
          var Y = [];
          u(h, function(ee, te) {
            Y.push(";\\s?" + te);
          }), Y = Y.join("\\s?:|"), A.trim() !== "" && u(h, function(ee, te) {
            var xe = A, qe = new RegExp("s?" + te + "s?:s?(.*?)(" + Y + "s?:|$)"), Fe = xe.match(qe);
            if (Fe && Fe.length && Fe[1]) {
              var rt = Fe[1].trim().replace(/;\s*$/, "");
              h[te] = c.sanitizeValue(rt);
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
        var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, h = i.type == "video" ? this.checkSize(s.videosWidth) : this.checkSize(s.width), y = this.checkSize(s.height);
        return i.width = ne(i, "width") && i.width !== "" ? this.checkSize(i.width) : h, i.height = ne(i, "height") && i.height !== "" ? this.checkSize(i.height) : y, c && i.type == "image" && (i._hasCustomWidth = !!c.dataset.width, i._hasCustomHeight = !!c.dataset.height), i;
      } }, { key: "checkSize", value: function(i) {
        return ve(i) ? "".concat(i, "px") : i;
      } }, { key: "sanitizeValue", value: function(i) {
        return i !== "true" && i !== "false" ? i : i === "true";
      } }]), ft = r(function i(s, c, h) {
        n(this, i), this.element = s, this.instance = c, this.index = h;
      }, [{ key: "setContent", value: function() {
        var i = this, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (k(s, "loaded")) return !1;
        var h = this.instance.settings, y = this.slideConfig, C = G();
        V(h.beforeSlideLoad) && h.beforeSlideLoad({ index: this.index, slide: s, player: !1 });
        var A = y.type, P = y.descPosition, W = s.querySelector(".gslide-media"), B = s.querySelector(".gslide-title"), Y = s.querySelector(".gslide-desc"), X = s.querySelector(".gdesc-inner"), Z = c, ee = "gSlideTitle_" + this.index, te = "gSlideDesc_" + this.index;
        if (V(h.afterSlideLoad) && (Z = function() {
          V(c) && c(), h.afterSlideLoad({ index: i.index, slide: s, player: i.instance.getSlidePlayerInstance(i.index) });
        }), y.title == "" && y.description == "" ? X && X.parentNode.parentNode.removeChild(X.parentNode) : (B && y.title !== "" ? (B.id = ee, B.innerHTML = y.title) : B.parentNode.removeChild(B), Y && y.description !== "" ? (Y.id = te, C && h.moreLength > 0 ? (y.smallDescription = this.slideShortDesc(y.description, h.moreLength, h.moreText), Y.innerHTML = y.smallDescription, this.descriptionEvents(Y, y)) : Y.innerHTML = y.description) : Y.parentNode.removeChild(Y), m(W.parentNode, "desc-".concat(P)), m(X.parentNode, "description-".concat(P))), m(W, "gslide-".concat(A)), m(s, "loaded"), A !== "video") {
          if (A !== "external") return A === "inline" ? (en.apply(this.instance, [s, y, this.index, Z]), void (y.draggable && new zt({ dragEl: s.querySelector(".gslide-inline"), toleranceX: h.dragToleranceX, toleranceY: h.dragToleranceY, slide: s, instance: this.instance }))) : void (A !== "image" ? V(Z) && Z() : Qt(s, y, this.index, function() {
            var xe = s.querySelector("img");
            y.draggable && new zt({ dragEl: xe, toleranceX: h.dragToleranceX, toleranceY: h.dragToleranceY, slide: s, instance: i.instance }), y.zoomable && xe.naturalWidth > xe.offsetWidth && (m(xe, "zoomable"), new Zt(xe, s, function() {
              i.instance.resize();
            })), V(Z) && Z();
          }));
          qt.apply(this, [s, y, this.index, Z]);
        } else xn.apply(this.instance, [s, y, this.index, Z]);
      } }, { key: "slideShortDesc", value: function(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], h = document.createElement("div");
        h.innerHTML = i;
        var y = h.innerText, C = c;
        if ((i = y.trim()).length <= s) return i;
        var A = i.substr(0, s - 1);
        return C ? (h = null, A + '... <a href="#" class="desc-more">' + c + "</a>") : A;
      } }, { key: "descriptionEvents", value: function(i, s) {
        var c = this, h = i.querySelector(".desc-more");
        if (!h) return !1;
        g("click", { onElement: h, withCallback: function(y, C) {
          y.preventDefault();
          var A = document.body, P = S(C, ".gslide-desc");
          if (!P) return !1;
          P.innerHTML = s.description, m(A, "gdesc-open");
          var W = g("click", { onElement: [A, S(P, ".gslide-description")], withCallback: function(B, Y) {
            B.target.nodeName.toLowerCase() !== "a" && (w(A, "gdesc-open"), m(A, "gdesc-closed"), P.innerHTML = s.smallDescription, c.descriptionEvents(P, s), setTimeout(function() {
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
        var c = function(h, y) {
          var C = ht(h) * ht(y);
          if (C === 0) return 0;
          var A = function(P, W) {
            return P.x * W.x + P.y * W.y;
          }(h, y) / C;
          return A > 1 && (A = 1), Math.acos(A);
        }(i, s);
        return function(h, y) {
          return h.x * y.y - y.x * h.y;
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
          var s = this.preV, c = i.touches.length, h = i.touches[0].pageX, y = i.touches[0].pageY;
          if (this.isDoubleTap = !1, c > 1) {
            var C = i.touches[1].pageX, A = i.touches[1].pageY, P = { x: i.touches[1].pageX - h, y: i.touches[1].pageY - y };
            s.x !== null && (this.pinchStartLen > 0 && (i.zoom = ht(P) / this.pinchStartLen, this.pinch.dispatch(i, this.element)), i.angle = nn(P, s), this.rotate.dispatch(i, this.element)), s.x = P.x, s.y = P.y, this.x2 !== null && this.sx2 !== null ? (i.deltaX = (h - this.x2 + C - this.sx2) / 2, i.deltaY = (y - this.y2 + A - this.sy2) / 2) : (i.deltaX = 0, i.deltaY = 0), this.twoFingerPressMove.dispatch(i, this.element), this.sx2 = C, this.sy2 = A;
          } else {
            if (this.x2 !== null) {
              i.deltaX = h - this.x2, i.deltaY = y - this.y2;
              var W = Math.abs(this.x1 - this.x2), B = Math.abs(this.y1 - this.y2);
              (W > 10 || B > 10) && (this._preventTap = !0);
            } else i.deltaX = 0, i.deltaY = 0;
            this.pressMove.dispatch(i, this.element);
          }
          this.touchMove.dispatch(i, this.element), this._cancelLongTap(), this.x2 = h, this.y2 = y, c > 1 && i.preventDefault();
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
      function ot(i) {
        var s = function() {
          var A, P = document.createElement("fakeelement"), W = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
          for (A in W) if (P.style[A] !== void 0) return W[A];
        }(), c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, h = k(i, "gslide-media") ? i : i.querySelector(".gslide-media"), y = S(h, ".ginner-container"), C = i.querySelector(".gslide-description");
        c > 769 && (h = y), m(h, "greset"), _(h, "translate3d(0, 0, 0)"), g(s, { onElement: h, once: !0, withCallback: function(A, P) {
          w(h, "greset");
        } }), h.style.opacity = "", C && (C.style.opacity = "");
      }
      function on(i) {
        if (i.events.hasOwnProperty("touch")) return !1;
        var s, c, h, y = N(), C = y.width, A = y.height, P = !1, W = null, B = null, Y = null, X = !1, Z = 1, ee = 1, te = !1, xe = !1, qe = null, Fe = null, rt = null, Le = null, st = 0, at = 0, rn = !1, Ht = !1, Xe = {}, Ge = {}, Di = 0, Mi = 0, Rr = document.getElementById("glightbox-slider"), kn = document.querySelector(".goverlay"), Dr = new mt(Rr, { touchStart: function(he) {
          if (P = !0, (k(he.targetTouches[0].target, "ginner-container") || S(he.targetTouches[0].target, ".gslide-desc") || he.targetTouches[0].target.nodeName.toLowerCase() == "a") && (P = !1), S(he.targetTouches[0].target, ".gslide-inline") && !k(he.targetTouches[0].target.parentNode, "gslide-inline") && (P = !1), P) {
            if (Ge = he.targetTouches[0], Xe.pageX = he.targetTouches[0].pageX, Xe.pageY = he.targetTouches[0].pageY, Di = he.targetTouches[0].clientX, Mi = he.targetTouches[0].clientY, W = i.activeSlide, B = W.querySelector(".gslide-media"), h = W.querySelector(".gslide-inline"), Y = null, k(B, "gslide-image") && (Y = B.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (B = W.querySelector(".ginner-container")), w(kn, "greset"), he.pageX > 20 && he.pageX < window.innerWidth - 20) return;
            he.preventDefault();
          }
        }, touchMove: function(he) {
          if (P && (Ge = he.targetTouches[0], !te && !xe)) {
            if (h && h.offsetHeight > A) {
              var Ne = Xe.pageX - Ge.pageX;
              if (Math.abs(Ne) <= 13) return !1;
            }
            X = !0;
            var pt, Tn = he.targetTouches[0].clientX, Mr = he.targetTouches[0].clientY, Fr = Di - Tn, zr = Mi - Mr;
            if (Math.abs(Fr) > Math.abs(zr) ? (rn = !1, Ht = !0) : (Ht = !1, rn = !0), s = Ge.pageX - Xe.pageX, st = 100 * s / C, c = Ge.pageY - Xe.pageY, at = 100 * c / A, rn && Y && (pt = 1 - Math.abs(c) / A, kn.style.opacity = pt, i.settings.touchFollowAxis && (st = 0)), Ht && (pt = 1 - Math.abs(s) / C, B.style.opacity = pt, i.settings.touchFollowAxis && (at = 0)), !Y) return _(B, "translate3d(".concat(st, "%, 0, 0)"));
            _(B, "translate3d(".concat(st, "%, ").concat(at, "%, 0)"));
          }
        }, touchEnd: function() {
          if (P) {
            if (X = !1, xe || te) return rt = qe, void (Le = Fe);
            var he = Math.abs(parseInt(at)), Ne = Math.abs(parseInt(st));
            if (!(he > 29 && Y)) return he < 29 && Ne < 25 ? (m(kn, "greset"), kn.style.opacity = 1, ot(B)) : void 0;
            i.close();
          }
        }, multipointEnd: function() {
          setTimeout(function() {
            te = !1;
          }, 50);
        }, multipointStart: function() {
          te = !0, Z = ee || 1;
        }, pinch: function(he) {
          if (!Y || X) return !1;
          te = !0, Y.scaleX = Y.scaleY = Z * he.zoom;
          var Ne = Z * he.zoom;
          if (xe = !0, Ne <= 1) return xe = !1, Ne = 1, Le = null, rt = null, qe = null, Fe = null, void Y.setAttribute("style", "");
          Ne > 4.5 && (Ne = 4.5), Y.style.transform = "scale3d(".concat(Ne, ", ").concat(Ne, ", 1)"), ee = Ne;
        }, pressMove: function(he) {
          if (xe && !te) {
            var Ne = Ge.pageX - Xe.pageX, pt = Ge.pageY - Xe.pageY;
            rt && (Ne += rt), Le && (pt += Le), qe = Ne, Fe = pt;
            var Tn = "translate3d(".concat(Ne, "px, ").concat(pt, "px, 0)");
            ee && (Tn += " scale3d(".concat(ee, ", ").concat(ee, ", 1)")), _(Y, Tn);
          }
        }, swipe: function(he) {
          if (!xe) if (te) te = !1;
          else {
            if (he.direction == "Left") {
              if (i.index == i.elements.length - 1) return ot(B);
              i.nextSlide();
            }
            if (he.direction == "Right") {
              if (i.index == 0) return ot(B);
              i.prevSlide();
            }
          }
        } });
        i.events.touch = Dr;
      }
      var p = G(), v = G() !== null || document.createTouch !== void 0 || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints, R = document.getElementsByTagName("html")[0], j = { selector: ".glightbox", elements: null, skin: "clean", theme: "clean", closeButton: !0, startAt: null, autoplayVideos: !0, autofocusVideos: !0, descPosition: "bottom", width: "900px", height: "506px", videosWidth: "960px", beforeSlideChange: null, afterSlideChange: null, beforeSlideLoad: null, afterSlideLoad: null, slideInserted: null, slideRemoved: null, slideExtraAttributes: null, onOpen: null, onClose: null, loop: !1, zoomable: !0, draggable: !0, dragAutoSnap: !1, dragToleranceX: 40, dragToleranceY: 65, preload: !0, oneSlidePerOpen: !1, touchNavigation: !0, touchFollowAxis: !0, keyboardNavigation: !0, closeOnOutsideClick: !0, plugins: !1, plyr: { css: "https://cdn.plyr.io/3.6.12/plyr.css", js: "https://cdn.plyr.io/3.6.12/plyr.js", config: { ratio: "16:9", fullscreen: { enabled: !0, iosNative: !0 }, youtube: { noCookie: !0, rel: 0, showinfo: 0, iv_load_policy: 3 }, vimeo: { byline: !1, portrait: !1, title: !1, transparent: !1 } } }, openEffect: "zoom", closeEffect: "zoom", slideEffect: "slide", moreText: "See more", moreLength: 60, cssEfects: { fade: { in: "fadeIn", out: "fadeOut" }, zoom: { in: "zoomIn", out: "zoomOut" }, slide: { in: "slideInRight", out: "slideOutLeft" }, slideBack: { in: "slideInLeft", out: "slideOutRight" }, none: { in: "none", out: "none" } }, svg: { close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>', next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>', prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>' }, slideHTML: `<div class="gslide">
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
</div>` }, ye = r(function i() {
        var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i), this.customOptions = s, this.settings = f(j, s), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1;
      }, [{ key: "init", value: function() {
        var i = this, s = this.getSelector();
        s && (this.baseEvents = g("click", { onElement: s, withCallback: function(c, h) {
          c.preventDefault(), i.open(h);
        } })), this.elements = this.getElements();
      } }, { key: "open", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (this.elements.length === 0) return !1;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var c = ve(s) ? s : this.settings.startAt;
        if (K(i)) {
          var h = i.getAttribute("data-gallery");
          h && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, h)), fe(c) && (c = this.getElementIndex(i)) < 0 && (c = 0);
        }
        ve(c) || (c = 0), this.build(), O(this.overlay, this.settings.openEffect === "none" ? "none" : this.settings.cssEfects.fade.in);
        var y = document.body, C = window.innerWidth - document.documentElement.clientWidth;
        if (C > 0) {
          var A = document.createElement("style");
          A.type = "text/css", A.className = "gcss-styles", A.innerText = ".gscrollbar-fixer {margin-right: ".concat(C, "px}"), document.head.appendChild(A), m(y, "gscrollbar-fixer");
        }
        m(y, "glightbox-open"), m(R, "glightbox-open"), p && (m(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(c, !0), this.elements.length === 1 ? (m(this.prevButton, "glightbox-button-hidden"), m(this.nextButton, "glightbox-button-hidden")) : (w(this.prevButton, "glightbox-button-hidden"), w(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), V(this.settings.onOpen) && this.settings.onOpen(), v && this.settings.touchNavigation && on(this), this.settings.keyboardNavigation && Ft(this);
      } }, { key: "openAt", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        this.open(null, i);
      } }, { key: "showSlide", value: function() {
        var i = this, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        T(this.loader), this.index = parseInt(s);
        var h = this.slidesContainer.querySelector(".current");
        h && w(h, "current"), this.slideAnimateOut();
        var y = this.slidesContainer.querySelectorAll(".gslide")[s];
        if (k(y, "loaded")) this.slideAnimateIn(y, c), I(this.loader);
        else {
          T(this.loader);
          var C = this.elements[s], A = { index: this.index, slide: y, slideNode: y, slideConfig: C.slideConfig, slideIndex: this.index, trigger: C.node, player: null };
          this.trigger("slide_before_load", A), C.instance.setContent(y, function() {
            I(i.loader), i.resize(), i.slideAnimateIn(y, c), i.trigger("slide_after_load", A);
          });
        }
        this.slideDescription = y.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && k(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(s + 1), this.preloadSlide(s - 1)), this.updateNavigationClasses(), this.activeSlide = y;
      } }, { key: "preloadSlide", value: function(i) {
        var s = this;
        if (i < 0 || i > this.elements.length - 1 || fe(this.elements[i])) return !1;
        var c = this.slidesContainer.querySelectorAll(".gslide")[i];
        if (k(c, "loaded")) return !1;
        var h = this.elements[i], y = h.type, C = { index: i, slide: c, slideNode: c, slideConfig: h.slideConfig, slideIndex: i, trigger: h.node, player: null };
        this.trigger("slide_before_load", C), y === "video" || y === "external" ? setTimeout(function() {
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
        var c = new ft(i, this, s), h = c.getConfig(), y = f({}, h), C = c.create(), A = this.elements.length - 1;
        y.index = s, y.node = !1, y.instance = c, y.slideConfig = h, this.elements.splice(s, 0, y);
        var P = null, W = null;
        if (this.slidesContainer) {
          if (s > A) this.slidesContainer.appendChild(C);
          else {
            var B = this.slidesContainer.querySelectorAll(".gslide")[s];
            this.slidesContainer.insertBefore(C, B);
          }
          (this.settings.preload && this.index == 0 && s == 0 || this.index - 1 == s || this.index + 1 == s) && this.preloadSlide(s), this.index === 0 && s === 0 && (this.index = 1), this.updateNavigationClasses(), P = this.slidesContainer.querySelectorAll(".gslide")[s], W = this.getSlidePlayerInstance(s), y.slideNode = P;
        }
        this.trigger("slide_inserted", { index: s, slide: P, slideNode: P, slideConfig: h, slideIndex: s, trigger: null, player: W }), V(this.settings.slideInserted) && this.settings.slideInserted({ index: s, slide: P, player: W });
      } }, { key: "removeSlide", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
        if (i < 0 || i > this.elements.length - 1) return !1;
        var s = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[i];
        s && (this.getActiveSlideIndex() == i && (i == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), s.parentNode.removeChild(s)), this.elements.splice(i, 1), this.trigger("slide_removed", i), V(this.settings.slideRemoved) && this.settings.slideRemoved(i);
      } }, { key: "slideAnimateIn", value: function(i, s) {
        var c = this, h = i.querySelector(".gslide-media"), y = i.querySelector(".gslide-description"), C = { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlide, slideConfig: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, A = { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideConfig: this.elements[this.index].slideConfig, slideIndex: this.index, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) };
        if (h.offsetWidth > 0 && y && (I(y), y.style.display = ""), w(i, this.effectsClasses), s) O(i, this.settings.cssEfects[this.settings.openEffect].in, function() {
          c.settings.autoplayVideos && c.slidePlayerPlay(i), c.trigger("slide_changed", { prev: C, current: A }), V(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [C, A]);
        });
        else {
          var P = this.settings.slideEffect, W = P !== "none" ? this.settings.cssEfects[P].in : P;
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
          var h = i.querySelector(".ginner-container"), y = i.querySelector(".gslide-media"), C = i.querySelector(".gslide-description");
          h.style.transform = "", y.style.transform = "", w(y, "greset"), y.style.opacity = "", C && (C.style.opacity = ""), w(i, "prev");
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
        i && i.length && u(i, function(h, y) {
          var C = new ft(h, s, y), A = C.getConfig(), P = f({}, A);
          P.slideConfig = A, P.instance = C, P.index = y, c.push(P);
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
        this.elements = this.elements ? this.elements : [], !fe(this.settings.elements) && ke(this.settings.elements) && this.settings.elements.length && u(this.settings.elements, function(h, y) {
          var C = new ft(h, i, y), A = C.getConfig(), P = f({}, A);
          P.node = !1, P.index = y, P.instance = C, P.slideConfig = A, s.push(P);
        });
        var c = !1;
        return this.getSelector() && (c = document.querySelectorAll(this.getSelector())), c && u(c, function(h, y) {
          var C = new ft(h, i, y), A = C.getConfig(), P = f({}, A);
          P.node = h, P.index = y, P.instance = C, P.slideConfig = A, P.gallery = h.getAttribute("data-gallery"), s.push(P);
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
        u(s, function(B) {
          B.parentNode == document.body && B.nodeName.charAt(0) !== "#" && B.hasAttribute && !B.hasAttribute("aria-hidden") && (c.push(B), B.setAttribute("aria-hidden", "true"));
        });
        var h = ne(this.settings.svg, "next") ? this.settings.svg.next : "", y = ne(this.settings.svg, "prev") ? this.settings.svg.prev : "", C = ne(this.settings.svg, "close") ? this.settings.svg.close : "", A = this.settings.lightboxHTML;
        A = E(A = (A = (A = A.replace(/{nextSVG}/g, h)).replace(/{prevSVG}/g, y)).replace(/{closeSVG}/g, C)), document.body.appendChild(A);
        var P = document.getElementById("glightbox-body");
        this.modal = P;
        var W = P.querySelector(".gclose");
        this.prevButton = P.querySelector(".gprev"), this.nextButton = P.querySelector(".gnext"), this.overlay = P.querySelector(".goverlay"), this.loader = P.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = c, this.events = {}, m(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && W && (this.events.close = g("click", { onElement: W, withCallback: function(B, Y) {
          B.preventDefault(), i.close();
        } })), W && !this.settings.closeButton && W.parentNode.removeChild(W), this.nextButton && (this.events.next = g("click", { onElement: this.nextButton, withCallback: function(B, Y) {
          B.preventDefault(), i.nextSlide();
        } })), this.prevButton && (this.events.prev = g("click", { onElement: this.prevButton, withCallback: function(B, Y) {
          B.preventDefault(), i.prevSlide();
        } })), this.settings.closeOnOutsideClick && (this.events.outClose = g("click", { onElement: P, withCallback: function(B, Y) {
          i.preventOutsideClick || k(document.body, "glightbox-mobile") || S(B.target, ".ginner-container") || S(B.target, ".gbtn") || k(B.target, "gnext") || k(B.target, "gprev") || i.close();
        } })), u(this.elements, function(B, Y) {
          i.slidesContainer.appendChild(B.instance.create()), B.slideNode = i.slidesContainer.querySelectorAll(".gslide")[Y];
        }), v && m(document.body, "glightbox-touch"), this.events.resize = g("resize", { onElement: window, withCallback: function() {
          i.resize();
        } }), this.built = !0;
      } }, { key: "resize", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        if ((i = i || this.activeSlide) && !k(i, "zoomed")) {
          var s = N(), c = i.querySelector(".gvideo-wrapper"), h = i.querySelector(".gslide-image"), y = this.slideDescription, C = s.width, A = s.height;
          if (C <= 768 ? m(document.body, "glightbox-mobile") : w(document.body, "glightbox-mobile"), c || h) {
            var P = !1;
            if (y && (k(y, "description-bottom") || k(y, "description-top")) && !k(y, "gabsolute") && (P = !0), h) {
              if (C <= 768) h.querySelector("img");
              else if (P) {
                var W, B, Y = y.offsetHeight, X = h.querySelector("img"), Z = (W = this.elements[this.index]) === null || W === void 0 ? void 0 : W.node, ee = "100vh";
                Z && (ee = (B = Z.getAttribute("data-height")) !== null && B !== void 0 ? B : ee), X.setAttribute("style", "max-height: calc(".concat(ee, " - ").concat(Y, "px)")), y.setAttribute("style", "max-width: ".concat(X.offsetWidth, "px;"));
              }
            }
            if (c) {
              var te = ne(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
              if (!te) {
                var xe = c.clientWidth, qe = c.clientHeight, Fe = xe / qe;
                te = "".concat(xe / Fe, ":").concat(qe / Fe);
              }
              var rt = te.split(":"), Le = this.settings.videosWidth, st = this.settings.videosWidth, at = (st = ve(Le) || Le.indexOf("px") !== -1 ? parseInt(Le) : Le.indexOf("vw") !== -1 ? C * parseInt(Le) / 100 : Le.indexOf("vh") !== -1 ? A * parseInt(Le) / 100 : Le.indexOf("%") !== -1 ? C * parseInt(Le) / 100 : parseInt(c.clientWidth)) / (parseInt(rt[0]) / parseInt(rt[1]));
              if (at = Math.floor(at), P && (A -= y.offsetHeight), st > C || at > A || A < at && C > st) {
                var rn = c.offsetWidth, Ht = c.offsetHeight, Xe = A / Ht, Ge = { width: rn * Xe, height: Ht * Xe };
                c.parentNode.setAttribute("style", "max-width: ".concat(Ge.width, "px")), P && y.setAttribute("style", "max-width: ".concat(Ge.width, "px;"));
              } else c.parentNode.style.maxWidth = "".concat(Le), P && y.setAttribute("style", "max-width: ".concat(Le, ";"));
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
          var y = document.querySelector(".gcss-styles");
          y && y.parentNode.removeChild(y), i.lightboxOpen = !1, i.closing = null;
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
        u(this.apiEvents, function(y, C) {
          var A = y.evt, P = y.once, W = y.callback;
          A == i && (W(c), P && h.push(C));
        }), h.length && u(h, function(y) {
          return s.apiEvents.splice(y, 1);
        });
      } }, { key: "clearAllEvents", value: function() {
        this.apiEvents.splice(0, this.apiEvents.length);
      } }, { key: "version", value: function() {
        return "3.3.1";
      } }]);
      return function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, s = new ye(i);
        return s.init(), s;
      };
    });
  }(In)), In.exports;
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
    return Kt(() => {
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
    }), Ye(
      () => n.modelValue,
      (a) => {
        a ? r.open() : r.close();
      }
    ), Vr(() => {
      r && r.destroy();
    }), (a, l) => pe(a.$slots, "default");
  }
}, Il = { class: "accommodation-type-card" }, $l = ["src", "alt"], Nl = { key: 1 }, Rl = { class: "accommodation-type-card__body" }, Dl = { class: "accommodation-type-card__body-description" }, Ml = { class: "amenities" }, Fl = {
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
    const { t } = Ie(), n = _e(!1), o = () => {
      n.value = !0;
    };
    return (r, a) => (L(), D("article", Il, [
      x("section", {
        onClick: o,
        class: "accommodation-type-card__img"
      }, [
        M(Ol, {
          modelValue: n.value,
          "onUpdate:modelValue": a[0] || (a[0] = (l) => n.value = l),
          images: e.data.gallery
        }, {
          default: H(() => [
            e.data.thumbnail && e.data.thumbnail.url ? (L(), D("img", {
              key: 0,
              onClick: o,
              src: e.data.thumbnail.url,
              alt: e.data.thumbnail.name
            }, null, 8, $l)) : (L(), D("span", Nl, z(U(t)("accommodationType.thumbnail")), 1))
          ]),
          _: 1
        }, 8, ["modelValue", "images"])
      ]),
      x("section", Rl, [
        x("div", Dl, [
          x("h2", null, z(e.data.name), 1),
          pe(r.$slots, "description", {}, () => [
            x("p", null, z(e.data.description), 1)
          ]),
          x("div", Ml, [
            (L(!0), D(de, null, Ae(e.data.amenities, (l, d) => (L(), D("span", {
              key: d,
              class: "amenities__item"
            }, z(l.title), 1))), 128))
          ])
        ])
      ])
    ]));
  }
}, zl = ["top", "right", "bottom", "left"], bo = ["start", "end"], wo = /* @__PURE__ */ zl.reduce((e, t) => e.concat(t, t + "-" + bo[0], t + "-" + bo[1]), []), vn = Math.min, Ct = Math.max, Bl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ql = {
  start: "end",
  end: "start"
};
function mi(e, t, n) {
  return Ct(e, vn(t, n));
}
function Mt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function nt(e) {
  return e.split("-")[0];
}
function je(e) {
  return e.split("-")[1];
}
function pr(e) {
  return e === "x" ? "y" : "x";
}
function Oi(e) {
  return e === "y" ? "height" : "width";
}
function It(e) {
  return ["top", "bottom"].includes(nt(e)) ? "y" : "x";
}
function Ii(e) {
  return pr(It(e));
}
function gr(e, t, n) {
  n === void 0 && (n = !1);
  const o = je(e), r = Ii(e), a = Oi(r);
  let l = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (l = Mn(l)), [l, Mn(l)];
}
function Hl(e) {
  const t = Mn(e);
  return [Dn(e), t, Dn(t)];
}
function Dn(e) {
  return e.replace(/start|end/g, (t) => ql[t]);
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
  const r = je(e);
  let a = Wl(nt(e), n === "start", o);
  return r && (a = a.map((l) => l + "-" + r), t && (a = a.concat(a.map(Dn)))), a;
}
function Mn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Bl[t]);
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
function vr(e) {
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
  const a = It(t), l = Ii(t), d = Oi(l), f = nt(t), u = a === "y", b = o.x + o.width / 2 - r.width / 2, g = o.y + o.height / 2 - r.height / 2, m = o[d] / 2 - r[d] / 2;
  let w;
  switch (f) {
    case "top":
      w = {
        x: b,
        y: o.y - r.height
      };
      break;
    case "bottom":
      w = {
        x: b,
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
  switch (je(t)) {
    case "start":
      w[l] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      w[l] += m * (n && u ? -1 : 1);
      break;
  }
  return w;
}
const jl = async (e, t, n) => {
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
    x: b,
    y: g
  } = xo(u, o, f), m = o, w = {}, k = 0;
  for (let S = 0; S < d.length; S++) {
    const {
      name: O,
      fn: _
    } = d[S], {
      x: T,
      y: I,
      data: E,
      reset: N
    } = await _({
      x: b,
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
    b = T ?? b, g = I ?? g, w = {
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
      x: b,
      y: g
    } = xo(u, m, f)), S = -1);
  }
  return {
    x: b,
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
    rootBoundary: b = "viewport",
    elementContext: g = "floating",
    altBoundary: m = !1,
    padding: w = 0
  } = Mt(t, e), k = vr(w), O = d[m ? g === "floating" ? "reference" : "floating" : g], _ = cn(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(O))) == null || n ? O : O.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(d.floating)),
    boundary: u,
    rootBoundary: b,
    strategy: f
  })), T = g === "floating" ? {
    x: o,
    y: r,
    width: l.floating.width,
    height: l.floating.height
  } : l.reference, I = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(d.floating)), E = await (a.isElement == null ? void 0 : a.isElement(I)) ? await (a.getScale == null ? void 0 : a.getScale(I)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, N = cn(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: d,
    rect: T,
    offsetParent: I,
    strategy: f
  }) : T);
  return {
    top: (_.top - N.top + k.top) / E.y,
    bottom: (N.bottom - _.bottom + k.bottom) / E.y,
    left: (_.left - N.left + k.left) / E.x,
    right: (N.right - _.right + k.right) / E.x
  };
}
const Yl = (e) => ({
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
      padding: b = 0
    } = Mt(e, t) || {};
    if (u == null)
      return {};
    const g = vr(b), m = {
      x: n,
      y: o
    }, w = Ii(r), k = Oi(w), S = await l.getDimensions(u), O = w === "y", _ = O ? "top" : "left", T = O ? "bottom" : "right", I = O ? "clientHeight" : "clientWidth", E = a.reference[k] + a.reference[w] - m[w] - a.floating[k], N = m[w] - a.reference[w], F = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(u));
    let $ = F ? F[I] : 0;
    (!$ || !await (l.isElement == null ? void 0 : l.isElement(F))) && ($ = d.floating[I] || a.floating[k]);
    const J = E / 2 - N / 2, G = $ / 2 - S[k] / 2 - 1, V = vn(g[_], G), oe = vn(g[T], G), K = V, ke = $ - S[k] - oe, be = $ / 2 - S[k] / 2 + J, Pe = mi(K, be, ke), fe = !f.arrow && je(r) != null && be !== Pe && a.reference[k] / 2 - (be < K ? V : oe) - S[k] / 2 < 0, ne = fe ? be < K ? be - K : be - ke : 0;
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
  return (e ? [...n.filter((r) => je(r) === e), ...n.filter((r) => je(r) !== e)] : n.filter((r) => nt(r) === r)).filter((r) => e ? je(r) === e || (t ? Dn(r) !== r : !1) : !0);
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
        crossAxis: b = !1,
        alignment: g,
        allowedPlacements: m = wo,
        autoAlignment: w = !0,
        ...k
      } = Mt(e, t), S = g !== void 0 || m === wo ? Xl(g || null, w, m) : m, O = await Un(t, k), _ = ((n = l.autoPlacement) == null ? void 0 : n.index) || 0, T = S[_];
      if (T == null)
        return {};
      const I = gr(T, a, await (f.isRTL == null ? void 0 : f.isRTL(u.floating)));
      if (d !== T)
        return {
          reset: {
            placement: S[0]
          }
        };
      const E = [O[nt(T)], O[I[0]], O[I[1]]], N = [...((o = l.autoPlacement) == null ? void 0 : o.overflows) || [], {
        placement: T,
        overflows: E
      }], F = S[_ + 1];
      if (F)
        return {
          data: {
            index: _ + 1,
            overflows: N
          },
          reset: {
            placement: F
          }
        };
      const $ = N.map((V) => {
        const oe = je(V.placement);
        return [V.placement, oe && b ? (
          // Check along the mainAxis and main crossAxis side.
          V.overflows.slice(0, 2).reduce((K, ke) => K + ke, 0)
        ) : (
          // Check only the mainAxis.
          V.overflows[0]
        ), V.overflows];
      }).sort((V, oe) => V[1] - oe[1]), G = ((r = $.filter((V) => V[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        je(V[0]) ? 2 : 3
      ).every((oe) => oe <= 0))[0]) == null ? void 0 : r[0]) || $[0][0];
      return G !== d ? {
        data: {
          index: _ + 1,
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
        mainAxis: b = !0,
        crossAxis: g = !0,
        fallbackPlacements: m,
        fallbackStrategy: w = "bestFit",
        fallbackAxisSideDirection: k = "none",
        flipAlignment: S = !0,
        ...O
      } = Mt(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const _ = nt(r), T = It(d), I = nt(d) === d, E = await (f.isRTL == null ? void 0 : f.isRTL(u.floating)), N = m || (I || !S ? [Mn(d)] : Hl(d)), F = k !== "none";
      !m && F && N.push(...Vl(d, S, k, E));
      const $ = [d, ...N], J = await Un(t, O), G = [];
      let V = ((o = a.flip) == null ? void 0 : o.overflows) || [];
      if (b && G.push(J[_]), g) {
        const be = gr(r, l, E);
        G.push(J[be[0]], J[be[1]]);
      }
      if (V = [...V, {
        placement: r,
        overflows: G
      }], !G.every((be) => be <= 0)) {
        var oe, K;
        const be = (((oe = a.flip) == null ? void 0 : oe.index) || 0) + 1, Pe = $[be];
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
        let fe = (K = V.filter((ne) => ne.overflows[0] <= 0).sort((ne, $e) => ne.overflows[1] - $e.overflows[1])[0]) == null ? void 0 : K.placement;
        if (!fe)
          switch (w) {
            case "bestFit": {
              var ke;
              const ne = (ke = V.filter(($e) => {
                if (F) {
                  const ve = It($e.placement);
                  return ve === T || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ve === "y";
                }
                return !0;
              }).map(($e) => [$e.placement, $e.overflows.filter((ve) => ve > 0).reduce((ve, it) => ve + it, 0)]).sort(($e, ve) => $e[1] - ve[1])[0]) == null ? void 0 : ke[0];
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
  } = e, a = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), l = nt(n), d = je(n), f = It(n) === "y", u = ["left", "top"].includes(l) ? -1 : 1, b = a && f ? -1 : 1, g = Mt(t, e);
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
    x: w * b,
    y: m * u
  } : {
    x: m * u,
    y: w * b
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
              x: _,
              y: T
            } = O;
            return {
              x: _,
              y: T
            };
          }
        },
        ...f
      } = Mt(e, t), u = {
        x: n,
        y: o
      }, b = await Un(t, f), g = It(nt(r)), m = pr(g);
      let w = u[m], k = u[g];
      if (a) {
        const O = m === "y" ? "top" : "left", _ = m === "y" ? "bottom" : "right", T = w + b[O], I = w - b[_];
        w = mi(T, w, I);
      }
      if (l) {
        const O = g === "y" ? "top" : "left", _ = g === "y" ? "bottom" : "right", T = k + b[O], I = k - b[_];
        k = mi(T, k, I);
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
      } = Mt(e, t), b = await Un(t, u), g = nt(r), m = je(r), w = It(r) === "y", {
        width: k,
        height: S
      } = a.floating;
      let O, _;
      g === "top" || g === "bottom" ? (O = g, _ = m === (await (l.isRTL == null ? void 0 : l.isRTL(d.floating)) ? "start" : "end") ? "left" : "right") : (_ = g, O = m === "end" ? "top" : "bottom");
      const T = S - b.top - b.bottom, I = k - b.left - b.right, E = vn(S - b[O], T), N = vn(k - b[_], I), F = !t.middlewareData.shift;
      let $ = E, J = N;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (J = I), (o = t.middlewareData.shift) != null && o.enabled.y && ($ = T), F && !m) {
        const V = Ct(b.left, 0), oe = Ct(b.right, 0), K = Ct(b.top, 0), ke = Ct(b.bottom, 0);
        w ? J = k - 2 * (V !== 0 || oe !== 0 ? V + oe : Ct(b.left, b.right)) : $ = S - 2 * (K !== 0 || ke !== 0 ? K + ke : Ct(b.top, b.bottom));
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
function We(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function et(e) {
  return We(e).getComputedStyle(e);
}
const ko = Math.min, dn = Math.max, Fn = Math.round;
function yr(e) {
  const t = et(e);
  let n = parseFloat(t.width), o = parseFloat(t.height);
  const r = e.offsetWidth, a = e.offsetHeight, l = Fn(n) !== r || Fn(o) !== a;
  return l && (n = r, o = a), { width: n, height: o, fallback: l };
}
function wt(e) {
  return br(e) ? (e.nodeName || "").toLowerCase() : "";
}
let An;
function _r() {
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
function br(e) {
  return e instanceof We(e).Node;
}
function To(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof We(e).ShadowRoot || e instanceof ShadowRoot;
}
function jn(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = et(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !["inline", "contents"].includes(r);
}
function tc(e) {
  return ["table", "td", "th"].includes(wt(e));
}
function pi(e) {
  const t = /firefox/i.test(_r()), n = et(e), o = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!o && o !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some((r) => n.willChange.includes(r)) || ["paint", "layout", "strict", "content"].some((r) => {
    const a = n.contain;
    return a != null && a.includes(r);
  });
}
function wr() {
  return !/^((?!chrome|android).)*safari/i.test(_r());
}
function $i(e) {
  return ["html", "body", "#document"].includes(wt(e));
}
function xr(e) {
  return _t(e) ? e : e.contextElement;
}
const kr = { x: 1, y: 1 };
function jt(e) {
  const t = xr(e);
  if (!tt(t)) return kr;
  const n = t.getBoundingClientRect(), { width: o, height: r, fallback: a } = yr(t);
  let l = (a ? Fn(n.width) : n.width) / o, d = (a ? Fn(n.height) : n.height) / r;
  return l && Number.isFinite(l) || (l = 1), d && Number.isFinite(d) || (d = 1), { x: l, y: d };
}
function yn(e, t, n, o) {
  var r, a;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const l = e.getBoundingClientRect(), d = xr(e);
  let f = kr;
  t && (o ? _t(o) && (f = jt(o)) : f = jt(e));
  const u = d ? We(d) : window, b = !wr() && n;
  let g = (l.left + (b && ((r = u.visualViewport) == null ? void 0 : r.offsetLeft) || 0)) / f.x, m = (l.top + (b && ((a = u.visualViewport) == null ? void 0 : a.offsetTop) || 0)) / f.y, w = l.width / f.x, k = l.height / f.y;
  if (d) {
    const S = We(d), O = o && _t(o) ? We(o) : o;
    let _ = S.frameElement;
    for (; _ && o && O !== S; ) {
      const T = jt(_), I = _.getBoundingClientRect(), E = getComputedStyle(_);
      I.x += (_.clientLeft + parseFloat(E.paddingLeft)) * T.x, I.y += (_.clientTop + parseFloat(E.paddingTop)) * T.y, g *= T.x, m *= T.y, w *= T.x, k *= T.y, g += I.x, m += I.y, _ = We(_).frameElement;
    }
  }
  return { width: w, height: k, top: m, right: g + w, bottom: m + k, left: g, x: g, y: m };
}
function bt(e) {
  return ((br(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Yn(e) {
  return _t(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Tr(e) {
  return yn(bt(e)).left + Yn(e).scrollLeft;
}
function _n(e) {
  if (wt(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || To(e) && e.host || bt(e);
  return To(t) ? t.host : t;
}
function Sr(e) {
  const t = _n(e);
  return $i(t) ? t.ownerDocument.body : tt(t) && jn(t) ? t : Sr(t);
}
function zn(e, t) {
  var n;
  t === void 0 && (t = []);
  const o = Sr(e), r = o === ((n = e.ownerDocument) == null ? void 0 : n.body), a = We(o);
  return r ? t.concat(a, a.visualViewport || [], jn(o) ? o : []) : t.concat(o, zn(o));
}
function So(e, t, n) {
  return t === "viewport" ? cn(function(o, r) {
    const a = We(o), l = bt(o), d = a.visualViewport;
    let f = l.clientWidth, u = l.clientHeight, b = 0, g = 0;
    if (d) {
      f = d.width, u = d.height;
      const m = wr();
      (m || !m && r === "fixed") && (b = d.offsetLeft, g = d.offsetTop);
    }
    return { width: f, height: u, x: b, y: g };
  }(e, n)) : _t(t) ? cn(function(o, r) {
    const a = yn(o, !0, r === "fixed"), l = a.top + o.clientTop, d = a.left + o.clientLeft, f = tt(o) ? jt(o) : { x: 1, y: 1 };
    return { width: o.clientWidth * f.x, height: o.clientHeight * f.y, x: d * f.x, y: l * f.y };
  }(t, n)) : cn(function(o) {
    const r = bt(o), a = Yn(o), l = o.ownerDocument.body, d = dn(r.scrollWidth, r.clientWidth, l.scrollWidth, l.clientWidth), f = dn(r.scrollHeight, r.clientHeight, l.scrollHeight, l.clientHeight);
    let u = -a.scrollLeft + Tr(o);
    const b = -a.scrollTop;
    return et(l).direction === "rtl" && (u += dn(r.clientWidth, l.clientWidth) - d), { width: d, height: f, x: u, y: b };
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
    for (; tt(r) && !$i(r); ) {
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
  if (o || !o && n !== "fixed") if ((wt(t) !== "body" || jn(r)) && (l = Yn(t)), tt(t)) {
    const f = yn(t, !0);
    d.x = f.x + t.clientLeft, d.y = f.y + t.clientTop;
  } else r && (d.x = Tr(r));
  return { x: a.left + l.scrollLeft - d.x, y: a.top + l.scrollTop - d.y, width: a.width, height: a.height };
}
const ic = { getClippingRect: function(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e;
  const a = n === "clippingAncestors" ? function(u, b) {
    const g = b.get(u);
    if (g) return g;
    let m = zn(u).filter((O) => _t(O) && wt(O) !== "body"), w = null;
    const k = et(u).position === "fixed";
    let S = k ? _n(u) : u;
    for (; _t(S) && !$i(S); ) {
      const O = et(S), _ = pi(S);
      (k ? _ || w : _ || O.position !== "static" || !w || !["absolute", "fixed"].includes(w.position)) ? w = O : m = m.filter((T) => T !== S), S = _n(S);
    }
    return b.set(u, m), m;
  }(t, this._c) : [].concat(n), l = [...a, o], d = l[0], f = l.reduce((u, b) => {
    const g = So(t, b, r);
    return u.top = dn(g.top, u.top), u.right = ko(g.right, u.right), u.bottom = ko(g.bottom, u.bottom), u.left = dn(g.left, u.left), u;
  }, So(t, d, r));
  return { width: f.right - f.left, height: f.bottom - f.top, x: f.left, y: f.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: n, strategy: o } = e;
  const r = tt(n), a = bt(n);
  if (n === a) return t;
  let l = { scrollLeft: 0, scrollTop: 0 }, d = { x: 1, y: 1 };
  const f = { x: 0, y: 0 };
  if ((r || !r && o !== "fixed") && ((wt(n) !== "body" || jn(a)) && (l = Yn(n)), tt(n))) {
    const u = yn(n);
    d = jt(n), f.x = u.x + n.clientLeft, f.y = u.y + n.clientTop;
  }
  return { width: t.width * d.x, height: t.height * d.y, x: t.x * d.x - l.scrollLeft * d.x + f.x, y: t.y * d.y - l.scrollTop * d.y + f.y };
}, isElement: _t, getDimensions: function(e) {
  return tt(e) ? yr(e) : e.getBoundingClientRect();
}, getOffsetParent: Co, getDocumentElement: bt, getScale: jt, async getElementRects(e) {
  let { reference: t, floating: n, strategy: o } = e;
  const r = this.getOffsetParent || Co, a = this.getDimensions;
  return { reference: nc(t, await r(n), o), floating: { x: 0, y: 0, ...await a(n) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => et(e).direction === "rtl" }, oc = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = { platform: ic, ...n }, a = { ...r.platform, _c: o };
  return jl(e, t, { ...r, platform: a });
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
let Er = !1;
typeof window < "u" && typeof navigator < "u" && (Er = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
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
const Io = {};
function $o(e) {
  let t = Io[e];
  return t || (t = Io[e] = []), t;
}
let vi = function() {
};
typeof window < "u" && (vi = window.Element);
function ie(e) {
  return function(t) {
    return gi(t.theme, e);
  };
}
const ei = "__floating-vue__popper", Cr = () => $t({
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
      }))), e.middleware.push(Yl({
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
        ...zn(this.$_referenceNode),
        ...zn(this.$_popperNode)
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
        $o(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
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
        const o = $o(n);
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
      if (un >= e.left && un <= e.right && fn >= e.top && fn <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), n = un - vt, o = fn - yt, r = t.left + t.width / 2 - vt + (t.top + t.height / 2) - yt + t.width + t.height, a = vt + n * r, l = yt + o * r;
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
  if (Er) {
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
let vt = 0, yt = 0, un = 0, fn = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  vt = un, yt = fn, un = e.clientX, fn = e.clientY;
}, bn ? {
  passive: !0
} : void 0);
function Pn(e, t, n, o, r, a, l, d) {
  const f = ((l - r) * (t - a) - (d - a) * (e - r)) / ((d - a) * (n - e) - (l - r) * (o - t)), u = ((n - e) * (t - a) - (o - t) * (e - r)) / ((d - a) * (n - e) - (l - r) * (o - t));
  return f >= 0 && f <= 1 && u >= 0 && u <= 1;
}
const dc = {
  extends: Cr()
}, Ni = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
};
function uc(e, t, n, o, r, a) {
  return L(), D("div", {
    ref: "reference",
    class: Je(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    pe(e.$slots, "default", Xr(Gr(e.slotData)))
  ], 2);
}
const fc = /* @__PURE__ */ Ni(dc, [["render", uc]]);
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
let $n;
function yi() {
  yi.init || (yi.init = !0, $n = hc() !== -1);
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
    yi(), Yr(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", $n && this.$el.appendChild(e), e.data = "about:blank", $n || this.$el.appendChild(e);
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
      this._resizeObject && this._resizeObject.onload && (!$n && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const mc = /* @__PURE__ */ Kr("data-v-b329ee4c");
Ur("data-v-b329ee4c");
const pc = {
  class: "resize-observer",
  tabindex: "-1"
};
jr();
const gc = /* @__PURE__ */ mc((e, t, n, o, r, a) => (L(), le("div", pc)));
Xn.render = gc;
Xn.__scopeId = "data-v-b329ee4c";
Xn.__file = "src/components/ResizeObserver.vue";
const Ar = (e = "theme") => ({
  computed: {
    themeClass() {
      return rc(this[e]);
    }
  }
}), vc = $t({
  name: "VPopperContent",
  components: {
    ResizeObserver: Xn
  },
  mixins: [
    Ar()
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
  return L(), D("div", {
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
    onKeyup: t[2] || (t[2] = Jr((d) => e.autoHide && e.$emit("hide"), ["esc"]))
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
        e.mounted ? (L(), D(de, { key: 0 }, [
          x("div", null, [
            pe(e.$slots, "default")
          ]),
          e.handleResize ? (L(), le(l, {
            key: 0,
            onNotify: t[1] || (t[1] = (d) => e.$emit("resize", d))
          })) : ge("", !0)
        ], 64)) : ge("", !0)
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
const Pr = /* @__PURE__ */ Ni(vc, [["render", kc]]), Lr = {
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
const Tc = $t({
  name: "VPopperWrapper",
  components: {
    Popper: fc,
    PopperContent: Pr
  },
  mixins: [
    Lr,
    Ar("finalTheme")
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
  return L(), le(d, wi({ ref: "popper" }, e.$props, {
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
    default: H(({
      popperId: f,
      isShown: u,
      shouldMountContent: b,
      skipTransition: g,
      autoHide: m,
      show: w,
      hide: k,
      handleResize: S,
      onResize: O,
      classes: _,
      result: T
    }) => [
      pe(e.$slots, "default", {
        shown: u,
        show: w,
        hide: k
      }),
      M(l, {
        ref: "popperContent",
        "popper-id": f,
        theme: e.finalTheme,
        shown: u,
        mounted: b,
        "skip-transition": g,
        "auto-hide": m,
        "handle-resize": S,
        classes: _,
        result: T,
        onHide: k,
        onResize: O
      }, {
        default: H(() => [
          pe(e.$slots, "popper", {
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
$t({
  name: "VTooltipDirective",
  components: {
    Popper: Cr(),
    PopperContent: Pr
  },
  mixins: [
    Lr
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
    return (t, n) => (L(), le(U(Cc), wi({
      disabled: e.disabled,
      placement: e.placement,
      container: !1
    }, t.$attrs), {
      popper: H(() => [
        pe(t.$slots, "popper")
      ]),
      default: H(() => [
        pe(t.$slots, "default")
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
}, Ic = { class: "price-block__discount-size" }, $c = { class: "price-block__old" }, Nc = ["innerHTML"], Rc = { class: "price-block__amount" }, Dc = { class: "price-block__icons" }, Mc = {
  key: 0,
  class: "price-block__current"
}, Fc = ["innerHTML"], zc = { key: 1 }, Bc = {
  key: 2,
  class: "price-block__details"
}, qc = { class: "price-block__schedule" }, Hc = {
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
    const t = e, { t: n } = Ie(), o = Ce(() => a(t.originalSellingPrice, "currency")), r = Ce(() => a(t.sellingPrice, "price-block__current-currency")), a = (l, d = "", f = !0) => Pc(l, t.currency, d, f);
    return (l, d) => (L(), D("div", Lc, [
      e.discount ? (L(), D("div", Oc, [
        x("span", Ic, [
          x("span", null, "-" + z(e.discount), 1),
          d[0] || (d[0] = x("span", { class: "price-block__percent" }, "%", -1))
        ]),
        x("span", $c, [
          x("span", {
            class: "amount",
            innerHTML: o.value
          }, null, 8, Nc)
        ])
      ])) : ge("", !0),
      x("div", Rc, [
        x("div", Dc, [
          pe(l.$slots, "icons")
        ]),
        e.sellingPrice ? (L(), D("span", Mc, [
          x("span", {
            class: "price-block__current-amount",
            innerHTML: r.value
          }, null, 8, Fc)
        ])) : e.sellingPrice === 0 ? (L(), D("span", zc, z(U(n)("price.free")), 1)) : ge("", !0),
        e.sellingPrice && e.details ? (L(), D("div", Bc)) : ge("", !0)
      ]),
      x("div", qc, [
        pe(l.$slots, "schedule")
      ])
    ]));
  }
}, Wc = { class: "variant-line" }, Vc = { class: "variant-line__content" }, Uc = { class: "variant-line__actions" }, jc = { class: "variant-line__footer" }, Yc = {
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
    return (t, n) => (L(), D("div", Wc, [
      x("div", Vc, [
        M(Hc, {
          "selling-price": e.price.sellingPrice,
          "original-selling-price": e.price.originalSellingPrice,
          discount: e.price.discount || null,
          currency: e.price.currency
        }, {
          icons: H(() => [
            pe(t.$slots, "icons")
          ]),
          _: 3
        }, 8, ["selling-price", "original-selling-price", "discount", "currency"]),
        x("div", Uc, [
          pe(t.$slots, "default")
        ])
      ]),
      x("div", jc, [
        pe(t.$slots, "action")
      ])
    ]));
  }
};
function Or() {
  const { t: e } = Ie();
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
const Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Kc(e, t) {
  return L(), D("svg", Gc, t[0] || (t[0] = [
    x("path", { d: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z" }, null, -1)
  ]));
}
const Jc = { render: Kc }, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Qc(e, t) {
  return L(), D("svg", Zc, t[0] || (t[0] = [
    x("path", { d: "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56z" }, null, -1)
  ]));
}
const ed = { render: Qc }, td = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function nd(e, t) {
  return L(), D("svg", td, t[0] || (t[0] = [
    x("path", { d: "M382-240 154-468l57-57 171 171 367-367 57 57z" }, null, -1)
  ]));
}
const id = { render: nd }, od = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function rd(e, t) {
  return L(), D("svg", od, t[0] || (t[0] = [
    x("path", { d: "m424-296 282-282-56-56-226 226-114-114-56 56zm56 216q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const sd = { render: rd }, ad = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function ld(e, t) {
  return L(), D("svg", ad, t[0] || (t[0] = [
    x("path", { d: "M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720m-720 80h640v-80H160zm0 160v240h640v-240zm0 240v-480z" }, null, -1)
  ]));
}
const cd = { render: ld }, dd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function ud(e, t) {
  return L(), D("svg", dd, t[0] || (t[0] = [
    x("path", { d: "M320-400q-17 0-28.5-11.5T280-440t11.5-28.5T320-480t28.5 11.5T360-440t-11.5 28.5T320-400m160 0q-17 0-28.5-11.5T440-440t11.5-28.5T480-480t28.5 11.5T520-440t-11.5 28.5T480-400m160 0q-17 0-28.5-11.5T600-440t11.5-28.5T640-480t28.5 11.5T680-440t-11.5 28.5T640-400M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80zm0-80h560v-400H200zm0-480h560v-80H200zm0 0v-80z" }, null, -1)
  ]));
}
const fd = { render: ud }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function md(e, t) {
  return L(), D("svg", hd, t[0] || (t[0] = [
    x("path", { d: "M480-344 240-584l56-56 184 184 184-184 56 56z" }, null, -1)
  ]));
}
const pd = { render: md }, gd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function vd(e, t) {
  return L(), D("svg", gd, t[0] || (t[0] = [
    x("path", { d: "M480-528 296-344l-56-56 240-240 240 240-56 56z" }, null, -1)
  ]));
}
const yd = { render: vd }, _d = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function bd(e, t) {
  return L(), D("svg", _d, t[0] || (t[0] = [
    x("path", { d: "M440-280h80v-240h-80zm40-320q17 0 28.5-11.5T520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600m0 520q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const wd = { render: bd }, xd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function kd(e, t) {
  return L(), D("svg", xd, t[0] || (t[0] = [
    x("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const Td = { render: kd }, Sd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Ed(e, t) {
  return L(), D("svg", Sd, t[0] || (t[0] = [
    x("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112z" }, null, -1)
  ]));
}
const Cd = { render: Ed }, Ad = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Pd(e, t) {
  return L(), D("svg", Ad, t[0] || (t[0] = [
    x("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320" }, null, -1)
  ]));
}
const Ld = { render: Pd }, Od = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Id(e, t) {
  return L(), D("svg", Od, t[0] || (t[0] = [
    x("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const $d = { render: Id }, Nd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Rd(e, t) {
  return L(), D("svg", Nd, t[0] || (t[0] = [
    x("path", { d: "M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800z" }, null, -1)
  ]));
}
const Dd = { render: Rd }, Md = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Fd(e, t) {
  return L(), D("svg", Md, t[0] || (t[0] = [
    x("path", { d: "M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480t-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77 77 114T840-480t-28.5 140.5-77 114-114 77T480-120m112-192L440-464v-216h80v184l128 128z" }, null, -1)
  ]));
}
const zd = { render: Fd }, Bd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function qd(e, t) {
  return L(), D("svg", Bd, t[0] || (t[0] = [
    x("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm320-280 320-200v-80L480-520 160-720v80z" }, null, -1)
  ]));
}
const Hd = { render: qd }, Wd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Vd(e, t) {
  return L(), D("svg", Wd, t[0] || (t[0] = [
    x("path", { d: "M160-120v-480l320-240 320 240v480H560v-280H400v280z" }, null, -1)
  ]));
}
const Ud = { render: Vd }, jd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Yd(e, t) {
  return L(), D("svg", jd, t[0] || (t[0] = [
    x("path", { d: "M120-120v-560h240v-80l120-120 120 120v240h240v400zm80-80h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 320h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 480h80v-80h-80zm0-160h80v-80h-80z" }, null, -1)
  ]));
}
const Xd = { render: Yd }, Gd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Kd(e, t) {
  return L(), D("svg", Gd, t[0] || (t[0] = [
    x("path", { d: "M798-120q-125 0-247-54.5T329-329 174.5-551 120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12" }, null, -1)
  ]));
}
const Jd = { render: Kd }, Zd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Add: Jc,
  ArrowForward: ed,
  Check: id,
  CheckCycle: sd,
  CreditCard: cd,
  DateRange: fd,
  Email: Hd,
  ExpandLess: pd,
  ExpandMore: yd,
  Home: Ud,
  Hotel: Xd,
  Info: wd,
  People: Td,
  Person: Cd,
  PersonOutline: Ld,
  Persons: $d,
  Phone: Jd,
  Restaurant: Dd,
  Restore: zd
}, Symbol.toStringTag, { value: "Module" })), Oe = {
  __name: "BflexIcon",
  props: {
    name: { type: String, required: !0 },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, n = Ce(() => Zd[t.name] || null);
    return (o, r) => (L(), le(Zr(n.value), wi(o.$attrs, {
      class: ["icon", e.small ? "icon--small" : ""]
    }), null, 16, ["class"]));
  }
}, Qd = {
  key: 0,
  class: "icons"
}, eu = {
  key: 1,
  class: "scenario-text"
}, tu = ["title"], nu = {
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
    const { t } = Ie();
    return (n, o) => e.kind === "adults" ? (L(), D("div", Qd, [
      Ze(M(Oe, {
        title: U(t)("ratePlan.scenario.mainBeds"),
        name: "Person"
      }, null, 8, ["title"]), [
        [ni, e.main === 2]
      ]),
      Ze(x("i", null, [
        M(Oe, {
          name: "Person",
          title: U(t)("ratePlan.scenario.mainBeds")
        }, null, 8, ["title"]),
        ae(z(e.main), 1)
      ], 512), [
        [ni, e.main > 2]
      ]),
      M(Oe, {
        name: "Person",
        title: U(t)("ratePlan.scenario.mainBeds")
      }, null, 8, ["title"]),
      e.extraBed ? (L(), D(de, { key: 0 }, [
        M(Oe, { name: "Add" }, {
          default: H(() => o[0] || (o[0] = [
            ae("add")
          ])),
          _: 1
        }),
        M(Oe, {
          name: "PersonOutline",
          title: U(t)("ratePlan.scenario.extraBeds")
        }, null, 8, ["title"])
      ], 64)) : ge("", !0)
    ])) : e.kind === "child" ? (L(), D("span", eu, z(U(t)("ratePlan.scenario.family")), 1)) : (L(), D("div", {
      key: 2,
      class: "icons",
      title: U(t)("ratePlan.scenario.mainExtraBeds")
    }, [
      M(Oe, { name: "People" }),
      M(Oe, { name: "Add" }),
      M(Oe, { name: "PeopleOutline" })
    ], 8, tu));
  }
}, iu = { class: "cycle-loader" }, ou = {
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
    const t = e, { color: n, size: o, margin: r, radius: a } = Qr(t), l = Ce(() => ({
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
    })), d = Ce(() => ({ animationDelay: "0.12s" })), f = Ce(() => ({ animationDelay: "0.24s" })), u = Ce(() => ({ animationDelay: "0.36s" }));
    return (b, g) => (L(), D("div", iu, [
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
}, ru = ["disabled"], su = {
  __name: "BflexButton",
  props: {
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => (L(), D("button", {
      class: "button",
      disabled: e.disabled
    }, [
      e.loading ? (L(), le(ou, {
        key: 0,
        size: "10px",
        color: "#fff"
      })) : pe(t.$slots, "default", { key: 1 })
    ], 8, ru));
  }
}, au = { class: "rate-plan-card" }, lu = { class: "rate-plan-card__wrapper" }, cu = { class: "rate-plan-card__description" }, du = { class: "rate-plan-card__offers" }, uu = { class: "rate-plan-card__offers-item" }, fu = ["title"], hu = { class: "rate-plan-card__offers-item" }, mu = { style: { "margin-right": "0.375rem" } }, pu = {
  key: 0,
  style: { margin: "0 0.375rem" }
}, gu = { class: "rate-plan-card__actions" }, vu = { class: "rate-plan-card__variants" }, yu = { class: "length-of-stay" }, _u = {
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
    const n = e, { t: o } = Ie(), r = _e(!1), a = _e({}), l = Ce(() => {
      var b;
      return ((b = n.data.feed) == null ? void 0 : b.name) !== "ROOM_ONLY";
    }), d = t, f = (b, g) => {
      a.value[g] || (a.value[g] = !0, d("variant-chosen", b));
    }, { formatDescription: u } = Or();
    return (b, g) => (L(), D("div", au, [
      x("div", lu, [
        x("div", cu, [
          x("h2", {
            onClick: g[0] || (g[0] = (m) => r.value = !r.value),
            class: "rate-plan-card__title cursor-pointer"
          }, [
            ae(z(e.data.name) + " ", 1),
            M(Oe, {
              name: r.value ? "ExpandLess" : "ExpandMore"
            }, null, 8, ["name"])
          ]),
          Ze(x("blockquote", null, z(e.data.description), 513), [
            [ni, r.value]
          ]),
          x("div", du, [
            x("div", uu, [
              M(Oe, { name: "Restore" }),
              M(bi, { class: "inline" }, {
                popper: H(() => [
                  (L(!0), D(de, null, Ae(U(u)(e.data.cancellationPolicy.consequences), (m, w) => (L(), D("p", { key: w }, z(m), 1))), 128))
                ]),
                default: H(() => [
                  x("abbr", null, z(e.data.cancellationPolicy.name || ""), 1)
                ]),
                _: 1
              })
            ]),
            e.data.feed ? (L(), D("div", {
              key: 0,
              class: Je(["rate-plan-card__offers-item", { "feed-offer": l.value }]),
              title: e.data.feed.description
            }, [
              M(Oe, { name: "Restaurant" }),
              x("span", null, z(e.data.feed.name ? U(o)(`ratePlan.boardType.${e.data.feed.name}`) : ""), 1)
            ], 10, fu)) : ge("", !0),
            x("div", hu, [
              M(Oe, { name: "CreditCard" }),
              x("span", null, [
                x("strong", mu, z(U(o)("ratePlan.payments")) + ":", 1),
                (L(!0), D(de, null, Ae(e.data.paymentTypes, (m, w) => (L(), D(de, {
                  key: m.name
                }, [
                  M(bi, { class: "inline" }, {
                    popper: H(() => [
                      ae(z(m.description), 1)
                    ]),
                    default: H(() => [
                      x("abbr", null, z(m.name), 1)
                    ]),
                    _: 2
                  }, 1024),
                  e.data.paymentTypes.length - 1 !== w ? (L(), D("strong", pu, z(U(o)("ratePlan.or")), 1)) : ge("", !0)
                ], 64))), 128))
              ])
            ]),
            e.data.extras.length ? (L(!0), D(de, { key: 1 }, Ae(e.data.extras, (m, w) => (L(), D("div", {
              key: w,
              class: "rate-plan-card__offers-item extra-offer",
              style: Pt({ color: m.color })
            }, [
              M(Oe, { name: "Check" }, {
                default: H(() => g[1] || (g[1] = [
                  ae("credit_card")
                ])),
                _: 1
              }),
              x("span", null, z(m.name), 1)
            ], 4))), 128)) : ge("", !0)
          ])
        ])
      ]),
      x("div", gu, [
        pe(b.$slots, "default", {}, () => [
          x("div", vu, [
            x("span", yu, z(U(o)("ratePlan.los", e.lengthOfStay)), 1),
            (L(!0), D(de, null, Ae(e.data.variations || [], (m, w) => (L(), le(Yc, {
              key: w,
              price: m.price
            }, {
              icons: H(() => [
                M(nu, {
                  kind: m.occupancyOptions.kind,
                  main: m.occupancyOptions.main,
                  "extra-bed": m.occupancyOptions.extraBed
                }, null, 8, ["kind", "main", "extra-bed"])
              ]),
              default: H(() => [
                M(su, {
                  loading: a.value[w],
                  disabled: e.disabled && !a.value[w],
                  onClick: () => f(m, w)
                }, {
                  default: H(() => [
                    ae(z(U(o)("ratePlan.action")), 1)
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
}, bu = { class: "rate-plan-list__wrapper" }, wu = {
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
    return (r, a) => (L(), le(ut, { class: "accommodation-offer" }, {
      default: H(() => [
        M(Fl, {
          data: e.accommodationOffer.accommodationType
        }, null, 8, ["data"]),
        x("div", bu, [
          x("div", {
            class: Je(["rate-plan-list", { "rate-plan-list--single": e.accommodationOffer.ratePlans.length <= 1 }])
          }, [
            (L(!0), D(de, null, Ae(e.accommodationOffer.ratePlans, (l) => (L(), D(de, {
              key: l.id
            }, [
              M(De),
              M(_u, {
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
}, xu = {}, ku = { class: "information-block-grid" };
function Tu(e, t) {
  return L(), D("div", ku, [
    pe(e.$slots, "default")
  ]);
}
const Gn = /* @__PURE__ */ wn(xu, [["render", Tu]]), Su = {
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
    const n = e, o = Ce(() => !n.dateRange.start || !n.dateRange.end ? 0 : mr(n.dateRange.start, n.dateRange.end)), r = _e([]), a = _e(!1), { setError: l } = Ot("globalError");
    Ye(
      () => n.dateRange,
      async (b) => {
        if (!(!b.start || !b.end)) {
          a.value = !0;
          try {
            const g = await ls(b.start, b.end, n.promoCode);
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
    const d = t, f = _e(!1), u = async ({ accommodationOffer: b, ratePlan: g, variant: m }) => {
      f.value = !0;
      try {
        const w = await Bo({
          checkInDate: n.dateRange.start,
          checkOutDate: n.dateRange.end,
          accommodationType: b.accommodationType.id,
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
    return (b, g) => (L(), le(Gn, null, {
      default: H(() => [
        a.value ? (L(), D(de, { key: 0 }, Ae(3, (m) => M(Vn, { key: m })), 64)) : (L(!0), D(de, { key: 1 }, Ae(r.value, (m) => (L(), le(wu, {
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
}, Eu = { class: "field-decorator" }, Cu = { class: "field-decorator__input-group" }, Au = { class: "field-decorator__label" }, Pu = {
  key: 0,
  class: "field-decorator__required"
}, Lu = { class: "field-decorator__slot" }, Ou = {
  key: 0,
  class: "field-decorator__hint"
}, Vt = {
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
    return (t, n) => (L(), D("div", Eu, [
      x("div", Cu, [
        x("label", Au, [
          ae(z(e.label), 1),
          e.required ? (L(), D("span", Pu, "*")) : ge("", !0)
        ]),
        x("div", Lu, [
          pe(t.$slots, "default")
        ])
      ]),
      e.hideHint ? ge("", !0) : (L(), D("div", Ou, z(e.hint), 1))
    ]));
  }
}, Iu = {}, $u = { class: "information-block__content" };
function Nu(e, t) {
  return L(), D("div", $u, [
    pe(e.$slots, "default")
  ]);
}
const ze = /* @__PURE__ */ wn(Iu, [["render", Nu]]), Ru = { class: "information-block__header-additional" }, Jt = {
  __name: "BflexHeader",
  props: {
    dense: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, o) => (L(), D("header", {
      class: Je({ dense: t.dense })
    }, [
      x("span", null, [
        pe(n.$slots, "default")
      ]),
      x("span", Ru, [
        pe(n.$slots, "additional")
      ])
    ], 2));
  }
}, Du = { class: "details-info" }, Mu = { class: "details-info__icon" }, Fu = {
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
    return (t, n) => (L(), D("div", Du, [
      x("div", Mu, [
        e.hideIcon ? ge("", !0) : (L(), le(Oe, {
          key: 0,
          name: e.icon
        }, null, 8, ["name"]))
      ]),
      pe(t.$slots, "default")
    ]));
  }
}, zu = {
  id: "customer-data-form",
  class: "customer-data-form"
}, Bu = {
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
    const n = e, { t: o } = Ie(), r = t, a = ii({ ...n.modelValue }), l = ii({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }), d = (f) => {
      const u = f.target;
      l[u.name] = u.validity.valid ? "" : u.validationMessage;
    };
    return Ye(
      a,
      (f) => {
        r("update:modelValue", f);
      },
      { deep: !0 }
    ), (f, u) => (L(), le(ut, null, {
      default: H(() => [
        M(Jt, null, {
          default: H(() => [
            ae(z(U(o)("contactInformation.title")), 1)
          ]),
          _: 1
        }),
        M(De),
        M(ze, null, {
          default: H(() => [
            x("section", zu, [
              M(Vt, {
                label: U(o)("contactInformation.firstName"),
                required: "",
                hint: l.firstName,
                class: Je({ "form-group--error": l.firstName })
              }, {
                default: H(() => [
                  Ze(x("input", {
                    "onUpdate:modelValue": u[0] || (u[0] = (b) => a.firstName = b),
                    type: "text",
                    name: "firstName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: u[1] || (u[1] = (b) => d(b))
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
              M(Vt, {
                label: U(o)("contactInformation.lastName"),
                required: "",
                hint: l.lastName,
                class: Je({ "form-group--error": l.lastName })
              }, {
                default: H(() => [
                  Ze(x("input", {
                    "onUpdate:modelValue": u[2] || (u[2] = (b) => a.lastName = b),
                    type: "text",
                    name: "lastName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: u[3] || (u[3] = (b) => d(b))
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
              M(Vt, {
                label: U(o)("contactInformation.email"),
                required: "",
                hint: l.email,
                class: Je({ "form-group--error": l.email })
              }, {
                default: H(() => [
                  Ze(x("input", {
                    "onUpdate:modelValue": u[4] || (u[4] = (b) => a.email = b),
                    type: "email",
                    name: "email",
                    maxlength: "100",
                    required: "",
                    onInput: u[5] || (u[5] = (b) => d(b))
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
              M(Vt, {
                label: U(o)("contactInformation.phoneNumber"),
                hint: l.phone,
                class: Je({ "form-group--error": l.phone })
              }, {
                default: H(() => [
                  Ze(x("input", {
                    "onUpdate:modelValue": u[6] || (u[6] = (b) => a.phone = b),
                    type: "tel",
                    name: "phone",
                    minlength: "7",
                    maxlength: "100",
                    onInput: u[7] || (u[7] = (b) => d(b))
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
            M(Fu, { icon: "Info" }, {
              default: H(() => [
                ae(z(U(o)("contactInformation.confirmationInfo")), 1)
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
}, qu = { class: "icon-text" }, Hu = { class: "icon-text__icon" }, Wu = { class: "icon-text__text" }, Ut = {
  __name: "BflexIconText",
  props: {
    icon: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    return (t, n) => (L(), D("div", qu, [
      x("span", Hu, [
        M(Oe, { name: e.icon }, null, 8, ["name"])
      ]),
      x("span", Wu, [
        pe(t.$slots, "default")
      ])
    ]));
  }
}, Vu = { class: "text-sm" }, Uu = { class: "accommodation-list__item" }, ju = {
  key: 0,
  style: { "font-size": "0.9em", opacity: "0.7" }
}, Yu = {
  class: "text-sm",
  style: { "line-height": "1.25", "font-weight": "lighter" }
}, Xu = ["onClick"], Gu = {
  key: 1,
  style: { opacity: "0.7" }
}, Ku = {
  key: 0,
  class: "payment-type"
}, Ju = { class: "payment-type__label" }, Zu = { class: "payment-type__variants" }, Qu = ["for"], ef = ["name", "id", "value", "checked", "onChange"], tf = { class: "accommodation-list__total" }, nf = { class: "accommodation-list__payment-rules" }, of = { style: { color: "orangered" } }, rf = { style: { color: "orangered" } }, Ir = {
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
    const n = e, { t: o } = Ie(), r = t, { formatDescription: a } = Or(), l = (u, b) => {
      r("changePaymentType", { request: u, paymentType: b });
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
    }, f = _e({});
    return Kt(() => {
      Object.keys(n.items).forEach((u) => {
        f.value[u] = n.items[u].paymentType.id;
      });
    }), (u, b) => e.loading ? (L(), le(Vn, {
      key: 0,
      "is-result": ""
    })) : (L(), le(ut, {
      key: 1,
      class: "accommodation-list"
    }, {
      default: H(() => [
        M(Jt, null, {
          default: H(() => [
            ae(z(U(o)("chosenAccommodation.title")), 1)
          ]),
          _: 1
        }),
        M(De),
        (L(!0), D(de, null, Ae(e.items, (g, m, w) => (L(), D(de, { key: w }, [
          M(ze, null, {
            default: H(() => [
              x("dl", Vu, [
                x("dt", null, [
                  M(Ut, { icon: "DateRange" }, {
                    default: H(() => [
                      ae(z(U(Tl)(g.checkInDate, g.checkOutDate, e.locale)), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                x("dd", null, [
                  M(Ut, { icon: "Persons" }, {
                    default: H(() => [
                      ae(z(U(o)("chosenAccommodation.adults", g.adults)) + ", " + z(U(o)("chosenAccommodation.children", g.children.length)), 1)
                    ]),
                    _: 2
                  }, 1024)
                ])
              ])
            ]),
            _: 2
          }, 1024),
          M(De),
          M(ze, null, {
            default: H(() => [
              x("dl", Uu, [
                x("dt", null, [
                  x("h3", null, [
                    ae(z(g.accommodationType.name) + " ", 1),
                    g.quantity > 1 ? (L(), D("span", ju, "x" + z(g.quantity), 1)) : ge("", !0)
                  ]),
                  x("div", Yu, [
                    ae(z(g.ratePlan.name), 1),
                    b[0] || (b[0] = x("br", null, null, -1)),
                    M(bi, { class: "inline" }, {
                      popper: H(() => [
                        (L(!0), D(de, null, Ae(U(a)(g.cancellationPolicy.consequences), (k, S) => (L(), D("p", { key: S }, z(k), 1))), 128))
                      ]),
                      default: H(() => [
                        x("abbr", null, z(g.cancellationPolicy.name || ""), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                x("dd", null, [
                  e.dummy ? ge("", !0) : (L(), D("div", {
                    key: 0,
                    onClick: () => d(g),
                    class: "accommodation-list__item-delete text-sm cursor-pointer"
                  }, z(U(o)("chosenAccommodation.delete")), 9, Xu)),
                  g.quantity > 1 ? (L(), D("span", Gu, z(g.quantity) + " x", 1)) : ge("", !0),
                  ae(" " + z(g.summary.total) + " " + z(e.currency), 1)
                ])
              ]),
              e.dummy ? ge("", !0) : (L(), D("div", Ku, [
                x("div", Ju, z(U(o)("chosenAccommodation.willPay")) + ":", 1),
                x("div", Zu, [
                  (L(!0), D(de, null, Ae(g.availablePaymentTypes, (k) => (L(), D("label", {
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
                    }, null, 40, ef),
                    ae(" " + z(k.name), 1)
                  ], 8, Qu))), 128))
                ])
              ]))
            ]),
            _: 2
          }, 1024),
          M(De)
        ], 64))), 128)),
        M(ze, null, {
          default: H(() => [
            x("dl", tf, [
              x("dt", null, z(U(o)("chosenAccommodation.totalAmount")) + ":", 1),
              x("dd", null, [
                x("strong", null, [
                  x("span", null, z(e.summary.total), 1),
                  ae(" " + z(e.currency), 1)
                ])
              ])
            ])
          ]),
          _: 1
        }),
        M(De),
        M(ze, null, {
          default: H(() => [
            x("dl", nf, [
              x("dt", of, z(U(o)("chosenAccommodation.prepaymentAmount")) + ":", 1),
              x("dd", rf, z(e.payment.prepayment) + " " + z(e.currency), 1),
              x("dt", null, z(U(o)("chosenAccommodation.onArrivalAmount")) + ":", 1),
              x("dd", null, [
                x("span", null, z(e.payment.onArrival), 1),
                ae(" " + z(e.currency), 1)
              ])
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, sf = { class: "summary-block" }, af = { class: "summary-block__content" }, lf = { class: "summary-block__content-info" }, cf = { class: "summary-block__content-info__price" }, df = { class: "summary-block__content-info__text" }, uf = {
  class: "button",
  type: "submit"
}, ff = {
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
    const { t: n } = Ie(), o = t;
    return (r, a) => (L(), D("div", sf, [
      x("div", af, [
        x("div", lf, [
          x("div", cf, [
            x("span", null, z(e.totalAmount), 1),
            ae(" " + z(e.currency), 1)
          ]),
          x("div", df, [
            ae(z(U(n)("summary.room", e.accommodationUnits)) + ", " + z(U(n)("summary.los", e.lengthOfStay)) + " ", 1),
            M(Oe, {
              onClick: a[0] || (a[0] = es((l) => o("onAccommodationSummaryClick"), ["stop"])),
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        x("button", uf, z(U(n)("summary.complete")), 1)
      ])
    ]));
  }
}, hf = { class: "text-sm" }, mf = {
  value: "none",
  selected: ""
}, pf = ["value"], gf = {
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
    const n = e, { t: o } = Ie(), r = t, a = ii({ ...n.modelValue }), l = Sl("00:00", "23:00");
    return Ye(
      a,
      (d) => {
        r("update:modelValue", d);
      },
      { deep: !0 }
    ), (d, f) => (L(), le(ut, { class: "customer-request-block" }, {
      default: H(() => [
        M(Jt, null, {
          default: H(() => [
            ae(z(U(o)("customerRequest.title")), 1)
          ]),
          _: 1
        }),
        M(De),
        M(ze, null, {
          default: H(() => [
            M(Vt, {
              label: U(o)("customerRequest.comment")
            }, {
              default: H(() => [
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
        M(De),
        M(ze, null, {
          default: H(() => [
            x("dl", hf, [
              x("dt", null, z(U(o)("customerRequest.checkInOutTime")) + ":", 1),
              x("dd", null, z(U(o)("customerRequest.checkInTimeFrom")) + ": " + z(e.arrivalPolicy.checkInTime) + "; " + z(U(o)("customerRequest.checkOutTimeUntil")) + ": " + z(e.arrivalPolicy.checkOutTime), 1)
            ])
          ]),
          _: 1
        }),
        M(De),
        M(ze, null, {
          default: H(() => [
            M(Vt, {
              label: U(o)("customerRequest.arrivalTime"),
              style: { width: "50%" }
            }, {
              default: H(() => [
                Ze(x("select", {
                  name: "arrivalTime",
                  "onUpdate:modelValue": f[1] || (f[1] = (u) => a.arrivalTime = u)
                }, [
                  x("option", mf, z(U(o)("customerRequest.noneTime")), 1),
                  (L(!0), D(de, null, Ae(U(l), (u) => (L(), D("option", {
                    value: u,
                    key: u
                  }, z(u), 9, pf))), 128))
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
}, vf = { class: "custom-checkbox" }, yf = ["required"], Mo = {
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
    const n = e, o = t, r = Ce({
      get: () => n.modelValue,
      set: (a) => o("update:modelValue", a)
    });
    return (a, l) => (L(), D("label", vf, [
      Ze(x("input", {
        type: "checkbox",
        "onUpdate:modelValue": l[0] || (l[0] = (d) => r.value = d),
        required: e.required
      }, null, 8, yf), [
        [ns, r.value]
      ]),
      l[1] || (l[1] = x("span", { class: "custom-checkbox__box" }, null, -1)),
      pe(a.$slots, "default")
    ]));
  }
}, _f = { class: "agreement-rules-list__rules" }, bf = { class: "agreement-rules-list__agreements" }, wf = {
  key: 0,
  class: "agreement-rules-list__agreements-item"
}, xf = ["href"], kf = {
  key: 0,
  class: "agreement-rules-list__agreements-item"
}, Tf = ["href"], Sf = {
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
    const t = e, { t: n } = Ie(), o = Ce(() => t.agreements.filter((l) => l.combined)), r = _e(!1), a = _e(t.agreements.map(() => !1));
    return (l, d) => (L(), le(ut, { class: "agreement-rules-list" }, {
      default: H(() => [
        M(Jt, null, {
          default: H(() => [
            ae(z(U(n)("accommodationRules.title")), 1)
          ]),
          _: 1
        }),
        e.rules.length > 0 ? (L(), D(de, { key: 0 }, [
          M(De),
          M(ze, null, {
            default: H(() => [
              x("ul", _f, [
                (L(!0), D(de, null, Ae(e.rules, (f, u) => (L(), D("li", { key: u }, z(f.text), 1))), 128))
              ])
            ]),
            _: 1
          })
        ], 64)) : ge("", !0),
        M(De),
        M(ze, null, {
          default: H(() => [
            x("div", bf, [
              o.value.length > 0 ? (L(), D("div", wf, [
                M(Mo, {
                  modelValue: r.value,
                  "onUpdate:modelValue": d[0] || (d[0] = (f) => r.value = f),
                  required: ""
                }, {
                  default: H(() => [
                    x("span", null, [
                      ae(z(U(n)("accommodationRules.agreementSentence")) + " ", 1),
                      (L(!0), D(de, null, Ae(o.value, (f, u) => (L(), D("a", {
                        class: "agreement-rules-list__combined-agreement",
                        target: "_blank",
                        href: f.url,
                        key: u
                      }, z(f.anchor), 9, xf))), 128)),
                      d[1] || (d[1] = ae("."))
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ])) : ge("", !0),
              (L(!0), D(de, null, Ae(e.agreements, (f, u) => (L(), D(de, { key: u }, [
                f.combined === !1 ? (L(), D("div", kf, [
                  M(Mo, {
                    modelValue: a.value[u],
                    "onUpdate:modelValue": (b) => a.value[u] = b,
                    required: f.required
                  }, {
                    default: H(() => [
                      x("span", null, [
                        ae(z(U(n)("accommodationRules.agreementSentenceShort")) + " ", 1),
                        x("a", {
                          target: "_blank",
                          href: f.url
                        }, z(f.anchor), 9, Tf)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "required"])
                ])) : ge("", !0)
              ], 64))), 128))
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, Ef = {
  __name: "ConfirmationPage",
  emits: ["released"],
  setup(e, { emit: t }) {
    const n = _e({
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
      ratePlan: _,
      adults: T,
      children: I,
      quantity: E
    }) => {
      f.value = !0;
      try {
        const N = await Bo({
          checkInDate: k,
          checkOutDate: S,
          accommodationType: O,
          ratePlan: _,
          adults: T,
          children: I,
          quantity: E
        });
        u.value = N.cart, N.cart.requests.length === 0 && o("released", { action: hr, result: N });
      } catch (N) {
        b(N);
      } finally {
        f.value = !1;
      }
    }, a = _e(null), l = Ot("settings"), d = async (k) => {
      if (k.preventDefault(), a.value.reportValidity()) {
        f.value = !0;
        try {
          const S = await us({
            customer: {
              ...n.value.customerInfo
            },
            comment: n.value.comment,
            arrivalTime: n.value.arrivalTime
          });
          S && S.reservations && o("released", { action: On, result: S });
        } catch (S) {
          b(S);
        } finally {
          f.value = !1;
        }
      }
    }, f = _e(!0), u = _e(null), { setError: b } = Ot("globalError");
    Kt(async () => {
      f.value = !0;
      try {
        const k = await cs();
        u.value = k.cart;
      } catch (k) {
        b(k);
      } finally {
        f.value = !1;
      }
    });
    const g = async (k) => {
      try {
        const S = await ds(k);
        u.value = S.cart;
      } catch (S) {
        b(S);
      }
    }, m = Ce(() => !u.value || !u.value.requests || Object.keys(u.value.requests).length === 0 ? 0 : Object.keys(u.value.requests).reduce((k, S) => {
      const O = u.value.requests[S];
      return k + O.quantity;
    }, 0)), w = Ce(() => !u.value || !u.value.requests || Object.keys(u.value.requests).length === 0 ? 0 : mr(
      u.value.requests[Object.keys(u.value.requests)[0]].checkInDate,
      u.value.requests[Object.keys(u.value.requests)[0]].checkOutDate
    ));
    return (k, S) => (L(), D("form", {
      onSubmit: d,
      ref_key: "confirmForm",
      ref: a
    }, [
      M(Gn, null, {
        default: H(() => [
          M(Bu, {
            modelValue: n.value.customerInfo,
            "onUpdate:modelValue": S[0] || (S[0] = (O) => n.value.customerInfo = O)
          }, null, 8, ["modelValue"]),
          u.value ? (L(), le(Ir, {
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
          }, null, 8, ["loading", "cart", "currency", "locale", "payment", "summary", "items"])) : ge("", !0),
          M(gf, {
            modelValue: n.value.customerRequest,
            "onUpdate:modelValue": S[1] || (S[1] = (O) => n.value.customerRequest = O)
          }, null, 8, ["modelValue"]),
          M(Sf, {
            agreements: U(l).hotelRules.agreements,
            rules: U(l).hotelRules.rules
          }, null, 8, ["agreements", "rules"]),
          !f.value && u.value ? (L(), le(ff, {
            key: 1,
            "total-amount": u.value.summary.total,
            currency: u.value.currency,
            "accommodation-units": m.value,
            "length-of-stay": w.value
          }, null, 8, ["total-amount", "currency", "accommodation-units", "length-of-stay"])) : ge("", !0)
        ]),
        _: 1
      })
    ], 544));
  }
}, Cf = { class: "hotel-information" }, Af = ["href"], Pf = { href: "#" }, Lf = {
  __name: "BflexHotelInformationCard",
  props: {
    hotelInfo: {
      type: Object
    }
  },
  setup(e) {
    const { t } = Ie();
    return (n, o) => (L(), le(ut, null, {
      default: H(() => [
        M(Jt, null, {
          default: H(() => [
            ae(z(U(t)("reservation.hotelInfo.title")), 1)
          ]),
          _: 1
        }),
        M(De),
        M(ze, null, {
          default: H(() => [
            x("div", Cf, [
              M(Ut, { icon: "Hotel" }, {
                default: H(() => [
                  ae(z(e.hotelInfo.name), 1)
                ]),
                _: 1
              }),
              M(Ut, { icon: "Home" }, {
                default: H(() => [
                  ae(z(e.hotelInfo.address.address), 1)
                ]),
                _: 1
              }),
              M(Ut, { icon: "Phone" }, {
                default: H(() => [
                  x("a", {
                    href: `tel:${e.hotelInfo.phone}`
                  }, z(e.hotelInfo.phone), 9, Af)
                ]),
                _: 1
              }),
              M(Ut, { icon: "Email" }, {
                default: H(() => [
                  x("a", Pf, z(e.hotelInfo.email), 1)
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
}, Of = { class: "reservation-result" }, If = { class: "reservation-result__title" }, $f = { class: "reservation-result__description" }, Nf = {
  __name: "ResultPage",
  props: {
    sid: {
      type: String,
      required: !0,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = Ie(), o = Ot("settings"), r = _e(null), a = _e(!0), { setError: l } = Ot("globalError"), d = async () => {
      if (t.sid) {
        a.value = !0;
        try {
          const f = await fs({ sid: t.sid });
          r.value = f.reservations;
        } catch (f) {
          l(f);
        } finally {
          a.value = !1;
        }
      }
    };
    return Ye(() => t.sid, d), Kt(d), (f, u) => (L(), le(Gn, null, {
      default: H(() => [
        a.value ? (L(), le(Vn, { key: 0 })) : (L(), D(de, { key: 1 }, [
          x("section", Of, [
            x("div", If, z(U(n)("reservation.title")), 1),
            x("div", $f, z(U(n)("reservation.description")), 1)
          ]),
          M(Ir, {
            items: r.value.reservations,
            summary: r.value.summary,
            payment: r.value.payment,
            locale: U(o).widget.locale,
            dummy: ""
          }, null, 8, ["items", "summary", "payment", "locale"]),
          r.value.note ? (L(), le(ut, { key: 0 }, {
            default: H(() => [
              M(Jt, null, {
                default: H(() => [
                  ae(z(U(n)("reservation.customerRequest")), 1)
                ]),
                _: 1
              }),
              M(De),
              M(ze, null, {
                default: H(() => [
                  ae(z(r.value.note), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : ge("", !0),
          M(Lf, {
            "hotel-info": U(o).hotelInfo
          }, null, 8, ["hotel-info"])
        ], 64))
      ]),
      _: 1
    }));
  }
}, Rf = { id: "bflex-booking-widget" }, Df = { class: "booking-widget" }, Mf = { class: "booking-widget__content" }, $r = {
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
    const t = e, n = _e({
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
    zo("settings", n);
    const o = [ln, On, yo], r = _e(null), a = (m) => {
      if (!m)
        r.value = ln;
      else {
        const w = o.indexOf(m);
        w >= 0 && w < o.length - 1 && (r.value = o[w + 1]);
      }
      window.dispatchEvent(
        new CustomEvent("bflex:booking-widget:action", { detail: { action: r.value } })
      );
    }, l = _e(!1), d = _e(""), f = _e({
      start: t.start,
      end: t.end,
      promoCode: t.promoCode
    });
    Ye(
      () => ({ start: t.start, end: t.end, promoCode: t.promoCode }),
      () => {
        f.value = {
          start: t.start,
          end: t.end,
          promoCode: t.promoCode
        };
      }
    ), Ye(
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
    const { setError: u } = Ot("globalError"), b = (m) => {
      const { start: w, end: k, promoCode: S } = m.detail;
      f.value = { start: w, end: k, promoCode: S }, m.stopPropagation();
    };
    Kt(async () => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:ready")), window.addEventListener("bflex:search-bar:search", b), l.value = !0;
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
    }), Bn(() => {
      window.removeEventListener("bflex:search-bar:search", b);
    });
    const g = ({ action: m, result: w }) => {
      m === hr ? a() : (m === On && (d.value = w.reservations[0]), a(m));
    };
    return (m, w) => (L(), D("main", Rf, [
      x("div", Df, [
        x("section", Mf, [
          l.value ? (L(), le(Gn, { key: 0 }, {
            default: H(() => [
              (L(), D(de, null, Ae(3, (k) => M(Vn, { key: k })), 64))
            ]),
            _: 1
          })) : ge("", !0),
          r.value === U(ln) ? (L(), le(Su, {
            key: 1,
            dateRange: f.value,
            promoCode: e.promoCode,
            onReleased: g
          }, null, 8, ["dateRange", "promoCode"])) : r.value === U(On) ? (L(), le(Ef, {
            key: 2,
            onReleased: g
          })) : r.value === U(yo) ? (L(), le(Nf, {
            key: 3,
            sid: d.value,
            onReleased: g
          }, null, 8, ["sid"])) : ge("", !0)
        ])
      ])
    ]));
  }
}, Ff = { style: { display: "flex", "flex-direction": "column", "min-height": "300px", "justify-content": "center", "align-items": "center" } }, Nr = {
  __name: "BflexErrorProvider",
  setup(e) {
    const { t } = Ie(), n = _e(null);
    zo("globalError", { setError: (l) => {
      n.value = l;
    }, clearError: () => {
      n.value = null;
    } });
    const a = () => {
      location.reload();
    };
    return (l, d) => n.value ? (L(), le(ut, { key: 1 }, {
      default: H(() => [
        M(ze, null, {
          default: H(() => [
            x("section", Ff, [
              x("h1", null, z(U(t)("globalError.title")), 1),
              x("p", null, z(U(t)("globalError.description")), 1),
              x("button", {
                class: "button",
                onClick: a
              }, z(U(t)("globalError.reload")), 1)
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : pe(l.$slots, "default", { key: 0 });
  }
}, zf = '@charset "UTF-8";.glightbox-container{width:100%;height:100%;position:fixed;top:0;left:0;z-index:999999!important;overflow:hidden;-ms-touch-action:none;touch-action:none;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;outline:none}.glightbox-container.inactive{display:none}.glightbox-container .gcontainer{position:relative;width:100%;height:100%;z-index:9999;overflow:hidden}.glightbox-container .gslider{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease;height:100%;left:0;top:0;width:100%;position:relative;overflow:hidden;display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}.glightbox-container .gslide{width:100%;position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;opacity:0}.glightbox-container .gslide.current{opacity:1;z-index:99999;position:relative}.glightbox-container .gslide.prev{opacity:1;z-index:9999}.glightbox-container .gslide-inner-content{width:100%}.glightbox-container .ginner-container{position:relative;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;max-width:100%;margin:auto;height:100vh}.glightbox-container .ginner-container.gvideo-container{width:100%}.glightbox-container .ginner-container.desc-bottom,.glightbox-container .ginner-container.desc-top{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.glightbox-container .ginner-container.desc-left,.glightbox-container .ginner-container.desc-right{max-width:100%!important}.gslide iframe,.gslide video{outline:none!important;border:none;min-height:165px;-webkit-overflow-scrolling:touch;-ms-touch-action:auto;touch-action:auto}.gslide:not(.current){pointer-events:none}.gslide-image{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gslide-image img{max-height:100vh;display:block;padding:0;float:none;outline:none;border:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;max-width:100vw;width:auto;height:auto;-o-object-fit:cover;object-fit:cover;-ms-touch-action:none;touch-action:none;margin:auto;min-width:200px}.desc-top .gslide-image img,.desc-bottom .gslide-image img{width:auto}.desc-left .gslide-image img,.desc-right .gslide-image img{width:auto;max-width:100%}.gslide-image img.zoomable{position:relative}.gslide-image img.dragging{cursor:-webkit-grabbing!important;cursor:grabbing!important;-webkit-transition:none;transition:none}.gslide-video{position:relative;max-width:100vh;width:100%!important}.gslide-video .plyr__poster-enabled.plyr--loading .plyr__poster{display:none}.gslide-video .gvideo-wrapper{width:100%;margin:auto}.gslide-video:before{content:"";position:absolute;width:100%;height:100%;background:#ff000057;display:none}.gslide-video.playing:before{display:none}.gslide-video.fullscreen{max-width:100%!important;min-width:100%;height:75vh}.gslide-video.fullscreen video{max-width:100%!important;width:100%!important}.gslide-inline{background:#fff;text-align:left;max-height:calc(100vh - 40px);overflow:auto;max-width:100%;margin:auto}.gslide-inline .ginlined-content{padding:20px;width:100%}.gslide-inline .dragging{cursor:-webkit-grabbing!important;cursor:grabbing!important;-webkit-transition:none;transition:none}.ginlined-content{overflow:auto;display:block!important;opacity:1}.gslide-external{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;min-width:100%;background:#fff;padding:0;overflow:auto;max-height:75vh;height:100%}.gslide-media{display:-webkit-box;display:-ms-flexbox;display:flex;width:auto}.zoomed .gslide-media{-webkit-box-shadow:none!important;box-shadow:none!important}.desc-top .gslide-media,.desc-bottom .gslide-media{margin:0 auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.gslide-description{position:relative;-webkit-box-flex:1;-ms-flex:1 0 100%;flex:1 0 100%}.gslide-description.description-left,.gslide-description.description-right{max-width:100%}.gslide-description.description-bottom,.gslide-description.description-top{margin:0 auto;width:100%}.gslide-description p{margin-bottom:12px}.gslide-description p:last-child{margin-bottom:0}.zoomed .gslide-description,.glightbox-button-hidden{display:none}.glightbox-mobile .glightbox-container .gslide-description{height:auto!important;width:100%;position:absolute;bottom:0;padding:19px 11px 50px;max-width:100vw!important;-webkit-box-ordinal-group:3!important;-ms-flex-order:2!important;order:2!important;max-height:78vh;overflow:auto!important;background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0)),to(rgba(0,0,0,.75)));background:linear-gradient(to bottom,#0000,#000000bf);-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.glightbox-mobile .glightbox-container .gslide-title{color:#fff;font-size:1em}.glightbox-mobile .glightbox-container .gslide-desc{color:#a1a1a1}.glightbox-mobile .glightbox-container .gslide-desc a{color:#fff;font-weight:700}.glightbox-mobile .glightbox-container .gslide-desc *{color:inherit}.glightbox-mobile .glightbox-container .gslide-desc .desc-more{color:#fff;opacity:.4}.gdesc-open .gslide-media{-webkit-transition:opacity .5s ease;transition:opacity .5s ease;opacity:.4}.gdesc-open .gdesc-inner{padding-bottom:30px}.gdesc-closed .gslide-media{-webkit-transition:opacity .5s ease;transition:opacity .5s ease;opacity:1}.greset{-webkit-transition:all .3s ease;transition:all .3s ease}.gabsolute{position:absolute}.grelative{position:relative}.glightbox-desc{display:none!important}.glightbox-open{overflow:hidden}.gloader{height:25px;width:25px;-webkit-animation:lightboxLoader .8s infinite linear;animation:lightboxLoader .8s infinite linear;border:2px solid #fff;border-right-color:transparent;border-radius:50%;position:absolute;display:block;z-index:9999;left:0;right:0;margin:0 auto;top:47%}.goverlay{width:100%;height:calc(100vh + 1px);position:fixed;top:-1px;left:0;background:#000;will-change:opacity}.glightbox-mobile .goverlay{background:#000}.gprev,.gnext,.gclose{z-index:99999;cursor:pointer;width:26px;height:44px;border:none;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.gprev svg,.gnext svg,.gclose svg{display:block;width:25px;height:auto;margin:0;padding:0}.gprev.disabled,.gnext.disabled,.gclose.disabled{opacity:.1}.gprev .garrow,.gnext .garrow,.gclose .garrow{stroke:#fff}.gbtn.focused{outline:2px solid #0f3d81}iframe.wait-autoplay{opacity:0}.glightbox-closing .gnext,.glightbox-closing .gprev,.glightbox-closing .gclose{opacity:0!important}.glightbox-clean .gslide-description{background:#fff}.glightbox-clean .gdesc-inner{padding:22px 20px}.glightbox-clean .gslide-title{font-size:1em;font-weight:400;font-family:arial;color:#000;margin-bottom:19px;line-height:1.4em}.glightbox-clean .gslide-desc{font-size:.86em;margin-bottom:0;font-family:arial;line-height:1.4em}.glightbox-clean .gslide-video{background:#000}.glightbox-clean .gprev,.glightbox-clean .gnext,.glightbox-clean .gclose{background-color:#000000bf;border-radius:4px}.glightbox-clean .gprev path,.glightbox-clean .gnext path,.glightbox-clean .gclose path{fill:#fff}.glightbox-clean .gprev{position:absolute;top:-100%;left:30px;width:40px;height:50px}.glightbox-clean .gnext{position:absolute;top:-100%;right:30px;width:40px;height:50px}.glightbox-clean .gclose{width:35px;height:35px;top:15px;right:10px;position:absolute}.glightbox-clean .gclose svg{width:18px;height:auto}.glightbox-clean .gclose:hover{opacity:1}.gfadeIn{-webkit-animation:gfadeIn .5s ease;animation:gfadeIn .5s ease}.gfadeOut{-webkit-animation:gfadeOut .5s ease;animation:gfadeOut .5s ease}.gslideOutLeft{-webkit-animation:gslideOutLeft .3s ease;animation:gslideOutLeft .3s ease}.gslideInLeft{-webkit-animation:gslideInLeft .3s ease;animation:gslideInLeft .3s ease}.gslideOutRight{-webkit-animation:gslideOutRight .3s ease;animation:gslideOutRight .3s ease}.gslideInRight{-webkit-animation:gslideInRight .3s ease;animation:gslideInRight .3s ease}.gzoomIn{-webkit-animation:gzoomIn .5s ease;animation:gzoomIn .5s ease}.gzoomOut{-webkit-animation:gzoomOut .5s ease;animation:gzoomOut .5s ease}@-webkit-keyframes lightboxLoader{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes lightboxLoader{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes gfadeIn{0%{opacity:0}to{opacity:1}}@keyframes gfadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes gfadeOut{0%{opacity:1}to{opacity:0}}@keyframes gfadeOut{0%{opacity:1}to{opacity:0}}@-webkit-keyframes gslideInLeft{0%{opacity:0;-webkit-transform:translate3d(-60%,0,0);transform:translate3d(-60%,0,0)}to{visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@keyframes gslideInLeft{0%{opacity:0;-webkit-transform:translate3d(-60%,0,0);transform:translate3d(-60%,0,0)}to{visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@-webkit-keyframes gslideOutLeft{0%{opacity:1;visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{-webkit-transform:translate3d(-60%,0,0);transform:translate3d(-60%,0,0);opacity:0;visibility:hidden}}@keyframes gslideOutLeft{0%{opacity:1;visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{-webkit-transform:translate3d(-60%,0,0);transform:translate3d(-60%,0,0);opacity:0;visibility:hidden}}@-webkit-keyframes gslideInRight{0%{opacity:0;visibility:visible;-webkit-transform:translate3d(60%,0,0);transform:translate3d(60%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@keyframes gslideInRight{0%{opacity:0;visibility:visible;-webkit-transform:translate3d(60%,0,0);transform:translate3d(60%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@-webkit-keyframes gslideOutRight{0%{opacity:1;visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{-webkit-transform:translate3d(60%,0,0);transform:translate3d(60%,0,0);opacity:0}}@keyframes gslideOutRight{0%{opacity:1;visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{-webkit-transform:translate3d(60%,0,0);transform:translate3d(60%,0,0);opacity:0}}@-webkit-keyframes gzoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:1}}@keyframes gzoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:1}}@-webkit-keyframes gzoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:0}}@keyframes gzoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:0}}@media (min-width: 769px){.glightbox-container .ginner-container{width:auto;height:auto;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.glightbox-container .ginner-container.desc-top .gslide-description{-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0}.glightbox-container .ginner-container.desc-top .gslide-image,.glightbox-container .ginner-container.desc-top .gslide-image img{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.glightbox-container .ginner-container.desc-left .gslide-description{-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0}.glightbox-container .ginner-container.desc-left .gslide-image{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.gslide-image img{max-height:97vh;max-width:100%}.gslide-image img.zoomable{cursor:-webkit-zoom-in;cursor:zoom-in}.zoomed .gslide-image img.zoomable{cursor:-webkit-grab;cursor:grab}.gslide-inline{max-height:95vh}.gslide-external{max-height:100vh}.gslide-description.description-left,.gslide-description.description-right{max-width:275px}.glightbox-open{height:auto}.goverlay{background:#000000eb}.glightbox-clean .gslide-media{-webkit-box-shadow:1px 2px 9px 0px rgba(0,0,0,.65);box-shadow:1px 2px 9px #000000a6}.glightbox-clean .description-left .gdesc-inner,.glightbox-clean .description-right .gdesc-inner{position:absolute;height:100%;overflow-y:auto}.glightbox-clean .gprev,.glightbox-clean .gnext,.glightbox-clean .gclose{background-color:#00000052}.glightbox-clean .gprev:hover,.glightbox-clean .gnext:hover,.glightbox-clean .gclose:hover{background-color:#000000b3}.glightbox-clean .gprev,.glightbox-clean .gnext{top:45%}}@media (min-width: 992px){.glightbox-clean .gclose{opacity:.7;right:20px}}@media screen and (max-height: 420px){.goverlay{background:#000}}.resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}.v-popper__popper{z-index:10000;top:0;left:0;outline:none}.v-popper__popper.v-popper__popper--hidden{visibility:hidden;opacity:0;transition:opacity .15s,visibility .15s;pointer-events:none}.v-popper__popper.v-popper__popper--shown{visibility:visible;opacity:1;transition:opacity .15s}.v-popper__popper.v-popper__popper--skip-transition,.v-popper__popper.v-popper__popper--skip-transition>.v-popper__wrapper{transition:none!important}.v-popper__backdrop{position:absolute;top:0;left:0;width:100%;height:100%;display:none}.v-popper__inner{position:relative;box-sizing:border-box;overflow-y:auto}.v-popper__inner>div{position:relative;z-index:1;max-width:inherit;max-height:inherit}.v-popper__arrow-container{position:absolute;width:10px;height:10px}.v-popper__popper--arrow-overflow .v-popper__arrow-container,.v-popper__popper--no-positioning .v-popper__arrow-container{display:none}.v-popper__arrow-inner,.v-popper__arrow-outer{border-style:solid;position:absolute;top:0;left:0;width:0;height:0}.v-popper__arrow-inner{visibility:hidden;border-width:7px}.v-popper__arrow-outer{border-width:6px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{left:-2px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{left:-1px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer{border-bottom-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-container{top:0}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{border-top-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-top-color:transparent!important}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{top:-4px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{top:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{top:-1px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{border-left-width:0;border-left-color:transparent!important;border-top-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{left:-4px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{left:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-container{right:-10px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer{border-right-width:0;border-top-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner{left:-2px}.v-popper--theme-tooltip .v-popper__inner{background:#000c;color:#fff;border-radius:6px;padding:7px 12px 6px}.v-popper--theme-tooltip .v-popper__arrow-outer{border-color:#000c}.v-popper--theme-dropdown .v-popper__inner{background:#fff;color:#000;border-radius:6px;border:1px solid #ddd;box-shadow:0 6px 30px #0000001a}.v-popper--theme-dropdown .v-popper__arrow-inner{visibility:visible;border-color:#fff}.v-popper--theme-dropdown .v-popper__arrow-outer{border-color:#ddd}:host,.booking-widget{font-family:var(--font-base, "Roboto"),sans-serif;font-size:var(--base-font, 16px);color:#696969;line-height:1.5;box-sizing:border-box;display:flex;flex-direction:column;max-width:960px;margin:0 auto}*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}.booking-widget__content{position:relative;min-height:450px}h1{font-size:1.5rem;font-weight:600;margin-bottom:1rem}h2{font-size:1.25rem;font-weight:600;margin-bottom:.75rem}h3{font-size:1.125rem;font-weight:600;margin-bottom:.75rem}h4{font-size:1rem;font-weight:600;margin-bottom:.5rem}h5{font-size:.875rem;font-weight:600;margin-bottom:.5rem}p{font-size:1rem;margin-bottom:.75rem}small,.text-sm{font-size:.875rem}.button{display:inline-flex;align-items:center;justify-content:center;font-size:.875rem;padding:.5rem 1rem;border-radius:.375rem;background:#007aff;color:#fff;border:none;cursor:pointer;text-decoration:none;text-wrap:nowrap}.button:hover{background:#0062cc}.button:disabled{background:#ccc;cursor:not-allowed}.section{padding:1.5rem}.card+.card{margin-top:1rem}blockquote,.blockquote{border-left:3px solid #696969;padding-left:1rem;margin-bottom:1rem;font-size:.875rem;color:#696969}.cursor-pointer{cursor:pointer}abbr,.abbreviation{display:inline;border-bottom-style:dotted;border-bottom-width:1px;cursor:pointer}.inline{display:inline}strong{font-weight:700}a{color:#ff4500;cursor:pointer;text-decoration:underline}a:hover{text-decoration:none}ul{margin:0}ul li{display:block;margin-bottom:.5rem;list-style:disc}ul li:before{content:"";display:inline-flex;margin-right:.25rem}#bflex-booking-widget{position:relative;container-type:inline-size;container-name:widget}@container widget (max-width: 480px){.booking-widget{font-size:var(--base-font, 14px);line-height:1.4}}.details-info{display:flex;background-color:#f9f9fa;border-radius:5px;padding:1rem 1.25rem;font-size:.875rem;column-gap:.5rem}.details-info--icon{flex:0 0 1rem}.accommodation-list__item{margin-bottom:.5rem}.accommodation-list__item-delete{margin-bottom:.5rem;color:#a1a1a1}.accommodation-list__item-delete:hover{color:#1b1b1f}.accommodation-list__total{color:#000}.accommodation-list__payment-rules dd,.accommodation-list__payment-rules dt{margin-bottom:.25rem;font-size:.875rem}.accommodation-list .payment-type{display:inline-flex;flex-direction:row;align-items:center;font-size:.875rem;border:1px solid orangered;border-radius:5px;margin-top:1rem}.accommodation-list .payment-type__label{font-weight:700;background-color:#ff4500;color:#fff;height:100%;padding:.5rem 1rem;flex-wrap:nowrap;text-wrap:nowrap}.accommodation-list .payment-type__variants{display:flex;flex-direction:row;align-items:start;justify-content:start;width:100%;padding:.5rem 1rem;box-sizing:border-box}.accommodation-list .payment-type label{display:flex;flex-direction:row;font-weight:400;margin-right:1rem;cursor:pointer}.accommodation-list .payment-type label input[type=radio]{margin:0 .25rem;padding:0}@container widget (max-width: 480px){.accommodation-list .payment-type{flex-direction:column;align-items:start;width:100%}.accommodation-list .payment-type__label{margin-right:0;width:100%}.accommodation-list .payment-type__variants{flex-direction:column;align-items:start;justify-content:start;width:100%}.accommodation-list .payment-type label{flex-direction:row;padding:.5rem .5rem .5rem 0}}.rate-plan-list{display:flex;flex-flow:column}.rate-plan-list .rate-plan-card:last-child{border-bottom-left-radius:var(--main-border-radius, 10px);border-bottom-right-radius:var(--main-border-radius, 10px)}@container widget (max-width: 480px){.accommodation-offer{overflow-x:hidden}.rate-plan-list__wrapper{padding:.5rem}.rate-plan-list{overflow-x:scroll;scroll-snap-type:x mandatory;flex-direction:row;column-gap:.5rem}}.agreement-rules-list__rules li{padding-left:.25rem}.agreement-rules-list__rules li:before{display:inline-block;content:"—";margin-right:.25rem}.agreement-rules-list__agreements-item{display:flex;flex-direction:row;margin-bottom:.5rem}.agreement-rules-list__combined-agreement{padding:0}.agreement-rules-list__combined-agreement:after{display:inline-block;padding-right:0;content:", ";text-decoration:none}.agreement-rules-list__combined-agreement:last-child:after{content:"";display:none}.accommodation-type-card{display:flex;color:var(--accommodation-type-card-color);border-top-left-radius:var(--main-border-radius, 10px);border-top-right-radius:var(--main-border-radius, 10px);background:var(--accommodation-type-card-background, transparent)}.accommodation-type-card__img{width:300px;flex-shrink:0;border-top-left-radius:var(--main-border-radius, 10px);overflow:hidden;background:#e0e0e0;cursor:pointer;display:flex}.accommodation-type-card__img img{width:100%;height:100%;object-fit:cover;object-position:center}.accommodation-type-card__body{display:flex;flex-flow:column;justify-content:space-between;padding:1.5rem;width:100%}.amenities{font-size:.75rem;background:transparent;margin-top:.75rem;display:inline-flex;flex-wrap:wrap;gap:.5rem}.amenities__item{border:1px solid var(--main-border-color, #e0e0e0);padding:.5rem;background:transparent;line-height:1;border-radius:3px}@container widget (max-width: 480px){.accommodation-type-card{flex-flow:column;max-height:initial;height:auto}.accommodation-type-card__img{width:auto;border-top-right-radius:var(--accommodation-type-card-border-radius, 3px);line-height:1}.accommodation-type-card__img img{height:220px}.accommodation-type-card__body{width:auto}}.custom-checkbox{display:flex;align-items:center;cursor:pointer}.custom-checkbox input[type=checkbox]{position:absolute;opacity:0;width:1.25rem;height:1.25rem;cursor:pointer}.custom-checkbox__box{width:1rem;height:1rem;flex:0 0 1rem;border:2px solid rgba(34,34,34,.2);border-radius:3px;position:relative;margin-right:.5rem;transition:background-color .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box{background-color:#fff}.custom-checkbox__box:after{content:"";position:absolute;top:50%;left:50%;width:.5rem;height:.5rem;background-color:#ff4500;transform:translate(-50%,-50%) scale(0);transition:transform .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box:after{transform:translate(-50%,-50%) scale(1)}.customer-data-form{display:grid;grid-template-columns:1fr 1fr;row-gap:1rem;column-gap:1.5rem;padding:1rem 0 0}@container widget (max-width: 480px){.customer-data-form{grid-template-columns:1fr}}.field-decorator__required{padding-left:3px;color:red}.field-decorator__input-group{border:1px solid rgba(34,34,34,.2);border-radius:5px;background-color:#fff;padding:.25rem .5rem;display:flex;flex-direction:column}.field-decorator__label{font-size:.875em;margin-bottom:.25em;line-height:1;color:#2226}.field-decorator__slot{display:flex;flex-direction:column;width:100%;height:auto}.field-decorator__slot textarea,.field-decorator__slot select,.field-decorator__slot input{border:0!important;outline:0!important;background:#fff;width:100%;height:100%;font-size:.875rem;padding:.25rem 0}.field-decorator__slot textarea{resize:vertical}.field-decorator__hint{height:1.25rem;color:#3d3d3d;text-align:right;font-size:.725rem;overflow:hidden}.form-group--error .field-decorator__input-group{border-color:red}.form-group--error .field-decorator__hint{color:red}.information-block-grid{display:grid;grid-row-gap:1.25rem}.information-block{background-color:#fff;border-radius:var(--main-border-radius, 10px)}.information-block__content{padding:1rem 1.25rem}.information-block__content dl{display:grid;grid-template-columns:1fr 1fr;gap:.25rem;align-items:center}.information-block__content dl dt{font-weight:700;line-height:1}.information-block__content dl dd{text-align:right;line-height:1}.information-block__content a{padding:0 .25rem}.information-block .divider{margin:0;height:1px;background-color:#e0e0e0}.information-block header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin:0;padding:1rem 1.25rem;border-radius:10px 10px 0 0;font-size:1.25rem;font-weight:700}.information-block header .additional{color:gray;font-weight:400}.information-block header.dense{padding:.5rem 1.25rem}@container widget (max-width: 480px){.information-block header{flex-direction:column;align-items:flex-start}}.cycle-loader{display:flex}@-webkit-keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}@keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}.price-block{display:grid;grid-template-columns:1fr;grid-template-areas:"discount" "amount";line-height:1;height:100%;width:100%}.price-block__discount{grid-area:discount;line-height:1;display:flex;align-items:center;justify-self:end;font-size:.75rem;font-weight:lighter}.price-block__discount-size{display:block;padding:.125rem;margin-right:.25rem;background:red;color:#fff}.price-block__old{text-decoration-line:line-through;opacity:.5}.price-block__schedule{font-size:.75rem}.price-block__icons .icon{font-size:1rem}.price-block__amount{grid-area:amount;display:flex;flex-direction:row;align-items:center;justify-content:space-between;line-height:1;font-size:1.25rem}.price-block__current{margin-left:.5rem}.price-block__current-currency{font-weight:lighter;padding:0 .125rem}@container widget (max-width: 480px){.price-block{grid-template-columns:1fr;grid-template-areas:"amount discount";column-gap:1rem}}.rate-plan-card{display:grid;grid-template-columns:1fr 1fr;grid-template-areas:"description actions" "bottom actions";width:100%;position:relative;background-color:var(--rate-plan-background);font-size:var(--rate-plan-font-size);color:var(--rate-plan-color)}.rate-plan-card--blocked{display:flex;justify-content:center;height:100%;width:100%;position:absolute;background:#0000001a;z-index:1}.rate-plan-card__title{display:inline-flex;align-items:center}.rate-plan-card__wrapper{grid-area:description;padding:0}.rate-plan-card blockquote{border-left-color:var(--rate-plan-secondary-color);color:var(--rate-plan-secondary-color)}.rate-plan-card__description{padding:1.5rem}.rate-plan-card__offers{font-size:var(--rate-plan-font-size, .875rem);color:var(--rate-plan-secondary-color)}.rate-plan-card__offers-item{display:flex;align-items:center;padding:.375rem 0}.rate-plan-card__offers-item .icon{margin-right:.375rem;color:var(--rate-plan-icon-primary-color, #696969);fill:var(--rate-plan-icon-primary-color, #696969)}.rate-plan-card__offers-item.extra-offer .icon{color:inherit}.rate-plan-card__offers-item.feed-offer{color:var(--rate-plan-icon-secondary-color, #28a745)}.rate-plan-card__offers-item.feed-offer .icon{color:var(--rate-plan-icon-secondary-color, #28a745);fill:var(--rate-plan-icon-secondary-color, #28a745)}.rate-plan-card__variants{display:flex;flex-direction:column;align-items:end;padding:1rem 0}.rate-plan-card__variants .length-of-stay{display:block;font-size:.875rem;text-align:right;padding:0 1rem}@container widget (max-width: 480px){.rate-plan-list--single .rate-plan-card{width:100%;flex:0 0 100%}.rate-plan-card{display:flex;flex:0 0 90%;flex-direction:column;min-width:90%;scroll-snap-align:start;border-radius:var(--main-border-radius, 10px);border:1px solid var(--main-border-color, #e0e0e0)}.rate-plan-card__actions{justify-self:stretch}}.variant-line{text-align:right;font-size:var(--variant-line-font-size);color:var(--variant-line-color, #000000)}.variant-line:hover,.variant-line.selected{background:var(--variant-line-selected, #e0e0e0)}.variant-line.selected:hover{background:var(--variant-line-hover, #d7d7d7)}.variant-line__content{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;padding:.5rem 1rem}.variant-line__actions{margin-left:1rem}@container widget (max-width: 480px){.rate-plan-card__variants .variant-line:nth-of-type(odd){background:#f5f5f5}.variant-line{width:100%}.variant-line__content{flex-direction:column;row-gap:.5rem;width:100%}.variant-line__actions{align-self:end;width:100%}.variant-line__actions button{width:100%}}.reservation-result{display:flex;flex-direction:column;margin-top:2rem;margin-bottom:1rem}.reservation-result__title{font-size:1.5rem;font-weight:700;text-align:center}.reservation-result__description{font-size:1.2rem;text-align:center}.hotel-information{display:flex;flex-direction:column;row-gap:.25rem;font-size:.875rem;justify-content:center;justify-items:center}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.accommodation-skeleton.accommodation-result .header .thumbnail,.accommodation-skeleton.accommodation-result .header .content .description,.accommodation-skeleton.accommodation-result .header .content .amenities{display:none}.accommodation-skeleton.accommodation-result .header .content .title-skeleton{width:220px;margin-bottom:0}.accommodation-skeleton .header{display:flex;flex-direction:column}@media (min-width: 768px){.accommodation-skeleton .header{flex-direction:row}}.accommodation-skeleton .header .thumbnail{width:100%;height:192px;border-top-left-radius:10px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0}@media (min-width: 768px){.accommodation-skeleton .header .thumbnail{width:300px}}.accommodation-skeleton .header .content{flex:1;padding:16px}.accommodation-skeleton .header .content .title-skeleton{height:32px;width:96px;margin-bottom:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description{margin-bottom:16px;display:flex;flex-direction:column;gap:8px}.accommodation-skeleton .header .content .description .line{height:16px;width:100%;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description .line.line-short{width:75%}.accommodation-skeleton .header .content .amenities{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.accommodation-skeleton .header .content .amenities .amenity-item{height:32px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header{padding:16px;display:flex;justify-content:space-between;align-items:center}.accommodation-skeleton .footer .option-header .option-title{height:24px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header .option-value{height:24px;width:64px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option{padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start}@media (min-width: 768px){.accommodation-skeleton .footer .room-option{flex-direction:row;align-items:center}}.accommodation-skeleton .footer .room-option .option-details{display:flex;flex-direction:column;gap:8px;width:100%}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .option-details{width:50%}}.accommodation-skeleton .footer .room-option .option-details .option-name{height:20px;width:192px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .option-details .option-description{height:16px;width:128px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section{display:flex;align-items:center;margin-top:8px}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .price-section{margin-top:0}}.accommodation-skeleton .footer .room-option .price-section .price{height:24px;width:64px;margin-right:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section .book-button{height:40px;width:96px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.icons{display:flex;align-items:baseline;color:#323232;fill:#323232}.scenario-text{font-size:var(--base-font);font-weight:lighter}.summary-block{position:sticky;width:auto;bottom:0;right:0;padding:1rem;box-shadow:0 -4px 54px #9e9e9e33;background:#fff;z-index:4;border-radius:10px}.summary-block__content{display:flex;justify-content:space-between;align-items:center}.summary-block__content-info{display:flex;flex-direction:column;align-items:flex-start}.summary-block__content-info__price{font-size:1rem;font-weight:700;color:#ff4500}.summary-block__content-info__text{display:flex;align-items:center;font-size:.875rem;color:#2229;vertical-align:center}.summary-block__content-info__text .icon{font-size:1rem;margin-left:.25rem}.summary-block .accommodation-summary-trigger{cursor:pointer}.summary-block .accommodation-summary-trigger:hover{color:#ff4500}@container widget (max-width: 480px){.summary-block{position:sticky;box-sizing:border-box;left:0;width:100%}}.v-popper__popper p{line-height:1;padding:.125rem 0;margin:.5rem;font-size:.875rem}.icon{fill:currentColor}.icon--small{width:16px}.icon-text{display:inline-flex;flex-direction:row;align-items:center;column-gap:.375rem}.icon-text__icon{display:inline-flex;color:#ff4500;flex:0 0 1rem}.icon-text__icon .icon{width:1.5rem}.icon-text__text{line-height:1}', Bf = {
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
    const t = e, n = _e({
      accommodationTypes: [],
      ratePlans: []
    });
    return Ye(
      () => ({ accommodationTypes: t.accommodationTypes, ratePlans: t.ratePlans }),
      (o) => {
        (o.accommodationTypes.length || o.ratePlans.length) && (n.value = {
          accommodationTypes: o.accommodationTypes.split(","),
          ratePlans: o.accommodationTypes.split(",")
        });
      }
    ), os(() => {
      var r;
      const o = (r = Yt()) == null ? void 0 : r.appContext.app;
      o && !o.__i18n_installed && (o.use(Rn), o.__i18n_installed = !0);
    }), Bn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (o, r) => (L(), le(Nr, null, {
      default: H(() => [
        M($r, {
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
}, qf = /* @__PURE__ */ wn(Bf, [["styles", [zf]]]), Hf = {
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
    return Bn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (t, n) => (L(), le(Nr, null, {
      default: H(() => [
        M($r, {
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
globalThis.window && window.customElements.define("bflex-booking-widget", rs(qf));
function Vf(e) {
  ss(Hf, { initOptions: e }).use(Rn).mount("#bflex-booking-widget");
}
export {
  $r as BookingWidget,
  Vf as mountWidget
};
