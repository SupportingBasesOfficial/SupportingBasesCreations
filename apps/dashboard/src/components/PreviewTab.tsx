import { useProjectStore } from '../store/projectStore';
import { Play, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function PreviewTab() {
  const { config } = useProjectStore();
  const [copied, setCopied] = useState(false);

  const preview = JSON.stringify(
    {
      name: config.name,
      architecture: config.architecture,
      description: config.description,
      features: config.features,
      entities: config.entities.map((e) => ({
        name: e.name,
        fields: e.fields.map((f) => ({ name: f.name, type: f.type })),
      })),
      providers: config.providers,
    },
    null,
    2
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Configuration Preview</h2>
          <p className="text-sm text-slate-400">
            Review your project configuration before generating.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(preview);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
            <Play className="w-4 h-4" />
            Generate Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Entities" value={config.entities.length} />
        <StatCard label="Fields" value={config.entities.reduce((acc, e) => acc + e.fields.length, 0)} />
        <StatCard label="Providers" value={config.providers.length} />
        <StatCard label="Features" value={config.features.length} />
        <StatCard label="Architecture" value={config.architecture} />
        <StatCard label="Generators" value="14" />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">project-config.json</span>
          <span className="text-xs text-slate-500">{preview.length} chars</span>
        </div>
        <pre className="p-4 text-sm text-green-400 font-mono overflow-auto max-h-96">
          {preview}
        </pre>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
      <p className="text-slate-400 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
