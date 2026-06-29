import { useProjectStore } from '../store/projectStore';

const availableProviders = [
  { id: 'oauth-google', name: 'Google OAuth', icon: '🔐', desc: 'Sign in with Google' },
  { id: 'oauth-github', name: 'GitHub OAuth', icon: '🔐', desc: 'Sign in with GitHub' },
  { id: 'stripe', name: 'Stripe', icon: '💳', desc: 'Payment processing' },
  { id: 'sendgrid', name: 'SendGrid', icon: '✉️', desc: 'Email delivery' },
  { id: 'sentry', name: 'Sentry', icon: '🐞', desc: 'Error monitoring' },
  { id: 'openai', name: 'OpenAI', icon: '🤖', desc: 'AI integration' },
  { id: 'twilio', name: 'Twilio', icon: '📞', desc: 'SMS/Voice' },
  { id: 'segment', name: 'Segment', icon: '📊', desc: 'Analytics' },
];

export function ProvidersTab() {
  const { config, toggleProvider } = useProjectStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-2">External Providers</h2>
        <p className="text-slate-400 text-sm">
          Select the services your project needs. Environment variables and setup guides will be generated automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableProviders.map((provider) => {
          const active = config.providers.includes(provider.id);
          return (
            <button
              key={provider.id}
              onClick={() => toggleProvider(provider.id)}
              className={`text-left p-4 rounded-lg border transition-all ${
                active
                  ? 'bg-blue-600/10 border-blue-500/50 ring-1 ring-blue-500/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{provider.icon}</span>
                  <div>
                    <p className={`font-medium ${active ? 'text-blue-400' : 'text-white'}`}>
                      {provider.name}
                    </p>
                    <p className="text-xs text-slate-400">{provider.desc}</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    active ? 'border-blue-400 bg-blue-400' : 'border-slate-600'
                  }`}
                >
                  {active && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-white mb-2">Selected Providers</h3>
        {config.providers.length === 0 ? (
          <p className="text-sm text-slate-500">No providers selected</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {config.providers.map((id) => (
              <span key={id} className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded">
                {id}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
