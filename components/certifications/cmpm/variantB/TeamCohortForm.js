import { useState } from 'react';
import { trackAbEngagement } from '../../../../libs/analytics';

const FUNCTIONS = ['R&D', 'Procurement', 'Logistics'];

const emptyForm = {
  companyName: '',
  teamSize: '',
  departments: '',
  timeline: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  functions: [],
};

export default function TeamCohortForm({ open, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  if (!open) return null;

  const toggleFunction = (name) => {
    setForm((prev) => {
      const has = prev.functions.includes(name);
      return {
        ...prev,
        functions: has
          ? prev.functions.filter((f) => f !== name)
          : [...prev.functions, name],
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.companyName.trim() || !form.contactEmail.trim()) {
      setError('Company name and email are required.');
      return;
    }
    setStatus('sending');
    try {
      trackAbEngagement({
        pagePath: '/certifications/get-to-know-cmpm',
        metric: 'team_cohort_request',
        value: 1,
        source: 'cmpm_b_team_cohort_form',
        metadata: {
          companyName: form.companyName,
          teamSize: form.teamSize,
          functions: form.functions,
          timeline: form.timeline,
        },
      });

      // Routes to sales inbox — not the individual application flow.
      await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.contactName || 'Team',
          lastName: 'Cohort Request',
          email: form.contactEmail,
          phone: form.contactPhone,
          message: [
            'CMPM Team Cohort Request',
            `Company: ${form.companyName}`,
            `Team size: ${form.teamSize || 'n/a'}`,
            `Departments: ${form.departments || 'n/a'}`,
            `Functions: ${form.functions.join(', ') || 'n/a'}`,
            `Timeline: ${form.timeline || 'n/a'}`,
            `Contact: ${form.contactName || 'n/a'} / ${form.contactPhone || 'n/a'}`,
          ].join('\n'),
        }),
      });
      setStatus('sent');
      setForm(emptyForm);
    } catch (err) {
      console.warn('Team cohort form failed:', err?.message);
      setStatus('error');
      setError('Something went wrong. Email info@packagingschool.com and we’ll help.');
    }
  };

  return (
    <div
      className='fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6'
      role='dialog'
      aria-modal='true'
      aria-labelledby='team-cohort-title'
    >
      <button
        type='button'
        className='absolute inset-0 bg-dark/70 backdrop-blur-sm'
        aria-label='Close'
        onClick={onClose}
      />
      <div className='relative z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl'>
        <div className='sticky top-0 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-base-mid'>
              Sales · Team Cohort
            </p>
            <h3
              id='team-cohort-title'
              className='mt-1 font-greycliff text-xl font-bold text-slate-900'
            >
              Request a Team Cohort
            </h3>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
          >
            Close
          </button>
        </div>

        {status === 'sent' ? (
          <div className='px-6 py-10 text-center'>
            <p className='font-greycliff text-2xl font-bold text-slate-900'>
              Request received
            </p>
            <p className='mt-3 text-slate-600'>
              Our team will follow up to design a private cohort for your R&amp;D,
              procurement, and logistics leads.
            </p>
            <button
              type='button'
              onClick={onClose}
              className='mt-8 inline-flex rounded-lg bg-clemson px-5 py-3 font-semibold text-white hover:bg-clemson-dark'
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className='flex flex-col gap-4 px-6 py-6'>
            <Field
              label='Company name'
              required
              value={form.companyName}
              onChange={(v) => setForm((p) => ({ ...p, companyName: v }))}
            />
            <div className='grid gap-4 sm:grid-cols-2'>
              <Field
                label='Team size'
                value={form.teamSize}
                onChange={(v) => setForm((p) => ({ ...p, teamSize: v }))}
                placeholder='e.g. 3–6'
              />
              <Field
                label='Timeline'
                value={form.timeline}
                onChange={(v) => setForm((p) => ({ ...p, timeline: v }))}
                placeholder='e.g. Fall 2026'
              />
            </div>
            <Field
              label='Departments involved'
              value={form.departments}
              onChange={(v) => setForm((p) => ({ ...p, departments: v }))}
              placeholder='e.g. Packaging, Ops, Procurement'
            />
            <fieldset>
              <legend className='mb-2 text-sm font-semibold text-slate-800'>
                Which functions are you sending?
              </legend>
              <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap'>
                {FUNCTIONS.map((name) => {
                  const checked = form.functions.includes(name);
                  return (
                    <label
                      key={name}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                        checked
                          ? 'border-base-brand bg-base-light text-base-dark'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type='checkbox'
                        className='rounded border-slate-300 text-base-brand focus:ring-base-brand'
                        checked={checked}
                        onChange={() => toggleFunction(name)}
                      />
                      {name}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className='grid gap-4 sm:grid-cols-2'>
              <Field
                label='Your name'
                value={form.contactName}
                onChange={(v) => setForm((p) => ({ ...p, contactName: v }))}
              />
              <Field
                label='Work email'
                required
                type='email'
                value={form.contactEmail}
                onChange={(v) => setForm((p) => ({ ...p, contactEmail: v }))}
              />
            </div>
            <Field
              label='Phone'
              value={form.contactPhone}
              onChange={(v) => setForm((p) => ({ ...p, contactPhone: v }))}
            />
            {error ? (
              <p className='text-sm text-brand-red' role='alert'>
                {error}
              </p>
            ) : null}
            <button
              type='submit'
              disabled={status === 'sending'}
              className='mt-2 rounded-lg bg-base-dark px-5 py-3.5 font-semibold text-white hover:bg-base-dark-highlight disabled:opacity-60'
            >
              {status === 'sending' ? 'Sending…' : 'Submit to Sales'}
            </button>
            <p className='text-xs text-slate-500'>
              This routes to our sales team—not the individual application.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = 'text',
  placeholder,
}) {
  return (
    <label className='flex flex-col gap-1.5'>
      <span className='text-sm font-semibold text-slate-800'>
        {label}
        {required ? <span className='text-clemson'> *</span> : null}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className='rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-base-brand focus:outline-none focus:ring-2 focus:ring-base-brand/30'
      />
    </label>
  );
}
