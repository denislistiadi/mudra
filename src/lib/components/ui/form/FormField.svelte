<script lang="ts">
	export let id: string;
	export let label: string | undefined = undefined;
	export let error: string | null | undefined = undefined;
	export let helper: string | undefined = undefined;
	export let required = false;
</script>

<div class="space-y-1.5">
	{#if label}
		<label
			for={id}
			class="block text-xs font-medium text-zinc-600"
		>
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	{/if}

	<slot />

	{#if error}
		<p class="text-xs text-red-600">{error}</p>
	{:else if helper}
		<p class="text-xs text-zinc-500">{helper}</p>
	{/if}
</div>
