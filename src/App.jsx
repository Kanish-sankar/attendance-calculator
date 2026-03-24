import { useState } from 'react'
import './App.css'

const confettiPieces = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 97) % 100}%`,
  delay: `${(i % 6) * 0.12}s`,
}))

function App() {
  const [present, setPresent] = useState('')
  const [total, setTotal] = useState('')
  const [requiredPercent, setRequiredPercent] = useState('75')
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const handleShare = (platform) => {
    if (!result) return

    const shareText = `Hey friends! 👋 Check out my attendance stats!\n\n${result.headline}\n\n📊 Current Attendance: ${result.safePresent}/${result.totalNum} → ${result.currentPercent.toFixed(2)}%\n${result.currentPercent >= result.requiredNum ? '✨ Attendance Then' : '🎯 Attendance Required'}: ${result.requiredPresent}/${result.requiredTotal} → ${result.requiredAchievedPercent.toFixed(2)}%\n\n💡 Calculated using Jupenta Attendance Calculator\n🔗 Try it now: attendance.jupenta.com\n\n${result.comment}`

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareText)
      alert('✅ Copied to clipboard! Share with your friends!')
      return
    }

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
      return
    }

    if (platform === 'twitter') {
      const twitterText = `Hey friends! Check out my attendance stats using Jupenta! 📊\n\n${result.headline}\n\nCurrent: ${result.safePresent}/${result.totalNum} → ${result.currentPercent.toFixed(2)}%\n\n🔗 Try Jupenta Attendance Calculator: attendance.jupenta.com\n\n#Attendance #StudentLife #Jupenta`
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`, '_blank')
    }
  }

  const handleShareWebsite = (platform) => {
    const websiteUrl = 'https://attendance.jupenta.com'
    const shareText = `🎓 Hey friend! 👋\n\nDiscover your proper attendance with Jupenta!\n\n✨ This amazing website helps you:\n✅ Calculate your attendance percentage\n✅ Find out how many classes you can bunk safely\n✅ Plan your attendance smartly\n✅ Never miss important deadlines\n\n📚 Perfect for students who want to:\n• Stay on top of attendance\n• Maximize their freedom\n• Plan ahead strategically\n• Make informed decisions\n\n🚀 Try now: ${websiteUrl}\n\nMade by Jupenta ✨\n\n#StudentLife #Attendance #Jupenta #SmartPlanning`

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareText)
      alert('✅ Copied! Share with your friends!')
      return
    }

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
      return
    }

    if (platform === 'twitter') {
      const twitterShare = `🎓 Hey! Check out Jupenta - the smart attendance calculator! 📊\n\nStay on top of your attendance, plan ahead, and make informed decisions.\n\n🎯 Perfect for students! Try now: ${websiteUrl}\n\n#StudentLife #Attendance #Jupenta`
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterShare)}`, '_blank')
      return
    }

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent('Check out Jupenta - Smart Attendance Calculator!')}`, '_blank')
    }
  }

  const handleCalculate = () => {
    const presentNum = Number(present)
    const totalNum = Number(total)
    const requiredNum = Number(requiredPercent)

    if (!Number.isFinite(presentNum) || !Number.isFinite(totalNum) || totalNum <= 0 || presentNum < 0) {
      setError({ text: 'Please enter valid Present and Total values.', emoji: '⚠️' })
      setResult(null)
      return
    }

    if (presentNum > totalNum) {
      setError({ text: 'Proper values please', emoji: '😫' })
      setResult(null)
      return
    }

    setError(null)
    const safePresent = presentNum
    const currentPercent = (safePresent / totalNum) * 100

    if (currentPercent >= requiredNum) {
      const canMiss = Math.floor((safePresent * 100) / requiredNum - totalNum)
      const safeCanMiss = Math.max(0, canMiss)
      const isExcellent = currentPercent >= requiredNum + 15
      const afterMissPercent = safeCanMiss >= 0
        ? (safePresent / (totalNum + safeCanMiss)) * 100
        : currentPercent
      setResult({
        headline: `You can bunk for ${safeCanMiss} more classes.`,
        currentPercent,
        requiredNum,
        safePresent,
        totalNum,
        requiredPresent: safePresent,
        requiredTotal: totalNum + safeCanMiss,
        requiredAchievedPercent: afterMissPercent,
        type: isExcellent ? 'excellent' : 'safe',
        emoji: isExcellent ? '🥳' : safeCanMiss > 0 ? '😎' : '🙂',
        title: isExcellent
          ? 'Excellent attendance!'
          : safeCanMiss > 0
            ? 'You are in safe zone!'
            : 'Right on the edge, stay consistent!',
        comment: `Great job. Keep consistency so your attendance remains healthy.`,
        showConfetti: true,
      })
    } else {
      let safeNeedToAttend = 0
      if (requiredNum >= 100) {
        safeNeedToAttend = Number.MAX_SAFE_INTEGER
      } else {
        // Need x such that (present + x) / (total + x) >= required/100.
        safeNeedToAttend = Math.max(
          0,
          Math.ceil(((requiredNum * totalNum) - (100 * safePresent)) / (100 - requiredNum)),
        )
      }
      const gap = requiredNum - currentPercent
      const warningLevel = gap <= 10
      const impossible = safeNeedToAttend === Number.MAX_SAFE_INTEGER
      const requiredPresent = impossible ? safePresent : safePresent + safeNeedToAttend
      const requiredTotal = impossible ? totalNum : totalNum + safeNeedToAttend
      const requiredAchievedPercent = impossible ? 0 : (requiredPresent / requiredTotal) * 100
      setResult({
        headline: impossible
          ? 'Target cannot be achieved with finite classes'
          : `You need to attend ${safeNeedToAttend} more classes to attain ${requiredNum}% attendance`,
        currentPercent,
        requiredNum,
        safePresent,
        totalNum,
        requiredPresent,
        requiredTotal,
        requiredAchievedPercent,
        type: impossible ? 'critical' : warningLevel ? 'warning' : 'critical',
        emoji: impossible ? '⛔' : warningLevel ? '🚀' : '🚨',
        title: impossible ? 'Target not possible' : warningLevel ? 'You can recover quickly!' : 'Need urgent improvement!',
        comment: impossible
          ? '100% target is not possible unless every class is attended from the beginning.'
          : `Attend classes consistently and avoid missing the next ${safeNeedToAttend} class${safeNeedToAttend === 1 ? '' : 'es'}.`,
        showConfetti: false,
      })
    }
  }

  return (
    <>
      <div className="page">
        <div className="share-website-section">
          <button className="share-website-btn" title="Share with your friends">
            🌐 Share with Friends
          </button>
          <div className="share-website-dropdown">
            <button className="dropdown-btn copy-btn" onClick={() => handleShareWebsite('copy')}>📋 Copy Link</button>
            <button className="dropdown-btn whatsapp-btn" onClick={() => handleShareWebsite('whatsapp')}>💬 WhatsApp</button>
            <button className="dropdown-btn twitter-btn" onClick={() => handleShareWebsite('twitter')}>𝕏 Twitter</button>
            <button className="dropdown-btn facebook-btn" onClick={() => handleShareWebsite('facebook')}>f Facebook</button>
          </div>
        </div>

        <main className="card">
        <div className="header-branding">
          <h1 className="jupenta-title">Jupenta</h1>
          <p className="app-title">Attendance Calculator</p>
        </div>
        <p className="subtitle">Track your attendance smartly! Find out how many classes you can bunk while maintaining your required attendance percentage.</p>

        <div className="field">
          <label htmlFor="required">Percentage Required</label>
          <select id="required" value={requiredPercent} onChange={(e) => setRequiredPercent(e.target.value)}>
            <option value="60">60%</option>
            <option value="65">65%</option>
            <option value="70">70%</option>
            <option value="75">75%</option>
            <option value="80">80%</option>
            <option value="85">85%</option>
            <option value="90">90%</option>
          </select>
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="present">Present</label>
            <input
              id="present"
              type="number"
              min="0"
              value={present}
              onChange={(e) => setPresent(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="total">Total</label>
            <input
              id="total"
              type="number"
              min="0"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>
        </div>

        <button className="calculate-btn" type="button" onClick={handleCalculate}>
          Calculate
        </button>

        {error && (
          <div className="result result-error">
            <div className="error-emoji" aria-hidden="true">{error.emoji}</div>
            <div>{error.text}</div>
          </div>
        )}

        {result && (
          <div className={`result result-${result.type}`}>
            {result.showConfetti && (
              <div className="confetti-wrap" aria-hidden="true">
                {confettiPieces.map((piece) => (
                  <span
                    key={piece.id}
                    className="confetti-piece"
                    style={{ left: piece.left, animationDelay: piece.delay }}
                  />
                ))}
              </div>
            )}

            <div className="result-top">
              <div className="percent-block text-block">
                <p className="result-headline">{result.headline}</p>
                <p className="result-line">
                  Current Attendance: {result.safePresent}/{result.totalNum} -&gt; {result.currentPercent.toFixed(2)}%
                </p>
                <p className="result-line">
                  {result.currentPercent >= result.requiredNum ? 'Attendance Then' : 'Attendance Required'}: {result.requiredPresent}/{result.requiredTotal} -&gt; {result.requiredAchievedPercent.toFixed(2)}%
                </p>
              </div>
              <div className="emoji-wrap" aria-hidden="true">
                <span className="status-emoji">{result.emoji}</span>
              </div>
            </div>

            <p className="result-title">Comment</p>
            <p className="result-message">{result.comment}</p>

            <p className="result-title">Graph</p>
            <div className="gauge-area" aria-hidden="true">
              <div
                className="gauge-ring"
                style={{
                  background: `conic-gradient(#22c55e 0deg ${Math.min(360, (result.currentPercent / 100) * 360)}deg, #e2e8f0 ${Math.min(360, (result.currentPercent / 100) * 360)}deg 360deg)`,
                }}
              >
                <div className="gauge-center">{Math.round(result.currentPercent)}%</div>
              </div>
            </div>

            <div className="progress-area">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${Math.min(100, result.currentPercent)}%` }} />
                <div className="progress-target" style={{ left: `${Math.min(100, result.requiredNum)}%` }} />
              </div>
              <div className="progress-meta">
                <span>0%</span>
                <span>Target: {result.requiredNum}%</span>
                <span>100%</span>
              </div>
            </div>

            <p className="result-title">Share</p>
            <div className="share-row">
              <button type="button" className="share-btn" onClick={() => handleShare('copy')}>Copy</button>
              <button type="button" className="share-btn" onClick={() => handleShare('whatsapp')}>WhatsApp</button>
              <button type="button" className="share-btn" onClick={() => handleShare('twitter')}>Twitter</button>
            </div>
          </div>
        )}

          {!error && !result && <div className="result hint">Enter values and click Calculate.</div>}
        </main>
        <footer className="app-footer">
          <p>Made with ♥ by <strong>Jupenta</strong></p>
          <p className="footer-link"><a href="https://attendance.jupenta.com" target="_blank" rel="noopener noreferrer">Visit Jupenta</a></p>
        </footer>
      </div>
    </>
  )
}

export default App
