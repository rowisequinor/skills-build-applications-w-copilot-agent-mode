import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const workoutsEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('workouts', workoutsEndpoint)
      .then((items) => {
        if (!ignore) {
          setWorkouts(items)
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
          <p className="eyebrow">Suggestions</p>
          <h2>Workouts</h2>
        </div>
        <code>{workoutsEndpoint}</code>
      </div>

      {status === 'loading' && <p className="muted">Loading workouts...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'ready' && (
        <div className="card-grid">
          {workouts.map((workout) => (
            <article className="data-card" key={workout._id ?? workout.title}>
              <p className="eyebrow">{workout.focusArea}</p>
              <h3>{workout.title}</h3>
              <span>{workout.difficulty} · {workout.estimatedMinutes} min</span>
              <p>{workout.recommendedFor}</p>
              <small>{workout.exercises?.join(', ')}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts