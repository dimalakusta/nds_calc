var okno_summa = document.getElementById('okno_summa');
window.onload = function() {

        chislaPropisiu();


}

//блок создания глобальных переменных и вызов основных функций
var summa = 0,
    stavk = 20,
    ndssm = 0,
    smbsn = 0,
    tiprs = 0,
    msshz = [],
    skr_pok_pr = 1,
    msncdan = [0, 20, 0, 0, 0],
    osnovn_dan = "osnov_dan",
    sohr_resul = "sohran_resultat",
    nastr_calc = "nastr_calc_vat";
skachatCookie();
SkachatSilku();
raschetNds();
vstavOtvet();
zagrDanVformu();
izm_vid_nach();
VivodSilkiVPole();
VivodCookie();
Dobavit_Sohr_Stroku();
downloadSettings();
//конец блок создания глобальных переменных и вызов основных функций


//функция для вывода чисел прописью
var nds_from = document.getElementById('okno_summa');
var okno_stavk_inp = document.getElementById('okno_stavk');
var pr1 = document.getElementById('props_1');
var pr2 = document.getElementById('props_2');
var pr3 = document.getElementById('props_3');


var b_nds = document.getElementById('summa_sbeznds_otvet');
var del_sp1,del_sp2, len, len2, len3;
function chislaPropisiu() {

    raschetNds();
    vstavOtvet();
    del_sp1 = nds_from.value.replace( /\s/g, '');
    del_sp2 = okno_stavk_inp.value.replace( /\s/g, '');
    len = Number(del_sp1.replace(",","."));
    len2 = Number(del_sp2.replace(",","."));



    if(isNaN(len)) {
        return false;
    } else if(isNaN(len2)) {
        return false;
    } else if (okno_stavk_inp.value.length == 0) {
        pr1.value = "Ноль рублей 00 копеек";
        pr2.value = "Ноль рублей 00 копеек";
        pr3.value = "Ноль рублей 00 копеек";
    } else if (nds_from.value.length == 0) {
        pr1.value = "Ноль рублей 00 копеек";
        pr2.value = "Ноль рублей 00 копеек";
        pr3.value = "Ноль рублей 00 копеек";
    } else if(nds_from.value == '0.00') {
        pr1.value = "Ноль рублей 00 копеек";
        pr2.value = "Ноль рублей 00 копеек";
        pr3.value = "Ноль рублей 00 копеек";
    } else  {
        
        var upFl1 = rubles(parseInt(len * 100)/100);
        var upFl2 = rubles(smbsn);
        var upFl3 = rubles(ndssm);


        var aaa = upFl1.toString();
        var aaa1 = upFl2.toString();
        var aaa2 = upFl3.toString();

        pr1.value = aaa[0].toUpperCase()+aaa.slice(1);

        pr2.value = aaa1[0].toUpperCase()+aaa1.slice(1);

        pr3.value = aaa2[0].toUpperCase()+aaa2.slice(1);




    }
    console.log(len);

}

function zagrSohrKorp(a) {
    a = msshz[a];
    summa = 1 * a[0];
    stavk = 1 * a[1];
    tiprs = 1 * a[2];
    zagrDanVformu();
    vivodOshibok();
    raschetNds();
    vstavOtvet();
    izm_vid_nach();

    VivodSilkiVPole();
    0 < window.location.hash.length && (window.location.hash = "");
    document.getElementById("podskaz_osn_sum").innerHTML = Nul_V_Silke(Videlit_Sohr_V_Silke(summa));
    chislaPropisiu();
}

//конец функция для вывода чисел прописью


//функции для создание куки, сохранение туда данных и потом вывода данных из них
function SozdCookie(a, c, b) {
    if (b) {
        var d = new Date;
        d.setTime(d.getTime() + 864E5 * b);
        b = "; expires=" + d.toGMTString();
    } else b = "";
    document.cookie = a + "=" + c + b + "; path=/;" ;

}

function SchitatCookie(a) {
    a += "=";
    for (var c = document.cookie.split(";"), b = 0; b < c.length; b++) {
        for (var d = c[b];
             " " == d.charAt(0);) d = d.substring(1, d.length);
        if (0 == d.indexOf(a)) return d.substring(a.length, d.length);
    }
    return null
}
function downloadSettings() {
    var a = SchitatCookie(nastr_calc);
    null != a && (skr_pok_pr = a);
    Knop_Scrit_Chisla()
}
function removeCookie(a) {
    SozdCookie(a, "", -1);
}
function ZapisatNastrCookie() {
    SozdCookie(nastr_calc, skr_pok_pr, 365);
}

