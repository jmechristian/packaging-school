/**
 * Custom GraphQL query for course instructors.
 * Kept separate from src/graphql/queries.js so Amplify codegen won't overwrite it.
 */
export const getCourseInstructorsWithDetails = /* GraphQL */ `
  query GetCourseInstructorsByCourseId($lMSCourseId: ID!) {
    courseInstructorsByLMSCourseId(lMSCourseId: $lMSCourseId) {
      items {
        instructor {
          id
          image
          name
          title
          linkedIn
        }
      }
    }
  }
`;
