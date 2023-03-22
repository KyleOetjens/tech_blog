const newFormHandler = async (event) => {
  // event.preventDefault();

  const post_name = document.querySelector('#project-name').value.trim();
  //const needed_funding = document.querySelector('#project-funding').value.trim();
  const post_description = document.querySelector('#project-desc').value.trim();

  if (post_name && post_description) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ post_name, post_description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const editBtnHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const postName = document.querySelector('#post-name').value;
    const postDescription = document.querySelector('#post-description').value;
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',

    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
}
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.btn-danger')
  .addEventListener('click', delButtonHandler);

  // document
  // .querySelector('.btn-success')
  // .addEventListener('click', editBtnHandler);