function skachatCookie() {
    var a = SchitatCookie(osnovn_dan);
    null != a && 12 < a.length && (a = a.split("*****"), stavk = a[1], tiprs = a[2]);
}

function SaveThisCookie() {
    SozdCookie(osnovn_dan, summa + "*****" + stavk + "*****" + tiprs, 365);
}
function SohranitParamCookie() {
    var a = msshz.length;
    if (0 < a && 30 > a) {
        for (var c = [], b = 0; b < a; b++) c[b] = msshz[b].join("*****");
        a = c.join("~*~*~")
    } else a = "";
    SozdCookie(sohr_resul, a, 365);
}
//конец функции для создание куки, сохранение туда данных и потом вывода данных из них



//функция для генерации ссылки на результаты подсчетов
function Nul_V_Silke(a, c) {
    void 0 == c && (c = 2);
    var b = (a + "").split(".");
    void 0 == b[1] && (b[1] = "");
    b[1] += "0000000000";
    b[1] = b[1].substr(0, c);
    return b.join(".")
}

function Videlit_Sohr_V_Silke(a) {
    a = (a + "").split(".");
    for (var c = [], b = 0, d = a[0].length - 1; 0 <= d; --d) 3 == b ? (c[d] = a[0].substr(d, 1) + " ", b = 0) : c[d] = a[0].substr(d, 1), b++;
    a[0] = c.join("");
    return a.join(".")
}

function SkachatSilku() {
    var a = window.location.hash.substr(1);
    5 < a.length && (a = a.split("*"), summa = a[0], stavk = a[1], tiprs = a[2], SaveThisCookie());
}
function VivodSilkiVPole() {
    var a = window.location.href.split("#")[0] + "#" + summa + "*" + stavk + "*" + tiprs;
    document.getElementById("ssil_result").value = a;
}
//конец функция для генерации ссылки на результаты подсчетов


//заменить точку на запятую при вводе числа
function Zamenit_Tochku_Na_Zapiatuu(a) {
    a = (a + " ").split(",").join(".");
    return 1 * a
}
//конец заменить точку на запятую при вводе числа





//сохранить результат в нижний список
function Sohranit_Rez_V_Niz() {
    var a = vivodOshibok();
    "net" != a ? alert(a) : (a = msshz.length, 30 > a ? (msshz[a] = [summa, stavk, tiprs, ndssm], Dobavit_Sohr_Stroku(), SohranitParamCookie()) : alert("err!"));
}
//конец сохранить результат в нижний список


//удалить сохраненный результат по одному из нижнего списка
function Udalit_S_Nizu(a) {
    if (void 0 == a) msshz.length = 0;
    else if (0 <= a && 30 > a) {
        a *= 1;
        for (var c = msshz.length, b = [], d = 0, e = 0; e < c; e++) a != e && (b[d] = msshz[e], d++);
        msshz.length = 0;
        msshz = b
    }
    Dobavit_Sohr_Stroku();
    SohranitParamCookie()
}
//конец удалить сохраненный результат по одному из нижнего списка


//берем результат ввода НДС и процента ставки
function udalProbel(a) {
    a += "";
    for (var c = a.length, b = [], d = 0, e = 0; e < c; e++) {
        var f = a.substr(e, 1);
        " " != f && (b[d] = f, d++)
    }
    return b.join("");
}
function zagrDanVformu() {
    document.getElementById("okno_summa").value = Nul_V_Silke(summa);
    document.getElementById("okno_stavk").value = Nul_V_Silke(stavk);
}
//конец берем результат ввода НДС и процента ставки



//функция расчета формул для вычисления НДС
function raschetNds() {
    summa *= 1;
    stavk *= 1;
    if (1 == tiprs) {
        var a = stavk / 100 * summa;
        ndssm = +a.toFixed(2);
        a = 1 * summa + 1 * a
    } else a = summa * stavk / (100 + stavk), ndssm = +a.toFixed(2), a = 1 * summa - a;
    smbsn = a.toFixed(2);

}
//конец функция расчета формул для вычисления НДС


//функция которая меняет блоки на Выделить / Начислить при нажатии на красную ссылку сверху
function izm_vid_nach() {
    if (1 == tiprs) var a = "Начислить",
        c = "НДС на &nbsp;",
        b = "C НДС:&nbsp;",
        d = "#F2F9FF",
        e = "#0d4c0e";
    else a = "Выделить", c = "НДС из &nbsp;", b = "Без НДС:&nbsp;", d = "#0d4c0e", e = "#F2F9FF";
    document.getElementById("vidl_nach").innerHTML = a;
    document.getElementById("nds_na_is").innerHTML = c;
    document.getElementById("zag_pr_nd").innerHTML = b;
    document.getElementById("ram_kn_videl").style.borderColor = d;
    document.getElementById("ram_kn_nachs").style.borderColor = e;
}
//конец функция которая меняет блоки на Выделить / Начислить при нажатии на красную ссылку сверху



