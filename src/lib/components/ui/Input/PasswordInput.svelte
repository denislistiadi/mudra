<script lang="ts">
	import Input from './Input.svelte';
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';

	export let id: string | null = null;
	export let name = 'password';
	export let value = '';

	export let label = 'Password';
	export let placeholder = '••••••••';
	export let error: string | null = null;
	export let helper: string | null = null;
	export let required = false;
	export let autocomplete: string = 'current-password';

	let visible = false;
	const toggle = () => (visible = !visible);
</script>

<div class="relative">
	<Input
		{id}
		{name}
		type={visible ? 'text' : 'password'}
		bind:value
		{label}
		{placeholder}
		{error}
		{helper}
		{required}
		{autocomplete}
		class="pr-11"
	/>

	<button
		type="button"
		on:click={toggle}
		class="absolute top-8.5 right-3 text-zinc-400 hover:text-zinc-600"
		tabindex="-1"
	>
		{#if visible}
			<EyeOff size={18} />
		{:else}
			<Eye size={18} />
		{/if}
	</button>
</div>
