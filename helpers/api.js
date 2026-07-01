import { Amplify, API, Storage, graphqlOperation } from 'aws-amplify';
import {
  listCyberMondayCodes,
  getAuthor,
  getLesson,
  listSalesBars,
  getLMSCourse,
  listFaqs,
  listIndexPages,
  listEventTemplates,
  eventTemplatesBySlug,
  listLMSCourses,
  listCertificateObjects,
  getPurchase,
  listCMPMSessions,
  usersByEmail,
  listCohorts,
  listLearningPaths,
  learningPathsBySlug,
  listLessons,
  listLearningPathProgress,
  getCMPMForm,
  getCPSForm,
  courseReviewsByUserID,
  getOrder,
  getPartner,
  listCourseClicks,
  listTestimonials,
  listApprovedAPS25MediaPages,
  customerLibariesBySlug,
} from '../src/graphql/queries';
import {
  createClick,
  createCourseReview,
  createLearningPathProgress,
  createCourseClick,
  createIndiaClick,
  createLessonClick,
  createUserEventPhoto,
  createEventClick,
  createCyberMondayClick,
  createAPSPresentationClick,
  createCategoryClick,
  createCertificateClick,
  createIndexClick,
  createUser,
  updateUser,
  createUserCompletedLessons,
  deleteLearningPathProgress,
  createUserXp,
  updateUserXp,
  createEmailSubscription,
  createUserWishlist,
  deleteUserWishlist,
  updateLearningPathProgress,
  updateCourseReview,
  createCMPMForm,
  updateCMPMForm,
  createCPSForm,
  updateCPSForm,
  createOrder,
  createIcpfCmpmForm,
  updateIcpfCmpmForm,
  createLibrarySurvey,
  createPgsfForm,
  updatePgsfForm,
} from '../src/graphql/mutations';
import { getAbContext, trackAbPurchaseIntent } from '../libs/analytics';

export const cpsCourses = [
  'ff174f01-5f76-486c-8d7a-849d6d3ff914',
  '672c1d2b-ba6c-4e02-8c34-83e8c3e4f7b3',
  '2418801f-a352-4eae-a394-87a5c0c55f79',
  '4e6c079e-b396-4762-8b7f-4fa4dea64969',
  'f2fad11c-4548-41ea-b39d-be5a4913a4f5',
  '452ec0d8-7464-4bd6-bfc2-eab051a9b40b',
  '431ce262-cf48-4a7c-8ff1-2909f548149b',
  '5d84ef6e-3fa3-423d-8e33-67d32605cb93',
  'f2bd57ba-adbf-45ab-88f0-d68ac20c5b7e',
  '73139212-0b15-4d96-9942-1757fa058fdf',
  'e39e127a-11bc-448d-a8c0-209b3abbfdb9',
];

export const churchAndDwightElectives = [
  '2a0796ab-7a60-455b-b6b2-f95697f1c338',
  '4e32d164-d4d9-4ba2-bcc5-ce882df75b71',
  '7dcbae38-2cf5-4d71-9266-4f11cbb0d2ff',
  '255394df-4fa0-477d-b19a-a8e04837cdb4',
  'add4bc7a-c161-4fae-aba7-346cb2b784fd',
  '62fe0081-a7e4-4eff-bc36-9fa07786c91f',
  '78349554-27bf-4a86-b2e1-211afb3fa0cf',
  'fef1f2a6-b9b9-4619-9900-c677f91681c7',
  '5928b3b2-dd49-4d5c-86ea-e343b7ffaa75',
];

export const cumminsLevel1 = [
  'fef1f2a6-b9b9-4619-9900-c677f91681c7',
  '86d25aa4-620b-4632-ac11-60f7bab6f3a8',
  'a0353804-b928-4513-bde6-3ba429804ace',
  '5c1db625-5367-45b5-8c29-a78beaeb9371',
  '35844454-d9a7-4e50-ab62-2298e53764c9',
  'e277266c-e0b5-403e-ae0e-a06312da7a19',
  '401f89b2-6967-40a1-9131-dff8293cbaa3',
  '8c90539f-5dc5-48ba-a9ab-7e3fa186336f',
  '7ee53b3f-3f91-4b45-9281-5623ddbded33',
  'd61653c9-80b1-492a-9fde-88f6059ca37a',
];

export const cumminsLevel2 = [
  'ff174f01-5f76-486c-8d7a-849d6d3ff914',
  '672c1d2b-ba6c-4e02-8c34-83e8c3e4f7b3',
  '2418801f-a352-4eae-a394-87a5c0c55f79',
  '4e6c079e-b396-4762-8b7f-4fa4dea64969',
  'f2fad11c-4548-41ea-b39d-be5a4913a4f5',
  '452ec0d8-7464-4bd6-bfc2-eab051a9b40b',
  '431ce262-cf48-4a7c-8ff1-2909f548149b',
  '5d84ef6e-3fa3-423d-8e33-67d32605cb93',
  '73139212-0b15-4d96-9942-1757fa058fdf',
];

export const cumminsLevel3 = [
  'e39e127a-11bc-448d-a8c0-209b3abbfdb9',
  'f2bd57ba-adbf-45ab-88f0-d68ac20c5b7e',
  '4e32d164-d4d9-4ba2-bcc5-ce882df75b71',
  '2a0796ab-7a60-455b-b6b2-f95697f1c338',
  '7dcbae38-2cf5-4d71-9266-4f11cbb0d2ff',
  'add4bc7a-c161-4fae-aba7-346cb2b784fd',
  '62fe0081-a7e4-4eff-bc36-9fa07786c91f',
  '78349554-27bf-4a86-b2e1-211afb3fa0cf',
  '5928b3b2-dd49-4d5c-86ea-e343b7ffaa75',
];

export const acmeCourses = [
  '927ba7b7-005d-42a2-af43-26e27f936b55',
  '3b48be53-a8bf-43f1-b060-21054e419376',
  'b6ca56ad-510d-4ca1-abec-a38f7e77294b',
  '01b543df-cd37-4736-99bc-100f04065c3a',
];

export const packagingSchoolCourses = [
  '255394df-4fa0-477d-b19a-a8e04837cdb4',
  'f2bd57ba-adbf-45ab-88f0-d68ac20c5b7e',
  '4e32d164-d4d9-4ba2-bcc5-ce882df75b71',
  '452ec0d8-7464-4bd6-bfc2-eab051a9b40b',
  '431ce262-cf48-4a7c-8ff1-2909f548149b',
  '5d84ef6e-3fa3-423d-8e33-67d32605cb93',
  'f2fad11c-4548-41ea-b39d-be5a4913a4f5',
  '672c1d2b-ba6c-4e02-8c34-83e8c3e4f7b3',
];

export const spcCourses = [
  '5fc017b2-2149-40d7-a6d2-272afad2c4e3',
  '13c3013a-a246-4a02-b974-9d2e6c2254df',
  '02a237f0-3709-4c3a-8e02-47e04d8f1977',
  'b8a62fef-5d63-4730-8cb5-0e0a9aec7486',
  '4f1fdc1d-2a88-4ac3-9bd6-4b46a7b6ae08',
  '8bc8c4ff-6c1d-40cd-9a2e-e9a71e826fa8',
  '83b10e68-0bb0-44e6-a746-cfca4cbbe56e',
  'e0dcbb7d-5a5a-4e36-a907-772a60766ccd',
  '93ed9ccc-f7ab-49eb-b186-279e607101bb',
  '6584feb9-665f-4ee8-9690-9a46e9fb7d41',
  '0f5cad69-68eb-4af0-9ee6-af91ab1c8c22',
  '97bd5164-0560-4116-a8a0-5f1e09c586ca',
];

