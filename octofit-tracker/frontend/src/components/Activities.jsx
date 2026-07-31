import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('activities', activitiesEndpoint)
      .then((items) => {
        if (!ignore) {
          setActivities(items)
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
          <p className="eyebrow">Activity log</p>
          <h2>Activities</h2>
        </div>
        <code>{activitiesEndpoint}</code>
      </div>

      {status === 'loading' && <p className="muted">Loading activities...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'ready' && (
        <div className="timeline">
          {activities.map((activity) => (
            <article className="timeline-item" key={activity._id ?? `${activity.userName}-${activity.activityDate}`}>
              <div>
                <strong>{activity.type}</strong>
                <span>{activity.userName} · {activity.teamName}</span>
              </div>
              <div className="metric-row">
                <span>{activity.durationMinutes} min</span>
                <span>{activity.caloriesBurned} cal</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities