import {
  d as Nt,
  r as j,
  c as _t,
  o as Ct,
  a as Mt,
  b as Pt,
  e as D,
  w as M,
  E as dt,
  f as qt,
  g as Ft,
  u as A,
  h as _,
  i as gt,
  j as Ht,
  k as Kt,
  l as Lt,
  m as kt,
  n as jt,
  p as Ut,
  q as zt,
  s as Zt,
  t as Gt,
  v as Jt,
  x as Qt,
  y as Yt
} from "./index-BQEHPEhm.js";
import { u as vt, _ as Wt } from "./index-BLks7vWa.js";
import { _ as $t } from "./_plugin-vue_export-helper-DlAUqK2U.js";
var Xt = "0123456789abcdefghijklmnopqrstuvwxyz";
function C(r) {
  return Xt.charAt(r);
}
function te(r, t) {
  return r & t;
}
function X(r, t) {
  return r | t;
}
function yt(r, t) {
  return r ^ t;
}
function mt(r, t) {
  return r & ~t;
}
function ee(r) {
  if (r == 0) return -1;
  var t = 0;
  return (
    r & 65535 || ((r >>= 16), (t += 16)),
    r & 255 || ((r >>= 8), (t += 8)),
    r & 15 || ((r >>= 4), (t += 4)),
    r & 3 || ((r >>= 2), (t += 2)),
    r & 1 || ++t,
    t
  );
}
function ie(r) {
  for (var t = 0; r != 0; ) (r &= r - 1), ++t;
  return t;
}
var Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Bt = "=";
function ot(r) {
  var t,
    e,
    i = "";
  for (t = 0; t + 3 <= r.length; t += 3)
    (e = parseInt(r.substring(t, t + 3), 16)), (i += Z.charAt(e >> 6) + Z.charAt(e & 63));
  for (
    t + 1 == r.length
      ? ((e = parseInt(r.substring(t, t + 1), 16)), (i += Z.charAt(e << 2)))
      : t + 2 == r.length &&
        ((e = parseInt(r.substring(t, t + 2), 16)),
        (i += Z.charAt(e >> 2) + Z.charAt((e & 3) << 4)));
    (i.length & 3) > 0;

  )
    i += Bt;
  return i;
}
function St(r) {
  var t = "",
    e,
    i = 0,
    n = 0;
  for (e = 0; e < r.length && r.charAt(e) != Bt; ++e) {
    var s = Z.indexOf(r.charAt(e));
    s < 0 ||
      (i == 0
        ? ((t += C(s >> 2)), (n = s & 3), (i = 1))
        : i == 1
          ? ((t += C((n << 2) | (s >> 4))), (n = s & 15), (i = 2))
          : i == 2
            ? ((t += C(n)), (t += C(s >> 2)), (n = s & 3), (i = 3))
            : ((t += C((n << 2) | (s >> 4))), (t += C(s & 15)), (i = 0)));
  }
  return i == 1 && (t += C(n << 2)), t;
}
var U,
  re = {
    decode: function (r) {
      var t;
      if (U === void 0) {
        var e = "0123456789ABCDEF",
          i = ` \f
\r	 \u2028\u2029`;
        for (U = {}, t = 0; t < 16; ++t) U[e.charAt(t)] = t;
        for (e = e.toLowerCase(), t = 10; t < 16; ++t) U[e.charAt(t)] = t;
        for (t = 0; t < i.length; ++t) U[i.charAt(t)] = -1;
      }
      var n = [],
        s = 0,
        o = 0;
      for (t = 0; t < r.length; ++t) {
        var h = r.charAt(t);
        if (h == "=") break;
        if (((h = U[h]), h != -1)) {
          if (h === void 0) throw new Error("Illegal character at offset " + t);
          (s |= h), ++o >= 2 ? ((n[n.length] = s), (s = 0), (o = 0)) : (s <<= 4);
        }
      }
      if (o) throw new Error("Hex encoding incomplete: 4 bits missing");
      return n;
    }
  },
  L,
  lt = {
    decode: function (r) {
      var t;
      if (L === void 0) {
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          i = `= \f
\r	 \u2028\u2029`;
        for (L = Object.create(null), t = 0; t < 64; ++t) L[e.charAt(t)] = t;
        for (L["-"] = 62, L._ = 63, t = 0; t < i.length; ++t) L[i.charAt(t)] = -1;
      }
      var n = [],
        s = 0,
        o = 0;
      for (t = 0; t < r.length; ++t) {
        var h = r.charAt(t);
        if (h == "=") break;
        if (((h = L[h]), h != -1)) {
          if (h === void 0) throw new Error("Illegal character at offset " + t);
          (s |= h),
            ++o >= 4
              ? ((n[n.length] = s >> 16),
                (n[n.length] = (s >> 8) & 255),
                (n[n.length] = s & 255),
                (s = 0),
                (o = 0))
              : (s <<= 6);
        }
      }
      switch (o) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
          n[n.length] = s >> 10;
          break;
        case 3:
          (n[n.length] = s >> 16), (n[n.length] = (s >> 8) & 255);
          break;
      }
      return n;
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function (r) {
      var t = lt.re.exec(r);
      if (t)
        if (t[1]) r = t[1];
        else if (t[2]) r = t[2];
        else throw new Error("RegExp out of sync");
      return lt.decode(r);
    }
  },
  z = 1e13,
  Y = (function () {
    function r(t) {
      this.buf = [+t || 0];
    }
    return (
      (r.prototype.mulAdd = function (t, e) {
        var i = this.buf,
          n = i.length,
          s,
          o;
        for (s = 0; s < n; ++s)
          (o = i[s] * t + e), o < z ? (e = 0) : ((e = 0 | (o / z)), (o -= e * z)), (i[s] = o);
        e > 0 && (i[s] = e);
      }),
      (r.prototype.sub = function (t) {
        var e = this.buf,
          i = e.length,
          n,
          s;
        for (n = 0; n < i; ++n) (s = e[n] - t), s < 0 ? ((s += z), (t = 1)) : (t = 0), (e[n] = s);
        for (; e[e.length - 1] === 0; ) e.pop();
      }),
      (r.prototype.toString = function (t) {
        if ((t || 10) != 10) throw new Error("only base 10 is supported");
        for (var e = this.buf, i = e[e.length - 1].toString(), n = e.length - 2; n >= 0; --n)
          i += (z + e[n]).toString().substring(1);
        return i;
      }),
      (r.prototype.valueOf = function () {
        for (var t = this.buf, e = 0, i = t.length - 1; i >= 0; --i) e = e * z + t[i];
        return e;
      }),
      (r.prototype.simplify = function () {
        var t = this.buf;
        return t.length == 1 ? t[0] : this;
      }),
      r
    );
  })(),
  At = "…",
  ne =
    /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
  se =
    /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function G(r, t) {
  return r.length > t && (r = r.substring(0, t) + At), r;
}
var at = (function () {
    function r(t, e) {
      (this.hexDigits = "0123456789ABCDEF"),
        t instanceof r
          ? ((this.enc = t.enc), (this.pos = t.pos))
          : ((this.enc = t), (this.pos = e));
    }
    return (
      (r.prototype.get = function (t) {
        if ((t === void 0 && (t = this.pos++), t >= this.enc.length))
          throw new Error(
            "Requesting byte offset ".concat(t, " on a stream of length ").concat(this.enc.length)
          );
        return typeof this.enc == "string" ? this.enc.charCodeAt(t) : this.enc[t];
      }),
      (r.prototype.hexByte = function (t) {
        return this.hexDigits.charAt((t >> 4) & 15) + this.hexDigits.charAt(t & 15);
      }),
      (r.prototype.hexDump = function (t, e, i) {
        for (var n = "", s = t; s < e; ++s)
          if (((n += this.hexByte(this.get(s))), i !== !0))
            switch (s & 15) {
              case 7:
                n += "  ";
                break;
              case 15:
                n += `
`;
                break;
              default:
                n += " ";
            }
        return n;
      }),
      (r.prototype.isASCII = function (t, e) {
        for (var i = t; i < e; ++i) {
          var n = this.get(i);
          if (n < 32 || n > 176) return !1;
        }
        return !0;
      }),
      (r.prototype.parseStringISO = function (t, e) {
        for (var i = "", n = t; n < e; ++n) i += String.fromCharCode(this.get(n));
        return i;
      }),
      (r.prototype.parseStringUTF = function (t, e) {
        for (var i = "", n = t; n < e; ) {
          var s = this.get(n++);
          s < 128
            ? (i += String.fromCharCode(s))
            : s > 191 && s < 224
              ? (i += String.fromCharCode(((s & 31) << 6) | (this.get(n++) & 63)))
              : (i += String.fromCharCode(
                  ((s & 15) << 12) | ((this.get(n++) & 63) << 6) | (this.get(n++) & 63)
                ));
        }
        return i;
      }),
      (r.prototype.parseStringBMP = function (t, e) {
        for (var i = "", n, s, o = t; o < e; )
          (n = this.get(o++)), (s = this.get(o++)), (i += String.fromCharCode((n << 8) | s));
        return i;
      }),
      (r.prototype.parseTime = function (t, e, i) {
        var n = this.parseStringISO(t, e),
          s = (i ? ne : se).exec(n);
        return s
          ? (i && ((s[1] = +s[1]), (s[1] += +s[1] < 70 ? 2e3 : 1900)),
            (n = s[1] + "-" + s[2] + "-" + s[3] + " " + s[4]),
            s[5] && ((n += ":" + s[5]), s[6] && ((n += ":" + s[6]), s[7] && (n += "." + s[7]))),
            s[8] && ((n += " UTC"), s[8] != "Z" && ((n += s[8]), s[9] && (n += ":" + s[9]))),
            n)
          : "Unrecognized time: " + n;
      }),
      (r.prototype.parseInteger = function (t, e) {
        for (var i = this.get(t), n = i > 127, s = n ? 255 : 0, o, h = ""; i == s && ++t < e; )
          i = this.get(t);
        if (((o = e - t), o === 0)) return n ? -1 : 0;
        if (o > 4) {
          for (h = i, o <<= 3; !((+h ^ s) & 128); ) (h = +h << 1), --o;
          h =
            "(" +
            o +
            ` bit)
`;
        }
        n && (i = i - 256);
        for (var a = new Y(i), f = t + 1; f < e; ++f) a.mulAdd(256, this.get(f));
        return h + a.toString();
      }),
      (r.prototype.parseBitString = function (t, e, i) {
        for (
          var n = this.get(t),
            s = ((e - t - 1) << 3) - n,
            o =
              "(" +
              s +
              ` bit)
`,
            h = "",
            a = t + 1;
          a < e;
          ++a
        ) {
          for (var f = this.get(a), l = a == e - 1 ? n : 0, p = 7; p >= l; --p)
            h += (f >> p) & 1 ? "1" : "0";
          if (h.length > i) return o + G(h, i);
        }
        return o + h;
      }),
      (r.prototype.parseOctetString = function (t, e, i) {
        if (this.isASCII(t, e)) return G(this.parseStringISO(t, e), i);
        var n = e - t,
          s =
            "(" +
            n +
            ` byte)
`;
        (i /= 2), n > i && (e = t + i);
        for (var o = t; o < e; ++o) s += this.hexByte(this.get(o));
        return n > i && (s += At), s;
      }),
      (r.prototype.parseOID = function (t, e, i) {
        for (var n = "", s = new Y(), o = 0, h = t; h < e; ++h) {
          var a = this.get(h);
          if ((s.mulAdd(128, a & 127), (o += 7), !(a & 128))) {
            if (n === "")
              if (((s = s.simplify()), s instanceof Y)) s.sub(80), (n = "2." + s.toString());
              else {
                var f = s < 80 ? (s < 40 ? 0 : 1) : 2;
                n = f + "." + (s - f * 40);
              }
            else n += "." + s.toString();
            if (n.length > i) return G(n, i);
            (s = new Y()), (o = 0);
          }
        }
        return o > 0 && (n += ".incomplete"), n;
      }),
      r
    );
  })(),
  oe = (function () {
    function r(t, e, i, n, s) {
      if (!(n instanceof bt)) throw new Error("Invalid tag value.");
      (this.stream = t), (this.header = e), (this.length = i), (this.tag = n), (this.sub = s);
    }
    return (
      (r.prototype.typeName = function () {
        switch (this.tag.tagClass) {
          case 0:
            switch (this.tag.tagNumber) {
              case 0:
                return "EOC";
              case 1:
                return "BOOLEAN";
              case 2:
                return "INTEGER";
              case 3:
                return "BIT_STRING";
              case 4:
                return "OCTET_STRING";
              case 5:
                return "NULL";
              case 6:
                return "OBJECT_IDENTIFIER";
              case 7:
                return "ObjectDescriptor";
              case 8:
                return "EXTERNAL";
              case 9:
                return "REAL";
              case 10:
                return "ENUMERATED";
              case 11:
                return "EMBEDDED_PDV";
              case 12:
                return "UTF8String";
              case 16:
                return "SEQUENCE";
              case 17:
                return "SET";
              case 18:
                return "NumericString";
              case 19:
                return "PrintableString";
              case 20:
                return "TeletexString";
              case 21:
                return "VideotexString";
              case 22:
                return "IA5String";
              case 23:
                return "UTCTime";
              case 24:
                return "GeneralizedTime";
              case 25:
                return "GraphicString";
              case 26:
                return "VisibleString";
              case 27:
                return "GeneralString";
              case 28:
                return "UniversalString";
              case 30:
                return "BMPString";
            }
            return "Universal_" + this.tag.tagNumber.toString();
          case 1:
            return "Application_" + this.tag.tagNumber.toString();
          case 2:
            return "[" + this.tag.tagNumber.toString() + "]";
          case 3:
            return "Private_" + this.tag.tagNumber.toString();
        }
      }),
      (r.prototype.content = function (t) {
        if (this.tag === void 0) return null;
        t === void 0 && (t = 1 / 0);
        var e = this.posContent(),
          i = Math.abs(this.length);
        if (!this.tag.isUniversal())
          return this.sub !== null
            ? "(" + this.sub.length + " elem)"
            : this.stream.parseOctetString(e, e + i, t);
        switch (this.tag.tagNumber) {
          case 1:
            return this.stream.get(e) === 0 ? "false" : "true";
          case 2:
            return this.stream.parseInteger(e, e + i);
          case 3:
            return this.sub
              ? "(" + this.sub.length + " elem)"
              : this.stream.parseBitString(e, e + i, t);
          case 4:
            return this.sub
              ? "(" + this.sub.length + " elem)"
              : this.stream.parseOctetString(e, e + i, t);
          case 6:
            return this.stream.parseOID(e, e + i, t);
          case 16:
          case 17:
            return this.sub !== null ? "(" + this.sub.length + " elem)" : "(no elem)";
          case 12:
            return G(this.stream.parseStringUTF(e, e + i), t);
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 26:
            return G(this.stream.parseStringISO(e, e + i), t);
          case 30:
            return G(this.stream.parseStringBMP(e, e + i), t);
          case 23:
          case 24:
            return this.stream.parseTime(e, e + i, this.tag.tagNumber == 23);
        }
        return null;
      }),
      (r.prototype.toString = function () {
        return (
          this.typeName() +
          "@" +
          this.stream.pos +
          "[header:" +
          this.header +
          ",length:" +
          this.length +
          ",sub:" +
          (this.sub === null ? "null" : this.sub.length) +
          "]"
        );
      }),
      (r.prototype.toPrettyString = function (t) {
        t === void 0 && (t = "");
        var e = t + this.typeName() + " @" + this.stream.pos;
        if (
          (this.length >= 0 && (e += "+"),
          (e += this.length),
          this.tag.tagConstructed
            ? (e += " (constructed)")
            : this.tag.isUniversal() &&
              (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) &&
              this.sub !== null &&
              (e += " (encapsulates)"),
          (e += `
`),
          this.sub !== null)
        ) {
          t += "  ";
          for (var i = 0, n = this.sub.length; i < n; ++i) e += this.sub[i].toPrettyString(t);
        }
        return e;
      }),
      (r.prototype.posStart = function () {
        return this.stream.pos;
      }),
      (r.prototype.posContent = function () {
        return this.stream.pos + this.header;
      }),
      (r.prototype.posEnd = function () {
        return this.stream.pos + this.header + Math.abs(this.length);
      }),
      (r.prototype.toHexString = function () {
        return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
      }),
      (r.decodeLength = function (t) {
        var e = t.get(),
          i = e & 127;
        if (i == e) return i;
        if (i > 6) throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
        if (i === 0) return null;
        e = 0;
        for (var n = 0; n < i; ++n) e = e * 256 + t.get();
        return e;
      }),
      (r.prototype.getHexStringValue = function () {
        var t = this.toHexString(),
          e = this.header * 2,
          i = this.length * 2;
        return t.substr(e, i);
      }),
      (r.decode = function (t) {
        var e;
        t instanceof at ? (e = t) : (e = new at(t, 0));
        var i = new at(e),
          n = new bt(e),
          s = r.decodeLength(e),
          o = e.pos,
          h = o - i.pos,
          a = null,
          f = function () {
            var p = [];
            if (s !== null) {
              for (var v = o + s; e.pos < v; ) p[p.length] = r.decode(e);
              if (e.pos != v)
                throw new Error(
                  "Content size is not correct for container starting at offset " + o
                );
            } else
              try {
                for (;;) {
                  var y = r.decode(e);
                  if (y.tag.isEOC()) break;
                  p[p.length] = y;
                }
                s = o - e.pos;
              } catch (b) {
                throw new Error("Exception while decoding undefined length content: " + b);
              }
            return p;
          };
        if (n.tagConstructed) a = f();
        else if (n.isUniversal() && (n.tagNumber == 3 || n.tagNumber == 4))
          try {
            if (n.tagNumber == 3 && e.get() != 0)
              throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
            a = f();
            for (var l = 0; l < a.length; ++l)
              if (a[l].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.");
          } catch {
            a = null;
          }
        if (a === null) {
          if (s === null)
            throw new Error(
              "We can't skip over an invalid tag with undefined length at offset " + o
            );
          e.pos = o + Math.abs(s);
        }
        return new r(i, h, s, n, a);
      }),
      r
    );
  })(),
  bt = (function () {
    function r(t) {
      var e = t.get();
      if (
        ((this.tagClass = e >> 6),
        (this.tagConstructed = (e & 32) !== 0),
        (this.tagNumber = e & 31),
        this.tagNumber == 31)
      ) {
        var i = new Y();
        do (e = t.get()), i.mulAdd(128, e & 127);
        while (e & 128);
        this.tagNumber = i.simplify();
      }
    }
    return (
      (r.prototype.isUniversal = function () {
        return this.tagClass === 0;
      }),
      (r.prototype.isEOC = function () {
        return this.tagClass === 0 && this.tagNumber === 0;
      }),
      r
    );
  })(),
  F,
  he = 0xdeadbeefcafe,
  Tt = (he & 16777215) == 15715070,
  x = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193,
    197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307,
    311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421,
    431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547,
    557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659,
    661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797,
    809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929,
    937, 941, 947, 953, 967, 971, 977, 983, 991, 997
  ],
  ae = (1 << 26) / x[x.length - 1],
  c = (function () {
    function r(t, e, i) {
      t != null &&
        (typeof t == "number"
          ? this.fromNumber(t, e, i)
          : e == null && typeof t != "string"
            ? this.fromString(t, 256)
            : this.fromString(t, e));
    }
    return (
      (r.prototype.toString = function (t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var e;
        if (t == 16) e = 4;
        else if (t == 8) e = 3;
        else if (t == 2) e = 1;
        else if (t == 32) e = 5;
        else if (t == 4) e = 2;
        else return this.toRadix(t);
        var i = (1 << e) - 1,
          n,
          s = !1,
          o = "",
          h = this.t,
          a = this.DB - ((h * this.DB) % e);
        if (h-- > 0)
          for (a < this.DB && (n = this[h] >> a) > 0 && ((s = !0), (o = C(n))); h >= 0; )
            a < e
              ? ((n = (this[h] & ((1 << a) - 1)) << (e - a)),
                (n |= this[--h] >> (a += this.DB - e)))
              : ((n = (this[h] >> (a -= e)) & i), a <= 0 && ((a += this.DB), --h)),
              n > 0 && (s = !0),
              s && (o += C(n));
        return s ? o : "0";
      }),
      (r.prototype.negate = function () {
        var t = g();
        return r.ZERO.subTo(this, t), t;
      }),
      (r.prototype.abs = function () {
        return this.s < 0 ? this.negate() : this;
      }),
      (r.prototype.compareTo = function (t) {
        var e = this.s - t.s;
        if (e != 0) return e;
        var i = this.t;
        if (((e = i - t.t), e != 0)) return this.s < 0 ? -e : e;
        for (; --i >= 0; ) if ((e = this[i] - t[i]) != 0) return e;
        return 0;
      }),
      (r.prototype.bitLength = function () {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + tt(this[this.t - 1] ^ (this.s & this.DM));
      }),
      (r.prototype.mod = function (t) {
        var e = g();
        return (
          this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(r.ZERO) > 0 && t.subTo(e, e), e
        );
      }),
      (r.prototype.modPowInt = function (t, e) {
        var i;
        return t < 256 || e.isEven() ? (i = new wt(e)) : (i = new Et(e)), this.exp(t, i);
      }),
      (r.prototype.clone = function () {
        var t = g();
        return this.copyTo(t), t;
      }),
      (r.prototype.intValue = function () {
        if (this.s < 0) {
          if (this.t == 1) return this[0] - this.DV;
          if (this.t == 0) return -1;
        } else {
          if (this.t == 1) return this[0];
          if (this.t == 0) return 0;
        }
        return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
      }),
      (r.prototype.byteValue = function () {
        return this.t == 0 ? this.s : (this[0] << 24) >> 24;
      }),
      (r.prototype.shortValue = function () {
        return this.t == 0 ? this.s : (this[0] << 16) >> 16;
      }),
      (r.prototype.signum = function () {
        return this.s < 0 ? -1 : this.t <= 0 || (this.t == 1 && this[0] <= 0) ? 0 : 1;
      }),
      (r.prototype.toByteArray = function () {
        var t = this.t,
          e = [];
        e[0] = this.s;
        var i = this.DB - ((t * this.DB) % 8),
          n,
          s = 0;
        if (t-- > 0)
          for (
            i < this.DB &&
            (n = this[t] >> i) != (this.s & this.DM) >> i &&
            (e[s++] = n | (this.s << (this.DB - i)));
            t >= 0;

          )
            i < 8
              ? ((n = (this[t] & ((1 << i) - 1)) << (8 - i)),
                (n |= this[--t] >> (i += this.DB - 8)))
              : ((n = (this[t] >> (i -= 8)) & 255), i <= 0 && ((i += this.DB), --t)),
              n & 128 && (n |= -256),
              s == 0 && (this.s & 128) != (n & 128) && ++s,
              (s > 0 || n != this.s) && (e[s++] = n);
        return e;
      }),
      (r.prototype.equals = function (t) {
        return this.compareTo(t) == 0;
      }),
      (r.prototype.min = function (t) {
        return this.compareTo(t) < 0 ? this : t;
      }),
      (r.prototype.max = function (t) {
        return this.compareTo(t) > 0 ? this : t;
      }),
      (r.prototype.and = function (t) {
        var e = g();
        return this.bitwiseTo(t, te, e), e;
      }),
      (r.prototype.or = function (t) {
        var e = g();
        return this.bitwiseTo(t, X, e), e;
      }),
      (r.prototype.xor = function (t) {
        var e = g();
        return this.bitwiseTo(t, yt, e), e;
      }),
      (r.prototype.andNot = function (t) {
        var e = g();
        return this.bitwiseTo(t, mt, e), e;
      }),
      (r.prototype.not = function () {
        for (var t = g(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
        return (t.t = this.t), (t.s = ~this.s), t;
      }),
      (r.prototype.shiftLeft = function (t) {
        var e = g();
        return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e;
      }),
      (r.prototype.shiftRight = function (t) {
        var e = g();
        return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e;
      }),
      (r.prototype.getLowestSetBit = function () {
        for (var t = 0; t < this.t; ++t) if (this[t] != 0) return t * this.DB + ee(this[t]);
        return this.s < 0 ? this.t * this.DB : -1;
      }),
      (r.prototype.bitCount = function () {
        for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i) t += ie(this[i] ^ e);
        return t;
      }),
      (r.prototype.testBit = function (t) {
        var e = Math.floor(t / this.DB);
        return e >= this.t ? this.s != 0 : (this[e] & (1 << t % this.DB)) != 0;
      }),
      (r.prototype.setBit = function (t) {
        return this.changeBit(t, X);
      }),
      (r.prototype.clearBit = function (t) {
        return this.changeBit(t, mt);
      }),
      (r.prototype.flipBit = function (t) {
        return this.changeBit(t, yt);
      }),
      (r.prototype.add = function (t) {
        var e = g();
        return this.addTo(t, e), e;
      }),
      (r.prototype.subtract = function (t) {
        var e = g();
        return this.subTo(t, e), e;
      }),
      (r.prototype.multiply = function (t) {
        var e = g();
        return this.multiplyTo(t, e), e;
      }),
      (r.prototype.divide = function (t) {
        var e = g();
        return this.divRemTo(t, e, null), e;
      }),
      (r.prototype.remainder = function (t) {
        var e = g();
        return this.divRemTo(t, null, e), e;
      }),
      (r.prototype.divideAndRemainder = function (t) {
        var e = g(),
          i = g();
        return this.divRemTo(t, e, i), [e, i];
      }),
      (r.prototype.modPow = function (t, e) {
        var i = t.bitLength(),
          n,
          s = P(1),
          o;
        if (i <= 0) return s;
        i < 18 ? (n = 1) : i < 48 ? (n = 3) : i < 144 ? (n = 4) : i < 768 ? (n = 5) : (n = 6),
          i < 8 ? (o = new wt(e)) : e.isEven() ? (o = new fe(e)) : (o = new Et(e));
        var h = [],
          a = 3,
          f = n - 1,
          l = (1 << n) - 1;
        if (((h[1] = o.convert(this)), n > 1)) {
          var p = g();
          for (o.sqrTo(h[1], p); a <= l; ) (h[a] = g()), o.mulTo(p, h[a - 2], h[a]), (a += 2);
        }
        var v = t.t - 1,
          y,
          b = !0,
          m = g(),
          S;
        for (i = tt(t[v]) - 1; v >= 0; ) {
          for (
            i >= f
              ? (y = (t[v] >> (i - f)) & l)
              : ((y = (t[v] & ((1 << (i + 1)) - 1)) << (f - i)),
                v > 0 && (y |= t[v - 1] >> (this.DB + i - f))),
              a = n;
            !(y & 1);

          )
            (y >>= 1), --a;
          if (((i -= a) < 0 && ((i += this.DB), --v), b)) h[y].copyTo(s), (b = !1);
          else {
            for (; a > 1; ) o.sqrTo(s, m), o.sqrTo(m, s), (a -= 2);
            a > 0 ? o.sqrTo(s, m) : ((S = s), (s = m), (m = S)), o.mulTo(m, h[y], s);
          }
          for (; v >= 0 && !(t[v] & (1 << i)); )
            o.sqrTo(s, m), (S = s), (s = m), (m = S), --i < 0 && ((i = this.DB - 1), --v);
        }
        return o.revert(s);
      }),
      (r.prototype.modInverse = function (t) {
        var e = t.isEven();
        if ((this.isEven() && e) || t.signum() == 0) return r.ZERO;
        for (
          var i = t.clone(), n = this.clone(), s = P(1), o = P(0), h = P(0), a = P(1);
          i.signum() != 0;

        ) {
          for (; i.isEven(); )
            i.rShiftTo(1, i),
              e
                ? ((!s.isEven() || !o.isEven()) && (s.addTo(this, s), o.subTo(t, o)),
                  s.rShiftTo(1, s))
                : o.isEven() || o.subTo(t, o),
              o.rShiftTo(1, o);
          for (; n.isEven(); )
            n.rShiftTo(1, n),
              e
                ? ((!h.isEven() || !a.isEven()) && (h.addTo(this, h), a.subTo(t, a)),
                  h.rShiftTo(1, h))
                : a.isEven() || a.subTo(t, a),
              a.rShiftTo(1, a);
          i.compareTo(n) >= 0
            ? (i.subTo(n, i), e && s.subTo(h, s), o.subTo(a, o))
            : (n.subTo(i, n), e && h.subTo(s, h), a.subTo(o, a));
        }
        if (n.compareTo(r.ONE) != 0) return r.ZERO;
        if (a.compareTo(t) >= 0) return a.subtract(t);
        if (a.signum() < 0) a.addTo(t, a);
        else return a;
        return a.signum() < 0 ? a.add(t) : a;
      }),
      (r.prototype.pow = function (t) {
        return this.exp(t, new ue());
      }),
      (r.prototype.gcd = function (t) {
        var e = this.s < 0 ? this.negate() : this.clone(),
          i = t.s < 0 ? t.negate() : t.clone();
        if (e.compareTo(i) < 0) {
          var n = e;
          (e = i), (i = n);
        }
        var s = e.getLowestSetBit(),
          o = i.getLowestSetBit();
        if (o < 0) return e;
        for (s < o && (o = s), o > 0 && (e.rShiftTo(o, e), i.rShiftTo(o, i)); e.signum() > 0; )
          (s = e.getLowestSetBit()) > 0 && e.rShiftTo(s, e),
            (s = i.getLowestSetBit()) > 0 && i.rShiftTo(s, i),
            e.compareTo(i) >= 0
              ? (e.subTo(i, e), e.rShiftTo(1, e))
              : (i.subTo(e, i), i.rShiftTo(1, i));
        return o > 0 && i.lShiftTo(o, i), i;
      }),
      (r.prototype.isProbablePrime = function (t) {
        var e,
          i = this.abs();
        if (i.t == 1 && i[0] <= x[x.length - 1]) {
          for (e = 0; e < x.length; ++e) if (i[0] == x[e]) return !0;
          return !1;
        }
        if (i.isEven()) return !1;
        for (e = 1; e < x.length; ) {
          for (var n = x[e], s = e + 1; s < x.length && n < ae; ) n *= x[s++];
          for (n = i.modInt(n); e < s; ) if (n % x[e++] == 0) return !1;
        }
        return i.millerRabin(t);
      }),
      (r.prototype.copyTo = function (t) {
        for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
        (t.t = this.t), (t.s = this.s);
      }),
      (r.prototype.fromInt = function (t) {
        (this.t = 1),
          (this.s = t < 0 ? -1 : 0),
          t > 0 ? (this[0] = t) : t < -1 ? (this[0] = t + this.DV) : (this.t = 0);
      }),
      (r.prototype.fromString = function (t, e) {
        var i;
        if (e == 16) i = 4;
        else if (e == 8) i = 3;
        else if (e == 256) i = 8;
        else if (e == 2) i = 1;
        else if (e == 32) i = 5;
        else if (e == 4) i = 2;
        else {
          this.fromRadix(t, e);
          return;
        }
        (this.t = 0), (this.s = 0);
        for (var n = t.length, s = !1, o = 0; --n >= 0; ) {
          var h = i == 8 ? +t[n] & 255 : xt(t, n);
          if (h < 0) {
            t.charAt(n) == "-" && (s = !0);
            continue;
          }
          (s = !1),
            o == 0
              ? (this[this.t++] = h)
              : o + i > this.DB
                ? ((this[this.t - 1] |= (h & ((1 << (this.DB - o)) - 1)) << o),
                  (this[this.t++] = h >> (this.DB - o)))
                : (this[this.t - 1] |= h << o),
            (o += i),
            o >= this.DB && (o -= this.DB);
        }
        i == 8 &&
          +t[0] & 128 &&
          ((this.s = -1), o > 0 && (this[this.t - 1] |= ((1 << (this.DB - o)) - 1) << o)),
          this.clamp(),
          s && r.ZERO.subTo(this, this);
      }),
      (r.prototype.clamp = function () {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t;
      }),
      (r.prototype.dlShiftTo = function (t, e) {
        var i;
        for (i = this.t - 1; i >= 0; --i) e[i + t] = this[i];
        for (i = t - 1; i >= 0; --i) e[i] = 0;
        (e.t = this.t + t), (e.s = this.s);
      }),
      (r.prototype.drShiftTo = function (t, e) {
        for (var i = t; i < this.t; ++i) e[i - t] = this[i];
        (e.t = Math.max(this.t - t, 0)), (e.s = this.s);
      }),
      (r.prototype.lShiftTo = function (t, e) {
        for (
          var i = t % this.DB,
            n = this.DB - i,
            s = (1 << n) - 1,
            o = Math.floor(t / this.DB),
            h = (this.s << i) & this.DM,
            a = this.t - 1;
          a >= 0;
          --a
        )
          (e[a + o + 1] = (this[a] >> n) | h), (h = (this[a] & s) << i);
        for (var a = o - 1; a >= 0; --a) e[a] = 0;
        (e[o] = h), (e.t = this.t + o + 1), (e.s = this.s), e.clamp();
      }),
      (r.prototype.rShiftTo = function (t, e) {
        e.s = this.s;
        var i = Math.floor(t / this.DB);
        if (i >= this.t) {
          e.t = 0;
          return;
        }
        var n = t % this.DB,
          s = this.DB - n,
          o = (1 << n) - 1;
        e[0] = this[i] >> n;
        for (var h = i + 1; h < this.t; ++h)
          (e[h - i - 1] |= (this[h] & o) << s), (e[h - i] = this[h] >> n);
        n > 0 && (e[this.t - i - 1] |= (this.s & o) << s), (e.t = this.t - i), e.clamp();
      }),
      (r.prototype.subTo = function (t, e) {
        for (var i = 0, n = 0, s = Math.min(t.t, this.t); i < s; )
          (n += this[i] - t[i]), (e[i++] = n & this.DM), (n >>= this.DB);
        if (t.t < this.t) {
          for (n -= t.s; i < this.t; ) (n += this[i]), (e[i++] = n & this.DM), (n >>= this.DB);
          n += this.s;
        } else {
          for (n += this.s; i < t.t; ) (n -= t[i]), (e[i++] = n & this.DM), (n >>= this.DB);
          n -= t.s;
        }
        (e.s = n < 0 ? -1 : 0),
          n < -1 ? (e[i++] = this.DV + n) : n > 0 && (e[i++] = n),
          (e.t = i),
          e.clamp();
      }),
      (r.prototype.multiplyTo = function (t, e) {
        var i = this.abs(),
          n = t.abs(),
          s = i.t;
        for (e.t = s + n.t; --s >= 0; ) e[s] = 0;
        for (s = 0; s < n.t; ++s) e[s + i.t] = i.am(0, n[s], e, s, 0, i.t);
        (e.s = 0), e.clamp(), this.s != t.s && r.ZERO.subTo(e, e);
      }),
      (r.prototype.squareTo = function (t) {
        for (var e = this.abs(), i = (t.t = 2 * e.t); --i >= 0; ) t[i] = 0;
        for (i = 0; i < e.t - 1; ++i) {
          var n = e.am(i, e[i], t, 2 * i, 0, 1);
          (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, n, e.t - i - 1)) >= e.DV &&
            ((t[i + e.t] -= e.DV), (t[i + e.t + 1] = 1));
        }
        t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), (t.s = 0), t.clamp();
      }),
      (r.prototype.divRemTo = function (t, e, i) {
        var n = t.abs();
        if (!(n.t <= 0)) {
          var s = this.abs();
          if (s.t < n.t) {
            e != null && e.fromInt(0), i != null && this.copyTo(i);
            return;
          }
          i == null && (i = g());
          var o = g(),
            h = this.s,
            a = t.s,
            f = this.DB - tt(n[n.t - 1]);
          f > 0 ? (n.lShiftTo(f, o), s.lShiftTo(f, i)) : (n.copyTo(o), s.copyTo(i));
          var l = o.t,
            p = o[l - 1];
          if (p != 0) {
            var v = p * (1 << this.F1) + (l > 1 ? o[l - 2] >> this.F2 : 0),
              y = this.FV / v,
              b = (1 << this.F1) / v,
              m = 1 << this.F2,
              S = i.t,
              R = S - l,
              B = e ?? g();
            for (
              o.dlShiftTo(R, B),
                i.compareTo(B) >= 0 && ((i[i.t++] = 1), i.subTo(B, i)),
                r.ONE.dlShiftTo(l, B),
                B.subTo(o, o);
              o.t < l;

            )
              o[o.t++] = 0;
            for (; --R >= 0; ) {
              var I = i[--S] == p ? this.DM : Math.floor(i[S] * y + (i[S - 1] + m) * b);
              if ((i[S] += o.am(0, I, i, R, 0, l)) < I)
                for (o.dlShiftTo(R, B), i.subTo(B, i); i[S] < --I; ) i.subTo(B, i);
            }
            e != null && (i.drShiftTo(l, e), h != a && r.ZERO.subTo(e, e)),
              (i.t = l),
              i.clamp(),
              f > 0 && i.rShiftTo(f, i),
              h < 0 && r.ZERO.subTo(i, i);
          }
        }
      }),
      (r.prototype.invDigit = function () {
        if (this.t < 1) return 0;
        var t = this[0];
        if (!(t & 1)) return 0;
        var e = t & 3;
        return (
          (e = (e * (2 - (t & 15) * e)) & 15),
          (e = (e * (2 - (t & 255) * e)) & 255),
          (e = (e * (2 - (((t & 65535) * e) & 65535))) & 65535),
          (e = (e * (2 - ((t * e) % this.DV))) % this.DV),
          e > 0 ? this.DV - e : -e
        );
      }),
      (r.prototype.isEven = function () {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0;
      }),
      (r.prototype.exp = function (t, e) {
        if (t > 4294967295 || t < 1) return r.ONE;
        var i = g(),
          n = g(),
          s = e.convert(this),
          o = tt(t) - 1;
        for (s.copyTo(i); --o >= 0; )
          if ((e.sqrTo(i, n), (t & (1 << o)) > 0)) e.mulTo(n, s, i);
          else {
            var h = i;
            (i = n), (n = h);
          }
        return e.revert(i);
      }),
      (r.prototype.chunkSize = function (t) {
        return Math.floor((Math.LN2 * this.DB) / Math.log(t));
      }),
      (r.prototype.toRadix = function (t) {
        if ((t == null && (t = 10), this.signum() == 0 || t < 2 || t > 36)) return "0";
        var e = this.chunkSize(t),
          i = Math.pow(t, e),
          n = P(i),
          s = g(),
          o = g(),
          h = "";
        for (this.divRemTo(n, s, o); s.signum() > 0; )
          (h = (i + o.intValue()).toString(t).substr(1) + h), s.divRemTo(n, s, o);
        return o.intValue().toString(t) + h;
      }),
      (r.prototype.fromRadix = function (t, e) {
        this.fromInt(0), e == null && (e = 10);
        for (
          var i = this.chunkSize(e), n = Math.pow(e, i), s = !1, o = 0, h = 0, a = 0;
          a < t.length;
          ++a
        ) {
          var f = xt(t, a);
          if (f < 0) {
            t.charAt(a) == "-" && this.signum() == 0 && (s = !0);
            continue;
          }
          (h = e * h + f), ++o >= i && (this.dMultiply(n), this.dAddOffset(h, 0), (o = 0), (h = 0));
        }
        o > 0 && (this.dMultiply(Math.pow(e, o)), this.dAddOffset(h, 0)),
          s && r.ZERO.subTo(this, this);
      }),
      (r.prototype.fromNumber = function (t, e, i) {
        if (typeof e == "number")
          if (t < 2) this.fromInt(1);
          else
            for (
              this.fromNumber(t, i),
                this.testBit(t - 1) || this.bitwiseTo(r.ONE.shiftLeft(t - 1), X, this),
                this.isEven() && this.dAddOffset(1, 0);
              !this.isProbablePrime(e);

            )
              this.dAddOffset(2, 0),
                this.bitLength() > t && this.subTo(r.ONE.shiftLeft(t - 1), this);
        else {
          var n = [],
            s = t & 7;
          (n.length = (t >> 3) + 1),
            e.nextBytes(n),
            s > 0 ? (n[0] &= (1 << s) - 1) : (n[0] = 0),
            this.fromString(n, 256);
        }
      }),
      (r.prototype.bitwiseTo = function (t, e, i) {
        var n,
          s,
          o = Math.min(t.t, this.t);
        for (n = 0; n < o; ++n) i[n] = e(this[n], t[n]);
        if (t.t < this.t) {
          for (s = t.s & this.DM, n = o; n < this.t; ++n) i[n] = e(this[n], s);
          i.t = this.t;
        } else {
          for (s = this.s & this.DM, n = o; n < t.t; ++n) i[n] = e(s, t[n]);
          i.t = t.t;
        }
        (i.s = e(this.s, t.s)), i.clamp();
      }),
      (r.prototype.changeBit = function (t, e) {
        var i = r.ONE.shiftLeft(t);
        return this.bitwiseTo(i, e, i), i;
      }),
      (r.prototype.addTo = function (t, e) {
        for (var i = 0, n = 0, s = Math.min(t.t, this.t); i < s; )
          (n += this[i] + t[i]), (e[i++] = n & this.DM), (n >>= this.DB);
        if (t.t < this.t) {
          for (n += t.s; i < this.t; ) (n += this[i]), (e[i++] = n & this.DM), (n >>= this.DB);
          n += this.s;
        } else {
          for (n += this.s; i < t.t; ) (n += t[i]), (e[i++] = n & this.DM), (n >>= this.DB);
          n += t.s;
        }
        (e.s = n < 0 ? -1 : 0),
          n > 0 ? (e[i++] = n) : n < -1 && (e[i++] = this.DV + n),
          (e.t = i),
          e.clamp();
      }),
      (r.prototype.dMultiply = function (t) {
        (this[this.t] = this.am(0, t - 1, this, 0, 0, this.t)), ++this.t, this.clamp();
      }),
      (r.prototype.dAddOffset = function (t, e) {
        if (t != 0) {
          for (; this.t <= e; ) this[this.t++] = 0;
          for (this[e] += t; this[e] >= this.DV; )
            (this[e] -= this.DV), ++e >= this.t && (this[this.t++] = 0), ++this[e];
        }
      }),
      (r.prototype.multiplyLowerTo = function (t, e, i) {
        var n = Math.min(this.t + t.t, e);
        for (i.s = 0, i.t = n; n > 0; ) i[--n] = 0;
        for (var s = i.t - this.t; n < s; ++n) i[n + this.t] = this.am(0, t[n], i, n, 0, this.t);
        for (var s = Math.min(t.t, e); n < s; ++n) this.am(0, t[n], i, n, 0, e - n);
        i.clamp();
      }),
      (r.prototype.multiplyUpperTo = function (t, e, i) {
        --e;
        var n = (i.t = this.t + t.t - e);
        for (i.s = 0; --n >= 0; ) i[n] = 0;
        for (n = Math.max(e - this.t, 0); n < t.t; ++n)
          i[this.t + n - e] = this.am(e - n, t[n], i, 0, 0, this.t + n - e);
        i.clamp(), i.drShiftTo(1, i);
      }),
      (r.prototype.modInt = function (t) {
        if (t <= 0) return 0;
        var e = this.DV % t,
          i = this.s < 0 ? t - 1 : 0;
        if (this.t > 0)
          if (e == 0) i = this[0] % t;
          else for (var n = this.t - 1; n >= 0; --n) i = (e * i + this[n]) % t;
        return i;
      }),
      (r.prototype.millerRabin = function (t) {
        var e = this.subtract(r.ONE),
          i = e.getLowestSetBit();
        if (i <= 0) return !1;
        var n = e.shiftRight(i);
        (t = (t + 1) >> 1), t > x.length && (t = x.length);
        for (var s = g(), o = 0; o < t; ++o) {
          s.fromInt(x[Math.floor(Math.random() * x.length)]);
          var h = s.modPow(n, this);
          if (h.compareTo(r.ONE) != 0 && h.compareTo(e) != 0) {
            for (var a = 1; a++ < i && h.compareTo(e) != 0; )
              if (((h = h.modPowInt(2, this)), h.compareTo(r.ONE) == 0)) return !1;
            if (h.compareTo(e) != 0) return !1;
          }
        }
        return !0;
      }),
      (r.prototype.square = function () {
        var t = g();
        return this.squareTo(t), t;
      }),
      (r.prototype.gcda = function (t, e) {
        var i = this.s < 0 ? this.negate() : this.clone(),
          n = t.s < 0 ? t.negate() : t.clone();
        if (i.compareTo(n) < 0) {
          var s = i;
          (i = n), (n = s);
        }
        var o = i.getLowestSetBit(),
          h = n.getLowestSetBit();
        if (h < 0) {
          e(i);
          return;
        }
        o < h && (h = o), h > 0 && (i.rShiftTo(h, i), n.rShiftTo(h, n));
        var a = function () {
          (o = i.getLowestSetBit()) > 0 && i.rShiftTo(o, i),
            (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
            i.compareTo(n) >= 0
              ? (i.subTo(n, i), i.rShiftTo(1, i))
              : (n.subTo(i, n), n.rShiftTo(1, n)),
            i.signum() > 0
              ? setTimeout(a, 0)
              : (h > 0 && n.lShiftTo(h, n),
                setTimeout(function () {
                  e(n);
                }, 0));
        };
        setTimeout(a, 10);
      }),
      (r.prototype.fromNumberAsync = function (t, e, i, n) {
        if (typeof e == "number")
          if (t < 2) this.fromInt(1);
          else {
            this.fromNumber(t, i),
              this.testBit(t - 1) || this.bitwiseTo(r.ONE.shiftLeft(t - 1), X, this),
              this.isEven() && this.dAddOffset(1, 0);
            var s = this,
              o = function () {
                s.dAddOffset(2, 0),
                  s.bitLength() > t && s.subTo(r.ONE.shiftLeft(t - 1), s),
                  s.isProbablePrime(e)
                    ? setTimeout(function () {
                        n();
                      }, 0)
                    : setTimeout(o, 0);
              };
            setTimeout(o, 0);
          }
        else {
          var h = [],
            a = t & 7;
          (h.length = (t >> 3) + 1),
            e.nextBytes(h),
            a > 0 ? (h[0] &= (1 << a) - 1) : (h[0] = 0),
            this.fromString(h, 256);
        }
      }),
      r
    );
  })(),
  ue = (function () {
    function r() {}
    return (
      (r.prototype.convert = function (t) {
        return t;
      }),
      (r.prototype.revert = function (t) {
        return t;
      }),
      (r.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i);
      }),
      (r.prototype.sqrTo = function (t, e) {
        t.squareTo(e);
      }),
      r
    );
  })(),
  wt = (function () {
    function r(t) {
      this.m = t;
    }
    return (
      (r.prototype.convert = function (t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
      }),
      (r.prototype.revert = function (t) {
        return t;
      }),
      (r.prototype.reduce = function (t) {
        t.divRemTo(this.m, null, t);
      }),
      (r.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i), this.reduce(i);
      }),
      (r.prototype.sqrTo = function (t, e) {
        t.squareTo(e), this.reduce(e);
      }),
      r
    );
  })(),
  Et = (function () {
    function r(t) {
      (this.m = t),
        (this.mp = t.invDigit()),
        (this.mpl = this.mp & 32767),
        (this.mph = this.mp >> 15),
        (this.um = (1 << (t.DB - 15)) - 1),
        (this.mt2 = 2 * t.t);
    }
    return (
      (r.prototype.convert = function (t) {
        var e = g();
        return (
          t.abs().dlShiftTo(this.m.t, e),
          e.divRemTo(this.m, null, e),
          t.s < 0 && e.compareTo(c.ZERO) > 0 && this.m.subTo(e, e),
          e
        );
      }),
      (r.prototype.revert = function (t) {
        var e = g();
        return t.copyTo(e), this.reduce(e), e;
      }),
      (r.prototype.reduce = function (t) {
        for (; t.t <= this.mt2; ) t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
          var i = t[e] & 32767,
            n =
              (i * this.mpl + (((i * this.mph + (t[e] >> 15) * this.mpl) & this.um) << 15)) & t.DM;
          for (i = e + this.m.t, t[i] += this.m.am(0, n, t, e, 0, this.m.t); t[i] >= t.DV; )
            (t[i] -= t.DV), t[++i]++;
        }
        t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
      }),
      (r.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i), this.reduce(i);
      }),
      (r.prototype.sqrTo = function (t, e) {
        t.squareTo(e), this.reduce(e);
      }),
      r
    );
  })(),
  fe = (function () {
    function r(t) {
      (this.m = t),
        (this.r2 = g()),
        (this.q3 = g()),
        c.ONE.dlShiftTo(2 * t.t, this.r2),
        (this.mu = this.r2.divide(t));
    }
    return (
      (r.prototype.convert = function (t) {
        if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
        if (t.compareTo(this.m) < 0) return t;
        var e = g();
        return t.copyTo(e), this.reduce(e), e;
      }),
      (r.prototype.revert = function (t) {
        return t;
      }),
      (r.prototype.reduce = function (t) {
        for (
          t.drShiftTo(this.m.t - 1, this.r2),
            t.t > this.m.t + 1 && ((t.t = this.m.t + 1), t.clamp()),
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
          t.compareTo(this.r2) < 0;

        )
          t.dAddOffset(1, this.m.t + 1);
        for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; ) t.subTo(this.m, t);
      }),
      (r.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i), this.reduce(i);
      }),
      (r.prototype.sqrTo = function (t, e) {
        t.squareTo(e), this.reduce(e);
      }),
      r
    );
  })();