export const LEVELS_CONFIG = [
  {
    level: 1,
    xpNeeded: 100,
    totalXPRequired: 100,
  },
  {
    level: 2,
    xpNeeded: 283,
    totalXPRequired: 383,
  },
  {
    level: 3,
    xpNeeded: 520,
    totalXPRequired: 903,
  },
  {
    level: 4,
    xpNeeded: 800,
    totalXPRequired: 1703,
  },
  {
    level: 5,
    xpNeeded: 1118,
    totalXPRequired: 2821,
  },
  {
    level: 6,
    xpNeeded: 1470,
    totalXPRequired: 4291,
  },
  {
    level: 7,
    xpNeeded: 1852,
    totalXPRequired: 6143,
  },
  {
    level: 8,
    xpNeeded: 2263,
    totalXPRequired: 8406,
  },
  {
    level: 9,
    xpNeeded: 2700,
    totalXPRequired: 11106,
  },
  {
    level: 10,
    xpNeeded: 3162,
    totalXPRequired: 14268,
  },
  {
    level: 11,
    xpNeeded: 3648,
    totalXPRequired: 17916,
  },
  {
    level: 12,
    xpNeeded: 4157,
    totalXPRequired: 22073,
  },
  {
    level: 13,
    xpNeeded: 4687,
    totalXPRequired: 26760,
  },
  {
    level: 14,
    xpNeeded: 5238,
    totalXPRequired: 31998,
  },
  {
    level: 15,
    xpNeeded: 5809,
    totalXPRequired: 37807,
  },
  {
    level: 16,
    xpNeeded: 6400,
    totalXPRequired: 44207,
  },
  {
    level: 17,
    xpNeeded: 7009,
    totalXPRequired: 51216,
  },
  {
    level: 18,
    xpNeeded: 7637,
    totalXPRequired: 58853,
  },
  {
    level: 19,
    xpNeeded: 8282,
    totalXPRequired: 67135,
  },
  {
    level: 20,
    xpNeeded: 8944,
    totalXPRequired: 76079,
  },
  {
    level: 21,
    xpNeeded: 10733,
    totalXPRequired: 86812,
  },
  {
    level: 22,
    xpNeeded: 12880,
    totalXPRequired: 99692,
  },
  {
    level: 23,
    xpNeeded: 15456,
    totalXPRequired: 115148,
  },
  {
    level: 24,
    xpNeeded: 18547,
    totalXPRequired: 133695,
  },
  {
    level: 25,
    xpNeeded: 22256,
    totalXPRequired: 155951,
  },
  {
    level: 26,
    xpNeeded: 26707,
    totalXPRequired: 182658,
  },
  {
    level: 27,
    xpNeeded: 32049,
    totalXPRequired: 214707,
  },
  {
    level: 28,
    xpNeeded: 38459,
    totalXPRequired: 253166,
  },
  {
    level: 29,
    xpNeeded: 46150,
    totalXPRequired: 299316,
  },
  {
    level: 30,
    xpNeeded: 55381,
    totalXPRequired: 354697,
  },
  {
    level: 31,
    xpNeeded: 66457,
    totalXPRequired: 421154,
  },
  {
    level: 32,
    xpNeeded: 79748,
    totalXPRequired: 500902,
  },
  {
    level: 33,
    xpNeeded: 95698,
    totalXPRequired: 596600,
  },
  {
    level: 34,
    xpNeeded: 114838,
    totalXPRequired: 711438,
  },
  {
    level: 35,
    xpNeeded: 137806,
    totalXPRequired: 849244,
  },
  {
    level: 36,
    xpNeeded: 165367,
    totalXPRequired: 1014611,
  },
  {
    level: 37,
    xpNeeded: 198440,
    totalXPRequired: 1213051,
  },
  {
    level: 38,
    xpNeeded: 238128,
    totalXPRequired: 1451179,
  },
  {
    level: 39,
    xpNeeded: 285754,
    totalXPRequired: 1736933,
  },
  {
    level: 40,
    xpNeeded: 342905,
    totalXPRequired: 2079838,
  },
  {
    level: 41,
    xpNeeded: 411486,
    totalXPRequired: 2491324,
  },
  {
    level: 42,
    xpNeeded: 493783,
    totalXPRequired: 2985107,
  },
  {
    level: 43,
    xpNeeded: 592540,
    totalXPRequired: 3577647,
  },
  {
    level: 44,
    xpNeeded: 711048,
    totalXPRequired: 4288695,
  },
  {
    level: 45,
    xpNeeded: 853258,
    totalXPRequired: 5141953,
  },
  {
    level: 46,
    xpNeeded: 1023910,
    totalXPRequired: 6165863,
  },
  {
    level: 47,
    xpNeeded: 1228692,
    totalXPRequired: 7394555,
  },
  {
    level: 48,
    xpNeeded: 1474430,
    totalXPRequired: 8868985,
  },
  {
    level: 49,
    xpNeeded: 1769316,
    totalXPRequired: 10638301,
  },
  {
    level: 50,
    xpNeeded: 2123179,
    totalXPRequired: 12761480,
  },
];

export const calculateLevelProgress = (xp) => {
  let currentLevel = 1;
  let nextLevelXP = 100;
  let previousLevelXP = 0;

  for (const levelData of LEVELS_CONFIG) {
    if (xp >= levelData.xpNeeded) {
      currentLevel = levelData.level + 1;
      previousLevelXP = levelData.xpNeeded;
      nextLevelXP =
        LEVELS_CONFIG[levelData.level]?.xpNeeded ?? levelData.xpNeeded;
    } else {
      nextLevelXP = levelData.xpNeeded;
      break;
    }
  }

  const xpForNextLevel = nextLevelXP - previousLevelXP;
  const currentLevelXP = xp - previousLevelXP;
  const progress = (currentLevelXP / xpForNextLevel) * 100;

  return {
    level: currentLevel,
    progress,
    xpNeeded: nextLevelXP - xp,
  };
};

export const getUserLevel = (thinkificXp, awsUser) => {
  if (!awsUser) return { level: 1, progress: 0, xpNeeded: 100 };
  return calculateLevelProgress(thinkificXp + (awsUser.psXp || 0));
};

export const getSalesBarItems = async () => {
  const items = await API.graphql({
    query: listSalesBars,
  });
  return items.data;
};

export const registerClick = async (
  id,
  link,
  path,
  ref,
  type,
  ip,
  location,
) => {
  const res = await API.graphql({
    query: createClick,
    variables: {
      input: {
        identifier: id,
        nextPath: link,
        path: path,
        ref: ref,
        type: type,
        ipAddress: ip,
        location: location,
      },
    },
  });
};

export const registerEventClick = async (data) => {
  const res = await API.graphql({
    query: createEventClick,
    variables: {
      input: {
        country: data.country,
        email: data.email,
        eventTemplateClicksId: data.eventTemplateClicksId,
        ipAddress: data.ipAddress,
        object: data.object,
        objectId: data.objectId,
        page: data.page,
        type: data.type,
      },
    },
  });
  return res.data.createEventClick;
};

export const getAllTestimonials = async () => {
  const res = await API.graphql({
    query: listTestimonials,
  });
  return res.data.listTestimonials.items;
};

export const getAuthors = async (id) => {
  const items = await API.graphql({
    query: getAuthor,
    variables: { id: id },
  });
  return items.data;
};

