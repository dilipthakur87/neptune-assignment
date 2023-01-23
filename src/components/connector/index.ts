import { InjectedConnector } from '@web3-react/injected-connector';

export const inject: InjectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
});
