
import 'react-quill/dist/quill.snow.css';
import {useState,useContext } from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";
import {UserContext} from "../UserContext";

export default function CreatePost() {
  const {userInfo} = useContext(UserContext);
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_URI}/post`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  const username = userInfo?.username;
  // console.log(userInfo);
  if(!username)
  {
    return <Navigate to={'/'} />
  }
  return (
   
<>
   
   {username&& <form onSubmit={createNewPost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  }
  </>
  );
}