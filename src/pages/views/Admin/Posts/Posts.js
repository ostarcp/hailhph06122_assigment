import hooks from 'hooks';
import React, { useState, useEffect } from 'react';
import { BsTrashFill, BsWrench } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'reactstrap';
import actions from 'redux/actions';
import Swal from 'sweetalert2';
import PostModal from './dialog/PostModal';

const { usePost } = hooks;
const { addPost, editPost, deletePost, getAllPost} = actions;

const Posts = props => {
  const dispatch = useDispatch();
  const [editModal, setopenEditModal] = useState(false);
  const [addModal, setopenAddModal] = useState(false);

  const [post, setpost] = useState({});

   usePost();


  const postReducer = useSelector(state => state.postReducer);
  const { postList, isGettingPost,isAdding,isUpdating } = postReducer;


  const toggleEditModal = (post) => {
    setpost(post);
    setopenEditModal(!editModal);
  }
  const toggleAddModal = () => {
    setopenAddModal(!addModal);
  }

  const onAddPost = (post) => {
    console.log('adding');
    dispatch(addPost({ post }));
    setopenAddModal(!addModal);
  }
  const onEditPost = (post) => {
    console.log('edit');
    dispatch(editPost({post}))
    setopenEditModal(!editModal);
  }

  const onDelete = (post) => {
    console.log('deletePost', post);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        dispatch(deletePost({ post }));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const converTime = (time) => {
    const newTime = new Date(time);
    const formatTime = newTime.toLocaleDateString();
    return formatTime;
  }

  const renderPost = () => {
    if (isGettingPost || isAdding || isUpdating) {
      return <tr><td> loading </td></tr>
    }

    return (
      <React.Fragment>
        {postList && postList.map(x => (
          <tr key={x.id}>
            <th scope="row">{x.id}</th>
            <td>{x.title}</td>
            <td><img src={x.image} width="100px" alt="oops" /></td>
            <td>{converTime(x.created_at)}</td>
            <td>
              <Button color="success" onClick={() => toggleEditModal(x)}><BsWrench /></Button>{' '}
              <Button color="danger" onClick={() => onDelete(x)}><BsTrashFill /></Button>
            </td>
          </tr>
        ))}
      </React.Fragment>
    )
  }

  return (
    <div>
      <React.Fragment>
        <PostModal
          isAdd={addModal}
          isEdit={editModal}
          post={post}

          onAdd={onAddPost}
          onEdit={onEditPost}

          toggleEdit={toggleEditModal}
          toggleAdd={toggleAddModal}
        />

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
               <th>Image</th>
              <th>Time</th>
              <th><Button color="primary" onClick={toggleAddModal}>ADD</Button></th>
            </tr>
          </thead>
          <tbody>
            {renderPost()}
          </tbody>
        </Table>

      </React.Fragment>
    </div>
  )
}

Posts.propTypes = {

}

export default Posts
