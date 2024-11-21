import { model } from "./firebase.js";

document.getElementById("analyze").addEventListener('click', async (e) => {
  e.preventDefault();
  const imageUpload = document.getElementById("imageUpload");
  const imageFile = imageUpload.files[0];
  if (!imageFile) {
    imageUpload.setAttribute('style', 'outline: 2px solid red');
    alert("Please select an image file before submitting.");
    return; // Stop form submission if no file is selected
  }
  else
  {
    imageUpload.setAttribute('style', 'outline: 2px solid green');
  }

  const responses = document.querySelectorAll('select');
  let allResponded = true;
  responses.forEach(response => {
    if(response.value == '')
    {
      allResponded = false;
      response.setAttribute('style', 'outline: 2px solid red');
    }
    else
    {
      response.setAttribute('style', 'outline: 2px solid green');
    }
  });
  if(!allResponded)
  {
    alert("Answer all questions before submitting.");
    return;
  }

  // start the loading animation
  const waitingBalls = document.querySelector('.waiting-balls');
  waitingBalls.classList.toggle('hidden');
  waitingBalls.style.maxHeight = `none`;
  window.scrollTo({top: document.body.scrollHeight});

  // save the responses to the questions
  const userInput = `1. Structure Type: ${responses[0].value}\n2. Issue: ${responses[1].value}\n3. Affected Area: ${responses[2].value}\n4. Noticed: ${responses[3].value}\n5. DIY or Professional: ${responses[4].value}`
  sessionStorage.setItem("user-input", userInput);

  const prompt = `You are a friendly ai assistant that helps users identify structural integrity issues within a picture that is being shown to you.
  Based on the picture being shown, you are going to give a recommendation for the user to approach their issue.
  The image being shown to you has a structure type of a(n) ${responses[0].value}. The user wants to identify any ${responses[1].value} issues in the image.
  The area affected in the picture is approximately ${responses[2].value}. The structural integrity issue in the image was first noticed ${responses[3].value}.
  The user was asked if they prefer DIY repair advice or professional advice from you and they chose ${responses[4].value}.
  If the image appears to be irrelevant, notify the user that they may have uploaded the incorrect image.
  Give a response based on these factors and be sure to add a note at the end that states your advice should always be cross-checked with a professional.`;

  await run(imageFile, prompt);

  window.location.href = "results.html";
});

const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  const base64EncodedData = await base64EncodedDataPromise;
  sessionStorage.setItem('imageBase64', base64EncodedData);
  return {
    inlineData: {data: base64EncodedData, mimeType: file.type}
  }
}

const run = async (imageUpload, prompt) => {
  const imagePart = await fileToGenerativePart(imageUpload);

  const { totalTokens, totalBillableCharacters } = await model.countTokens([imagePart, prompt]);
  sessionStorage.setItem('total-tokens', totalTokens);
  sessionStorage.setItem('total-billable-characters', totalBillableCharacters);

  const result = await model.generateContentStream([imagePart, prompt]);
  let textResponse = '';
  for await (const chunk of result.stream){
    textResponse += chunk.text();
  }
  sessionStorage.setItem("ai-response", textResponse.trim());
}

// Image Preview
document.getElementById('imageUpload').addEventListener('change', function (event) {
  const imagePreview = document.getElementById('imagePreview');
  const file = event.target.files[0];

  if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = 'block'; // Show the image
      };

      reader.readAsDataURL(file); // Convert the file to a data URL
  } else {
      imagePreview.style.display = 'none'; // Hide the image if no file is selected
      imagePreview.src = ''; // Clear the src attribute
  }
});