import { $query, $update, nat, StableBTreeMap, Opt, Record, Vec, nat64, nat8, text, Principal, StableGrowResult, $init, float32, ic} from 'azle';

import { icrc1_balance_of, icrc1_burn, icrc1_mint } from './icrc1/index';
import { icrc1 } from '../src/declarations/icrc1';
import { Account, TransferArgs } from './icrc1/types';
// This is a global variable that is stored on the heap

// export { Account, TransferArgs } from './icrc1/types';

type User = Record<{
	name: text,
	age: nat,
	balance: nat,
}>;

type Vote = Record<{
	weight: nat,
	index: nat8,
}>;

type Hangman = Record<{
	word: text,
	tries: nat,
	update: nat64,
	cagnote: nat,
	// used: Vec<nat8>,
	found: text,
}>;

type Infos = Record<{
	found: text,
	cagnote: nat,
	update: nat64,
	wallet: nat,
}>;

const icpWords = [
	"internet",
	"computer",
	"protocol",
	"canister",
	"blockchain",
	"smartcontract",
	"decentralized",
	"webassembly",
	"candid",
	"subnets",
	"consensus",
	"governance",
	"node",
	"ledger",
	"neuron",
	"replica",
	"subnet",
	"transaction",
	"nns",
	"icp",
  ];

let votes = new Map<string, Vote>();

let counter = new StableBTreeMap<nat, nat>(1, 100, 1_000_000);
let Hangmans = new StableBTreeMap<nat8, Hangman>(100, 1_000_000, 1_000_000);
export let Users = new StableBTreeMap<Principal,User>(4, 1_000_000, 1_000_000);

$update;
export function hangman_get(account: Principal): Infos {
	let hang = Hangmans.get(0).Some;
	let wallet = hangman_get_wallet(account);
	if (hang == null)
	{
		hang = initgame();
		return {found: hang.found, cagnote: hang.cagnote, update: hang.update, wallet};
	}
	if (BigInt(Date.now()) - hang.update < 6000n || hang.found == hang.word)
		return {found: hang.found, cagnote: hang.cagnote, update: hang.update, wallet};
	hang.update = BigInt(Date.now());
	if (votes.size == 0)
	{
		console.log("empty boy");
		return (empty_vote(hang, wallet));
	}
	let weights = new Array(hang.found.length).fill(0);
	for (let [_, value] of votes)
	{
		let index = value.index;
		let weight = value.weight;
		weights[index] += Number(weight);
	}
	let max = Math.max(...weights);
	max = weights.indexOf(max)
	hang.found = hang.found.substring(0, max) + hang.word[max] + hang.found.substring(max+1);
	console.log(hang.found);
	Hangmans.insert(0, hang);
	console.log(hang.found);
	votes.clear();
	return {found: hang.found, cagnote: hang.cagnote, update: hang.update, wallet};
}

function empty_vote(hang: Hangman, wallet: nat): Infos 
{
	let ind = [];
	for (let i = 0; i < hang.word.length; i++)
		if (hang.found[i] == "_")
			ind.push(i);
	let rand = ind[Math.floor(Math.random() * ind.length)];
	hang.found = hang.found.substring(0, rand) + hang.word[rand] + hang.found.substring(rand+1);
	Hangmans.insert(0, hang);
	votes.clear();
	return {found: hang.found, cagnote: hang.cagnote, update: hang.update, wallet};
}

$query;
export function hangman_get_wallet(account: Principal): nat {
	return (icrc1_balance_of({owner: account, subaccount: {None: null}}));
}

$update;
export function hangman_submit(tri: text, account: Principal): nat8 {
	let hang = Hangmans.get(0).Some;
	if (hang == null)
		return 0;
	let acc: Account = {owner: account, subaccount: {None: null}};
	let transaction: TransferArgs = {
		to: acc,
		amount: 10000000n,
		fee: {None: null},
		from_subaccount: {None: null},
		memo: {None: null},
		created_at_time: {Some: BigInt(Date.now())},
	};
	if (tri == hang.word)
	{
		transaction.amount = hang.cagnote;
		icrc1_mint(transaction);
		initgame();
		return 1;
	}
	icrc1_burn(transaction);
	hang.cagnote += 10000000n;
	Hangmans.insert(0, hang);
	return 0;
}

$update;
export function hangman_vote(user: Principal,index: nat8): void {
	let u = Users.get(user).Some;
	console.log(index, u?.balance);
	votes.set(user.toText(), {weight: u?.balance ?? 0n, index: index})
}

$update;
export function initgame(): Hangman
{
	votes.clear();
	let word = icpWords[Math.floor(Math.random() * icpWords.length)];
	let hang: Hangman = {
		word: word,
		tries: BigInt(0),
		update: BigInt(Date.now()),
		cagnote: 0n,
		// used: [],
		found: word.replace(/./g, "_"),
	};

	Hangmans.insert(0, hang);
	return (hang);
}


$query;
export function user_exist(type: Principal): nat8 {
    if (Users.get(type).Some != null)
		return 1;
	return 0;
}

$query;
export function user_get(type: Principal): User{
	let user = Users.get(type).Some;
	if (user == null)
		return {name: "", age: BigInt(0), balance: BigInt(0)};
	return user;
}

$update;
export function user_add(type: Principal, username: text, age: nat): void {
	let user: User = {name: username, age: age, balance: 0n};
	Users.insert(type, user);
	let acc: Account = {owner: type, subaccount: {None: null}};
	let transaction: TransferArgs = {
		to: acc,
		amount: 100000000n,
		fee: {None: null},
		from_subaccount: {None: null},
		memo: {None: null},
		created_at_time: {Some: BigInt(Date.now())},
	};
	icrc1_mint(transaction);
}

// Update calls take a few seconds to complete
// This is because they persist state changes and go through consensus
$update;
export function add(n : nat): nat {
	let count = counter.get(BigInt(0)).Some;
	if (count == null)
	count = BigInt(0);
	counter.insert(BigInt(0), count + n);
    return count + n;
}


$update;
export function inc(): nat {
	let count = counter.get(BigInt(0)).Some;
	if (count == null)
	count = BigInt(0);
	counter.insert(BigInt(0), count + BigInt(1));
    return count + BigInt(1);
}


// Query calls complete quickly because they do not go through consensus
$query;
export function get(): nat {
	let count = counter.get(BigInt(0)).Some;
	if (count == null)
		count = (BigInt(0));
    return count;
}

export {
    // get_transactions,
    icrc1_balance_of,
    icrc1_decimals,
    icrc1_fee,
    // icrc1_metadata,
    icrc1_minting_account,
    icrc1_name,
    // icrc1_supported_standards,
    icrc1_symbol,
    icrc1_total_supply,
    icrc1_transfer,
	icrc1_mint,
} from './icrc1/api';

export { init } from './icrc1/init';


