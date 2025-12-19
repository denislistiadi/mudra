<script lang="ts">
	export let form;
</script>

<h1 class="text-2xl font-bold text-red-600">Login</h1>

<form method="POST">
	<div>
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label>Email</label>
		<input name="email" type="email" autocomplete="email" required />
	</div>

	<div>
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label>Password</label>
		<input name="password" type="password" autocomplete="current-password" required />
	</div>

	{#if form?.error}
		<p style="color: red">{form.error}</p>
	{/if}

	<button type="submit">Login</button>
</form>
