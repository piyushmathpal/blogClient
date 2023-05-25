import React from 'react'
import Post from '../components/Post'
import {useEffect, useState} from "react";

const IndexPages = () => {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URI}/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (<>
    {posts.length > 0 && posts.map(post => (
      <Post key={post._id} {...post} />
    ))}
  </>)
}

export default IndexPages