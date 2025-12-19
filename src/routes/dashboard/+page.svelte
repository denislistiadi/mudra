<script lang="ts">
	export let data: {
		user: {
			email: string;
		} | null;
	};
</script>

<h1>Dashboard</h1>

<p>
	Welcome{data.user ? `, ${data.user.email}` : ''}
</p>
