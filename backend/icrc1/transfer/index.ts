import { $update, ic, Update } from 'azle';
import { handle_burn } from '../transfer/burn';
import { handle_mint, is_minting_account } from '../transfer/mint';
import { handle_transfer } from '../transfer/transfer';
import { validate_transfer } from '../transfer/validate';
import {
    Account,
    TransferArgs,
    TransferResult
} from '../types';
import { state } from '../state';




$update;
export function icrc1_transfer_from(args: TransferArgs, from: Account): TransferResult {

    const validate_transfer_result = validate_transfer(args, from);

    if ('err' in validate_transfer_result) {
        return {
            Err: validate_transfer_result.err
        };
    }

    const from_is_minting_account = is_minting_account(from.owner);
    const to_is_minting_account = is_minting_account(args.to.owner);

    if (from_is_minting_account === true) {
        return handle_mint(args, from);
    }

    if (to_is_minting_account === true) {
        return handle_burn(args, from);
    }

    return handle_transfer(args, from);
}


$update;
export function icrc1_transfer(args: TransferArgs): TransferResult {
    const from: Account = {
        owner: ic.caller(),
        subaccount: args.from_subaccount
    };
	return (icrc1_transfer_from(args, from));
}

$update;
export function icrc1_mint(args: TransferArgs): TransferResult {
	return (handle_mint(args, state.minting_account));
}


$update;
export function icrc1_burn(args: TransferArgs): TransferResult {
	let from = args.to;
	args.to = state.minting_account;
	return (handle_burn(args, from));
}

