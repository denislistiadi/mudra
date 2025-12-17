<script lang="ts">
	export let form;
</script>

<h1>Register</h1>

<form method="POST">
	<div>
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label>Email</label>
		<input type="email" name="email" autocomplete="email" required />
	</div>

	<div>
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label>Password</label>
		<input type="password" name="password" autocomplete="current-password" minlength="8" required />
	</div>

	{#if form?.error}
		<p style="color: red">{form.error}</p>
	{/if}

	<button type="submit">Create account</button>
</form>

<p>
	Already have an account?
	<a href="/login">Login</a>
</p>
