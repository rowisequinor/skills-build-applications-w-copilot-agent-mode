import { useEffect, useState } from 'react'
import { fetchCollection, getEndpointUrl } from '../api.js'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('leaderboard')
      .then((items) => {
        if (!ignore) {
          setLeaderboard(items)
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
          <p className="eyebrow">Competition</p>
          <h2>Leaderboard</h2>
        </div>
        <code>{getEndpointUrl('leaderboard')}</code>
      </div>

      {status === 'loading' && <p className="muted">Loading leaderboard...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'ready' && (
        <div className="leaderboard-list">
          {leaderboard.map((entry) => (
            <article className="leaderboard-row" key={entry._id ?? entry.rank}>
              <strong>#{entry.rank}</strong>
              <div>
                <h3>{entry.userName}</h3>
                <p>{entry.teamName}</p>
              </div>
              <span>{entry.totalMinutes} min</span>
              <span>{entry.totalCalories} cal</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard