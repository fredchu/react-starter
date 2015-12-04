'use strict';

(function () {
    var TodoList = React.createClass({
        displayName: 'TodoList',

        // getInitialState() executes exactly once during the lifecycle of the component and sets up the initial state of the component.
        getInitialState: function getInitialState() {
            return {
                title: '',
                todos: [],
                todoContent: ''
            };
        },

        // Here, componentDidMount is a method called automatically by React when a component is rendered.
        componentDidMount: function componentDidMount() {
            setTimeout((function () {
                var todos = this.props.todos.map(function (text, index) {
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
            }).bind(this), 1000);
        },

        propTypes: {
            todos: React.PropTypes.array.isRequired,
            todoContentPlaceholder: React.PropTypes.string
        },

        createTodo: function createTodo(e) {
            e.preventDefault();
            var todoContent = this.state.todoContent.trim();

            if (!todoContent) {
                return;
            }

            var todos = this.state.todos;

            todos.push({
                isEditing: false,
                textToUpdate: todoContent,
                text: todoContent
            });

            this.setState({ todos: todos });

            this.resetTitleAndTodoContent();
        },

        toggleEdit: function toggleEdit(e) {
            e.preventDefault();

            var index = parseInt(e.target.getAttribute('data-index'), 10);

            this.state.todos[index].isEditing = !this.state.todos[index].isEditing;

            this.setState({
                todos: this.state.todos
            });
        },

        updateEditingText: function updateEditingText(e) {
            var index = parseInt(e.target.getAttribute('data-index'), 10);

            this.state.todos[index].textToUpdate = e.target.value;
            this.setState({
                todos: this.state.todos
            });
        },

        updateTodo: function updateTodo(e) {
            e.preventDefault();

            var index = parseInt(e.target.getAttribute('data-index'), 10);

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

        resetEdit: function resetEdit(index) {
            var todo = this.state.todos[index];

            todo.textToUpdate = todo.text;
            this.state.todos[index] = todo;

            this.setState({
                todos: this.state.todos
            });
        },

        cancelEdit: function cancelEdit(e) {
            this.resetEdit(parseInt(e.target.getAttribute('data-index'), 10));
            this.toggleEdit(e);
        },

        removeTodo: function removeTodo(e) {
            this.state.todos.splice(parseInt(e.target.getAttribute('data-index'), 10), 1);

            this.setState({
                todos: this.state.todos
            });
        },

        setTitle: function setTitle(e) {
            this.setState({
                title: e.target.value.trim() || this.props.todoContentPlaceholder,
                todoContent: e.target.value
            });
        },

        resetTitleAndTodoContent: function resetTitleAndTodoContent() {
            this.setState({
                title: this.props.todoContentPlaceholder,
                todoContent: ''
            });
        },

        render: function render() {
            // Code here will be linted with JSHint.
            /* jshint ignore:start */
            var _this = this;
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Todos count: ',
                    React.createElement(
                        'span',
                        null,
                        this.state.todos.length
                    )
                ),
                React.createElement(
                    'h2',
                    null,
                    'You\'re typing: ',
                    this.state.title
                ),
                React.createElement(
                    'ul',
                    null,
                    this.state.todos.map(function (todo, index) {
                        return React.createElement(
                            'li',
                            { key: index },
                            todo.isEditing ? '' : React.createElement(
                                'span',
                                null,
                                React.createElement('input', { type: 'submit', 'data-index': index, onClick: _this.removeTodo, value: 'Delete' }),
                                React.createElement('input', { type: 'submit', 'data-index': index, onClick: _this.toggleEdit, value: 'Edit' }),
                                todo.text
                            ),
                            todo.isEditing ? React.createElement(
                                'form',
                                { 'data-index': index, onSubmit: _this.updateTodo },
                                React.createElement('input', { type: 'text', 'data-index': index, value: todo.textToUpdate, onChange: _this.updateEditingText, placeholder: _this.props.todoContentPlaceholder }),
                                React.createElement('input', { type: 'submit', value: 'Update' }),
                                React.createElement('input', { type: 'submit', 'data-index': index, onClick: _this.cancelEdit, value: 'Cancel' })
                            ) : ''
                        );
                    })
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.createTodo },
                    React.createElement('input', { type: 'text', value: this.state.todoContent, onChange: this.setTitle, placeholder: this.props.todoContentPlaceholder }),
                    React.createElement('input', { type: 'submit', value: 'Add a Todo' })
                ),
                React.createElement(
                    'div',
                    null,
                    this.props.children
                )
            );

            // Code here will be ignored by JSHint.
            /* jshint ignore:end */
        }
    });

    TodoList.defaultProps = {
        todoContentPlaceholder: 'Default input placeholder'
    };

    (function () {
        var data = {
            todos: ['jQuery', 'React', 'AngularJS', 'Vue.js', 'Array.observe()'],

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

        ReactDOM.render(React.createElement(
            TodoList,
            data,
            'Just testing children then transformed to state'
        ), document.getElementById('wrap'));
    })();
})();