var discord=require("discord.js");
var {dChannel,mChannel,wChannel,version,prefix,token,storage_channel,interact,root_role_id,woner_id}=require("./config.json");
const clients=new discord.Client();

console.log("--------------------------------");
console.log("node -v : 10.15.3");
console.log("Dis_bot -v : "+version);
console.log("license : 這東西很糞，沒人想偷");
console.log("--------------------------------");
console.log("關掉按 'Ctrl + C' 後在 cmd 裡打 'y' 按 'Enter' ，然後關掉視窗。")

clients.once("ready",function(){
    console.log("進入工作階段......");
    console.log("成功上線!");
    console.log("token : "+token);
    console.log("time : "+Date());
    console.log(" ");
    console.log(" ");
    console.log(" ");
})

clients.login(token);

var help_r=new discord.RichEmbed();
help_r.setColor("#3e67d8");
help_r.setTitle("The command list of Eason's bot");
help_r.addField(prefix+"help","get the command list.");
help_r.addField(prefix+"bot_info","get the bot infomation.");
help_r.addField(prefix+"screach <screach_key>","screach_keys includs bug, edition, bedrock, bug, ip");
help_r.addField(prefix+"screach bug <first_part>... <last_part>","the last part of the command will be record in the channal,and the manager will see it.");
help_r.addField("bot chat","To avoid bot read message,put '<noread>' or 'nd' in the edn of the message you sent.");
help_r.addField(prefix+"config <variable> <index>","replace variable with index");
help_r.addField("expected variable:","prefix, storage_channel, interact");

var help_m=new discord.RichEmbed();
help_m.setColor("#1de22d");
help_m.setTitle("The command list of Eason's bot");
help_m.addField(prefix+"help","get the command list.");
help_m.addField(prefix+"bot_info","get the bot infomation.");
help_m.addField(prefix+"screach <screach_key>","screach_keys includs bug, edition, bedrock, bug, ip");
help_m.addField(prefix+"screach bug <first_part>... <last_part>","the last part of the command will be record in the channal,and the manager will see it.");
help_m.addField("bot chat","To avoid bot read message,put '<noread>' or 'nd' in the edn of the message you sent.");

function isIn(s){
    var found = inse.find(function(element) {
        return element==s;
      });
    return !(found==undefined);
}
var inse;

clients.on("message",(message) =>{
    console.log(' ');
    mainpro:{//
    if(message.channel.id!=mChannel){
        break mainpro;
    }
    var user = message.member;
    user = user.toString();
    if (user.includes("!")) {
        user = user.split("!")[1].split(">")[0];
    } else {
        user = user.split("@")[1].split(">")[0];
    }
    //clients.users.get(user).id=="467147850007183361"
    //console.log(message.member.roles);
    //console.log(message.member.roles.has("529624827154137098"));//MDMCSERVER OP
    var z=message.content.split("");
    if(!((z[z.length-1]=='>'&&z[z.length-2]=='d'&&z[z.length-3]=='a'&&z[z.length-4]=='e'
    &&z[z.length-5]=='r'&&z[z.length-6]=='o'&&z[z.length-7]=='n'&&z[z.length-8]=='<')||
    (z[z.length-1]=="d"&&z[z.length-2]=='n'))){
        var ch_do = message.channel;
        switch(message.content){
            case (prefix+"help"):
                var embed=new discord.RichEmbed();
                if(message.member.roles.has(root_role_id)){
                    help_r.setTimestamp();
                    ch_do.send(help_r);
                }else{
                    help_m.setTimestamp();
                    ch_do.send(help_m);
                }
                break;
            case (prefix+"hello"):
                ch_do.send("Hello world! It's my first time to try.")
                break; 
            case (prefix+"bot_info"):
                var embed=new discord.RichEmbed();
                embed.setColor("#f50057")
                embed.addField("version:",version)
                embed.addField("uses:","test")
                embed.addField("woner:"," @easonqq0000#2226 ")
                ch_do.send(embed);
                break;
            default:
                //?!screach <java> <index> <in3>
                if(message.content.split(" ")[0]===(prefix+"screach")){
                    inse=message.content.toString().split(" ");
                    
                    if((!(isIn("bedrock")||isIn("edition")))&&(isIn("ip"))){
                        ch_do.send("mcmod.mdmcserver.ml");
                    }
                    if((!(isIn("java")))&&(isIn("ip"))){
                        ch_do.send("mc.bedrock.mdmcserver.ml");
                    }
                    if(isIn("bug")){
                        var v;
                        if(isIn("java")){
                            v="java edition";
                        }else if(isIn("bedrock")||isIn("edition")){
                            v="bedrock edition";
                        }else{
                            v="underfined";
                        }
                        clients.channels.find('name',storage_channel).send("bug("+v+") "+inse[inse.length-1]);
                    }
                }else if(interact){
                    inse=message.content.toString().split(" ");
                    if(message.content=="..."||message.content=="......"){
                        message.channel.send("", {
                            file: "./image/no_say.png"
                        });
                    }else if(isIn('finish')||isIn('finished')){
                        message.channel.send("nice", {
                            file: "./image/nice card.png"
                        });
                    }else if(message.content=="?"||message.content=="??"){
                        message.channel.send("懷疑人生?連百抽失敗?", {
                            file: "./image/con live.png"
                        });
                    }
                }else if(message.member.roles.has(root_role_id)){
                    inse=message.content.toString().split(" ");
                    if(inse[0]==prefix+"config"){
                        switch(inse[1]){
                            case "prefix":
                                prefix=eval(inse[2]);
                                break;
                            case "storage_channel":
                                storage_channel=eval(inse[2]);
                                break;
                            case "interact":
                                interact=eval(inse[2]);
                        }
                        ch_do.send("config '"+inse[1]+"' has been change to '"+eval(inse[2]).toString()+"' successfully, but we don't know what will happen if you type wrong!");
                    }
                }
                if(user==woner_id){
                    inse=message.content.toString().split(" ");
                    if(inse[0]==prefix+"execute"){
                        ch_do.send("Execute successfully!")
                        inse.shift();
                        eval(inse.join(''));
                        console.log("The command(remote) have been executed.-- "+inse.join(''));
                    }
                }
                //clients.channels.find('name','集塵處');
        }
    }
}
});



