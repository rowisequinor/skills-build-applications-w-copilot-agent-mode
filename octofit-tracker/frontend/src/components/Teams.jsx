import { useEffect, useState } from 'react'
import { fetchCollection, getEndpointUrl } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('teams')
      .then((items) => {
        if (!ignore) {
          setTeams(items)
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
          <p className="eyebrow">Groups</p>
          <h2>Teams</h2>
        </div>
        <code>{getEndpointUrl('teams')}</code>
      </div>

      {status === 'loading' && <p className="muted">Loading teams...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'ready' && (
        <div className="card-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id ?? team.name}>
              <p className="eyebrow">{team.city}</p>
              <h3>{team.name}</h3>
              <p>{team.mascot}</p>
              <span>{team.weeklyGoalMinutes} weekly minutes</span>
              <small>{team.members?.join(', ')}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams