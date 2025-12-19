<script lang="ts">
	import type { InputProps, InputSize } from './input.types';

	export let id: InputProps['id'] = undefined;
	export let name: InputProps['name'] = undefined;
	export let type: InputProps['type'] = 'text';
	export let value: InputProps['value'] = '';
	export let placeholder: InputProps['placeholder'] = '';
	export let disabled: InputProps['disabled'] = false;
	export let required: InputProps['required'] = false;

	export let label: InputProps['label'] = undefined;
	export let error: InputProps['error'] = null;
	export let helper: InputProps['helper'] = null;

	export let size: InputSize = 'md';

	const sizes = {
		sm: 'h-9 text-sm px-3',
		md: 'h-11 text-sm px-4',
		lg: 'h-12 text-base px-4'
	};

	$: inputId = id ?? name;
</script>

<div class="space-y-1.5">
	{#if label}
		<label for={inputId} class="block text-xs font-medium text-zinc-600">
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	{/if}

	<input
		id={inputId}
		{name}
		{type}
		bind:value
		{placeholder}
		{disabled}
		{required}
		aria-invalid={!!error}
		{...$$restProps}
		class={[
			'w-full rounded-lg border bg-white text-gray-900',
			sizes[size],
			error
				? 'border-red-500 focus:ring-red-500/20'
				: 'border-zinc-300 focus:border-sky-500 focus:ring-sky-500/20',
			disabled && 'cursor-not-allowed bg-zinc-100 opacity-60',
			$$restProps.class
		]
			.filter(Boolean)
			.join(' ')}
	/>

	{#if error}
		<p class="text-xs text-red-600">{error}</p>
	{:else if helper}
		<p class="text-xs text-zinc-500">{helper}</p>
	{/if}
</div>
