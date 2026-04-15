import React, { useState } from 'react';

const INITIAL_FORM = {
  dryRun: true,
  certificationTypeId: 1,
  certificationContactId: 1,
  contactId: 0,
  certificationComponentId: 0,
  activityName: 'LMS completion test',
  creditsEarned: 1,
  hoursEarned: 1,
};

const GrowthZone = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const updateValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const runDiscovery = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await fetch('/api/growthzone/discover-ce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json?.message || 'Request failed');
      }
      setResult(json);
    } catch (err) {
      setError(err?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 960 }}>
      <h1>GrowthZone CE Endpoint Discovery</h1>
      <p>
        Uses <code>/api/growthzone/discover-ce</code> to probe certification/CE MIC endpoints.
      </p>

      <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <label>
          <input
            type="checkbox"
            checked={form.dryRun}
            onChange={(e) => updateValue('dryRun', e.target.checked)}
          />{' '}
          Dry run (OPTIONS only, no transcript write)
        </label>

        <label>
          Certification Type ID
          <input
            type="number"
            value={form.certificationTypeId}
            onChange={(e) => updateValue('certificationTypeId', Number(e.target.value))}
          />
        </label>

        <label>
          Certification Contact ID
          <input
            type="number"
            value={form.certificationContactId}
            onChange={(e) => updateValue('certificationContactId', Number(e.target.value))}
          />
        </label>

        <label>
          Contact ID (POST probe payload)
          <input
            type="number"
            value={form.contactId}
            onChange={(e) => updateValue('contactId', Number(e.target.value))}
          />
        </label>

        <label>
          Certification Component ID (POST probe payload)
          <input
            type="number"
            value={form.certificationComponentId}
            onChange={(e) => updateValue('certificationComponentId', Number(e.target.value))}
          />
        </label>

        <label>
          Activity Name
          <input
            type="text"
            value={form.activityName}
            onChange={(e) => updateValue('activityName', e.target.value)}
          />
        </label>

        <label>
          Credits Earned
          <input
            type="number"
            value={form.creditsEarned}
            onChange={(e) => updateValue('creditsEarned', Number(e.target.value))}
          />
        </label>

        <label>
          Hours Earned
          <input
            type="number"
            value={form.hoursEarned}
            onChange={(e) => updateValue('hoursEarned', Number(e.target.value))}
          />
        </label>
      </div>

      <button
        onClick={runDiscovery}
        disabled={loading}
        style={{ marginTop: 16, padding: '8px 12px', cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Running…' : 'Run CE Discovery'}
      </button>

      {error ? (
        <pre style={{ marginTop: 16, color: '#b00020', whiteSpace: 'pre-wrap' }}>{error}</pre>
      ) : null}

      {result ? (
        <pre
          style={{
            marginTop: 16,
            background: '#111',
            color: '#ddd',
            padding: 16,
            borderRadius: 8,
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </div>
  );
};

export default GrowthZone;
