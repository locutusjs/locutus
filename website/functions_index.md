---
layout: page
title: "PHP functions for JavaScript"
permalink: /functions/
redirect_from:
- /functions/index/
- /categories/index/
- /categories/
- /packages/index/
- /packages/
---

If you are missing functions, there is a chance you may find them in our [experimental](https://github.com/kvz/phpjs/tree/master/experimental) 
and [workbench](https://github.com/kvz/phpjs/tree/master/workbench) folders. Warning: we keep 
these functions there for a reason.  


{% for f in site.functions %}


- {{f.category}}
- {{f.relative_path}}
- {{f.url}}
- {{f.path}}
{% endfor %}