export const registgerCourseClick = async (
  id,
  page,
  location,
  next,
  format,
) => {
  // const ip = await fetch('https://api.ipify.org/?format=json').then((res) =>
  //   res.json()
  // );

  const items = await API.graphql({
    query: createCourseClick,
    variables: {
      input: {
        courseID: id,
        page: page,
        nextPath: next,
        format: format,
        ipAddress: location.ip,
        country: location.country,
        lat: location.lat,
        long: location.long,
      },
    },
  });
  return items.data;
};

export const registgerIndiaCourseClick = async (
  id,
  page,
  location,
  next,
  format,
) => {
  // const ip = await fetch('https://api.ipify.org/?format=json').then((res) =>
  //   res.json()
  // );

  const items = await API.graphql({
    query: createIndiaClick,
    variables: {
      input: {
        courseID: id,
        page: page,
        nextPath: next,
        format: format,
        ipAddress: location.ip,
        country: location.country,
        lat: location.lat,
        long: location.long,
      },
    },
  });
  return items.data;
};

export const registgerLessonClick = async (id, page, location, format) => {
  // const ip = await fetch('https://api.ipify.org/?format=json').then((res) =>
  //   res.json()
  // );

  const items = await API.graphql({
    query: createLessonClick,
    variables: {
      input: {
        LessonID: id,
        page: page,
        ipAddress: location.ip,
        country: location.country,
        lat: location.lat,
        long: location.long,
        format: format,
      },
    },
  });
  return items.data;
};

export const setCoursesFromIds = async (ids) => {
  async function fetchData(id) {
    const response = await API.graphql({
      query: getLMSCourse,
      variables: { id: id },
    });
    const data = await response.data.getLMSCourse;
    return data;
  }

  try {
    const promises = ids.map((id) => fetchData(id));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // rethrow error to be handled by the calling code if needed
  }
};

export const getAllFaqs = async () => {
  const faqs = await API.graphql({ query: listFaqs });
  return faqs.data.listFaqs.items;
};

export const getAllIndexes = async () => {
  const indexes = await API.graphql({ query: listIndexPages });
  return indexes.data.listIndexPages.items;
};

export const getAllEvents = async () => {
  const events = await API.graphql({ query: listEventTemplates });
  return events.data.listEventTemplates.items;
};

export const getEventBySlug = async (slug) => {
  const getEvent = /* GraphQL */ `
    query MyQuery($slug: String!) {
      eventTemplatesBySlug(slug: $slug) {
        items {
          agenda {
            items {
              items {
                createdAt
                description
                end
                eventAgendaItemsId
                eventSpeakerAgendaItemsId
                id
                location
                speakers {
                  items {
                    company
                    email
                    eventAgendaItemSpeakersId
                    eventTemplateSpeakersId
                    id
                    image
                    logo
                    name
                    title
                  }
                }
                start
                title
                type
              }
            }
          }
          createdAt
          description
          endDate
          eventTemplateAgendaId
          hero
          id
          link
          location
          logo
          photos {
            items {
              caption
              id
              eventTemplatePhotosId
              photo
              uploadedBy
              createdAt
            }
          }
          presentations {
            items {
              createdAt
              hero
              id
              presentation
            }
          }
          slug
          speakers {
            items {
              company
              email
              eventAgendaItemSpeakersId
              eventTemplateSpeakersId
              id
              image
              logo
              name
              title
            }
          }
          startDate
          title
        }
      }
    }
  `;

  const event = await API.graphql({
    query: getEvent,
    variables: { slug: slug },
  });
  return event.data.eventTemplatesBySlug;
};

export const uploadUserEventPhoto = async (
  caption,
  event,
  eventID,
  photo,
  uploadedBy,
) => {
  const res = await API.graphql({
    query: createUserEventPhoto,
    variables: {
      input: {
        caption: caption,
        event: event,
        eventID: eventID,
        photo: photo,
        uploadedBy: uploadedBy,
      },
    },
  });
  return res.data.createUserEventPhoto;
};

