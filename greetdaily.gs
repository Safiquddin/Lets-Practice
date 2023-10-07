# Send daily emails with positive messages, jokes, fun facts, and quotes to a list of recipients.

function sendEmail() {
  // Define the list of recipient email addresses as an array
  var recipientEmails = [
    "khangayasuddin99@gmail.com",
    "rajutarannum143@gmail.com",
    "banumuskaan998@gmail.com",
    "khatunsahara77@gmail.com",
    "mdkutubuddin33@gmail.com",
    "tabassumsheikh2708@gmail.com",
    "safiquddinkhan@gmail.com"
  ];

  // // All recipients' addresses separated by a comma for CC
  // var recipients = recipientEmails.join(',');

  // Subject of the email
  var subject = getTimeOfDay() + ", It's " + getDayOfWeek();

  // Loop through the recipientEmails array and send an email to each recipient
  for (var i = 0; i < recipientEmails.length ; i++) {
    var recipient = recipientEmails[i];
    var recipientName = getName[recipient] || "Friend";
    // var recipientName = senderName(recipient);
    var joke = getEnglishJoke(recipient); 
    var dayOfWeek = getDayOfWeek();
    // var includeEnglishJoke = Math.random() < 0.5; // 50% chance of including an English joke
    // var joke = includeEnglishJoke ? getEngishJoke(recipient) : getHindiJoke(); // Randomly select a joke
    var emailBody = "Dear " + recipientName + ",\n\n" +
      (dayMessages[dayOfWeek] || "Have a great day!") + "\n\n" +
      "Here's to another day of laughter, love, and making wonderful memories together as a family ❤️.\n\n" +
      "As the sun rises, may you find happiness and success in everything you do today.\n" +
      "Wishing you a day filled with positivity, laughter, and all the happiness in the world. May this day bring you closer to your dreams and aspirations.\n\n" +
      "Here's a joke to start your day with a smile:\n" + joke + "\n\n" +
      "Funfact for you:\n" + getFunfact() + "\n\n" +
      "Your daily quote:\n" + getQuote() + "\n\n" +
      "Remember, you are loved, cherished, and appreciated every single day.\n" +
      "Take good care of yourself and make the most of this beautiful day! \n\n" +
      "With all my love,\n" +
      "Safiquddin Khan";
    MailApp.sendEmail(recipient, subject, emailBody);
  }
}

function getEnglishJoke(recipient) {
  try {
    var seed = recipient;
    // Implement the Joke() function with a unique seed for randomization
    // Make an HTTP GET request to the API
    // var apiUrl = "https://v2.jokeapi.dev/joke/Any?type=single&seed=" + seed;
    var apiUrl = "https://official-joke-api.appspot.com/random_joke?seed=" + seed;
    var response = UrlFetchApp.fetch(apiUrl);
    var jokeData = JSON.parse(response.getContentText());
    return jokeData.setup + ":" + jokeData.punchline;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error fetching a joke: " + error);
    return "what do you call a dog that can do magic tricks? - a labracadabrador";
  }
}

// function getHindiJoke() {
//   try {
//     var seed = Math.floor(Math.random() * 10000); // Generate a random seed
//     // Make an HTTP GET request to the Hindi JokeAPI
//     var apiUrl = "https://v2.jokeapi.dev/joke/Any?lang=hi&safe=1&blacklistFlags=nsfw,racist,sexist,religious,political";
//     var response = UrlFetchApp.fetch(apiUrl);
//     var jokeData = JSON.parse(response.getContentText());
//     return jokeData.joke;
//   } catch (error) {
//     // Handle any errors that occur during the API request
//     console.error("Error fetching a Hindi joke: " + error);
//     return "कोई चुटकुला नहीं मिला।";
//   }
// }

function getFunfact() {
  try {
    var apiUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";
    var response = UrlFetchApp.fetch(apiUrl);
    var factData = JSON.parse(response.getContentText());
    return factData.text;
  } catch (error) {
    console.error("Error fetching a factData: " + error);
    return "Honey is the only food which does not spoil.";
  }
}

function getQuote() {
  try {
    var apiUrl = "https://api.quotable.io/random";
    var response = UrlFetchApp.fetch(apiUrl);
    var quoteData = JSON.parse(response.getContentText());
    return quoteData.content;
  } catch (error) {
    console.error("Error fetching a factData: " + error);
    return "The universe is made of stories, not atoms.";
  }
}

var getName = {
  'khangayasuddin99@gmail.com': 'Gayasuddin Khan',
  'rajutarannum143@gmail.com': 'MD Shamshad',
  'banumuskaan998@gmail.com': 'Muskaan Banu',
  'khatunsahara77@gmail.com': 'Sahara Khatun',
  'mdkutubuddin33@gmail.com': 'MD Kutubuddin',
  'tabassumsheikh2708@gmail.com': 'Tabassum Nisha',
  'safiquddinkhan@gmail.com': 'Safiquddin Khan',
}; 

// function senderName(email) {
//   var name = email.split("@")[0]; // Get the part before the @ symbol
//   name = name.replace(/[0-9]+/g, ''); // Remove any numbers
//   name = name.replace(/[^a-zA-Z ]/g, ''); // Remove any special characters
//   name = name.trim(); // Remove leading and trailing spaces
//   return name;
// }

var dayMessages = {
  'Sunday': 'Wishing you a relaxing and peaceful Sunday.',
  'Monday': 'Start your week with enthusiasm and determination. Happy Monday!',
  'Tuesday': 'Keep up the great work! It\'s Tuesday! ',
  'Wednesday': 'Halfway through the week! Keep pushing forward.',
  'Thursday': 'You\'re almost there! Thursday is your day to shine.',
  'Friday': 'Happy Friday! Time to relax and enjoy the weekend soon.',
  'Saturday': 'Have a fantastic Saturday filled with joy and adventure!',
};

  // Function to get the current day of the week
function getDayOfWeek() {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var today = new Date();
  return days[today.getDay()];
}
function getTimeOfDay() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  if (hours >= 5 && hours < 12) {
    return "🌞 Good Morning";
  } else if (hours >= 12 && hours < 17) {
    return "🌅 Good Afternoon";
  } else {
    return "🌙 Good Evening";
  }
}
