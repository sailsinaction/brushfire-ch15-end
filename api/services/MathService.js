module.exports = {
  
  /**
   * `MathService.calculateAverage()`
   * 
   * Compute the average star rating for a set of Brushfyre ratings.
   *
   * -------------------------------------------------------------------------------------------------------
   * @required {Array} ratings
   *    e.g.
   *    ```
   *    [
   *      {
   *        // stars: 4,
   *        // ...any other props...
   *      },
   *      // ...
   *    ]
   *    ```
   * 
   * @returns {Number}  [the average star rating]
   *   e.g. 3.5
   * 
   * @throws {Error} if an empty array of ratings is provided.
   * -------------------------------------------------------------------------------------------------------
   */
  calculateAverage: function (options) {

    var sumTutorialRatings = 0;

    _.each(options.ratings, function(rating){
      sumTutorialRatings = sumTutorialRatings + rating.stars;
    });

    var averageRating = sumTutorialRatings / options.ratings.length;

    return averageRating;
  }
};
