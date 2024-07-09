import {
  d as Z,
  c as b,
  a as ee,
  b as te,
  h as ne,
  u as B,
  M as re,
  o as J,
  a3 as I,
  r as _,
  a4 as H,
  B as j,
  a5 as le,
  a6 as ae,
  N as P,
  j as se,
  a7 as ue,
  a8 as ie,
  a9 as oe,
  aa as ce
} from "./index-BQEHPEhm.js";
import { _ as fe } from "./_plugin-vue_export-helper-DlAUqK2U.js";
const de = ["xlink:href", "fill"],
  ve = Z({
    __name: "index",
    props: {
      prefix: { type: String, default: "icon" },
      iconClass: { type: String, required: !1, default: "" },
      color: { type: String, default: "" },
      size: { type: String, default: "1em" }
    },
    setup(e) {
      const r = e,
        t = b(() => `#${r.prefix}-${r.iconClass}`);
      return (u, n) => (
        ee(),
        te(
          "svg",
          {
            "aria-hidden": "true",
            class: "svg-icon",
            style: re("width:" + e.size + ";height:" + e.size)
          },
          [ne("use", { "xlink:href": B(t), fill: e.color }, null, 8, de)],
          4
        )
      );
    }
  }),
  Le = fe(ve, [["__scopeId", "data-v-3289d8d1"]]);
function V(e) {
  return le() ? (ae(e), !0) : !1;
}
function A(e) {
  return typeof e == "function" ? e() : B(e);
}
const $ = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const pe = Object.prototype.toString,
  me = e => pe.call(e) === "[object Object]",
  G = () => {};
function ge(e, r) {
  function t(...u) {
    return new Promise((n, a) => {
      Promise.resolve(e(() => r.apply(this, u), { fn: r, thisArg: this, args: u }))
        .then(n)
        .catch(a);
    });
  }
  return t;
}
const K = e => e();
function he(e = K) {
  const r = _(!0);
  function t() {
    r.value = !1;
  }
  function u() {
    r.value = !0;
  }
  const n = (...a) => {
    r.value && e(...a);
  };
  return { isActive: H(r), pause: t, resume: u, eventFilter: n };
}
function we(e) {
  return P();
}
function ye(...e) {
  if (e.length !== 1) return ue(...e);
  const r = e[0];
  return typeof r == "function" ? H(ie(() => ({ get: r, set: G }))) : _(r);
}
function Se(e, r, t = {}) {
  const { eventFilter: u = K, ...n } = t;
  return j(e, ge(u, r), n);
}
function be(e, r, t = {}) {
  const { eventFilter: u, ...n } = t,
    { eventFilter: a, pause: c, resume: i, isActive: o } = he(u);
  return { stop: Se(e, r, { ...n, eventFilter: a }), pause: c, resume: i, isActive: o };
}
function Q(e, r = !0, t) {
  we() ? J(e, t) : r ? e() : I(e);
}
function Ne(e = !1, r = {}) {
  const { truthyValue: t = !0, falsyValue: u = !1 } = r,
    n = se(e),
    a = _(e);
  function c(i) {
    if (arguments.length) return (a.value = i), a.value;
    {
      const o = A(t);
      return (a.value = a.value === o ? A(u) : o), a.value;
    }
  }
  return n ? c : [a, c];
}
function R(e) {
  var r;
  const t = A(e);
  return (r = t == null ? void 0 : t.$el) != null ? r : t;
}
const O = $ ? window : void 0,
  Fe = $ ? window.document : void 0;
function T(...e) {
  let r, t, u, n;
  if (
    (typeof e[0] == "string" || Array.isArray(e[0])
      ? (([t, u, n] = e), (r = O))
      : ([r, t, u, n] = e),
    !r)
  )
    return G;
  Array.isArray(t) || (t = [t]), Array.isArray(u) || (u = [u]);
  const a = [],
    c = () => {
      a.forEach(v => v()), (a.length = 0);
    },
    i = (v, d, S, p) => (v.addEventListener(d, S, p), () => v.removeEventListener(d, S, p)),
    o = j(
      () => [R(r), A(n)],
      ([v, d]) => {
        if ((c(), !v)) return;
        const S = me(d) ? { ...d } : d;
        a.push(...t.flatMap(p => u.map(w => i(v, p, w, S))));
      },
      { immediate: !0, flush: "post" }
    ),
    f = () => {
      o(), c();
    };
  return V(f), f;
}
function ke() {
  const e = _(!1),
    r = P();
  return (
    r &&
      J(() => {
        e.value = !0;
      }, r),
    e
  );
}
function U(e) {
  const r = ke();
  return b(() => (r.value, !!e()));
}
function Ee(e, r = {}) {
  const { window: t = O } = r,
    u = U(() => t && "matchMedia" in t && typeof t.matchMedia == "function");
  let n;
  const a = _(!1),
    c = f => {
      a.value = f.matches;
    },
    i = () => {
      n && ("removeEventListener" in n ? n.removeEventListener("change", c) : n.removeListener(c));
    },
    o = ce(() => {
      u.value &&
        (i(),
        (n = t.matchMedia(A(e))),
        "addEventListener" in n ? n.addEventListener("change", c) : n.addListener(c),
        (a.value = n.matches));
    });
  return (
    V(() => {
      o(), i(), (n = void 0);
    }),
    a
  );
}
const L =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : {},
  N = "__vueuse_ssr_handlers__",
  Ce = _e();
