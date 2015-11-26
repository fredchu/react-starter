var TodoList = React.createClass({
    getInitialState: function () {
        return {
            list: [
                'jQuery',
                'ReactJS',
                'AngularJS',
                'Vue.js',
                'Array.observe()'
            ]
        };
    },
    addTodo: function (e){
        e.preventDefault();
        var todoCotent = React.findDOMNode(this.refs.todoCotent).value.trim();

        if (!todoCotent) {
          return;
        }

        var list = this.state.list;

        list.push(todoCotent);

        this.setState({list: list});
        React.findDOMNode(this.refs.todoCotent).value = '';
    },
    render: function() {
        var todos = this.state.list.map(function (todo) {
          return (
            <li>{todo}</li>
          );
        });

        return (
            <div>
                <h1>Todos count: <span>{this.state.list.length}</span></h1>
                <ul>
                    {todos}
                </ul>
                <form action="" onSubmit={this.addTodo}>
                    <input type="text" ref="todoCotent" />
                    <input type="submit" value="Add a Todo" />
                </form>
            </div>
        );
    }
});

React.render(
    <TodoList />,
    document.getElementById('wrap')
);
