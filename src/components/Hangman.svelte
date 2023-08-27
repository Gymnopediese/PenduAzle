<script lang="ts">
  import { backend } from "../declarations/backend";

	export let key;
	import Koin from "../assets/koin.png";
	let infos: {wallet: BigInt, found: string, cagnote: number} = null
	let guess = ""
	let isvalid = true;
	let Index = -1;
	let sub = -1;
	async function init()
	{
		let res = await backend.hangman_get(key);
		infos = res;
		setInterval(async () => {
			let temp = await backend.hangman_get(key);
			if (temp.found != infos.found)
			{
				sub = -1;
				Index = -1;
				
			}
			infos = temp;
		}, 1000);
	}

	async function submit()
	{
		if (guess.length < 1)
			return ;
		let res = await backend.hangman_submit(guess, key);
		guess = "";
		if (res)
			isvalid = true
		else
		{
			startShaking();
		}
	}

	function handleLetterClick(index)
	{
		Index = index;
	}

	async function submitvote()
	{
		sub = Index;
		let res = await backend.hangman_vote(key, sub);
	}


	function startShaking() {
    isvalid = false;
		setTimeout(() => {
			isvalid = true;
		}, 500); // Reset the validity after 500ms
  	}
</script>

{#await init()}
	loading
{:then _} 
	<div class="father">
		<div class="word-container {isvalid ? "" : "shake"}">
		{#each infos.found as letter, index}
			{#if letter === '_'}
			<button
				class="letter-button"
				style="{index == sub ? 'background-color:green' : index == Index ? 'background-color:yellow' : ''}"
				on:click={() => handleLetterClick(index)}>
				{letter}
			</button>
			{:else}
			<span class="letter-button">{letter}</span>
			{/if}
		{/each}
		</div>
	</div>
	<button on:click={submitvote}>submit vote</button>
	<br>

	<p>cagnote: {Number(infos.cagnote) / 100000000.0}<img src={Koin} alt="Token Icon" width="16" height="16"></p>
	<p>your wallet: {Number(infos.wallet) / 100000000.0}<img src={Koin} alt="Token Icon" width="16" height="16"></p>
	<input bind:value={guess} type="text">
	<button on:click={submit}>submit</button>


{/await}

<!-- <style>
	.letter-button {
	  font-size: 24px;
	  margin: 5px;
	  padding: 10px 20px;
	  border: 1px solid #ccc;
	  cursor: pointer;
	}
  </style> -->
  


<style>
	.father {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.word-container {
    display: flex;
    align-items: center;
  }

  .letter-button {
    font-size: 24px;
    margin: 5px;
    padding: 10px 20px;
    border: 1px solid #ccc;
    cursor: pointer;
	height: auto;
  }

  .shake {
    animation: shake 0.4s ease-in-out;
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25%, 75% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
  }
  </style>
  
 