//функция которая меняет надписи c НДС" / "без НДС при нажатии на кнопки Выделить НДС / Начислить НДС
function vstavOtvet(a) {
    if (void 0 != a) var c = "&nbsp;";
    else {
        c = 1 == tiprs ? "c НДС" : "без НДС";
        var b = "'" + smbsn + "'";
        a = 'Сумма НДС - <span id="summa_nds_otvet" class="otvet_krasn_30" onclick="silka_chisla(' + ("'" + ndssm + "'") + ', 1);">' + Nul_V_Silke(Videlit_Sohr_V_Silke(ndssm)) + "</span> р.";
        c = "Сумма " + c + ' - <span id="summa_sbeznds_otvet" onclick="silka_chisla(' + b + ', 2);" style="cursor:pointer;">' + Nul_V_Silke(Videlit_Sohr_V_Silke(smbsn)) +
            "</span> р."
    }
    document.getElementById("pole_otvet_nds").innerHTML = a;
    document.getElementById("pole_otvet_bsnds").innerHTML = c;
}
//конец функция которая меняет надписи c НДС" / "без НДС при нажатии на кнопки Выделить НДС / Начислить НДС







//показывает ошибку при введении НЕ ЧИСЛА
function smnOknFrm() {
    var a = document.getElementById("okno_summa").value,
        c = document.getElementById("okno_stavk").value;
    a = udalProbel(a);
    c = udalProbel(c);
    a = Zamenit_Tochku_Na_Zapiatuu(a);
    c = Zamenit_Tochku_Na_Zapiatuu(c);
    a *= 1;
    c *= 1;
    var b = vivodOshibok();
    "net" != b ? (vstavOtvet(b), podskazka = "Ошибка !", document.getElementById("props_1").value = b, document.getElementById("props_2").value = b, document.getElementById("props_3").value = b) : (summa = a, stavk = c, podskazka = Nul_V_Silke(Videlit_Sohr_V_Silke(summa)), raschetNds(), vstavOtvet(),
        VivodSilkiVPole(), SaveThisCookie());
    document.getElementById("podskaz_osn_sum").innerHTML = podskazka;
    chislaPropisiu();
}
function vivodOshibok() {
    var a = "#C0C0C0",
        c = "#C0C0C0",
        b = document.getElementById("okno_summa").value,
        d = document.getElementById("okno_stavk").value;
    b = udalProbel(b);
    d = udalProbel(d);
    b = Zamenit_Tochku_Na_Zapiatuu(b);
    d = Zamenit_Tochku_Na_Zapiatuu(d);
    b *= 1;
    d *= 1;
    var e = [];
    isNaN(b) && (e[e.length] = ' в поле "Сумма"');
    isNaN(d) && (e[e.length] = ' в поле "Ставка"');
    0 < e.length ? (isNaN(b) && (a = "red"), isNaN(d) && (c = "red"), b = "Ошибки " +
        e.join("и")) : b = "net";
    document.getElementById("okno_summa").style.borderColor = a;
    document.getElementById("okno_stavk").style.borderColor = c;

    return b;
}
//конец показывает ошибку при введении НЕ ЧИСЛА


//отслеживаем клик по Выделить или Начислить и меняем формулы на соответствующие
function izm_vicheslenia(a) {
    var c = vivodOshibok();
    "net" != c ? (vstavOtvet(c), alert(c)) : (void 0 == a && 1 == tiprs ? a = 0 : void 0 == a && 0 == tiprs && (a = 1), tiprs = 1 == a ? 1 : 0, raschetNds(), vstavOtvet(), izm_vid_nach(), VivodSilkiVPole(), SaveThisCookie());
    chislaPropisiu();
}
function silka_chisla(a, c) {
    a = Nul_V_Silke(a);
    if (1 == c) var b = "summa_nds_otvet",
        d = "chrn_ar_26",
        e = 180;
    else 2 == c && (b = "summa_sbeznds_otvet", d = "chrn_ar_18", e = 180);
    if (1 == c || 2 == c) document.getElementById(b).innerHTML = '<input type="text" value="' + a + '" class="' + d + '" id="pole_copirov_' + c + '" readonly style="padding-left:3px; width:' + e + 'px;">', document.getElementById("pole_copirov_" + c).select();
}
//конец отслеживаем клик по Выделить или Начислить и меняем формулы на соответствующие





