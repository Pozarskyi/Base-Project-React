import React, { useState, useRef, useMemo } from 'react';
import PostFilter from './component/PostFilter';
import PostForm from './component/PostForm';
import PostItem from './component/PostItem';
import PostList from './component/PostList';
import MyButton from './component/UI/button/MyButton';
import MyInput from './component/UI/input/MyInput';
import MySelect from './component/UI/select/MySelect';

// import Counter from './component/counter';

import './styles/App.css'

function App() {
  const [posts, setPosts] = useState([
        {id: 1, title: 'aa', body: 'cc'},
        {id: 2, title: 'bb', body: 'bb'},
        {id: 3, title: 'cc', body: 'aa'}
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})
  
  const sortedPosts = useMemo(() => {
    console.log('Worked function');
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  },[filter.sort, posts]);

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])   

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


   return (
    <div className="App">
      {/* <Counter/> */}
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter={filter} 
        setFilter={setFilter}/>
      {sortedAndSearchPosts.length
        ? <PostList remove={removePost} posts={sortedAndSearchPosts} title='Post JavaScript 1'/>
        : <h1 style={{textAlign: 'center'}}>
          Post is not found!</h1>
      }
      
    </div>
  );
}

export default App;
