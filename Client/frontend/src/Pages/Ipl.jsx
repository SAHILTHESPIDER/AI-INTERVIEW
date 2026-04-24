import { useState, useCallback, useMemo } from "react";

// ─── TALENT GENERATION (200 each) ────────────────────────────────────────────
function genTalent() {
  const mF=["Arjun","Ranbir","Ranveer","Shahid","Hrithik","Varun","Kartik","Tiger","Sidharth","Aditya","Raj","Dev","Karan","Nikhil","Rohit","Vikram","Amar","Suraj","Rahul","Akash","Veer","Jay","Aarav","Dhruv","Kabir","Vivek","Ritesh","Mohit","Sanjay","Ajay","Sunny","Bobby","Aamir","Irrfan","Nawaz","Ayushmann","Rajkumar","John","Emraan","Imran","Farhan","Abhishek","Saif","Shreyas","Kunal","Jackky","Neil","Pulkit","Harshvardhan","Raghav","Ansh","Rohan","Tejas","Gaurav","Manav","Param","Yash","Rocky","Lucky","Vicky","Tushar","Fardeen","Aftab","Zayed","Alex","Chris","Ryan","James","Tom","Jack","Michael","David","Robert","William","Jake","Liam","Noah","Lucas","Mason","Ethan","Oliver","Aiden","Elijah","Logan","Daniel","Henry","Owen","Sebastian","Muhammad","Ahmed","Hassan","Omar","Yusuf","Ali","Samir","Tariq","Bilal","Khalid","Hamza","Raza","Faisal","Wasim","Zain","Leo","Marco","Carlos","Juan","Diego","Mateo","Pablo","Luis","Miguel","Andre","Victor","Bruno","Luca","Giulio","Kai","Ren","Hiro","Sato","Takeshi","Kenji","Daichi","Ryu","Min","Ji","Seung","Park","Kim","Upen","Rehan","Celino","Danny","Jimmy","Chunky","Micky","Bunny","Param","Yash","Roshan","Armaan","Ishaan","Ahaan","Shaan","Jaan","Raan","Vaan"];
  const fF=["Deepika","Priyanka","Katrina","Anushka","Alia","Kangana","Vidya","Taapsee","Sonam","Kriti","Sara","Janhvi","Ananya","Tara","Nora","Jacqueline","Disha","Pooja","Madhuri","Kajol","Rani","Preity","Kareena","Bipasha","Sushmita","Aishwarya","Hema","Rekha","Juhi","Divya","Karishma","Malaika","Urmila","Sonali","Shilpa","Raveena","Manisha","Nagma","Revathi","Tabu","Nandita","Shabana","Smita","Dimple","Zeenat","Parveen","Mumtaz","Sadhana","Waheeda","Sharmila","Raakhee","Jaya","Amrita","Twinkle","Ayesha","Geeta","Neha","Swara","Radhika","Konkona","Kalki","Dia","Lara","Celina","Amisha","Esha","Elena","Maya","Sofia","Isabella","Emma","Olivia","Ava","Charlotte","Amelia","Harper","Evelyn","Luna","Scarlett","Victoria","Natalie","Rachel","Melissa","Lauren","Samantha","Amanda","Jennifer","Jessica","Ashley","Mia","Chloe","Grace","Lily","Zoe","Hannah","Layla","Aria","Riley","Nora","Hazel","Violet","Aurora","Savannah","Aaliyah","Zara","Fatima","Aisha","Yasmin","Nadia","Leila","Mariam","Hana","Maryam","Dina","Jana","Rania","Kenza","Amira","Sana","Noor","Riya","Kavya","Meera","Ishita","Shreya","Prachi","Kanchan","Bhavna","Shweta","Nisha","Sunita","Seema","Mamta","Sudha","Usha","Lata","Asha","Kiran","Nita","Rita","Sita","Gita","Mita","Pita"];
  const mL=["Kapoor","Khan","Kumar","Singh","Sharma","Verma","Gupta","Mehta","Shah","Patel","Chopra","Malhotra","Khanna","Sinha","Roy","Das","Joshi","Nair","Pillai","Iyer","Rao","Reddy","Naidu","Chandra","Rajan","Suresh","Venkat","Mohan","Prasad","Murthy","Storm","Ford","Blake","Vega","Chase","Hart","Cruz","Rivera","Reyes","Torres","Smith","Jones","Williams","Brown","Davis","Garcia","Wilson","Martinez","Anderson","Taylor","Thomas","Jackson","White","Harris","Martin","Lee","Walker","Hall","Allen","Young","King","Wright","Scott","Green","Baker","Adams","Nelson","Carter","Mitchell","Roberts","Turner","Phillips","Campbell","Parker","Evans","Collins"];
  const fL=["Padukone","Chopra","Kaif","Sharma","Bhatt","Ranaut","Balan","Pannu","Kapoor","Sanon","Ali","Joshi","Thakur","Sutaria","Fatehi","Fernandez","Patani","Hegde","Dixit","Mukherjee","Rai","Zinta","Grover","Walia","Das","Iyer","Pillai","Nair","Rao","Reddy","Clarke","Smith","Jones","Wilson","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Lee","Walker","Hall","Allen","Young","King","Wright","Scott","Green","Singh","Kumar","Verma","Mehta","Shah","Patel","Malhotra","Khanna","Sinha","Roy"];
  const gM=[["Action","Mass"],["Drama","Thriller"],["Comedy","Romance"],["Action","Superhero"],["Drama","Biopic"],["Mass","Action"],["Sci-Fi","Action"],["Comedy","Drama"],["Thriller","Horror"],["Romance","Musical"]];
  const gF=[["Romance","Drama"],["Action","Thriller"],["Comedy","Romance"],["Drama","Musical"],["Biopic","Drama"],["Romance","Comedy"],["Sci-Fi","Drama"],["Horror","Thriller"],["Musical","Romance"],["Drama","Romance"]];
  const regions=["India","India","India","USA","USA","China","Europe","Middle East","Japan","India"];
  const tierWeights=["S","S","A","A","A","B","B","B","C","C","C","D","D","D","D"];
  const tierBase={S:{pop:85,sk:85,sal:10000000,fb:5000000},A:{pop:70,sk:72,sal:5000000,fb:2000000},B:{pop:55,sk:60,sal:2000000,fb:800000},C:{pop:40,sk:48,sal:800000,fb:200000},D:{pop:25,sk:35,sal:300000,fb:50000}};
  const rand=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const pick=a=>a[Math.floor(Math.random()*a.length)];

  const actors=[], actresses=[], music=[];
  for(let i=1;i<=200;i++){
    const tier=pick(tierWeights);const tb=tierBase[tier];
    actors.push({id:i,name:`${pick(mF)} ${pick(mL)}`,tier,pop:tb.pop+rand(0,12),skill:tb.sk+rand(0,12),salary:tb.sal+rand(0,tb.sal/2),mood:rand(75,95),gender:"M",genre:pick(gM),region:pick(regions),busy:false,busyUntil:0,fanbase:tb.fb+rand(0,500000)});
    actresses.push({id:200+i,name:`${pick(fF)} ${pick(fL)}`,tier,pop:tb.pop+rand(0,12),skill:tb.sk+rand(0,12),salary:tb.sal+rand(0,tb.sal/2),mood:rand(75,95),gender:"F",genre:pick(gF),region:pick(regions),busy:false,busyUntil:0,fanbase:tb.fb+rand(0,500000)});
  }
  const mNames=["A.R.","Vishal","Shekhar","Pritam","Amit","Shankar","Ehsaan","Salim","Sulaiman","Amaal","Sonu","Meet","Badshah","Divine","Ankur","Jasleen","Clinton","Harris","Justin","James","Hans","John","Alexandre","Ludwig","Ramin","Ennio","Alan","Danny","Howard","Mark","Thomas","Michael","Bernard","Jerry","Tanishk","Sachin","Jigar","Mithoon","Arijit","Shreya","Neha","Armaan","Atif","Rahat","Sonu","Mohit","Udit","Kumar","Lata","Asha","Kishore","Rafi"];
  const msur=["Rahman","Bhardwaj","Bhatia","Trivedi","Merchant","Mallik","Williams","Zimmer","Horner","Djawadi","Powell","Desplat","Barry","Goldsmith","Newman","Silvestri","Shore","Elfman","Giacchino","Davis","Bagchi","Kapoor","Sharma","Verma","Singh","Kumar","Chauhan","Sen","Roy","Das","Nair","Iyer","Pillai","Rao"];
  const mGenres=[["Drama","Romance"],["Action","Thriller"],["Comedy","Romance"],["Mass","Action"],["Superhero","Sci-Fi"],["Musical","Romance"],["Horror","Thriller"],["Biopic","Drama"],["Action","Mass","Drama"],["All Genres"]];
  const mTierBase={S:{p:88,h:85,s:4000000},A:{p:72,h:70,s:2000000},B:{p:58,h:58,s:1000000},C:{p:42,h:44,s:400000},D:{p:28,h:30,s:150000}};
  for(let i=1;i<=200;i++){
    const tier=pick(tierWeights);const tb=mTierBase[tier];
    music.push({id:i,name:`${pick(mNames)} ${pick(msur)}`,tier,pop:tb.p+rand(0,10),hitRate:tb.h+rand(0,12),salary:tb.s+rand(0,tb.s/2),genres:pick(mGenres),busy:false,busyUntil:0});
  }
  return {actors,actresses,music};
}

const {actors:INIT_ACTORS,actresses:INIT_ACTRESSES,music:INIT_MUSIC} = genTalent();

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const GENRES=["Action","Drama","Comedy","Romance","Thriller","Horror","Sci-Fi","Animation","Superhero","Mass","Biopic","Musical"];
const REGIONS=["India","USA","China","Europe","Middle East","Japan"];
const REGION_MULT={India:1.0,USA:1.4,China:1.3,Europe:1.1,"Middle East":0.8,Japan:0.9};
const THEMES=["Redemption","Revenge","Love","Friendship","War","Survival","Politics","Family","Identity","Heist","Mythology","Sports"];
const RATINGS=["U","UA","A","S"];
const TREND_BASE={Action:1.2,Drama:0.95,Comedy:1.0,Romance:0.9,Thriller:1.05,Horror:1.0,"Sci-Fi":1.15,Animation:1.1,Superhero:1.3,Mass:1.25,Biopic:1.05,Musical:0.85};
const FESTIVALS=[{name:"Diwali",week:42,bonus:1.40},{name:"Christmas",week:52,bonus:1.35},{name:"Eid",week:14,bonus:1.30},{name:"Summer",week:26,bonus:1.25},{name:"New Year",week:1,bonus:1.20},{name:"Holi",week:10,bonus:1.15}];
const TIERS={S:{label:"S-Tier",color:"#f59e0b",glow:"#f59e0b33",mult:1.4,desc:"Global Superstar"},A:{label:"A-Tier",color:"#3b82f6",glow:"#3b82f633",mult:1.2,desc:"National Star"},B:{label:"B-Tier",color:"#10b981",glow:"#10b98122",mult:1.0,desc:"Established"},C:{label:"C-Tier",color:"#8b5cf6",glow:"#8b5cf622",mult:0.8,desc:"Rising"},D:{label:"D-Tier",color:"#6b7280",glow:"#6b728018",mult:0.6,desc:"Fresh Face"}};

// ─── SHOOT FORMATS ─────────────────────────────────────────────────────────
const SHOOT_FORMATS=[
  {id:"standard",label:"Standard 2D",icon:"📽",cost:0,qualityBonus:0,revenueBonus:1.0,desc:"Regular theatrical format"},
  {id:"3d",label:"3D",icon:"🎯",cost:15000000,qualityBonus:5,revenueBonus:1.25,desc:"3D adds ticket premium +25% revenue"},
  {id:"imax",label:"IMAX",icon:"🔭",cost:25000000,qualityBonus:8,revenueBonus:1.45,desc:"IMAX commands highest ticket prices"},
  {id:"4dx",label:"4DX",icon:"💺",cost:20000000,qualityBonus:3,revenueBonus:1.30,desc:"4D motion seats experience"},
  {id:"imax3d",label:"IMAX 3D",icon:"🌌",cost:40000000,qualityBonus:12,revenueBonus:1.65,desc:"Premium of all formats — maximum revenue"},
  {id:"dolby",label:"Dolby Atmos",icon:"🔊",cost:8000000,qualityBonus:4,revenueBonus:1.15,desc:"Premium sound experience"},
];

// ─── OTT PLATFORMS ────────────────────────────────────────────────────────────
const OTT_PLATFORMS=[
  {id:"netflix",    name:"Netflix",       icon:"🎬", color:"#E50914", subscribers:"230M global",  bidMin:50000000,  bidMax:300000000, years:[1,2,3,5],  premium:true  },
  {id:"prime",      name:"Amazon Prime",  icon:"📦", color:"#00A8E1", subscribers:"200M global",  bidMin:40000000,  bidMax:250000000, years:[1,2,3],    premium:true  },
  {id:"disney",     name:"Disney+Hotstar",icon:"⭐", color:"#1660CF", subscribers:"150M India",   bidMin:30000000,  bidMax:200000000, years:[1,2,3,5],  premium:true  },
  {id:"jio",        name:"JioCinema+",    icon:"📺", color:"#0078D4", subscribers:"450M India",   bidMin:20000000,  bidMax:120000000, years:[1,2,3],    premium:false },
  {id:"sony",       name:"SonyLIV",       icon:"🎭", color:"#003087", subscribers:"100M India",   bidMin:15000000,  bidMax:80000000,  years:[1,2],      premium:false },
  {id:"zee",        name:"ZEE5",          icon:"🟡", color:"#8E24AA", subscribers:"90M India",    bidMin:10000000,  bidMax:60000000,  years:[1,2],      premium:false },
  {id:"apple",      name:"Apple TV+",     icon:"🍎", color:"#555555", subscribers:"50M global",   bidMin:60000000,  bidMax:400000000, years:[1,2,3],    premium:true  },
  {id:"mubi",       name:"MUBI",          icon:"🎞", color:"#1b1b1b", subscribers:"12M global",   bidMin:5000000,   bidMax:30000000,  years:[1,2],      premium:false },
  {id:"eros",       name:"Eros Now",      icon:"🎵", color:"#FF6B00", subscribers:"60M India",    bidMin:8000000,   bidMax:50000000,  years:[1,2],      premium:false },
  {id:"altbalaji",  name:"ALTBalaji",     icon:"🔵", color:"#1565C0", subscribers:"40M India",    bidMin:5000000,   bidMax:25000000,  years:[1,2],      premium:false },
  {id:"hungama",    name:"Hungama Play",  icon:"🎤", color:"#FF3D00", subscribers:"30M India",    bidMin:3000000,   bidMax:15000000,  years:[1,2],      premium:false },
  {id:"mxplayer",   name:"MX Player",     icon:"▶",  color:"#00C853", subscribers:"280M India",   bidMin:5000000,   bidMax:35000000,  years:[1,2],      premium:false },
];

// ─── MUSIC RIGHTS PLATFORMS ──────────────────────────────────────────────────
const MUSIC_PLATFORMS=[
  {id:"spotify",   name:"Spotify",        icon:"🎵", color:"#1DB954", bidMin:5000000,  bidMax:50000000,  royaltyRate:0.15, desc:"Global streaming giant"},
  {id:"yt_music",  name:"YouTube Music",  icon:"▶",  color:"#FF0000", bidMin:3000000,  bidMax:30000000,  royaltyRate:0.12, desc:"Tied to YouTube channel"},
  {id:"apple_mus", name:"Apple Music",    icon:"🍎", color:"#FC3C44", bidMin:6000000,  bidMax:60000000,  royaltyRate:0.14, desc:"Premium audience"},
  {id:"gaana",     name:"Gaana",          icon:"🎶", color:"#E72429", bidMin:2000000,  bidMax:20000000,  royaltyRate:0.10, desc:"India's top music app"},
  {id:"jiosaavn",  name:"JioSaavn",       icon:"🎼", color:"#2BC5B4", bidMin:3000000,  bidMax:25000000,  royaltyRate:0.11, desc:"Massive India reach"},
  {id:"wynk",      name:"Wynk Music",     icon:"🎹", color:"#9C27B0", bidMin:1000000,  bidMax:12000000,  royaltyRate:0.09, desc:"Airtel user base"},
  {id:"own_yt",    name:"Own YouTube Ch", icon:"🎬", color:"#FF6D00", bidMin:0,        bidMax:0,         royaltyRate:0.30, desc:"Keep all royalties, build channel"},
];