//очистить поля ввода
function Ochistit_pole() {

    summa = msncdan[0];
    stavk = msncdan[1];
    ndssm = msncdan[2];
    smbsn = msncdan[3];
    tiprs = msncdan[4];
    raschetNds();
    vstavOtvet();
    izm_vid_nach();
    zagrDanVformu();
    VivodSilkiVPole();
    0 < window.location.hash.length && (window.location.hash = "");
    SaveThisCookie();
    vivodOshibok();
    document.getElementById("podskaz_osn_sum").innerHTML = "0.00";
    document.getElementById("props_1").value = 'Ноль рублей 00 копеек';
    document.getElementById("props_2").value = 'Ноль рублей 00 копеек';
    document.getElementById("props_3").value = 'Ноль рублей 00 копеек';

}
//конец очистить поля ввода








//вывод сохранившихся результатов
function Dobavit_Sohr_Stroku() {
    var a = [],
        c = msshz.length;
    if (0 < c) {
        for (var b = c - 1, d = 0; d < c; d++) {
            if (1 == msshz[b][2]) var e = "Начислить",
                f = "на";
            else e = "Выделить", f = "из";
            var g = Videlit_Sohr_V_Silke(Nul_V_Silke(msshz[b][0])),
                h = Videlit_Sohr_V_Silke(Nul_V_Silke(msshz[b][1])),
                k = Videlit_Sohr_V_Silke(Nul_V_Silke(msshz[b][3]));
            a[d] = '<tr><td width="36" height="30" align="right">' + (b + 1) + '.&nbsp;</td><td height="30"><span style="cursor: pointer;" onclick="zagrSohrKorp(' +
                b + ');"><span class="otvet_krasn_ar_16_b">' + e + "</span> НДС " + f + ' <span class="chrn_ar_16_b_otvet">' + g + '</span>' +
                ' р. по ставке <span class="chrn_ar_16_b_otvet">' + h + '</span> %.<span style="white-space:nowrap;"> Сумма НДС - <span class="otvet_krasn_ar_16_b">' + k + '</span> р. </span></span></td><td width="29" height="30" align="right"><a href="javascript:Udalit_S_Nizu(' + b + ');"><img src="./images/delete.png" width="14" height="14" border="0"></a></td></tr>';
            --b
        }
        c = '<tr><td width="36" height="30" align="right">&nbsp;</td><td height="30" align="right"><a href="javascript:Udalit_S_Nizu();">Удалить все</a></td><td width="29" height="30" align="right"><a href="javascript:Udalit_S_Nizu();"><img src="./images/delete.png" width="14" height="14" border="0"></a></td></tr>'
    } else a[0] = '<tr><td width="36" height="30" align="right">&nbsp;</td><td height="30" align="left">Сохраненных результатов нет</td><td width="29" height="30" align="right">&nbsp;</td></tr>',
        c = "";
    a = '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="osn_ar_16"><tr><td height="60" colspan="3" class="sin_ar_20_b">Сохраненные результаты</td></tr>' + a.join("") + c + "</table>";
    document.getElementById("sohr_result_vstav").innerHTML = a;
}
//конец вывод сохранившихся результатов



//вывод сохранившихся результатов из куки

function VivodCookie() {
    var a = SchitatCookie(sohr_resul);
    if (null != a && 15 < a.length) {
        a = a.split("~*~*~");
        for (var c = a.length, b = 0; b < c; b++) {
            var d = a[b].split("*****");
            msshz[b] = d;
        }
    }
}
//конец вывод сохранившихся результатов из куки

//скрыть / показать числа прописью
function Knop_Scrit_Chisla() {
    skr_pok_pr *= 1;
    if (1 == skr_pok_pr)
        var a = "Скрыть числа прописью"
            , c = "visible"
            , b = "";
    else
        a = "Показать числа прописью",
            c = "hidden",
            b = "10px";
    document.getElementById("ssil_chsl_prp").innerHTML = a;
    a = document.getElementById("blok_chsl_prp");
    a.style.height = b;
    a.style.visibility = c;
}
function Skrit_Pokazat_Chisla() {
    skr_pok_pr *= 1;
    skr_pok_pr = 1 == skr_pok_pr ? 0 : 1;
    Knop_Scrit_Chisla();
    ZapisatNastrCookie();
}
//конец скрыть / показать числа прописью