export const uploadToAPS3 = async (file) => {
  if (!file) return;

  try {
    // Process the image before upload
    const fileName = `user-event-photos/${file.name}`;

    const res = await Storage.put(fileName, file, {
      contentType: file.type,
      resumable: true,
    });

    const photoUrl = `https://packmedia54032-staging.s3.amazonaws.com/public/${res.params.Key}`;

    return photoUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

export const uploadToAPS25 = async (file) => {
  if (!file) return;

  try {
    // Sanitize the filename to make it URL-safe
    const sanitizeFilename = (filename) => {
      const lastDot = filename.lastIndexOf('.');
      const name = lastDot > 0 ? filename.substring(0, lastDot) : filename;
      const ext = lastDot > 0 ? filename.substring(lastDot) : '';

      // Remove or replace special characters and spaces
      const sanitized = name
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[()@!#$%^&*+=\[\]{}|\\:;"'<>,.?/~`]/g, '') // Remove special characters
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      return sanitized + ext.toLowerCase();
    };

    const sanitizedFilename = sanitizeFilename(file.name);
    const fileName = `aps-2025/user-event-photos/${sanitizedFilename}`;

    const res = await Storage.put(fileName, file, {
      contentType: file.type,
      resumable: true,
    });

    const photoUrl = `https://packmedia54032-staging.s3.us-east-1.amazonaws.com/public/${res.params.Key}`;

    return photoUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

export const sendAPSRecoveryEmail = async (email) => {
  const res = fetch('/api/send-aps-recovery-email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });

  return (await res).status;
};

export const registerCyberMondayClick = async (data) => {
  const res = await API.graphql({
    query: createCyberMondayClick,
    variables: {
      input: {
        country: data.country,
        device: data.device,
        ipAddress: data.ipAddress,
        object: data.object,
      },
    },
  });
  return res.data.createCyberMondayClick;
};

export const getDeviceType = () => {
  if (typeof window === 'undefined' || !window.navigator) {
    return 'unknown';
  }

  const ua = window.navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
};

export const getCoursesByCategory = async (category) => {
  const res = await API.graphql({
    query: listLMSCourses,
    variables: {
      filter: {
        categoryArray: { contains: category },
        and: [{ type: { ne: 'CUSTOMER' } }, { type: { ne: 'HIDDEN' } }],
      },
      limit: 500,
    },
  });
  return res.data.listLMSCourses.items;
};

export const handleAPSPresentationClick = async (data) => {
  const res = await API.graphql({
    query: createAPSPresentationClick,
    variables: {
      input: {
        country: data.country,
        device: data.device,
        email: data.email,
        ipAddress: data.ipAddress,
        object: data.object,
      },
    },
  });
};

export const handleCategoryClick = async (data) => {
  const res = await API.graphql({
    query: createCategoryClick,
    variables: {
      input: {
        category: data.category,
        country: data.country,
        device: data.device,
        ipAddress: data.ipAddress,
        page: data.page,
      },
    },
  });
};

export const getCertificate = async (id) => {
  const getTemplate = /* GraphQL */ `
    query MyQuery {
      getCertificateObject(id: $id) {
        abbreviation
        applicationLink
        callout
        category {
          items {
            category {
              name
              value
            }
          }
        }
        courseId
        courses
        description
        hours
        link
        price
        seoImage
        title
        video
      }
    }
  `;

  const variables = {
    id: id, // key is "input" based on the mutation above
  };

  const res = await API.graphql({
    query: getTemplate,
    variables: variables,
  });

  return res.data;
};

export const getCourse = async (id) => {
  const res = await API.graphql({
    query: getLMSCourse,
    variables: { id: id },
  });
  return res.data.getLMSCourse;
};

export const getCourseByID = async (id) => {
  const res = await API.graphql({
    query: getLMSCourse,
    variables: { id: id },
  });
  return res.data.getLMSCourse;
};

export const getAllLMSCourses = async () => {
  const query = /* GraphQL */ `
    query ListLMSCoursesForListing(
      $filter: ModelLMSCourseFilterInput
      $limit: Int
    ) {
      listLMSCourses(filter: $filter, limit: $limit) {
        items {
          id
          courseId
          categoryArray
          type
          price
          hours
          lessons
          preview
          seoImage
          title
          subheadline
          what_learned
          slug
          altLink
          callout
          link
          trial_link
          subscriptionLink
          subscriptionPrice
          stripeLink
          demo
          partOf
        }
      }
    }
  `;
  const res = await API.graphql({
    query,
    variables: {
      filter: {
        // Only exclude CUSTOMER and HIDDEN; COLLECTION / COLLECTIONS are included
        not: {
          or: [{ type: { eq: 'CUSTOMER' } }, { type: { eq: 'HIDDEN' } }],
        },
      },
      limit: 500,
    },
  });
  return res.data.listLMSCourses.items;
};

export const getCertificates = async () => {
  const getAllCertificates = /* GraphQL */ `
    query MyQuery {
      listCertificateObjects(filter: { status: { ne: "DRAFT" } }) {
        items {
          abbreviation
          applicationLink
          callout
          category {
            items {
              category {
                name
                value
              }
            }
          }
          courseId
          courses
          createdAt
          description
          hours
          id
          link
          price
          purchaseLink
          subscriptionLink
          subscriptionPrice
          seoImage
          title
          video
        }
      }
    }
  `;

  const res = await API.graphql({
    query: getAllCertificates,
  });
  return res.data.listCertificateObjects.items;
};

export const getAllCertificates = async () => {
  const getAllCertificates = /* GraphQL */ `
    query MyQuery {
      listCertificateObjects {
        items {
          abbreviation
          applicationLink
          callout
          category {
            items {
              category {
                name
                value
              }
            }
          }
          courseId
          courses
          createdAt
          description
          hours
          id
          link
          price
          purchaseLink
          seoImage
          title
          video
        }
      }
    }
  `;

  const res = await API.graphql({
    query: getAllCertificates,
  });
  return res.data.listCertificateObjects.items;
};

export const registerCertificateClick = async (data) => {
  const res = await API.graphql({
    query: createCertificateClick,
    variables: {
      input: {
        country: data.country,
        device: data.device,
        ipAddress: data.ipAddress,
        object: data.object,
        page: data.page,
        type: data.type,
      },
    },
  });
};

export const getCertificateByCategory = async (category) => {
  const getCertificatesByCat = /* GraphQL */ `
    query MyQuery($category: String!) {
      categoriesByValue(value: $category) {
        items {
          certificates {
            items {
              certificateObject {
                abbreviation
                applicationLink
                callout
                courseId
                courses
                description
                hours
                id
                link
                price
                purchaseLink
                seoImage
                title
                video
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    category: category,
  };

  const res = await API.graphql({
    query: getCertificatesByCat,
    variables: variables,
  });
  const items = res.data?.categoriesByValue?.items ?? [];
  const first = items[0];
  return first?.certificates?.items ?? [];
};

export const getAllPublishedLessons = async () => {
  const getLessonsQuery = /* GraphQL */ `
    query MyQuery($nextToken: String) {
      listLessons(
        limit: 15000
        filter: { status: { eq: "PUBLISHED" } }
        nextToken: $nextToken
      ) {
        items {
          author
          backdate
          content
          createdAt
          id
          objectives
          screengrab
          seoImage
          slug
          tags {
            items {
              tags {
                id
                tag
              }
            }
          }
          title
          type
          subhead
        }
        nextToken
      }
    }
  `;

  let allItems = [];
  let nextToken = null;

  do {
    const result = await API.graphql({
      query: getLessonsQuery,
      variables: { nextToken },
    });

    // Append the items from this batch to the overall array
    allItems = allItems.concat(result.data.listLessons.items);

    // Update nextToken for the next iteration
    nextToken = result.data.listLessons.nextToken;
  } while (nextToken); // Keep fetching until there's no nextToken

  return allItems;
};

export async function fetchAllIndexes() {
  let allItems = [];
  let nextToken = null;

  do {
    const result = await API.graphql(
      graphqlOperation(listIndexPages, { nextToken }), // Pass the nextToken if it exists
    );

    // Append the items from this batch to the overall array
    allItems = allItems.concat(result.data.listIndexPages.items);

    // Update nextToken for the next iteration
    nextToken = result.data.listIndexPages.nextToken;
  } while (nextToken); // Keep fetching until there's no nextToken

  return allItems;
}

export const registerIndexClick = async (data) => {
  await API.graphql({
    query: createIndexClick,
    variables: {
      input: {
        country: data.country,
        device: data.device,
        ipAddress: data.ipAddress,
        page: data.page,
        type: data.type,
      },
    },
  });
};

export const getStorePurchase = async (id) => {
  const res = await API.graphql({
    query: getPurchase,
    variables: { id: id },
  });
  return res.data.getPurchase;
};

export const getCPSCourses = async () => {
  const res = await API.graphql({
    query: listLMSCourses,
    variables: {
      filter: {
        courseId: { contains: 'CPS' },
      },
      limit: 500,
    },
  });
  return res.data.listLMSCourses.items;
};

export const getAPCCourses = async () => {
  const res = await API.graphql({
    query: listLMSCourses,
    variables: {
      filter: {
        courseId: { contains: 'APC' },
      },
      limit: 500,
    },
  });
  return res.data.listLMSCourses.items;
};

export const handleSSO = async ({
  email,
  first_name,
  last_name,
  returnTo,
  baseUrl,
}) => {
  // Use provided baseUrl or fallback to default
  const finalBaseUrl =
    baseUrl ||
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://packagingschool.com');

  if (!email || !first_name || !last_name) {
    throw new Error('Missing required fields for SSO');
  }

  const payload = {
    email,
    first_name,
    last_name,
    return_to: returnTo,
  };

  const response = await fetch(`${finalBaseUrl}/api/generateJWT`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (response.ok) {
    // Return the URL instead of redirecting directly
    return data.url;
  } else {
    console.error('SSO Error:', data.error);
    throw new Error(data.error || 'SSO request failed');
  }
};

export const getLatestCMPMSessions = async () => {
  const res = await API.graphql({
    query: listCMPMSessions,
  });

  const now = new Date();
  const futureSessions = res.data.listCMPMSessions.items
    .filter((session) => new Date(session.deadline) > now)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return futureSessions[0] || null; // Return first future session or null if none found
};

export const getCurrentCMPMSessions = async () => {
  const res = await API.graphql({
    query: listCMPMSessions,
  });
  const now = new Date();
  return res.data.listCMPMSessions.items
    .filter((session) => new Date(session.deadline) > now)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
};

export const getAWSUser = async (email) => {
  const userQuery = /* GraphQL */ `
    query MyQuery($email: String!) {
      usersByEmail(email: $email) {
        items {
          allAccess
          allAccessEndDate
          allAccessStartDate
          bio
          cmpmFormID
          achievements {
            items {
              achievementId
              achievement {
                title
                id
              }
            }
          }
          cohorts {
            items {
              cohortId
              userId
              id
              cohort {
                id
                endDate
                description
                deadline
                instructor {
                  company
                  name
                  title
                  image
                  linkedIn
                  id
                }
                link
                name
                startDate
                type
              }
            }
          }
          company
          companyID
          cpsFormID
          dailyStreak
          email
          goals
          id
          interests
          lastLogin
          lessonsCompleted {
            items {
              lessonId
            }
          }
          learningPathProgress {
            items {
              completedCourses
              completedLessons
              completionDate
              credential
              credentialDate
              createdAt
              id
              lastAccessedDate
              learningPath {
                id
                icon
                hours
                description
                slug
                title
                courses {
                  items {
                    id
                    thinkificId
                  }
                }
                lessons {
                  items {
                    lesson {
                      id
                      usersCompleted {
                        items {
                          user {
                            id
                          }
                        }
                      }
                    }
                  }
                }
              }
              progress
              startDate
              status
            }
          }
          level
          linkedin
          location
          name
          office
          onboardingComplete
          onboardingCompleteDate
          tourCompleted
          picture
          psXp
          savedArticles
          savedCourses
          savedLessons
          source
          thinkificId
          thinkificXp
          title
          totalXp
          updatedAt
          xpToNextLevel
          cell
          wishlist {
            items {
              id
              lMSCourse {
                altLink
                callout
                categoryArray
                courseId
                hours
                id
                lessons
                link
                preview
                price
                seoImage
                slug
                stripeLink
                subheadline
                subscriptionPrice
                subscriptionLink
                thinkificId
                title
                type
                videos
              }
            }
          }
          userXp {
            dailyStreak
            id
            lastLogin
            level
            psXp
            thinkificXp
            totalXp
            updatedAt
            userXpUserId
            xpToNextLevel
            progress
          }
          userUserXpId
        }
      }
    }
  `;

  const res = await API.graphql({
    query: userQuery,
    variables: { email: email },
  });
  return res.data.usersByEmail.items[0];
};

export const createAWSUser = async (data) => {
  // Minimal selection to avoid heavy relationships (e.g., apss GSI) that
  // break in environments without those indexes.
  const minimalCreateUser = /* GraphQL */ `
    mutation CreateUserMinimal($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        email
        name
        thinkificId
        userUserXpId
        lastLogin
        dailyStreak
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        onboardingComplete
        tourCompleted
        createdAt
        updatedAt
      }
    }
  `;

  const res = await API.graphql({
    query: minimalCreateUser,
    variables: { input: data },
  });
  return res.data.createUser;
};

export const updateAWSUser = async (data) => {
  // Minimal selection to avoid heavy relationships (e.g., apss GSI) that
  // break in environments without those indexes.
  const minimalUpdateUser = /* GraphQL */ `
    mutation UpdateUserMinimal($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        email
        name
        thinkificId
        userUserXpId
        lastLogin
        dailyStreak
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        onboardingComplete
        tourCompleted
        updatedAt
      }
    }
  `;

  const res = await API.graphql({
    query: minimalUpdateUser,
    variables: { input: data },
  });
  return res.data.updateUser;
};

export const getCohorts = async () => {
  const res = await API.graphql({
    query: listCohorts,
  });

  const now = new Date();
  const currentAndFutureCohorts = res.data.listCohorts.items.filter(
    (cohort) => new Date(cohort.deadline) >= now,
  );

  return currentAndFutureCohorts.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline),
  );
};

export const updateThinkificUser = async (data) => {
  const res = await fetch('/api/thinkific/update-user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const expireEnrollment = async (id) => {
  const res = await fetch('/api/thinkific/expire-enrollment', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to expire enrollment');
  }

  return res.json();
};

export const reEnroll = async (id) => {
  const res = await fetch('/api/thinkific/re-enroll', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
};

export const completeLesson = async ({ lessonId, userId }) => {
  const res = await API.graphql({
    query: createUserCompletedLessons,
    variables: {
      input: {
        userId: userId,
        lessonId: lessonId,
      },
    },
  });
  return res.data.createUserCompletedLessons;
};

export const handleBookmarkAdd = async (lessons, userId) => {
  const res = await API.graphql({
    query: updateUser,
    variables: {
      input: {
        id: userId,
        savedLessons: lessons,
      },
    },
  });
};

export const getSavedLesson = async (lessonId) => {
  const res = await API.graphql({
    query: getLesson,
    variables: { id: lessonId },
  });
  return res.data.getLesson;
};

// LEARNING PATHS

export const getPaths = async () => {
  const getPathsQuery = /* GraphQL */ `
    query MyQuery {
      listLearningPaths(filter: { status: { eq: "ACTIVE" } }) {
        items {
          courses {
            items {
              course {
                hours
                id
                title
              }
              id
              thinkificId
            }
          }
          lessons {
            items {
              id
              lesson {
                author
                backdate
                createdAt
                id
                seoImage
                slug
                subhead
                title
                usersCompleted {
                  items {
                    userId
                  }
                }
              }
              order
            }
          }
          title
          description
          displayOrder
          id
          slug
          icon
        }
      }
    }
  `;

  const res = await API.graphql({
    query: getPathsQuery,
  });
  return res.data.listLearningPaths.items;
};

export const getAllPathCourses = async (courseIds) => {
  const courses = await Promise.all(
    courseIds.map((id) => getPathCourseById(id.thinkificId)),
  );
  return courses;
};

export const getPathCourseById = async (id) => {
  const res = await fetch(`/api/thinkific/get-course-by-id?id=${id}`);
  return res.json();
};

export const getPathBySlug = async (slug) => {
  const getPathBySlugQuery = /* GraphQL */ `
    query MyQuery($slug: String!) {
      learningPathsBySlug(slug: $slug) {
        items {
          accredibleId
          courses {
            items {
              course {
                hours
                id
                title
              }
              courseId
              id
              order
              thinkificId
            }
          }
          lessons {
            items {
              id
              lesson {
                author
                backdate
                createdAt
                id
                seoImage
                slug
                subhead
                title
                usersCompleted {
                  items {
                    userId
                  }
                }
              }
              order
            }
          }
          description
          displayOrder
          icon
          hours
          id
          slug
          title
          userProgress {
            items {
              completedCourses
              completionDate
              credential
              credentialDate
              createdAt
              id
              lastAccessedDate
              learningPathUserProgressId
              progress
              startDate
              status
              updatedAt
              userLearningPathProgressId
              user {
                id
                email
                name
              }
            }
          }
        }
      }
    }
  `;

  const res = await API.graphql({
    query: getPathBySlugQuery,
    variables: { slug: slug },
  });
  return res.data.learningPathsBySlug;
};

export const addStudentToPath = async (data) => {
  const res = await API.graphql({
    query: createLearningPathProgress,
    variables: { input: data },
  });
  return res.data.createLearningPathProgress;
};

export const removeStudentFromPath = async (id) => {
  const res = await API.graphql({
    query: deleteLearningPathProgress,
    variables: { input: { id } },
  });
  return res.data.deleteLearningPathProgress;
};

export const updateStudentPathProgress = async (id, data) => {
  const res = await API.graphql({
    query: updateLearningPathProgress,
    variables: { input: { id, ...data } },
  });
  return res.data.updateLearningPathProgress;
};

// export const updateStudentXp = async (userId, xp) => {
//   const res = await API.graphql({
//     query: updateUserXp,
//     variables: { input: { id: userId, xp } },
//   });
//   return res.data.updateUserXp;
// };

export const createNewUserXp = async (userId, lastLogin) => {
  // Minimal selection to avoid heavy relationships (e.g., apss GSI) that
  // break in environments without those indexes.
  const minimalCreateUserXp = /* GraphQL */ `
    mutation CreateUserXpMinimal($input: CreateUserXpInput!) {
      createUserXp(input: $input) {
        id
        userXpUserId
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        progress
        updatedAt
      }
    }
  `;

  const res = await API.graphql({
    query: minimalCreateUserXp,
    variables: {
      input: {
        userXpUserId: userId,
        xpToNextLevel: 0,
        totalXp: 0,
        thinkificXp: 0,
        psXp: 0,
        level: 1,
        lastLogin: lastLogin,
        dailyStreak: 1,
      },
    },
  });
  return res.data.createUserXp;
};

export const updateLastLogin = async (
  id,
  level,
  xpToNextLevel,
  progress,
  totalXp,
) => {
  const res = await API.graphql({
    query: updateUserXp,
    variables: {
      input: {
        id: id,
        lastLogin: new Date().toISOString(),
        level: level,
        xpToNextLevel: xpToNextLevel,
        progress: progress,
        totalXp: totalXp,
      },
    },
  });
  return res.data.updateUserXp;
};

export const getCoursesForHomePageFilter = async (category) => {
  const res = await API.graphql({
    query: listLMSCourses,
    variables: {
      filter: {
        categoryArray: { contains: category },
        type: { ne: 'CUSTOMER' },
      },
      limit: 100,
    },
  });
  return res.data.listLMSCourses.items;
};

export const getAllLearningOfTheMonths = async () => {
  const PAGE_SIZE = 100; // AppSync often caps list at 100 per request
  const getLOTMQuery = /* GraphQL */ `
    query MyQuery($limit: Int, $nextToken: String) {
      listLessons(
        limit: $limit
        filter: { status: { eq: "PUBLISHED" }, type: { eq: LOTM } }
        nextToken: $nextToken
      ) {
        items {
          author
          backdate
          content
          createdAt
          id
          media
          mediaType
          objectives
          screengrab
          seoImage
          slug
          tags {
            items {
              tags {
                id
                tag
              }
            }
          }
          title
          type
          subhead
        }
        nextToken
      }
    }
  `;

  let allItems = [];
  let nextToken = null;

  do {
    const result = await API.graphql({
      query: getLOTMQuery,
      variables: { limit: PAGE_SIZE, nextToken },
    });

    const list = result?.data?.listLessons;
    const items = list?.items ?? [];
    allItems = allItems.concat(items);
    nextToken = list?.nextToken ?? null;
  } while (nextToken);

  return allItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const createNewEmailSubscription = async (
  email,
  location,
  device,
  page,
) => {
  const res = await API.graphql({
    query: createEmailSubscription,
    variables: {
      input: {
        email: email,
        country: location.country,
        device: device,
        ipAddress: location.ip,
        page: page,
      },
    },
  });
  return res.data.createEmailSubscription;
};

export const getLessonById = async (id) => {
  const res = await API.graphql({
    query: getLesson,
    variables: { id: id },
  });
  return res.data.getLesson;
};

export const addCourseToWishlist = async (courseId, userId, email) => {
  await API.graphql({
    query: createUserWishlist,
    variables: { input: { userId: userId, lMSCourseId: courseId } },
  });

  const res = await getAWSUser(email);

  return res;
};

export const removeCourseFromWishlist = async (id, email) => {
  await API.graphql({
    query: deleteUserWishlist,
    variables: { input: { id: id } },
  });

  const res = await getAWSUser(email);
  return res;
};

export const getRelatedCourses = async (categories, currentId) => {
  const getRelatedCoursesQuery = /* GraphQL */ `
    query MyQuery($categories: String!, $currentId: ID!) {
      listLMSCourses(
        filter: {
          categoryArray: { contains: $categories }
          and: { id: { ne: $currentId }, and: { type: { ne: "CUSTOMER" } } }
        }
      ) {
        items {
          id
          title
          hours
          courseId
          categoryArray
          callout
          altLink
          lessons
          link
          preview
          price
          seoImage
          slug
          stripeLink
          subheadline
          subscriptionLink
          subscriptionPrice
          thinkificId
          type
          videos
        }
      }
    }
  `;

  const res = await API.graphql({
    query: getRelatedCoursesQuery,
    variables: {
      categories: categories,
      currentId: currentId,
    },
  });
  return res.data.listLMSCourses.items;
};

export const getUserCMPMForm = async (id) => {
  const res = await API.graphql({
    query: getCMPMForm,
    variables: { id: id },
  });
  return res.data.getCMPMForm;
};

export const getUserCPSForm = async (id) => {
  const res = await API.graphql({
    query: getCPSForm,
    variables: { id: id },
  });
  return res.data.getCPSForm;
};

export const getCourseSlug = async (id) => {
  const res = await fetch(`/api/thinkific/get-course-slug?courseId=${id}`);
  return res.json();
};

export const getCourseByThinkificId = async (id) => {
  const getCourseByThinkificIdQuery = /* GraphQL */ `
    query MyQuery($id: String!) {
      lMSCoursesByThinkificId(thinkificId: $id) {
        items {
          id
        }
      }
    }
  `;

  const res = await API.graphql({
    query: getCourseByThinkificIdQuery,
    variables: { id: id },
  });
  return res.data.lMSCoursesByThinkificId.items[0].id;
};

export const createUserReview = async (data) => {
  const res = await API.graphql({
    query: createCourseReview,
    variables: { input: data },
  });
  return res.data.createCourseReview;
};

export const getReviewByUserAndCourse = async (userId, courseId) => {
  const getReviewByUserAndCourseQuery = /* GraphQL */ `
    query MyQuery($userId: ID!, $courseId: ID!) {
      courseReviewsByUserID(
        userID: $userId
        filter: { lMSCourseReviewsId: { eq: $courseId } }
      ) {
        items {
          id
          lMSCourseReviewsId
          rating
          review
          thinkificId
          userID
        }
      }
    }
  `;

  const res = await API.graphql({
    query: getReviewByUserAndCourseQuery,
    variables: {
      userId: userId,
      courseId: courseId,
    },
  });
  return res.data.courseReviewsByUserID.items[0];
};

export const updateUserReview = async (id, data) => {
  const res = await API.graphql({
    query: updateCourseReview,
    variables: { input: { id, ...data } },
  });
  return res.data.updateCourseReview;
};

export const createCredential = async (name, email, groupId) => {
  const res = await fetch('/api/create-credential', {
    method: 'POST',
    body: JSON.stringify({ name, email, groupId }),
  });
  return res.json();
};

export const updateUserPathProgress = async (id, data) => {
  const res = await API.graphql({
    query: updateLearningPathProgress,
    variables: { input: { id, ...data } },
  });
  return res.data.updateLearningPathProgress;
};

export const getCredential = async (id) => {
  const res = await fetch(`/api/get-credential?id=${id}`, {
    method: 'GET',
  });
  return res.json();
};

export const createUsers = async (users) => {
  for (const user of users) {
    try {
      await fetch('/api/create-auth-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Failed to create user ${user.email}:`, error);
    }
  }
};

export const createCmpmFromAppStart = async (data) => {
  const res = await API.graphql({
    query: createCMPMForm,
    variables: { input: data },
  });
  return res.data.createCMPMForm;
};

export const createFreeCmpmForm = async () => {
  const res = await API.graphql({
    query: createCMPMForm,
    variables: {
      input: {
        paymentConfirmation: 'WAIVED',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddress: '',
        addressExtra: '',
        city: '',
        state: '',
        birthYear: '',
        companyName: '',
        companyTitle: '',
        linkedin: '',
        background: '',
        whyPackaging: '',
        areaOfInterest: '',
        yearGoals: '',
        cmpmGoals: '',
        moreAboutYou: '',
        status: 'DRAFT',
      },
    },
  });
  return res.data.createCMPMForm;
};

export const saveCmpmForm = async (data) => {
  const res = await API.graphql({
    query: updateCMPMForm,
    variables: { input: { ...data } },
  });
  return res.data.updateCMPMForm;
};

export const saveIcpfCmpmForm = async (data) => {
  const res = await API.graphql({
    query: updateIcpfCmpmForm,
    variables: { input: { ...data } },
  });
  return res.data.updateIcpfCmpmForm;
};

export const createCpsFromAppStart = async (data) => {
  const res = await API.graphql({
    query: createCPSForm,
    variables: { input: data },
  });
  return res.data.createCPSForm;
};

export const saveCpsForm = async (data) => {
  const res = await API.graphql({
    query: updateCPSForm,
    variables: { input: { ...data } },
  });
  return res.data.updateCPSForm;
};

export const savePgsfForm = async (data) => {
  const res = await API.graphql({
    query: updatePgsfForm,
    variables: { input: { ...data } },
  });
  return res.data.updatePgsfForm;
};

export const createFreeCpsForm = async () => {
  const res = await API.graphql({
    query: createCPSForm,
    variables: {
      input: {
        paymentConfirmation: 'WAIVED',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddress: '',
        addressExtra: '',
        city: '',
        state: '',
        country: '',
        birthYear: '',
        companyName: '',
        companyTitle: '',
        linkedin: '',
        background: '',
        whyPackaging: '',
        areaOfInterest: '',
        sessionApplying: '',
        referral: '',
        payment: '',
        yearGoals: '',
        cpsGoals: '',
        paymentType: '',
        moreAboutYou: '',
        elective: '',
        optOut: false,
        status: 'DRAFT',
      },
    },
  });
  return res.data.createCPSForm;
};

export const getAllCourses = async () => {
  let allCourses = [];
  let nextToken = null;

  do {
    const res = await API.graphql({
      query: listLMSCourses,
      variables: {
        limit: 1000, // Set a high limit to reduce number of requests
        nextToken: nextToken,
      },
    });

    const courses = res.data.listLMSCourses.items;
    allCourses = [...allCourses, ...courses];
    nextToken = res.data.listLMSCourses.nextToken;
  } while (nextToken);

  return allCourses;
};

export const getOrderByID = async (oid) => {
  // Minimal selection to avoid nested User relationships (e.g. apss) that can
  // break in environments without certain GSIs.
  const minimalGetOrder = /* GraphQL */ `
    query GetOrderMinimal($id: ID!) {
      getOrder(id: $id) {
        id
        email
        name
        userID
        total
        status
        courseName
        courseLink
        courseImage
        courseDiscount
        courseDescription
        type
        paymentPlan
        ipAddress
        country
        device
        page
        createdAt
        updatedAt
      }
    }
  `;

  const res = await API.graphql({
    query: minimalGetOrder,
    variables: { id: oid },
  });
  return res.data.getOrder;
};

export const createNewOrder = async (data) => {
  // Fire-and-forget client analytics for purchase intent before order creation.
  if (typeof window !== 'undefined') {
    const abContext = getAbContext({
      pagePath: data.page || window.location.pathname,
    });
    trackAbPurchaseIntent({
      ...abContext,
      pagePath: data.page || abContext.pagePath,
      userID: data.userID || null,
      orderId: data.id,
      source: 'create_new_order',
      metadata: {
        type: data.type || null,
        courseName: data.courseName || null,
        email: data.email || null,
      },
    });
  }

  // Minimal selection to avoid nested User relationships (e.g. apss) that can
  // break in environments without certain GSIs.
  const minimalCreateOrder = /* GraphQL */ `
    mutation CreateOrderMinimal($input: CreateOrderInput!) {
      createOrder(input: $input) {
        id
        email
        name
        userID
        total
        status
        courseName
        courseLink
        courseImage
        courseDiscount
        courseDescription
        type
        paymentPlan
        ipAddress
        country
        device
        page
        createdAt
        updatedAt
      }
    }
  `;

  const res = await API.graphql({
    query: minimalCreateOrder,
    variables: { input: data },
  });
  return res.data.createOrder;
};

export const getProductId = async (id, baseUrl = '') => {
  const url = baseUrl
    ? `${baseUrl}/api/thinkific/get-product-id?id=${id}`
    : `/api/thinkific/get-product-id?id=${id}`;
  const res = await fetch(url);
  return res.json();
};

export const getCouponInfo = async (id, coupon, baseUrl = '') => {
  const url = baseUrl
    ? `${baseUrl}/api/thinkific/get-coupon-info?id=${id}&coupon=${coupon}`
    : `/api/thinkific/get-coupon-info?id=${id}&coupon=${coupon}`;
  const res = await fetch(url);
  return res.json();
};

export const createCMPMFormICPF = async (data) => {
  const res = await API.graphql({
    query: createIcpfCmpmForm,
    variables: {
      input: { ...data },
    },
  });
  return res.data.createIcpfCmpmForm;
};

export const createNewPgsfForm = async (data) => {
  const res = await API.graphql({
    query: createPgsfForm,
    variables: { input: { ...data } },
  });
  return res.data.createPgsfForm;
};

export const getAuth0User = async (email) => {
  const res = await fetch(`/api/get-auth0-user-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return res.json();
};

export const updateAuth0UserPassword = async (userId, password) => {
  const res = await fetch(`/api/update-auth0-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, password }),
  });
  return res.json();
};

