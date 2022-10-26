import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


/* Make a test which checks that the blog's url and number of
likes are shown when the button controlling the shown details has been clicked */

describe('<Blog/>',  () => {
	let container
	const user={
		userID: 'xxx'
	}
	const updateBlog= jest.fn()
	const removeBlog= jest.fn()
	const blog= {
		title: 'testing...',
		author:'author...',
		likes: 50,
		url: 'www.test.com',
		user: 'xxx'
	}

	beforeEach(() => {
		container = render( <Blog user={user} updateBlog={updateBlog} removeBlog={removeBlog} blog={blog}/>).container
	})

	test('component displaying a blog renders the blog\'s title and author,but does not render its url or number of likes by default', async () => {
		const titleByAuthor= await screen.findByText('testing... by author...')
		const url= screen.queryByText('www.test.com')
		const likes= screen.queryByText(50)
		expect(titleByAuthor).toBeDefined()
		expect(url).toBeNull()
		expect(likes).toBeNull()
	})

	test('blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', async () => {
		const userSesion= userEvent.setup()
		const showButton= await screen.findByText('View')

		await userSesion.click(showButton)

		const url= screen.queryByText('www.test.com')
		const likes= screen.queryByText(50)
		expect(url).toHaveTextContent('www.test.com')
		expect(likes).toHaveTextContent(50)
	})

	test('click the like button twice', async () => {
		const userSesion= userEvent.setup()
		const viewButton= container.querySelector('.btnView')
		await userSesion.click(viewButton) //click para ver elemento
		const likeButton= container.querySelector('.btnLike')
		await userSesion.click(likeButton)
		await userSesion.click(likeButton)
		expect(updateBlog.mock.calls).toHaveLength(2)
	})
})





