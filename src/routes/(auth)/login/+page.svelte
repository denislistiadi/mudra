<script lang="ts">
	export let form: {
		error?: string;
	};
</script>

<div class="space-y-8">
	<!-- Brand -->
	<div class="space-y-3 text-center">
		<div class="text-xs font-semibold tracking-widest text-sky-600">MUDRA</div>

		<h1 class="text-3xl font-semibold text-zinc-900">Welcome back</h1>

		<p class="text-sm text-zinc-500">Log in to continue managing your work</p>
	</div>

	<!-- Error -->
	{#if form?.error}
		<div
			class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
			role="alert"
		>
			{form.error}
		</div>
	{/if}

	<!-- Form -->
	<form method="POST" class="space-y-6">
		<div class="space-y-2">
			<label for="email" class="text-xs font-medium tracking-wide text-surface-500 uppercase">
				Email address
			</label>

			<input
				id="email"
				name="email"
				type="email"
				required
				autocomplete="email"
				placeholder="you@company.com"
				class=" h-11 w-full
		rounded-lg
		border border-zinc-300
		bg-white
		px-4
		text-sm text-zinc-900
		transition
		placeholder:text-zinc-400
		focus:border-sky-500
		focus:ring-2
		focus:ring-sky-500/20
		outline-none
	"
			/>
		</div>

		<div class="space-y-2">
			<label for="password" class="text-xs font-medium tracking-wide text-surface-500 uppercase">
				Password
			</label>

			<input
				id="password"
				name="password"
				type="password"
				required
				autocomplete="current-password"
				placeholder="••••••••"
				class="
		h-11 w-full
		rounded-lg
		border border-zinc-300
		bg-white
		px-4
		text-sm text-zinc-900
		transition
		placeholder:text-zinc-400
		focus:border-sky-500
		focus:ring-2
		focus:ring-sky-500/20
		outline-none
	"
			/>
		</div>

		<button
			type="submit"
			class="
		h-11 w-full
		rounded-lg
		bg-sky-600
		text-sm
		font-medium text-white
		shadow-sm
		transition
		hover:bg-sky-700
		active:scale-[0.99]
	"
		>
			Sign in
		</button>
	</form>

	<!-- Footer -->
	<p class="text-center text-sm text-zinc-500">
		Don’t have an account?
		<a href="/register" class="font-medium text-sky-600 hover:text-sky-700"> Create one </a>
	</p>
</div>
