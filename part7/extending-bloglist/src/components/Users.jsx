import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Users() {
	const users = useSelector((state) => state.users)

	return (
		<>
			<h2>Users</h2>
			<Table striped>
				<thead>
					<tr>
						<td>Username</td>
						<td>Blogs Created</td>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td> <Link to={`/users/${user.id}`}> {user.username}</Link> </td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>

		</>
	)
}
