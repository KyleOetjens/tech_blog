const newCommentHandler = async (event) => {
    const comment_body = document.querySelector('#comment-desc').value.trim();
  const post_id = document.querySelector(`#post-id`).value.trim();
    if (comment_body) {
        console.log(`in post`);
        console.log(comment_body);
        
        
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_body,post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  console.log(response);
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      console.log('hitting delete 349587 button handler')
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);
// document
// .querySelector('.comment-delete-btn')
// .addEventListener(`click`, delButtonHandler);

const elements = document.querySelectorAll('.comment-delete-btn');
elements.forEach(element => {
  element.addEventListener('click', delButtonHandler)
});

  console.log(document
    .querySelector('.comment-delete-btn'))