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
        var todoCotent = ReactDOM.findDOMNode(this.refs.todoCotent).value.trim();

        if (!todoCotent) {
          return;
        }

        var list = this.state.list;

        list.push(todoCotent);

        this.setState({list: list});
        ReactDOM.findDOMNode(this.refs.todoCotent).value = '';
    },
    render: function() {
        // Code here will be linted with JSHint.
        /* jshint ignore:start */
        return (
            <div>
                <h1>Todos count: <span>{this.state.list.length}</span></h1>
                <ul>
                    {this.state.list.map(function (todo) {
                       return (
                         <li key={todo.id}>{todo}</li>
                       );
                    })}
                </ul>
                <form action="" onSubmit={this.addTodo}>
                    <input type="text" ref="todoCotent" />
                    <input type="submit" value="Add a Todo" />
                </form>
            </div>
        );
        // Code here will be ignored by JSHint.
        /* jshint ignore:end */
    }
});

ReactDOM.render(
    // Code here will be linted with JSHint.
    /* jshint ignore:start */
    <TodoList />,
    // Code here will be ignored by JSHint.
    /* jshint ignore:end */
    document.getElementById('wrap')
);
