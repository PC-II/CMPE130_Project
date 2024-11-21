// On page load, populate the content from sessionStorage
window.onload = function () {
  const aiResponse = sessionStorage.getItem("ai-response");
  const userInput = sessionStorage.getItem("user-input");

  // Display the AI response
  const aiResponseElement = document.getElementById("aiResponse");
  if (aiResponse) {
    aiResponseElement.innerHTML = aiResponse;
  } else {
    aiResponseElement.innerHTML = "No AI response received. Please try again.";
  }

  

  // Display the user input
  const userInputElement = document.getElementById("userInputContent");
  if (userInput) {
    userInputElement.innerHTML = userInput;
  } else {
    userInputElement.innerHTML = "Here's the AI summary.";
  }

  // Add event listener to "Check Another Image" button
  const checkAnotherButton = document.getElementById("checkAnother");
  checkAnotherButton.addEventListener("click", function () {
    window.location.href = "questions.html";
  });
};