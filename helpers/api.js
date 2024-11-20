import { Amplify, API, Storage } from 'aws-amplify';
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
