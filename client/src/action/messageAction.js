import axios from "axios";

export const handleSendMessage = async (msg) => {
  try {
    axios.post("http://localhost:8000/api/send", msg).then((result) => {
     
      if (result.data.success == true) {
        alert("Send message successful!");
        return true;
      } else {
        alert("Send message failed!");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