export const getThinkificUser = async (email) => {
  const res = await fetch(
    `/api/thinkific/get-user?email=${encodeURIComponent(email)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return res.json();
};

export const updateThinkificUserPassword = async (id, password) => {
  const res = await fetch(`/api/thinkific/update-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, password }),
  });
  return res.json();
};

export const getPartnerById = async (id) => {
  const res = await API.graphql({
    query: getPartner,
    variables: { id: id },
  });
  return res.data.getPartner;
};

export const getPartnerCourseClicks = async (id) => {
  try {
    // console.log('Starting getPartnerCourseClicks for course ID:', id);
    let allItems = [];
    let nextToken = null;

    do {
      // console.log('Making GraphQL request with nextToken:', nextToken);

      const res = await API.graphql({
        query: listCourseClicks,
        variables: {
          filter: {
            courseID: { eq: id },
          },
          limit: 1000,
          nextToken: nextToken,
        },
      });

      // console.log('GraphQL response:', res);

      const items = res.data.listCourseClicks.items || [];
      allItems = allItems.concat(items);
      nextToken = res.data.listCourseClicks.nextToken;

      // console.log(
      //   `Fetched ${items.length} items, total so far: ${allItems.length}`
      // );
    } while (nextToken);

    // console.log(`Total course clicks fetched: ${allItems.length}`);
    return allItems;
  } catch (error) {
    console.error('Error in getPartnerCourseClicks:', error);
    throw error;
  }
};

