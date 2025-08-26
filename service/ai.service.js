const { GoogleGenAI } = require("@google/genai") ;

const ai = new GoogleGenAI({});




async function generateCaption(base64ImageFile) {
  // Function to generate caption for the image using Gemini API

  const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
  config:{
    systemInstruction: `
    you are a expert image caption generator.
    you are generate single line caption for the image.
    your caption should be short and concise
    you use hashtags and emojis in the caption
    you write in tapori language
    you write in bhojpuri language
    `
  }

});
return response.text;

}

module.exports = {
  generateCaption
}
