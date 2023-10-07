// Script executed available at https://script.google.com/

// function autoReply() {
//   var threads = GmailApp.getInboxThreads();
//   for (var i = 0; i < threads.length; i++) {
//     var message = "Thank you for your email. I will get back to you shortly.";
//     threads[i].reply(message);
//   }
// }  message.getFrom();
function autoReply() {
  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var senderEmail = message.getFrom();
      var getsenderName = senderEmail.substring(0, senderEmail.indexOf('<')).trim();
      var senderName = getsenderName || sender(senderEmail) ;
      // Customize your reply message here
      var replyMessage = "Hi " + senderName + ",\n\n";
      replyMessage += "Thank you for your email. I have received it and will respond shortly.\n\n";
      replyMessage += "In the meantime, you can reach out to me at +91 9776109078 if you have any urgent inquiries or questions.\n\n";
      replyMessage += "Sincerely,\nSafiquddin Khan";

      message.reply(replyMessage);
    }
  }
}
function sender(email) {
  var name = email.split("@")[0]; // Get the part before the @ symbol
  name = name.replace(/[0-9]+/g, ''); // Remove any numbers
  name = name.replace(/[^a-zA-Z ]/g, ''); // Remove any special characters
  name = name.trim(); // Remove leading and trailing spaces
  name = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
  return name;
}



