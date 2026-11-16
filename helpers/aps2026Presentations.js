// Playback URLs stay in this server module. The page receives titles and
// speakers, plus a cover image once one is set on the presentation.
const cover = (number) =>
  `https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/2026/Bella%20Luna%20Photos%20Greenville%20SC-${number}-1280.jpg`;

const PRESENTATIONS = [
  {
    id: 'gm-keynote',
    session: 'GM Keynote - Robotics Integration at GM',
    vimeoId: '1240779506',
    group: 'talk',
    cover: cover(165),
  },
  {
    id: 'oem-volvo',
    session: 'OEM Packaging Needs',
    speaker: 'Carlos Gutierrez',
    vimeoId: '1240895348',
    group: 'talk',
    cover: cover(173),
  },
  {
    id: 'oem-nissan',
    session: 'OEM Packaging Needs',
    speaker: 'Alex Seger',
    vimeoId: '1240774698',
    group: 'talk',
    cover: cover(166),
  },
  {
    id: 'returnable',
    session: 'Case Study: Unlocking the Full Value of Returnable Packaging',
    vimeoId: '1241323376',
    group: 'talk',
    cover: cover(207),
  },
  {
    id: 'forecasting',
    session: 'Vehicle Forecasting',
    vimeoId: '1241461420',
    group: 'talk',
    cover: cover(219),
  },
  {
    id: 'isuzu',
    session: "Isuzu's Next Chapter: Building the Future in Greenville",
    vimeoId: '1246400663',
    group: 'talk',
    cover: cover(224),
  },
  {
    id: 'epr',
    session:
      'Extended Producer Responsibility (EPR): Nissan Aftersales Approach',
    vimeoId: '1242490946',
    group: 'talk',
    cover: cover(243),
  },
  {
    id: 'ask-a-buyer',
    session: 'Ask a Buyer',
    vimeoId: '1242513341',
    group: 'talk',
    cover: cover(250),
  },
  {
    id: 'pitch-zerust',
    session: 'Pack Pitch Contest',
    speaker: 'Dana Blair',
    title: 'Zerust',
    vimeoId: '1243415311',
    group: 'pitch',
    cover: cover(296),
    coverPosition: 'center 22%',
  },
  {
    id: 'pitch-product-movers',
    session: 'Pack Pitch Contest',
    speaker: 'Matt Bublick',
    title: 'Product Movers',
    vimeoId: '1243370334',
    group: 'pitch',
    cover: cover(275),
  },
  {
    id: 'pitch-ventek',
    session: 'Pack Pitch Contest',
    speaker: 'Dan Casillo',
    title: 'Ventek Solutions',
    vimeoId: '1243368980',
    group: 'pitch',
    cover: cover(291),
  },
  {
    id: 'pitch-repurpose',
    session: 'Pack Pitch Contest',
    speaker: 'Lowell Huffman',
    title: 'RePurpose',
    vimeoId: '1243332118',
    group: 'pitch',
    cover: cover(285),
  },
  {
    id: 'pitch-chep',
    session: 'Pack Pitch Contest',
    speaker: 'Patrick Mahoney',
    title: 'CHEP',
    vimeoId: '1243021552',
    group: 'pitch',
    cover: cover(270),
  },
  {
    id: 'pitch-daubert',
    session: 'Pack Pitch Contest',
    speaker: 'Jonathan Brekan',
    title: 'Daubert Cromwell',
    vimeoId: '1243006953',
    group: 'pitch',
    cover: cover(263),
  },
  {
    id: 'pitch-arplank',
    session: 'Pack Pitch Contest',
    speaker: 'Terry Craig',
    title: 'ArPlank',
    vimeoId: '1242898584',
    group: 'pitch',
    cover: cover(261),
  },
  {
    id: 'forming-the-future',
    session: 'Forming the Future of Automotive Packaging',
    vimeoId: '1246312447',
    group: 'talk',
    cover:
      'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/nate-franck-26.png',
  },
  {
    id: 'oem-panel',
    session: 'OEM Panel',
    vimeoId: '1243475843',
    group: 'talk',
    cover: cover(325),
  },
];

