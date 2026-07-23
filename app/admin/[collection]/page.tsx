'use client';

import { useEffect, useState, useCallback } from 'react';

interface Props {
  params: Promise<{ collection: string }>;
}

const LABELS: Record<string, string> = {
  dishes: 'Блюда',
  pricing: 'Цены',
  'trust-proof': 'Доверие',
  'page-texts': 'Тексты',
  reviews: 'Отзывы',
  videos: 'Видео',
};

export default function CollectionEditor({ params }: Props) {
  const [collection, setCollection] = useState<string>('');
  const [data, setData] = useState<any[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    params.then(p => {
      setCollection(p.collection);
      fetch(`/api/cms/${p.collection}`)
        .then(r => r.json())
        .then(setData)
        .catch(() => setMessage('Ошибка загрузки'));
    });
  }, [params]);

  const save = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch(`/api/cms/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? '✅ Сохранено' : '❌ Ошибка');
    setTimeout(() => setMessage(''), 2000);
  }, [data, collection]);

  const updateRow = (idx: number, key: string, value: any) => {
    setData(prev => prev ? prev.map((row, i) => i === idx ? { ...row, [key]: value } : row) : null);
  };

  const addRow = () => {
    setData(prev => [...(prev || []), {}]);
  };

  const deleteRow = (idx: number) => {
    setData(prev => prev ? prev.filter((_, i) => i !== idx) : null);
  };

  if (!collection) return <div className="p-8 text-gray-400">Загрузка...</div>;
  if (!data) return <div className="p-8 text-gray-400">Загрузка данных...</div>;

  const fields = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{LABELS[collection] || collection}</h1>
        <div className="flex gap-2">
          <button onClick={addRow} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm">+ Добавить</button>
          <button onClick={save} disabled={saving} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded text-sm font-medium">
            {saving ? 'Сохранение...' : '💾 Сохранить'}
          </button>
        </div>
      </div>
      {message && <div className="mb-3 text-sm font-medium text-emerald-400">{message}</div>}

      <div className="overflow-x-auto border border-gray-700 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800">
              {fields.map(f => (
                <th key={f} className="text-left px-3 py-2 text-gray-400 font-medium">{f}</th>
              ))}
              <th className="w-16 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-t border-gray-700 hover:bg-gray-800/50">
                {fields.map(f => (
                  <td key={f} className="px-3 py-1.5">
                    {typeof row[f] === 'boolean' ? (
                      <input type="checkbox" checked={row[f]} onChange={e => updateRow(idx, f, e.target.checked)} className="accent-emerald-500" />
                    ) : typeof row[f] === 'object' ? (
                      <input
                        className="bg-transparent border border-gray-600 rounded px-2 py-0.5 w-full font-mono text-xs"
                        value={JSON.stringify(row[f])}
                        onChange={e => { try { updateRow(idx, f, JSON.parse(e.target.value)); } catch {} }}
                      />
                    ) : (
                      <input
                        className="bg-transparent border border-gray-600 rounded px-2 py-0.5 w-full"
                        value={row[f] ?? ''}
                        onChange={e => {
                          const v = e.target.value;
                          const num = Number(v);
                          updateRow(idx, f, typeof row[f] === 'number' && !isNaN(num) ? num : v);
                        }}
                      />
                    )}
                  </td>
                ))}
                <td className="px-2 py-1.5 text-center">
                  <button onClick={() => deleteRow(idx)} className="text-red-400 hover:text-red-300 text-xs">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}