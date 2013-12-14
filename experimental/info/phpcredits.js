function phpcredits(flag) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: echo
    // *     example 1: phpcredits();
    // *     returns 1: true

    var xxbronze='', xxsilver='', xxgold='';

    switch (flag) {
        case 'CREDITS_DOCS':
        case 'CREDITS_FULLPAGE':
        case 'CREDITS_GENERAL':
        case 'CREDITS_GROUP':
        case 'CREDITS_MODULES':
        case 'CREDITS_SAPI':
            throw 'Submitted flag on phpcredits not implemented';
        case 'CREDITS_ALL':
        default:
            xxbronze="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0\
U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKESURBVDjLfZNLSFRRGIC/O3Pn1cyUlLXI\
lB6SQrXo/YSiRSQDualVUFZE1KJtrTKHIloEbQpqYUW4DipSehBIYWr00MIs0ckUR6Z8jqNz7/nP\
aTEqI2E/HM6D833n5/znWMYYZuLglUZz4lApTT+H0MogohHRaNEopdmzZgm36z7w/vZha4axyQst\
gtYG5U6DKteLyjWlDKIkH8GTP5k9zRWUI6xzP3PKuYvrCK4rOeH/BFoJExmX5dEAriMcMK/YER6g\
aKqb4kUh0pksIv/NQOKt7YMUBmzWRydYa36gl+8mZjWxLOyn+WMfWkl8XkHj9YrqL99T8ea2JLto\
hTWVSOFWNjlNtHz6SXtnMt5RV1Wdz1jGGHi4O4THW4bBC3ChM3bm/Op3pws3H0dcm8CvRzz8oJ9U\
lSZqyG0BNZXi5JvenODBtj4WlxcZLDAGjEaW7SRrr0Cnf+NVIwQyP7CmhnJJiwvpATxjw8dygmvF\
h1CmTu87G5HSI+ixFGrsN3o8hc6MYJwsGI3lX4AXhd3+lGBP12PCvqPW7EO6VFSK5qneXlmWLalE\
hpNIZhidGcVMjGEsQ0ANEfn4Ukirau4lr869xHh/FxHfFs+3hkf2yFeMdjBTE5hsBq0msX02kY7X\
QzimYgb+pwpcTKQpWPjCM57AKBeUC1rAne79dpo7/S/mLSMA3mBMCspzQ58i6B3FEypAdABZvLSE\
mvIN8wtqd4Qw1n6JrCTYXU/0eW3Xgrf196OpZgLecdTCVSBWbH6B6L0SXhHyPbuMv6XlLsps5Fbf\
Cd9Ab0X407N+MzkJrpkjmPMbGR0p8n5P9vDHOUftYMPs+o1EAxfL1gU7224ibMtH/gIKIWcO8vV/\
HwAAAABJRU5ErkJggg==";

            xxsilver="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0\
U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ0SURBVDjLfVJNaFNBEP5e8tLXkKqtSa0k\
VYKplFIsFNSTIgiFhoL04FnsQYTSW66BkIcezMlTD1LQS7wWjIdA6qEVKq1ixAqSWBqMFWJ/EtvU\
tMnb9+LM1kispAvD7s7M983Mt6vU63U01uiDhfrErT68+VqEJeowTUuaRSaEhWsBN6bj7/Fu+rbS\
wKhoWpZpwrLqEMYfoDjcTXFogkmF2QyBrfnyt5phQtRM+DQT1901GHQ2yCcJjyOwKPirYsB7QpOg\
gY4aBtwqTioGzp1yYq9SpSLHdmDqb1d+wKOp6DvdBrejhq6uLgy5LZxxtWEpvc5F9JYEC4+CkU/Z\
TX3pYwEXnAbO9vSgs7MTbqWMpQ/fsJIp6J/jdyPNGIVfIZ1OO4UQ/WR2wzDw9PXP+6OD2r0rQxdl\
UqFQwPNXXxLDXhHleK1GuhjGZigUykuC5eXldYfD4eP5iEQat26z2VCtVqGqKjY2NrC1tcVAGd/d\
3UWxWLwjn5Gck/v7+3Gfz9fBLe/s7KBSqUjjAkzcQ+MEAgFomsYFkcvlXhBuVml8pFQq1UeOl16v\
t7+9vR3lclkCOc7GPsuykEwmTcqLRKPRh/+IODIyskqzXc5ms7Pcpt1ulwA2JqARGVyknGAD/N8r\
jI+P71FCant7WxKwBrwriiJJSI89XddTLZ+RFyWNeTwe2bLL5cLBwYEUlM+0nyflL7UkmJmZcVIH\
N3t7e5HP55FIJFbn5+efLS4uolQqwe/3s+BjLQkIfKO7u9tJs7LST+g+HIlEJjKZTDAej39nPY4S\
qEfa962treUIOBkOh5MNfywWS05NTQ3Ozc09pj9wtRnzGyK4jfbwxX10AAAAAElFTkSuQmCC";

            xxgold="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0\
U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVDjLfZNLaNRXFIe/O//JTCePxqQi\
Rq2CDcQkGFoQF0VaCS4MAVGoiEhDpEigi0JxXYKhthTaTRcuVOhCIgXBFCtVCLb1laoNKkl8tIyP\
SCoTY8aOJqP538evixiZUOKBw+Uezve7h3PONZKYs81fntPuLfX8MZonOOF9wPtA8AHnAhveeYsD\
vVcZPPCRmWOSlFjwnhCEsy9BN3t6N+vOCe98KUKi9PLqNetxsaex7BIdb36FjT3W+lnB1wkE55ku\
WpZVpbGxp7X8J9bV3mGpbvN2dYap4gzev7YC3/Pn8DiL00maa56yOjVEoraVTZVnWFKR4vK1MYLz\
PQsKnPumrXvk74mey0M51pf/RrJuO4lF79Oc6OfK9VGG/8r13Ort7C5ljCTsxVUZKWpQUBQEX1zs\
6OpqOb1nZcseSKSIH/zIkfPRzzuahvZJCUIQ3hYn6rY/emAkEZ+tG1N543IJJKEgEjUfQPkqZJ8g\
W8BODuGLjxCGYC3xs/vE+ccdRhLF42ZLsPRGTZ9WJpfvRHGOED8h2Dz4IsiBSWKSVQRnKQweJT84\
coI0u8zcIhWOmPrgOZlas60hWrEVxePITaNQRP45mAiXf0ju1DEfP6O75Xvtn9fE6o+VJc26F/f6\
+sLTmyAhzaAwA4oxRIz/eixvZ2ibg/83hZqdmjKZin5byCIDKGAwII9CgIiptd+qf8ExAog32stq\
3sWYJHKOOP8QU1ZLIlVNasnSlcP7zNrS/Hl/YbJvcSaI1mhRE4Ur3zE5MJDFcKGiob6zas1G0nXN\
5O/k2oHhBTbRfWgqV2cmTu5l4veBg87yXuPX2v3v7Wzb3eOH/4mfx7yYpn1+ydIrHzvEJ9n93B35\
nM2lcUlc+ozqM7v44Zdt3CiN/wel+5Gy/cSN+gAAAABJRU5ErkJggg==";
            break;
    }

    try {
        this.echo('<b>PHP.JS Credits</b><br /><br />'+
            'Created by Kevin van Zonneveld.<br />'+
            'Contributors:'+
            '<img src="data:image/png;base64,'+xxgold+'" style="vertical-align:middle"><img src="data:image/png;base64,'+xxgold+'" style="vertical-align:middle"> <b>Two Gold Stars:</b> Onno Marsman (84)'+
            '<img src="data:image/png;base64,'+xxgold+'" style="vertical-align:middle"> <b>One Gold Star:</b> Michael White (18), Jack (14), _argos (14), Jonas Raoni Soares Silva (12), Legaev Andrey (10), Ates Goral (9), Philip Peterson (9), Martijn Wieringa (8), Philippe Baumann (6)'+
            '<img src="data:image/png;base64,'+xxsilver+'" style="vertical-align:middle"> <b>Silver Star:</b> Webtoolkit.info (5), Enrique Gonzalez (4), Carlos R. L. Rodrigues (4), GeekFG (3), Johnny Mast (3), d3x (3), Ash Searle (3), Erkekjetter (3), marrtins (3), Nate (2)'+
            '<img src="data:image/png;base64,'+xxbronze+'" style="vertical-align:middle"> <b>Bronze Star:</b> AJ (2), Sakimori (2), Karol Kowalski (2), Mirek Slugen (2), Thunder.m (2), Tyler Akins (2), Aman Gupta (2), Arpad Ray (2), Alfonso Jimenez (2), mdsjack (2)'+
            '<b>Other Contributors:</b> Sanjoy Roy (1), kenneth (1), Slawomir Kaniecki (1), Saulo Vallory (1), metjay (1), Scott Cariss (1), Simon Willison (1), penutbutterjelly (1), Pul (1), sowberry (1), stensi (1), Pyerre (1), ReverseSyntax (1), johnrembo (1), Robin (1), sankai (1), nobbler (1), Steve Clay (1), XoraX (1), echo is bad (1), Peter-Paul Koch (1), gabriel paderni (1), Yannoo (1), duncan (1), booeyOH (1), dptr1988 (1), baris ozdil (1), ger (1), Tim Wiel (1), Steven Levithan (1), Steve Hilder (1), jakes (1), john (1), hitwork (1), T.Wild (1), gorthaur (1), Thiago Mata (1), T0bsn (1), djmix (1), MeEtc (1), Atli &THORN;&oacute;r (1), Bayron Guevara (1), Ben Bryan (1), Benjamin Lupton (1), Christian Doebler (1), Cagri Ekin (1), Brett Zamir (1), Brad Touesnard (1), Andrea Giammarchi (1), Allan Jensen (1), Alexander Ermolaev (1), Alex (1), Anton Ongson (1), Arno (1), Cord (1), David James (1), Luke Godfrey (1), Lincoln Ramsay (1), Leslie Hoare (1), LH (1), Mateusz "loonquawl" Zalega (1), Mick@el (1), Ozh (1), Norman "zEh" Fuchs (1), Nick Callen (1), Nathan (1), Kirk Strobeck (1), Jon Hohle (1), FGFEmperor (1), DxGx (1), Dino (1), David (1), Felix Geisendoerfer (1), Francois (1), J A R (1), Howard Yeend (1), Gabriel Paderni (1), FremyCompany (1), Pedro Tainha (1)'
            );
        return true;
    } catch (e) {
        return false;
    }
}
