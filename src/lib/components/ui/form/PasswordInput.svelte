<script lang="ts">
	import Input from './Input.svelte';
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';
	import type { FullAutoFill } from 'svelte/elements';

	export let id: string = '';
	export let name = 'password';
	export let value = '';
	export let label = 'Password';
	export let error: string | null | undefined = undefined;
	export let helper: string | undefined = undefined;
	export let required = false;
	export let autocomplete: FullAutoFill | null | undefined = 'current-password';

	let visible = false;
</script>

<div class="relative">
	<Input
		{id}
		{name}
		type={visible ? 'text' : 'password'}
		bind:value
		{label}
		{error}
		{helper}
		{required}
		{autocomplete}
	/>

	<button
		type="button"
		on:click={() => (visible = !visible)}
		class="absolute right-3 top-8.5 text-zinc-400 hover:text-zinc-600"
		tabindex="-1"
	>
		{#if visible}
			<EyeOff size={18} />
		{:else}
			<Eye size={18} />
		{/if}
	</button>
</div>
