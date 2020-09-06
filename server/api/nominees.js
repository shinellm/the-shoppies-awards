var express = require('express');
var router = express.Router();
const { Nominees } = require('../db/models/nominees')
const morgan = require('morgan');

router.use(morgan('dev'));

/* 
GET request: Returns all of the nominees stored in the database
*/
router.get('/nominees', async (req, res, next) => {
  try {
    const allNominees = await Nominees.findAll({ order: [['movie_votes', 'DESC']] });
    res.json(allNominees);
  } catch(error) {
    console.log("backend error while GETting the list of nominees", error);
    next(error);
  }
});

/* 
POST request: Update's nominees in the datbase that received a vote
*/
router.post('/nominees', async (req, res, next) => {
  try {
    let success = true;

    for (nominee of req.body) {
      const exisitingNominee = await Nominees.findByPk(nominee.imdbID);

      // check if nominee's imdbID exists in database
      if (exisitingNominee) {
        await exisitingNominee.increment('movie_votes'); //increment movie_vote by 1
      }
      else {     
        console.log('nominee does not exist, creating new row in table');

        // create new row for the nominee in the database
        const newNominee = await Nominees.create({
          movie_imdbID: nominee.imdbID,
          movie_title: nominee.Title,
          movie_poster: nominee.Poster,
          movie_year: nominee.Year,
          movie_type: nominee.Type
        });
        if (newNominee) {
          await newNominee.increment('movie_votes'); //increment movie_vote by 1
        }
        else {
          success = false; //signals that an error occured
          break;
        }
      }
    }

    if (success) {
      res.json(req.body);
    }
    else {
      throw new Error("backend error while POSTing to the list of nominees");
    }
  }
  catch(error) {
    console.log(error)
    res.status(500).send(error);
  }
})

module.exports = router;