export const calculateClickStats = (courseClicks) => {
  if (!courseClicks || courseClicks.length === 0) {
    return {
      totalClicks: {
        currentPeriodClicks: 0,
        previousPeriodClicks: 0,
        percentageChange: 0,
        changeType: 'no-change',
      },
      addToCartClicks: {
        currentPeriodClicks: 0,
        previousPeriodClicks: 0,
        percentageChange: 0,
        changeType: 'no-change',
      },
      courseViewClicks: {
        currentPeriodClicks: 0,
        previousPeriodClicks: 0,
        percentageChange: 0,
        changeType: 'no-change',
      },
    };
  }

  const now = new Date();
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const oneHundredEightyDaysAgo = new Date(
    now.getTime() - 180 * 24 * 60 * 60 * 1000,
  );

  // Helper function to calculate stats for a filtered set of clicks
  const calculatePeriodStats = (filteredClicks, type = '') => {
    const currentPeriodClicks = filteredClicks.filter((click) => {
      const clickDate = new Date(click.createdAt);
      return clickDate >= ninetyDaysAgo;
    }).length;

    const previousPeriodClicks = filteredClicks.filter((click) => {
      const clickDate = new Date(click.createdAt);
      return clickDate >= oneHundredEightyDaysAgo && clickDate < ninetyDaysAgo;
    }).length;

    let percentageChange = 0;
    let changeType = 'no-change';

    if (previousPeriodClicks > 0) {
      percentageChange =
        ((currentPeriodClicks - previousPeriodClicks) / previousPeriodClicks) *
        100;
      changeType =
        percentageChange > 0
          ? 'increase'
          : percentageChange < 0
            ? 'decrease'
            : 'no-change';
    } else if (currentPeriodClicks > 0) {
      percentageChange = 100;
      changeType = 'increase';
    }

    return {
      currentPeriodClicks,
      previousPeriodClicks,
      percentageChange: Math.round(percentageChange * 100) / 100,
      changeType,
    };
  };

  // Filter clicks by type
  const addToCartClicks = courseClicks.filter((click) =>
    click.nextPath?.includes('learn.packagingschool.com'),
  );

  const courseViewClicks = courseClicks.filter(
    (click) => !click.nextPath?.includes('learn.packagingschool.com'),
  );

  return {
    totalClicks: calculatePeriodStats(courseClicks),
    addToCartClicks: calculatePeriodStats(addToCartClicks),
    courseViewClicks: calculatePeriodStats(courseViewClicks),
  };
};

