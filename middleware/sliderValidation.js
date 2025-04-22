exports.validateSliderInput = (req, res, next) => {
    const { title } = req.body;
  e
    if (!title || title.length < 3 || title.length > 100) {
      return res.status(400).json({
        message: "Title must be between 3 and 100 characters."
      });
    }
  
    next(); 
  };
  