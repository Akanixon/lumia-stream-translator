const options = {
        displayname: "{{displayname}}",
        username: "{{username}}",
        message: "{{rawMessage}}"
    }

const params = new URLSearchParams({
      "auth_key": "AUTH_KEY", //enter your auth key here
      "text": options.message.replace(/\"|\'|\/|\{|\(|\\|\]|\`/g,""),
      "target_lang": "EN"
    })
    let translated = await fetch(`https://api-free.deepl.com/v2/translate?${params.toString()}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    const json = await translated.json();
    var language = json.translations[0].detected_source_language;
    if(language != "EN" && options.message != json.translations[0].text){
    chatbot({
                    message: `[${language}]${json.translations[0].text}`,
                    site: "twitch"
                });
    }