/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
var admin = require("firebase-admin");
require("firebase/firestore");
var serviceAccount = require("./discord-bot-dce29-firebase-adminsdk-suw36-b53284b02a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://discord-bot-dce29.firebaseio.com"
});

var coll = admin.firestore().collection("g5solvIPDDKcSLOIw59E");

var red_s=0;
coll.doc("red").get().then(function(doc) {
    if (doc.exists) {
        console.log(doc.data());
        red_s=doc.data();
    } else {
        console.log("找不到文件");
    }
    })
    .catch(function(error) {
        console.log("提取文件時出錯:", error);
});
console.log("www"+coll.doc("red").get());

var blue_s=0;
coll.doc("blue").get().then(function(doc) {
    if (doc.exists) {
        console.log(doc.data());
        blue_s=doc.data();
    } else {
        console.log("找不到文件");
    }
    })
    .catch(function(error) {
        console.log("提取文件時出錯:", error);
});


var donmes;
var {wlaunch}=require("./config.json");
if(wlaunch){
    //red=0 blue=1
    var arr_1=new Array();
    var arr_2=new Array();
    clients.on("message",(message) =>{
        
        mainwpro:{//
            if(message.channel.id!=wChannel){
                break mainwpro;
            }
            if(message.content==prefix+"team"){
                var ch_do = message.channel;
                var user = message.member;
                user = user.toString();
                if(user.includes("!")){
                    user = user.split("!")[1].split(">")[0];
                }else{
                    user = user.split("@")[1].split(">")[0];
                }
                if(user%2==0){
                    ch_do.send('red');
                }else{
                    ch_do.send("blue");
                }
                break mainwpro;
            }
            if(message.content==prefix+'update'){
                coll.doc("red").set(red_s);
                coll.doc("blue").set(blue_s);
                ch_do.send("updating")
                break mainwpro;
            }
            if(message.content==prefix+"score"){
                var ch_do = message.channel;                
                ch_do.send("red : blue = "+Math.floor(red_s)+" : "+Math.floor(blue_s));
                break mainwpro;
            }
            arr_1.push(message.content);
            var user = message.member;
            user = user.toString();
            if (user.includes("!")) {
                user = user.split("!")[1].split(">")[0];
            } else {
                user = user.split("@")[1].split(">")[0];
            }
            var rate=1;
            if(arr_2.includes(message.content)){
                rate=0.05;
            }else if(arr_1.includes(message.content)){
                rate=0.4;
                if(Math.random()>0.75){
                    arr_2.push(message.content); 
                }
            }else{
                arr_1.push(message.content);
            }
            if(Math.random()>0.975){
                arr_1=new Array();
                arr_2=new Array();
            }
            var promes=message.content.toString().split().sort();
            donmes=new Array();
            
            promes.forEach(function(item){
                if(donmes.includes(item)){
                    //skip
                }else{
                    donmes.push(item);
                }
            });
            if(promes.length>=150){
                promes.length=150;
            }
            var fin_s=message.content.length*donmes.length*rate;
            if(user%2==0){
                red_s=red_s+fin_s;
            }else{
                blue_s=blue_s+fin_s;
            }
        }
    });
}



/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//https://discordapp.com/oauth2/authorize?client_id=585042278238912514&scope=bot&promise=473159760
//https://discordapp.com/oauth2/authorize?client_id=585042278238912514&scope=bot&promise=8

clients.on("message",(message) =>{
    depor:{
        if(message.channel.id!=dChannel){
            break depor;
        }
        
        if(message.content.split('')[0]="/join"){
            //message.member.addRole(529625551665627137);
            var role = message.guild.roles.find(role => role.id == "529625551665627137");
            message.member.addRole(role);
        }
        message.delete(100);
        



    }




})
