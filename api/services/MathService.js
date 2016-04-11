module.exports = {
  
  calculateAverage: function (options) {

    var sumTutorialRatings = 0;

    _.each(options.ratings, function(rating){
      sumTutorialRatings = sumTutorialRatings + rating.stars;
    });

    var averageRating = sumTutorialRatings / options.ratings.length;

    return averageRating;
  }
};