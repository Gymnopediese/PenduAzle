import { nat, nat32, Opt } from 'azle';
import { state } from './state';
import { Account, OwnerKey, Subaccount, SubaccountKey } from './types';
import { Users } from '../index';

export function set_account_balance(account: Account, balance: nat): boolean {
    // const { owner_key, subaccount_key } = get_account_keys(account);

    let owner_account = Users.get(account.owner).Some;

	if (owner_account === undefined) 
		return false;
	
    owner_account.balance = balance;
	Users.insert(account.owner, owner_account);
	return true
}

export function get_account_keys(account: Account): {
    owner_key: OwnerKey;
    subaccount_key: SubaccountKey;
} {
    const owner_key: OwnerKey = account.owner.toText();

    const subaccount_number: nat32 = subaccount_to_nat32(account.subaccount);
    const subaccount_key: SubaccountKey = subaccount_number.toString();

    return {
        owner_key,
        subaccount_key
    };
}

export function subaccount_to_nat32(subaccount: Opt<Subaccount>): nat32 {
	return 0;
	let acc = subaccount.Some?.buffer;
	if (acc == null)
		return 0;
    const subaccount_number =
        subaccount === null ? 0 : new DataView(acc).getUint32(0);
    return subaccount_number;
}

export function balance_of(account: Account): nat {
    const { owner_key, subaccount_key } = get_account_keys(account);
    return Users.get(account.owner).Some?.balance ?? 0n;
}
