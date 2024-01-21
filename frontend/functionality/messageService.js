export const sendMessage = async (contact, message) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_GREEN_API_LINK_MESSAGE,
      {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify({
          chatId: `91${contact}@c.us`,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseText = await response.text();
    const responseJSON = JSON.parse(responseText.toString());
    console.log(responseJSON["status_code"]);
    if (responseJSON["status_code"] && +responseJSON["status_code"] > 400) {
      console.log("returning response");
      return res
        .status(responseJSON["status_code"])
        .json({ error: responseJSON.message });
    }
    console.log("sending message", responseText);
  } catch (e) {
    return res.status(220).json(e);
  }
};
export const sendFile = async (contact, caption, fileUrl) => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_GREEN_API_LINK_FILE, {
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify({
        chatId: `91${contact}@c.us`,
        caption: caption,
        urlFile: fileUrl,
        fileName: "result.jpeg",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseText = await response.text();
    const responseJSON = JSON.parse(responseText.toString());
    console.log(responseJSON["status_code"]);
    if (responseJSON["status_code"] && +responseJSON["status_code"] > 400) {
      console.log("returning response");
      return res
        .status(responseJSON["status_code"])
        .json({ error: responseJSON.message });
    }
    console.log("sending message", responseText);
  } catch (e) {
    return res.status(220).json(e);
  }
};
export const sendOTP = async (contact) => {
  try {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const response = await fetch(
      process.env.EXPO_PUBLIC_GREEN_API_LINK_MESSAGE,
      {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify({
          chatId: `91${contact}@c.us`,
          message: `Your One-Time Password (OTP) for logging in to *IntelliDent* is *${OTP}*.\nDo not share this code with anyone for security reasons.\nThank you for using IntelliDent!`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return OTP;
  } catch (e) {
    console.log(e);
    return 9999999999;
  }
};
