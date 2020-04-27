import { SocksProxyAgent } from 'socks-proxy-agent';

let agent: SocksProxyAgent;

let botOption = {
  agent: null
};

let axiosOption = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
  }
};

// identify current system platform
if (process.env.SOCKS_PROXY_AGENT) {
  agent = new SocksProxyAgent(process.env.SOCKS_PROXY_AGENT);

  botOption = {
    agent: agent as any
  };

  axiosOption = Object.assign(axiosOption, {
    proxy: false,
    httpsAgent: agent
  });
}

export { botOption, axiosOption };
