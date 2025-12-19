<script lang="ts">
	export let data: {
		user: {
			id: string;
			email: string;
		} | null;
	};
</script>

<div class="dashboard-layout">
	<header class="header">
		<div class="brand">Mudra</div>

		{#if data.user}
			<div class="user">
				<span>{data.user.email}</span>

				<form method="POST" action="/logout">
					<button type="submit">Logout</button>
				</form>
			</div>
		{/if}
	</header>

	<main class="content">
		<slot />
	</main>
</div>

<style>
	.dashboard-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.header {
		height: 56px;
		padding: 0 16px;
		border-bottom: 1px solid #e5e7eb;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.brand {
		font-weight: 600;
	}

	.content {
		flex: 1;
		padding: 24px;
	}
</style>
