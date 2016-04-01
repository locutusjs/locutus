/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

module.exports = {
  'ui': {
    'port': 3001,
    'weinre': {
      'port': 8080
    }
  },
  'files': [
    '_site/**',
    '!_site/blog.atom',
    '!_site/blog.rss',
    '!_site/npm-debug.*',
    '!_site/sitemap.xml'
  ],
  'online': false,
  'server': {
    'baseDir': '_site'
  },
  'logLevel': 'debug',
  'logPrefix': 'BS',
  'logConnections': true,
  'logFileChanges': true,
  'logSnippet': true
};
