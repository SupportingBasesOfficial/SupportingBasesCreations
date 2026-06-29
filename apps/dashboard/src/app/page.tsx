'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProjectTab } from '../components/ProjectTab';
import { EntitiesTab } from '../components/EntitiesTab';
import { ProvidersTab } from '../components/ProvidersTab';
import { PreviewTab } from '../components/PreviewTab';

type TabId = 'project' | 'entities' | 'providers' | 'preview';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('project');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'project', label: 'Project' },
    { id: 'entities', label: 'Entities' },
    { id: 'providers', label: 'Providers' },
    { id: 'preview', label: 'Preview & Generate' },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">SBC Project Builder</h1>
            <p className="text-sm text-slate-400">Mega-Tech Enterprise Generator</p>
          </div>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'project' && <ProjectTab />}
          {activeTab === 'entities' && <EntitiesTab />}
          {activeTab === 'providers' && <ProvidersTab />}
          {activeTab === 'preview' && <PreviewTab />}
        </div>
      </main>
    </div>
  );
}
