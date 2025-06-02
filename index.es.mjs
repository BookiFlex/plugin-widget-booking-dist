import { effectScope as Ur, ref as ue, shallowRef as Yr, computed as ke, watch as Ve, isRef as jr, defineComponent as Ft, getCurrentInstance as Gt, h as Ho, Fragment as de, inject as ft, onMounted as Bt, onUnmounted as Hn, createVNode as R, Text as Xr, createElementBlock as F, openBlock as C, renderSlot as ge, createBlock as re, normalizeClass as Ze, withCtx as q, createElementVNode as x, renderList as Pe, onBeforeUnmount as Gr, toDisplayString as M, unref as z, pushScopeId as Kr, popScopeId as Jr, nextTick as Zr, normalizeProps as Qr, guardReactiveProps as es, resolveComponent as ni, mergeProps as xi, withScopeId as ts, withKeys as ns, normalizeStyle as Rt, createCommentVNode as pe, resolveDynamicComponent as is, withDirectives as Qe, vShow as ii, createTextVNode as te, toRefs as os, reactive as oi, vModelText as an, withModifiers as ki, vModelSelect as rs, vModelCheckbox as ss, provide as Wo, toRaw as as, onBeforeMount as ls, defineCustomElement as cs, createApp as us } from "vue";
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
const ds = async () => {
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
}, fs = async (e, t, n) => {
  console.debug("Loading data", e, t, n);
  let o = await Et() + Tt.OFFERS;
  if (o = o.includes("?") ? o + "&" : o + "?", !e || !t)
    throw new Error("Invalid dates");
  const r = `${o}checkInDate=${e}&checkOutDate=${t}&promoCode=${n || ""}`;
  try {
    const a = await fetch(r);
    return await St(a);
  } catch (a) {
    throw console.error("Failed to load offers:", a), a;
  }
}, hs = async () => {
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
}, ms = async (e) => {
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
}, ps = async (e) => {
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
}, gs = async (e) => {
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
const Dn = typeof window < "u", Ct = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), vs = (e, t, n) => ys({ l: e, k: t, s: n }), ys = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Se = (e) => typeof e == "number" && isFinite(e), _s = (e) => Ti(e) === "[object Date]", Kt = (e) => Ti(e) === "[object RegExp]", Wn = (e) => Q(e) && Object.keys(e).length === 0, Ce = Object.assign, bs = Object.create, fe = (e = null) => bs(e);
let Wi;
const It = () => Wi || (Wi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : fe());
function Vi(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const ws = Object.prototype.hasOwnProperty;
function Ye(e, t) {
  return ws.call(e, t);
}
const Ee = Array.isArray, ve = (e) => typeof e == "function", W = (e) => typeof e == "string", ae = (e) => typeof e == "boolean", le = (e) => e !== null && typeof e == "object", xs = (e) => le(e) && ve(e.then) && ve(e.catch), Yo = Object.prototype.toString, Ti = (e) => Yo.call(e), Q = (e) => Ti(e) === "[object Object]", ks = (e) => e == null ? "" : Ee(e) || Q(e) && e.toString === Yo ? JSON.stringify(e, null, 2) : String(e);
function Si(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
function Ts(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Cn = (e) => !le(e) || Ee(e);
function $n(e, t) {
  if (Cn(e) || Cn(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((a) => {
      a !== "__proto__" && (le(o[a]) && !le(r[a]) && (r[a] = Array.isArray(o[a]) ? [] : fe()), Cn(r[a]) || Cn(o[a]) ? r[a] = o[a] : n.push({ src: o[a], des: r[a] }));
    });
  }
}
/*!
  * message-compiler v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ss(e, t, n) {
  return { line: e, column: t, offset: n };
}
function ri(e, t, n) {
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
}, Es = 17;
function Vn(e, t, n = {}) {
  const { domain: o, messages: r, args: a } = n, l = e, d = new SyntaxError(String(l));
  return d.code = e, t && (d.location = t), d.domain = o, d;
}
function Cs(e) {
  throw e;
}
const ct = " ", Ps = "\r", Me = `
`, As = "\u2028", Ls = "\u2029";
function Os(e) {
  const t = e;
  let n = 0, o = 1, r = 1, a = 0;
  const l = ($) => t[$] === Ps && t[$ + 1] === Me, d = ($) => t[$] === Me, f = ($) => t[$] === Ls, u = ($) => t[$] === As, y = ($) => l($) || d($) || f($) || u($), v = () => n, m = () => o, w = () => r, T = () => a, E = ($) => l($) || f($) || u($) ? Me : t[$], O = () => E(n), g = () => E(n + a);
  function k() {
    return a = 0, y(n) && (o++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function I() {
    return l(n + a) && a++, a++, t[n + a];
  }
  function S() {
    n = 0, o = 1, r = 1, a = 0;
  }
  function D($ = 0) {
    a = $;
  }
  function B() {
    const $ = n + a;
    for (; $ !== n; )
      k();
    a = 0;
  }
  return {
    index: v,
    line: m,
    column: w,
    peekOffset: T,
    charAt: E,
    currentChar: O,
    currentPeek: g,
    next: k,
    peek: I,
    reset: S,
    resetPeek: D,
    skipToPeek: B
  };
}
const vt = void 0, $s = ".", Ui = "'", Is = "tokenizer";
function Ns(e, t = {}) {
  const n = t.location !== !1, o = Os(e), r = () => o.index(), a = () => Ss(o.line(), o.column(), o.index()), l = a(), d = r(), f = {
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
  function v(p, _, N, ...Y) {
    const _e = u();
    if (_.column += N, _.offset += N, y) {
      const i = n ? ri(_e.startLoc, _) : null, s = Vn(p, i, {
        domain: Is,
        args: Y
      });
      y(s);
    }
  }
  function m(p, _, N) {
    p.endLoc = a(), p.currentType = _;
    const Y = { type: _ };
    return n && (Y.loc = ri(p.startLoc, p.endLoc)), N != null && (Y.value = N), Y;
  }
  const w = (p) => m(
    p,
    13
    /* TokenTypes.EOF */
  );
  function T(p, _) {
    return p.currentChar() === _ ? (p.next(), _) : (v(ce.EXPECTED_TOKEN, a(), 0, _), "");
  }
  function E(p) {
    let _ = "";
    for (; p.currentPeek() === ct || p.currentPeek() === Me; )
      _ += p.currentPeek(), p.peek();
    return _;
  }
  function O(p) {
    const _ = E(p);
    return p.skipToPeek(), _;
  }
  function g(p) {
    if (p === vt)
      return !1;
    const _ = p.charCodeAt(0);
    return _ >= 97 && _ <= 122 || // a-z
    _ >= 65 && _ <= 90 || // A-Z
    _ === 95;
  }
  function k(p) {
    if (p === vt)
      return !1;
    const _ = p.charCodeAt(0);
    return _ >= 48 && _ <= 57;
  }
  function I(p, _) {
    const { currentType: N } = _;
    if (N !== 2)
      return !1;
    E(p);
    const Y = g(p.currentPeek());
    return p.resetPeek(), Y;
  }
  function S(p, _) {
    const { currentType: N } = _;
    if (N !== 2)
      return !1;
    E(p);
    const Y = p.currentPeek() === "-" ? p.peek() : p.currentPeek(), _e = k(Y);
    return p.resetPeek(), _e;
  }
  function D(p, _) {
    const { currentType: N } = _;
    if (N !== 2)
      return !1;
    E(p);
    const Y = p.currentPeek() === Ui;
    return p.resetPeek(), Y;
  }
  function B(p, _) {
    const { currentType: N } = _;
    if (N !== 7)
      return !1;
    E(p);
    const Y = p.currentPeek() === ".";
    return p.resetPeek(), Y;
  }
  function $(p, _) {
    const { currentType: N } = _;
    if (N !== 8)
      return !1;
    E(p);
    const Y = g(p.currentPeek());
    return p.resetPeek(), Y;
  }
  function J(p, _) {
    const { currentType: N } = _;
    if (!(N === 7 || N === 11))
      return !1;
    E(p);
    const Y = p.currentPeek() === ":";
    return p.resetPeek(), Y;
  }
  function G(p, _) {
    const { currentType: N } = _;
    if (N !== 9)
      return !1;
    const Y = () => {
      const i = p.currentPeek();
      return i === "{" ? g(p.peek()) : i === "@" || i === "|" || i === ":" || i === "." || i === ct || !i ? !1 : i === Me ? (p.peek(), Y()) : se(p, !1);
    }, _e = Y();
    return p.resetPeek(), _e;
  }
  function U(p) {
    E(p);
    const _ = p.currentPeek() === "|";
    return p.resetPeek(), _;
  }
  function se(p, _ = !0) {
    const N = (_e = !1, i = "") => {
      const s = p.currentPeek();
      return s === "{" || s === "@" || !s ? _e : s === "|" ? !(i === ct || i === Me) : s === ct ? (p.peek(), N(!0, ct)) : s === Me ? (p.peek(), N(!0, Me)) : !0;
    }, Y = N();
    return _ && p.resetPeek(), Y;
  }
  function K(p, _) {
    const N = p.currentChar();
    return N === vt ? vt : _(N) ? (p.next(), N) : null;
  }
  function Te(p) {
    const _ = p.charCodeAt(0);
    return _ >= 97 && _ <= 122 || // a-z
    _ >= 65 && _ <= 90 || // A-Z
    _ >= 48 && _ <= 57 || // 0-9
    _ === 95 || // _
    _ === 36;
  }
  function be(p) {
    return K(p, Te);
  }
  function Oe(p) {
    const _ = p.charCodeAt(0);
    return _ >= 97 && _ <= 122 || // a-z
    _ >= 65 && _ <= 90 || // A-Z
    _ >= 48 && _ <= 57 || // 0-9
    _ === 95 || // _
    _ === 36 || // $
    _ === 45;
  }
  function he(p) {
    return K(p, Oe);
  }
  function ie(p) {
    const _ = p.charCodeAt(0);
    return _ >= 48 && _ <= 57;
  }
  function Re(p) {
    return K(p, ie);
  }
  function ye(p) {
    const _ = p.charCodeAt(0);
    return _ >= 48 && _ <= 57 || // 0-9
    _ >= 65 && _ <= 70 || // A-F
    _ >= 97 && _ <= 102;
  }
  function ot(p) {
    return K(p, ye);
  }
  function zt(p) {
    let _ = "", N = "";
    for (; _ = Re(p); )
      N += _;
    return N;
  }
  function Zt(p) {
    let _ = "";
    for (; ; ) {
      const N = p.currentChar();
      if (N === "{" || N === "}" || N === "@" || N === "|" || !N)
        break;
      if (N === ct || N === Me)
        if (se(p))
          _ += N, p.next();
        else {
          if (U(p))
            break;
          _ += N, p.next();
        }
      else
        _ += N, p.next();
    }
    return _;
  }
  function Ht(p) {
    O(p);
    let _ = "", N = "";
    for (; _ = he(p); )
      N += _;
    return p.currentChar() === vt && v(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), N;
  }
  function Qt(p) {
    O(p);
    let _ = "";
    return p.currentChar() === "-" ? (p.next(), _ += `-${zt(p)}`) : _ += zt(p), p.currentChar() === vt && v(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), _;
  }
  function Tn(p) {
    return p !== Ui && p !== Me;
  }
  function Wt(p) {
    O(p), T(p, "'");
    let _ = "", N = "";
    for (; _ = K(p, Tn); )
      _ === "\\" ? N += en(p) : N += _;
    const Y = p.currentChar();
    return Y === Me || Y === vt ? (v(ce.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), Y === Me && (p.next(), T(p, "'")), N) : (T(p, "'"), N);
  }
  function en(p) {
    const _ = p.currentChar();
    switch (_) {
      case "\\":
      case "'":
        return p.next(), `\\${_}`;
      case "u":
        return Vt(p, _, 4);
      case "U":
        return Vt(p, _, 6);
      default:
        return v(ce.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, _), "";
    }
  }
  function Vt(p, _, N) {
    T(p, _);
    let Y = "";
    for (let _e = 0; _e < N; _e++) {
      const i = ot(p);
      if (!i) {
        v(ce.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${_}${Y}${p.currentChar()}`);
        break;
      }
      Y += i;
    }
    return `\\${_}${Y}`;
  }
  function tn(p) {
    return p !== "{" && p !== "}" && p !== ct && p !== Me;
  }
  function ht(p) {
    O(p);
    let _ = "", N = "";
    for (; _ = K(p, tn); )
      N += _;
    return N;
  }
  function mt(p) {
    let _ = "", N = "";
    for (; _ = be(p); )
      N += _;
    return N;
  }
  function nn(p) {
    const _ = (N) => {
      const Y = p.currentChar();
      return Y === "{" || Y === "@" || Y === "|" || Y === "(" || Y === ")" || !Y || Y === ct ? N : (N += Y, p.next(), _(N));
    };
    return _("");
  }
  function Lt(p) {
    O(p);
    const _ = T(
      p,
      "|"
      /* TokenChars.Pipe */
    );
    return O(p), _;
  }
  function we(p, _) {
    let N = null;
    switch (p.currentChar()) {
      case "{":
        return _.braceNest >= 1 && v(ce.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), p.next(), N = m(
          _,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), O(p), _.braceNest++, N;
      case "}":
        return _.braceNest > 0 && _.currentType === 2 && v(ce.EMPTY_PLACEHOLDER, a(), 0), p.next(), N = m(
          _,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), _.braceNest--, _.braceNest > 0 && O(p), _.inLinked && _.braceNest === 0 && (_.inLinked = !1), N;
      case "@":
        return _.braceNest > 0 && v(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), N = pt(p, _) || w(_), _.braceNest = 0, N;
      default: {
        let _e = !0, i = !0, s = !0;
        if (U(p))
          return _.braceNest > 0 && v(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), N = m(_, 1, Lt(p)), _.braceNest = 0, _.inLinked = !1, N;
        if (_.braceNest > 0 && (_.currentType === 4 || _.currentType === 5 || _.currentType === 6))
          return v(ce.UNTERMINATED_CLOSING_BRACE, a(), 0), _.braceNest = 0, rt(p, _);
        if (_e = I(p, _))
          return N = m(_, 4, Ht(p)), O(p), N;
        if (i = S(p, _))
          return N = m(_, 5, Qt(p)), O(p), N;
        if (s = D(p, _))
          return N = m(_, 6, Wt(p)), O(p), N;
        if (!_e && !i && !s)
          return N = m(_, 12, ht(p)), v(ce.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, N.value), O(p), N;
        break;
      }
    }
    return N;
  }
  function pt(p, _) {
    const { currentType: N } = _;
    let Y = null;
    const _e = p.currentChar();
    switch ((N === 7 || N === 8 || N === 11 || N === 9) && (_e === Me || _e === ct) && v(ce.INVALID_LINKED_FORMAT, a(), 0), _e) {
      case "@":
        return p.next(), Y = m(
          _,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), _.inLinked = !0, Y;
      case ".":
        return O(p), p.next(), m(
          _,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return O(p), p.next(), m(
          _,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return U(p) ? (Y = m(_, 1, Lt(p)), _.braceNest = 0, _.inLinked = !1, Y) : B(p, _) || J(p, _) ? (O(p), pt(p, _)) : $(p, _) ? (O(p), m(_, 11, mt(p))) : G(p, _) ? (O(p), _e === "{" ? we(p, _) || Y : m(_, 10, nn(p))) : (N === 7 && v(ce.INVALID_LINKED_FORMAT, a(), 0), _.braceNest = 0, _.inLinked = !1, rt(p, _));
    }
  }
  function rt(p, _) {
    let N = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (_.braceNest > 0)
      return we(p, _) || w(_);
    if (_.inLinked)
      return pt(p, _) || w(_);
    switch (p.currentChar()) {
      case "{":
        return we(p, _) || w(_);
      case "}":
        return v(ce.UNBALANCED_CLOSING_BRACE, a(), 0), p.next(), m(
          _,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return pt(p, _) || w(_);
      default: {
        if (U(p))
          return N = m(_, 1, Lt(p)), _.braceNest = 0, _.inLinked = !1, N;
        if (se(p))
          return m(_, 0, Zt(p));
        break;
      }
    }
    return N;
  }
  function on() {
    const { currentType: p, offset: _, startLoc: N, endLoc: Y } = f;
    return f.lastType = p, f.lastOffset = _, f.lastStartLoc = N, f.lastEndLoc = Y, f.offset = r(), f.startLoc = a(), o.currentChar() === vt ? m(
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
const Rs = "parser", Ds = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Ms(e, t, n) {
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
function Fs(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function o(g, k, I, S, ...D) {
    const B = g.currentPosition();
    if (B.offset += S, B.column += S, n) {
      const $ = t ? ri(I, B) : null, J = Vn(k, $, {
        domain: Rs,
        args: D
      });
      n(J);
    }
  }
  function r(g, k, I) {
    const S = { type: g };
    return t && (S.start = k, S.end = k, S.loc = { start: I, end: I }), S;
  }
  function a(g, k, I, S) {
    t && (g.end = k, g.loc && (g.loc.end = I));
  }
  function l(g, k) {
    const I = g.context(), S = r(3, I.offset, I.startLoc);
    return S.value = k, a(S, g.currentOffset(), g.currentPosition()), S;
  }
  function d(g, k) {
    const I = g.context(), { lastOffset: S, lastStartLoc: D } = I, B = r(5, S, D);
    return B.index = parseInt(k, 10), g.nextToken(), a(B, g.currentOffset(), g.currentPosition()), B;
  }
  function f(g, k) {
    const I = g.context(), { lastOffset: S, lastStartLoc: D } = I, B = r(4, S, D);
    return B.key = k, g.nextToken(), a(B, g.currentOffset(), g.currentPosition()), B;
  }
  function u(g, k) {
    const I = g.context(), { lastOffset: S, lastStartLoc: D } = I, B = r(9, S, D);
    return B.value = k.replace(Ds, Ms), g.nextToken(), a(B, g.currentOffset(), g.currentPosition()), B;
  }
  function y(g) {
    const k = g.nextToken(), I = g.context(), { lastOffset: S, lastStartLoc: D } = I, B = r(8, S, D);
    return k.type !== 11 ? (o(g, ce.UNEXPECTED_EMPTY_LINKED_MODIFIER, I.lastStartLoc, 0), B.value = "", a(B, S, D), {
      nextConsumeToken: k,
      node: B
    }) : (k.value == null && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, Je(k)), B.value = k.value || "", a(B, g.currentOffset(), g.currentPosition()), {
      node: B
    });
  }
  function v(g, k) {
    const I = g.context(), S = r(7, I.offset, I.startLoc);
    return S.value = k, a(S, g.currentOffset(), g.currentPosition()), S;
  }
  function m(g) {
    const k = g.context(), I = r(6, k.offset, k.startLoc);
    let S = g.nextToken();
    if (S.type === 8) {
      const D = y(g);
      I.modifier = D.node, S = D.nextConsumeToken || g.nextToken();
    }
    switch (S.type !== 9 && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, Je(S)), S = g.nextToken(), S.type === 2 && (S = g.nextToken()), S.type) {
      case 10:
        S.value == null && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, Je(S)), I.key = v(g, S.value || "");
        break;
      case 4:
        S.value == null && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, Je(S)), I.key = f(g, S.value || "");
        break;
      case 5:
        S.value == null && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, Je(S)), I.key = d(g, S.value || "");
        break;
      case 6:
        S.value == null && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, Je(S)), I.key = u(g, S.value || "");
        break;
      default: {
        o(g, ce.UNEXPECTED_EMPTY_LINKED_KEY, k.lastStartLoc, 0);
        const D = g.context(), B = r(7, D.offset, D.startLoc);
        return B.value = "", a(B, D.offset, D.startLoc), I.key = B, a(I, D.offset, D.startLoc), {
          nextConsumeToken: S,
          node: I
        };
      }
    }
    return a(I, g.currentOffset(), g.currentPosition()), {
      node: I
    };
  }
  function w(g) {
    const k = g.context(), I = k.currentType === 1 ? g.currentOffset() : k.offset, S = k.currentType === 1 ? k.endLoc : k.startLoc, D = r(2, I, S);
    D.items = [];
    let B = null;
    do {
      const G = B || g.nextToken();
      switch (B = null, G.type) {
        case 0:
          G.value == null && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, Je(G)), D.items.push(l(g, G.value || ""));
          break;
        case 5:
          G.value == null && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, Je(G)), D.items.push(d(g, G.value || ""));
          break;
        case 4:
          G.value == null && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, Je(G)), D.items.push(f(g, G.value || ""));
          break;
        case 6:
          G.value == null && o(g, ce.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, Je(G)), D.items.push(u(g, G.value || ""));
          break;
        case 7: {
          const U = m(g);
          D.items.push(U.node), B = U.nextConsumeToken || null;
          break;
        }
      }
    } while (k.currentType !== 13 && k.currentType !== 1);
    const $ = k.currentType === 1 ? k.lastOffset : g.currentOffset(), J = k.currentType === 1 ? k.lastEndLoc : g.currentPosition();
    return a(D, $, J), D;
  }
  function T(g, k, I, S) {
    const D = g.context();
    let B = S.items.length === 0;
    const $ = r(1, k, I);
    $.cases = [], $.cases.push(S);
    do {
      const J = w(g);
      B || (B = J.items.length === 0), $.cases.push(J);
    } while (D.currentType !== 13);
    return B && o(g, ce.MUST_HAVE_MESSAGES_IN_PLURAL, I, 0), a($, g.currentOffset(), g.currentPosition()), $;
  }
  function E(g) {
    const k = g.context(), { offset: I, startLoc: S } = k, D = w(g);
    return k.currentType === 13 ? D : T(g, I, S, D);
  }
  function O(g) {
    const k = Ns(g, Ce({}, e)), I = k.context(), S = r(0, I.offset, I.startLoc);
    return t && S.loc && (S.loc.source = g), S.body = E(k), e.onCacheKey && (S.cacheKey = e.onCacheKey(g)), I.currentType !== 13 && o(k, ce.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, g[I.offset] || ""), a(S, k.currentOffset(), k.currentPosition()), S;
  }
  return { parse: O };
}
function Je(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Bs(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (a) => (n.helpers.add(a), a) };
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
function qs(e, t = {}) {
  const n = Bs(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Ei(e.body, n);
  const o = n.context();
  e.helpers = Array.from(o.helpers);
}
function zs(e) {
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
function Yt(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Yt(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let o = 0; o < n.length; o++)
        Yt(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        Yt(n[o]);
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
      Yt(t.key), t.k = t.key, delete t.key, t.modifier && (Yt(t.modifier), t.m = t.modifier, delete t.modifier);
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
function Hs(e, t) {
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
  function f(E, O) {
    l.code += E;
  }
  function u(E, O = !0) {
    const g = O ? o : "";
    f(r ? g + "  ".repeat(E) : g);
  }
  function y(E = !0) {
    const O = ++l.indentLevel;
    E && u(O);
  }
  function v(E = !0) {
    const O = --l.indentLevel;
    E && u(O);
  }
  function m() {
    u(l.indentLevel);
  }
  return {
    context: d,
    push: f,
    indent: y,
    deindent: v,
    newline: m,
    helper: (E) => `_${E}`,
    needIndent: () => l.needIndent
  };
}
function Ws(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Jt(e, t.key), t.modifier ? (e.push(", "), Jt(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Vs(e, t) {
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let a = 0; a < r && (Jt(e, t.items[a]), a !== r - 1); a++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function Us(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let a = 0; a < r && (Jt(e, t.cases[a]), a !== r - 1); a++)
      e.push(", ");
    e.deindent(o()), e.push("])");
  }
}
function Ys(e, t) {
  t.body ? Jt(e, t.body) : e.push("null");
}
function Jt(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Ys(e, t);
      break;
    case 1:
      Us(e, t);
      break;
    case 2:
      Vs(e, t);
      break;
    case 6:
      Ws(e, t);
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
const js = (e, t = {}) => {
  const n = W(t.mode) ? t.mode : "normal", o = W(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, a = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], d = Hs(e, {
    filename: o,
    breakLineCode: r,
    needIndent: a
  });
  d.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), d.indent(a), l.length > 0 && (d.push(`const { ${Si(l.map((y) => `${y}: _${y}`), ", ")} } = ctx`), d.newline()), d.push("return "), Jt(d, e), d.deindent(a), d.push("}"), delete e.helpers;
  const { code: f, map: u } = d.context();
  return {
    ast: e,
    code: f,
    map: u ? u.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Xs(e, t = {}) {
  const n = Ce({}, t), o = !!n.jit, r = !!n.minify, a = n.optimize == null ? !0 : n.optimize, d = Fs(n).parse(e);
  return o ? (a && zs(d), r && Yt(d), { ast: d, code: "" }) : (qs(d, n), js(d, n));
}
/*!
  * core-base v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Gs() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (It().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (It().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function et(e) {
  return le(e) && Ci(e) === 0 && (Ye(e, "b") || Ye(e, "body"));
}
const jo = ["b", "body"];
function Ks(e) {
  return Pt(e, jo);
}
const Xo = ["c", "cases"];
function Js(e) {
  return Pt(e, Xo, []);
}
const Go = ["s", "static"];
function Zs(e) {
  return Pt(e, Go);
}
const Ko = ["i", "items"];
function Qs(e) {
  return Pt(e, Ko, []);
}
const Jo = ["t", "type"];
function Ci(e) {
  return Pt(e, Jo);
}
const Zo = ["v", "value"];
function Pn(e, t) {
  const n = Pt(e, Zo);
  if (n != null)
    return n;
  throw hn(t);
}
const Qo = ["m", "modifier"];
function ea(e) {
  return Pt(e, Qo);
}
const er = ["k", "key"];
function ta(e) {
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
    if (Ye(e, r) && e[r] != null)
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
function Kn(e) {
  return (n) => na(n, e);
}
function na(e, t) {
  const n = Ks(t);
  if (n == null)
    throw hn(
      0
      /* NodeTypes.Resource */
    );
  if (Ci(n) === 1) {
    const a = Js(n);
    return e.plural(a.reduce((l, d) => [
      ...l,
      Xi(e, d)
    ], []));
  } else
    return Xi(e, n);
}
function Xi(e, t) {
  const n = Zs(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const o = Qs(t).reduce((r, a) => [...r, si(e, a)], []);
    return e.normalize(o);
  }
}
function si(e, t) {
  const n = Ci(t);
  switch (n) {
    case 3:
      return Pn(t, n);
    case 9:
      return Pn(t, n);
    case 4: {
      const o = t;
      if (Ye(o, "k") && o.k)
        return e.interpolate(e.named(o.k));
      if (Ye(o, "key") && o.key)
        return e.interpolate(e.named(o.key));
      throw hn(n);
    }
    case 5: {
      const o = t;
      if (Ye(o, "i") && Se(o.i))
        return e.interpolate(e.list(o.i));
      if (Ye(o, "index") && Se(o.index))
        return e.interpolate(e.list(o.index));
      throw hn(n);
    }
    case 6: {
      const o = t, r = ea(o), a = ta(o);
      return e.linked(si(e, a), r ? si(e, r) : void 0, e.type);
    }
    case 7:
      return Pn(t, n);
    case 8:
      return Pn(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const ia = (e) => e;
let An = fe();
function oa(e, t = {}) {
  let n = !1;
  const o = t.onError || Cs;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ...Xs(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function ra(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && W(e)) {
    ae(t.warnHtmlMessage) && t.warnHtmlMessage;
    const o = (t.onCacheKey || ia)(e), r = An[o];
    if (r)
      return r;
    const { ast: a, detectError: l } = oa(e, {
      ...t,
      location: !1,
      jit: !0
    }), d = Kn(a);
    return l ? d : An[o] = d;
  } else {
    const n = e.cacheKey;
    if (n) {
      const o = An[n];
      return o || (An[n] = Kn(e));
    } else
      return Kn(e);
  }
}
let mn = null;
function sa(e) {
  mn = e;
}
function aa(e, t, n) {
  mn && mn.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const la = /* @__PURE__ */ ca("function:translate");
function ca(e) {
  return (t) => mn && mn.emit(e, t);
}
const ut = {
  INVALID_ARGUMENT: Es,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, ua = 24;
function dt(e) {
  return Vn(e, null, void 0);
}
function Pi(e, t) {
  return t.locale != null ? Gi(t.locale) : Gi(e.locale);
}
let Jn;
function Gi(e) {
  if (W(e))
    return e;
  if (ve(e)) {
    if (e.resolvedOnce && Jn != null)
      return Jn;
    if (e.constructor.name === "Function") {
      const t = e();
      if (xs(t))
        throw dt(ut.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Jn = t;
    } else
      throw dt(ut.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw dt(ut.NOT_SUPPORT_LOCALE_TYPE);
}
function da(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Ee(t) ? t : le(t) ? Object.keys(t) : W(t) ? [t] : [n]
  ])];
}
function nr(e, t, n) {
  const o = W(n) ? n : pn, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let a = r.__localeChainCache.get(o);
  if (!a) {
    a = [];
    let l = [n];
    for (; Ee(l); )
      l = Ki(a, l, t);
    const d = Ee(t) || !Q(t) ? t : t.default ? t.default : null;
    l = W(d) ? [d] : d, Ee(l) && Ki(a, l, !1), r.__localeChainCache.set(o, a);
  }
  return a;
}
function Ki(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && ae(o); r++) {
    const a = t[r];
    W(a) && (o = fa(e, t[r], n));
  }
  return o;
}
function fa(e, t, n) {
  let o;
  const r = t.split("-");
  do {
    const a = r.join("-");
    o = ha(e, a, n), r.splice(-1, 1);
  } while (r.length && o === !0);
  return o;
}
function ha(e, t, n) {
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
const ma = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function pa(e) {
  return ma.test(e);
}
function ga(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function va(e) {
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
function ya(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : pa(t) ? ga(t) : "*" + t;
}
function _a(e) {
  const t = [];
  let n = -1, o = 0, r = 0, a, l, d, f, u, y, v;
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
      if (r = 0, l === void 0 || (l = ya(l), l === !1))
        return !1;
      m[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function w() {
    const T = e[n + 1];
    if (o === 5 && T === "'" || o === 6 && T === '"')
      return n++, d = "\\" + T, m[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; o !== null; )
    if (n++, a = e[n], !(a === "\\" && w())) {
      if (f = va(a), v = At[o], u = v[f] || v.l || 8, u === 8 || (o = u[0], u[1] !== void 0 && (y = m[u[1]], y && (d = a, y() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const Ji = /* @__PURE__ */ new Map();
function ba(e, t) {
  return le(e) ? e[t] : null;
}
function wa(e, t) {
  if (!le(e))
    return null;
  let n = Ji.get(t);
  if (n || (n = _a(t), n && Ji.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, a = 0;
  for (; a < o; ) {
    const l = n[a];
    if (tr.includes(l) && et(r))
      return null;
    const d = r[l];
    if (d === void 0 || ve(r))
      return null;
    r = d, a++;
  }
  return r;
}
const xa = "11.1.3", Un = -1, pn = "en-US", Zi = "", Qi = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function ka() {
  return {
    upper: (e, t) => t === "text" && W(e) ? e.toUpperCase() : t === "vnode" && le(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && W(e) ? e.toLowerCase() : t === "vnode" && le(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && W(e) ? Qi(e) : t === "vnode" && le(e) && "__v_isVNode" in e ? Qi(e.children) : e
  };
}
let ir;
function Ta(e) {
  ir = e;
}
let or;
function Sa(e) {
  or = e;
}
let rr;
function Ea(e) {
  rr = e;
}
let sr = null;
const Ca = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  sr = e;
}, Pa = /* @__NO_SIDE_EFFECTS__ */ () => sr;
let ar = null;
const eo = (e) => {
  ar = e;
}, Aa = () => ar;
let to = 0;
function La(e = {}) {
  const t = ve(e.onWarn) ? e.onWarn : Ts, n = W(e.version) ? e.version : xa, o = W(e.locale) || ve(e.locale) ? e.locale : pn, r = ve(o) ? pn : o, a = Ee(e.fallbackLocale) || Q(e.fallbackLocale) || W(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Q(e.messages) ? e.messages : Zn(r), d = Q(e.datetimeFormats) ? e.datetimeFormats : Zn(r), f = Q(e.numberFormats) ? e.numberFormats : Zn(r), u = Ce(fe(), e.modifiers, ka()), y = e.pluralRules || fe(), v = ve(e.missing) ? e.missing : null, m = ae(e.missingWarn) || Kt(e.missingWarn) ? e.missingWarn : !0, w = ae(e.fallbackWarn) || Kt(e.fallbackWarn) ? e.fallbackWarn : !0, T = !!e.fallbackFormat, E = !!e.unresolving, O = ve(e.postTranslation) ? e.postTranslation : null, g = Q(e.processor) ? e.processor : null, k = ae(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, I = !!e.escapeParameter, S = ve(e.messageCompiler) ? e.messageCompiler : ir, D = ve(e.messageResolver) ? e.messageResolver : or || ba, B = ve(e.localeFallbacker) ? e.localeFallbacker : rr || da, $ = le(e.fallbackContext) ? e.fallbackContext : void 0, J = e, G = le(J.__datetimeFormatters) ? J.__datetimeFormatters : /* @__PURE__ */ new Map(), U = le(J.__numberFormatters) ? J.__numberFormatters : /* @__PURE__ */ new Map(), se = le(J.__meta) ? J.__meta : {};
  to++;
  const K = {
    version: n,
    cid: to,
    locale: o,
    fallbackLocale: a,
    messages: l,
    modifiers: u,
    pluralRules: y,
    missing: v,
    missingWarn: m,
    fallbackWarn: w,
    fallbackFormat: T,
    unresolving: E,
    postTranslation: O,
    processor: g,
    warnHtmlMessage: k,
    escapeParameter: I,
    messageCompiler: S,
    messageResolver: D,
    localeFallbacker: B,
    fallbackContext: $,
    onWarn: t,
    __meta: se
  };
  return K.datetimeFormats = d, K.numberFormats = f, K.__datetimeFormatters = G, K.__numberFormatters = U, __INTLIFY_PROD_DEVTOOLS__ && aa(K, n, se), K;
}
const Zn = (e) => ({ [e]: fe() });
function Ai(e, t, n, o, r) {
  const { missing: a, onWarn: l } = e;
  if (a !== null) {
    const d = a(e, n, t, r);
    return W(d) ? d : t;
  } else
    return t;
}
function sn(e, t, n) {
  const o = e;
  o.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Oa(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function $a(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let o = n + 1; o < t.length; o++)
    if (Oa(e, t[o]))
      return !0;
  return !1;
}
function no(e, ...t) {
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: a, localeFallbacker: l } = e, { __datetimeFormatters: d } = e, [f, u, y, v] = ai(...t), m = ae(y.missingWarn) ? y.missingWarn : e.missingWarn;
  ae(y.fallbackWarn) ? y.fallbackWarn : e.fallbackWarn;
  const w = !!y.part, T = Pi(e, y), E = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    T
  );
  if (!W(f) || f === "")
    return new Intl.DateTimeFormat(T, v).format(u);
  let O = {}, g, k = null;
  const I = "datetime format";
  for (let B = 0; B < E.length && (g = E[B], O = n[g] || {}, k = O[f], !Q(k)); B++)
    Ai(e, f, g, m, I);
  if (!Q(k) || !W(g))
    return o ? Un : f;
  let S = `${g}__${f}`;
  Wn(v) || (S = `${S}__${JSON.stringify(v)}`);
  let D = d.get(S);
  return D || (D = new Intl.DateTimeFormat(g, Ce({}, k, v)), d.set(S, D)), w ? D.formatToParts(u) : D.format(u);
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
function ai(...e) {
  const [t, n, o, r] = e, a = fe();
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
  } else if (_s(t)) {
    if (isNaN(t.getTime()))
      throw dt(ut.INVALID_DATE_ARGUMENT);
    d = t;
  } else if (Se(t))
    d = t;
  else
    throw dt(ut.INVALID_ARGUMENT);
  return W(n) ? a.key = n : Q(n) && Object.keys(n).forEach((f) => {
    lr.includes(f) ? l[f] = n[f] : a[f] = n[f];
  }), W(o) ? a.locale = o : Q(o) && (l = o), Q(r) && (l = r), [a.key || "", d, a, l];
}
function io(e, t, n) {
  const o = e;
  for (const r in n) {
    const a = `${t}__${r}`;
    o.__datetimeFormatters.has(a) && o.__datetimeFormatters.delete(a);
  }
}
function oo(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: a, localeFallbacker: l } = e, { __numberFormatters: d } = e, [f, u, y, v] = li(...t), m = ae(y.missingWarn) ? y.missingWarn : e.missingWarn;
  ae(y.fallbackWarn) ? y.fallbackWarn : e.fallbackWarn;
  const w = !!y.part, T = Pi(e, y), E = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    T
  );
  if (!W(f) || f === "")
    return new Intl.NumberFormat(T, v).format(u);
  let O = {}, g, k = null;
  const I = "number format";
  for (let B = 0; B < E.length && (g = E[B], O = n[g] || {}, k = O[f], !Q(k)); B++)
    Ai(e, f, g, m, I);
  if (!Q(k) || !W(g))
    return o ? Un : f;
  let S = `${g}__${f}`;
  Wn(v) || (S = `${S}__${JSON.stringify(v)}`);
  let D = d.get(S);
  return D || (D = new Intl.NumberFormat(g, Ce({}, k, v)), d.set(S, D)), w ? D.formatToParts(u) : D.format(u);
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
  const [t, n, o, r] = e, a = fe();
  let l = fe();
  if (!Se(t))
    throw dt(ut.INVALID_ARGUMENT);
  const d = t;
  return W(n) ? a.key = n : Q(n) && Object.keys(n).forEach((f) => {
    cr.includes(f) ? l[f] = n[f] : a[f] = n[f];
  }), W(o) ? a.locale = o : Q(o) && (l = o), Q(r) && (l = r), [a.key || "", d, a, l];
}
function ro(e, t, n) {
  const o = e;
  for (const r in n) {
    const a = `${t}__${r}`;
    o.__numberFormatters.has(a) && o.__numberFormatters.delete(a);
  }
}
const Ia = (e) => e, Na = (e) => "", Ra = "text", Da = (e) => e.length === 0 ? "" : Si(e), Ma = ks;
function so(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Fa(e) {
  const t = Se(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Se(e.named.count) || Se(e.named.n)) ? Se(e.named.count) ? e.named.count : Se(e.named.n) ? e.named.n : t : t;
}
function Ba(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function qa(e = {}) {
  const t = e.locale, n = Fa(e), o = le(e.pluralRules) && W(t) && ve(e.pluralRules[t]) ? e.pluralRules[t] : so, r = le(e.pluralRules) && W(t) && ve(e.pluralRules[t]) ? so : void 0, a = (g) => g[o(n, g.length, r)], l = e.list || [], d = (g) => l[g], f = e.named || fe();
  Se(e.pluralIndex) && Ba(n, f);
  const u = (g) => f[g];
  function y(g, k) {
    const I = ve(e.messages) ? e.messages(g, !!k) : le(e.messages) ? e.messages[g] : !1;
    return I || (e.parent ? e.parent.message(g) : Na);
  }
  const v = (g) => e.modifiers ? e.modifiers[g] : Ia, m = Q(e.processor) && ve(e.processor.normalize) ? e.processor.normalize : Da, w = Q(e.processor) && ve(e.processor.interpolate) ? e.processor.interpolate : Ma, T = Q(e.processor) && W(e.processor.type) ? e.processor.type : Ra, O = {
    list: d,
    named: u,
    plural: a,
    linked: (g, ...k) => {
      const [I, S] = k;
      let D = "text", B = "";
      k.length === 1 ? le(I) ? (B = I.modifier || B, D = I.type || D) : W(I) && (B = I || B) : k.length === 2 && (W(I) && (B = I || B), W(S) && (D = S || D));
      const $ = y(g, !0)(O), J = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        D === "vnode" && Ee($) && B ? $[0] : $
      );
      return B ? v(B)(J, D) : J;
    },
    message: y,
    type: T,
    interpolate: w,
    normalize: m,
    values: Ce(fe(), l, f)
  };
  return O;
}
const ao = () => "", He = (e) => ve(e);
function lo(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: a, fallbackLocale: l, messages: d } = e, [f, u] = ci(...t), y = ae(u.missingWarn) ? u.missingWarn : e.missingWarn, v = ae(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = ae(u.escapeParameter) ? u.escapeParameter : e.escapeParameter, w = !!u.resolvedMessage, T = W(u.default) || ae(u.default) ? ae(u.default) ? a ? f : () => f : u.default : n ? a ? f : () => f : null, E = n || T != null && (W(T) || ve(T)), O = Pi(e, u);
  m && za(u);
  let [g, k, I] = w ? [
    f,
    O,
    d[O] || fe()
  ] : ur(e, f, O, l, v, y), S = g, D = f;
  if (!w && !(W(S) || et(S) || He(S)) && E && (S = T, D = S), !w && (!(W(S) || et(S) || He(S)) || !W(k)))
    return r ? Un : f;
  let B = !1;
  const $ = () => {
    B = !0;
  }, J = He(S) ? S : dr(e, f, k, S, D, $);
  if (B)
    return S;
  const G = Va(e, k, I, u), U = qa(G), se = Ha(e, J, U), K = o ? o(se, f) : se;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const Te = {
      timestamp: Date.now(),
      key: W(f) ? f : He(S) ? S.key : "",
      locale: k || (He(S) ? S.locale : ""),
      format: W(S) ? S : He(S) ? S.source : "",
      message: K
    };
    Te.meta = Ce({}, e.__meta, /* @__PURE__ */ Pa() || {}), la(Te);
  }
  return K;
}
function za(e) {
  Ee(e.list) ? e.list = e.list.map((t) => W(t) ? Vi(t) : t) : le(e.named) && Object.keys(e.named).forEach((t) => {
    W(e.named[t]) && (e.named[t] = Vi(e.named[t]));
  });
}
function ur(e, t, n, o, r, a) {
  const { messages: l, onWarn: d, messageResolver: f, localeFallbacker: u } = e, y = u(e, o, n);
  let v = fe(), m, w = null;
  const T = "translate";
  for (let E = 0; E < y.length && (m = y[E], v = l[m] || fe(), (w = f(v, t)) === null && (w = v[t]), !(W(w) || et(w) || He(w))); E++)
    if (!$a(m, y)) {
      const O = Ai(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        m,
        a,
        T
      );
      O !== t && (w = O);
    }
  return [w, m, v];
}
function dr(e, t, n, o, r, a) {
  const { messageCompiler: l, warnHtmlMessage: d } = e;
  if (He(o)) {
    const u = o;
    return u.locale = u.locale || n, u.key = u.key || t, u;
  }
  if (l == null) {
    const u = () => o;
    return u.locale = n, u.key = t, u;
  }
  const f = l(o, Wa(e, n, r, o, d, a));
  return f.locale = n, f.key = t, f.source = o, f;
}
function Ha(e, t, n) {
  return t(n);
}
function ci(...e) {
  const [t, n, o] = e, r = fe();
  if (!W(t) && !Se(t) && !He(t) && !et(t))
    throw dt(ut.INVALID_ARGUMENT);
  const a = Se(t) ? String(t) : (He(t), t);
  return Se(n) ? r.plural = n : W(n) ? r.default = n : Q(n) && !Wn(n) ? r.named = n : Ee(n) && (r.list = n), Se(o) ? r.plural = o : W(o) ? r.default = o : Q(o) && Ce(r, o), [a, r];
}
function Wa(e, t, n, o, r, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: r,
    onError: (l) => {
      throw a && a(l), l;
    },
    onCacheKey: (l) => vs(t, n, l)
  };
}
function Va(e, t, n, o) {
  const { modifiers: r, pluralRules: a, messageResolver: l, fallbackLocale: d, fallbackWarn: f, missingWarn: u, fallbackContext: y } = e, m = {
    locale: t,
    modifiers: r,
    pluralRules: a,
    messages: (w, T) => {
      let E = l(n, w);
      if (E == null && (y || T)) {
        const [, , O] = ur(
          y || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          w,
          t,
          d,
          f,
          u
        );
        E = l(O, w);
      }
      if (W(E) || et(E)) {
        let O = !1;
        const k = dr(e, w, t, E, w, () => {
          O = !0;
        });
        return O ? ao : k;
      } else return He(E) ? E : ao;
    }
  };
  return e.processor && (m.processor = e.processor), o.list && (m.list = o.list), o.named && (m.named = o.named), Se(o.plural) && (m.pluralIndex = o.plural), m;
}
Gs();
/*!
  * vue-i18n v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Ua = "11.1.3";
function Ya() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (It().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (It().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (It().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (It().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Fe = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: ua,
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
  return Vn(e, null, void 0);
}
const ui = /* @__PURE__ */ Ct("__translateVNode"), di = /* @__PURE__ */ Ct("__datetimeParts"), fi = /* @__PURE__ */ Ct("__numberParts"), fr = Ct("__setPluralRules"), hr = /* @__PURE__ */ Ct("__injectWithOption"), hi = /* @__PURE__ */ Ct("__dispose");
function gn(e) {
  if (!le(e) || et(e))
    return e;
  for (const t in e)
    if (Ye(e, t))
      if (!t.includes("."))
        le(e[t]) && gn(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, a = !1;
        for (let l = 0; l < o; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = fe()), !le(r[n[l]])) {
            a = !0;
            break;
          }
          r = r[n[l]];
        }
        if (a || (et(r) ? tr.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !et(r)) {
          const l = r[n[o]];
          le(l) && gn(l);
        }
      }
  return e;
}
function Li(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: a } = t, l = Q(n) ? n : Ee(o) ? fe() : { [e]: fe() };
  if (Ee(o) && o.forEach((d) => {
    if ("locale" in d && "resource" in d) {
      const { locale: f, resource: u } = d;
      f ? (l[f] = l[f] || fe(), $n(u, l[f])) : $n(u, l);
    } else
      W(d) && $n(JSON.parse(d), l);
  }), r == null && a)
    for (const d in l)
      Ye(l, d) && gn(l[d]);
  return l;
}
function mr(e) {
  return e.type;
}
function pr(e, t, n) {
  let o = le(t.messages) ? t.messages : fe();
  "__i18nGlobal" in n && (o = Li(e.locale.value, {
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
function co(e) {
  return R(Xr, null, e, 0);
}
const uo = "__INTLIFY_META__", fo = () => [], ja = () => !1;
let ho = 0;
function mo(e) {
  return (t, n, o, r) => e(n, o, Gt() || void 0, r);
}
const Xa = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Gt();
  let t = null;
  return e && (t = mr(e)[uo]) ? { [uo]: t } : null;
};
function Oi(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, a = Dn ? ue : Yr;
  let l = ae(e.inheritLocale) ? e.inheritLocale : !0;
  const d = a(
    // prettier-ignore
    t && l ? t.locale.value : W(e.locale) ? e.locale : pn
  ), f = a(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : W(e.fallbackLocale) || Ee(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : d.value
  ), u = a(Li(d.value, e)), y = a(Q(e.datetimeFormats) ? e.datetimeFormats : { [d.value]: {} }), v = a(Q(e.numberFormats) ? e.numberFormats : { [d.value]: {} });
  let m = t ? t.missingWarn : ae(e.missingWarn) || Kt(e.missingWarn) ? e.missingWarn : !0, w = t ? t.fallbackWarn : ae(e.fallbackWarn) || Kt(e.fallbackWarn) ? e.fallbackWarn : !0, T = t ? t.fallbackRoot : ae(e.fallbackRoot) ? e.fallbackRoot : !0, E = !!e.fallbackFormat, O = ve(e.missing) ? e.missing : null, g = ve(e.missing) ? mo(e.missing) : null, k = ve(e.postTranslation) ? e.postTranslation : null, I = t ? t.warnHtmlMessage : ae(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, S = !!e.escapeParameter;
  const D = t ? t.modifiers : Q(e.modifiers) ? e.modifiers : {};
  let B = e.pluralRules || t && t.pluralRules, $;
  $ = (() => {
    o && eo(null);
    const s = {
      version: Ua,
      locale: d.value,
      fallbackLocale: f.value,
      messages: u.value,
      modifiers: D,
      pluralRules: B,
      missing: g === null ? void 0 : g,
      missingWarn: m,
      fallbackWarn: w,
      fallbackFormat: E,
      unresolving: !0,
      postTranslation: k === null ? void 0 : k,
      warnHtmlMessage: I,
      escapeParameter: S,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    s.datetimeFormats = y.value, s.numberFormats = v.value, s.__datetimeFormatters = Q($) ? $.__datetimeFormatters : void 0, s.__numberFormatters = Q($) ? $.__numberFormatters : void 0;
    const c = La(s);
    return o && eo(c), c;
  })(), sn($, d.value, f.value);
  function G() {
    return [
      d.value,
      f.value,
      u.value,
      y.value,
      v.value
    ];
  }
  const U = ke({
    get: () => d.value,
    set: (s) => {
      $.locale = s, d.value = s;
    }
  }), se = ke({
    get: () => f.value,
    set: (s) => {
      $.fallbackLocale = s, f.value = s, sn($, d.value, s);
    }
  }), K = ke(() => u.value), Te = /* @__PURE__ */ ke(() => y.value), be = /* @__PURE__ */ ke(() => v.value);
  function Oe() {
    return ve(k) ? k : null;
  }
  function he(s) {
    k = s, $.postTranslation = s;
  }
  function ie() {
    return O;
  }
  function Re(s) {
    s !== null && (g = mo(s)), O = s, $.missing = g;
  }
  const ye = (s, c, h, b, P, A) => {
    G();
    let L;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || ($.fallbackContext = t ? Aa() : void 0), L = s($);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || ($.fallbackContext = void 0);
    }
    if (h !== "translate exists" && // for not `te` (e.g `t`)
    Se(L) && L === Un || h === "translate exists" && !L) {
      const [V, H] = c();
      return t && T ? b(t) : P(V);
    } else {
      if (A(L))
        return L;
      throw qe(Fe.UNEXPECTED_RETURN_TYPE);
    }
  };
  function ot(...s) {
    return ye((c) => Reflect.apply(lo, null, [c, ...s]), () => ci(...s), "translate", (c) => Reflect.apply(c.t, c, [...s]), (c) => c, (c) => W(c));
  }
  function zt(...s) {
    const [c, h, b] = s;
    if (b && !le(b))
      throw qe(Fe.INVALID_ARGUMENT);
    return ot(c, h, Ce({ resolvedMessage: !0 }, b || {}));
  }
  function Zt(...s) {
    return ye((c) => Reflect.apply(no, null, [c, ...s]), () => ai(...s), "datetime format", (c) => Reflect.apply(c.d, c, [...s]), () => Zi, (c) => W(c));
  }
  function Ht(...s) {
    return ye((c) => Reflect.apply(oo, null, [c, ...s]), () => li(...s), "number format", (c) => Reflect.apply(c.n, c, [...s]), () => Zi, (c) => W(c));
  }
  function Qt(s) {
    return s.map((c) => W(c) || Se(c) || ae(c) ? co(String(c)) : c);
  }
  const Wt = {
    normalize: Qt,
    interpolate: (s) => s,
    type: "vnode"
  };
  function en(...s) {
    return ye((c) => {
      let h;
      const b = c;
      try {
        b.processor = Wt, h = Reflect.apply(lo, null, [b, ...s]);
      } finally {
        b.processor = null;
      }
      return h;
    }, () => ci(...s), "translate", (c) => c[ui](...s), (c) => [co(c)], (c) => Ee(c));
  }
  function Vt(...s) {
    return ye((c) => Reflect.apply(oo, null, [c, ...s]), () => li(...s), "number format", (c) => c[fi](...s), fo, (c) => W(c) || Ee(c));
  }
  function tn(...s) {
    return ye((c) => Reflect.apply(no, null, [c, ...s]), () => ai(...s), "datetime format", (c) => c[di](...s), fo, (c) => W(c) || Ee(c));
  }
  function ht(s) {
    B = s, $.pluralRules = B;
  }
  function mt(s, c) {
    return ye(() => {
      if (!s)
        return !1;
      const h = W(c) ? c : d.value, b = we(h), P = $.messageResolver(b, s);
      return et(P) || He(P) || W(P);
    }, () => [s], "translate exists", (h) => Reflect.apply(h.te, h, [s, c]), ja, (h) => ae(h));
  }
  function nn(s) {
    let c = null;
    const h = nr($, f.value, d.value);
    for (let b = 0; b < h.length; b++) {
      const P = u.value[h[b]] || {}, A = $.messageResolver(P, s);
      if (A != null) {
        c = A;
        break;
      }
    }
    return c;
  }
  function Lt(s) {
    const c = nn(s);
    return c ?? (t ? t.tm(s) || {} : {});
  }
  function we(s) {
    return u.value[s] || {};
  }
  function pt(s, c) {
    if (r) {
      const h = { [s]: c };
      for (const b in h)
        Ye(h, b) && gn(h[b]);
      c = h[s];
    }
    u.value[s] = c, $.messages = u.value;
  }
  function rt(s, c) {
    u.value[s] = u.value[s] || {};
    const h = { [s]: c };
    if (r)
      for (const b in h)
        Ye(h, b) && gn(h[b]);
    c = h[s], $n(c, u.value[s]), $.messages = u.value;
  }
  function on(s) {
    return y.value[s] || {};
  }
  function p(s, c) {
    y.value[s] = c, $.datetimeFormats = y.value, io($, s, c);
  }
  function _(s, c) {
    y.value[s] = Ce(y.value[s] || {}, c), $.datetimeFormats = y.value, io($, s, c);
  }
  function N(s) {
    return v.value[s] || {};
  }
  function Y(s, c) {
    v.value[s] = c, $.numberFormats = v.value, ro($, s, c);
  }
  function _e(s, c) {
    v.value[s] = Ce(v.value[s] || {}, c), $.numberFormats = v.value, ro($, s, c);
  }
  ho++, t && Dn && (Ve(t.locale, (s) => {
    l && (d.value = s, $.locale = s, sn($, d.value, f.value));
  }), Ve(t.fallbackLocale, (s) => {
    l && (f.value = s, $.fallbackLocale = s, sn($, d.value, f.value));
  }));
  const i = {
    id: ho,
    locale: U,
    fallbackLocale: se,
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
      return D;
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
      m = s, $.missingWarn = m;
    },
    get fallbackWarn() {
      return w;
    },
    set fallbackWarn(s) {
      w = s, $.fallbackWarn = w;
    },
    get fallbackRoot() {
      return T;
    },
    set fallbackRoot(s) {
      T = s;
    },
    get fallbackFormat() {
      return E;
    },
    set fallbackFormat(s) {
      E = s, $.fallbackFormat = E;
    },
    get warnHtmlMessage() {
      return I;
    },
    set warnHtmlMessage(s) {
      I = s, $.warnHtmlMessage = s;
    },
    get escapeParameter() {
      return S;
    },
    set escapeParameter(s) {
      S = s, $.escapeParameter = s;
    },
    t: ot,
    getLocaleMessage: we,
    setLocaleMessage: pt,
    mergeLocaleMessage: rt,
    getPostTranslationHandler: Oe,
    setPostTranslationHandler: he,
    getMissingHandler: ie,
    setMissingHandler: Re,
    [fr]: ht
  };
  return i.datetimeFormats = Te, i.numberFormats = be, i.rt = zt, i.te = mt, i.tm = Lt, i.d = Zt, i.n = Ht, i.getDateTimeFormat = on, i.setDateTimeFormat = p, i.mergeDateTimeFormat = _, i.getNumberFormat = N, i.setNumberFormat = Y, i.mergeNumberFormat = _e, i[hr] = n, i[ui] = en, i[di] = tn, i[fi] = Vt, i;
}
function Ga(e) {
  const t = W(e.locale) ? e.locale : pn, n = W(e.fallbackLocale) || Ee(e.fallbackLocale) || Q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, o = ve(e.missing) ? e.missing : void 0, r = ae(e.silentTranslationWarn) || Kt(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = ae(e.silentFallbackWarn) || Kt(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, l = ae(e.fallbackRoot) ? e.fallbackRoot : !0, d = !!e.formatFallbackMessages, f = Q(e.modifiers) ? e.modifiers : {}, u = e.pluralizationRules, y = ve(e.postTranslation) ? e.postTranslation : void 0, v = W(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, m = !!e.escapeParameterHtml, w = ae(e.sync) ? e.sync : !0;
  let T = e.messages;
  if (Q(e.sharedMessages)) {
    const D = e.sharedMessages;
    T = Object.keys(D).reduce(($, J) => {
      const G = $[J] || ($[J] = {});
      return Ce(G, D[J]), $;
    }, T || {});
  }
  const { __i18n: E, __root: O, __injectWithOption: g } = e, k = e.datetimeFormats, I = e.numberFormats, S = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: T,
    flatJson: S,
    datetimeFormats: k,
    numberFormats: I,
    missing: o,
    missingWarn: r,
    fallbackWarn: a,
    fallbackRoot: l,
    fallbackFormat: d,
    modifiers: f,
    pluralRules: u,
    postTranslation: y,
    warnHtmlMessage: v,
    escapeParameter: m,
    messageResolver: e.messageResolver,
    inheritLocale: w,
    __i18n: E,
    __root: O,
    __injectWithOption: g
  };
}
function mi(e = {}) {
  const t = Oi(Ga(e)), { __extender: n } = e, o = {
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
      return ae(t.missingWarn) ? !t.missingWarn : t.missingWarn;
    },
    set silentTranslationWarn(r) {
      t.missingWarn = ae(r) ? !r : r;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return ae(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn;
    },
    set silentFallbackWarn(r) {
      t.fallbackWarn = ae(r) ? !r : r;
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
function Ka(e, t, n) {
  return {
    beforeCreate() {
      const o = Gt();
      if (!o)
        throw qe(Fe.UNEXPECTED_ERROR);
      const r = this.$options;
      if (r.i18n) {
        const a = r.i18n;
        if (r.__i18n && (a.__i18n = r.__i18n), a.__root = t, this === this.$root)
          this.$i18n = po(e, a);
        else {
          a.__injectWithOption = !0, a.__extender = n.__vueI18nExtend, this.$i18n = mi(a);
          const l = this.$i18n;
          l.__extender && (l.__disposer = l.__extender(this.$i18n));
        }
      } else if (r.__i18n)
        if (this === this.$root)
          this.$i18n = po(e, r);
        else {
          this.$i18n = mi({
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
      r.__i18nGlobal && pr(t, r, r), this.$t = (...a) => this.$i18n.t(...a), this.$rt = (...a) => this.$i18n.rt(...a), this.$te = (a, l) => this.$i18n.te(a, l), this.$d = (...a) => this.$i18n.d(...a), this.$n = (...a) => this.$i18n.n(...a), this.$tm = (a) => this.$i18n.tm(a), n.__setInstance(o, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const o = Gt();
      if (!o)
        throw qe(Fe.UNEXPECTED_ERROR);
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
function Ja({ slots: e }, t) {
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
const Za = /* @__PURE__ */ Ft({
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
  }, $i),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: o } = t, r = e.i18n || Le({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter((v) => v !== "_"), l = fe();
      e.locale && (l.locale = e.locale), e.plural !== void 0 && (l.plural = W(e.plural) ? +e.plural : e.plural);
      const d = Ja(t, a), f = r[ui](e.keypath, d, l), u = Ce(fe(), o), y = W(e.tag) || le(e.tag) ? e.tag : gr();
      return Ho(y, u, f);
    };
  }
}), go = Za;
function Qa(e) {
  return Ee(e) && !W(e[0]);
}
function vr(e, t, n, o) {
  const { slots: r, attrs: a } = t;
  return () => {
    const l = { part: !0 };
    let d = fe();
    e.locale && (l.locale = e.locale), W(e.format) ? l.key = e.format : le(e.format) && (W(e.format.key) && (l.key = e.format.key), d = Object.keys(e.format).reduce((m, w) => n.includes(w) ? Ce(fe(), m, { [w]: e.format[w] }) : m, fe()));
    const f = o(e.value, l, d);
    let u = [l.key];
    Ee(f) ? u = f.map((m, w) => {
      const T = r[m.type], E = T ? T({ [m.type]: m.value, index: w, parts: f }) : [m.value];
      return Qa(E) && (E[0].key = `${m.type}-${w}`), E;
    }) : W(f) && (u = [f]);
    const y = Ce(fe(), a), v = W(e.tag) || le(e.tag) ? e.tag : gr();
    return Ho(v, y, u);
  };
}
const el = /* @__PURE__ */ Ft({
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
  }, $i),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Le({
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
      throw qe(Fe.UNEXPECTED_ERROR);
    const u = tl(e, d.$), y = yo(f);
    return [
      Reflect.apply(u.t, u, [..._o(y)]),
      u
    ];
  };
  return {
    created: (l, d) => {
      const [f, u] = t(d);
      Dn && e.global === u && (l.__i18nWatcher = Ve(u.locale, () => {
        d.instance && d.instance.$forceUpdate();
      })), l.__composer = u, l.textContent = f;
    },
    unmounted: (l) => {
      Dn && l.__i18nWatcher && (l.__i18nWatcher(), l.__i18nWatcher = void 0, delete l.__i18nWatcher), l.__composer && (l.__composer = void 0, delete l.__composer);
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
      throw qe(Fe.REQUIRED_VALUE, "path");
    return e;
  } else
    throw qe(Fe.INVALID_VALUE);
}
function _o(e) {
  const { path: t, locale: n, args: o, choice: r, plural: a } = e, l = {}, d = o || {};
  return W(n) && (l.locale = n), Se(r) && (l.plural = r), Se(a) && (l.plural = a), [t, d, l];
}
function il(e, t, ...n) {
  const o = Q(n[0]) ? n[0] : {};
  (ae(o.globalInstall) ? o.globalInstall : !0) && ([go.name, "I18nT"].forEach((a) => e.component(a, go)), [vo.name, "I18nN"].forEach((a) => e.component(a, vo)), [wo.name, "I18nD"].forEach((a) => e.component(a, wo))), e.directive("t", nl(t));
}
const ol = /* @__PURE__ */ Ct("global-vue-i18n");
function rl(e = {}) {
  const t = __VUE_I18N_LEGACY_API__ && ae(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, n = ae(e.globalInjection) ? e.globalInjection : !0, o = /* @__PURE__ */ new Map(), [r, a] = sl(e, t), l = /* @__PURE__ */ Ct("");
  function d(v) {
    return o.get(v) || null;
  }
  function f(v, m) {
    o.set(v, m);
  }
  function u(v) {
    o.delete(v);
  }
  const y = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && t ? "legacy" : "composition";
    },
    // install plugin
    async install(v, ...m) {
      if (v.__VUE_I18N_SYMBOL__ = l, v.provide(v.__VUE_I18N_SYMBOL__, y), Q(m[0])) {
        const E = m[0];
        y.__composerExtend = E.__composerExtend, y.__vueI18nExtend = E.__vueI18nExtend;
      }
      let w = null;
      !t && n && (w = ml(v, y.global)), __VUE_I18N_FULL_INSTALL__ && il(v, y, ...m), __VUE_I18N_LEGACY_API__ && t && v.mixin(Ka(a, a.__composer, y));
      const T = v.unmount;
      v.unmount = () => {
        w && w(), y.dispose(), T();
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
function Le(e = {}) {
  const t = Gt();
  if (t == null)
    throw qe(Fe.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw qe(Fe.NOT_INSTALLED);
  const n = al(t), o = cl(n), r = mr(t), a = ll(e, r);
  if (a === "global")
    return pr(o, e, r), o;
  if (a === "parent") {
    let f = ul(n, t, e.__useComponent);
    return f == null && (f = o), f;
  }
  const l = n;
  let d = l.__getInstance(t);
  if (d == null) {
    const f = Ce({}, e);
    "__i18n" in r && (f.__i18n = r.__i18n), o && (f.__root = o), d = Oi(f), l.__composerExtend && (d[hi] = l.__composerExtend(d)), fl(l, t, d), l.__setInstance(t, d);
  }
  return d;
}
function sl(e, t) {
  const n = Ur(), o = __VUE_I18N_LEGACY_API__ && t ? n.run(() => mi(e)) : n.run(() => Oi(e));
  if (o == null)
    throw qe(Fe.UNEXPECTED_ERROR);
  return [n, o];
}
function al(e) {
  const t = ft(e.isCE ? ol : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw qe(e.isCE ? Fe.NOT_INSTALLED_WITH_PROVIDE : Fe.UNEXPECTED_ERROR);
  return t;
}
function ll(e, t) {
  return Wn(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function cl(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function ul(e, t, n = !1) {
  let o = null;
  const r = t.root;
  let a = dl(t, n);
  for (; a != null; ) {
    const l = e;
    if (e.mode === "composition")
      o = l.__getInstance(a);
    else if (__VUE_I18N_LEGACY_API__) {
      const d = l.__getInstance(a);
      d != null && (o = d.__composer, n && o && !o[hr] && (o = null));
    }
    if (o != null || r === a)
      break;
    a = a.parent;
  }
  return o;
}
function dl(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function fl(e, t, n) {
  Bt(() => {
  }, t), Hn(() => {
    const o = n;
    e.__deleteInstance(t);
    const r = o[hi];
    r && (r(), delete o[hi]);
  }, t);
}
const hl = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], bo = ["t", "rt", "d", "n", "tm", "te"];
function ml(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return hl.forEach((r) => {
    const a = Object.getOwnPropertyDescriptor(t, r);
    if (!a)
      throw qe(Fe.UNEXPECTED_ERROR);
    const l = jr(a.value) ? {
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
  }), e.config.globalProperties.$i18n = n, bo.forEach((r) => {
    const a = Object.getOwnPropertyDescriptor(t, r);
    if (!a || !a.value)
      throw qe(Fe.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${r}`, a);
  }), () => {
    delete e.config.globalProperties.$i18n, bo.forEach((r) => {
      delete e.config.globalProperties[`$${r}`];
    });
  };
}
const pl = /* @__PURE__ */ Ft({
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
  }, $i),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Le({
      useScope: e.scope,
      __useComponent: !0
    });
    return vr(e, t, lr, (...o) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[di](...o)
    ));
  }
}), wo = pl;
Ya();
Ta(ra);
Sa(wa);
Ea(nr);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = It();
  e.__INTLIFY__ = !0, sa(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const gl = {
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
}), Mn = rl({
  legacy: !1,
  fallbackLocale: "en",
  locale: "en",
  messages: gl,
  pluralizationRules: vl()
}), ln = "choose_accommodation", yr = "empty_cart", In = "booking_confirmation", xo = "reservation_details", Qn = "cancel_reservation", wn = (e, t) => {
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
const Xe = /* @__PURE__ */ wn(yl, [["render", bl]]), wl = {}, xl = { class: "divider" };
function kl(e, t) {
  return C(), F("div", xl);
}
const Ae = /* @__PURE__ */ wn(wl, [["render", kl]]), Tl = { class: "header" }, Sl = { class: "content" }, El = { class: "amenities" }, Cl = { class: "footer" }, xn = {
  __name: "BflexSkeletonLoader",
  props: {
    isResult: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (C(), re(Xe, {
      class: Ze(["accommodation-skeleton", { "accommodation-result": e.isResult }])
    }, {
      default: q(() => [
        x("div", Tl, [
          n[2] || (n[2] = x("div", { class: "thumbnail" }, null, -1)),
          x("div", Sl, [
            n[0] || (n[0] = x("div", { class: "title-skeleton" }, null, -1)),
            n[1] || (n[1] = x("div", { class: "description" }, [
              x("div", { class: "line" }),
              x("div", { class: "line" }),
              x("div", { class: "line line-short" })
            ], -1)),
            x("div", El, [
              (C(), F(de, null, Pe(5, (o) => x("div", {
                key: o,
                class: "amenity-item"
              })), 64))
            ])
          ])
        ]),
        R(Ae),
        x("div", Cl, [
          n[4] || (n[4] = x("div", { class: "option-header" }, [
            x("div", { class: "option-title" }),
            x("div", { class: "option-value" })
          ], -1)),
          R(Ae),
          (C(), F(de, null, Pe(2, (o) => x("div", {
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
function Pl(e, t, n = "en-GB") {
  const o = { day: "numeric", month: "short" }, r = { day: "numeric", month: "short", year: "numeric" }, a = new Date(e), l = new Date(t), d = a.getFullYear() === l.getFullYear() && a.getMonth() === l.getMonth(), f = a.getFullYear() === l.getFullYear();
  return d ? `${a.toLocaleDateString(n, o)} — ${l.toLocaleDateString(n, o)} ${l.getFullYear()}` : f ? `${a.toLocaleDateString(n, o)} — ${l.toLocaleDateString(n, o)} ${l.getFullYear()}` : `${a.toLocaleDateString(n, r)} — ${l.toLocaleDateString(n, r)}`;
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
  const o = [], [r, a] = e.split(":").map(Number), [l, d] = t.split(":").map(Number), f = /* @__PURE__ */ new Date();
  f.setHours(r, a, 0, 0);
  const u = /* @__PURE__ */ new Date();
  u.setHours(l, d, 0, 0);
  const y = new Date(f);
  for (; y <= u; ) {
    const v = y.getHours().toString().padStart(2, "0"), m = y.getMinutes().toString().padStart(2, "0");
    o.push(`${v}:${m}`), y.setMinutes(y.getMinutes() + n);
  }
  return o;
}
function Ll(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Nn = { exports: {} }, Ol = Nn.exports, ko;
function $l() {
  return ko || (ko = 1, function(e, t) {
    (function(n, o) {
      e.exports = o();
    })(Ol, function() {
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
          var b = c[Symbol.toPrimitive];
          if (b !== void 0) {
            var P = b.call(c, h);
            if (typeof P != "object") return P;
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
        for (var b = function(A) {
          for (var L in A) Object.prototype.hasOwnProperty.call(A, L) && (s && Object.prototype.toString.call(A[L]) === "[object Object]" ? i[L] = f(!0, i[L], A[L]) : i[L] = A[L]);
        }; c < h; c++) {
          var P = arguments[c];
          b(P);
        }
        return i;
      }
      function u(i, s) {
        if ((K(i) || i === window || i === document) && (i = [i]), be(i) || Oe(i) || (i = [i]), Re(i) != 0) {
          if (be(i) && !Oe(i)) for (var c = i.length, h = 0; h < c && s.call(i[h], i[h], h, i) !== !1; h++) ;
          else if (Oe(i)) {
            for (var b in i) if (ie(i, b) && s.call(i[b], i[b], b, i) === !1) break;
          }
        }
      }
      function y(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, h = i[d] = i[d] || [], b = { all: h, evt: null, found: null };
        return s && c && Re(h) > 0 && u(h, function(P, A) {
          if (P.eventName == s && P.fn.toString() == c.toString()) return b.found = !0, b.evt = A, !1;
        }), b;
      }
      function v(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = s.onElement, h = s.withCallback, b = s.avoidDuplicate, P = b === void 0 || b, A = s.once, L = A !== void 0 && A, V = s.useCapture, H = V !== void 0 && V, j = arguments.length > 2 ? arguments[2] : void 0, X = c || [];
        function Z(ee) {
          U(h) && h.call(j, ee, this), L && Z.destroy();
        }
        return se(X) && (X = document.querySelectorAll(X)), Z.destroy = function() {
          u(X, function(ee) {
            var ne = y(ee, i, Z);
            ne.found && ne.all.splice(ne.evt, 1), ee.removeEventListener && ee.removeEventListener(i, Z, H);
          });
        }, u(X, function(ee) {
          var ne = y(ee, i, Z);
          (ee.addEventListener && P && !ne.found || !P) && (ee.addEventListener(i, Z, H), ne.all.push({ eventName: i, fn: Z }));
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
      function T(i, s) {
        return i.classList.contains(s);
      }
      function E(i, s) {
        for (; i !== document.body; ) {
          if (!(i = i.parentElement)) return !1;
          if (typeof i.matches == "function" ? i.matches(s) : i.msMatchesSelector(s)) return i;
        }
      }
      function O(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!i || s === "") return !1;
        if (s === "none") return U(c) && c(), !1;
        var h = B(), b = s.split(" ");
        u(b, function(P) {
          m(i, "g" + P);
        }), v(h, { onElement: i, avoidDuplicate: !1, once: !0, withCallback: function(P, A) {
          u(b, function(L) {
            w(A, "g" + L);
          }), U(c) && c();
        } });
      }
      function g(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        if (s === "") return i.style.webkitTransform = "", i.style.MozTransform = "", i.style.msTransform = "", i.style.OTransform = "", i.style.transform = "", !1;
        i.style.webkitTransform = s, i.style.MozTransform = s, i.style.msTransform = s, i.style.OTransform = s, i.style.transform = s;
      }
      function k(i) {
        i.style.display = "block";
      }
      function I(i) {
        i.style.display = "none";
      }
      function S(i) {
        var s = document.createDocumentFragment(), c = document.createElement("div");
        for (c.innerHTML = i; c.firstChild; ) s.appendChild(c.firstChild);
        return s;
      }
      function D() {
        return { width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight };
      }
      function B() {
        var i, s = document.createElement("fakeelement"), c = { animation: "animationend", OAnimation: "oAnimationEnd", MozAnimation: "animationend", WebkitAnimation: "webkitAnimationEnd" };
        for (i in c) if (s.style[i] !== void 0) return c[i];
      }
      function $(i, s, c, h) {
        if (i()) s();
        else {
          var b;
          c || (c = 100);
          var P = setInterval(function() {
            i() && (clearInterval(P), b && clearTimeout(b), s());
          }, c);
        }
      }
      function J(i, s, c) {
        if (he(i)) console.error("Inject assets error");
        else if (U(s) && (c = s, s = !1), se(s) && s in window) U(c) && c();
        else {
          var h;
          if (i.indexOf(".css") !== -1) {
            if ((h = document.querySelectorAll('link[href="' + i + '"]')) && h.length > 0) return void (U(c) && c());
            var b = document.getElementsByTagName("head")[0], P = b.querySelectorAll('link[rel="stylesheet"]'), A = document.createElement("link");
            return A.rel = "stylesheet", A.type = "text/css", A.href = i, A.media = "all", P ? b.insertBefore(A, P[0]) : b.appendChild(A), void (U(c) && c());
          }
          if ((h = document.querySelectorAll('script[src="' + i + '"]')) && h.length > 0) {
            if (U(c)) {
              if (se(s)) return $(function() {
                return window[s] !== void 0;
              }, function() {
                c();
              }), !1;
              c();
            }
          } else {
            var L = document.createElement("script");
            L.type = "text/javascript", L.src = i, L.onload = function() {
              if (U(c)) {
                if (se(s)) return $(function() {
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
      function U(i) {
        return typeof i == "function";
      }
      function se(i) {
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
      function he(i) {
        return i == null;
      }
      function ie(i, s) {
        return i !== null && hasOwnProperty.call(i, s);
      }
      function Re(i) {
        if (Oe(i)) {
          if (i.keys) return i.keys().length;
          var s = 0;
          for (var c in i) ie(i, c) && s++;
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
        })), b = i < 0 ? 1 : i + 1;
        b > h && (b = "1");
        var P = c.filter(function(L) {
          return L >= parseInt(b);
        }), A = P.sort()[0];
        return document.querySelector('.gbtn[data-taborder="'.concat(A, '"]'));
      }
      function zt(i) {
        if (i.events.hasOwnProperty("keyboard")) return !1;
        i.events.keyboard = v("keydown", { onElement: window, withCallback: function(s, c) {
          var h = (s = s || window.event).keyCode;
          if (h == 9) {
            var b = document.querySelector(".gbtn.focused");
            if (!b) {
              var P = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
              if (P == "input" || P == "textarea" || P == "button") return;
            }
            s.preventDefault();
            var A = document.querySelectorAll(".gbtn[data-taborder]");
            if (!A || A.length <= 0) return;
            if (!b) {
              var L = ot();
              return void (L && (L.focus(), m(L, "focused")));
            }
            var V = ot(b.getAttribute("data-taborder"));
            w(b, "focused"), V && (V.focus(), m(V, "focused"));
          }
          h == 39 && i.nextSlide(), h == 37 && i.prevSlide(), h == 27 && i.close();
        } });
      }
      var Zt = r(function i(s, c) {
        var h = this, b = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        if (n(this, i), this.img = s, this.slide = c, this.onclose = b, this.img.setZoomEvents) return !1;
        this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", function(P) {
          return h.dragStart(P);
        }, !1), this.img.addEventListener("mouseup", function(P) {
          return h.dragEnd(P);
        }, !1), this.img.addEventListener("mousemove", function(P) {
          return h.drag(P);
        }, !1), this.img.addEventListener("click", function(P) {
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
      } }]), Ht = r(function i() {
        var s = this, c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i);
        var h = c.dragEl, b = c.toleranceX, P = b === void 0 ? 40 : b, A = c.toleranceY, L = A === void 0 ? 65 : A, V = c.slide, H = V === void 0 ? null : V, j = c.instance, X = j === void 0 ? null : j;
        this.el = h, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = P, this.toleranceY = L, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = H, this.instance = X, this.el.addEventListener("mousedown", function(Z) {
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
          i.target.classList.contains("nodrag") || E(i.target, ".nodrag") || ["input", "select", "textarea", "button", "a"].indexOf(s) !== -1 ? this.active = !1 : (i.preventDefault(), (i.target === this.el || s !== "img" && E(i.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = E(i.target, ".ginner-container")));
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
            var b = this.shouldClose();
            return !this.instance.settings.dragAutoSnap && b && (this.doSlideClose = !0), void (this.instance.settings.dragAutoSnap && b && this.instance.close());
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
        var b = i.querySelector(".gslide-media"), P = new Image(), A = "gSlideTitle_" + c, L = "gSlideDesc_" + c;
        P.addEventListener("load", function() {
          U(h) && h();
        }, !1), P.src = s.href, s.sizes != "" && s.srcset != "" && (P.sizes = s.sizes, P.srcset = s.srcset), P.alt = "", he(s.alt) || s.alt === "" || (P.alt = s.alt), s.title !== "" && P.setAttribute("aria-labelledby", A), s.description !== "" && P.setAttribute("aria-describedby", L), s.hasOwnProperty("_hasCustomWidth") && s._hasCustomWidth && (P.style.width = s.width), s.hasOwnProperty("_hasCustomHeight") && s._hasCustomHeight && (P.style.height = s.height), b.insertBefore(P, b.firstChild);
      }
      function Tn(i, s, c, h) {
        var b = this, P = i.querySelector(".ginner-container"), A = "gvideo" + c, L = i.querySelector(".gslide-media"), V = this.getAllPlayers();
        m(P, "gvideo-container"), L.insertBefore(S('<div class="gvideo-wrapper"></div>'), L.firstChild);
        var H = i.querySelector(".gvideo-wrapper");
        J(this.settings.plyr.css, "Plyr");
        var j = s.href, X = s == null ? void 0 : s.videoProvider, Z = !1;
        L.style.maxWidth = s.width, J(this.settings.plyr.js, "Plyr", function() {
          if (!X && j.match(/vimeo\.com\/([0-9]*)/) && (X = "vimeo"), !X && (j.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || j.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/)) && (X = "youtube"), X === "local" || !X) {
            X = "local";
            var ee = '<video id="' + A + '" ';
            ee += 'style="background:#000; max-width: '.concat(s.width, ';" '), ee += 'preload="metadata" ', ee += 'x-webkit-airplay="allow" ', ee += "playsinline ", ee += "controls ", ee += 'class="gvideo-local">', ee += '<source src="'.concat(j, '">'), Z = S(ee += "</video>");
          }
          var ne = Z || S('<div id="'.concat(A, '" data-plyr-provider="').concat(X, '" data-plyr-embed-id="').concat(j, '"></div>'));
          m(H, "".concat(X, "-video gvideo")), H.appendChild(ne), H.setAttribute("data-id", A), H.setAttribute("data-index", c);
          var xe = ie(b.settings.plyr, "config") ? b.settings.plyr.config : {}, ze = new Plyr("#" + A, xe);
          ze.on("ready", function(Be) {
            V[A] = Be.detail.plyr, U(h) && h();
          }), $(function() {
            return i.querySelector("iframe") && i.querySelector("iframe").dataset.ready == "true";
          }, function() {
            b.resize(i);
          }), ze.on("enterfullscreen", Wt), ze.on("exitfullscreen", Wt);
        });
      }
      function Wt(i) {
        var s = E(i.target, ".gslide-media");
        i.type === "enterfullscreen" && m(s, "fullscreen"), i.type === "exitfullscreen" && w(s, "fullscreen");
      }
      function en(i, s, c, h) {
        var b, P = this, A = i.querySelector(".gslide-media"), L = !(!ie(s, "href") || !s.href) && s.href.split("#").pop().trim(), V = !(!ie(s, "content") || !s.content) && s.content;
        if (V && (se(V) && (b = S('<div class="ginlined-content">'.concat(V, "</div>"))), K(V))) {
          V.style.display == "none" && (V.style.display = "block");
          var H = document.createElement("div");
          H.className = "ginlined-content", H.appendChild(V), b = H;
        }
        if (L) {
          var j = document.getElementById(L);
          if (!j) return !1;
          var X = j.cloneNode(!0);
          X.style.height = s.height, X.style.maxWidth = s.width, m(X, "ginlined-content"), b = X;
        }
        if (!b) return console.error("Unable to append inline slide content", s), !1;
        A.style.height = s.height, A.style.width = s.width, A.appendChild(b), this.events["inlineclose" + L] = v("click", { onElement: A.querySelectorAll(".gtrigger-close"), withCallback: function(Z) {
          Z.preventDefault(), P.close();
        } }), U(h) && h();
      }
      function Vt(i, s, c, h) {
        var b = i.querySelector(".gslide-media"), P = function(A) {
          var L = A.url, V = A.allow, H = A.callback, j = A.appendTo, X = document.createElement("iframe");
          return X.className = "vimeo-video gvideo", X.src = L, X.style.width = "100%", X.style.height = "100%", V && X.setAttribute("allow", V), X.onload = function() {
            X.onload = null, m(X, "node-ready"), U(H) && H();
          }, j && j.appendChild(X), X;
        }({ url: s.href, callback: h });
        b.parentNode.style.maxWidth = s.width, b.parentNode.style.height = s.height, b.appendChild(P);
      }
      var tn = r(function i() {
        var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, i), this.defaults = { href: "", sizes: "", srcset: "", title: "", type: "", videoProvider: "", description: "", alt: "", descPosition: "bottom", effect: "", width: "", height: "", content: !1, zoomable: !0, draggable: !0 }, Oe(s) && (this.defaults = f(this.defaults, s));
      }, [{ key: "sourceType", value: function(i) {
        var s = i;
        return (i = i.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) !== null ? "image" : i.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || i.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || i.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || i.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/) || i.match(/vimeo\.com\/([0-9]*)/) || i.match(/\.(mp4|ogg|webm|mov)/) !== null ? "video" : i.match(/\.(mp3|wav|wma|aac|ogg)/) !== null ? "audio" : i.indexOf("#") > -1 && s.split("#").pop().trim() !== "" ? "inline" : i.indexOf("goajax=true") > -1 ? "ajax" : "external";
      } }, { key: "parseConfig", value: function(i, s) {
        var c = this, h = f({ descPosition: s.descPosition }, this.defaults);
        if (Oe(i) && !K(i)) {
          ie(i, "type") || (ie(i, "content") && i.content ? i.type = "inline" : ie(i, "href") && (i.type = this.sourceType(i.href)));
          var b = f(h, i);
          return this.setSize(b, s), b;
        }
        var P = "", A = i.getAttribute("data-glightbox"), L = i.nodeName.toLowerCase();
        if (L === "a" && (P = i.href), L === "img" && (P = i.src, h.alt = i.alt), h.href = P, u(h, function(ee, ne) {
          ie(s, ne) && ne !== "width" && (h[ne] = s[ne]);
          var xe = i.dataset[ne];
          he(xe) || (h[ne] = c.sanitizeValue(xe));
        }), h.content && (h.type = "inline"), !h.type && P && (h.type = this.sourceType(P)), he(A)) {
          if (!h.title && L == "a") {
            var V = i.title;
            he(V) || V === "" || (h.title = V);
          }
          if (!h.title && L == "img") {
            var H = i.alt;
            he(H) || H === "" || (h.title = H);
          }
        } else {
          var j = [];
          u(h, function(ee, ne) {
            j.push(";\\s?" + ne);
          }), j = j.join("\\s?:|"), A.trim() !== "" && u(h, function(ee, ne) {
            var xe = A, ze = new RegExp("s?" + ne + "s?:s?(.*?)(" + j + "s?:|$)"), Be = xe.match(ze);
            if (Be && Be.length && Be[1]) {
              var st = Be[1].trim().replace(/;\s*$/, "");
              h[ne] = c.sanitizeValue(st);
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
        var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, h = i.type == "video" ? this.checkSize(s.videosWidth) : this.checkSize(s.width), b = this.checkSize(s.height);
        return i.width = ie(i, "width") && i.width !== "" ? this.checkSize(i.width) : h, i.height = ie(i, "height") && i.height !== "" ? this.checkSize(i.height) : b, c && i.type == "image" && (i._hasCustomWidth = !!c.dataset.width, i._hasCustomHeight = !!c.dataset.height), i;
      } }, { key: "checkSize", value: function(i) {
        return ye(i) ? "".concat(i, "px") : i;
      } }, { key: "sanitizeValue", value: function(i) {
        return i !== "true" && i !== "false" ? i : i === "true";
      } }]), ht = r(function i(s, c, h) {
        n(this, i), this.element = s, this.instance = c, this.index = h;
      }, [{ key: "setContent", value: function() {
        var i = this, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (T(s, "loaded")) return !1;
        var h = this.instance.settings, b = this.slideConfig, P = G();
        U(h.beforeSlideLoad) && h.beforeSlideLoad({ index: this.index, slide: s, player: !1 });
        var A = b.type, L = b.descPosition, V = s.querySelector(".gslide-media"), H = s.querySelector(".gslide-title"), j = s.querySelector(".gslide-desc"), X = s.querySelector(".gdesc-inner"), Z = c, ee = "gSlideTitle_" + this.index, ne = "gSlideDesc_" + this.index;
        if (U(h.afterSlideLoad) && (Z = function() {
          U(c) && c(), h.afterSlideLoad({ index: i.index, slide: s, player: i.instance.getSlidePlayerInstance(i.index) });
        }), b.title == "" && b.description == "" ? X && X.parentNode.parentNode.removeChild(X.parentNode) : (H && b.title !== "" ? (H.id = ee, H.innerHTML = b.title) : H.parentNode.removeChild(H), j && b.description !== "" ? (j.id = ne, P && h.moreLength > 0 ? (b.smallDescription = this.slideShortDesc(b.description, h.moreLength, h.moreText), j.innerHTML = b.smallDescription, this.descriptionEvents(j, b)) : j.innerHTML = b.description) : j.parentNode.removeChild(j), m(V.parentNode, "desc-".concat(L)), m(X.parentNode, "description-".concat(L))), m(V, "gslide-".concat(A)), m(s, "loaded"), A !== "video") {
          if (A !== "external") return A === "inline" ? (en.apply(this.instance, [s, b, this.index, Z]), void (b.draggable && new Ht({ dragEl: s.querySelector(".gslide-inline"), toleranceX: h.dragToleranceX, toleranceY: h.dragToleranceY, slide: s, instance: this.instance }))) : void (A !== "image" ? U(Z) && Z() : Qt(s, b, this.index, function() {
            var xe = s.querySelector("img");
            b.draggable && new Ht({ dragEl: xe, toleranceX: h.dragToleranceX, toleranceY: h.dragToleranceY, slide: s, instance: i.instance }), b.zoomable && xe.naturalWidth > xe.offsetWidth && (m(xe, "zoomable"), new Zt(xe, s, function() {
              i.instance.resize();
            })), U(Z) && Z();
          }));
          Vt.apply(this, [s, b, this.index, Z]);
        } else Tn.apply(this.instance, [s, b, this.index, Z]);
      } }, { key: "slideShortDesc", value: function(i) {
        var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], h = document.createElement("div");
        h.innerHTML = i;
        var b = h.innerText, P = c;
        if ((i = b.trim()).length <= s) return i;
        var A = i.substr(0, s - 1);
        return P ? (h = null, A + '... <a href="#" class="desc-more">' + c + "</a>") : A;
      } }, { key: "descriptionEvents", value: function(i, s) {
        var c = this, h = i.querySelector(".desc-more");
        if (!h) return !1;
        v("click", { onElement: h, withCallback: function(b, P) {
          b.preventDefault();
          var A = document.body, L = E(P, ".gslide-desc");
          if (!L) return !1;
          L.innerHTML = s.description, m(A, "gdesc-open");
          var V = v("click", { onElement: [A, E(L, ".gslide-description")], withCallback: function(H, j) {
            H.target.nodeName.toLowerCase() !== "a" && (w(A, "gdesc-open"), m(A, "gdesc-closed"), L.innerHTML = s.smallDescription, c.descriptionEvents(L, s), setTimeout(function() {
              w(A, "gdesc-closed");
            }, 400), V.destroy());
          } });
        } });
      } }, { key: "create", value: function() {
        return S(this.instance.settings.slideHTML);
      } }, { key: "getConfig", value: function() {
        K(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
        var i = new tn(this.instance.settings.slideExtraAttributes);
        return this.slideConfig = i.parseConfig(this.element, this.instance.settings), this.slideConfig;
      } }]);
      function mt(i) {
        return Math.sqrt(i.x * i.x + i.y * i.y);
      }
      function nn(i, s) {
        var c = function(h, b) {
          var P = mt(h) * mt(b);
          if (P === 0) return 0;
          var A = function(L, V) {
            return L.x * V.x + L.y * V.y;
          }(h, b) / P;
          return A > 1 && (A = 1), Math.acos(A);
        }(i, s);
        return function(h, b) {
          return h.x * b.y - b.x * h.y;
        }(i, s) > 0 && (c *= -1), 180 * c / Math.PI;
      }
      var Lt = r(function i(s) {
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
        var c = new Lt(i);
        return c.add(s), c;
      }
      var pt = r(function i(s, c) {
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
            s.x = c.x, s.y = c.y, this.pinchStartLen = mt(s), this.multipointStart.dispatch(i, this.element);
          }
          this._preventTap = !1, this.longTapTimeout = setTimeout((function() {
            this.longTap.dispatch(i, this.element), this._preventTap = !0;
          }).bind(this), 750);
        }
      } }, { key: "move", value: function(i) {
        if (i.touches) {
          var s = this.preV, c = i.touches.length, h = i.touches[0].pageX, b = i.touches[0].pageY;
          if (this.isDoubleTap = !1, c > 1) {
            var P = i.touches[1].pageX, A = i.touches[1].pageY, L = { x: i.touches[1].pageX - h, y: i.touches[1].pageY - b };
            s.x !== null && (this.pinchStartLen > 0 && (i.zoom = mt(L) / this.pinchStartLen, this.pinch.dispatch(i, this.element)), i.angle = nn(L, s), this.rotate.dispatch(i, this.element)), s.x = L.x, s.y = L.y, this.x2 !== null && this.sx2 !== null ? (i.deltaX = (h - this.x2 + P - this.sx2) / 2, i.deltaY = (b - this.y2 + A - this.sy2) / 2) : (i.deltaX = 0, i.deltaY = 0), this.twoFingerPressMove.dispatch(i, this.element), this.sx2 = P, this.sy2 = A;
          } else {
            if (this.x2 !== null) {
              i.deltaX = h - this.x2, i.deltaY = b - this.y2;
              var V = Math.abs(this.x1 - this.x2), H = Math.abs(this.y1 - this.y2);
              (V > 10 || H > 10) && (this._preventTap = !0);
            } else i.deltaX = 0, i.deltaY = 0;
            this.pressMove.dispatch(i, this.element);
          }
          this.touchMove.dispatch(i, this.element), this._cancelLongTap(), this.x2 = h, this.y2 = b, c > 1 && i.preventDefault();
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
          var A, L = document.createElement("fakeelement"), V = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
          for (A in V) if (L.style[A] !== void 0) return V[A];
        }(), c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, h = T(i, "gslide-media") ? i : i.querySelector(".gslide-media"), b = E(h, ".ginner-container"), P = i.querySelector(".gslide-description");
        c > 769 && (h = b), m(h, "greset"), g(h, "translate3d(0, 0, 0)"), v(s, { onElement: h, once: !0, withCallback: function(A, L) {
          w(h, "greset");
        } }), h.style.opacity = "", P && (P.style.opacity = "");
      }
      function on(i) {
        if (i.events.hasOwnProperty("touch")) return !1;
        var s, c, h, b = D(), P = b.width, A = b.height, L = !1, V = null, H = null, j = null, X = !1, Z = 1, ee = 1, ne = !1, xe = !1, ze = null, Be = null, st = null, Ie = null, at = 0, lt = 0, rn = !1, Ut = !1, Ge = {}, Ke = {}, qi = 0, zi = 0, qr = document.getElementById("glightbox-slider"), Sn = document.querySelector(".goverlay"), zr = new pt(qr, { touchStart: function(me) {
          if (L = !0, (T(me.targetTouches[0].target, "ginner-container") || E(me.targetTouches[0].target, ".gslide-desc") || me.targetTouches[0].target.nodeName.toLowerCase() == "a") && (L = !1), E(me.targetTouches[0].target, ".gslide-inline") && !T(me.targetTouches[0].target.parentNode, "gslide-inline") && (L = !1), L) {
            if (Ke = me.targetTouches[0], Ge.pageX = me.targetTouches[0].pageX, Ge.pageY = me.targetTouches[0].pageY, qi = me.targetTouches[0].clientX, zi = me.targetTouches[0].clientY, V = i.activeSlide, H = V.querySelector(".gslide-media"), h = V.querySelector(".gslide-inline"), j = null, T(H, "gslide-image") && (j = H.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (H = V.querySelector(".ginner-container")), w(Sn, "greset"), me.pageX > 20 && me.pageX < window.innerWidth - 20) return;
            me.preventDefault();
          }
        }, touchMove: function(me) {
          if (L && (Ke = me.targetTouches[0], !ne && !xe)) {
            if (h && h.offsetHeight > A) {
              var De = Ge.pageX - Ke.pageX;
              if (Math.abs(De) <= 13) return !1;
            }
            X = !0;
            var gt, En = me.targetTouches[0].clientX, Hr = me.targetTouches[0].clientY, Wr = qi - En, Vr = zi - Hr;
            if (Math.abs(Wr) > Math.abs(Vr) ? (rn = !1, Ut = !0) : (Ut = !1, rn = !0), s = Ke.pageX - Ge.pageX, at = 100 * s / P, c = Ke.pageY - Ge.pageY, lt = 100 * c / A, rn && j && (gt = 1 - Math.abs(c) / A, Sn.style.opacity = gt, i.settings.touchFollowAxis && (at = 0)), Ut && (gt = 1 - Math.abs(s) / P, H.style.opacity = gt, i.settings.touchFollowAxis && (lt = 0)), !j) return g(H, "translate3d(".concat(at, "%, 0, 0)"));
            g(H, "translate3d(".concat(at, "%, ").concat(lt, "%, 0)"));
          }
        }, touchEnd: function() {
          if (L) {
            if (X = !1, xe || ne) return st = ze, void (Ie = Be);
            var me = Math.abs(parseInt(lt)), De = Math.abs(parseInt(at));
            if (!(me > 29 && j)) return me < 29 && De < 25 ? (m(Sn, "greset"), Sn.style.opacity = 1, rt(H)) : void 0;
            i.close();
          }
        }, multipointEnd: function() {
          setTimeout(function() {
            ne = !1;
          }, 50);
        }, multipointStart: function() {
          ne = !0, Z = ee || 1;
        }, pinch: function(me) {
          if (!j || X) return !1;
          ne = !0, j.scaleX = j.scaleY = Z * me.zoom;
          var De = Z * me.zoom;
          if (xe = !0, De <= 1) return xe = !1, De = 1, Ie = null, st = null, ze = null, Be = null, void j.setAttribute("style", "");
          De > 4.5 && (De = 4.5), j.style.transform = "scale3d(".concat(De, ", ").concat(De, ", 1)"), ee = De;
        }, pressMove: function(me) {
          if (xe && !ne) {
            var De = Ke.pageX - Ge.pageX, gt = Ke.pageY - Ge.pageY;
            st && (De += st), Ie && (gt += Ie), ze = De, Be = gt;
            var En = "translate3d(".concat(De, "px, ").concat(gt, "px, 0)");
            ee && (En += " scale3d(".concat(ee, ", ").concat(ee, ", 1)")), g(j, En);
          }
        }, swipe: function(me) {
          if (!xe) if (ne) ne = !1;
          else {
            if (me.direction == "Left") {
              if (i.index == i.elements.length - 1) return rt(H);
              i.nextSlide();
            }
            if (me.direction == "Right") {
              if (i.index == 0) return rt(H);
              i.prevSlide();
            }
          }
        } });
        i.events.touch = zr;
      }
      var p = G(), _ = G() !== null || document.createTouch !== void 0 || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints, N = document.getElementsByTagName("html")[0], Y = { selector: ".glightbox", elements: null, skin: "clean", theme: "clean", closeButton: !0, startAt: null, autoplayVideos: !0, autofocusVideos: !0, descPosition: "bottom", width: "900px", height: "506px", videosWidth: "960px", beforeSlideChange: null, afterSlideChange: null, beforeSlideLoad: null, afterSlideLoad: null, slideInserted: null, slideRemoved: null, slideExtraAttributes: null, onOpen: null, onClose: null, loop: !1, zoomable: !0, draggable: !0, dragAutoSnap: !1, dragToleranceX: 40, dragToleranceY: 65, preload: !0, oneSlidePerOpen: !1, touchNavigation: !0, touchFollowAxis: !0, keyboardNavigation: !0, closeOnOutsideClick: !0, plugins: !1, plyr: { css: "https://cdn.plyr.io/3.6.12/plyr.css", js: "https://cdn.plyr.io/3.6.12/plyr.js", config: { ratio: "16:9", fullscreen: { enabled: !0, iosNative: !0 }, youtube: { noCookie: !0, rel: 0, showinfo: 0, iv_load_policy: 3 }, vimeo: { byline: !1, portrait: !1, title: !1, transparent: !1 } } }, openEffect: "zoom", closeEffect: "zoom", slideEffect: "slide", moreText: "See more", moreLength: 60, cssEfects: { fade: { in: "fadeIn", out: "fadeOut" }, zoom: { in: "zoomIn", out: "zoomOut" }, slide: { in: "slideInRight", out: "slideOutLeft" }, slideBack: { in: "slideInLeft", out: "slideOutRight" }, none: { in: "none", out: "none" } }, svg: { close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>', next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>', prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>' }, slideHTML: `<div class="gslide">
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
        s && (this.baseEvents = v("click", { onElement: s, withCallback: function(c, h) {
          c.preventDefault(), i.open(h);
        } })), this.elements = this.getElements();
      } }, { key: "open", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (this.elements.length === 0) return !1;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var c = ye(s) ? s : this.settings.startAt;
        if (K(i)) {
          var h = i.getAttribute("data-gallery");
          h && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, h)), he(c) && (c = this.getElementIndex(i)) < 0 && (c = 0);
        }
        ye(c) || (c = 0), this.build(), O(this.overlay, this.settings.openEffect === "none" ? "none" : this.settings.cssEfects.fade.in);
        var b = document.body, P = window.innerWidth - document.documentElement.clientWidth;
        if (P > 0) {
          var A = document.createElement("style");
          A.type = "text/css", A.className = "gcss-styles", A.innerText = ".gscrollbar-fixer {margin-right: ".concat(P, "px}"), document.head.appendChild(A), m(b, "gscrollbar-fixer");
        }
        m(b, "glightbox-open"), m(N, "glightbox-open"), p && (m(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(c, !0), this.elements.length === 1 ? (m(this.prevButton, "glightbox-button-hidden"), m(this.nextButton, "glightbox-button-hidden")) : (w(this.prevButton, "glightbox-button-hidden"), w(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), U(this.settings.onOpen) && this.settings.onOpen(), _ && this.settings.touchNavigation && on(this), this.settings.keyboardNavigation && zt(this);
      } }, { key: "openAt", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        this.open(null, i);
      } }, { key: "showSlide", value: function() {
        var i = this, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        k(this.loader), this.index = parseInt(s);
        var h = this.slidesContainer.querySelector(".current");
        h && w(h, "current"), this.slideAnimateOut();
        var b = this.slidesContainer.querySelectorAll(".gslide")[s];
        if (T(b, "loaded")) this.slideAnimateIn(b, c), I(this.loader);
        else {
          k(this.loader);
          var P = this.elements[s], A = { index: this.index, slide: b, slideNode: b, slideConfig: P.slideConfig, slideIndex: this.index, trigger: P.node, player: null };
          this.trigger("slide_before_load", A), P.instance.setContent(b, function() {
            I(i.loader), i.resize(), i.slideAnimateIn(b, c), i.trigger("slide_after_load", A);
          });
        }
        this.slideDescription = b.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && T(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(s + 1), this.preloadSlide(s - 1)), this.updateNavigationClasses(), this.activeSlide = b;
      } }, { key: "preloadSlide", value: function(i) {
        var s = this;
        if (i < 0 || i > this.elements.length - 1 || he(this.elements[i])) return !1;
        var c = this.slidesContainer.querySelectorAll(".gslide")[i];
        if (T(c, "loaded")) return !1;
        var h = this.elements[i], b = h.type, P = { index: i, slide: c, slideNode: c, slideConfig: h.slideConfig, slideIndex: i, trigger: h.node, player: null };
        this.trigger("slide_before_load", P), b === "video" || b === "external" ? setTimeout(function() {
          h.instance.setContent(c, function() {
            s.trigger("slide_after_load", P);
          });
        }, 200) : h.instance.setContent(c, function() {
          s.trigger("slide_after_load", P);
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
        var c = new ht(i, this, s), h = c.getConfig(), b = f({}, h), P = c.create(), A = this.elements.length - 1;
        b.index = s, b.node = !1, b.instance = c, b.slideConfig = h, this.elements.splice(s, 0, b);
        var L = null, V = null;
        if (this.slidesContainer) {
          if (s > A) this.slidesContainer.appendChild(P);
          else {
            var H = this.slidesContainer.querySelectorAll(".gslide")[s];
            this.slidesContainer.insertBefore(P, H);
          }
          (this.settings.preload && this.index == 0 && s == 0 || this.index - 1 == s || this.index + 1 == s) && this.preloadSlide(s), this.index === 0 && s === 0 && (this.index = 1), this.updateNavigationClasses(), L = this.slidesContainer.querySelectorAll(".gslide")[s], V = this.getSlidePlayerInstance(s), b.slideNode = L;
        }
        this.trigger("slide_inserted", { index: s, slide: L, slideNode: L, slideConfig: h, slideIndex: s, trigger: null, player: V }), U(this.settings.slideInserted) && this.settings.slideInserted({ index: s, slide: L, player: V });
      } }, { key: "removeSlide", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
        if (i < 0 || i > this.elements.length - 1) return !1;
        var s = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[i];
        s && (this.getActiveSlideIndex() == i && (i == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), s.parentNode.removeChild(s)), this.elements.splice(i, 1), this.trigger("slide_removed", i), U(this.settings.slideRemoved) && this.settings.slideRemoved(i);
      } }, { key: "slideAnimateIn", value: function(i, s) {
        var c = this, h = i.querySelector(".gslide-media"), b = i.querySelector(".gslide-description"), P = { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlide, slideConfig: he(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: he(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, A = { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideConfig: this.elements[this.index].slideConfig, slideIndex: this.index, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) };
        if (h.offsetWidth > 0 && b && (I(b), b.style.display = ""), w(i, this.effectsClasses), s) O(i, this.settings.cssEfects[this.settings.openEffect].in, function() {
          c.settings.autoplayVideos && c.slidePlayerPlay(i), c.trigger("slide_changed", { prev: P, current: A }), U(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [P, A]);
        });
        else {
          var L = this.settings.slideEffect, V = L !== "none" ? this.settings.cssEfects[L].in : L;
          this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (V = this.settings.cssEfects.slideBack.in), O(i, V, function() {
            c.settings.autoplayVideos && c.slidePlayerPlay(i), c.trigger("slide_changed", { prev: P, current: A }), U(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [P, A]);
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
        this.slidePlayerPause(i), this.trigger("slide_before_change", { prev: { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlideIndex, slideConfig: he(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: he(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, current: { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideIndex: this.index, slideConfig: this.elements[this.index].slideConfig, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) } }), U(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{ index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, { index: this.index, slide: this.activeSlide, player: this.getSlidePlayerInstance(this.index) }]), this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (c = this.settings.cssEfects.slideBack.out), O(i, c, function() {
          var h = i.querySelector(".ginner-container"), b = i.querySelector(".gslide-media"), P = i.querySelector(".gslide-description");
          h.style.transform = "", b.style.transform = "", w(b, "greset"), b.style.opacity = "", P && (P.style.opacity = ""), w(i, "prev");
        });
      } }, { key: "getAllPlayers", value: function() {
        return this.videoPlayers;
      } }, { key: "getSlidePlayerInstance", value: function(i) {
        var s = "gvideo" + i, c = this.getAllPlayers();
        return !(!ie(c, s) || !c[s]) && c[s];
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
        i && i.length && u(i, function(h, b) {
          var P = new ht(h, s, b), A = P.getConfig(), L = f({}, A);
          L.slideConfig = A, L.instance = P, L.index = b, c.push(L);
        }), this.elements = c, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (u(this.elements, function() {
          var h = S(s.settings.slideHTML);
          s.slidesContainer.appendChild(h);
        }), this.showSlide(0, !0)));
      } }, { key: "getElementIndex", value: function(i) {
        var s = !1;
        return u(this.elements, function(c, h) {
          if (ie(c, "node") && c.node == i) return s = h, !0;
        }), s;
      } }, { key: "getElements", value: function() {
        var i = this, s = [];
        this.elements = this.elements ? this.elements : [], !he(this.settings.elements) && Te(this.settings.elements) && this.settings.elements.length && u(this.settings.elements, function(h, b) {
          var P = new ht(h, i, b), A = P.getConfig(), L = f({}, A);
          L.node = !1, L.index = b, L.instance = P, L.slideConfig = A, s.push(L);
        });
        var c = !1;
        return this.getSelector() && (c = document.querySelectorAll(this.getSelector())), c && u(c, function(h, b) {
          var P = new ht(h, i, b), A = P.getConfig(), L = f({}, A);
          L.node = h, L.index = b, L.instance = P, L.slideConfig = A, L.gallery = h.getAttribute("data-gallery"), s.push(L);
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
        u(s, function(H) {
          H.parentNode == document.body && H.nodeName.charAt(0) !== "#" && H.hasAttribute && !H.hasAttribute("aria-hidden") && (c.push(H), H.setAttribute("aria-hidden", "true"));
        });
        var h = ie(this.settings.svg, "next") ? this.settings.svg.next : "", b = ie(this.settings.svg, "prev") ? this.settings.svg.prev : "", P = ie(this.settings.svg, "close") ? this.settings.svg.close : "", A = this.settings.lightboxHTML;
        A = S(A = (A = (A = A.replace(/{nextSVG}/g, h)).replace(/{prevSVG}/g, b)).replace(/{closeSVG}/g, P)), document.body.appendChild(A);
        var L = document.getElementById("glightbox-body");
        this.modal = L;
        var V = L.querySelector(".gclose");
        this.prevButton = L.querySelector(".gprev"), this.nextButton = L.querySelector(".gnext"), this.overlay = L.querySelector(".goverlay"), this.loader = L.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = c, this.events = {}, m(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && V && (this.events.close = v("click", { onElement: V, withCallback: function(H, j) {
          H.preventDefault(), i.close();
        } })), V && !this.settings.closeButton && V.parentNode.removeChild(V), this.nextButton && (this.events.next = v("click", { onElement: this.nextButton, withCallback: function(H, j) {
          H.preventDefault(), i.nextSlide();
        } })), this.prevButton && (this.events.prev = v("click", { onElement: this.prevButton, withCallback: function(H, j) {
          H.preventDefault(), i.prevSlide();
        } })), this.settings.closeOnOutsideClick && (this.events.outClose = v("click", { onElement: L, withCallback: function(H, j) {
          i.preventOutsideClick || T(document.body, "glightbox-mobile") || E(H.target, ".ginner-container") || E(H.target, ".gbtn") || T(H.target, "gnext") || T(H.target, "gprev") || i.close();
        } })), u(this.elements, function(H, j) {
          i.slidesContainer.appendChild(H.instance.create()), H.slideNode = i.slidesContainer.querySelectorAll(".gslide")[j];
        }), _ && m(document.body, "glightbox-touch"), this.events.resize = v("resize", { onElement: window, withCallback: function() {
          i.resize();
        } }), this.built = !0;
      } }, { key: "resize", value: function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        if ((i = i || this.activeSlide) && !T(i, "zoomed")) {
          var s = D(), c = i.querySelector(".gvideo-wrapper"), h = i.querySelector(".gslide-image"), b = this.slideDescription, P = s.width, A = s.height;
          if (P <= 768 ? m(document.body, "glightbox-mobile") : w(document.body, "glightbox-mobile"), c || h) {
            var L = !1;
            if (b && (T(b, "description-bottom") || T(b, "description-top")) && !T(b, "gabsolute") && (L = !0), h) {
              if (P <= 768) h.querySelector("img");
              else if (L) {
                var V, H, j = b.offsetHeight, X = h.querySelector("img"), Z = (V = this.elements[this.index]) === null || V === void 0 ? void 0 : V.node, ee = "100vh";
                Z && (ee = (H = Z.getAttribute("data-height")) !== null && H !== void 0 ? H : ee), X.setAttribute("style", "max-height: calc(".concat(ee, " - ").concat(j, "px)")), b.setAttribute("style", "max-width: ".concat(X.offsetWidth, "px;"));
              }
            }
            if (c) {
              var ne = ie(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
              if (!ne) {
                var xe = c.clientWidth, ze = c.clientHeight, Be = xe / ze;
                ne = "".concat(xe / Be, ":").concat(ze / Be);
              }
              var st = ne.split(":"), Ie = this.settings.videosWidth, at = this.settings.videosWidth, lt = (at = ye(Ie) || Ie.indexOf("px") !== -1 ? parseInt(Ie) : Ie.indexOf("vw") !== -1 ? P * parseInt(Ie) / 100 : Ie.indexOf("vh") !== -1 ? A * parseInt(Ie) / 100 : Ie.indexOf("%") !== -1 ? P * parseInt(Ie) / 100 : parseInt(c.clientWidth)) / (parseInt(st[0]) / parseInt(st[1]));
              if (lt = Math.floor(lt), L && (A -= b.offsetHeight), at > P || lt > A || A < lt && P > at) {
                var rn = c.offsetWidth, Ut = c.offsetHeight, Ge = A / Ut, Ke = { width: rn * Ge, height: Ut * Ge };
                c.parentNode.setAttribute("style", "max-width: ".concat(Ke.width, "px")), L && b.setAttribute("style", "max-width: ".concat(Ke.width, "px;"));
              } else c.parentNode.style.maxWidth = "".concat(Ie), L && b.setAttribute("style", "max-width: ".concat(Ie, ";"));
            }
          }
        }
      } }, { key: "reload", value: function() {
        this.init();
      } }, { key: "updateNavigationClasses", value: function() {
        var i = this.loop();
        w(this.nextButton, "disabled"), w(this.prevButton, "disabled"), this.index == 0 && this.elements.length - 1 == 0 ? (m(this.prevButton, "disabled"), m(this.nextButton, "disabled")) : this.index !== 0 || i ? this.index !== this.elements.length - 1 || i || m(this.nextButton, "disabled") : m(this.prevButton, "disabled");
      } }, { key: "loop", value: function() {
        var i = ie(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
        return i = ie(this.settings, "loop") ? this.settings.loop : i, i;
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
          w(N, "glightbox-open"), w(h, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), i.modal.parentNode.removeChild(i.modal), i.trigger("close"), U(i.settings.onClose) && i.settings.onClose();
          var b = document.querySelector(".gcss-styles");
          b && b.parentNode.removeChild(b), i.lightboxOpen = !1, i.closing = null;
        });
      } }, { key: "destroy", value: function() {
        this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
      } }, { key: "on", value: function(i, s) {
        var c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!i || !U(s)) throw new TypeError("Event name and callback must be defined");
        this.apiEvents.push({ evt: i, once: c, callback: s });
      } }, { key: "once", value: function(i, s) {
        this.on(i, s, !0);
      } }, { key: "trigger", value: function(i) {
        var s = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, h = [];
        u(this.apiEvents, function(b, P) {
          var A = b.evt, L = b.once, V = b.callback;
          A == i && (V(c), L && h.push(P));
        }), h.length && u(h, function(b) {
          return s.apiEvents.splice(b, 1);
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
  }(Nn)), Nn.exports;
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
    }), Ve(
      () => n.modelValue,
      (a) => {
        a ? r.open() : r.close();
      }
    ), Gr(() => {
      r && r.destroy();
    }), (a, l) => ge(a.$slots, "default");
  }
}, Dl = { class: "accommodation-type-card" }, Ml = ["src", "alt"], Fl = { key: 1 }, Bl = { class: "accommodation-type-card__body" }, ql = { class: "accommodation-type-card__body-description" }, zl = { class: "amenities" }, Hl = {
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
    const { t } = Le(), n = ue(!1), o = () => {
      n.value = !0;
    };
    return (r, a) => (C(), F("article", Dl, [
      x("section", {
        onClick: o,
        class: "accommodation-type-card__img"
      }, [
        R(Rl, {
          modelValue: n.value,
          "onUpdate:modelValue": a[0] || (a[0] = (l) => n.value = l),
          images: e.data.gallery
        }, {
          default: q(() => [
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
      x("section", Bl, [
        x("div", ql, [
          x("h2", null, M(e.data.name), 1),
          ge(r.$slots, "description", {}, () => [
            x("p", null, M(e.data.description), 1)
          ]),
          x("div", zl, [
            (C(!0), F(de, null, Pe(e.data.amenities, (l, d) => (C(), F("span", {
              key: d,
              class: "amenities__item"
            }, M(l.title), 1))), 128))
          ])
        ])
      ])
    ]));
  }
}, Wl = ["top", "right", "bottom", "left"], To = ["start", "end"], So = /* @__PURE__ */ Wl.reduce((e, t) => e.concat(t, t + "-" + To[0], t + "-" + To[1]), []), vn = Math.min, $t = Math.max, Vl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ul = {
  start: "end",
  end: "start"
};
function pi(e, t, n) {
  return $t(e, vn(t, n));
}
function qt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function it(e) {
  return e.split("-")[0];
}
function je(e) {
  return e.split("-")[1];
}
function br(e) {
  return e === "x" ? "y" : "x";
}
function Ii(e) {
  return e === "y" ? "height" : "width";
}
function Mt(e) {
  return ["top", "bottom"].includes(it(e)) ? "y" : "x";
}
function Ni(e) {
  return br(Mt(e));
}
function wr(e, t, n) {
  n === void 0 && (n = !1);
  const o = je(e), r = Ni(e), a = Ii(r);
  let l = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (l = Bn(l)), [l, Bn(l)];
}
function Yl(e) {
  const t = Bn(e);
  return [Fn(e), t, Fn(t)];
}
function Fn(e) {
  return e.replace(/start|end/g, (t) => Ul[t]);
}
function jl(e, t, n) {
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
function Xl(e, t, n, o) {
  const r = je(e);
  let a = jl(it(e), n === "start", o);
  return r && (a = a.map((l) => l + "-" + r), t && (a = a.concat(a.map(Fn)))), a;
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
function Eo(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const a = Mt(t), l = Ni(t), d = Ii(l), f = it(t), u = a === "y", y = o.x + o.width / 2 - r.width / 2, v = o.y + o.height / 2 - r.height / 2, m = o[d] / 2 - r[d] / 2;
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
        y: v
      };
      break;
    case "left":
      w = {
        x: o.x - r.width,
        y: v
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
const Kl = async (e, t, n) => {
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
    y: v
  } = Eo(u, o, f), m = o, w = {}, T = 0;
  for (let E = 0; E < d.length; E++) {
    const {
      name: O,
      fn: g
    } = d[E], {
      x: k,
      y: I,
      data: S,
      reset: D
    } = await g({
      x: y,
      y: v,
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
    y = k ?? y, v = I ?? v, w = {
      ...w,
      [O]: {
        ...w[O],
        ...S
      }
    }, D && T <= 50 && (T++, typeof D == "object" && (D.placement && (m = D.placement), D.rects && (u = D.rects === !0 ? await l.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : D.rects), {
      x: y,
      y: v
    } = Eo(u, m, f)), E = -1);
  }
  return {
    x: y,
    y: v,
    placement: m,
    strategy: r,
    middlewareData: w
  };
};
async function Yn(e, t) {
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
    elementContext: v = "floating",
    altBoundary: m = !1,
    padding: w = 0
  } = qt(t, e), T = xr(w), O = d[m ? v === "floating" ? "reference" : "floating" : v], g = cn(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(O))) == null || n ? O : O.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(d.floating)),
    boundary: u,
    rootBoundary: y,
    strategy: f
  })), k = v === "floating" ? {
    x: o,
    y: r,
    width: l.floating.width,
    height: l.floating.height
  } : l.reference, I = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(d.floating)), S = await (a.isElement == null ? void 0 : a.isElement(I)) ? await (a.getScale == null ? void 0 : a.getScale(I)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, D = cn(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: d,
    rect: k,
    offsetParent: I,
    strategy: f
  }) : k);
  return {
    top: (g.top - D.top + T.top) / S.y,
    bottom: (D.bottom - g.bottom + T.bottom) / S.y,
    left: (g.left - D.left + T.left) / S.x,
    right: (D.right - g.right + T.right) / S.x
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
      rects: a,
      platform: l,
      elements: d,
      middlewareData: f
    } = t, {
      element: u,
      padding: y = 0
    } = qt(e, t) || {};
    if (u == null)
      return {};
    const v = xr(y), m = {
      x: n,
      y: o
    }, w = Ni(r), T = Ii(w), E = await l.getDimensions(u), O = w === "y", g = O ? "top" : "left", k = O ? "bottom" : "right", I = O ? "clientHeight" : "clientWidth", S = a.reference[T] + a.reference[w] - m[w] - a.floating[T], D = m[w] - a.reference[w], B = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(u));
    let $ = B ? B[I] : 0;
    (!$ || !await (l.isElement == null ? void 0 : l.isElement(B))) && ($ = d.floating[I] || a.floating[T]);
    const J = S / 2 - D / 2, G = $ / 2 - E[T] / 2 - 1, U = vn(v[g], G), se = vn(v[k], G), K = U, Te = $ - E[T] - se, be = $ / 2 - E[T] / 2 + J, Oe = pi(K, be, Te), he = !f.arrow && je(r) != null && be !== Oe && a.reference[T] / 2 - (be < K ? U : se) - E[T] / 2 < 0, ie = he ? be < K ? be - K : be - Te : 0;
    return {
      [w]: m[w] + ie,
      data: {
        [w]: Oe,
        centerOffset: be - Oe - ie,
        ...he && {
          alignmentOffset: ie
        }
      },
      reset: he
    };
  }
});
function Zl(e, t, n) {
  return (e ? [...n.filter((r) => je(r) === e), ...n.filter((r) => je(r) !== e)] : n.filter((r) => it(r) === r)).filter((r) => e ? je(r) === e || (t ? Fn(r) !== r : !1) : !0);
}
const Ql = function(e) {
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
        alignment: v,
        allowedPlacements: m = So,
        autoAlignment: w = !0,
        ...T
      } = qt(e, t), E = v !== void 0 || m === So ? Zl(v || null, w, m) : m, O = await Yn(t, T), g = ((n = l.autoPlacement) == null ? void 0 : n.index) || 0, k = E[g];
      if (k == null)
        return {};
      const I = wr(k, a, await (f.isRTL == null ? void 0 : f.isRTL(u.floating)));
      if (d !== k)
        return {
          reset: {
            placement: E[0]
          }
        };
      const S = [O[it(k)], O[I[0]], O[I[1]]], D = [...((o = l.autoPlacement) == null ? void 0 : o.overflows) || [], {
        placement: k,
        overflows: S
      }], B = E[g + 1];
      if (B)
        return {
          data: {
            index: g + 1,
            overflows: D
          },
          reset: {
            placement: B
          }
        };
      const $ = D.map((U) => {
        const se = je(U.placement);
        return [U.placement, se && y ? (
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
        je(U[0]) ? 2 : 3
      ).every((se) => se <= 0))[0]) == null ? void 0 : r[0]) || $[0][0];
      return G !== d ? {
        data: {
          index: g + 1,
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
        middlewareData: a,
        rects: l,
        initialPlacement: d,
        platform: f,
        elements: u
      } = t, {
        mainAxis: y = !0,
        crossAxis: v = !0,
        fallbackPlacements: m,
        fallbackStrategy: w = "bestFit",
        fallbackAxisSideDirection: T = "none",
        flipAlignment: E = !0,
        ...O
      } = qt(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const g = it(r), k = Mt(d), I = it(d) === d, S = await (f.isRTL == null ? void 0 : f.isRTL(u.floating)), D = m || (I || !E ? [Bn(d)] : Yl(d)), B = T !== "none";
      !m && B && D.push(...Xl(d, E, T, S));
      const $ = [d, ...D], J = await Yn(t, O), G = [];
      let U = ((o = a.flip) == null ? void 0 : o.overflows) || [];
      if (y && G.push(J[g]), v) {
        const be = wr(r, l, S);
        G.push(J[be[0]], J[be[1]]);
      }
      if (U = [...U, {
        placement: r,
        overflows: G
      }], !G.every((be) => be <= 0)) {
        var se, K;
        const be = (((se = a.flip) == null ? void 0 : se.index) || 0) + 1, Oe = $[be];
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
        let he = (K = U.filter((ie) => ie.overflows[0] <= 0).sort((ie, Re) => ie.overflows[1] - Re.overflows[1])[0]) == null ? void 0 : K.placement;
        if (!he)
          switch (w) {
            case "bestFit": {
              var Te;
              const ie = (Te = U.filter((Re) => {
                if (B) {
                  const ye = Mt(Re.placement);
                  return ye === k || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ye === "y";
                }
                return !0;
              }).map((Re) => [Re.placement, Re.overflows.filter((ye) => ye > 0).reduce((ye, ot) => ye + ot, 0)]).sort((Re, ye) => Re[1] - ye[1])[0]) == null ? void 0 : Te[0];
              ie && (he = ie);
              break;
            }
            case "initialPlacement":
              he = d;
              break;
          }
        if (r !== he)
          return {
            reset: {
              placement: he
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
  } = e, a = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), l = it(n), d = je(n), f = Mt(n) === "y", u = ["left", "top"].includes(l) ? -1 : 1, y = a && f ? -1 : 1, v = qt(t, e);
  let {
    mainAxis: m,
    crossAxis: w,
    alignmentAxis: T
  } = typeof v == "number" ? {
    mainAxis: v,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: v.mainAxis || 0,
    crossAxis: v.crossAxis || 0,
    alignmentAxis: v.alignmentAxis
  };
  return d && typeof T == "number" && (w = d === "end" ? T * -1 : T), f ? {
    x: w * y,
    y: m * u
  } : {
    x: m * u,
    y: w * y
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
        y: a,
        placement: l,
        middlewareData: d
      } = t, f = await tc(t, e);
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
        mainAxis: a = !0,
        crossAxis: l = !1,
        limiter: d = {
          fn: (O) => {
            let {
              x: g,
              y: k
            } = O;
            return {
              x: g,
              y: k
            };
          }
        },
        ...f
      } = qt(e, t), u = {
        x: n,
        y: o
      }, y = await Yn(t, f), v = Mt(it(r)), m = br(v);
      let w = u[m], T = u[v];
      if (a) {
        const O = m === "y" ? "top" : "left", g = m === "y" ? "bottom" : "right", k = w + y[O], I = w - y[g];
        w = pi(k, w, I);
      }
      if (l) {
        const O = v === "y" ? "top" : "left", g = v === "y" ? "bottom" : "right", k = T + y[O], I = T - y[g];
        T = pi(k, T, I);
      }
      const E = d.fn({
        ...t,
        [m]: w,
        [v]: T
      });
      return {
        ...E,
        data: {
          x: E.x - n,
          y: E.y - o,
          enabled: {
            [m]: a,
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
        rects: a,
        platform: l,
        elements: d
      } = t, {
        apply: f = () => {
        },
        ...u
      } = qt(e, t), y = await Yn(t, u), v = it(r), m = je(r), w = Mt(r) === "y", {
        width: T,
        height: E
      } = a.floating;
      let O, g;
      v === "top" || v === "bottom" ? (O = v, g = m === (await (l.isRTL == null ? void 0 : l.isRTL(d.floating)) ? "start" : "end") ? "left" : "right") : (g = v, O = m === "end" ? "top" : "bottom");
      const k = E - y.top - y.bottom, I = T - y.left - y.right, S = vn(E - y[O], k), D = vn(T - y[g], I), B = !t.middlewareData.shift;
      let $ = S, J = D;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (J = I), (o = t.middlewareData.shift) != null && o.enabled.y && ($ = k), B && !m) {
        const U = $t(y.left, 0), se = $t(y.right, 0), K = $t(y.top, 0), Te = $t(y.bottom, 0);
        w ? J = T - 2 * (U !== 0 || se !== 0 ? U + se : $t(y.left, y.right)) : $ = E - 2 * (K !== 0 || Te !== 0 ? K + Te : $t(y.top, y.bottom));
      }
      await f({
        ...t,
        availableWidth: J,
        availableHeight: $
      });
      const G = await l.getDimensions(d.floating);
      return T !== G.width || E !== G.height ? {
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
function tt(e) {
  return We(e).getComputedStyle(e);
}
const Co = Math.min, un = Math.max, qn = Math.round;
function kr(e) {
  const t = tt(e);
  let n = parseFloat(t.width), o = parseFloat(t.height);
  const r = e.offsetWidth, a = e.offsetHeight, l = qn(n) !== r || qn(o) !== a;
  return l && (n = r, o = a), { width: n, height: o, fallback: l };
}
function xt(e) {
  return Sr(e) ? (e.nodeName || "").toLowerCase() : "";
}
let Ln;
function Tr() {
  if (Ln) return Ln;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (Ln = e.brands.map((t) => t.brand + "/" + t.version).join(" "), Ln) : navigator.userAgent;
}
function nt(e) {
  return e instanceof We(e).HTMLElement;
}
function bt(e) {
  return e instanceof We(e).Element;
}
function Sr(e) {
  return e instanceof We(e).Node;
}
function Po(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof We(e).ShadowRoot || e instanceof ShadowRoot;
}
function jn(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = tt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !["inline", "contents"].includes(r);
}
function rc(e) {
  return ["table", "td", "th"].includes(xt(e));
}
function gi(e) {
  const t = /firefox/i.test(Tr()), n = tt(e), o = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!o && o !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some((r) => n.willChange.includes(r)) || ["paint", "layout", "strict", "content"].some((r) => {
    const a = n.contain;
    return a != null && a.includes(r);
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
function Xt(e) {
  const t = Cr(e);
  if (!nt(t)) return Pr;
  const n = t.getBoundingClientRect(), { width: o, height: r, fallback: a } = kr(t);
  let l = (a ? qn(n.width) : n.width) / o, d = (a ? qn(n.height) : n.height) / r;
  return l && Number.isFinite(l) || (l = 1), d && Number.isFinite(d) || (d = 1), { x: l, y: d };
}
function yn(e, t, n, o) {
  var r, a;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const l = e.getBoundingClientRect(), d = Cr(e);
  let f = Pr;
  t && (o ? bt(o) && (f = Xt(o)) : f = Xt(e));
  const u = d ? We(d) : window, y = !Er() && n;
  let v = (l.left + (y && ((r = u.visualViewport) == null ? void 0 : r.offsetLeft) || 0)) / f.x, m = (l.top + (y && ((a = u.visualViewport) == null ? void 0 : a.offsetTop) || 0)) / f.y, w = l.width / f.x, T = l.height / f.y;
  if (d) {
    const E = We(d), O = o && bt(o) ? We(o) : o;
    let g = E.frameElement;
    for (; g && o && O !== E; ) {
      const k = Xt(g), I = g.getBoundingClientRect(), S = getComputedStyle(g);
      I.x += (g.clientLeft + parseFloat(S.paddingLeft)) * k.x, I.y += (g.clientTop + parseFloat(S.paddingTop)) * k.y, v *= k.x, m *= k.y, w *= k.x, T *= k.y, v += I.x, m += I.y, g = We(g).frameElement;
    }
  }
  return { width: w, height: T, top: m, right: v + w, bottom: m + T, left: v, x: v, y: m };
}
function wt(e) {
  return ((Sr(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Xn(e) {
  return bt(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Ar(e) {
  return yn(wt(e)).left + Xn(e).scrollLeft;
}
function _n(e) {
  if (xt(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || Po(e) && e.host || wt(e);
  return Po(t) ? t.host : t;
}
function Lr(e) {
  const t = _n(e);
  return Ri(t) ? t.ownerDocument.body : nt(t) && jn(t) ? t : Lr(t);
}
function zn(e, t) {
  var n;
  t === void 0 && (t = []);
  const o = Lr(e), r = o === ((n = e.ownerDocument) == null ? void 0 : n.body), a = We(o);
  return r ? t.concat(a, a.visualViewport || [], jn(o) ? o : []) : t.concat(o, zn(o));
}
function Ao(e, t, n) {
  return t === "viewport" ? cn(function(o, r) {
    const a = We(o), l = wt(o), d = a.visualViewport;
    let f = l.clientWidth, u = l.clientHeight, y = 0, v = 0;
    if (d) {
      f = d.width, u = d.height;
      const m = Er();
      (m || !m && r === "fixed") && (y = d.offsetLeft, v = d.offsetTop);
    }
    return { width: f, height: u, x: y, y: v };
  }(e, n)) : bt(t) ? cn(function(o, r) {
    const a = yn(o, !0, r === "fixed"), l = a.top + o.clientTop, d = a.left + o.clientLeft, f = nt(o) ? Xt(o) : { x: 1, y: 1 };
    return { width: o.clientWidth * f.x, height: o.clientHeight * f.y, x: d * f.x, y: l * f.y };
  }(t, n)) : cn(function(o) {
    const r = wt(o), a = Xn(o), l = o.ownerDocument.body, d = un(r.scrollWidth, r.clientWidth, l.scrollWidth, l.clientWidth), f = un(r.scrollHeight, r.clientHeight, l.scrollHeight, l.clientHeight);
    let u = -a.scrollLeft + Ar(o);
    const y = -a.scrollTop;
    return tt(l).direction === "rtl" && (u += un(r.clientWidth, l.clientWidth) - d), { width: d, height: f, x: u, y };
  }(wt(e)));
}
function Lo(e) {
  return nt(e) && tt(e).position !== "fixed" ? e.offsetParent : null;
}
function Oo(e) {
  const t = We(e);
  let n = Lo(e);
  for (; n && rc(n) && tt(n).position === "static"; ) n = Lo(n);
  return n && (xt(n) === "html" || xt(n) === "body" && tt(n).position === "static" && !gi(n)) ? t : n || function(o) {
    let r = _n(o);
    for (; nt(r) && !Ri(r); ) {
      if (gi(r)) return r;
      r = _n(r);
    }
    return null;
  }(e) || t;
}
function sc(e, t, n) {
  const o = nt(t), r = wt(t), a = yn(e, !0, n === "fixed", t);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const d = { x: 0, y: 0 };
  if (o || !o && n !== "fixed") if ((xt(t) !== "body" || jn(r)) && (l = Xn(t)), nt(t)) {
    const f = yn(t, !0);
    d.x = f.x + t.clientLeft, d.y = f.y + t.clientTop;
  } else r && (d.x = Ar(r));
  return { x: a.left + l.scrollLeft - d.x, y: a.top + l.scrollTop - d.y, width: a.width, height: a.height };
}
const ac = { getClippingRect: function(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e;
  const a = n === "clippingAncestors" ? function(u, y) {
    const v = y.get(u);
    if (v) return v;
    let m = zn(u).filter((O) => bt(O) && xt(O) !== "body"), w = null;
    const T = tt(u).position === "fixed";
    let E = T ? _n(u) : u;
    for (; bt(E) && !Ri(E); ) {
      const O = tt(E), g = gi(E);
      (T ? g || w : g || O.position !== "static" || !w || !["absolute", "fixed"].includes(w.position)) ? w = O : m = m.filter((k) => k !== E), E = _n(E);
    }
    return y.set(u, m), m;
  }(t, this._c) : [].concat(n), l = [...a, o], d = l[0], f = l.reduce((u, y) => {
    const v = Ao(t, y, r);
    return u.top = un(v.top, u.top), u.right = Co(v.right, u.right), u.bottom = Co(v.bottom, u.bottom), u.left = un(v.left, u.left), u;
  }, Ao(t, d, r));
  return { width: f.right - f.left, height: f.bottom - f.top, x: f.left, y: f.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: n, strategy: o } = e;
  const r = nt(n), a = wt(n);
  if (n === a) return t;
  let l = { scrollLeft: 0, scrollTop: 0 }, d = { x: 1, y: 1 };
  const f = { x: 0, y: 0 };
  if ((r || !r && o !== "fixed") && ((xt(n) !== "body" || jn(a)) && (l = Xn(n)), nt(n))) {
    const u = yn(n);
    d = Xt(n), f.x = u.x + n.clientLeft, f.y = u.y + n.clientTop;
  }
  return { width: t.width * d.x, height: t.height * d.y, x: t.x * d.x - l.scrollLeft * d.x + f.x, y: t.y * d.y - l.scrollTop * d.y + f.y };
}, isElement: bt, getDimensions: function(e) {
  return nt(e) ? kr(e) : e.getBoundingClientRect();
}, getOffsetParent: Oo, getDocumentElement: wt, getScale: Xt, async getElementRects(e) {
  let { reference: t, floating: n, strategy: o } = e;
  const r = this.getOffsetParent || Oo, a = this.getDimensions;
  return { reference: sc(t, await r(n), o), floating: { x: 0, y: 0, ...await a(n) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => tt(e).direction === "rtl" }, lc = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = { platform: ac, ...n }, a = { ...r.platform, _c: o };
  return Kl(e, t, { ...r, platform: a });
}, Dt = {
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
  let n = Dt.themes[e] || {}, o;
  do
    o = n[t], typeof o > "u" ? n.$extend ? n = Dt.themes[n.$extend] || {} : (n = null, o = Dt[t]) : n = null;
  while (n);
  return o;
}
function cc(e) {
  const t = [e];
  let n = Dt.themes[e] || {};
  do
    n.$extend && !n.$resetCss ? (t.push(n.$extend), n = Dt.themes[n.$extend] || {}) : n = null;
  while (n);
  return t.map((o) => `v-popper--theme-${o}`);
}
function $o(e) {
  const t = [e];
  let n = Dt.themes[e] || {};
  do
    n.$extend ? (t.push(n.$extend), n = Dt.themes[n.$extend] || {}) : n = null;
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
function ei() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const Ue = [];
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
const ti = "__floating-vue__popper", $r = () => Ft({
  name: "VPopper",
  provide() {
    return {
      [ti]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [ti]: { default: null }
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
      return (e = this[ti]) == null ? void 0 : e.parentPopper;
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
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await ei(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
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
        for (let n = 0; n < Ue.length; n++)
          t = Ue[n], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      Ue.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of $o(this.theme))
        Mo(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await ei(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, Ro(Ue, this), Ue.length === 0 && document.body.classList.remove("v-popper--some-open");
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
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await ei(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
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
        const t = this.$_popperNode.getBoundingClientRect(), n = dn - yt, o = fn - _t, r = t.left + t.width / 2 - yt + (t.top + t.height / 2) - _t + t.width + t.height, a = yt + n * r, l = _t + o * r;
        return On(yt, _t, a, l, t.left, t.top, t.left, t.bottom) || // Left edge
        On(yt, _t, a, l, t.left, t.top, t.right, t.top) || // Top edge
        On(yt, _t, a, l, t.right, t.top, t.right, t.bottom) || // Right edge
        On(yt, _t, a, l, t.left, t.bottom, t.right, t.bottom);
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
    const e = bn ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => Fo(t), e), document.addEventListener("touchend", (t) => Bo(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => Fo(e), !0), window.addEventListener("click", (e) => Bo(e, !1), !0);
  window.addEventListener("resize", hc);
}
function Fo(e, t) {
  for (let n = 0; n < Ue.length; n++) {
    const o = Ue[n];
    try {
      o.mouseDownContains = o.popperNode().contains(e.target);
    } catch {
    }
  }
}
function Bo(e, t) {
  dc(e, t);
}
function dc(e, t) {
  const n = {};
  for (let o = Ue.length - 1; o >= 0; o--) {
    const r = Ue[o];
    try {
      const a = r.containsGlobalTarget = r.mouseDownContains || r.popperNode().contains(e.target);
      r.pendingHide = !1, requestAnimationFrame(() => {
        if (r.pendingHide = !1, !n[r.randomId] && qo(r, a, e)) {
          if (r.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && a) {
            let d = r.parentPopper;
            for (; d; )
              n[d.randomId] = !0, d = d.parentPopper;
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
function hc() {
  for (let e = 0; e < Ue.length; e++)
    Ue[e].$_computePosition();
}
let yt = 0, _t = 0, dn = 0, fn = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  yt = dn, _t = fn, dn = e.clientX, fn = e.clientY;
}, bn ? {
  passive: !0
} : void 0);
function On(e, t, n, o, r, a, l, d) {
  const f = ((l - r) * (t - a) - (d - a) * (e - r)) / ((d - a) * (n - e) - (l - r) * (o - t)), u = ((n - e) * (t - a) - (o - t) * (e - r)) / ((d - a) * (n - e) - (l - r) * (o - t));
  return f >= 0 && f <= 1 && u >= 0 && u <= 1;
}
const mc = {
  extends: $r()
}, Di = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
};
function pc(e, t, n, o, r, a) {
  return C(), F("div", {
    ref: "reference",
    class: Ze(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    ge(e.$slots, "default", Qr(es(e.slotData)))
  ], 2);
}
const gc = /* @__PURE__ */ Di(mc, [["render", pc]]);
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
let Rn;
function _i() {
  _i.init || (_i.init = !0, Rn = vc() !== -1);
}
var Gn = {
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
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", Rn && this.$el.appendChild(e), e.data = "about:blank", Rn || this.$el.appendChild(e);
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
      this._resizeObject && this._resizeObject.onload && (!Rn && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const yc = /* @__PURE__ */ ts("data-v-b329ee4c");
Kr("data-v-b329ee4c");
const _c = {
  class: "resize-observer",
  tabindex: "-1"
};
Jr();
const bc = /* @__PURE__ */ yc((e, t, n, o, r, a) => (C(), re("div", _c)));
Gn.render = bc;
Gn.__scopeId = "data-v-b329ee4c";
Gn.__file = "src/components/ResizeObserver.vue";
const Ir = (e = "theme") => ({
  computed: {
    themeClass() {
      return cc(this[e]);
    }
  }
}), wc = Ft({
  name: "VPopperContent",
  components: {
    ResizeObserver: Gn
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
}, Tc = /* @__PURE__ */ x("div", { class: "v-popper__arrow-outer" }, null, -1), Sc = /* @__PURE__ */ x("div", { class: "v-popper__arrow-inner" }, null, -1), Ec = [
  Tc,
  Sc
];
function Cc(e, t, n, o, r, a) {
  const l = ni("ResizeObserver");
  return C(), F("div", {
    id: e.popperId,
    ref: "popover",
    class: Ze(["v-popper__popper", [
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
    style: Rt(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = ns((d) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    x("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (d) => e.autoHide && e.$emit("hide"))
    }),
    x("div", {
      class: "v-popper__wrapper",
      style: Rt(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      x("div", kc, [
        e.mounted ? (C(), F(de, { key: 0 }, [
          x("div", null, [
            ge(e.$slots, "default")
          ]),
          e.handleResize ? (C(), re(l, {
            key: 0,
            onNotify: t[1] || (t[1] = (d) => e.$emit("resize", d))
          })) : pe("", !0)
        ], 64)) : pe("", !0)
      ], 512),
      x("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: Rt(e.result ? {
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
const Pc = Ft({
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
function Ac(e, t, n, o, r, a) {
  const l = ni("PopperContent"), d = ni("Popper");
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
    default: q(({
      popperId: f,
      isShown: u,
      shouldMountContent: y,
      skipTransition: v,
      autoHide: m,
      show: w,
      hide: T,
      handleResize: E,
      onResize: O,
      classes: g,
      result: k
    }) => [
      ge(e.$slots, "default", {
        shown: u,
        show: w,
        hide: T
      }),
      R(l, {
        ref: "popperContent",
        "popper-id": f,
        theme: e.finalTheme,
        shown: u,
        mounted: y,
        "skip-transition": v,
        "auto-hide": m,
        "handle-resize": E,
        classes: g,
        result: k,
        onHide: T,
        onResize: O
      }, {
        default: q(() => [
          ge(e.$slots, "popper", {
            shown: u,
            hide: T
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
Ft({
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
      disabled: e.disabled,
      placement: e.placement,
      container: !1
    }, t.$attrs), {
      popper: q(() => [
        ge(t.$slots, "popper")
      ]),
      default: q(() => [
        ge(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["disabled", "placement"]));
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
  let a = "";
  return r.forEach((l) => {
    l.type === "currency" && (a += `<span class="${n}">${l.value}</span>`), l.type === "literal" && (a += `${l.value}`), l.type === "integer" && (a += `${l.value}`), o && l.type === "decimal" && (a += `${l.value}`), o && l.type === "fraction" && (a += `${l.value}`);
  }), a;
}
const Nc = { class: "price-block" }, Rc = {
  key: 0,
  class: "price-block__discount"
}, Dc = { class: "price-block__discount-size" }, Mc = { class: "price-block__old" }, Fc = ["innerHTML"], Bc = { class: "price-block__amount" }, qc = { class: "price-block__icons" }, zc = {
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
    const t = e, { t: n } = Le(), o = ke(() => a(t.originalSellingPrice, "currency")), r = ke(() => a(t.sellingPrice, "price-block__current-currency")), a = (l, d = "", f = !0) => Ic(l, t.currency, d, f);
    return (l, d) => (C(), F("div", Nc, [
      e.discount ? (C(), F("div", Rc, [
        x("span", Dc, [
          x("span", null, "-" + M(e.discount), 1),
          d[0] || (d[0] = x("span", { class: "price-block__percent" }, "%", -1))
        ]),
        x("span", Mc, [
          x("span", {
            class: "amount",
            innerHTML: o.value
          }, null, 8, Fc)
        ])
      ])) : pe("", !0),
      x("div", Bc, [
        x("div", qc, [
          ge(l.$slots, "icons")
        ]),
        e.sellingPrice ? (C(), F("span", zc, [
          x("span", {
            class: "price-block__current-amount",
            innerHTML: r.value
          }, null, 8, Hc)
        ])) : e.sellingPrice === 0 ? (C(), F("span", Wc, M(z(n)("price.free")), 1)) : pe("", !0),
        e.sellingPrice && e.details ? (C(), F("div", Vc)) : pe("", !0)
      ]),
      x("div", Uc, [
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
      x("div", Xc, [
        R(Yc, {
          "selling-price": e.price.sellingPrice,
          "original-selling-price": e.price.originalSellingPrice,
          discount: e.price.discount || null,
          currency: e.price.currency
        }, {
          icons: q(() => [
            ge(t.$slots, "icons")
          ]),
          _: 3
        }, 8, ["selling-price", "original-selling-price", "discount", "currency"]),
        x("div", Gc, [
          ge(t.$slots, "default")
        ])
      ]),
      x("div", Kc, [
        ge(t.$slots, "action")
      ])
    ]));
  }
};
function Fi() {
  const { t: e } = Le();
  function t(n) {
    return n.map((o) => o.map((r) => {
      const a = Zc(r.text);
      return e(a, r.params || {});
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
    x("path", { d: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z" }, null, -1)
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
    x("path", { d: "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56z" }, null, -1)
  ]));
}
const ru = { render: ou }, su = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function au(e, t) {
  return C(), F("svg", su, t[0] || (t[0] = [
    x("path", { d: "M382-240 154-468l57-57 171 171 367-367 57 57z" }, null, -1)
  ]));
}
const lu = { render: au }, cu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function uu(e, t) {
  return C(), F("svg", cu, t[0] || (t[0] = [
    x("path", { d: "m424-296 282-282-56-56-226 226-114-114-56 56zm56 216q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const du = { render: uu }, fu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function hu(e, t) {
  return C(), F("svg", fu, t[0] || (t[0] = [
    x("path", { d: "M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720m-720 80h640v-80H160zm0 160v240h640v-240zm0 240v-480z" }, null, -1)
  ]));
}
const mu = { render: hu }, pu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function gu(e, t) {
  return C(), F("svg", pu, t[0] || (t[0] = [
    x("path", { d: "M320-400q-17 0-28.5-11.5T280-440t11.5-28.5T320-480t28.5 11.5T360-440t-11.5 28.5T320-400m160 0q-17 0-28.5-11.5T440-440t11.5-28.5T480-480t28.5 11.5T520-440t-11.5 28.5T480-400m160 0q-17 0-28.5-11.5T600-440t11.5-28.5T640-480t28.5 11.5T680-440t-11.5 28.5T640-400M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80zm0-80h560v-400H200zm0-480h560v-80H200zm0 0v-80z" }, null, -1)
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
    x("path", { d: "M480-344 240-584l56-56 184 184 184-184 56 56z" }, null, -1)
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
    x("path", { d: "M480-528 296-344l-56-56 240-240 240 240-56 56z" }, null, -1)
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
    x("path", { d: "M440-280h80v-240h-80zm40-320q17 0 28.5-11.5T520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600m0 520q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
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
    x("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
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
    x("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112z" }, null, -1)
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
    x("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320" }, null, -1)
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
    x("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const Fu = { render: Mu }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function qu(e, t) {
  return C(), F("svg", Bu, t[0] || (t[0] = [
    x("path", { d: "M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800z" }, null, -1)
  ]));
}
const zu = { render: qu }, Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Wu(e, t) {
  return C(), F("svg", Hu, t[0] || (t[0] = [
    x("path", { d: "M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480t-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77 77 114T840-480t-28.5 140.5-77 114-114 77T480-120m112-192L440-464v-216h80v184l128 128z" }, null, -1)
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
    x("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm320-280 320-200v-80L480-520 160-720v80z" }, null, -1)
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
    x("path", { d: "M160-120v-480l320-240 320 240v480H560v-280H400v280z" }, null, -1)
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
    x("path", { d: "M120-120v-560h240v-80l120-120 120 120v240h240v400zm80-80h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 320h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 480h80v-80h-80zm0-160h80v-80h-80z" }, null, -1)
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
    x("path", { d: "M798-120q-125 0-247-54.5T329-329 174.5-551 120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12" }, null, -1)
  ]));
}
const nd = { render: td }, id = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Add: nu,
  ArrowForward: ru,
  Check: lu,
  CheckCycle: du,
  CreditCard: mu,
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
    return (o, r) => (C(), re(is(n.value), xi(o.$attrs, {
      class: ["icon", e.small ? "icon--small" : ""]
    }), null, 16, ["class"]));
  }
}, od = {
  key: 0,
  class: "icons"
}, rd = {
  key: 1,
  class: "scenario-text"
}, sd = ["title"], ad = {
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
    const { t } = Le();
    return (n, o) => e.kind === "adults" ? (C(), F("div", od, [
      Qe(R($e, {
        title: z(t)("ratePlan.scenario.mainBeds"),
        name: "Person"
      }, null, 8, ["title"]), [
        [ii, e.main === 2]
      ]),
      Qe(x("i", null, [
        R($e, {
          name: "Person",
          title: z(t)("ratePlan.scenario.mainBeds")
        }, null, 8, ["title"]),
        te(M(e.main), 1)
      ], 512), [
        [ii, e.main > 2]
      ]),
      R($e, {
        name: "Person",
        title: z(t)("ratePlan.scenario.mainBeds")
      }, null, 8, ["title"]),
      e.extraBed ? (C(), F(de, { key: 0 }, [
        R($e, { name: "Add" }, {
          default: q(() => o[0] || (o[0] = [
            te("add")
          ])),
          _: 1
        }),
        R($e, {
          name: "PersonOutline",
          title: z(t)("ratePlan.scenario.extraBeds")
        }, null, 8, ["title"])
      ], 64)) : pe("", !0)
    ])) : e.kind === "child" ? (C(), F("span", rd, M(z(t)("ratePlan.scenario.family")), 1)) : (C(), F("div", {
      key: 2,
      class: "icons",
      title: z(t)("ratePlan.scenario.mainExtraBeds")
    }, [
      R($e, { name: "People" }),
      R($e, { name: "Add" }),
      R($e, { name: "PeopleOutline" })
    ], 8, sd));
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
    const t = e, { color: n, size: o, margin: r, radius: a } = os(t), l = ke(() => ({
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
    })), d = ke(() => ({ animationDelay: "0.12s" })), f = ke(() => ({ animationDelay: "0.24s" })), u = ke(() => ({ animationDelay: "0.36s" }));
    return (y, v) => (C(), F("div", ld, [
      x("div", {
        style: Rt([l.value, d.value])
      }, null, 4),
      x("div", {
        style: Rt([l.value, f.value])
      }, null, 4),
      x("div", {
        style: Rt([l.value, u.value])
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
}, dd = { class: "rate-plan-card" }, fd = { class: "rate-plan-card__wrapper" }, hd = { class: "rate-plan-card__description" }, md = { class: "rate-plan-card__offers" }, pd = { class: "rate-plan-card__offers-item" }, gd = ["title"], vd = { class: "rate-plan-card__offers-item" }, yd = { style: { "margin-right": "0.375rem" } }, _d = {
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
    const n = e, { t: o } = Le(), r = ue(!1), a = ue({}), l = ke(() => {
      var y;
      return ((y = n.data.feed) == null ? void 0 : y.name) !== "ROOM_ONLY";
    }), d = t, f = (y, v) => {
      a.value[v] || (a.value[v] = !0, d("variant-chosen", y));
    }, { formatDescription: u } = Fi();
    return (y, v) => (C(), F("div", dd, [
      x("div", fd, [
        x("div", hd, [
          x("h2", {
            onClick: v[0] || (v[0] = (m) => r.value = !r.value),
            class: "rate-plan-card__title cursor-pointer"
          }, [
            te(M(e.data.name) + " ", 1),
            R($e, {
              name: r.value ? "ExpandLess" : "ExpandMore"
            }, null, 8, ["name"])
          ]),
          Qe(x("blockquote", null, M(e.data.description), 513), [
            [ii, r.value]
          ]),
          x("div", md, [
            x("div", pd, [
              R($e, { name: "Restore" }),
              R(wi, { class: "inline" }, {
                popper: q(() => [
                  (C(!0), F(de, null, Pe(z(u)(e.data.cancellationPolicy.consequences), (m, w) => (C(), F("p", { key: w }, M(m), 1))), 128))
                ]),
                default: q(() => [
                  x("abbr", null, M(e.data.cancellationPolicy.name || ""), 1)
                ]),
                _: 1
              })
            ]),
            e.data.feed ? (C(), F("div", {
              key: 0,
              class: Ze(["rate-plan-card__offers-item", { "feed-offer": l.value }]),
              title: e.data.feed.description
            }, [
              R($e, { name: "Restaurant" }),
              x("span", null, M(e.data.feed.name ? z(o)(`ratePlan.boardType.${e.data.feed.name}`) : ""), 1)
            ], 10, gd)) : pe("", !0),
            x("div", vd, [
              R($e, { name: "CreditCard" }),
              x("span", null, [
                x("strong", yd, M(z(o)("ratePlan.payments")) + ":", 1),
                (C(!0), F(de, null, Pe(e.data.paymentTypes, (m, w) => (C(), F(de, {
                  key: m.name
                }, [
                  R(wi, { class: "inline" }, {
                    popper: q(() => [
                      te(M(m.description), 1)
                    ]),
                    default: q(() => [
                      x("abbr", null, M(m.name), 1)
                    ]),
                    _: 2
                  }, 1024),
                  e.data.paymentTypes.length - 1 !== w ? (C(), F("strong", _d, M(z(o)("ratePlan.or")), 1)) : pe("", !0)
                ], 64))), 128))
              ])
            ]),
            e.data.extras.length ? (C(!0), F(de, { key: 1 }, Pe(e.data.extras, (m, w) => (C(), F("div", {
              key: w,
              class: "rate-plan-card__offers-item extra-offer",
              style: Rt({ color: m.color })
            }, [
              R($e, { name: "Check" }, {
                default: q(() => v[1] || (v[1] = [
                  te("credit_card")
                ])),
                _: 1
              }),
              x("span", null, M(m.name), 1)
            ], 4))), 128)) : pe("", !0)
          ])
        ])
      ]),
      x("div", bd, [
        ge(y.$slots, "default", {}, () => [
          x("div", wd, [
            x("span", xd, M(z(o)("ratePlan.los", e.lengthOfStay)), 1),
            (C(!0), F(de, null, Pe(e.data.variations || [], (m, w) => (C(), re(Jc, {
              key: w,
              price: m.price
            }, {
              icons: q(() => [
                R(ad, {
                  kind: m.occupancyOptions.kind,
                  main: m.occupancyOptions.main,
                  "extra-bed": m.occupancyOptions.extraBed
                }, null, 8, ["kind", "main", "extra-bed"])
              ]),
              default: q(() => [
                R(Dr, {
                  loading: a.value[w],
                  disabled: e.disabled && !a.value[w],
                  onClick: () => f(m, w)
                }, {
                  default: q(() => [
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
}, Td = { class: "rate-plan-list__wrapper" }, Sd = {
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
    return (r, a) => (C(), re(Xe, { class: "accommodation-offer" }, {
      default: q(() => [
        R(Hl, {
          data: e.accommodationOffer.accommodationType
        }, null, 8, ["data"]),
        x("div", Td, [
          x("div", {
            class: Ze(["rate-plan-list", { "rate-plan-list--single": e.accommodationOffer.ratePlans.length <= 1 }])
          }, [
            (C(!0), F(de, null, Pe(e.accommodationOffer.ratePlans, (l) => (C(), F(de, {
              key: l.id
            }, [
              R(Ae),
              R(kd, {
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
}, Ed = {}, Cd = { class: "information-block-grid" };
function Pd(e, t) {
  return C(), F("div", Cd, [
    ge(e.$slots, "default")
  ]);
}
const kn = /* @__PURE__ */ wn(Ed, [["render", Pd]]), Ad = {
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
    const n = e, o = ke(() => !n.dateRange.start || !n.dateRange.end ? 0 : _r(n.dateRange.start, n.dateRange.end)), r = ue([]), a = ue(!1), { setError: l } = ft("globalError");
    Ve(
      () => n.dateRange,
      async (y) => {
        if (!(!y.start || !y.end)) {
          a.value = !0;
          try {
            const v = await fs(y.start, y.end, n.promoCode);
            r.value = v.searchResults;
          } catch (v) {
            l(v);
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
    const d = t, f = ue(!1), u = async ({ accommodationOffer: y, ratePlan: v, variant: m }) => {
      f.value = !0;
      try {
        const w = await Vo({
          checkInDate: n.dateRange.start,
          checkOutDate: n.dateRange.end,
          accommodationType: y.accommodationType.id,
          ratePlan: v.id,
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
    return (y, v) => (C(), re(kn, null, {
      default: q(() => [
        a.value ? (C(), F(de, { key: 0 }, Pe(3, (m) => R(xn, { key: m })), 64)) : (C(!0), F(de, { key: 1 }, Pe(r.value, (m) => (C(), re(Sd, {
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
}, Ld = { class: "field-decorator" }, Od = { class: "field-decorator__input-group" }, $d = { class: "field-decorator__label" }, Id = {
  key: 0,
  class: "field-decorator__required"
}, Nd = { class: "field-decorator__slot" }, Rd = {
  key: 0,
  class: "field-decorator__hint"
}, Nt = {
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
    return (t, n) => (C(), F("div", Ld, [
      x("div", Od, [
        x("label", $d, [
          te(M(e.label), 1),
          e.required ? (C(), F("span", Id, "*")) : pe("", !0)
        ]),
        x("div", Nd, [
          ge(t.$slots, "default")
        ])
      ]),
      e.hideHint ? pe("", !0) : (C(), F("div", Rd, M(e.hint), 1))
    ]));
  }
}, Dd = {}, Md = { class: "information-block__content" };
function Fd(e, t) {
  return C(), F("div", Md, [
    ge(e.$slots, "default")
  ]);
}
const Ne = /* @__PURE__ */ wn(Dd, [["render", Fd]]), Bd = { class: "information-block__header-additional" }, kt = {
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
      class: Ze({ dense: t.dense })
    }, [
      x("span", null, [
        ge(n.$slots, "default")
      ]),
      x("span", Bd, [
        ge(n.$slots, "additional")
      ])
    ], 2));
  }
}, qd = { class: "details-info" }, zd = { class: "details-info__icon" }, Hd = {
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
    return (t, n) => (C(), F("div", qd, [
      x("div", zd, [
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
    const n = e, { t: o } = Le(), r = t, a = oi({ ...n.modelValue }), l = oi({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }), d = (f) => {
      const u = f.target;
      l[u.name] = u.validity.valid ? "" : u.validationMessage;
    };
    return Ve(
      a,
      (f) => {
        r("update:modelValue", f);
      },
      { deep: !0 }
    ), (f, u) => (C(), re(Xe, null, {
      default: q(() => [
        R(kt, null, {
          default: q(() => [
            te(M(z(o)("contactInformation.title")), 1)
          ]),
          _: 1
        }),
        R(Ae),
        R(Ne, null, {
          default: q(() => [
            x("section", Wd, [
              R(Nt, {
                label: z(o)("contactInformation.firstName"),
                required: "",
                hint: l.firstName,
                class: Ze({ "form-group--error": l.firstName })
              }, {
                default: q(() => [
                  Qe(x("input", {
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
              R(Nt, {
                label: z(o)("contactInformation.lastName"),
                required: "",
                hint: l.lastName,
                class: Ze({ "form-group--error": l.lastName })
              }, {
                default: q(() => [
                  Qe(x("input", {
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
              R(Nt, {
                label: z(o)("contactInformation.email"),
                required: "",
                hint: l.email,
                class: Ze({ "form-group--error": l.email })
              }, {
                default: q(() => [
                  Qe(x("input", {
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
              R(Nt, {
                label: z(o)("contactInformation.phoneNumber"),
                hint: l.phone,
                class: Ze({ "form-group--error": l.phone })
              }, {
                default: q(() => [
                  Qe(x("input", {
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
            R(Hd, { icon: "Info" }, {
              default: q(() => [
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
}, Ud = { class: "icon-text" }, Yd = { class: "icon-text__icon" }, jd = { class: "icon-text__text" }, jt = {
  __name: "BflexIconText",
  props: {
    icon: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    return (t, n) => (C(), F("div", Ud, [
      x("span", Yd, [
        R($e, { name: e.icon }, null, 8, ["name"])
      ]),
      x("span", jd, [
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
}, ef = { class: "payment-type__label" }, tf = { class: "payment-type__variants" }, nf = ["for"], of = ["name", "id", "value", "checked", "onChange"], rf = { class: "accommodation-list__total" }, sf = { class: "accommodation-list__payment-rules" }, af = { style: { color: "orangered" } }, lf = { style: { color: "orangered" } }, Bi = {
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
    const n = e, { t: o } = Le(), r = t, { formatDescription: a } = Fi(), l = (u, y) => {
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
    }, f = ue({});
    return Bt(() => {
      f.value = n.reservation.paymentType.id;
    }), (u, y) => e.loading ? (C(), re(xn, {
      key: 0,
      "is-result": ""
    })) : (C(), re(Xe, {
      key: 1,
      class: "accommodation-list"
    }, {
      default: q(() => [
        R(kt, null, {
          default: q(() => [
            te(M(z(o)("chosenAccommodation.title")), 1)
          ]),
          _: 1
        }),
        R(Ae),
        R(Ne, null, {
          default: q(() => [
            x("dl", Xd, [
              x("dt", null, [
                R(jt, { icon: "DateRange" }, {
                  default: q(() => [
                    te(M(z(Pl)(e.reservation.checkInDate, e.reservation.checkOutDate, e.locale)), 1)
                  ]),
                  _: 1
                })
              ]),
              x("dd", null, [
                R(jt, { icon: "Persons" }, {
                  default: q(() => [
                    te(M(z(o)("chosenAccommodation.adults", e.reservation.adults)) + ", " + M(z(o)("chosenAccommodation.children", e.reservation.children.length)), 1)
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }),
        R(Ae),
        R(Ne, null, {
          default: q(() => [
            x("dl", Gd, [
              x("dt", null, [
                x("h3", null, [
                  te(M(e.reservation.accommodationType.name) + " ", 1),
                  e.reservation.quantity > 1 ? (C(), F("span", Kd, "x" + M(e.reservation.quantity), 1)) : pe("", !0)
                ]),
                x("div", Jd, [
                  te(M(e.reservation.ratePlan.name), 1),
                  y[1] || (y[1] = x("br", null, null, -1)),
                  R(wi, { class: "inline" }, {
                    popper: q(() => [
                      (C(!0), F(de, null, Pe(z(a)(e.reservation.cancellationPolicy.consequences), (v, m) => (C(), F("p", { key: m }, M(v), 1))), 128))
                    ]),
                    default: q(() => [
                      x("abbr", null, M(e.reservation.cancellationPolicy.name || ""), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              x("dd", null, [
                e.mode === "choose" ? (C(), F("div", {
                  key: 0,
                  onClick: y[0] || (y[0] = () => d(e.reservation)),
                  class: "accommodation-list__item-delete text-sm cursor-pointer"
                }, M(z(o)("chosenAccommodation.delete")), 1)) : pe("", !0),
                e.reservation.quantity > 1 ? (C(), F("span", Zd, M(e.reservation.quantity) + " x", 1)) : pe("", !0),
                te(" " + M(e.reservation.summary.total.amount) + " " + M(e.reservation.summary.total.currency), 1)
              ])
            ]),
            e.mode === "choose" ? (C(), F("div", Qd, [
              x("div", ef, M(z(o)("chosenAccommodation.willPay")) + ":", 1),
              x("div", tf, [
                (C(!0), F(de, null, Pe(e.reservation.availablePaymentTypes, (v) => (C(), F("label", {
                  key: v.id,
                  for: `payment-type-${u.index}-${e.reservation.ratePlan.id}-${v.id}`
                }, [
                  x("input", {
                    type: "radio",
                    name: `payment-type-${u.index}`,
                    id: `payment-type-${u.index}-${e.reservation.ratePlan.id}-${v.id}`,
                    value: f.value[u.id],
                    checked: +f.value[u.id] == +v.id,
                    onChange: () => l(u.id, v.id)
                  }, null, 40, of),
                  te(" " + M(v.name), 1)
                ], 8, nf))), 128))
              ])
            ])) : pe("", !0)
          ]),
          _: 1
        }),
        R(Ae),
        R(Ne, null, {
          default: q(() => [
            x("dl", rf, [
              x("dt", null, M(z(o)("chosenAccommodation.totalAmount")) + ":", 1),
              x("dd", null, [
                x("strong", null, [
                  x("span", null, M(e.summary.total.amount), 1),
                  te(" " + M(e.summary.total.currency), 1)
                ])
              ])
            ])
          ]),
          _: 1
        }),
        R(Ae),
        ge(u.$slots, "default", {}, () => [
          R(Ne, null, {
            default: q(() => [
              x("dl", sf, [
                x("dt", af, M(z(o)("chosenAccommodation.prepaymentAmount")) + ":", 1),
                x("dd", lf, M(e.payment.details.prepayment.amount) + " " + M(e.payment.details.prepayment.currency), 1),
                x("dt", null, M(z(o)("chosenAccommodation.onArrivalAmount")) + ":", 1),
                x("dd", null, [
                  x("span", null, M(e.payment.details.onArrival.amount), 1),
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
}, cf = { class: "summary-block" }, uf = { class: "summary-block__content" }, df = { class: "summary-block__content-info" }, ff = { class: "summary-block__content-info__price" }, hf = { class: "summary-block__content-info__text" }, mf = {
  class: "button",
  type: "submit"
}, pf = {
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
    const { t: n } = Le(), o = t;
    return (r, a) => (C(), F("div", cf, [
      x("div", uf, [
        x("div", df, [
          x("div", ff, [
            x("span", null, M(e.totalAmount), 1),
            te(" " + M(e.currency), 1)
          ]),
          x("div", hf, [
            te(M(z(n)("summary.room", e.accommodationUnits)) + ", " + M(z(n)("summary.los", e.lengthOfStay)) + " ", 1),
            R($e, {
              onClick: a[0] || (a[0] = ki((l) => o("onAccommodationSummaryClick"), ["stop"])),
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        x("button", mf, M(z(n)("summary.complete")), 1)
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
    const n = e, { t: o } = Le(), r = t, a = oi({ ...n.modelValue }), l = Al("00:00", "23:00");
    return Ve(
      a,
      (d) => {
        r("update:modelValue", d);
      },
      { deep: !0 }
    ), (d, f) => (C(), re(Xe, { class: "customer-request-block" }, {
      default: q(() => [
        R(kt, null, {
          default: q(() => [
            te(M(z(o)("customerRequest.title")), 1)
          ]),
          _: 1
        }),
        R(Ae),
        R(Ne, null, {
          default: q(() => [
            R(Nt, {
              label: z(o)("customerRequest.comment")
            }, {
              default: q(() => [
                Qe(x("textarea", {
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
        R(Ae),
        R(Ne, null, {
          default: q(() => [
            x("dl", gf, [
              x("dt", null, M(z(o)("customerRequest.checkInOutTime")) + ":", 1),
              x("dd", null, M(z(o)("customerRequest.checkInTimeFrom")) + ": " + M(e.arrivalPolicy.checkInTime) + "; " + M(z(o)("customerRequest.checkOutTimeUntil")) + ": " + M(e.arrivalPolicy.checkOutTime), 1)
            ])
          ]),
          _: 1
        }),
        R(Ae),
        R(Ne, null, {
          default: q(() => [
            R(Nt, {
              label: z(o)("customerRequest.arrivalTime"),
              style: { width: "50%" }
            }, {
              default: q(() => [
                Qe(x("select", {
                  name: "arrivalTime",
                  "onUpdate:modelValue": f[1] || (f[1] = (u) => a.arrivalTime = u)
                }, [
                  x("option", vf, M(z(o)("customerRequest.noneTime")), 1),
                  (C(!0), F(de, null, Pe(z(l), (u) => (C(), F("option", {
                    value: u,
                    key: u
                  }, M(u), 9, yf))), 128))
                ], 512), [
                  [rs, a.arrivalTime]
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
      set: (a) => o("update:modelValue", a)
    });
    return (a, l) => (C(), F("label", bf, [
      Qe(x("input", {
        type: "checkbox",
        "onUpdate:modelValue": l[0] || (l[0] = (d) => r.value = d),
        required: e.required
      }, null, 8, wf), [
        [ss, r.value]
      ]),
      l[1] || (l[1] = x("span", { class: "custom-checkbox__box" }, null, -1)),
      ge(a.$slots, "default")
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
    const t = e, { t: n } = Le(), o = ke(() => t.agreements.filter((d) => d.combined)), r = ke(() => t.agreements.length > 0 || t.rules.length > 0), a = ue(!1), l = ue(t.agreements.map(() => !1));
    return (d, f) => r.value ? (C(), re(Xe, {
      key: 0,
      class: "agreement-rules-list"
    }, {
      default: q(() => [
        R(kt, null, {
          default: q(() => [
            te(M(z(n)("accommodationRules.title")), 1)
          ]),
          _: 1
        }),
        e.rules.length > 0 ? (C(), F(de, { key: 0 }, [
          R(Ae),
          R(Ne, null, {
            default: q(() => [
              x("ul", xf, [
                (C(!0), F(de, null, Pe(e.rules, (u, y) => (C(), F("li", { key: y }, M(u.text), 1))), 128))
              ])
            ]),
            _: 1
          })
        ], 64)) : pe("", !0),
        R(Ae),
        R(Ne, null, {
          default: q(() => [
            x("div", kf, [
              o.value.length > 0 ? (C(), F("div", Tf, [
                R(zo, {
                  modelValue: a.value,
                  "onUpdate:modelValue": f[0] || (f[0] = (u) => a.value = u),
                  required: ""
                }, {
                  default: q(() => [
                    x("span", null, [
                      te(M(z(n)("accommodationRules.agreementSentence")) + " ", 1),
                      (C(!0), F(de, null, Pe(o.value, (u, y) => (C(), F("a", {
                        class: "agreement-rules-list__combined-agreement",
                        target: "_blank",
                        href: u.url,
                        key: y
                      }, M(u.anchor), 9, Sf))), 128)),
                      f[1] || (f[1] = te("."))
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ])) : pe("", !0),
              (C(!0), F(de, null, Pe(e.agreements, (u, y) => (C(), F(de, { key: y }, [
                u.combined === !1 ? (C(), F("div", Ef, [
                  R(zo, {
                    modelValue: l.value[y],
                    "onUpdate:modelValue": (v) => l.value[y] = v,
                    required: u.required
                  }, {
                    default: q(() => [
                      x("span", null, [
                        te(M(z(n)("accommodationRules.agreementSentenceShort")) + " ", 1),
                        x("a", {
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
    const n = ue({
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
      checkInDate: O,
      checkOutDate: g,
      accommodationType: k,
      ratePlan: I,
      adults: S,
      children: D,
      quantity: B
    }) => {
      f.value = !0;
      try {
        const $ = await Vo({
          checkInDate: O,
          checkOutDate: g,
          accommodationType: k,
          ratePlan: I,
          adults: S,
          children: D,
          quantity: B
        });
        u.value = $.cart, $.cart.requests.length === 0 && o("released", { action: yr, result: $ });
      } catch ($) {
        y($);
      } finally {
        f.value = !1;
      }
    }, a = ue(null), l = ft("settings"), d = async (O) => {
      if (O.preventDefault(), a.value.reportValidity()) {
        f.value = !0;
        try {
          const g = await ps({
            customer: {
              ...n.value.customerInfo
            },
            comment: n.value.comment,
            arrivalTime: n.value.arrivalTime
          });
          g && g.reservations && o("released", { action: In, result: g });
        } catch (g) {
          y(g);
        } finally {
          f.value = !1;
        }
      }
    }, f = ue(!0), u = ue(null), { setError: y } = ft("globalError");
    Bt(async () => {
      f.value = !0;
      try {
        const O = await hs();
        u.value = O.cart;
      } catch (O) {
        y(O);
      } finally {
        f.value = !1;
      }
    });
    const v = async (O) => {
      try {
        const g = await ms(O);
        u.value = g.cart;
      } catch (g) {
        y(g);
      }
    }, m = ke(() => !u.value || !u.value.requests || Object.keys(u.value.requests).length === 0 ? 0 : Object.keys(u.value.requests).reduce((O, g) => {
      const k = u.value.requests[g];
      return O + k.quantity;
    }, 0)), w = ke(() => !(!u.value || !u.value.requests || Object.keys(u.value.requests).length === 0)), T = ke(() => u.value.requests[Object.keys(u.value.requests).length - 1]), E = ke(() => w.value ? _r(
      T.value.checkInDate,
      T.value.checkOutDate
    ) : 0);
    return (O, g) => (C(), F("form", {
      onSubmit: d,
      ref_key: "confirmForm",
      ref: a
    }, [
      R(kn, null, {
        default: q(() => [
          R(Vd, {
            modelValue: n.value.customerInfo,
            "onUpdate:modelValue": g[0] || (g[0] = (k) => n.value.customerInfo = k)
          }, null, 8, ["modelValue"]),
          u.value && w.value ? (C(), re(Bi, {
            key: 0,
            mode: "choose",
            loading: f.value,
            locale: z(l).widget.locale,
            payment: u.value.payment,
            summary: u.value.summary,
            reservation: T.value,
            onChangePaymentType: v,
            onDeleteAccommodationRequest: r
          }, null, 8, ["loading", "locale", "payment", "summary", "reservation"])) : pe("", !0),
          R(_f, {
            modelValue: n.value.customerRequest,
            "onUpdate:modelValue": g[1] || (g[1] = (k) => n.value.customerRequest = k)
          }, null, 8, ["modelValue"]),
          R(Pf, {
            agreements: z(l).hotelRules.agreements,
            rules: z(l).hotelRules.rules
          }, null, 8, ["agreements", "rules"]),
          !f.value && u.value ? (C(), re(pf, {
            key: 1,
            "total-amount": u.value.summary.total,
            currency: u.value.currency,
            "accommodation-units": m.value,
            "length-of-stay": E.value
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
    const { t } = Le();
    return (n, o) => (C(), re(Xe, null, {
      default: q(() => [
        R(kt, null, {
          default: q(() => [
            te(M(z(t)("reservation.hotelInfo.title")), 1)
          ]),
          _: 1
        }),
        R(Ae),
        R(Ne, null, {
          default: q(() => [
            x("div", Lf, [
              R(jt, { icon: "Hotel" }, {
                default: q(() => [
                  te(M(e.hotelInfo.name), 1)
                ]),
                _: 1
              }),
              R(jt, { icon: "Home" }, {
                default: q(() => [
                  te(M(e.hotelInfo.address.address), 1)
                ]),
                _: 1
              }),
              R(jt, { icon: "Phone" }, {
                default: q(() => [
                  x("a", {
                    href: `tel:${e.hotelInfo.phone}`
                  }, M(e.hotelInfo.phone), 9, Of)
                ]),
                _: 1
              }),
              R(jt, { icon: "Email" }, {
                default: q(() => [
                  x("a", $f, M(e.hotelInfo.email), 1)
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
    const { t: n } = Le(), o = t, r = () => o("click");
    return (a, l) => (C(), F("div", If, [
      x("div", Nf, [
        x("div", Rf, [
          x("div", Df, [
            x("span", null, M(e.prepayment), 1),
            te(" " + M(e.currency), 1)
          ]),
          x("div", Mf, [
            te(M(z(n)("reservation.payment.prepayment")) + " ", 1),
            R($e, {
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        x("button", {
          class: "button",
          onClick: ki(r, ["stop"])
        }, M(z(n)("reservation.payment.action")), 1)
      ])
    ]));
  }
}, Bf = { class: "reservation-result" }, qf = { class: "reservation-result__title" }, zf = { class: "reservation-result__description" }, Hf = {
  __name: "ResultPage",
  props: {
    sid: {
      type: String,
      required: !0,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = Le(), o = ft("settings"), r = ue(null), a = ue([]), l = ue(!0), { setError: d } = ft("globalError"), f = async () => {
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
    }), y = () => {
      a.value.forEach((v) => {
        console.log(v), window.open(v, "_blank");
      });
    };
    return Ve(() => t.sid, f), Bt(f), (v, m) => (C(), re(kn, null, {
      default: q(() => [
        l.value ? (C(), re(xn, { key: 0 })) : (C(), F(de, { key: 1 }, [
          x("section", Bf, [
            x("div", qf, M(z(n)("reservation.title")), 1),
            x("div", zf, M(z(n)(`reservation.description.${u.value}`)), 1)
          ]),
          R(Bi, {
            mode: "info",
            reservation: r.value.reservation,
            summary: r.value.summary,
            payment: r.value.payment,
            locale: z(o).widget.locale
          }, null, 8, ["reservation", "summary", "payment", "locale"]),
          R(Xe, { class: "information-block--attention" }, {
            default: q(() => [
              R(kt, null, {
                default: q(() => [
                  te(M(z(n)("reservation.whatIsNext")), 1)
                ]),
                _: 1
              }),
              R(Ae),
              R(Ne, null, {
                default: q(() => [
                  te(M(z(n)(`reservation.nextStep.${u.value}`, { untilTime: "" })), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          r.value.note ? (C(), re(Xe, { key: 0 }, {
            default: q(() => [
              R(kt, null, {
                default: q(() => [
                  te(M(z(n)("reservation.customerRequest")), 1)
                ]),
                _: 1
              }),
              R(Ae),
              R(Ne, null, {
                default: q(() => [
                  te(M(r.value.note), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : pe("", !0),
          R(Mr, {
            "hotel-info": z(o).hotelInfo
          }, null, 8, ["hotel-info"]),
          a.value.length ? (C(), re(Ff, {
            key: 1,
            prepayment: r.value.payment.prepayment,
            currency: r.value.currency,
            onClick: y
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
    const t = e, { t: n } = Le(), o = ft("settings"), r = ue(null), a = ue(!0), { setError: l } = ft("globalError"), d = async () => {
      if (t.sid) {
        a.value = !0;
        try {
          const m = await Uo({ sid: atob(t.sid) });
          r.value = m.data;
        } catch (m) {
          l(m);
        } finally {
          a.value = !1;
        }
      }
    }, { formatDescription: f } = Fi(), u = ue(""), y = ue(!1), v = async () => {
      y.value = !1, (await gs({ sid: atob(t.sid), code: u.value })).successful ? (alert(n("cancellationProcess.result.success")), window.location.replace(window.location.origin)) : (alert(n("cancellationProcess.result.error")), u.value = "");
    };
    return Ve(() => t.sid, d), Bt(d), (m, w) => (C(), re(kn, null, {
      default: q(() => [
        a.value ? (C(), re(xn, { key: 0 })) : (C(), F(de, { key: 1 }, [
          x("section", Wf, [
            x("div", Vf, M(z(n)("cancellationProcess.title")), 1),
            x("div", Uf, M(z(n)("cancellationProcess.description")), 1)
          ]),
          R(Bi, {
            mode: "cancellation",
            reservation: r.value.reservation,
            summary: r.value.summary,
            payment: r.value.payment,
            locale: z(o).widget.locale
          }, {
            default: q(() => [
              R(Ne, null, {
                default: q(() => [
                  x("dl", Yf, [
                    x("dt", jf, M(z(n)("chosenAccommodation.penalty")) + ":", 1),
                    x("dd", Xf, M(r.value.reservation.penalties.total.amount) + " " + M(r.value.reservation.penalties.total.currency), 1)
                  ])
                ]),
                _: 1
              }),
              R(Ae),
              x("div", Gf, [
                x("div", null, M(z(n)("cancellationProcess.codeHelp")), 1),
                R(Nt, {
                  label: z(n)("cancellationProcess.codeLabel"),
                  "hide-hint": ""
                }, {
                  default: q(() => [
                    x("input", {
                      name: "cancellationCode",
                      value: u.value,
                      onInput: w[0] || (w[0] = ki((T) => u.value = T.currentTarget.value, ["stop"]))
                    }, null, 40, Kf)
                  ]),
                  _: 1
                }, 8, ["label"]),
                R(Dr, {
                  onClick: v,
                  disabled: !u.value
                }, {
                  default: q(() => [
                    te(M(z(n)("cancellationProcess.action")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ]),
            _: 1
          }, 8, ["reservation", "summary", "payment", "locale"]),
          R(Xe, { class: "information-block--attention" }, {
            default: q(() => [
              R(kt, null, {
                default: q(() => [
                  te(M(z(n)("cancellationProcess.rules")), 1)
                ]),
                _: 1
              }),
              R(Ae),
              R(Ne, null, {
                default: q(() => [
                  x("ul", Jf, [
                    (C(!0), F(de, null, Pe(z(f)(r.value.reservation.cancellationPolicy.consequences), (T, E) => (C(), F("li", { key: E }, M(T), 1))), 128))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          R(Mr, {
            "hotel-info": z(o).hotelInfo
          }, null, 8, ["hotel-info"])
        ], 64))
      ]),
      _: 1
    }));
  }
}, Qf = { id: "bflex-booking-widget" }, eh = { class: "booking-widget" }, th = { class: "booking-widget__content" }, Fr = {
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
    const t = e, n = ue({
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
    const o = [ln, In, xo], r = ue(null), a = (w) => {
      if (!w)
        r.value = ln;
      else if (w === Qn)
        r.value = Qn;
      else {
        const T = o.indexOf(w);
        T >= 0 && T < o.length - 1 && (r.value = o[T + 1]);
      }
      window.dispatchEvent(
        new CustomEvent("bflex:booking-widget:action", { detail: { action: r.value } })
      );
    }, l = ue(!1), d = ue(""), f = ue({
      start: t.start,
      end: t.end,
      promoCode: t.promoCode
    });
    Ve(
      () => ({ start: t.start, end: t.end, promoCode: t.promoCode }),
      () => {
        f.value = {
          start: t.start,
          end: t.end,
          promoCode: t.promoCode
        };
      }
    ), Ve(
      f,
      (w, T) => {
        !w.start || !w.end || (!T || !T.start || !T.end || T.start !== w.start || T.end !== w.end) && window.dispatchEvent(
          new CustomEvent("bflex:booking-widget:changed", { detail: as(f.value) })
        );
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    const { setError: u } = ft("globalError"), y = (w) => {
      const { start: T, end: E, promoCode: O } = w.detail;
      f.value = { start: T, end: E, promoCode: O }, w.stopPropagation();
    };
    Bt(async () => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:ready")), window.addEventListener("bflex:search-bar:search", y), l.value = !0;
      try {
        const { inProgress: w, settings: T } = await ds();
        n.value = T;
        const { widget: E } = T;
        E && E.locale && E.l10n && Object.keys(E.l10n).length && (Mn.global.locale.value = E.locale, Mn.global.setLocaleMessage(E.locale, E.l10n));
        const O = new URLSearchParams(window.location.search);
        O.has("cancelReservation") ? (m.value = O.get("cancelReservation"), console.log("Cancel reservation", m.value), a(Qn)) : w ? a(ln) : a();
      } catch (w) {
        u(w);
      } finally {
        setTimeout(() => {
          l.value = !1;
        }, 1e3);
      }
    }), Hn(() => {
      window.removeEventListener("bflex:search-bar:search", y);
    });
    const v = ({ action: w, result: T }) => {
      w === yr ? a() : (w === In && (d.value = T.reservations[0]), a(w));
    }, m = ue(null);
    return (w, T) => (C(), F("main", Qf, [
      x("div", eh, [
        x("section", th, [
          l.value ? (C(), re(kn, { key: 0 }, {
            default: q(() => [
              (C(), F(de, null, Pe(3, (E) => R(xn, { key: E })), 64))
            ]),
            _: 1
          })) : pe("", !0),
          m.value ? (C(), re(Zf, {
            key: 1,
            sid: m.value,
            onCancelReservation: T[0] || (T[0] = (E) => m.value = null)
          }, null, 8, ["sid"])) : r.value === z(ln) ? (C(), re(Ad, {
            key: 2,
            dateRange: f.value,
            promoCode: e.promoCode,
            onReleased: v
          }, null, 8, ["dateRange", "promoCode"])) : r.value === z(In) ? (C(), re(Af, {
            key: 3,
            onReleased: v
          })) : r.value === z(xo) ? (C(), re(Hf, {
            key: 4,
            sid: d.value,
            onReleased: v
          }, null, 8, ["sid"])) : pe("", !0)
        ])
      ])
    ]));
  }
}, nh = { style: { display: "flex", "flex-direction": "column", "min-height": "300px", "justify-content": "center", "align-items": "center" } }, Br = {
  __name: "BflexErrorProvider",
  setup(e) {
    const { t } = Le(), n = ue(null);
    Wo("globalError", { setError: (l) => {
      n.value = l;
    }, clearError: () => {
      n.value = null;
    } });
    const a = () => {
      location.reload();
    };
    return (l, d) => n.value ? (C(), re(Xe, { key: 1 }, {
      default: q(() => [
        R(Ne, null, {
          default: q(() => [
            x("section", nh, [
              x("h1", null, M(z(t)("globalError.title")), 1),
              x("p", null, M(z(t)("globalError.description")), 1),
              x("button", {
                class: "button",
                onClick: a
              }, M(z(t)("globalError.reload")), 1)
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : ge(l.$slots, "default", { key: 0 });
  }
}, ih = '@charset "UTF-8";.resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}.v-popper__popper{z-index:10000;top:0;left:0;outline:none}.v-popper__popper.v-popper__popper--hidden{visibility:hidden;opacity:0;transition:opacity .15s,visibility .15s;pointer-events:none}.v-popper__popper.v-popper__popper--shown{visibility:visible;opacity:1;transition:opacity .15s}.v-popper__popper.v-popper__popper--skip-transition,.v-popper__popper.v-popper__popper--skip-transition>.v-popper__wrapper{transition:none!important}.v-popper__backdrop{position:absolute;top:0;left:0;width:100%;height:100%;display:none}.v-popper__inner{position:relative;box-sizing:border-box;overflow-y:auto}.v-popper__inner>div{position:relative;z-index:1;max-width:inherit;max-height:inherit}.v-popper__arrow-container{position:absolute;width:10px;height:10px}.v-popper__popper--arrow-overflow .v-popper__arrow-container,.v-popper__popper--no-positioning .v-popper__arrow-container{display:none}.v-popper__arrow-inner,.v-popper__arrow-outer{border-style:solid;position:absolute;top:0;left:0;width:0;height:0}.v-popper__arrow-inner{visibility:hidden;border-width:7px}.v-popper__arrow-outer{border-width:6px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{left:-2px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{left:-1px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer{border-bottom-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-container{top:0}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{border-top-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-top-color:transparent!important}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{top:-4px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{top:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{top:-1px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{border-left-width:0;border-left-color:transparent!important;border-top-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{left:-4px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{left:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-container{right:-10px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer{border-right-width:0;border-top-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner{left:-2px}.v-popper--theme-tooltip .v-popper__inner{background:#000c;color:#fff;border-radius:6px;padding:7px 12px 6px}.v-popper--theme-tooltip .v-popper__arrow-outer{border-color:#000c}.v-popper--theme-dropdown .v-popper__inner{background:#fff;color:#000;border-radius:6px;border:1px solid #ddd;box-shadow:0 6px 30px #0000001a}.v-popper--theme-dropdown .v-popper__arrow-inner{visibility:visible;border-color:#fff}.v-popper--theme-dropdown .v-popper__arrow-outer{border-color:#ddd}:host,.booking-widget{font-family:var(--font-base, "Roboto"),sans-serif;font-size:var(--base-font, 16px);color:#696969;line-height:1.5;box-sizing:border-box;display:flex;flex-direction:column;max-width:960px;margin:0 auto}*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}.booking-widget__content{position:relative;min-height:450px}h1{font-size:1.5rem;font-weight:600;margin-bottom:1rem}h2{font-size:1.25rem;font-weight:600;margin-bottom:.75rem}h3{font-size:1.125rem;font-weight:600;margin-bottom:.75rem}h4{font-size:1rem;font-weight:600;margin-bottom:.5rem}h5{font-size:.875rem;font-weight:600;margin-bottom:.5rem}p{font-size:1rem;margin-bottom:.75rem}small,.text-sm{font-size:.875rem}.button{display:inline-flex;align-items:center;justify-content:center;font-size:.875rem;padding:.5rem 1rem;border-radius:.375rem;background:#007aff;color:#fff;border:none;cursor:pointer;text-decoration:none;text-wrap:nowrap}.button:hover{background:#0062cc}.button:disabled{background:#ccc;cursor:not-allowed}.section{padding:1.5rem}.card+.card{margin-top:1rem}blockquote,.blockquote{border-left:3px solid #696969;padding-left:1rem;margin-bottom:1rem;font-size:.875rem;color:#696969}.cursor-pointer{cursor:pointer}abbr,.abbreviation{display:inline;border-bottom-style:dotted;border-bottom-width:1px;cursor:pointer}.inline{display:inline}strong{font-weight:700}a{color:#ff4500;cursor:pointer;text-decoration:underline}a:hover{text-decoration:none}ul{margin:0}ul li{display:block;margin-bottom:.5rem;list-style:disc}ul li:before{content:"";display:inline-flex;margin-right:.25rem}#bflex-booking-widget{position:relative;container-type:inline-size;container-name:widget}@container widget (max-width: 480px){.booking-widget{font-size:var(--base-font, 14px);line-height:1.4}}.details-info{display:flex;background-color:#f9f9fa;border-radius:5px;padding:1rem 1.25rem;font-size:.875rem;column-gap:.5rem}.details-info--icon{flex:0 0 1rem}.accommodation-list__item{margin-bottom:.5rem}.accommodation-list__item-delete{margin-bottom:.5rem;color:#a1a1a1}.accommodation-list__item-delete:hover{color:#1b1b1f}.accommodation-list__total{color:#000}.accommodation-list__payment-rules dd,.accommodation-list__payment-rules dt{margin-bottom:.25rem;font-size:.875rem}.accommodation-list .payment-type{display:inline-flex;flex-direction:row;align-items:center;font-size:.875rem;border:1px solid orangered;border-radius:5px;margin-top:1rem}.accommodation-list .payment-type__label{font-weight:700;background-color:#ff4500;color:#fff;height:100%;padding:.5rem 1rem;flex-wrap:nowrap;text-wrap:nowrap}.accommodation-list .payment-type__variants{display:flex;flex-direction:row;align-items:start;justify-content:start;width:100%;padding:.5rem 1rem;box-sizing:border-box}.accommodation-list .payment-type label{display:flex;flex-direction:row;font-weight:400;margin-right:1rem;cursor:pointer}.accommodation-list .payment-type label input[type=radio]{margin:0 .25rem;padding:0}@container widget (max-width: 480px){.accommodation-list .payment-type{flex-direction:column;align-items:start;width:100%}.accommodation-list .payment-type__label{margin-right:0;width:100%}.accommodation-list .payment-type__variants{flex-direction:column;align-items:start;justify-content:start;width:100%}.accommodation-list .payment-type label{flex-direction:row;padding:.5rem .5rem .5rem 0}}.rate-plan-list{display:flex;flex-flow:column}.rate-plan-list .rate-plan-card:last-child{border-bottom-left-radius:var(--main-border-radius, 10px);border-bottom-right-radius:var(--main-border-radius, 10px)}@container widget (max-width: 480px){.accommodation-offer{overflow-x:hidden}.rate-plan-list__wrapper{padding:.5rem}.rate-plan-list{overflow-x:scroll;scroll-snap-type:x mandatory;flex-direction:row;column-gap:.5rem}}.agreement-rules-list__rules li{padding-left:.25rem}.agreement-rules-list__rules li:before{display:inline-block;content:"—";margin-right:.25rem}.agreement-rules-list__agreements-item{display:flex;flex-direction:row;margin-bottom:.5rem}.agreement-rules-list__combined-agreement{padding:0}.agreement-rules-list__combined-agreement:after{display:inline-block;padding-right:0;content:", ";text-decoration:none}.agreement-rules-list__combined-agreement:last-child:after{content:"";display:none}.accommodation-type-card{display:flex;color:var(--accommodation-type-card-color);border-top-left-radius:var(--main-border-radius, 10px);border-top-right-radius:var(--main-border-radius, 10px);background:var(--accommodation-type-card-background, transparent)}.accommodation-type-card__img{width:300px;flex-shrink:0;border-top-left-radius:var(--main-border-radius, 10px);overflow:hidden;background:#e0e0e0;cursor:pointer;display:flex}.accommodation-type-card__img img{width:100%;height:100%;object-fit:cover;object-position:center}.accommodation-type-card__body{display:flex;flex-flow:column;justify-content:space-between;padding:1.5rem;width:100%}.amenities{font-size:.75rem;background:transparent;margin-top:.75rem;display:inline-flex;flex-wrap:wrap;gap:.5rem}.amenities__item{border:1px solid var(--main-border-color, #e0e0e0);padding:.5rem;background:transparent;line-height:1;border-radius:3px}@container widget (max-width: 480px){.accommodation-type-card{flex-flow:column;max-height:initial;height:auto}.accommodation-type-card__img{width:auto;border-top-right-radius:var(--accommodation-type-card-border-radius, 3px);line-height:1}.accommodation-type-card__img img{height:220px}.accommodation-type-card__body{width:auto}}.custom-checkbox{display:flex;align-items:center;cursor:pointer}.custom-checkbox input[type=checkbox]{position:absolute;opacity:0;width:1.25rem;height:1.25rem;cursor:pointer}.custom-checkbox__box{width:1rem;height:1rem;flex:0 0 1rem;border:2px solid rgba(34,34,34,.2);border-radius:3px;position:relative;margin-right:.5rem;transition:background-color .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box{background-color:#fff}.custom-checkbox__box:after{content:"";position:absolute;top:50%;left:50%;width:.5rem;height:.5rem;background-color:#ff4500;transform:translate(-50%,-50%) scale(0);transition:transform .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box:after{transform:translate(-50%,-50%) scale(1)}.customer-data-form{display:grid;grid-template-columns:1fr 1fr;row-gap:1rem;column-gap:1.5rem;padding:1rem 0 0}@container widget (max-width: 480px){.customer-data-form{grid-template-columns:1fr}}.field-decorator__required{padding-left:3px;color:red}.field-decorator__input-group{border:1px solid rgba(34,34,34,.2);border-radius:5px;background-color:#fff;padding:.25rem .5rem;display:flex;flex-direction:column}.field-decorator__label{font-size:.875em;margin-bottom:.25em;line-height:1;color:#2226}.field-decorator__slot{display:flex;flex-direction:column;width:100%;height:auto}.field-decorator__slot textarea,.field-decorator__slot select,.field-decorator__slot input{border:0!important;outline:0!important;background:#fff;width:100%;height:100%;font-size:.875rem;padding:.25rem 0}.field-decorator__slot textarea{resize:vertical}.field-decorator__hint{height:1.25rem;color:#3d3d3d;text-align:right;font-size:.725rem;overflow:hidden}.form-group--error .field-decorator__input-group{border-color:red}.form-group--error .field-decorator__hint{color:red}.information-block-grid{display:grid;grid-row-gap:1.25rem}.information-block{background-color:#fff;border-radius:var(--main-border-radius, 10px)}.information-block--attention{border:3px solid red}.information-block__content{padding:1rem 1.25rem}.information-block__content dl{display:grid;grid-template-columns:1fr 1fr;gap:.25rem;align-items:center}.information-block__content dl dt{font-weight:700;line-height:1}.information-block__content dl dd{text-align:right;line-height:1}.information-block__content a{padding:0 .25rem}.information-block .divider{margin:0;height:1px;background-color:#e0e0e0}.information-block header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin:0;padding:1rem 1.25rem;border-radius:10px 10px 0 0;font-size:1.25rem;font-weight:700}.information-block header .additional{color:gray;font-weight:400}.information-block header.dense{padding:.5rem 1.25rem}@container widget (max-width: 480px){.information-block header{flex-direction:column;align-items:flex-start}}.cycle-loader{display:flex}@-webkit-keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}@keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}.price-block{display:grid;grid-template-columns:1fr;grid-template-areas:"discount" "amount";line-height:1;height:100%;width:100%}.price-block__discount{grid-area:discount;line-height:1;display:flex;align-items:center;justify-self:end;font-size:.75rem;font-weight:lighter}.price-block__discount-size{display:block;padding:.125rem;margin-right:.25rem;background:red;color:#fff}.price-block__old{text-decoration-line:line-through;opacity:.5}.price-block__schedule{font-size:.75rem}.price-block__icons .icon{font-size:1rem}.price-block__amount{grid-area:amount;display:flex;flex-direction:row;align-items:center;justify-content:space-between;line-height:1;font-size:1.25rem}.price-block__current{margin-left:.5rem}.price-block__current-currency{font-weight:lighter;padding:0 .125rem}@container widget (max-width: 480px){.price-block{grid-template-columns:1fr;grid-template-areas:"amount discount";column-gap:1rem}}.rate-plan-card{display:grid;grid-template-columns:1fr 1fr;grid-template-areas:"description actions" "bottom actions";width:100%;position:relative;background-color:var(--rate-plan-background);font-size:var(--rate-plan-font-size);color:var(--rate-plan-color)}.rate-plan-card--blocked{display:flex;justify-content:center;height:100%;width:100%;position:absolute;background:#0000001a;z-index:1}.rate-plan-card__title{display:inline-flex;align-items:center}.rate-plan-card__wrapper{grid-area:description;padding:0}.rate-plan-card blockquote{border-left-color:var(--rate-plan-secondary-color);color:var(--rate-plan-secondary-color)}.rate-plan-card__description{padding:1.5rem}.rate-plan-card__offers{font-size:var(--rate-plan-font-size, .875rem);color:var(--rate-plan-secondary-color)}.rate-plan-card__offers-item{display:flex;align-items:center;padding:.375rem 0}.rate-plan-card__offers-item .icon{margin-right:.375rem;color:var(--rate-plan-icon-primary-color, #696969);fill:var(--rate-plan-icon-primary-color, #696969)}.rate-plan-card__offers-item.extra-offer .icon{color:inherit}.rate-plan-card__offers-item.feed-offer{color:var(--rate-plan-icon-secondary-color, #28a745)}.rate-plan-card__offers-item.feed-offer .icon{color:var(--rate-plan-icon-secondary-color, #28a745);fill:var(--rate-plan-icon-secondary-color, #28a745)}.rate-plan-card__variants{display:flex;flex-direction:column;align-items:end;padding:1rem 0}.rate-plan-card__variants .length-of-stay{display:block;font-size:.875rem;text-align:right;padding:0 1rem}@container widget (max-width: 480px){.rate-plan-list--single .rate-plan-card{width:100%;flex:0 0 100%}.rate-plan-card{display:flex;flex:0 0 90%;flex-direction:column;min-width:90%;scroll-snap-align:start;border-radius:var(--main-border-radius, 10px);border:1px solid var(--main-border-color, #e0e0e0)}.rate-plan-card__actions{justify-self:stretch}}.variant-line{text-align:right;font-size:var(--variant-line-font-size);color:var(--variant-line-color, #000000)}.variant-line:hover,.variant-line.selected{background:var(--variant-line-selected, #e0e0e0)}.variant-line.selected:hover{background:var(--variant-line-hover, #d7d7d7)}.variant-line__content{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;padding:.5rem 1rem}.variant-line__actions{margin-left:1rem}@container widget (max-width: 480px){.rate-plan-card__variants .variant-line:nth-of-type(odd){background:#f5f5f5}.variant-line{width:100%}.variant-line__content{flex-direction:column;row-gap:.5rem;width:100%}.variant-line__actions{align-self:end;width:100%}.variant-line__actions button{width:100%}}.reservation-result{display:flex;flex-direction:column;margin-top:2rem;margin-bottom:1rem}.reservation-result__title{font-size:1.5rem;font-weight:700;text-align:center}.reservation-result__description{font-size:1.2rem;text-align:center}.hotel-information{display:flex;flex-direction:column;row-gap:.25rem;font-size:.875rem;justify-content:center;justify-items:center}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.accommodation-skeleton.accommodation-result .header .thumbnail,.accommodation-skeleton.accommodation-result .header .content .description,.accommodation-skeleton.accommodation-result .header .content .amenities{display:none}.accommodation-skeleton.accommodation-result .header .content .title-skeleton{width:220px;margin-bottom:0}.accommodation-skeleton .header{display:flex;flex-direction:column}@media (min-width: 768px){.accommodation-skeleton .header{flex-direction:row}}.accommodation-skeleton .header .thumbnail{width:100%;height:192px;border-top-left-radius:10px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0}@media (min-width: 768px){.accommodation-skeleton .header .thumbnail{width:300px}}.accommodation-skeleton .header .content{flex:1;padding:16px}.accommodation-skeleton .header .content .title-skeleton{height:32px;width:96px;margin-bottom:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description{margin-bottom:16px;display:flex;flex-direction:column;gap:8px}.accommodation-skeleton .header .content .description .line{height:16px;width:100%;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description .line.line-short{width:75%}.accommodation-skeleton .header .content .amenities{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.accommodation-skeleton .header .content .amenities .amenity-item{height:32px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header{padding:16px;display:flex;justify-content:space-between;align-items:center}.accommodation-skeleton .footer .option-header .option-title{height:24px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header .option-value{height:24px;width:64px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option{padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start}@media (min-width: 768px){.accommodation-skeleton .footer .room-option{flex-direction:row;align-items:center}}.accommodation-skeleton .footer .room-option .option-details{display:flex;flex-direction:column;gap:8px;width:100%}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .option-details{width:50%}}.accommodation-skeleton .footer .room-option .option-details .option-name{height:20px;width:192px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .option-details .option-description{height:16px;width:128px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section{display:flex;align-items:center;margin-top:8px}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .price-section{margin-top:0}}.accommodation-skeleton .footer .room-option .price-section .price{height:24px;width:64px;margin-right:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section .book-button{height:40px;width:96px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.icons{display:flex;align-items:baseline;color:#323232;fill:#323232}.scenario-text{font-size:var(--base-font);font-weight:lighter}.summary-block{position:sticky;width:auto;bottom:0;right:0;padding:1rem;box-shadow:0 -4px 54px #9e9e9e33;background:#fff;z-index:4;border-radius:10px}.summary-block__content{display:flex;justify-content:space-between;align-items:center}.summary-block__content-info{display:flex;flex-direction:column;align-items:flex-start}.summary-block__content-info__price{font-size:1rem;font-weight:700;color:#ff4500}.summary-block__content-info__text{display:flex;align-items:center;font-size:.875rem;color:#2229;vertical-align:center}.summary-block__content-info__text .icon{font-size:1rem;margin-left:.25rem}.summary-block .accommodation-summary-trigger{cursor:pointer}.summary-block .accommodation-summary-trigger:hover{color:#ff4500}@container widget (max-width: 480px){.summary-block{position:sticky;box-sizing:border-box;left:0;width:100%}}.v-popper__popper p{line-height:1;padding:.125rem 0;margin:.5rem;font-size:.875rem}.icon{fill:currentColor}.icon--small{width:16px}.icon-text{display:inline-flex;flex-direction:row;align-items:center;column-gap:.375rem}.icon-text__icon{display:inline-flex;color:#ff4500;flex:0 0 1rem}.icon-text__icon .icon{width:1.5rem}.icon-text__text{line-height:1}', oh = {
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
    const t = e, n = ue({
      accommodationTypes: [],
      ratePlans: []
    });
    return Ve(
      () => ({ accommodationTypes: t.accommodationTypes, ratePlans: t.ratePlans }),
      (o) => {
        (o.accommodationTypes.length || o.ratePlans.length) && (n.value = {
          accommodationTypes: o.accommodationTypes.split(","),
          ratePlans: o.accommodationTypes.split(",")
        });
      }
    ), ls(() => {
      var r;
      const o = (r = Gt()) == null ? void 0 : r.appContext.app;
      o && !o.__i18n_installed && (o.use(Mn), o.__i18n_installed = !0);
    }), Hn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (o, r) => (C(), re(Br, null, {
      default: q(() => [
        R(Fr, {
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
}, rh = /* @__PURE__ */ wn(oh, [["styles", [ih]]]), sh = {
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
    return Hn(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed"));
    }), (t, n) => (C(), re(Br, null, {
      default: q(() => [
        R(Fr, {
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
globalThis.window && window.customElements.define("bflex-booking-widget", cs(rh));
function lh(e) {
  us(sh, { initOptions: e }).use(Mn).mount("#bflex-booking-widget");
}
export {
  Fr as BookingWidget,
  lh as mountWidget
};