// ─── YOUTUBE ACTIONS ──────────────────────────────────────────────────────────
const YT_ACTIONS=[
  {id:"bts",       icon:"🎥", label:"BTS Vlog",          cost:300000,  hype:8,  subs:5000,  desc:"Behind-the-scenes YouTube vlog", weeksBeforeRelease:null},
  {id:"cast_qa",   icon:"🎤", label:"Cast Q&A",          cost:500000,  hype:12, subs:8000,  desc:"Stars answer fan questions live", weeksBeforeRelease:null},
  {id:"music_vid", icon:"🎵", label:"Music Video",       cost:1500000, hype:20, subs:18000, desc:"Official music video premiere",   weeksBeforeRelease:8},
  {id:"teaser_yt", icon:"⚡", label:"Teaser (30 sec)",   cost:200000,  hype:10, subs:12000, desc:"30-sec teaser exclusive to YT",    weeksBeforeRelease:12},
  {id:"trailer1",  icon:"🎞", label:"Trailer 1",         cost:800000,  hype:18, subs:15000, desc:"First theatrical trailer",         weeksBeforeRelease:8},
  {id:"trailer2",  icon:"🎬", label:"Trailer 2 (Final)", cost:1200000, hype:22, subs:20000, desc:"Final trailer with more footage",   weeksBeforeRelease:4},
  {id:"react_col", icon:"😂", label:"Reaction Collab",   cost:800000,  hype:14, subs:16000, desc:"Top YouTubers react to trailer",   weeksBeforeRelease:null},
  {id:"live_qa",   icon:"🔴", label:"YouTube LIVE",      cost:2000000, hype:25, subs:25000, desc:"Cast live Q&A premiere event",      weeksBeforeRelease:2},
  {id:"rev_push",  icon:"⭐", label:"Sponsored Reviews",  cost:1200000, hype:16, subs:10000, desc:"Pay film channels for early review",weeksBeforeRelease:null},
  {id:"motion_p",  icon:"🌊", label:"Motion Poster",     cost:400000,  hype:9,  subs:6000,  desc:"Animated motion poster reveal",    weeksBeforeRelease:14},
  {id:"char_rev",  icon:"👤", label:"Character Reveal",  cost:600000,  hype:11, subs:9000,  desc:"First look character posters",     weeksBeforeRelease:10},
  {id:"making_of", icon:"🔧", label:"Making Of",         cost:700000,  hype:13, subs:7000,  desc:"VFX & production making-of",       weeksBeforeRelease:null},
];

const DISTRIBUTION=[
  {id:"self",    label:"Self-Publish",   icon:"🏠",cut:0,    bonus:-5, desc:"Keep 100%, lower reach"},
  {id:"partner", label:"Studio Partner", icon:"🤝",cut:0.15, bonus:5,  desc:"15% cut, wider network"},
  {id:"ott",     label:"OTT Exclusive",  icon:"📺",cut:0.10, bonus:0,  desc:"Guaranteed audience, no theatres"},
  {id:"hybrid",  label:"Hybrid Release", icon:"🔀",cut:0.08, bonus:8,  desc:"Theatre + OTT after 4 weeks"},
];
const AI_STUDIOS=[
  {id:"sun",  name:"Sun Studios",  color:"#f59e0b",bg:"#78350f",icon:"🟨",specialty:"Action",   strength:82},
  {id:"hero", name:"HeroVerse",    color:"#3b82f6",bg:"#1e3a8a",icon:"🟦",specialty:"Superhero",strength:90},
  {id:"ind",  name:"Indie Films",  color:"#10b981",bg:"#064e3b",icon:"🟩",specialty:"Drama",    strength:55},
  {id:"mass", name:"Mass Magic",   color:"#ec4899",bg:"#831843",icon:"🟥",specialty:"Mass",     strength:75},
];
const AI_TITLES={Action:["Thunder Strike","Iron Fist","Blaze","Uprising"],Superhero:["Hero Rising","Shield Force","Cosmic Hero"],Drama:["Broken Ties","Silent Voices"],Mass:["The Don Returns","Rowdy Rampage"],Romance:["Love Reborn","Forever Yours"],Comedy:["Laugh Riot","Chaos Squad"]};
const PROD_STAGES=["Pre-Production","Principal Photography","Post-Production","VFX & Sound","Ready to Release"];

// BUG FIX #1: Removed zero-width joiner from ✊ emoji (was causing TS1005 parse errors)
const INCIDENTS=[
  {id:"injury",   icon:"🤕",title:"Actor Injury",       desc:"Lead actor injured on set!",                 choices:[{l:"Replace Actor (Recast)",cost:5000000,eff:"none"},{l:"Delay 3 Weeks",cost:1000000,eff:"delay3"},{l:"Shoot Around It",cost:2000000,eff:"q-5"}]},
  {id:"overrun",  icon:"💸",title:"Budget Overrun",     desc:"Production costs 30% over budget!",           choices:[{l:"Inject More Funds",cost:"30pct",eff:"none"},{l:"Cut Scenes",cost:0,eff:"q-10"},{l:"Delay Release",cost:0,eff:"delay2"}]},
  {id:"scandal",  icon:"😱",title:"Star Scandal",       desc:"Lead actor trending for wrong reasons!",       choices:[{l:"PR Crisis Campaign",cost:3000000,eff:"hype+5"},{l:"Recast the Role",cost:8000000,eff:"none"},{l:"Ignore",cost:0,eff:"q-8"}]},
  {id:"leak",     icon:"📉",title:"Movie Leaked!",      desc:"Plot leaked online! Audiences spoiled.",       choices:[{l:"Anti-Piracy Push",cost:2000000,eff:"none"},{l:"Push Early Release",cost:0,eff:"earlyrel"},{l:"Accept Loss",cost:0,eff:"q-5"}]},
  {id:"weather",  icon:"🌩",title:"Weather Disaster",   desc:"Outdoor sets destroyed by storm!",             choices:[{l:"Rebuild Sets",cost:4000000,eff:"none"},{l:"Delay 2 Weeks",cost:500000,eff:"delay2"},{l:"Switch to CGI",cost:6000000,eff:"q+5"}]},
  {id:"strike",   icon:"✊",title:"Crew Strike",         desc:"Writers & crew went on strike!",               choices:[{l:"Meet Demands",cost:5000000,eff:"none"},{l:"Hire New Crew",cost:3000000,eff:"q-5"},{l:"Pause Production",cost:0,eff:"delay4"}]},
  {id:"director", icon:"🎬",title:"Director Quits",     desc:"Your director stormed off set!",              choices:[{l:"Negotiate Return",cost:4000000,eff:"none"},{l:"Hire Replacement",cost:8000000,eff:"q-8"},{l:"Producer Takes Over",cost:0,eff:"q-15"}]},
  {id:"viral",    icon:"🔥",title:"BTS Went Viral",     desc:"Behind-the-scenes clip exploded online!",      choices:[{l:"Ride the Wave",cost:500000,eff:"hype+20"},{l:"Official Statement",cost:1000000,eff:"hype+10"},{l:"No Action",cost:0,eff:"hype+5"}]},
];
const SCRIPTS=[
  {id:1,title:"Eternal Flames",  genre:"Romance",  theme:"Love",     quality:80,price:2000000,rating:"UA"},
  {id:2,title:"Iron Galaxy",     genre:"Sci-Fi",   theme:"Survival", quality:88,price:3500000,rating:"UA"},
  {id:3,title:"Mumbai Nights",   genre:"Drama",    theme:"Redemption",quality:85,price:2500000,rating:"A"},
  {id:4,title:"Shadow Protocol", genre:"Thriller", theme:"Heist",    quality:90,price:4000000,rating:"A"},
  {id:5,title:"Roar of Thunder", genre:"Action",   theme:"Revenge",  quality:92,price:5000000,rating:"UA"},
  {id:6,title:"Hero Rising",     genre:"Superhero",theme:"Identity", quality:91,price:6000000,rating:"UA"},
  {id:7,title:"Mass Mayhem",     genre:"Mass",     theme:"Revenge",  quality:86,price:3000000,rating:"UA"},
  {id:8,title:"The Last Laugh",  genre:"Comedy",   theme:"Friendship",quality:75,price:1500000,rating:"U"},
  {id:9,title:"Gods of War",     genre:"Biopic",   theme:"War",      quality:89,price:4500000,rating:"A"},
  {id:10,title:"Dreamland",      genre:"Musical",  theme:"Love",     quality:84,price:2500000,rating:"U"},
];

