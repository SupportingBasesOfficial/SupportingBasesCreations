import { useState } from 'react';
import { useProjectStore, type EntityConfig, type FieldConfig } from '../store/projectStore';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export function EntitiesTab() {
  const { config, addEntity, removeEntity, addField } = useProjectStore();
  const [newEntityName, setNewEntityName] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Entities</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newEntityName}
            onChange={(e) => setNewEntityName(e.target.value)}
            placeholder="Entity name"
            className="bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white"
          />
          <button
            onClick={() => {
              if (!newEntityName) return;
              addEntity({
                id: Math.random().toString(36).substring(2),
                name: newEntityName,
                fields: [{ id: '1', name: 'id', type: 'uuid', required: true, unique: true, nullable: false }],
                features: [],
              });
              setNewEntityName('');
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {config.entities.map((entity) => (
          <EntityCard key={entity.id} entity={entity} onRemove={() => removeEntity(entity.id)} onAddField={(f) => addField(entity.id, f)} />
        ))}
      </div>
    </div>
  );
}

function EntityCard({ entity, onRemove, onAddField }: { entity: EntityConfig; onRemove: () => void; onAddField: (f: FieldConfig) => void }) {
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('string');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-slate-600" />
          <h3 className="text-white font-medium">{entity.name}</h3>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
            {entity.fields.length} fields
          </span>
        </div>
        <button onClick={onRemove} className="text-slate-500 hover:text-red-400">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {entity.fields.map((field) => (
          <div key={field.id} className="flex items-center gap-3 text-sm bg-slate-950 px-3 py-2 rounded border border-slate-800">
            <span className="text-blue-400 font-mono">{field.type}</span>
            <span className="text-white">{field.name}</span>
            {field.required && <span className="text-xs text-red-400">required</span>}
            {field.unique && <span className="text-xs text-amber-400">unique</span>}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          placeholder="Field name"
          className="flex-1 bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white"
        />
        <select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white"
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
          <option value="datetime">datetime</option>
          <option value="uuid">uuid</option>
          <option value="json">json</option>
          <option value="enum">enum</option>
          <option value="relation">relation</option>
        </select>
        <button
          onClick={() => {
            if (!fieldName) return;
            onAddField({
              id: Math.random().toString(36).substring(2),
              name: fieldName,
              type: fieldType,
              required: true,
              unique: false,
              nullable: false,
            });
            setFieldName('');
          }}
          className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-md text-sm"
        >
          Add Field
        </button>
      </div>
    </div>
  );
}
