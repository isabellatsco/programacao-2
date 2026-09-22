const path = require('path');
const { Router } = require('express');

const router = Router();

function sendPage(arquivo) {
  return (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', arquivo), (error) => 
      {
      if (error) {
        next(error);
      }
    });
  };
}

router.get('/', sendPage('home.html'));
router.get('/quem_somos', sendPage('quem_somos.html'));
router.get('/fale_conosco', sendPage('fale_conosco.html'));


module.exports = router;
