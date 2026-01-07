import todosReducer, {
    addTodoReducer,
    updateTodoReducer,
    deleteTodoReducer,
    hideComplitedReducer
} from './todosSlice';

describe('todosSlice', () => {
    const initialState = {
        todos: [],
    };

    test('should return the initial state', () => {
        expect(todosReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle addTodoReducer', () => {
        const newTodo = {
            id: 1,
            text: 'Test Todo',
            hour: '10:00',
            isToday: true,
            isComplited: false,
            reminderDate: '2023-10-27',
            reminderTime: '09:00',
        };
        const nextState = todosReducer(initialState, addTodoReducer(newTodo));
        expect(nextState.todos).toHaveLength(1);
        expect(nextState.todos[0]).toEqual(newTodo);
    });

    test('should handle updateTodoReducer', () => {
        const startState = {
            todos: [{
                id: 1,
                text: 'Old Text',
                isComplited: false
            }],
        };
        const updatePayload = {
            id: 1,
            text: 'New Text',
            isComplited: true
        };
        const nextState = todosReducer(startState, updateTodoReducer(updatePayload));
        expect(nextState.todos[0].text).toEqual('New Text');
        expect(nextState.todos[0].isComplited).toEqual(true);
    });

    test('should handle deleteTodoReducer', () => {
        const startState = {
            todos: [{
                id: 1,
                text: 'To be deleted',
            }],
        };
        const nextState = todosReducer(startState, deleteTodoReducer(1));
        expect(nextState.todos).toHaveLength(0);
    });

    test('should handle hideComplitedReducer', () => {
        const startState = {
            todos: [
                { id: 1, isCompleted: false },
                { id: 2, isCompleted: true },
            ]
        };
        // Note: The reducer logic for hideComplitedReducer sets state.todos = filtered list.
        // This is slightly distinct from a toggle, it's a destructive filter in the current implementation.
        const nextState = todosReducer(startState, hideComplitedReducer());
        expect(nextState.todos).toHaveLength(1);
        expect(nextState.todos[0].id).toEqual(1);
    });
});
