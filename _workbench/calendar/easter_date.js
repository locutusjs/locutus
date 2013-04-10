function easter_date(year) {
    // Based on algorithm from polish wikipedia (http://pl.wikipedia.org/wiki/Wielkanoc)

    year = isNaN(year) ? new Date().getFullYear() : +year;

    var a = year % 19,
        b = year / 100 | 0,
        c = year % 100,
        h = (19 * a + b - (b / 4 | 0) - ((b - ((b + 8) / 25 | 0) + 1) / 3 | 0) + 15) % 30,
        l = (32 + 2 * (b % 4) + 2 * (c / 4 | 0) - h - c % 4) % 7,
        m = Math.floor((a + 11 * h + 22 * l) / 451);

        return new Date(year, Math.floor((h + l - 7 * m + 114) / 31) - 1, (h + l - 7 * m + 114) % 31 + 1) / 1e3 | 0;

}
