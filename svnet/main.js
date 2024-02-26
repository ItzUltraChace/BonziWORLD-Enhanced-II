const log = require('./log.js').log;
const pData = require('./punish.js');
const Utils = require('./utils.js');
const io = require('../server.js').io;
const settings = require('../json/settings.json');
const sanitize = require("sanitize-html");
const fs = require('fs');


// Variable for toggling Replit mode
const isReplit = settings.sv.info.isReplit;

if (isReplit === true) {
	var port = 80;
} else {
	var port = process.env.port || settings.sv.express.port;
}


// Catch those errors!
process.on("uncaughtException", (err) => {
	console.log(err.stack);
	throw err;
});


// fuck off bozoworlders!
function sanitizeHTML(string){
return string
    //.replaceAll("&",  "&amp;")
    .replaceAll("#",  "&num;")
    .replaceAll("'",  "&apos;")
    .replaceAll("\"", "&quot;");
}
function sanitizeHTML2(string){
return string
    .replaceAll("&",  "&amp;")
    .replaceAll("#",  "&num;")
    .replaceAll("'",  "&apos;")
    .replaceAll("\"", "&quot;");
}

function getBonziHEXColor(color) {
  const colorMap = {
    purple: 0xAB47BC,
    magenta: 0xFF00FF,
    pink: 0xF43475,
    blue: 0x3865FF,
    cyan: 0x00ffff,
    red: 0xf44336,
    orange: 0xFF7A05,
    green: 0x4CAF50,
    lime: 0x55FF11,
    yellow: 0xE6CB24,
    brown: 0xCD853F,
    black: 0x424242,
    grey: 0x828282,
    white: 0xEAEAEA,
    ghost: 0xD77BE7
  };

  return colorMap[color] || 0xAB47BC;
}

let roomsPublic = [];
let rooms = {};
var noflood = [];

var connCount = {};


exports.exec = () => {
    io.on("connection", (socket) => {
        if (socket.handshake.auth.channel == settings.sv.socketio.client.channel && socket.handshake.auth.ver == settings.sv.socketio.client.info.ver && socket.handshake.auth.build_date == settings.sv.socketio.client.info.date) {
			new User(socket);
        } else {
            io.use((socket, next) => {
                next(new Error('[BONZI-Err]: Handshake Authorization Failed!	(handshake-auth_fail)'));
                setTimeout(() => { socket.disconnect(true) }, 3000);
				return;
            });
        }
    });
};

var settingsSantize = {
    allowedTags: ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "p", "a", "ul", "ol", "nl", "li", "b", "i", "strong", "em", "strike", "code", "hr", "br", "div", "table", "thead", "caption", "tbody", "tr", "th", "td", "pre", "iframe", "marquee", "button", "input", "details", "summary", "progress", "meter", "font", "span", "select", "option", "abbr", "acronym", "adress", "article", "aside", "bdi", "bdo", "big", "center", "site", "data", "datalist", "dl", "del", "dfn", "dialog", "dir", "dl", "dt", "fieldset", "figure", "figcaption", "header", "ins", "kbd", "legend", "mark", "nav", "optgroup", "form", "q", "rp", "rt", "ruby", "s", "sample", "section", "small", "sub", "sup", "template", "textarea", "tt", "u"],
    allowedAttributes: {
        a: ["href", "name", "target"],
        p: ["align"],
        table: ["align", "border", "bgcolor", "cellpadding", "cellspadding", "frame", "rules", "width"],
        tbody: ["align", "valign"],
        tfoot: ["align", "valign"],
        td: ["align", "colspan", "headers", "nowrap"],
        th: ["align", "colspan", "headers", "nowrap"],
        textarea: ["cols", "dirname", "disabled", "placeholder", "maxlength", "readonly", "required", "rows", "wrap"],
        pre: ["width"],
        ol: ["compact", "reversed", "start", "type"],
        option: ["disabled"],
        optgroup: ["disabled", "label", "selected"],
        legend: ["align"],
        li: ["type", "value"],
        hr: ["align", "noshade", "size", "width"],
        fieldset: ["disabled"],
        dialog: ["open"],
        dir: ["compact"],
        bdo: ["dir"],
        marquee: ["behavior", "bgcolor", "direction", "width", "height", "loop", "scrollamount", "scrolldelay"],
        button: ["disabled"],
        input: ["value", "type", "disabled", "maxlength", "max", "min", "placeholder", "readonly", "required", "checked"],
        details: ["open"],
        div: ["align"],
        progress: ["value", "max"],
        meter: ["value", "max", "min", "optimum", "low", "high"],
        font: ["size", "family", "color"],
        select: ["disabled", "multiple", "require"],
        ul: ["type", "compact"],
        "*": ["hidden", "spellcheck", "title", "contenteditable", "data-style"],
    },
    selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta", "wbr"],
    allowedSchemes: ["http", "https", "ftp", "mailto", "data"],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
    allowProtocolRelative: false,
};

const { join } = require("path");
const { EmbedBuilder, WebhookClient } = require('discord.js');

try {
	const chat_hook = new WebhookClient({url: settings.sv.discord.urls.chat});
} catch (e) {};

