! function () {
    "use strict";
    var r, e = [["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"], ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"], ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"]],
        t = ["рубль", "рубля", "рублей"],
        n = ["белорусский рубль", "белорусских рубля", "белорусских рублей"],
        u = function (r) {
            return parseFloat(r)
        },
        s = function (r, e) {
            if (3 !== e.length) return !1;
            r = Math.abs(r) % 100;
            var t = r % 10;
            return r > 10 && r < 20 ? e[2] : t > 1 && t < 5 ? e[1] : 1 === t ? e[0] : e[2]
        },
        i = function (r, i, a) {
            var f, l, o = "";
            if (3 === r.length && (f = r.substr(0, 1), r = r.substr(1, 3), o = e[2][f] + " "), r < 20 ? o = o + e[0][u(r)] + " " : (f = r.substr(0, 1), l = r.substr(1, 2), o = o + e[1][f] + " " + e[0][l] + " "), 0 === i) switch (a) {
                case "BYN":
                    o += s(r, n);
                    break;
                case "RU":
                default:
                    o += s(r, t)
            } else 1 === i ? "  " !== o && (o += s(r, ["тысяча ", "тысячи ", "тысяч "]), o = o.replace("один ", "одна ").replace("два ", "две ")) : 2 === i ? "  " !== o && (o += s(r, ["миллион ", "миллиона ", "миллионов "])) : 3 === i && (o += s(r, ["миллиард ", "миллиарда ", "миллиардов "]));
            return o
        },
        a = function (r) {
            var e = s(r, ["копейка", "копейки", "копеек"]);
            return 0 === r ? r = "00" : r < 10 && (r = "0" + r), " " + r + " " + e
        },
        f = function (r, e) {
            if (!r) return !1;
            var t = typeof r;
            if ("number" !== t && "string" !== t) return !1;
            if ("string" === t && (r = u(r.replace(",", ".")), isNaN(r))) return !1;
            if (r <= 0) return !1;
            var n, s;
            r = r.toFixed(2), -1 !== r.indexOf(".") && (n = r.split("."), r = n[0], s = n[1]);
            for (var f, l = "", o = r.length - 1, c = "", b = 0; o >= 0;) f = r.substr(o, 1), c = f + c, 3 !== c.length && 0 !== o || isNaN(u(c)) || (l = i(c, b, e) + l, c = "", b++), o--;
            return l = l.replace(/\s+/g, " "), s && (l += a(u(s))), l
        };
    r = "undefined" != typeof module && null !== module ? exports : window, r.rubles = f
}();