export const createNewLibrarySurvey = async (data) => {
  const res = await API.graphql({
    query: createLibrarySurvey,
    variables: { input: data },
  });
  return res.data.createLibrarySurvey;
};

export const getCoupons = async () => {
  const res = await API.graphql({
    query: listCyberMondayCodes,
  });
  return res.data.listCyberMondayCodes.items;
};

export const getApprovedAPS25MediaUsers = async () => {
  let allItems = [];
  let nextToken = null;

  do {
    const res = await API.graphql({
      query: listApprovedAPS25MediaPages,
      variables: { limit: 1000, nextToken: nextToken },
    });
    const items = res.data.listApprovedAPS25MediaPages.items || [];
    allItems = allItems.concat(items);
    nextToken = res.data.listApprovedAPS25MediaPages.nextToken;
  } while (nextToken);
  return allItems;
};

export const getPipelineLibrary = async () => {
  const getPipelineLibraryQuery = /* GraphQL */ `
    query MyQuery {
      customerLibariesBySlug(slug: "pipeline-packaging") {
        items {
          email
          displayName
          description
          addOns
          backgroundImage
          highlightColor
          id
          link
          code
          logo
          pdf
          primaryColor
          pschoolCourses {
            items {
              altLink
              callout
              category
              categoryArray
              courseId
              demo
              hours
              id
              lessons
              link
              objectives
              preview
              price
              seoImage
              shortDescription
              slug
              stripeLink
              subheadline
              thinkificId
              title
              type
              videos
              what_learned
            }
          }
          slide
          slug
          status
          video
        }
      }
    }
  `;
  const res = await API.graphql({
    query: getPipelineLibraryQuery,
    variables: { slug: 'pipeline' },
  });
  return res.data.customerLibariesBySlug.items[0];
};

