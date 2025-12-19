<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, PasswordInput } from '$lib/components/ui/Input';
	import type { AuthFormErrors } from '$lib/types/form-error';

	export let form: {
		errors?: AuthFormErrors;
	};

	$: errors = form?.errors ?? {};
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center">
		<div class="text-sm font-semibold tracking-widest text-sky-600">
			MUDRA
		</div>
		<h1 class="mt-2 text-2xl font-semibold text-zinc-900">
			Welcome back
		</h1>
		<p class="mt-1 text-sm text-zinc-500">
			Log in to continue managing your work
		</p>
	</div>

	<form method="POST" use:enhance class="space-y-5">
		<Input
			name="email"
			type="email"
			label="Email address"
			placeholder="you@example.com"
			required
			autocomplete="email"
			error={errors.email?.[0]}
		/>

		<PasswordInput
			required
			error={errors.password?.[0]}
		/>

		<button
			type="submit"
			class="mt-2 w-full rounded-lg bg-sky-600 py-2.5 text-sm font-medium text-white
			       transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
		>
			Sign in
		</button>
	</form>

	<p class="text-center text-sm text-zinc-500">
		Don’t have an account?
		<a href="/register" class="font-medium text-sky-600 hover:text-sky-700">
			Create one
		</a>
	</p>
</div>
