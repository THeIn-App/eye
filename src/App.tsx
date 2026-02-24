import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  CheckSquare, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  Users, 
  TrendingUp,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Download
} from 'lucide-react';
import { Checklist } from './components/Checklist';
import { Discussion } from './components/Discussion';
import { MarketTrendChart, SalesFunnelDiagram, OrgChart } from './components/Visuals';
import { Report } from './components/Report';
import { CHECKLIST, DISCUSSIONS } from './constants';
import { ChecklistItem } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'checklist' | 'report'>('dashboard');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(CHECKLIST);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(CHECKLIST[0].id);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' } : item
    ));
  };

  const selectedDiscussion = DISCUSSIONS.find(d => d.id === selectedCategoryId);

  const stats = [
    { label: 'Audit Progress', value: `${Math.round((checklist.filter(i => i.status === 'completed').length / checklist.length) * 100)}%`, icon: CheckSquare },
    { label: 'Risk Level', value: 'Moderate', icon: TrendingUp },
    { label: 'Market Cap', value: '$2.4M', icon: BarChart3 },
    { label: 'Team Size', value: '12', icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-obsidian text-ivory overflow-hidden">
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 border-r border-gold/10 bg-charcoal/50 flex flex-col z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-sm">
            <Briefcase className="text-obsidian w-6 h-6" />
          </div>
          <div className="hidden md:block">
            <h1 className="font-serif font-bold italic text-lg leading-none">Elite</h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-gold">Consultant</p>
          </div>
        </div>

        <div className="flex-1 px-4 py-8 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'checklist', label: 'Strategy Audit', icon: CheckSquare },
            { id: 'report', label: 'Final Report', icon: FileText },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 group",
                activeTab === item.id ? "bg-gold text-obsidian" : "text-ivory/60 hover:bg-gold/10 hover:text-gold"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:block font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gold/10">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-ivory/40 hover:text-ivory transition-colors">
            <Settings className="w-5 h-5" />
            <span className="hidden md:block text-sm">Settings</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto">
        <header className="sticky top-0 z-40 bg-obsidian/80 backdrop-blur-md border-bottom border-gold/10 px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-gold mb-1">Business Concept Expert Consultant</h2>
            <h3 className="text-2xl font-serif font-bold italic">Strategic Framework v1.0</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-charcoal border border-gold/20 rounded-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-ivory/60">Live Analysis Active</span>
            </div>
            <button 
              onClick={() => setActiveTab('report')}
              className="px-6 py-2 bg-gold text-obsidian font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-gold-warm transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-charcoal/50 border border-gold/10 p-6 rounded-sm group hover:border-gold/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-gold/10 rounded-sm">
                          <stat.icon className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-[10px] font-mono text-gold/40">0{i+1}</span>
                      </div>
                      <p className="text-ivory/40 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                      <h4 className="text-2xl font-bold text-ivory">{stat.value}</h4>
                    </motion.div>
                  ))}
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <section className="bg-charcoal/30 border border-gold/5 p-8 rounded-sm">
                      <div className="flex justify-between items-end mb-8">
                        <div>
                          <h4 className="font-serif text-xl font-bold italic mb-1">Market Volatility Index</h4>
                          <p className="text-xs text-ivory/40">Projected trends for the next fiscal quarter</p>
                        </div>
                        <div className="flex gap-4 text-[10px] font-mono uppercase tracking-widest">
                          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-gold" /> Actual</span>
                          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-gold/30" /> Forecast</span>
                        </div>
                      </div>
                      <MarketTrendChart />
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <section className="bg-charcoal/30 border border-gold/5 p-8 rounded-sm">
                        <h4 className="font-serif text-xl font-bold italic mb-6">Sales Funnel Efficiency</h4>
                        <SalesFunnelDiagram />
                      </section>
                      <section className="bg-charcoal/30 border border-gold/5 p-8 rounded-sm">
                        <h4 className="font-serif text-xl font-bold italic mb-6">Organizational Structure</h4>
                        <OrgChart />
                      </section>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <section className="bg-charcoal/30 border border-gold/5 p-8 rounded-sm">
                      <h4 className="font-serif text-xl font-bold italic mb-6">Recent Insights</h4>
                      <div className="space-y-6">
                        {DISCUSSIONS.slice(0, 3).map((disc) => (
                          <div key={disc.id} className="group cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono text-gold uppercase tracking-widest">{disc.id.replace('-', ' ')}</span>
                              <ChevronRight className="w-3 h-3 text-gold/40 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h5 className="text-sm font-bold text-ivory group-hover:text-gold transition-colors">{disc.title}</h5>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="bg-gold/5 border border-gold/20 p-8 rounded-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <GraduationCap className="w-24 h-24 text-gold" />
                      </div>
                      <h4 className="font-serif text-xl font-bold italic text-gold mb-4">Consultant Note</h4>
                      <p className="text-sm text-ivory/70 leading-relaxed italic">
                        "The primary goal of this framework is to bridge the gap between operational activity and strategic achievement. Focus on the high-impact items first."
                      </p>
                    </section>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'checklist' && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                <div className="lg:col-span-4 space-y-6">
                  <div className="mb-8">
                    <h4 className="font-serif text-2xl font-bold italic mb-2">Strategic Audit</h4>
                    <p className="text-sm text-ivory/40">Complete the checklist to unlock final recommendations.</p>
                  </div>
                  <Checklist 
                    items={checklist} 
                    onToggle={toggleChecklistItem} 
                    onSelect={setSelectedCategoryId}
                    selectedId={selectedCategoryId}
                  />
                </div>
                <div className="lg:col-span-8 bg-charcoal/20 p-8 rounded-sm border border-gold/5 min-h-[600px]">
                  <Discussion discussion={selectedDiscussion} />
                </div>
              </motion.div>
            )}

            {activeTab === 'report' && (
              <motion.div
                key="report"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <Report checklist={checklist} discussions={DISCUSSIONS} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
