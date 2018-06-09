var images = [
  "assets/images/grey.png",
  "assets/images/green.png",
  "assets/images/pink.png",
  "assets/images/blue.png"
];
var losses = 0;
var counter = 0;
var wins = 0;
var endGame = false;
var numberOptions = [];
var newVals = false;

function targetNum() {
  return (targetNumber = Math.floor(Math.random() * 102) + 19);
}

$("#number-to-guess").text(targetNum);

function unique() {
  var num = num || 12;
  var currentNum = 0;
  var mines = [];
  for (var i = 0; i < 4; i++) {
    do {
      currentNum = Math.ceil(Math.random() * num);
    } while (mines.includes(currentNum));
    mines.push(currentNum);
  }
  return mines;
}

function sameGameValues() {
  targetNum();
  endGame = false;
  counter = 0;
  $("#number-to-guess").text(targetNum());
}

function newGameValues() {
  endGame = false;
  targetNum();
  counter = 0;
  $("#number-to-guess").text(targetNum());
  $(".crystal-image").each(function() {
    var random = Math.floor(Math.random() * 12) + 1;
    $(this).attr({
      "data-crystalvalue": random
    });
  });
}

if (endGame === false) {
  numberOptions = unique();

  // Each imageCrystal will be given a data attribute called data-crystalValue.
  for (var i = 0; i < numberOptions.length; i++) {
    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", images[i]);

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // imageCrystal.attr("data-crystalvalue", numberOptions[i]);
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);
  }
}

$(".crystal-image").on("click", function() {
  // Determining the crystal's value requires us to extract the value from the data attribute.
  // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
  // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
  // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
  var crystalValue = $(this).attr("data-crystalvalue");
  crystalValue = parseInt(crystalValue);

  // We then add the crystalValue to the user's "counter" which is a global variable.
  // Every click, from every crystal adds to the global counter.
  counter += crystalValue;

  if (counter === targetNumber) {
    wins++;
    $("#wins").html("<h2>" + wins + "</h2>");
    endGame = true;
    newGameValues();
  } else if (counter >= targetNumber) {
    losses++;
    $("#losses").html("<h2>" + losses + "</h2>");
    endGame = true;
    sameGameValues();
  }
  $("#totalScore").html("<h2>" + counter + "</h2>");
});