const fmt=n=>{const a=Math.abs(n),s=n<0?"-":"";return a>=1e9?`${s}₹${(a/1e9).toFixed(2)}B`:a>=1e7?`${s}₹${(a/1e7).toFixed(1)}Cr`:a>=1e5?`${s}₹${(a/1e5).toFixed(1)}L`:`${s}₹${(a/1000).toFixed(0)}K`;};
const fmtFans=n=>n>=1e7?`${(n/1e7).toFixed(1)}Cr`:n>=1e5?`${(n/1e5).toFixed(1)}L`:n>=1e3?`${(n/1e3).toFixed(1)}K`:String(n);
const getFest=w=>FESTIVALS.find(f=>Math.abs(f.week-w)<=1);
const clr=tier=>TIERS[tier]?TIERS[tier].color:"#6b7280";
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [week,setWeek]=useState(1);
  const [balance,setBalance]=useState(200000000);
  const [fanbase,setFanbase]=useState(100000);
  const [reputation,setReputation]=useState(50);
  const [studioLevel,setStudioLevel]=useState(1);
  const [ytSubs,setYtSubs]=useState(0);
  const [hasYtChannel,setHasYtChannel]=useState(false);
  const [awards,setAwards]=useState([]);
  const [genreTrends,setGenreTrends]=useState(TREND_BASE);
  const [tab,setTab]=useState("dashboard");

  // Talent
  const [actorPool,setActorPool]=useState(INIT_ACTORS);
  const [actressPool,setActressPool]=useState(INIT_ACTRESSES);
  const [musicPool,setMusicPool]=useState(INIT_MUSIC);
  const [myActors,setMyActors]=useState([]);
  const [myActresses,setMyActresses]=useState([]);
  const [myMusicDirs,setMyMusicDirs]=useState([]);
  const [myDirectors,setMyDirectors]=useState([]);
  const [myScripts,setMyScripts]=useState([]);
  const [availScripts,setAvailScripts]=useState(SCRIPTS);

  // Filter state for talent browsing
  const [actorFilter,setActorFilter]=useState({tier:"All",gender:"M",search:"",genre:"All"});
  const [actressFilter,setActressFilter]=useState({tier:"All",gender:"F",search:"",genre:"All"});
  const [musicFilter,setMusicFilter]=useState({tier:"All",search:""});

  // OTT & Music rights
  const [ottDeals,setOttDeals]=useState([]);
  const [musicRights,setMusicRights]=useState([]);
  const [myOttPlatform,setMyOttPlatform]=useState(null);

  // Movies
  const [movies,setMovies]=useState([]);
  const [released,setReleased]=useState([]);
  const [franchises,setFranchises]=useState([]);
  const [aiReleases,setAiReleases]=useState([]);

  // News & incidents
  const [newsLog,setNewsLog]=useState([
    {id:1,w:1,msg:"🎬 Welcome! Your studio journey begins. Hire talent and make dream movies."},
    {id:2,w:1,msg:"🔥 Superhero genre trending globally! Action & Mass also strong."},
    {id:3,w:1,msg:"📺 OTT platforms are bidding aggressively for exclusive content!"},
    {id:4,w:1,msg:"▶ Tip: Launch your YouTube channel to build hype before release!"},
  ]);
  const [notifs,setNotifs]=useState([]);
  const [activeIncident,setActiveIncident]=useState(null);
  const [incidentMovie,setIncidentMovie]=useState(null);

  // Modals
  const [showWizard,setShowWizard]=useState(false);
  const [wizStep,setWizStep]=useState(1);
  const [showOTT,setShowOTT]=useState(null);
  const [showMusicRights,setShowMusicRights]=useState(null);
  const [showYT,setShowYT]=useState(null);
  const [showPostpone,setShowPostpone]=useState(null);
  const [showFranchiseCreate,setShowFranchiseCreate]=useState(null);
  const [showReleaseDate,setShowReleaseDate]=useState(null);
  const [expandedR,setExpandedR]=useState(null);
  const [talentSubTab,setTalentSubTab]=useState("actors");

  // Wizard draft
  const emptyDraft={
    title:"",genre:"Action",theme:"Revenge",rating:"UA",budget:25000000,synopsis:"",
    leadActorId:null,leadActressId:null,supportingActorIds:[],supportingActressIds:[],
    directorId:null,musicDirId:null,scriptId:null,
    producerStyle:"balanced",screens:1500,screenCost:3000000,
    distributionId:"partner",shootFormat:"standard",formatCost:0,
    releaseWeek:null,
    ytActions:[],marketingDone:[],hype:5,
    regionalDates:{},franchiseId:null,
  };
  const [draft,setDraft]=useState(emptyDraft);

  const addNews=useCallback(msg=>setNewsLog(n=>[{id:Date.now()+Math.random(),w:week,msg},...n].slice(0,80)),[week]);
  const notify=useCallback((msg,type="info")=>{
    const id=Date.now()+Math.random();
    setNotifs(n=>[...n,{id,msg,type}]);
    setTimeout(()=>setNotifs(n=>n.filter(x=>x.id!==id)),4200);
  },[]);

  // ── ADVANCE WEEK ──────────────────────────────────────────────────────────
  const advanceWeek=()=>{
    const nw=week+1;
    setWeek(nw);

    // Advance productions
    setMovies(ms=>ms.map(m=>{
      if(m.status==="ready"||m.status==="awaiting-release-date") return m;
      const si=m.stageIndex||0,sp=m.stageProgress||0;
      const rate=18+studioLevel*3;
      const np=sp+rate;
      if(np>=100&&si<PROD_STAGES.length-1) return{...m,stageIndex:si+1,stageProgress:0};
      if(si>=PROD_STAGES.length-1&&np>=100) return{...m,stageProgress:100,status:"ready"};
      return{...m,stageProgress:Math.min(100,np)};
    }));

    // BUG FIX #2: freeTalent was being passed as a setter callback directly which
    // would pass the array to the function instead of mapping over state.
    // Fixed to use proper functional update pattern.
    const freeTalentFn=arr=>arr.map(a=>a.busyUntil<=nw?{...a,busy:false,busyUntil:0}:a);
    setMyActors(a=>freeTalentFn(a));
    setMyActresses(a=>freeTalentFn(a));
    setMyDirectors(a=>freeTalentFn(a));
    setMyMusicDirs(a=>freeTalentFn(a));

    // Passive income
    setBalance(b=>b+Math.floor(fanbase*12)+(hasYtChannel?Math.floor(ytSubs*2):0));

    // BUG FIX #3: movies state was stale inside advanceWeek closure.
    // Use functional setter to get the latest movies state for incident selection.
    setMovies(ms=>{
      const inProd=ms.filter(m=>m.status==="in-production"||(m.stageIndex||0)<PROD_STAGES.length-1);
      if(inProd.length>0&&Math.random()<0.12){
        const tm=inProd[Math.floor(Math.random()*inProd.length)];
        const inc=INCIDENTS[Math.floor(Math.random()*INCIDENTS.length)];
        setActiveIncident(inc);
        setIncidentMovie(tm);
      }
      return ms;
    });

    // AI studios release
    if(nw%4===0){
      AI_STUDIOS.forEach(studio=>{
        const pool=AI_TITLES[studio.specialty]||AI_TITLES.Action;
        const title=pick(pool)+(Math.random()>0.6?" 2":"");
        const budget=studio.strength>70?50000000+rnd(0,100000000):5000000+rnd(0,20000000);
        const fest=Math.random()<0.5?pick(FESTIVALS):null;
        const rw=fest?fest.week:nw+3+rnd(0,8);
        setAiReleases(rs=>[...rs,{id:`ai_${Date.now()}_${Math.random()}`,studioId:studio.id,studio:studio.name,studioColor:studio.color,studioIcon:studio.icon,title,genre:studio.specialty,budget,releaseWeek:rw,festTarget:fest?fest.name:null}]);
        addNews(`${studio.icon} ${studio.name} announced "${title}" — Week ${rw}${fest?" ["+fest.name+"]":""}!`);
      });
    }

    // Trend drift
    if(nw%6===0){const g=pick(GENRES);setGenreTrends(t=>({...t,[g]:Math.min(1.5,Math.max(0.6,(t[g]||1)+(Math.random()-0.4)*0.25))}));}

    // BUG FIX #4: musicRights was stale in closure. Use functional setter to read latest.
    setMusicRights(mrs=>{
      mrs.forEach(deal=>{
        if(nw<=deal.expiresWeek){
          const weeklyRoyalty=Math.floor(deal.amount*deal.royaltyRate/52);
          if(weeklyRoyalty>0){setBalance(b=>b+weeklyRoyalty);}
        }
      });
      return mrs;
    });
  };

  // ── HIRE ──────────────────────────────────────────────────────────────────
  const hireActor=(a)=>{
    if(balance<a.salary){notify("❌ Not enough funds!","error");return;}
    setBalance(b=>b-a.salary);setMyActors(x=>[...x,a]);setActorPool(x=>x.filter(p=>p.id!==a.id));
    addNews(`🎭 ${a.name} (${a.tier}-Tier) signed!`);notify(`✅ ${a.name} hired!`);
  };
  const hireActress=(a)=>{
    if(balance<a.salary){notify("❌ Not enough funds!","error");return;}
    setBalance(b=>b-a.salary);setMyActresses(x=>[...x,a]);setActressPool(x=>x.filter(p=>p.id!==a.id));
    addNews(`🎭 ${a.name} (${a.tier}-Tier) signed!`);notify(`✅ ${a.name} hired!`);
  };
  const hireMusic=(m)=>{
    if(balance<m.salary){notify("❌ Not enough funds!","error");return;}
    setBalance(b=>b-m.salary);setMyMusicDirs(x=>[...x,m]);setMusicPool(x=>x.filter(p=>p.id!==m.id));
    notify(`✅ ${m.name} hired!`);
  };

  // ── START MOVIE ──────────────────────────────────────────────────────────
  const startMovie=()=>{
    if(!draft.title){notify("Enter a title!","error");return;}
    if(!draft.leadActorId&&!draft.leadActressId){notify("Cast at least one lead!","error");return;}
    if(!draft.directorId){notify("Assign a director!","error");return;}
    const total=draft.budget+draft.screenCost+(draft.formatCost||0);
    if(total>balance){notify("❌ Insufficient funds!","error");return;}
    const la=myActors.find(a=>a.id===draft.leadActorId);
    const lb=myActresses.find(a=>a.id===draft.leadActressId);
    const egoClash=[la,lb].filter(Boolean).filter(a=>a.tier==="S").length>=2&&Math.random()<0.5;
    setBalance(b=>b-total);
    const busyUntil=week+18;
    if(draft.leadActorId) setMyActors(as=>as.map(a=>a.id===draft.leadActorId?{...a,busy:true,busyUntil}:a));
    if(draft.leadActressId) setMyActresses(as=>as.map(a=>a.id===draft.leadActressId?{...a,busy:true,busyUntil}:a));
    if(draft.directorId) setMyDirectors(ds=>ds.map(d=>d.id===draft.directorId?{...d,busy:true,busyUntil}:d));
    if(draft.musicDirId) setMyMusicDirs(ms=>ms.map(m=>m.id===draft.musicDirId?{...m,busy:true,busyUntil}:m));
    const movie={...draft,id:Date.now(),status:"in-production",stageIndex:0,stageProgress:0,hype:5,marketingSpend:0,egoClash,ytDone:[],incidentLog:[],weekStarted:week,releaseWeek:null};
    setMovies(m=>[...m,movie]);
    addNews(`🎬 "${draft.title}" (${draft.genre}${draft.shootFormat!=="standard"?" • "+SHOOT_FORMATS.find(f=>f.id===draft.shootFormat).label:""}) entered production! Budget: ${fmt(draft.budget)}`);
    notify(`🎬 "${draft.title}" production started!`);
    setShowWizard(false);setWizStep(1);setDraft(emptyDraft);
  };

  // ── SET RELEASE DATE ───────────────────────────────────────────────────────
  const setMovieReleaseDate=(movieId,rw)=>{
    // BUG FIX #5: movies was stale when looking up title inside setMovieReleaseDate.
    // Use functional update pattern and derive title from updated state.
    setMovies(ms=>{
      const found=ms.find(m=>m.id===movieId);
      if(found){
        addNews(`📅 "${found.title}" scheduled for Week ${rw}${getFest(rw)?" — "+getFest(rw).name+"!":""}`);
      }
      return ms.map(m=>m.id===movieId?{...m,releaseWeek:rw,status:"ready"}:m);
    });
    notify(`✅ Release set for Week ${rw}`);
    setShowReleaseDate(null);
  };

  // ── YOUTUBE ──────────────────────────────────────────────────────────────
  const doYT=(movieId,action)=>{
    if(!hasYtChannel&&action.cost>0){notify("Launch your YouTube channel first! (YT tab)","warn");return;}
    if(balance<action.cost){notify("❌ Not enough funds!","error");return;}
    setBalance(b=>b-action.cost);
    setYtSubs(s=>s+action.subs);
    setMovies(ms=>ms.map(m=>m.id===movieId?{...m,hype:Math.min(100,m.hype+action.hype),marketingSpend:(m.marketingSpend||0)+action.cost,ytDone:[...(m.ytDone||[]),action.id]}:m));
    // BUG FIX #6: showYT was being updated with stale movies reference.
    // Fixed to derive updated movie from the movies setter result directly.
    setShowYT(prev=>{
      if(!prev||prev.id!==movieId) return prev;
      return{...prev,hype:Math.min(100,(prev.hype||5)+action.hype),marketingSpend:(prev.marketingSpend||0)+action.cost,ytDone:[...(prev.ytDone||[]),action.id]};
    });
    addNews(`▶ YouTube — ${action.label} published! Hype +${action.hype}% | +${action.subs.toLocaleString()} subs`);
    notify(`▶ ${action.label} live! +${action.hype}% hype`);
  };

  // ── OTT DEAL ──────────────────────────────────────────────────────────────
  const signOTT=(movie,platform,years)=>{
    const baseAmount=platform.bidMin+(platform.bidMax-platform.bidMin)*(movie.hype/100)*(released.find(m=>m.id===movie.id)?released.find(m=>m.id===movie.id).score:50)/100;
    const amount=Math.floor(baseAmount*(0.8+Math.random()*0.4));
    setBalance(b=>b+amount);
    setOttDeals(d=>[...d,{movieId:movie.id,movieTitle:movie.title,platform:platform.name,platformId:platform.id,amount,years,signedWeek:week,expiresWeek:week+years*52}]);
    addNews(`📺 "${movie.title}" OTT deal signed with ${platform.name}! ${fmt(amount)} for ${years} year${years>1?"s":""}!`);
    notify(`✅ ${platform.name} deal: ${fmt(amount)}!`,"success");
    setShowOTT(null);
  };

  // ── MUSIC RIGHTS ──────────────────────────────────────────────────────────
  const sellMusicRights=(movie,platform)=>{
    if(platform.id==="own_yt"){
      if(!hasYtChannel){notify("You need a YouTube channel first!","warn");return;}
      setMusicRights(r=>[...r,{movieId:movie.id,movieTitle:movie.title,platform:"Own YouTube",platformId:"own_yt",amount:0,royaltyRate:platform.royaltyRate,signedWeek:week,expiresWeek:week+520,selfPublished:true}]);
      addNews(`🎵 "${movie.title}" music self-published on own YouTube channel! Earning ${Math.round(platform.royaltyRate*100)}% royalties.`);
      notify(`🎵 Music self-published! Earning ${Math.round(platform.royaltyRate*100)}% royalties`,"success");
    } else {
      const musicMd=myMusicDirs.find(m=>m.id===movie.musicDirId);
      const tierBonus=musicMd?({S:1.4,A:1.2,B:1.0,C:0.8,D:0.6}[musicMd.tier]||1.0):0.8;
      const amount=Math.floor((platform.bidMin+(platform.bidMax-platform.bidMin)*tierBonus*Math.random())*(movie.hype/100+0.5));
      setBalance(b=>b+amount);
      setMusicRights(r=>[...r,{movieId:movie.id,movieTitle:movie.title,platform:platform.name,platformId:platform.id,amount,royaltyRate:platform.royaltyRate,signedWeek:week,expiresWeek:week+104}]);
      addNews(`🎵 "${movie.title}" music rights sold to ${platform.name} for ${fmt(amount)}!`);
      notify(`🎵 Music rights sold: ${fmt(amount)}!`,"success");
    }
    setShowMusicRights(null);
  };

  // ── INCIDENT RESOLVE ──────────────────────────────────────────────────────
  const resolveIncident=(choice)=>{
    if(!incidentMovie||!activeIncident) return;
    const mId=incidentMovie.id;
    const cost=choice.cost==="30pct"?Math.floor(incidentMovie.budget*0.3):choice.cost||0;
    if(cost>balance){notify("❌ Not enough funds!","error");return;}
    if(cost>0) setBalance(b=>b-cost);
    setMovies(ms=>ms.map(m=>{
      if(m.id!==mId) return m;
      let nm={...m,incidentLog:[...(m.incidentLog||[]),{title:activeIncident.title,choice:choice.l,w:week}]};
      if(choice.eff==="delay2") nm.scheduledDelay=(nm.scheduledDelay||0)+2;
      if(choice.eff==="delay3") nm.scheduledDelay=(nm.scheduledDelay||0)+3;
      if(choice.eff==="delay4") nm.scheduledDelay=(nm.scheduledDelay||0)+4;
      if(choice.eff==="q-5") nm.qualityPenalty=(nm.qualityPenalty||0)+5;
      if(choice.eff==="q-8") nm.qualityPenalty=(nm.qualityPenalty||0)+8;
      if(choice.eff==="q-10") nm.qualityPenalty=(nm.qualityPenalty||0)+10;
      if(choice.eff==="q-15") nm.qualityPenalty=(nm.qualityPenalty||0)+15;
      if(choice.eff==="q+5") nm.qualityBonus=(nm.qualityBonus||0)+5;
      if(choice.eff==="hype+20") nm.hype=Math.min(100,(nm.hype||5)+20);
      if(choice.eff==="hype+10") nm.hype=Math.min(100,(nm.hype||5)+10);
      if(choice.eff==="hype+5") nm.hype=Math.min(100,(nm.hype||5)+5);
      return nm;
    }));
    addNews(`⚡ Incident "${activeIncident.title}" on "${incidentMovie.title}" — resolved: ${choice.l}${cost>0?" (cost: "+fmt(cost)+")":""}`);
    notify(`✅ Incident resolved: ${choice.l}`);
    setActiveIncident(null);setIncidentMovie(null);
  };

  // ── RELEASE MOVIE ─────────────────────────────────────────────────────────
  const releaseMovie=(movie)=>{
    if(!movie.releaseWeek){setShowReleaseDate(movie);return;}
    const la=myActors.find(a=>a.id===movie.leadActorId);
    const lb=myActresses.find(a=>a.id===movie.leadActressId);
    const supA=myActors.filter(a=>(movie.supportingActorIds||[]).includes(a.id));
    const supB=myActresses.filter(a=>(movie.supportingActressIds||[]).includes(a.id));
    const dir=myDirectors.find(d=>d.id===movie.directorId);
    const md=myMusicDirs.find(m=>m.id===movie.musicDirId);
    const sc=myScripts.find(s=>s.id===movie.scriptId);
    const distrib=DISTRIBUTION.find(d=>d.id===movie.distributionId)||DISTRIBUTION[1];
    const fmt_data=SHOOT_FORMATS.find(f=>f.id===movie.shootFormat)||SHOOT_FORMATS[0];

    let score=42;
    const tm=t=>TIERS[t]?TIERS[t].mult:1;
    if(la) score+=(la.pop+la.skill)*0.12*tm(la.tier);
    if(lb) score+=(lb.pop+lb.skill)*0.12*tm(lb.tier);
    [...supA,...supB].forEach(a=>score+=(a.pop+a.skill)*0.04*tm(a.tier));
    if(dir) score+=dir.skill*0.15*tm(dir.tier);
    if(md) score+=md.pop*0.03+md.hitRate*0.04;
    if(sc) score+=sc.quality*0.08;
    score+=(movie.hype/100)*28+distrib.bonus+fmt_data.qualityBonus;
    score-=(movie.qualityPenalty||0);score+=(movie.qualityBonus||0);
    if(movie.egoClash) score-=8;
    score*=(genreTrends[movie.genre]||1.0);
    if(movie.franchiseId){const fr=franchises.find(f=>f.id===movie.franchiseId);if(fr){const fat=Math.max(0,fr.installments-2)*5;score+=5-fat;}}
    score=Math.min(100,Math.max(5,score+(Math.random()-0.5)*14));

    const fest=getFest(movie.releaseWeek);
    const festBonus=fest?fest.bonus:1.0;
    const aiC=aiReleases.filter(r=>Math.abs(r.releaseWeek-movie.releaseWeek)<=3);
    const clashPen=aiC.some(a=>a.releaseWeek===movie.releaseWeek)?0.58:aiC.length?0.86:1.0;
    const screenMult={500:0.6,1500:1.0,3000:1.5,5000:2.0}[movie.screens]||1.0;
    let totalBO=0;const regBO={};
    REGIONS.forEach(r=>{
      if(movie.distributionId==="ott"&&r!=="India") return;
      const rm=REGION_MULT[r]||1.0;
      const rw=movie.regionalDates?movie.regionalDates[r]||movie.releaseWeek:movie.releaseWeek;
      const rf=getFest(rw);const rfb=rf?rf.bonus:1.0;
      const base=movie.budget*(score/50)*festBonus*rfb*clashPen*screenMult*rm*fmt_data.revenueBonus;
      const bo=Math.floor(base*(0.7+Math.random()*0.55));
      regBO[r]=bo;totalBO+=bo;
    });
    const netBO=Math.floor(totalBO*(1-distrib.cut));
    const profit=netBO-movie.budget-(movie.screenCost||0)-(movie.formatCost||0)-(movie.marketingSpend||0);
    const grade=score>=88?"🏆 All-Time Blockbuster":score>=75?"🌟 Blockbuster":score>=62?"✅ Hit":score>=48?"👍 Average":"💀 Flop";

    const rm={...movie,score:Math.round(score),boxOffice:netBO,grossBO:totalBO,profit,grade,actualWeek:week,festival:fest?fest.name:null,clashCount:aiC.length,festBonus,clashPenalty:clashPen,distribCut:distrib.cut,regBO,formatName:fmt_data.label};
    setReleased(r=>[rm,...r]);
    setMovies(ms=>ms.filter(x=>x.id!==movie.id));
    setBalance(b=>b+netBO);
    setFanbase(f=>f+Math.floor(score*1500));
    setReputation(r=>Math.min(100,Math.max(0,r+(score>62?7:-5))));
    const fIds=[movie.leadActorId,movie.leadActressId].filter(Boolean);
    setMyActors(as=>as.map(a=>fIds.includes(a.id)?{...a,busy:false,busyUntil:0}:a));
    setMyActresses(as=>as.map(a=>fIds.includes(a.id)?{...a,busy:false,busyUntil:0}:a));
    if(movie.directorId) setMyDirectors(ds=>ds.map(d=>d.id===movie.directorId?{...d,busy:false,busyUntil:0}:d));
    if(movie.musicDirId) setMyMusicDirs(ms=>ms.map(m=>m.id===movie.musicDirId?{...m,busy:false,busyUntil:0}:m));
    if(score>=80&&Math.random()<0.45){const aw=pick(["Best Picture","Best Director","Best Actor","Best Actress","Best Screenplay","Best VFX","Best Music"]);setAwards(a=>[...a,{movie:movie.title,award:aw,week}]);addNews(`🏆 "${movie.title}" wins ${aw}!`);}
    if(movie.franchiseId) setFranchises(fs=>fs.map(f=>f.id===movie.franchiseId?{...f,installments:f.installments+1,totalBO:f.totalBO+netBO}:f));
    addNews(`🎬 "${movie.title}" ${fmt_data.id!=="standard"?"["+fmt_data.label+"] ":""}released! ${grade} | BO: ${fmt(netBO)} | Profit: ${profit>0?"+":""}${fmt(profit)}${fest?" | "+fest.name:""}`);
    notify(`🎬 ${grade} — "${movie.title}"`,score>=62?"success":"info");
  };

  // ── CREATE FRANCHISE ──────────────────────────────────────────────────────
  const createFranchise=(movie,name)=>{
    const fr={id:Date.now(),name,baseMovie:movie.title,installments:1,totalBO:movie.boxOffice,movies:[]};
    setFranchises(f=>[...f,fr]);
    addNews(`🎬 Franchise "${name}" launched based on "${movie.title}"!`);
    notify(`🎬 Franchise "${name}" created!`);
    setShowFranchiseCreate(null);
  };

  const getAiClashes=rw=>aiReleases.filter(r=>Math.abs(r.releaseWeek-rw)<=3);

  // ── FILTERED TALENT ────────────────────────────────────────────────────────
  const filteredActors=useMemo(()=>actorPool.filter(a=>{
    if(actorFilter.tier!=="All"&&a.tier!==actorFilter.tier) return false;
    if(actorFilter.search&&!a.name.toLowerCase().includes(actorFilter.search.toLowerCase())) return false;
    if(actorFilter.genre!=="All"&&!a.genre.includes(actorFilter.genre)) return false;
    return true;
  }),[actorPool,actorFilter]);

  const filteredActresses=useMemo(()=>actressPool.filter(a=>{
    if(actressFilter.tier!=="All"&&a.tier!==actressFilter.tier) return false;
    if(actressFilter.search&&!a.name.toLowerCase().includes(actressFilter.search.toLowerCase())) return false;
    if(actressFilter.genre!=="All"&&!a.genre.includes(actressFilter.genre)) return false;
    return true;
  }),[actressPool,actressFilter]);

  const filteredMusic=useMemo(()=>musicPool.filter(m=>{
    if(musicFilter.tier!=="All"&&m.tier!==musicFilter.tier) return false;
    if(musicFilter.search&&!m.name.toLowerCase().includes(musicFilter.search.toLowerCase())) return false;
    return true;
  }),[musicPool,musicFilter]);

  // ── CONSTANTS ──────────────────────────────────────────────────────────────
  const STAGE_COLOR={"in-production":"#d97706",ready:"#16a34a","awaiting-release-date":"#7c3aed"};
  const NB={info:"#1e293b",error:"#450a0a",warn:"#422006",success:"#052e16"};
  const TABS=[{id:"dashboard",l:"🏠 HQ"},{id:"movies",l:"🎬 Movies"},{id:"talent",l:"🎭 Talent"},{id:"youtube",l:"▶ YouTube"},{id:"ott",l:"📺 OTT"},{id:"music",l:"🎵 Music"},{id:"calendar",l:"📅 Calendar"},{id:"franchise",l:"🏆 Franchise"},{id:"market",l:"🛒 Market"},{id:"news",l:"📰 News"},{id:"stats",l:"📊 Stats"}];

  return (
    <div className="min-h-screen text-gray-100" style={{background:"#070710",fontFamily:"system-ui,sans-serif"}}>

      {/* ── NOTIFICATIONS ── */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-xs pointer-events-none">
        {notifs.map(n=><div key={n.id} className="rounded-xl px-4 py-2.5 text-sm shadow-2xl border border-gray-700/50 pointer-events-auto" style={{background:NB[n.type]||NB.info}}>{n.msg}</div>)}
      </div>

      {/* ── INCIDENT MODAL ── */}
      {activeIncident&&incidentMovie&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.92)"}}>
          <div className="rounded-2xl border border-red-800 w-full max-w-md p-6 space-y-4" style={{background:"#1a0505"}}>
            <div className="text-5xl text-center">{activeIncident.icon}</div>
            <h3 className="text-xl font-bold text-center text-red-400">Production Incident!</h3>
            <div className="text-center">
              <div className="font-bold text-white text-lg">{activeIncident.title}</div>
              <div className="text-gray-400 text-sm mt-0.5">Movie: "{incidentMovie.title}"</div>
              <div className="text-gray-300 text-sm mt-2">{activeIncident.desc}</div>
            </div>
            <div className="space-y-2">
              {activeIncident.choices.map((c,i)=>(
                <button key={i} onClick={()=>resolveIncident(c)} className="w-full p-3 rounded-xl border border-gray-700 hover:border-red-600 text-left transition-all" style={{background:"#2a1010"}}>
                  <div className="font-bold text-white text-sm">{c.l}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Cost: {c.cost==="30pct"?`30% of budget = ${fmt(incidentMovie.budget*0.3)}`:c.cost>0?fmt(c.cost):"Free"}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SET RELEASE DATE MODAL ── */}
      {showReleaseDate&&(
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.9)"}} onClick={()=>setShowReleaseDate(null)}>
          <div className="rounded-2xl border border-green-700 w-full max-w-md p-6 space-y-4" style={{background:"#0a1a0a"}} onClick={e=>e.stopPropagation()}>
            <h3 className="font-bold text-white text-lg">📅 Set Release Date</h3>
            <p className="text-sm text-gray-400">"{showReleaseDate.title}" is ready! Choose your release week.</p>
            <div className="grid grid-cols-4 gap-1.5 max-h-56 overflow-y-auto">
              {Array.from({length:36},(_,i)=>week+i+1).map(w=>{
                const fest=getFest(w);const cl=getAiClashes(w);
                return(
                  <button key={w} onClick={()=>setMovieReleaseDate(showReleaseDate.id,w)} className="p-2 rounded-lg border text-xs transition-all hover:border-green-500" style={{borderColor:cl.length?"#92400e":fest?"#166534":"#374151",background:fest?"#052e16":cl.length?"rgba(120,53,15,0.2)":"#1a1a26"}}>
                    <div className="font-bold">Wk {w}</div>
                    {fest&&<div style={{color:"#4ade80",fontSize:"10px"}} className="truncate">{fest.name}</div>}
                    {cl.length>0&&<div style={{color:"#fbbf24",fontSize:"10px"}}>x{cl.length}</div>}
                  </button>
                );
              })}
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-2">Festival Shortcuts</div>
              <div className="grid grid-cols-3 gap-2">
                {FESTIVALS.map(f=><button key={f.name} onClick={()=>setMovieReleaseDate(showReleaseDate.id,f.week)} className="p-2 rounded-lg border text-xs text-left hover:border-green-500" style={{borderColor:"#166534",background:"rgba(5,46,22,0.4)"}}>
                  <div style={{color:"#4ade80"}}>{f.name}</div>
                  <div className="text-gray-400">Wk {f.week}</div>
                  <div style={{color:"#fbbf24"}}>+{Math.round((f.bonus-1)*100)}%</div>
                </button>)}
              </div>
            </div>
            <button onClick={()=>setShowReleaseDate(null)} className="w-full py-2 rounded-lg text-sm border border-gray-700">Cancel — Set Later</button>
          </div>
        </div>
      )}

      {/* ── POSTPONE MODAL ── */}
      {showPostpone&&(
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.88)"}} onClick={()=>setShowPostpone(null)}>
          <div className="rounded-2xl border border-gray-700 w-full max-w-sm p-6 space-y-4" style={{background:"#10101a"}} onClick={e=>e.stopPropagation()}>
            <h3 className="font-bold text-white">📅 Change Release Date</h3>
            <p className="text-xs text-gray-400">"{showPostpone.title}" — Current: Week {showPostpone.releaseWeek||"Not set"}</p>
            <div className="grid grid-cols-4 gap-1.5 max-h-52 overflow-y-auto">
              {Array.from({length:32},(_,i)=>week+i+1).map(w=>{
                const fest=getFest(w);const cl=getAiClashes(w);
                return(
                  <button key={w} onClick={()=>{setMovies(ms=>ms.map(m=>m.id===showPostpone.id?{...m,releaseWeek:w}:m));notify(`📅 Moved to Week ${w}`);setShowPostpone(null);}} className="p-2 rounded-lg border text-xs hover:border-purple-500" style={{borderColor:cl.length?"#92400e":fest?"#166534":"#374151",background:fest?"#052e16":"#1a1a26"}}>
                    <div className="font-bold">Wk {w}</div>
                    {fest&&<div style={{color:"#4ade80",fontSize:"10px"}} className="truncate">{fest.name}</div>}
                    {cl.length>0&&<div style={{color:"#fbbf24",fontSize:"10px"}}>x</div>}
                  </button>
                );
              })}
            </div>
            <button onClick={()=>setShowPostpone(null)} className="w-full py-2 rounded-lg border border-gray-700 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* ── OTT DEAL MODAL ── */}
      {showOTT&&(
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.92)"}} onClick={()=>setShowOTT(null)}>
          <div className="rounded-2xl border border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-3" style={{background:"#10101a"}} onClick={e=>e.stopPropagation()}>
            <h3 className="font-bold text-white text-lg">📺 OTT Platform Deals</h3>
            <p className="text-xs text-gray-400">"{showOTT.title}" — Hype: {showOTT.hype||5}%</p>
            <div className="text-xs text-yellow-400">Higher hype and score = better bids.</div>
            {OTT_PLATFORMS.map(plat=>{
              const existingDeal=ottDeals.find(d=>d.movieId===showOTT.id&&d.platformId===plat.id);
              const relMovieScore=(released.find(m=>m.id===showOTT.id)||{score:50}).score;
              const estimatedBid=Math.floor((plat.bidMin+(plat.bidMax-plat.bidMin)*(showOTT.hype/100)*(relMovieScore/100))*(0.8+Math.random()*0.4));
              return(
                <div key={plat.id} className="rounded-xl border p-3" style={{borderColor:existingDeal?"#166534":"#374151",background:existingDeal?"rgba(22,101,52,0.15)":"#1a1a26"}}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{plat.icon}</span>
                    <div>
                      <div className="font-bold text-sm" style={{color:plat.color}}>{plat.name}</div>
                      <div className="text-xs text-gray-500">{plat.subscribers}</div>
                    </div>
                    {existingDeal&&<span className="ml-auto text-xs text-green-400">Signed for {existingDeal.years}yr</span>}
                  </div>
                  <div className="text-xs text-gray-400 mb-2">Est. offer: <span style={{color:"#fbbf24"}}>{fmt(estimatedBid)}</span></div>
                  {!existingDeal&&(
                    <div className="flex gap-1.5 flex-wrap">
                      {plat.years.map(y=>(
                        <button key={y} onClick={()=>signOTT(showOTT,plat,y)} className="px-2.5 py-1 rounded-lg text-xs font-bold text-white hover:opacity-90 transition-all" style={{background:plat.color}}>
                          {y}yr — {fmt(Math.floor(estimatedBid*y*(1+0.1*(y-1))))}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <button onClick={()=>setShowOTT(null)} className="w-full py-2 rounded-lg border border-gray-700 text-sm">Close</button>
          </div>
        </div>
      )}

      {/* ── MUSIC RIGHTS MODAL ── */}
      {showMusicRights&&(
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.92)"}} onClick={()=>setShowMusicRights(null)}>
          <div className="rounded-2xl border border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-3" style={{background:"#10101a"}} onClick={e=>e.stopPropagation()}>
            <h3 className="font-bold text-white text-lg">🎵 Sell Music Rights</h3>
            <p className="text-xs text-gray-400">"{showMusicRights.title}" — Music Director: {(myMusicDirs.find(m=>m.id===showMusicRights.musicDirId)||{name:"Original Score"}).name}</p>
            {!hasYtChannel&&<div className="text-xs text-yellow-400 p-2 rounded border border-yellow-700" style={{background:"rgba(202,138,4,0.1)"}}>Launch your YouTube channel (YT tab) to self-publish and earn 30% royalties!</div>}
            {MUSIC_PLATFORMS.map(plat=>{
              const existing=musicRights.find(r=>r.movieId===showMusicRights.id&&r.platformId===plat.id);
              const md=myMusicDirs.find(m=>m.id===showMusicRights.musicDirId);
              // BUG FIX #7: optional chaining on tierBonus lookup replaced with safe ternary
              const tierBonus=md?({S:1.4,A:1.2,B:1.0,C:0.8,D:0.6}[md.tier]||1.0):0.8;
              const est=plat.id==="own_yt"?0:Math.floor((plat.bidMin+(plat.bidMax-plat.bidMin)*tierBonus*(showMusicRights.hype/100+0.3)));
              return(
                <div key={plat.id} className="rounded-xl border p-3 transition-all" style={{borderColor:existing?"#166534":"#374151",background:existing?"rgba(22,101,52,0.1)":"#1a1a26"}}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{plat.icon}</span>
                      <div>
                        <div className="font-bold text-sm" style={{color:plat.color}}>{plat.name}</div>
                        <div className="text-xs text-gray-500">{plat.desc}</div>
                        <div className="text-xs mt-0.5" style={{color:"#a78bfa"}}>Ongoing royalties: {Math.round(plat.royaltyRate*100)}%/yr</div>
                      </div>
                    </div>
                    {existing?<span className="text-xs text-green-400 shrink-0">Signed</span>:(
                      <div className="text-right shrink-0">
                        {plat.id!=="own_yt"&&<div className="text-xs mb-1" style={{color:"#fbbf24"}}>{fmt(est)} upfront</div>}
                        <button onClick={()=>sellMusicRights(showMusicRights,plat)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:plat.id==="own_yt"?"#FF6D00":plat.color}}>
                          {plat.id==="own_yt"?"Self Publish":"Sign Deal"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <button onClick={()=>setShowMusicRights(null)} className="w-full py-2 rounded-lg border border-gray-700 text-sm">Close</button>
          </div>
        </div>
      )}

      {/* ── YOUTUBE MODAL ── */}
      {showYT&&(
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.92)"}} onClick={()=>setShowYT(null)}>
          <div className="rounded-2xl border border-red-900 w-full max-w-lg max-h-[92vh] overflow-y-auto p-6 space-y-3" style={{background:"#10101a"}} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">▶</span>
              <div>
                <h3 className="font-bold text-white text-lg">YouTube Campaign</h3>
                <div className="text-xs text-gray-400">"{showYT.title}" • Release: {showYT.releaseWeek?"Week "+showYT.releaseWeek:"Not set"}</div>
                <div className="text-xs text-red-400">Channel: {ytSubs.toLocaleString()} subscribers</div>
              </div>
            </div>
            {!hasYtChannel&&<div className="text-xs p-3 rounded-xl border border-yellow-700 text-yellow-400" style={{background:"rgba(202,138,4,0.1)"}}>You need to launch your YouTube channel first! Go to the YouTube tab.</div>}
            <div className="text-xs text-gray-500 mb-1">Recommended: Release content gradually — teasers first, trailer last.</div>
            <div className="space-y-2">
              {YT_ACTIONS.map(act=>{
                const done=(showYT.ytDone||[]).includes(act.id);
                const weeksUntil=showYT.releaseWeek?showYT.releaseWeek-week:null;
                const tooEarly=act.weeksBeforeRelease&&weeksUntil&&weeksUntil>act.weeksBeforeRelease+2;
                const recommended=act.weeksBeforeRelease&&weeksUntil&&Math.abs(weeksUntil-act.weeksBeforeRelease)<=2;
                return(
                  <div key={act.id} className="flex items-center gap-3 p-3 rounded-xl border transition-all" style={{borderColor:done?"#166534":recommended?"#f59e0b":"#374151",background:done?"rgba(22,101,52,0.1)":recommended?"rgba(245,158,11,0.08)":"#1a1a26"}}>
                    <span className="text-2xl">{act.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{act.label}</span>
                        {done&&<span className="text-xs text-green-400">Done</span>}
                        {recommended&&!done&&<span className="text-xs text-yellow-400">Ideal Now!</span>}
                        {tooEarly&&!done&&<span className="text-xs text-gray-500">Too Early</span>}
                      </div>
                      <div className="text-xs text-gray-500">{act.desc}</div>
                      <div className="flex gap-3 mt-0.5 text-xs">
                        <span style={{color:"#fbbf24"}}>+{act.hype}% hype</span>
                        <span style={{color:"#f87171"}}>+{act.subs.toLocaleString()} subs</span>
                        <span className="text-gray-600">{act.cost>0?fmt(act.cost):"Free"}</span>
                        {act.weeksBeforeRelease&&<span className="text-gray-600">Best: {act.weeksBeforeRelease}wk before</span>}
                      </div>
                    </div>
                    {!done&&<button onClick={()=>doYT(showYT.id,act)} disabled={!hasYtChannel} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shrink-0 disabled:opacity-40" style={{background:"#dc2626"}}>Publish</button>}
                  </div>
                );
              })}
            </div>
            <button onClick={()=>setShowYT(null)} className="w-full py-2 rounded-lg border border-gray-700 text-sm">Close</button>
          </div>
        </div>
      )}

      {/* ── FRANCHISE CREATE MODAL ── */}
      {showFranchiseCreate&&(
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.88)"}} onClick={()=>setShowFranchiseCreate(null)}>
          <div className="rounded-2xl border border-yellow-800 w-full max-w-sm p-6 space-y-4" style={{background:"#10101a"}} onClick={e=>e.stopPropagation()}>
            <h3 className="font-bold text-yellow-400 text-lg">🎬 Create Franchise</h3>
            <p className="text-xs text-gray-400">Turn "{showFranchiseCreate.title}" into a cinematic universe!</p>
            <input placeholder="Franchise name (e.g. Iron Galaxy Universe)" className="w-full rounded-lg px-3 py-2.5 text-white text-sm border border-gray-700 outline-none focus:border-yellow-500" style={{background:"#1a1a26"}} id="frname"/>
            <div className="text-xs space-y-1 text-gray-500">
              <div>Films 1-2: +5 score bonus</div>
              <div>Film 3+: Franchise fatigue sets in (-5 pts each)</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>{const n=document.getElementById("frname").value.trim();if(n)createFranchise(showFranchiseCreate,n);}} className="flex-1 py-2 rounded-lg font-bold text-sm text-white" style={{background:"#ca8a04"}}>Launch</button>
              <button onClick={()=>setShowFranchiseCreate(null)} className="px-4 py-2 rounded-lg text-sm border border-gray-700">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── NEW MOVIE WIZARD ── */}
      {showWizard&&(
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.92)"}} onClick={()=>{setShowWizard(false);setWizStep(1);setDraft(emptyDraft);}}>
          <div className="rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[94vh] overflow-y-auto" style={{background:"#10101a"}} onClick={e=>e.stopPropagation()}>
            <div className="p-5 border-b border-gray-800 sticky top-0 z-10" style={{background:"#10101a"}}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">🎬 Dream Movie — Step {wizStep}/6</h3>
                <button onClick={()=>{setShowWizard(false);setWizStep(1);setDraft(emptyDraft);}} className="text-gray-500 hover:text-white text-xl">x</button>
              </div>
              <div className="flex gap-1">{["Story","Cast","Crew","Format","Distrib","Production"].map((s,i)=><div key={i} className="flex-1 h-1.5 rounded-full" style={{background:i<wizStep?"#dc2626":"#374151"}}/>)}</div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">{["Story","Cast","Crew","Format","Distrib","Production"].map((s,i)=><span key={i} style={{color:i+1===wizStep?"#f87171":""}}>{s}</span>)}</div>
            </div>
            <div className="p-5 space-y-4">

              {wizStep===1&&(<>
                <div><label className="text-xs text-gray-400 mb-1 block">Movie Title *</label>
                  <input placeholder="Enter your movie title..." value={draft.title} onChange={e=>setDraft(d=>({...d,title:e.target.value}))} className="w-full rounded-lg px-3 py-2.5 text-white text-sm border border-gray-700 outline-none focus:border-red-500" style={{background:"#1a1a26"}}/>
                </div>
                <div><label className="text-xs text-gray-400 mb-1 block">Synopsis</label>
                  <textarea placeholder="Brief synopsis..." value={draft.synopsis} onChange={e=>setDraft(d=>({...d,synopsis:e.target.value}))} rows={2} className="w-full rounded-lg px-3 py-2 text-white text-sm border border-gray-700 outline-none resize-none" style={{background:"#1a1a26"}}/>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[["Genre","genre",GENRES.map(g=>({v:g,l:`${g}${(genreTrends[g]||1)>=1.2?"🔥":(genreTrends[g]||1)<=0.8?"📉":""}`}))],["Theme","theme",THEMES.map(t=>({v:t,l:t}))],["Rating","rating",RATINGS.map(r=>({v:r,l:r}))]].map(([label,key,opts])=>(
                    <div key={key}><label className="text-xs text-gray-400 mb-1 block">{label}</label>
                      <select value={draft[key]} onChange={e=>setDraft(d=>({...d,[key]:e.target.value}))} className="w-full rounded-lg px-3 py-2.5 text-white text-sm border border-gray-700 outline-none" style={{background:"#1a1a26"}}>
                        {opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Script: <span style={{color:"#fbbf24"}}>{draft.scriptId?(myScripts.find(s=>s.id===draft.scriptId)||{title:"Unknown"}).title:"Original Screenplay"}</span></label>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    <label className="flex items-center gap-2 p-2 rounded-lg border border-gray-700 cursor-pointer" style={{background:"#1a1a26"}}><input type="radio" name="sc" checked={!draft.scriptId} onChange={()=>setDraft(d=>({...d,scriptId:null}))} className="accent-gray-400"/><span className="text-sm text-gray-400">Original Screenplay (free)</span></label>
                    {myScripts.map(s=><label key={s.id} className="flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all" style={{borderColor:draft.scriptId===s.id?"#dc2626":"#374151",background:draft.scriptId===s.id?"rgba(220,38,38,0.1)":"#1a1a26"}}>
                      <input type="radio" name="sc" checked={draft.scriptId===s.id} onChange={()=>setDraft(d=>({...d,scriptId:s.id,genre:s.genre,rating:s.rating}))} className="accent-red-500"/>
                      <div className="flex-1"><span className="text-sm font-bold">{s.title}</span><span className="text-xs text-gray-500 ml-2">{s.genre} • Q:{s.quality} • {s.rating}</span></div>
                    </label>)}
                  </div>
                </div>
                {franchises.length>0&&<div><label className="text-xs text-gray-400 mb-1 block">Franchise Tie-in</label>
                  <select value={draft.franchiseId||""} onChange={e=>setDraft(d=>({...d,franchiseId:+e.target.value||null}))} className="w-full rounded-lg px-3 py-2.5 text-white text-sm border border-gray-700 outline-none" style={{background:"#1a1a26"}}>
                    <option value="">— Standalone Film —</option>
                    {franchises.map(f=>{const fat=Math.max(0,f.installments-2);return<option key={f.id} value={f.id}>{f.name} ({f.installments} films{fat>0?` -${fat*5}pts`:""}) </option>;})}
                  </select>
                </div>}
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Budget: <span style={{color:"#fbbf24"}}>{fmt(draft.budget)}</span>{draft.budget>100000000&&<span style={{color:"#f87171"}}> High risk</span>}</label>
                  <input type="range" min={3000000} max={300000000} step={1000000} value={draft.budget} onChange={e=>setDraft(d=>({...d,budget:+e.target.value}))} className="w-full accent-red-500"/>
                  <div className="flex justify-between text-xs text-gray-600 mt-0.5"><span>Rs.30L</span><span>Rs.10Cr</span><span>Rs.30Cr Mega</span></div>
                </div>
              </>)}

              {wizStep===2&&(<>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Lead Actor (Male)</label>
                  <input placeholder="Search actors..." className="w-full rounded-lg px-3 py-2 text-sm border border-gray-700 text-white outline-none mb-2" style={{background:"#1a1a26"}} onChange={e=>setActorFilter(f=>({...f,search:e.target.value}))}/>
                  <div className="flex gap-1 mb-2 flex-wrap">{["All","S","A","B","C","D"].map(t=><button key={t} onClick={()=>setActorFilter(f=>({...f,tier:t}))} className="px-2 py-0.5 rounded text-xs border" style={{borderColor:actorFilter.tier===t?clr(t):"#374151",color:actorFilter.tier===t?clr(t):"#6b7280",background:actorFilter.tier===t?(TIERS[t]?TIERS[t].glow:"#1a1a26"):"#1a1a26"}}>{t}</button>)}</div>
                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {myActors.filter(a=>!actorFilter.search||a.name.toLowerCase().includes(actorFilter.search.toLowerCase())).filter(a=>actorFilter.tier==="All"||a.tier===actorFilter.tier).map(a=>{const T=TIERS[a.tier];return(
                      <label key={a.id} className="flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all" style={{borderColor:draft.leadActorId===a.id?"#3b82f6":"#374151",background:draft.leadActorId===a.id?"rgba(59,130,246,0.1)":"#1a1a26",opacity:a.busy?0.5:1}}>
                        <input type="radio" name="la" checked={draft.leadActorId===a.id} onChange={()=>!a.busy&&setDraft(d=>({...d,leadActorId:a.id}))} disabled={a.busy} className="accent-blue-500"/>
                        {/* BUG FIX #8: T?.glow and T?.color replaced with safe ternary to avoid TS optional chaining errors */}
                        <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{a.tier}</span>
                        <div className="flex-1"><div className="text-sm font-bold">{a.name}{a.busy&&<span className="text-xs text-red-400 ml-2">BUSY</span>}</div>
                          <div className="text-xs text-gray-500">Pop:{a.pop} Skill:{a.skill} {fmt(a.salary)}</div>
                        </div>
                      </label>
                    );})}
                    {!myActors.length&&<p className="text-xs text-gray-600">No actors hired. Go to Talent tab.</p>}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Lead Actress (Female)</label>
                  <input placeholder="Search actresses..." className="w-full rounded-lg px-3 py-2 text-sm border border-gray-700 text-white outline-none mb-2" style={{background:"#1a1a26"}} onChange={e=>setActressFilter(f=>({...f,search:e.target.value}))}/>
                  <div className="flex gap-1 mb-2 flex-wrap">{["All","S","A","B","C","D"].map(t=><button key={t} onClick={()=>setActressFilter(f=>({...f,tier:t}))} className="px-2 py-0.5 rounded text-xs border" style={{borderColor:actressFilter.tier===t?clr(t):"#374151",color:actressFilter.tier===t?clr(t):"#6b7280"}}>{t}</button>)}</div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {myActresses.filter(a=>!actressFilter.search||a.name.toLowerCase().includes(actressFilter.search.toLowerCase())).filter(a=>actressFilter.tier==="All"||a.tier===actressFilter.tier).map(a=>{const T=TIERS[a.tier];return(
                      <label key={a.id} className="flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all" style={{borderColor:draft.leadActressId===a.id?"#ec4899":"#374151",background:draft.leadActressId===a.id?"rgba(236,72,153,0.1)":"#1a1a26",opacity:a.busy?0.5:1}}>
                        <input type="radio" name="lb" checked={draft.leadActressId===a.id} onChange={()=>!a.busy&&setDraft(d=>({...d,leadActressId:a.id}))} disabled={a.busy} className="accent-pink-500"/>
                        <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{a.tier}</span>
                        <div className="flex-1"><div className="text-sm font-bold">{a.name}{a.busy&&<span className="text-xs text-red-400 ml-2">BUSY</span>}</div>
                          <div className="text-xs text-gray-500">Pop:{a.pop} Skill:{a.skill} {fmt(a.salary)}</div>
                        </div>
                      </label>
                    );})}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Supporting Cast (max 4 each)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Supporting Actors</div>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {myActors.filter(a=>a.id!==draft.leadActorId&&!a.busy).slice(0,20).map(a=><label key={a.id} className="flex items-center gap-1.5 p-1.5 rounded border cursor-pointer text-xs" style={{borderColor:(draft.supportingActorIds||[]).includes(a.id)?"#eab308":"#374151",background:"#1a1a26"}}>
                          <input type="checkbox" checked={(draft.supportingActorIds||[]).includes(a.id)} onChange={e=>setDraft(d=>({...d,supportingActorIds:e.target.checked?[...(d.supportingActorIds||[]),a.id].slice(0,4):(d.supportingActorIds||[]).filter(x=>x!==a.id)}))} className="accent-yellow-500"/>
                          <span className="text-xs px-1 rounded font-bold" style={{color:clr(a.tier)}}>{a.tier}</span>
                          <span className="truncate">{a.name}</span>
                        </label>)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Supporting Actresses</div>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {myActresses.filter(a=>a.id!==draft.leadActressId&&!a.busy).slice(0,20).map(a=><label key={a.id} className="flex items-center gap-1.5 p-1.5 rounded border cursor-pointer text-xs" style={{borderColor:(draft.supportingActressIds||[]).includes(a.id)?"#eab308":"#374151",background:"#1a1a26"}}>
                          <input type="checkbox" checked={(draft.supportingActressIds||[]).includes(a.id)} onChange={e=>setDraft(d=>({...d,supportingActressIds:e.target.checked?[...(d.supportingActressIds||[]),a.id].slice(0,4):(d.supportingActressIds||[]).filter(x=>x!==a.id)}))} className="accent-yellow-500"/>
                          <span className="text-xs px-1 rounded font-bold" style={{color:clr(a.tier)}}>{a.tier}</span>
                          <span className="truncate">{a.name}</span>
                        </label>)}
                      </div>
                    </div>
                  </div>
                </div>
              </>)}

              {wizStep===3&&(<>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Director *</label>
                  {myDirectors.map(d=>{const T=TIERS[d.tier];return(
                    <label key={d.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer mb-2 transition-all" style={{borderColor:draft.directorId===d.id?"#3b82f6":"#374151",background:draft.directorId===d.id?"rgba(59,130,246,0.1)":"#1a1a26",opacity:d.busy?0.5:1}}>
                      <input type="radio" name="dir" checked={draft.directorId===d.id} onChange={()=>!d.busy&&setDraft(dr=>({...dr,directorId:d.id}))} disabled={d.busy} className="accent-blue-500"/>
                      <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{d.tier}</span>
                      <div><div className="text-sm font-bold">{d.name}{d.busy&&<span className="text-xs text-red-400 ml-2">BUSY Wk{d.busyUntil}</span>}</div>
                        <div className="text-xs text-gray-500">Skill:{d.skill} • {d.style} • {d.successRate}% hits</div>
                      </div>
                    </label>
                  );})}
                  {!myDirectors.length&&<p className="text-xs text-gray-600">No directors hired. Go to Talent tab.</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Music Director</label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-gray-700 cursor-pointer mb-2" style={{background:"#1a1a26"}}><input type="radio" name="md" checked={!draft.musicDirId} onChange={()=>setDraft(d=>({...d,musicDirId:null}))} className="accent-gray-400"/><span className="text-sm text-gray-400">No music director</span></label>
                  {myMusicDirs.map(md=>{const T=TIERS[md.tier];return(
                    <label key={md.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer mb-2 transition-all" style={{borderColor:draft.musicDirId===md.id?"#22c55e":"#374151",background:draft.musicDirId===md.id?"rgba(34,197,94,0.1)":"#1a1a26",opacity:md.busy?0.5:1}}>
                      <input type="radio" name="md" checked={draft.musicDirId===md.id} onChange={()=>!md.busy&&setDraft(d=>({...d,musicDirId:md.id}))} disabled={md.busy} className="accent-green-500"/>
                      <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{md.tier}</span>
                      <div><div className="text-sm font-bold">{md.name}{md.busy&&<span className="text-xs text-red-400 ml-2">BUSY</span>}</div>
                        <div className="text-xs text-gray-500">Pop:{md.pop} Hit:{md.hitRate}%</div>
                      </div>
                    </label>
                  );})}
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Producer Strategy</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[{v:"conservative",l:"Safe",d:"Stable returns"},{v:"balanced",l:"Balanced",d:"Moderate risk"},{v:"aggressive",l:"Aggressive",d:"High risk/reward"}].map(p=>(
                      <button key={p.v} onClick={()=>setDraft(d=>({...d,producerStyle:p.v}))} className="p-2.5 rounded-lg border text-xs transition-all" style={{borderColor:draft.producerStyle===p.v?"#dc2626":"#374151",background:draft.producerStyle===p.v?"rgba(220,38,38,0.15)":"#1a1a26"}}>
                        <div className="font-bold">{p.l}</div><div className="text-gray-500 mt-0.5">{p.d}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>)}

              {wizStep===4&&(<>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Shoot Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SHOOT_FORMATS.map(sf=>(
                      <button key={sf.id} onClick={()=>setDraft(d=>({...d,shootFormat:sf.id,formatCost:sf.cost}))} className="p-3 rounded-xl border text-left transition-all" style={{borderColor:draft.shootFormat===sf.id?"#7c3aed":"#374151",background:draft.shootFormat===sf.id?"rgba(124,58,237,0.15)":"#1a1a26"}}>
                        <div className="flex items-center gap-2 mb-1"><span>{sf.icon}</span><span className="font-bold text-sm">{sf.label}</span></div>
                        <div className="text-xs text-gray-500">{sf.desc}</div>
                        <div className="flex gap-2 mt-1.5 text-xs">
                          {sf.cost>0&&<span style={{color:"#f87171"}}>+{fmt(sf.cost)}</span>}
                          {sf.cost===0&&<span className="text-gray-500">No extra cost</span>}
                          <span style={{color:"#4ade80"}}>BO x{sf.revenueBonus}</span>
                          {sf.qualityBonus>0&&<span style={{color:"#a78bfa"}}>+{sf.qualityBonus}Q</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Screen Count</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{c:500,cost:1000000,l:"Limited 500",m:0.6},{c:1500,cost:3000000,l:"Wide 1500",m:1.0},{c:3000,cost:6000000,l:"Mass 3000",m:1.5},{c:5000,cost:10000000,l:"Record 5000",m:2.0}].map(s=>(
                      <button key={s.c} onClick={()=>setDraft(d=>({...d,screens:s.c,screenCost:s.cost}))} className="p-2.5 rounded-lg border text-left transition-all" style={{borderColor:draft.screens===s.c?"#dc2626":"#374151",background:draft.screens===s.c?"rgba(220,38,38,0.12)":"#1a1a26"}}>
                        <div className="font-bold text-sm">{s.l}</div>
                        <div className="text-xs text-gray-500">Cost: {fmt(s.cost)}</div>
                        <div className="text-xs mt-0.5" style={{color:"#fbbf24"}}>Revenue x{s.m}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg p-3 border border-gray-700 text-xs" style={{background:"#1a1a26"}}>
                  <div className="font-bold text-gray-300 mb-2">Total Investment</div>
                  {[["Budget",fmt(draft.budget)],["Screens",fmt(draft.screenCost)],["Format",fmt(draft.formatCost||0)],["TOTAL",fmt(draft.budget+draft.screenCost+(draft.formatCost||0))],["Balance After",fmt(balance-draft.budget-draft.screenCost-(draft.formatCost||0))]].map(([k,v])=>(
                    <div key={k} className="flex justify-between py-0.5"><span className="text-gray-500">{k}</span><span style={{color:k==="Balance After"&&balance-draft.budget-draft.screenCost-(draft.formatCost||0)<0?"#f87171":"#e5e7eb",fontWeight:k==="TOTAL"||k==="Balance After"?"bold":"normal"}}>{v}</span></div>
                  ))}
                </div>
                {balance-draft.budget-draft.screenCost-(draft.formatCost||0)<0&&<div className="rounded-lg p-3 text-xs border text-red-300" style={{background:"rgba(220,38,38,0.15)",borderColor:"#7f1d1d"}}>Over budget! Reduce production budget, screen count, or format.</div>}
              </>)}

              {wizStep===5&&(<>
                <div className="text-xs text-gray-400 mb-2">Choose how your movie reaches audiences.</div>
                {DISTRIBUTION.map(d=>(
                  <button key={d.id} onClick={()=>setDraft(dr=>({...dr,distributionId:d.id}))} className="w-full p-3.5 rounded-xl border text-left transition-all mb-2" style={{borderColor:draft.distributionId===d.id?"#2563eb":"#374151",background:draft.distributionId===d.id?"rgba(37,99,235,0.12)":"#1a1a26"}}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{d.icon}</span><div className="font-bold text-white">{d.label}</div>
                      {draft.distributionId===d.id&&<span className="ml-auto text-xs text-blue-400">Selected</span>}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{d.desc}</div>
                    <div className="flex gap-4 mt-1 text-xs"><span style={{color:"#f87171"}}>Cut: {Math.round(d.cut*100)}%</span>{d.bonus!==0&&<span style={{color:d.bonus>0?"#4ade80":"#f87171"}}>{d.bonus>0?"Quality +":"Quality "}{d.bonus}</span>}</div>
                  </button>
                ))}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Regional Release Dates (optional)</label>
                  <div className="space-y-1.5">
                    {["India","USA","China","Europe","Middle East","Japan"].map(r=>(
                      <div key={r} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-20">{r}</span>
                        <input type="number" placeholder="Leave blank = global date" className="flex-1 rounded px-2 py-1 text-xs border border-gray-700 text-white outline-none" style={{background:"#1a1a26"}} min={week+1} max={week+60}
                          onChange={e=>setDraft(d=>({...d,regionalDates:{...(d.regionalDates||{}),[r]:+e.target.value||null}}))}/>
                        {REGION_MULT[r]&&<span className="text-xs text-gray-500">x{REGION_MULT[r]}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </>)}

              {wizStep===6&&(<>
                <div className="rounded-xl border border-green-800 p-4" style={{background:"rgba(5,46,22,0.3)"}}>
                  <h4 className="font-bold text-green-400 mb-2 text-sm">Movie Summary</h4>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {[["Title",draft.title||"—"],["Genre",draft.genre],["Theme",draft.theme],["Rating",draft.rating],["Budget",fmt(draft.budget)],["Format",(SHOOT_FORMATS.find(f=>f.id===draft.shootFormat)||{label:"Standard"}).label],["Screens",(draft.screens||1500).toLocaleString()],["Distribution",(DISTRIBUTION.find(d=>d.id===draft.distributionId)||{label:"—"}).label],["Total Invest",fmt(draft.budget+draft.screenCost+(draft.formatCost||0))]].map(([k,v])=>(
                      <div key={k} className="py-0.5"><span className="text-gray-500">{k}: </span><span className="text-white">{v}</span></div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-blue-900 p-3" style={{background:"rgba(30,58,138,0.2)"}}>
                  <div className="text-xs text-blue-300 font-bold mb-1">Release Date</div>
                  <div className="text-xs text-gray-400">Release date will be set AFTER production completes.</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg p-2" style={{background:"#1a1a26"}}>
                    <div className="text-gray-500">Lead Actor</div>
                    <div className="text-white">{(myActors.find(a=>a.id===draft.leadActorId)||{name:"Not set"}).name}</div>
                  </div>
                  <div className="rounded-lg p-2" style={{background:"#1a1a26"}}>
                    <div className="text-gray-500">Lead Actress</div>
                    <div className="text-white">{(myActresses.find(a=>a.id===draft.leadActressId)||{name:"Not set"}).name}</div>
                  </div>
                  <div className="rounded-lg p-2" style={{background:"#1a1a26"}}>
                    <div className="text-gray-500">Director</div>
                    <div className="text-white">{(myDirectors.find(d=>d.id===draft.directorId)||{name:"Not set"}).name}</div>
                  </div>
                  <div className="rounded-lg p-2" style={{background:"#1a1a26"}}>
                    <div className="text-gray-500">Music Director</div>
                    <div className="text-white">{(myMusicDirs.find(m=>m.id===draft.musicDirId)||{name:"None"}).name}</div>
                  </div>
                </div>
                {[myActors.find(a=>a.id===draft.leadActorId),myActresses.find(a=>a.id===draft.leadActressId)].filter(Boolean).filter(a=>a.tier==="S").length>=2&&(
                  <div className="rounded-lg p-3 text-xs border text-yellow-300" style={{background:"rgba(202,138,4,0.1)",borderColor:"#854d0e"}}>Two S-Tier stars cast together — possible ego clash on set! Score penalty risk.</div>
                )}
              </>)}
            </div>
            <div className="p-5 border-t border-gray-800 flex gap-3">
              {wizStep>1&&<button onClick={()=>setWizStep(s=>s-1)} className="px-4 py-2 rounded-lg text-sm border border-gray-700 hover:border-gray-500">Back</button>}
              {wizStep<6?<button onClick={()=>setWizStep(s=>s+1)} className="flex-1 py-2 rounded-lg font-bold text-sm text-white" style={{background:"#dc2626"}}>Continue</button>
                :<button onClick={startMovie} className="flex-1 py-2 rounded-lg font-bold text-sm text-white" style={{background:"#16a34a"}}>Start Production!</button>}
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="border-b border-gray-800 px-4 py-3 flex items-center justify-between flex-wrap gap-2" style={{background:"linear-gradient(135deg,#1a0a1e,#0a0a16,#1e0a0a)"}}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:"linear-gradient(135deg,#dc2626,#ea580c)"}}>🎥</div>
          <div>
            <div className="text-lg font-bold">CineMax Studios</div>
            <div className="text-xs text-gray-500">Week {week} • Level {studioLevel}{getFest(week)?" • "+getFest(week).name:""}</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap text-xs items-center">
          {[[fmt(balance),"Balance","#4ade80","#052e16","#166534"],[`${fmtFans(fanbase)}`,"Fans","#fbbf24","#1c1917","#78350f"],[`${reputation}`,"Rep","#60a5fa","#0f172a","#1e3a8a"],[`${ytSubs.toLocaleString()}`,"YT","#f87171","#1a0505","#7f1d1d"],[`${awards.length}`,"Awards","#c084fc","#1a0933","#6b21a8"]].map(([v,l,c,bg,br])=>(
            <div key={l} className="rounded-lg px-2.5 py-1.5 border" style={{background:bg,borderColor:br}}>
              <span style={{color:c}} className="font-bold text-xs">{v}</span>
              <span className="text-gray-600 ml-1 hidden sm:inline text-xs">{l}</span>
            </div>
          ))}
          <button onClick={advanceWeek} className="px-4 py-2 rounded-lg font-bold text-sm text-white border border-green-700 hover:border-green-400 transition-all active:scale-95" style={{background:"#14532d"}}>Next Week</button>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="border-b border-gray-800 px-3 flex gap-0.5 overflow-x-auto" style={{background:"#0d0d14"}}>
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-all ${tab===t.id?"text-red-400 border-b-2 border-red-500":"text-gray-500 hover:text-gray-300"}`}>{t.l}</button>)}
      </div>

      <div className="p-4 max-w-7xl mx-auto">

        {/* ─── DASHBOARD ─── */}
        {tab==="dashboard"&&<div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[[movies.length,"In Production","🎬","#3b82f6"],[released.length,"Released","📽","#10b981"],[myActors.length+myActresses.length,"Talent Roster","🎭","#f59e0b"],[fmt(released.reduce((s,m)=>s+m.boxOffice,0)),"Total Box Office","💰","#ec4899"]].map(([v,l,icon,c])=>(
              <div key={l} className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
                <div className="text-2xl mb-1">{icon}</div><div className="text-2xl font-bold" style={{color:c}}>{v}</div><div className="text-xs text-gray-500 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
              <h3 className="font-bold text-sm mb-3" style={{color:"#fbbf24"}}>Genre Trends</h3>
              <div className="grid grid-cols-4 gap-1.5">
                {GENRES.map(g=>{const t=genreTrends[g]||1;return(
                  <div key={g} className="rounded p-1.5" style={{background:"#1a1a26"}}>
                    <div className="text-xs truncate">{g}</div>
                    <div className="w-full rounded-full h-1 mt-0.5" style={{background:"#374151"}}><div className="h-1 rounded-full" style={{width:`${Math.max(5,Math.round((t-0.5)/1*100))}%`,background:t>=1.2?"#22c55e":t>=1?"#eab308":"#ef4444"}}/></div>
                    <div className="text-xs mt-0.5" style={{color:t>=1.2?"#4ade80":t>=1?"#fbbf24":"#f87171"}}>{t>=1.2?"up":t>=1?"ok":"dn"} {t.toFixed(1)}x</div>
                  </div>
                );})}
              </div>
            </div>
            <div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
              <h3 className="font-bold text-sm mb-3" style={{color:"#f87171"}}>Competitors</h3>
              {AI_STUDIOS.map(s=><div key={s.id} className="flex items-center gap-2 mb-2 p-2 rounded-lg" style={{background:"#1a1a26"}}>
                <span>{s.icon}</span>
                <div className="flex-1">
                  <div className="text-xs font-bold" style={{color:s.color}}>{s.name}</div>
                  <div className="w-full h-1 rounded-full mt-0.5" style={{background:"#374151"}}><div className="h-1 rounded-full" style={{width:`${s.strength}%`,background:s.color}}/></div>
                </div>
                <span className="text-xs text-gray-500">{aiReleases.filter(r=>r.studioId===s.id).length} films</span>
              </div>)}
            </div>
          </div>
          <div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
            <h3 className="font-bold text-sm mb-3" style={{color:"#4ade80"}}>Festival Calendar</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {FESTIVALS.map(f=><div key={f.name} className="rounded-lg p-2 border text-center" style={{background:"#052e16",borderColor:week===f.week?"#22c55e":"#166534"}}>
                <div className="text-xs">{f.name}</div><div className="text-xs text-gray-400">Wk {f.week}</div><div className="text-xs" style={{color:"#4ade80"}}>+{Math.round((f.bonus-1)*100)}%</div>
              </div>)}
            </div>
          </div>
          <div className="rounded-xl border border-gray-800 p-4 flex items-center justify-between flex-wrap gap-3" style={{background:"#111118"}}>
            <div>
              <h3 className="font-bold text-sm text-white">Studio Level {studioLevel}/5</h3>
              <div className="flex gap-1 mt-2">{["Indie","Mid","AAA","Mega","Empire"].map((l,i)=><span key={i} className="text-xs px-2 py-0.5 rounded" style={{background:i<studioLevel?"#166534":"#1f2937",color:i<studioLevel?"#4ade80":"#4b5563"}}>{l}</span>)}</div>
            </div>
            <button onClick={()=>{const cost=studioLevel*30000000;if(balance<cost){notify("❌ Not enough!","error");return;}setBalance(b=>b-cost);setStudioLevel(l=>Math.min(5,l+1));addNews(`Studio upgraded to Level ${studioLevel+1}!`);}} className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{background:"#ca8a04"}}>Upgrade — {fmt(studioLevel*30000000)}</button>
          </div>
        </div>}

        {/* ─── MOVIES ─── */}
        {tab==="movies"&&<div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">🎬 Movies</h2>
            <button onClick={()=>{setShowWizard(true);setWizStep(1);}} className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{background:"#dc2626"}}>+ New Movie</button>
          </div>
          {movies.length===0&&<div className="text-center text-gray-600 py-12 text-sm">No movies in production. Click "+ New Movie"!</div>}
          <div className="grid gap-4 md:grid-cols-2">
            {movies.map(m=>{
              const la=myActors.find(a=>a.id===m.leadActorId);const lb=myActresses.find(a=>a.id===m.leadActressId);
              const dir=myDirectors.find(d=>d.id===m.directorId);const fest=m.releaseWeek?getFest(m.releaseWeek):null;
              const stage=PROD_STAGES[m.stageIndex||0];const fmt_d=SHOOT_FORMATS.find(f=>f.id===m.shootFormat)||SHOOT_FORMATS[0];
              return(
                <div key={m.id} className="rounded-xl border border-gray-800 p-4 space-y-3" style={{background:"#111118"}}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-white">{m.title}</div>
                      <div className="text-xs text-gray-500">{m.genre} • {m.rating} • {fmt_d.icon}{fmt_d.label} • {fmt(m.budget)}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full text-white whitespace-nowrap" style={{background:STAGE_COLOR[m.status]||"#374151"}}>{m.status==="ready"?"Ready":stage}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1"><span>{stage}</span><span>{Math.round(m.stageProgress||0)}%</span></div>
                    <div className="w-full rounded-full h-2" style={{background:"#1f2937"}}><div className="h-2 rounded-full" style={{width:`${m.stageProgress||0}%`,background:"#dc2626"}}/></div>
                    <div className="flex mt-1 gap-0.5">{PROD_STAGES.map((_,i)=><div key={i} className="flex-1 h-0.5 rounded-full" style={{background:i<=(m.stageIndex||0)?"#dc2626":"#1f2937"}}/>)}</div>
                  </div>
                  <div className="grid grid-cols-3 text-xs text-gray-500 gap-1">
                    <span>Hype: {m.hype||5}%</span>
                    <span>Screens: {(m.screens||1500).toLocaleString()}</span>
                    <span>YT: {(m.ytDone||[]).length} done</span>
                  </div>
                  <div className="text-xs text-gray-500">Cast: {[la?la.name:null,lb?lb.name:null].filter(Boolean).join(" & ")||"No leads"} • Dir: {dir?dir.name:"None"}</div>
                  {m.releaseWeek?<div className="text-xs flex gap-2 flex-wrap"><span className="text-gray-500">Week {m.releaseWeek}</span>{fest&&<span style={{color:"#4ade80"}}>{fest.name}</span>}{getAiClashes(m.releaseWeek).length>0&&<span style={{color:"#fbbf24"}}>Clash!</span>}</div>
                  :<div className="text-xs text-purple-400">Release date TBD</div>}
                  {m.egoClash&&<div className="text-xs text-yellow-400">Ego clash reported on set!</div>}
                  {(m.incidentLog||[]).length>0&&<div className="text-xs text-red-400">{m.incidentLog.length} incident(s) handled</div>}
                  <div className="w-full rounded-full h-1.5" style={{background:"#1f2937"}}><div className="h-1.5 rounded-full" style={{width:`${m.hype||5}%`,background:m.hype>=70?"#f59e0b":m.hype>=40?"#3b82f6":"#6b7280"}}/></div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={()=>setShowYT(m)} className="text-xs px-2.5 py-1.5 rounded-lg border hover:border-red-600 transition-all" style={{borderColor:"#7f1d1d",color:"#f87171"}}>YouTube</button>
                    <button onClick={()=>setShowMusicRights(m)} className="text-xs px-2.5 py-1.5 rounded-lg border hover:border-green-600 transition-all border-gray-700 text-gray-300">Music</button>
                    <button onClick={()=>setShowPostpone(m)} className="text-xs px-2.5 py-1.5 rounded-lg border hover:border-purple-600 transition-all border-gray-700 text-gray-300">Date</button>
                    {m.status==="ready"&&!m.releaseWeek&&<button onClick={()=>setShowReleaseDate(m)} className="text-xs px-3 py-1.5 rounded-lg font-bold text-white" style={{background:"#7c3aed"}}>Set Release</button>}
                    {m.status==="ready"&&m.releaseWeek&&<button onClick={()=>releaseMovie(m)} className="text-xs px-3 py-1.5 rounded-lg font-bold text-white" style={{background:"#16a34a"}}>RELEASE</button>}
                  </div>
                </div>
              );
            })}
          </div>
          {released.length>0&&<div>
            <h3 className="text-base font-bold text-gray-300 mb-3 mt-4">Released ({released.length})</h3>
            <div className="space-y-2">
              {released.map(m=>(
                <div key={m.id} className="rounded-xl border border-gray-800 p-4 cursor-pointer hover:border-gray-600 transition-all" style={{background:"#111118"}} onClick={()=>setExpandedR(expandedR===m.id?null:m.id)}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <div className="font-bold text-white">{m.title} {m.grade}</div>
                      <div className="text-xs text-gray-500">{m.genre} • Score:{m.score}/100 • {m.formatName} • Wk {m.releaseWeek}</div>
                      {m.festival&&<span className="text-xs text-green-400">{m.festival} </span>}
                      {m.clashCount>0&&<span className="text-xs text-yellow-400">{m.clashCount} clash(es) </span>}
                    </div>
                    <div className="text-right"><div className="font-bold" style={{color:"#4ade80"}}>{fmt(m.boxOffice)}</div><div className="text-xs" style={{color:m.profit>0?"#4ade80":"#f87171"}}>{m.profit>0?"+":""}{fmt(m.profit)}</div></div>
                  </div>
                  {expandedR===m.id&&<div className="pt-3 mt-3 border-t border-gray-800">
                    <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                      {[["Gross BO",fmt(m.grossBO||m.boxOffice),"#4ade80"],["Net BO",fmt(m.boxOffice),"#60a5fa"],["Profit",fmt(m.profit),m.profit>0?"#4ade80":"#f87171"],["Festival",m.festival||"None","#4ade80"],["Clash Pen",m.clashPenalty<1?`-${Math.round((1-m.clashPenalty)*100)}%`:"None","#f87171"],["Format",m.formatName||"2D","#a78bfa"]].map(([k,v,c])=>(
                        <div key={k} className="rounded-lg p-2" style={{background:"#1a1a26"}}><div className="text-gray-500">{k}</div><div style={{color:c}} className="font-bold">{v}</div></div>
                      ))}
                    </div>
                    {m.regBO&&<div className="mb-3"><div className="text-xs text-gray-400 mb-1">Regional BO</div><div className="grid grid-cols-3 gap-1">{Object.entries(m.regBO).map(([r,bo])=><div key={r} className="rounded p-1.5 text-xs" style={{background:"#1a1a26"}}><div className="text-gray-500 text-xs">{r}</div><div style={{color:"#fbbf24"}} className="font-bold">{fmt(bo)}</div></div>)}</div></div>}
                    <div className="flex gap-2 flex-wrap">
                      {!ottDeals.find(d=>d.movieId===m.id)&&<button onClick={()=>setShowOTT(m)} className="text-xs px-3 py-1.5 rounded-lg border border-blue-800 hover:border-blue-600 text-blue-400 transition-all">OTT Deal</button>}
                      {!musicRights.find(r=>r.movieId===m.id)&&<button onClick={()=>setShowMusicRights(m)} className="text-xs px-3 py-1.5 rounded-lg border border-green-800 hover:border-green-600 text-green-400 transition-all">Music Rights</button>}
                      {!franchises.find(f=>f.baseMovie===m.title)&&m.score>=55&&<button onClick={()=>setShowFranchiseCreate(m)} className="text-xs px-3 py-1.5 rounded-lg border border-yellow-800 hover:border-yellow-600 text-yellow-400 transition-all">Create Franchise</button>}
                    </div>
                  </div>}
                </div>
              ))}
            </div>
          </div>}
        </div>}

        {/* ─── TALENT ─── */}
        {tab==="talent"&&<div className="space-y-4">
          <h2 className="text-xl font-bold">🎭 Talent Agency</h2>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(TIERS).map(([k,v])=><div key={k} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 border text-xs" style={{borderColor:v.color+"44",background:v.glow,color:v.color}}><span className="font-bold">{k}</span><span className="text-gray-400">x{v.mult}</span><span className="text-gray-500">{v.desc}</span></div>)}
          </div>
          <div className="flex gap-2">
            {[["actors","Actors"+(actorPool.length>0?` (${actorPool.length})`:"")],["actresses","Actresses"+(actressPool.length>0?` (${actressPool.length})`:"")],["music","Music"+(musicPool.length>0?` (${musicPool.length})`:"")],["directors","Directors"],["myroster","My Roster"]].map(([id,l])=>(
              <button key={id} onClick={()=>setTalentSubTab(id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${talentSubTab===id?"text-white":"text-gray-500 border border-gray-700 hover:text-gray-300"}`} style={{background:talentSubTab===id?"#dc2626":"transparent"}}>{l}</button>
            ))}
          </div>

          {talentSubTab==="actors"&&<div>
            <div className="flex gap-2 mb-3 flex-wrap">
              <input placeholder="Search actors..." value={actorFilter.search} onChange={e=>setActorFilter(f=>({...f,search:e.target.value}))} className="rounded-lg px-3 py-1.5 text-sm border border-gray-700 text-white outline-none w-48" style={{background:"#1a1a26"}}/>
              <select value={actorFilter.tier} onChange={e=>setActorFilter(f=>({...f,tier:e.target.value}))} className="rounded-lg px-2 py-1.5 text-xs border border-gray-700 text-white outline-none" style={{background:"#1a1a26"}}>
                {["All","S","A","B","C","D"].map(t=><option key={t} value={t}>{t==="All"?"All Tiers":t+"-Tier"}</option>)}
              </select>
              <select value={actorFilter.genre} onChange={e=>setActorFilter(f=>({...f,genre:e.target.value}))} className="rounded-lg px-2 py-1.5 text-xs border border-gray-700 text-white outline-none" style={{background:"#1a1a26"}}>
                <option value="All">All Genres</option>{GENRES.map(g=><option key={g}>{g}</option>)}
              </select>
              <span className="text-xs text-gray-500 self-center">{filteredActors.length} actors</span>
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {filteredActors.slice(0,60).map(a=>{const T=TIERS[a.tier];return(
                <div key={a.id} className="rounded-lg p-3 border border-gray-700 flex items-center gap-2" style={{background:"#1a1a26"}}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-bold text-sm truncate">{a.name}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded font-bold shrink-0" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{a.tier}</span>
                    </div>
                    <div className="text-xs text-gray-500">Pop:{a.pop} Skill:{a.skill} • {a.genre[0]} • {a.region}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs mb-1" style={{color:"#f87171"}}>{fmt(a.salary)}</div>
                    <button onClick={()=>hireActor(a)} className="px-2.5 py-1 rounded text-xs font-bold text-white" style={{background:"#dc2626"}}>Sign</button>
                  </div>
                </div>
              );})}
            </div>
            {filteredActors.length>60&&<p className="text-xs text-gray-500 mt-2">Showing 60 of {filteredActors.length}. Use filters to narrow.</p>}
          </div>}

          {talentSubTab==="actresses"&&<div>
            <div className="flex gap-2 mb-3 flex-wrap">
              <input placeholder="Search actresses..." value={actressFilter.search} onChange={e=>setActressFilter(f=>({...f,search:e.target.value}))} className="rounded-lg px-3 py-1.5 text-sm border border-gray-700 text-white outline-none w-48" style={{background:"#1a1a26"}}/>
              <select value={actressFilter.tier} onChange={e=>setActressFilter(f=>({...f,tier:e.target.value}))} className="rounded-lg px-2 py-1.5 text-xs border border-gray-700 text-white outline-none" style={{background:"#1a1a26"}}>
                {["All","S","A","B","C","D"].map(t=><option key={t} value={t}>{t==="All"?"All Tiers":t+"-Tier"}</option>)}
              </select>
              <select value={actressFilter.genre} onChange={e=>setActressFilter(f=>({...f,genre:e.target.value}))} className="rounded-lg px-2 py-1.5 text-xs border border-gray-700 text-white outline-none" style={{background:"#1a1a26"}}>
                <option value="All">All Genres</option>{GENRES.map(g=><option key={g}>{g}</option>)}
              </select>
              <span className="text-xs text-gray-500 self-center">{filteredActresses.length} actresses</span>
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {filteredActresses.slice(0,60).map(a=>{const T=TIERS[a.tier];return(
                <div key={a.id} className="rounded-lg p-3 border border-gray-700 flex items-center gap-2" style={{background:"#1a1a26"}}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-bold text-sm truncate">{a.name}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded font-bold shrink-0" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{a.tier}</span>
                    </div>
                    <div className="text-xs text-gray-500">Pop:{a.pop} Skill:{a.skill} • {a.genre[0]} • {a.region}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs mb-1" style={{color:"#f87171"}}>{fmt(a.salary)}</div>
                    <button onClick={()=>hireActress(a)} className="px-2.5 py-1 rounded text-xs font-bold text-white" style={{background:"#ec4899"}}>Sign</button>
                  </div>
                </div>
              );})}
            </div>
          </div>}

          {talentSubTab==="music"&&<div>
            <div className="flex gap-2 mb-3 flex-wrap">
              <input placeholder="Search music directors..." value={musicFilter.search} onChange={e=>setMusicFilter(f=>({...f,search:e.target.value}))} className="rounded-lg px-3 py-1.5 text-sm border border-gray-700 text-white outline-none w-52" style={{background:"#1a1a26"}}/>
              <select value={musicFilter.tier} onChange={e=>setMusicFilter(f=>({...f,tier:e.target.value}))} className="rounded-lg px-2 py-1.5 text-xs border border-gray-700 text-white outline-none" style={{background:"#1a1a26"}}>
                {["All","S","A","B","C","D"].map(t=><option key={t} value={t}>{t==="All"?"All Tiers":t+"-Tier"}</option>)}
              </select>
              <span className="text-xs text-gray-500 self-center">{filteredMusic.length} composers</span>
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {filteredMusic.slice(0,60).map(m=>{const T=TIERS[m.tier];return(
                <div key={m.id} className="rounded-lg p-3 border border-gray-700 flex items-center gap-2" style={{background:"#1a1a26"}}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1"><span className="font-bold text-sm truncate">{m.name}</span><span className="text-xs px-1.5 py-0.5 rounded font-bold shrink-0" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{m.tier}</span></div>
                    <div className="text-xs text-gray-500">Pop:{m.pop} Hit:{m.hitRate}% • {Array.isArray(m.genres)?m.genres.slice(0,2).join(","):m.genres}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs mb-1" style={{color:"#f87171"}}>{fmt(m.salary)}</div>
                    <button onClick={()=>hireMusic(m)} className="px-2.5 py-1 rounded text-xs font-bold text-white" style={{background:"#166534"}}>Hire</button>
                  </div>
                </div>
              );})}
            </div>
          </div>}

          {talentSubTab==="directors"&&<div>
            <div className="mb-3"><h3 className="text-sm font-bold text-gray-300 mb-2">Available Directors</h3>
              <div className="grid gap-2 md:grid-cols-2">
                {[{id:1,name:"Sanjay Verma",tier:"S",skill:95,salary:10000000,style:"Drama",successRate:85},{id:2,name:"Chris Ford",tier:"S",skill:92,salary:12000000,style:"Action",successRate:80},{id:3,name:"Yuki Tanaka",tier:"A",skill:88,salary:7000000,style:"Sci-Fi",successRate:75},{id:4,name:"Priya Sharma",tier:"A",skill:85,salary:6000000,style:"Romance",successRate:78},{id:5,name:"Rohit Das",tier:"A",skill:82,salary:7500000,style:"Mass",successRate:72},{id:6,name:"Marco Bianchi",tier:"B",skill:78,salary:4500000,style:"Thriller",successRate:68},{id:7,name:"Liu Chen",tier:"A",skill:86,salary:7000000,style:"Drama",successRate:76},{id:8,name:"Sofia Moretti",tier:"B",skill:80,salary:5000000,style:"Romance",successRate:70},{id:9,name:"Raj Nair",tier:"C",skill:65,salary:2000000,style:"Comedy",successRate:55},{id:10,name:"New Director",tier:"D",skill:50,salary:800000,style:"Drama",successRate:45}].filter(d=>!myDirectors.find(x=>x.id===d.id)).map(d=>{
                  const T=TIERS[d.tier];
                  return(
                    <div key={d.id} className="rounded-lg p-3 border border-gray-700 flex items-center gap-3" style={{background:"#1a1a26"}}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2"><span className="font-bold text-sm">{d.name}</span><span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{d.tier}</span></div>
                        <div className="text-xs text-gray-500">Skill:{d.skill} • {d.style} • {d.successRate}% hit rate</div>
                      </div>
                      <div className="text-right"><div className="text-xs mb-1" style={{color:"#f87171"}}>{fmt(d.salary)}</div>
                        <button onClick={()=>{if(balance<d.salary){notify("❌ Not enough!","error");return;}setBalance(b=>b-d.salary);setMyDirectors(arr=>[...arr,{...d,busy:false,busyUntil:0}]);notify(`✅ ${d.name} hired!`);}} className="px-2.5 py-1 rounded text-xs font-bold text-white" style={{background:"#1d4ed8"}}>Hire</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>}

          {talentSubTab==="myroster"&&<div>
            {myActors.length>0&&<div className="mb-4"><h3 className="text-sm font-bold text-gray-300 mb-2">My Actors ({myActors.length})</h3>
              <div className="grid gap-2 md:grid-cols-3">{myActors.map(a=>{const T=TIERS[a.tier];return(
                <div key={a.id} className="rounded-lg p-3 border" style={{background:"#1a1a26",borderColor:a.busy?"#7f1d1d":"#374151"}}>
                  <div className="flex items-center gap-1"><span className="font-bold text-sm">{a.name}</span><span className="text-xs px-1 rounded font-bold" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{a.tier}</span></div>
                  <div className="text-xs text-gray-500">Pop:{a.pop} Skill:{a.skill}</div>
                  {a.busy?<div className="text-xs text-red-400 mt-1">Busy until Wk {a.busyUntil}</div>:<div className="text-xs text-green-400 mt-1">Available</div>}
                </div>
              );}}</div>
            </div>}
            {myActresses.length>0&&<div className="mb-4"><h3 className="text-sm font-bold text-gray-300 mb-2">My Actresses ({myActresses.length})</h3>
              <div className="grid gap-2 md:grid-cols-3">{myActresses.map(a=>{const T=TIERS[a.tier];return(
                <div key={a.id} className="rounded-lg p-3 border" style={{background:"#1a1a26",borderColor:a.busy?"#7f1d1d":"#374151"}}>
                  <div className="flex items-center gap-1"><span className="font-bold text-sm">{a.name}</span><span className="text-xs px-1 rounded font-bold" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{a.tier}</span></div>
                  <div className="text-xs text-gray-500">Pop:{a.pop} Skill:{a.skill}</div>
                  {a.busy?<div className="text-xs text-red-400 mt-1">Busy until Wk {a.busyUntil}</div>:<div className="text-xs text-green-400 mt-1">Available</div>}
                </div>
              );}}</div>
            </div>}
            {myMusicDirs.length>0&&<div><h3 className="text-sm font-bold text-gray-300 mb-2">My Music Directors</h3>
              <div className="grid gap-2 md:grid-cols-3">{myMusicDirs.map(m=>{const T=TIERS[m.tier];return(
                <div key={m.id} className="rounded-lg p-3 border border-gray-700" style={{background:"#1a1a26"}}>
                  <div className="flex items-center gap-1"><span className="font-bold text-sm">{m.name}</span><span className="text-xs px-1 rounded font-bold" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{m.tier}</span></div>
                  <div className="text-xs text-gray-500">Pop:{m.pop} Hit:{m.hitRate}%</div>
                  {m.busy?<div className="text-xs text-red-400 mt-1">Busy Wk {m.busyUntil}</div>:<div className="text-xs text-green-400 mt-1">Available</div>}
                </div>
              );}}</div>
            </div>}
            {!myActors.length&&!myActresses.length&&!myMusicDirs.length&&!myDirectors.length&&<p className="text-gray-600 text-sm">No talent hired yet. Go to Actors, Actresses, Music, or Directors tabs to sign talent.</p>}
            {myDirectors.length>0&&<div className="mt-4"><h3 className="text-sm font-bold text-gray-300 mb-2">My Directors</h3>
              <div className="grid gap-2 md:grid-cols-3">{myDirectors.map(d=>{const T=TIERS[d.tier];return(
                <div key={d.id} className="rounded-lg p-3 border border-gray-700" style={{background:"#1a1a26"}}>
                  <div className="flex items-center gap-1"><span className="font-bold text-sm">{d.name}</span><span className="text-xs px-1 rounded font-bold" style={{background:T?T.glow:undefined,color:T?T.color:undefined}}>{d.tier}</span></div>
                  <div className="text-xs text-gray-500">Skill:{d.skill} • {d.style}</div>
                  {d.busy?<div className="text-xs text-red-400 mt-1">Busy Wk {d.busyUntil}</div>:<div className="text-xs text-green-400 mt-1">Available</div>}
                </div>
              );}}</div>
            </div>}
          </div>}
        </div>}

        {/* ─── YOUTUBE ─── */}
        {tab==="youtube"&&<div className="space-y-4">
          <h2 className="text-xl font-bold">YouTube Channel</h2>
          {!hasYtChannel?(
            <div className="rounded-2xl border border-red-900 p-8 text-center space-y-4" style={{background:"linear-gradient(135deg,#1a0505,#0a0505)"}}>
              <div className="text-6xl">▶</div>
              <h3 className="text-xl font-bold text-white">Launch Your Official YouTube Channel</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto">Build your audience before each movie release. Drop teasers, trailers, music videos, BTS content. Every subscriber adds to your weekly passive income!</p>
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-xs">
                {[["Free to launch","No upfront cost"],["Earn royalties","30% on self-published music"],["Build audience","Subs = passive income"]].map(([k,v])=>(
                  <div key={k} className="rounded-lg p-2 border border-red-800" style={{background:"#1a0505"}}><div className="font-bold text-red-400">{k}</div><div className="text-gray-500">{v}</div></div>
                ))}
              </div>
              <button onClick={()=>{setHasYtChannel(true);addNews("YouTube channel launched!");notify("YouTube channel launched!","success");}} className="px-6 py-3 rounded-xl font-bold text-white text-sm" style={{background:"#dc2626"}}>Launch Channel — Free</button>
            </div>
          ):(
            <>
              <div className="rounded-xl border border-red-900 p-4" style={{background:"linear-gradient(135deg,#1a0505,#111118)"}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{background:"#dc2626"}}>▶</div>
                  <div>
                    <div className="font-bold text-white">CineMax Official</div>
                    <div className="text-xl font-bold" style={{color:"#f87171"}}>{ytSubs.toLocaleString()} subscribers</div>
                  </div>
                  <div className="ml-auto text-right text-xs">
                    <div className="text-gray-400">Weekly income</div>
                    <div style={{color:"#4ade80"}} className="font-bold">{fmt(Math.floor(ytSubs*2))}/wk</div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {movies.map(m=>(
                  <div key={m.id} className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
                    <div className="font-bold text-white mb-1">{m.title}</div>
                    <div className="text-xs text-gray-500 mb-2">Hype: {m.hype||5}% • Release: {m.releaseWeek?"Wk "+m.releaseWeek:"TBD"} • YT: {(m.ytDone||[]).length}/{YT_ACTIONS.length}</div>
                    <div className="w-full h-1.5 rounded-full mb-3" style={{background:"#1f2937"}}><div className="h-1.5 rounded-full" style={{width:`${Math.round((m.ytDone||[]).length/YT_ACTIONS.length*100)}%`,background:"#dc2626"}}/></div>
                    <button onClick={()=>setShowYT(m)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#dc2626"}}>Manage YouTube Campaign</button>
                  </div>
                ))}
                {movies.length===0&&<p className="text-gray-600 text-sm">Start producing movies to begin YouTube campaigns!</p>}
              </div>
              {musicRights.filter(r=>r.selfPublished).length>0&&<div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
                <h3 className="font-bold text-green-400 text-sm mb-2">Self-Published Music</h3>
                {musicRights.filter(r=>r.selfPublished).map(r=>(
                  <div key={r.movieId} className="flex justify-between items-center py-2 border-b border-gray-800 text-xs last:border-0">
                    <span className="text-gray-300">{r.movieTitle}</span>
                    <span style={{color:"#a78bfa"}}>{Math.round(r.royaltyRate*100)}% royalties forever</span>
                  </div>
                ))}
              </div>}
            </>
          )}
        </div>}

        {/* ─── OTT ─── */}
        {tab==="ott"&&<div className="space-y-4">
          <h2 className="text-xl font-bold">📺 OTT Platforms</h2>
          {myOttPlatform?(
            <div className="rounded-xl border border-blue-800 p-4 mb-4" style={{background:"rgba(30,58,138,0.2)"}}>
              <h3 className="font-bold text-blue-400">Your OTT Platform: {myOttPlatform.name}</h3>
              <div className="text-xs text-gray-400 mt-1">Subscribers: {myOttPlatform.subs.toLocaleString()} • Monthly income: {fmt(myOttPlatform.subs*50)}</div>
            </div>
          ):(
            <button onClick={()=>{if(balance<100000000){notify("Need Rs.10Cr to launch OTT","error");return;}setBalance(b=>b-100000000);setMyOttPlatform({name:"CineMax Play",subs:100000,launchWeek:week});addNews("CineMax Play OTT platform launched!");notify("Your OTT platform is live!","success");}} className="w-full p-4 rounded-xl border border-blue-800 text-left transition-all hover:border-blue-600" style={{background:"rgba(30,58,138,0.2)"}}>
              <div className="font-bold text-blue-400">Launch Your Own OTT Platform — Rs.10Cr</div>
              <div className="text-xs text-gray-400 mt-1">Create "CineMax Play" — release movies directly, earn subscription revenue, build subscriber base</div>
            </button>
          )}
          <h3 className="font-bold text-gray-300 text-sm">Active OTT Deals</h3>
          {ottDeals.length===0?<p className="text-gray-600 text-sm">No active deals. Release movies and sign OTT deals from movie details!</p>:
            <div className="space-y-2">{ottDeals.map((d,i)=>(
              <div key={i} className="rounded-xl border border-gray-800 p-4 flex items-center justify-between" style={{background:"#111118"}}>
                <div>
                  <div className="font-bold text-white text-sm">{d.movieTitle}</div>
                  <div className="text-xs text-gray-400">{d.platform} • {d.years} year{d.years>1?"s":""} • Signed Wk {d.signedWeek}</div>
                  <div className="text-xs" style={{color:"#4ade80"}}>Deal: {fmt(d.amount)}</div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-gray-500">Expires Wk {d.expiresWeek}</div>
                  <div style={{color:d.expiresWeek<week?"#f87171":"#4ade80"}}>{d.expiresWeek<week?"Expired":"Active"}</div>
                </div>
              </div>
            ))}</div>
          }
          <h3 className="font-bold text-gray-300 text-sm mt-4">Platform Profiles</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {OTT_PLATFORMS.map(p=>(
              <div key={p.id} className="rounded-xl border border-gray-800 p-3" style={{background:"#111118"}}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.icon}</span>
                  <div><div className="font-bold text-sm" style={{color:p.color}}>{p.name}</div><div className="text-xs text-gray-500">{p.subscribers}</div></div>
                  {p.premium&&<span className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{background:"rgba(245,158,11,0.2)",color:"#fbbf24"}}>Premium</span>}
                </div>
                <div className="text-xs text-gray-500 mt-1">Bid range: {fmt(p.bidMin)} — {fmt(p.bidMax)}</div>
                <div className="text-xs text-gray-500">License: {p.years.join("/")} year(s)</div>
              </div>
            ))}
          </div>
        </div>}

        {/* ─── MUSIC RIGHTS ─── */}
        {tab==="music"&&<div className="space-y-4">
          <h2 className="text-xl font-bold">🎵 Music Rights</h2>
          <div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-gray-300">Active Music Deals</h3>
              <div className="text-xs text-gray-500">Earning {fmt(musicRights.reduce((s,r)=>{if(r.expiresWeek>week&&r.amount>0)return s+Math.floor(r.amount*r.royaltyRate/52);if(r.selfPublished)return s+Math.floor(ytSubs*5);return s;},0))}/week</div>
            </div>
            {musicRights.length===0?<p className="text-gray-600 text-sm">No music deals. Sell music rights from released movie details!</p>:
              <div className="space-y-2">{musicRights.map((r,i)=>(
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-700" style={{background:"#1a1a26"}}>
                  <div>
                    <div className="font-bold text-sm text-white">{r.movieTitle}</div>
                    <div className="text-xs text-gray-500">{r.platform} • Royalty: {Math.round(r.royaltyRate*100)}%/yr{r.amount>0?" • Upfront: "+fmt(r.amount):""}</div>
                  </div>
                  <div className="text-right text-xs">
                    {r.selfPublished?<div style={{color:"#FF6D00"}}>Self-published</div>:<><div style={{color:"#4ade80"}}>+{fmt(Math.floor(r.amount*r.royaltyRate/52))}/wk</div><div className="text-gray-500">Exp Wk {r.expiresWeek}</div></>}
                  </div>
                </div>
              ))}</div>
            }
          </div>
          <div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
            <h3 className="font-bold text-sm mb-3" style={{color:"#4ade80"}}>Platform Guide</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {MUSIC_PLATFORMS.map(p=>(
                <div key={p.id} className="rounded-lg p-3 border border-gray-700" style={{background:"#1a1a26"}}>
                  <div className="flex items-center gap-2"><span>{p.icon}</span><div className="font-bold text-sm" style={{color:p.color}}>{p.name}</div></div>
                  <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
                  <div className="flex gap-3 mt-1 text-xs">
                    {p.id!=="own_yt"?<><span style={{color:"#fbbf24"}}>Upfront: {fmt(p.bidMin)}–{fmt(p.bidMax)}</span><span style={{color:"#a78bfa"}}>Royalty: {Math.round(p.royaltyRate*100)}%</span></>
                    :<span style={{color:"#FF6D00"}}>Keep {Math.round(p.royaltyRate*100)}% of all royalties forever!</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>}

        {/* ─── CALENDAR ─── */}
        {tab==="calendar"&&<div className="space-y-4">
          <h2 className="text-xl font-bold">📅 Release Calendar</h2>
          <div className="flex gap-3 flex-wrap text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{background:"#dc2626"}}></span> Your Films</span>
            {AI_STUDIOS.map(s=><span key={s.id} className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{background:s.color}}></span>{s.name}</span>)}
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-900 inline-block"></span> Festival</span>
          </div>
          <div className="space-y-2">
            {Array.from({length:20},(_,i)=>week+i).map(w=>{
              const myM=movies.filter(m=>m.releaseWeek===w);const aiM=aiReleases.filter(r=>r.releaseWeek===w);const relM=released.filter(m=>m.releaseWeek===w);
              const fest=FESTIVALS.find(f=>Math.abs(f.week-w)<=1);const clash=myM.length>0&&aiM.length>0;
              return(
                <div key={w} className="rounded-xl border p-3" style={{background:fest?"#052e16":clash?"#1a1200":"#111118",borderColor:clash?"#b45309":fest?"#166534":"#1f2937"}}>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-xs font-bold text-gray-400 w-14 shrink-0">Week {w}</span>
                    {w===week&&<span className="text-xs font-bold text-red-400">NOW</span>}
                    {fest&&<span className="text-xs font-bold text-green-400">{fest.name} +{Math.round((fest.bonus-1)*100)}%</span>}
                    {clash&&<span className="text-xs font-bold text-yellow-400">CLASH!</span>}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {myM.map(m=><div key={m.id} className="rounded-lg px-2.5 py-1 text-xs font-bold text-white" style={{background:"#dc2626"}}>{m.title}</div>)}
                    {relM.map(m=><div key={m.id} className="rounded-lg px-2.5 py-1 text-xs font-semibold text-white opacity-50" style={{background:"#7f1d1d"}}>{m.title}</div>)}
                    {aiM.map(r=>{const st=AI_STUDIOS.find(s=>s.id===r.studioId);return(<div key={r.id} className="rounded-lg px-2.5 py-1 text-xs font-bold" style={{background:st?st.bg:"#1f2937",color:st?st.color:"#fff",border:`1px solid ${st?st.color+"44":"#374151"}`}}>{st?st.icon:""} {r.title}</div>);})}
                    {!myM.length&&!aiM.length&&!relM.length&&<span className="text-xs text-gray-700">Open slot</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>}

        {/* ─── FRANCHISE ─── */}
        {tab==="franchise"&&<div className="space-y-4">
          <h2 className="text-xl font-bold">🎬 Franchise Universe</h2>
          {franchises.length===0?(
            <div className="text-center py-16 text-gray-600"><div className="text-5xl mb-4">🎬</div><p>No franchises. Release a hit and click "Create Franchise" from movie details!</p></div>
          ):(
            <div className="grid md:grid-cols-2 gap-4">
              {franchises.map(fr=>{const fat=Math.max(0,fr.installments-2)*5;return(
                <div key={fr.id} className="rounded-xl border border-yellow-800 p-4" style={{background:"linear-gradient(135deg,#1c1400,#111118)"}}>
                  <div className="flex items-start justify-between"><div><div className="font-bold text-lg text-yellow-400">{fr.name}</div><div className="text-xs text-gray-400">Base: "{fr.baseMovie}"</div></div><span className="text-3xl">🎬</span></div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    {[["Films",fr.installments,"#e5e7eb"],["Total BO",fmt(fr.totalBO),"#4ade80"],["Fatigue",fat>0?`-${fat}pts`:"None",fat>0?"#f87171":"#4ade80"]].map(([k,v,c])=><div key={k} className="rounded p-2" style={{background:"#1a1a26"}}><div className="text-gray-500">{k}</div><div style={{color:c}} className="font-bold">{v}</div></div>)}
                  </div>
                  {fat>0&&<div className="text-xs mt-2 p-2 rounded border text-red-300" style={{borderColor:"#7f1d1d",background:"rgba(220,38,38,0.1)"}}>Franchise fatigue! Consider a spinoff or reboot to revive.</div>}
                </div>
              );})}
            </div>
          )}
          {released.filter(m=>m.score>=55&&!franchises.find(f=>f.baseMovie===m.title)).length>0&&(
            <div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
              <h3 className="font-bold text-sm mb-3 text-gray-300">Eligible for Franchise</h3>
              <div className="space-y-2">{released.filter(m=>m.score>=55&&!franchises.find(f=>f.baseMovie===m.title)).map(m=>(
                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-700" style={{background:"#1a1a26"}}>
                  <div><div className="text-sm font-bold text-white">{m.title}</div><div className="text-xs text-gray-500">{m.grade} • Score: {m.score}/100</div></div>
                  <button onClick={()=>setShowFranchiseCreate(m)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#ca8a04"}}>Create Franchise</button>
                </div>
              ))}</div>
            </div>
          )}
        </div>}

        {/* ─── MARKET ─── */}
        {tab==="market"&&<div className="space-y-4">
          <h2 className="text-xl font-bold">🛒 Script Marketplace</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {availScripts.map(s=>(
              <div key={s.id} className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
                <div className="flex items-start justify-between gap-2">
                  <div><div className="font-bold text-white">{s.title}</div><div className="text-xs text-gray-500">{s.genre} • {s.theme} • {s.rating}</div><div className="text-xs mt-0.5" style={{color:"#fbbf24"}}>Quality: {s.quality}/100</div></div>
                  <div className="text-right"><div className="text-sm font-bold mb-1" style={{color:"#f87171"}}>{fmt(s.price)}</div><button onClick={()=>{if(balance<s.price){notify("❌ Not enough!","error");return;}setBalance(b=>b-s.price);setMyScripts(a=>[...a,s]);setAvailScripts(a=>a.filter(x=>x.id!==s.id));notify(`✅ "${s.title}" purchased!`);}} className="px-3 py-1.5 rounded-lg font-bold text-xs text-white" style={{background:"#7e22ce"}}>Buy</button></div>
                </div>
                <div className="w-full rounded-full h-1 mt-2" style={{background:"#374151"}}><div className="h-1 rounded-full" style={{width:`${s.quality}%`,background:"#7e22ce"}}/></div>
              </div>
            ))}
            {availScripts.length===0&&<p className="text-gray-600 text-sm">All scripts purchased!</p>}
          </div>
          {myScripts.length>0&&<div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
            <h3 className="font-bold text-sm mb-2 text-green-400">Your Scripts</h3>
            <div className="flex flex-wrap gap-2">{myScripts.map(s=><span key={s.id} className="text-xs px-3 py-1.5 rounded-lg border" style={{borderColor:"#6b21a8",background:"rgba(126,34,206,0.15)",color:"#c084fc"}}>{s.title}</span>)}</div>
          </div>}
        </div>}

        {/* ─── NEWS ─── */}
        {tab==="news"&&<div className="space-y-2">
          <h2 className="text-xl font-bold">📰 Industry News</h2>
          {newsLog.map(n=>(
            <div key={n.id} className="rounded-xl border border-gray-800 px-4 py-3 flex gap-3" style={{background:"#111118"}}>
              <span className="text-xs text-gray-600 whitespace-nowrap shrink-0">Wk {n.w}</span>
              <span className="text-sm text-gray-200">{n.msg}</span>
            </div>
          ))}
        </div>}

        {/* ─── STATS ─── */}
        {tab==="stats"&&<div className="space-y-4">
          <h2 className="text-xl font-bold">📊 Studio Statistics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
              <h3 className="font-bold text-sm mb-3 text-green-400">Financials</h3>
              {[["Balance",fmt(balance),"#4ade80"],["Total Box Office",fmt(released.reduce((s,m)=>s+m.boxOffice,0)),"#fbbf24"],["Total Profit",fmt(released.reduce((s,m)=>s+m.profit,0)),"#60a5fa"],["Music Income",fmt(musicRights.reduce((s,r)=>s+(r.amount||0),0)),"#a78bfa"],["OTT Income",fmt(ottDeals.reduce((s,d)=>s+d.amount,0)),"#ec4899"],["Movies Made",released.length,"#e5e7eb"],["Blockbusters",released.filter(m=>m.score>=75).length,"#f59e0b"],["Flops",released.filter(m=>m.score<48).length,"#f87171"],["YT Subscribers",ytSubs.toLocaleString(),"#f87171"],["Fans",fmtFans(fanbase),"#a78bfa"],["Awards",awards.length,"#fbbf24"]].map(([k,v,c])=>(
                <div key={k} className="flex justify-between text-xs py-1.5 border-b border-gray-800"><span className="text-gray-400">{k}</span><span className="font-bold" style={{color:c}}>{v}</span></div>
              ))}
            </div>
            <div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
              <h3 className="font-bold text-sm mb-3 text-blue-400">Movie Scores</h3>
              {released.map(m=>(
                <div key={m.id} className="flex items-center gap-2 mb-2">
                  <div className="text-xs text-gray-400 w-24 truncate">{m.title}</div>
                  <div className="flex-1 rounded-full h-2" style={{background:"#1f2937"}}><div className="h-2 rounded-full" style={{width:`${m.score}%`,background:m.score>=80?"#f59e0b":m.score>=65?"#22c55e":m.score>=50?"#3b82f6":"#ef4444"}}/></div>
                  <div className="text-xs text-gray-500 w-6 text-right">{m.score}</div>
                </div>
              ))}
              {released.length===0&&<p className="text-gray-600 text-xs">Release movies to see scores!</p>}
            </div>
            <div className="rounded-xl border border-gray-800 p-4" style={{background:"#111118"}}>
              <h3 className="font-bold text-sm mb-3 text-purple-400">Awards ({awards.length})</h3>
              {awards.length===0?<p className="text-gray-600 text-xs">No awards yet!</p>:awards.map((a,i)=>(
                <div key={i} className="flex items-center gap-2 mb-2 p-2 rounded" style={{background:"#1a1a26"}}>
                  <span>🏆</span>
                  <div><div className="text-xs font-bold text-yellow-400">{a.award}</div><div className="text-xs text-gray-400">{a.movie}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>}

      </div>
    </div>
  );
}