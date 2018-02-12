var myMDPlugin = require("./EditorPlugin/index");
var md = require('markdown-it')({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     true,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      true,        // Autoconvert URL-like text to links
 
  // Enable some language-neutral replacement + quotes beautification
  typographer:  true,
  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',
 
  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externaly.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
});

md.use(myMDPlugin, {
  containerClassName: "video-embed"
});
 
md.use(require('markdown-it-container'), 'quiz', {
 
  validate: function(params) {
    return params.trim().match(/^quiz\s+(.*)$/);
  },
 
  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^quiz\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + m[1] + '</summary>\n';
    } else {
      // closing tag 
      return '</details>\n';
    }
  }
});

md.use(require('markdown-it-container'), 'page', {
 
  validate: function(params) {
    return params.trim().match(/^page\s+(.*)$/);
  },
 
  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^page\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + m[1] + '</summary>\n';
    } else {
      // closing tag 
      return '</details>\n';
    }
  }
});

export default md