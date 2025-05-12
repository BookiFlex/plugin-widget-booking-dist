import { effectScope as gs, ref as ye, shallowRef as _s, computed as Ne, watch as Ze, isRef as vs, defineComponent as Ut, getCurrentInstance as tn, h as sr, Fragment as de, inject as Mt, onMounted as rn, onUnmounted as ar, createVNode as M, Text as ys, createElementBlock as R, openBlock as A, renderSlot as ge, createBlock as ce, normalizeClass as ot, withCtx as H, createElementVNode as x, renderList as Oe, onBeforeUnmount as bs, toDisplayString as B, unref as W, pushScopeId as ws, popScopeId as xs, nextTick as Es, normalizeProps as Ts, guardReactiveProps as ks, resolveComponent as hi, mergeProps as Mi, withScopeId as Ss, withKeys as Ns, normalizeStyle as Dt, createCommentVNode as _e, resolveDynamicComponent as Os, withDirectives as rt, vShow as gi, createTextVNode as le, toRefs as As, reactive as _i, vModelText as vn, withModifiers as Cs, vModelSelect as Ls, vModelCheckbox as Is, provide as lr, toRaw as Ps, onBeforeMount as $s, defineCustomElement as Ds, createApp as Rs } from "vue";
const qt = {
  INIT: "bflex/v1/cart/init",
  OFFERS: "bflex/v1/offers",
  CART: "bflex/v1/cart",
  CHANGE_PAYMENT_TYPE: "bflex/v1/cart/paymentType",
  CONFIRM_CART: "bflex/v1/cart/confirm",
  LOAD_RESERVATION: "bflex/v1/account/reservation"
};
async function Ht(e) {
  let t = null;
  try {
    t = await e.json();
  } catch {
    const a = new Error("Invalid JSON in response");
    throw a.code = "invalid_json", a.status = e.status, a;
  }
  if (e.ok && t.status === "success")
    return t.result;
  const n = t.message || "Unknown API error", i = t.code || "api_error", o = new Error(n);
  throw o.code = i, o.data = t.data, o.status = e.status, o;
}
async function Wt() {
  var t;
  if ((t = window.BookiFlex) != null && t.restUrl)
    return io(window.BookiFlex.restUrl);
  const e = document.querySelector('link[rel="https://api.w.org/"]');
  if (e != null && e.href)
    return io(e.href);
  try {
    if ((await fetch("/wp-json/", { method: "HEAD" })).ok) return "/wp-json/";
  } catch {
  }
  return "/index.php?rest_route=/";
}
function io(e) {
  try {
    const t = new URL(e, location.href);
    return t.pathname + t.search;
  } catch {
    return e;
  }
}
const Ms = async () => {
  const e = await Wt() + qt.INIT;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await Ht(t);
  } catch (t) {
    throw console.error("Error in init app", t), t;
  }
}, Fs = async (e, t, n) => {
  console.debug("Loading data", e, t, n);
  const i = await Wt() + qt.OFFERS + "?";
  if (!e || !t)
    throw new Error("Invalid dates");
  const o = `${i}checkInDate=${e}&checkOutDate=${t}&promoCode=${n || ""}`;
  try {
    const s = await fetch(o);
    return await Ht(s);
  } catch (s) {
    throw console.error("Failed to load offers:", s), s;
  }
}, Bs = async () => {
  console.debug("Loading cart");
  const e = await Wt() + qt.CART;
  try {
    const t = await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: {} })
    });
    return await Ht(t);
  } catch (t) {
    throw console.error("Failed to load cart:", t), t;
  }
}, cr = async (e) => {
  const t = await Wt() + qt.CART;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ request: e })
    });
    return await Ht(n);
  } catch (n) {
    throw console.error("Failed to add to cart:", n), n;
  }
}, zs = async (e) => {
  const t = await Wt() + qt.CHANGE_PAYMENT_TYPE;
  try {
    const n = await fetch(t, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Ht(n);
  } catch (n) {
    throw console.error("Failed to change payment type:", n), n;
  }
}, Vs = async (e) => {
  console.debug("Confirming booking", e);
  const t = await Wt() + qt.CONFIRM_CART;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Ht(n);
  } catch (n) {
    throw console.error("Failed to confirm booking:", n), n;
  }
}, Us = async (e) => {
  const t = await Wt() + qt.LOAD_RESERVATION;
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return await Ht(n);
  } catch (n) {
    throw console.error("Failed to load reservation:", n), n;
  }
};
/*!
  * shared v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Qe = typeof window < "u";
let qe, Ft;
if (process.env.NODE_ENV !== "production") {
  const e = Qe && window.performance;
  e && e.mark && e.measure && e.clearMarks && // @ts-ignore browser compat
  e.clearMeasures && (qe = (t) => {
    e.mark(t);
  }, Ft = (t, n, i) => {
    e.measure(t, n, i), e.clearMarks(n), e.clearMarks(i);
  });
}
const qs = /\{([0-9a-zA-Z]+)\}/g;
function Qn(e, ...t) {
  return t.length === 1 && re(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(qs, (n, i) => t.hasOwnProperty(i) ? t[i] : "");
}
const ct = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), Hs = (e, t, n) => Ws({ l: e, k: t, s: n }), Ws = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), ke = (e) => typeof e == "number" && isFinite(e), Ys = (e) => Fi(e) === "[object Date]", nn = (e) => Fi(e) === "[object RegExp]", ei = (e) => ee(e) && Object.keys(e).length === 0, Se = Object.assign, js = Object.create, ue = (e = null) => js(e);
let oo;
const $t = () => oo || (oo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : ue());
function ro(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const Gs = Object.prototype.hasOwnProperty;
function Ke(e, t) {
  return Gs.call(e, t);
}
const Ee = Array.isArray, pe = (e) => typeof e == "function", V = (e) => typeof e == "string", se = (e) => typeof e == "boolean", re = (e) => e !== null && typeof e == "object", Xs = (e) => re(e) && pe(e.then) && pe(e.catch), dr = Object.prototype.toString, Fi = (e) => dr.call(e), ee = (e) => Fi(e) === "[object Object]", Ks = (e) => e == null ? "" : Ee(e) || ee(e) && e.toString === dr ? JSON.stringify(e, null, 2) : String(e);
function Bi(e, t = "") {
  return e.reduce((n, i, o) => o === 0 ? n + i : n + t + i, "");
}
const so = 2;
function Js(e, t = 0, n = e.length) {
  const i = e.split(/\r?\n/);
  let o = 0;
  const s = [];
  for (let a = 0; a < i.length; a++)
    if (o += i[a].length + 1, o >= t) {
      for (let d = a - so; d <= a + so || n > o; d++) {
        if (d < 0 || d >= i.length)
          continue;
        const f = d + 1;
        s.push(`${f}${" ".repeat(3 - String(f).length)}|  ${i[d]}`);
        const m = i[d].length;
        if (d === a) {
          const v = t - (o - m) + 1, g = Math.max(1, n > o ? m - v : n - t);
          s.push("   |  " + " ".repeat(v) + "^".repeat(g));
        } else if (d > a) {
          if (n > o) {
            const v = Math.max(Math.min(n - o, m), 1);
            s.push("   |  " + "^".repeat(v));
          }
          o += m + 1;
        }
      }
      break;
    }
  return s.join(`
`);
}
function Nt(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const ao = {};
function zi(e) {
  ao[e] || (ao[e] = !0, Nt(e));
}
function Vi() {
  const e = /* @__PURE__ */ new Map();
  return {
    events: e,
    on(n, i) {
      const o = e.get(n);
      o && o.push(i) || e.set(n, [i]);
    },
    off(n, i) {
      const o = e.get(n);
      o && o.splice(o.indexOf(i) >>> 0, 1);
    },
    emit(n, i) {
      (e.get(n) || []).slice().map((o) => o(i)), (e.get("*") || []).slice().map((o) => o(n, i));
    }
  };
}
const Bn = (e) => !re(e) || Ee(e);
function Hn(e, t) {
  if (Bn(e) || Bn(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: i, des: o } = n.pop();
    Object.keys(i).forEach((s) => {
      s !== "__proto__" && (re(i[s]) && !re(o[s]) && (o[s] = Array.isArray(i[s]) ? [] : ue()), Bn(o[s]) || Bn(i[s]) ? o[s] = i[s] : n.push({ src: i[s], des: o[s] }));
    });
  }
}
/*!
  * message-compiler v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Zs(e, t, n) {
  return { line: e, column: t, offset: n };
}
function vi(e, t, n) {
  return { start: e, end: t };
}
const J = {
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
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16
}, Qs = 17, ea = {
  // tokenizer error messages
  [J.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [J.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [J.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [J.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [J.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [J.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [J.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [J.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [J.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [J.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [J.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [J.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [J.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [J.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [J.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [J.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function sn(e, t, n = {}) {
  const { domain: i, messages: o, args: s } = n, a = process.env.NODE_ENV !== "production" ? Qn((o || ea)[e] || "", ...s || []) : e, d = new SyntaxError(String(a));
  return d.code = e, t && (d.location = t), d.domain = i, d;
}
function ta(e) {
  throw e;
}
const na = /<\/?[\w\s="/.':;#-\/]+>/, ia = (e) => na.test(e), ht = " ", oa = "\r", Me = `
`, ra = "\u2028", sa = "\u2029";
function aa(e) {
  const t = e;
  let n = 0, i = 1, o = 1, s = 0;
  const a = (I) => t[I] === oa && t[I + 1] === Me, d = (I) => t[I] === Me, f = (I) => t[I] === sa, m = (I) => t[I] === ra, v = (I) => a(I) || d(I) || f(I) || m(I), g = () => n, p = () => i, w = () => o, T = () => s, k = (I) => a(I) || f(I) || m(I) ? Me : t[I], P = () => k(n), b = () => k(n + s);
  function E() {
    return s = 0, v(n) && (i++, o = 0), a(n) && n++, n++, o++, t[n];
  }
  function L() {
    return a(n + s) && s++, s++, t[n + s];
  }
  function N() {
    n = 0, i = 1, o = 1, s = 0;
  }
  function $(I = 0) {
    s = I;
  }
  function F() {
    const I = n + s;
    for (; I !== n; )
      E();
    s = 0;
  }
  return {
    index: g,
    line: p,
    column: w,
    peekOffset: T,
    charAt: k,
    currentChar: P,
    currentPeek: b,
    next: E,
    peek: L,
    reset: N,
    resetPeek: $,
    skipToPeek: F
  };
}
const wt = void 0, la = ".", lo = "'", ca = "tokenizer";
function da(e, t = {}) {
  const n = t.location !== !1, i = aa(e), o = () => i.index(), s = () => Zs(i.line(), i.column(), i.index()), a = s(), d = o(), f = {
    currentType: 13,
    offset: d,
    startLoc: a,
    endLoc: a,
    lastType: 13,
    lastOffset: d,
    lastStartLoc: a,
    lastEndLoc: a,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, m = () => f, { onError: v } = t;
  function g(h, y, D, ...Y) {
    const ve = m();
    if (y.column += D, y.offset += D, v) {
      const r = n ? vi(ve.startLoc, y) : null, l = sn(h, r, {
        domain: ca,
        args: Y
      });
      v(l);
    }
  }
  function p(h, y, D) {
    h.endLoc = s(), h.currentType = y;
    const Y = { type: y };
    return n && (Y.loc = vi(h.startLoc, h.endLoc)), D != null && (Y.value = D), Y;
  }
  const w = (h) => p(
    h,
    13
    /* TokenTypes.EOF */
  );
  function T(h, y) {
    return h.currentChar() === y ? (h.next(), y) : (g(J.EXPECTED_TOKEN, s(), 0, y), "");
  }
  function k(h) {
    let y = "";
    for (; h.currentPeek() === ht || h.currentPeek() === Me; )
      y += h.currentPeek(), h.peek();
    return y;
  }
  function P(h) {
    const y = k(h);
    return h.skipToPeek(), y;
  }
  function b(h) {
    if (h === wt)
      return !1;
    const y = h.charCodeAt(0);
    return y >= 97 && y <= 122 || // a-z
    y >= 65 && y <= 90 || // A-Z
    y === 95;
  }
  function E(h) {
    if (h === wt)
      return !1;
    const y = h.charCodeAt(0);
    return y >= 48 && y <= 57;
  }
  function L(h, y) {
    const { currentType: D } = y;
    if (D !== 2)
      return !1;
    k(h);
    const Y = b(h.currentPeek());
    return h.resetPeek(), Y;
  }
  function N(h, y) {
    const { currentType: D } = y;
    if (D !== 2)
      return !1;
    k(h);
    const Y = h.currentPeek() === "-" ? h.peek() : h.currentPeek(), ve = E(Y);
    return h.resetPeek(), ve;
  }
  function $(h, y) {
    const { currentType: D } = y;
    if (D !== 2)
      return !1;
    k(h);
    const Y = h.currentPeek() === lo;
    return h.resetPeek(), Y;
  }
  function F(h, y) {
    const { currentType: D } = y;
    if (D !== 7)
      return !1;
    k(h);
    const Y = h.currentPeek() === ".";
    return h.resetPeek(), Y;
  }
  function I(h, y) {
    const { currentType: D } = y;
    if (D !== 8)
      return !1;
    k(h);
    const Y = b(h.currentPeek());
    return h.resetPeek(), Y;
  }
  function G(h, y) {
    const { currentType: D } = y;
    if (!(D === 7 || D === 11))
      return !1;
    k(h);
    const Y = h.currentPeek() === ":";
    return h.resetPeek(), Y;
  }
  function K(h, y) {
    const { currentType: D } = y;
    if (D !== 9)
      return !1;
    const Y = () => {
      const r = h.currentPeek();
      return r === "{" ? b(h.peek()) : r === "@" || r === "|" || r === ":" || r === "." || r === ht || !r ? !1 : r === Me ? (h.peek(), Y()) : ae(h, !1);
    }, ve = Y();
    return h.resetPeek(), ve;
  }
  function U(h) {
    k(h);
    const y = h.currentPeek() === "|";
    return h.resetPeek(), y;
  }
  function ae(h, y = !0) {
    const D = (ve = !1, r = "") => {
      const l = h.currentPeek();
      return l === "{" || l === "@" || !l ? ve : l === "|" ? !(r === ht || r === Me) : l === ht ? (h.peek(), D(!0, ht)) : l === Me ? (h.peek(), D(!0, Me)) : !0;
    }, Y = D();
    return y && h.resetPeek(), Y;
  }
  function Z(h, y) {
    const D = h.currentChar();
    return D === wt ? wt : y(D) ? (h.next(), D) : null;
  }
  function Te(h) {
    const y = h.charCodeAt(0);
    return y >= 97 && y <= 122 || // a-z
    y >= 65 && y <= 90 || // A-Z
    y >= 48 && y <= 57 || // 0-9
    y === 95 || // _
    y === 36;
  }
  function be(h) {
    return Z(h, Te);
  }
  function Ae(h) {
    const y = h.charCodeAt(0);
    return y >= 97 && y <= 122 || // a-z
    y >= 65 && y <= 90 || // A-Z
    y >= 48 && y <= 57 || // 0-9
    y === 95 || // _
    y === 36 || // $
    y === 45;
  }
  function fe(h) {
    return Z(h, Ae);
  }
  function ie(h) {
    const y = h.charCodeAt(0);
    return y >= 48 && y <= 57;
  }
  function De(h) {
    return Z(h, ie);
  }
  function Ce(h) {
    const y = h.charCodeAt(0);
    return y >= 48 && y <= 57 || // 0-9
    y >= 65 && y <= 70 || // A-F
    y >= 97 && y <= 102;
  }
  function Be(h) {
    return Z(h, Ce);
  }
  function Ct(h) {
    let y = "", D = "";
    for (; y = De(h); )
      D += y;
    return D;
  }
  function ln(h) {
    let y = "";
    for (; ; ) {
      const D = h.currentChar();
      if (D === "{" || D === "}" || D === "@" || D === "|" || !D)
        break;
      if (D === ht || D === Me)
        if (ae(h))
          y += D, h.next();
        else {
          if (U(h))
            break;
          y += D, h.next();
        }
      else
        y += D, h.next();
    }
    return y;
  }
  function jt(h) {
    P(h);
    let y = "", D = "";
    for (; y = fe(h); )
      D += y;
    return h.currentChar() === wt && g(J.UNTERMINATED_CLOSING_BRACE, s(), 0), D;
  }
  function cn(h) {
    P(h);
    let y = "";
    return h.currentChar() === "-" ? (h.next(), y += `-${Ct(h)}`) : y += Ct(h), h.currentChar() === wt && g(J.UNTERMINATED_CLOSING_BRACE, s(), 0), y;
  }
  function dn(h) {
    return h !== lo && h !== Me;
  }
  function un(h) {
    P(h), T(h, "'");
    let y = "", D = "";
    for (; y = Z(h, dn); )
      y === "\\" ? D += fn(h) : D += y;
    const Y = h.currentChar();
    return Y === Me || Y === wt ? (g(J.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, s(), 0), Y === Me && (h.next(), T(h, "'")), D) : (T(h, "'"), D);
  }
  function fn(h) {
    const y = h.currentChar();
    switch (y) {
      case "\\":
      case "'":
        return h.next(), `\\${y}`;
      case "u":
        return Gt(h, y, 4);
      case "U":
        return Gt(h, y, 6);
      default:
        return g(J.UNKNOWN_ESCAPE_SEQUENCE, s(), 0, y), "";
    }
  }
  function Gt(h, y, D) {
    T(h, y);
    let Y = "";
    for (let ve = 0; ve < D; ve++) {
      const r = Be(h);
      if (!r) {
        g(J.INVALID_UNICODE_ESCAPE_SEQUENCE, s(), 0, `\\${y}${Y}${h.currentChar()}`);
        break;
      }
      Y += r;
    }
    return `\\${y}${Y}`;
  }
  function mn(h) {
    return h !== "{" && h !== "}" && h !== ht && h !== Me;
  }
  function vt(h) {
    P(h);
    let y = "", D = "";
    for (; y = Z(h, mn); )
      D += y;
    return D;
  }
  function yt(h) {
    let y = "", D = "";
    for (; y = be(h); )
      D += y;
    return D;
  }
  function pn(h) {
    const y = (D) => {
      const Y = h.currentChar();
      return Y === "{" || Y === "@" || Y === "|" || Y === "(" || Y === ")" || !Y || Y === ht ? D : (D += Y, h.next(), y(D));
    };
    return y("");
  }
  function Lt(h) {
    P(h);
    const y = T(
      h,
      "|"
      /* TokenChars.Pipe */
    );
    return P(h), y;
  }
  function xe(h, y) {
    let D = null;
    switch (h.currentChar()) {
      case "{":
        return y.braceNest >= 1 && g(J.NOT_ALLOW_NEST_PLACEHOLDER, s(), 0), h.next(), D = p(
          y,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), P(h), y.braceNest++, D;
      case "}":
        return y.braceNest > 0 && y.currentType === 2 && g(J.EMPTY_PLACEHOLDER, s(), 0), h.next(), D = p(
          y,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), y.braceNest--, y.braceNest > 0 && P(h), y.inLinked && y.braceNest === 0 && (y.inLinked = !1), D;
      case "@":
        return y.braceNest > 0 && g(J.UNTERMINATED_CLOSING_BRACE, s(), 0), D = dt(h, y) || w(y), y.braceNest = 0, D;
      default: {
        let ve = !0, r = !0, l = !0;
        if (U(h))
          return y.braceNest > 0 && g(J.UNTERMINATED_CLOSING_BRACE, s(), 0), D = p(y, 1, Lt(h)), y.braceNest = 0, y.inLinked = !1, D;
        if (y.braceNest > 0 && (y.currentType === 4 || y.currentType === 5 || y.currentType === 6))
          return g(J.UNTERMINATED_CLOSING_BRACE, s(), 0), y.braceNest = 0, ut(h, y);
        if (ve = L(h, y))
          return D = p(y, 4, jt(h)), P(h), D;
        if (r = N(h, y))
          return D = p(y, 5, cn(h)), P(h), D;
        if (l = $(h, y))
          return D = p(y, 6, un(h)), P(h), D;
        if (!ve && !r && !l)
          return D = p(y, 12, vt(h)), g(J.INVALID_TOKEN_IN_PLACEHOLDER, s(), 0, D.value), P(h), D;
        break;
      }
    }
    return D;
  }
  function dt(h, y) {
    const { currentType: D } = y;
    let Y = null;
    const ve = h.currentChar();
    switch ((D === 7 || D === 8 || D === 11 || D === 9) && (ve === Me || ve === ht) && g(J.INVALID_LINKED_FORMAT, s(), 0), ve) {
      case "@":
        return h.next(), Y = p(
          y,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), y.inLinked = !0, Y;
      case ".":
        return P(h), h.next(), p(
          y,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return P(h), h.next(), p(
          y,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return U(h) ? (Y = p(y, 1, Lt(h)), y.braceNest = 0, y.inLinked = !1, Y) : F(h, y) || G(h, y) ? (P(h), dt(h, y)) : I(h, y) ? (P(h), p(y, 11, yt(h))) : K(h, y) ? (P(h), ve === "{" ? xe(h, y) || Y : p(y, 10, pn(h))) : (D === 7 && g(J.INVALID_LINKED_FORMAT, s(), 0), y.braceNest = 0, y.inLinked = !1, ut(h, y));
    }
  }
  function ut(h, y) {
    let D = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (y.braceNest > 0)
      return xe(h, y) || w(y);
    if (y.inLinked)
      return dt(h, y) || w(y);
    switch (h.currentChar()) {
      case "{":
        return xe(h, y) || w(y);
      case "}":
        return g(J.UNBALANCED_CLOSING_BRACE, s(), 0), h.next(), p(
          y,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return dt(h, y) || w(y);
      default: {
        if (U(h))
          return D = p(y, 1, Lt(h)), y.braceNest = 0, y.inLinked = !1, D;
        if (ae(h))
          return p(y, 0, ln(h));
        break;
      }
    }
    return D;
  }
  function hn() {
    const { currentType: h, offset: y, startLoc: D, endLoc: Y } = f;
    return f.lastType = h, f.lastOffset = y, f.lastStartLoc = D, f.lastEndLoc = Y, f.offset = o(), f.startLoc = s(), i.currentChar() === wt ? p(
      f,
      13
      /* TokenTypes.EOF */
    ) : ut(i, f);
  }
  return {
    nextToken: hn,
    currentOffset: o,
    currentPosition: s,
    context: m
  };
}
const ua = "parser", fa = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function ma(e, t, n) {
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
function pa(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function i(b, E, L, N, ...$) {
    const F = b.currentPosition();
    if (F.offset += N, F.column += N, n) {
      const I = t ? vi(L, F) : null, G = sn(E, I, {
        domain: ua,
        args: $
      });
      n(G);
    }
  }
  function o(b, E, L) {
    const N = { type: b };
    return t && (N.start = E, N.end = E, N.loc = { start: L, end: L }), N;
  }
  function s(b, E, L, N) {
    t && (b.end = E, b.loc && (b.loc.end = L));
  }
  function a(b, E) {
    const L = b.context(), N = o(3, L.offset, L.startLoc);
    return N.value = E, s(N, b.currentOffset(), b.currentPosition()), N;
  }
  function d(b, E) {
    const L = b.context(), { lastOffset: N, lastStartLoc: $ } = L, F = o(5, N, $);
    return F.index = parseInt(E, 10), b.nextToken(), s(F, b.currentOffset(), b.currentPosition()), F;
  }
  function f(b, E) {
    const L = b.context(), { lastOffset: N, lastStartLoc: $ } = L, F = o(4, N, $);
    return F.key = E, b.nextToken(), s(F, b.currentOffset(), b.currentPosition()), F;
  }
  function m(b, E) {
    const L = b.context(), { lastOffset: N, lastStartLoc: $ } = L, F = o(9, N, $);
    return F.value = E.replace(fa, ma), b.nextToken(), s(F, b.currentOffset(), b.currentPosition()), F;
  }
  function v(b) {
    const E = b.nextToken(), L = b.context(), { lastOffset: N, lastStartLoc: $ } = L, F = o(8, N, $);
    return E.type !== 11 ? (i(b, J.UNEXPECTED_EMPTY_LINKED_MODIFIER, L.lastStartLoc, 0), F.value = "", s(F, N, $), {
      nextConsumeToken: E,
      node: F
    }) : (E.value == null && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, L.lastStartLoc, 0, nt(E)), F.value = E.value || "", s(F, b.currentOffset(), b.currentPosition()), {
      node: F
    });
  }
  function g(b, E) {
    const L = b.context(), N = o(7, L.offset, L.startLoc);
    return N.value = E, s(N, b.currentOffset(), b.currentPosition()), N;
  }
  function p(b) {
    const E = b.context(), L = o(6, E.offset, E.startLoc);
    let N = b.nextToken();
    if (N.type === 8) {
      const $ = v(b);
      L.modifier = $.node, N = $.nextConsumeToken || b.nextToken();
    }
    switch (N.type !== 9 && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, nt(N)), N = b.nextToken(), N.type === 2 && (N = b.nextToken()), N.type) {
      case 10:
        N.value == null && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, nt(N)), L.key = g(b, N.value || "");
        break;
      case 4:
        N.value == null && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, nt(N)), L.key = f(b, N.value || "");
        break;
      case 5:
        N.value == null && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, nt(N)), L.key = d(b, N.value || "");
        break;
      case 6:
        N.value == null && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, nt(N)), L.key = m(b, N.value || "");
        break;
      default: {
        i(b, J.UNEXPECTED_EMPTY_LINKED_KEY, E.lastStartLoc, 0);
        const $ = b.context(), F = o(7, $.offset, $.startLoc);
        return F.value = "", s(F, $.offset, $.startLoc), L.key = F, s(L, $.offset, $.startLoc), {
          nextConsumeToken: N,
          node: L
        };
      }
    }
    return s(L, b.currentOffset(), b.currentPosition()), {
      node: L
    };
  }
  function w(b) {
    const E = b.context(), L = E.currentType === 1 ? b.currentOffset() : E.offset, N = E.currentType === 1 ? E.endLoc : E.startLoc, $ = o(2, L, N);
    $.items = [];
    let F = null;
    do {
      const K = F || b.nextToken();
      switch (F = null, K.type) {
        case 0:
          K.value == null && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, nt(K)), $.items.push(a(b, K.value || ""));
          break;
        case 5:
          K.value == null && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, nt(K)), $.items.push(d(b, K.value || ""));
          break;
        case 4:
          K.value == null && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, nt(K)), $.items.push(f(b, K.value || ""));
          break;
        case 6:
          K.value == null && i(b, J.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, nt(K)), $.items.push(m(b, K.value || ""));
          break;
        case 7: {
          const U = p(b);
          $.items.push(U.node), F = U.nextConsumeToken || null;
          break;
        }
      }
    } while (E.currentType !== 13 && E.currentType !== 1);
    const I = E.currentType === 1 ? E.lastOffset : b.currentOffset(), G = E.currentType === 1 ? E.lastEndLoc : b.currentPosition();
    return s($, I, G), $;
  }
  function T(b, E, L, N) {
    const $ = b.context();
    let F = N.items.length === 0;
    const I = o(1, E, L);
    I.cases = [], I.cases.push(N);
    do {
      const G = w(b);
      F || (F = G.items.length === 0), I.cases.push(G);
    } while ($.currentType !== 13);
    return F && i(b, J.MUST_HAVE_MESSAGES_IN_PLURAL, L, 0), s(I, b.currentOffset(), b.currentPosition()), I;
  }
  function k(b) {
    const E = b.context(), { offset: L, startLoc: N } = E, $ = w(b);
    return E.currentType === 13 ? $ : T(b, L, N, $);
  }
  function P(b) {
    const E = da(b, Se({}, e)), L = E.context(), N = o(0, L.offset, L.startLoc);
    return t && N.loc && (N.loc.source = b), N.body = k(E), e.onCacheKey && (N.cacheKey = e.onCacheKey(b)), L.currentType !== 13 && i(E, J.UNEXPECTED_LEXICAL_ANALYSIS, L.lastStartLoc, 0, b[L.offset] || ""), s(N, E.currentOffset(), E.currentPosition()), N;
  }
  return { parse: P };
}
function nt(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function ha(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (s) => (n.helpers.add(s), s) };
}
function co(e, t) {
  for (let n = 0; n < e.length; n++)
    Ui(e[n], t);
}
function Ui(e, t) {
  switch (e.type) {
    case 1:
      co(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      co(e.items, t);
      break;
    case 6: {
      Ui(e.key, t), t.helper(
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
function ga(e, t = {}) {
  const n = ha(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Ui(e.body, n);
  const i = n.context();
  e.helpers = Array.from(i.helpers);
}
function _a(e) {
  const t = e.body;
  return t.type === 2 ? uo(t) : t.cases.forEach((n) => uo(n)), e;
}
function uo(e) {
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
      e.static = Bi(t);
      for (let n = 0; n < e.items.length; n++) {
        const i = e.items[n];
        (i.type === 3 || i.type === 9) && delete i.value;
      }
    }
  }
}
const va = "minifier";
function Jt(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Jt(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let i = 0; i < n.length; i++)
        Jt(n[i]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let i = 0; i < n.length; i++)
        Jt(n[i]);
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
      Jt(t.key), t.k = t.key, delete t.key, t.modifier && (Jt(t.modifier), t.m = t.modifier, delete t.modifier);
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
    default:
      if (process.env.NODE_ENV !== "production")
        throw sn(J.UNHANDLED_MINIFIER_NODE_TYPE, null, {
          domain: va,
          args: [e.type]
        });
  }
  delete e.type;
}
const ya = "parser";
function ba(e, t) {
  const { filename: n, breakLineCode: i, needIndent: o } = t, s = t.location !== !1, a = {
    filename: n,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: i,
    needIndent: o,
    indentLevel: 0
  };
  s && e.loc && (a.source = e.loc.source);
  const d = () => a;
  function f(k, P) {
    a.code += k;
  }
  function m(k, P = !0) {
    const b = P ? i : "";
    f(o ? b + "  ".repeat(k) : b);
  }
  function v(k = !0) {
    const P = ++a.indentLevel;
    k && m(P);
  }
  function g(k = !0) {
    const P = --a.indentLevel;
    k && m(P);
  }
  function p() {
    m(a.indentLevel);
  }
  return {
    context: d,
    push: f,
    indent: v,
    deindent: g,
    newline: p,
    helper: (k) => `_${k}`,
    needIndent: () => a.needIndent
  };
}
function wa(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), on(e, t.key), t.modifier ? (e.push(", "), on(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function xa(e, t) {
  const { helper: n, needIndent: i } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(i());
  const o = t.items.length;
  for (let s = 0; s < o && (on(e, t.items[s]), s !== o - 1); s++)
    e.push(", ");
  e.deindent(i()), e.push("])");
}
function Ea(e, t) {
  const { helper: n, needIndent: i } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(i());
    const o = t.cases.length;
    for (let s = 0; s < o && (on(e, t.cases[s]), s !== o - 1); s++)
      e.push(", ");
    e.deindent(i()), e.push("])");
  }
}
function Ta(e, t) {
  t.body ? on(e, t.body) : e.push("null");
}
function on(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Ta(e, t);
      break;
    case 1:
      Ea(e, t);
      break;
    case 2:
      xa(e, t);
      break;
    case 6:
      wa(e, t);
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
    default:
      if (process.env.NODE_ENV !== "production")
        throw sn(J.UNHANDLED_CODEGEN_NODE_TYPE, null, {
          domain: ya,
          args: [t.type]
        });
  }
}
const ka = (e, t = {}) => {
  const n = V(t.mode) ? t.mode : "normal", i = V(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const o = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, s = t.needIndent ? t.needIndent : n !== "arrow", a = e.helpers || [], d = ba(e, {
    filename: i,
    breakLineCode: o,
    needIndent: s
  });
  d.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), d.indent(s), a.length > 0 && (d.push(`const { ${Bi(a.map((v) => `${v}: _${v}`), ", ")} } = ctx`), d.newline()), d.push("return "), on(d, e), d.deindent(s), d.push("}"), delete e.helpers;
  const { code: f, map: m } = d.context();
  return {
    ast: e,
    code: f,
    map: m ? m.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Sa(e, t = {}) {
  const n = Se({}, t), i = !!n.jit, o = !!n.minify, s = n.optimize == null ? !0 : n.optimize, d = pa(n).parse(e);
  return i ? (s && _a(d), o && Jt(d), { ast: d, code: "" }) : (ga(d, n), ka(d, n));
}
/*!
  * core-base v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Na() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && ($t().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && ($t().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Ge(e) {
  return re(e) && qi(e) === 0 && (Ke(e, "b") || Ke(e, "body"));
}
const ur = ["b", "body"];
function Oa(e) {
  return Ot(e, ur);
}
const fr = ["c", "cases"];
function Aa(e) {
  return Ot(e, fr, []);
}
const mr = ["s", "static"];
function Ca(e) {
  return Ot(e, mr);
}
const pr = ["i", "items"];
function La(e) {
  return Ot(e, pr, []);
}
const hr = ["t", "type"];
function qi(e) {
  return Ot(e, hr);
}
const gr = ["v", "value"];
function zn(e, t) {
  const n = Ot(e, gr);
  if (n != null)
    return n;
  throw kn(t);
}
const _r = ["m", "modifier"];
function Ia(e) {
  return Ot(e, _r);
}
const vr = ["k", "key"];
function Pa(e) {
  const t = Ot(e, vr);
  if (t)
    return t;
  throw kn(
    6
    /* NodeTypes.Linked */
  );
}
function Ot(e, t, n) {
  for (let i = 0; i < t.length; i++) {
    const o = t[i];
    if (Ke(e, o) && e[o] != null)
      return e[o];
  }
  return n;
}
const yr = [
  ...ur,
  ...fr,
  ...mr,
  ...pr,
  ...vr,
  ..._r,
  ...gr,
  ...hr
];
function kn(e) {
  return new Error(`unhandled node type: ${e}`);
}
function ci(e) {
  return (n) => $a(n, e);
}
function $a(e, t) {
  const n = Oa(t);
  if (n == null)
    throw kn(
      0
      /* NodeTypes.Resource */
    );
  if (qi(n) === 1) {
    const s = Aa(n);
    return e.plural(s.reduce((a, d) => [
      ...a,
      fo(e, d)
    ], []));
  } else
    return fo(e, n);
}
function fo(e, t) {
  const n = Ca(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const i = La(t).reduce((o, s) => [...o, yi(e, s)], []);
    return e.normalize(i);
  }
}
function yi(e, t) {
  const n = qi(t);
  switch (n) {
    case 3:
      return zn(t, n);
    case 9:
      return zn(t, n);
    case 4: {
      const i = t;
      if (Ke(i, "k") && i.k)
        return e.interpolate(e.named(i.k));
      if (Ke(i, "key") && i.key)
        return e.interpolate(e.named(i.key));
      throw kn(n);
    }
    case 5: {
      const i = t;
      if (Ke(i, "i") && ke(i.i))
        return e.interpolate(e.list(i.i));
      if (Ke(i, "index") && ke(i.index))
        return e.interpolate(e.list(i.index));
      throw kn(n);
    }
    case 6: {
      const i = t, o = Ia(i), s = Pa(i);
      return e.linked(yi(e, s), o ? yi(e, o) : void 0, e.type);
    }
    case 7:
      return zn(t, n);
    case 8:
      return zn(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const Da = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function Ra(e, t) {
  t && ia(e) && Nt(Qn(Da, { source: e }));
}
const Ma = (e) => e;
let Vn = ue();
function Fa(e, t = {}) {
  let n = !1;
  const i = t.onError || ta;
  return t.onError = (o) => {
    n = !0, i(o);
  }, { ...Sa(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function Ba(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && V(e)) {
    const n = se(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    process.env.NODE_ENV !== "production" && Ra(e, n);
    const o = (t.onCacheKey || Ma)(e), s = Vn[o];
    if (s)
      return s;
    const { ast: a, detectError: d } = Fa(e, {
      ...t,
      location: process.env.NODE_ENV !== "production",
      jit: !0
    }), f = ci(a);
    return d ? f : Vn[o] = f;
  } else {
    if (process.env.NODE_ENV !== "production" && !Ge(e))
      return Nt(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), () => e;
    const n = e.cacheKey;
    if (n) {
      const i = Vn[n];
      return i || (Vn[n] = ci(e));
    } else
      return ci(e);
  }
}
let Sn = null;
function za(e) {
  Sn = e;
}
function Va(e, t, n) {
  Sn && Sn.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const Ua = /* @__PURE__ */ qa("function:translate");
function qa(e) {
  return (t) => Sn && Sn.emit(e, t);
}
const Pe = {
  INVALID_ARGUMENT: Qs,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_NON_STRING_MESSAGE: 20,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, Ha = 24;
function gt(e) {
  return sn(e, null, process.env.NODE_ENV !== "production" ? { messages: Wa } : void 0);
}
const Wa = {
  [Pe.INVALID_ARGUMENT]: "Invalid arguments",
  [Pe.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [Pe.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [Pe.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [Pe.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [Pe.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [Pe.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function Hi(e, t) {
  return t.locale != null ? mo(t.locale) : mo(e.locale);
}
let di;
function mo(e) {
  if (V(e))
    return e;
  if (pe(e)) {
    if (e.resolvedOnce && di != null)
      return di;
    if (e.constructor.name === "Function") {
      const t = e();
      if (Xs(t))
        throw gt(Pe.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return di = t;
    } else
      throw gt(Pe.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw gt(Pe.NOT_SUPPORT_LOCALE_TYPE);
}
function Ya(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Ee(t) ? t : re(t) ? Object.keys(t) : V(t) ? [t] : [n]
  ])];
}
function br(e, t, n) {
  const i = V(n) ? n : Nn, o = e;
  o.__localeChainCache || (o.__localeChainCache = /* @__PURE__ */ new Map());
  let s = o.__localeChainCache.get(i);
  if (!s) {
    s = [];
    let a = [n];
    for (; Ee(a); )
      a = po(s, a, t);
    const d = Ee(t) || !ee(t) ? t : t.default ? t.default : null;
    a = V(d) ? [d] : d, Ee(a) && po(s, a, !1), o.__localeChainCache.set(i, s);
  }
  return s;
}
function po(e, t, n) {
  let i = !0;
  for (let o = 0; o < t.length && se(i); o++) {
    const s = t[o];
    V(s) && (i = ja(e, t[o], n));
  }
  return i;
}
function ja(e, t, n) {
  let i;
  const o = t.split("-");
  do {
    const s = o.join("-");
    i = Ga(e, s, n), o.splice(-1, 1);
  } while (o.length && i === !0);
  return i;
}
function Ga(e, t, n) {
  let i = !1;
  if (!e.includes(t) && (i = !0, t)) {
    i = t[t.length - 1] !== "!";
    const o = t.replace(/!/g, "");
    e.push(o), (Ee(n) || ee(n)) && n[o] && (i = n[o]);
  }
  return i;
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
const Xa = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Ka(e) {
  return Xa.test(e);
}
function Ja(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Za(e) {
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
function Qa(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Ka(t) ? Ja(t) : "*" + t;
}
function el(e) {
  const t = [];
  let n = -1, i = 0, o = 0, s, a, d, f, m, v, g;
  const p = [];
  p[
    0
    /* Actions.APPEND */
  ] = () => {
    a === void 0 ? a = d : a += d;
  }, p[
    1
    /* Actions.PUSH */
  ] = () => {
    a !== void 0 && (t.push(a), a = void 0);
  }, p[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    p[
      0
      /* Actions.APPEND */
    ](), o++;
  }, p[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (o > 0)
      o--, i = 4, p[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (o = 0, a === void 0 || (a = Qa(a), a === !1))
        return !1;
      p[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function w() {
    const T = e[n + 1];
    if (i === 5 && T === "'" || i === 6 && T === '"')
      return n++, d = "\\" + T, p[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; i !== null; )
    if (n++, s = e[n], !(s === "\\" && w())) {
      if (f = Za(s), g = At[i], m = g[f] || g.l || 8, m === 8 || (i = m[0], m[1] !== void 0 && (v = p[m[1]], v && (d = s, v() === !1))))
        return;
      if (i === 7)
        return t;
    }
}
const ho = /* @__PURE__ */ new Map();
function tl(e, t) {
  return re(e) ? e[t] : null;
}
function nl(e, t) {
  if (!re(e))
    return null;
  let n = ho.get(t);
  if (n || (n = el(t), n && ho.set(t, n)), !n)
    return null;
  const i = n.length;
  let o = e, s = 0;
  for (; s < i; ) {
    const a = n[s];
    if (yr.includes(a) && Ge(o))
      return null;
    const d = o[a];
    if (d === void 0 || pe(o))
      return null;
    o = d, s++;
  }
  return o;
}
const ze = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7
}, il = 8, ol = {
  [ze.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
  [ze.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
  [ze.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
  [ze.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
  [ze.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
  [ze.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
  [ze.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future."
};
function Bt(e, ...t) {
  return Qn(ol[e], ...t);
}
const rl = "11.1.3", ti = -1, Nn = "en-US", jn = "", go = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function sl() {
  return {
    upper: (e, t) => t === "text" && V(e) ? e.toUpperCase() : t === "vnode" && re(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && V(e) ? e.toLowerCase() : t === "vnode" && re(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && V(e) ? go(e) : t === "vnode" && re(e) && "__v_isVNode" in e ? go(e.children) : e
  };
}
let wr;
function al(e) {
  wr = e;
}
let xr;
function ll(e) {
  xr = e;
}
let Er;
function cl(e) {
  Er = e;
}
let Tr = null;
const dl = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  Tr = e;
}, ul = /* @__NO_SIDE_EFFECTS__ */ () => Tr;
let kr = null;
const _o = (e) => {
  kr = e;
}, fl = () => kr;
let vo = 0;
function ml(e = {}) {
  const t = pe(e.onWarn) ? e.onWarn : Nt, n = V(e.version) ? e.version : rl, i = V(e.locale) || pe(e.locale) ? e.locale : Nn, o = pe(i) ? Nn : i, s = Ee(e.fallbackLocale) || ee(e.fallbackLocale) || V(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : o, a = ee(e.messages) ? e.messages : ui(o), d = ee(e.datetimeFormats) ? e.datetimeFormats : ui(o), f = ee(e.numberFormats) ? e.numberFormats : ui(o), m = Se(ue(), e.modifiers, sl()), v = e.pluralRules || ue(), g = pe(e.missing) ? e.missing : null, p = se(e.missingWarn) || nn(e.missingWarn) ? e.missingWarn : !0, w = se(e.fallbackWarn) || nn(e.fallbackWarn) ? e.fallbackWarn : !0, T = !!e.fallbackFormat, k = !!e.unresolving, P = pe(e.postTranslation) ? e.postTranslation : null, b = ee(e.processor) ? e.processor : null, E = se(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, L = !!e.escapeParameter, N = pe(e.messageCompiler) ? e.messageCompiler : wr;
  process.env.NODE_ENV !== "production" && pe(e.messageCompiler) && zi(Bt(ze.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  const $ = pe(e.messageResolver) ? e.messageResolver : xr || tl, F = pe(e.localeFallbacker) ? e.localeFallbacker : Er || Ya, I = re(e.fallbackContext) ? e.fallbackContext : void 0, G = e, K = re(G.__datetimeFormatters) ? G.__datetimeFormatters : /* @__PURE__ */ new Map(), U = re(G.__numberFormatters) ? G.__numberFormatters : /* @__PURE__ */ new Map(), ae = re(G.__meta) ? G.__meta : {};
  vo++;
  const Z = {
    version: n,
    cid: vo,
    locale: i,
    fallbackLocale: s,
    messages: a,
    modifiers: m,
    pluralRules: v,
    missing: g,
    missingWarn: p,
    fallbackWarn: w,
    fallbackFormat: T,
    unresolving: k,
    postTranslation: P,
    processor: b,
    warnHtmlMessage: E,
    escapeParameter: L,
    messageCompiler: N,
    messageResolver: $,
    localeFallbacker: F,
    fallbackContext: I,
    onWarn: t,
    __meta: ae
  };
  return Z.datetimeFormats = d, Z.numberFormats = f, Z.__datetimeFormatters = K, Z.__numberFormatters = U, process.env.NODE_ENV !== "production" && (Z.__v_emitter = G.__v_emitter != null ? G.__v_emitter : void 0), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && Va(Z, n, ae), Z;
}
const ui = (e) => ({ [e]: ue() });
function ni(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function Sr(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function Wi(e, t, n, i, o) {
  const { missing: s, onWarn: a } = e;
  if (process.env.NODE_ENV !== "production") {
    const d = e.__v_emitter;
    d && d.emit("missing", {
      locale: n,
      key: t,
      type: o,
      groupId: `${o}:${t}`
    });
  }
  if (s !== null) {
    const d = s(e, n, t, o);
    return V(d) ? d : t;
  } else
    return process.env.NODE_ENV !== "production" && Sr(i, t) && a(Bt(ze.NOT_FOUND_KEY, { key: t, locale: n })), t;
}
function _n(e, t, n) {
  const i = e;
  i.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Nr(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function pl(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let i = n + 1; i < t.length; i++)
    if (Nr(e, t[i]))
      return !0;
  return !1;
}
const yo = typeof Intl < "u", Or = {
  dateTimeFormat: yo && typeof Intl.DateTimeFormat < "u",
  numberFormat: yo && typeof Intl.NumberFormat < "u"
};
function bo(e, ...t) {
  const { datetimeFormats: n, unresolving: i, fallbackLocale: o, onWarn: s, localeFallbacker: a } = e, { __datetimeFormatters: d } = e;
  if (process.env.NODE_ENV !== "production" && !Or.dateTimeFormat)
    return s(Bt(ze.CANNOT_FORMAT_DATE)), jn;
  const [f, m, v, g] = bi(...t), p = se(v.missingWarn) ? v.missingWarn : e.missingWarn, w = se(v.fallbackWarn) ? v.fallbackWarn : e.fallbackWarn, T = !!v.part, k = Hi(e, v), P = a(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    k
  );
  if (!V(f) || f === "")
    return new Intl.DateTimeFormat(k, g).format(m);
  let b = {}, E, L = null, N = k, $ = null;
  const F = "datetime format";
  for (let K = 0; K < P.length; K++) {
    if (E = $ = P[K], process.env.NODE_ENV !== "production" && k !== E && ni(w, f) && s(Bt(ze.FALLBACK_TO_DATE_FORMAT, {
      key: f,
      target: E
    })), process.env.NODE_ENV !== "production" && k !== E) {
      const U = e.__v_emitter;
      U && U.emit("fallback", {
        type: F,
        key: f,
        from: N,
        to: $,
        groupId: `${F}:${f}`
      });
    }
    if (b = n[E] || {}, L = b[f], ee(L))
      break;
    Wi(e, f, E, p, F), N = $;
  }
  if (!ee(L) || !V(E))
    return i ? ti : f;
  let I = `${E}__${f}`;
  ei(g) || (I = `${I}__${JSON.stringify(g)}`);
  let G = d.get(I);
  return G || (G = new Intl.DateTimeFormat(E, Se({}, L, g)), d.set(I, G)), T ? G.formatToParts(m) : G.format(m);
}
const Ar = [
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
function bi(...e) {
  const [t, n, i, o] = e, s = ue();
  let a = ue(), d;
  if (V(t)) {
    const f = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!f)
      throw gt(Pe.INVALID_ISO_DATE_ARGUMENT);
    const m = f[3] ? f[3].trim().startsWith("T") ? `${f[1].trim()}${f[3].trim()}` : `${f[1].trim()}T${f[3].trim()}` : f[1].trim();
    d = new Date(m);
    try {
      d.toISOString();
    } catch {
      throw gt(Pe.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (Ys(t)) {
    if (isNaN(t.getTime()))
      throw gt(Pe.INVALID_DATE_ARGUMENT);
    d = t;
  } else if (ke(t))
    d = t;
  else
    throw gt(Pe.INVALID_ARGUMENT);
  return V(n) ? s.key = n : ee(n) && Object.keys(n).forEach((f) => {
    Ar.includes(f) ? a[f] = n[f] : s[f] = n[f];
  }), V(i) ? s.locale = i : ee(i) && (a = i), ee(o) && (a = o), [s.key || "", d, s, a];
}
function wo(e, t, n) {
  const i = e;
  for (const o in n) {
    const s = `${t}__${o}`;
    i.__datetimeFormatters.has(s) && i.__datetimeFormatters.delete(s);
  }
}
function xo(e, ...t) {
  const { numberFormats: n, unresolving: i, fallbackLocale: o, onWarn: s, localeFallbacker: a } = e, { __numberFormatters: d } = e;
  if (process.env.NODE_ENV !== "production" && !Or.numberFormat)
    return s(Bt(ze.CANNOT_FORMAT_NUMBER)), jn;
  const [f, m, v, g] = wi(...t), p = se(v.missingWarn) ? v.missingWarn : e.missingWarn, w = se(v.fallbackWarn) ? v.fallbackWarn : e.fallbackWarn, T = !!v.part, k = Hi(e, v), P = a(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    k
  );
  if (!V(f) || f === "")
    return new Intl.NumberFormat(k, g).format(m);
  let b = {}, E, L = null, N = k, $ = null;
  const F = "number format";
  for (let K = 0; K < P.length; K++) {
    if (E = $ = P[K], process.env.NODE_ENV !== "production" && k !== E && ni(w, f) && s(Bt(ze.FALLBACK_TO_NUMBER_FORMAT, {
      key: f,
      target: E
    })), process.env.NODE_ENV !== "production" && k !== E) {
      const U = e.__v_emitter;
      U && U.emit("fallback", {
        type: F,
        key: f,
        from: N,
        to: $,
        groupId: `${F}:${f}`
      });
    }
    if (b = n[E] || {}, L = b[f], ee(L))
      break;
    Wi(e, f, E, p, F), N = $;
  }
  if (!ee(L) || !V(E))
    return i ? ti : f;
  let I = `${E}__${f}`;
  ei(g) || (I = `${I}__${JSON.stringify(g)}`);
  let G = d.get(I);
  return G || (G = new Intl.NumberFormat(E, Se({}, L, g)), d.set(I, G)), T ? G.formatToParts(m) : G.format(m);
}
const Cr = [
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
function wi(...e) {
  const [t, n, i, o] = e, s = ue();
  let a = ue();
  if (!ke(t))
    throw gt(Pe.INVALID_ARGUMENT);
  const d = t;
  return V(n) ? s.key = n : ee(n) && Object.keys(n).forEach((f) => {
    Cr.includes(f) ? a[f] = n[f] : s[f] = n[f];
  }), V(i) ? s.locale = i : ee(i) && (a = i), ee(o) && (a = o), [s.key || "", d, s, a];
}
function Eo(e, t, n) {
  const i = e;
  for (const o in n) {
    const s = `${t}__${o}`;
    i.__numberFormatters.has(s) && i.__numberFormatters.delete(s);
  }
}
const hl = (e) => e, gl = (e) => "", _l = "text", vl = (e) => e.length === 0 ? "" : Bi(e), yl = Ks;
function To(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function bl(e) {
  const t = ke(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (ke(e.named.count) || ke(e.named.n)) ? ke(e.named.count) ? e.named.count : ke(e.named.n) ? e.named.n : t : t;
}
function wl(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function xl(e = {}) {
  const t = e.locale, n = bl(e), i = re(e.pluralRules) && V(t) && pe(e.pluralRules[t]) ? e.pluralRules[t] : To, o = re(e.pluralRules) && V(t) && pe(e.pluralRules[t]) ? To : void 0, s = (b) => b[i(n, b.length, o)], a = e.list || [], d = (b) => a[b], f = e.named || ue();
  ke(e.pluralIndex) && wl(n, f);
  const m = (b) => f[b];
  function v(b, E) {
    const L = pe(e.messages) ? e.messages(b, !!E) : re(e.messages) ? e.messages[b] : !1;
    return L || (e.parent ? e.parent.message(b) : gl);
  }
  const g = (b) => e.modifiers ? e.modifiers[b] : hl, p = ee(e.processor) && pe(e.processor.normalize) ? e.processor.normalize : vl, w = ee(e.processor) && pe(e.processor.interpolate) ? e.processor.interpolate : yl, T = ee(e.processor) && V(e.processor.type) ? e.processor.type : _l, P = {
    list: d,
    named: m,
    plural: s,
    linked: (b, ...E) => {
      const [L, N] = E;
      let $ = "text", F = "";
      E.length === 1 ? re(L) ? (F = L.modifier || F, $ = L.type || $) : V(L) && (F = L || F) : E.length === 2 && (V(L) && (F = L || F), V(N) && ($ = N || $));
      const I = v(b, !0)(P), G = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        $ === "vnode" && Ee(I) && F ? I[0] : I
      );
      return F ? g(F)(G, $) : G;
    },
    message: v,
    type: T,
    interpolate: w,
    normalize: p,
    values: Se(ue(), a, f)
  };
  return P;
}
const ko = () => "", Ye = (e) => pe(e);
function So(e, ...t) {
  const { fallbackFormat: n, postTranslation: i, unresolving: o, messageCompiler: s, fallbackLocale: a, messages: d } = e, [f, m] = xi(...t), v = se(m.missingWarn) ? m.missingWarn : e.missingWarn, g = se(m.fallbackWarn) ? m.fallbackWarn : e.fallbackWarn, p = se(m.escapeParameter) ? m.escapeParameter : e.escapeParameter, w = !!m.resolvedMessage, T = V(m.default) || se(m.default) ? se(m.default) ? s ? f : () => f : m.default : n ? s ? f : () => f : null, k = n || T != null && (V(T) || pe(T)), P = Hi(e, m);
  p && El(m);
  let [b, E, L] = w ? [
    f,
    P,
    d[P] || ue()
  ] : Lr(e, f, P, a, g, v), N = b, $ = f;
  if (!w && !(V(N) || Ge(N) || Ye(N)) && k && (N = T, $ = N), !w && (!(V(N) || Ge(N) || Ye(N)) || !V(E)))
    return o ? ti : f;
  if (process.env.NODE_ENV !== "production" && V(N) && e.messageCompiler == null)
    return Nt(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${f}'.`), f;
  let F = !1;
  const I = () => {
    F = !0;
  }, G = Ye(N) ? N : Ir(e, f, E, N, $, I);
  if (F)
    return N;
  const K = Nl(e, E, L, m), U = xl(K), ae = Tl(e, G, U), Z = i ? i(ae, f) : ae;
  if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    const Te = {
      timestamp: Date.now(),
      key: V(f) ? f : Ye(N) ? N.key : "",
      locale: E || (Ye(N) ? N.locale : ""),
      format: V(N) ? N : Ye(N) ? N.source : "",
      message: Z
    };
    Te.meta = Se({}, e.__meta, /* @__PURE__ */ ul() || {}), Ua(Te);
  }
  return Z;
}
function El(e) {
  Ee(e.list) ? e.list = e.list.map((t) => V(t) ? ro(t) : t) : re(e.named) && Object.keys(e.named).forEach((t) => {
    V(e.named[t]) && (e.named[t] = ro(e.named[t]));
  });
}
function Lr(e, t, n, i, o, s) {
  const { messages: a, onWarn: d, messageResolver: f, localeFallbacker: m } = e, v = m(e, i, n);
  let g = ue(), p, w = null, T = n, k = null;
  const P = "translate";
  for (let b = 0; b < v.length; b++) {
    if (p = k = v[b], process.env.NODE_ENV !== "production" && n !== p && !Nr(n, p) && ni(o, t) && d(Bt(ze.FALLBACK_TO_TRANSLATE, {
      key: t,
      target: p
    })), process.env.NODE_ENV !== "production" && n !== p) {
      const $ = e.__v_emitter;
      $ && $.emit("fallback", {
        type: P,
        key: t,
        from: T,
        to: k,
        groupId: `${P}:${t}`
      });
    }
    g = a[p] || ue();
    let E = null, L, N;
    if (process.env.NODE_ENV !== "production" && Qe && (E = window.performance.now(), L = "intlify-message-resolve-start", N = "intlify-message-resolve-end", qe && qe(L)), (w = f(g, t)) === null && (w = g[t]), process.env.NODE_ENV !== "production" && Qe) {
      const $ = window.performance.now(), F = e.__v_emitter;
      F && E && w && F.emit("message-resolve", {
        type: "message-resolve",
        key: t,
        message: w,
        time: $ - E,
        groupId: `${P}:${t}`
      }), L && N && qe && Ft && (qe(N), Ft("intlify message resolve", L, N));
    }
    if (V(w) || Ge(w) || Ye(w))
      break;
    if (!pl(p, v)) {
      const $ = Wi(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        p,
        s,
        P
      );
      $ !== t && (w = $);
    }
    T = k;
  }
  return [w, p, g];
}
function Ir(e, t, n, i, o, s) {
  const { messageCompiler: a, warnHtmlMessage: d } = e;
  if (Ye(i)) {
    const p = i;
    return p.locale = p.locale || n, p.key = p.key || t, p;
  }
  if (a == null) {
    const p = () => i;
    return p.locale = n, p.key = t, p;
  }
  let f = null, m, v;
  process.env.NODE_ENV !== "production" && Qe && (f = window.performance.now(), m = "intlify-message-compilation-start", v = "intlify-message-compilation-end", qe && qe(m));
  const g = a(i, kl(e, n, o, i, d, s));
  if (process.env.NODE_ENV !== "production" && Qe) {
    const p = window.performance.now(), w = e.__v_emitter;
    w && f && w.emit("message-compilation", {
      type: "message-compilation",
      message: i,
      time: p - f,
      groupId: `translate:${t}`
    }), m && v && qe && Ft && (qe(v), Ft("intlify message compilation", m, v));
  }
  return g.locale = n, g.key = t, g.source = i, g;
}
function Tl(e, t, n) {
  let i = null, o, s;
  process.env.NODE_ENV !== "production" && Qe && (i = window.performance.now(), o = "intlify-message-evaluation-start", s = "intlify-message-evaluation-end", qe && qe(o));
  const a = t(n);
  if (process.env.NODE_ENV !== "production" && Qe) {
    const d = window.performance.now(), f = e.__v_emitter;
    f && i && f.emit("message-evaluation", {
      type: "message-evaluation",
      value: a,
      time: d - i,
      groupId: `translate:${t.key}`
    }), o && s && qe && Ft && (qe(s), Ft("intlify message evaluation", o, s));
  }
  return a;
}
function xi(...e) {
  const [t, n, i] = e, o = ue();
  if (!V(t) && !ke(t) && !Ye(t) && !Ge(t))
    throw gt(Pe.INVALID_ARGUMENT);
  const s = ke(t) ? String(t) : (Ye(t), t);
  return ke(n) ? o.plural = n : V(n) ? o.default = n : ee(n) && !ei(n) ? o.named = n : Ee(n) && (o.list = n), ke(i) ? o.plural = i : V(i) ? o.default = i : ee(i) && Se(o, i), [s, o];
}
function kl(e, t, n, i, o, s) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: o,
    onError: (a) => {
      if (s && s(a), process.env.NODE_ENV !== "production") {
        const d = Sl(i), f = `Message compilation error: ${a.message}`, m = a.location && d && Js(d, a.location.start.offset, a.location.end.offset), v = e.__v_emitter;
        v && d && v.emit("compile-error", {
          message: d,
          error: a.message,
          start: a.location && a.location.start.offset,
          end: a.location && a.location.end.offset,
          groupId: `translate:${n}`
        }), console.error(m ? `${f}
${m}` : f);
      } else
        throw a;
    },
    onCacheKey: (a) => Hs(t, n, a)
  };
}
function Sl(e) {
  if (V(e))
    return e;
  if (e.loc && e.loc.source)
    return e.loc.source;
}
function Nl(e, t, n, i) {
  const { modifiers: o, pluralRules: s, messageResolver: a, fallbackLocale: d, fallbackWarn: f, missingWarn: m, fallbackContext: v } = e, p = {
    locale: t,
    modifiers: o,
    pluralRules: s,
    messages: (w, T) => {
      let k = a(n, w);
      if (k == null && (v || T)) {
        const [, , P] = Lr(
          v || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          w,
          t,
          d,
          f,
          m
        );
        k = a(P, w);
      }
      if (V(k) || Ge(k)) {
        let P = !1;
        const E = Ir(e, w, t, k, w, () => {
          P = !0;
        });
        return P ? ko : E;
      } else return Ye(k) ? k : ko;
    }
  };
  return e.processor && (p.processor = e.processor), i.list && (p.list = i.list), i.named && (p.named = i.named), ke(i.plural) && (p.pluralIndex = i.plural), p;
}
Na();
function Ol() {
  return Pr().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Pr() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Al = typeof Proxy == "function", Cl = "devtools-plugin:setup", Ll = "plugin:settings:set";
let Kt, Ei;
function Il() {
  var e;
  return Kt !== void 0 || (typeof window < "u" && window.performance ? (Kt = !0, Ei = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Kt = !0, Ei = globalThis.perf_hooks.performance) : Kt = !1), Kt;
}
function Pl() {
  return Il() ? Ei.now() : Date.now();
}
class $l {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const i = {};
    if (t.settings)
      for (const a in t.settings) {
        const d = t.settings[a];
        i[a] = d.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, i);
    try {
      const a = localStorage.getItem(o), d = JSON.parse(a);
      Object.assign(s, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return s;
      },
      setSettings(a) {
        try {
          localStorage.setItem(o, JSON.stringify(a));
        } catch {
        }
        s = a;
      },
      now() {
        return Pl();
      }
    }, n && n.on(Ll, (a, d) => {
      a === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, d) => this.target ? this.target.on[d] : (...f) => {
        this.onQueue.push({
          method: d,
          args: f
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...f) => (this.targetQueue.push({
        method: d,
        args: f,
        resolve: () => {
        }
      }), this.fallbacks[d](...f)) : (...f) => new Promise((m) => {
        this.targetQueue.push({
          method: d,
          args: f,
          resolve: m
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Dl(e, t) {
  const n = e, i = Pr(), o = Ol(), s = Al && n.enableEarlyProxy;
  if (o && (i.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    o.emit(Cl, e, t);
  else {
    const a = s ? new $l(n, o) : null;
    (i.__VUE_DEVTOOLS_PLUGINS__ = i.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: a
    }), a && t(a.proxiedTarget);
  }
}
/*!
  * vue-i18n v11.1.3
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Rl = "11.1.3";
function Ml() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && ($t().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && ($t().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && ($t().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && ($t().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const he = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Ha,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32,
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function Ve(e, ...t) {
  return sn(e, null, process.env.NODE_ENV !== "production" ? { messages: Fl, args: t } : void 0);
}
const Fl = {
  [he.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [he.INVALID_ARGUMENT]: "Invalid argument",
  [he.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [he.NOT_INSTALLED]: "Need to install with `app.use` function",
  [he.UNEXPECTED_ERROR]: "Unexpected error",
  [he.REQUIRED_VALUE]: "Required in value: {0}",
  [he.INVALID_VALUE]: "Invalid value",
  [he.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
  [he.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [he.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [he.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, Ti = /* @__PURE__ */ ct("__translateVNode"), ki = /* @__PURE__ */ ct("__datetimeParts"), Si = /* @__PURE__ */ ct("__numberParts"), zt = /* @__PURE__ */ ct("__enableEmitter"), On = /* @__PURE__ */ ct("__disableEmitter"), $r = ct("__setPluralRules"), Dr = /* @__PURE__ */ ct("__injectWithOption"), Ni = /* @__PURE__ */ ct("__dispose"), it = {
  FALLBACK_TO_ROOT: il,
  // 8
  NOT_FOUND_PARENT_SCOPE: 9,
  IGNORE_OBJ_FLATTEN: 10,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_LEGACY_MODE: 11,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 12
}, Bl = {
  [it.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
  [it.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
  [it.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [it.DEPRECATE_LEGACY_MODE]: `Legacy API mode has been deprecated in v11. Use Composition API mode instead.
About how to use the Composition API mode, see https://vue-i18n.intlify.dev/guide/advanced/composition.html`,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [it.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE]: "'v-t' has been deprecated in v11. Use translate APIs ('t' or '$t') instead."
};
function Dn(e, ...t) {
  return Qn(Bl[e], ...t);
}
function An(e) {
  if (!re(e) || Ge(e))
    return e;
  for (const t in e)
    if (Ke(e, t))
      if (!t.includes("."))
        re(e[t]) && An(e[t]);
      else {
        const n = t.split("."), i = n.length - 1;
        let o = e, s = !1;
        for (let a = 0; a < i; a++) {
          if (n[a] === "__proto__")
            throw new Error(`unsafe key: ${n[a]}`);
          if (n[a] in o || (o[n[a]] = ue()), !re(o[n[a]])) {
            process.env.NODE_ENV !== "production" && Nt(Dn(it.IGNORE_OBJ_FLATTEN, {
              key: n[a]
            })), s = !0;
            break;
          }
          o = o[n[a]];
        }
        if (s || (Ge(o) ? yr.includes(n[i]) || delete e[t] : (o[n[i]] = e[t], delete e[t])), !Ge(o)) {
          const a = o[n[i]];
          re(a) && An(a);
        }
      }
  return e;
}
function Yi(e, t) {
  const { messages: n, __i18n: i, messageResolver: o, flatJson: s } = t, a = ee(n) ? n : Ee(i) ? ue() : { [e]: ue() };
  if (Ee(i) && i.forEach((d) => {
    if ("locale" in d && "resource" in d) {
      const { locale: f, resource: m } = d;
      f ? (a[f] = a[f] || ue(), Hn(m, a[f])) : Hn(m, a);
    } else
      V(d) && Hn(JSON.parse(d), a);
  }), o == null && s)
    for (const d in a)
      Ke(a, d) && An(a[d]);
  return a;
}
function Rr(e) {
  return e.type;
}
function Mr(e, t, n) {
  let i = re(t.messages) ? t.messages : ue();
  "__i18nGlobal" in n && (i = Yi(e.locale.value, {
    messages: i,
    __i18n: n.__i18nGlobal
  }));
  const o = Object.keys(i);
  o.length && o.forEach((s) => {
    e.mergeLocaleMessage(s, i[s]);
  });
  {
    if (re(t.datetimeFormats)) {
      const s = Object.keys(t.datetimeFormats);
      s.length && s.forEach((a) => {
        e.mergeDateTimeFormat(a, t.datetimeFormats[a]);
      });
    }
    if (re(t.numberFormats)) {
      const s = Object.keys(t.numberFormats);
      s.length && s.forEach((a) => {
        e.mergeNumberFormat(a, t.numberFormats[a]);
      });
    }
  }
}
function No(e) {
  return M(ys, null, e, 0);
}
const Oo = "__INTLIFY_META__", Ao = () => [], zl = () => !1;
let Co = 0;
function Lo(e) {
  return (t, n, i, o) => e(n, i, tn() || void 0, o);
}
const Vl = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = tn();
  let t = null;
  return e && (t = Rr(e)[Oo]) ? { [Oo]: t } : null;
};
function ji(e = {}) {
  const { __root: t, __injectWithOption: n } = e, i = t === void 0, o = e.flatJson, s = Qe ? ye : _s;
  let a = se(e.inheritLocale) ? e.inheritLocale : !0;
  const d = s(
    // prettier-ignore
    t && a ? t.locale.value : V(e.locale) ? e.locale : Nn
  ), f = s(
    // prettier-ignore
    t && a ? t.fallbackLocale.value : V(e.fallbackLocale) || Ee(e.fallbackLocale) || ee(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : d.value
  ), m = s(Yi(d.value, e)), v = s(ee(e.datetimeFormats) ? e.datetimeFormats : { [d.value]: {} }), g = s(ee(e.numberFormats) ? e.numberFormats : { [d.value]: {} });
  let p = t ? t.missingWarn : se(e.missingWarn) || nn(e.missingWarn) ? e.missingWarn : !0, w = t ? t.fallbackWarn : se(e.fallbackWarn) || nn(e.fallbackWarn) ? e.fallbackWarn : !0, T = t ? t.fallbackRoot : se(e.fallbackRoot) ? e.fallbackRoot : !0, k = !!e.fallbackFormat, P = pe(e.missing) ? e.missing : null, b = pe(e.missing) ? Lo(e.missing) : null, E = pe(e.postTranslation) ? e.postTranslation : null, L = t ? t.warnHtmlMessage : se(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, N = !!e.escapeParameter;
  const $ = t ? t.modifiers : ee(e.modifiers) ? e.modifiers : {};
  let F = e.pluralRules || t && t.pluralRules, I;
  I = (() => {
    i && _o(null);
    const c = {
      version: Rl,
      locale: d.value,
      fallbackLocale: f.value,
      messages: m.value,
      modifiers: $,
      pluralRules: F,
      missing: b === null ? void 0 : b,
      missingWarn: p,
      fallbackWarn: w,
      fallbackFormat: k,
      unresolving: !0,
      postTranslation: E === null ? void 0 : E,
      warnHtmlMessage: L,
      escapeParameter: N,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    c.datetimeFormats = v.value, c.numberFormats = g.value, c.__datetimeFormatters = ee(I) ? I.__datetimeFormatters : void 0, c.__numberFormatters = ee(I) ? I.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (c.__v_emitter = ee(I) ? I.__v_emitter : void 0);
    const u = ml(c);
    return i && _o(u), u;
  })(), _n(I, d.value, f.value);
  function K() {
    return [
      d.value,
      f.value,
      m.value,
      v.value,
      g.value
    ];
  }
  const U = Ne({
    get: () => d.value,
    set: (c) => {
      I.locale = c, d.value = c;
    }
  }), ae = Ne({
    get: () => f.value,
    set: (c) => {
      I.fallbackLocale = c, f.value = c, _n(I, d.value, c);
    }
  }), Z = Ne(() => m.value), Te = /* @__PURE__ */ Ne(() => v.value), be = /* @__PURE__ */ Ne(() => g.value);
  function Ae() {
    return pe(E) ? E : null;
  }
  function fe(c) {
    E = c, I.postTranslation = c;
  }
  function ie() {
    return P;
  }
  function De(c) {
    c !== null && (b = Lo(c)), P = c, I.missing = b;
  }
  function Ce(c, u) {
    return c !== "translate" || !u.resolvedMessage;
  }
  const Be = (c, u, _, S, O, C) => {
    K();
    let q;
    try {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, i || (I.fallbackContext = t ? fl() : void 0), q = c(I);
    } finally {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, i || (I.fallbackContext = void 0);
    }
    if (_ !== "translate exists" && // for not `te` (e.g `t`)
    ke(q) && q === ti || _ === "translate exists" && !q) {
      const [z, j] = u();
      if (process.env.NODE_ENV !== "production" && t && V(z) && Ce(_, j) && (T && (ni(w, z) || Sr(p, z)) && Nt(Dn(it.FALLBACK_TO_ROOT, {
        key: z,
        type: _
      })), process.env.NODE_ENV !== "production")) {
        const { __v_emitter: X } = I;
        X && T && X.emit("fallback", {
          type: _,
          key: z,
          to: "global",
          groupId: `${_}:${z}`
        });
      }
      return t && T ? S(t) : O(z);
    } else {
      if (C(q))
        return q;
      throw Ve(he.UNEXPECTED_RETURN_TYPE);
    }
  };
  function Ct(...c) {
    return Be((u) => Reflect.apply(So, null, [u, ...c]), () => xi(...c), "translate", (u) => Reflect.apply(u.t, u, [...c]), (u) => u, (u) => V(u));
  }
  function ln(...c) {
    const [u, _, S] = c;
    if (S && !re(S))
      throw Ve(he.INVALID_ARGUMENT);
    return Ct(u, _, Se({ resolvedMessage: !0 }, S || {}));
  }
  function jt(...c) {
    return Be((u) => Reflect.apply(bo, null, [u, ...c]), () => bi(...c), "datetime format", (u) => Reflect.apply(u.d, u, [...c]), () => jn, (u) => V(u));
  }
  function cn(...c) {
    return Be((u) => Reflect.apply(xo, null, [u, ...c]), () => wi(...c), "number format", (u) => Reflect.apply(u.n, u, [...c]), () => jn, (u) => V(u));
  }
  function dn(c) {
    return c.map((u) => V(u) || ke(u) || se(u) ? No(String(u)) : u);
  }
  const fn = {
    normalize: dn,
    interpolate: (c) => c,
    type: "vnode"
  };
  function Gt(...c) {
    return Be((u) => {
      let _;
      const S = u;
      try {
        S.processor = fn, _ = Reflect.apply(So, null, [S, ...c]);
      } finally {
        S.processor = null;
      }
      return _;
    }, () => xi(...c), "translate", (u) => u[Ti](...c), (u) => [No(u)], (u) => Ee(u));
  }
  function mn(...c) {
    return Be((u) => Reflect.apply(xo, null, [u, ...c]), () => wi(...c), "number format", (u) => u[Si](...c), Ao, (u) => V(u) || Ee(u));
  }
  function vt(...c) {
    return Be((u) => Reflect.apply(bo, null, [u, ...c]), () => bi(...c), "datetime format", (u) => u[ki](...c), Ao, (u) => V(u) || Ee(u));
  }
  function yt(c) {
    F = c, I.pluralRules = F;
  }
  function pn(c, u) {
    return Be(() => {
      if (!c)
        return !1;
      const _ = V(u) ? u : d.value, S = dt(_), O = I.messageResolver(S, c);
      return Ge(O) || Ye(O) || V(O);
    }, () => [c], "translate exists", (_) => Reflect.apply(_.te, _, [c, u]), zl, (_) => se(_));
  }
  function Lt(c) {
    let u = null;
    const _ = br(I, f.value, d.value);
    for (let S = 0; S < _.length; S++) {
      const O = m.value[_[S]] || {}, C = I.messageResolver(O, c);
      if (C != null) {
        u = C;
        break;
      }
    }
    return u;
  }
  function xe(c) {
    const u = Lt(c);
    return u ?? (t ? t.tm(c) || {} : {});
  }
  function dt(c) {
    return m.value[c] || {};
  }
  function ut(c, u) {
    if (o) {
      const _ = { [c]: u };
      for (const S in _)
        Ke(_, S) && An(_[S]);
      u = _[c];
    }
    m.value[c] = u, I.messages = m.value;
  }
  function hn(c, u) {
    m.value[c] = m.value[c] || {};
    const _ = { [c]: u };
    if (o)
      for (const S in _)
        Ke(_, S) && An(_[S]);
    u = _[c], Hn(u, m.value[c]), I.messages = m.value;
  }
  function h(c) {
    return v.value[c] || {};
  }
  function y(c, u) {
    v.value[c] = u, I.datetimeFormats = v.value, wo(I, c, u);
  }
  function D(c, u) {
    v.value[c] = Se(v.value[c] || {}, u), I.datetimeFormats = v.value, wo(I, c, u);
  }
  function Y(c) {
    return g.value[c] || {};
  }
  function ve(c, u) {
    g.value[c] = u, I.numberFormats = g.value, Eo(I, c, u);
  }
  function r(c, u) {
    g.value[c] = Se(g.value[c] || {}, u), I.numberFormats = g.value, Eo(I, c, u);
  }
  Co++, t && Qe && (Ze(t.locale, (c) => {
    a && (d.value = c, I.locale = c, _n(I, d.value, f.value));
  }), Ze(t.fallbackLocale, (c) => {
    a && (f.value = c, I.fallbackLocale = c, _n(I, d.value, f.value));
  }));
  const l = {
    id: Co,
    locale: U,
    fallbackLocale: ae,
    get inheritLocale() {
      return a;
    },
    set inheritLocale(c) {
      a = c, c && t && (d.value = t.locale.value, f.value = t.fallbackLocale.value, _n(I, d.value, f.value));
    },
    get availableLocales() {
      return Object.keys(m.value).sort();
    },
    messages: Z,
    get modifiers() {
      return $;
    },
    get pluralRules() {
      return F || {};
    },
    get isGlobal() {
      return i;
    },
    get missingWarn() {
      return p;
    },
    set missingWarn(c) {
      p = c, I.missingWarn = p;
    },
    get fallbackWarn() {
      return w;
    },
    set fallbackWarn(c) {
      w = c, I.fallbackWarn = w;
    },
    get fallbackRoot() {
      return T;
    },
    set fallbackRoot(c) {
      T = c;
    },
    get fallbackFormat() {
      return k;
    },
    set fallbackFormat(c) {
      k = c, I.fallbackFormat = k;
    },
    get warnHtmlMessage() {
      return L;
    },
    set warnHtmlMessage(c) {
      L = c, I.warnHtmlMessage = c;
    },
    get escapeParameter() {
      return N;
    },
    set escapeParameter(c) {
      N = c, I.escapeParameter = c;
    },
    t: Ct,
    getLocaleMessage: dt,
    setLocaleMessage: ut,
    mergeLocaleMessage: hn,
    getPostTranslationHandler: Ae,
    setPostTranslationHandler: fe,
    getMissingHandler: ie,
    setMissingHandler: De,
    [$r]: yt
  };
  return l.datetimeFormats = Te, l.numberFormats = be, l.rt = ln, l.te = pn, l.tm = xe, l.d = jt, l.n = cn, l.getDateTimeFormat = h, l.setDateTimeFormat = y, l.mergeDateTimeFormat = D, l.getNumberFormat = Y, l.setNumberFormat = ve, l.mergeNumberFormat = r, l[Dr] = n, l[Ti] = Gt, l[ki] = vt, l[Si] = mn, process.env.NODE_ENV !== "production" && (l[zt] = (c) => {
    I.__v_emitter = c;
  }, l[On] = () => {
    I.__v_emitter = void 0;
  }), l;
}
const Fr = "vue-i18n: composer properties", fi = {
  "vue-devtools-plugin-vue-i18n": "Vue I18n DevTools",
  "vue-i18n-resource-inspector": "Vue I18n DevTools",
  "vue-i18n-timeline": "Vue I18n"
}, Ul = {
  "vue-i18n-resource-inspector": "Search for scopes ..."
}, ql = {
  "vue-i18n-timeline": 16764185
};
let Oi;
async function Hl(e, t) {
  return new Promise((n, i) => {
    try {
      Dl({
        id: "vue-devtools-plugin-vue-i18n",
        label: fi["vue-devtools-plugin-vue-i18n"],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [Fr],
        app: e
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (o) => {
        Oi = o, o.on.visitComponentTree(({ componentInstance: a, treeNode: d }) => {
          Wl(a, d, t);
        }), o.on.inspectComponent(({ componentInstance: a, instanceData: d }) => {
          a.vnode.el && a.vnode.el.__VUE_I18N__ && d && (t.mode === "legacy" ? a.vnode.el.__VUE_I18N__ !== t.global.__composer && Io(d, a.vnode.el.__VUE_I18N__) : Io(d, a.vnode.el.__VUE_I18N__));
        }), o.addInspector({
          id: "vue-i18n-resource-inspector",
          label: fi["vue-i18n-resource-inspector"],
          icon: "language",
          treeFilterPlaceholder: Ul["vue-i18n-resource-inspector"]
        }), o.on.getInspectorTree((a) => {
          a.app === e && a.inspectorId === "vue-i18n-resource-inspector" && Kl(a, t);
        });
        const s = /* @__PURE__ */ new Map();
        o.on.getInspectorState(async (a) => {
          if (a.app === e && a.inspectorId === "vue-i18n-resource-inspector")
            if (o.unhighlightElement(), Zl(a, t), a.nodeId === "global") {
              if (!s.has(a.app)) {
                const [d] = await o.getComponentInstances(a.app);
                s.set(a.app, d);
              }
              o.highlightElement(s.get(a.app));
            } else {
              const d = Jl(a.nodeId, t);
              d && o.highlightElement(d);
            }
        }), o.on.editInspectorState((a) => {
          a.app === e && a.inspectorId === "vue-i18n-resource-inspector" && ec(a, t);
        }), o.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: fi["vue-i18n-timeline"],
          color: ql["vue-i18n-timeline"]
        }), n(!0);
      });
    } catch (o) {
      console.error(o), i(!1);
    }
  });
}
function Br(e) {
  return e.type.name || e.type.displayName || e.type.__file || "Anonymous";
}
function Wl(e, t, n) {
  const i = n.mode === "composition" ? n.global : n.global.__composer;
  if (e && e.vnode.el && e.vnode.el.__VUE_I18N__ && e.vnode.el.__VUE_I18N__ !== i) {
    const o = {
      label: `i18n (${Br(e)} Scope)`,
      textColor: 0,
      backgroundColor: 16764185
    };
    t.tags.push(o);
  }
}
function Io(e, t) {
  const n = Fr;
  e.state.push({
    type: n,
    key: "locale",
    editable: !0,
    value: t.locale.value
  }), e.state.push({
    type: n,
    key: "availableLocales",
    editable: !1,
    value: t.availableLocales
  }), e.state.push({
    type: n,
    key: "fallbackLocale",
    editable: !0,
    value: t.fallbackLocale.value
  }), e.state.push({
    type: n,
    key: "inheritLocale",
    editable: !0,
    value: t.inheritLocale
  }), e.state.push({
    type: n,
    key: "messages",
    editable: !1,
    value: Gi(t.messages.value)
  }), e.state.push({
    type: n,
    key: "datetimeFormats",
    editable: !1,
    value: t.datetimeFormats.value
  }), e.state.push({
    type: n,
    key: "numberFormats",
    editable: !1,
    value: t.numberFormats.value
  });
}
function Gi(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    const i = e[n];
    pe(i) && "source" in i ? t[n] = Xl(i) : Ge(i) && i.loc && i.loc.source ? t[n] = i.loc.source : re(i) ? t[n] = Gi(i) : t[n] = i;
  }), t;
}
const Yl = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function jl(e) {
  return e.replace(/[<>"&]/g, Gl);
}
function Gl(e) {
  return Yl[e] || e;
}
function Xl(e) {
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${e.source ? `("${jl(e.source)}")` : "(?)"}`
    }
  };
}
function Kl(e, t) {
  e.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const n = t.mode === "composition" ? t.global : t.global.__composer;
  for (const [i, o] of t.__instances) {
    const s = t.mode === "composition" ? o : o.__composer;
    n !== s && e.rootNodes.push({
      id: s.id.toString(),
      label: `${Br(i)} Scope`
    });
  }
}
function Jl(e, t) {
  let n = null;
  if (e !== "global") {
    for (const [i, o] of t.__instances.entries())
      if (o.id.toString() === e) {
        n = i;
        break;
      }
  }
  return n;
}
function zr(e, t) {
  if (e === "global")
    return t.mode === "composition" ? t.global : t.global.__composer;
  {
    const n = Array.from(t.__instances.values()).find((i) => i.id.toString() === e);
    return n ? t.mode === "composition" ? n : n.__composer : null;
  }
}
function Zl(e, t) {
  const n = zr(e.nodeId, t);
  return n && (e.state = Ql(n)), null;
}
function Ql(e) {
  const t = {}, n = "Locale related info", i = [
    {
      type: n,
      key: "locale",
      editable: !0,
      value: e.locale.value
    },
    {
      type: n,
      key: "fallbackLocale",
      editable: !0,
      value: e.fallbackLocale.value
    },
    {
      type: n,
      key: "availableLocales",
      editable: !1,
      value: e.availableLocales
    },
    {
      type: n,
      key: "inheritLocale",
      editable: !0,
      value: e.inheritLocale
    }
  ];
  t[n] = i;
  const o = "Locale messages info", s = [
    {
      type: o,
      key: "messages",
      editable: !1,
      value: Gi(e.messages.value)
    }
  ];
  t[o] = s;
  {
    const a = "Datetime formats info", d = [
      {
        type: a,
        key: "datetimeFormats",
        editable: !1,
        value: e.datetimeFormats.value
      }
    ];
    t[a] = d;
    const f = "Datetime formats info", m = [
      {
        type: f,
        key: "numberFormats",
        editable: !1,
        value: e.numberFormats.value
      }
    ];
    t[f] = m;
  }
  return t;
}
function Cn(e, t) {
  if (Oi) {
    let n;
    t && "groupId" in t && (n = t.groupId, delete t.groupId), Oi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: e,
        groupId: n,
        time: Date.now(),
        meta: {},
        data: t || {},
        logType: e === "compile-error" ? "error" : e === "fallback" || e === "missing" ? "warning" : "default"
      }
    });
  }
}
function ec(e, t) {
  const n = zr(e.nodeId, t);
  if (n) {
    const [i] = e.path;
    i === "locale" && V(e.state.value) ? n.locale.value = e.state.value : i === "fallbackLocale" && (V(e.state.value) || Ee(e.state.value) || re(e.state.value)) ? n.fallbackLocale.value = e.state.value : i === "inheritLocale" && se(e.state.value) && (n.inheritLocale = e.state.value);
  }
}
function tc(e) {
  const t = V(e.locale) ? e.locale : Nn, n = V(e.fallbackLocale) || Ee(e.fallbackLocale) || ee(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, i = pe(e.missing) ? e.missing : void 0, o = se(e.silentTranslationWarn) || nn(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, s = se(e.silentFallbackWarn) || nn(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, a = se(e.fallbackRoot) ? e.fallbackRoot : !0, d = !!e.formatFallbackMessages, f = ee(e.modifiers) ? e.modifiers : {}, m = e.pluralizationRules, v = pe(e.postTranslation) ? e.postTranslation : void 0, g = V(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, p = !!e.escapeParameterHtml, w = se(e.sync) ? e.sync : !0;
  let T = e.messages;
  if (ee(e.sharedMessages)) {
    const $ = e.sharedMessages;
    T = Object.keys($).reduce((I, G) => {
      const K = I[G] || (I[G] = {});
      return Se(K, $[G]), I;
    }, T || {});
  }
  const { __i18n: k, __root: P, __injectWithOption: b } = e, E = e.datetimeFormats, L = e.numberFormats, N = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: T,
    flatJson: N,
    datetimeFormats: E,
    numberFormats: L,
    missing: i,
    missingWarn: o,
    fallbackWarn: s,
    fallbackRoot: a,
    fallbackFormat: d,
    modifiers: f,
    pluralRules: m,
    postTranslation: v,
    warnHtmlMessage: g,
    escapeParameter: p,
    messageResolver: e.messageResolver,
    inheritLocale: w,
    __i18n: k,
    __root: P,
    __injectWithOption: b
  };
}
function Ai(e = {}) {
  const t = ji(tc(e)), { __extender: n } = e, i = {
    // id
    id: t.id,
    // locale
    get locale() {
      return t.locale.value;
    },
    set locale(o) {
      t.locale.value = o;
    },
    // fallbackLocale
    get fallbackLocale() {
      return t.fallbackLocale.value;
    },
    set fallbackLocale(o) {
      t.fallbackLocale.value = o;
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
    set missing(o) {
      t.setMissingHandler(o);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return se(t.missingWarn) ? !t.missingWarn : t.missingWarn;
    },
    set silentTranslationWarn(o) {
      t.missingWarn = se(o) ? !o : o;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return se(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn;
    },
    set silentFallbackWarn(o) {
      t.fallbackWarn = se(o) ? !o : o;
    },
    // modifiers
    get modifiers() {
      return t.modifiers;
    },
    // formatFallbackMessages
    get formatFallbackMessages() {
      return t.fallbackFormat;
    },
    set formatFallbackMessages(o) {
      t.fallbackFormat = o;
    },
    // postTranslation
    get postTranslation() {
      return t.getPostTranslationHandler();
    },
    set postTranslation(o) {
      t.setPostTranslationHandler(o);
    },
    // sync
    get sync() {
      return t.inheritLocale;
    },
    set sync(o) {
      t.inheritLocale = o;
    },
    // warnInHtmlMessage
    get warnHtmlInMessage() {
      return t.warnHtmlMessage ? "warn" : "off";
    },
    set warnHtmlInMessage(o) {
      t.warnHtmlMessage = o !== "off";
    },
    // escapeParameterHtml
    get escapeParameterHtml() {
      return t.escapeParameter;
    },
    set escapeParameterHtml(o) {
      t.escapeParameter = o;
    },
    // pluralizationRules
    get pluralizationRules() {
      return t.pluralRules || {};
    },
    // for internal
    __composer: t,
    // t
    t(...o) {
      return Reflect.apply(t.t, t, [...o]);
    },
    // rt
    rt(...o) {
      return Reflect.apply(t.rt, t, [...o]);
    },
    // te
    te(o, s) {
      return t.te(o, s);
    },
    // tm
    tm(o) {
      return t.tm(o);
    },
    // getLocaleMessage
    getLocaleMessage(o) {
      return t.getLocaleMessage(o);
    },
    // setLocaleMessage
    setLocaleMessage(o, s) {
      t.setLocaleMessage(o, s);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(o, s) {
      t.mergeLocaleMessage(o, s);
    },
    // d
    d(...o) {
      return Reflect.apply(t.d, t, [...o]);
    },
    // getDateTimeFormat
    getDateTimeFormat(o) {
      return t.getDateTimeFormat(o);
    },
    // setDateTimeFormat
    setDateTimeFormat(o, s) {
      t.setDateTimeFormat(o, s);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(o, s) {
      t.mergeDateTimeFormat(o, s);
    },
    // n
    n(...o) {
      return Reflect.apply(t.n, t, [...o]);
    },
    // getNumberFormat
    getNumberFormat(o) {
      return t.getNumberFormat(o);
    },
    // setNumberFormat
    setNumberFormat(o, s) {
      t.setNumberFormat(o, s);
    },
    // mergeNumberFormat
    mergeNumberFormat(o, s) {
      t.mergeNumberFormat(o, s);
    }
  };
  return i.__extender = n, process.env.NODE_ENV !== "production" && (i.__enableEmitter = (o) => {
    const s = t;
    s[zt] && s[zt](o);
  }, i.__disableEmitter = () => {
    const o = t;
    o[On] && o[On]();
  }), i;
}
function nc(e, t, n) {
  return {
    beforeCreate() {
      const i = tn();
      if (!i)
        throw Ve(he.UNEXPECTED_ERROR);
      const o = this.$options;
      if (o.i18n) {
        const s = o.i18n;
        if (o.__i18n && (s.__i18n = o.__i18n), s.__root = t, this === this.$root)
          this.$i18n = Po(e, s);
        else {
          s.__injectWithOption = !0, s.__extender = n.__vueI18nExtend, this.$i18n = Ai(s);
          const a = this.$i18n;
          a.__extender && (a.__disposer = a.__extender(this.$i18n));
        }
      } else if (o.__i18n)
        if (this === this.$root)
          this.$i18n = Po(e, o);
        else {
          this.$i18n = Ai({
            __i18n: o.__i18n,
            __injectWithOption: !0,
            __extender: n.__vueI18nExtend,
            __root: t
          });
          const s = this.$i18n;
          s.__extender && (s.__disposer = s.__extender(this.$i18n));
        }
      else
        this.$i18n = e;
      o.__i18nGlobal && Mr(t, o, o), this.$t = (...s) => this.$i18n.t(...s), this.$rt = (...s) => this.$i18n.rt(...s), this.$te = (s, a) => this.$i18n.te(s, a), this.$d = (...s) => this.$i18n.d(...s), this.$n = (...s) => this.$i18n.n(...s), this.$tm = (s) => this.$i18n.tm(s), n.__setInstance(i, this.$i18n);
    },
    mounted() {
      if (process.env.NODE_ENV !== "production" && this.$el && this.$i18n) {
        const i = this.$i18n;
        this.$el.__VUE_I18N__ = i.__composer;
        const o = this.__v_emitter = Vi();
        i.__enableEmitter && i.__enableEmitter(o), o.on("*", Cn);
      }
    },
    unmounted() {
      const i = tn();
      if (!i)
        throw Ve(he.UNEXPECTED_ERROR);
      const o = this.$i18n;
      process.env.NODE_ENV !== "production" && this.$el && this.$el.__VUE_I18N__ && (this.__v_emitter && (this.__v_emitter.off("*", Cn), delete this.__v_emitter), this.$i18n && (o.__disableEmitter && o.__disableEmitter(), delete this.$el.__VUE_I18N__)), delete this.$t, delete this.$rt, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, o.__disposer && (o.__disposer(), delete o.__disposer, delete o.__extender), n.__deleteInstance(i), delete this.$i18n;
    }
  };
}
function Po(e, t) {
  e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[$r](t.pluralizationRules || e.pluralizationRules);
  const n = Yi(e.locale, {
    messages: t.messages,
    __i18n: t.__i18n
  });
  return Object.keys(n).forEach((i) => e.mergeLocaleMessage(i, n[i])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((i) => e.mergeDateTimeFormat(i, t.datetimeFormats[i])), t.numberFormats && Object.keys(t.numberFormats).forEach((i) => e.mergeNumberFormat(i, t.numberFormats[i])), e;
}
const Xi = {
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
function ic({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((i, o) => [
    ...i,
    // prettier-ignore
    ...o.type === de ? o.children : [o]
  ], []) : t.reduce((n, i) => {
    const o = e[i];
    return o && (n[i] = o()), n;
  }, ue());
}
function Vr() {
  return de;
}
const oc = /* @__PURE__ */ Ut({
  /* eslint-disable */
  name: "i18n-t",
  props: Se({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: (e) => ke(e) || !isNaN(e)
    }
  }, Xi),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: i } = t, o = e.i18n || $e({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const s = Object.keys(n).filter((g) => g !== "_"), a = ue();
      e.locale && (a.locale = e.locale), e.plural !== void 0 && (a.plural = V(e.plural) ? +e.plural : e.plural);
      const d = ic(t, s), f = o[Ti](e.keypath, d, a), m = Se(ue(), i), v = V(e.tag) || re(e.tag) ? e.tag : Vr();
      return sr(v, m, f);
    };
  }
}), $o = oc;
function rc(e) {
  return Ee(e) && !V(e[0]);
}
function Ur(e, t, n, i) {
  const { slots: o, attrs: s } = t;
  return () => {
    const a = { part: !0 };
    let d = ue();
    e.locale && (a.locale = e.locale), V(e.format) ? a.key = e.format : re(e.format) && (V(e.format.key) && (a.key = e.format.key), d = Object.keys(e.format).reduce((p, w) => n.includes(w) ? Se(ue(), p, { [w]: e.format[w] }) : p, ue()));
    const f = i(e.value, a, d);
    let m = [a.key];
    Ee(f) ? m = f.map((p, w) => {
      const T = o[p.type], k = T ? T({ [p.type]: p.value, index: w, parts: f }) : [p.value];
      return rc(k) && (k[0].key = `${p.type}-${w}`), k;
    }) : V(f) && (m = [f]);
    const v = Se(ue(), s), g = V(e.tag) || re(e.tag) ? e.tag : Vr();
    return sr(g, v, m);
  };
}
const sc = /* @__PURE__ */ Ut({
  /* eslint-disable */
  name: "i18n-n",
  props: Se({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Xi),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || $e({
      useScope: e.scope,
      __useComponent: !0
    });
    return Ur(e, t, Cr, (...i) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Si](...i)
    ));
  }
}), Do = sc;
function ac(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const i = n.__getInstance(t);
    return i != null ? i.__composer : e.global.__composer;
  }
}
function lc(e) {
  const t = (a) => {
    process.env.NODE_ENV !== "production" && zi(Dn(it.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE));
    const { instance: d, value: f } = a;
    if (!d || !d.$)
      throw Ve(he.UNEXPECTED_ERROR);
    const m = ac(e, d.$), v = Ro(f);
    return [
      Reflect.apply(m.t, m, [...Mo(v)]),
      m
    ];
  };
  return {
    created: (a, d) => {
      const [f, m] = t(d);
      Qe && e.global === m && (a.__i18nWatcher = Ze(m.locale, () => {
        d.instance && d.instance.$forceUpdate();
      })), a.__composer = m, a.textContent = f;
    },
    unmounted: (a) => {
      Qe && a.__i18nWatcher && (a.__i18nWatcher(), a.__i18nWatcher = void 0, delete a.__i18nWatcher), a.__composer && (a.__composer = void 0, delete a.__composer);
    },
    beforeUpdate: (a, { value: d }) => {
      if (a.__composer) {
        const f = a.__composer, m = Ro(d);
        a.textContent = Reflect.apply(f.t, f, [
          ...Mo(m)
        ]);
      }
    },
    getSSRProps: (a) => {
      const [d] = t(a);
      return { textContent: d };
    }
  };
}
function Ro(e) {
  if (V(e))
    return { path: e };
  if (ee(e)) {
    if (!("path" in e))
      throw Ve(he.REQUIRED_VALUE, "path");
    return e;
  } else
    throw Ve(he.INVALID_VALUE);
}
function Mo(e) {
  const { path: t, locale: n, args: i, choice: o, plural: s } = e, a = {}, d = i || {};
  return V(n) && (a.locale = n), ke(o) && (a.plural = o), ke(s) && (a.plural = s), [t, d, a];
}
function cc(e, t, ...n) {
  const i = ee(n[0]) ? n[0] : {};
  (se(i.globalInstall) ? i.globalInstall : !0) && ([$o.name, "I18nT"].forEach((s) => e.component(s, $o)), [Do.name, "I18nN"].forEach((s) => e.component(s, Do)), [Bo.name, "I18nD"].forEach((s) => e.component(s, Bo))), e.directive("t", lc(t));
}
const dc = /* @__PURE__ */ ct("global-vue-i18n");
function uc(e = {}) {
  const t = __VUE_I18N_LEGACY_API__ && se(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__;
  process.env.NODE_ENV !== "production" && t && zi(Dn(it.DEPRECATE_LEGACY_MODE));
  const n = se(e.globalInjection) ? e.globalInjection : !0, i = /* @__PURE__ */ new Map(), [o, s] = fc(e, t), a = /* @__PURE__ */ ct(process.env.NODE_ENV !== "production" ? "vue-i18n" : "");
  function d(g) {
    return i.get(g) || null;
  }
  function f(g, p) {
    i.set(g, p);
  }
  function m(g) {
    i.delete(g);
  }
  const v = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && t ? "legacy" : "composition";
    },
    // install plugin
    async install(g, ...p) {
      if (process.env.NODE_ENV !== "production" && (g.__VUE_I18N__ = v), g.__VUE_I18N_SYMBOL__ = a, g.provide(g.__VUE_I18N_SYMBOL__, v), ee(p[0])) {
        const k = p[0];
        v.__composerExtend = k.__composerExtend, v.__vueI18nExtend = k.__vueI18nExtend;
      }
      let w = null;
      !t && n && (w = bc(g, v.global)), __VUE_I18N_FULL_INSTALL__ && cc(g, v, ...p), __VUE_I18N_LEGACY_API__ && t && g.mixin(nc(s, s.__composer, v));
      const T = g.unmount;
      if (g.unmount = () => {
        w && w(), v.dispose(), T();
      }, process.env.NODE_ENV !== "production") {
        if (!await Hl(g, v))
          throw Ve(he.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
        const P = Vi();
        if (t) {
          const b = s;
          b.__enableEmitter && b.__enableEmitter(P);
        } else {
          const b = s;
          b[zt] && b[zt](P);
        }
        P.on("*", Cn);
      }
    },
    // global accessor
    get global() {
      return s;
    },
    dispose() {
      o.stop();
    },
    // @internal
    __instances: i,
    // @internal
    __getInstance: d,
    // @internal
    __setInstance: f,
    // @internal
    __deleteInstance: m
  };
  return v;
}
function $e(e = {}) {
  const t = tn();
  if (t == null)
    throw Ve(he.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw Ve(he.NOT_INSTALLED);
  const n = mc(t), i = hc(n), o = Rr(t), s = pc(e, o);
  if (s === "global")
    return Mr(i, e, o), i;
  if (s === "parent") {
    let f = gc(n, t, e.__useComponent);
    return f == null && (process.env.NODE_ENV !== "production" && Nt(Dn(it.NOT_FOUND_PARENT_SCOPE)), f = i), f;
  }
  const a = n;
  let d = a.__getInstance(t);
  if (d == null) {
    const f = Se({}, e);
    "__i18n" in o && (f.__i18n = o.__i18n), i && (f.__root = i), d = ji(f), a.__composerExtend && (d[Ni] = a.__composerExtend(d)), vc(a, t, d), a.__setInstance(t, d);
  }
  return d;
}
function fc(e, t) {
  const n = gs(), i = __VUE_I18N_LEGACY_API__ && t ? n.run(() => Ai(e)) : n.run(() => ji(e));
  if (i == null)
    throw Ve(he.UNEXPECTED_ERROR);
  return [n, i];
}
function mc(e) {
  const t = Mt(e.isCE ? dc : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw Ve(e.isCE ? he.NOT_INSTALLED_WITH_PROVIDE : he.UNEXPECTED_ERROR);
  return t;
}
function pc(e, t) {
  return ei(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function hc(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function gc(e, t, n = !1) {
  let i = null;
  const o = t.root;
  let s = _c(t, n);
  for (; s != null; ) {
    const a = e;
    if (e.mode === "composition")
      i = a.__getInstance(s);
    else if (__VUE_I18N_LEGACY_API__) {
      const d = a.__getInstance(s);
      d != null && (i = d.__composer, n && i && !i[Dr] && (i = null));
    }
    if (i != null || o === s)
      break;
    s = s.parent;
  }
  return i;
}
function _c(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function vc(e, t, n) {
  let i = null;
  rn(() => {
    if (process.env.NODE_ENV !== "production" && t.vnode.el) {
      t.vnode.el.__VUE_I18N__ = n, i = Vi();
      const o = n;
      o[zt] && o[zt](i), i.on("*", Cn);
    }
  }, t), ar(() => {
    const o = n;
    process.env.NODE_ENV !== "production" && t.vnode.el && t.vnode.el.__VUE_I18N__ && (i && i.off("*", Cn), o[On] && o[On](), delete t.vnode.el.__VUE_I18N__), e.__deleteInstance(t);
    const s = o[Ni];
    s && (s(), delete o[Ni]);
  }, t);
}
const yc = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], Fo = ["t", "rt", "d", "n", "tm", "te"];
function bc(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return yc.forEach((o) => {
    const s = Object.getOwnPropertyDescriptor(t, o);
    if (!s)
      throw Ve(he.UNEXPECTED_ERROR);
    const a = vs(s.value) ? {
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
    Object.defineProperty(n, o, a);
  }), e.config.globalProperties.$i18n = n, Fo.forEach((o) => {
    const s = Object.getOwnPropertyDescriptor(t, o);
    if (!s || !s.value)
      throw Ve(he.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${o}`, s);
  }), () => {
    delete e.config.globalProperties.$i18n, Fo.forEach((o) => {
      delete e.config.globalProperties[`$${o}`];
    });
  };
}
const wc = /* @__PURE__ */ Ut({
  /* eslint-disable */
  name: "i18n-d",
  props: Se({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Xi),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || $e({
      useScope: e.scope,
      __useComponent: !0
    });
    return Ur(e, t, Ar, (...i) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[ki](...i)
    ));
  }
}), Bo = wc;
Ml();
al(Ba);
ll(nl);
cl(br);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const e = $t();
  e.__INTLIFY__ = !0, za(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV;
const xc = {
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
}, Ec = () => ({
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
}), Gn = uc({
  legacy: !1,
  fallbackLocale: "en",
  locale: "en",
  messages: xc,
  pluralizationRules: Ec()
}), yn = "choose_accommodation", qr = "empty_cart", bn = "booking_confirmation", zo = "reservation_details", Rn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, o] of t)
    n[i] = o;
  return n;
}, Tc = {}, kc = { class: "information-block" };
function Sc(e, t) {
  return A(), R("section", kc, [
    ge(e.$slots, "default")
  ]);
}
const _t = /* @__PURE__ */ Rn(Tc, [["render", Sc]]), Nc = {}, Oc = { class: "divider" };
function Ac(e, t) {
  return A(), R("div", Oc);
}
const Fe = /* @__PURE__ */ Rn(Nc, [["render", Ac]]), Cc = { class: "header" }, Lc = { class: "content" }, Ic = { class: "amenities" }, Pc = { class: "footer" }, ii = {
  __name: "BflexSkeletonLoader",
  props: {
    isResult: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (A(), ce(_t, {
      class: ot(["accommodation-skeleton", { "accommodation-result": e.isResult }])
    }, {
      default: H(() => [
        x("div", Cc, [
          n[2] || (n[2] = x("div", { class: "thumbnail" }, null, -1)),
          x("div", Lc, [
            n[0] || (n[0] = x("div", { class: "title-skeleton" }, null, -1)),
            n[1] || (n[1] = x("div", { class: "description" }, [
              x("div", { class: "line" }),
              x("div", { class: "line" }),
              x("div", { class: "line line-short" })
            ], -1)),
            x("div", Ic, [
              (A(), R(de, null, Oe(5, (i) => x("div", {
                key: i,
                class: "amenity-item"
              })), 64))
            ])
          ])
        ]),
        M(Fe),
        x("div", Pc, [
          n[4] || (n[4] = x("div", { class: "option-header" }, [
            x("div", { class: "option-title" }),
            x("div", { class: "option-value" })
          ], -1)),
          M(Fe),
          (A(), R(de, null, Oe(2, (i) => x("div", {
            key: i,
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
function $c(e, t, n = "en-GB") {
  const i = { day: "numeric", month: "short" }, o = { day: "numeric", month: "short", year: "numeric" }, s = new Date(e), a = new Date(t), d = s.getFullYear() === a.getFullYear() && s.getMonth() === a.getMonth(), f = s.getFullYear() === a.getFullYear();
  return d ? `${s.toLocaleDateString(n, i)} — ${a.toLocaleDateString(n, i)} ${a.getFullYear()}` : f ? `${s.toLocaleDateString(n, i)} — ${a.toLocaleDateString(n, i)} ${a.getFullYear()}` : `${s.toLocaleDateString(n, o)} — ${a.toLocaleDateString(n, o)}`;
}
function Hr(e, t, n = "nights") {
  const i = new Date(e), a = (new Date(t) - i) / (1e3 * 60 * 60 * 24);
  if (n === "nights")
    return a;
  if (n === "days")
    return a + 1;
  throw new Error('Invalid unit. Use "nights" or "days".');
}
function Dc(e, t, n = 60) {
  const i = [], [o, s] = e.split(":").map(Number), [a, d] = t.split(":").map(Number), f = /* @__PURE__ */ new Date();
  f.setHours(o, s, 0, 0);
  const m = /* @__PURE__ */ new Date();
  m.setHours(a, d, 0, 0);
  const v = new Date(f);
  for (; v <= m; ) {
    const g = v.getHours().toString().padStart(2, "0"), p = v.getMinutes().toString().padStart(2, "0");
    i.push(`${g}:${p}`), v.setMinutes(v.getMinutes() + n);
  }
  return i;
}
function Rc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Wn = { exports: {} }, Mc = Wn.exports, Vo;
function Fc() {
  return Vo || (Vo = 1, function(e, t) {
    (function(n, i) {
      e.exports = i();
    })(Mc, function() {
      function n(r, l) {
        if (!(r instanceof l)) throw new TypeError("Cannot call a class as a function");
      }
      function i(r, l) {
        for (var c = 0; c < l.length; c++) {
          var u = l[c];
          u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(r, s(u.key), u);
        }
      }
      function o(r, l, c) {
        return l && i(r.prototype, l), Object.defineProperty(r, "prototype", { writable: !1 }), r;
      }
      function s(r) {
        var l = function(c, u) {
          if (typeof c != "object" || !c) return c;
          var _ = c[Symbol.toPrimitive];
          if (_ !== void 0) {
            var S = _.call(c, u);
            if (typeof S != "object") return S;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(c);
        }(r, "string");
        return typeof l == "symbol" ? l : l + "";
      }
      function a(r) {
        return (a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(l) {
          return typeof l;
        } : function(l) {
          return l && typeof Symbol == "function" && l.constructor === Symbol && l !== Symbol.prototype ? "symbol" : typeof l;
        })(r);
      }
      var d = Date.now();
      function f() {
        var r = {}, l = !0, c = 0, u = arguments.length;
        Object.prototype.toString.call(arguments[0]) === "[object Boolean]" && (l = arguments[0], c++);
        for (var _ = function(O) {
          for (var C in O) Object.prototype.hasOwnProperty.call(O, C) && (l && Object.prototype.toString.call(O[C]) === "[object Object]" ? r[C] = f(!0, r[C], O[C]) : r[C] = O[C]);
        }; c < u; c++) {
          var S = arguments[c];
          _(S);
        }
        return r;
      }
      function m(r, l) {
        if ((Z(r) || r === window || r === document) && (r = [r]), be(r) || Ae(r) || (r = [r]), De(r) != 0) {
          if (be(r) && !Ae(r)) for (var c = r.length, u = 0; u < c && l.call(r[u], r[u], u, r) !== !1; u++) ;
          else if (Ae(r)) {
            for (var _ in r) if (ie(r, _) && l.call(r[_], r[_], _, r) === !1) break;
          }
        }
      }
      function v(r) {
        var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, u = r[d] = r[d] || [], _ = { all: u, evt: null, found: null };
        return l && c && De(u) > 0 && m(u, function(S, O) {
          if (S.eventName == l && S.fn.toString() == c.toString()) return _.found = !0, _.evt = O, !1;
        }), _;
      }
      function g(r) {
        var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = l.onElement, u = l.withCallback, _ = l.avoidDuplicate, S = _ === void 0 || _, O = l.once, C = O !== void 0 && O, q = l.useCapture, z = q !== void 0 && q, j = arguments.length > 2 ? arguments[2] : void 0, X = c || [];
        function Q(te) {
          U(u) && u.call(j, te, this), C && Q.destroy();
        }
        return ae(X) && (X = document.querySelectorAll(X)), Q.destroy = function() {
          m(X, function(te) {
            var ne = v(te, r, Q);
            ne.found && ne.all.splice(ne.evt, 1), te.removeEventListener && te.removeEventListener(r, Q, z);
          });
        }, m(X, function(te) {
          var ne = v(te, r, Q);
          (te.addEventListener && S && !ne.found || !S) && (te.addEventListener(r, Q, z), ne.all.push({ eventName: r, fn: Q }));
        }), Q;
      }
      function p(r, l) {
        m(l.split(" "), function(c) {
          return r.classList.add(c);
        });
      }
      function w(r, l) {
        m(l.split(" "), function(c) {
          return r.classList.remove(c);
        });
      }
      function T(r, l) {
        return r.classList.contains(l);
      }
      function k(r, l) {
        for (; r !== document.body; ) {
          if (!(r = r.parentElement)) return !1;
          if (typeof r.matches == "function" ? r.matches(l) : r.msMatchesSelector(l)) return r;
        }
      }
      function P(r) {
        var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!r || l === "") return !1;
        if (l === "none") return U(c) && c(), !1;
        var u = F(), _ = l.split(" ");
        m(_, function(S) {
          p(r, "g" + S);
        }), g(u, { onElement: r, avoidDuplicate: !1, once: !0, withCallback: function(S, O) {
          m(_, function(C) {
            w(O, "g" + C);
          }), U(c) && c();
        } });
      }
      function b(r) {
        var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        if (l === "") return r.style.webkitTransform = "", r.style.MozTransform = "", r.style.msTransform = "", r.style.OTransform = "", r.style.transform = "", !1;
        r.style.webkitTransform = l, r.style.MozTransform = l, r.style.msTransform = l, r.style.OTransform = l, r.style.transform = l;
      }
      function E(r) {
        r.style.display = "block";
      }
      function L(r) {
        r.style.display = "none";
      }
      function N(r) {
        var l = document.createDocumentFragment(), c = document.createElement("div");
        for (c.innerHTML = r; c.firstChild; ) l.appendChild(c.firstChild);
        return l;
      }
      function $() {
        return { width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight };
      }
      function F() {
        var r, l = document.createElement("fakeelement"), c = { animation: "animationend", OAnimation: "oAnimationEnd", MozAnimation: "animationend", WebkitAnimation: "webkitAnimationEnd" };
        for (r in c) if (l.style[r] !== void 0) return c[r];
      }
      function I(r, l, c, u) {
        if (r()) l();
        else {
          var _;
          c || (c = 100);
          var S = setInterval(function() {
            r() && (clearInterval(S), _ && clearTimeout(_), l());
          }, c);
        }
      }
      function G(r, l, c) {
        if (fe(r)) console.error("Inject assets error");
        else if (U(l) && (c = l, l = !1), ae(l) && l in window) U(c) && c();
        else {
          var u;
          if (r.indexOf(".css") !== -1) {
            if ((u = document.querySelectorAll('link[href="' + r + '"]')) && u.length > 0) return void (U(c) && c());
            var _ = document.getElementsByTagName("head")[0], S = _.querySelectorAll('link[rel="stylesheet"]'), O = document.createElement("link");
            return O.rel = "stylesheet", O.type = "text/css", O.href = r, O.media = "all", S ? _.insertBefore(O, S[0]) : _.appendChild(O), void (U(c) && c());
          }
          if ((u = document.querySelectorAll('script[src="' + r + '"]')) && u.length > 0) {
            if (U(c)) {
              if (ae(l)) return I(function() {
                return window[l] !== void 0;
              }, function() {
                c();
              }), !1;
              c();
            }
          } else {
            var C = document.createElement("script");
            C.type = "text/javascript", C.src = r, C.onload = function() {
              if (U(c)) {
                if (ae(l)) return I(function() {
                  return window[l] !== void 0;
                }, function() {
                  c();
                }), !1;
                c();
              }
            }, document.body.appendChild(C);
          }
        }
      }
      function K() {
        return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
      }
      function U(r) {
        return typeof r == "function";
      }
      function ae(r) {
        return typeof r == "string";
      }
      function Z(r) {
        return !(!r || !r.nodeType || r.nodeType != 1);
      }
      function Te(r) {
        return Array.isArray(r);
      }
      function be(r) {
        return r && r.length && isFinite(r.length);
      }
      function Ae(r) {
        return a(r) === "object" && r != null && !U(r) && !Te(r);
      }
      function fe(r) {
        return r == null;
      }
      function ie(r, l) {
        return r !== null && hasOwnProperty.call(r, l);
      }
      function De(r) {
        if (Ae(r)) {
          if (r.keys) return r.keys().length;
          var l = 0;
          for (var c in r) ie(r, c) && l++;
          return l;
        }
        return r.length;
      }
      function Ce(r) {
        return !isNaN(parseFloat(r)) && isFinite(r);
      }
      function Be() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1, l = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
        if (!l.length) return !1;
        if (l.length == 1) return l[0];
        typeof r == "string" && (r = parseInt(r));
        var c = [];
        m(l, function(C) {
          c.push(C.getAttribute("data-taborder"));
        });
        var u = Math.max.apply(Math, c.map(function(C) {
          return parseInt(C);
        })), _ = r < 0 ? 1 : r + 1;
        _ > u && (_ = "1");
        var S = c.filter(function(C) {
          return C >= parseInt(_);
        }), O = S.sort()[0];
        return document.querySelector('.gbtn[data-taborder="'.concat(O, '"]'));
      }
      function Ct(r) {
        if (r.events.hasOwnProperty("keyboard")) return !1;
        r.events.keyboard = g("keydown", { onElement: window, withCallback: function(l, c) {
          var u = (l = l || window.event).keyCode;
          if (u == 9) {
            var _ = document.querySelector(".gbtn.focused");
            if (!_) {
              var S = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
              if (S == "input" || S == "textarea" || S == "button") return;
            }
            l.preventDefault();
            var O = document.querySelectorAll(".gbtn[data-taborder]");
            if (!O || O.length <= 0) return;
            if (!_) {
              var C = Be();
              return void (C && (C.focus(), p(C, "focused")));
            }
            var q = Be(_.getAttribute("data-taborder"));
            w(_, "focused"), q && (q.focus(), p(q, "focused"));
          }
          u == 39 && r.nextSlide(), u == 37 && r.prevSlide(), u == 27 && r.close();
        } });
      }
      var ln = o(function r(l, c) {
        var u = this, _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        if (n(this, r), this.img = l, this.slide = c, this.onclose = _, this.img.setZoomEvents) return !1;
        this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", function(S) {
          return u.dragStart(S);
        }, !1), this.img.addEventListener("mouseup", function(S) {
          return u.dragEnd(S);
        }, !1), this.img.addEventListener("mousemove", function(S) {
          return u.drag(S);
        }, !1), this.img.addEventListener("click", function(S) {
          return u.slide.classList.contains("dragging-nav") ? (u.zoomOut(), !1) : u.zoomedIn ? void (u.zoomedIn && !u.dragging && u.zoomOut()) : u.zoomIn();
        }, !1), this.img.setZoomEvents = !0;
      }, [{ key: "zoomIn", value: function() {
        var r = this.widowWidth();
        if (!(this.zoomedIn || r <= 768)) {
          var l = this.img;
          if (l.setAttribute("data-style", l.getAttribute("style")), l.style.maxWidth = l.naturalWidth + "px", l.style.maxHeight = l.naturalHeight + "px", l.naturalWidth > r) {
            var c = r / 2 - l.naturalWidth / 2;
            this.setTranslate(this.img.parentNode, c, 0);
          }
          this.slide.classList.add("zoomed"), this.zoomedIn = !0;
        }
      } }, { key: "zoomOut", value: function() {
        this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && typeof this.onclose == "function" && this.onclose();
      } }, { key: "dragStart", value: function(r) {
        r.preventDefault(), this.zoomedIn ? (r.type === "touchstart" ? (this.initialX = r.touches[0].clientX - this.xOffset, this.initialY = r.touches[0].clientY - this.yOffset) : (this.initialX = r.clientX - this.xOffset, this.initialY = r.clientY - this.yOffset), r.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1;
      } }, { key: "dragEnd", value: function(r) {
        var l = this;
        r.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(function() {
          l.dragging = !1, l.img.isDragging = !1, l.img.classList.remove("dragging");
        }, 100);
      } }, { key: "drag", value: function(r) {
        this.active && (r.preventDefault(), r.type === "touchmove" ? (this.currentX = r.touches[0].clientX - this.initialX, this.currentY = r.touches[0].clientY - this.initialY) : (this.currentX = r.clientX - this.initialX, this.currentY = r.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY));
      } }, { key: "onMove", value: function(r) {
        if (this.zoomedIn) {
          var l = r.clientX - this.img.naturalWidth / 2, c = r.clientY - this.img.naturalHeight / 2;
          this.setTranslate(this.img, l, c);
        }
      } }, { key: "setTranslate", value: function(r, l, c) {
        r.style.transform = "translate3d(" + l + "px, " + c + "px, 0)";
      } }, { key: "widowWidth", value: function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      } }]), jt = o(function r() {
        var l = this, c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, r);
        var u = c.dragEl, _ = c.toleranceX, S = _ === void 0 ? 40 : _, O = c.toleranceY, C = O === void 0 ? 65 : O, q = c.slide, z = q === void 0 ? null : q, j = c.instance, X = j === void 0 ? null : j;
        this.el = u, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = S, this.toleranceY = C, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = z, this.instance = X, this.el.addEventListener("mousedown", function(Q) {
          return l.dragStart(Q);
        }, !1), this.el.addEventListener("mouseup", function(Q) {
          return l.dragEnd(Q);
        }, !1), this.el.addEventListener("mousemove", function(Q) {
          return l.drag(Q);
        }, !1);
      }, [{ key: "dragStart", value: function(r) {
        if (this.slide.classList.contains("zoomed")) this.active = !1;
        else {
          r.type === "touchstart" ? (this.initialX = r.touches[0].clientX - this.xOffset, this.initialY = r.touches[0].clientY - this.yOffset) : (this.initialX = r.clientX - this.xOffset, this.initialY = r.clientY - this.yOffset);
          var l = r.target.nodeName.toLowerCase();
          r.target.classList.contains("nodrag") || k(r.target, ".nodrag") || ["input", "select", "textarea", "button", "a"].indexOf(l) !== -1 ? this.active = !1 : (r.preventDefault(), (r.target === this.el || l !== "img" && k(r.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = k(r.target, ".ginner-container")));
        }
      } }, { key: "dragEnd", value: function(r) {
        var l = this;
        r && r.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, this.doSlideChange == "right" && this.instance.prevSlide(), this.doSlideChange == "left" && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout(function() {
          l.instance.preventOutsideClick = !1, l.toleranceReached = !1, l.lastDirection = null, l.dragging = !1, l.el.isDragging = !1, l.el.classList.remove("dragging"), l.slide.classList.remove("dragging-nav"), l.dragContainer.style.transform = "", l.dragContainer.style.transition = "";
        }, 100);
      } }, { key: "drag", value: function(r) {
        if (this.active) {
          r.preventDefault(), this.slide.classList.add("dragging-nav"), r.type === "touchmove" ? (this.currentX = r.touches[0].clientX - this.initialX, this.currentY = r.touches[0].clientY - this.initialY) : (this.currentX = r.clientX - this.initialX, this.currentY = r.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
          var l = Math.abs(this.currentX), c = Math.abs(this.currentY);
          if (l > 0 && l >= Math.abs(this.currentY) && (!this.lastDirection || this.lastDirection == "x")) {
            this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
            var u = this.shouldChange();
            if (!this.instance.settings.dragAutoSnap && u && (this.doSlideChange = u), this.instance.settings.dragAutoSnap && u) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), u == "right" && this.instance.prevSlide(), void (u == "left" && this.instance.nextSlide());
          }
          if (this.toleranceY > 0 && c > 0 && c >= l && (!this.lastDirection || this.lastDirection == "y")) {
            this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
            var _ = this.shouldClose();
            return !this.instance.settings.dragAutoSnap && _ && (this.doSlideClose = !0), void (this.instance.settings.dragAutoSnap && _ && this.instance.close());
          }
        }
      } }, { key: "shouldChange", value: function() {
        var r = !1;
        if (Math.abs(this.currentX) >= this.toleranceX) {
          var l = this.currentX > 0 ? "right" : "left";
          (l == "left" && this.slide !== this.slide.parentNode.lastChild || l == "right" && this.slide !== this.slide.parentNode.firstChild) && (r = l);
        }
        return r;
      } }, { key: "shouldClose", value: function() {
        var r = !1;
        return Math.abs(this.currentY) >= this.toleranceY && (r = !0), r;
      } }, { key: "setTranslate", value: function(r, l, c) {
        var u = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
        r.style.transition = u ? "all .2s ease" : "", r.style.transform = "translate3d(".concat(l, "px, ").concat(c, "px, 0)");
      } }]);
      function cn(r, l, c, u) {
        var _ = r.querySelector(".gslide-media"), S = new Image(), O = "gSlideTitle_" + c, C = "gSlideDesc_" + c;
        S.addEventListener("load", function() {
          U(u) && u();
        }, !1), S.src = l.href, l.sizes != "" && l.srcset != "" && (S.sizes = l.sizes, S.srcset = l.srcset), S.alt = "", fe(l.alt) || l.alt === "" || (S.alt = l.alt), l.title !== "" && S.setAttribute("aria-labelledby", O), l.description !== "" && S.setAttribute("aria-describedby", C), l.hasOwnProperty("_hasCustomWidth") && l._hasCustomWidth && (S.style.width = l.width), l.hasOwnProperty("_hasCustomHeight") && l._hasCustomHeight && (S.style.height = l.height), _.insertBefore(S, _.firstChild);
      }
      function dn(r, l, c, u) {
        var _ = this, S = r.querySelector(".ginner-container"), O = "gvideo" + c, C = r.querySelector(".gslide-media"), q = this.getAllPlayers();
        p(S, "gvideo-container"), C.insertBefore(N('<div class="gvideo-wrapper"></div>'), C.firstChild);
        var z = r.querySelector(".gvideo-wrapper");
        G(this.settings.plyr.css, "Plyr");
        var j = l.href, X = l == null ? void 0 : l.videoProvider, Q = !1;
        C.style.maxWidth = l.width, G(this.settings.plyr.js, "Plyr", function() {
          if (!X && j.match(/vimeo\.com\/([0-9]*)/) && (X = "vimeo"), !X && (j.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || j.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || j.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/)) && (X = "youtube"), X === "local" || !X) {
            X = "local";
            var te = '<video id="' + O + '" ';
            te += 'style="background:#000; max-width: '.concat(l.width, ';" '), te += 'preload="metadata" ', te += 'x-webkit-airplay="allow" ', te += "playsinline ", te += "controls ", te += 'class="gvideo-local">', te += '<source src="'.concat(j, '">'), Q = N(te += "</video>");
          }
          var ne = Q || N('<div id="'.concat(O, '" data-plyr-provider="').concat(X, '" data-plyr-embed-id="').concat(j, '"></div>'));
          p(z, "".concat(X, "-video gvideo")), z.appendChild(ne), z.setAttribute("data-id", O), z.setAttribute("data-index", c);
          var we = ie(_.settings.plyr, "config") ? _.settings.plyr.config : {}, We = new Plyr("#" + O, we);
          We.on("ready", function(Ue) {
            q[O] = Ue.detail.plyr, U(u) && u();
          }), I(function() {
            return r.querySelector("iframe") && r.querySelector("iframe").dataset.ready == "true";
          }, function() {
            _.resize(r);
          }), We.on("enterfullscreen", un), We.on("exitfullscreen", un);
        });
      }
      function un(r) {
        var l = k(r.target, ".gslide-media");
        r.type === "enterfullscreen" && p(l, "fullscreen"), r.type === "exitfullscreen" && w(l, "fullscreen");
      }
      function fn(r, l, c, u) {
        var _, S = this, O = r.querySelector(".gslide-media"), C = !(!ie(l, "href") || !l.href) && l.href.split("#").pop().trim(), q = !(!ie(l, "content") || !l.content) && l.content;
        if (q && (ae(q) && (_ = N('<div class="ginlined-content">'.concat(q, "</div>"))), Z(q))) {
          q.style.display == "none" && (q.style.display = "block");
          var z = document.createElement("div");
          z.className = "ginlined-content", z.appendChild(q), _ = z;
        }
        if (C) {
          var j = document.getElementById(C);
          if (!j) return !1;
          var X = j.cloneNode(!0);
          X.style.height = l.height, X.style.maxWidth = l.width, p(X, "ginlined-content"), _ = X;
        }
        if (!_) return console.error("Unable to append inline slide content", l), !1;
        O.style.height = l.height, O.style.width = l.width, O.appendChild(_), this.events["inlineclose" + C] = g("click", { onElement: O.querySelectorAll(".gtrigger-close"), withCallback: function(Q) {
          Q.preventDefault(), S.close();
        } }), U(u) && u();
      }
      function Gt(r, l, c, u) {
        var _ = r.querySelector(".gslide-media"), S = function(O) {
          var C = O.url, q = O.allow, z = O.callback, j = O.appendTo, X = document.createElement("iframe");
          return X.className = "vimeo-video gvideo", X.src = C, X.style.width = "100%", X.style.height = "100%", q && X.setAttribute("allow", q), X.onload = function() {
            X.onload = null, p(X, "node-ready"), U(z) && z();
          }, j && j.appendChild(X), X;
        }({ url: l.href, callback: u });
        _.parentNode.style.maxWidth = l.width, _.parentNode.style.height = l.height, _.appendChild(S);
      }
      var mn = o(function r() {
        var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, r), this.defaults = { href: "", sizes: "", srcset: "", title: "", type: "", videoProvider: "", description: "", alt: "", descPosition: "bottom", effect: "", width: "", height: "", content: !1, zoomable: !0, draggable: !0 }, Ae(l) && (this.defaults = f(this.defaults, l));
      }, [{ key: "sourceType", value: function(r) {
        var l = r;
        return (r = r.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) !== null ? "image" : r.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || r.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || r.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || r.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/) || r.match(/vimeo\.com\/([0-9]*)/) || r.match(/\.(mp4|ogg|webm|mov)/) !== null ? "video" : r.match(/\.(mp3|wav|wma|aac|ogg)/) !== null ? "audio" : r.indexOf("#") > -1 && l.split("#").pop().trim() !== "" ? "inline" : r.indexOf("goajax=true") > -1 ? "ajax" : "external";
      } }, { key: "parseConfig", value: function(r, l) {
        var c = this, u = f({ descPosition: l.descPosition }, this.defaults);
        if (Ae(r) && !Z(r)) {
          ie(r, "type") || (ie(r, "content") && r.content ? r.type = "inline" : ie(r, "href") && (r.type = this.sourceType(r.href)));
          var _ = f(u, r);
          return this.setSize(_, l), _;
        }
        var S = "", O = r.getAttribute("data-glightbox"), C = r.nodeName.toLowerCase();
        if (C === "a" && (S = r.href), C === "img" && (S = r.src, u.alt = r.alt), u.href = S, m(u, function(te, ne) {
          ie(l, ne) && ne !== "width" && (u[ne] = l[ne]);
          var we = r.dataset[ne];
          fe(we) || (u[ne] = c.sanitizeValue(we));
        }), u.content && (u.type = "inline"), !u.type && S && (u.type = this.sourceType(S)), fe(O)) {
          if (!u.title && C == "a") {
            var q = r.title;
            fe(q) || q === "" || (u.title = q);
          }
          if (!u.title && C == "img") {
            var z = r.alt;
            fe(z) || z === "" || (u.title = z);
          }
        } else {
          var j = [];
          m(u, function(te, ne) {
            j.push(";\\s?" + ne);
          }), j = j.join("\\s?:|"), O.trim() !== "" && m(u, function(te, ne) {
            var we = O, We = new RegExp("s?" + ne + "s?:s?(.*?)(" + j + "s?:|$)"), Ue = we.match(We);
            if (Ue && Ue.length && Ue[1]) {
              var ft = Ue[1].trim().replace(/;\s*$/, "");
              u[ne] = c.sanitizeValue(ft);
            }
          });
        }
        if (u.description && u.description.substring(0, 1) === ".") {
          var X;
          try {
            X = document.querySelector(u.description).innerHTML;
          } catch (te) {
            if (!(te instanceof DOMException)) throw te;
          }
          X && (u.description = X);
        }
        if (!u.description) {
          var Q = r.querySelector(".glightbox-desc");
          Q && (u.description = Q.innerHTML);
        }
        return this.setSize(u, l, r), this.slideConfig = u, u;
      } }, { key: "setSize", value: function(r, l) {
        var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, u = r.type == "video" ? this.checkSize(l.videosWidth) : this.checkSize(l.width), _ = this.checkSize(l.height);
        return r.width = ie(r, "width") && r.width !== "" ? this.checkSize(r.width) : u, r.height = ie(r, "height") && r.height !== "" ? this.checkSize(r.height) : _, c && r.type == "image" && (r._hasCustomWidth = !!c.dataset.width, r._hasCustomHeight = !!c.dataset.height), r;
      } }, { key: "checkSize", value: function(r) {
        return Ce(r) ? "".concat(r, "px") : r;
      } }, { key: "sanitizeValue", value: function(r) {
        return r !== "true" && r !== "false" ? r : r === "true";
      } }]), vt = o(function r(l, c, u) {
        n(this, r), this.element = l, this.instance = c, this.index = u;
      }, [{ key: "setContent", value: function() {
        var r = this, l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (T(l, "loaded")) return !1;
        var u = this.instance.settings, _ = this.slideConfig, S = K();
        U(u.beforeSlideLoad) && u.beforeSlideLoad({ index: this.index, slide: l, player: !1 });
        var O = _.type, C = _.descPosition, q = l.querySelector(".gslide-media"), z = l.querySelector(".gslide-title"), j = l.querySelector(".gslide-desc"), X = l.querySelector(".gdesc-inner"), Q = c, te = "gSlideTitle_" + this.index, ne = "gSlideDesc_" + this.index;
        if (U(u.afterSlideLoad) && (Q = function() {
          U(c) && c(), u.afterSlideLoad({ index: r.index, slide: l, player: r.instance.getSlidePlayerInstance(r.index) });
        }), _.title == "" && _.description == "" ? X && X.parentNode.parentNode.removeChild(X.parentNode) : (z && _.title !== "" ? (z.id = te, z.innerHTML = _.title) : z.parentNode.removeChild(z), j && _.description !== "" ? (j.id = ne, S && u.moreLength > 0 ? (_.smallDescription = this.slideShortDesc(_.description, u.moreLength, u.moreText), j.innerHTML = _.smallDescription, this.descriptionEvents(j, _)) : j.innerHTML = _.description) : j.parentNode.removeChild(j), p(q.parentNode, "desc-".concat(C)), p(X.parentNode, "description-".concat(C))), p(q, "gslide-".concat(O)), p(l, "loaded"), O !== "video") {
          if (O !== "external") return O === "inline" ? (fn.apply(this.instance, [l, _, this.index, Q]), void (_.draggable && new jt({ dragEl: l.querySelector(".gslide-inline"), toleranceX: u.dragToleranceX, toleranceY: u.dragToleranceY, slide: l, instance: this.instance }))) : void (O !== "image" ? U(Q) && Q() : cn(l, _, this.index, function() {
            var we = l.querySelector("img");
            _.draggable && new jt({ dragEl: we, toleranceX: u.dragToleranceX, toleranceY: u.dragToleranceY, slide: l, instance: r.instance }), _.zoomable && we.naturalWidth > we.offsetWidth && (p(we, "zoomable"), new ln(we, l, function() {
              r.instance.resize();
            })), U(Q) && Q();
          }));
          Gt.apply(this, [l, _, this.index, Q]);
        } else dn.apply(this.instance, [l, _, this.index, Q]);
      } }, { key: "slideShortDesc", value: function(r) {
        var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], u = document.createElement("div");
        u.innerHTML = r;
        var _ = u.innerText, S = c;
        if ((r = _.trim()).length <= l) return r;
        var O = r.substr(0, l - 1);
        return S ? (u = null, O + '... <a href="#" class="desc-more">' + c + "</a>") : O;
      } }, { key: "descriptionEvents", value: function(r, l) {
        var c = this, u = r.querySelector(".desc-more");
        if (!u) return !1;
        g("click", { onElement: u, withCallback: function(_, S) {
          _.preventDefault();
          var O = document.body, C = k(S, ".gslide-desc");
          if (!C) return !1;
          C.innerHTML = l.description, p(O, "gdesc-open");
          var q = g("click", { onElement: [O, k(C, ".gslide-description")], withCallback: function(z, j) {
            z.target.nodeName.toLowerCase() !== "a" && (w(O, "gdesc-open"), p(O, "gdesc-closed"), C.innerHTML = l.smallDescription, c.descriptionEvents(C, l), setTimeout(function() {
              w(O, "gdesc-closed");
            }, 400), q.destroy());
          } });
        } });
      } }, { key: "create", value: function() {
        return N(this.instance.settings.slideHTML);
      } }, { key: "getConfig", value: function() {
        Z(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
        var r = new mn(this.instance.settings.slideExtraAttributes);
        return this.slideConfig = r.parseConfig(this.element, this.instance.settings), this.slideConfig;
      } }]);
      function yt(r) {
        return Math.sqrt(r.x * r.x + r.y * r.y);
      }
      function pn(r, l) {
        var c = function(u, _) {
          var S = yt(u) * yt(_);
          if (S === 0) return 0;
          var O = function(C, q) {
            return C.x * q.x + C.y * q.y;
          }(u, _) / S;
          return O > 1 && (O = 1), Math.acos(O);
        }(r, l);
        return function(u, _) {
          return u.x * _.y - _.x * u.y;
        }(r, l) > 0 && (c *= -1), 180 * c / Math.PI;
      }
      var Lt = o(function r(l) {
        n(this, r), this.handlers = [], this.el = l;
      }, [{ key: "add", value: function(r) {
        this.handlers.push(r);
      } }, { key: "del", value: function(r) {
        r || (this.handlers = []);
        for (var l = this.handlers.length; l >= 0; l--) this.handlers[l] === r && this.handlers.splice(l, 1);
      } }, { key: "dispatch", value: function() {
        for (var r = 0, l = this.handlers.length; r < l; r++) {
          var c = this.handlers[r];
          typeof c == "function" && c.apply(this.el, arguments);
        }
      } }]);
      function xe(r, l) {
        var c = new Lt(r);
        return c.add(l), c;
      }
      var dt = o(function r(l, c) {
        n(this, r), this.element = typeof l == "string" ? document.querySelector(l) : l, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = { x: null, y: null }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
        var u = function() {
        };
        this.rotate = xe(this.element, c.rotate || u), this.touchStart = xe(this.element, c.touchStart || u), this.multipointStart = xe(this.element, c.multipointStart || u), this.multipointEnd = xe(this.element, c.multipointEnd || u), this.pinch = xe(this.element, c.pinch || u), this.swipe = xe(this.element, c.swipe || u), this.tap = xe(this.element, c.tap || u), this.doubleTap = xe(this.element, c.doubleTap || u), this.longTap = xe(this.element, c.longTap || u), this.singleTap = xe(this.element, c.singleTap || u), this.pressMove = xe(this.element, c.pressMove || u), this.twoFingerPressMove = xe(this.element, c.twoFingerPressMove || u), this.touchMove = xe(this.element, c.touchMove || u), this.touchEnd = xe(this.element, c.touchEnd || u), this.touchCancel = xe(this.element, c.touchCancel || u), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = { x: null, y: null };
      }, [{ key: "start", value: function(r) {
        if (r.touches) if (r.target && r.target.nodeName && ["a", "button", "input"].indexOf(r.target.nodeName.toLowerCase()) >= 0) console.log("ignore drag for this touched element", r.target.nodeName.toLowerCase());
        else {
          this.now = Date.now(), this.x1 = r.touches[0].pageX, this.y1 = r.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(r, this.element), this.preTapPosition.x !== null && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
          var l = this.preV;
          if (r.touches.length > 1) {
            this._cancelLongTap(), this._cancelSingleTap();
            var c = { x: r.touches[1].pageX - this.x1, y: r.touches[1].pageY - this.y1 };
            l.x = c.x, l.y = c.y, this.pinchStartLen = yt(l), this.multipointStart.dispatch(r, this.element);
          }
          this._preventTap = !1, this.longTapTimeout = setTimeout((function() {
            this.longTap.dispatch(r, this.element), this._preventTap = !0;
          }).bind(this), 750);
        }
      } }, { key: "move", value: function(r) {
        if (r.touches) {
          var l = this.preV, c = r.touches.length, u = r.touches[0].pageX, _ = r.touches[0].pageY;
          if (this.isDoubleTap = !1, c > 1) {
            var S = r.touches[1].pageX, O = r.touches[1].pageY, C = { x: r.touches[1].pageX - u, y: r.touches[1].pageY - _ };
            l.x !== null && (this.pinchStartLen > 0 && (r.zoom = yt(C) / this.pinchStartLen, this.pinch.dispatch(r, this.element)), r.angle = pn(C, l), this.rotate.dispatch(r, this.element)), l.x = C.x, l.y = C.y, this.x2 !== null && this.sx2 !== null ? (r.deltaX = (u - this.x2 + S - this.sx2) / 2, r.deltaY = (_ - this.y2 + O - this.sy2) / 2) : (r.deltaX = 0, r.deltaY = 0), this.twoFingerPressMove.dispatch(r, this.element), this.sx2 = S, this.sy2 = O;
          } else {
            if (this.x2 !== null) {
              r.deltaX = u - this.x2, r.deltaY = _ - this.y2;
              var q = Math.abs(this.x1 - this.x2), z = Math.abs(this.y1 - this.y2);
              (q > 10 || z > 10) && (this._preventTap = !0);
            } else r.deltaX = 0, r.deltaY = 0;
            this.pressMove.dispatch(r, this.element);
          }
          this.touchMove.dispatch(r, this.element), this._cancelLongTap(), this.x2 = u, this.y2 = _, c > 1 && r.preventDefault();
        }
      } }, { key: "end", value: function(r) {
        if (r.changedTouches) {
          this._cancelLongTap();
          var l = this;
          r.touches.length < 2 && (this.multipointEnd.dispatch(r, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (r.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function() {
            l.swipe.dispatch(r, l.element);
          }, 0)) : (this.tapTimeout = setTimeout(function() {
            l._preventTap || l.tap.dispatch(r, l.element), l.isDoubleTap && (l.doubleTap.dispatch(r, l.element), l.isDoubleTap = !1);
          }, 0), l.isDoubleTap || (l.singleTapTimeout = setTimeout(function() {
            l.singleTap.dispatch(r, l.element);
          }, 250))), this.touchEnd.dispatch(r, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null;
        }
      } }, { key: "cancelAll", value: function() {
        this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout);
      } }, { key: "cancel", value: function(r) {
        this.cancelAll(), this.touchCancel.dispatch(r, this.element);
      } }, { key: "_cancelLongTap", value: function() {
        clearTimeout(this.longTapTimeout);
      } }, { key: "_cancelSingleTap", value: function() {
        clearTimeout(this.singleTapTimeout);
      } }, { key: "_swipeDirection", value: function(r, l, c, u) {
        return Math.abs(r - l) >= Math.abs(c - u) ? r - l > 0 ? "Left" : "Right" : c - u > 0 ? "Up" : "Down";
      } }, { key: "on", value: function(r, l) {
        this[r] && this[r].add(l);
      } }, { key: "off", value: function(r, l) {
        this[r] && this[r].del(l);
      } }, { key: "destroy", value: function() {
        return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
      } }]);
      function ut(r) {
        var l = function() {
          var O, C = document.createElement("fakeelement"), q = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
          for (O in q) if (C.style[O] !== void 0) return q[O];
        }(), c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, u = T(r, "gslide-media") ? r : r.querySelector(".gslide-media"), _ = k(u, ".ginner-container"), S = r.querySelector(".gslide-description");
        c > 769 && (u = _), p(u, "greset"), b(u, "translate3d(0, 0, 0)"), g(l, { onElement: u, once: !0, withCallback: function(O, C) {
          w(u, "greset");
        } }), u.style.opacity = "", S && (S.style.opacity = "");
      }
      function hn(r) {
        if (r.events.hasOwnProperty("touch")) return !1;
        var l, c, u, _ = $(), S = _.width, O = _.height, C = !1, q = null, z = null, j = null, X = !1, Q = 1, te = 1, ne = !1, we = !1, We = null, Ue = null, ft = null, Le = null, mt = 0, pt = 0, gn = !1, Xt = !1, et = {}, tt = {}, to = 0, no = 0, us = document.getElementById("glightbox-slider"), Mn = document.querySelector(".goverlay"), fs = new dt(us, { touchStart: function(me) {
          if (C = !0, (T(me.targetTouches[0].target, "ginner-container") || k(me.targetTouches[0].target, ".gslide-desc") || me.targetTouches[0].target.nodeName.toLowerCase() == "a") && (C = !1), k(me.targetTouches[0].target, ".gslide-inline") && !T(me.targetTouches[0].target.parentNode, "gslide-inline") && (C = !1), C) {
            if (tt = me.targetTouches[0], et.pageX = me.targetTouches[0].pageX, et.pageY = me.targetTouches[0].pageY, to = me.targetTouches[0].clientX, no = me.targetTouches[0].clientY, q = r.activeSlide, z = q.querySelector(".gslide-media"), u = q.querySelector(".gslide-inline"), j = null, T(z, "gslide-image") && (j = z.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (z = q.querySelector(".ginner-container")), w(Mn, "greset"), me.pageX > 20 && me.pageX < window.innerWidth - 20) return;
            me.preventDefault();
          }
        }, touchMove: function(me) {
          if (C && (tt = me.targetTouches[0], !ne && !we)) {
            if (u && u.offsetHeight > O) {
              var Re = et.pageX - tt.pageX;
              if (Math.abs(Re) <= 13) return !1;
            }
            X = !0;
            var bt, Fn = me.targetTouches[0].clientX, ms = me.targetTouches[0].clientY, ps = to - Fn, hs = no - ms;
            if (Math.abs(ps) > Math.abs(hs) ? (gn = !1, Xt = !0) : (Xt = !1, gn = !0), l = tt.pageX - et.pageX, mt = 100 * l / S, c = tt.pageY - et.pageY, pt = 100 * c / O, gn && j && (bt = 1 - Math.abs(c) / O, Mn.style.opacity = bt, r.settings.touchFollowAxis && (mt = 0)), Xt && (bt = 1 - Math.abs(l) / S, z.style.opacity = bt, r.settings.touchFollowAxis && (pt = 0)), !j) return b(z, "translate3d(".concat(mt, "%, 0, 0)"));
            b(z, "translate3d(".concat(mt, "%, ").concat(pt, "%, 0)"));
          }
        }, touchEnd: function() {
          if (C) {
            if (X = !1, we || ne) return ft = We, void (Le = Ue);
            var me = Math.abs(parseInt(pt)), Re = Math.abs(parseInt(mt));
            if (!(me > 29 && j)) return me < 29 && Re < 25 ? (p(Mn, "greset"), Mn.style.opacity = 1, ut(z)) : void 0;
            r.close();
          }
        }, multipointEnd: function() {
          setTimeout(function() {
            ne = !1;
          }, 50);
        }, multipointStart: function() {
          ne = !0, Q = te || 1;
        }, pinch: function(me) {
          if (!j || X) return !1;
          ne = !0, j.scaleX = j.scaleY = Q * me.zoom;
          var Re = Q * me.zoom;
          if (we = !0, Re <= 1) return we = !1, Re = 1, Le = null, ft = null, We = null, Ue = null, void j.setAttribute("style", "");
          Re > 4.5 && (Re = 4.5), j.style.transform = "scale3d(".concat(Re, ", ").concat(Re, ", 1)"), te = Re;
        }, pressMove: function(me) {
          if (we && !ne) {
            var Re = tt.pageX - et.pageX, bt = tt.pageY - et.pageY;
            ft && (Re += ft), Le && (bt += Le), We = Re, Ue = bt;
            var Fn = "translate3d(".concat(Re, "px, ").concat(bt, "px, 0)");
            te && (Fn += " scale3d(".concat(te, ", ").concat(te, ", 1)")), b(j, Fn);
          }
        }, swipe: function(me) {
          if (!we) if (ne) ne = !1;
          else {
            if (me.direction == "Left") {
              if (r.index == r.elements.length - 1) return ut(z);
              r.nextSlide();
            }
            if (me.direction == "Right") {
              if (r.index == 0) return ut(z);
              r.prevSlide();
            }
          }
        } });
        r.events.touch = fs;
      }
      var h = K(), y = K() !== null || document.createTouch !== void 0 || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints, D = document.getElementsByTagName("html")[0], Y = { selector: ".glightbox", elements: null, skin: "clean", theme: "clean", closeButton: !0, startAt: null, autoplayVideos: !0, autofocusVideos: !0, descPosition: "bottom", width: "900px", height: "506px", videosWidth: "960px", beforeSlideChange: null, afterSlideChange: null, beforeSlideLoad: null, afterSlideLoad: null, slideInserted: null, slideRemoved: null, slideExtraAttributes: null, onOpen: null, onClose: null, loop: !1, zoomable: !0, draggable: !0, dragAutoSnap: !1, dragToleranceX: 40, dragToleranceY: 65, preload: !0, oneSlidePerOpen: !1, touchNavigation: !0, touchFollowAxis: !0, keyboardNavigation: !0, closeOnOutsideClick: !0, plugins: !1, plyr: { css: "https://cdn.plyr.io/3.6.12/plyr.css", js: "https://cdn.plyr.io/3.6.12/plyr.js", config: { ratio: "16:9", fullscreen: { enabled: !0, iosNative: !0 }, youtube: { noCookie: !0, rel: 0, showinfo: 0, iv_load_policy: 3 }, vimeo: { byline: !1, portrait: !1, title: !1, transparent: !1 } } }, openEffect: "zoom", closeEffect: "zoom", slideEffect: "slide", moreText: "See more", moreLength: 60, cssEfects: { fade: { in: "fadeIn", out: "fadeOut" }, zoom: { in: "zoomIn", out: "zoomOut" }, slide: { in: "slideInRight", out: "slideOutLeft" }, slideBack: { in: "slideInLeft", out: "slideOutRight" }, none: { in: "none", out: "none" } }, svg: { close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>', next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>', prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>' }, slideHTML: `<div class="gslide">
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
</div>` }, ve = o(function r() {
        var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        n(this, r), this.customOptions = l, this.settings = f(Y, l), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1;
      }, [{ key: "init", value: function() {
        var r = this, l = this.getSelector();
        l && (this.baseEvents = g("click", { onElement: l, withCallback: function(c, u) {
          c.preventDefault(), r.open(u);
        } })), this.elements = this.getElements();
      } }, { key: "open", value: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (this.elements.length === 0) return !1;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var c = Ce(l) ? l : this.settings.startAt;
        if (Z(r)) {
          var u = r.getAttribute("data-gallery");
          u && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, u)), fe(c) && (c = this.getElementIndex(r)) < 0 && (c = 0);
        }
        Ce(c) || (c = 0), this.build(), P(this.overlay, this.settings.openEffect === "none" ? "none" : this.settings.cssEfects.fade.in);
        var _ = document.body, S = window.innerWidth - document.documentElement.clientWidth;
        if (S > 0) {
          var O = document.createElement("style");
          O.type = "text/css", O.className = "gcss-styles", O.innerText = ".gscrollbar-fixer {margin-right: ".concat(S, "px}"), document.head.appendChild(O), p(_, "gscrollbar-fixer");
        }
        p(_, "glightbox-open"), p(D, "glightbox-open"), h && (p(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(c, !0), this.elements.length === 1 ? (p(this.prevButton, "glightbox-button-hidden"), p(this.nextButton, "glightbox-button-hidden")) : (w(this.prevButton, "glightbox-button-hidden"), w(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), U(this.settings.onOpen) && this.settings.onOpen(), y && this.settings.touchNavigation && hn(this), this.settings.keyboardNavigation && Ct(this);
      } }, { key: "openAt", value: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        this.open(null, r);
      } }, { key: "showSlide", value: function() {
        var r = this, l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, c = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        E(this.loader), this.index = parseInt(l);
        var u = this.slidesContainer.querySelector(".current");
        u && w(u, "current"), this.slideAnimateOut();
        var _ = this.slidesContainer.querySelectorAll(".gslide")[l];
        if (T(_, "loaded")) this.slideAnimateIn(_, c), L(this.loader);
        else {
          E(this.loader);
          var S = this.elements[l], O = { index: this.index, slide: _, slideNode: _, slideConfig: S.slideConfig, slideIndex: this.index, trigger: S.node, player: null };
          this.trigger("slide_before_load", O), S.instance.setContent(_, function() {
            L(r.loader), r.resize(), r.slideAnimateIn(_, c), r.trigger("slide_after_load", O);
          });
        }
        this.slideDescription = _.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && T(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(l + 1), this.preloadSlide(l - 1)), this.updateNavigationClasses(), this.activeSlide = _;
      } }, { key: "preloadSlide", value: function(r) {
        var l = this;
        if (r < 0 || r > this.elements.length - 1 || fe(this.elements[r])) return !1;
        var c = this.slidesContainer.querySelectorAll(".gslide")[r];
        if (T(c, "loaded")) return !1;
        var u = this.elements[r], _ = u.type, S = { index: r, slide: c, slideNode: c, slideConfig: u.slideConfig, slideIndex: r, trigger: u.node, player: null };
        this.trigger("slide_before_load", S), _ === "video" || _ === "external" ? setTimeout(function() {
          u.instance.setContent(c, function() {
            l.trigger("slide_after_load", S);
          });
        }, 200) : u.instance.setContent(c, function() {
          l.trigger("slide_after_load", S);
        });
      } }, { key: "prevSlide", value: function() {
        this.goToSlide(this.index - 1);
      } }, { key: "nextSlide", value: function() {
        this.goToSlide(this.index + 1);
      } }, { key: "goToSlide", value: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
        if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (r < 0 || r > this.elements.length - 1)) return !1;
        r < 0 ? r = this.elements.length - 1 : r >= this.elements.length && (r = 0), this.showSlide(r);
      } }, { key: "insertSlide", value: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
        l < 0 && (l = this.elements.length);
        var c = new vt(r, this, l), u = c.getConfig(), _ = f({}, u), S = c.create(), O = this.elements.length - 1;
        _.index = l, _.node = !1, _.instance = c, _.slideConfig = u, this.elements.splice(l, 0, _);
        var C = null, q = null;
        if (this.slidesContainer) {
          if (l > O) this.slidesContainer.appendChild(S);
          else {
            var z = this.slidesContainer.querySelectorAll(".gslide")[l];
            this.slidesContainer.insertBefore(S, z);
          }
          (this.settings.preload && this.index == 0 && l == 0 || this.index - 1 == l || this.index + 1 == l) && this.preloadSlide(l), this.index === 0 && l === 0 && (this.index = 1), this.updateNavigationClasses(), C = this.slidesContainer.querySelectorAll(".gslide")[l], q = this.getSlidePlayerInstance(l), _.slideNode = C;
        }
        this.trigger("slide_inserted", { index: l, slide: C, slideNode: C, slideConfig: u, slideIndex: l, trigger: null, player: q }), U(this.settings.slideInserted) && this.settings.slideInserted({ index: l, slide: C, player: q });
      } }, { key: "removeSlide", value: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
        if (r < 0 || r > this.elements.length - 1) return !1;
        var l = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[r];
        l && (this.getActiveSlideIndex() == r && (r == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), l.parentNode.removeChild(l)), this.elements.splice(r, 1), this.trigger("slide_removed", r), U(this.settings.slideRemoved) && this.settings.slideRemoved(r);
      } }, { key: "slideAnimateIn", value: function(r, l) {
        var c = this, u = r.querySelector(".gslide-media"), _ = r.querySelector(".gslide-description"), S = { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlide, slideConfig: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, O = { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideConfig: this.elements[this.index].slideConfig, slideIndex: this.index, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) };
        if (u.offsetWidth > 0 && _ && (L(_), _.style.display = ""), w(r, this.effectsClasses), l) P(r, this.settings.cssEfects[this.settings.openEffect].in, function() {
          c.settings.autoplayVideos && c.slidePlayerPlay(r), c.trigger("slide_changed", { prev: S, current: O }), U(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [S, O]);
        });
        else {
          var C = this.settings.slideEffect, q = C !== "none" ? this.settings.cssEfects[C].in : C;
          this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (q = this.settings.cssEfects.slideBack.in), P(r, q, function() {
            c.settings.autoplayVideos && c.slidePlayerPlay(r), c.trigger("slide_changed", { prev: S, current: O }), U(c.settings.afterSlideChange) && c.settings.afterSlideChange.apply(c, [S, O]);
          });
        }
        setTimeout(function() {
          c.resize(r);
        }, 100), p(r, "current");
      } }, { key: "slideAnimateOut", value: function() {
        if (!this.prevActiveSlide) return !1;
        var r = this.prevActiveSlide;
        w(r, this.effectsClasses), p(r, "prev");
        var l = this.settings.slideEffect, c = l !== "none" ? this.settings.cssEfects[l].out : l;
        this.slidePlayerPause(r), this.trigger("slide_before_change", { prev: { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlideIndex, slideConfig: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: fe(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, current: { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideIndex: this.index, slideConfig: this.elements[this.index].slideConfig, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) } }), U(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{ index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, { index: this.index, slide: this.activeSlide, player: this.getSlidePlayerInstance(this.index) }]), this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (c = this.settings.cssEfects.slideBack.out), P(r, c, function() {
          var u = r.querySelector(".ginner-container"), _ = r.querySelector(".gslide-media"), S = r.querySelector(".gslide-description");
          u.style.transform = "", _.style.transform = "", w(_, "greset"), _.style.opacity = "", S && (S.style.opacity = ""), w(r, "prev");
        });
      } }, { key: "getAllPlayers", value: function() {
        return this.videoPlayers;
      } }, { key: "getSlidePlayerInstance", value: function(r) {
        var l = "gvideo" + r, c = this.getAllPlayers();
        return !(!ie(c, l) || !c[l]) && c[l];
      } }, { key: "stopSlideVideo", value: function(r) {
        if (Z(r)) {
          var l = r.querySelector(".gvideo-wrapper");
          l && (r = l.getAttribute("data-index"));
        }
        console.log("stopSlideVideo is deprecated, use slidePlayerPause");
        var c = this.getSlidePlayerInstance(r);
        c && c.playing && c.pause();
      } }, { key: "slidePlayerPause", value: function(r) {
        if (Z(r)) {
          var l = r.querySelector(".gvideo-wrapper");
          l && (r = l.getAttribute("data-index"));
        }
        var c = this.getSlidePlayerInstance(r);
        c && c.playing && c.pause();
      } }, { key: "playSlideVideo", value: function(r) {
        if (Z(r)) {
          var l = r.querySelector(".gvideo-wrapper");
          l && (r = l.getAttribute("data-index"));
        }
        console.log("playSlideVideo is deprecated, use slidePlayerPlay");
        var c = this.getSlidePlayerInstance(r);
        c && !c.playing && c.play();
      } }, { key: "slidePlayerPlay", value: function(r) {
        var l;
        if (!h || (l = this.settings.plyr.config) !== null && l !== void 0 && l.muted) {
          if (Z(r)) {
            var c = r.querySelector(".gvideo-wrapper");
            c && (r = c.getAttribute("data-index"));
          }
          var u = this.getSlidePlayerInstance(r);
          u && !u.playing && (u.play(), this.settings.autofocusVideos && u.elements.container.focus());
        }
      } }, { key: "setElements", value: function(r) {
        var l = this;
        this.settings.elements = !1;
        var c = [];
        r && r.length && m(r, function(u, _) {
          var S = new vt(u, l, _), O = S.getConfig(), C = f({}, O);
          C.slideConfig = O, C.instance = S, C.index = _, c.push(C);
        }), this.elements = c, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (m(this.elements, function() {
          var u = N(l.settings.slideHTML);
          l.slidesContainer.appendChild(u);
        }), this.showSlide(0, !0)));
      } }, { key: "getElementIndex", value: function(r) {
        var l = !1;
        return m(this.elements, function(c, u) {
          if (ie(c, "node") && c.node == r) return l = u, !0;
        }), l;
      } }, { key: "getElements", value: function() {
        var r = this, l = [];
        this.elements = this.elements ? this.elements : [], !fe(this.settings.elements) && Te(this.settings.elements) && this.settings.elements.length && m(this.settings.elements, function(u, _) {
          var S = new vt(u, r, _), O = S.getConfig(), C = f({}, O);
          C.node = !1, C.index = _, C.instance = S, C.slideConfig = O, l.push(C);
        });
        var c = !1;
        return this.getSelector() && (c = document.querySelectorAll(this.getSelector())), c && m(c, function(u, _) {
          var S = new vt(u, r, _), O = S.getConfig(), C = f({}, O);
          C.node = u, C.index = _, C.instance = S, C.slideConfig = O, C.gallery = u.getAttribute("data-gallery"), l.push(C);
        }), l;
      } }, { key: "getGalleryElements", value: function(r, l) {
        return r.filter(function(c) {
          return c.gallery == l;
        });
      } }, { key: "getSelector", value: function() {
        return !this.settings.elements && (this.settings.selector && this.settings.selector.substring(0, 5) == "data-" ? "*[".concat(this.settings.selector, "]") : this.settings.selector);
      } }, { key: "getActiveSlide", value: function() {
        return this.slidesContainer.querySelectorAll(".gslide")[this.index];
      } }, { key: "getActiveSlideIndex", value: function() {
        return this.index;
      } }, { key: "getAnimationClasses", value: function() {
        var r = [];
        for (var l in this.settings.cssEfects) if (this.settings.cssEfects.hasOwnProperty(l)) {
          var c = this.settings.cssEfects[l];
          r.push("g".concat(c.in)), r.push("g".concat(c.out));
        }
        return r.join(" ");
      } }, { key: "build", value: function() {
        var r = this;
        if (this.built) return !1;
        var l = document.body.childNodes, c = [];
        m(l, function(z) {
          z.parentNode == document.body && z.nodeName.charAt(0) !== "#" && z.hasAttribute && !z.hasAttribute("aria-hidden") && (c.push(z), z.setAttribute("aria-hidden", "true"));
        });
        var u = ie(this.settings.svg, "next") ? this.settings.svg.next : "", _ = ie(this.settings.svg, "prev") ? this.settings.svg.prev : "", S = ie(this.settings.svg, "close") ? this.settings.svg.close : "", O = this.settings.lightboxHTML;
        O = N(O = (O = (O = O.replace(/{nextSVG}/g, u)).replace(/{prevSVG}/g, _)).replace(/{closeSVG}/g, S)), document.body.appendChild(O);
        var C = document.getElementById("glightbox-body");
        this.modal = C;
        var q = C.querySelector(".gclose");
        this.prevButton = C.querySelector(".gprev"), this.nextButton = C.querySelector(".gnext"), this.overlay = C.querySelector(".goverlay"), this.loader = C.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = c, this.events = {}, p(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && q && (this.events.close = g("click", { onElement: q, withCallback: function(z, j) {
          z.preventDefault(), r.close();
        } })), q && !this.settings.closeButton && q.parentNode.removeChild(q), this.nextButton && (this.events.next = g("click", { onElement: this.nextButton, withCallback: function(z, j) {
          z.preventDefault(), r.nextSlide();
        } })), this.prevButton && (this.events.prev = g("click", { onElement: this.prevButton, withCallback: function(z, j) {
          z.preventDefault(), r.prevSlide();
        } })), this.settings.closeOnOutsideClick && (this.events.outClose = g("click", { onElement: C, withCallback: function(z, j) {
          r.preventOutsideClick || T(document.body, "glightbox-mobile") || k(z.target, ".ginner-container") || k(z.target, ".gbtn") || T(z.target, "gnext") || T(z.target, "gprev") || r.close();
        } })), m(this.elements, function(z, j) {
          r.slidesContainer.appendChild(z.instance.create()), z.slideNode = r.slidesContainer.querySelectorAll(".gslide")[j];
        }), y && p(document.body, "glightbox-touch"), this.events.resize = g("resize", { onElement: window, withCallback: function() {
          r.resize();
        } }), this.built = !0;
      } }, { key: "resize", value: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        if ((r = r || this.activeSlide) && !T(r, "zoomed")) {
          var l = $(), c = r.querySelector(".gvideo-wrapper"), u = r.querySelector(".gslide-image"), _ = this.slideDescription, S = l.width, O = l.height;
          if (S <= 768 ? p(document.body, "glightbox-mobile") : w(document.body, "glightbox-mobile"), c || u) {
            var C = !1;
            if (_ && (T(_, "description-bottom") || T(_, "description-top")) && !T(_, "gabsolute") && (C = !0), u) {
              if (S <= 768) u.querySelector("img");
              else if (C) {
                var q, z, j = _.offsetHeight, X = u.querySelector("img"), Q = (q = this.elements[this.index]) === null || q === void 0 ? void 0 : q.node, te = "100vh";
                Q && (te = (z = Q.getAttribute("data-height")) !== null && z !== void 0 ? z : te), X.setAttribute("style", "max-height: calc(".concat(te, " - ").concat(j, "px)")), _.setAttribute("style", "max-width: ".concat(X.offsetWidth, "px;"));
              }
            }
            if (c) {
              var ne = ie(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
              if (!ne) {
                var we = c.clientWidth, We = c.clientHeight, Ue = we / We;
                ne = "".concat(we / Ue, ":").concat(We / Ue);
              }
              var ft = ne.split(":"), Le = this.settings.videosWidth, mt = this.settings.videosWidth, pt = (mt = Ce(Le) || Le.indexOf("px") !== -1 ? parseInt(Le) : Le.indexOf("vw") !== -1 ? S * parseInt(Le) / 100 : Le.indexOf("vh") !== -1 ? O * parseInt(Le) / 100 : Le.indexOf("%") !== -1 ? S * parseInt(Le) / 100 : parseInt(c.clientWidth)) / (parseInt(ft[0]) / parseInt(ft[1]));
              if (pt = Math.floor(pt), C && (O -= _.offsetHeight), mt > S || pt > O || O < pt && S > mt) {
                var gn = c.offsetWidth, Xt = c.offsetHeight, et = O / Xt, tt = { width: gn * et, height: Xt * et };
                c.parentNode.setAttribute("style", "max-width: ".concat(tt.width, "px")), C && _.setAttribute("style", "max-width: ".concat(tt.width, "px;"));
              } else c.parentNode.style.maxWidth = "".concat(Le), C && _.setAttribute("style", "max-width: ".concat(Le, ";"));
            }
          }
        }
      } }, { key: "reload", value: function() {
        this.init();
      } }, { key: "updateNavigationClasses", value: function() {
        var r = this.loop();
        w(this.nextButton, "disabled"), w(this.prevButton, "disabled"), this.index == 0 && this.elements.length - 1 == 0 ? (p(this.prevButton, "disabled"), p(this.nextButton, "disabled")) : this.index !== 0 || r ? this.index !== this.elements.length - 1 || r || p(this.nextButton, "disabled") : p(this.prevButton, "disabled");
      } }, { key: "loop", value: function() {
        var r = ie(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
        return r = ie(this.settings, "loop") ? this.settings.loop : r, r;
      } }, { key: "close", value: function() {
        var r = this;
        if (!this.lightboxOpen) {
          if (this.events) {
            for (var l in this.events) this.events.hasOwnProperty(l) && this.events[l].destroy();
            this.events = null;
          }
          return !1;
        }
        if (this.closing) return !1;
        this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && m(this.bodyHiddenChildElms, function(c) {
          c.removeAttribute("aria-hidden");
        }), p(this.modal, "glightbox-closing"), P(this.overlay, this.settings.openEffect == "none" ? "none" : this.settings.cssEfects.fade.out), P(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function() {
          if (r.activeSlide = null, r.prevActiveSlideIndex = null, r.prevActiveSlide = null, r.built = !1, r.events) {
            for (var c in r.events) r.events.hasOwnProperty(c) && r.events[c].destroy();
            r.events = null;
          }
          var u = document.body;
          w(D, "glightbox-open"), w(u, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), r.modal.parentNode.removeChild(r.modal), r.trigger("close"), U(r.settings.onClose) && r.settings.onClose();
          var _ = document.querySelector(".gcss-styles");
          _ && _.parentNode.removeChild(_), r.lightboxOpen = !1, r.closing = null;
        });
      } }, { key: "destroy", value: function() {
        this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
      } }, { key: "on", value: function(r, l) {
        var c = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!r || !U(l)) throw new TypeError("Event name and callback must be defined");
        this.apiEvents.push({ evt: r, once: c, callback: l });
      } }, { key: "once", value: function(r, l) {
        this.on(r, l, !0);
      } }, { key: "trigger", value: function(r) {
        var l = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, u = [];
        m(this.apiEvents, function(_, S) {
          var O = _.evt, C = _.once, q = _.callback;
          O == r && (q(c), C && u.push(S));
        }), u.length && m(u, function(_) {
          return l.apiEvents.splice(_, 1);
        });
      } }, { key: "clearAllEvents", value: function() {
        this.apiEvents.splice(0, this.apiEvents.length);
      } }, { key: "version", value: function() {
        return "3.3.1";
      } }]);
      return function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, l = new ve(r);
        return l.init(), l;
      };
    });
  }(Wn)), Wn.exports;
}
var Bc = Fc();
const zc = /* @__PURE__ */ Rc(Bc), Vc = {
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
    let o = null;
    return rn(() => {
      o = zc({
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
      }), n.modelValue && o.open(), o.on("close", () => {
        i("update:modelValue", !1);
      });
    }), Ze(
      () => n.modelValue,
      (s) => {
        s ? o.open() : o.close();
      }
    ), bs(() => {
      o && o.destroy();
    }), (s, a) => ge(s.$slots, "default");
  }
}, Uc = { class: "accommodation-type-card" }, qc = ["src", "alt"], Hc = { key: 1 }, Wc = { class: "accommodation-type-card__body" }, Yc = { class: "accommodation-type-card__body-description" }, jc = { class: "amenities" }, Gc = {
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
    const { t } = $e(), n = ye(!1), i = () => {
      n.value = !0;
    };
    return (o, s) => (A(), R("article", Uc, [
      x("section", {
        onClick: i,
        class: "accommodation-type-card__img"
      }, [
        M(Vc, {
          modelValue: n.value,
          "onUpdate:modelValue": s[0] || (s[0] = (a) => n.value = a),
          images: e.data.gallery
        }, {
          default: H(() => [
            e.data.thumbnail && e.data.thumbnail.url ? (A(), R("img", {
              key: 0,
              onClick: i,
              src: e.data.thumbnail.url,
              alt: e.data.thumbnail.name
            }, null, 8, qc)) : (A(), R("span", Hc, B(W(t)("accommodationType.thumbnail")), 1))
          ]),
          _: 1
        }, 8, ["modelValue", "images"])
      ]),
      x("section", Wc, [
        x("div", Yc, [
          x("h2", null, B(e.data.name), 1),
          ge(o.$slots, "description", {}, () => [
            x("p", null, B(e.data.description), 1)
          ]),
          x("div", jc, [
            (A(!0), R(de, null, Oe(e.data.amenities, (a, d) => (A(), R("span", {
              key: d,
              class: "amenities__item"
            }, B(a.title), 1))), 128))
          ])
        ])
      ])
    ]));
  }
}, Xc = ["top", "right", "bottom", "left"], Uo = ["start", "end"], qo = /* @__PURE__ */ Xc.reduce((e, t) => e.concat(t, t + "-" + Uo[0], t + "-" + Uo[1]), []), Ln = Math.min, Pt = Math.max, Kc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Jc = {
  start: "end",
  end: "start"
};
function Ci(e, t, n) {
  return Pt(e, Ln(t, n));
}
function Yt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  return e.split("-")[0];
}
function Je(e) {
  return e.split("-")[1];
}
function Wr(e) {
  return e === "x" ? "y" : "x";
}
function Ki(e) {
  return e === "y" ? "height" : "width";
}
function Vt(e) {
  return ["top", "bottom"].includes(lt(e)) ? "y" : "x";
}
function Ji(e) {
  return Wr(Vt(e));
}
function Yr(e, t, n) {
  n === void 0 && (n = !1);
  const i = Je(e), o = Ji(e), s = Ki(o);
  let a = o === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Kn(a)), [a, Kn(a)];
}
function Zc(e) {
  const t = Kn(e);
  return [Xn(e), t, Xn(t)];
}
function Xn(e) {
  return e.replace(/start|end/g, (t) => Jc[t]);
}
function Qc(e, t, n) {
  const i = ["left", "right"], o = ["right", "left"], s = ["top", "bottom"], a = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : i : t ? i : o;
    case "left":
    case "right":
      return t ? s : a;
    default:
      return [];
  }
}
function ed(e, t, n, i) {
  const o = Je(e);
  let s = Qc(lt(e), n === "start", i);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(Xn)))), s;
}
function Kn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Kc[t]);
}
function td(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function jr(e) {
  return typeof e != "number" ? td(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function wn(e) {
  const {
    x: t,
    y: n,
    width: i,
    height: o
  } = e;
  return {
    width: i,
    height: o,
    top: n,
    left: t,
    right: t + i,
    bottom: n + o,
    x: t,
    y: n
  };
}
function Ho(e, t, n) {
  let {
    reference: i,
    floating: o
  } = e;
  const s = Vt(t), a = Ji(t), d = Ki(a), f = lt(t), m = s === "y", v = i.x + i.width / 2 - o.width / 2, g = i.y + i.height / 2 - o.height / 2, p = i[d] / 2 - o[d] / 2;
  let w;
  switch (f) {
    case "top":
      w = {
        x: v,
        y: i.y - o.height
      };
      break;
    case "bottom":
      w = {
        x: v,
        y: i.y + i.height
      };
      break;
    case "right":
      w = {
        x: i.x + i.width,
        y: g
      };
      break;
    case "left":
      w = {
        x: i.x - o.width,
        y: g
      };
      break;
    default:
      w = {
        x: i.x,
        y: i.y
      };
  }
  switch (Je(t)) {
    case "start":
      w[a] -= p * (n && m ? -1 : 1);
      break;
    case "end":
      w[a] += p * (n && m ? -1 : 1);
      break;
  }
  return w;
}
const nd = async (e, t, n) => {
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: a
  } = n, d = s.filter(Boolean), f = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let m = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: v,
    y: g
  } = Ho(m, i, f), p = i, w = {}, T = 0;
  for (let k = 0; k < d.length; k++) {
    const {
      name: P,
      fn: b
    } = d[k], {
      x: E,
      y: L,
      data: N,
      reset: $
    } = await b({
      x: v,
      y: g,
      initialPlacement: i,
      placement: p,
      strategy: o,
      middlewareData: w,
      rects: m,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    v = E ?? v, g = L ?? g, w = {
      ...w,
      [P]: {
        ...w[P],
        ...N
      }
    }, $ && T <= 50 && (T++, typeof $ == "object" && ($.placement && (p = $.placement), $.rects && (m = $.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : $.rects), {
      x: v,
      y: g
    } = Ho(m, p, f)), k = -1);
  }
  return {
    x: v,
    y: g,
    placement: p,
    strategy: o,
    middlewareData: w
  };
};
async function oi(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: i,
    y: o,
    platform: s,
    rects: a,
    elements: d,
    strategy: f
  } = e, {
    boundary: m = "clippingAncestors",
    rootBoundary: v = "viewport",
    elementContext: g = "floating",
    altBoundary: p = !1,
    padding: w = 0
  } = Yt(t, e), T = jr(w), P = d[p ? g === "floating" ? "reference" : "floating" : g], b = wn(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(P))) == null || n ? P : P.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(d.floating)),
    boundary: m,
    rootBoundary: v,
    strategy: f
  })), E = g === "floating" ? {
    x: i,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, L = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d.floating)), N = await (s.isElement == null ? void 0 : s.isElement(L)) ? await (s.getScale == null ? void 0 : s.getScale(L)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, $ = wn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: d,
    rect: E,
    offsetParent: L,
    strategy: f
  }) : E);
  return {
    top: (b.top - $.top + T.top) / N.y,
    bottom: ($.bottom - b.bottom + T.bottom) / N.y,
    left: (b.left - $.left + T.left) / N.x,
    right: ($.right - b.right + T.right) / N.x
  };
}
const id = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: i,
      placement: o,
      rects: s,
      platform: a,
      elements: d,
      middlewareData: f
    } = t, {
      element: m,
      padding: v = 0
    } = Yt(e, t) || {};
    if (m == null)
      return {};
    const g = jr(v), p = {
      x: n,
      y: i
    }, w = Ji(o), T = Ki(w), k = await a.getDimensions(m), P = w === "y", b = P ? "top" : "left", E = P ? "bottom" : "right", L = P ? "clientHeight" : "clientWidth", N = s.reference[T] + s.reference[w] - p[w] - s.floating[T], $ = p[w] - s.reference[w], F = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(m));
    let I = F ? F[L] : 0;
    (!I || !await (a.isElement == null ? void 0 : a.isElement(F))) && (I = d.floating[L] || s.floating[T]);
    const G = N / 2 - $ / 2, K = I / 2 - k[T] / 2 - 1, U = Ln(g[b], K), ae = Ln(g[E], K), Z = U, Te = I - k[T] - ae, be = I / 2 - k[T] / 2 + G, Ae = Ci(Z, be, Te), fe = !f.arrow && Je(o) != null && be !== Ae && s.reference[T] / 2 - (be < Z ? U : ae) - k[T] / 2 < 0, ie = fe ? be < Z ? be - Z : be - Te : 0;
    return {
      [w]: p[w] + ie,
      data: {
        [w]: Ae,
        centerOffset: be - Ae - ie,
        ...fe && {
          alignmentOffset: ie
        }
      },
      reset: fe
    };
  }
});
function od(e, t, n) {
  return (e ? [...n.filter((o) => Je(o) === e), ...n.filter((o) => Je(o) !== e)] : n.filter((o) => lt(o) === o)).filter((o) => e ? Je(o) === e || (t ? Xn(o) !== o : !1) : !0);
}
const rd = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    async fn(t) {
      var n, i, o;
      const {
        rects: s,
        middlewareData: a,
        placement: d,
        platform: f,
        elements: m
      } = t, {
        crossAxis: v = !1,
        alignment: g,
        allowedPlacements: p = qo,
        autoAlignment: w = !0,
        ...T
      } = Yt(e, t), k = g !== void 0 || p === qo ? od(g || null, w, p) : p, P = await oi(t, T), b = ((n = a.autoPlacement) == null ? void 0 : n.index) || 0, E = k[b];
      if (E == null)
        return {};
      const L = Yr(E, s, await (f.isRTL == null ? void 0 : f.isRTL(m.floating)));
      if (d !== E)
        return {
          reset: {
            placement: k[0]
          }
        };
      const N = [P[lt(E)], P[L[0]], P[L[1]]], $ = [...((i = a.autoPlacement) == null ? void 0 : i.overflows) || [], {
        placement: E,
        overflows: N
      }], F = k[b + 1];
      if (F)
        return {
          data: {
            index: b + 1,
            overflows: $
          },
          reset: {
            placement: F
          }
        };
      const I = $.map((U) => {
        const ae = Je(U.placement);
        return [U.placement, ae && v ? (
          // Check along the mainAxis and main crossAxis side.
          U.overflows.slice(0, 2).reduce((Z, Te) => Z + Te, 0)
        ) : (
          // Check only the mainAxis.
          U.overflows[0]
        ), U.overflows];
      }).sort((U, ae) => U[1] - ae[1]), K = ((o = I.filter((U) => U[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        Je(U[0]) ? 2 : 3
      ).every((ae) => ae <= 0))[0]) == null ? void 0 : o[0]) || I[0][0];
      return K !== d ? {
        data: {
          index: b + 1,
          overflows: $
        },
        reset: {
          placement: K
        }
      } : {};
    }
  };
}, sd = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, i;
      const {
        placement: o,
        middlewareData: s,
        rects: a,
        initialPlacement: d,
        platform: f,
        elements: m
      } = t, {
        mainAxis: v = !0,
        crossAxis: g = !0,
        fallbackPlacements: p,
        fallbackStrategy: w = "bestFit",
        fallbackAxisSideDirection: T = "none",
        flipAlignment: k = !0,
        ...P
      } = Yt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = lt(o), E = Vt(d), L = lt(d) === d, N = await (f.isRTL == null ? void 0 : f.isRTL(m.floating)), $ = p || (L || !k ? [Kn(d)] : Zc(d)), F = T !== "none";
      !p && F && $.push(...ed(d, k, T, N));
      const I = [d, ...$], G = await oi(t, P), K = [];
      let U = ((i = s.flip) == null ? void 0 : i.overflows) || [];
      if (v && K.push(G[b]), g) {
        const be = Yr(o, a, N);
        K.push(G[be[0]], G[be[1]]);
      }
      if (U = [...U, {
        placement: o,
        overflows: K
      }], !K.every((be) => be <= 0)) {
        var ae, Z;
        const be = (((ae = s.flip) == null ? void 0 : ae.index) || 0) + 1, Ae = I[be];
        if (Ae)
          return {
            data: {
              index: be,
              overflows: U
            },
            reset: {
              placement: Ae
            }
          };
        let fe = (Z = U.filter((ie) => ie.overflows[0] <= 0).sort((ie, De) => ie.overflows[1] - De.overflows[1])[0]) == null ? void 0 : Z.placement;
        if (!fe)
          switch (w) {
            case "bestFit": {
              var Te;
              const ie = (Te = U.filter((De) => {
                if (F) {
                  const Ce = Vt(De.placement);
                  return Ce === E || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Ce === "y";
                }
                return !0;
              }).map((De) => [De.placement, De.overflows.filter((Ce) => Ce > 0).reduce((Ce, Be) => Ce + Be, 0)]).sort((De, Ce) => De[1] - Ce[1])[0]) == null ? void 0 : Te[0];
              ie && (fe = ie);
              break;
            }
            case "initialPlacement":
              fe = d;
              break;
          }
        if (o !== fe)
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
async function ad(e, t) {
  const {
    placement: n,
    platform: i,
    elements: o
  } = e, s = await (i.isRTL == null ? void 0 : i.isRTL(o.floating)), a = lt(n), d = Je(n), f = Vt(n) === "y", m = ["left", "top"].includes(a) ? -1 : 1, v = s && f ? -1 : 1, g = Yt(t, e);
  let {
    mainAxis: p,
    crossAxis: w,
    alignmentAxis: T
  } = typeof g == "number" ? {
    mainAxis: g,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: g.mainAxis || 0,
    crossAxis: g.crossAxis || 0,
    alignmentAxis: g.alignmentAxis
  };
  return d && typeof T == "number" && (w = d === "end" ? T * -1 : T), f ? {
    x: w * v,
    y: p * m
  } : {
    x: p * m,
    y: w * v
  };
}
const ld = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, i;
      const {
        x: o,
        y: s,
        placement: a,
        middlewareData: d
      } = t, f = await ad(t, e);
      return a === ((n = d.offset) == null ? void 0 : n.placement) && (i = d.arrow) != null && i.alignmentOffset ? {} : {
        x: o + f.x,
        y: s + f.y,
        data: {
          ...f,
          placement: a
        }
      };
    }
  };
}, cd = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: i,
        placement: o
      } = t, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: d = {
          fn: (P) => {
            let {
              x: b,
              y: E
            } = P;
            return {
              x: b,
              y: E
            };
          }
        },
        ...f
      } = Yt(e, t), m = {
        x: n,
        y: i
      }, v = await oi(t, f), g = Vt(lt(o)), p = Wr(g);
      let w = m[p], T = m[g];
      if (s) {
        const P = p === "y" ? "top" : "left", b = p === "y" ? "bottom" : "right", E = w + v[P], L = w - v[b];
        w = Ci(E, w, L);
      }
      if (a) {
        const P = g === "y" ? "top" : "left", b = g === "y" ? "bottom" : "right", E = T + v[P], L = T - v[b];
        T = Ci(E, T, L);
      }
      const k = d.fn({
        ...t,
        [p]: w,
        [g]: T
      });
      return {
        ...k,
        data: {
          x: k.x - n,
          y: k.y - i,
          enabled: {
            [p]: s,
            [g]: a
          }
        }
      };
    }
  };
}, dd = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, i;
      const {
        placement: o,
        rects: s,
        platform: a,
        elements: d
      } = t, {
        apply: f = () => {
        },
        ...m
      } = Yt(e, t), v = await oi(t, m), g = lt(o), p = Je(o), w = Vt(o) === "y", {
        width: T,
        height: k
      } = s.floating;
      let P, b;
      g === "top" || g === "bottom" ? (P = g, b = p === (await (a.isRTL == null ? void 0 : a.isRTL(d.floating)) ? "start" : "end") ? "left" : "right") : (b = g, P = p === "end" ? "top" : "bottom");
      const E = k - v.top - v.bottom, L = T - v.left - v.right, N = Ln(k - v[P], E), $ = Ln(T - v[b], L), F = !t.middlewareData.shift;
      let I = N, G = $;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (G = L), (i = t.middlewareData.shift) != null && i.enabled.y && (I = E), F && !p) {
        const U = Pt(v.left, 0), ae = Pt(v.right, 0), Z = Pt(v.top, 0), Te = Pt(v.bottom, 0);
        w ? G = T - 2 * (U !== 0 || ae !== 0 ? U + ae : Pt(v.left, v.right)) : I = k - 2 * (Z !== 0 || Te !== 0 ? Z + Te : Pt(v.top, v.bottom));
      }
      await f({
        ...t,
        availableWidth: G,
        availableHeight: I
      });
      const K = await a.getDimensions(d.floating);
      return T !== K.width || k !== K.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function je(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function st(e) {
  return je(e).getComputedStyle(e);
}
const Wo = Math.min, xn = Math.max, Jn = Math.round;
function Gr(e) {
  const t = st(e);
  let n = parseFloat(t.width), i = parseFloat(t.height);
  const o = e.offsetWidth, s = e.offsetHeight, a = Jn(n) !== o || Jn(i) !== s;
  return a && (n = o, i = s), { width: n, height: i, fallback: a };
}
function St(e) {
  return Kr(e) ? (e.nodeName || "").toLowerCase() : "";
}
let Un;
function Xr() {
  if (Un) return Un;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (Un = e.brands.map((t) => t.brand + "/" + t.version).join(" "), Un) : navigator.userAgent;
}
function at(e) {
  return e instanceof je(e).HTMLElement;
}
function Tt(e) {
  return e instanceof je(e).Element;
}
function Kr(e) {
  return e instanceof je(e).Node;
}
function Yo(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof je(e).ShadowRoot || e instanceof ShadowRoot;
}
function ri(e) {
  const { overflow: t, overflowX: n, overflowY: i, display: o } = st(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + i + n) && !["inline", "contents"].includes(o);
}
function ud(e) {
  return ["table", "td", "th"].includes(St(e));
}
function Li(e) {
  const t = /firefox/i.test(Xr()), n = st(e), i = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!i && i !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some((o) => n.willChange.includes(o)) || ["paint", "layout", "strict", "content"].some((o) => {
    const s = n.contain;
    return s != null && s.includes(o);
  });
}
function Jr() {
  return !/^((?!chrome|android).)*safari/i.test(Xr());
}
function Zi(e) {
  return ["html", "body", "#document"].includes(St(e));
}
function Zr(e) {
  return Tt(e) ? e : e.contextElement;
}
const Qr = { x: 1, y: 1 };
function en(e) {
  const t = Zr(e);
  if (!at(t)) return Qr;
  const n = t.getBoundingClientRect(), { width: i, height: o, fallback: s } = Gr(t);
  let a = (s ? Jn(n.width) : n.width) / i, d = (s ? Jn(n.height) : n.height) / o;
  return a && Number.isFinite(a) || (a = 1), d && Number.isFinite(d) || (d = 1), { x: a, y: d };
}
function In(e, t, n, i) {
  var o, s;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const a = e.getBoundingClientRect(), d = Zr(e);
  let f = Qr;
  t && (i ? Tt(i) && (f = en(i)) : f = en(e));
  const m = d ? je(d) : window, v = !Jr() && n;
  let g = (a.left + (v && ((o = m.visualViewport) == null ? void 0 : o.offsetLeft) || 0)) / f.x, p = (a.top + (v && ((s = m.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / f.y, w = a.width / f.x, T = a.height / f.y;
  if (d) {
    const k = je(d), P = i && Tt(i) ? je(i) : i;
    let b = k.frameElement;
    for (; b && i && P !== k; ) {
      const E = en(b), L = b.getBoundingClientRect(), N = getComputedStyle(b);
      L.x += (b.clientLeft + parseFloat(N.paddingLeft)) * E.x, L.y += (b.clientTop + parseFloat(N.paddingTop)) * E.y, g *= E.x, p *= E.y, w *= E.x, T *= E.y, g += L.x, p += L.y, b = je(b).frameElement;
    }
  }
  return { width: w, height: T, top: p, right: g + w, bottom: p + T, left: g, x: g, y: p };
}
function kt(e) {
  return ((Kr(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function si(e) {
  return Tt(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function es(e) {
  return In(kt(e)).left + si(e).scrollLeft;
}
function Pn(e) {
  if (St(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || Yo(e) && e.host || kt(e);
  return Yo(t) ? t.host : t;
}
function ts(e) {
  const t = Pn(e);
  return Zi(t) ? t.ownerDocument.body : at(t) && ri(t) ? t : ts(t);
}
function Zn(e, t) {
  var n;
  t === void 0 && (t = []);
  const i = ts(e), o = i === ((n = e.ownerDocument) == null ? void 0 : n.body), s = je(i);
  return o ? t.concat(s, s.visualViewport || [], ri(i) ? i : []) : t.concat(i, Zn(i));
}
function jo(e, t, n) {
  return t === "viewport" ? wn(function(i, o) {
    const s = je(i), a = kt(i), d = s.visualViewport;
    let f = a.clientWidth, m = a.clientHeight, v = 0, g = 0;
    if (d) {
      f = d.width, m = d.height;
      const p = Jr();
      (p || !p && o === "fixed") && (v = d.offsetLeft, g = d.offsetTop);
    }
    return { width: f, height: m, x: v, y: g };
  }(e, n)) : Tt(t) ? wn(function(i, o) {
    const s = In(i, !0, o === "fixed"), a = s.top + i.clientTop, d = s.left + i.clientLeft, f = at(i) ? en(i) : { x: 1, y: 1 };
    return { width: i.clientWidth * f.x, height: i.clientHeight * f.y, x: d * f.x, y: a * f.y };
  }(t, n)) : wn(function(i) {
    const o = kt(i), s = si(i), a = i.ownerDocument.body, d = xn(o.scrollWidth, o.clientWidth, a.scrollWidth, a.clientWidth), f = xn(o.scrollHeight, o.clientHeight, a.scrollHeight, a.clientHeight);
    let m = -s.scrollLeft + es(i);
    const v = -s.scrollTop;
    return st(a).direction === "rtl" && (m += xn(o.clientWidth, a.clientWidth) - d), { width: d, height: f, x: m, y: v };
  }(kt(e)));
}
function Go(e) {
  return at(e) && st(e).position !== "fixed" ? e.offsetParent : null;
}
function Xo(e) {
  const t = je(e);
  let n = Go(e);
  for (; n && ud(n) && st(n).position === "static"; ) n = Go(n);
  return n && (St(n) === "html" || St(n) === "body" && st(n).position === "static" && !Li(n)) ? t : n || function(i) {
    let o = Pn(i);
    for (; at(o) && !Zi(o); ) {
      if (Li(o)) return o;
      o = Pn(o);
    }
    return null;
  }(e) || t;
}
function fd(e, t, n) {
  const i = at(t), o = kt(t), s = In(e, !0, n === "fixed", t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const d = { x: 0, y: 0 };
  if (i || !i && n !== "fixed") if ((St(t) !== "body" || ri(o)) && (a = si(t)), at(t)) {
    const f = In(t, !0);
    d.x = f.x + t.clientLeft, d.y = f.y + t.clientTop;
  } else o && (d.x = es(o));
  return { x: s.left + a.scrollLeft - d.x, y: s.top + a.scrollTop - d.y, width: s.width, height: s.height };
}
const md = { getClippingRect: function(e) {
  let { element: t, boundary: n, rootBoundary: i, strategy: o } = e;
  const s = n === "clippingAncestors" ? function(m, v) {
    const g = v.get(m);
    if (g) return g;
    let p = Zn(m).filter((P) => Tt(P) && St(P) !== "body"), w = null;
    const T = st(m).position === "fixed";
    let k = T ? Pn(m) : m;
    for (; Tt(k) && !Zi(k); ) {
      const P = st(k), b = Li(k);
      (T ? b || w : b || P.position !== "static" || !w || !["absolute", "fixed"].includes(w.position)) ? w = P : p = p.filter((E) => E !== k), k = Pn(k);
    }
    return v.set(m, p), p;
  }(t, this._c) : [].concat(n), a = [...s, i], d = a[0], f = a.reduce((m, v) => {
    const g = jo(t, v, o);
    return m.top = xn(g.top, m.top), m.right = Wo(g.right, m.right), m.bottom = Wo(g.bottom, m.bottom), m.left = xn(g.left, m.left), m;
  }, jo(t, d, o));
  return { width: f.right - f.left, height: f.bottom - f.top, x: f.left, y: f.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: n, strategy: i } = e;
  const o = at(n), s = kt(n);
  if (n === s) return t;
  let a = { scrollLeft: 0, scrollTop: 0 }, d = { x: 1, y: 1 };
  const f = { x: 0, y: 0 };
  if ((o || !o && i !== "fixed") && ((St(n) !== "body" || ri(s)) && (a = si(n)), at(n))) {
    const m = In(n);
    d = en(n), f.x = m.x + n.clientLeft, f.y = m.y + n.clientTop;
  }
  return { width: t.width * d.x, height: t.height * d.y, x: t.x * d.x - a.scrollLeft * d.x + f.x, y: t.y * d.y - a.scrollTop * d.y + f.y };
}, isElement: Tt, getDimensions: function(e) {
  return at(e) ? Gr(e) : e.getBoundingClientRect();
}, getOffsetParent: Xo, getDocumentElement: kt, getScale: en, async getElementRects(e) {
  let { reference: t, floating: n, strategy: i } = e;
  const o = this.getOffsetParent || Xo, s = this.getDimensions;
  return { reference: fd(t, await o(n), i), floating: { x: 0, y: 0, ...await s(n) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => st(e).direction === "rtl" }, pd = (e, t, n) => {
  const i = /* @__PURE__ */ new Map(), o = { platform: md, ...n }, s = { ...o.platform, _c: i };
  return nd(e, t, { ...o, platform: s });
}, Rt = {
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
function Ii(e, t) {
  let n = Rt.themes[e] || {}, i;
  do
    i = n[t], typeof i > "u" ? n.$extend ? n = Rt.themes[n.$extend] || {} : (n = null, i = Rt[t]) : n = null;
  while (n);
  return i;
}
function hd(e) {
  const t = [e];
  let n = Rt.themes[e] || {};
  do
    n.$extend && !n.$resetCss ? (t.push(n.$extend), n = Rt.themes[n.$extend] || {}) : n = null;
  while (n);
  return t.map((i) => `v-popper--theme-${i}`);
}
function Ko(e) {
  const t = [e];
  let n = Rt.themes[e] || {};
  do
    n.$extend ? (t.push(n.$extend), n = Rt.themes[n.$extend] || {}) : n = null;
  while (n);
  return t;
}
let $n = !1;
if (typeof window < "u") {
  $n = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        $n = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let ns = !1;
typeof window < "u" && typeof navigator < "u" && (ns = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const gd = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), Jo = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, Zo = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function Qo(e, t) {
  const n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}
function mi() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const Xe = [];
let It = null;
const er = {};
function tr(e) {
  let t = er[e];
  return t || (t = er[e] = []), t;
}
let Pi = function() {
};
typeof window < "u" && (Pi = window.Element);
function oe(e) {
  return function(t) {
    return Ii(t.theme, e);
  };
}
const pi = "__floating-vue__popper", is = () => Ut({
  name: "VPopper",
  provide() {
    return {
      [pi]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [pi]: { default: null }
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
      validator: (e) => gd.includes(e)
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
      type: [String, Object, Pi, Boolean],
      default: oe("container")
    },
    boundary: {
      type: [String, Pi],
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
      return (e = this[pi]) == null ? void 0 : e.parentPopper;
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
      var i, o;
      (i = this.parentPopper) != null && i.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = !1, (n || !this.disabled) && (((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
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
      (this.distance || this.skidding) && e.middleware.push(ld({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(rd({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(cd({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(sd({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(id({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: i, rects: o, middlewareData: s }) => {
          let a;
          const { centerOffset: d } = s.arrow;
          return i.startsWith("top") || i.startsWith("bottom") ? a = Math.abs(d) > o.reference.width / 2 : a = Math.abs(d) > o.reference.height / 2, {
            data: {
              overflow: a
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const i = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: o, placement: s, middlewareData: a }) => {
            var d;
            if ((d = a.autoSize) != null && d.skip)
              return {};
            let f, m;
            return s.startsWith("top") || s.startsWith("bottom") ? f = o.reference.width : m = o.reference.height, this.$_innerNode.style[i === "min" ? "minWidth" : i === "max" ? "maxWidth" : "width"] = f != null ? `${f}px` : null, this.$_innerNode.style[i === "min" ? "minHeight" : i === "max" ? "maxHeight" : "height"] = m != null ? `${m}px` : null, {
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
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(dd({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: i, availableHeight: o }) => {
          this.$_innerNode.style.maxWidth = i != null ? `${i}px` : null, this.$_innerNode.style.maxHeight = o != null ? `${o}px` : null;
        }
      })));
      const n = await pd(this.$_referenceNode, this.$_popperNode, e);
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
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), It && this.instantMove && It.instantMove && It !== this.parentPopper) {
        It.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (It = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await mi(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...Zn(this.$_referenceNode),
        ...Zn(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), n = this.$_popperNode.querySelector(".v-popper__wrapper"), i = n.parentNode.getBoundingClientRect(), o = t.x + t.width / 2 - (i.left + n.offsetLeft), s = t.y + t.height / 2 - (i.top + n.offsetTop);
        this.result.transformOrigin = `${o}px ${s}px`;
      }
      this.isShown = !0, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let n = 0; n < Xe.length; n++)
          t = Xe[n], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      Xe.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of Ko(this.theme))
        tr(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await mi(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, Qo(Xe, this), Xe.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const n of Ko(this.theme)) {
        const i = tr(n);
        Qo(i, this), i.length === 0 && document.body.classList.remove(`v-popper--some-open--${n}`);
      }
      It === this && (It = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await mi(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
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
      this.$_registerTriggerListeners(this.$_targetNodes, Jo, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], Jo, this.popperTriggers, this.popperShowTriggers, e);
      const t = (n) => {
        n.usedByTooltip || this.hide({ event: n });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, Zo, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], Zo, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, n) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: n }), e.forEach((i) => i.addEventListener(t, n, $n ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(e, t, n, i, o) {
      let s = n;
      i != null && (s = typeof i == "function" ? i(s) : i), s.forEach((a) => {
        const d = t[a];
        d && this.$_registerEventListeners(e, d, o);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((n) => {
        const { targetNodes: i, eventType: o, handler: s } = n;
        !e || e === o ? i.forEach((a) => a.removeEventListener(o, s)) : t.push(n);
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
      if (En >= e.left && En <= e.right && Tn >= e.top && Tn <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), n = En - xt, i = Tn - Et, o = t.left + t.width / 2 - xt + (t.top + t.height / 2) - Et + t.width + t.height, s = xt + n * o, a = Et + i * o;
        return qn(xt, Et, s, a, t.left, t.top, t.left, t.bottom) || // Left edge
        qn(xt, Et, s, a, t.left, t.top, t.right, t.top) || // Top edge
        qn(xt, Et, s, a, t.right, t.top, t.right, t.bottom) || // Right edge
        qn(xt, Et, s, a, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (ns) {
    const e = $n ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => nr(t), e), document.addEventListener("touchend", (t) => ir(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => nr(e), !0), window.addEventListener("click", (e) => ir(e, !1), !0);
  window.addEventListener("resize", yd);
}
function nr(e, t) {
  for (let n = 0; n < Xe.length; n++) {
    const i = Xe[n];
    try {
      i.mouseDownContains = i.popperNode().contains(e.target);
    } catch {
    }
  }
}
function ir(e, t) {
  _d(e, t);
}
function _d(e, t) {
  const n = {};
  for (let i = Xe.length - 1; i >= 0; i--) {
    const o = Xe[i];
    try {
      const s = o.containsGlobalTarget = o.mouseDownContains || o.popperNode().contains(e.target);
      o.pendingHide = !1, requestAnimationFrame(() => {
        if (o.pendingHide = !1, !n[o.randomId] && or(o, s, e)) {
          if (o.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let d = o.parentPopper;
            for (; d; )
              n[d.randomId] = !0, d = d.parentPopper;
            return;
          }
          let a = o.parentPopper;
          for (; a && or(a, a.containsGlobalTarget, e); )
            a.$_handleGlobalClose(e, t), a = a.parentPopper;
        }
      });
    } catch {
    }
  }
}
function or(e, t, n) {
  return n.closeAllPopover || n.closePopover && t || vd(e, n) && !t;
}
function vd(e, t) {
  if (typeof e.autoHide == "function") {
    const n = e.autoHide(t);
    return e.lastAutoHide = n, n;
  }
  return e.autoHide;
}
function yd() {
  for (let e = 0; e < Xe.length; e++)
    Xe[e].$_computePosition();
}
let xt = 0, Et = 0, En = 0, Tn = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  xt = En, Et = Tn, En = e.clientX, Tn = e.clientY;
}, $n ? {
  passive: !0
} : void 0);
function qn(e, t, n, i, o, s, a, d) {
  const f = ((a - o) * (t - s) - (d - s) * (e - o)) / ((d - s) * (n - e) - (a - o) * (i - t)), m = ((n - e) * (t - s) - (i - t) * (e - o)) / ((d - s) * (n - e) - (a - o) * (i - t));
  return f >= 0 && f <= 1 && m >= 0 && m <= 1;
}
const bd = {
  extends: is()
}, Qi = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, o] of t)
    n[i] = o;
  return n;
};
function wd(e, t, n, i, o, s) {
  return A(), R("div", {
    ref: "reference",
    class: ot(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    ge(e.$slots, "default", Ts(ks(e.slotData)))
  ], 2);
}
const xd = /* @__PURE__ */ Qi(bd, [["render", wd]]);
function Ed() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var n = e.indexOf("Trident/");
  if (n > 0) {
    var i = e.indexOf("rv:");
    return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
  }
  var o = e.indexOf("Edge/");
  return o > 0 ? parseInt(e.substring(o + 5, e.indexOf(".", o)), 10) : -1;
}
let Yn;
function $i() {
  $i.init || ($i.init = !0, Yn = Ed() !== -1);
}
var ai = {
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
    $i(), Es(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", Yn && this.$el.appendChild(e), e.data = "about:blank", Yn || this.$el.appendChild(e);
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
      this._resizeObject && this._resizeObject.onload && (!Yn && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const Td = /* @__PURE__ */ Ss("data-v-b329ee4c");
ws("data-v-b329ee4c");
const kd = {
  class: "resize-observer",
  tabindex: "-1"
};
xs();
const Sd = /* @__PURE__ */ Td((e, t, n, i, o, s) => (A(), ce("div", kd)));
ai.render = Sd;
ai.__scopeId = "data-v-b329ee4c";
ai.__file = "src/components/ResizeObserver.vue";
const os = (e = "theme") => ({
  computed: {
    themeClass() {
      return hd(this[e]);
    }
  }
}), Nd = Ut({
  name: "VPopperContent",
  components: {
    ResizeObserver: ai
  },
  mixins: [
    os()
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
}), Od = ["id", "aria-hidden", "tabindex", "data-popper-placement"], Ad = {
  ref: "inner",
  class: "v-popper__inner"
}, Cd = /* @__PURE__ */ x("div", { class: "v-popper__arrow-outer" }, null, -1), Ld = /* @__PURE__ */ x("div", { class: "v-popper__arrow-inner" }, null, -1), Id = [
  Cd,
  Ld
];
function Pd(e, t, n, i, o, s) {
  const a = hi("ResizeObserver");
  return A(), R("div", {
    id: e.popperId,
    ref: "popover",
    class: ot(["v-popper__popper", [
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
    onKeyup: t[2] || (t[2] = Ns((d) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    x("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (d) => e.autoHide && e.$emit("hide"))
    }),
    x("div", {
      class: "v-popper__wrapper",
      style: Dt(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      x("div", Ad, [
        e.mounted ? (A(), R(de, { key: 0 }, [
          x("div", null, [
            ge(e.$slots, "default")
          ]),
          e.handleResize ? (A(), ce(a, {
            key: 0,
            onNotify: t[1] || (t[1] = (d) => e.$emit("resize", d))
          })) : _e("", !0)
        ], 64)) : _e("", !0)
      ], 512),
      x("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: Dt(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, Id, 4)
    ], 4)
  ], 46, Od);
}
const rs = /* @__PURE__ */ Qi(Nd, [["render", Pd]]), ss = {
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
let Di = function() {
};
typeof window < "u" && (Di = window.Element);
const $d = Ut({
  name: "VPopperWrapper",
  components: {
    Popper: xd,
    PopperContent: rs
  },
  mixins: [
    ss,
    os("finalTheme")
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
      type: [String, Object, Di, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, Di],
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
function Dd(e, t, n, i, o, s) {
  const a = hi("PopperContent"), d = hi("Popper");
  return A(), ce(d, Mi({ ref: "popper" }, e.$props, {
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
      isShown: m,
      shouldMountContent: v,
      skipTransition: g,
      autoHide: p,
      show: w,
      hide: T,
      handleResize: k,
      onResize: P,
      classes: b,
      result: E
    }) => [
      ge(e.$slots, "default", {
        shown: m,
        show: w,
        hide: T
      }),
      M(a, {
        ref: "popperContent",
        "popper-id": f,
        theme: e.finalTheme,
        shown: m,
        mounted: v,
        "skip-transition": g,
        "auto-hide": p,
        "handle-resize": k,
        classes: b,
        result: E,
        onHide: T,
        onResize: P
      }, {
        default: H(() => [
          ge(e.$slots, "popper", {
            shown: m,
            hide: T
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const eo = /* @__PURE__ */ Qi($d, [["render", Dd]]);
({
  ...eo
});
({
  ...eo
});
const Rd = {
  ...eo,
  name: "VTooltip",
  vPopperTheme: "tooltip"
};
Ut({
  name: "VTooltipDirective",
  components: {
    Popper: is(),
    PopperContent: rs
  },
  mixins: [
    ss
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => Ii(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => Ii(e.theme, "loadingContent")
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
const Md = Rd, Ri = {
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
    return (t, n) => (A(), ce(W(Md), Mi({
      disabled: e.disabled,
      placement: e.placement,
      container: !1
    }, t.$attrs), {
      popper: H(() => [
        ge(t.$slots, "popper")
      ]),
      default: H(() => [
        ge(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["disabled", "placement"]));
  }
};
function Fd(e = 0, t = "USD") {
  return new Intl.NumberFormat(window.navigator.language, {
    style: "currency",
    currency: t
  }).formatToParts(e);
}
function Bd(e = 0, t = "USD", n = "", i = !0) {
  const o = Fd(e, t);
  let s = "";
  return o.forEach((a) => {
    a.type === "currency" && (s += `<span class="${n}">${a.value}</span>`), a.type === "literal" && (s += `${a.value}`), a.type === "integer" && (s += `${a.value}`), i && a.type === "decimal" && (s += `${a.value}`), i && a.type === "fraction" && (s += `${a.value}`);
  }), s;
}
const zd = { class: "price-block" }, Vd = {
  key: 0,
  class: "price-block__discount"
}, Ud = { class: "price-block__discount-size" }, qd = { class: "price-block__old" }, Hd = ["innerHTML"], Wd = { class: "price-block__amount" }, Yd = { class: "price-block__icons" }, jd = {
  key: 0,
  class: "price-block__current"
}, Gd = ["innerHTML"], Xd = { key: 1 }, Kd = {
  key: 2,
  class: "price-block__details"
}, Jd = { class: "price-block__schedule" }, Zd = {
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
    const t = e, { t: n } = $e(), i = Ne(() => s(t.originalSellingPrice, "currency")), o = Ne(() => s(t.sellingPrice, "price-block__current-currency")), s = (a, d = "", f = !0) => Bd(a, t.currency, d, f);
    return (a, d) => (A(), R("div", zd, [
      e.discount ? (A(), R("div", Vd, [
        x("span", Ud, [
          x("span", null, "-" + B(e.discount), 1),
          d[0] || (d[0] = x("span", { class: "price-block__percent" }, "%", -1))
        ]),
        x("span", qd, [
          x("span", {
            class: "amount",
            innerHTML: i.value
          }, null, 8, Hd)
        ])
      ])) : _e("", !0),
      x("div", Wd, [
        x("div", Yd, [
          ge(a.$slots, "icons")
        ]),
        e.sellingPrice ? (A(), R("span", jd, [
          x("span", {
            class: "price-block__current-amount",
            innerHTML: o.value
          }, null, 8, Gd)
        ])) : e.sellingPrice === 0 ? (A(), R("span", Xd, B(W(n)("price.free")), 1)) : _e("", !0),
        e.sellingPrice && e.details ? (A(), R("div", Kd)) : _e("", !0)
      ]),
      x("div", Jd, [
        ge(a.$slots, "schedule")
      ])
    ]));
  }
}, Qd = { class: "variant-line" }, eu = { class: "variant-line__content" }, tu = { class: "variant-line__actions" }, nu = { class: "variant-line__footer" }, iu = {
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
    return (t, n) => (A(), R("div", Qd, [
      x("div", eu, [
        M(Zd, {
          "selling-price": e.price.sellingPrice,
          "original-selling-price": e.price.originalSellingPrice,
          discount: e.price.discount || null,
          currency: e.price.currency
        }, {
          icons: H(() => [
            ge(t.$slots, "icons")
          ]),
          _: 3
        }, 8, ["selling-price", "original-selling-price", "discount", "currency"]),
        x("div", tu, [
          ge(t.$slots, "default")
        ])
      ]),
      x("div", nu, [
        ge(t.$slots, "action")
      ])
    ]));
  }
};
function as() {
  const { t: e } = $e();
  function t(n) {
    return n.map((i) => i.map((o) => {
      const s = ou(o.text);
      return e(s, o.params || {});
    }).join(""));
  }
  return { formatDescription: t };
}
function ou(e) {
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
const ru = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function su(e, t) {
  return A(), R("svg", ru, t[0] || (t[0] = [
    x("path", { d: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z" }, null, -1)
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
  return A(), R("svg", lu, t[0] || (t[0] = [
    x("path", { d: "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56z" }, null, -1)
  ]));
}
const du = { render: cu }, uu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function fu(e, t) {
  return A(), R("svg", uu, t[0] || (t[0] = [
    x("path", { d: "M382-240 154-468l57-57 171 171 367-367 57 57z" }, null, -1)
  ]));
}
const mu = { render: fu }, pu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function hu(e, t) {
  return A(), R("svg", pu, t[0] || (t[0] = [
    x("path", { d: "m424-296 282-282-56-56-226 226-114-114-56 56zm56 216q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const gu = { render: hu }, _u = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function vu(e, t) {
  return A(), R("svg", _u, t[0] || (t[0] = [
    x("path", { d: "M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720m-720 80h640v-80H160zm0 160v240h640v-240zm0 240v-480z" }, null, -1)
  ]));
}
const yu = { render: vu }, bu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function wu(e, t) {
  return A(), R("svg", bu, t[0] || (t[0] = [
    x("path", { d: "M320-400q-17 0-28.5-11.5T280-440t11.5-28.5T320-480t28.5 11.5T360-440t-11.5 28.5T320-400m160 0q-17 0-28.5-11.5T440-440t11.5-28.5T480-480t28.5 11.5T520-440t-11.5 28.5T480-400m160 0q-17 0-28.5-11.5T600-440t11.5-28.5T640-480t28.5 11.5T680-440t-11.5 28.5T640-400M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80zm0-80h560v-400H200zm0-480h560v-80H200zm0 0v-80z" }, null, -1)
  ]));
}
const xu = { render: wu }, Eu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Tu(e, t) {
  return A(), R("svg", Eu, t[0] || (t[0] = [
    x("path", { d: "M480-344 240-584l56-56 184 184 184-184 56 56z" }, null, -1)
  ]));
}
const ku = { render: Tu }, Su = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Nu(e, t) {
  return A(), R("svg", Su, t[0] || (t[0] = [
    x("path", { d: "M480-528 296-344l-56-56 240-240 240 240-56 56z" }, null, -1)
  ]));
}
const Ou = { render: Nu }, Au = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Cu(e, t) {
  return A(), R("svg", Au, t[0] || (t[0] = [
    x("path", { d: "M440-280h80v-240h-80zm40-320q17 0 28.5-11.5T520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600m0 520q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" }, null, -1)
  ]));
}
const Lu = { render: Cu }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Pu(e, t) {
  return A(), R("svg", Iu, t[0] || (t[0] = [
    x("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const $u = { render: Pu }, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Ru(e, t) {
  return A(), R("svg", Du, t[0] || (t[0] = [
    x("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112z" }, null, -1)
  ]));
}
const Mu = { render: Ru }, Fu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Bu(e, t) {
  return A(), R("svg", Fu, t[0] || (t[0] = [
    x("path", { d: "M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320" }, null, -1)
  ]));
}
const zu = { render: Bu }, Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Uu(e, t) {
  return A(), R("svg", Vu, t[0] || (t[0] = [
    x("path", { d: "M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440t130 15.5T616-378q29 15 46.5 43.5T680-272v112zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120zM360-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81-14.5-81-41.5-71q14-5 28-6.5t28-1.5q66 0 113 47t47 113M120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360t-111 13.5T140-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T440-640t-23.5-56.5T360-720t-56.5 23.5T280-640t23.5 56.5T360-560m0-80" }, null, -1)
  ]));
}
const qu = { render: Uu }, Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Wu(e, t) {
  return A(), R("svg", Hu, t[0] || (t[0] = [
    x("path", { d: "M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800z" }, null, -1)
  ]));
}
const Yu = { render: Wu }, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "#e3e3e3",
  viewBox: "0 -960 960 960"
};
function Gu(e, t) {
  return A(), R("svg", ju, t[0] || (t[0] = [
    x("path", { d: "M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480t-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77 77 114T840-480t-28.5 140.5-77 114-114 77T480-120m112-192L440-464v-216h80v184l128 128z" }, null, -1)
  ]));
}
const Xu = { render: Gu }, Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function Ju(e, t) {
  return A(), R("svg", Ku, t[0] || (t[0] = [
    x("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm320-280 320-200v-80L480-520 160-720v80z" }, null, -1)
  ]));
}
const Zu = { render: Ju }, Qu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function ef(e, t) {
  return A(), R("svg", Qu, t[0] || (t[0] = [
    x("path", { d: "M160-120v-480l320-240 320 240v480H560v-280H400v280z" }, null, -1)
  ]));
}
const tf = { render: ef }, nf = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function of(e, t) {
  return A(), R("svg", nf, t[0] || (t[0] = [
    x("path", { d: "M120-120v-560h240v-80l120-120 120 120v240h240v400zm80-80h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 320h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm0-160h80v-80h-80zm240 480h80v-80h-80zm0-160h80v-80h-80z" }, null, -1)
  ]));
}
const rf = { render: of }, sf = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 -960 960 960"
};
function af(e, t) {
  return A(), R("svg", sf, t[0] || (t[0] = [
    x("path", { d: "M798-120q-125 0-247-54.5T329-329 174.5-551 120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12" }, null, -1)
  ]));
}
const lf = { render: af }, cf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Add: au,
  ArrowForward: du,
  Check: mu,
  CheckCycle: gu,
  CreditCard: yu,
  DateRange: xu,
  Email: Zu,
  ExpandLess: ku,
  ExpandMore: Ou,
  Home: tf,
  Hotel: rf,
  Info: Lu,
  People: $u,
  Person: Mu,
  PersonOutline: zu,
  Persons: qu,
  Phone: lf,
  Restaurant: Yu,
  Restore: Xu
}, Symbol.toStringTag, { value: "Module" })), Ie = {
  __name: "BflexIcon",
  props: {
    name: { type: String, required: !0 },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, n = Ne(() => cf[t.name] || null);
    return (i, o) => (A(), ce(Os(n.value), Mi(i.$attrs, {
      class: ["icon", e.small ? "icon--small" : ""]
    }), null, 16, ["class"]));
  }
}, df = {
  key: 0,
  class: "icons"
}, uf = {
  key: 1,
  class: "scenario-text"
}, ff = ["title"], mf = {
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
    const { t } = $e();
    return (n, i) => e.kind === "adults" ? (A(), R("div", df, [
      rt(M(Ie, {
        title: W(t)("ratePlan.scenario.mainBeds"),
        name: "Person"
      }, null, 8, ["title"]), [
        [gi, e.main === 2]
      ]),
      rt(x("i", null, [
        M(Ie, {
          name: "Person",
          title: W(t)("ratePlan.scenario.mainBeds")
        }, null, 8, ["title"]),
        le(B(e.main), 1)
      ], 512), [
        [gi, e.main > 2]
      ]),
      M(Ie, {
        name: "Person",
        title: W(t)("ratePlan.scenario.mainBeds")
      }, null, 8, ["title"]),
      e.extraBed ? (A(), R(de, { key: 0 }, [
        M(Ie, { name: "Add" }, {
          default: H(() => i[0] || (i[0] = [
            le("add")
          ])),
          _: 1
        }),
        M(Ie, {
          name: "PersonOutline",
          title: W(t)("ratePlan.scenario.extraBeds")
        }, null, 8, ["title"])
      ], 64)) : _e("", !0)
    ])) : e.kind === "child" ? (A(), R("span", uf, B(W(t)("ratePlan.scenario.family")), 1)) : (A(), R("div", {
      key: 2,
      class: "icons",
      title: W(t)("ratePlan.scenario.mainExtraBeds")
    }, [
      M(Ie, { name: "People" }),
      M(Ie, { name: "Add" }),
      M(Ie, { name: "PeopleOutline" })
    ], 8, ff));
  }
}, pf = { class: "cycle-loader" }, hf = {
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
    const t = e, { color: n, size: i, margin: o, radius: s } = As(t), a = Ne(() => ({
      backgroundColor: n.value,
      width: i.value,
      height: i.value,
      margin: o.value,
      borderRadius: s.value,
      display: "inline-block",
      animationName: "v-pulseStretchDelay",
      animationDuration: "0.75s",
      animationIterationCount: "infinite",
      animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
      animationFillMode: "both"
    })), d = Ne(() => ({ animationDelay: "0.12s" })), f = Ne(() => ({ animationDelay: "0.24s" })), m = Ne(() => ({ animationDelay: "0.36s" }));
    return (v, g) => (A(), R("div", pf, [
      x("div", {
        style: Dt([a.value, d.value])
      }, null, 4),
      x("div", {
        style: Dt([a.value, f.value])
      }, null, 4),
      x("div", {
        style: Dt([a.value, m.value])
      }, null, 4)
    ]));
  }
}, gf = ["disabled"], _f = {
  __name: "BflexButton",
  props: {
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => (A(), R("button", {
      class: "button",
      disabled: e.disabled
    }, [
      e.loading ? (A(), ce(hf, {
        key: 0,
        size: "10px",
        color: "#fff"
      })) : ge(t.$slots, "default", { key: 1 })
    ], 8, gf));
  }
}, vf = { class: "rate-plan-card" }, yf = { class: "rate-plan-card__wrapper" }, bf = { class: "rate-plan-card__description" }, wf = { class: "rate-plan-card__offers" }, xf = { class: "rate-plan-card__offers-item" }, Ef = ["title"], Tf = { class: "rate-plan-card__offers-item" }, kf = { style: { "margin-right": "0.375rem" } }, Sf = {
  key: 0,
  style: { margin: "0 0.375rem" }
}, Nf = { class: "rate-plan-card__actions" }, Of = { class: "rate-plan-card__variants" }, Af = { class: "length-of-stay" }, Cf = {
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
    const n = e, { t: i } = $e(), o = ye(!1), s = ye({}), a = Ne(() => {
      var v;
      return ((v = n.data.feed) == null ? void 0 : v.name) !== "ROOM_ONLY";
    }), d = t, f = (v, g) => {
      s.value[g] || (s.value[g] = !0, d("variant-chosen", v));
    }, { formatDescription: m } = as();
    return (v, g) => (A(), R("div", vf, [
      x("div", yf, [
        x("div", bf, [
          x("h2", {
            onClick: g[0] || (g[0] = (p) => o.value = !o.value),
            class: "rate-plan-card__title cursor-pointer"
          }, [
            le(B(e.data.name) + " ", 1),
            M(Ie, {
              name: o.value ? "ExpandLess" : "ExpandMore"
            }, null, 8, ["name"])
          ]),
          rt(x("blockquote", null, B(e.data.description), 513), [
            [gi, o.value]
          ]),
          x("div", wf, [
            x("div", xf, [
              M(Ie, { name: "Restore" }),
              M(Ri, { class: "inline" }, {
                popper: H(() => [
                  (A(!0), R(de, null, Oe(W(m)(e.data.cancellationPolicy.consequences), (p, w) => (A(), R("p", { key: w }, B(p), 1))), 128))
                ]),
                default: H(() => [
                  x("abbr", null, B(e.data.cancellationPolicy.name || ""), 1)
                ]),
                _: 1
              })
            ]),
            e.data.feed ? (A(), R("div", {
              key: 0,
              class: ot(["rate-plan-card__offers-item", { "feed-offer": a.value }]),
              title: e.data.feed.description
            }, [
              M(Ie, { name: "Restaurant" }),
              x("span", null, B(e.data.feed.name ? W(i)(`ratePlan.boardType.${e.data.feed.name}`) : ""), 1)
            ], 10, Ef)) : _e("", !0),
            x("div", Tf, [
              M(Ie, { name: "CreditCard" }),
              x("span", null, [
                x("strong", kf, B(W(i)("ratePlan.payments")) + ":", 1),
                (A(!0), R(de, null, Oe(e.data.paymentTypes, (p, w) => (A(), R(de, {
                  key: p.name
                }, [
                  M(Ri, { class: "inline" }, {
                    popper: H(() => [
                      le(B(p.description), 1)
                    ]),
                    default: H(() => [
                      x("abbr", null, B(p.name), 1)
                    ]),
                    _: 2
                  }, 1024),
                  e.data.paymentTypes.length - 1 !== w ? (A(), R("strong", Sf, B(W(i)("ratePlan.or")), 1)) : _e("", !0)
                ], 64))), 128))
              ])
            ]),
            e.data.extras.length ? (A(!0), R(de, { key: 1 }, Oe(e.data.extras, (p, w) => (A(), R("div", {
              key: w,
              class: "rate-plan-card__offers-item extra-offer",
              style: Dt({ color: p.color })
            }, [
              M(Ie, { name: "Check" }, {
                default: H(() => g[1] || (g[1] = [
                  le("credit_card")
                ])),
                _: 1
              }),
              x("span", null, B(p.name), 1)
            ], 4))), 128)) : _e("", !0)
          ])
        ])
      ]),
      x("div", Nf, [
        ge(v.$slots, "default", {}, () => [
          x("div", Of, [
            x("span", Af, B(W(i)("ratePlan.los", e.lengthOfStay)), 1),
            (A(!0), R(de, null, Oe(e.data.variations || [], (p, w) => (A(), ce(iu, {
              key: w,
              price: p.price
            }, {
              icons: H(() => [
                M(mf, {
                  kind: p.occupancyOptions.kind,
                  main: p.occupancyOptions.main,
                  "extra-bed": p.occupancyOptions.extraBed
                }, null, 8, ["kind", "main", "extra-bed"])
              ]),
              default: H(() => [
                M(_f, {
                  loading: s.value[w],
                  disabled: e.disabled && !s.value[w],
                  onClick: () => f(p, w)
                }, {
                  default: H(() => [
                    le(B(W(i)("ratePlan.action")), 1)
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
}, Lf = { class: "rate-plan-list__wrapper" }, If = {
  __name: "BflexAccommodationOfferCard",
  props: {
    accommodationOffer: { type: Object, required: !0 },
    lengthOfStay: { type: Number, required: !0 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["accommodationOfferChosen"],
  setup(e, { emit: t }) {
    const n = t, i = (o, s, a) => {
      n("accommodationOfferChosen", {
        accommodationOffer: o,
        ratePlan: s,
        variant: a
      });
    };
    return (o, s) => (A(), ce(_t, { class: "accommodation-offer" }, {
      default: H(() => [
        M(Gc, {
          data: e.accommodationOffer.accommodationType
        }, null, 8, ["data"]),
        x("div", Lf, [
          x("div", {
            class: ot(["rate-plan-list", { "rate-plan-list--single": e.accommodationOffer.ratePlans.length <= 1 }])
          }, [
            (A(!0), R(de, null, Oe(e.accommodationOffer.ratePlans, (a) => (A(), R(de, {
              key: a.id
            }, [
              M(Fe),
              M(Cf, {
                data: a,
                "length-of-stay": e.lengthOfStay,
                disabled: e.loading,
                onVariantChosen: (d) => i(e.accommodationOffer, a, d)
              }, null, 8, ["data", "length-of-stay", "disabled", "onVariantChosen"])
            ], 64))), 128))
          ], 2)
        ])
      ]),
      _: 1
    }));
  }
}, Pf = {}, $f = { class: "information-block-grid" };
function Df(e, t) {
  return A(), R("div", $f, [
    ge(e.$slots, "default")
  ]);
}
const li = /* @__PURE__ */ Rn(Pf, [["render", Df]]), Rf = {
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
    const n = e, i = Ne(() => !n.dateRange.start || !n.dateRange.end ? 0 : Hr(n.dateRange.start, n.dateRange.end)), o = ye([]), s = ye(!1), { setError: a } = Mt("globalError");
    Ze(
      () => n.dateRange,
      async (v) => {
        if (!(!v.start || !v.end)) {
          s.value = !0;
          try {
            const g = await Fs(v.start, v.end, n.promoCode);
            o.value = g.searchResults;
          } catch (g) {
            a(g);
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
    const d = t, f = ye(!1), m = async ({ accommodationOffer: v, ratePlan: g, variant: p }) => {
      f.value = !0;
      try {
        const w = await cr({
          checkInDate: n.dateRange.start,
          checkOutDate: n.dateRange.end,
          accommodationType: v.accommodationType.id,
          ratePlan: g.id,
          adults: p.occupancyOptions.main + (p.occupancyOptions.extraBed ? 1 : 0),
          children: [],
          quantity: 1
        });
        d("released", { action: yn, cart: w.cart });
      } catch (w) {
        a(w);
      } finally {
        f.value = !1;
      }
    };
    return (v, g) => (A(), ce(li, null, {
      default: H(() => [
        s.value ? (A(), R(de, { key: 0 }, Oe(3, (p) => M(ii, { key: p })), 64)) : (A(!0), R(de, { key: 1 }, Oe(o.value, (p) => (A(), ce(If, {
          "accommodation-offer": p,
          "length-of-stay": i.value,
          loading: f.value,
          key: p.accommodationType.id,
          onAccommodationOfferChosen: m
        }, null, 8, ["accommodation-offer", "length-of-stay", "loading"]))), 128))
      ]),
      _: 1
    }));
  }
}, Mf = { class: "field-decorator" }, Ff = { class: "field-decorator__input-group" }, Bf = { class: "field-decorator__label" }, zf = {
  key: 0,
  class: "field-decorator__required"
}, Vf = { class: "field-decorator__slot" }, Uf = {
  key: 0,
  class: "field-decorator__hint"
}, Zt = {
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
    return (t, n) => (A(), R("div", Mf, [
      x("div", Ff, [
        x("label", Bf, [
          le(B(e.label), 1),
          e.required ? (A(), R("span", zf, "*")) : _e("", !0)
        ]),
        x("div", Vf, [
          ge(t.$slots, "default")
        ])
      ]),
      e.hideHint ? _e("", !0) : (A(), R("div", Uf, B(e.hint), 1))
    ]));
  }
}, qf = {}, Hf = { class: "information-block__content" };
function Wf(e, t) {
  return A(), R("div", Hf, [
    ge(e.$slots, "default")
  ]);
}
const He = /* @__PURE__ */ Rn(qf, [["render", Wf]]), Yf = { class: "information-block__header-additional" }, an = {
  __name: "BflexHeader",
  props: {
    dense: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, i) => (A(), R("header", {
      class: ot({ dense: t.dense })
    }, [
      x("span", null, [
        ge(n.$slots, "default")
      ]),
      x("span", Yf, [
        ge(n.$slots, "additional")
      ])
    ], 2));
  }
}, jf = { class: "details-info" }, Gf = { class: "details-info__icon" }, Xf = {
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
    return (t, n) => (A(), R("div", jf, [
      x("div", Gf, [
        e.hideIcon ? _e("", !0) : (A(), ce(Ie, {
          key: 0,
          name: e.icon
        }, null, 8, ["name"]))
      ]),
      ge(t.$slots, "default")
    ]));
  }
}, Kf = {
  id: "customer-data-form",
  class: "customer-data-form"
}, Jf = {
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
    const n = e, { t: i } = $e(), o = t, s = _i({ ...n.modelValue }), a = _i({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }), d = (f) => {
      const m = f.target;
      a[m.name] = m.validity.valid ? "" : m.validationMessage;
    };
    return Ze(
      s,
      (f) => {
        o("update:modelValue", f);
      },
      { deep: !0 }
    ), (f, m) => (A(), ce(_t, null, {
      default: H(() => [
        M(an, null, {
          default: H(() => [
            le(B(W(i)("contactInformation.title")), 1)
          ]),
          _: 1
        }),
        M(Fe),
        M(He, null, {
          default: H(() => [
            x("section", Kf, [
              M(Zt, {
                label: W(i)("contactInformation.firstName"),
                required: "",
                hint: a.firstName,
                class: ot({ "form-group--error": a.firstName })
              }, {
                default: H(() => [
                  rt(x("input", {
                    "onUpdate:modelValue": m[0] || (m[0] = (v) => s.firstName = v),
                    type: "text",
                    name: "firstName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: m[1] || (m[1] = (v) => d(v))
                  }, null, 544), [
                    [
                      vn,
                      s.firstName,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"]),
              M(Zt, {
                label: W(i)("contactInformation.lastName"),
                required: "",
                hint: a.lastName,
                class: ot({ "form-group--error": a.lastName })
              }, {
                default: H(() => [
                  rt(x("input", {
                    "onUpdate:modelValue": m[2] || (m[2] = (v) => s.lastName = v),
                    type: "text",
                    name: "lastName",
                    minlength: "2",
                    maxlength: "50",
                    required: "",
                    onInput: m[3] || (m[3] = (v) => d(v))
                  }, null, 544), [
                    [
                      vn,
                      s.lastName,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"]),
              M(Zt, {
                label: W(i)("contactInformation.email"),
                required: "",
                hint: a.email,
                class: ot({ "form-group--error": a.email })
              }, {
                default: H(() => [
                  rt(x("input", {
                    "onUpdate:modelValue": m[4] || (m[4] = (v) => s.email = v),
                    type: "email",
                    name: "email",
                    maxlength: "100",
                    required: "",
                    onInput: m[5] || (m[5] = (v) => d(v))
                  }, null, 544), [
                    [
                      vn,
                      s.email,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"]),
              M(Zt, {
                label: W(i)("contactInformation.phoneNumber"),
                hint: a.phone,
                class: ot({ "form-group--error": a.phone })
              }, {
                default: H(() => [
                  rt(x("input", {
                    "onUpdate:modelValue": m[6] || (m[6] = (v) => s.phone = v),
                    type: "tel",
                    name: "phone",
                    minlength: "7",
                    maxlength: "100",
                    onInput: m[7] || (m[7] = (v) => d(v))
                  }, null, 544), [
                    [
                      vn,
                      s.phone,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                _: 1
              }, 8, ["label", "hint", "class"])
            ]),
            M(Xf, { icon: "Info" }, {
              default: H(() => [
                le(B(W(i)("contactInformation.confirmationInfo")), 1)
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
}, Zf = { class: "icon-text" }, Qf = { class: "icon-text__icon" }, em = { class: "icon-text__text" }, Qt = {
  __name: "BflexIconText",
  props: {
    icon: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    return (t, n) => (A(), R("div", Zf, [
      x("span", Qf, [
        M(Ie, { name: e.icon }, null, 8, ["name"])
      ]),
      x("span", em, [
        ge(t.$slots, "default")
      ])
    ]));
  }
}, tm = { class: "text-sm" }, nm = { class: "accommodation-list__item" }, im = {
  key: 0,
  style: { "font-size": "0.9em", opacity: "0.7" }
}, om = {
  class: "text-sm",
  style: { "line-height": "1.25", "font-weight": "lighter" }
}, rm = ["onClick"], sm = {
  key: 1,
  style: { opacity: "0.7" }
}, am = {
  key: 0,
  class: "payment-type"
}, lm = { class: "payment-type__label" }, cm = { class: "payment-type__variants" }, dm = ["for"], um = ["name", "id", "value", "checked", "onChange"], fm = { class: "accommodation-list__total" }, mm = { class: "accommodation-list__payment-rules" }, pm = { style: { color: "orangered" } }, hm = { style: { color: "orangered" } }, ls = {
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
    const n = e, { t: i } = $e(), o = t, { formatDescription: s } = as(), a = (m, v) => {
      o("changePaymentType", { request: m, paymentType: v });
    }, d = (m) => {
      o("deleteAccommodationRequest", {
        checkInDate: m.checkInDate,
        checkOutDate: m.checkOutDate,
        accommodationType: m.accommodationType.id,
        ratePlan: m.ratePlan.id,
        adults: m.adults,
        children: m.children,
        quantity: 0
      });
    }, f = ye({});
    return rn(() => {
      Object.keys(n.items).forEach((m) => {
        f.value[m] = n.items[m].paymentType.id;
      });
    }), (m, v) => e.loading ? (A(), ce(ii, {
      key: 0,
      "is-result": ""
    })) : (A(), ce(_t, {
      key: 1,
      class: "accommodation-list"
    }, {
      default: H(() => [
        M(an, null, {
          default: H(() => [
            le(B(W(i)("chosenAccommodation.title")), 1)
          ]),
          _: 1
        }),
        M(Fe),
        (A(!0), R(de, null, Oe(e.items, (g, p, w) => (A(), R(de, { key: w }, [
          M(He, null, {
            default: H(() => [
              x("dl", tm, [
                x("dt", null, [
                  M(Qt, { icon: "DateRange" }, {
                    default: H(() => [
                      le(B(W($c)(g.checkInDate, g.checkOutDate, e.locale)), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                x("dd", null, [
                  M(Qt, { icon: "Persons" }, {
                    default: H(() => [
                      le(B(W(i)("chosenAccommodation.adults", g.adults)) + ", " + B(W(i)("chosenAccommodation.children", g.children.length)), 1)
                    ]),
                    _: 2
                  }, 1024)
                ])
              ])
            ]),
            _: 2
          }, 1024),
          M(Fe),
          M(He, null, {
            default: H(() => [
              x("dl", nm, [
                x("dt", null, [
                  x("h3", null, [
                    le(B(g.accommodationType.name) + " ", 1),
                    g.quantity > 1 ? (A(), R("span", im, "x" + B(g.quantity), 1)) : _e("", !0)
                  ]),
                  x("div", om, [
                    le(B(g.ratePlan.name), 1),
                    v[0] || (v[0] = x("br", null, null, -1)),
                    M(Ri, { class: "inline" }, {
                      popper: H(() => [
                        (A(!0), R(de, null, Oe(W(s)(g.cancellationPolicy.consequences), (T, k) => (A(), R("p", { key: k }, B(T), 1))), 128))
                      ]),
                      default: H(() => [
                        x("abbr", null, B(g.cancellationPolicy.name || ""), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                x("dd", null, [
                  e.dummy ? _e("", !0) : (A(), R("div", {
                    key: 0,
                    onClick: () => d(g),
                    class: "accommodation-list__item-delete text-sm cursor-pointer"
                  }, B(W(i)("chosenAccommodation.delete")), 9, rm)),
                  g.quantity > 1 ? (A(), R("span", sm, B(g.quantity) + " x", 1)) : _e("", !0),
                  le(" " + B(g.summary.total) + " " + B(e.currency), 1)
                ])
              ]),
              e.dummy ? _e("", !0) : (A(), R("div", am, [
                x("div", lm, B(W(i)("chosenAccommodation.willPay")) + ":", 1),
                x("div", cm, [
                  (A(!0), R(de, null, Oe(g.availablePaymentTypes, (T) => (A(), R("label", {
                    key: T.id,
                    for: `payment-type-${w}-${g.ratePlan.id}-${T.id}`
                  }, [
                    x("input", {
                      type: "radio",
                      name: `payment-type-${w}`,
                      id: `payment-type-${w}-${g.ratePlan.id}-${T.id}`,
                      value: f.value[p],
                      checked: +f.value[p] == +T.id,
                      onChange: () => a(p, T.id)
                    }, null, 40, um),
                    le(" " + B(T.name), 1)
                  ], 8, dm))), 128))
                ])
              ]))
            ]),
            _: 2
          }, 1024),
          M(Fe)
        ], 64))), 128)),
        M(He, null, {
          default: H(() => [
            x("dl", fm, [
              x("dt", null, B(W(i)("chosenAccommodation.totalAmount")) + ":", 1),
              x("dd", null, [
                x("strong", null, [
                  x("span", null, B(e.summary.total), 1),
                  le(" " + B(e.currency), 1)
                ])
              ])
            ])
          ]),
          _: 1
        }),
        M(Fe),
        M(He, null, {
          default: H(() => [
            x("dl", mm, [
              x("dt", pm, B(W(i)("chosenAccommodation.prepaymentAmount")) + ":", 1),
              x("dd", hm, B(e.payment.prepayment) + " " + B(e.currency), 1),
              x("dt", null, B(W(i)("chosenAccommodation.onArrivalAmount")) + ":", 1),
              x("dd", null, [
                x("span", null, B(e.payment.onArrival), 1),
                le(" " + B(e.currency), 1)
              ])
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, gm = { class: "summary-block" }, _m = { class: "summary-block__content" }, vm = { class: "summary-block__content-info" }, ym = { class: "summary-block__content-info__price" }, bm = { class: "summary-block__content-info__text" }, wm = {
  class: "button",
  type: "submit"
}, xm = {
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
    const { t: n } = $e(), i = t;
    return (o, s) => (A(), R("div", gm, [
      x("div", _m, [
        x("div", vm, [
          x("div", ym, [
            x("span", null, B(e.totalAmount), 1),
            le(" " + B(e.currency), 1)
          ]),
          x("div", bm, [
            le(B(W(n)("summary.room", e.accommodationUnits)) + ", " + B(W(n)("summary.los", e.lengthOfStay)) + " ", 1),
            M(Ie, {
              onClick: s[0] || (s[0] = Cs((a) => i("onAccommodationSummaryClick"), ["stop"])),
              class: "accommodation-summary-trigger",
              name: "Info",
              small: ""
            })
          ])
        ]),
        x("button", wm, B(W(n)("summary.complete")), 1)
      ])
    ]));
  }
}, Em = { class: "text-sm" }, Tm = {
  value: "none",
  selected: ""
}, km = ["value"], Sm = {
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
    const n = e, { t: i } = $e(), o = t, s = _i({ ...n.modelValue }), a = Dc("00:00", "23:00");
    return Ze(
      s,
      (d) => {
        o("update:modelValue", d);
      },
      { deep: !0 }
    ), (d, f) => (A(), ce(_t, { class: "customer-request-block" }, {
      default: H(() => [
        M(an, null, {
          default: H(() => [
            le(B(W(i)("customerRequest.title")), 1)
          ]),
          _: 1
        }),
        M(Fe),
        M(He, null, {
          default: H(() => [
            M(Zt, {
              label: W(i)("customerRequest.comment")
            }, {
              default: H(() => [
                rt(x("textarea", {
                  "onUpdate:modelValue": f[0] || (f[0] = (m) => s.comment = m),
                  name: "comment",
                  rows: "3",
                  maxlength: "500"
                }, null, 512), [
                  [vn, s.comment]
                ])
              ]),
              _: 1
            }, 8, ["label"])
          ]),
          _: 1
        }),
        M(Fe),
        M(He, null, {
          default: H(() => [
            x("dl", Em, [
              x("dt", null, B(W(i)("customerRequest.checkInOutTime")) + ":", 1),
              x("dd", null, B(W(i)("customerRequest.checkInTimeFrom")) + ": " + B(e.arrivalPolicy.checkInTime) + "; " + B(W(i)("customerRequest.checkOutTimeUntil")) + ": " + B(e.arrivalPolicy.checkOutTime), 1)
            ])
          ]),
          _: 1
        }),
        M(Fe),
        M(He, null, {
          default: H(() => [
            M(Zt, {
              label: W(i)("customerRequest.arrivalTime"),
              style: { width: "50%" }
            }, {
              default: H(() => [
                rt(x("select", {
                  name: "arrivalTime",
                  "onUpdate:modelValue": f[1] || (f[1] = (m) => s.arrivalTime = m)
                }, [
                  x("option", Tm, B(W(i)("customerRequest.noneTime")), 1),
                  (A(!0), R(de, null, Oe(W(a), (m) => (A(), R("option", {
                    value: m,
                    key: m
                  }, B(m), 9, km))), 128))
                ], 512), [
                  [Ls, s.arrivalTime]
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
}, Nm = { class: "custom-checkbox" }, Om = ["required"], rr = {
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
    const n = e, i = t, o = Ne({
      get: () => n.modelValue,
      set: (s) => i("update:modelValue", s)
    });
    return (s, a) => (A(), R("label", Nm, [
      rt(x("input", {
        type: "checkbox",
        "onUpdate:modelValue": a[0] || (a[0] = (d) => o.value = d),
        required: e.required
      }, null, 8, Om), [
        [Is, o.value]
      ]),
      a[1] || (a[1] = x("span", { class: "custom-checkbox__box" }, null, -1)),
      ge(s.$slots, "default")
    ]));
  }
}, Am = { class: "agreement-rules-list__rules" }, Cm = { class: "agreement-rules-list__agreements" }, Lm = {
  key: 0,
  class: "agreement-rules-list__agreements-item"
}, Im = ["href"], Pm = {
  key: 0,
  class: "agreement-rules-list__agreements-item"
}, $m = ["href"], Dm = {
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
    const t = e, { t: n } = $e(), i = Ne(() => t.agreements.filter((a) => a.combined)), o = ye(!1), s = ye(t.agreements.map(() => !1));
    return (a, d) => (A(), ce(_t, { class: "agreement-rules-list" }, {
      default: H(() => [
        M(an, null, {
          default: H(() => [
            le(B(W(n)("accommodationRules.title")), 1)
          ]),
          _: 1
        }),
        e.rules.length > 0 ? (A(), R(de, { key: 0 }, [
          M(Fe),
          M(He, null, {
            default: H(() => [
              x("ul", Am, [
                (A(!0), R(de, null, Oe(e.rules, (f, m) => (A(), R("li", { key: m }, B(f.text), 1))), 128))
              ])
            ]),
            _: 1
          })
        ], 64)) : _e("", !0),
        M(Fe),
        M(He, null, {
          default: H(() => [
            x("div", Cm, [
              i.value.length > 0 ? (A(), R("div", Lm, [
                M(rr, {
                  modelValue: o.value,
                  "onUpdate:modelValue": d[0] || (d[0] = (f) => o.value = f),
                  required: ""
                }, {
                  default: H(() => [
                    x("span", null, [
                      le(B(W(n)("accommodationRules.agreementSentence")) + " ", 1),
                      (A(!0), R(de, null, Oe(i.value, (f, m) => (A(), R("a", {
                        class: "agreement-rules-list__combined-agreement",
                        target: "_blank",
                        href: f.url,
                        key: m
                      }, B(f.anchor), 9, Im))), 128)),
                      d[1] || (d[1] = le("."))
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ])) : _e("", !0),
              (A(!0), R(de, null, Oe(e.agreements, (f, m) => (A(), R(de, { key: m }, [
                f.combined === !1 ? (A(), R("div", Pm, [
                  M(rr, {
                    modelValue: s.value[m],
                    "onUpdate:modelValue": (v) => s.value[m] = v,
                    required: f.required
                  }, {
                    default: H(() => [
                      x("span", null, [
                        le(B(W(n)("accommodationRules.agreementSentenceShort")) + " ", 1),
                        x("a", {
                          target: "_blank",
                          href: f.url
                        }, B(f.anchor), 9, $m)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "required"])
                ])) : _e("", !0)
              ], 64))), 128))
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, Rm = {
  __name: "ConfirmationPage",
  emits: ["released"],
  setup(e, { emit: t }) {
    const n = ye({
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
    }), i = t, o = async ({
      checkInDate: T,
      checkOutDate: k,
      accommodationType: P,
      ratePlan: b,
      adults: E,
      children: L,
      quantity: N
    }) => {
      f.value = !0;
      try {
        const $ = await cr({
          checkInDate: T,
          checkOutDate: k,
          accommodationType: P,
          ratePlan: b,
          adults: E,
          children: L,
          quantity: N
        });
        m.value = $.cart, $.cart.requests.length === 0 && i("released", { action: qr, result: $ });
      } catch ($) {
        v($);
      } finally {
        f.value = !1;
      }
    }, s = ye(null), a = Mt("settings"), d = async (T) => {
      if (T.preventDefault(), s.value.reportValidity()) {
        f.value = !0;
        try {
          const k = await Vs({
            customer: {
              ...n.value.customerInfo
            },
            comment: n.value.comment,
            arrivalTime: n.value.arrivalTime
          });
          k && k.reservations && i("released", { action: bn, result: k });
        } catch (k) {
          v(k);
        } finally {
          f.value = !1;
        }
      }
    }, f = ye(!0), m = ye(null), { setError: v } = Mt("globalError");
    rn(async () => {
      f.value = !0;
      try {
        const T = await Bs();
        m.value = T.cart;
      } catch (T) {
        v(T);
      } finally {
        f.value = !1;
      }
    });
    const g = async (T) => {
      try {
        const k = await zs(T);
        m.value = k.cart;
      } catch (k) {
        v(k);
      }
    }, p = Ne(() => !m.value || !m.value.requests || Object.keys(m.value.requests).length === 0 ? 0 : Object.keys(m.value.requests).reduce((T, k) => {
      const P = m.value.requests[k];
      return T + P.quantity;
    }, 0)), w = Ne(() => !m.value || !m.value.requests || Object.keys(m.value.requests).length === 0 ? 0 : Hr(
      m.value.requests[Object.keys(m.value.requests)[0]].checkInDate,
      m.value.requests[Object.keys(m.value.requests)[0]].checkOutDate
    ));
    return (T, k) => (A(), R("form", {
      onSubmit: d,
      ref_key: "confirmForm",
      ref: s
    }, [
      M(li, null, {
        default: H(() => [
          M(Jf, {
            modelValue: n.value.customerInfo,
            "onUpdate:modelValue": k[0] || (k[0] = (P) => n.value.customerInfo = P)
          }, null, 8, ["modelValue"]),
          m.value ? (A(), ce(ls, {
            key: 0,
            loading: f.value,
            cart: m.value,
            currency: m.value.currency,
            locale: W(a).widget.locale,
            payment: m.value.payment,
            summary: m.value.summary,
            items: m.value.requests,
            onChangePaymentType: g,
            onDeleteAccommodationRequest: o
          }, null, 8, ["loading", "cart", "currency", "locale", "payment", "summary", "items"])) : _e("", !0),
          M(Sm, {
            modelValue: n.value.customerRequest,
            "onUpdate:modelValue": k[1] || (k[1] = (P) => n.value.customerRequest = P)
          }, null, 8, ["modelValue"]),
          M(Dm, {
            agreements: W(a).hotelRules.agreements,
            rules: W(a).hotelRules.rules
          }, null, 8, ["agreements", "rules"]),
          !f.value && m.value ? (A(), ce(xm, {
            key: 1,
            "total-amount": m.value.summary.total,
            currency: m.value.currency,
            "accommodation-units": p.value,
            "length-of-stay": w.value
          }, null, 8, ["total-amount", "currency", "accommodation-units", "length-of-stay"])) : _e("", !0)
        ]),
        _: 1
      })
    ], 544));
  }
}, Mm = { class: "hotel-information" }, Fm = ["href"], Bm = { href: "#" }, zm = {
  __name: "BflexHotelInformationCard",
  props: {
    hotelInfo: {
      type: Object
    }
  },
  setup(e) {
    const { t } = $e();
    return (n, i) => (A(), ce(_t, null, {
      default: H(() => [
        M(an, null, {
          default: H(() => [
            le(B(W(t)("reservation.hotelInfo.title")), 1)
          ]),
          _: 1
        }),
        M(Fe),
        M(He, null, {
          default: H(() => [
            x("div", Mm, [
              M(Qt, { icon: "Hotel" }, {
                default: H(() => [
                  le(B(e.hotelInfo.name), 1)
                ]),
                _: 1
              }),
              M(Qt, { icon: "Home" }, {
                default: H(() => [
                  le(B(e.hotelInfo.address.address), 1)
                ]),
                _: 1
              }),
              M(Qt, { icon: "Phone" }, {
                default: H(() => [
                  x("a", {
                    href: `tel:${e.hotelInfo.phone}`
                  }, B(e.hotelInfo.phone), 9, Fm)
                ]),
                _: 1
              }),
              M(Qt, { icon: "Email" }, {
                default: H(() => [
                  x("a", Bm, B(e.hotelInfo.email), 1)
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
}, Vm = { class: "reservation-result" }, Um = { class: "reservation-result__title" }, qm = { class: "reservation-result__description" }, Hm = {
  __name: "ResultPage",
  props: {
    sid: {
      type: String,
      required: !0,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = $e(), i = Mt("settings"), o = ye(null), s = ye(!0), { setError: a } = Mt("globalError"), d = async () => {
      if (t.sid) {
        s.value = !0;
        try {
          const f = await Us({ sid: t.sid });
          o.value = f.reservations;
        } catch (f) {
          a(f);
        } finally {
          s.value = !1;
        }
      }
    };
    return Ze(() => t.sid, d), rn(d), (f, m) => (A(), ce(li, null, {
      default: H(() => [
        s.value ? (A(), ce(ii, { key: 0 })) : (A(), R(de, { key: 1 }, [
          x("section", Vm, [
            x("div", Um, B(W(n)("reservation.title")), 1),
            x("div", qm, B(W(n)("reservation.description")), 1)
          ]),
          M(ls, {
            items: o.value.reservations,
            summary: o.value.summary,
            payment: o.value.payment,
            locale: W(i).widget.locale,
            dummy: ""
          }, null, 8, ["items", "summary", "payment", "locale"]),
          o.value.note ? (A(), ce(_t, { key: 0 }, {
            default: H(() => [
              M(an, null, {
                default: H(() => [
                  le(B(W(n)("reservation.customerRequest")), 1)
                ]),
                _: 1
              }),
              M(Fe),
              M(He, null, {
                default: H(() => [
                  le(B(o.value.note), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : _e("", !0),
          M(zm, {
            "hotel-info": W(i).hotelInfo
          }, null, 8, ["hotel-info"])
        ], 64))
      ]),
      _: 1
    }));
  }
}, Wm = { id: "bflex-booking-widget" }, Ym = { class: "booking-widget" }, jm = { class: "booking-widget__content" }, cs = {
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
    const t = e, n = ye({
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
    lr("settings", n);
    const i = [yn, bn, zo], o = ye(null), s = (p) => {
      const w = i.indexOf(p);
      w >= 0 && w < i.length - 1 && (o.value = i[w + 1]);
    }, a = ye(!1), d = ye(""), f = ye({
      start: t.start,
      end: t.end,
      promoCode: t.promoCode
    });
    Ze(
      () => ({ start: t.start, end: t.end, promoCode: t.promoCode }),
      () => {
        f.value = {
          start: t.start,
          end: t.end,
          promoCode: t.promoCode
        };
      }
    ), Ze(
      f,
      (p, w) => {
        !p.start || !p.end || (!w || !w.start || !w.end || w.start !== p.start || w.end !== p.end) && window.dispatchEvent(
          new CustomEvent("bflex:booking-widget:changed", { detail: Ps(f.value) })
        );
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    const { setError: m } = Mt("globalError"), v = (p) => {
      const { start: w, end: T, promoCode: k } = p.detail;
      f.value = { start: w, end: T, promoCode: k }, p.stopPropagation();
    };
    rn(async () => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:ready")), window.addEventListener("bflex:search-bar:search", v), a.value = !0;
      try {
        const { inProgress: p, settings: w } = await Ms();
        n.value = w;
        const { widget: T } = w;
        T && T.locale && T.l10n && (Gn.global.locale.value = T.locale, Gn.global.setLocaleMessage(T.locale, T.l10n)), o.value = p ? bn : yn;
      } catch (p) {
        m(p);
      } finally {
        setTimeout(() => {
          a.value = !1;
        }, 1e3);
      }
    }), ar(() => {
      window.dispatchEvent(new CustomEvent("bflex:booking-widget:removed")), window.removeEventListener("bflex:search-bar:search", v);
    });
    const g = ({ action: p, result: w }) => {
      p === qr ? o.value = yn : (p === bn && (d.value = w.reservations[0]), s(p));
    };
    return (p, w) => (A(), R("main", Wm, [
      x("div", Ym, [
        x("section", jm, [
          a.value ? (A(), ce(li, { key: 0 }, {
            default: H(() => [
              (A(), R(de, null, Oe(3, (T) => M(ii, { key: T })), 64))
            ]),
            _: 1
          })) : _e("", !0),
          o.value === W(yn) ? (A(), ce(Rf, {
            key: 1,
            dateRange: f.value,
            promoCode: e.promoCode,
            onReleased: g
          }, null, 8, ["dateRange", "promoCode"])) : o.value === W(bn) ? (A(), ce(Rm, {
            key: 2,
            onReleased: g
          })) : o.value === W(zo) ? (A(), ce(Hm, {
            key: 3,
            sid: d.value,
            onReleased: g
          }, null, 8, ["sid"])) : _e("", !0)
        ])
      ])
    ]));
  }
}, Gm = { style: { display: "flex", "flex-direction": "column", "min-height": "300px", "justify-content": "center", "align-items": "center" } }, ds = {
  __name: "BflexErrorProvider",
  setup(e) {
    const { t } = $e(), n = ye(null);
    lr("globalError", { setError: (a) => {
      n.value = a;
    }, clearError: () => {
      n.value = null;
    } });
    const s = () => {
      location.reload();
    };
    return (a, d) => n.value ? (A(), ce(_t, { key: 1 }, {
      default: H(() => [
        M(He, null, {
          default: H(() => [
            x("section", Gm, [
              x("h1", null, B(W(t)("globalError.title")), 1),
              x("p", null, B(W(t)("globalError.description")), 1),
              x("button", {
                class: "button",
                onClick: s
              }, B(W(t)("globalError.reload")), 1)
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : ge(a.$slots, "default", { key: 0 });
  }
}, Xm = '@charset "UTF-8";.glightbox-container{width:100%;height:100%;position:fixed;top:0;left:0;z-index:999999!important;overflow:hidden;-ms-touch-action:none;touch-action:none;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;outline:none}.glightbox-container.inactive{display:none}.glightbox-container .gcontainer{position:relative;width:100%;height:100%;z-index:9999;overflow:hidden}.glightbox-container .gslider{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease;height:100%;left:0;top:0;width:100%;position:relative;overflow:hidden;display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}.glightbox-container .gslide{width:100%;position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;opacity:0}.glightbox-container .gslide.current{opacity:1;z-index:99999;position:relative}.glightbox-container .gslide.prev{opacity:1;z-index:9999}.glightbox-container .gslide-inner-content{width:100%}.glightbox-container .ginner-container{position:relative;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;max-width:100%;margin:auto;height:100vh}.glightbox-container .ginner-container.gvideo-container{width:100%}.glightbox-container .ginner-container.desc-bottom,.glightbox-container .ginner-container.desc-top{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.glightbox-container .ginner-container.desc-left,.glightbox-container .ginner-container.desc-right{max-width:100%!important}.gslide iframe,.gslide video{outline:none!important;border:none;min-height:165px;-webkit-overflow-scrolling:touch;-ms-touch-action:auto;touch-action:auto}.gslide:not(.current){pointer-events:none}.gslide-image{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gslide-image img{max-height:100vh;display:block;padding:0;float:none;outline:none;border:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;max-width:100vw;width:auto;height:auto;-o-object-fit:cover;object-fit:cover;-ms-touch-action:none;touch-action:none;margin:auto;min-width:200px}.desc-top .gslide-image img,.desc-bottom .gslide-image img{width:auto}.desc-left .gslide-image img,.desc-right .gslide-image img{width:auto;max-width:100%}.gslide-image img.zoomable{position:relative}.gslide-image img.dragging{cursor:-webkit-grabbing!important;cursor:grabbing!important;-webkit-transition:none;transition:none}.gslide-video{position:relative;max-width:100vh;width:100%!important}.gslide-video .plyr__poster-enabled.plyr--loading .plyr__poster{display:none}.gslide-video .gvideo-wrapper{width:100%;margin:auto}.gslide-video:before{content:"";position:absolute;width:100%;height:100%;background:#ff000057;display:none}.gslide-video.playing:before{display:none}.gslide-video.fullscreen{max-width:100%!important;min-width:100%;height:75vh}.gslide-video.fullscreen video{max-width:100%!important;width:100%!important}.gslide-inline{background:#fff;text-align:left;max-height:calc(100vh - 40px);overflow:auto;max-width:100%;margin:auto}.gslide-inline .ginlined-content{padding:20px;width:100%}.gslide-inline .dragging{cursor:-webkit-grabbing!important;cursor:grabbing!important;-webkit-transition:none;transition:none}.ginlined-content{overflow:auto;display:block!important;opacity:1}.gslide-external{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;min-width:100%;background:#fff;padding:0;overflow:auto;max-height:75vh;height:100%}.gslide-media{display:-webkit-box;display:-ms-flexbox;display:flex;width:auto}.zoomed .gslide-media{-webkit-box-shadow:none!important;box-shadow:none!important}.desc-top .gslide-media,.desc-bottom .gslide-media{margin:0 auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.gslide-description{position:relative;-webkit-box-flex:1;-ms-flex:1 0 100%;flex:1 0 100%}.gslide-description.description-left,.gslide-description.description-right{max-width:100%}.gslide-description.description-bottom,.gslide-description.description-top{margin:0 auto;width:100%}.gslide-description p{margin-bottom:12px}.gslide-description p:last-child{margin-bottom:0}.zoomed .gslide-description,.glightbox-button-hidden{display:none}.glightbox-mobile .glightbox-container .gslide-description{height:auto!important;width:100%;position:absolute;bottom:0;padding:19px 11px 50px;max-width:100vw!important;-webkit-box-ordinal-group:3!important;-ms-flex-order:2!important;order:2!important;max-height:78vh;overflow:auto!important;background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0)),to(rgba(0,0,0,.75)));background:linear-gradient(to bottom,#0000,#000000bf);-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.glightbox-mobile .glightbox-container .gslide-title{color:#fff;font-size:1em}.glightbox-mobile .glightbox-container .gslide-desc{color:#a1a1a1}.glightbox-mobile .glightbox-container .gslide-desc a{color:#fff;font-weight:700}.glightbox-mobile .glightbox-container .gslide-desc *{color:inherit}.glightbox-mobile .glightbox-container .gslide-desc .desc-more{color:#fff;opacity:.4}.gdesc-open .gslide-media{-webkit-transition:opacity .5s ease;transition:opacity .5s ease;opacity:.4}.gdesc-open .gdesc-inner{padding-bottom:30px}.gdesc-closed .gslide-media{-webkit-transition:opacity .5s ease;transition:opacity .5s ease;opacity:1}.greset{-webkit-transition:all .3s ease;transition:all .3s ease}.gabsolute{position:absolute}.grelative{position:relative}.glightbox-desc{display:none!important}.glightbox-open{overflow:hidden}.gloader{height:25px;width:25px;-webkit-animation:lightboxLoader .8s infinite linear;animation:lightboxLoader .8s infinite linear;border:2px solid #fff;border-right-color:transparent;border-radius:50%;position:absolute;display:block;z-index:9999;left:0;right:0;margin:0 auto;top:47%}.goverlay{width:100%;height:calc(100vh + 1px);position:fixed;top:-1px;left:0;background:#000;will-change:opacity}.glightbox-mobile .goverlay{background:#000}.gprev,.gnext,.gclose{z-index:99999;cursor:pointer;width:26px;height:44px;border:none;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.gprev svg,.gnext svg,.gclose svg{display:block;width:25px;height:auto;margin:0;padding:0}.gprev.disabled,.gnext.disabled,.gclose.disabled{opacity:.1}.gprev .garrow,.gnext .garrow,.gclose .garrow{stroke:#fff}.gbtn.focused{outline:2px solid #0f3d81}iframe.wait-autoplay{opacity:0}.glightbox-closing .gnext,.glightbox-closing .gprev,.glightbox-closing .gclose{opacity:0!important}.glightbox-clean .gslide-description{background:#fff}.glightbox-clean .gdesc-inner{padding:22px 20px}.glightbox-clean .gslide-title{font-size:1em;font-weight:400;font-family:arial;color:#000;margin-bottom:19px;line-height:1.4em}.glightbox-clean .gslide-desc{font-size:.86em;margin-bottom:0;font-family:arial;line-height:1.4em}.glightbox-clean .gslide-video{background:#000}.glightbox-clean .gprev,.glightbox-clean .gnext,.glightbox-clean .gclose{background-color:#000000bf;border-radius:4px}.glightbox-clean .gprev path,.glightbox-clean .gnext path,.glightbox-clean .gclose path{fill:#fff}.glightbox-clean .gprev{position:absolute;top:-100%;left:30px;width:40px;height:50px}.glightbox-clean .gnext{position:absolute;top:-100%;right:30px;width:40px;height:50px}.glightbox-clean .gclose{width:35px;height:35px;top:15px;right:10px;position:absolute}.glightbox-clean .gclose svg{width:18px;height:auto}.glightbox-clean .gclose:hover{opacity:1}.gfadeIn{-webkit-animation:gfadeIn .5s ease;animation:gfadeIn .5s ease}.gfadeOut{-webkit-animation:gfadeOut .5s ease;animation:gfadeOut .5s ease}.gslideOutLeft{-webkit-animation:gslideOutLeft .3s ease;animation:gslideOutLeft .3s ease}.gslideInLeft{-webkit-animation:gslideInLeft .3s ease;animation:gslideInLeft .3s ease}.gslideOutRight{-webkit-animation:gslideOutRight .3s ease;animation:gslideOutRight .3s ease}.gslideInRight{-webkit-animation:gslideInRight .3s ease;animation:gslideInRight .3s ease}.gzoomIn{-webkit-animation:gzoomIn .5s ease;animation:gzoomIn .5s ease}.gzoomOut{-webkit-animation:gzoomOut .5s ease;animation:gzoomOut .5s ease}@-webkit-keyframes lightboxLoader{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes lightboxLoader{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes gfadeIn{0%{opacity:0}to{opacity:1}}@keyframes gfadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes gfadeOut{0%{opacity:1}to{opacity:0}}@keyframes gfadeOut{0%{opacity:1}to{opacity:0}}@-webkit-keyframes gslideInLeft{0%{opacity:0;-webkit-transform:translate3d(-60%,0,0);transform:translate3d(-60%,0,0)}to{visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@keyframes gslideInLeft{0%{opacity:0;-webkit-transform:translate3d(-60%,0,0);transform:translate3d(-60%,0,0)}to{visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@-webkit-keyframes gslideOutLeft{0%{opacity:1;visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{-webkit-transform:translate3d(-60%,0,0);transform:translate3d(-60%,0,0);opacity:0;visibility:hidden}}@keyframes gslideOutLeft{0%{opacity:1;visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{-webkit-transform:translate3d(-60%,0,0);transform:translate3d(-60%,0,0);opacity:0;visibility:hidden}}@-webkit-keyframes gslideInRight{0%{opacity:0;visibility:visible;-webkit-transform:translate3d(60%,0,0);transform:translate3d(60%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@keyframes gslideInRight{0%{opacity:0;visibility:visible;-webkit-transform:translate3d(60%,0,0);transform:translate3d(60%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@-webkit-keyframes gslideOutRight{0%{opacity:1;visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{-webkit-transform:translate3d(60%,0,0);transform:translate3d(60%,0,0);opacity:0}}@keyframes gslideOutRight{0%{opacity:1;visibility:visible;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{-webkit-transform:translate3d(60%,0,0);transform:translate3d(60%,0,0);opacity:0}}@-webkit-keyframes gzoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:1}}@keyframes gzoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:1}}@-webkit-keyframes gzoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:0}}@keyframes gzoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:0}}@media (min-width: 769px){.glightbox-container .ginner-container{width:auto;height:auto;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.glightbox-container .ginner-container.desc-top .gslide-description{-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0}.glightbox-container .ginner-container.desc-top .gslide-image,.glightbox-container .ginner-container.desc-top .gslide-image img{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.glightbox-container .ginner-container.desc-left .gslide-description{-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0}.glightbox-container .ginner-container.desc-left .gslide-image{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.gslide-image img{max-height:97vh;max-width:100%}.gslide-image img.zoomable{cursor:-webkit-zoom-in;cursor:zoom-in}.zoomed .gslide-image img.zoomable{cursor:-webkit-grab;cursor:grab}.gslide-inline{max-height:95vh}.gslide-external{max-height:100vh}.gslide-description.description-left,.gslide-description.description-right{max-width:275px}.glightbox-open{height:auto}.goverlay{background:#000000eb}.glightbox-clean .gslide-media{-webkit-box-shadow:1px 2px 9px 0px rgba(0,0,0,.65);box-shadow:1px 2px 9px #000000a6}.glightbox-clean .description-left .gdesc-inner,.glightbox-clean .description-right .gdesc-inner{position:absolute;height:100%;overflow-y:auto}.glightbox-clean .gprev,.glightbox-clean .gnext,.glightbox-clean .gclose{background-color:#00000052}.glightbox-clean .gprev:hover,.glightbox-clean .gnext:hover,.glightbox-clean .gclose:hover{background-color:#000000b3}.glightbox-clean .gprev,.glightbox-clean .gnext{top:45%}}@media (min-width: 992px){.glightbox-clean .gclose{opacity:.7;right:20px}}@media screen and (max-height: 420px){.goverlay{background:#000}}.resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}.v-popper__popper{z-index:10000;top:0;left:0;outline:none}.v-popper__popper.v-popper__popper--hidden{visibility:hidden;opacity:0;transition:opacity .15s,visibility .15s;pointer-events:none}.v-popper__popper.v-popper__popper--shown{visibility:visible;opacity:1;transition:opacity .15s}.v-popper__popper.v-popper__popper--skip-transition,.v-popper__popper.v-popper__popper--skip-transition>.v-popper__wrapper{transition:none!important}.v-popper__backdrop{position:absolute;top:0;left:0;width:100%;height:100%;display:none}.v-popper__inner{position:relative;box-sizing:border-box;overflow-y:auto}.v-popper__inner>div{position:relative;z-index:1;max-width:inherit;max-height:inherit}.v-popper__arrow-container{position:absolute;width:10px;height:10px}.v-popper__popper--arrow-overflow .v-popper__arrow-container,.v-popper__popper--no-positioning .v-popper__arrow-container{display:none}.v-popper__arrow-inner,.v-popper__arrow-outer{border-style:solid;position:absolute;top:0;left:0;width:0;height:0}.v-popper__arrow-inner{visibility:hidden;border-width:7px}.v-popper__arrow-outer{border-width:6px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{left:-2px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{left:-1px}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-outer{border-bottom-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-container{top:0}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{border-top-width:0;border-left-color:transparent!important;border-right-color:transparent!important;border-top-color:transparent!important}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-inner{top:-4px}.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-outer{top:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{top:-2px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{top:-1px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{border-left-width:0;border-left-color:transparent!important;border-top-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-inner{left:-4px}.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-outer{left:-6px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-container{right:-10px}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner,.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-outer{border-right-width:0;border-top-color:transparent!important;border-right-color:transparent!important;border-bottom-color:transparent!important}.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-inner{left:-2px}.v-popper--theme-tooltip .v-popper__inner{background:#000c;color:#fff;border-radius:6px;padding:7px 12px 6px}.v-popper--theme-tooltip .v-popper__arrow-outer{border-color:#000c}.v-popper--theme-dropdown .v-popper__inner{background:#fff;color:#000;border-radius:6px;border:1px solid #ddd;box-shadow:0 6px 30px #0000001a}.v-popper--theme-dropdown .v-popper__arrow-inner{visibility:visible;border-color:#fff}.v-popper--theme-dropdown .v-popper__arrow-outer{border-color:#ddd}:host,.booking-widget{font-family:var(--font-base, "Roboto"),sans-serif;font-size:var(--base-font, 16px);color:#696969;line-height:1.5;box-sizing:border-box;display:flex;flex-direction:column;max-width:960px;margin:0 auto}*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}.booking-widget__content{position:relative;min-height:450px}h1{font-size:1.5rem;font-weight:600;margin-bottom:1rem}h2{font-size:1.25rem;font-weight:600;margin-bottom:.75rem}h3{font-size:1.125rem;font-weight:600;margin-bottom:.75rem}h4{font-size:1rem;font-weight:600;margin-bottom:.5rem}h5{font-size:.875rem;font-weight:600;margin-bottom:.5rem}p{font-size:1rem;margin-bottom:.75rem}small,.text-sm{font-size:.875rem}.button{display:inline-flex;align-items:center;justify-content:center;font-size:.875rem;padding:.5rem 1rem;border-radius:.375rem;background:#007aff;color:#fff;border:none;cursor:pointer;text-decoration:none;text-wrap:nowrap}.button:hover{background:#0062cc}.button:disabled{background:#ccc;cursor:not-allowed}.section{padding:1.5rem}.card+.card{margin-top:1rem}blockquote,.blockquote{border-left:3px solid #696969;padding-left:1rem;margin-bottom:1rem;font-size:.875rem;color:#696969}.cursor-pointer{cursor:pointer}abbr,.abbreviation{display:inline;border-bottom-style:dotted;border-bottom-width:1px;cursor:pointer}.inline{display:inline}strong{font-weight:700}a{color:#ff4500;cursor:pointer;text-decoration:underline}a:hover{text-decoration:none}ul{margin:0}ul li{display:block;margin-bottom:.5rem;list-style:disc}ul li:before{content:"";display:inline-flex;margin-right:.25rem}#bflex-booking-widget{position:relative;container-type:inline-size;container-name:widget}@container widget (max-width: 480px){.booking-widget{font-size:var(--base-font, 14px);line-height:1.4}}.details-info{display:flex;background-color:#f9f9fa;border-radius:5px;padding:1rem 1.25rem;font-size:.875rem;column-gap:.5rem}.details-info--icon{flex:0 0 1rem}.accommodation-list__item{margin-bottom:.5rem}.accommodation-list__item-delete{margin-bottom:.5rem;color:#a1a1a1}.accommodation-list__item-delete:hover{color:#1b1b1f}.accommodation-list__total{color:#000}.accommodation-list__payment-rules dd,.accommodation-list__payment-rules dt{margin-bottom:.25rem;font-size:.875rem}.accommodation-list .payment-type{display:inline-flex;flex-direction:row;align-items:center;font-size:.875rem;border:1px solid orangered;border-radius:5px;margin-top:1rem}.accommodation-list .payment-type__label{font-weight:700;background-color:#ff4500;color:#fff;height:100%;padding:.5rem 1rem;flex-wrap:nowrap;text-wrap:nowrap}.accommodation-list .payment-type__variants{display:flex;flex-direction:row;align-items:start;justify-content:start;width:100%;padding:.5rem 1rem;box-sizing:border-box}.accommodation-list .payment-type label{display:flex;flex-direction:row;font-weight:400;margin-right:1rem;cursor:pointer}.accommodation-list .payment-type label input[type=radio]{margin:0 .25rem;padding:0}@container widget (max-width: 480px){.accommodation-list .payment-type{flex-direction:column;align-items:start;width:100%}.accommodation-list .payment-type__label{margin-right:0;width:100%}.accommodation-list .payment-type__variants{flex-direction:column;align-items:start;justify-content:start;width:100%}.accommodation-list .payment-type label{flex-direction:row;padding:.5rem .5rem .5rem 0}}.rate-plan-list{display:flex;flex-flow:column}.rate-plan-list .rate-plan-card:last-child{border-bottom-left-radius:var(--main-border-radius, 10px);border-bottom-right-radius:var(--main-border-radius, 10px)}@container widget (max-width: 480px){.accommodation-offer{overflow-x:hidden}.rate-plan-list__wrapper{padding:.5rem}.rate-plan-list{overflow-x:scroll;scroll-snap-type:x mandatory;flex-direction:row;column-gap:.5rem}}.agreement-rules-list__rules li{padding-left:.25rem}.agreement-rules-list__rules li:before{display:inline-block;content:"—";margin-right:.25rem}.agreement-rules-list__agreements-item{display:flex;flex-direction:row;margin-bottom:.5rem}.agreement-rules-list__combined-agreement{padding:0}.agreement-rules-list__combined-agreement:after{display:inline-block;padding-right:0;content:", ";text-decoration:none}.agreement-rules-list__combined-agreement:last-child:after{content:"";display:none}.accommodation-type-card{display:flex;color:var(--accommodation-type-card-color);border-top-left-radius:var(--main-border-radius, 10px);border-top-right-radius:var(--main-border-radius, 10px);background:var(--accommodation-type-card-background, transparent)}.accommodation-type-card__img{width:300px;flex-shrink:0;border-top-left-radius:var(--main-border-radius, 10px);overflow:hidden;background:#e0e0e0;cursor:pointer;display:flex}.accommodation-type-card__img img{width:100%;height:100%;object-fit:cover;object-position:center}.accommodation-type-card__body{display:flex;flex-flow:column;justify-content:space-between;padding:1.5rem;width:100%}.amenities{font-size:.75rem;background:transparent;margin-top:.75rem;display:inline-flex;flex-wrap:wrap;gap:.5rem}.amenities__item{border:1px solid var(--main-border-color, #e0e0e0);padding:.5rem;background:transparent;line-height:1;border-radius:3px}@container widget (max-width: 480px){.accommodation-type-card{flex-flow:column;max-height:initial;height:auto}.accommodation-type-card__img{width:auto;border-top-right-radius:var(--accommodation-type-card-border-radius, 3px);line-height:1}.accommodation-type-card__img img{height:220px}.accommodation-type-card__body{width:auto}}.custom-checkbox{display:flex;align-items:center;cursor:pointer}.custom-checkbox input[type=checkbox]{position:absolute;opacity:0;width:1.25rem;height:1.25rem;cursor:pointer}.custom-checkbox__box{width:1rem;height:1rem;flex:0 0 1rem;border:2px solid rgba(34,34,34,.2);border-radius:3px;position:relative;margin-right:.5rem;transition:background-color .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box{background-color:#fff}.custom-checkbox__box:after{content:"";position:absolute;top:50%;left:50%;width:.5rem;height:.5rem;background-color:#ff4500;transform:translate(-50%,-50%) scale(0);transition:transform .3s}.custom-checkbox input[type=checkbox]:checked+.custom-checkbox__box:after{transform:translate(-50%,-50%) scale(1)}.customer-data-form{display:grid;grid-template-columns:1fr 1fr;row-gap:1rem;column-gap:1.5rem;padding:1rem 0 0}@container widget (max-width: 480px){.customer-data-form{grid-template-columns:1fr}}.field-decorator__required{padding-left:3px;color:red}.field-decorator__input-group{border:1px solid rgba(34,34,34,.2);border-radius:5px;background-color:#fff;padding:.25rem .5rem;display:flex;flex-direction:column}.field-decorator__label{font-size:.875em;margin-bottom:.25em;line-height:1;color:#2226}.field-decorator__slot{display:flex;flex-direction:column;width:100%;height:auto}.field-decorator__slot textarea,.field-decorator__slot select,.field-decorator__slot input{border:0!important;outline:0!important;background:#fff;width:100%;height:100%;font-size:.875rem;padding:.25rem 0}.field-decorator__slot textarea{resize:vertical}.field-decorator__hint{height:1.25rem;color:#3d3d3d;text-align:right;font-size:.725rem;overflow:hidden}.form-group--error .field-decorator__input-group{border-color:red}.form-group--error .field-decorator__hint{color:red}.information-block-grid{display:grid;grid-row-gap:1.25rem}.information-block{background-color:#fff;border-radius:var(--main-border-radius, 10px)}.information-block__content{padding:1rem 1.25rem}.information-block__content dl{display:grid;grid-template-columns:1fr 1fr;gap:.25rem;align-items:center}.information-block__content dl dt{font-weight:700;line-height:1}.information-block__content dl dd{text-align:right;line-height:1}.information-block__content a{padding:0 .25rem}.information-block .divider{margin:0;height:1px;background-color:#e0e0e0}.information-block header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin:0;padding:1rem 1.25rem;border-radius:10px 10px 0 0;font-size:1.25rem;font-weight:700}.information-block header .additional{color:gray;font-weight:400}.information-block header.dense{padding:.5rem 1.25rem}@container widget (max-width: 480px){.information-block header{flex-direction:column;align-items:flex-start}}.cycle-loader{display:flex}@-webkit-keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}@keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}.price-block{display:grid;grid-template-columns:1fr;grid-template-areas:"discount" "amount";line-height:1;height:100%;width:100%}.price-block__discount{grid-area:discount;line-height:1;display:flex;align-items:center;justify-self:end;font-size:.75rem;font-weight:lighter}.price-block__discount-size{display:block;padding:.125rem;margin-right:.25rem;background:red;color:#fff}.price-block__old{text-decoration-line:line-through;opacity:.5}.price-block__schedule{font-size:.75rem}.price-block__icons .icon{font-size:1rem}.price-block__amount{grid-area:amount;display:flex;flex-direction:row;align-items:center;justify-content:space-between;line-height:1;font-size:1.25rem}.price-block__current{margin-left:.5rem}.price-block__current-currency{font-weight:lighter;padding:0 .125rem}@container widget (max-width: 480px){.price-block{grid-template-columns:1fr;grid-template-areas:"amount discount";column-gap:1rem}}.rate-plan-card{display:grid;grid-template-columns:1fr 1fr;grid-template-areas:"description actions" "bottom actions";width:100%;position:relative;background-color:var(--rate-plan-background);font-size:var(--rate-plan-font-size);color:var(--rate-plan-color)}.rate-plan-card--blocked{display:flex;justify-content:center;height:100%;width:100%;position:absolute;background:#0000001a;z-index:1}.rate-plan-card__title{display:inline-flex;align-items:center}.rate-plan-card__wrapper{grid-area:description;padding:0}.rate-plan-card blockquote{border-left-color:var(--rate-plan-secondary-color);color:var(--rate-plan-secondary-color)}.rate-plan-card__description{padding:1.5rem}.rate-plan-card__offers{font-size:var(--rate-plan-font-size, .875rem);color:var(--rate-plan-secondary-color)}.rate-plan-card__offers-item{display:flex;align-items:center;padding:.375rem 0}.rate-plan-card__offers-item .icon{margin-right:.375rem;color:var(--rate-plan-icon-primary-color, #696969);fill:var(--rate-plan-icon-primary-color, #696969)}.rate-plan-card__offers-item.extra-offer .icon{color:inherit}.rate-plan-card__offers-item.feed-offer{color:var(--rate-plan-icon-secondary-color, #28a745)}.rate-plan-card__offers-item.feed-offer .icon{color:var(--rate-plan-icon-secondary-color, #28a745);fill:var(--rate-plan-icon-secondary-color, #28a745)}.rate-plan-card__variants{display:flex;flex-direction:column;align-items:end;padding:1rem 0}.rate-plan-card__variants .length-of-stay{display:block;font-size:.875rem;text-align:right;padding:0 1rem}@container widget (max-width: 480px){.rate-plan-list--single .rate-plan-card{width:100%;flex:0 0 100%}.rate-plan-card{display:flex;flex:0 0 90%;flex-direction:column;min-width:90%;scroll-snap-align:start;border-radius:var(--main-border-radius, 10px);border:1px solid var(--main-border-color, #e0e0e0)}.rate-plan-card__actions{justify-self:stretch}}.variant-line{text-align:right;font-size:var(--variant-line-font-size);color:var(--variant-line-color, #000000)}.variant-line:hover,.variant-line.selected{background:var(--variant-line-selected, #e0e0e0)}.variant-line.selected:hover{background:var(--variant-line-hover, #d7d7d7)}.variant-line__content{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;padding:.5rem 1rem}.variant-line__actions{margin-left:1rem}@container widget (max-width: 480px){.rate-plan-card__variants .variant-line:nth-of-type(odd){background:#f5f5f5}.variant-line{width:100%}.variant-line__content{flex-direction:column;row-gap:.5rem;width:100%}.variant-line__actions{align-self:end;width:100%}.variant-line__actions button{width:100%}}.reservation-result{display:flex;flex-direction:column;margin-top:2rem;margin-bottom:1rem}.reservation-result__title{font-size:1.5rem;font-weight:700;text-align:center}.reservation-result__description{font-size:1.2rem;text-align:center}.hotel-information{display:flex;flex-direction:column;row-gap:.25rem;font-size:.875rem;justify-content:center;justify-items:center}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.accommodation-skeleton.accommodation-result .header .thumbnail,.accommodation-skeleton.accommodation-result .header .content .description,.accommodation-skeleton.accommodation-result .header .content .amenities{display:none}.accommodation-skeleton.accommodation-result .header .content .title-skeleton{width:220px;margin-bottom:0}.accommodation-skeleton .header{display:flex;flex-direction:column}@media (min-width: 768px){.accommodation-skeleton .header{flex-direction:row}}.accommodation-skeleton .header .thumbnail{width:100%;height:192px;border-top-left-radius:10px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0}@media (min-width: 768px){.accommodation-skeleton .header .thumbnail{width:300px}}.accommodation-skeleton .header .content{flex:1;padding:16px}.accommodation-skeleton .header .content .title-skeleton{height:32px;width:96px;margin-bottom:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description{margin-bottom:16px;display:flex;flex-direction:column;gap:8px}.accommodation-skeleton .header .content .description .line{height:16px;width:100%;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .header .content .description .line.line-short{width:75%}.accommodation-skeleton .header .content .amenities{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.accommodation-skeleton .header .content .amenities .amenity-item{height:32px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header{padding:16px;display:flex;justify-content:space-between;align-items:center}.accommodation-skeleton .footer .option-header .option-title{height:24px;width:80px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .option-header .option-value{height:24px;width:64px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option{padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start}@media (min-width: 768px){.accommodation-skeleton .footer .room-option{flex-direction:row;align-items:center}}.accommodation-skeleton .footer .room-option .option-details{display:flex;flex-direction:column;gap:8px;width:100%}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .option-details{width:50%}}.accommodation-skeleton .footer .room-option .option-details .option-name{height:20px;width:192px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .option-details .option-description{height:16px;width:128px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section{display:flex;align-items:center;margin-top:8px}@media (min-width: 768px){.accommodation-skeleton .footer .room-option .price-section{margin-top:0}}.accommodation-skeleton .footer .room-option .price-section .price{height:24px;width:64px;margin-right:16px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.accommodation-skeleton .footer .room-option .price-section .book-button{height:40px;width:96px;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;background-color:#e0e0e0;border-radius:4px}.icons{display:flex;align-items:baseline;color:#323232;fill:#323232}.scenario-text{font-size:var(--base-font);font-weight:lighter}.summary-block{position:sticky;width:auto;bottom:0;right:0;padding:1rem;box-shadow:0 -4px 54px #9e9e9e33;background:#fff;z-index:4;border-radius:10px}.summary-block__content{display:flex;justify-content:space-between;align-items:center}.summary-block__content-info{display:flex;flex-direction:column;align-items:flex-start}.summary-block__content-info__price{font-size:1rem;font-weight:700;color:#ff4500}.summary-block__content-info__text{display:flex;align-items:center;font-size:.875rem;color:#2229;vertical-align:center}.summary-block__content-info__text .icon{font-size:1rem;margin-left:.25rem}.summary-block .accommodation-summary-trigger{cursor:pointer}.summary-block .accommodation-summary-trigger:hover{color:#ff4500}@container widget (max-width: 480px){.summary-block{position:sticky;box-sizing:border-box;left:0;width:100%}}.v-popper__popper p{line-height:1;padding:.125rem 0;margin:.5rem;font-size:.875rem}.icon{fill:currentColor}.icon--small{width:16px}.icon-text{display:inline-flex;flex-direction:row;align-items:center;column-gap:.375rem}.icon-text__icon{display:inline-flex;color:#ff4500;flex:0 0 1rem}.icon-text__icon .icon{width:1.5rem}.icon-text__text{line-height:1}', Km = {
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
    const t = e, n = ye({
      accommodationTypes: [],
      ratePlans: []
    });
    return Ze(
      () => ({ accommodationTypes: t.accommodationTypes, ratePlans: t.ratePlans }),
      (i) => {
        (i.accommodationTypes.length || i.ratePlans.length) && (n.value = {
          accommodationTypes: i.accommodationTypes.split(","),
          ratePlans: i.accommodationTypes.split(",")
        });
      }
    ), $s(() => {
      var o;
      const i = (o = tn()) == null ? void 0 : o.appContext.app;
      i && !i.__i18n_installed && (i.use(Gn), i.__i18n_installed = !0);
    }), (i, o) => (A(), ce(ds, null, {
      default: H(() => [
        M(cs, {
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
}, Jm = /* @__PURE__ */ Rn(Km, [["styles", [Xm]]]), Zm = {
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
    return (t, n) => (A(), ce(ds, null, {
      default: H(() => [
        M(cs, {
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
globalThis.window && window.customElements.define("bflex-booking-widget", Ds(Jm));
function ep(e) {
  Rs(Zm, { initOptions: e }).use(Gn).mount("#bflex-booking-widget");
}
export {
  cs as BookingWidget,
  ep as mountWidget
};
