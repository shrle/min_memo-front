<template>
  <h2>todos</h2>
  <section class="main">
    <form action="/toggle-all" method="post">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        name="completed"
      />
      <label for="toggle-all">Mark all as complete</label>
    </form>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.title">
        {{ todo.title }}
        <form :action="todo.url" method="post">
          <button class="destroy" :form="'delete-' + todo.id"></button>
        </form>
      </li>

      <!--
					<li <%- todo.completed ? 'class="completed"' : '' %>>
						<form action="<%= todo.url %>" method="post">
							<div class="view">
								<input class="toggle" type="checkbox" name="completed" <%- todo.completed ? 'checked' : '' %> onchange="this.form.submit();">
								<label ondblclick="this.closest('li').className = this.closest('li').className + ' editing'; this.closest('li').querySelector('input.edit').focus(); this.closest('li').querySelector('input.edit').value = ''; this.closest('li').querySelector('input.edit').value = '<%= todo.title %>';"><%= todo.title %></label>
								<button class="destroy" form="delete-<%= todo.id %>"></button>
							</div>
							<input class="edit" name="title" value="<%= todo.title %>" onkeyup="if (event.keyCode == 27) { this.setAttribute('data-esc', ''); this.closest('li').className = this.closest('li').className.replace('editing', ''); }" onblur="if (this.getAttribute('data-esc') !== null) { return this.removeAttribute('data-esc'); } this.form.submit();">
							<% if (filter) { %>
							<input type="hidden" name="filter" value="<%= filter %>"/>
							<% } %>
						</form>
						<form id="delete-<%= todo.id %>" action="<%= todo.url %>/delete" method="post">
							<% if (filter) { %>
							<input type="hidden" name="filter" value="<%= filter %>"/>
							<% } %>
						</form>
					</li>
					<% }); %>
          -->
    </ul>
  </section>
</template>

<script>
export default {
  name: "UserTodos",
  props: {
    todos: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