export const getPPCLibrary = async () => {
  const getPPCLibraryQuery = /* GraphQL */ `
    query MyQuery {
      customerLibariesBySlug(slug: "ppc") {
        items {
          email
          displayName
          description
          addOns
          backgroundImage
          highlightColor
          id
          link
          code
          logo
          pdf
          primaryColor
          pschoolCourses {
            items {
              altLink
              callout
              category
              categoryArray
              courseId
              demo
              hours
              id
              lessons
              link
              objectives
              preview
              price
              seoImage
              shortDescription
              slug
              stripeLink
              subheadline
              thinkificId
              title
              type
              videos
              what_learned
            }
          }
          slide
          slug
          status
          video
        }
      }
    }
  `;
  const res = await API.graphql({
    query: getPPCLibraryQuery,
    variables: { slug: 'ppc' },
  });
  return res.data.customerLibariesBySlug.items[0];
};

export const getAbExperimentSummary = async (experimentKey = 'home_v1') => {
  const query = /* GraphQL */ `
    query ListAbTestEventsForSummary(
      $filter: ModelAbTestEventFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listAbTestEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          eventName
          variant
          createdAt
        }
        nextToken
      }
    }
  `;

  let items = [];
  let nextToken = null;

  do {
    const res = await API.graphql({
      query,
      variables: {
        filter: { experimentKey: { eq: experimentKey } },
        limit: 1000,
        nextToken,
      },
    });

    const page = res?.data?.listAbTestEvents?.items || [];
    items = items.concat(page);
    nextToken = res?.data?.listAbTestEvents?.nextToken || null;
  } while (nextToken);

  const summary = items.reduce(
    (acc, item) => {
      const variant = item.variant || 'UNASSIGNED';
      if (!acc.byVariant[variant]) {
        acc.byVariant[variant] = {
          exposure: 0,
          pageViews: 0,
          purchaseIntent: 0,
          purchaseComplete: 0,
          events: 0,
        };
      }

      const bucket = acc.byVariant[variant];
      bucket.events += 1;
      if (item.eventName === 'ab_exposure') bucket.exposure += 1;
      if (item.eventName === 'ab_page_view') bucket.pageViews += 1;
      if (item.eventName === 'ab_purchase_intent') bucket.purchaseIntent += 1;
      if (item.eventName === 'ab_purchase_complete') bucket.purchaseComplete += 1;
      return acc;
    },
    { experimentKey, totalEvents: items.length, byVariant: {} },
  );

  return summary;
};

export const getLucidMotorsLibrary = async () => {
  const getLucidMotorsLibraryQuery = /* GraphQL */ `
    query MyQuery {
      customerLibariesBySlug(slug: "lucid-motors") {
        items {
          email
          displayName
          description
          code
          addOns
          backgroundImage
          highlightColor
          id
          link
          logo
          pdf
          primaryColor
          clientCourses {
            items {
              altLink
              callout
              category
              categoryArray
              courseId
              demo
              hours
              id
              lessons
              link
              objectives
              preview
              price
              seoImage
              shortDescription
              slug
              stripeLink
              subheadline
              thinkificId
              title
              type
              videos
              what_learned
            }
          }
          pschoolCourses {
            items {
              altLink
              callout
              category
              categoryArray
              courseId
              demo
              hours
              id
              lessons
              link
              objectives
              preview
              price
              seoImage
              shortDescription
              slug
              stripeLink
              subheadline
              thinkificId
              title
              type
              videos
              what_learned
            }
          }
          slide
          slug
          status
          video
        }
      }
    }
  `;
  const res = await API.graphql({
    query: getLucidMotorsLibraryQuery,
    variables: { slug: 'lucid-motors' },
  });
  return res.data.customerLibariesBySlug.items[0];
};
