var request = require('request');

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // try checking the password
      if (req.query.password !== process.env.PASSWORD) {
        throw new Error('Wrong password')
      }
      else {
        var options = {
          'method': 'POST',
          'url': process.env.WEBHOOK_URL,
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          return res.status(200).json({ message: 'Success' })
        });

      }
    } catch (err) {
      return res.status(400).json({ message: 'Wrong password' })
    }
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}