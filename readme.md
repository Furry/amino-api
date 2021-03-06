<div style="text-align: center">
    <h1>
        Amino API
    </h1>


<a href="https://discord.gg/tamVs2Ujrf">
    <img src="https://discordapp.com/api/guilds/769020183540400128/widget.png?style=banner2" alt="Discord Banner 2"/>
</a>

![Discord Shield](https://img.shields.io/github/commit-activity/m/furry/amino-api)
![Size](https://img.shields.io/bundlephobia/min/amino)
![Downloads](https://img.shields.io/npm/dw/amino)

</div>

<hr>

Amino API is a heavy wrapper around the reverse engineered Amino app.
If you're looking for a completed library, this is **NOT** it, but is probably the closest you'll find.

Additions to this api are added on a random basis, basically whichever I feel should be done first. However, if you're looking for a specific feature, by all means make an issue requesting it and I'll make sure to add it first!

There is **ZERO** Error catching & handling at the moment. If something breaks and you don't know why, please make an issue so I can look into it.

## What this library offers:
- A functioning chat-based api
- Dynamic user fetching
- Strong typings for all endpoints

Example Pong Bot;
```ts
import * as Amino from "amino-api";

const client = new Amino.Client();

// To target which community the bot will be operating under (Default 'g' for global)
client.target("x235196899"); // This is furry amino.

client.login("username@gmail.com", "Password1234")
.then(() => {
    client.listen()
})

client.on("message", (message) => {
    if (message.content == "ping") {
        message.thread.send("pong!")
    }
})
```

The app has one API for both the main app & each community, communities have one app

## To Implement
- Error Handling
- DM thread start capabilities
- Posting
- Commenting
- Self Profile Editing
- Generic API wrapping
- Image Messages
- Feature polling
- Chatroom polling
- Story polling
- And so much more.

## PR & Contribution Guidelines
- All pull requests must provide valid reason for the change / implementation
- All **CORE CHANGES** require an issue made before the PR will be looked at
- All PR's must follow the general structure of this code base.
- New structures must be defined similarely to how they are in the ./src/structs directory, with the typings below the class.
- If you have any questions, feel free to make an issue and i'll answer asap!

## PACKAGE NOTICE
This library name used to belong to https://github.com/amino/amino, a nodejs clustering manager, but ownership has been transfered and this module now represents https://github.com/furry/amino-api

<hr>
<div style="text-align: center">
<a href="https://www.buymeacoffee.com/ether" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</div>
