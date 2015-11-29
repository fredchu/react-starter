(function() {
    var TodoList = React.createClass({

        // getInitialState() executes exactly once during the lifecycle of the component and sets up the initial state of the component.
        getInitialState: function() {
            return {
                title: '',
                list: [],
                todoContent: ''
            };
        },

        // Here, componentDidMount is a method called automatically by React when a component is rendered.
        componentDidMount: function() {
            setTimeout(function() {
                this.setState({
                    title: this.state.todoContent || this.props.todoContentPlaceholder,
                    list: this.props.list,
                    todoContent: this.props.title
                });
            }.bind(this), 1000);
        },

        addTodo: function(e) {
            e.preventDefault();
            let todoContent = this.state.todoContent.trim();

            if (!todoContent) {
              return;
            }

            let list = this.state.list;

            list.push(todoContent);

            this.setState({list: list});

            this.resetTitleAndTodoContent();
        },

        removeTodo: function() {
            console.log('trigged removeTodo');
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
                    <h1>Todos count: <span>{this.state.list.length}</span></h1>
                    <h2>You're typing: {this.state.title}</h2>
                    <ul>
                        {this.state.list.map(function(todo, index) {
                           return (
                             <li key={index}><input type="submit" onClick={_this.removeTodo} value="Delete" /> {todo}</li>
                           );
                        })}
                    </ul>
                    <form action="" onSubmit={this.addTodo}>
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

    (function() {
        let data = {
            list: [
                'jQuery',
                'ReactJS',
                'AngularJS',
                'Vue.js',
                'Array.observe()'
            ],
            todoContentPlaceholder: 'Type some text YEAH'
        };

        ReactDOM.render(

            // Code here will be linted with JSHint.
            /* jshint ignore:start */
            <TodoList {...data}>Just testing children then transformed to state</TodoList>,

            // Code here will be ignored by JSHint.
            /* jshint ignore:end */
            document.getElementById('wrap')
        );
    }());
}());
