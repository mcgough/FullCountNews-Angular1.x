PlayerTracker.filter('properCase',function(){
  return function(input){
    return input.toLowerCase().split(" ").map(function(word){
       return word[0].toUpperCase() + word.slice(1);
    }).join(" ");
  };
});

