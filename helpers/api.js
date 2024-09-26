import { Amplify, API } from 'aws-amplify';
import {
  getAuthor,
  listSalesBars,
  getLMSCourse,
  listFaqs,
  listIndexPages,
} from '../src/graphql/queries';
import {
  createClick,
  createCourseClick,
  createIndiaClick,
  createLessonClick,
  listLMSCourses,
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
