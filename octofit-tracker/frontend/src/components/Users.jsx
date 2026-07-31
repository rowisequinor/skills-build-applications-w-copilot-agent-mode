import { useEffect, useState } from 'react'
import { fetchCollection, getEndpointUrl } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('users')
      .then((items) => {
        if (!ignore) {
          setUsers(items)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Roster</p>
          <h2>Users</h2>
        </div>
        <code>{getEndpointUrl('users')}</code>
      </div>

      {status === 'loading' && <p className="muted">Loading users...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Team</th>
                <th>Role</th>
                <th>Goal</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.email ?? user.username}>
                  <td>
                    <strong>{user.displayName ?? user.username}</strong>
                    <span>{user.email}</span>
                  </td>
                  <td>{user.teamName}</td>
                  <td>{user.role}</td>
                  <td>{user.fitnessGoal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users