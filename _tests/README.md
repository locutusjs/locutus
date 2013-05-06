
# Cli

```bash
node cli.js -f ../functions/datetime/strtotime.js
node cli.js -f ../functions/datetime/date.js
```

# Web

```html
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="phpjs.js"></script>
<script type="text/javascript">
  // Get `code`
  Phpjs.parse(code, function (err, result) {
    if (err) {
      $('#content').append('<pre class="alert-warning alert">' + JSON.stringify(err, undefined, 2) + '</pre>');
    }
    $('#content').append('<pre>' + JSON.stringify(result, undefined, 2) + '</pre>');
    
    console.log(result);
  });
</script>
```

