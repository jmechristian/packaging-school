import { Amplify, API, Storage, graphqlOperation } from 'aws-amplify';
import {
  getAuthor,
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
} from '../src/graphql/queries';
import {
  createClick,
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
} from '../src/graphql/mutations';

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
  const res = await API.graphql({
    query: usersByEmail,
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
