import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { runThinkificSSO } from '../../helpers/sso';

const normalizeCourseId = (value) => {
  if (value === undefined || value === null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

const summarizeEnrollmentForCourse = (enrollments, courseIdRaw) => {
  const courseId = normalizeCourseId(courseIdRaw);
  const items = enrollments?.items;
  if (!courseId || !Array.isArray(items)) return null;
  const match = items.find((e) => normalizeCourseId(e.course_id) === courseId);
  if (!match) return null;
  return {
    enrollment_id: match.id ?? null,
    course_id: match.course_id ?? null,
    course_name: match.course_name ?? null,
    percentage_completed: match.percentage_completed ?? null,
    completed: match.completed ?? null,
    expired: match.expired ?? null,
    updated_at: match.updated_at ?? null,
  };
};

const computeProgressDelta = (before, after) => {
  if (!before || !after) return null;
  if (
    typeof before.percentage_completed !== 'number' ||
    typeof after.percentage_completed !== 'number'
  ) {
    return null;
  }
  return {
    percentage_completed: after.percentage_completed - before.percentage_completed,
    completed_changed: before.completed !== after.completed,
  };
};

const summarizeLessonLockStatus = (payload) => {
  const user = payload?.user;
  const lesson = payload?.lesson;
  const lock = lesson?.lockStatusByUserGid;
  if (!user || !lesson || !lock) return null;
  return {
    user_id: user.id ?? null,
    user_gid: user.gid ?? null,
    lesson_id: lesson.id ?? null,
    lesson_title: lesson.title ?? null,
    locked: lock.locked ?? null,
    lockedReason: lock.lockedReason ?? null,
    releaseDate: lock.releaseDate ?? null,
  };
};

const computeLockStatusDelta = (before, after) => {
  if (!before || !after) return null;
  return {
    locked_changed: before.locked !== after.locked,
    lockedReason_changed: before.lockedReason !== after.lockedReason,
    releaseDate_changed: before.releaseDate !== after.releaseDate,
  };
};

const LessonComplete = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [forceRecomplete, setForceRecomplete] = useState(false);
  const [useOAuth, setUseOAuth] = useState(false);
  const [oauthIdentity, setOauthIdentity] = useState('student');
  const [oauthSubdomain, setOauthSubdomain] = useState('packagingschool');
  const [oauthStatusByIdentity, setOauthStatusByIdentity] = useState({
    admin: {
      connected: false,
      hasRefreshToken: false,
      subdomain: null,
      expiresAt: null,
      lastError: null,
    },
    student: {
      connected: false,
      hasRefreshToken: false,
      subdomain: null,
      expiresAt: null,
      lastError: null,
    },
  });
  const [oauthMeByIdentity, setOauthMeByIdentity] = useState({
    admin: null,
    student: null,
  });
  const [oauthStatus, setOauthStatus] = useState({
    connected: false,
    hasRefreshToken: false,
    subdomain: null,
    expiresAt: null,
    lastError: null,
  });
  const [results, setResults] = useState(null);
  const [progressSnapshot, setProgressSnapshot] = useState(null);
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

  const refreshOAuthStatus = useCallback(async (identity = oauthIdentity) => {
    try {
      const res = await fetch(`/api/thinkific/oauth/status?identity=${identity}`);
      const json = await res.json();
      setOauthStatusByIdentity((prev) => ({
        ...prev,
        [identity]: { ...prev[identity], ...json, lastError: null },
      }));
      if (identity === oauthIdentity) {
        setOauthStatus((prev) => ({ ...prev, ...json, lastError: null }));
      }
      if (!json?.connected) {
        setOauthMeByIdentity((prev) => ({ ...prev, [identity]: null }));
      }
    } catch (e) {
      setOauthStatusByIdentity((prev) => ({
        ...prev,
        [identity]: {
          ...prev[identity],
          lastError: e.message || String(e),
        },
      }));
      if (identity === oauthIdentity) {
        setOauthStatus((prev) => ({
          ...prev,
          lastError: e.message || String(e),
        }));
      }
    }
  }, [oauthIdentity]);

  const refreshOAuthMe = useCallback(async (identity = oauthIdentity) => {
    try {
      const res = await fetch(`/api/thinkific/oauth/me?identity=${identity}`);
      const json = await res.json().catch(() => ({ parseError: true }));
      if (!res.ok) {
        setOauthMeByIdentity((prev) => ({
          ...prev,
          [identity]: {
          ok: false,
          httpStatus: res.status,
          body: json,
          },
        }));
        return;
      }
      setOauthMeByIdentity((prev) => ({
        ...prev,
        [identity]: {
        ok: true,
        httpStatus: res.status,
        body: json,
        },
      }));
    } catch (e) {
      setOauthMeByIdentity((prev) => ({
        ...prev,
        [identity]: {
        ok: false,
        httpStatus: null,
        body: { message: e.message || String(e) },
        },
      }));
    }
  }, [oauthIdentity]);

  useEffect(() => {
    refreshOAuthStatus('admin');
    refreshOAuthStatus('student');
  }, [refreshOAuthStatus]);

  useEffect(() => {
    const selected = oauthStatusByIdentity[oauthIdentity] || {};
    setOauthStatus((prev) => ({ ...prev, ...selected }));
  }, [oauthIdentity, oauthStatusByIdentity]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const oauthParam = params.get('oauth');
    if (oauthParam) {
      const identity = params.get('identity') || oauthIdentity;
      refreshOAuthStatus(identity);
      refreshOAuthMe(identity);
    }
  }, [oauthIdentity, refreshOAuthMe, refreshOAuthStatus]);

  const handleStartOAuth = useCallback(() => {
    const sub = (oauthSubdomain || '').trim().replace(/\.thinkific\.com$/i, '');
    if (!sub) {
      window.alert('Enter your Thinkific subdomain first.');
      return;
    }
    const returnTo = window.location.pathname;
    window.location.href = `/api/thinkific/oauth/start?subdomain=${encodeURIComponent(
      sub
    )}&identity=${encodeURIComponent(oauthIdentity)}&returnTo=${encodeURIComponent(returnTo)}`;
  }, [oauthIdentity, oauthSubdomain]);

  const handleMarkComplete = useCallback(async () => {
    const trimmedLesson = lessonId.trim();
    const trimmedEmail = email.trim();
    if (!trimmedLesson) {
      window.alert('Enter a lesson ID.');
      return;
    }

    setLoading(true);
    setResults(null);
    setProgressSnapshot(null);
    try {
      const getEnrollmentSnapshot = async () => {
        if (!trimmedEmail) return null;
        const enrollmentRes = await fetch(
          `/api/thinkific/get-enrollments?email=${encodeURIComponent(trimmedEmail)}`
        );
        return enrollmentRes.json().catch(() => ({ parseError: true }));
      };
      const getLessonLockSnapshot = async () => {
        if (!trimmedEmail) return null;
        const statusRes = await fetch(
          `/api/thinkific/get-lesson-lock-status?email=${encodeURIComponent(
            trimmedEmail
          )}&lessonId=${encodeURIComponent(trimmedLesson)}`
        );
        return statusRes.json().catch(() => ({ parseError: true }));
      };

      const beforeEnrollments = await getEnrollmentSnapshot();
      const beforeLessonLockRaw = await getLessonLockSnapshot();

      const res = await fetch('/api/thinkific/mark-lesson-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: trimmedLesson,
          email: trimmedEmail || undefined,
          forceRecomplete,
          useOAuth,
          oauthIdentity,
        }),
      });
      const json = await res.json().catch(() => ({ parseError: true }));
      const courseId =
        json?.graphql?.data?.markLessonComplete?.course?.id ||
        json?.body?.graphql?.data?.markLessonComplete?.course?.id ||
        null;
      const afterEnrollments = await getEnrollmentSnapshot();
      const afterLessonLockRaw = await getLessonLockSnapshot();

      const before = summarizeEnrollmentForCourse(beforeEnrollments, courseId);
      const after = summarizeEnrollmentForCourse(afterEnrollments, courseId);
      const delta = computeProgressDelta(before, after);
      const beforeLessonLock = summarizeLessonLockStatus(beforeLessonLockRaw);
      const afterLessonLock = summarizeLessonLockStatus(afterLessonLockRaw);
      const lessonLockDelta = computeLockStatusDelta(beforeLessonLock, afterLessonLock);

      setResults({
        httpStatus: res.status,
        body: json,
      });
      setProgressSnapshot({
        email: trimmedEmail || null,
        lessonId: trimmedLesson,
        targetCourseId: courseId || null,
        before,
        after,
        delta,
        beforeLessonLock,
        afterLessonLock,
        lessonLockDelta,
        enrollmentCountBefore: Array.isArray(beforeEnrollments?.items)
          ? beforeEnrollments.items.length
          : null,
        enrollmentCountAfter: Array.isArray(afterEnrollments?.items)
          ? afterEnrollments.items.length
          : null,
        lessonLockRawBefore: beforeLessonLockRaw,
        lessonLockRawAfter: afterLessonLockRaw,
        note: trimmedEmail
          ? 'Snapshot captures immediate before/after from get-enrollments and lesson lockStatusByUserGid. Thinkific UI progress may update with delay.'
          : 'No email provided; enrollment snapshot skipped.',
      });
    } catch (e) {
      setResults({
        httpStatus: null,
        body: { message: e.message || String(e) },
      });
      setProgressSnapshot({
        email: trimmedEmail || null,
        lessonId: trimmedLesson,
        note: 'Snapshot failed before completion of comparison.',
        error: e.message || String(e),
      });
    } finally {
      setLoading(false);
    }
  }, [email, forceRecomplete, lessonId, oauthIdentity, useOAuth]);

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
          The API uses Thinkific&apos;s working path from support: <code>/beta/graphql</code>{' '}
          + API key bearer auth, then runs <code>markLessonComplete</code>. Email is
          included in the response payload for traceability only.
        </p>

        <section
          style={{
            marginBottom: '1.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: '0.85rem',
          }}
        >
          <h2 style={{ fontSize: '1rem', margin: 0, marginBottom: 8 }}>Thinkific OAuth</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type='text'
              value={oauthSubdomain}
              onChange={(e) => setOauthSubdomain(e.target.value)}
              placeholder='packagingschool'
              style={{ padding: '0.45rem 0.6rem', minWidth: 220, boxSizing: 'border-box' }}
            />
            <button
              type='button'
              onClick={handleStartOAuth}
              style={{ padding: '0.45rem 0.75rem', cursor: 'pointer' }}
            >
              Connect OAuth
            </button>
            <select
              value={oauthIdentity}
              onChange={(e) => setOauthIdentity(e.target.value)}
              style={{ padding: '0.45rem 0.6rem', cursor: 'pointer' }}
            >
              <option value='student'>student identity</option>
              <option value='admin'>admin identity</option>
            </select>
            <button
              type='button'
              onClick={() => refreshOAuthStatus(oauthIdentity)}
              style={{ padding: '0.45rem 0.75rem', cursor: 'pointer' }}
            >
              Refresh Status
            </button>
            <button
              type='button'
              onClick={() => refreshOAuthMe(oauthIdentity)}
              style={{ padding: '0.45rem 0.75rem', cursor: 'pointer' }}
            >
              Who am I (OAuth)
            </button>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#374151', marginTop: 8 }}>
            connected: <strong>{String(oauthStatus.connected)}</strong>{' '}
            | identity: <strong>{oauthIdentity}</strong>{' '}
            {oauthStatus.subdomain ? `| subdomain: ${oauthStatus.subdomain}` : ''}{' '}
            {oauthStatus.expiresAt ? `| expires: ${oauthStatus.expiresAt}` : ''}{' '}
            {oauthStatus.lastError ? `| error: ${oauthStatus.lastError}` : ''}
          </div>
          <pre
            style={{
              marginTop: 8,
              marginBottom: 0,
              padding: '0.6rem',
              background: '#111827',
              color: '#e5e7eb',
              borderRadius: 6,
              fontSize: '0.78rem',
              overflow: 'auto',
              minHeight: 70,
            }}
          >
            {oauthMeByIdentity[oauthIdentity]
              ? JSON.stringify(oauthMeByIdentity[oauthIdentity], null, 2)
              : 'Click “Who am I (OAuth)” to inspect token principal via GraphQL me.'}
          </pre>
        </section>

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
            Uses the working route: Thinkific <code>/beta/graphql</code> with API key auth.
          </p>
          <label
            htmlFor="tf-recomplete"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 10,
              fontSize: '0.9rem',
              color: '#333',
            }}
          >
            <input
              id="tf-recomplete"
              type="checkbox"
              checked={forceRecomplete}
              onChange={(e) => setForceRecomplete(e.target.checked)}
            />
            Force re-complete (if already complete, run markLessonIncomplete first)
          </label>
          <label
            htmlFor='tf-use-oauth'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 8,
              fontSize: '0.9rem',
              color: '#333',
            }}
          >
            <input
              id='tf-use-oauth'
              type='checkbox'
              checked={useOAuth}
              onChange={(e) => setUseOAuth(e.target.checked)}
            />
            Use OAuth access token ({oauthIdentity}) instead of API key
          </label>
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

        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: 8 }}>Enrollment Progress Snapshot</h2>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              background: '#111827',
              color: '#e5e7eb',
              fontSize: '0.8rem',
              overflow: 'auto',
              borderRadius: 6,
              minHeight: 120,
            }}
          >
            {progressSnapshot
              ? JSON.stringify(progressSnapshot, null, 2)
              : 'Run “Mark lesson complete” to capture before/after enrollment snapshot.'}
          </pre>
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
