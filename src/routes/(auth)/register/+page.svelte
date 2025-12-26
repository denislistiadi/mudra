<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { ActionData } from './+page.server';
	import { Input, PasswordInput } from '$lib/components/ui/form';
	import type { SubmitFunction } from '@sveltejs/kit';

	let submitting = false;

	const submit: SubmitFunction = () => {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
		};
	};

	$: form = page.form as ActionData | null;
	$: errors = form?.errors ?? {};
	$: formError = form?.formError;
</script>


<div class="space-y-8">
	<div class="text-center">
		<div class="text-sm font-semibold tracking-widest text-sky-600">MUDRA</div>
		<h1 class="mt-2 text-2xl font-semibold text-zinc-900">Create account</h1>
	</div>

	{#if formError}
		<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
			{formError}
		</div>
	{/if}

	<form method="POST" use:enhance={submit} class="space-y-5">
		<Input id="email" name="email" type="email" label="Email" required error={errors.email?.[0]} />

		<PasswordInput
			id="password"
			name="password"
			label="Password"
			required
			error={errors.password?.[0]}
		/>

		<PasswordInput
			id="confirmPassword"
			name="confirmPassword"
			label="Confirm password"
			required
			error={errors.confirmPassword?.[0]}
		/>

		<button
			type="submit"
			disabled={submitting}
			class="w-full rounded-lg bg-sky-600 py-2.5 text-sm font-medium
			text-white transition hover:bg-sky-700
			disabled:cursor-not-allowed disabled:bg-sky-400"
		>
			{submitting ? 'Creating account…' : 'Create account'}
		</button>
	</form>
</div>
