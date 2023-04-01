const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/',withAuth, async (req, res) => {
  console.log(req.body);
  console.log(`in comment route`);
    try {
      const newPost = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
      console.log(newPost);
    } catch (err) {
      res.status(400).json(err, {message:"failed"});
    }
  });
  
  router.delete('/:id',withAuth, async (req, res) => {
    console.log(req.params.id)
    try {
      const postData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(`comment deleted`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


module.exports = router;