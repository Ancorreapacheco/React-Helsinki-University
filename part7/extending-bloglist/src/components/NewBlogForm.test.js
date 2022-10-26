import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('New Blog have right details on Submit', async () => {
  const addBlog= jest.fn()
  const userSession= userEvent.setup()

  const { container } = render(<NewBlogForm addBlog={addBlog}/>)

  const inputTitle= container.querySelector('#title')
  const inputAuthor= container.querySelector('#author')
  const inputUrl= container.querySelector('#url')
  const saveButton= container.querySelector('#btn-save')

  await userSession.type(inputTitle,'new title...')
  await userSession.type(inputAuthor,'new author...')
  await userSession.type(inputUrl,'new url...')
  await userSession.click(saveButton)


  expect(addBlog.mock.calls[0][0].title).toBe('new title...')
  expect(addBlog.mock.calls[0][0].author).toBe('new author...')
  expect(addBlog.mock.calls[0][0].url).toBe('new url...')
  expect(addBlog.mock.calls).toHaveLength(1)

})