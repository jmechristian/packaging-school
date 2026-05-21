import { API } from 'aws-amplify';
import LessonPageTemplate from '../lessons/[id]';

const HARDCODED_LESSON_ID = '61ba7f1f-28da-4abc-8dfb-74c9fc3c75e6';

export async function getStaticProps() {
  const getLessonById = /* GraphQL */ `
    query GetLessonById($id: ID!) {
      getLesson(id: $id) {
        id
        links {
          items {
            name
            link
            lessonLinksId
          }
        }
        learningPaths {
          items {
            learningPathLessonsId
          }
        }
        analysis {
          id
          quizCorrectAnswer
          quizOptions
          quizQuestion
          readingTime
        }
        author
        videoLink
        backdate
        media
        mediaType
        content
        objectives
        seoImage
        slides
        slug
        actionCTA
        actionLink
        actionSubhead
        actionExample
        actionLinkTitle
        tags {
          items {
            tags {
              tag
            }
          }
        }
        sources {
          items {
            name
            link
            lessonSourcesId
            position
          }
        }
        subhead
        title
        featured
        related
        type
        wired
        wiredQuestions {
          question
          options
          correctAnswer
        }
        wiredLessonId
        updatedAt
      }
    }
  `;

  const res = await API.graphql({
    query: getLessonById,
    variables: { id: HARDCODED_LESSON_ID },
  });

  const lesson = res?.data?.getLesson || null;

  if (!lesson) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { lesson }, revalidate: 10 };
}

const SandboxLessonComplete = ({ lesson }) => {
  return (
    <LessonPageTemplate
      lesson={lesson}
      enableProgressTracking={true}
      enableDemoQuiz={true}
      enableBoosterFlow={true}
    />
  );
};

export default SandboxLessonComplete;
