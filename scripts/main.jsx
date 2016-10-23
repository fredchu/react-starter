(function() {
    var TodoList = React.createClass({

        // getInitialState() executes exactly once during the lifecycle of the component and sets up the initial state of the component.
        getInitialState: function() {
            return {
                title: '',
                todos: [],
                todoContent: ''
            };
        },

        // Here, componentDidMount is a method called automatically by React when a component is rendered.
        componentDidMount: function() {
            setTimeout(function() {
                let todos = this.props.todos.map(function(text, index) {
                    return {
                        isEditing: false,
                        textToUpdate: text,
                        text: text
                    };
                });

                this.setState({
                    title: this.state.todoContent || this.props.todoContentPlaceholder,
                    todos: todos,
                    todoContent: this.props.title
                });
            }.bind(this), 1000);
        },

        propTypes: {
            todos: React.PropTypes.array.isRequired,
            todoContentPlaceholder: React.PropTypes.string
        },

        createTodo: function(e) {
            e.preventDefault();
            let todoContent = this.state.todoContent.trim();

            if (!todoContent) {
                return;
            }

            let todos = this.state.todos;

            todos.push({
                isEditing: false,
                textToUpdate: todoContent,
                text: todoContent
            });

            this.setState({todos: todos});

            this.resetTitleAndTodoContent();
        },

        toggleEdit: function(e) {
            e.preventDefault();

            let index = parseInt(e.target.getAttribute('data-index'), 10);

            this.state.todos[index].isEditing = !this.state.todos[index].isEditing;

            this.setState({
                todos: this.state.todos
            });
        },

        updateEditingText: function(e) {
            var index = parseInt(e.target.getAttribute('data-index'), 10);

            this.state.todos[index].textToUpdate = e.target.value;
            this.setState({
                todos: this.state.todos
            });
        },

        updateTodo: function(e) {
            e.preventDefault();

            let index = parseInt(e.target.getAttribute('data-index'), 10);

            if (!this.state.todos[index].textToUpdate) {
                this.cancelEdit(index);
                return false;
            }

            this.state.todos[index].text = this.state.todos[index].textToUpdate;

            this.setState({
                todos: this.state.todos
            });

            this.toggleEdit(e);
        },

        resetEdit: function(index) {
            let todo = this.state.todos[index];

            todo.textToUpdate = todo.text;
            this.state.todos[index] = todo;

            this.setState({
                todos: this.state.todos
            });
        },

        cancelEdit: function(e) {
            this.resetEdit(parseInt(e.target.getAttribute('data-index'), 10));
            this.toggleEdit(e);
        },

        removeTodo: function(e) {
            this.state.todos.splice(parseInt(e.target.getAttribute('data-index'), 10), 1);

            this.setState({
                todos: this.state.todos
            });
        },

        setTitle: function(e) {
            this.setState({
                title: e.target.value.trim() || this.props.todoContentPlaceholder,
                todoContent: e.target.value
            });
        },

        resetTitleAndTodoContent: function() {
            this.setState({
                title: this.props.todoContentPlaceholder,
                todoContent: ''
            });
        },

        render: function() {
            // Code here will be linted with JSHint.
            /* jshint ignore:start */
            var _this = this;
            return (
                <div>
                    <h1>Todos count: <span>{this.state.todos.length}</span></h1>
                    <h2>You're typing: {this.state.title}</h2>
                    <ul>
                        {this.state.todos.map(function(todo, index) {
                            return (
                                <li key={index}>
                                    {todo.isEditing ? '' :
                                        <span>
                                            <input type="submit" data-index={index} onClick={_this.removeTodo} value="Delete"/>
                                            <input type="submit" data-index={index} onClick={_this.toggleEdit} value="Edit"/>
                                            {todo.text}
                                        </span>
                                    }

                                    {todo.isEditing ?
                                        <form data-index={index} onSubmit={_this.updateTodo}>
                                            <input type="text" data-index={index} value={todo.textToUpdate} onChange={_this.updateEditingText} placeholder={_this.props.todoContentPlaceholder}/>
                                            <input type="submit" value="Update"/>
                                            <input type="submit" data-index={index} onClick={_this.cancelEdit} value="Cancel"/>
                                        </form> : ''
                                    }
                                </li>
                            );
                        })}
                    </ul>
                    <form onSubmit={this.createTodo}>
                        <input type="text" value={this.state.todoContent} onChange={this.setTitle} placeholder={this.props.todoContentPlaceholder}/>
                        <input type="submit" value="Add a Todo" />
                    </form>
                    <div>{this.props.children}</div>
                </div>
            );

            // Code here will be ignored by JSHint.
            /* jshint ignore:end */
        }
    });

    TodoList.defaultProps = {
        todoContentPlaceholder: 'Default input placeholder'
    };

    (function() {
        let data = {
            todos: [
                'jQuery',
                'React',
                'AngularJS',
                'Vue.js',
                'Array.observe()'
            ],

            todoContentPlaceholder: 'Type some text YEAH'
        };

        // ReactDOM.render(

        //     // Code here will be linted with JSHint.
        //     /* jshint ignore:start */
        //     <TodoList {...data}>Just testing children then transformed to state</TodoList>,

        //     // Code here will be ignored by JSHint.
        //     /* jshint ignore:end */
        //     document.getElementById('wrap')
        // );

        ReactDOM.render(
            <TodoList {...data}>Just testing children then transformed to state</TodoList>,
            document.getElementById('wrap')
        );
    }());
}());
