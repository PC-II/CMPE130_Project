// On page load, populate the content from sessionStorage
window.onload = function () {
  const aiResponse = sessionStorage.getItem("ai-response");
  const totalTokens = sessionStorage.getItem('total-tokens');
  const totalBillableCharacters = sessionStorage.getItem('total-billable-characters');
  const userInput = sessionStorage.getItem("user-input");

  const imageBase64 = sessionStorage.getItem("imageBase64");

  // // Display the Image
  const imageElem = document.querySelector('.image-upload');
  imageElem.src = `data:image/png;base64,${imageBase64}`;

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

  // cost information printed to the console
  const textInputCost = totalBillableCharacters * 0.0000003125;
  const textOutputCost = aiResponse.length * 0.00000125;
  console.log(`Total Tokens: ${totalTokens}`);
  console.log(`Total Billable Input Characters: ${totalBillableCharacters} x $0.0000003125 = $${textInputCost}`);
  console.log(`1 Image = $0.00032875`);
  console.log(`Total Billable Output Characters: ${aiResponse.length} x $0.00000125 = $${textOutputCost}`);
  console.log(`----------------------------------------------`);
  console.log(`Approx. Total Cost = $${textInputCost + textOutputCost + 0.00032875}`);
};