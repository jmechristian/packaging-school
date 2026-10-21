export const returnToWithLearnerName = (returnTo, firstName, lastName) => {
  const first = String(firstName || '').trim();
  const last = String(lastName || '').trim();
  if (!first && !last) return returnTo || undefined;

  const stateObj = {};
  if (returnTo) stateObj.returnTo = returnTo;
  if (first) stateObj.firstName = first;
  if (last) stateObj.lastName = last;

  const encodedState = Buffer.from(JSON.stringify(stateObj)).toString('base64');
  const base = returnTo || '/';
  const joiner = base.includes('?') ? '&' : '?';
  return `${base}${joiner}__state=${encodeURIComponent(encodedState)}`;
};
