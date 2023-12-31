import { State } from './types';

export let state: State = {
    accounts: {},
    decimals: 0,
    fee: 0n,
    metadata: [],
    minting_account: {owner:"abcd-abcd-abcd", subaccount: {None: null}},
    name: 'Koin',
    permitted_drift_nanos: 60_000_000_000n,
    supported_standards: [],
    symbol: 'KOIN',
    total_supply: 100n,
    transactions: [],
    transaction_window_nanos: 24n * 60n * 60n * 1_000_000_000n
};