const SESSIONS_QUERY = `
  query ListApsAppSessions($nextToken: String) {
    listApsAppSessions(limit: 100, nextToken: $nextToken) {
      items {
        title
        speakerOrder
        agenda { event { year } }
        speakers { items { aPSSpeakerId } }
      }
      nextToken
    }
  }
`;

const SPEAKER_QUERY = `
  query GetAPSSpeaker($id: ID!) {
    getAPSSpeaker(id: $id) {
      id
      profile {
        firstName
        lastName
        company
        jobTitle
      }
    }
  }
`;

const normalize = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[‘’`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const playerUrl = (vimeoId) =>
  `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;

async function graphql(query, variables) {
  const url = process.env.APS_SUMMIT_GRAPHQL_URL;
  const apiKey = process.env.APS_SUMMIT_API_KEY;
  if (!url || !apiKey) {
    throw new Error('Summit session lookup is not configured');
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.errors) {
    throw new Error(payload.errors?.[0]?.message || 'Session lookup failed');
  }
  return payload.data;
}

async function loadSessions() {
  const items = [];
  let nextToken;
  do {
    const data = await graphql(SESSIONS_QUERY, { nextToken });
    const page = data?.listApsAppSessions;
    items.push(...(page?.items || []).filter(Boolean));
    nextToken = page?.nextToken;
  } while (nextToken);

  return items.filter((item) => String(item.agenda?.event?.year || '').includes('2026'));
}

async function loadSpeakers(sessions) {
  const ids = [
    ...new Set(
      sessions.flatMap((session) =>
        (session.speakers?.items || []).map((item) => item?.aPSSpeakerId).filter(Boolean),
      ),
    ),
  ];
  const speakers = {};
  let next = 0;
  const workers = Array.from({ length: Math.min(6, ids.length) }, async () => {
    while (next < ids.length) {
      const id = ids[next];
      next += 1;
      const data = await graphql(SPEAKER_QUERY, { id });
      if (data?.getAPSSpeaker) speakers[id] = data.getAPSSpeaker;
    }
  });
  await Promise.all(workers);
  return speakers;
}

const toPerson = (speaker) => {
  const profile = speaker?.profile || {};
  return {
    name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
    jobTitle: profile.jobTitle || '',
    company: profile.company || '',
  };
};

const peopleForSession = (session, speakers) => {
  const ids = (session?.speakers?.items || [])
    .map((item) => item?.aPSSpeakerId)
    .filter(Boolean);
  const order = Array.isArray(session?.speakerOrder) ? session.speakerOrder : [];
  return [...ids]
    .sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    })
    .map((id) => toPerson(speakers[id]))
    .filter((person) => person.name);
};

function matchPresentation(item, sessions, speakers) {
  const session = sessions.find(
    (entry) => normalize(entry.title) === normalize(item.session),
  );
  const people = peopleForSession(session, speakers);
  const speakersForCard = item.speaker
    ? people.filter((person) => normalize(person.name) === normalize(item.speaker))
    : people;

  return {
    id: item.id,
    group: item.group,
    kicker: item.group === 'pitch' ? 'Pack Pitch Contest' : '',
    title: item.title || session?.title?.trim() || item.session,
    speakers: speakersForCard,
    cover: item.cover || null,
    coverPosition: item.coverPosition || 'center',
  };
}

export async function listAps2026PresentationCards() {
  try {
    const sessions = await loadSessions();
    const speakers = await loadSpeakers(sessions);
    return PRESENTATIONS.map((item) => matchPresentation(item, sessions, speakers));
  } catch (error) {
    console.error('APS 2026 presentation lookup failed', error);
    return PRESENTATIONS.map((item) => ({
      id: item.id,
      group: item.group,
      kicker: item.group === 'pitch' ? 'Pack Pitch Contest' : '',
      title: item.title || item.session,
      speakers: [],
      cover: item.cover || null,
      coverPosition: item.coverPosition || 'center',
    }));
  }
}

export function aps2026PresentationPlayers() {
  return Object.fromEntries(
    PRESENTATIONS.map((item) => [item.id, playerUrl(item.vimeoId)]),
  );
}
