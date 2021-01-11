import jwt_decode from "jwt-decode";
export const checkAuthentication = () => {
  var token = localStorage.getItem("access_token");
  if (token) {
    var decoded_token = jwt_decode(token);
    console.log("decoded-token" + decoded_token.user_id);
    const userId = decoded_token.user_id;
    return userId;
  } else {
    return 0;
  }
};
