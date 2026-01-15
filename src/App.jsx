import { useEffect, useMemo, useState } from "react"
import olympicRings from "./assets/olympic-rings.svg"
import MedalIcon from "./Components/MedalIcon"

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const API = "http://127.0.0.1:8000"

function App() {
  // ================= API DATA =================
  const [countries, setCountries] = useState([])
  const [summary, setSummary] = useState([])

  // ================= UI =================
  const [countryFilter, setCountryFilter] = useState("All")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [year, setYear] = useState(2016)

  // ================= PREDICTION =================
  const [prediction, setPrediction] = useState(null)
  const [loadingPred, setLoadingPred] = useState(false)
  const [errorPred, setErrorPred] = useState("")

  // ================= LOAD COUNTRIES =================
  useEffect(() => {
    fetch(`${API}/countries`)
      .then((r) => r.json())
      .then((data) => {
        setCountries(data.countries || [])
        if (data.countries?.length) setSelectedCountry(data.countries[0])
      })
  }, [])

  // ================= LOAD MEDAL SUMMARY =================
  useEffect(() => {
    fetch(`${API}/medals/summary`)
      .then((r) => r.json())
      .then((data) => setSummary(data || []))
  }, [])

  // ================= FILTERED TABLE (TOP 10) =================
  const filteredTable = useMemo(() => {
    const data =
      countryFilter === "All"
        ? summary
        : summary.filter((r) => r.country === countryFilter)

    return data
      .slice()
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)
  }, [summary, countryFilter])

  // ================= TOP 3 LEADERS =================
  const leadersToShow = useMemo(() => {
    return summary
      .slice()
      .sort((a, b) => b.total - a.total)
      .slice(0, 3)
  }, [summary])

  // ================= CHART (TOP 10) =================
  const top10 = useMemo(() => {
    return summary
      .slice()
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)
  }, [summary])

  const chartData = useMemo(() => ({
    labels: top10.map((x) => x.country),
    datasets: [
      {
        label: "Total Medals",
        data: top10.map((x) => x.total),
        backgroundColor: "rgba(78,168,222,0.75)",
        borderRadius: 14,
        borderSkipped: false,
        barThickness: 48,
      },
    ],
  }), [top10])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Top 10 Countries — Total Olympic Medals",
        color: "#ffffff",
        font: { size: 18, weight: "bold" },
      },
      tooltip: {
        backgroundColor: "#023e8a",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.15)" },
      },
    },
  }

  // ================= PREDICT =================
  async function runPrediction() {
    setLoadingPred(true)
    setErrorPred("")
    setPrediction(null)

    try {
      const res = await fetch(`${API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country_name: selectedCountry,
          year: Number(year),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail)

      setPrediction(data)
    } catch (e) {
      setErrorPred(e.message || "Prediction failed")
    } finally {
      setLoadingPred(false)
    }
  }

  return (
    <div className="container my-4">
      {/* ================= HERO ================= */}
      <div className="hero hero-with-rings">
        <img src={olympicRings} className="olympic-rings-bg" alt="" />

        <h1>Olympic Games — Statistics & AI Prediction</h1>
        <div className="hero-sub">
          Explore historical medals and generate AI predictions.
        </div>

        <div className="topbar">
          <div className="pill-group">
            <button className="pill active">Countries</button>
          </div>

          <select
            className="form-select filter"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
          >
            <option value="All">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= LEADERS ================= */}
      <div className="section-title">Overall Medal Leaders</div>
      <div className="row mb-4">
        {leadersToShow.map((c) => {
          const pct = Math.min(100, Math.round((c.total / 3000) * 100))
          return (
            <div className="col-md-4 mb-3" key={c.country}>
              <div className="cardx text-center">
                <div
                  className="donut"
                  style={{
                    background: `conic-gradient(#4EA8DE ${pct * 3.6}deg, rgba(255,255,255,.25) 0deg)`
                  }}
                >
                  <div className="donut-inner">
                    <div className="kpi-number">{c.total}</div>
                  </div>
                </div>

                <div className="kpi-label">{c.country}</div>

                <span style={{ display: "inline-flex", gap: 14 }}>
                  <span><MedalIcon type="gold" size={16}/> {c.gold}</span>
                  <span><MedalIcon type="silver" size={16}/> {c.silver}</span>
                  <span><MedalIcon type="bronze" size={16}/> {c.bronze}</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ================= TABLE ================= */}
      <div className="section-title">Total Medals by Country (Top 10)</div>
      <div className="table-wrap mb-5">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Country</th>
              <th>🥇</th>
              <th>🥈</th>
              <th>🥉</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredTable.map((r) => (
              <tr key={r.country}>
                <td>{r.country}</td>
                <td>{r.gold}</td>
                <td>{r.silver}</td>
                <td>{r.bronze}</td>
                <td className="total">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CHART ================= */}
      <div className="section-title">Statistics</div>
      <div className="cardx mb-5" style={{ height: "420px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* ================= PREDICTION ================= */}
      <div className="section-title">AI Olympic Prediction</div>

      {errorPred && <div className="cardx-muted mb-2">{errorPred}</div>}

      <div className="pred-grid mb-4">
        <div className="cardx">
          <label>Country</label>
          <select className="form-select" value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}>
            {countries.map((c) => <option key={c}>{c}</option>)}
          </select>

          <label className="mt-3">Year</label>
          <input type="number" className="form-control"
            value={year} onChange={(e) => setYear(e.target.value)} />

          <button className="btn btn-primary mt-3 w-100"
            onClick={runPrediction} disabled={loadingPred}>
            {loadingPred ? "Predicting..." : "Predict Medals"}
          </button>
        </div>

        <div className="cardx">
          {!prediction ? (
            <div className="cardx-muted">Select a country and year.</div>
          ) : (
            <>
              <div className="kpi-number">{prediction.total}</div>
              🥇 {prediction.gold} &nbsp;
              🥈 {prediction.silver} &nbsp;
              🥉 {prediction.bronze}
            </>
          )}
        </div>
      </div>

      <div className="footer">
        Olympic AI Project — React + FastAPI + RandomForest
      </div>
    </div>
  )
}

export default App