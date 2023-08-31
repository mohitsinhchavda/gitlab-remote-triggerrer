var request = require('request');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
        var options = {
          'method': 'GET',
          'url': process.env.LATEST_PIPELINE_API_URL,
          'headers': {
            'PRIVATE-TOKEN': process.env.PRIVATE_TOKEN,
          }
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          return res.status(200).json({ message: 'Success', response: JSON.parse(response.body) })
        });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong checking latest pipeline status' })
    }
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}