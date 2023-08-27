import { balance_of } from './account';
import { nat, nat8, nat64, Opt, Query, $query } from 'azle';
import { state } from './state';
import { Account, SupportedStandard, Transaction } from './types';

// $query;
// export function get_transactions(
//     start: Opt<nat64>,
//     end: Opt<nat64>
// ):  Transaction[] {
//     return state.transactions.slice(
//         start === null ? 0 : Number(start),
//         end === null ? state.transactions.length : Number(end)
//     );
// }

$query;
export function icrc1_balance_of(account: Account): nat {
    return balance_of(account);
}

$query;
export function icrc1_decimals(): nat8 {
    return state.decimals;
}

$query;
export function icrc1_fee(): nat {
    return state.fee;
}

// $query;
// export function icrc1_metadata(): Metadatum[] {
//     return state.metadata;
// }

$query;
export function icrc1_minting_account(): Opt<Account> {
    return state.minting_account;
}

$query;
export function icrc1_name(): string {
    return state.name;
}

// $query;
// export function icrc1_supported_standards(): SupportedStandard[] {
//     return state.supported_standards;
// }

$query;
export function icrc1_symbol(): string {
    return state.symbol;
}

$query;
export function icrc1_total_supply(): nat {
    return state.total_supply;
}

export { icrc1_transfer } from './transfer';
export { icrc1_mint, icrc1_burn } from './transfer';