function g() {
  return new c(null);
}
function T(r, t) {
  return new c(r, t);
}
var Dt = typeof navigator < "u";
Dt && Tt && navigator.appName == "Microsoft Internet Explorer"
  ? ((c.prototype.am = function (t, e, i, n, s, o) {
      for (var h = e & 32767, a = e >> 15; --o >= 0; ) {
        var f = this[t] & 32767,
          l = this[t++] >> 15,
          p = a * f + l * h;
        (f = h * f + ((p & 32767) << 15) + i[n] + (s & 1073741823)),
          (s = (f >>> 30) + (p >>> 15) + a * l + (s >>> 30)),
          (i[n++] = f & 1073741823);
      }
      return s;
    }),
    (F = 30))
  : Dt && Tt && navigator.appName != "Netscape"
    ? ((c.prototype.am = function (t, e, i, n, s, o) {
        for (; --o >= 0; ) {
          var h = e * this[t++] + i[n] + s;
          (s = Math.floor(h / 67108864)), (i[n++] = h & 67108863);
        }
        return s;
      }),
      (F = 26))
    : ((c.prototype.am = function (t, e, i, n, s, o) {
        for (var h = e & 16383, a = e >> 14; --o >= 0; ) {
          var f = this[t] & 16383,
            l = this[t++] >> 14,
            p = a * f + l * h;
          (f = h * f + ((p & 16383) << 14) + i[n] + s),
            (s = (f >> 28) + (p >> 14) + a * l),
            (i[n++] = f & 268435455);
        }
        return s;
      }),
      (F = 28));
