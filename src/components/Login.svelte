<script lang="ts">

	// index.ts
	import { Actor, HttpAgent } from "@dfinity/agent";
	import { AuthClient } from "@dfinity/auth-client";
	import idlFactory from "./did";
	import { backend, createActor} from "../declarations/backend";
  	import { inputBox } from "@dfinity/candid";
  	import { icrc1 } from "../declarations/icrc1";
  import { Opt } from "@dfinity/candid/lib/cjs/idl";
  import Hangman from "./Hangman.svelte";
	// import type { _SERVICE } from "./did";
	// import { renderIndex } from "./views";
	// import { renderLoggedIn } from "./views/loggedIn";
	let status = "ko";
	let authClient = null;
	let key;
	let user = null;

	async function init() {
		authClient = await AuthClient.create();
		if (await authClient.isAuthenticated()) {
			return (await handleAuthenticated(authClient));
		}
		// renderIndex();
		status = "notlogin";
		return ({authClient, is: "notlogin"});
	};

	async function login () {
		await authClient.login({
			onSuccess: async () => {
				handleAuthenticated(authClient);
			},
		});
	};

	async function handleAuthenticated(authClient: AuthClient) {
		const identity = await authClient.getIdentity();

		const agent = new HttpAgent({ identity });
		key = identity.getPrincipal();
		console.log(key);
		if (await backend.user_exist(key) == 0)
		{
			status = "noaccount";
			console.log("no account")
			return ({key, is: "noaccount"});
		}

		user = await backend.user_get((key));
		console.log(user);
		// authClient.
		// let actor = {
		// 	// agent: agent,
		// 	agentOptions: {
		// 		host: "http://localhost:3000",
		// 		identity: key
		// 	}
		// }
		// createActor(process.env.CANISTER_ID as string, actor);
		const whoami_actor = Actor.createActor<any>(idlFactory, {
			agent,
			canisterId: process.env.CANISTER_ID as string,
		});
		// renderLoggedIn(whoami_actor, authClient);
		status = "ok";
		return ({agent, is: "ok"});
	}
	let username = ""
	let age = 0;
	function create()
	{
		if (username == "" || age < 18)
			return ;
		backend.user_add((key), username, BigInt(age));
		status = "ok";
		user = {username, age};
	}
	async function add_coin()
	{
		console.log("adding coins");
		let a = await icrc1.icrc1_total_supply();
		console.log("mais");
		let owner = (await icrc1.icrc1_minting_account());
		let account = {owner: key, subaccount: []};
		console.log(owner[0].owner.toText())
		// icrc1.min
		// console.log(await icrc1.icrc1_transfer({
		// 	from_subaccount: ,
		// 	to: account,
		// 	amount: BigInt(100),
		// 	fee: [BigInt(0)],
		// 	memo: [[0]],
		// 	created_at_time: [BigInt(1234)],
		// }))
		console.log(a);
	}
</script>

{#await init()}
	wait for client
{:then authClient} 
	{#if status == "ok"}
		<p>Logged in as {user.name}</p>
		<Hangman key={key} />
	{:else if status == "noaccount"}
		<input bind:value={username} type="text" placeholder="username">
		<input bind:value={age} type="number" placeholder="age">
		<button on:click={create}>create account</button>
		<p>no account</p>
		
	{:else}
		<p>Not logged in</p>
		<button on:click={login} id="loginButton">LOGIN</button>
	{/if}
{/await}


