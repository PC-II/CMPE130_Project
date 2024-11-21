import { model } from "./firebase.js";

document.getElementById("analyze").addEventListener('click', async (e) => {
  e.preventDefault();
  const imageUpload = document.getElementById("imageUpload").files[0];
  if (!imageUpload) {
    alert("Please select an image file before submitting.");
    return; // Stop form submission if no file is selected
  }

  // save the responses to the questions
  const responses = document.querySelectorAll('select');

  const prompt = `You are an ai assistant that helps users identify structural integrity issues within a picture that is being shown to you.
  Based on the picture being shown, you are going to give a recommendation for the user to approach their issue.
  The image being shown to you has a structure type of a(n) ${responses[0].value}. The user wants to identify any ${responses[1].value} in the image.
  The area affected in the picture is approximately ${responses[2].value}. The structural integrity issue in the image was first noticed ${responses[3].value}.
  The user was asked if they prefer DIY repair advice or professional advice from you and they chose ${responses[4].value}.
  Give a response based on these factors and be sure to add a note at the end that states your advice should always be cross-checked with a professional.`;

  await run(imageUpload, prompt);

  window.location.href = "results.html";
});

const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {data: await base64EncodedDataPromise, mimeType: file.type}
  }
}

const run = async (imageUpload, prompt) => {
  const imagePart = await fileToGenerativePart(imageUpload);
  const result = await model.generateContentStream([imagePart, prompt]);
  let textResponse = '';
  for await (const chunk of result.stream){
    textResponse += chunk.text();
  }
  sessionStorage.setItem("ai-response", textResponse.trim());
}