c.prototype.DB = F;
c.prototype.DM = (1 << F) - 1;
c.prototype.DV = 1 << F;
var pt = 52;
c.prototype.FV = Math.pow(2, pt);
c.prototype.F1 = pt - F;
c.prototype.F2 = 2 * F - pt;
var ht = [],
  J,
  O;
J = 48;
for (O = 0; O <= 9; ++O) ht[J++] = O;
J = 97;
for (O = 10; O < 36; ++O) ht[J++] = O;
J = 65;
for (O = 10; O < 36; ++O) ht[J++] = O;
function xt(r, t) {
  var e = ht[r.charCodeAt(t)];
  return e ?? -1;
}
function P(r) {
  var t = g();
  return t.fromInt(r), t;
}
function tt(r) {
  var t = 1,
    e;
  return (
    (e = r >>> 16) != 0 && ((r = e), (t += 16)),
    (e = r >> 8) != 0 && ((r = e), (t += 8)),
    (e = r >> 4) != 0 && ((r = e), (t += 4)),
    (e = r >> 2) != 0 && ((r = e), (t += 2)),
    (e = r >> 1) != 0 && ((r = e), (t += 1)),
    t
  );
}
c.ZERO = P(0);
c.ONE = P(1);
var le = (function () {
  function r() {
    (this.i = 0), (this.j = 0), (this.S = []);
  }
  return (
    (r.prototype.init = function (t) {
      var e, i, n;
      for (e = 0; e < 256; ++e) this.S[e] = e;
      for (i = 0, e = 0; e < 256; ++e)
        (i = (i + this.S[e] + t[e % t.length]) & 255),
          (n = this.S[e]),
          (this.S[e] = this.S[i]),
          (this.S[i] = n);
      (this.i = 0), (this.j = 0);
    }),
    (r.prototype.next = function () {
      var t;
      return (
        (this.i = (this.i + 1) & 255),
        (this.j = (this.j + this.S[this.i]) & 255),
        (t = this.S[this.i]),
        (this.S[this.i] = this.S[this.j]),
        (this.S[this.j] = t),
        this.S[(t + this.S[this.i]) & 255]
      );
    }),
    r
  );
})();
function ce() {
  return new le();
}
var Ot = 256,
  et,
  q = null,
  V;
