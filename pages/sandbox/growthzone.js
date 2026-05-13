import React, { useState } from 'react';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: 12,
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: 8,
  textAlign: 'left',
  fontSize: 13,
};

const panelStyle = {
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: 12,
  minWidth: 320,
  background: '#fafafa',
};

const GrowthZone = () => {
  const [running, setRunning] = useState(false);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [markingCompleted, setMarkingCompleted] = useState(false);
  const [inspectingMe, setInspectingMe] = useState(false);
  const [checkingOauthStatus, setCheckingOauthStatus] = useState(false);
  const [loggingOutOauth, setLoggingOutOauth] = useState(false);
  const [error, setError] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [certificationContactIdInput, setCertificationContactIdInput] = useState('');
  const [certificationComponentIdInput, setCertificationComponentIdInput] = useState('');
  const [readinessRawResponse, setReadinessRawResponse] = useState('');
  const [readinessData, setReadinessData] = useState(null);
  const [trackingRawResponse, setTrackingRawResponse] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [markCompletedRawResponse, setMarkCompletedRawResponse] = useState('');
  const [oauthStatusData, setOauthStatusData] = useState(null);
  const [oauthMeData, setOauthMeData] = useState(null);

  const runIntegrationReadiness = async () => {
    setRunning(true);
    setError('');
    setReadinessData(null);
    try {
      const params = new URLSearchParams({ email: emailInput.trim() });
      const response = await fetch(`/api/growthzone/integration-readiness?${params.toString()}`);
      const text = await response.text();
      setReadinessRawResponse(text);
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = {};
      }
      if (!response.ok) {
        setError(json?.message || 'Integration readiness failed');
        return;
      }
      setReadinessData(json);
    } catch (err) {
      setError(err?.message || 'Integration readiness failed');
    } finally {
      setRunning(false);
    }
  };

  const runCertificateTrackingPull = async () => {
    setTrackingLoading(true);
    setError('');
    setTrackingData(null);
    try {
      const response = await fetch('/api/growthzone/pull-certificate-tracking?$skip=0&$top=100');
      const text = await response.text();
      setTrackingRawResponse(text);
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = {};
      }
      if (!response.ok) {
        setError(json?.message || 'Certificate tracking pull failed');
        return;
      }
      setTrackingData(json);
    } catch (err) {
      setError(err?.message || 'Certificate tracking pull failed');
    } finally {
      setTrackingLoading(false);
    }
  };

  const runMarkComponentCompleted = async () => {
    setMarkingCompleted(true);
    setError('');
    try {
      const response = await fetch('/api/growthzone/mark-component-completed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certificationContactId: Number(certificationContactIdInput),
          certificationComponentId: Number(certificationComponentIdInput),
        }),
      });
      const text = await response.text();
      setMarkCompletedRawResponse(text);
      if (!response.ok) {
        let json = {};
        try {
          json = text ? JSON.parse(text) : {};
        } catch {
          json = {};
        }
        setError(json?.message || 'Mark component completed failed');
      }
    } catch (err) {
      setError(err?.message || 'Mark component completed failed');
    } finally {
      setMarkingCompleted(false);
    }
  };

  const runInspectOauthMe = async () => {
    setInspectingMe(true);
    setError('');
    try {
      const response = await fetch('/api/growthzone/oauth/me');
      const text = await response.text();
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = {};
      }
      if (response.ok) {
        setOauthMeData(json);
      }
      if (!response.ok) {
        setError(json?.message || 'OAuth /me inspection failed');
      }
    } catch (err) {
      setError(err?.message || 'OAuth /me inspection failed');
    } finally {
      setInspectingMe(false);
    }
  };

  const runOauthStatus = async () => {
    setCheckingOauthStatus(true);
    setError('');
    try {
      const response = await fetch('/api/growthzone/oauth/status');
      const text = await response.text();
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = {};
      }
      if (!response.ok) {
        setError(json?.message || 'OAuth status check failed');
        return;
      }
      setOauthStatusData(json);
    } catch (err) {
      setError(err?.message || 'OAuth status check failed');
    } finally {
      setCheckingOauthStatus(false);
    }
  };

  const runOauthLogout = async () => {
    setLoggingOutOauth(true);
    setError('');
    try {
      const response = await fetch('/api/growthzone/oauth/logout', { method: 'POST' });
      const text = await response.text();
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = {};
      }
      if (!response.ok) {
        setError(json?.message || 'OAuth logout failed');
        return;
      }
      setOauthMeData(null);
      setOauthStatusData({ connected: false, hasRefreshToken: false, expiresAt: null });
    } catch (err) {
      setError(err?.message || 'OAuth logout failed');
    } finally {
      setLoggingOutOauth(false);
    }
  };

  const startOauth = () => {
    window.location.href = '/api/growthzone/oauth/start?returnTo=/sandbox/growthzone';
  };

  return (
    <div style={{ padding: 24, maxWidth: 1100 }}>
      <h1>GrowthZone Integration Readiness</h1>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Email (required)"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              style={{ minWidth: 360, padding: 8 }}
            />
            <button onClick={runIntegrationReadiness} disabled={running || !emailInput.trim()}>
              {running ? 'Running...' : 'Run Snapshot'}
            </button>
            <button onClick={runCertificateTrackingPull} disabled={trackingLoading}>
              {trackingLoading ? 'Pulling...' : 'Pull Certificate Tracking'}
            </button>
          </div>
        </div>

        <aside style={panelStyle}>
          <h3 style={{ margin: 0, marginBottom: 8 }}>OAuth Panel</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            <button onClick={startOauth}>Connect SSO</button>
            <button onClick={runOauthStatus} disabled={checkingOauthStatus}>
              {checkingOauthStatus ? 'Checking...' : 'Refresh Status'}
            </button>
            <button onClick={runInspectOauthMe} disabled={inspectingMe}>
              {inspectingMe ? 'Loading...' : 'Inspect /me'}
            </button>
            <button onClick={runOauthLogout} disabled={loggingOutOauth}>
              {loggingOutOauth ? 'Logging out...' : 'Logout'}
            </button>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.4 }}>
            <div>
              <strong>Connected:</strong> {oauthStatusData?.connected ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Refresh Token:</strong> {oauthStatusData?.hasRefreshToken ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Expires:</strong> {oauthStatusData?.expiresAt || '-'}
            </div>
            <hr style={{ margin: '10px 0' }} />
            <div>
              <strong>Email:</strong> {oauthMeData?.userinfo?.data?.email || '-'}
            </div>
            <div>
              <strong>ContactId:</strong> {oauthMeData?.userinfo?.data?.contactId ?? '-'}
            </div>
            <div>
              <strong>Name:</strong> {oauthMeData?.aboutMe?.data?.name || '-'}
            </div>
            <div>
              <strong>Tenant:</strong> {oauthMeData?.aboutMe?.data?.tenantName || '-'}
            </div>
          </div>
        </aside>
      </div>

      <section style={{ marginTop: 16 }}>
        <h2>Mark Component Completed</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="number"
            placeholder="CertificationContactId"
            value={certificationContactIdInput}
            onChange={(e) => setCertificationContactIdInput(e.target.value)}
            style={{ minWidth: 220, padding: 8 }}
          />
          <input
            type="number"
            placeholder="CertificationComponentId"
            value={certificationComponentIdInput}
            onChange={(e) => setCertificationComponentIdInput(e.target.value)}
            style={{ minWidth: 220, padding: 8 }}
          />
          <button
            onClick={runMarkComponentCompleted}
            disabled={
              markingCompleted ||
              !certificationContactIdInput.trim() ||
              !certificationComponentIdInput.trim()
            }
          >
            {markingCompleted ? 'Posting...' : 'Mark Completed'}
          </button>
        </div>
      </section>

      {readinessData?.certifications?.rows?.length > 0 ? (
        <section style={{ marginTop: 20 }}>
          <h2>Certifications</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Certification Type ID</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Code</th>
                <th style={cellStyle}>Is Active</th>
                <th style={cellStyle}>Total Enrolled</th>
                <th style={cellStyle}>Total Completed</th>
                <th style={cellStyle}>Total Components</th>
              </tr>
            </thead>
            <tbody>
              {readinessData.certifications.rows.map((row) => (
                <tr key={row.certificationTypeId}>
                  <td style={cellStyle}>{row.certificationTypeId ?? ''}</td>
                  <td style={cellStyle}>{row.name || ''}</td>
                  <td style={cellStyle}>{row.code || ''}</td>
                  <td style={cellStyle}>{row.isActive ? 'Yes' : 'No'}</td>
                  <td style={cellStyle}>{row.totalEnrolled ?? ''}</td>
                  <td style={cellStyle}>{row.totalCompleted ?? ''}</td>
                  <td style={cellStyle}>{row.totalComponents ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      {readinessData?.certificationComponents?.length > 0 ? (
        <section style={{ marginTop: 20 }}>
          <h2>Certification Components</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Certification Type ID</th>
                <th style={cellStyle}>Component ID</th>
                <th style={cellStyle}>Type</th>
                <th style={cellStyle}>Code</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Component Type ID</th>
              </tr>
            </thead>
            <tbody>
              {readinessData.certificationComponents.flatMap((group) =>
                (group.rows || []).map((row) => (
                  <tr key={`${row.certificationTypeId}-${row.certificationComponentId}`}>
                    <td style={cellStyle}>{row.certificationTypeId ?? ''}</td>
                    <td style={cellStyle}>{row.certificationComponentId ?? ''}</td>
                    <td style={cellStyle}>{row.type || ''}</td>
                    <td style={cellStyle}>{row.code || ''}</td>
                    <td style={cellStyle}>{row.name || ''}</td>
                    <td style={cellStyle}>{row.certificationComponentTypeId ?? ''}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      ) : null}

      {readinessData?.contactLookup?.matchedContacts?.length > 0 ? (
        <section style={{ marginTop: 20 }}>
          <h2>Matched Contact</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Contact ID</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {readinessData.contactLookup.matchedContacts.map((row) => (
                <tr key={row.contactId}>
                  <td style={cellStyle}>{row.contactId ?? ''}</td>
                  <td style={cellStyle}>{row.name || ''}</td>
                  <td style={cellStyle}>{row.email || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      {trackingData?.rows?.length > 0 ? (
        <section style={{ marginTop: 20 }}>
          <h2>Enrolled Contacts (from `/api/certifications/contacts`)</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Certification Name</th>
                <th style={cellStyle}>Certification Type ID</th>
                <th style={cellStyle}>Certification Contact ID</th>
                <th style={cellStyle}>Contact ID</th>
                <th style={cellStyle}>Contact Name</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Status Text</th>
                <th style={cellStyle}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {trackingData.rows.map((row) => (
                <tr key={`${row.certificationContactId}-${row.contactId}`}>
                  <td style={cellStyle}>{row.certificationName || ''}</td>
                  <td style={cellStyle}>{row.certificationTypeId ?? ''}</td>
                  <td style={cellStyle}>{row.certificationContactId ?? ''}</td>
                  <td style={cellStyle}>{row.contactId ?? ''}</td>
                  <td style={cellStyle}>{row.contactName || ''}</td>
                  <td style={cellStyle}>{row.status ?? ''}</td>
                  <td style={cellStyle}>{row.statusText || ''}</td>
                  <td style={cellStyle}>{row.percentage || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      {readinessData ? (
        <section style={{ marginTop: 20 }}>
          <h2>Certificate Contact IDs</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Certification Name</th>
                <th style={cellStyle}>Certification Contact ID</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Status Text</th>
                <th style={cellStyle}>Percentage</th>
                <th style={cellStyle}>Credits Earned</th>
                <th style={cellStyle}>Hours Earned</th>
              </tr>
            </thead>
            <tbody>
              {(readinessData?.contactCertifications?.rows || []).length === 0 ? (
                <tr>
                  <td style={cellStyle} colSpan={7}>
                    No contact certification rows returned for this email.
                  </td>
                </tr>
              ) : (
                readinessData.contactCertifications.rows.map((row) => (
                  <tr key={row.certificationContactId}>
                    <td style={cellStyle}>{row.certificationName || ''}</td>
                    <td style={cellStyle}>{row.certificationContactId ?? ''}</td>
                    <td style={cellStyle}>{row.status ?? ''}</td>
                    <td style={cellStyle}>{row.statusText || ''}</td>
                    <td style={cellStyle}>{row.percentage || ''}</td>
                    <td style={cellStyle}>{row.creditsEarned ?? ''}</td>
                    <td style={cellStyle}>{row.hoursEarned ?? ''}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      ) : null}

      {error ? (
        <pre style={{ marginTop: 16, color: '#b00020', whiteSpace: 'pre-wrap' }}>{error}</pre>
      ) : null}

      {readinessRawResponse ? (
        <section style={{ marginTop: 20 }}>
          <h2>Exact Response</h2>
          <pre style={{ marginTop: 8, whiteSpace: 'pre-wrap', fontSize: 12 }}>{readinessRawResponse}</pre>
        </section>
      ) : null}

      {trackingRawResponse ? (
        <section style={{ marginTop: 20 }}>
          <h2>Certificate Tracking Raw Response</h2>
          <pre style={{ marginTop: 8, whiteSpace: 'pre-wrap', fontSize: 12 }}>{trackingRawResponse}</pre>
        </section>
      ) : null}

      {markCompletedRawResponse ? (
        <section style={{ marginTop: 20 }}>
          <h2>Mark Completed Raw Response</h2>
          <pre style={{ marginTop: 8, whiteSpace: 'pre-wrap', fontSize: 12 }}>
            {markCompletedRawResponse}
          </pre>
        </section>
      ) : null}

    </div>
  );
};

export default GrowthZone;
