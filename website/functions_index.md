---
layout: page
title: "PHP functions for JavaScript"
permalink: /functions/
redirect_from:
- /categories/
- /categories/array/
- /categories/bc/
- /categories/ctype/
- /categories/datetime/
- /categories/exec/
- /categories/filesystem/
- /categories/funchand/
- /categories/i18n/
- /categories/index/
- /categories/info/
- /categories/json/
- /categories/math/
- /categories/misc/
- /categories/net/
- /categories/network/
- /categories/pcre/
- /categories/strings/
- /categories/url/
- /categories/var/
- /categories/xdiff/
- /categories/xml/
- /functions/index/
- /packages/
- /packages/index/
---



If you are missing functions, there is a chance you may find them in our [experimental](https://github.com/kvz/phpjs/tree/master/experimental) 
and [workbench](https://github.com/kvz/phpjs/tree/master/workbench) folders. Warning: we keep 
these functions there for a reason.  

{% assign categories = site.functions| group_by site.functions, "category" %}
{% for category in categories %}

<a name="{{ category.name }}"></a>

## {{ category.name }}

{% for function in category.items %}- [{{function.function}}](/functions/{{function.function}})
{% endfor %}
{% endfor %}