if (q == null) {
  (q = []), (V = 0);
  var it = void 0;
  if (typeof window < "u" && window.crypto && window.crypto.getRandomValues) {
    var ut = new Uint32Array(256);
    for (window.crypto.getRandomValues(ut), it = 0; it < ut.length; ++it) q[V++] = ut[it] & 255;
  }
  var rt = 0,
    nt = function (r) {
      if (((rt = rt || 0), rt >= 256 || V >= Ot)) {
        window.removeEventListener
          ? window.removeEventListener("mousemove", nt, !1)
          : window.detachEvent && window.detachEvent("onmousemove", nt);
        return;
      }
      try {
        var t = r.x + r.y;
        (q[V++] = t & 255), (rt += 1);
      } catch {}
    };
  typeof window < "u" &&
    (window.addEventListener
      ? window.addEventListener("mousemove", nt, !1)
      : window.attachEvent && window.attachEvent("onmousemove", nt));
}
function pe() {
  if (et == null) {
    for (et = ce(); V < Ot; ) {
      var r = Math.floor(65536 * Math.random());
      q[V++] = r & 255;
    }
    for (et.init(q), V = 0; V < q.length; ++V) q[V] = 0;
    V = 0;
  }
  return et.next();
}
var ct = (function () {
  function r() {}
  return (
    (r.prototype.nextBytes = function (t) {
      for (var e = 0; e < t.length; ++e) t[e] = pe();
    }),
    r
  );
})();
function de(r, t) {
  if (t < r.length + 22) return console.error("Message too long for RSA"), null;
  for (var e = t - r.length - 6, i = "", n = 0; n < e; n += 2) i += "ff";
  var s = "0001" + i + "00" + r;
  return T(s, 16);
}
function ge(r, t) {
  if (t < r.length + 11) return console.error("Message too long for RSA"), null;
  for (var e = [], i = r.length - 1; i >= 0 && t > 0; ) {
    var n = r.charCodeAt(i--);
    n < 128
      ? (e[--t] = n)
      : n > 127 && n < 2048
        ? ((e[--t] = (n & 63) | 128), (e[--t] = (n >> 6) | 192))
        : ((e[--t] = (n & 63) | 128), (e[--t] = ((n >> 6) & 63) | 128), (e[--t] = (n >> 12) | 224));
  }
  e[--t] = 0;
  for (var s = new ct(), o = []; t > 2; ) {
    for (o[0] = 0; o[0] == 0; ) s.nextBytes(o);
    e[--t] = o[0];
  }
  return (e[--t] = 2), (e[--t] = 0), new c(e);
}
var ve = (function () {
  function r() {
    (this.n = null),
      (this.e = 0),
      (this.d = null),
      (this.p = null),
      (this.q = null),
      (this.dmp1 = null),
      (this.dmq1 = null),
      (this.coeff = null);
  }
  return (
    (r.prototype.doPublic = function (t) {
      return t.modPowInt(this.e, this.n);
    }),
    (r.prototype.doPrivate = function (t) {
      if (this.p == null || this.q == null) return t.modPow(this.d, this.n);
      for (
        var e = t.mod(this.p).modPow(this.dmp1, this.p),
          i = t.mod(this.q).modPow(this.dmq1, this.q);
        e.compareTo(i) < 0;

      )
        e = e.add(this.p);
      return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i);
    }),
    (r.prototype.setPublic = function (t, e) {
      t != null && e != null && t.length > 0 && e.length > 0
        ? ((this.n = T(t, 16)), (this.e = parseInt(e, 16)))
        : console.error("Invalid RSA public key");
    }),
    (r.prototype.encrypt = function (t) {
      var e = (this.n.bitLength() + 7) >> 3,
        i = ge(t, e);
      if (i == null) return null;
      var n = this.doPublic(i);
      if (n == null) return null;
      for (var s = n.toString(16), o = s.length, h = 0; h < e * 2 - o; h++) s = "0" + s;
      return s;
    }),
    (r.prototype.setPrivate = function (t, e, i) {
      t != null && e != null && t.length > 0 && e.length > 0
        ? ((this.n = T(t, 16)), (this.e = parseInt(e, 16)), (this.d = T(i, 16)))
        : console.error("Invalid RSA private key");
    }),
    (r.prototype.setPrivateEx = function (t, e, i, n, s, o, h, a) {
      t != null && e != null && t.length > 0 && e.length > 0
        ? ((this.n = T(t, 16)),
          (this.e = parseInt(e, 16)),
          (this.d = T(i, 16)),
          (this.p = T(n, 16)),
          (this.q = T(s, 16)),
          (this.dmp1 = T(o, 16)),
          (this.dmq1 = T(h, 16)),
          (this.coeff = T(a, 16)))
        : console.error("Invalid RSA private key");
    }),
    (r.prototype.generate = function (t, e) {
      var i = new ct(),
        n = t >> 1;
      this.e = parseInt(e, 16);
      for (var s = new c(e, 16); ; ) {
        for (
          ;
          (this.p = new c(t - n, 1, i)),
            !(this.p.subtract(c.ONE).gcd(s).compareTo(c.ONE) == 0 && this.p.isProbablePrime(10));

        );
        for (
          ;
          (this.q = new c(n, 1, i)),
            !(this.q.subtract(c.ONE).gcd(s).compareTo(c.ONE) == 0 && this.q.isProbablePrime(10));

        );
        if (this.p.compareTo(this.q) <= 0) {
          var o = this.p;
          (this.p = this.q), (this.q = o);
        }
        var h = this.p.subtract(c.ONE),
          a = this.q.subtract(c.ONE),
          f = h.multiply(a);
        if (f.gcd(s).compareTo(c.ONE) == 0) {
          (this.n = this.p.multiply(this.q)),
            (this.d = s.modInverse(f)),
            (this.dmp1 = this.d.mod(h)),
            (this.dmq1 = this.d.mod(a)),
            (this.coeff = this.q.modInverse(this.p));
          break;
        }
      }
    }),
    (r.prototype.decrypt = function (t) {
      var e = T(t, 16),
        i = this.doPrivate(e);
      return i == null ? null : ye(i, (this.n.bitLength() + 7) >> 3);
    }),
    (r.prototype.generateAsync = function (t, e, i) {
      var n = new ct(),
        s = t >> 1;
      this.e = parseInt(e, 16);
      var o = new c(e, 16),
        h = this,
        a = function () {
          var f = function () {
              if (h.p.compareTo(h.q) <= 0) {
                var v = h.p;
                (h.p = h.q), (h.q = v);
              }
              var y = h.p.subtract(c.ONE),
                b = h.q.subtract(c.ONE),
                m = y.multiply(b);
              m.gcd(o).compareTo(c.ONE) == 0
                ? ((h.n = h.p.multiply(h.q)),
                  (h.d = o.modInverse(m)),
                  (h.dmp1 = h.d.mod(y)),
                  (h.dmq1 = h.d.mod(b)),
                  (h.coeff = h.q.modInverse(h.p)),
                  setTimeout(function () {
                    i();
                  }, 0))
                : setTimeout(a, 0);
            },
            l = function () {
              (h.q = g()),
                h.q.fromNumberAsync(s, 1, n, function () {
                  h.q.subtract(c.ONE).gcda(o, function (v) {
                    v.compareTo(c.ONE) == 0 && h.q.isProbablePrime(10)
                      ? setTimeout(f, 0)
                      : setTimeout(l, 0);
                  });
                });
            },
            p = function () {
              (h.p = g()),
                h.p.fromNumberAsync(t - s, 1, n, function () {
                  h.p.subtract(c.ONE).gcda(o, function (v) {
                    v.compareTo(c.ONE) == 0 && h.p.isProbablePrime(10)
                      ? setTimeout(l, 0)
                      : setTimeout(p, 0);
                  });
                });
            };
          setTimeout(p, 0);
        };
      setTimeout(a, 0);
    }),
    (r.prototype.sign = function (t, e, i) {
      var n = me(i),
        s = n + e(t).toString(),
        o = de(s, this.n.bitLength() / 4);
      if (o == null) return null;
      var h = this.doPrivate(o);
      if (h == null) return null;
      var a = h.toString(16);
      return a.length & 1 ? "0" + a : a;
    }),
    (r.prototype.verify = function (t, e, i) {
      var n = T(e, 16),
        s = this.doPublic(n);
      if (s == null) return null;
      var o = s.toString(16).replace(/^1f+00/, ""),
        h = Se(o);
      return h == i(t).toString();
    }),
    r
  );
})();
function ye(r, t) {
  for (var e = r.toByteArray(), i = 0; i < e.length && e[i] == 0; ) ++i;
  if (e.length - i != t - 1 || e[i] != 2) return null;
  for (++i; e[i] != 0; ) if (++i >= e.length) return null;
  for (var n = ""; ++i < e.length; ) {
    var s = e[i] & 255;
    s < 128
      ? (n += String.fromCharCode(s))
      : s > 191 && s < 224
        ? ((n += String.fromCharCode(((s & 31) << 6) | (e[i + 1] & 63))), ++i)
        : ((n += String.fromCharCode(((s & 15) << 12) | ((e[i + 1] & 63) << 6) | (e[i + 2] & 63))),
          (i += 2));
  }
  return n;
}
var st = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
function me(r) {
  return st[r] || "";
}
function Se(r) {
  for (var t in st)
    if (st.hasOwnProperty(t)) {
      var e = st[t],
        i = e.length;
      if (r.substr(0, i) == e) return r.substr(i);
    }
  return r;
}
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/ var w = {};
w.lang = {
  extend: function (r, t, e) {
    if (!t || !r)
      throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
    var i = function () {};
    if (
      ((i.prototype = t.prototype),
      (r.prototype = new i()),
      (r.prototype.constructor = r),
      (r.superclass = t.prototype),
      t.prototype.constructor == Object.prototype.constructor && (t.prototype.constructor = t),
      e)
    ) {
      var n;
      for (n in e) r.prototype[n] = e[n];
      var s = function () {},
        o = ["toString", "valueOf"];
      try {
        /MSIE/.test(navigator.userAgent) &&
          (s = function (h, a) {
            for (n = 0; n < o.length; n = n + 1) {
              var f = o[n],
                l = a[f];
              typeof l == "function" && l != Object.prototype[f] && (h[f] = l);
            }
          });
      } catch {}
      s(r.prototype, e);
    }
  }
};
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */ var u = {};
(typeof u.asn1 > "u" || !u.asn1) && (u.asn1 = {});
u.asn1.ASN1Util = new (function () {
  (this.integerToByteHex = function (r) {
    var t = r.toString(16);
    return t.length % 2 == 1 && (t = "0" + t), t;
  }),
    (this.bigIntToMinTwosComplementsHex = function (r) {
      var t = r.toString(16);
      if (t.substr(0, 1) != "-")
        t.length % 2 == 1 ? (t = "0" + t) : t.match(/^[0-7]/) || (t = "00" + t);
      else {
        var e = t.substr(1),
          i = e.length;
        i % 2 == 1 ? (i += 1) : t.match(/^[0-7]/) || (i += 2);
        for (var n = "", s = 0; s < i; s++) n += "f";
        var o = new c(n, 16),
          h = o.xor(r).add(c.ONE);
        t = h.toString(16).replace(/^-/, "");
      }
      return t;
    }),
    (this.getPEMStringFromHex = function (r, t) {
      return hextopem(r, t);
    }),
    (this.newObject = function (r) {
      var t = u,
        e = t.asn1,
        i = e.DERBoolean,
        n = e.DERInteger,
        s = e.DERBitString,
        o = e.DEROctetString,
        h = e.DERNull,
        a = e.DERObjectIdentifier,
        f = e.DEREnumerated,
        l = e.DERUTF8String,
        p = e.DERNumericString,
        v = e.DERPrintableString,
        y = e.DERTeletexString,
        b = e.DERIA5String,
        m = e.DERUTCTime,
        S = e.DERGeneralizedTime,
        R = e.DERSequence,
        B = e.DERSet,
        I = e.DERTaggedObject,
        k = e.ASN1Util.newObject,
        W = Object.keys(r);
      if (W.length != 1) throw "key of param shall be only one.";
      var d = W[0];
      if (
        ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(
          ":" + d + ":"
        ) == -1
      )
        throw "undefined key: " + d;
      if (d == "bool") return new i(r[d]);
      if (d == "int") return new n(r[d]);
      if (d == "bitstr") return new s(r[d]);
      if (d == "octstr") return new o(r[d]);
      if (d == "null") return new h(r[d]);
      if (d == "oid") return new a(r[d]);
      if (d == "enum") return new f(r[d]);
      if (d == "utf8str") return new l(r[d]);
      if (d == "numstr") return new p(r[d]);
      if (d == "prnstr") return new v(r[d]);
      if (d == "telstr") return new y(r[d]);
      if (d == "ia5str") return new b(r[d]);
      if (d == "utctime") return new m(r[d]);
      if (d == "gentime") return new S(r[d]);
      if (d == "seq") {
        for (var H = r[d], K = [], N = 0; N < H.length; N++) {
          var Q = k(H[N]);
          K.push(Q);
        }
        return new R({ array: K });
      }
      if (d == "set") {
        for (var H = r[d], K = [], N = 0; N < H.length; N++) {
          var Q = k(H[N]);
          K.push(Q);
        }
        return new B({ array: K });
      }
      if (d == "tag") {
        var E = r[d];
        if (Object.prototype.toString.call(E) === "[object Array]" && E.length == 3) {
          var It = k(E[2]);
          return new I({ tag: E[0], explicit: E[1], obj: It });
        } else {
          var $ = {};
          if (
            (E.explicit !== void 0 && ($.explicit = E.explicit),
            E.tag !== void 0 && ($.tag = E.tag),
            E.obj === void 0)
          )
            throw "obj shall be specified for 'tag'.";
          return ($.obj = k(E.obj)), new I($);
        }
      }
    }),
    (this.jsonToASN1HEX = function (r) {
      var t = this.newObject(r);
      return t.getEncodedHex();
    });
})();
u.asn1.ASN1Util.oidHexToInt = function (r) {
  for (
    var n = "",
      t = parseInt(r.substr(0, 2), 16),
      e = Math.floor(t / 40),
      i = t % 40,
      n = e + "." + i,
      s = "",
      o = 2;
    o < r.length;
    o += 2
  ) {
    var h = parseInt(r.substr(o, 2), 16),
      a = ("00000000" + h.toString(2)).slice(-8);
    if (((s = s + a.substr(1, 7)), a.substr(0, 1) == "0")) {
      var f = new c(s, 2);
      (n = n + "." + f.toString(10)), (s = "");
    }
  }
  return n;
};
u.asn1.ASN1Util.oidIntToHex = function (r) {
  var t = function (h) {
      var a = h.toString(16);
      return a.length == 1 && (a = "0" + a), a;
    },
    e = function (h) {
      var a = "",
        f = new c(h, 10),
        l = f.toString(2),
        p = 7 - (l.length % 7);
      p == 7 && (p = 0);
      for (var v = "", y = 0; y < p; y++) v += "0";
      l = v + l;
      for (var y = 0; y < l.length - 1; y += 7) {
        var b = l.substr(y, 7);
        y != l.length - 7 && (b = "1" + b), (a += t(parseInt(b, 2)));
      }
      return a;
    };
  if (!r.match(/^[0-9.]+$/)) throw "malformed oid string: " + r;
  var i = "",
    n = r.split("."),
    s = parseInt(n[0]) * 40 + parseInt(n[1]);
  (i += t(s)), n.splice(0, 2);
  for (var o = 0; o < n.length; o++) i += e(n[o]);
  return i;
};
u.asn1.ASN1Object = function () {
  var r = "";
  (this.getLengthHexFromValue = function () {
    if (typeof this.hV > "u" || this.hV == null) throw "this.hV is null or undefined.";
    if (this.hV.length % 2 == 1)
      throw "value hex must be even length: n=" + r.length + ",v=" + this.hV;
    var t = this.hV.length / 2,
      e = t.toString(16);
    if ((e.length % 2 == 1 && (e = "0" + e), t < 128)) return e;
    var i = e.length / 2;
    if (i > 15) throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
    var n = 128 + i;
    return n.toString(16) + e;
  }),
    (this.getEncodedHex = function () {
      return (
        (this.hTLV == null || this.isModified) &&
          ((this.hV = this.getFreshValueHex()),
          (this.hL = this.getLengthHexFromValue()),
          (this.hTLV = this.hT + this.hL + this.hV),
          (this.isModified = !1)),
        this.hTLV
      );
    }),
    (this.getValueHex = function () {
      return this.getEncodedHex(), this.hV;
    }),
    (this.getFreshValueHex = function () {
      return "";
    });
};
u.asn1.DERAbstractString = function (r) {
  u.asn1.DERAbstractString.superclass.constructor.call(this),
    (this.getString = function () {
      return this.s;
    }),
    (this.setString = function (t) {
      (this.hTLV = null), (this.isModified = !0), (this.s = t), (this.hV = stohex(this.s));
    }),
    (this.setStringHex = function (t) {
      (this.hTLV = null), (this.isModified = !0), (this.s = null), (this.hV = t);
    }),
    (this.getFreshValueHex = function () {
      return this.hV;
    }),
    typeof r < "u" &&
      (typeof r == "string"
        ? this.setString(r)
        : typeof r.str < "u"
          ? this.setString(r.str)
          : typeof r.hex < "u" && this.setStringHex(r.hex));
};
w.lang.extend(u.asn1.DERAbstractString, u.asn1.ASN1Object);
u.asn1.DERAbstractTime = function (r) {
  u.asn1.DERAbstractTime.superclass.constructor.call(this),
    (this.localDateToUTC = function (t) {
      utc = t.getTime() + t.getTimezoneOffset() * 6e4;
      var e = new Date(utc);
      return e;
    }),
    (this.formatDate = function (t, e, i) {
      var n = this.zeroPadding,
        s = this.localDateToUTC(t),
        o = String(s.getFullYear());
      e == "utc" && (o = o.substr(2, 2));
      var h = n(String(s.getMonth() + 1), 2),
        a = n(String(s.getDate()), 2),
        f = n(String(s.getHours()), 2),
        l = n(String(s.getMinutes()), 2),
        p = n(String(s.getSeconds()), 2),
        v = o + h + a + f + l + p;
      if (i === !0) {
        var y = s.getMilliseconds();
        if (y != 0) {
          var b = n(String(y), 3);
          (b = b.replace(/[0]+$/, "")), (v = v + "." + b);
        }
      }
      return v + "Z";
    }),
    (this.zeroPadding = function (t, e) {
      return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t;
    }),
    (this.getString = function () {
      return this.s;
    }),
    (this.setString = function (t) {
      (this.hTLV = null), (this.isModified = !0), (this.s = t), (this.hV = stohex(t));
    }),
    (this.setByDateValue = function (t, e, i, n, s, o) {
      var h = new Date(Date.UTC(t, e - 1, i, n, s, o, 0));
      this.setByDate(h);
    }),
    (this.getFreshValueHex = function () {
      return this.hV;
    });
};
w.lang.extend(u.asn1.DERAbstractTime, u.asn1.ASN1Object);
u.asn1.DERAbstractStructured = function (r) {
  u.asn1.DERAbstractString.superclass.constructor.call(this),
    (this.setByASN1ObjectArray = function (t) {
      (this.hTLV = null), (this.isModified = !0), (this.asn1Array = t);
    }),
    (this.appendASN1Object = function (t) {
      (this.hTLV = null), (this.isModified = !0), this.asn1Array.push(t);
    }),
    (this.asn1Array = new Array()),
    typeof r < "u" && typeof r.array < "u" && (this.asn1Array = r.array);
};
w.lang.extend(u.asn1.DERAbstractStructured, u.asn1.ASN1Object);
u.asn1.DERBoolean = function () {
  u.asn1.DERBoolean.superclass.constructor.call(this), (this.hT = "01"), (this.hTLV = "0101ff");
};
w.lang.extend(u.asn1.DERBoolean, u.asn1.ASN1Object);
u.asn1.DERInteger = function (r) {
  u.asn1.DERInteger.superclass.constructor.call(this),
    (this.hT = "02"),
    (this.setByBigInteger = function (t) {
      (this.hTLV = null),
        (this.isModified = !0),
        (this.hV = u.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t));
    }),
    (this.setByInteger = function (t) {
      var e = new c(String(t), 10);
      this.setByBigInteger(e);
    }),
    (this.setValueHex = function (t) {
      this.hV = t;
    }),
    (this.getFreshValueHex = function () {
      return this.hV;
    }),
    typeof r < "u" &&
      (typeof r.bigint < "u"
        ? this.setByBigInteger(r.bigint)
        : typeof r.int < "u"
          ? this.setByInteger(r.int)
          : typeof r == "number"
            ? this.setByInteger(r)
            : typeof r.hex < "u" && this.setValueHex(r.hex));
};
w.lang.extend(u.asn1.DERInteger, u.asn1.ASN1Object);
u.asn1.DERBitString = function (r) {
  if (r !== void 0 && typeof r.obj < "u") {
    var t = u.asn1.ASN1Util.newObject(r.obj);
    r.hex = "00" + t.getEncodedHex();
  }
  u.asn1.DERBitString.superclass.constructor.call(this),
    (this.hT = "03"),
    (this.setHexValueIncludingUnusedBits = function (e) {
      (this.hTLV = null), (this.isModified = !0), (this.hV = e);
    }),
    (this.setUnusedBitsAndHexValue = function (e, i) {
      if (e < 0 || 7 < e) throw "unused bits shall be from 0 to 7: u = " + e;
      var n = "0" + e;
      (this.hTLV = null), (this.isModified = !0), (this.hV = n + i);
    }),
    (this.setByBinaryString = function (e) {
      e = e.replace(/0+$/, "");
      var i = 8 - (e.length % 8);
      i == 8 && (i = 0);
      for (var n = 0; n <= i; n++) e += "0";
      for (var s = "", n = 0; n < e.length - 1; n += 8) {
        var o = e.substr(n, 8),
          h = parseInt(o, 2).toString(16);
        h.length == 1 && (h = "0" + h), (s += h);
      }
      (this.hTLV = null), (this.isModified = !0), (this.hV = "0" + i + s);
    }),
    (this.setByBooleanArray = function (e) {
      for (var i = "", n = 0; n < e.length; n++) e[n] == !0 ? (i += "1") : (i += "0");
      this.setByBinaryString(i);
    }),
    (this.newFalseArray = function (e) {
      for (var i = new Array(e), n = 0; n < e; n++) i[n] = !1;
      return i;
    }),
    (this.getFreshValueHex = function () {
      return this.hV;
    }),
    typeof r < "u" &&
      (typeof r == "string" && r.toLowerCase().match(/^[0-9a-f]+$/)
        ? this.setHexValueIncludingUnusedBits(r)
        : typeof r.hex < "u"
          ? this.setHexValueIncludingUnusedBits(r.hex)
          : typeof r.bin < "u"
            ? this.setByBinaryString(r.bin)
            : typeof r.array < "u" && this.setByBooleanArray(r.array));
};
w.lang.extend(u.asn1.DERBitString, u.asn1.ASN1Object);
u.asn1.DEROctetString = function (r) {
  if (r !== void 0 && typeof r.obj < "u") {
    var t = u.asn1.ASN1Util.newObject(r.obj);
    r.hex = t.getEncodedHex();
  }
  u.asn1.DEROctetString.superclass.constructor.call(this, r), (this.hT = "04");
};
w.lang.extend(u.asn1.DEROctetString, u.asn1.DERAbstractString);
u.asn1.DERNull = function () {
  u.asn1.DERNull.superclass.constructor.call(this), (this.hT = "05"), (this.hTLV = "0500");
};
w.lang.extend(u.asn1.DERNull, u.asn1.ASN1Object);
u.asn1.DERObjectIdentifier = function (r) {
  var t = function (i) {
      var n = i.toString(16);
      return n.length == 1 && (n = "0" + n), n;
    },
    e = function (i) {
      var n = "",
        s = new c(i, 10),
        o = s.toString(2),
        h = 7 - (o.length % 7);
      h == 7 && (h = 0);
      for (var a = "", f = 0; f < h; f++) a += "0";
      o = a + o;
      for (var f = 0; f < o.length - 1; f += 7) {
        var l = o.substr(f, 7);
        f != o.length - 7 && (l = "1" + l), (n += t(parseInt(l, 2)));
      }
      return n;
    };
  u.asn1.DERObjectIdentifier.superclass.constructor.call(this),
    (this.hT = "06"),
    (this.setValueHex = function (i) {
      (this.hTLV = null), (this.isModified = !0), (this.s = null), (this.hV = i);
    }),
    (this.setValueOidString = function (i) {
      if (!i.match(/^[0-9.]+$/)) throw "malformed oid string: " + i;
      var n = "",
        s = i.split("."),
        o = parseInt(s[0]) * 40 + parseInt(s[1]);
      (n += t(o)), s.splice(0, 2);
      for (var h = 0; h < s.length; h++) n += e(s[h]);
      (this.hTLV = null), (this.isModified = !0), (this.s = null), (this.hV = n);
    }),
    (this.setValueName = function (i) {
      var n = u.asn1.x509.OID.name2oid(i);
      if (n !== "") this.setValueOidString(n);
      else throw "DERObjectIdentifier oidName undefined: " + i;
    }),
    (this.getFreshValueHex = function () {
      return this.hV;
    }),
    r !== void 0 &&
      (typeof r == "string"
        ? r.match(/^[0-2].[0-9.]+$/)
          ? this.setValueOidString(r)
          : this.setValueName(r)
        : r.oid !== void 0
          ? this.setValueOidString(r.oid)
          : r.hex !== void 0
            ? this.setValueHex(r.hex)
            : r.name !== void 0 && this.setValueName(r.name));
};
w.lang.extend(u.asn1.DERObjectIdentifier, u.asn1.ASN1Object);
u.asn1.DEREnumerated = function (r) {
  u.asn1.DEREnumerated.superclass.constructor.call(this),
    (this.hT = "0a"),
    (this.setByBigInteger = function (t) {
      (this.hTLV = null),
        (this.isModified = !0),
        (this.hV = u.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t));
    }),
    (this.setByInteger = function (t) {
      var e = new c(String(t), 10);
      this.setByBigInteger(e);
    }),
    (this.setValueHex = function (t) {
      this.hV = t;
    }),
    (this.getFreshValueHex = function () {
      return this.hV;
    }),
    typeof r < "u" &&
      (typeof r.int < "u"
        ? this.setByInteger(r.int)
        : typeof r == "number"
          ? this.setByInteger(r)
          : typeof r.hex < "u" && this.setValueHex(r.hex));
};
w.lang.extend(u.asn1.DEREnumerated, u.asn1.ASN1Object);
u.asn1.DERUTF8String = function (r) {
  u.asn1.DERUTF8String.superclass.constructor.call(this, r), (this.hT = "0c");
};
w.lang.extend(u.asn1.DERUTF8String, u.asn1.DERAbstractString);
u.asn1.DERNumericString = function (r) {
  u.asn1.DERNumericString.superclass.constructor.call(this, r), (this.hT = "12");
};
w.lang.extend(u.asn1.DERNumericString, u.asn1.DERAbstractString);
u.asn1.DERPrintableString = function (r) {
  u.asn1.DERPrintableString.superclass.constructor.call(this, r), (this.hT = "13");
};
w.lang.extend(u.asn1.DERPrintableString, u.asn1.DERAbstractString);
u.asn1.DERTeletexString = function (r) {
  u.asn1.DERTeletexString.superclass.constructor.call(this, r), (this.hT = "14");
};
w.lang.extend(u.asn1.DERTeletexString, u.asn1.DERAbstractString);
u.asn1.DERIA5String = function (r) {
  u.asn1.DERIA5String.superclass.constructor.call(this, r), (this.hT = "16");
};
w.lang.extend(u.asn1.DERIA5String, u.asn1.DERAbstractString);
u.asn1.DERUTCTime = function (r) {
  u.asn1.DERUTCTime.superclass.constructor.call(this, r),
    (this.hT = "17"),
    (this.setByDate = function (t) {
      (this.hTLV = null),
        (this.isModified = !0),
        (this.date = t),
        (this.s = this.formatDate(this.date, "utc")),
        (this.hV = stohex(this.s));
    }),
    (this.getFreshValueHex = function () {
      return (
        typeof this.date > "u" &&
          typeof this.s > "u" &&
          ((this.date = new Date()),
          (this.s = this.formatDate(this.date, "utc")),
          (this.hV = stohex(this.s))),
        this.hV
      );
    }),
    r !== void 0 &&
      (r.str !== void 0
        ? this.setString(r.str)
        : typeof r == "string" && r.match(/^[0-9]{12}Z$/)
          ? this.setString(r)
          : r.hex !== void 0
            ? this.setStringHex(r.hex)
            : r.date !== void 0 && this.setByDate(r.date));
};
w.lang.extend(u.asn1.DERUTCTime, u.asn1.DERAbstractTime);
u.asn1.DERGeneralizedTime = function (r) {
  u.asn1.DERGeneralizedTime.superclass.constructor.call(this, r),
    (this.hT = "18"),
    (this.withMillis = !1),
    (this.setByDate = function (t) {
      (this.hTLV = null),
        (this.isModified = !0),
        (this.date = t),
        (this.s = this.formatDate(this.date, "gen", this.withMillis)),
        (this.hV = stohex(this.s));
    }),
    (this.getFreshValueHex = function () {
      return (
        this.date === void 0 &&
          this.s === void 0 &&
          ((this.date = new Date()),
          (this.s = this.formatDate(this.date, "gen", this.withMillis)),
          (this.hV = stohex(this.s))),
        this.hV
      );
    }),
    r !== void 0 &&
      (r.str !== void 0
        ? this.setString(r.str)
        : typeof r == "string" && r.match(/^[0-9]{14}Z$/)
          ? this.setString(r)
          : r.hex !== void 0
            ? this.setStringHex(r.hex)
            : r.date !== void 0 && this.setByDate(r.date),
      r.millis === !0 && (this.withMillis = !0));
};
w.lang.extend(u.asn1.DERGeneralizedTime, u.asn1.DERAbstractTime);
u.asn1.DERSequence = function (r) {
  u.asn1.DERSequence.superclass.constructor.call(this, r),
    (this.hT = "30"),
    (this.getFreshValueHex = function () {
      for (var t = "", e = 0; e < this.asn1Array.length; e++) {
        var i = this.asn1Array[e];
        t += i.getEncodedHex();
      }
      return (this.hV = t), this.hV;
    });
};
w.lang.extend(u.asn1.DERSequence, u.asn1.DERAbstractStructured);
u.asn1.DERSet = function (r) {
  u.asn1.DERSet.superclass.constructor.call(this, r),
    (this.hT = "31"),
    (this.sortFlag = !0),
    (this.getFreshValueHex = function () {
      for (var t = new Array(), e = 0; e < this.asn1Array.length; e++) {
        var i = this.asn1Array[e];
        t.push(i.getEncodedHex());
      }
      return this.sortFlag == !0 && t.sort(), (this.hV = t.join("")), this.hV;
    }),
    typeof r < "u" && typeof r.sortflag < "u" && r.sortflag == !1 && (this.sortFlag = !1);
};
w.lang.extend(u.asn1.DERSet, u.asn1.DERAbstractStructured);
u.asn1.DERTaggedObject = function (r) {
  u.asn1.DERTaggedObject.superclass.constructor.call(this),
    (this.hT = "a0"),
    (this.hV = ""),
    (this.isExplicit = !0),
    (this.asn1Object = null),
    (this.setASN1Object = function (t, e, i) {
      (this.hT = e),
        (this.isExplicit = t),
        (this.asn1Object = i),
        this.isExplicit
          ? ((this.hV = this.asn1Object.getEncodedHex()),
            (this.hTLV = null),
            (this.isModified = !0))
          : ((this.hV = null),
            (this.hTLV = i.getEncodedHex()),
            (this.hTLV = this.hTLV.replace(/^../, e)),
            (this.isModified = !1));
    }),
    (this.getFreshValueHex = function () {
      return this.hV;
    }),
    typeof r < "u" &&
      (typeof r.tag < "u" && (this.hT = r.tag),
      typeof r.explicit < "u" && (this.isExplicit = r.explicit),
      typeof r.obj < "u" &&
        ((this.asn1Object = r.obj), this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)));
};
w.lang.extend(u.asn1.DERTaggedObject, u.asn1.ASN1Object);
var be = (function () {
    var r = function (t, e) {
      return (
        (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (i, n) {
              i.__proto__ = n;
            }) ||
          function (i, n) {
            for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
          }),
        r(t, e)
      );
    };
    return function (t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
      r(t, e);
      function i() {
        this.constructor = t;
      }
      t.prototype = e === null ? Object.create(e) : ((i.prototype = e.prototype), new i());
    };
  })(),
  Rt = (function (r) {
    be(t, r);
    function t(e) {
      var i = r.call(this) || this;
      return (
        e &&
          (typeof e == "string"
            ? i.parseKey(e)
            : (t.hasPrivateKeyProperty(e) || t.hasPublicKeyProperty(e)) &&
              i.parsePropertiesFrom(e)),
        i
      );
    }
    return (
      (t.prototype.parseKey = function (e) {
        try {
          var i = 0,
            n = 0,
            s = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
            o = s.test(e) ? re.decode(e) : lt.unarmor(e),
            h = oe.decode(o);
          if ((h.sub.length === 3 && (h = h.sub[2].sub[0]), h.sub.length === 9)) {
            (i = h.sub[1].getHexStringValue()),
              (this.n = T(i, 16)),
              (n = h.sub[2].getHexStringValue()),
              (this.e = parseInt(n, 16));
            var a = h.sub[3].getHexStringValue();
            this.d = T(a, 16);
            var f = h.sub[4].getHexStringValue();
            this.p = T(f, 16);
            var l = h.sub[5].getHexStringValue();
            this.q = T(l, 16);
            var p = h.sub[6].getHexStringValue();
            this.dmp1 = T(p, 16);
            var v = h.sub[7].getHexStringValue();
            this.dmq1 = T(v, 16);
            var y = h.sub[8].getHexStringValue();
            this.coeff = T(y, 16);
          } else if (h.sub.length === 2)
            if (h.sub[0].sub) {
              var b = h.sub[1],
                m = b.sub[0];
              (i = m.sub[0].getHexStringValue()),
                (this.n = T(i, 16)),
                (n = m.sub[1].getHexStringValue()),
                (this.e = parseInt(n, 16));
            } else
              (i = h.sub[0].getHexStringValue()),
                (this.n = T(i, 16)),
                (n = h.sub[1].getHexStringValue()),
                (this.e = parseInt(n, 16));
          else return !1;
          return !0;
        } catch {
          return !1;
        }
      }),
      (t.prototype.getPrivateBaseKey = function () {
        var e = {
            array: [
              new u.asn1.DERInteger({ int: 0 }),
              new u.asn1.DERInteger({ bigint: this.n }),
              new u.asn1.DERInteger({ int: this.e }),
              new u.asn1.DERInteger({ bigint: this.d }),
              new u.asn1.DERInteger({ bigint: this.p }),
              new u.asn1.DERInteger({ bigint: this.q }),
              new u.asn1.DERInteger({ bigint: this.dmp1 }),
              new u.asn1.DERInteger({ bigint: this.dmq1 }),
              new u.asn1.DERInteger({ bigint: this.coeff })
            ]
          },
          i = new u.asn1.DERSequence(e);
        return i.getEncodedHex();
      }),
      (t.prototype.getPrivateBaseKeyB64 = function () {
        return ot(this.getPrivateBaseKey());
      }),
      (t.prototype.getPublicBaseKey = function () {
        var e = new u.asn1.DERSequence({
            array: [
              new u.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
              new u.asn1.DERNull()
            ]
          }),
          i = new u.asn1.DERSequence({
            array: [
              new u.asn1.DERInteger({ bigint: this.n }),
              new u.asn1.DERInteger({ int: this.e })
            ]
          }),
          n = new u.asn1.DERBitString({ hex: "00" + i.getEncodedHex() }),
          s = new u.asn1.DERSequence({ array: [e, n] });
        return s.getEncodedHex();
      }),
      (t.prototype.getPublicBaseKeyB64 = function () {
        return ot(this.getPublicBaseKey());
      }),
      (t.wordwrap = function (e, i) {
        if (((i = i || 64), !e)) return e;
        var n =
          "(.{1," +
          i +
          `})( +|$
?)|(.{1,` +
          i +
          "})";
        return e.match(RegExp(n, "g")).join(`
`);
      }),
      (t.prototype.getPrivateKey = function () {
        var e = `-----BEGIN RSA PRIVATE KEY-----
`;
        return (
          (e +=
            t.wordwrap(this.getPrivateBaseKeyB64()) +
            `
`),
          (e += "-----END RSA PRIVATE KEY-----"),
          e
        );
      }),
      (t.prototype.getPublicKey = function () {
        var e = `-----BEGIN PUBLIC KEY-----
`;
        return (
          (e +=
            t.wordwrap(this.getPublicBaseKeyB64()) +
            `
`),
          (e += "-----END PUBLIC KEY-----"),
          e
        );
      }),
      (t.hasPublicKeyProperty = function (e) {
        return (e = e || {}), e.hasOwnProperty("n") && e.hasOwnProperty("e");
      }),
      (t.hasPrivateKeyProperty = function (e) {
        return (
          (e = e || {}),
          e.hasOwnProperty("n") &&
            e.hasOwnProperty("e") &&
            e.hasOwnProperty("d") &&
            e.hasOwnProperty("p") &&
            e.hasOwnProperty("q") &&
            e.hasOwnProperty("dmp1") &&
            e.hasOwnProperty("dmq1") &&
            e.hasOwnProperty("coeff")
        );
      }),
      (t.prototype.parsePropertiesFrom = function (e) {
        (this.n = e.n),
          (this.e = e.e),
          e.hasOwnProperty("d") &&
            ((this.d = e.d),
            (this.p = e.p),
            (this.q = e.q),
            (this.dmp1 = e.dmp1),
            (this.dmq1 = e.dmq1),
            (this.coeff = e.coeff));
      }),
      t
    );
  })(ve),
  Te = {},
  ft,
  we =
    typeof process < "u"
      ? (ft = Te) === null || ft === void 0
        ? void 0
        : ft.npm_package_version
      : void 0,
  Vt = (function () {
    function r(t) {
      t === void 0 && (t = {}),
        (t = t || {}),
        (this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024),
        (this.default_public_exponent = t.default_public_exponent || "010001"),
        (this.log = t.log || !1),
        (this.key = null);
    }
    return (
      (r.prototype.setKey = function (t) {
        this.log && this.key && console.warn("A key was already set, overriding existing."),
          (this.key = new Rt(t));
      }),
      (r.prototype.setPrivateKey = function (t) {
        this.setKey(t);
      }),
      (r.prototype.setPublicKey = function (t) {
        this.setKey(t);
      }),
      (r.prototype.decrypt = function (t) {
        try {
          return this.getKey().decrypt(St(t));
        } catch {
          return !1;
        }
      }),
      (r.prototype.encrypt = function (t) {
        try {
          return ot(this.getKey().encrypt(t));
        } catch {
          return !1;
        }
      }),
      (r.prototype.sign = function (t, e, i) {
        try {
          return ot(this.getKey().sign(t, e, i));
        } catch {
          return !1;
        }
      }),
      (r.prototype.verify = function (t, e, i) {
        try {
          return this.getKey().verify(t, St(e), i);
        } catch {
          return !1;
        }
      }),
      (r.prototype.getKey = function (t) {
        if (!this.key) {
          if (((this.key = new Rt()), t && {}.toString.call(t) === "[object Function]")) {
            this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
            return;
          }
          this.key.generate(this.default_key_size, this.default_public_exponent);
        }
        return this.key;
      }),
      (r.prototype.getPrivateKey = function () {
        return this.getKey().getPrivateKey();
      }),
      (r.prototype.getPrivateKeyB64 = function () {
        return this.getKey().getPrivateBaseKeyB64();
      }),
      (r.prototype.getPublicKey = function () {
        return this.getKey().getPublicKey();
      }),
      (r.prototype.getPublicKeyB64 = function () {
        return this.getKey().getPublicBaseKeyB64();
      }),
      (r.version = we),
      r
    );
  })();
