import { Buffer } from "buffer";

var client_id;
var client_secret;

var authOptions = {
  method: "POST",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

// request.post(authOptions, function (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var token = body.access_token;
//   }
// });
export async function spotAuth() {
  const res = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );
  const data = await res.json();
  console.log(data);
}
