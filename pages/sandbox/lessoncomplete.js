import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { runThinkificSSO } from '../../helpers/sso';

const LessonComplete = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleThinkificLogin = useCallback(async () => {
    const trimmedEmail = email.trim();
    const fn = firstName.trim();
    const ln = lastName.trim();
    if (!trimmedEmail) {
      window.alert('Enter an email.');
      return;
    }
    if (!fn || !ln) {
      window.alert('Enter first and last name (required for Thinkific JWT SSO).');
      return;
    }
    const returnTo = `${window.location.origin}${window.location.pathname}`;
    await runThinkificSSO(
      { email: trimmedEmail, name: `${fn} ${ln}` },
      returnTo
    );
  }, [email, firstName, lastName]);

  const handleMarkComplete = useCallback(async () => {
    const trimmedLesson = lessonId.trim();
    const trimmedEmail = email.trim();
    const fn = firstName.trim();
    const ln = lastName.trim();
    if (!trimmedLesson) {
      window.alert('Enter a lesson ID.');
      return;
    }
    if (!trimmedEmail || !fn || !ln) {
      window.alert(
        'Fill email, first name, and last name above so the API can sign a Thinkific user JWT and try GraphQL with it before the public API key.'
      );
      return;
    }

    setLoading(true);
    setResults(null);
    try {
      const res = await fetch('/api/thinkific/mark-lesson-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: trimmedLesson,
          email: trimmedEmail,
          first_name: fn,
          last_name: ln,
        }),
      });
      const json = await res.json().catch(() => ({ parseError: true }));
      setResults({
        httpStatus: res.status,
        body: json,
      });
    } catch (e) {
      setResults({
        httpStatus: null,
        body: { message: e.message || String(e) },
      });
    } finally {
      setLoading(false);
    }
  }, [email, firstName, lastName, lessonId]);

  return (
    <>
      <Head>
        <title>Sandbox — Thinkific lesson complete</title>
      </Head>
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '2rem 1.5rem',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          Thinkific lesson complete (test harness)
        </h1>
        <p style={{ color: '#444', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          Thinkific SSO needs <strong>email</strong>, <strong>first name</strong>, and{' '}
          <strong>last name</strong> for <code>generateJWT</code>.
        </p>
        <p style={{ color: '#444', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          The API signs the same <strong>SSO user JWT</strong> as{' '}
          <code>generateJWT</code> when email + first + last are filled, and tries
          GraphQL with that bearer token <em>before</em> the public API key—this is
          the &quot;secure token per user session&quot; Thinkific describes. Then it
          calls Thinkific&apos;s <code>/beta/graphql</code> endpoint and tries{' '}
          <code>markLessonComplete</code> first, with <code>viewLesson</code>{' '}
          fallback; see <code>attempts</code> in the JSON.
        </p>

        <section style={{ marginBottom: '1.75rem' }}>
          <label
            htmlFor="tf-email"
            style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}
          >
            Email (Thinkific learner)
          </label>
          <input
            id="tf-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="learner@example.com"
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '0.5rem 0.65rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: 12,
              maxWidth: 420,
            }}
          >
            <div style={{ flex: '1 1 140px', minWidth: 0 }}>
              <label
                htmlFor="tf-first"
                style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}
              >
                First name
              </label>
              <input
                id="tf-first"
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                style={{
                  width: '100%',
                  padding: '0.5rem 0.65rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ flex: '1 1 140px', minWidth: 0 }}>
              <label
                htmlFor="tf-last"
                style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}
              >
                Last name
              </label>
              <input
                id="tf-last"
                type="text"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                style={{
                  width: '100%',
                  padding: '0.5rem 0.65rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={handleThinkificLogin}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Log in to Thinkific
            </button>
          </div>
        </section>

        <section style={{ marginBottom: '1.75rem' }}>
          <label
            htmlFor="tf-lesson"
            style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}
          >
            Lesson ID
          </label>
          <input
            id="tf-lesson"
            type="text"
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
            placeholder="Thinkific lesson ID"
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '0.5rem 0.65rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
          <p style={{ color: '#555', fontSize: '0.85rem', marginTop: 8, marginBottom: 0 }}>
            Uses the email and name fields above (required) to sign the same user JWT as
            SSO before calling GraphQL.
          </p>
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={handleMarkComplete}
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? 'Calling API…' : 'Mark lesson complete'}
            </button>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1rem', marginBottom: 8 }}>Results</h2>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              background: '#0d1117',
              color: '#e6edf3',
              fontSize: '0.8rem',
              overflow: 'auto',
              borderRadius: 6,
              minHeight: 120,
            }}
          >
            {results
              ? JSON.stringify(results, null, 2)
              : 'Run “Mark lesson complete” to see the API response.'}
          </pre>
        </section>
      </div>
    </>
  );
};

export default LessonComplete;