const Ee =
    "MIICWgIBAAKBgFh+ySRMploTBczwtZNZvm0Bb+7/pij+fYJr3hlQszeX8OBYm+KMfM5jzSryDYRwKHbC8PCK88zQDIlyGcpq0p5fNkFW6bDzzC7jZ35UMFjuuS4LH3LlJTLNNtZmsNnzz7VoQcNn1T47L0uryqLsoqnrJG5NpEoKrRXkFSyGmLz/AgMBAAECgYBWvLYTYRlvkdOOoqOl8EFoAA+hFmvbJE0KRwWilGmEZOVQTylDLOWrOUDABg1fsLrIZJvZeKgrKAQRt4c10evq7TKltE/uJW2J4fWAuAe+xjJzC9RPjbmg1FY6F3C/sg8OhtiObSbxUn4O/8IJICP+qb42IsYWvlp40FKA4b9myQJBAJwIIFB1rgrGx0jqvGDG1akmj1C+fOSL/1+oU0VpD/kTMpgPgsHF2ut3aWgsz3df5j40GEY1elUuUljDNBzCtX0CQQCRMYVcZy05tcioOCimzr3qqmdasE3X+ZGeRQQxhHc0Qxs+9hSUZDn9SJEOF8hcscwlPt07jnsjQl938CcY1RUrAkBsigaYkdQY8P/uDEQwegBlI0qsm2XbwjtKOph6f0Q6Oo2GU7vcuZq5E58CdbF4VAChIrIEHO1VVdy4nEmi/BstAkBpADokyA0B1kAFv49Oiub3pUJXaHbzQO4ZWmoc8WJPrlQu5UGeyxjQ3kDgwzxIJOCw8tSFdJYCusZV85wirj6/AkBferMDU/soKguTIMMBQdy8aJsWCHcj5ErDxqKLXacPzaRDN/LEi1EAAoReliO4v1Jyg99r0A6o87rWFCkr7p1Z",
  De =
    "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFh+ySRMploTBczwtZNZvm0Bb+7/pij+fYJr3hlQszeX8OBYm+KMfM5jzSryDYRwKHbC8PCK88zQDIlyGcpq0p5fNkFW6bDzzC7jZ35UMFjuuS4LH3LlJTLNNtZmsNnzz7VoQcNn1T47L0uryqLsoqnrJG5NpEoKrRXkFSyGmLz/AgMBAAE=",
  xe = (r, t) => {
    const e = new Vt();
    return e.setPublicKey(t), e.encrypt(r);
  },
  Re = (r, t) => {
    const e = new Vt();
    return e.setPrivateKey(t), e.decrypt(r);
  },
  Be = r => xe(r, De),
  Ae = r => Re(r, Ee),
  Oe = r => (Jt("data-v-4381713b"), (r = r()), Qt(), r),
  Ve = { class: "login" },
  Ie = Oe(() => _("div", { class: "login-title" }, [_("h2", null, "niu-be-admin")], -1)),
  Ne = { class: "p-2" },
  _e = { class: "captcha" },
  Ce = { class: "image-slot" },
  Me = Nt({
    __name: "index",
    setup(r) {
      const t = j(!1),
        e = j(dt),
        i = j(),
        n = j(!1),
        s = j(!1),
        o = j({ username: "", password: "", captchaCode: "" }),
        h = vt("username", ""),
        a = vt("password", ""),
        f = _t(() => ({
          username: [{ required: !0, trigger: "blur", message: "请输入账号" }],
          password: [
            { required: !0, trigger: "change", message: "请输入密码" },
            { trigger: "blur", validator: l }
          ]
        })),
        l = (m, S, R) => {
          S.length < 6 ? R(new Error("The password can not be less than 6 digits")) : R();
        },
        p = () => {
          e.value.validate(m => {
            m && ((n.value = !1), v(), Yt.push("/"));
          });
        },
        v = () => {
          const m = { ...o.value };
          return (
            (m.password = Be(m.password)),
            s.value && ((h.value = o.value.username), (a.value = m.password)),
            m
          );
        },
        y = () => {};
      Ct(() => {
        b();
      });
      const b = () => {
        h.value &&
          a.value &&
          ((o.value.username = h.value), (o.value.password = Ae(a.value)), (s.value = !0));
      };
      return (m, S) => {
        const R = Wt,
          B = kt,
          I = jt,
          k = Ut,
          W = qt("i-ep-picture"),
          d = zt,
          H = Zt,
          K = Gt,
          N = dt,
          Q = Ft;
        return (
          Mt(),
          Pt("div", Ve, [
            D(Q, null, {
              default: M(() => [
                Ie,
                D(
                  N,
                  {
                    ref_key: "loginFormRef",
                    ref: e,
                    model: A(o),
                    rules: A(f),
                    class: "login-form"
                  },
                  {
                    default: M(() => [
                      D(
                        I,
                        { prop: "username" },
                        {
                          default: M(() => [
                            _("span", null, [D(R, { "icon-class": "users" })]),
                            D(
                              B,
                              {
                                modelValue: A(o).username,
                                "onUpdate:modelValue": S[0] || (S[0] = E => (A(o).username = E)),
                                size: "large",
                                placeholder: "账号",
                                name: "username"
                              },
                              null,
                              8,
                              ["modelValue"]
                            )
                          ]),
                          _: 1
                        }
                      ),
                      D(
                        k,
                        { content: "查看密码", placement: "right" },
                        {
                          default: M(() => [
                            D(
                              I,
                              { prop: "password" },
                              {
                                default: M(() => [
                                  _("span", null, [D(R, { "icon-class": "password" })]),
                                  D(
                                    B,
                                    {
                                      modelValue: A(o).password,
                                      "onUpdate:modelValue":
                                        S[1] || (S[1] = E => (A(o).password = E)),
                                      placeholder: "密码",
                                      type: A(t) === !1 ? "password" : "input",
                                      size: "large",
                                      name: "password",
                                      style: { "margin-right": "6px" },
                                      onKeyup: gt(p, ["enter"])
                                    },
                                    null,
                                    8,
                                    ["modelValue", "type"]
                                  ),
                                  _("span", { onClick: S[2] || (S[2] = E => (t.value = !A(t))) }, [
                                    D(
                                      R,
                                      { "icon-class": A(t) === !1 ? "eye" : "eye-open" },
                                      null,
                                      8,
                                      ["icon-class"]
                                    )
                                  ])
                                ]),
                                _: 1
                              }
                            )
                          ]),
                          _: 1
                        }
                      ),
                      D(
                        I,
                        { prop: "captchaCode" },
                        {
                          default: M(() => [
                            _("span", Ne, [D(R, { "icon-class": "captcha" })]),
                            D(
                              B,
                              {
                                modelValue: A(o).captchaCode,
                                "onUpdate:modelValue": S[3] || (S[3] = E => (A(o).captchaCode = E)),
                                placeholder: "验证码",
                                class: "el-captcha-input",
                                onKeyup: gt(p, ["enter"])
                              },
                              null,
                              8,
                              ["modelValue"]
                            ),
                            _("div", _e, [
                              D(
                                d,
                                { src: A(i), onClick: y, class: "captcha-img" },
                                { error: M(() => [_("div", Ce, [D(W)])]), _: 1 },
                                8,
                                ["src"]
                              )
                            ])
                          ]),
                          _: 1
                        }
                      ),
                      _("div", null, [
                        D(
                          H,
                          {
                            modelValue: A(s),
                            "onUpdate:modelValue":
                              S[4] || (S[4] = E => (Ht(s) ? (s.value = E) : null)),
                            label: "记住我"
                          },
                          null,
                          8,
                          ["modelValue"]
                        )
                      ]),
                      D(
                        K,
                        {
                          loading: A(n),
                          type: "primary",
                          class: "login-button",
                          onClick: Kt(p, ["prevent"])
                        },
                        { default: M(() => [Lt("登 录 ")]), _: 1 },
                        8,
                        ["loading"]
                      )
                    ]),
                    _: 1
                  },
                  8,
                  ["model", "rules"]
                )
              ]),
              _: 1
            })
          ])
        );
      };
    }
  }),
  He = $t(Me, [["__scopeId", "data-v-4381713b"]]);
export { He as default };
