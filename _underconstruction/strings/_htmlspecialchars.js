function htmlspecialchars(s, t, c)
{
        s = s.toString().replace(/&/g,'&amp;').replace(/</g, '&lt;').replace(/>/g,'&gt;');
        switch(t)
        {
                case 0:
                case 'ENT_NOQUOTES':
                        return s;
                case 3:
                case 5:
                case 'ENT_QUOTES':
                        return s.replace(/"/g,'&quot;').replace(/'/g,'&#039;');
                case 2:
                case 'ENT_COMPAT':
                default:
                        return s.replace(/"/g,'&quot;')
        };
}