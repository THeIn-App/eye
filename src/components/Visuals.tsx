import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { motion } from 'motion/react';
import { TrendingUp, Users } from 'lucide-react';

const marketData = [
  { name: '2021', value: 400, secondary: 240 },
  { name: '2022', value: 300, secondary: 139 },
  { name: '2023', value: 200, secondary: 980 },
  { name: '2024', value: 278, secondary: 390 },
  { name: '2025', value: 189, secondary: 480 },
];

const competitorData = [
  { name: 'Our Firm', value: 45, color: '#C8A951' },
  { name: 'Competitor A', value: 25, color: '#8B3A1C' },
  { name: 'Competitor B', value: 20, color: '#1E1E24' },
  { name: 'Others', value: 10, color: '#8A8275' },
];

export const MarketTrendChart = () => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={marketData}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C8A951" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#C8A951" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E1E24" vertical={false} />
        <XAxis dataKey="name" stroke="#8A8275" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#8A8275" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#141418', border: '1px solid #C8A951', color: '#F5F0E8' }}
          itemStyle={{ color: '#C8A951' }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#C8A951" 
          strokeWidth={2}
          strokeDasharray="5 5"
          fillOpacity={1} 
          fill="url(#colorValue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const SalesFunnelDiagram = () => (
  <div className="flex flex-col items-center space-y-4 py-8">
    {[
      { label: 'Awareness', width: 'w-full', color: 'bg-gold/20' },
      { label: 'Interest', width: 'w-4/5', color: 'bg-gold/30' },
      { label: 'Decision', width: 'w-3/5', color: 'bg-gold/40' },
      { label: 'Action', width: 'w-2/5', color: 'bg-gold/60' },
    ].map((step, i) => (
      <motion.div
        key={step.label}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className={step.width}
      >
        <div className={`h-12 ${step.color} border border-gold/30 flex items-center justify-center rounded-sm relative overflow-hidden group`}>
          <div className="absolute inset-0 bg-gold/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">{step.label}</span>
        </div>
      </motion.div>
    ))}
  </div>
);

export const MarketDataChart = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-charcoal/30 border border-gold/10 p-6 rounded-sm">
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-gold" />
        <h5 className="font-mono text-[10px] uppercase tracking-widest text-gold">Market Growth Trend</h5>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={marketData}>
            <defs>
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C8A951" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#C8A951" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E24" vertical={false} />
            <XAxis dataKey="name" stroke="#8A8275" fontSize={10} hide />
            <YAxis stroke="#8A8275" fontSize={10} hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#141418', border: '1px solid #C8A951', color: '#F5F0E8', fontSize: '10px' }}
            />
            <Area type="monotone" dataKey="value" stroke="#C8A951" fillOpacity={1} fill="url(#colorValue2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-rust-accent" />
        <h5 className="font-mono text-[10px] uppercase tracking-widest text-rust-accent">Competitor Market Share</h5>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={competitorData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
            >
              {competitorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#141418', border: '1px solid #C8A951', color: '#F5F0E8', fontSize: '10px' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              wrapperStyle={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export const OrgChart = () => (
  <div className="relative p-8 border border-dashed border-line/30 rounded-lg bg-charcoal/50">
    <div className="flex flex-col items-center space-y-12">
      <div className="px-6 py-3 border border-gold bg-gold/10 rounded-sm">
        <span className="text-xs font-bold text-gold uppercase tracking-tighter">CEO / Founder</span>
      </div>
      <div className="w-full h-px bg-gold/20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-px h-12 bg-gold/20" />
      </div>
      <div className="grid grid-cols-3 gap-8 w-full">
        {['Operations', 'Sales', 'Finance'].map((dept) => (
          <div key={dept} className="flex flex-col items-center space-y-4">
            <div className="absolute top-0 w-px h-12 bg-gold/20 -translate-y-full" />
            <div className="px-4 py-2 border border-ivory/20 bg-ivory/5 rounded-sm w-full text-center">
              <span className="text-[10px] font-medium text-ivory/80 uppercase tracking-widest">{dept}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
