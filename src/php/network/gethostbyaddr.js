module.exports = async function gethostbyaddr(ip) 
{
  //  discuss at: https://locutus.io/php/network/gethostbyaddr/
  // original by: Jimbolino (https://github.com/Jimbolino)
  //   example 1: await gethostbyaddr('1.1.1.1')
  //   returns 1: 'one.one.one.one'

  const ipReversed = ip.split('.').reverse().join('.');
  const url = 'https://cloudflare-dns.com/dns-query?name='+ipReversed+'.in-addr.arpa&type=PTR';
  const init = {
    headers: {
      'accept': 'application/dns-json',
    }
  };
  const response = await fetch(url, init);
  const data = await response.json();

  return data?.Answer?.[0]?.data ?? ip;
}
