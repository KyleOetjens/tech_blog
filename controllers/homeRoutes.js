const router = require('express').Router();
const session = require('express-session');
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [User],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
//console.log(posts);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id',withAuth, async (req, res) => {
  try {
    const projectData = await Post.findByPk(req.params.id, {

      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User], order: [["date_created", "DESC"]]
        }
      ],
    });

    const project = projectData.get({ plain: true });
console.log(project);
project.comments.forEach(element => {
  console.log(element);
  console.log(element.user_id);
  console.log(project.user_id);
  if (element.user_id === project.user_id){
    element.owned_comment = true
  }
  
});
    res.render('post', {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
console.log(userData);
    const user = userData.get({ plain: true });
console.log(user);
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});



module.exports = router;
