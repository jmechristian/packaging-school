import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { getAuthor } from '../../src/graphql/queries';

const AuthorName = ({ id }) => {
  const [isName, setIsName] = useState('');

  useEffect(() => {
    const getName = async () => {
      const author = await API.graphql({
        query: getAuthor,
        variables: { id: id },
      });
      setIsName(author.data.getAuthor.name);
    };

    id && getName();
  }, [id]);

  return <div className='text-xs  text-gray-500'>{isName}</div>;
};

export default AuthorName;
