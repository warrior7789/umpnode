const fetch = require('node-fetch');

(async () => {
  try {

    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=8hvLemiYwosBFGdy2AucaJOV6ftgHmqrsQEzzbTD')
    const json = await response.json()

    console.log(json.url);
    console.log(json.explanation);
  } catch (error) {
    console.log(error.response.body);
  }
})();

console.log("complete");