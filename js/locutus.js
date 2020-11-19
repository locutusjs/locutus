var $ = $ || window.jQuery
$('section.authors').each(function () {
  var uniqueAuthors = {}
  var language = $(this).data('language')
  $(this).find('entry').each(function () {
    var type = $(this).data('type')
    var func = $(this).data('function')
    var author = $(this).text()
    var m = false
    if ((m = author.match(/Kevin van Zonneveld/))) {
      return
    } else if ((m = author.match(/^\s*(.+)\s*\(([^\)]+)\)\s*$/))) {
      author = '<a href="' + m[2] + '">' + m[1] + '</a>'
    } else if ((m = author.match(/^\s*(https?:\/\/.+)\s*$/i))) {
      author = '<a href="' + m[1] + '">' + m[1].split('/')[2] + '</a>'
    }

    if (!uniqueAuthors[author]) {
      uniqueAuthors[author] = {
        author: author
      }
    }
    if (!uniqueAuthors[author][type]) {
      uniqueAuthors[author][type] = 0
    }
    if (!uniqueAuthors[author].total) {
      uniqueAuthors[author].total = 0
    }
    if (!uniqueAuthors[author].functions) {
      uniqueAuthors[author].functions = []
    }

    uniqueAuthors[author][type]++
    uniqueAuthors[author].total++
    uniqueAuthors[author].functions.push(func)
  })

  var authorList = []
  for (var name in uniqueAuthors) {
    authorList.push(uniqueAuthors[name])
  }

  authorList = authorList.sort(function (a, b) {
    return b.total - a.total
  })

  var buf = ''
  buf += '<ol>'
  var position = 0
  for (var i in authorList) {
    var author = authorList[i]
    position++

    buf += '<li>'

    if (position < 11) {
      // buf += '<strong>'
    }
    buf += author.author
    if (position < 11) {
      // buf += '</strong>'
    }

    var contributionKeys = [
      'original by',
      'improved by',
      'reimplemented by',
      'parts by',
      'bugfixed by',
      'revised by',
      'input by'
    ]

    var contributions = []
    contributionKeys.forEach(function (key) {
      if (author[key]) {
        contributions.push(key.replace(' by', '') + ': ' + author[key])
      }
    })

    buf += '<small>'
    buf += contributions.join(' / ') + ' '
    if (author.total === 1) {
      buf += '(<a href="/' + language + '/' + author.functions[0] + '">' + author.functions[0] + '</a>) '
    }
    buf += '</small>'

    buf += '</li>'
  }
  buf += '</ol>'

  $(this).find('.draw').html(buf)
})

$('.on-the-githubs').onthegithubs()
