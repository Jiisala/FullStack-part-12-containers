import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'

test('useless test for the sake of testing', () => {
    const todo = {
        text: "something",
        done: false
    }

    const component = render(<Todo todo={todo} onClickComplete={() => {}} onClickDelete={() => {}} />)
    expect(component.container).toHaveTextContent(todo.text);
})