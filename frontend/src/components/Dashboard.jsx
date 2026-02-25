import { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";
import Filters from "./Filters";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, ComposedChart
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#06b6d4", "#f59e0b", "#ef4444"];

// --- GLASSMORPHISM TOOLTIP (Fixed styling) ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <div className="tooltip-divider"></div>
        <p className="tooltip-value">
          <span className="tooltip-dot" style={{ backgroundColor: payload[0].color || payload[0].fill }}></span>
          Amount: <strong>{payload[0].value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await fetchAnalytics(params);
      setData(res.data);
    } catch (err) {
      console.error("API Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="dashboard-container">
      {/* GLOW FILTER DEFINITION */}
      <svg width="0" height="0">
        <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.3 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </svg>

      <header className="dashboard-header">
        <h1 className="dashboard-title">Insights Overview</h1>
        <div className="filters-wrapper">
          <Filters onFilter={loadData} />
        </div>
      </header>

      <main className="charts-grid">
        {/* 1. BAR CHART */}
        <div className="chart-card">
          <h3>Sales by Product</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="product" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={12} />
              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} fontSize={12} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.03)'}} /> 
              <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} filter="url(#subtleGlow)" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. LINE CHART */}
        <div className="chart-card">
          <h3>Revenue Stream</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="product" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={12} />
              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={4} dot={{ r: 4, fill: '#22c55e' }} filter="url(#subtleGlow)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 3. AREA CHART */}
        <div className="chart-card">
          <h3>Performance Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="product" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={12} />
              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="amount" stroke="#06b6d4" fill="url(#areaGrad)" strokeWidth={3} filter="url(#subtleGlow)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 4. DOUGHNUT CHART */}
        <div className="chart-card">
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie data={data} dataKey="amount" innerRadius={70} outerRadius={100} paddingAngle={8} stroke="none">
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 5. COMPOSED CHART (Combined View) */}
        <div className="chart-card full-width">
          <h3>Comprehensive View</h3>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="product" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={12} />
              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="right" />
              <Bar dataKey="amount" barSize={30} fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="amount" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}