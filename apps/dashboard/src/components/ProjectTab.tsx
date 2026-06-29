import { useProjectStore } from '../store/projectStore';

export function ProjectTab() {
  const { config, setName, setDescription, setArchitecture } = useProjectStore();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Project Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Project Name</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="my-enterprise-app"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea
              value={config.description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="What does this project do?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Architecture</label>
            <select
              value={config.architecture}
              onChange={(e) => setArchitecture(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="modular-monolith">Modular Monolith</option>
              <option value="microservices">Microservices</option>
              <option value="serverless">Serverless</option>
              <option value="clean-architecture">Clean Architecture</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Features</h2>
        <div className="grid grid-cols-2 gap-3">
          <FeatureToggle label="Authentication" flag="AUTH" />
          <FeatureToggle label="Audit Log" flag="AUDIT_LOG" />
          <FeatureToggle label="Multi-tenant" flag="MULTI_TENANT" />
          <FeatureToggle label="API Gateway" flag="API_GATEWAY" />
          <FeatureToggle label="Real-time" flag="REALTIME" />
          <FeatureToggle label="Caching" flag="CACHING" />
        </div>
      </div>
    </div>
  );
}

function FeatureToggle({ label, flag }: { label: string; flag: string }) {
  const { config, toggleFeature } = useProjectStore();
  const active = config.features.includes(flag);

  return (
    <button
      onClick={() => toggleFeature(flag)}
      className={`flex items-center justify-between px-4 py-3 rounded-md border transition-colors ${
        active
          ? 'bg-blue-600/10 border-blue-500/50 text-blue-400'
          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
      }`}
    >
      <span className="text-sm font-medium">{label}</span>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-blue-400' : 'bg-slate-700'}`} />
    </button>
  );
}