function getTimeLeft(timeout) {
    return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000);
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function formatAMPM(date) { // Taken from: https://stackoverflow.com/a/8888498
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  var strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

var stickers = {
    sex: "the sex sticker has been removed",
    sad: "so sad",
    bonzi: "BonziBUDDY",
    host: "host is a bathbomb",
    spook: "ew im spooky",
    forehead: "you have a big forehead",
    ban: "i will ban you so hard right now",
    flatearth: "this is true, and you cant change my opinion loser",
    swag: "look at my swag",
    topjej: "toppest jej",
    cyan: "cyan is yellow",
    no: "fuck no",
    bye: "bye i'm fucking leaving",
    kiddie: "kiddie",
    big_bonzi: "you picked the wrong room id fool!",
    lol: "lol",
    sans: "fuck you",
    crybaby: "crybaby",
};


var noflood = [];
const activeUsers = {};


function checkRoomEmpty(room) {
    if (room.users.length != 0) return;

    log.info.log('debug', 'removeRoom', {
        room: room
    });

    let publicIndex = roomsPublic.indexOf(room.rid);
    if (publicIndex != -1)
        roomsPublic.splice(publicIndex, 1);
    
    room.deconstruct();
    delete rooms[room.rid];
    delete room;
}

class Room {
    constructor(rid, prefs) {
        this.rid = rid;
        this.users = [];
        this.prefs = prefs;
        this.background = "#6d33a0";
        this.icon = "fas fa-door-open";
        this.flags = {
            admin: false
        };
    }


    deconstruct() {
        try {
            this.users.forEach((user) => {
                user.disconnect();
            });
        } catch (e) {
            log.info.log('warn', 'roomDeconstruct', {
                e: e,
                thisCtx: this
            });
        }
        //delete this.rid;
        //delete this.prefs;
        //delete this.users;
    }

    isFull() {
        return this.users.length >= this.prefs.room_max;
    }

    join(user) {
        noflood.push(user.socket);
        user.socket.join(this.rid);
        this.users.push(user);
        this.updateUser(user);
    }

    leave(user) {
        // HACK
        try {
            this.emit('leave', {
                guid: user.guid
            });

            let userIndex = this.users.indexOf(user);

            if (userIndex == -1) return;
            this.users.splice(userIndex, 1);

            checkRoomEmpty(this);
        } catch (e) {
            log.info.log('warn', 'roomLeave', {
                e: e,
                thisCtx: this
            });
        }
    }

    updateUser(user) {
        this.emit('update', {
            guid: user.guid,
            userPublic: user.public
        });
    }

    getUsersPublic() {
        let usersPublic = {};
        this.users.forEach((user) => {
            usersPublic[user.guid] = user.public;
        });
        return usersPublic;
    }

    emit(cmd, data) {
        io.in(this.rid).emit(cmd, data);
    }
}

function newRoom(rid, prefs) {
    rooms[rid] = new Room(rid, prefs);
    log.info.log('debug', 'newRoom', {
        rid: rid
    });
}


let godword_random = Math.floor((Math.random() * 1000000000000000) + 10);
if (isReplit === true) {
	console.log('Godword:', godword_random)

	setInterval(() => {
        console.log('Godword:', godword_random);
    }, 60 * 1000); 
}


let userCommands = {
    godmode: function (word) {
		if (isReplit === true) {
			var bonzi_godword = godword_random;
		} else {
			var bonzi_godword = this.room.prefs.godword;
		}
		let success = word == bonzi_godword;
			if (success) {
				this.private.runlevel = 3;
				this.public.flags = {
					admin: true
				};
				this.socket.emit("admin");
			} else {
				this.socket.emit("alert", 'Wrong password. Did you try "Password"?');
			}
			log.info.log("info", "godmode", {
				guid: this.guid,
				success: success,
			});
	},
    "sanitize": function() {
        let sanitizeTerms = ["false", "off", "disable", "disabled", "f", "no", "n"];
        let argsString = Utils.argsString(arguments);
        this.private.sanitize = !sanitizeTerms.includes(argsString.toLowerCase());
    },
    kick: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
        
        let pu = this.room.getUsersPublic()[data];
        if (pu && pu.color) {
            let target;
            this.room.users.map((n) => {
                if (n.guid == data) {
                    target = n;
                }
            });
            target.socket.emit("kick", {
                reason: "You got kicked.",
            });
            target.disconnect();
        } else {
            this.socket.emit("alert", "The user you are trying to kick left. Get dunked on nerd");
        }
    },
    ban: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
        
        let pu = this.room.getUsersPublic()[data];
        if (pu && pu.color) {
            let target;
            this.room.users.map((n) => {
                if (n.guid == data) {
                    target = n;
                }
            });
            if (target.getIp() == "::1") {
                pData.removeBan(target.getIp());
            } else if (target.getIp() == "::ffff:127.0.0.1") {
                pData.removeBan(target.getIp());
            } else {
                if (target.private.runlevel > 2 && this.getIp() != "::1" && this.getIp() != "::ffff:127.0.0.1") {
                    return;
                }
                pData.addBan(target.getIp(), 24 * 3600, "Being retarded? IDK. The fucker that banned you didn't specify.");
                target.socket.emit("ban", {
                    reason: data.reason,
                });
                target.disconnect();
            }
        } else {
            this.socket.emit("alert", "The user you are trying to ban left. Get dunked on nerd");
        }
    },
    "unban": function(ip) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
        pData.removeBan(ip)
        console.log(`unbanned ${ip}`);
    },
    nofuckoff: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
		
        this.room.emit("nofuckoff", {
            guid: data,
        });
        var user = this;
        setTimeout(() => {
            let pu = user.room.getUsersPublic()[data];
            if (pu && pu.color) {
                let target;
                user.room.users.map((n) => {
                    if (n.guid == data) {
                        target = n;
                    }
                });
                setTimeout(function () {
                    target.disconnect();
                    target.socket.emit("kick", {
                        reason: "No fuck off<br><br><video style='border-radius: 3px;' src=\"https://cdn.discordapp.com/attachments/954050025170825237/1025126830845472798/DankVideo15.mp4\" autoplay loop width=380>",
                        //reason: "No fuck off<br><audio style='display: none;' src=\"/sfx/no_fuck_off.mp3\" autoplay loop width=380>",
                    });
                }, 380);
            } else {
                user.socket.emit("alert", "The user you are trying to dissolve left. Get dunked on nerd");
            }
        }, 1084);
    },
	"warn": function(ip, reason) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
		pData.warn(ip, reason)
		console.log(`Sending warning to ${ip} ${reason}.`);
    },
    "report": function (ip, name, reason) {
		pData.addReport(ip, name, reason, this.public.name, this.room.rid);
    },
    "joke": function() {
        this.room.emit("joke", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    "fact": function() {
        this.room.emit("fact", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    changelog: function () {
            this.socket.emit('alert', {
				title: "Changelog",
				msg: '<ul><li>Initial Release.</li></ul>\n',
				button:"Ok",
				sanitize: true
			});
    },
    effect: function (...txt) {
            if (txt[0] == "remove") txt = [""]
            this.public.effect = txt.join(" ")
    },
    sticker: function (sticker) {
        if (Object.keys(stickers).includes(sticker)) {
            this.room.emit("talk", {
                text: sanitizeHTML(`<img class=no_selection src=img/icons/stickers/${sticker}.png draggable=false width=170>`),
                say: stickers[sticker],
                guid: this.guid,
            });
        } else {
            this.socket.emit('alert',{title:'Error 404',msg:'The requested sticker doesn\'t exist.',button:"Ok"});
        }
    },
    wtf: function (text) {
        var wtf = [
            "i cut a hole in my computer so i can fuck it",
            "i hate minorities",
            "i said /godmode password and it didnt work",
            "i like to imagine i have sex with my little pony characters",
            "ok yall are grounded grounded grounded grounded grounded grounded grounded grounded grounded for 64390863098630985 years go to ur room",
            "i like to eat dog crap off the ground",
            "i can use inspect element to change your name so i can bully you",
            "i can ban you, my dad is seamus", //past name detected. change name later??? ;(
            "why do woman reject me, i know i masturbate in public and dont shower but still",
            "put your dick in my nose and lets have nasal sex",
            "my cock is 6 ft so ladies please suck it",
            "please make pope free",
            "whats that color",
            "This PC cannot run Windows 11. The processor isn't supported for Windows 11. While this PC doesn't meet the system requirements, you'll keep getting Windows 10 Updates.",
            "100. Continue.",
            "418. I'm a teapot.",
            "I am SonicFan08 and i like Norbika9Entertainment and grounded videos! Wow! I also block people who call me a gotard!",
            "Bonkey sugar. Anything that makes one physically satisfied. By extension, anything good or desirable. The following are examples of things which are most certainly bonkey sugar...",
            "i like to harass bonziworld fans on bonziworld",
            "there is a fucking white bird in my chest please get him out",
            "i am that frog that is speaking chinese",
            "i don't let anyone have any fun like holy shit i hate bonziworld soooooooooo much!",
            "i make gore art out of dream as fucking usual",
            "yummy yummy two letter object in my tummy! yummy in my tummy! i pretend to be david and terrorize the fuck out of my friends!",
            "why the fuck are you hating Twitter?! what did they do to you?!",
            "This is not a test. You have been caught as a 'funny child harassment' moment. you will be banned. You got banned! Why? Being retarded? IDK. You literally harass BonziWORLD Fans. How dare you!",
            "fingerprinting on bonzi.world is giving out your location! real! not fake!",
            "how many fucking times have i told you? GIVE ME THE MARIO 64 BETA ROM NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW!",
            "no comment",
            `Yeah, of course ${this.public.name} wants me to use /wtf. [[???????????]] Hah hah! Look at the stupid ${this.public.color} Microsoft Agent character embarassing himself! Fuck you. It isn't funny.`,
            "I am getting fucking tired of you using this command. Fucking take a break already!",
            "DeviantArt",
            "You're a [['fVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVkjng]] asshole!",
            "javascript",
            "BonziWORLD.exe has encountered and error and needs to close. Nah, seriously, you caused this error to happen because you used /wtf.",
            "moo!",
            "host bathbomb",
            "Hi.",
            "hiii i'm soundcard from mapper league",
            "I injected some soundcard syringes into your browser. <small>this is obviously fake</small>",
            "--image <img class=no_selection src=//cdn.discordapp.com/emojis/854164241527209995.gif?v=1 draggable=false></img>",
            "i listen to baby from justin bieber",
            "i watch numberblocks",
            "i watch doodland and now people are calling me a doodtard",
            "i watch bfdi and now people are calling me a objecttard",
            "i post klasky csupo effects and now people are calling me a logotard",
            "i installed BonziBUDDY on my pc and now i have a virus",
            "i deleted system32",
            "i flood servers, and that makes me cool.",
            "Hi. My name is DanielTR52 and i change my fucking mind every 1 picosecond. Also, ICS fucking sucks. Nope, now he doesnt. Now he does. Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.",
            "i still use the wii u&trade;",
            "i used homebrew on my nintendo switch and i got banned",
            "i bricked my wii",
            "muda muda muda muda!",
            "i copy other people's usernames",
            "i use microsoft agent scripting helper for fighting videos against innocent people that did nothing wrong by just friendly commenting",
            "i use microsoft agent scripting helper for gotard videos",
            "i use hotswap for my xbox 360",
            "i boycotted left 4 dead 2",
            "CAN U PLZ UNBAN ME PLZ PLZ PLZ PLZ PLZ PLZ PLZ PLZ",
            `Hey, ${this.public.name} You're a fucking asshole!`,
            `Damn, ${this.public.name} really likes /wtf`,
            "I use an leaked build of Windows 11 on my computer.",
            "Do you know how much /wtf quotes are there?",
            "Fun Fact: You're a fucking asshole",
            "i play left 4 dead games 24/7",
            "i am so cool. i shit on people, add reactions  that make fun of users on discord, and abuse my admin powers. i am really so cool.",
            "This product will not operate when connected to a device which makes unauthorized copies. Please refer to your instruction booklet for more information.",
            "hey medic i like doodland",
            "i installed windows xp on my real computer",
            "i am whistler and i like to say no u all the time",
            "HEY EVERYONE LOOK AT ME I USE NO U ALL THE TIME LMAO",
            "i like to give my viewers anxiety",
            "how to make a bonziworld server?",
            "shock, blood loss, infection; [['oU: hoUhoUhoUhoU]]! i love stabbing!",
            "I AM ANGRY BECAUSE I GOT BANNED! I WILL MAKE A MASH VIDEO OUT OF ME GETTING BANNED!",
            "oh you're approaching me!",
            "MUTED! HEY EVERYONE LOOK AT ME I SAY MUTED IN ALL CAPS WHEN I MUTE SOMEONE LMAO",
            "can you boost my server? no? you're mean!>:(",
            "no u",
            "numberblocks is my fetish",
            "Sorry, i don't want you anymore.",
            "Twitter Cancel Culture! Twitter Cancel Culture! Twitter Cancel Culture! Twitter Cancel Culture! Twitter Cancel Culture!",
            "cry about it",
            "SyntaxError: Unexpected string",
            "i post random gummibar videos on bonziworld",
            "i support meatballmars",
            "PLEASE GIVE THIS VIDEO LIKES!!!!! I CANNOT TAKE IT ANYMORE!",
            "I WILL MAKE A BAD VIDEO OUT OF YOU! GRRRRRRRRRRRR!",
            "Muted!",
            "i keep watching doodland like forever now",
            "i mined diamonds with a wooden pickaxe",
            "i kept asking for admin and now i got muted",
            "I FAP TO FEMMEPYRO NO JOKE",
            "i like to imagine that i am getting so fat for no reason at all",
            "i am not kid",
            "i want mario beta rom hack now!",
            "i am a gamer girl yes not man no im not man i am gamer girl so give me money and ill giv you my adress ♥♥",
            "i used grounded threats and now i got hate",
            "i post pbs kids and now people are calling me a pbskidstard",
            "Oh my gosh! PBS Kids new logo came on July 19th!",
            "i will flood the server but people still thinked that i will not flood, the flooder hates are psychopaths, a skiddie, psychology and mentallity",
            "i used inspect element and now i got hate",
            "hi i am vacbedlover want to show my sexual fetish. I just kept evading my ban on collabvm to act like a forkie.",
            "i watch the potty song and now people are calling me a pottytard",
            "bonziworld reacts to... zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
            "i watch nature on pbs",
            "i post thomas theme song and now people are calling me a thomastard",
            "i pee my pants",
            "Wow! TVOKids is awesome- No! Its not awesome, you idiotic TVOKids fan!",
            "i watch grounded videos and now people are calling me a gotard",
            "Excuse me, CUT! We made another color blooper! glass breaking sound effect WAAAAAAAAAAAA! inhale WAAAAAAAAAAAA! Well that was uncalled for. It was! Anyways, you guys are in the colors of the AidenTV logo. Looks down BOING! Oh, oops. It's okay, swap the colors back to normal and then we'll do Take 48! Snap",
            "DOGGIS!",
            "i watch bfb and now people are calling me a objecttard",
            "This is not a test. You have been caught as a 'funny child harassment' moment. you will be banned. You got banned! Why? Being retarded? IDK. You literally harass BonziWORLD Fans. How dare you!",
            "fingerprinting on bonzi.world is giving out your location! real! not fake!",
            "i post pinkfong and now people are calling me a pinkfongtard",
            "i post baby shark and now people are calling me a babysharktard",
            "my favorite flash nickelodeon clickamajig is Dress Up Sunny Funny",
            "i snort dill pickle popcorn seasoning",
            "i listen to planet custard's greated song, the potty song and now i got hate",
            "I got a question. but it's a serious, yes, serious thing that I have to say! AAAAAAAAAAA! I! am! not! made! by! Pixel works! Pixel works doesn't make microsoft agent videos! Kieran G&A Doesn't exist! Anymore! So, if you guys keep mocking me that i am made by Pixel works (Originally Aqua) or Kieran G&A, then i am gonna commit kill you! huff, puff, that is all.",
            "This PC cannot run Windows 11. The processor isn't supported for Windows 11. While this PC doesn't meet the system requirements, you'll keep getting Windows 10 Updates.",
            "I made Red Brain Productions, and i deny that i am made by Pixelworks",
            "I am SonicFan08 and i like Norbika9Entertainment and grounded videos! Wow! I also block people who call me a gotard!",
            "When BonziWORLD leaks your memory, your system will go AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "i post i got banned on bonziworld and now i got hate",
            "i post babytv and now people are calling me a babytvtard",
            "i post sf08 news and now i got hate",
            "i listen to spongebob theme song and now i got hate",
            "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little 'clever' comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, skiddo."
        ];
        var num = Math.floor(Math.random() * wtf.length);
        this.room.emit("talk", {
            text: wtf[num],
            guid: this.guid,
        });
        this.room.emit("wtf", {
            text: wtf[num],
            guid: this.guid,
        });
    },
    "youtube": function(vidRaw) {
        if (vidRaw.includes("\"")) return;
        if (vidRaw.includes("'")) return;
        var vid = this.private.sanitize ? sanitize(sanitizeHTML(vidRaw)) : sanitizeHTML(vidRaw);
        this.room.emit("youtube", {
            guid: this.guid,
            vid: vid,
        });
    },
    "soundcloud": function(audRaw) {
        if (vidRaw.includes("\"")) return;
        if (vidRaw.includes("'")) return;
        var aud = this.private.sanitize ? sanitize(sanitizeHTML(audRaw)) : sanitizeHTML(audRaw);
        this.room.emit("soundcloud", {
            guid: this.guid,
            aud: aud,
        });
    },
    "spotify": function(audRaw) {
        if (vidRaw.includes("\"")) return;
        if (vidRaw.includes("'")) return;
        var aud = this.private.sanitize ? sanitize(sanitizeHTML(audRaw)) : sanitizeHTML(audRaw);
        this.room.emit("spotify", {
            guid: this.guid,
            aud: aud,
        });
    },
    "image": function (imgRaw) {
        if (vidRaw.includes("\"")) return;
        if (vidRaw.includes("'")) return;
        var img = this.private.sanitize ? sanitize(sanitizeHTML(imgRaw)) : sanitizeHTML(imgRaw);
        this.room.emit("image", {
            guid: this.guid,
            img: img,
        });
    },
    "video": function (vidRaw) {
        if (vidRaw.includes("\"")) return;
        if (vidRaw.includes("'")) return;
        var vid = this.private.sanitize ? sanitize(sanitizeHTML(vidRaw)) : sanitizeHTML(vidRaw);
        this.room.emit("video", {
            guid: this.guid,
            vid: vid,
        });
    },
    "audio": function (audRaw) {
        if (vidRaw.includes("\"")) return;
        if (vidRaw.includes("'")) return;
        var aud = this.private.sanitize ? sanitize(sanitizeHTML(audRaw)) : sanitizeHTML(audRaw);
        this.room.emit("audio", {
            guid: this.guid,
            aud: aud,
        });
    },
    "swag": function () {
        this.room.emit("swag", {
            guid: this.guid,
        });
    },
    "earth": function () {
        this.room.emit("earth", {
            guid: this.guid,
        });
    },  
    "grin": function () {
        this.room.emit("grin", {
            guid: this.guid,
        });
    },
    "clap": function () {
            this.room.emit("clap", {
                guid: this.guid,
       });
    },
    "shrug": function () {
        this.room.emit("shrug", {
            guid: this.guid,
        });
    },
    "praise": function () {
        this.room.emit("praise", {
            guid: this.guid,
        });
    },
    "sad": function() {
        this.room.emit("sad", {
            guid: this.guid,
        });
    },
    "think": function() {
        this.room.emit("think", {
            guid: this.guid,
        });
    },
    "backflip": function(swag) {
        this.room.emit("backflip", {
            guid: this.guid,
            swag: swag == "swag",
        });
    },
    toppestjej: function () {
        this.room.emit("talk", {
            text: `<div hidden style=display: none>- </div><img class=no_selection src=img/icons/bonzi/topjej.png draggable=false>`,
            say: "toppest jej",
            guid: this.guid,
        });
    },
    arcade: function () {
        this.socket.emit("arcade");
    },
    acid: function () {
        this.socket.emit("acid");
    },
    godlevel: function () {
        this.socket.emit("alert", `Your godlevel is: ${this.private.runlevel}.`);
    },
    "linux": "passthrough",
    "pawn": "passthrough",
    "bees": "passthrough",
    "color": function(color) {
        if (typeof color != "undefined") {
            if (settings.bonziColors.indexOf(color) == -1) return;
            
            this.public.color = color;
        } else {
            this.public.color = settings.bonziColors[
                Math.floor(Math.random() * settings.bonziColors.length)
            ];
        }
		this.public.color_cross = "none";
        this.room.updateUser(this);
    },
	crosscolor: function(color) {
		var clrurl = this.private.sanitize ? sanitize(color) : color;
		if (clrurl.match(/105197343/gi) || clrurl.match(/1038507/gi) || clrurl.match(/pope/gi) || clrurl.match(/plop/gi) || clrurl.match(/780654/gi) || clrurl.match(/f\s+u\s+n\s+e/gi) || clrurl.match(/p\s+i\s+n\s+k\s+f\s+o\s+n\s+g/gi) || clrurl.match(/fune/gi) || clrurl.match(/pinkfong/gi) || clrurl.match(/hogi/gi) || clrurl.match(/(\S*)(bonzi|bonziworld|uranohoshi).(lol|ga|tk|cf|net|org|in)/gi) || clrurl.match(/(\S*)(bonzi).(com)/gi) || clrurl.match(/(\S*)(encyclopediadramatica.online\/BonziWORLD)/gi) || clrurl.match(/(\S*)(inflation)/gi) || clrurl.includes("'") || clrurl.includes("\"")) {
			this.disconnect();
			return;
		}
		if (clrurl.match(/fjnviwjnf/gi)) {return}

		var fileMatch = clrurl.match(/(.*\/)(.*\.(jpeg|jpg|gif|png|webp))/i);
		var fileURL = fileMatch[1];
		var fileName = fileMatch[2].split('.')[0];
		var fileExtension = fileMatch[2].split('.')[1];
		if ((clrurl.match(/cdn.discordapp.com/gi) || clrurl.match(/media.discordapp.net/gi) || clrurl.match(/raw.githubusercontent.com/gi) || clrurl.match(/raw.githubusercontent.com/gi) || clrurl.match(/tenor.com\/view\//gi)) && (clrurl.match(/^.*\.(jpeg|jpg|gif|png|webp)/gi))) {
			this.public.color = "empty";
			this.public.color_cross = clrurl;
			this.room.updateUser(this);
		} else {
			this.socket.emit("alert", "The crosscolor must be a valid image URL from Discord or raw.githubusercontent.com.\nValid file image types are: .png, .jpg, .jpeg, .gif, .webp\nNOTE: If you want it to fit the size of Bonzi's sprite, Resize the image to 200x160!\nWARNING: Using Bonziworld.org (or sites related to bonziworld.org of course) colors will result in a ban!");
		}
	},
    pope: function() {
        if (this.private.runlevel === 3) { // removing this will cause chaos
            this.public.color = "pope";
			this.public.color_cross = "none";
            this.room.updateUser(this);
        } else {
            this.socket.emit("alert", "Ah ah ah! You didn't say the magic word!")
        }
    },
    god: function() {
        if (this.private.runlevel === 3) { // removing this will cause chaos
            this.public.color = "god";
			this.public.color_cross = "none";
            this.room.updateUser(this);
        } else {
            this.socket.emit("alert", "Ah ah ah! You didn't say the magic word!")
        }
    },
    "asshole": function() {
        this.room.emit("asshole", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments)),
        });
    },
    "owo": function() {
        this.room.emit("owo", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments)),
        });
    },
    "uwu": function () {
        this.room.emit("uwu", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments)),
        });
    },
    "welcome": function () {
        this.room.emit("welcome", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments)),
        });
    },
    "triggered": "passthrough",
    "twiggered": "passthrough",
    "vaporwave": function() {
        this.socket.emit("vaporwave");
        this.room.emit("youtube", {
            guid: this.guid,
            vid: "_HJ9LdmppYU"
        });
    },
    "unvaporwave": function() {
        this.socket.emit("unvaporwave");
    },
    "name": function() {
        let argsString = Utils.argsString(arguments);
        if (argsString.length > this.room.prefs.name_limit)
            return;
        if (argsString.includes("{COLOR}")) {argsString = this.public.color}
        if (argsString.includes("{NAME}")) {return}
        if (argsString.includes("{ROOM}")) {argsString = sanitizeHTML2(this.room.rid.slice(0,16))}
        if (argsString.includes("'")) {return}
        if (argsString.includes("\"")) {return}
        if(argsString.includes('fa-gavel')){return}
        if(argsString.includes('fa-check-circle')){return}
        if(argsString.includes('bzw-admin-icon')){return}
        if(argsString.includes('🔨')){return}


        if (argsString.trim().match(/f\s+u\s+n\s+e/gi)) {return}
        if (argsString.trim().match(/p\s+i\s+n\s+k\s+f\s+o\s+n\s+g/gi)) {return}
        if (argsString.trim().match(/fune/gi)) {return}
		if (argsString.trim().match(/pinkfon\s+g/gi)) {return}
		if (argsString.trim().match(/pinkfo\s+ng/gi)) {return}
		if (argsString.trim().match(/pinkf\s+ong/gi)) {return}
		if (argsString.trim().match(/p\s+i\s+n\s+kfong/gi)) {return}
		if (argsString.trim().match(/pi\s+nk\s+f\s+ong/gi)) {return}
		if (argsString.trim().match(/p1nkf0ng/gi)) {return}
		if (argsString.trim().match(/p\s+1\s+n\s+k\s+f\s+0ng/gi)) {return}
		if (argsString.trim().match(/hogi/gi)) {return}
		if (argsString.trim().match(/h\s+o\s+g\s+i/gi)) {return}
		if (argsString.trim().match(/pinkfong/gi)) {return}
        if (argsString.trim().match(/(\S*)(bonzi|bonziworld|uranohoshi).(lol|ga|tk|cf|net|org|in)/gi)) {return}
        if (argsString.trim().match(/(\S*)(bonzi).(com)/gi)) {return}
        if (argsString.trim().match(/(\S*)(encyclopediadramatica.online\/BonziWORLD)/gi)) {return}
        if (argsString.trim().match(/(\S*)(inflation)/gi)) {return}
        if (argsString.trim().match(/http:\/\//gi)) {return}
        if (argsString.trim().match(/https:\/\//gi)) {return}
        if (argsString.trim().match(/(discord.gg\/|discord.gg)/gi)) {return}
        if (argsString.trim().match(/(discord.com\/|discord.com)/gi)) {return}
        if (argsString.includes("@")) {return}

        let name = argsString || this.room.prefs.defaultName;

		this.public.name = this.private.sanitize ? sanitize(sanitizeHTML(name)) : name;
        this.room.updateUser(this);
    },
    broadcast: function (...text) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
        if(text.join(' ') == "" || text.join(' ') == "undefined" || text.join(' ') == "null" || text.join(' ') == null) {
            return;
        } else {
			text = text.join(" ")
			text = this.private.sanitize ? sanitize(text, settingsSantize) : text;
			var txt = text;

            this.room.emit("broadcast", { msg: txt, sanitize: false, title: `Broadcast from ${this.public.name}` });
        }
    },
    limit: function (room_num) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
        room_num = parseInt(room_num);

        if (isNaN(room_num)) {
            this.socket.emit("alert", "Ur drunk lel");
            return;
        }

        this.prefs.room_max = room_num;

        this.room.emit("alert", `The max limit of this room is now ${this.prefs.room_max}`);
    },
    "pitch": function(pitch) {
        pitch = parseInt(pitch);

        if (isNaN(pitch)) return;

        this.public.pitch = Math.max(
            Math.min(
                parseInt(pitch),
                this.room.prefs.pitch.max
            ),
            this.room.prefs.pitch.min
        );

        this.room.updateUser(this);
    },
    "speed": function(speed) {
        speed = parseInt(speed);

        if (isNaN(speed)) return;

        this.public.speed = Math.max(
            Math.min(
                parseInt(speed),
                this.room.prefs.speed.max
            ),
            this.room.prefs.speed.min
        );
        
        this.room.updateUser(this);
    },
    "group": function (...text) {
        text = text.join(" ")
		text = this.private.sanitize ? sanitize(text, settingsSantize) : text;
        if (text) {
            this.private.group = `${text}`
            this.socket.emit("alert", "joined the group")
            return
        }
        this.socket.emit("alert", "enter a group id")
    },
    "dm":function(...text){
        text = text.join(" ")
		text = this.private.sanitize ? sanitize(text, settingsSantize) : text;
        if(!this.private.group){
            this.socket.emit("alert","join a group first")
            return
        }
        this.room.users.map(n=>{
            if(this.private.group === n.private.group){
                n.socket.emit("talk",{
                    guid:this.guid,
                    text:`<small><i>Only your group can see this.</i></small><br>${text}`,
                    say:text
                })
            }
        })
    },
	"dm2": function (data) {
		if (typeof data != "object") return
		let pu = this.room.getUsersPublic()[data.target]
		if (pu && pu.color) {
			let target;
			this.room.users.map(n => {
				if (n.guid == data.target) {
					target = n;
				}
			})

			data.text = this.private.sanitize ? sanitize(data.text, settingsSantize) : data.text;
			target.socket.emit("talk", {
				guid: this.guid,
				text: `<small>Only you can see this.</small><br>${data.text}`,
				say: data.text
			})
			this.socket.emit("talk", {
				guid: this.guid,
				text: `<small>Only ${pu.name} can see this.</small><br>${data.text}`,
				say: data.text
			})
		} else {
			this.socket.emit('alert', { msg: 'The user you are trying to dm left. Get dunked on nerd', button: "Ok" })
		}
	},
    startyping: function () {
        this.room.emit("typing", { guid: this.guid })
    },
    stoptyping: function () {
        this.room.emit("stoptyping", { guid: this.guid })
    }
};

class User {
    constructor(socket) {
        this.guid = Utils.guidGen();
        this.socket = socket;

        // Handle ban
        if (pData.isBanned(this.getIp())) {
            pData.handleBan(this.socket);
        }

        this.private = {
            login: false,
            sanitize: true,
            runlevel: 0
        };

        this.public = {
            color: settings.bonziColors[Math.floor(
                Math.random() * settings.bonziColors.length
            )],
            color_cross: 'none'
        };

        log.access.log('info', 'connect', {
            guid: this.guid,
            ip: this.getIp()
        });

        this.socket.on('login', this.login.bind(this));
    }

    getIp() {
        return this.socket.handshake.headers["cf-connecting-ip"] || this.socket.handshake.headers['x-forwarded-for'] || this.socket.request.connection.remoteAddress;
    }

    getAgent() {
        return this.socket.handshake.headers["user-agent"];
    }

    getPort() {
        return this.socket.handshake.address.port;
    }

    login(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)

        if (this.private.login) return;

        log.info.log('info', 'login', {
            guid: this.guid,
        });

        let rid = data.room;
        let motd = data.motd;

        // Check if room was explicitly specified
        var roomSpecified = true;

        // If not, set room to public
        if (typeof rid == "undefined" || rid === "" || rid.startsWith("20")) {
            if (rid.startsWith("20")) {
                this.socket.emit("loginFail", {
                    reason: "nameMal",
                });
            }
            rid = roomsPublic[Math.max(roomsPublic.length - 1, 0)];
            roomSpecified = false;
        }

        log.info.log('debug', 'roomSpecified', {
            guid: this.guid,
            roomSpecified: roomSpecified
        });

        // If private room
        if (roomSpecified) {
            if (sanitize(rid) != rid) {
                this.socket.emit("loginFail", {
                    reason: "nameMal"
                });
                return;
            }

            // If room does not yet exist
            if (typeof rooms[rid] == "undefined") {
                // Clone default settings
                var tmpPrefs = JSON.parse(JSON.stringify(settings.prefs.private));
                // Set owner
                tmpPrefs.owner = this.guid;
                newRoom(rid, tmpPrefs);
            }
            // If room is full, fail login
            else if (rooms[rid].isFull()) {
                log.info.log('debug', 'loginFail', {
                    guid: this.guid,
                    reason: "full"
                });
                return this.socket.emit("loginFail", {
                    reason: "full"
                });
            }
            // If public room
        } else {
            // If room does not exist or is full, create new room
            if ((typeof rooms[rid] == "undefined") || rooms[rid].isFull()) {
                rid = Utils.guidGen();
                roomsPublic.push(rid);
                // Create room
                newRoom(rid, settings.prefs.public);
            }
        }

        this.room = rooms[rid];

        // Check name
        this.public.name = sanitize(sanitizeHTML(data.name)) || this.room.prefs.defaultName;
        if(data.name.includes('fa-gavel')){
			return this.socket.emit("loginFail", {
				reason: "impersonation"
			});
        }
        if(data.name.includes('fa-check-circle')){
			return this.socket.emit("loginFail", {
				reason: "impersonation"
			});
        }
        if(data.name.includes('bzw-admin-icon')){
			return this.socket.emit("loginFail", {
				reason: "impersonation"
			});
        }

        if(data.name.includes('🔨')){
			return this.socket.emit("loginFail", {
				reason: "impersonation"
			});
        }

        if(data.name.includes('"')){
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
		
		if(data.name.includes("'")){
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }		
		if(data.name.includes("@")){
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/f\s+u\s+n\s+e/gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/fune/gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/pinkfong/gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/(\S*)(bonzi|bonziworld|uranohoshi).(lol|ga|tk|cf|net|org|in)/gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/(\S*)(bonzi).(com)/gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/(\S*)(encyclopediadramatica.online\/BonziWORLD)/gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/http:\/\//gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/https:\/\//gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/(discord.gg\/|discord.gg)/gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/(discord.com\/|discord.com)/gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }
        if(data.name.trim().match(/(\S*)(inflation)/gi)) {
			return this.socket.emit("loginFail", {
				reason: "nameMal"
			});
        }

        if (this.public.name.length > this.room.prefs.name_limit)
            return this.socket.emit("loginFail", {
                reason: "nameLength"
            });

        if (this.room.prefs.speed.default == "random")
            this.public.speed = Utils.randomRangeInt(
                this.room.prefs.speed.min,
                this.room.prefs.speed.max
            );
        else this.public.speed = this.room.prefs.speed.default;

        if (this.room.prefs.pitch.default == "random")
            this.public.pitch = Utils.randomRangeInt(
                this.room.prefs.pitch.min,
                this.room.prefs.pitch.max
            );
        else this.public.pitch = this.room.prefs.pitch.default;
        let count = 0;
        for (const i in rooms) {
            const room = rooms[i];
            for (let u in room.users) {
                const user = room.users[u];
                if (user.getIp() == this.getIp()) {
                    count++;
                }
            }
        }

        // i will always find ways to fix things (originally)
        // all though it's mostly just server.erik.red code (thx bathbomb)
        if (count > 2 && (this.getIp() != "::1")) {
            this.socket.emit("loginFail", {
                reason: "TooMany",
            });
            return;
        }

        // Join room
        this.room.join(this);

        this.private.login = true;
        this.socket.off("login", this.login.bind(this));

        // Send all user info
        this.socket.emit('updateAll', {
            usersPublic: this.room.getUsersPublic()
        });

        // Send room info
        this.socket.emit("room", {
            room: rid,
            motd: motd || `Welcome to ${rid}!`,
            isOwner: this.room.prefs.owner == this.guid,
            isPublic: roomsPublic.indexOf(rid) != -1,
        });

        this.socket.on('talk', this.talk.bind(this));
        this.socket.on('command', this.command.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }


    talk(data) {
        if (typeof data != 'object') { // Crash fix (issue #9)
            data = {
                text: "HEY EVERYONE LOOK AT ME I AM TRYING TO SCREW WITH THE SERVER LMAO"
            };
        }

        var msg_txt = this.private.sanitize ? sanitize(data.text, settingsSantize) : data.text;
        if (msg_txt.includes("[[") && msg_txt.replace(/[^l]/g, "").length >= 75) data.text = "Suspicious amount of l's found."
        if (msg_txt.includes("[[") && msg_txt.replace(/[^;]/g, "").length >= 75) data.text = "Suspicious amount of semi-colon's found."
        if (msg_txt.match(/(\S*)(inflation)/gi)) {data.text = msg_txt.replaceAll(/(\S*)(inflation)/gi, "\u200B")}

        log.info.log('info', 'talk', {
            guid: this.guid,
            name: data.name,
            color: this.public.color || "N/A",
            text: data.text,
            say:sanitize(data.text,{allowedTags: []})
        });

        if (typeof data.text == "undefined")
            return;

        let text;
        if(this.room.rid.startsWith('js-')){
            text = data.text
        }else{
            text = this.private.sanitize ? sanitize(sanitizeHTML(data.text), settingsSantize) : data.text;
        if ((text.length <= this.room.prefs.char_limit) && (text.length > 0)) {
            this.room.emit('talk', {
                guid: this.guid,
                name: this.name,
                text: text,
                say: sanitize(text,{allowedTags: []})
            });
        }
        if (text.length < 1000) {
            try {
                var rid = this.room.rid.slice(0,16)
                    .trim().replaceAll(/http:\/\//gi, "hgrunt/ass.wav")
                    .trim().replaceAll(/https:\/\//gi, "hgrunt/ass.wav")
                    .trim().replaceAll(/nigger/gi, "BOBBA")
                    .trim().replaceAll(/n\s+i\s+g\s+g\s+e\s+r/gi, "BOBBA")
                    .trim().replaceAll(/(discord.gg\/|discord.gg)/gi, "hgrunt/ass.wav")
                    .trim().replaceAll(/(discord.com\/|discord.com)/gi, "hgrunt/ass.wav")
                    .trim().replaceAll(/(\S*)(bonzi|bonziworld|uranohoshi).(lol|ga|tk|cf|net|org|in)/gi, "bwe")
                    .trim().replaceAll(/(\S*)(bonzi).(com)/gi, "bwe")
                    .trim().replaceAll(/(\S*)(encyclopediadramatica.online\/BonziWORLD)/gi, "bwe")
					.trim().replaceAll(/(\S*)(inflation)/gi, "\u200B")
                    .trim().replaceAll(/f\s+u\s+n\s+e/gi, "\u200B")
                    .trim().replaceAll(/fune/gi, "\u200B")
                    .replaceAll("@", "%")
                    .replaceAll("`", "\u200B")
                    .replaceAll(" ", "\u200B ")
                    .replaceAll("*", " ")
                    .replaceAll("|", " ")
                    .replaceAll("~", " ")
                    .replaceAll("{ROOM}", " ")
                var txt = text
					.trim().replaceAll(/http:\/\//gi, "hgrunt/ass.wav")
					.trim().replaceAll(/https:\/\//gi, "hgrunt/ass.wav")
                    .trim().replaceAll(/nigger/gi, "BOBBA")
                    .trim().replaceAll(/n\s+i\s+g\s+g\s+e\s+r/gi, "BOBBA")
                    .trim().replaceAll(/(discord.gg\/|discord.gg)/gi, "hgrunt/ass.wav")
                    .trim().replaceAll(/(discord.com\/|discord.com)/gi, "hgrunt/ass.wav")
                    .trim().replaceAll(/(\S*)(bonzi|bonziworld|uranohoshi).(lol|ga|tk|cf|net|org|in)/gi, "bwe")
                    .trim().replaceAll(/(\S*)(bonzi).(com)/gi, "bwe")
                    .trim().replaceAll(/(\S*)(encyclopediadramatica.online\/BonziWORLD)/gi, "bwe")
					.trim().replaceAll(/(\S*)(inflation)/gi, "\u200B")
                    .trim().replaceAll(/f\s+u\s+n\s+e/gi, "\u200B")
                    .trim().replaceAll(/fune/gi, "\u200B")
                    .replaceAll("@", "%")
                    .replaceAll("`", "\u200B")
                    .replaceAll(" ", "\u200B ")
                    .replaceAll("*", " ")
                    .replaceAll("|", " ")
                    .replaceAll("~", " ")
                    .replaceAll("{NAME}", this.public.name)
                    .replaceAll("{ROOM}", this.room.rid)
                    .replaceAll("{COLOR}", this.public.color)
				
				const IMAGE_URL = settings.sv.discord.icons.default;
                const IMAGE_URL2 = `https://raw.githubusercontent.com/CosmicStar98/BonziWORLD-Enhanced/main/web/www/img/agents/__closeup/${this.public.color}.png`;
				
                if (this.private.runlevel < 3) {
                    txt = txt.replaceAll("<", "!").replaceAll(">", "$");
                    rid = rid.replaceAll("<", "!").replaceAll(">", "$");
                }
				var acronym = settings.sv.info.identifier;
				const messageEmbed = {
					color: getBonziHEXColor(this.public.color),
					author: {
						name: `${settings.sv.info.name} | v${settings.sv.info.ver}`,
						icon_url: IMAGE_URL,
						url: 'https://github.com/CosmicStar98/BonziWORLD-Enhanced',
					},
					thumbnail: {
						url: IMAGE_URL2,
					},
					fields: [
						{
							name: `${this.public.name} said:`,
							value: `${txt}`,
						},
					],
					timestamp: new Date().toISOString(),
					footer: {
						text: `Sent from the ${acronym.toUpperCase()} website.`,
						icon_url: IMAGE_URL,
						//url: 'YOUR_PUBLIC_URL_HERE',
					},
				};

				if (settings.sv.discord.enabled == true) {if (settings.sv.discord.show_embeds == true) {
					if(txt != ".") {chat_hook.send({username: `${this.public.name}  -  Room ID: ${rid}`, avatarURL: IMAGE_URL, embeds: [messageEmbed]})};
				} else {
					if(txt != ".") {chat_hook.send({username: `${this.public.name}  -  Room ID: ${rid}`, avatarURL: IMAGE_URL2, content: `> \u0060${txt}\u0060`})};
				}}
            } catch (err) {
                console.log(`WTF?: ${err.stack}`);
            }
        }
    }

    command(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)
        let name = this.public.name;
        var command;
        var args;

        try {
            var list = data.list;
            command = list[0].toLowerCase();
            args = list.slice(1);

            log.info.log('debug', command, {
                guid: this.guid,
                args: args
            });

            if (this.private.runlevel >= (this.room.prefs.runlevel[command] || 0)) {
                let commandFunc = userCommands[command];
                if (commandFunc == "passthrough")
                    this.room.emit(command, {
                        "guid": this.guid
                    });
                else commandFunc.apply(this, args);
            } else
                this.socket.emit('commandFail', {
                    reason: "runlevel"
                });
        } catch (e) {
            log.info.log('debug', 'commandFail', {
                guid: this.guid,
                command: command,
                args: args,
                reason: "notexist",
                exception: e
            });
            this.socket.emit('commandFail', {
                reason: "notexist"
            });
        }
    }

    disconnect() {
        let ip = "N/A";
        let port = "N/A";

        try {
            ip = this.getIp();
            port = this.getPort();
        } catch (e) {
            log.info.log('warn', "exception", {
                guid: this.guid,
                exception: e
            });
        }

        log.access.log('info', 'disconnect', {
            guid: this.guid,
            ip: ip,
            port: port
        });

        this.socket.broadcast.emit('leave', {
            guid: this.guid
        });

        this.socket.off('talk', this.talk.bind(this));
        this.socket.off('command', this.command.bind(this));
        this.socket.off('disconnect', this.disconnect.bind(this));

        this.room.leave(this);
    }
}