function _e() {
  return N in L || (L[N] = L[N] || {}), L[N];
}
function X(e, r) {
  return Ce[e] || r;
}
function Me(e) {
  return e == null
    ? "any"
    : e instanceof Set
      ? "set"
      : e instanceof Map
        ? "map"
        : e instanceof Date
          ? "date"
          : typeof e == "boolean"
            ? "boolean"
            : typeof e == "string"
              ? "string"
              : typeof e == "object"
                ? "object"
                : Number.isNaN(e)
                  ? "any"
                  : "number";
}
const Ae = {
    boolean: { read: e => e === "true", write: e => String(e) },
    object: { read: e => JSON.parse(e), write: e => JSON.stringify(e) },
    number: { read: e => Number.parseFloat(e), write: e => String(e) },
    any: { read: e => e, write: e => String(e) },
    string: { read: e => e, write: e => String(e) },
    map: { read: e => new Map(JSON.parse(e)), write: e => JSON.stringify(Array.from(e.entries())) },
    set: { read: e => new Set(JSON.parse(e)), write: e => JSON.stringify(Array.from(e)) },
    date: { read: e => new Date(e), write: e => e.toISOString() }
  },
  W = "vueuse-storage";
function Oe(e, r, t, u = {}) {
  var n;
  const {
      flush: a = "pre",
      deep: c = !0,
      listenToStorageChanges: i = !0,
      writeDefaults: o = !0,
      mergeDefaults: f = !1,
      shallow: v,
      window: d = O,
      eventFilter: S,
      onError: p = s => {
        console.error(s);
      },
      initOnMounted: w
    } = u,
    h = (v ? oe : _)(typeof r == "function" ? r() : r);
  if (!t)
    try {
      t = X("getDefaultStorage", () => {
        var s;
        return (s = O) == null ? void 0 : s.localStorage;
      })();
    } catch (s) {
      p(s);
    }
  if (!t) return h;
  const y = A(r),
    l = Me(y),
    k = (n = u.serializer) != null ? n : Ae[l],
    { pause: x, resume: m } = be(h, () => D(h.value), { flush: a, deep: c, eventFilter: S });
  d &&
    i &&
    Q(() => {
      T(d, "storage", F), T(d, W, z), w && F();
    }),
    w || F();
  function E(s, g) {
    d &&
      d.dispatchEvent(
        new CustomEvent(W, { detail: { key: e, oldValue: s, newValue: g, storageArea: t } })
      );
  }
  function D(s) {
    try {
      const g = t.getItem(e);
      if (s == null) E(g, null), t.removeItem(e);
      else {
        const C = k.write(s);
        g !== C && (t.setItem(e, C), E(g, C));
      }
    } catch (g) {
      p(g);
    }
  }
  function M(s) {
    const g = s ? s.newValue : t.getItem(e);
    if (g == null) return o && y != null && t.setItem(e, k.write(y)), y;
    if (!s && f) {
      const C = k.read(g);
      return typeof f == "function"
        ? f(C, y)
        : l === "object" && !Array.isArray(C)
          ? { ...y, ...C }
          : C;
    } else return typeof g != "string" ? g : k.read(g);
  }
  function F(s) {
    if (!(s && s.storageArea !== t)) {
      if (s && s.key == null) {
        h.value = y;
        return;
      }
      if (!(s && s.key !== e)) {
        x();
        try {
          (s == null ? void 0 : s.newValue) !== k.write(h.value) && (h.value = M(s));
        } catch (g) {
          p(g);
        } finally {
          s ? I(m) : m();
        }
      }
    }
  }
  function z(s) {
    F(s.detail);
  }
  return h;
}
function Y(e) {
  return Ee("(prefers-color-scheme: dark)", e);
}
function xe(e = {}) {
  const {
      selector: r = "html",
      attribute: t = "class",
      initialValue: u = "auto",
      window: n = O,
      storage: a,
      storageKey: c = "vueuse-color-scheme",
      listenToStorageChanges: i = !0,
      storageRef: o,
      emitAuto: f,
      disableTransition: v = !0
    } = e,
    d = { auto: "", light: "light", dark: "dark", ...(e.modes || {}) },
    S = Y({ window: n }),
    p = b(() => (S.value ? "dark" : "light")),
    w = o || (c == null ? ye(u) : Oe(c, u, a, { window: n, listenToStorageChanges: i })),
    h = b(() => (w.value === "auto" ? p.value : w.value)),
    y = X("updateHTMLAttrs", (m, E, D) => {
      const M = typeof m == "string" ? (n == null ? void 0 : n.document.querySelector(m)) : R(m);
      if (!M) return;
      let F;
      if (
        (v &&
          ((F = n.document.createElement("style")),
          F.appendChild(
            document.createTextNode(
              "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
            )
          ),
          n.document.head.appendChild(F)),
        E === "class")
      ) {
        const z = D.split(/\s/g);
        Object.values(d)
          .flatMap(s => (s || "").split(/\s/g))
          .filter(Boolean)
          .forEach(s => {
            z.includes(s) ? M.classList.add(s) : M.classList.remove(s);
          });
      } else M.setAttribute(E, D);
      v && (n.getComputedStyle(F).opacity, document.head.removeChild(F));
    });
  function l(m) {
    var E;
    y(r, t, (E = d[m]) != null ? E : m);
  }
  function k(m) {
    e.onChanged ? e.onChanged(m, l) : l(m);
  }
  j(h, k, { flush: "post", immediate: !0 }), Q(() => k(h.value));
  const x = b({
    get() {
      return f ? w.value : h.value;
    },
    set(m) {
      w.value = m;
    }
  });
  try {
    return Object.assign(x, { store: w, system: p, state: h });
  } catch {
    return x;
  }
}
function Re(e = {}) {
  const { valueDark: r = "dark", valueLight: t = "", window: u = O } = e,
    n = xe({
      ...e,
      onChanged: (i, o) => {
        var f;
        e.onChanged ? (f = e.onChanged) == null || f.call(e, i === "dark", o, i) : o(i);
      },
      modes: { dark: r, light: t }
    }),
    a = b(() => (n.system ? n.system.value : Y({ window: u }).value ? "dark" : "light"));
  return b({
    get() {
      return n.value === "dark";
    },
    set(i) {
      const o = i ? "dark" : "light";
      a.value === o ? (n.value = "auto") : (n.value = o);
    }
  });
}
const q = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "webkitendfullscreen",
  "mozfullscreenchange",
  "MSFullscreenChange"
];
function Te(e, r = {}) {
  const { document: t = Fe, autoExit: u = !1 } = r,
    n = b(() => {
      var l;
      return (l = R(e)) != null ? l : t == null ? void 0 : t.querySelector("html");
    }),
    a = _(!1),
    c = b(() =>
      [
        "requestFullscreen",
        "webkitRequestFullscreen",
        "webkitEnterFullscreen",
        "webkitEnterFullScreen",
        "webkitRequestFullScreen",
        "mozRequestFullScreen",
        "msRequestFullscreen"
      ].find(l => (t && l in t) || (n.value && l in n.value))
    ),
    i = b(() =>
      [
        "exitFullscreen",
        "webkitExitFullscreen",
        "webkitExitFullScreen",
        "webkitCancelFullScreen",
        "mozCancelFullScreen",
        "msExitFullscreen"
      ].find(l => (t && l in t) || (n.value && l in n.value))
    ),
    o = b(() =>
      [
        "fullScreen",
        "webkitIsFullScreen",
        "webkitDisplayingFullscreen",
        "mozFullScreen",
        "msFullscreenElement"
      ].find(l => (t && l in t) || (n.value && l in n.value))
    ),
    f = [
      "fullscreenElement",
      "webkitFullscreenElement",
      "mozFullScreenElement",
      "msFullscreenElement"
    ].find(l => t && l in t),
    v = U(() => n.value && t && c.value !== void 0 && i.value !== void 0 && o.value !== void 0),
    d = () => (f ? (t == null ? void 0 : t[f]) === n.value : !1),
    S = () => {
      if (o.value) {
        if (t && t[o.value] != null) return t[o.value];
        {
          const l = n.value;
          if ((l == null ? void 0 : l[o.value]) != null) return !!l[o.value];
        }
      }
      return !1;
    };
  async function p() {
    if (!(!v.value || !a.value)) {
      if (i.value)
        if ((t == null ? void 0 : t[i.value]) != null) await t[i.value]();
        else {
          const l = n.value;
          (l == null ? void 0 : l[i.value]) != null && (await l[i.value]());
        }
      a.value = !1;
    }
  }
  async function w() {
    if (!v.value || a.value) return;
    S() && (await p());
    const l = n.value;
    c.value && (l == null ? void 0 : l[c.value]) != null && (await l[c.value](), (a.value = !0));
  }
  async function h() {
    await (a.value ? p() : w());
  }
  const y = () => {
    const l = S();
    (!l || (l && d())) && (a.value = l);
  };
  return (
    T(t, q, y, !1),
    T(() => R(n), q, y, !1),
    u && V(p),
    { isSupported: v, isFullscreen: a, enter: w, exit: p, toggle: h }
  );
}
export { Le as _, Re as a, Te as b, Ne as c, Oe as u };
