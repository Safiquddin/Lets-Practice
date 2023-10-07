// Send daily emails with positive messages, jokes, fun facts, and quotes to a list of recipients.
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Daily Email Sender')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function sendEmail() {
  // Define the list of recipient email addresses and names as an object
  var recipients = {
    'khanjordan440@gmail.com': '',
    // 'khangayasuddin99@gmail.com': 'Gayasuddin Khan',
    // 'rajutarannum143@gmail.com': 'MD Shamshad',
    // 'banumuskaan998@gmail.com': 'Muskaan Banu',
    // 'khatunsahara77@gmail.com': 'Sahara Khatun',
    // 'mdkutubuddin33@gmail.com': 'MD Kutubuddin',
    // 'tabassumsheikh2708@gmail.com': 'Tabassum Nisha',
    // 'safiquddinkhan@gmail.com': 'Safiquddin Khan',
    // 'realshad07@gmail.com': 'Shad Perwez',
  };

  // Define the list of recipients for whom you want to send Hindi jokes
  var hindirecipients = [
    'khanjordan440@gmail.com',
    'banumuskaan998@gmail.com',
    'realshad07@gmail.com',
    'mdkutubuddin33@gmail.com',
  ];

  // Subject of the email
  var subject = getTimeOfDay() + ", It's " + getDayOfWeek();
  try {
    // Loop through the recipients object and send an email to each recipient
    for (var recipientEmail in recipients) {
      var recipientName = recipients[recipientEmail];
      var dayOfWeek = getDayOfWeek();
      var englishJoke = getEnglishJoke(recipientEmail);
      // Determine whether to send a custom joke or a Hindi joke based on the recipient's email address
      var joke;
      if (hindirecipients.includes(recipientEmail)) {
        var apiUrl = "https://v2.jokeapi.dev/joke/Any?format=txt";
        var probability = Math.random() < 0.5; // 50% chance of including an English joke
        joke = probability ? getCustomJoke(apiUrl) : getHindiJoke(); // Randomly select a joke
      } else {
        // Send a custom joke for others
        var apiUrl = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,sexist&format=txt";
        joke = getCustomJoke(apiUrl);
      }
      var name = recipientName || getName(recipientEmail);
      var emailBody = "Dear " + name + ",\n\n" +
        (dayMessages[dayOfWeek] || "Have a great day!") + "\n\n" +
        "Here's to another day of laughter, love, and making wonderful memories together as a family ❤️.\n\n" +
        "As the sun rises, may you find happiness, success, and be filled with positivity in everything you do today.\n\n" +
        "Here's a joke to start your day with a smile:\n" + englishJoke + "\n\n" +
        "Here's another joke for an extra smile:\n" + joke + "\n\n" +
        "Fun fact for you: 🌟 " + getFunFact() + "\n\n" +
        "Your daily quote: 📖 " + getQuote() + "\n\n" +
        "Remember, you are loved, cherished, and appreciated every single day. ❤️\n" +
        "Take good care of yourself and make the most of this beautiful day! 🌞\n\n" +
        "With all my love,\n" +
        "Safiquddin Khan";
      // MailApp.sendEmail(to, replyTo, subject, body)
      MailApp.sendEmail(recipientEmail, subject, emailBody);
    }
    return 'Daily emails sent successfully.';
  } catch (error) {
    // Handle errors and return an error message
    Logger.log('Error: ' + error.message);
    return 'Error: ' + error.message;
  }
  debugger;
}


function getEnglishJoke(recipient) {
  try {
    var seed = recipient;
    // Make an HTTP GET request to the API
    var apiUrl = "https://official-joke-api.appspot.com/random_joke?seed=" + seed;
    var response = UrlFetchApp.fetch(apiUrl);
    var jokeData = JSON.parse(response.getContentText());
    return jokeData.setup + ": " + jokeData.punchline;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error fetching a joke: " + error);
    return "what do you call a dog that can do magic tricks? - a labracadabrador";
  }
}

function getHindiJoke() {
  try {
    var apiUrl = "https://hindi-jokes-api.onrender.com/jokes/?api_key=e8500b9212bad378bd76bab62fac"; 
    // Make an HTTP GET request to the API
    var response = UrlFetchApp.fetch(apiUrl);
    var jokeData = JSON.parse(response.getContentText());
    return jokeData.jokeContent;
  } catch (error) {
    console.error("Error fetching a Hindi joke: " + error);
    return "अगर आप अपने घर में कचरा नहीं रख सकते; तो दिमाग में कचरा क्यों रखते हो ??";
  }
}

function getCustomJoke(apiUrl) {
  try {
    // Make an HTTP GET request to the custom JokeAPI endpoint - https://jokeapi.dev/#langcodes-endpoint
    var response = UrlFetchApp.fetch(apiUrl);
    var jokeText = response.getContentText();
    return jokeText;
  } catch (error) {
    console.error("Error fetching a custom joke: " + error);
    return "Algorithm: A word used by programmers when they don't want to explain how their code works.";
  }
}

function getFunFact() {
  try {
    var apiUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";
    var response = UrlFetchApp.fetch(apiUrl);
    var factData = JSON.parse(response.getContentText());
    return factData.text;
  } catch (error) {
    console.error("Error fetching a factData: " + error);
    return "Over 60% of all those who marry get divorced.";
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

function getName(email) {
  var name = email.split("@")[0]; // Get the part before the @ symbol
  name = name.replace(/[0-9]+/g, ''); // Remove any numbers
  name = name.replace(/[^a-zA-Z ]/g, ''); // Remove any special characters
  name = name.trim(); // Remove leading and trailing spaces
  name = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
  return name;
}

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
    return "Good Morning 🌞";
  } else if (hours >= 12 && hours < 17) {
    return "Good Afternoon 🌅";
  } else {
    return "Good Evening 🌙";
  }
}
// Get the remaining daily email quota
function getQuotaRemaining() {
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining email quota: " + emailQuotaRemaining);
  return emailQuotaRemaining;
}
