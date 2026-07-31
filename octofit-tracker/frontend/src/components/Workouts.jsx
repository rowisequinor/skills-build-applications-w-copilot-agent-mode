import { useEffect, useState } from 'react'
import { fetchCollection, getEndpointUrl } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('workouts')
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
        <code>{getEndpointUrl('workouts')}</code>
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