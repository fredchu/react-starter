var TodoList = React.createClass({
    getInitialState: function() {
        let list = [
            'jQuery',
            'ReactJS',
            'AngularJS',
            'Vue.js',
            'Array.observe()'
        ];

        let currentTyping = 'Type some text YEAH';

        return {
            list: list,
            currentTyping: currentTyping,
            passedChildren: this.props.children
        };
    },

    addTodo: function(e) {
        e.preventDefault();
        var todoContent = ReactDOM.findDOMNode(this.refs.todoContent).value.trim();

        if (!todoContent) {
          return;
        }

        var list = this.state.list;

        list.push(todoContent);

        this.setState({list: list});
        ReactDOM.findDOMNode(this.refs.todoContent).value = '';
    },

    showCurrentTyping: function(e) {
        this.setState({currentTyping: e.target.value || 'Type some text YEAH'});
    },

    render: function() {
        // Code here will be linted with JSHint.
        /* jshint ignore:start */
        return (
            <div>
                <h1>Todos count: <span>{this.state.list.length}</span></h1>
                <h2>You're typing: {this.state.currentTyping}</h2>
                <ul>
                    {this.state.list.map(function(todo) {
                       return (
                         <li key={todo.id}>{todo}</li>
                       );
                    })}
                </ul>
                <form action="" onSubmit={this.addTodo} onChange={this.showCurrentTyping}>
                    <input type="text" ref="todoContent" />
                    <input type="submit" value="Add a Todo" />
                </form>
                <div>{this.props.testStr}</div>
                <div>{this.props.testNum}</div>
                <div>{this.state.passedChildren}</div>
            </div>
        );

        // Code here will be ignored by JSHint.
        /* jshint ignore:end */
    }
});

ReactDOM.render(

    // Code here will be linted with JSHint.
    /* jshint ignore:start */
    <TodoList testNum={111}>Just testing children then transformed to state</TodoList>,

    // Code here will be ignored by JSHint.
    /* jshint ignore:end */
    document.getElementById('wrap')
);
