<script lang="ts">
	import type { FullAutoFill } from 'svelte/elements';
	import FormField from './FormField.svelte';

	export let id: string = '';
	export let name: string;
	export let type = 'text';
	export let value = '';
	export let placeholder = '';
	export let disabled = false;
	export let required = false;
	export let autocomplete: FullAutoFill | null | undefined = undefined;

	export let label: string | undefined = undefined;
	export let error: string | null | undefined = undefined;
	export let helper: string | undefined = undefined;
</script>

<FormField {id} {label} {error} {helper} {required}>
	<input
		id={id}
		name={name}
		type={type}
		bind:value
		{placeholder}
		{disabled}
		{required}
		{autocomplete}
		aria-invalid={!!error}
		class="
			w-full h-11 rounded-lg border px-4 text-sm
			bg-white text-zinc-900 placeholder:text-zinc-400

			outline-none
			focus:ring-2 focus:ring-offset-0
			transition

			{error
				? 'border-red-500 focus:ring-red-500/20'
				: 'border-zinc-300 focus:border-sky-500 focus:ring-sky-500/20'}

			{disabled ? 'opacity-60 bg-zinc-100 cursor-not-allowed' : ''}
		"
	/>
</FormField>
