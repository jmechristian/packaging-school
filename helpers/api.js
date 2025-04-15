import { Amplify, API, Storage, graphqlOperation } from 'aws-amplify';
import {
  getAuthor,
  getLesson,
  listSalesBars,
  getLMSCourse,
  listFaqs,
  listIndexPages,
  listEventTemplates,
  eventTemplatesBySlug,
  aPSRegistrantsByEmail,
  listLMSCourses,
  listCertificateObjects,
  getPurchase,
  listCMPMSessions,
  usersByEmail,
  listCohorts,
  listLearningPaths,
  learningPathsBySlug,
} from '../src/graphql/queries';
import {
  createClick,
  createLearningPathUsers,
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
  deleteLearningPathUsers,
} from '../src/graphql/mutations';

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
  // ... add more levels as needed
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
  location
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
  format
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
  format
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

export const checkRegistrantEmail = async (email) => {
  const registrant = await API.graphql({
    query: aPSRegistrantsByEmail,
    variables: { email: email },
  });
  return registrant.data.aPSRegistrantsByEmail;
};

export const uploadUserEventPhoto = async (
  caption,
  event,
  eventID,
  photo,
  uploadedBy
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
      ua
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
        type: { ne: 'CUSTOMER' },
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

export const getCertificates = async () => {
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
  return res.data.categoriesByValue.items[0].certificates.items;
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
      graphqlOperation(listIndexPages, { nextToken }) // Pass the nextToken if it exists
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

export const handleSSO = async ({ email, first_name, last_name, returnTo }) => {
  if (!email || !first_name || !last_name) {
    throw new Error('Missing required fields for SSO');
  }

  const payload = {
    email,
    first_name,
    last_name,
    return_to: returnTo,
  };

  const response = await fetch(
    'https://packaging-school-git-dev-packaging-school.vercel.app/api/generateJWT',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

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
          learningPaths {
            items {
              learningPath {
                id
                title
              }
            }
          }
          level
          linkedin
          location
          name
          office
          onboardingComplete
          onboardingCompleteDate
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
  const res = await API.graphql({
    query: createUser,
    variables: { input: data },
  });
  return res.data.createUser;
};

export const updateAWSUser = async (data) => {
  const res = await API.graphql({
    query: updateUser,
    variables: { input: data },
  });
  return res.data.updateUser;
};

export const getCohorts = async () => {
  const res = await API.graphql({
    query: listCohorts,
  });
  return res.data.listCohorts.items.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
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

export const completeLesson = async ({
  lessonId,
  userId,
  xpAwarded,
  pxp,
  thinkificXp,
}) => {
  const levelProgress = calculateLevelProgress(thinkificXp + pxp + xpAwarded);

  await API.graphql({
    query: createUserCompletedLessons,
    variables: {
      input: {
        userId: userId,
        lessonId: lessonId,
      },
    },
  });

  const res = await API.graphql({
    query: updateUser,
    variables: {
      input: {
        id: userId,
        psXp: pxp + xpAwarded,
        totalXp: thinkificXp + pxp + xpAwarded,
        level: levelProgress.level,
        xpToNextLevel: levelProgress.xpNeeded,
      },
    },
  });

  return res.data.updateUser;
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

export const getPaths = async () => {
  const getPathsQuery = /* GraphQL */ `
    query MyQuery {
      listLearningPaths {
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
          title
          description
          displayOrder
          id
          slug
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
    courseIds.map((id) => getPathCourseById(id.thinkificId))
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
          description
          displayOrder
          hours
          id
          slug
          title
          users {
            items {
              id
              user {
                email
                name
                linkedin
                id
                company
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

export const addStudentToPath = async (pathId, userId) => {
  const res = await API.graphql({
    query: createLearningPathUsers,
    variables: { input: { learningPathId: pathId, userId } },
  });
  return res.data.createLearningPathUsers;
};

export const removeStudentFromPath = async (id) => {
  const res = await API.graphql({
    query: deleteLearningPathUsers,
    variables: { input: { id } },
  });
  return res.data.deleteLearningPathUsers;
};
