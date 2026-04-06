import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { KpiCard } from '../components/KpiCard'
import { kpiData, weeklyShipments, onTimeRates, cargoCategories } from '../data/logistics-data'

export function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KpiCard label="Active Schedules" value={kpiData.activeSchedules.value} delta={kpiData.activeSchedules.delta} trend={kpiData.activeSchedules.trend} icon="📋" />
        <KpiCard label="Total Vehicles" value={kpiData.totalVehicles.value} delta={kpiData.totalVehicles.delta} trend={kpiData.totalVehicles.trend} icon="🚛" />
        <KpiCard label="Cargo In Transit" value={kpiData.cargoInTransit.value} delta={kpiData.cargoInTransit.delta} trend={kpiData.cargoInTransit.trend} icon="📦" />
        <KpiCard label="On-Time Rate" value={kpiData.onTimeRate.value} delta={kpiData.onTimeRate.delta} trend={kpiData.onTimeRate.trend} icon="✅" />
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ borderRadius: 12, border: '1px solid #30363d', backgroundColor: '#1c2128', padding: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3', margin: '0 0 4px' }}>Weekly Shipments</h2>
          <p style={{ fontSize: 12, color: '#484f58', margin: '0 0 16px' }}>Total dispatched vs delivered per week</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyShipments} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
              <XAxis dataKey="week" tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: 8 }} labelStyle={{ color: '#8d96a0', fontSize: 11 }} itemStyle={{ color: '#e6edf3', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#8d96a0' }} />
              <Bar dataKey="shipments" name="Dispatched" fill="#e8000d" radius={[3, 3, 0, 0]} />
              <Bar dataKey="delivered" name="Delivered" fill="#f78166" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ borderRadius: 12, border: '1px solid #30363d', backgroundColor: '#1c2128', padding: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3', margin: '0 0 4px' }}>On-Time Rate Trend</h2>
          <p style={{ fontSize: 12, color: '#484f58', margin: '0 0 16px' }}>Delivery punctuality (%) over 8 weeks</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={onTimeRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
              <XAxis dataKey="week" tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: 8 }} labelStyle={{ color: '#8d96a0', fontSize: 11 }} itemStyle={{ color: '#e6edf3', fontSize: 12 }} formatter={(v: unknown) => [`${String(v)}%`, 'On-Time Rate']} />
              <Line type="monotone" dataKey="rate" name="On-Time %" stroke="#3fb950" strokeWidth={2} dot={{ fill: '#3fb950', r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        <div style={{ borderRadius: 12, border: '1px solid #30363d', backgroundColor: '#1c2128', padding: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3', margin: '0 0 4px' }}>Cargo by Category</h2>
          <p style={{ fontSize: 12, color: '#484f58', margin: '0 0 8px' }}>Distribution of current shipments</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={cargoCategories} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {cargoCategories.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: 8 }} itemStyle={{ color: '#e6edf3', fontSize: 12 }} formatter={(v: unknown) => [`${String(v)}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 8 }}>
            {cargoCategories.map((cat) => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: cat.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: '#8d96a0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 12, border: '1px solid #30363d', backgroundColor: '#1c2128', padding: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3', margin: '0 0 16px' }}>Operations Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Routes Covered', value: '6 countries', note: 'TH · SG · JP · MY · VN' },
              { label: 'Avg. Delivery Time', value: '2.4 days', note: '↓ 0.3 days vs last month' },
              { label: 'Delayed Shipments', value: '2', note: 'SCH-008, SCH-011 — weather hold' },
              { label: 'Vehicles in Maintenance', value: '1', note: 'VH-003 — scheduled service' },
              { label: 'Peak Route', value: 'BKK → SIN', note: '3 dispatches this month' },
              { label: 'Top Driver', value: 'Kenji T.', note: '100% on-time rate' },
            ].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #21262d', paddingBottom: 10 }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#8d96a0', margin: 0 }}>{stat.label}</p>
                  <p style={{ fontSize: 11, color: '#484f58', margin: 0 }}>{stat.note}</p>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3' }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
