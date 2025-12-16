<script>
  export let data;
</script>

<h1>Dashboard {data.session.userId}</h1>
<p>You are authenticated.</p>

<form method="POST" action="/logout">
  <button>Logout</button>
</form>
