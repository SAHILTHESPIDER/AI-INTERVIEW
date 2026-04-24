import { useState, useEffect, useRef, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
   BGMI ESPORTS MANAGER v8
   NEW: Player Growth, Merchandise, Rivalry System, Tournament Awards,
        Fan/Media Awards, Award Ceremony UI, Chicken Dinner Leaderboard,
        Grand Finals Qualification System
═══════════════════════════════════════════════════════════════ */

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MAPS = [
  {name:"Erangel",icon:"🌿",type:"Temperate",size:"8×8 km",color:"#2d6a4f"},
  {name:"Miramar",icon:"🏜️",type:"Desert",size:"8×8 km",color:"#b5832a"},
  {name:"Sanhok",icon:"🌴",type:"Tropical",size:"4×4 km",color:"#1b7a2e"},
  {name:"Vikendi",icon:"❄️",type:"Snow",size:"6×6 km",color:"#3a7fd5"},
  {name:"Karakin",icon:"💣",type:"Desert",size:"2×2 km",color:"#a0522d"},
  {name:"Nusa",icon:"🌸",type:"Tropical",size:"1×1 km",color:"#9b2c5e"},
  {name:"Rondo",icon:"🏔️",type:"Mountain",size:"8×8 km",color:"#4a3a8c"},
];
const PLAYERS_PER_TEAM = 4;
const TEAMS_PER_MATCH = 16;
const GROUPS_COUNT = 8;
const GROUP_LETTERS = ["A","B","C","D","E","F","G","H"];

const ZONE_PHASES = [
  {name:"Zone 1 — Drop & Loot",icon:"🟢",color:"text-green-400",border:"border-green-500/30",killRate:0.10,zoneDeath:0.03},
  {name:"Zone 2 — Early Fights",icon:"🟡",color:"text-yellow-400",border:"border-yellow-500/30",killRate:0.18,zoneDeath:0.06},
  {name:"Zone 3 — Mid Game",icon:"🟠",color:"text-orange-400",border:"border-orange-500/30",killRate:0.25,zoneDeath:0.10},
  {name:"Zone 4 — Third-Party Hell",icon:"🔴",color:"text-red-400",border:"border-red-500/30",killRate:0.30,zoneDeath:0.14},
  {name:"Zone 5 — Final Circle",icon:"💀",color:"text-purple-400",border:"border-purple-500/30",killRate:0.50,zoneDeath:0.20},
];
const WEAPONS = ["M416","AKM","Beryl M762","Groza","DP-28","Mini14","SKS","AWM","Kar98k","Vector","UMP45","SCAR-L","Lynx AMR","MK12","AUG","QBZ"];
const UTILITY = ["Frag Grenade","Molotov Cocktail","Smoke+Rush","Stun+Charge","Grenade Spam"];
const VEHICLES = ["UAZ Rampage","Buggy Hit","Motorcycle Run","BRDM Crush","Dacia Squish"];

/* ── GRAND FINALS QUALIFICATION THRESHOLD ── */
const GRAND_FINALS_QUALIFY_PTS = 300; // world rank pts needed
const GRAND_FINALS_QUALIFY_WINS = 2;  // OR 2 official tournament wins

const T_ROUNDS = [
  {name:"Group Stage-1",teams:128,groups:8,matchesPerGroup:3,advancePerGroup:8,totalAdvance:64},
  {name:"Group Stage-2",teams:64,groups:4,matchesPerGroup:1,advancePerGroup:8,totalAdvance:32},
  {name:"Semi final",teams:32,groups:4,matchesPerGroup:2,advancePerGroup:4,totalAdvance:16},
  {name:"Grand Finals",teams:16,groups:1,matchesPerGroup:18,advancePerGroup:0,totalAdvance:0},
];

const PLACEMENT_PTS = [10,6,5,4,3,2,1,1,0,0,0,0,0,0,0,0];

const COUNTRIES = {
  IN:{name:"India",flag:"🇮🇳"},PK:{name:"Pakistan",flag:"🇵🇰"},BD:{name:"Bangladesh",flag:"🇧🇩"},
  NP:{name:"Nepal",flag:"🇳🇵"},LK:{name:"Sri Lanka",flag:"🇱🇰"},MY:{name:"Malaysia",flag:"🇲🇾"},
  TH:{name:"Thailand",flag:"🇹🇭"},ID:{name:"Indonesia",flag:"🇮🇩"},CN:{name:"China",flag:"🇨🇳"},
  KR:{name:"South Korea",flag:"🇰🇷"},JP:{name:"Japan",flag:"🇯🇵"},TR:{name:"Turkey",flag:"🇹🇷"},
  BR:{name:"Brazil",flag:"🇧🇷"},DE:{name:"Germany",flag:"🇩🇪"},US:{name:"USA",flag:"🇺🇸"},
};

/* ── MERCHANDISE SYSTEM ── */
const MERCH_ITEMS = [
  {id:"jersey_basic",name:"Team Jersey",icon:"👕",category:"jersey",baseCost:500000,baseRevenue:50000,prestige:5,desc:"Basic team jersey for fans",unlockAt:0},
  {id:"jersey_pro",name:"Pro Edition Jersey",icon:"🥋",category:"jersey",baseCost:1500000,baseRevenue:150000,prestige:12,desc:"Limited edition pro jersey",unlockAt:30},
  {id:"jersey_champion",name:"Champion Jersey",icon:"🏆",category:"jersey",baseCost:3000000,baseRevenue:300000,prestige:20,desc:"Championship edition — requires a win",unlockAt:0,requiresWin:true},
  {id:"skin_basic",name:"Basic Weapon Skin Pack",icon:"🎨",category:"skin",baseCost:800000,baseRevenue:120000,prestige:8,desc:"Team-branded weapon skins",unlockAt:0},
  {id:"skin_legendary",name:"Legendary Skin Bundle",icon:"✨",category:"skin",baseCost:2500000,baseRevenue:400000,prestige:18,desc:"Legendary animated skins",unlockAt:50},
  {id:"skin_collab",name:"Collab Skin Series",icon:"💎",category:"skin",baseCost:4000000,baseRevenue:600000,prestige:25,desc:"Partnership collab skins",unlockAt:0,requiresPartner:true},
  {id:"fan_tshirt",name:"Fan T-Shirt",icon:"👚",category:"fan",baseCost:200000,baseRevenue:30000,prestige:3,desc:"Budget fan apparel",unlockAt:0},
  {id:"fan_hoodie",name:"Team Hoodie",icon:"🧥",category:"fan",baseCost:400000,baseRevenue:60000,prestige:6,desc:"Premium team hoodie",unlockAt:10},
  {id:"fan_cap",name:"Esports Cap",icon:"🧢",category:"fan",baseCost:150000,baseRevenue:20000,prestige:2,desc:"Branded cap",unlockAt:0},
  {id:"fan_mousepad",name:"XL Mousepad",icon:"🖱️",category:"fan",baseCost:300000,baseRevenue:40000,prestige:4,desc:"Giant team mousepad",unlockAt:0},
  {id:"fan_figure",name:"Player Figurines",icon:"🗿",category:"fan",baseCost:1000000,baseRevenue:150000,prestige:10,desc:"Collectible player figures",unlockAt:75},
  {id:"fan_plush",name:"Team Mascot Plush",icon:"🧸",category:"fan",baseCost:600000,baseRevenue:80000,prestige:7,desc:"Cute team mascot stuffed toy",unlockAt:20},
];

/* ── RIVALRY SYSTEM ── */
const RIVALRY_TEMPLATES = [
  "{team1} and {team2} have a HEATED rivalry after {event}!",
  "{player1} calls out {player2} saying 'See you in the finals!'",
  "{team1} accuses {team2} of camping in Zone 4! DRAMA! 💀",
  "TRASH TALK: {player1} ({team1}) destroys {player2} ({team2}) and points at camera",
  "{team1} vs {team2} — the rivalry that defines this season 🔥",
];

/* ── SPONSORS ── */
const SPONSORS = [
  {id:"redbull",name:"Red Bull",logo:"🔴",monthly:500000,prestige:15,desc:"Energy drink giant",req:null},
  {id:"monster",name:"Monster",logo:"💚",monthly:300000,prestige:10,desc:"Monster Energy",req:null},
  {id:"amd",name:"AMD",logo:"🔲",monthly:700000,prestige:20,desc:"PC hardware",minOvr:72},
  {id:"razer",name:"Razer",logo:"🐍",monthly:400000,prestige:12,desc:"Gaming peripherals",req:null},
  {id:"oneplus",name:"OnePlus",logo:"📱",monthly:600000,prestige:18,desc:"Smartphones",minWorldRank:25},
  {id:"jio",name:"Jio Gaming",logo:"📡",monthly:800000,prestige:22,desc:"Telecom + esports",minWorldRank:15},
  {id:"iqoo",name:"iQOO",logo:"⚡",monthly:550000,prestige:16,desc:"Gaming phones",req:null},
  {id:"msi",name:"MSI",logo:"💻",monthly:450000,prestige:13,desc:"Gaming laptops",req:null},
];

/* ── PARTNERSHIPS ── */
const PARTNERSHIPS = [
  {id:"logitech",name:"Logitech G",logo:"🖱️",monthly:900000,prestige:25,desc:"Pro peripherals partner",bonus:"All players +3 Aim",minOvr:65,statBonus:{aim:3}},
  {id:"nvidia",name:"NVIDIA",logo:"💚",monthly:1200000,prestige:30,desc:"GPU tech sponsor",bonus:"All players +3 GameIQ",minWorldRank:20,statBonus:{gameIQ:3}},
  {id:"redbull_gaming",name:"Red Bull Gaming",logo:"🐂",monthly:1000000,prestige:28,desc:"Performance partner",bonus:"All players +5 Mood",minOvr:70,moodBonus:5},
  {id:"intel",name:"Intel Esports",logo:"🔵",monthly:800000,prestige:22,desc:"Processing power",bonus:"+10% prize money",minWorldRank:30,prizeBonus:0.10},
  {id:"samsung",name:"Samsung Mobile",logo:"📲",monthly:700000,prestige:20,desc:"Mobile gaming partner",bonus:"All players +3 Clutch",minOvr:60,statBonus:{clutch:3}},
  {id:"mercedes",name:"Mercedes-AMG",logo:"🏎️",monthly:1500000,prestige:35,desc:"Premium auto sponsor",bonus:"Stadium upgrade discount",minWorldRank:10,stadiumDiscount:0.15},
  {id:"doritos",name:"Doritos",logo:"🌮",monthly:400000,prestige:10,desc:"Snack brand",bonus:"Free agent discount",req:null,transferDiscount:0.10},
  {id:"corsair",name:"Corsair",logo:"⚓",monthly:600000,prestige:18,desc:"Gaming gear",bonus:"All players +2 Consistency",req:null,statBonus:{consistency:2}},
];

const SOCIAL_HANDLES = ["@bgmi_fan_2025","@EsportsIndia","@BGMIdaily","@PUBGmobile_IN","@bgmianalyst","@esports_roaster","@gaming_pundit","@clutch_moments","@bgmi_highlights","@ProGamingIN","@ScoutFanClub","@JonathanArmy","@DynaStan","@BGMIInsider","@ToxicFan99","@TeamRival_hater","@NeutralObserver"];

/* ── TRANSFER DRAMA TEMPLATES ── */
const BANTER_TEMPLATES = {
  signed_from: [
    "{player} leaves {oldTeam} for {newTeam}! Blockbuster deal! 💸",
    "BREAKING: {player} ditches {oldTeam} citing 'lack of ambition' 👀",
    "{player} finally joins a REAL team — {newTeam}. Smart move! 🔥",
  ],
  released: [
    "{player} RELEASED by {team}! Free agent market just got spicy 🌶️",
    "{team} drops {player}. Budget cuts? Or performance issues? 👀",
  ],
  ai_signed: [
    "TRANSFER ALERT 🚨 {player} signs for {newTeam}! {oldTeam} must be devastated",
    "{newTeam} swoops in and steals {player}! Big money moves 💰",
  ],
  rivalry: [
    "{team1} vs {team2} rivalry is HEATING UP 🔥🔥🔥",
    "Someone tell {team1} that buying {player} won't fix their IGL problem 💀",
    "BEEF: {team1} fans vs {team2} fans going CRAZY on social media",
  ],
};

/* ── STADIUMS ── */
const STADIUMS = [
  {id:"garage",name:"Team Garage",capacity:0,cost:0,monthly:0,prestige:0,desc:"Your humble beginning",icon:"🏚️",unlocked:true},
  {id:"community",name:"Community Center",capacity:500,cost:500000,monthly:20000,prestige:5,desc:"Local esports café",icon:"🏢",unlocked:false},
  {id:"arena",name:"City Arena",capacity:5000,cost:2000000,monthly:80000,prestige:15,desc:"Regional gaming arena",icon:"🏟️",unlocked:false},
  {id:"stadium",name:"Esports Stadium",capacity:20000,cost:8000000,monthly:250000,prestige:30,desc:"Dedicated esports venue",icon:"🏟️",unlocked:false},
  {id:"megadome",name:"BGMI MegaDome",capacity:50000,cost:25000000,monthly:800000,prestige:50,desc:"World-class LAN venue",icon:"🌐",unlocked:false},
];

/* ── LAN TOURNAMENTS ── */
const LAN_EVENTS = [
  {id:"lan_nodwin",name:"NODWIN LAN Cup",prize:5000000,month:3,type:"lan",capacity:5000,prestige:20,icon:"🏟️"},
  {id:"lan_skyesports",name:"Skyesports LAN",prize:8000000,month:6,type:"lan",capacity:10000,prestige:25,icon:"🏟️"},
  {id:"lan_bgmi_masters",name:"BGMI Masters LAN",prize:15000000,month:9,type:"lan",capacity:20000,prestige:35,icon:"🏆"},
  {id:"lan_pmgc_india",name:"PMGC India Finals LAN",prize:30000000,month:11,type:"lan",capacity:50000,prestige:50,icon:"🌐"},
];

const TEAM_ROSTER = [
  {name:"Team SouL",country:"IN"},{name:"GodLike Esports",country:"IN"},{name:"Team XSpark",country:"IN"},
  {name:"Orangutan Gaming",country:"IN"},{name:"Global Esports",country:"IN"},{name:"Team Mayhem",country:"IN"},
  {name:"OR Esports",country:"IN"},{name:"Enigma Gaming",country:"IN"},{name:"Blind Esports",country:"IN"},
  {name:"Revenant Esports",country:"IN"},{name:"Marcos Gaming",country:"IN"},{name:"Team 8Bit",country:"IN"},
  {name:"S8UL Esports",country:"IN"},{name:"TSM Entity",country:"IN"},{name:"Fnatic India",country:"IN"},
  {name:"Reckoning Esports",country:"IN"},{name:"7Sea Esports",country:"IN"},{name:"Hyderabad Hydras",country:"IN"},
  {name:"Chemin Esports",country:"IN"},{name:"Team Tamilas",country:"IN"},
  {name:"Natus Vincere PK",country:"PK"},{name:"Storm PK",country:"PK"},{name:"Falcon PK",country:"PK"},{name:"Wolves PK",country:"PK"},
  {name:"Dhaka Dragons",country:"BD"},{name:"Bengal Tigers",country:"BD"},{name:"BD Stars",country:"BD"},
  {name:"Vampire MY",country:"MY"},{name:"Bacon Time TH",country:"TH"},
  {name:"EVOS ID",country:"ID"},{name:"Bigetron RA",country:"ID"},
  {name:"Nova Esports",country:"CN"},{name:"Four Angry Men",country:"CN"},
  {name:"DWG KIA",country:"KR"},{name:"Vision Strikers",country:"KR"},
  {name:"Crazy Raccoon",country:"JP"},{name:"Fennel JP",country:"JP"},
  {name:"Natus Vincere",country:"DE"},{name:"FaZe Clan",country:"US"},{name:"Cloud9",country:"US"},
  {name:"100 Thieves",country:"US"},{name:"Sentinels",country:"US"},{name:"TR Storm",country:"TR"},
  {name:"LOUD BR",country:"BR"},{name:"Pain Gaming",country:"BR"},
  {name:"Team Phoenix",country:"IN"},{name:"Brutality Esports",country:"IN"},{name:"Team Mist",country:"IN"},
  {name:"CLOT Gaming",country:"IN"},{name:"Soul X",country:"IN"},{name:"Team Insidious",country:"IN"},
  {name:"YoYo Esports",country:"IN"},{name:"Team Brute",country:"IN"},{name:"India Esports",country:"IN"},
  {name:"Team Recon",country:"IN"},{name:"Desi Gamers",country:"IN"},{name:"Team Savage",country:"IN"},
  {name:"Assault Esports",country:"IN"},{name:"Team Elite",country:"IN"},{name:"BigBrainz",country:"IN"},
  {name:"Team Omega",country:"IN"},{name:"Thunder PK",country:"PK"},{name:"Blaze PK",country:"PK"},
  {name:"Nexus BD",country:"BD"},{name:"Flash ID",country:"ID"},{name:"Rex MY",country:"MY"},
  {name:"Team Titan JP",country:"JP"},{name:"Seoul Stars",country:"KR"},{name:"Yong Esports",country:"CN"},
  {name:"Dynasty CN",country:"CN"},{name:"Team Omen TR",country:"TR"},{name:"Team Fury BR",country:"BR"},
  {name:"Allied DE",country:"DE"},{name:"Ghost US",country:"US"},{name:"Excelerate US",country:"US"},
  {name:"Team Alpha NP",country:"NP"},{name:"Team Beta LK",country:"LK"},{name:"ThunderClap TH",country:"TH"},
];

const PLAYER_NAMES=["Mortal","Scout","Jonathan","Dynamo","Thug","Naman","Saggy","Viper","Xperia","Paradox","Omega","Clutchking","Hellraiser","Phenom","Titan","Cipher","Voltage","Nighthawk","Predator","Shadow","Riptide","Zer0","Delta","Inferno","Blaze","Frost","Echo","Specter","Jinx","Reaper","Phantom","Ghost","Wraith","Venom","Apex","Surge","Bolt","Drift","Kraken","Oracle","Nexus","Pulse","Razor","Saber","Torque","Vector","Wildcard","Zenith","Ashish","Rohan","Karan","Arjun","Dev","Siddharth","Yash","Nikhil","Rahul","Prateek","Ankit","Vishal","Kunal","Manish","Rohit","Aakash","Sumit","Ajay","Vivek","Harsh","Gaurav"];
const ROOKIE_NAMES=["Riyan","Kaushik","Pratham","Aryan","Vihan","Daksh","Rudra","Aarav","Ishaan","Rehan","Zayan","Kabir","Dhruv","Atharv","Virat"];
const ROLES=["IGL","Fragger","Support","Sniper"];
const LOGOS=["🦁","🐯","🦊","🐺","🦅","🦉","🐉","🦈","🦂","🔥","⚡","💀","🎯","🏹","🛡️","🌪️","🏴","🦋","🐬","🦁"];
const TEAM_COLORS=["#ff4444","#44aaff","#44ff88","#ffaa44","#aa44ff","#ff44aa","#44ffff","#ff8844","#88ff44","#4488ff"];

const OFFICIAL_TOURNAMENTS=[
  {id:"bco",name:"BGMI Champions Open",prize:20000000,month:3,type:"official"},
  {id:"bml",name:"BGMI Masters League",prize:30000000,month:6,type:"official"},
  {id:"bno",name:"BGMI Nationals",prize:50000000,month:8,type:"official"},
  {id:"bwc",name:"BGMI World Championship",prize:100000000,month:10,type:"official"},
];
const UNOFFICIAL_TOURNAMENTS=[
  {id:"u1",name:"Nodwin Gaming Cup",prize:2000000,month:1,type:"unofficial"},
  {id:"u2",name:"GodLike Invitational",prize:1500000,month:2,type:"unofficial"},
  {id:"u3",name:"Scout's Arena",prize:1000000,month:4,type:"unofficial"},
  {id:"u4",name:"ESL India Pro League",prize:2500000,month:5,type:"unofficial"},
  {id:"u5",name:"TEC Legends Series",prize:1800000,month:7,type:"unofficial"},
  {id:"u6",name:"Skyesports Championship",prize:2200000,month:9,type:"unofficial"},
  {id:"u7",name:"BGMI Street Battle",prize:1200000,month:11,type:"unofficial"},
];
const GLOBAL_TOURNAMENTS=[
  {id:"pmgc",name:"PUBG Mobile Global Championship",prize:500000000,month:10,type:"global"},
  {id:"pmwi",name:"PMWI — World Invitational",prize:300000000,month:8,type:"global"},
  {id:"EWC",name:"Esports World Championship",prize:300000000,month:6,type:"global"},
];
/* ── BGMI GRAND FINALS (special qualifying event) ── */
const GRAND_FINALS_TOURNAMENT = {id:"bgmi_grand_finals",name:"BGMI Grand Finals",prize:200000000,month:12,type:"grand_finals",icon:"👑"};

const ALL_TOURNAMENTS=[...OFFICIAL_TOURNAMENTS,...UNOFFICIAL_TOURNAMENTS,...GLOBAL_TOURNAMENTS,...LAN_EVENTS];
const PRIZE_DIST=[0.40,0.20,0.12,0.08,0.05,0.04,0.03,0.03,0.02,0.01,0.005,0.005,0,0,0,0];
const WORLD_RANK_PTS={
  official:[100,70,50,40,30,25,20,15,10,8,6,4,2,2,1,1],
  unofficial:[30,20,14,10,8,6,5,4,3,2,1,1,0,0,0,0],
  global:[500,350,250,180,130,100,80,60,40,30,20,15,10,8,5,3],
  lan:[60,40,28,20,14,10,8,6,4,3,2,1,0,0,0,0],
  grand_finals:[1000,700,500,380,260,200,150,110,80,60,40,25,15,10,5,3],
};

/* ═══ UTILS ═══ */
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function fmtMoney(n){return n>=10000000?"₹"+(n/10000000).toFixed(1)+"Cr":"₹"+(n/100000).toFixed(1)+"L";}
function fmtTime(s){const m=Math.floor(s/60),sec=s%60;return`${m}:${sec.toString().padStart(2,"0")}`;}
function calcOvr(p){return Math.round(p.stats.aim*0.30+p.stats.gameIQ*0.25+p.stats.clutch*0.20+p.stats.comm*0.10+p.stats.consistency*0.15);}
function effectiveOvr(p){return Math.max(40,Math.min(99,p.ovr+Math.floor(((p.mood||70)-50)/8)));}
function teamRating(team){
  if(!team.players.length) return 0;
  const avgOvr=team.players.reduce((s,p)=>s+effectiveOvr(p),0)/team.players.length;
  const moodBonus=(team.players.reduce((s,p)=>s+(p.mood||70),0)/team.players.length-70)/10;
  return Math.round(Math.min(99,Math.max(30,avgOvr+moodBonus+(team.prestige||50)*0.05)));
}

function fillBanterTemplate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] || k);
}

/* ─── PLAYER GROWTH SYSTEM ─── */
function applyPlayerGrowth(player, matchKills, matchPlacement, isWin) {
  const age = player.age || 22;
  const growthRate = age <= 21 ? 0.8 : age <= 24 ? 0.5 : age <= 27 ? 0.2 : 0.05;
  const perfScore = matchKills * 2 + (isWin ? 10 : 0) + Math.max(0, 16 - matchPlacement);
  
  const newStats = { ...player.stats };
  if (perfScore >= 15 && Math.random() < growthRate * 0.4) {
    const stat = pick(["aim","gameIQ","clutch","consistency"]);
    newStats[stat] = Math.min(99, newStats[stat] + 1);
  }
  if (perfScore < 5 && Math.random() < 0.15) {
    const stat = pick(["consistency","comm"]);
    newStats[stat] = Math.max(40, newStats[stat] - 1);
  }
  
  // Potential growth for young players
  const pot = player.potential || player.ovr;
  const canGrow = calcOvr({...player, stats: newStats}) < pot + 5;
  
  return {
    ...player,
    stats: newStats,
    ovr: calcOvr({...player, stats: newStats}),
    potential: pot,
    growthHistory: [...(player.growthHistory || []), { season: player.season?.kills || 0, ovr: player.ovr }].slice(-10),
  };
}

/* ─── RIVALRY ENGINE ─── */
function checkRivalry(playerTeam, allTeams, tournamentHistory) {
  const rivals = [];
  // Find teams you've faced most
  const encounters = {};
  tournamentHistory.forEach(h => {
    (h.standings || []).forEach(s => {
      if (s.teamName !== playerTeam.name) {
        encounters[s.teamName] = (encounters[s.teamName] || 0) + 1;
      }
    });
  });
  
  Object.entries(encounters)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([name, count]) => {
      const team = allTeams.find(t => t.name === name);
      if (team) rivals.push({ team, encounters: count, intensity: Math.min(10, count * 2) });
    });
  
  return rivals;
}

/* ─── AWARD CEREMONY ─── */
function computeTournamentAwards(results, tournamentName, season) {
  const sorted = [...results].sort((a, b) => b.total - a.total);
  const allPlayers = [];
  results.forEach(r => r.playerStats?.forEach(ps => allPlayers.push({ ...ps, teamName: r.team.name, teamRank: r.placement })));
  
  const killLeader = [...allPlayers].sort((a, b) => b.kills - a.kills)[0];
  const mvp = allPlayers.reduce((best, p) => {
    const score = p.kills * 3 + (16 - p.teamRank) * 1.5 + (p.survivalTime || 0) / 120;
    const bestScore = best ? best.kills * 3 + (16 - best.teamRank) * 1.5 + (best.survivalTime || 0) / 120 : -1;
    return score > bestScore ? p : best;
  }, null);
  
  return {
    champion: sorted[0]?.team,
    runnerUp: sorted[1]?.team,
    third: sorted[2]?.team,
    mvp,
    killLeader,
    tournamentName,
    season,
    timestamp: Date.now(),
  };
}

/* ─── AI TRANSFERS ─── */
function runAITransfers(game) {
  const { aiTeams, freeAgents, playerTeam } = game;
  const newFreeAgents = [...freeAgents];
  const updatedAI = aiTeams.map(t => ({...t, players:[...t.players]}));
  const newSocialPosts = [];
  const transferLog = [...(game.transferLog||[])];

  updatedAI.forEach((team, ti) => {
    const needsPlayer = team.players.length < 4;
    const avgOvr = team.players.length ? team.players.reduce((s,p)=>s+p.ovr,0)/team.players.length : 0;
    const wantsUpgrade = avgOvr < 75 && team.budget > 2000000 && Math.random() < 0.4;
    const roles = team.players.map(p=>p.role);
    const missingRole = ROLES.find(r => !roles.includes(r));

    if ((needsPlayer || wantsUpgrade) && newFreeAgents.length > 0) {
      let candidates = newFreeAgents.filter(fa => fa.salary * 3 <= team.budget * 0.3 && fa.id !== "player");
      if (missingRole) { const roleMatch = candidates.filter(c => c.role === missingRole); if (roleMatch.length) candidates = roleMatch; }
      candidates.sort((a,b) => b.ovr - a.ovr);
      if (candidates.length > 0) {
        const target = candidates[0];
        const idx = newFreeAgents.findIndex(f => f.id === target.id);
        if (idx >= 0) {
          const signed = {...target, teamId: team.id, isFree: false, mood: 75};
          updatedAI[ti].players.push(signed);
          updatedAI[ti].budget -= signed.salary * 3;
          newFreeAgents.splice(idx, 1);
          const text = fillBanterTemplate(pick(BANTER_TEMPLATES.ai_signed), { player: signed.name.split("#")[0], newTeam: team.name, oldTeam: "Free Agency" });
          newSocialPosts.push({ id: Date.now() + Math.random(), user: pick(SOCIAL_HANDLES), text, likes: rand(100, 3000), type: "transfer", season: game.season, isTransfer: true });
          transferLog.push({ type: "ai_sign", player: signed.name, fromTeam: "Free Agent", toTeam: team.name, season: game.season, month: game.month });
        }
      }
    }

    if (team.players.length > 4 && team.budget < 500000) {
      const sorted = [...updatedAI[ti].players].sort((a,b)=>a.ovr-b.ovr);
      const weakest = sorted[0];
      if (weakest && weakest.ovr < 60) {
        updatedAI[ti].players = updatedAI[ti].players.filter(p=>p.id!==weakest.id);
        newFreeAgents.push({...weakest, teamId:null, isFree:true, mood:50});
        const text = fillBanterTemplate(pick(BANTER_TEMPLATES.released), { player: weakest.name.split("#")[0], team: team.name });
        newSocialPosts.push({ id: Date.now() + Math.random(), user: pick(SOCIAL_HANDLES), text, likes: rand(50,800), type: "transfer", season: game.season, isTransfer: true });
        transferLog.push({ type:"ai_release", player:weakest.name, fromTeam:team.name, season:game.season, month:game.month });
      }
    }
  });

  return { updatedAI, newFreeAgents, newSocialPosts, transferLog };
}

/* ═══ COMMENTARY GENERATOR ═══ */
function generateCommentary(killFeed, poolSnapshot, t16) {
  const lines=[];
  const playerKills={};
  const teamAlive={};
  t16.forEach(t=>{teamAlive[t.id]=PLAYERS_PER_TEAM;});

  killFeed.forEach(ev=>{
    if(ev.type==="zone"){ lines.push({type:"phase",icon:ev.icon,text:ev.text,time:fmtTime(ev.time),cls:ev.color,border:ev.border}); return; }
    if(ev.type==="winner"){ lines.push({type:"wwcd",icon:"🍗",text:`CHICKEN DINNER! ${ev.teamName} WINS THE MATCH!`,time:fmtTime(ev.time),cls:"text-yellow-400"}); return; }
    if(ev.type==="rotation_death"){
      if(ev.victimTeam&&teamAlive[ev.victimTeam]!==undefined) teamAlive[ev.victimTeam]=Math.max(0,teamAlive[ev.victimTeam]-1);
      const alive=teamAlive[ev.victimTeam]||0;
      lines.push({type:"zone_kill",icon:"🌀",text:`${ev.victim} (${ev.victimTeam}) eliminated by Blue Zone — ${alive>0?alive+" remain":"TEAM OUT"}`,time:fmtTime(ev.time),cls:"text-blue-400"});
      if(alive===0) lines.push({type:"team_out",icon:"💀",text:`${ev.victimTeam} has been ELIMINATED!`,time:fmtTime(ev.time),cls:"text-red-500 font-black"});
      return;
    }
    if(ev.killer){playerKills[ev.killer]=(playerKills[ev.killer]||0)+1;}
    if(ev.victimTeam&&teamAlive[ev.victimTeam]!==undefined) teamAlive[ev.victimTeam]=Math.max(0,teamAlive[ev.victimTeam]-1);
    const aliveInVictimTeam=teamAlive[ev.victimTeam]||0;
    const kk=playerKills[ev.killer]||1;
    const aliveTeams=Object.values(teamAlive).filter(v=>v>0).length;
    const ctxSuffix=aliveTeams<=3?` 🔥 ONLY ${aliveTeams} TEAMS LEFT!`:aliveTeams<=6?` · ${aliveTeams} teams remain`:"";

    let icon,text,cls;
    if(ev.type==="vehicle_kill"){icon="🚗";cls="text-orange-400";text=`VEHICLE KILL! ${ev.killer} (${ev.killerTeam}) runs over ${ev.victim}! ${kk} kills${ctxSuffix}`;}
    else if(ev.type==="third_party"){icon="⚔️";cls="text-purple-400";text=`THIRD PARTY! ${ev.killer} (${ev.killerTeam}) ambushes ${ev.victim} with ${ev.weapon}!${ctxSuffix}`;}
    else if(ev.type==="utility_kill"){icon="💣";cls="text-red-400";text=`${ev.killer} UTILITY KILL on ${ev.victim} with ${ev.weapon}!${ctxSuffix}`;}
    else{icon="🔫";cls="text-gray-300";const extra=kk>=5?" — ON FIRE!":kk>=3?" — rolling!":"";text=`${ev.killer} eliminates ${ev.victim} with ${ev.weapon} [${kk}💀]${extra}`;}
    lines.push({type:ev.type,icon,text,time:fmtTime(ev.time),cls});
    if(aliveInVictimTeam===0) lines.push({type:"team_out",icon:"💀",text:`${ev.victimTeam} has been ELIMINATED!`,time:fmtTime(ev.time),cls:"text-red-500"});
    if(aliveTeams===2) lines.push({type:"final",icon:"🔥",text:`FINAL 2 TEAMS! Who takes the WWCD?`,time:fmtTime(ev.time),cls:"text-yellow-400 font-black"});
  });
  return lines;
}

function simSingleMatch(teams16){
  const t16=teams16.slice(0,TEAMS_PER_MATCH);
  const killFeed=[];
  const pool=[];
  t16.forEach(team=>{
    team.players.slice(0,PLAYERS_PER_TEAM).forEach(p=>{
      pool.push({id:p.id,name:p.name,teamId:team.id,teamName:team.name,ovr:effectiveOvr(p),role:p.role,alive:true,kills:0,damage:0,survivalTime:0});
    });
  });
  let tick=0;
  const getAlive=()=>pool.filter(p=>p.alive);
  const getAliveTeamIds=()=>new Set(getAlive().map(p=>p.teamId));

  function doKill(victim,killer,type,weapon,extra={}){
    if(!victim||!victim.alive) return false;
    victim.alive=false;victim.deathTime=tick;victim.survivalTime=tick;
    if(killer){killer.kills++;killer.damage+=rand(80,350);}
    killFeed.push({type,time:tick,killer:killer?.name||null,killerTeam:killer?.teamName||null,victim:victim.name,victimTeam:victim.teamName,weapon:weapon||null,...extra});
    return true;
  }

  ZONE_PHASES.forEach((zone,zi)=>{
    killFeed.push({type:"zone",time:tick,text:zone.name,icon:zone.icon,color:zone.color,border:zone.border});
    const alive=getAlive();
    if(alive.length<=1) return;
    const tgtKills=Math.max(1,Math.floor(alive.length*zone.killRate));
    const zoneDth=Math.floor(alive.length*zone.zoneDeath);
    for(let d=0;d<zoneDth&&getAlive().length>1;d++){
      const a=getAlive();if(!a.length) break;
      tick+=rand(8,25);doKill(pick(a),null,"rotation_death",null,{cause:"Blue Zone"});
    }
    let done=0;
    while(done<tgtKills&&getAlive().length>1){
      tick+=rand(15,60);
      const a=getAlive();if(a.length<2) break;
      const victim=pick(a);
      const enemies=a.filter(p=>p.teamId!==victim.teamId);
      if(!enemies.length){doKill(victim,null,"rotation_death",null,{cause:"Blue Zone"});done++;continue;}
      const killer=pick(enemies);
      const roll=Math.random();
      if(roll<0.07&&zi>=1) doKill(victim,killer,"vehicle_kill",pick(VEHICLES),{isVehicle:true});
      else if(roll<0.16&&zi>=2) doKill(victim,killer,"third_party",pick(WEAPONS),{isThirdParty:true});
      else if(roll<0.23) doKill(victim,killer,"utility_kill",pick(UTILITY),{isUtility:true});
      else doKill(victim,killer,"kill",pick(WEAPONS));
      done++;
    }
    tick+=rand(60,120);
    if(getAliveTeamIds().size<=1) return;
  });

  const aliveIds=[...getAliveTeamIds()];
  let winnerTeamId=null;
  if(aliveIds.length>1){
    const strengths={};
    t16.forEach(t=>{
      const avgOvr=t.players.reduce((s,p)=>s+effectiveOvr(p),0)/t.players.length;
      const tkills=pool.filter(p=>p.teamId===t.id).reduce((s,p)=>s+p.kills,0);
      strengths[t.id]=avgOvr+tkills*4+rand(-12,12);
    });
    aliveIds.sort((a,b)=>(strengths[b]||0)-(strengths[a]||0));
    winnerTeamId=aliveIds[0];
    getAlive().filter(p=>p.teamId!==winnerTeamId).forEach(victim=>{
      const wAlive=getAlive().filter(p=>p.teamId===winnerTeamId);
      tick+=rand(5,20);doKill(victim,wAlive.length?pick(wAlive):null,"kill",pick(WEAPONS));
    });
  } else if(aliveIds.length===1){ winnerTeamId=aliveIds[0]; }
  pool.filter(p=>p.alive).forEach(p=>{p.survivalTime=tick+rand(0,30);});
  const winnerTeam=t16.find(t=>t.id===winnerTeamId);
  if(winnerTeam) killFeed.push({type:"winner",time:tick+30,teamName:winnerTeam.name});

  const survivors=pool.filter(p=>p.alive&&p.teamId===winnerTeamId).map(p=>({playerName:p.name,role:p.role,kills:p.kills,damage:p.damage,teamName:winnerTeam?.name||"",teamId:winnerTeamId}));
  const eliminated_players=pool.filter(p=>!p.alive&&p.teamId===winnerTeamId).map(p=>({playerName:p.name,kills:p.kills,deathTime:p.deathTime}));

  const results=t16.map(team=>{
    const tp=pool.filter(p=>p.teamId===team.id);
    const teamKills=tp.reduce((s,p)=>s+p.kills,0);
    const aliveCount=tp.filter(p=>p.alive).length;
    const avgOvr=team.players.reduce((a,p)=>a+effectiveOvr(p),0)/team.players.length;
    const strength=avgOvr+teamKills*3+aliveCount*6+rand(-5,5)+team.prestige*0.05;
    const playerStats=tp.map(p=>({playerId:p.id,playerName:p.name,role:p.role,kills:p.kills,survivalTime:p.survivalTime,damage:p.damage+rand(0,100),isTopFragger:false}));
    const maxK=Math.max(...playerStats.map(p=>p.kills));
    if(maxK>0) playerStats.forEach(p=>{if(p.kills===maxK)p.isTopFragger=true;});
    return{team,kills:teamKills,strength,placement:0,placePts:0,total:0,playerStats,aliveCount};
  });
  results.sort((a,b)=>b.strength-a.strength);
  results.forEach((r,i)=>{r.placement=i+1;r.placePts=PLACEMENT_PTS[i]||0;r.total=r.kills+r.placePts;});
  let potm=null,potmScore=-1;
  results.forEach(r=>r.playerStats.forEach(ps=>{
    const score=ps.kills*2+(TEAMS_PER_MATCH-r.placement+1)*0.5+ps.survivalTime/600;
    if(score>potmScore){potmScore=score;potm={...ps,teamName:r.team.name,placement:r.placement};}
  }));
  const totalKills=pool.reduce((s,p)=>s+p.kills,0);
  const killTypeStats={
    normal:killFeed.filter(e=>e.type==="kill").length,
    vehicle:killFeed.filter(e=>e.type==="vehicle_kill").length,
    thirdParty:killFeed.filter(e=>e.type==="third_party").length,
    utility:killFeed.filter(e=>e.type==="utility_kill").length,
    zone:killFeed.filter(e=>e.type==="rotation_death").length,
  };
  const commentary=generateCommentary(killFeed,[...pool],t16);
  return{results,potm,map:pick(MAPS),killFeed,totalKills,killTypeStats,commentary,survivors,eliminated_players,winnerTeam};
}

function autoSimulateGroup(teams16,matchCount){
  const standing={};
  teams16.forEach(t=>{standing[t.id]={team:t,kills:0,placePts:0,total:0,matches:[]};});
  const matchResults=[];
  for(let m=0;m<matchCount;m++){
    const r=simSingleMatch([...teams16].sort(()=>Math.random()-0.5).slice(0,TEAMS_PER_MATCH));
    r.results.forEach(res=>{
      if(standing[res.team.id]){standing[res.team.id].kills+=res.kills;standing[res.team.id].placePts+=res.placePts;standing[res.team.id].total+=res.total;}
    });
    matchResults.push(r);
  }
  return{standings:Object.values(standing).sort((a,b)=>b.total-a.total),matchResults};
}

function buildGroups(teams,count){
  const g=count||8;
  const shuffled=[...teams].sort(()=>Math.random()-0.5);
  const groups=Array.from({length:g},(_,i)=>({letter:GROUP_LETTERS[i],teams:[]}));
  shuffled.forEach((t,i)=>groups[i%g].teams.push(t));
  return groups;
}

function simulateFullTournament(all128) {
  let roundTeams = [...all128];
  let finalStandings = null;
  for (const roundDef of T_ROUNDS) {
    const groups = buildGroups(roundTeams, roundDef.groups);
    const allGroupStandings = [];
    groups.forEach(grp => {
      const {standings} = autoSimulateGroup(grp.teams, roundDef.matchesPerGroup);
      allGroupStandings.push(standings);
    });
    if (roundDef.advancePerGroup === 0) { finalStandings = allGroupStandings[0]; break; }
    const nextTeams = [];
    allGroupStandings.forEach(st => nextTeams.push(...st.slice(0, roundDef.advancePerGroup).map(s=>s.team)));
    roundTeams = nextTeams;
  }
  return finalStandings || [];
}

function genPlayer(id,teamId=null,country="IN",teamName=null,isRookie=false){
  const br=isRookie?[42,72]:[50,95];
  const s={aim:rand(...br),gameIQ:rand(...br),clutch:rand(isRookie?40:45,isRookie?68:95),comm:rand(50,95),consistency:rand(isRookie?38:42,isRookie?65:95)};
  const age=isRookie?rand(17,19):rand(17,27);
  const baseOvr=Math.round(s.aim*0.30+s.gameIQ*0.25+s.clutch*0.20+s.comm*0.10+s.consistency*0.15);
  const p={id,name:(isRookie?pick(ROOKIE_NAMES):pick(PLAYER_NAMES))+"#"+rand(100,999),role:pick(ROLES),country,age,salary:isRookie?rand(15000,60000):rand(25000,280000),contract:rand(1,3),teamId,stats:s,ovr:0,potential:Math.min(99,baseOvr+rand(0,isRookie?15:8)),mood:rand(65,90),fatigue:rand(0,25),isRookie,isFree:!teamId,
    career:{kills:isRookie?0:rand(0,8000),matches:isRookie?0:rand(0,600),wins:0,damage:0,tournaments:0,survivalTime:0},
    season:{kills:0,matches:0,wins:0,damage:0,points:0,survivalTime:0},
    teamHistory:teamName?[{teamName,from:"Pre-2025",to:null,kills:isRookie?0:rand(0,5000),matches:isRookie?0:rand(0,400),season:"Pre-2025"}]:[],
    competitionHistory:[],mvpCount:0,growthHistory:[],
    // Fan favorite score
    fanScore: rand(100, 10000),
  };
  p.ovr=calcOvr(p);
  return p;
}
function genTeam(id,name,country="IN",isPlayer=false){
  const logo=pick(LOGOS),color=pick(TEAM_COLORS);
  const players=Array.from({length:PLAYERS_PER_TEAM},(_,i)=>genPlayer(`${id}_p${i}`,id,country,name));
  return{id,name,country,logo,color,isPlayer,budget:isPlayer?15000000:rand(5000000,25000000),fans:rand(5000,800000),prestige:rand(25,95),players,stats:{wins:0,losses:0,kills:0,points:0,tWins:0},trophies:[],seasonPoints:0,history:[],worldRankPts:rand(0,200),signings:[],form:[],mvpTotal:0,stadiumId:"garage",
    // Chicken dinner count
    chickenDinners: rand(0,15),
    // Rivalries
    rivalries: [],
  };
}
function genRookies(season){
  return Array.from({length:rand(4,8)},(_,i)=>genPlayer(`rookie_${season}_${i}`,null,pick(["IN","IN","IN","PK","BD","NP"]),null,true));
}

function genSocialPosts(tName,rank,teamName,kills,season){
  const posts=[],now=Date.now();
  if(rank===1){
    posts.push({id:now,user:pick(SOCIAL_HANDLES),text:`🏆 ${teamName} wins ${tName}! Absolute dominance with ${kills} total kills! #BGMI`,likes:rand(800,8000),type:"hype",season});
    posts.push({id:now+1,user:pick(SOCIAL_HANDLES),text:`${teamName} took the chicken dinner! S${season} champs! 🍗🔥`,likes:rand(400,4000),type:"hype",season});
  } else if(rank<=3){
    posts.push({id:now,user:pick(SOCIAL_HANDLES),text:`${teamName} finishes #${rank} at ${tName}! ${kills} kills. Keep grinding 💪`,likes:rand(200,2000),type:"positive",season});
  } else if(rank<=8){
    posts.push({id:now,user:pick(SOCIAL_HANDLES),text:`${teamName} ends #${rank} in ${tName}. Decent but had higher potential... 🤔`,likes:rand(80,800),type:"neutral",season});
  } else {
    posts.push({id:now,user:pick(SOCIAL_HANDLES),text:`${teamName} disappoints with #${rank} in ${tName}. What happened? 😬`,likes:rand(40,400),type:"negative",season});
  }
  return posts;
}

function initGame(customTeam=null){
  const baseRoster=[...TEAM_ROSTER];
  while(baseRoster.length<127){baseRoster.push({name:`Team Extra ${baseRoster.length}`,country:pick(["IN","IN","IN","PK","BD","KR","CN"])});}
  const aiTeams=baseRoster.slice(0,127).map((t,i)=>genTeam(`t${i}`,t.name,t.country,false));
  const playerTeam=customTeam||genTeam("player","Your Team","IN",true);
  playerTeam.budget=15000000;playerTeam.id="player";playerTeam.isPlayer=true;
  playerTeam.stadiumId="garage";playerTeam.chickenDinners=0;playerTeam.rivalries=[];
  const freeAgents=Array.from({length:60},(_,i)=>genPlayer(`fa${i}`,null,pick(Object.keys(COUNTRIES))));
  return{
    version:8,season:2025,month:1,phase:"signing",
    playerTeam,aiTeams,freeAgents,
    completedTournaments:{},tournamentHistory:[],
    news:[{id:1,text:`Welcome to BGMI Manager v8! Build your legacy, earn chicken dinners, and qualify for the Grand Finals!`,type:"info",month:1}],
    finances:{totalEarned:0,totalSpent:0,sponsorship:500000},
    globalQualified:false,grandFinalsQualified:false,
    worldRankings:[],seasonAwards:{},signingLog:[],
    socialFeed:[],activeSponsors:[],activePartnerships:[],
    dailyMVP:[],matchMVPHistory:[],
    hallOfFame:[],
    transferLog:[],
    stadiums:STADIUMS.map(s=>({...s})),
    tournamentWinners:{},
    tournamentAwards:{}, // per tournament awards
    // MERCH
    ownedMerch: [],
    // Chicken dinner leaderboard (global)
    chickenLeaderboard: [],
    // RIVALRIES
    rivalries: [],
    // Fan/Media awards
    mediaAwards: [],
    // Grand Finals history
    grandFinalsHistory: [],
    // Season highlights (clutch plays)
    highlights: [],
  };
}

const SAVE_KEY="bgmi_v8";
function saveGame(g){try{localStorage.setItem(SAVE_KEY,JSON.stringify(g));return true;}catch(e){return false;}}
function loadGame(){try{const d=localStorage.getItem(SAVE_KEY);return d?JSON.parse(d):null;}catch(e){return null;}}

/* ═══════════════════════════════════════════════════════════
   UI COMPONENTS
═══════════════════════════════════════════════════════════ */
function TierBadge({type}){
  const cfg={official:{label:"🏆 Official",cls:"bg-amber-500/20 text-amber-300 border-amber-500/40"},unofficial:{label:"🎮 Unofficial",cls:"bg-sky-500/20 text-sky-300 border-sky-500/40"},global:{label:"🌍 Global",cls:"bg-violet-500/20 text-violet-300 border-violet-500/40"},lan:{label:"🏟️ LAN",cls:"bg-pink-500/20 text-pink-300 border-pink-500/40"},grand_finals:{label:"👑 GRAND FINALS",cls:"bg-yellow-500/20 text-yellow-300 border-yellow-500/40"}};
  const c=cfg[type]||cfg.unofficial;
  return <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${c.cls}`}>{c.label}</span>;
}
function OvrBadge({ovr}){
  const cls=ovr>=88?"text-yellow-300":ovr>=75?"text-green-400":ovr>=62?"text-sky-400":"text-gray-400";
  return <span className={`font-black text-2xl ${cls}`}>{ovr}</span>;
}
function RatingBar({label,value,color="bg-orange-500"}){
  return(<div className="mb-1.5"><div className="flex justify-between text-xs mb-0.5"><span className="text-gray-400">{label}</span><span className="text-white font-bold">{value}</span></div><div className="h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className={`h-full ${color} rounded-full`} style={{width:`${value}%`,transition:"width 0.4s"}}/></div></div>);
}
function MoodBadge({mood}){
  const m=mood||70;
  const cls=m>=80?"text-green-400 bg-green-500/10 border-green-500/30":m>=60?"text-yellow-400 bg-yellow-500/10 border-yellow-500/30":"text-red-400 bg-red-500/10 border-red-500/30";
  return <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${cls}`}>{m>=80?"😊":m>=60?"😐":"😠"}{m}</span>;
}
function TeamRatingBadge({rating}){
  const cls=rating>=85?"bg-yellow-500/20 text-yellow-300 border-yellow-500/40":rating>=70?"bg-green-500/20 text-green-300 border-green-500/40":rating>=55?"bg-sky-500/20 text-sky-300 border-sky-500/40":"bg-gray-700/50 text-gray-400 border-gray-600/40";
  return <span className={`text-xs font-black px-2 py-0.5 rounded-lg border ${cls}`}>⭐{rating}</span>;
}

/* ─── AWARD CEREMONY MODAL ─── */
function AwardCeremonyModal({ awards, onClose }) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "🥉 3rd Place", team: awards.third, color: "text-amber-600", bg: "from-amber-900/40 to-amber-800/20", border: "border-amber-600/40" },
    { title: "🥈 Runner-Up", team: awards.runnerUp, color: "text-gray-300", bg: "from-gray-700/40 to-gray-600/20", border: "border-gray-500/40" },
    { title: "🥇 CHAMPION", team: awards.champion, color: "text-yellow-400", bg: "from-yellow-900/50 to-amber-800/30", border: "border-yellow-500/50" },
    { title: "🌟 Tournament MVP", player: awards.mvp, color: "text-purple-400", bg: "from-purple-900/40 to-purple-800/20", border: "border-purple-500/40", isMvp: true },
    { title: "💀 Kill Leader", player: awards.killLeader, color: "text-red-400", bg: "from-red-900/40 to-red-800/20", border: "border-red-500/40", isKill: true },
  ];
  const cur = steps[step];
  return (
    <div className="fixed inset-0 bg-black/98 z-[400] flex items-center justify-center p-4">
      <div className={`bg-gradient-to-br ${cur.bg} border ${cur.border} rounded-3xl w-full max-w-md p-8 text-center`} style={{boxShadow:`0 0 60px rgba(255,200,50,0.15)`}}>
        <div className="text-xs font-black text-gray-500 mb-2 tracking-widest">{awards.tournamentName} · S{awards.season}</div>
        <div className="text-5xl mb-4">{cur.title.split(" ")[0]}</div>
        <div className={`text-2xl font-black ${cur.color} mb-2`}>{cur.title}</div>
        {cur.team && (
          <div className="mt-4 bg-black/30 rounded-2xl p-5">
            <div className="text-4xl mb-2">{cur.team.logo || "🏆"}</div>
            <div className="text-white font-black text-xl">{cur.team.name}</div>
            <div className="text-gray-400 text-sm mt-1">{COUNTRIES[cur.team.country]?.flag} {COUNTRIES[cur.team.country]?.name}</div>
          </div>
        )}
        {cur.isMvp && cur.player && (
          <div className="mt-4 bg-black/30 rounded-2xl p-5">
            <div className="text-3xl mb-2">🌟</div>
            <div className="text-white font-black text-lg">{cur.player.playerName}</div>
            <div className="text-purple-400 text-sm">{cur.player.teamName}</div>
            <div className="flex justify-center gap-4 mt-2 text-sm">
              <div><div className="text-red-400 font-black">{cur.player.kills}</div><div className="text-gray-500 text-xs">Kills</div></div>
              <div><div className="text-blue-400 font-black">{fmtTime(cur.player.survivalTime||0)}</div><div className="text-gray-500 text-xs">Survival</div></div>
            </div>
          </div>
        )}
        {cur.isKill && cur.player && (
          <div className="mt-4 bg-black/30 rounded-2xl p-5">
            <div className="text-3xl mb-2">💀</div>
            <div className="text-white font-black text-lg">{cur.player.playerName}</div>
            <div className="text-red-400 font-black text-2xl mt-1">{cur.player.kills} KILLS</div>
            <div className="text-gray-400 text-sm">{cur.player.teamName}</div>
          </div>
        )}
        <div className="flex gap-3 mt-6">
          {step > 0 && <button onClick={() => setStep(s => s - 1)} className="flex-1 bg-gray-800 text-gray-400 py-3 rounded-xl font-bold">← Back</button>}
          {step < steps.length - 1
            ? <button onClick={() => setStep(s => s + 1)} className={`flex-1 bg-gradient-to-r from-yellow-600 to-amber-500 text-white font-black py-3 rounded-xl`}>Next →</button>
            : <button onClick={onClose} className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black py-3 rounded-xl">🎉 Close Ceremony</button>
          }
        </div>
        <div className="flex justify-center gap-1.5 mt-3">
          {steps.map((_,i)=><div key={i} className={`w-2 h-2 rounded-full ${i===step?"bg-yellow-400":"bg-gray-700"}`}/>)}
        </div>
      </div>
    </div>
  );
}

/* ─── WWCD DISPLAY ─── */
function WwcdDisplay({survivors,eliminatedFromWinner,winnerTeam}){
  if(!winnerTeam) return null;
  return(
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 mt-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-4xl">🍗</div>
        <div><div className="text-yellow-400 font-black text-lg">CHICKEN DINNER!</div><div className="text-white font-bold">{winnerTeam.name}</div><div className="text-yellow-300 text-xs">{survivors.length}/{PLAYERS_PER_TEAM} players survived</div></div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {survivors.map((s,i)=>(
          <div key={i} className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="text-green-400 font-black text-sm">✓</span>
            <div className="flex-1 min-w-0"><div className="text-white font-bold text-xs truncate">{s.playerName}</div><div className="text-gray-400 text-[10px]">{s.role}</div></div>
            <span className="text-red-400 font-black text-sm">{s.kills}💀</span>
          </div>
        ))}
        {eliminatedFromWinner.map((s,i)=>(
          <div key={`e${i}`} className="bg-gray-800/60 border border-gray-700/40 rounded-xl px-3 py-2 flex items-center gap-2 opacity-60">
            <span className="text-red-500 text-sm">✗</span>
            <div className="flex-1 min-w-0"><div className="text-gray-400 font-bold text-xs truncate">{s.playerName}</div></div>
            <span className="text-red-500 text-xs">{s.kills}💀</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveCommentaryDisplay({commentary,isLive,onFinish}){
  const [shown,setShown]=useState([]);
  const [done,setDone]=useState(false);
  const endRef=useRef(null);
  const intervalRef=useRef(null);

  useEffect(()=>{
    if(!isLive||!commentary.length){setShown(commentary);setDone(true);return;}
    setShown([]);setDone(false);
    let idx=0;
    intervalRef.current=setInterval(()=>{
      if(idx>=commentary.length){clearInterval(intervalRef.current);setDone(true);if(onFinish)onFinish();return;}
      setShown(prev=>[...prev,commentary[idx]]);idx++;
    },80);
    return()=>clearInterval(intervalRef.current);
  },[commentary,isLive]);

  useEffect(()=>{if(endRef.current)endRef.current.scrollIntoView({behavior:"smooth"});},[shown]);
  function skipToEnd(){clearInterval(intervalRef.current);setShown(commentary);setDone(true);if(onFinish)onFinish();}

  return(
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLive&&!done?"bg-red-500 animate-pulse":"bg-gray-500"}`}/>
          <span className="text-xs font-black text-gray-400">{isLive&&!done?"LIVE":"REPLAY"} — {shown.length}/{commentary.length}</span>
        </div>
        {isLive&&!done&&<button onClick={skipToEnd} className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-1 rounded-lg font-bold border border-gray-700">⏭ Skip</button>}
      </div>
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-3 max-h-80 overflow-auto font-mono text-[11px] space-y-0.5">
        {shown.map((line,i)=>{
          if(line.type==="phase") return(<div key={i} className={`flex items-center gap-2 py-1.5 px-2 rounded-lg my-1 border ${line.border||"border-gray-700"} bg-gray-900/60`}><span>{line.icon}</span><span className={`font-black ${line.cls}`}>{line.text}</span><span className="ml-auto text-gray-600">{line.time}</span></div>);
          if(line.type==="wwcd") return(<div key={i} className="py-2 px-2 rounded-xl my-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-black text-center text-sm">{line.icon} {line.text}</div>);
          if(line.type==="team_out") return(<div key={i} className="py-1 px-2 text-red-500 font-bold">{line.icon} {line.text}</div>);
          if(line.type==="final") return(<div key={i} className="py-1 px-2 text-yellow-400 font-black text-center border-t border-b border-yellow-500/20 my-1">{line.icon} {line.text}</div>);
          return(<div key={i} className={`flex items-start gap-2 px-2 py-0.5 ${line.cls||"text-gray-300"}`}><span className="text-gray-600 w-10 shrink-0">{line.time}</span><span className="text-sm">{line.icon}</span><span className="flex-1">{line.text}</span></div>);
        })}
        <div ref={endRef}/>
      </div>
    </div>
  );
}

function SingleMatchResult({match,onClose,isLive=false}){
  const [activeTab,setActiveTab]=useState(isLive?"commentary":"standings");
  const [selectedTeam,setSelectedTeam]=useState(null);
  const [commentaryDone,setCommentaryDone]=useState(!isLive);
  if(!match) return null;
  const{results,potm,map,totalKills,commentary,survivors,eliminated_players,winnerTeam,killTypeStats}=match;
  return(
    <div className="fixed inset-0 bg-black/98 z-[220] overflow-auto flex items-start justify-center p-4 pt-6">
      <div className="bg-gray-950 border border-purple-500/30 rounded-3xl w-full max-w-4xl">
        <div className="sticky top-0 bg-gray-950 border-b border-gray-800 p-5 flex items-start justify-between rounded-t-3xl z-10">
          <div>
            {isLive&&!commentaryDone?<div className="text-[10px] font-black bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full inline-block mb-1 animate-pulse">🔴 LIVE</div>:<div className="text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full inline-block mb-1">⚡ MATCH</div>}
            <h2 className="text-xl font-black text-white">{map.icon} {map.name}</h2>
            <div className="flex gap-3 text-xs text-gray-500 mt-0.5"><span>{results.length} teams</span><span className="text-red-400">💀 {totalKills}/63</span></div>
            {killTypeStats&&<div className="flex gap-2 mt-1 flex-wrap">
              {killTypeStats.vehicle>0&&<span className="text-[10px] bg-orange-500/15 text-orange-400 px-1.5 py-0.5 rounded">🚗{killTypeStats.vehicle}</span>}
              {killTypeStats.thirdParty>0&&<span className="text-[10px] bg-purple-500/15 text-purple-400 px-1.5 py-0.5 rounded">⚔️{killTypeStats.thirdParty}</span>}
              {killTypeStats.utility>0&&<span className="text-[10px] bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded">💣{killTypeStats.utility}</span>}
              {killTypeStats.zone>0&&<span className="text-[10px] bg-blue-500/15 text-blue-400 px-1.5 py-0.5 rounded">🌀{killTypeStats.zone}</span>}
            </div>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>
        <div className="px-5 pt-3 flex gap-2 border-b border-gray-800 pb-0">
          {["commentary","wwcd","standings","players"].map(t=>(
            <button key={t} onClick={()=>setActiveTab(t)} className={`px-4 py-2 text-xs font-black rounded-t-lg transition-all ${activeTab===t?"bg-gray-800 text-white border-t border-x border-gray-700":"text-gray-500 hover:text-gray-300"}`}>
              {t==="commentary"?"📢 Commentary":t==="wwcd"?"🍗 WWCD":t==="standings"?"📊 Standings":"👥 Players"}
            </button>
          ))}
        </div>
        <div className="p-5">
          {activeTab==="commentary"&&<LiveCommentaryDisplay commentary={commentary||[]} isLive={isLive&&!commentaryDone} onFinish={()=>setCommentaryDone(true)}/>}
          {activeTab==="wwcd"&&<WwcdDisplay survivors={survivors||[]} eliminatedFromWinner={eliminated_players||[]} winnerTeam={winnerTeam}/>}
          {activeTab==="standings"&&(
            <div className="space-y-1 max-h-96 overflow-auto">
              {results.map((r,i)=>{
                const isPlayer=r.team.id==="player";const flag=COUNTRIES[r.team.country]?.flag||"🌐";
                return(<div key={r.team.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border ${isPlayer?"bg-orange-500/10 border-orange-500/30":"border-gray-800"}`}>
                  <span className={`w-6 text-center font-black text-xs ${i===0?"text-yellow-400":i===1?"text-gray-300":i===2?"text-amber-600":"text-gray-600"}`}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}</span>
                  <span>{flag}</span>
                  <span className={`flex-1 font-bold truncate text-xs ${isPlayer?"text-orange-400":"text-white"}`}>{r.team.name}</span>
                  <span className="text-red-400 text-xs">{r.kills}💀</span>
                  <span className="text-blue-400 text-xs">{r.placePts}📍</span>
                  <span className="text-white font-black text-sm w-10 text-right">{r.total}pts</span>
                </div>);
              })}
            </div>
          )}
          {activeTab==="players"&&(
            <div>
              {potm&&<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-4 flex items-center gap-3"><div className="text-2xl">🌟</div><div><div className="text-[10px] font-black text-yellow-400">MATCH MVP</div><div className="text-white font-black">{potm.playerName}</div><div className="flex gap-2 text-xs mt-0.5"><span className="text-red-400">{potm.kills}💀</span><span className="text-gray-400">({potm.teamName})</span></div></div></div>}
              <div className="flex gap-2 flex-wrap mb-3">
                {results.map(r=><button key={r.team.id} onClick={()=>setSelectedTeam(selectedTeam===r.team.id?null:r.team.id)} className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition-all ${selectedTeam===r.team.id?"bg-purple-500/20 border-purple-500/40 text-purple-300":r.team.id==="player"?"bg-orange-500/10 border-orange-500/30 text-orange-400":"bg-gray-800 border-gray-700 text-gray-400"}`}>#{r.placement} {r.team.name}</button>)}
              </div>
              {selectedTeam&&(()=>{const sel=results.find(r=>r.team.id===selectedTeam);return sel?<div className="space-y-2">{sel.playerStats.map((ps,pi)=>(
                <div key={pi} className={`bg-gray-900 border rounded-xl p-3 ${ps.isTopFragger?"border-red-500/40":"border-gray-800"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span>{ps.role==="IGL"?"🧠":ps.role==="Fragger"?"💥":ps.role==="Support"?"🛡️":"🎯"}</span>
                    <span className="font-black text-white text-xs flex-1">{ps.playerName}</span>
                    <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">{ps.role}</span>
                    {ps.isTopFragger&&<span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-black">TOP💀</span>}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-800/60 rounded-lg py-1.5"><div className="text-red-400 font-black text-sm">{ps.kills}</div><div className="text-gray-600 text-[10px]">Kills</div></div>
                    <div className="bg-gray-800/60 rounded-lg py-1.5"><div className="text-blue-400 font-bold text-xs">{fmtTime(ps.survivalTime)}</div><div className="text-gray-600 text-[10px]">Survival</div></div>
                    <div className="bg-gray-800/60 rounded-lg py-1.5"><div className="text-yellow-400 font-bold text-xs">{ps.damage}</div><div className="text-gray-600 text-[10px]">Damage</div></div>
                  </div>
                </div>
              ))}</div>:null;})()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PointsTableModal({groups,groupStandings,roundName,advancePerGroup,playerTeamId,onClose}){
  const [viewGroup,setViewGroup]=useState(0);
  const playerGroupIdx=groups?groups.findIndex(g=>g.teams.some(t=>t.id===playerTeamId)):-1;
  return(
    <div className="fixed inset-0 bg-black/95 z-[250] overflow-auto flex items-start justify-center p-4 pt-8">
      <div className="bg-gray-950 border border-cyan-500/30 rounded-3xl w-full max-w-4xl">
        <div className="sticky top-0 bg-gray-950 border-b border-gray-800 p-5 flex items-start justify-between rounded-t-3xl z-10">
          <div><div className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full inline-block mb-1">📊 POINTS TABLE</div><h2 className="text-xl font-black text-white">{roundName}</h2></div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>
        <div className="px-5 pt-3 flex gap-2 flex-wrap border-b border-gray-800 pb-3">
          {groups?.map((g,gi)=>(
            <button key={gi} onClick={()=>setViewGroup(gi)} className={`px-3 py-1.5 text-xs font-black rounded-xl border transition-all ${viewGroup===gi?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40":gi===playerGroupIdx?"bg-orange-500/10 text-orange-400 border-orange-500/30":"bg-gray-800 text-gray-400 border-gray-700"}`}>
              Group {g.letter}{gi===playerGroupIdx&&<span className="ml-1 text-[9px] text-orange-400">★YOU</span>}
            </button>
          ))}
        </div>
        <div className="p-5">
  {(groupStandings && groupStandings[viewGroup] && groups) ? (()=>{
    const standings = groupStandings[viewGroup];
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 text-[10px] font-black text-gray-500 px-3 py-2 border-b border-gray-800 bg-gray-950">
          <span className="col-span-1">#</span><span className="col-span-5">Team</span>
          <span className="col-span-2 text-center">Kills</span><span className="col-span-2 text-center">Place</span><span className="col-span-2 text-center">Total</span>
        </div>
        <div className="max-h-80 overflow-auto">
          {standings.map((s,i)=>{
            const isP=s.team.id===playerTeamId;
            const willAdv=i<advancePerGroup;
            const flag=COUNTRIES[s.team.country]?.flag||"🌐";
            const rating=teamRating(s.team);
            return(
              <div key={s.team.id} className={`grid grid-cols-12 items-center px-3 py-2 border-b border-gray-800/50 text-sm hover:bg-gray-800/30 ${isP?"bg-orange-500/5":""} ${!willAdv?"opacity-50":""}`}>
                <span className={`col-span-1 font-black text-xs ${willAdv?"text-green-400":"text-gray-600"}`}>{willAdv?"✓":""}{i+1}</span>
                <div className="col-span-5 flex items-center gap-1.5 min-w-0"><span>{s.team.logo}</span><span>{flag}</span><span className={`font-bold truncate text-xs ${isP?"text-orange-400":"text-white"}`}>{s.team.name}{isP?" (You)":""}</span><TeamRatingBadge rating={rating}/></div>
                <span className="col-span-2 text-center text-red-400 text-xs font-bold">{s.kills}</span>
                <span className="col-span-2 text-center text-blue-400 text-xs">{s.placePts}</span>
                <span className={`col-span-2 text-center font-black text-sm ${isP?"text-orange-400":"text-white"}`}>{s.total}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  })() : <div className="text-center py-8 text-gray-600"><p>Not yet played</p></div>}
</div>
      </div>
    </div>
  );
}

function GroupDrawModal({groups,roundName,playerTeamId,onClose}){
  const [viewIdx,setViewIdx]=useState(0);
  const playerGrpIdx=groups.findIndex(g=>g.teams.some(t=>t.id===playerTeamId));
  return(
    <div className="fixed inset-0 bg-black/95 z-[200] overflow-auto flex items-start justify-center p-4 pt-8">
      <div className="bg-gray-950 border border-cyan-500/30 rounded-3xl w-full max-w-5xl">
        <div className="sticky top-0 bg-gray-950 border-b border-gray-800 p-5 flex items-start justify-between rounded-t-3xl">
          <div><div className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full inline-block mb-1">🎲 GROUP DRAW</div><h2 className="text-2xl font-black text-white">{roundName}</h2></div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>
        <div className="px-5 pt-3 flex gap-2 flex-wrap border-b border-gray-800 pb-3">
          {groups.map((g,gi)=>(
            <button key={gi} onClick={()=>setViewIdx(gi)} className={`px-3 py-1.5 text-xs font-black rounded-xl border ${viewIdx===gi?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40":gi===playerGrpIdx?"bg-orange-500/10 text-orange-400 border-orange-500/30":"bg-gray-800 text-gray-400 border-gray-700"}`}>
              Group {g.letter}{gi===playerGrpIdx?" ★":""}
            </button>
          ))}
        </div>
        <div className="p-5">
          <div className="bg-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between">
              <span className="font-black text-cyan-300 text-lg">Group {groups[viewIdx]?.letter}</span>
              {viewIdx===playerGrpIdx&&<span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded font-black">YOUR GROUP</span>}
            </div>
            <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {groups[viewIdx]?.teams.map((t,ti)=>{const isP=t.id===playerTeamId;const flag=COUNTRIES[t.country]?.flag||"🌐";const rating=teamRating(t);return(
                <div key={t.id} className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs border ${isP?"bg-orange-500/15 border-orange-500/30":"border-gray-700/30"}`}>
                  <span className="text-gray-500 w-4 text-center">{ti+1}</span><span>{t.logo}</span><span>{flag}</span>
                  <span className={`flex-1 font-bold truncate ${isP?"text-orange-400":"text-white"}`}>{t.name}</span>
                  <TeamRatingBadge rating={rating}/>
                </div>
              );})}
            </div>
          </div>
        </div>
        <div className="px-5 pb-5 text-center"><button onClick={onClose} className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 px-8 py-3 rounded-xl font-black">Close</button></div>
      </div>
    </div>
  );
}

function PlayerCard({player,onSign,onRelease,showCareer=false,compact=false}){
  const [showH,setShowH]=useState(false);
  const roleIcon={IGL:"🧠",Fragger:"💥",Support:"🛡️",Sniper:"🎯"}[player.role]||"👤";
  const flag=COUNTRIES[player.country]?.flag||"🌐";
  const effOvr=effectiveOvr(player);
  const potGap=(player.potential||player.ovr)-player.ovr;
  if(compact) return(
    <div className="bg-gray-900 border border-gray-700/60 rounded-xl p-3 hover:border-orange-500/30 transition-all">
      <div className="flex items-center gap-2"><span className="text-xl">{roleIcon}</span><div className="flex-1 min-w-0"><div className="font-black text-white text-xs truncate">{player.name}{player.isRookie&&<span className="ml-1 text-green-400 text-[9px]">ROOKIE</span>}</div><div className="text-gray-500 text-[10px]">{flag} {player.role} · Age {player.age}</div></div><div className="flex flex-col items-end gap-1"><OvrBadge ovr={effOvr}/><MoodBadge mood={player.mood}/></div></div>
      {onSign&&<button onClick={()=>onSign(player)} className="mt-2 w-full text-xs bg-orange-500 hover:bg-orange-400 text-white px-2 py-1 rounded-lg font-black">SIGN ₹{player.salary.toLocaleString()}/mo</button>}
    </div>
  );
  return(
    <div className="bg-gray-900 border border-gray-700/60 rounded-2xl p-4 hover:border-orange-500/40 transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl border border-gray-700/50">{roleIcon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-white text-sm truncate">{player.name}{player.isRookie&&<span className="ml-1.5 text-[9px] bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded font-black">🌱 ROOKIE</span>}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded">{flag} {player.country}</span>
            <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded">{player.role}</span>
            <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded">Age {player.age}</span>
            <MoodBadge mood={player.mood}/>
            {potGap > 3 && <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded font-black">📈+{potGap}pot</span>}
            {player.mvpCount>0&&<span className="text-[10px] bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded font-black">🌟MVP×{player.mvpCount}</span>}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1"><OvrBadge ovr={effOvr}/></div>
      </div>
      <RatingBar label="Aim" value={player.stats.aim} color="bg-red-500"/>
      <RatingBar label="Game IQ" value={player.stats.gameIQ} color="bg-blue-500"/>
      <RatingBar label="Clutch" value={player.stats.clutch} color="bg-purple-500"/>
      <RatingBar label="Consistency" value={player.stats.consistency} color="bg-green-500"/>
      {showCareer&&<div className="mt-3 border-t border-gray-700/50 pt-3">
        <div className="grid grid-cols-3 gap-2 text-center mb-2">
          <div><div className="text-orange-400 font-black text-sm">{player.career.kills.toLocaleString()}</div><div className="text-gray-500 text-[10px]">Career Kills</div></div>
          <div><div className="text-blue-400 font-black text-sm">{player.career.matches}</div><div className="text-gray-500 text-[10px]">Matches</div></div>
          <div><div className="text-yellow-400 font-black text-sm">{player.career.tournaments}</div><div className="text-gray-500 text-[10px]">T-Wins</div></div>
        </div>
        <button onClick={()=>setShowH(h=>!h)} className="w-full text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-400 py-1.5 rounded-lg font-bold">🏠 History ({(player.teamHistory||[]).length}) {showH?"▲":"▼"}</button>
        {showH&&<div className="space-y-1 mt-1 max-h-28 overflow-auto">{(player.teamHistory||[]).map((h,i)=><div key={i} className="flex items-center gap-2 bg-gray-800/60 rounded-lg px-2 py-1.5 text-[10px]"><span className="flex-1 text-white font-bold truncate">{h.teamName}</span><span className="text-red-400">{h.kills}💀</span><span className="text-gray-500">{h.season}</span></div>)}</div>}
      </div>}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] text-gray-400">₹{player.salary.toLocaleString()}/mo · {player.contract}yr</span>
        <div className="flex gap-2">
          {onSign&&<button onClick={()=>onSign(player)} className="text-xs bg-orange-500 hover:bg-orange-400 text-white px-3 py-1.5 rounded-lg font-black">SIGN</button>}
          {onRelease&&<button onClick={()=>onRelease(player)} className="text-xs bg-red-500/20 hover:bg-red-500/40 text-red-400 px-3 py-1.5 rounded-lg font-black">RELEASE</button>}
        </div>
      </div>
    </div>
  );
}

/* ─── ELIMINATION MODAL ─── */
function EliminationModal({ playerRank, roundName, tournamentName, finalStandings, onClose }) {
  const top3 = finalStandings ? finalStandings.slice(0, 3) : [];
  return (
    <div className="fixed inset-0 bg-black/98 z-[300] flex items-center justify-center p-4">
      <div className="bg-gray-950 border border-red-500/30 rounded-3xl w-full max-w-lg p-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">😞</div>
          <div className="text-red-400 font-black text-2xl">ELIMINATED</div>
          <div className="text-gray-400 text-sm mt-1">Finished <span className="text-white font-black">#{playerRank}</span> in {roundName}</div>
          <div className="text-gray-500 text-xs mt-1">{tournamentName}</div>
        </div>
        {top3.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
            <div className="text-xs font-black text-gray-400 mb-4 text-center">🏆 TOURNAMENT FINAL RESULTS</div>
            <div className="space-y-3">
              {top3.map((s, i) => {
                const flag = COUNTRIES[s.team?.country]?.flag || "🌐";
                const icons = ["🥇","🥈","🥉"];
                const cls = i===0?"bg-yellow-500/15 border-yellow-500/30 text-yellow-400":i===1?"bg-gray-600/20 border-gray-500/30 text-gray-300":"bg-amber-700/15 border-amber-700/30 text-amber-600";
                return (
                  <div key={i} className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${cls}`}>
                    <span className="text-2xl">{icons[i]}</span><span>{flag}</span>
                    <span className="flex-1 font-black text-sm">{s.team?.name || "?"}</span>
                    <span className="text-xs opacity-70">{s.total || 0}pts</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <button onClick={onClose} className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-black py-3 rounded-xl">Continue Season</button>
      </div>
    </div>
  );
}

/* ─── TOURNAMENT 128 MODAL ─── */
function Tournament128Modal({tournament,playerTeam,aiTeams,onClose,onComplete}){
  const all128=useMemo(()=>[playerTeam,...aiTeams].slice(0,128),[]);
  const [roundIdx,setRoundIdx]=useState(0);
  const roundDef=T_ROUNDS[roundIdx];
  const [roundTeams,setRoundTeams]=useState(all128);
  const [groups,setGroups]=useState(null);
  const [playerGroupIdx,setPlayerGroupIdx]=useState(0);
  const [viewGroupIdx,setViewGroupIdx]=useState(0);
  const [groupStandings,setGroupStandings]=useState({});
  const [groupMatchResults,setGroupMatchResults]=useState({});
  const [playerGroupMatchIdx,setPlayerGroupMatchIdx]=useState(0);
  const [isPlaying,setIsPlaying]=useState(false);
  const [liveMatch,setLiveMatch]=useState(null);
  const [viewMatch,setViewMatch]=useState(null);
  const [showGroups,setShowGroups]=useState(false);
  const [showPointsTable,setShowPointsTable]=useState(false);
  const [eliminated,setEliminated]=useState(false);
  const [champion,setChampion]=useState(null);
  const [finalStandings,setFinalStandings]=useState(null);
  const [showElimModal,setShowElimModal]=useState(false);
  const [showAwards,setShowAwards]=useState(false);
  const [tournamentAwards,setTournamentAwards]=useState(null);

  const playerMatches=groupMatchResults[playerGroupIdx]||[];
  const roundComplete=playerGroupMatchIdx>=roundDef.matchesPerGroup;
  const playerStandings=groupStandings[playerGroupIdx]||[];
  const playerRow=playerStandings.find(s=>s.team.id==="player");
  const playerRankInGroup=playerStandings.findIndex(s=>s.team.id==="player")+1;

  useEffect(()=>{
    const g=buildGroups(roundTeams,roundDef.groups);
    const pIdx=g.findIndex(grp=>grp.teams.some(t=>t.id==="player"));
    setGroups(g);setPlayerGroupIdx(pIdx>=0?pIdx:0);setViewGroupIdx(pIdx>=0?pIdx:0);setPlayerGroupMatchIdx(0);
    const standings={},matches={};
    g.forEach((grp,gi)=>{
      if(gi===pIdx){standings[gi]=grp.teams.map(t=>({team:t,kills:0,placePts:0,total:0}));matches[gi]=[];}
      else{const{standings:s,matchResults:mr}=autoSimulateGroup(grp.teams,roundDef.matchesPerGroup);standings[gi]=s;matches[gi]=mr;}
    });
    setGroupStandings(standings);setGroupMatchResults(matches);setLiveMatch(null);
  },[roundIdx,roundTeams]);

  function playNextMatch(){
    if(roundComplete||isPlaying||!groups) return;
    setIsPlaying(true);
    setTimeout(()=>{
      const grp=groups[playerGroupIdx];
      const result=simSingleMatch([...grp.teams].sort(()=>Math.random()-0.5));
      result.matchNum=playerGroupMatchIdx+1;
      setGroupStandings(prev=>{
        const updated={...prev};
        const newStandings=prev[playerGroupIdx]?[...prev[playerGroupIdx]]:grp.teams.map(t=>({team:t,kills:0,placePts:0,total:0}));
        result.results.forEach(r=>{
          const idx=newStandings.findIndex(s=>s.team.id===r.team.id);
          if(idx>=0){newStandings[idx]={...newStandings[idx],kills:newStandings[idx].kills+r.kills,placePts:newStandings[idx].placePts+r.placePts,total:newStandings[idx].total+r.total};}
        });
        updated[playerGroupIdx]=newStandings.sort((a,b)=>b.total-a.total);
        return updated;
      });
      setGroupMatchResults(prev=>{const u={...prev};u[playerGroupIdx]=[...(prev[playerGroupIdx]||[]),result];return u;});
      setPlayerGroupMatchIdx(i=>i+1);
      setLiveMatch({...result,isLive:true});
      setIsPlaying(false);
    },400);
  }

  function advanceRound(){
    if(!groups||!roundComplete) return;
    const advance=roundDef.advancePerGroup;
    if(advance===0){
      // Grand Finals complete — compute awards
      const allResults = [];
      Object.values(groupMatchResults).flat().forEach(m => { if(m.results) allResults.push(...m.results); });
      const aggregated = {};
      playerStandings.forEach(s => { aggregated[s.team.id] = { team: s.team, kills: s.kills, placePts: s.placePts, total: s.total, playerStats: [] }; });
      Object.values(groupMatchResults).flat().forEach(m => {
        m.results?.forEach(r => {
          if(!aggregated[r.team.id]) aggregated[r.team.id] = { team: r.team, kills: 0, placePts: 0, total: 0, playerStats: [] };
          aggregated[r.team.id].playerStats.push(...(r.playerStats||[]));
        });
      });
      const finalArr = Object.values(aggregated).sort((a,b) => b.total - a.total);
      const awards = computeTournamentAwards(finalArr, tournament.name, playerTeam.season || 2025);
      setTournamentAwards(awards);
      setShowAwards(true);
      const champ=playerStandings[0]?.team;
      if(champ){setChampion(champ);onComplete({tournament,playerRank:playerRankInGroup||16,standings:playerStandings,round:"Grand Finals",allStandings:playerStandings,awards});}
      return;
    }
    if(playerRankInGroup>advance){
      const remainingTeams = [];
      groups.forEach((grp,gi)=>{
        const st=groupStandings[gi]||grp.teams.map(t=>({team:t,kills:0,placePts:0,total:0}));
        remainingTeams.push(...st.slice(0,advance).map(s=>s.team));
      });
      const simFinal = simulateFullTournament(remainingTeams.slice(0,16));
      setFinalStandings(simFinal);
      setEliminated(true);setShowElimModal(true);
      onComplete({tournament,playerRank:playerRankInGroup+(playerGroupIdx*TEAMS_PER_MATCH)||32,standings:playerStandings,round:roundDef.name,finalStandings:simFinal});
      return;
    }
    const nextTeams=[];
    groups.forEach((grp,gi)=>{
      const st=groupStandings[gi]||grp.teams.map(t=>({team:t,kills:0,placePts:0,total:0}));
      nextTeams.push(...st.slice(0,advance).map(s=>s.team));
    });
    setRoundTeams(nextTeams);setRoundIdx(i=>i+1);
  }

  return(
    <div className="fixed inset-0 bg-black/95 z-50 overflow-auto flex items-start justify-center p-4 pt-8">
      {liveMatch&&<SingleMatchResult match={liveMatch} onClose={()=>setLiveMatch(null)} isLive={liveMatch.isLive}/>}
      {viewMatch&&<SingleMatchResult match={viewMatch} onClose={()=>setViewMatch(null)} isLive={false}/>}
      {showGroups&&groups&&<GroupDrawModal groups={groups} roundName={roundDef.name} playerTeamId="player" onClose={()=>setShowGroups(false)}/>}
      {showPointsTable&&groups&&<PointsTableModal groups={groups} groupStandings={groupStandings} roundName={roundDef.name} advancePerGroup={roundDef.advancePerGroup} playerTeamId="player" onClose={()=>setShowPointsTable(false)}/>}
      {showElimModal&&<EliminationModal playerRank={playerRankInGroup} roundName={roundDef.name} tournamentName={tournament.name} finalStandings={finalStandings} onClose={()=>{setShowElimModal(false);onClose();}}/>}
      {showAwards&&tournamentAwards&&<AwardCeremonyModal awards={tournamentAwards} onClose={()=>{setShowAwards(false);onClose();}}/>}

      <div className="bg-gray-950 border border-amber-500/30 rounded-3xl w-full max-w-6xl">
        <div className="sticky top-0 bg-gray-950 border-b border-gray-800 p-5 flex items-start justify-between rounded-t-3xl z-10">
          <div>
            <TierBadge type={tournament.type}/>
            <h2 className="text-xl font-black text-white mt-1">{tournament.name}</h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap text-sm">
              <span className="text-amber-400 font-bold">{fmtMoney(tournament.prize)}</span>
              <button onClick={()=>setShowGroups(true)} className="text-cyan-400 text-xs bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-lg font-black hover:bg-cyan-500/20">🎲 Groups</button>
              <button onClick={()=>setShowPointsTable(true)} className="text-green-400 text-xs bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-lg font-black hover:bg-green-500/20">📊 Points</button>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        <div className="px-5 py-3 border-b border-gray-800">
          <div className="flex items-center gap-1 overflow-x-auto mb-2">
            {T_ROUNDS.map((r,i)=>(
              <div key={i} className="flex items-center gap-1 shrink-0">
                <div className={`text-xs px-2 py-1 rounded-lg font-bold whitespace-nowrap ${i<roundIdx?"bg-green-500/20 text-green-400":i===roundIdx?"bg-amber-500/20 text-amber-400 border border-amber-500/30":"bg-gray-800 text-gray-600"}`}>{i<roundIdx?"✓ ":""}{r.name}</div>
                {i<T_ROUNDS.length-1&&<span className="text-gray-700">→</span>}
              </div>
            ))}
          </div>
          <div className="flex gap-1">{Array.from({length:roundDef.matchesPerGroup},(_,i)=><div key={i} className={`flex-1 h-2 rounded-full ${i<playerGroupMatchIdx?"bg-orange-500":i===playerGroupMatchIdx&&isPlaying?"bg-orange-500/50":"bg-gray-800"}`}/>)}</div>
        </div>

        <div className="p-5 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <div className="flex gap-1.5 flex-wrap mb-3">
              {groups?.map((g,gi)=>(
                <button key={gi} onClick={()=>setViewGroupIdx(gi)} className={`text-xs px-2.5 py-1 rounded-lg font-black border transition-all ${viewGroupIdx===gi?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40":gi===playerGroupIdx?"bg-orange-500/10 text-orange-400 border-orange-500/30":"bg-gray-800 text-gray-500 border-gray-700"}`}>
                  Grp {g.letter}{gi===playerGroupIdx?"★":""}
                </button>
              ))}
            </div>
            {(()=>{const st=groupStandings[viewGroupIdx]||[];const isPlayerGroup=viewGroupIdx===playerGroupIdx;return(
              <div>
                <h3 className="font-black text-white text-sm mb-2">Group {groups?.[viewGroupIdx]?.letter} {isPlayerGroup?"(Your Group)":"(Spectating)"}</h3>
                <div className="space-y-1 max-h-72 overflow-auto">
                  {st.map((s,i)=>{const isP=s.team.id==="player";const flag=COUNTRIES[s.team.country]?.flag||"🌐";const willAdv=i<roundDef.advancePerGroup;const rating=teamRating(s.team);
                    return(<div key={s.team.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border ${isP?"bg-orange-500/10 border-orange-500/40":"border-transparent"} ${willAdv?"":"opacity-40"}`}>
                      <span className={`w-5 text-center font-black text-xs ${i===0?"text-yellow-400":willAdv?"text-green-400":"text-gray-600"}`}>{i+1}</span>
                      <span>{flag}</span>
                      <span className={`flex-1 font-bold truncate text-xs ${isP?"text-orange-400":"text-white"}`}>{s.team.name}{isP?" (You)":""}</span>
                      <TeamRatingBadge rating={rating}/>
                      <span className="text-red-400 text-xs">{s.kills}💀</span>
                      <span className="text-white font-black text-xs">{s.total}pts</span>
                      {willAdv&&<span className="text-green-400 text-xs">✓</span>}
                    </div>);
                  })}
                </div>
                {!isPlayerGroup&&(groupMatchResults[viewGroupIdx]||[]).length>0&&(
                  <div className="mt-3">
                    <div className="text-xs font-bold text-gray-500 mb-2">SPECTATE MATCHES</div>
                    <div className="flex flex-wrap gap-2">
                      {(groupMatchResults[viewGroupIdx]||[]).map((m,mi)=>(
                        <button key={mi} onClick={()=>setViewMatch(m)} className="text-xs bg-gray-800 hover:bg-gray-700 text-purple-400 border border-purple-500/20 px-3 py-1.5 rounded-lg font-bold">
                          👁 M{mi+1} · {m.map?.icon||"⚡"} {m.totalKills}💀
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );})()}
          </div>

          <div className="lg:col-span-7 space-y-4">
            {playerRow&&(
              <div className={`p-4 rounded-2xl border ${playerRankInGroup<=3?"bg-yellow-500/10 border-yellow-500/30":playerRankInGroup<=roundDef.advancePerGroup?"bg-green-500/10 border-green-500/30":"bg-red-500/10 border-red-500/30"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-white">Your Team — #{playerRankInGroup}</div>
                    <div className="flex gap-4 text-sm mt-1"><span className="text-red-400">{playerRow.kills}💀</span><span className="text-orange-400 font-bold">{playerRow.total}pts</span></div>
                  </div>
                  {roundDef.advancePerGroup>0&&<div className={`text-xs font-bold ${playerRankInGroup<=roundDef.advancePerGroup?"text-green-400":"text-red-400"}`}>{playerRankInGroup<=roundDef.advancePerGroup?`✅ Top ${roundDef.advancePerGroup}`:`❌ Need top ${roundDef.advancePerGroup}`}</div>}
                </div>
              </div>
            )}

            {playerMatches.length>0&&(
              <div className="bg-gray-900 rounded-xl p-3">
                <div className="text-xs font-bold text-gray-400 mb-2">YOUR MATCHES</div>
                <div className="space-y-1 max-h-36 overflow-auto">
                  {playerMatches.map((ml,mi)=>{
                    const pr=ml.results.find(r=>r.team.id==="player");
                    return(<button key={mi} onClick={()=>setLiveMatch({...ml,isLive:false})} className="w-full text-left bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/50 hover:border-purple-500/40 rounded-lg px-3 py-2 transition-all">
                      <div className="flex items-center gap-2 text-xs">
                        <span>{ml.map?.icon||"⚡"}</span>
                        <span className="text-gray-300 font-bold">M{ml.matchNum} · {ml.map?.name}</span>
                        <span className="text-red-400 text-[10px]">{ml.totalKills}💀</span>
                        {ml.winnerTeam&&<span className="text-yellow-400 text-[10px]">🍗{ml.winnerTeam.name}</span>}
                        {pr&&<span className={`ml-auto font-black ${pr.placement===1?"text-yellow-400":pr.placement<=3?"text-green-400":"text-gray-500"}`}>#{pr.placement}·{pr.total}pts</span>}
                        <span className="text-purple-400">📢</span>
                      </div>
                    </button>);
                  })}
                </div>
              </div>
            )}

            {champion?(
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-center"><div className="text-4xl mb-2">🏆</div><div className="text-yellow-400 font-black text-lg">CHAMPION: {champion.name}</div>{champion.id==="player"&&<div className="text-white font-bold mt-1">YOUR TEAM WINS! 🍗</div>}</div>
            ):eliminated?(
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center"><div className="text-3xl mb-2">😞</div><div className="text-red-400 font-black">ELIMINATED in {roundDef.name}</div></div>
            ):!roundComplete?(
              <button onClick={playNextMatch} disabled={isPlaying} className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl text-lg shadow-xl shadow-orange-500/20">
                {isPlaying?"⚡ Simulating...":`▶ Play Match ${playerGroupMatchIdx+1}/${roundDef.matchesPerGroup}`}
              </button>
            ):(
              <button onClick={advanceRound} className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-black py-4 rounded-2xl text-lg">
                {roundDef.advancePerGroup===0?"🏆 Finish & Awards Ceremony":`→ Advance to ${T_ROUNDS[roundIdx+1]?.name||"Finals"}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Team Creation Modal ── */
function TeamCreationModal({aiTeams,onConfirm}){
  const [mode,setMode]=useState("create");
  const [teamName,setTeamName]=useState("My Esports");
  const [teamLogo,setTeamLogo]=useState("🦁");
  const [teamCountry,setTeamCountry]=useState("IN");
  const [pickTeamId,setPickTeamId]=useState(null);
  const [error,setError]=useState("");

  function confirm(){
    if(mode==="create"){
      if(!teamName.trim()){setError("Enter a team name");return;}
      const t=genTeam("player",teamName.trim(),teamCountry,true);
      t.logo=teamLogo;onConfirm(t);
    } else {
      if(!pickTeamId){setError("Pick a team");return;}
      const base=aiTeams.find(t=>t.id===pickTeamId);
      if(!base){setError("Team not found");return;}
      const t={...base,id:"player",isPlayer:true,budget:15000000};onConfirm(t);
    }
  }

  return(
    <div className="fixed inset-0 bg-black/98 z-[500] flex items-center justify-center p-4">
      <div className="bg-gray-950 border border-orange-500/30 rounded-3xl w-full max-w-lg p-8">
        <div className="text-center mb-6"><div className="font-black text-3xl text-white mb-1" style={{fontFamily:"'Orbitron',monospace"}}>BGMI MANAGER v8</div><div className="text-gray-400 text-sm">Season 2025 — Build your legacy</div></div>
        <div className="flex gap-2 mb-6">
          {["create","pick"].map(m=><button key={m} onClick={()=>setMode(m)} className={`flex-1 py-2.5 rounded-xl font-black text-sm transition-all ${mode===m?"bg-orange-500 text-white":"bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>{m==="create"?"🛠 Create Team":"🎯 Pick Existing"}</button>)}
        </div>
        {mode==="create"?(
          <div className="space-y-4">
            <div><label className="text-xs text-gray-400 font-bold mb-1 block">TEAM NAME</label><input value={teamName} onChange={e=>setTeamName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 text-white text-sm px-4 py-3 rounded-xl outline-none focus:border-orange-500" placeholder="Enter team name..."/></div>
            <div><label className="text-xs text-gray-400 font-bold mb-1 block">LOGO</label><div className="flex flex-wrap gap-2">{LOGOS.map(l=><button key={l} onClick={()=>setTeamLogo(l)} className={`text-2xl w-10 h-10 rounded-xl flex items-center justify-center border ${teamLogo===l?"border-orange-500 bg-orange-500/20":"border-gray-700 bg-gray-800"}`}>{l}</button>)}</div></div>
            <div><label className="text-xs text-gray-400 font-bold mb-1 block">COUNTRY</label><select value={teamCountry} onChange={e=>setTeamCountry(e.target.value)} className="w-full bg-gray-800 border border-gray-700 text-white text-sm px-4 py-3 rounded-xl outline-none">{Object.entries(COUNTRIES).map(([k,v])=><option key={k} value={k}>{v.flag} {v.name}</option>)}</select></div>
          </div>
        ):(
          <div className="max-h-64 overflow-auto space-y-2">
            {aiTeams.slice(0,30).map(t=>{const avgOvr=Math.round(t.players.reduce((a,p)=>a+p.ovr,0)/t.players.length);const flag=COUNTRIES[t.country]?.flag||"🌐";return(
              <button key={t.id} onClick={()=>setPickTeamId(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left ${pickTeamId===t.id?"bg-orange-500/15 border-orange-500/40":"bg-gray-900 border-gray-700/50 hover:border-gray-500"}`}>
                <span className="text-2xl">{t.logo}</span><span>{flag}</span><div className="flex-1"><div className="font-black text-white text-sm">{t.name}</div></div><TeamRatingBadge rating={avgOvr}/>{pickTeamId===t.id&&<span className="text-orange-400">✓</span>}
              </button>
            );})}
          </div>
        )}
        {error&&<div className="text-red-400 text-xs mt-2 text-center">{error}</div>}
        <button onClick={confirm} className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black py-4 rounded-2xl text-lg shadow-xl shadow-orange-500/20">🚀 Start Season 2025</button>
      </div>
    </div>
  );
}

function SingleMatchSimulator({playerTeam,aiTeams}){
  const [sel,setSel]=useState([]);const [result,setResult]=useState(null);const [simming,setSimming]=useState(false);
  const all=[playerTeam,...aiTeams];
  function toggleTeam(t){setSel(prev=>prev.find(x=>x.id===t.id)?prev.filter(x=>x.id!==t.id):prev.length>=16?prev:[...prev,t]);}
  function fill(){const rem=all.filter(t=>!sel.find(s=>s.id===t.id));const n=16-sel.length;setSel(prev=>[...prev,...[...rem].sort(()=>Math.random()-0.5).slice(0,n)]);}
  function simulate(){if(sel.length<2)return;setSimming(true);setTimeout(()=>{setResult(simSingleMatch(sel.slice(0,16)));setSimming(false);},400);}
  return(
    <div className="space-y-5">
      {result&&<SingleMatchResult match={result} onClose={()=>setResult(null)} isLive/>}
      <div className="flex items-center justify-between"><h2 className="font-black text-white text-xl" style={{fontFamily:"'Orbitron',monospace"}}>⚡ Match Simulator</h2>
        <div className="flex gap-2"><button onClick={()=>{setSel([]);setResult(null);}} className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-2 rounded-xl font-bold border border-gray-700">Reset</button><button onClick={fill} disabled={sel.length>=16} className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-2 rounded-xl font-bold disabled:opacity-40">🎲 Fill 16</button></div></div>
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3"><h3 className="font-bold text-white text-sm">Selected <span className="text-orange-400">{sel.length}/16</span></h3>{sel.length>=2&&<button onClick={simulate} disabled={simming} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black px-5 py-2 rounded-xl text-sm disabled:opacity-50">{simming?"⚡":"▶ Simulate"}</button>}</div>
        {sel.length===0?<p className="text-gray-600 text-sm text-center py-4">Select 2–16 teams</p>:<div className="flex flex-wrap gap-2">{sel.map(t=><button key={t.id} onClick={()=>toggleTeam(t)} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold border ${t.id==="player"?"bg-orange-500/20 text-orange-400 border-orange-500/40":"bg-gray-800 text-white border-gray-700"}`}>{t.logo} {t.name} <span className="text-gray-500">✕</span></button>)}</div>}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-80 overflow-auto pr-1">
        {all.map(t=>{const s=!!sel.find(x=>x.id===t.id);const isP=t.id==="player";const rating=teamRating(t);const flag=COUNTRIES[t.country]?.flag||"🌐";return(
          <button key={t.id} onClick={()=>toggleTeam(t)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left ${s?(isP?"bg-orange-500/20 border-orange-500/40 text-orange-400":"bg-green-500/15 border-green-500/40 text-green-400"):(isP?"bg-gray-900 border-orange-500/20 text-white":"bg-gray-900 border-gray-700/50 text-white hover:border-blue-500/40")}`}>
            <span className="text-lg">{t.logo}</span><span>{flag}</span><span className="flex-1 truncate">{t.name}{isP?" (You)":""}</span>
            <TeamRatingBadge rating={rating}/>{s&&<span className="text-green-400">✓</span>}
          </button>);
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════ */
export default function BGMIManager(){
  const [game,setGame]=useState(null);
  const [showTeamCreate,setShowTeamCreate]=useState(false);
  const [tab,setTab]=useState("dashboard");
  const [modal,setModal]=useState(null);
  const [notif,setNotif]=useState(null);
  const [trophyOpen,setTrophyOpen]=useState(false);
  const [trophyTab,setTrophyTab]=useState("trophies");
  const [confirmNew,setConfirmNew]=useState(false);
  const [transferSearch,setTransferSearch]=useState("");
  const [transferRole,setTransferRole]=useState("All");
  const [transferMinOvr,setTransferMinOvr]=useState(0);
  const [showCeremony,setShowCeremony]=useState(null);
  const notifRef=useRef(null);

  const worldRankings=useMemo(()=>{
    if(!game) return [];
    const pt=game.playerTeam;
    return [{team:pt,pts:pt.worldRankPts||0},...game.aiTeams.map(t=>({team:t,pts:(t.worldRankPts||0)+Math.floor(t.prestige*1.2)}))].sort((a,b)=>b.pts-a.pts);
  },[game]);

  const filteredFreeAgents=useMemo(()=>{
    if(!game) return [];
    let fa=[...game.freeAgents];
    if(transferSearch) fa=fa.filter(p=>p.name.toLowerCase().includes(transferSearch.toLowerCase()));
    if(transferRole!=="All") fa=fa.filter(p=>p.role===transferRole);
    fa=fa.filter(p=>effectiveOvr(p)>=transferMinOvr);
    fa.sort((a,b)=>effectiveOvr(b)-effectiveOvr(a));
    return fa;
  },[game,transferSearch,transferRole,transferMinOvr]);

  // Chicken dinner leaderboard (computed)
  const chickenLeaderboard=useMemo(()=>{
    if(!game) return [];
    const all=[{team:game.playerTeam,dinners:game.playerTeam.chickenDinners||0},...game.aiTeams.map(t=>({team:t,dinners:t.chickenDinners||0}))];
    return all.sort((a,b)=>b.dinners-a.dinners).slice(0,20);
  },[game]);

  // Rivalry detection
  const rivalries=useMemo(()=>{
    if(!game) return [];
    return checkRivalry(game.playerTeam, game.aiTeams, game.tournamentHistory);
  },[game]);

  // Grand Finals qualification check
  const grandFinalsQualified=useMemo(()=>{
    if(!game) return false;
    const pts=game.playerTeam.worldRankPts||0;
    const officialWins=game.tournamentHistory.filter(h=>h.type==="official"&&h.playerRank===1).length;
    return pts>=GRAND_FINALS_QUALIFY_PTS||officialWins>=GRAND_FINALS_QUALIFY_WINS;
  },[game]);

  useEffect(()=>{
    const saved=loadGame();
    if(saved&&saved.version>=7) { setGame({...initGame(),...saved,version:8}); }
    else setShowTeamCreate(true);
  },[]);

  useEffect(()=>{if(game) saveGame(game);},[game]);

  function notify(msg,type="info",dur=3500){setNotif({msg,type});clearTimeout(notifRef.current);notifRef.current=setTimeout(()=>setNotif(null),dur);}
  function G(u){setGame(prev=>u(prev));}
  function tKey(id,season){return`${season}_${id}`;}
  function handleTeamCreated(team){setShowTeamCreate(false);setGame(initGame(team));}

  function advanceMonth(){
    G(prev=>{
      let{month,season,finances,playerTeam,freeAgents,aiTeams}=prev;
      month++;let phase="season",news=[];

      let updatedAI=aiTeams,updatedFreeAgents=freeAgents,newSocialPosts=[],newTransferLog=prev.transferLog||[];
      if(month===1){
        const r=runAITransfers({...prev,month});
        updatedAI=r.updatedAI;updatedFreeAgents=r.newFreeAgents;newSocialPosts=r.newSocialPosts;newTransferLog=r.transferLog;
        phase="signing";
        news.push({id:Date.now(),text:`📝 January signing window open! Check the transfer market.`,type:"info",month:1});
      }

      const partnershipBonuses={};
      (prev.activePartnerships||[]).forEach(pid=>{
        const p=PARTNERSHIPS.find(x=>x.id===pid);
        if(p?.statBonus) Object.entries(p.statBonus).forEach(([stat,bonus])=>{partnershipBonuses[stat]=(partnershipBonuses[stat]||0)+bonus;});
      });
      const updRoster=playerTeam.players.map(p=>{
        const updStats={...p.stats};
        Object.entries(partnershipBonuses).forEach(([stat,bonus])=>{if(updStats[stat]!==undefined)updStats[stat]=Math.min(99,updStats[stat]+Math.floor(bonus/4));});
        return{...p,mood:Math.round((p.mood||70)*0.95+70*0.05),age:month===1?p.age+1:p.age,stats:updStats};
      });

      // Merch revenue
      const merchRevenue=(prev.ownedMerch||[]).reduce((s,mid)=>{const m=MERCH_ITEMS.find(x=>x.id===mid);return s+(m?.baseRevenue||0);},0);
      if(merchRevenue>0) news.push({id:Date.now()+5,text:`🛍️ Merchandise revenue: ₹${merchRevenue.toLocaleString()}`,type:"success",month});

      if(month>12){
        const awards=computeSeasonAwards({...prev,playerTeam:{...prev.playerTeam,players:updRoster}});
        month=1;season++;phase="signing";
        // Fan/Media awards
        const allTeams=[playerTeam,...updatedAI];
        const fanFav=allTeams.reduce((best,t)=>{const topPlayer=t.players.reduce((b,p)=>((p.fanScore||0)>(b.fanScore||0)?p:b),{fanScore:0});return(topPlayer.fanScore||0)>(best.score||0)?{player:topPlayer,team:t,score:topPlayer.fanScore||0}:best;},{score:0});
        const mostPopular=allTeams.reduce((b,t)=>(t.fans>b.fans?t:b),{fans:0});
        const mediaAwards=[
          ...(prev.mediaAwards||[]),
          {type:"fan_favorite",player:fanFav.player?.name||"?",team:fanFav.team?.name||"?",score:fanFav.score,season:season-1},
          {type:"popular_team",team:mostPopular.name||"?",fans:mostPopular.fans||0,season:season-1},
        ];
        const retired=updRoster.filter(p=>{const c=p.age>=30?0.25:p.age>=28?0.10:0;return Math.random()<c;});
        const remaining=updRoster.filter(p=>!retired.find(r=>r.id===p.id));
        const archived=remaining.map(p=>({...p,teamHistory:[...(p.teamHistory||[]),{teamName:playerTeam.name,season:season-1,kills:p.season?.kills||0,matches:p.season?.matches||0}],season:{kills:0,matches:0,wins:0,damage:0,points:0,survivalTime:0}}));
        const rookies=genRookies(season);
        const hofEntries=awards.mvp?[{name:awards.mvp.name,award:"Season MVP",season:season-1,stat:`${awards.mvp.kills} kills`}]:[];
        if(retired.length>0) news.push({id:Date.now(),text:`👴 ${retired.map(p=>p.name.split("#")[0]).join(", ")} retired.`,type:"info",month:12});
        news.push({id:Date.now()+1,text:`🎊 Season ${season} begins! Grand Finals qualifying threshold: ${GRAND_FINALS_QUALIFY_PTS} World Rank pts or ${GRAND_FINALS_QUALIFY_WINS} official wins.`,type:"success",month:1});
        return{...prev,month,season,phase,
          playerTeam:{...prev.playerTeam,players:archived,budget:playerTeam.budget+finances.sponsorship+merchRevenue},
          aiTeams:updatedAI,
          freeAgents:[...rookies,...updatedFreeAgents,...retired.map(p=>({...p,teamId:null,isFree:true}))].slice(0,80),
          finances:{...finances,totalEarned:finances.totalEarned+finances.sponsorship+merchRevenue},
          news:[...news,...prev.news].slice(0,50),
          seasonAwards:{...prev.seasonAwards,[season-1]:awards},
          hallOfFame:[...(prev.hallOfFame||[]),...hofEntries],
          socialFeed:[...newSocialPosts,...(prev.socialFeed||[])].slice(0,50),
          transferLog:newTransferLog,
          mediaAwards,
        };
      }

      const sponsorIncome=(prev.activeSponsors||[]).reduce((s,sid)=>{const sp=SPONSORS.find(x=>x.id===sid);return s+(sp?.monthly||0);},0);
      const partnerIncome=(prev.activePartnerships||[]).reduce((s,pid)=>{const p=PARTNERSHIPS.find(x=>x.id===pid);return s+(p?.monthly||0);},0);
      const income=finances.sponsorship+sponsorIncome+partnerIncome+merchRevenue;
      news.push({id:Date.now()+1,text:`💰 Monthly income: ₹${income.toLocaleString()}`,type:"info",month});

      return{...prev,month,season,phase,
        playerTeam:{...prev.playerTeam,players:updRoster,budget:playerTeam.budget+income},
        aiTeams:updatedAI,freeAgents:updatedFreeAgents,
        finances:{...finances,totalEarned:finances.totalEarned+income},
        news:[...news,...prev.news].slice(0,50),
        socialFeed:[...newSocialPosts,...(prev.socialFeed||[])].slice(0,50),
        transferLog:newTransferLog,
      };
    });
  }

  function computeSeasonAwards(g){
    const pl=g.playerTeam.players;
    const mvp=pl.length?[...pl].sort((a,b)=>(b.season?.kills||0)-(a.season?.kills||0))[0]:null;
    const rookie=pl.length?[...pl].filter(p=>p.isRookie||p.age<=19).sort((a,b)=>b.ovr-a.ovr)[0]:null;
    return{mvp:mvp?{name:mvp.name,kills:mvp.season?.kills||0,ovr:mvp.ovr}:null,rookie:rookie?{name:rookie.name,age:rookie.age,ovr:rookie.ovr}:null,bestTeam:g.playerTeam.name,season:g.season};
  }

  function signPlayer(player){
    G(prev=>{
      if(prev.playerTeam.players.length>=6){notify("Roster full!","error");return prev;}
      if(prev.phase!=="signing"){notify("January transfers only!","error");return prev;}
      if(prev.playerTeam.budget<player.salary*3){notify("Insufficient budget!","error");return prev;}
      const signed={...player,teamId:"player",isFree:false,mood:75,teamHistory:[...(player.teamHistory||[]),{teamName:prev.playerTeam.name,season:prev.season,kills:0,matches:0}]};
      notify(`✅ ${player.name.split("#")[0]} signed!`,"success");
      const text=fillBanterTemplate(pick(BANTER_TEMPLATES.signed_from),{player:player.name.split("#")[0],oldTeam:"Free Agency",newTeam:prev.playerTeam.name});
      const newPost={id:Date.now(),user:pick(SOCIAL_HANDLES),text,likes:rand(100,5000),type:"transfer",season:prev.season,isTransfer:true};
      const entry={season:prev.season,month:prev.month,teamName:prev.playerTeam.name,playerName:player.name,type:"in"};
      return{...prev,
        playerTeam:{...prev.playerTeam,players:[...prev.playerTeam.players,signed],budget:prev.playerTeam.budget-player.salary*3,signings:[...(prev.playerTeam.signings||[]),entry]},
        freeAgents:prev.freeAgents.filter(p=>p.id!==player.id),
        finances:{...prev.finances,totalSpent:prev.finances.totalSpent+player.salary*3},
        signingLog:[...(prev.signingLog||[]),entry],
        socialFeed:[newPost,...(prev.socialFeed||[])].slice(0,50),
        transferLog:[...(prev.transferLog||[]),{type:"player_sign",player:player.name,fromTeam:"Free Agent",toTeam:prev.playerTeam.name,season:prev.season,month:prev.month}],
      };
    });
  }

  function releasePlayer(player){
    G(prev=>{
      if(prev.playerTeam.players.length<=4){notify("Need 4 players minimum!","error");return prev;}
      const text=fillBanterTemplate(pick(BANTER_TEMPLATES.released),{player:player.name.split("#")[0],team:prev.playerTeam.name});
      const newPost={id:Date.now(),user:pick(SOCIAL_HANDLES),text,likes:rand(50,2000),type:"transfer",season:prev.season,isTransfer:true};
      notify(`${player.name.split("#")[0]} released.`,"info");
      const entry={season:prev.season,month:prev.month,teamName:prev.playerTeam.name,playerName:player.name,type:"out"};
      return{...prev,
        playerTeam:{...prev.playerTeam,players:prev.playerTeam.players.filter(p=>p.id!==player.id),signings:[...(prev.playerTeam.signings||[]),entry]},
        freeAgents:[{...player,teamId:null,isFree:true,mood:55},...prev.freeAgents],
        signingLog:[...(prev.signingLog||[]),entry],
        socialFeed:[newPost,...(prev.socialFeed||[])].slice(0,50),
        transferLog:[...(prev.transferLog||[]),{type:"player_release",player:player.name,fromTeam:prev.playerTeam.name,season:prev.season,month:prev.month}],
      };
    });
  }

  function resignPlayer(player){
    G(prev=>{
      if(prev.phase!=="signing"){notify("January only!","error");return prev;}
      const cost=player.salary*12;
      if(prev.playerTeam.budget<cost){notify("Not enough budget!","error");return prev;}
      notify(`🔄 ${player.name.split("#")[0]} extended!`,"success");
      return{...prev,playerTeam:{...prev.playerTeam,players:prev.playerTeam.players.map(p=>p.id===player.id?{...p,contract:2,mood:Math.min(100,(p.mood||70)+10)}:p),budget:prev.playerTeam.budget-cost}};
    });
  }

  function signSponsor(id){
    G(prev=>{
      if((prev.activeSponsors||[]).includes(id)){notify("Already signed!","error");return prev;}
      if((prev.activeSponsors||[]).length+(prev.activePartnerships||[]).length>=4){notify("Max 4 deals!","error");return prev;}
      const sp=SPONSORS.find(x=>x.id===id);notify(`🤝 ${sp.name} signed!`,"success");
      return{...prev,activeSponsors:[...(prev.activeSponsors||[]),id],news:[{id:Date.now(),text:`📢 ${sp.name} deal! +₹${sp.monthly.toLocaleString()}/mo`,type:"success",month:prev.month},...prev.news].slice(0,50)};
    });
  }

  function cancelSponsor(id){G(prev=>{notify("Deal ended.","info");return{...prev,activeSponsors:(prev.activeSponsors||[]).filter(x=>x!==id)};});}

  function signPartnership(id){
    G(prev=>{
      if((prev.activePartnerships||[]).includes(id)){notify("Already partnered!","error");return prev;}
      if((prev.activeSponsors||[]).length+(prev.activePartnerships||[]).length>=4){notify("Max 4 deals!","error");return prev;}
      const p=PARTNERSHIPS.find(x=>x.id===id);notify(`🤝 ${p.name} partnership!`,"success");
      return{...prev,activePartnerships:[...(prev.activePartnerships||[]),id],news:[{id:Date.now(),text:`🎉 ${p.name} partnership! ${p.bonus}`,type:"gold",month:prev.month},...prev.news].slice(0,50)};
    });
  }

  function cancelPartnership(id){G(prev=>{notify("Partnership ended.","info");return{...prev,activePartnerships:(prev.activePartnerships||[]).filter(x=>x!==id)};});}

  function buyMerch(mid){
    G(prev=>{
      const m=MERCH_ITEMS.find(x=>x.id===mid);
      if(!m) return prev;
      if((prev.ownedMerch||[]).includes(mid)){notify("Already owned!","error");return prev;}
      if(prev.playerTeam.budget<m.baseCost){notify("Insufficient budget!","error");return prev;}
      if(m.requiresWin&&prev.playerTeam.stats.tWins===0){notify("Win a tournament first!","error");return prev;}
      notify(`🛍️ ${m.name} launched!`,"success");
      return{...prev,
        playerTeam:{...prev.playerTeam,budget:prev.playerTeam.budget-m.baseCost,fans:Math.floor((prev.playerTeam.fans||0)*1.05+rand(500,5000)),prestige:(prev.playerTeam.prestige||50)+m.prestige/2},
        ownedMerch:[...(prev.ownedMerch||[]),mid],
        news:[{id:Date.now(),text:`🛍️ ${m.name} launched! +₹${m.baseRevenue.toLocaleString()}/mo merch income`,type:"success",month:prev.month},...prev.news].slice(0,50),
      };
    });
  }

  function buyStadium(stadiumId){
    G(prev=>{
      const s=(prev.stadiums||STADIUMS).find(x=>x.id===stadiumId);
      if(!s||s.unlocked){notify("Already owned!","error");return prev;}
      const discount=(prev.activePartnerships||[]).some(pid=>PARTNERSHIPS.find(x=>x.id===pid)?.stadiumDiscount)?0.15:0;
      const cost=Math.floor(s.cost*(1-discount));
      if(prev.playerTeam.budget<cost){notify("Insufficient budget!","error");return prev;}
      notify(`🏟️ ${s.name} acquired!`,"success");
      return{...prev,
        playerTeam:{...prev.playerTeam,budget:prev.playerTeam.budget-cost,stadiumId:s.id,prestige:(prev.playerTeam.prestige||50)+s.prestige/2},
        stadiums:(prev.stadiums||STADIUMS).map(x=>x.id===stadiumId?{...x,unlocked:true}:x),
        news:[{id:Date.now(),text:`🏟️ ${s.name} acquired!`,type:"success",month:prev.month},...prev.news].slice(0,50),
      };
    });
  }

  function enterTournament(t){
    if(!game) return;
    const key=tKey(t.id,game.season);
    if(game.completedTournaments[key]){notify("Already played!","error");return;}
    if(game.playerTeam.players.length<4){notify("Need at least 4 players!","error");return;}
    if(t.type==="grand_finals"&&!grandFinalsQualified){notify("Not qualified for Grand Finals!","error");return;}
    setModal({type:"tournament",tournament:t});
  }

  function completeTournament({tournament,playerRank,standings,finalStandings,awards}){
    const prizeBonus=(game.activePartnerships||[]).some(pid=>PARTNERSHIPS.find(x=>x.id===pid)?.prizeBonus)?0.10:0;
    const basePrize=Math.floor(tournament.prize*(PRIZE_DIST[playerRank-1]||0));
    const prize=Math.floor(basePrize*(1+prizeBonus));
    const worldPts=(WORLD_RANK_PTS[tournament.type]||WORLD_RANK_PTS.unofficial)[playerRank-1]||0;

    G(prev=>{
      const key=tKey(tournament.id,prev.season);
      const playerStanding=standings?.find(s=>s.team.id==="player");
      const totalKills=playerStanding?.kills||0;
      const moodDelta=playerRank===1?12:playerRank<=3?6:playerRank<=8?0:-5;
      const isChampion=playerRank===1;

      const updatedPlayers=prev.playerTeam.players.map(p=>{
        const killShare=Math.floor(totalKills/Math.max(prev.playerTeam.players.length,1));
        const grown=applyPlayerGrowth(p, killShare, playerRank, isChampion);
        const compEntry={tournamentName:tournament.name,type:tournament.type,season:prev.season,month:prev.month,rank:playerRank,kills:killShare,points:playerStanding?.total||0,teamName:prev.playerTeam.name};
        return{...grown,mood:Math.max(20,Math.min(100,(grown.mood||70)+moodDelta)),
          career:{...grown.career,kills:grown.career.kills+killShare,matches:grown.career.matches+6,wins:grown.career.wins+(isChampion?1:0),tournaments:grown.career.tournaments+(isChampion?1:0),survivalTime:(grown.career.survivalTime||0)+rand(60,300),damage:(grown.career.damage||0)+killShare*rand(50,200)},
          season:{...grown.season,kills:(grown.season?.kills||0)+killShare,matches:(grown.season?.matches||0)+6,points:(grown.season?.points||0)+(playerStanding?.total||0)},
          teamHistory:grown.teamHistory?.map((h,hi)=>hi===grown.teamHistory.length-1?{...h,kills:(h.kills||0)+killShare,matches:(h.matches||0)+6}:h)||[],
          competitionHistory:[...(grown.competitionHistory||[]),compEntry],
          // Update fan score based on performance
          fanScore:Math.floor((grown.fanScore||1000)+rand(0,500)*(isChampion?3:1)),
        };
      });

      const trophies=isChampion?[...prev.playerTeam.trophies,{...tournament,season:prev.season,month:prev.month,playerRank}]:prev.playerTeam.trophies;
      const newPosts=genSocialPosts(tournament.name,playerRank,prev.playerTeam.name,totalKills,prev.season);
      const hofEntries=isChampion?[{name:prev.playerTeam.name,award:`${tournament.name} Champion`,season:prev.season,stat:fmtMoney(prize),type:"tournament"}]:[];

      // Chicken dinners — count WWCD wins across all matches (approx from standings)
      const newDinners=isChampion?prev.playerTeam.chickenDinners+1:prev.playerTeam.chickenDinners;

      // Check rivalry
      const top3Teams=(standings||[]).slice(0,3).map(s=>s.team?.name).filter(Boolean);
      const rivalryPosts=[];
      if(!isChampion&&top3Teams.length>0){
        const rival=pick(top3Teams);
        if(Math.random()<0.4){
          const post={id:Date.now()+99,user:pick(SOCIAL_HANDLES),text:fillBanterTemplate(pick(BANTER_TEMPLATES.rivalry),{team1:prev.playerTeam.name,team2:rival,player:prev.playerTeam.players[0]?.name?.split("#")[0]||"?"}),likes:rand(200,5000),type:"rivalry",season:prev.season,isTransfer:false};
          rivalryPosts.push(post);
        }
      }

      const winner=finalStandings?.[0]||standings?.[0];
      const runnerUp=finalStandings?.[1]||standings?.[1];
      const third=finalStandings?.[2]||standings?.[2];
      const tournamentWinners={...prev.tournamentWinners,[key]:{winner:winner?.team?.name||"?",winnerFlag:COUNTRIES[winner?.team?.country]?.flag||"🌐",runnerUp:runnerUp?.team?.name||"?",third:third?.team?.name||"?",playerRank,prize,season:prev.season,tournamentName:tournament.name}};

      // Store awards
      const tournamentAwards={...prev.tournamentAwards,[key]:awards||null};

      let globalQualified=prev.globalQualified;
      if(tournament.type==="official"&&playerRank<=3) globalQualified=true;
      const topN=standings?standings.slice(0,8).map(s=>({teamName:s.team.name,rank:standings.indexOf(s)+1,total:s.total})):[];

      // AI teams also get chicken dinner counts
      const updatedAI=prev.aiTeams.map(t=>{
        const inStandings=standings?.find(s=>s.team.id===t.id);
        if(inStandings?.total>0&&Math.random()<0.1) return{...t,chickenDinners:(t.chickenDinners||0)+1};
        return t;
      });

      return{...prev,
        playerTeam:{...prev.playerTeam,budget:prev.playerTeam.budget+prize,players:updatedPlayers,trophies,stats:{...prev.playerTeam.stats,tWins:prev.playerTeam.stats.tWins+(isChampion?1:0),kills:prev.playerTeam.stats.kills+totalKills},worldRankPts:(prev.playerTeam.worldRankPts||0)+worldPts,chickenDinners:newDinners,fans:Math.floor((prev.playerTeam.fans||0)+(isChampion?rand(5000,50000):rand(100,2000)))},
        completedTournaments:{...prev.completedTournaments,[key]:{playerRank,prize,date:`${MONTHS[prev.month-1]} ${prev.season}`,tournamentName:tournament.name}},
        tournamentHistory:[...prev.tournamentHistory,{season:prev.season,month:prev.month,tournamentId:tournament.id,tournamentName:tournament.name,type:tournament.type,playerRank,prize,standings:topN}],
        finances:{...prev.finances,totalEarned:prev.finances.totalEarned+prize},
        globalQualified,
        socialFeed:[...newPosts,...rivalryPosts,...(prev.socialFeed||[])].slice(0,30),
        news:[{id:Date.now(),text:`${tournament.name} S${prev.season}: #${playerRank}${prize>0?` · ${fmtMoney(prize)}`:""} (+${worldPts} WR pts)`,type:playerRank<=3?"success":"info",month:prev.month},...prev.news].slice(0,50),
        hallOfFame:[...(prev.hallOfFame||[]),...hofEntries],
        tournamentWinners,
        tournamentAwards,
        aiTeams:updatedAI,
      };
    });
    setModal(null);
    if(playerRank===1)notify(`🏆 CHAMPION! 🍗 Chicken Dinner! ${fmtMoney(prize)}`,"gold",5000);
    else if(playerRank<=3)notify(`🎉 Top 3! ${fmtMoney(prize)}`,"success");
    else notify(`Finished #${playerRank}`,"info");
  }

  if(!game||showTeamCreate){
    const tempAi=TEAM_ROSTER.slice(0,30).map((t,i)=>genTeam(`t${i}`,t.name,t.country,false));
    return <TeamCreationModal aiTeams={tempAi} onConfirm={handleTeamCreated}/>;
  }

  const pt=game.playerTeam;
  const teamOvr=pt.players.length?Math.round(pt.players.reduce((a,p)=>a+effectiveOvr(p),0)/pt.players.length):0;
  const teamMood=pt.players.length?Math.round(pt.players.reduce((a,p)=>a+(p.mood||70),0)/pt.players.length):70;
  const teamRatingVal=teamRating(pt);
  const playerWorldRank=worldRankings.findIndex(r=>r.team.id==="player")+1;
  const monthTournaments=ALL_TOURNAMENTS.filter(t=>t.month===game.month);
  const currentStadium=(game.stadiums||STADIUMS).find(s=>s.id===(pt.stadiumId||"garage"))||STADIUMS[0];
  const totalSponsorIncome=(game.activeSponsors||[]).reduce((s,sid)=>{const sp=SPONSORS.find(x=>x.id===sid);return s+(sp?.monthly||0);},0);
  const totalPartnerIncome=(game.activePartnerships||[]).reduce((s,pid)=>{const p=PARTNERSHIPS.find(x=>x.id===pid);return s+(p?.monthly||0);},0);
  const totalMerchIncome=(game.ownedMerch||[]).reduce((s,mid)=>{const m=MERCH_ITEMS.find(x=>x.id===mid);return s+(m?.baseRevenue||0);},0);
  const transferFeed=(game.socialFeed||[]).filter(p=>p.isTransfer);

  const TABS=[
    {id:"dashboard",label:"Dashboard",icon:"📊"},{id:"roster",label:"Roster",icon:"👥"},
    {id:"transfers",label:"Transfers",icon:"🔄"},{id:"tournaments",label:"Tournaments",icon:"🏆"},
    {id:"simulate",label:"Sim Match",icon:"⚡"},{id:"merch",label:"Merch",icon:"🛍️"},
    {id:"rivalries",label:"Rivalries",icon:"🔥"},{id:"awards",label:"Awards",icon:"🎖️"},
    {id:"stadium",label:"Stadium",icon:"🏟️"},{id:"partnerships",label:"Partners",icon:"🤝"},
    {id:"finances",label:"Finances",icon:"💰"},{id:"rankings",label:"Rankings",icon:"🌍"},
    {id:"halloffame",label:"Hall of Fame",icon:"🧠"},{id:"media",label:"Media",icon:"📱"},
    {id:"history",label:"History",icon:"📜"},
  ];

  return(
    <div className="min-h-screen bg-[#0a0a0f] text-white" style={{fontFamily:"'Rajdhani','Oswald',system-ui,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        .orb{font-family:'Orbitron',monospace}
        ::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#f97316;border-radius:99px}
      `}</style>

      {notif&&<div className={`fixed top-4 right-4 z-[400] px-5 py-3 rounded-2xl font-black text-sm shadow-2xl border max-w-xs ${notif.type==="success"?"bg-green-900/90 border-green-500/50 text-green-300":notif.type==="error"?"bg-red-900/90 border-red-500/50 text-red-300":notif.type==="gold"?"bg-yellow-900/90 border-yellow-500/50 text-yellow-300":"bg-blue-900/90 border-blue-500/50 text-blue-300"}`}>{notif.msg}</div>}

      {modal?.type==="tournament"&&<Tournament128Modal tournament={modal.tournament} playerTeam={game.playerTeam} aiTeams={game.aiTeams} onClose={()=>setModal(null)} onComplete={completeTournament}/>}
      {showCeremony&&<AwardCeremonyModal awards={showCeremony} onClose={()=>setShowCeremony(null)}/>}
      {confirmNew&&<div className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center p-4"><div className="bg-gray-900 border border-red-500/30 rounded-3xl p-8 max-w-sm w-full text-center"><div className="text-4xl mb-4">⚠️</div><h3 className="text-xl font-black text-white mb-2">Start New Game?</h3><p className="text-gray-400 text-sm mb-6">All progress lost.</p><div className="flex gap-3"><button onClick={()=>setConfirmNew(false)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-bold">Cancel</button><button onClick={()=>{setConfirmNew(false);setShowTeamCreate(true);}} className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-black">New Game</button></div></div></div>}

      {/* HEADER */}
      <header className="bg-gray-950/95 border-b border-orange-500/20 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-700 rounded-xl flex items-center justify-center text-2xl">{pt.logo||"🏆"}</div>
              <div className="hidden sm:block">
                <div className="orb font-black text-base leading-none" style={{background:"linear-gradient(135deg,#f97316,#ef4444)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BGMI MANAGER v8</div>
                <div className="text-gray-500 text-[10px]">{pt.name} · S{game.season}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs">
              <div className="text-center"><div className="text-gray-500">Month</div><div className="text-white font-bold">{MONTHS[game.month-1]}</div></div>
              <div className="text-center hidden sm:block"><div className="text-gray-500">Budget</div><div className="text-green-400 font-black">{fmtMoney(pt.budget)}</div></div>
              <div className="text-center"><div className="text-gray-500">Rating</div><div><TeamRatingBadge rating={teamRatingVal}/></div></div>
              <div className="text-center hidden sm:block"><div className="text-gray-500">🍗</div><div className="text-yellow-400 font-black">{pt.chickenDinners||0}</div></div>
              <div className="text-center hidden sm:block"><div className="text-gray-500">World</div><div className="text-cyan-400 font-black">#{playerWorldRank}</div></div>
              {grandFinalsQualified&&<div className="hidden sm:block text-[10px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-2 py-1 rounded-lg font-black animate-pulse">👑 GF</div>}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={advanceMonth} className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black px-3 py-2 rounded-xl text-xs transition-all shadow-lg shadow-orange-500/20">Next Month →</button>
              <button onClick={()=>setConfirmNew(true)} className="text-gray-600 hover:text-gray-400 text-xs px-2 py-2 rounded-xl border border-gray-800 hidden sm:block">New</button>
            </div>
          </div>
        </div>
      </header>

      {/* Grand Finals Qualification Banner */}
      {grandFinalsQualified&&game.month===12&&!game.completedTournaments[tKey("bgmi_grand_finals",game.season)]&&(
        <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/30 border-b border-yellow-500/30 px-4 py-3 text-center animate-pulse">
          <span className="text-yellow-400 font-black">👑 You qualified for the BGMI Grand Finals! Enter via Tournaments → Grand Finals</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col lg:flex-row gap-5">
          <nav className="lg:w-48 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${tab===t.id?"bg-orange-500/15 text-orange-400 border border-orange-500/30":"text-gray-500 hover:text-white hover:bg-gray-800/60 border border-transparent"}`}>
                <span>{t.icon}</span><span className="hidden sm:inline lg:inline">{t.label}</span>
              </button>
            ))}
            <div className="lg:mt-2 flex lg:flex-col gap-1.5">
              <button onClick={()=>saveGame(game)&&notify("💾 Saved!","success")} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap text-gray-500 hover:text-gray-300 border border-gray-800">💾 <span className="hidden sm:inline lg:inline">Save</span></button>
            </div>
          </nav>

          <main className="flex-1 min-w-0">

            {/* ── DASHBOARD ── */}
            {tab==="dashboard"&&(
              <div className="space-y-5">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{pt.logo||"🏆"}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3"><h2 className="orb font-black text-white text-xl">{pt.name}</h2><TeamRatingBadge rating={teamRatingVal}/></div>
                      <div className="flex gap-4 mt-2 text-sm flex-wrap">
                        <div><span className="text-gray-500">OVR</span> <span className="text-orange-400 font-black">{teamOvr}</span></div>
                        <div><span className="text-gray-500">Mood</span> <span className={`font-black ${teamMood>=75?"text-green-400":"text-yellow-400"}`}>{teamMood}</span></div>
                        <div><span className="text-gray-500">🏆</span> <span className="text-yellow-400 font-black">{pt.trophies.length}</span></div>
                        <div><span className="text-gray-500">🍗</span> <span className="text-yellow-400 font-black">{pt.chickenDinners||0} Dinners</span></div>
                        <div><span className="text-gray-500">World</span> <span className="text-cyan-400 font-black">#{playerWorldRank}</span></div>
                        <div><span className="text-gray-500">Fans</span> <span className="text-pink-400 font-black">{(pt.fans||0).toLocaleString()}</span></div>
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <div className="text-gray-500 text-xs mb-1">Budget</div>
                      <div className="text-green-400 font-black text-lg">{fmtMoney(pt.budget)}</div>
                    </div>
                  </div>
                </div>

                {/* Grand Finals qualification progress */}
                <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/10 border border-yellow-500/20 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-yellow-400 text-sm">👑 Grand Finals Qualification</span>
                    {grandFinalsQualified?<span className="text-[10px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-2 py-0.5 rounded font-black">✓ QUALIFIED</span>:<span className="text-[10px] text-gray-500">Need {GRAND_FINALS_QUALIFY_PTS}pts OR {GRAND_FINALS_QUALIFY_WINS} official wins</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">World Rank Points</div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 rounded-full transition-all" style={{width:`${Math.min(100,(pt.worldRankPts||0)/GRAND_FINALS_QUALIFY_PTS*100)}%`}}/></div>
                      <div className="text-xs text-yellow-400 mt-1">{pt.worldRankPts||0}/{GRAND_FINALS_QUALIFY_PTS}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Official Tournament Wins</div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full transition-all" style={{width:`${Math.min(100,game.tournamentHistory.filter(h=>h.type==="official"&&h.playerRank===1).length/GRAND_FINALS_QUALIFY_WINS*100)}%`}}/></div>
                      <div className="text-xs text-amber-400 mt-1">{game.tournamentHistory.filter(h=>h.type==="official"&&h.playerRank===1).length}/{GRAND_FINALS_QUALIFY_WINS}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[{label:"Players",value:`${pt.players.length}/6`,icon:"👥",col:"text-sky-400"},{label:"Merch Items",value:(game.ownedMerch||[]).length,icon:"🛍️",col:"text-pink-400"},{label:"Rivalries",value:rivalries.length,icon:"🔥",col:"text-red-400"},{label:"HOF Entries",value:(game.hallOfFame||[]).length,icon:"🧠",col:"text-purple-400"}].map(s=>(
                    <div key={s.label} className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4"><div className="text-2xl mb-2">{s.icon}</div><div className={`text-xl font-black ${s.col}`}>{s.value}</div><div className="text-gray-500 text-xs">{s.label}</div></div>
                  ))}
                </div>

                <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
                  <h3 className="orb font-bold text-white text-sm mb-4">⚔️ {MONTHS[game.month-1]} Events</h3>
                  {monthTournaments.length===0&&!grandFinalsQualified?<p className="text-gray-500 text-sm">No tournaments — advance month!</p>:(
                    <div className="grid sm:grid-cols-2 gap-3">
                     {[...(grandFinalsQualified && game.month === 12 ? [GRAND_FINALS_TOURNAMENT] : []), ...monthTournaments].map(t => {
  const key = tKey(t.id, game.season);
  const done = game.completedTournaments[key];
  const winner = game.tournamentWinners?.[key];
  const awards = game.tournamentAwards?.[key];
  return (
    <div key={t.id} className={`bg-gray-950 border rounded-xl p-4 ${done ? "border-gray-800 opacity-70" : t.type === "grand_finals" ? "border-yellow-500/40 animate-pulse" : "border-gray-700/50 hover:border-orange-500/30"}`}>
      <div className="flex items-start justify-between mb-2"><TierBadge type={t.type}/><span className="text-green-400 text-xs font-bold">{fmtMoney(t.prize)}</span></div>
                          <h4 className="font-black text-white text-sm">{t.name}</h4>
                          {done?(
                            <div className="mt-2">
                              <div className={`text-sm font-black ${done.playerRank===1?"text-yellow-400":done.playerRank<=3?"text-green-400":"text-gray-500"}`}>{done.playerRank===1?"🥇 WON! 🍗":done.playerRank<=3?`🥈 Top ${done.playerRank}`:`#${done.playerRank}`}{done.prize>0?` · ${fmtMoney(done.prize)}`:""}</div>
                              {winner&&done.playerRank>1&&<div className="mt-1 text-[10px] text-gray-500">🏆 Won by: <span className="text-yellow-400">{winner.winnerFlag} {winner.winner}</span></div>}
                              {awards&&<button onClick={()=>setShowCeremony(awards)} className="mt-2 text-[10px] bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-1 rounded font-black w-full">🎖️ View Awards</button>}
                            </div>
                          ):<button onClick={()=>enterTournament(t)} className="mt-3 w-full py-2 rounded-xl font-black text-sm bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/30">⚔️ ENTER</button>}
                        </div>
                      );})}
                    </div>
                  )}
                </div>

                <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
                  <h3 className="orb font-bold text-white text-sm mb-3">📰 News</h3>
                  <div className="space-y-2 max-h-52 overflow-auto">{game.news.map((n,i)=><div key={n.id||i} className="flex gap-3 text-sm border-b border-gray-800/50 pb-2 last:border-0"><span className="text-gray-600 text-xs shrink-0">{MONTHS[n.month-1]}</span><span className={`${n.type==="gold"?"text-yellow-300":n.type==="success"?"text-green-300":"text-gray-300"}`}>{n.text}</span></div>)}</div>
                </div>
              </div>
            )}

            {/* ── ROSTER ── */}
            {tab==="roster"&&(
              <div>
                <div className="flex items-center justify-between mb-5"><h2 className="orb font-black text-white text-xl">Your Roster</h2><div className="flex items-center gap-3"><span className="text-sm text-gray-400">{pt.players.length}/6</span><TeamRatingBadge rating={teamRatingVal}/></div></div>
                {pt.players.length===0?<div className="text-center py-20 text-gray-500"><div className="text-5xl mb-3">👥</div><p>No players! Go to Transfers.</p></div>:(
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {pt.players.map(p=>(
                      <div key={p.id} className="space-y-2">
                        <PlayerCard player={p} onRelease={releasePlayer} showCareer/>
                        {game.phase==="signing"&&<button onClick={()=>resignPlayer(p)} className="w-full text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 py-2 rounded-xl font-bold">🔄 Extend +₹{(p.salary*12).toLocaleString()}</button>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── TRANSFERS ── */}
            {tab==="transfers"&&(
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="orb font-black text-white text-xl">Transfer Market</h2>
                  <div className={`text-xs font-black px-3 py-1.5 rounded-xl border ${game.phase==="signing"?"bg-green-500/20 text-green-400 border-green-500/30":"bg-red-500/20 text-red-400 border-red-500/30"}`}>{game.phase==="signing"?"✅ Window OPEN":"🔒 Jan Only"}</div>
                </div>
                {game.phase!=="signing"&&<div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-4 text-yellow-300 text-sm">⚠️ Transfer window opens in January.</div>}
                <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 mb-4 flex flex-wrap gap-3">
                  <input value={transferSearch} onChange={e=>setTransferSearch(e.target.value)} placeholder="Search..." className="bg-gray-800 border border-gray-700 text-white text-xs px-3 py-2 rounded-xl outline-none flex-1 min-w-24"/>
                  <select value={transferRole} onChange={e=>setTransferRole(e.target.value)} className="bg-gray-800 border border-gray-700 text-white text-xs px-3 py-2 rounded-xl"><option value="All">All Roles</option>{ROLES.map(r=><option key={r} value={r}>{r}</option>)}</select>
                  <div className="flex items-center gap-2"><span className="text-xs text-gray-400">Min OVR</span><input type="range" min={0} max={90} value={transferMinOvr} onChange={e=>setTransferMinOvr(+e.target.value)} style={{accentColor:"#f97316"}}/><span className="text-xs text-orange-400 font-bold w-6">{transferMinOvr}</span></div>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredFreeAgents.slice(0,24).map(p=><PlayerCard key={p.id} player={p} onSign={game.phase==="signing"?signPlayer:null} showCareer/>)}
                  {filteredFreeAgents.length===0&&<div className="col-span-3 text-center py-16 text-gray-500"><p>No players match filters</p></div>}
                </div>
              </div>
            )}

            {/* ── TOURNAMENTS ── */}
            {tab==="tournaments"&&(
              <div className="space-y-6">
                <div className="flex items-center justify-between"><h2 className="orb font-black text-white text-xl">Tournament Hub</h2></div>

                {/* Grand Finals section */}
                {grandFinalsQualified&&(
                  <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/20 border-2 border-yellow-500/40 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-4xl">👑</div>
                      <div>
                        <div className="text-yellow-400 font-black text-lg">BGMI GRAND FINALS</div>
                        <div className="text-gray-300 text-sm">You qualified! Compete in December for the ultimate prize.</div>
                        <div className="text-green-400 font-bold">{fmtMoney(GRAND_FINALS_TOURNAMENT.prize)} Prize Pool</div>
                      </div>
                    </div>
                    {game.month===12&&!game.completedTournaments[tKey("bgmi_grand_finals",game.season)]?
                      <button onClick={()=>enterTournament(GRAND_FINALS_TOURNAMENT)} className="w-full bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 text-white font-black py-3 rounded-xl text-lg shadow-xl shadow-yellow-500/20">👑 ENTER GRAND FINALS</button>:
                      <div className="text-xs text-gray-400">{game.month<12?`Grand Finals available in December (current: ${MONTHS[game.month-1]})`:"Already competed!"}</div>
                    }
                  </div>
                )}

                {[
                  {label:"🏟️ LAN Events",list:LAN_EVENTS,type:"lan"},
                  {label:"🌍 Global",list:GLOBAL_TOURNAMENTS,type:"global"},
                  {label:"🏆 Official",list:OFFICIAL_TOURNAMENTS,type:"official"},
                  {label:"🎮 Unofficial",list:UNOFFICIAL_TOURNAMENTS,type:"unofficial"},
                ].map(sec=>(
                  <div key={sec.label}><h3 className="font-black text-white mb-3">{sec.label}</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sec.list.map(t=>{const key=tKey(t.id,game.season);const done=game.completedTournaments[key];const isCurMonth=t.month===game.month;const awards=game.tournamentAwards?.[key];const winner=game.tournamentWinners?.[key];return(
                        <div key={t.id} className={`bg-gray-900 border rounded-2xl p-4 ${isCurMonth&&!done?"border-orange-500/40":"border-gray-800"}`}>
                          <div className="flex items-start justify-between mb-2"><TierBadge type={t.type}/><span className="text-xs text-gray-500">{MONTHS[t.month-1]}</span></div>
                          <h4 className="font-black text-white mb-1 text-sm">{t.name}</h4>
                          <p className="text-green-400 font-bold text-sm">{fmtMoney(t.prize)}</p>
                          {done?(
                            <div className="mt-2">
                              <div className={`font-black text-sm ${done.playerRank===1?"text-yellow-400":done.playerRank<=3?"text-green-400":"text-gray-500"}`}>{done.playerRank===1?"🥇 WON! 🍗":done.playerRank<=3?`🥈 #${done.playerRank}`:`#${done.playerRank}`}{done.prize>0?` · ${fmtMoney(done.prize)}`:""}</div>
                              {winner&&done.playerRank>1&&<div className="mt-1 text-[10px] text-gray-500">🏆 {winner.winnerFlag} {winner.winner}</div>}
                              {awards&&<button onClick={()=>setShowCeremony(awards)} className="mt-2 text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded font-black w-full">🎖️ Awards Ceremony</button>}
                            </div>
                          ):isCurMonth?<button onClick={()=>enterTournament(t)} className="mt-3 w-full py-2 rounded-xl font-black text-sm bg-orange-500/15 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30">⚔️ COMPETE</button>:null}
                        </div>
                      );})}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab==="simulate"&&<SingleMatchSimulator playerTeam={game.playerTeam} aiTeams={game.aiTeams}/>}

            {/* ── MERCHANDISE ── */}
            {tab==="merch"&&(
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="orb font-black text-white text-xl">🛍️ Merchandise</h2>
                  <div className="text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">Monthly Merch Revenue: <span className="text-pink-400 font-black">+₹{totalMerchIncome.toLocaleString()}</span></div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
                  <div className="text-xs font-black text-gray-400 mb-3">YOUR MERCH PORTFOLIO</div>
                  {(game.ownedMerch||[]).length===0?<p className="text-gray-500 text-sm">No merchandise yet. Launch products to earn fan income!</p>:(
                    <div className="flex flex-wrap gap-2">
                      {(game.ownedMerch||[]).map(mid=>{const m=MERCH_ITEMS.find(x=>x.id===mid);if(!m)return null;return(
                        <div key={mid} className="flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-xl px-3 py-2">
                          <span className="text-xl">{m.icon}</span>
                          <div><div className="text-white font-black text-xs">{m.name}</div><div className="text-green-400 text-[10px]">+₹{m.baseRevenue.toLocaleString()}/mo</div></div>
                        </div>
                      );})}
                    </div>
                  )}
                </div>

                {["jersey","skin","fan"].map(cat=>{
                  const catItems=MERCH_ITEMS.filter(m=>m.category===cat);
                  const catLabels={jersey:"👕 Jerseys",skin:"🎨 In-Game Skins",fan:"❤️ Fan Items"};
                  return(
                    <div key={cat}>
                      <h3 className="font-black text-white mb-3">{catLabels[cat]}</h3>
                      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {catItems.map(m=>{
                          const owned=(game.ownedMerch||[]).includes(m.id);
                          const fans=pt.fans||0;
                          const meetsUnlock=fans>=m.unlockAt*1000/20;
                          const meetsWin=!m.requiresWin||(pt.stats.tWins||0)>0;
                          const meetsPartner=!m.requiresPartner||(game.activePartnerships||[]).length>0;
                          const eligible=meetsUnlock&&meetsWin&&meetsPartner;
                          const canAfford=pt.budget>=m.baseCost;
                          return(
                            <div key={m.id} className={`bg-gray-900 border rounded-2xl p-4 ${owned?"border-pink-500/40 bg-pink-500/5":eligible?"border-gray-700/50":"border-gray-800 opacity-60"}`}>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl border border-gray-700">{m.icon}</div>
                                <div className="flex-1">
                                  <div className="font-black text-white text-sm">{m.name}</div>
                                  <div className="text-gray-400 text-xs">{m.desc}</div>
                                  {owned&&<span className="text-[9px] bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded font-black">ACTIVE</span>}
                                </div>
                              </div>
                              <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg px-3 py-2 mb-3">
                                <div className="text-green-400 font-black text-sm">+₹{m.baseRevenue.toLocaleString()}/mo</div>
                                <div className="text-pink-300 text-xs">+{m.prestige} prestige</div>
                              </div>
                              {m.requiresWin&&<div className={`text-[10px] mb-1 ${meetsWin?"text-green-400":"text-red-400"}`}>{meetsWin?"✓":"✗"} Requires a tournament win</div>}
                              {m.requiresPartner&&<div className={`text-[10px] mb-1 ${meetsPartner?"text-green-400":"text-red-400"}`}>{meetsPartner?"✓":"✗"} Requires active partnership</div>}
                              {!owned&&eligible&&<div className="text-xs text-gray-400 mb-2">Cost: <span className="text-white font-bold">{fmtMoney(m.baseCost)}</span></div>}
                              {owned?<div className="text-[10px] text-pink-400 text-center py-1">✓ LAUNCHED</div>
                              :eligible&&canAfford?<button onClick={()=>buyMerch(m.id)} className="w-full text-xs bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 py-2 rounded-xl font-black">🛍️ Launch</button>
                              :!eligible?<div className="text-[10px] text-red-400 text-center py-1">Requirements not met</div>
                              :<div className="text-[10px] text-gray-500 text-center py-1">Need {fmtMoney(m.baseCost)}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── RIVALRIES ── */}
            {tab==="rivalries"&&(
              <div className="space-y-5">
                <h2 className="orb font-black text-white text-xl">🔥 Rivalries & Drama</h2>

                {rivalries.length===0?(
                  <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-2xl">
                    <div className="text-6xl mb-4 opacity-20">🔥</div>
                    <p className="text-gray-500 font-bold">No rivalries yet. Compete in tournaments to build them!</p>
                    <p className="text-gray-600 text-sm mt-2">Rivalries form when you face the same teams multiple times.</p>
                  </div>
                ):(
                  <div className="space-y-4">
                    {rivalries.map((r,i)=>{
                      const flag=COUNTRIES[r.team.country]?.flag||"🌐";
                      const intensity=r.intensity||1;
                      return(
                        <div key={i} className="bg-gray-900 border border-red-500/30 rounded-2xl p-5">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl">{r.team.logo}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-white text-lg">{r.team.name}</span>
                                <span>{flag}</span>
                              </div>
                              <div className="text-red-400 text-sm">{r.encounters} encounters</div>
                              <div className="flex items-center gap-1 mt-1">
                                {Array.from({length:5},(_,ki)=><span key={ki} className={`text-lg ${ki<Math.ceil(intensity/2)?"text-red-500":"text-gray-700"}`}>🔥</span>)}
                                <span className="text-xs text-gray-500 ml-1">Intensity {intensity}/10</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <TeamRatingBadge rating={teamRating(r.team)}/>
                              <div className="text-xs text-gray-500 mt-1">+{Math.round(intensity*2)}% motivation</div>
                            </div>
                          </div>
                          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3">
                            <div className="text-[10px] font-black text-red-400 mb-2">RIVALRY EFFECT</div>
                            <div className="text-sm text-gray-300">Your team performs +{Math.round(intensity*2)}% better vs {r.team.name} due to rivalry motivation!</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                  <h3 className="font-black text-white mb-4">📱 Rivalry Drama Feed</h3>
                  <div className="space-y-3">
                    {(game.socialFeed||[]).filter(p=>p.type==="rivalry").slice(0,5).map((post,i)=>(
                      <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 text-sm">
                        <div className="flex items-center gap-2 mb-1"><span className="font-black text-red-400">{post.user}</span><span className="text-gray-500 text-xs">S{post.season}</span></div>
                        <p className="text-gray-200">{post.text}</p>
                        <div className="text-xs text-gray-600 mt-1">❤️ {post.likes?.toLocaleString()}</div>
                      </div>
                    ))}
                    {(game.socialFeed||[]).filter(p=>p.type==="rivalry").length===0&&<p className="text-gray-600 text-sm">No rivalry drama yet. Compete!</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ── AWARDS ── */}
            {tab==="awards"&&(
              <div className="space-y-5">
                <h2 className="orb font-black text-white text-xl">🎖️ Awards & Records</h2>

                {/* Chicken Dinner Leaderboard */}
                <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/20 border border-yellow-500/30 rounded-2xl p-5">
                  <h3 className="font-black text-yellow-400 text-lg mb-4">🍗 Chicken Dinner Leaderboard</h3>
                  <div className="space-y-2">
                    {chickenLeaderboard.slice(0,10).map(({team:t,dinners},i)=>{
                      const isP=t.id==="player";const flag=COUNTRIES[t.country]?.flag||"🌐";
                      return(
                        <div key={t.id} className={`flex items-center gap-3 px-3 py-2 rounded-xl ${isP?"bg-yellow-500/15 border border-yellow-500/30":"bg-gray-900/60"}`}>
                          <span className={`font-black text-sm w-6 text-center ${i===0?"text-yellow-400":i===1?"text-gray-300":i===2?"text-amber-600":"text-gray-600"}`}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}</span>
                          <span className="text-xl">{t.logo}</span><span>{flag}</span>
                          <span className={`flex-1 font-bold text-sm ${isP?"text-yellow-400":"text-white"}`}>{t.name}{isP?" (You)":""}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 font-black text-lg">{dinners}</span>
                            <span className="text-yellow-600 text-sm">🍗</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tournament Awards History */}
                <div>
                  <h3 className="font-black text-white mb-4">🎖️ Tournament Awards History</h3>
                  {Object.keys(game.tournamentAwards||{}).length===0?<p className="text-gray-600 text-sm text-center py-8">Complete tournaments to earn awards!</p>:(
                    <div className="space-y-3">
                      {Object.entries(game.tournamentAwards||{}).filter(([,a])=>a).map(([key,awards])=>(
                        <div key={key} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                          <div className="flex items-center justify-between mb-4">
                            <div className="font-black text-white">{awards.tournamentName}</div>
                            <button onClick={()=>setShowCeremony(awards)} className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-xl font-black">🎖️ Ceremony</button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {[
                              {icon:"🥇",label:"Champion",val:awards.champion?.name,cls:"text-yellow-400"},
                              {icon:"🥈",label:"Runner-Up",val:awards.runnerUp?.name,cls:"text-gray-300"},
                              {icon:"🥉",label:"3rd Place",val:awards.third?.name,cls:"text-amber-600"},
                              {icon:"🌟",label:"MVP",val:awards.mvp?.playerName,sub:awards.mvp?.teamName,cls:"text-purple-400"},
                              {icon:"💀",label:"Kill Leader",val:awards.killLeader?.playerName,sub:`${awards.killLeader?.kills} kills`,cls:"text-red-400"},
                            ].map((item,i)=>(
                              <div key={i} className="bg-gray-800/60 rounded-xl p-3 text-center">
                                <div className="text-2xl mb-1">{item.icon}</div>
                                <div className={`font-black text-xs ${item.cls}`}>{item.label}</div>
                                <div className="text-white text-xs font-bold mt-1 truncate">{item.val||"?"}</div>
                                {item.sub&&<div className="text-gray-500 text-[10px] truncate">{item.sub}</div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fan/Media Awards */}
                {(game.mediaAwards||[]).length>0&&(
                  <div>
                    <h3 className="font-black text-white mb-4">📱 Fan & Media Awards</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[...(game.mediaAwards||[])].reverse().slice(0,6).map((award,i)=>(
                        <div key={i} className={`rounded-2xl p-5 border ${award.type==="fan_favorite"?"bg-pink-500/10 border-pink-500/30":"bg-blue-500/10 border-blue-500/30"}`}>
                          <div className="text-3xl mb-2">{award.type==="fan_favorite"?"❤️":"📱"}</div>
                          <div className={`font-black text-sm ${award.type==="fan_favorite"?"text-pink-400":"text-blue-400"}`}>{award.type==="fan_favorite"?"FAN FAVORITE PLAYER":"MOST POPULAR TEAM"}</div>
                          <div className="text-white font-black mt-1">{award.player||award.team||"?"}</div>
                          {award.team&&award.type==="fan_favorite"&&<div className="text-gray-400 text-xs">{award.team}</div>}
                          {award.fans&&<div className="text-blue-400 text-xs">{(award.fans||0).toLocaleString()} fans</div>}
                          <div className="text-gray-500 text-xs mt-1">Season {award.season}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Season Awards */}
                {Object.keys(game.seasonAwards||{}).length>0&&(
                  <div>
                    <h3 className="font-black text-white mb-4">⭐ Season Awards</h3>
                    {Object.entries(game.seasonAwards).sort((a,b)=>b[0]-a[0]).slice(0,3).map(([s,awards])=>(
                      <div key={s} className="bg-gray-900 border border-gray-700/50 rounded-2xl p-5 mb-4">
                        <div className="orb font-black text-white text-base mb-4">Season {s}</div>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {awards.mvp&&<div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center"><div className="text-3xl mb-1">🌟</div><div className="text-[10px] text-orange-400 font-black">SEASON MVP</div><div className="text-white font-black text-sm mt-1">{awards.mvp.name}</div><div className="text-gray-400 text-xs">{awards.mvp.kills} kills</div></div>}
                          {awards.rookie&&<div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center"><div className="text-3xl mb-1">🌱</div><div className="text-[10px] text-green-400 font-black">BEST ROOKIE</div><div className="text-white font-black text-sm mt-1">{awards.rookie.name}</div></div>}
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center"><div className="text-3xl mb-1">🏅</div><div className="text-[10px] text-blue-400 font-black">BEST TEAM</div><div className="text-white font-black text-sm mt-1">{awards.bestTeam}</div></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── STADIUM ── */}
            {tab==="stadium"&&(
              <div className="space-y-5">
                <h2 className="orb font-black text-white text-xl">🏟️ Stadium System</h2>
                <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{currentStadium.icon}</div>
                    <div>
                      <div className="text-white font-black text-lg">{currentStadium.name}</div>
                      <div className="text-gray-400 text-sm">{currentStadium.desc}</div>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div><span className="text-gray-500">Capacity</span> <span className="text-pink-400 font-black">{currentStadium.capacity.toLocaleString()}</span></div>
                        <div><span className="text-gray-500">Monthly</span> <span className="text-green-400 font-black">+₹{currentStadium.monthly.toLocaleString()}</span></div>
                        <div><span className="text-gray-500">Prestige</span> <span className="text-yellow-400 font-black">+{currentStadium.prestige}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {(game.stadiums||STADIUMS).map(s=>{
                    const isCurrent=s.id===pt.stadiumId;const canAfford=pt.budget>=s.cost;
                    return(
                      <div key={s.id} className={`bg-gray-900 border rounded-2xl p-5 ${isCurrent?"border-pink-500/40 bg-pink-500/5":s.unlocked?"border-green-500/20":"border-gray-800"}`}>
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{s.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-white">{s.name}</span>
                              {isCurrent&&<span className="text-[10px] bg-pink-500/20 text-pink-400 border border-pink-500/30 px-2 py-0.5 rounded font-black">CURRENT</span>}
                              {s.unlocked&&!isCurrent&&<span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded font-black">OWNED</span>}
                            </div>
                            <div className="text-gray-400 text-sm">{s.desc}</div>
                            <div className="flex gap-4 text-xs mt-1"><span className="text-gray-400">👥 {s.capacity.toLocaleString()}</span><span className="text-green-400">+₹{s.monthly.toLocaleString()}/mo</span><span className="text-yellow-400">⭐+{s.prestige}</span></div>
                          </div>
                          <div className="text-right">
                            {s.cost===0?<span className="text-gray-500 text-xs">FREE</span>:s.unlocked?<span className="text-green-400 text-xs font-black">✓ OWNED</span>:(
                              <div>
                                <div className="text-white font-black text-sm">{fmtMoney(s.cost)}</div>
                                <button onClick={()=>buyStadium(s.id)} disabled={!canAfford} className={`mt-2 text-xs px-4 py-2 rounded-xl font-black border ${canAfford?"bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/40":"bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed"}`}>{canAfford?"🏟️ Buy":"💸 Need more"}</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── PARTNERSHIPS ── */}
            {tab==="partnerships"&&(
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="orb font-black text-white text-xl">🤝 Partnerships</h2>
                  <div className="text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">Active: <span className="text-purple-400 font-black">{(game.activePartnerships||[]).length}+{(game.activeSponsors||[]).length}</span>/4 · <span className="text-green-400 font-black">+₹{(totalSponsorIncome+totalPartnerIncome).toLocaleString()}/mo</span></div>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {PARTNERSHIPS.map(p=>{
                    const isActive=(game.activePartnerships||[]).includes(p.id);
                    const meetsWorldRank=!p.minWorldRank||playerWorldRank<=p.minWorldRank;
                    const meetsOvr=!p.minOvr||teamOvr>=p.minOvr;
                    const eligible=meetsWorldRank&&meetsOvr;
                    const totalDeals=(game.activeSponsors||[]).length+(game.activePartnerships||[]).length;
                    return(
                      <div key={p.id} className={`rounded-2xl p-4 border ${isActive?"bg-purple-500/10 border-purple-500/40":eligible?"bg-gray-900 border-gray-700/50":"bg-gray-900/50 border-gray-800 opacity-60"}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl border border-gray-700">{p.logo}</div>
                          <div className="flex-1"><div className="font-black text-white">{p.name}</div><div className="text-gray-400 text-xs">{p.desc}</div></div>
                          {isActive&&<span className="text-[9px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-black">ACTIVE</span>}
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2 mb-3"><div className="text-purple-300 font-black text-xs">✨ BONUS</div><div className="text-white text-sm font-bold">{p.bonus}</div></div>
                        <div className="text-green-400 font-bold text-sm mb-2">+₹{p.monthly.toLocaleString()}/mo</div>
                        {p.minWorldRank&&<div className={`text-[10px] mb-1 ${meetsWorldRank?"text-green-400":"text-red-400"}`}>{meetsWorldRank?"✓":"✗"} World Rank ≤{p.minWorldRank}</div>}
                        {p.minOvr&&<div className={`text-[10px] mb-2 ${meetsOvr?"text-green-400":"text-red-400"}`}>{meetsOvr?"✓":"✗"} OVR ≥{p.minOvr}</div>}
                        {isActive?<button onClick={()=>cancelPartnership(p.id)} className="w-full text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 py-1.5 rounded font-bold">Cancel</button>
                        :eligible&&totalDeals<4?<button onClick={()=>signPartnership(p.id)} className="w-full text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 py-2 rounded-xl font-black">🤝 Partner Up</button>
                        :!eligible?<div className="text-[10px] text-red-400 text-center py-1">Requirements not met</div>
                        :<div className="text-[10px] text-gray-500 text-center py-1">Max 4 deals reached</div>}
                      </div>
                    );
                  })}
                </div>
                <h3 className="font-black text-white mt-2">📢 Sponsors</h3>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {SPONSORS.map(sp=>{
                    const isActive=(game.activeSponsors||[]).includes(sp.id);
                    const totalDeals=(game.activeSponsors||[]).length+(game.activePartnerships||[]).length;
                    return(<div key={sp.id} className={`rounded-xl p-3 border ${isActive?"bg-blue-500/10 border-blue-500/30":"bg-gray-800 border-gray-700"}`}>
                      <div className="flex items-center gap-2 mb-2"><span className="text-xl">{sp.logo}</span><div className="flex-1 min-w-0"><div className="font-black text-white text-xs truncate">{sp.name}</div></div></div>
                      <div className="text-green-400 font-bold text-xs mb-2">+₹{sp.monthly.toLocaleString()}/mo</div>
                      {isActive?<button onClick={()=>cancelSponsor(sp.id)} className="w-full text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 py-1 rounded font-bold">Cancel</button>
                      :totalDeals<4?<button onClick={()=>signSponsor(sp.id)} className="w-full text-[10px] bg-blue-500/15 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 py-1 rounded font-black">🤝 Sign</button>
                      :<div className="text-[10px] text-gray-500 text-center py-0.5">Limit reached</div>}
                    </div>);
                  })}
                </div>
              </div>
            )}

            {/* ── FINANCES ── */}
            {tab==="finances"&&(
              <div className="space-y-5">
                <h2 className="orb font-black text-white text-xl">💰 Finances</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[{label:"Budget",val:fmtMoney(pt.budget),icon:"💰",col:"text-green-400"},{label:"Total Earned",val:fmtMoney(game.finances.totalEarned),icon:"📈",col:"text-blue-400"},{label:"Monthly Income",val:`+₹${(totalSponsorIncome+totalPartnerIncome+500000+totalMerchIncome).toLocaleString()}`,icon:"💸",col:"text-purple-400"}].map(s=>(
                    <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5"><div className="text-3xl mb-2">{s.icon}</div><div className={`text-xl font-black ${s.col}`}>{s.val}</div><div className="text-gray-500 text-sm">{s.label}</div></div>
                  ))}
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                  <h3 className="font-black text-white mb-3">Income Breakdown</h3>
                  <div className="space-y-2">
                    {[{label:"Base Monthly",val:500000,col:"text-gray-300"},{label:`Sponsors (${(game.activeSponsors||[]).length})`,val:totalSponsorIncome,col:"text-blue-400"},{label:`Partnerships (${(game.activePartnerships||[]).length})`,val:totalPartnerIncome,col:"text-purple-400"},{label:`Merchandise (${(game.ownedMerch||[]).length} items)`,val:totalMerchIncome,col:"text-pink-400"},{label:`Stadium (${currentStadium.name})`,val:currentStadium.monthly,col:"text-pink-300"}].map(row=>(
                      <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-800"><span className="text-gray-400">{row.label}</span><span className={`font-bold ${row.col}`}>+₹{row.val.toLocaleString()}</span></div>
                    ))}
                    <div className="flex items-center justify-between py-2"><span className="text-white font-black">Total Monthly</span><span className="text-green-400 font-black text-lg">+₹{(500000+totalSponsorIncome+totalPartnerIncome+totalMerchIncome+currentStadium.monthly).toLocaleString()}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* ── RANKINGS ── */}
            {tab==="rankings"&&(
              <div className="space-y-5">
                <h2 className="orb font-black text-white text-xl">🌍 World Rankings</h2>
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-5 flex items-center gap-4">
                  <div className="text-5xl orb font-black text-cyan-300">#{playerWorldRank}</div>
                  <div><div className="text-white font-black text-lg">{pt.name}</div><div className="text-gray-400 text-sm">{pt.worldRankPts||0} pts</div></div>
                  <div className="ml-auto"><TeamRatingBadge rating={teamRatingVal}/></div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-12 text-xs font-black text-gray-500 px-4 py-3 border-b border-gray-800 bg-gray-950"><span className="col-span-1">#</span><span className="col-span-5">Team</span><span className="col-span-2 text-center">🍗</span><span className="col-span-2 text-center">Pts</span><span className="col-span-2 text-center">OVR</span></div>
                  <div className="max-h-[500px] overflow-auto">
                    {worldRankings.map(({team:t,pts},i)=>{const isP=t.id==="player";const avgOvr=t.players.length?Math.round(t.players.reduce((a,p)=>a+effectiveOvr(p),0)/t.players.length):0;const flag=COUNTRIES[t.country]?.flag||"🌐";const rating=teamRating(t);return(
                      <div key={t.id} className={`grid grid-cols-12 items-center px-4 py-3 border-b border-gray-800/50 text-sm hover:bg-gray-800/30 ${isP?"bg-cyan-500/5":""}`}>
                        <span className={`col-span-1 font-black text-xs ${i===0?"text-yellow-400":i===1?"text-gray-300":i===2?"text-amber-600":isP?"text-cyan-400":"text-gray-600"}`}>#{i+1}</span>
                        <div className="col-span-5 flex items-center gap-2"><span className="text-lg">{t.logo}</span><span>{flag}</span><span className={`font-bold truncate ${isP?"text-cyan-400":"text-white"}`}>{t.name}{isP?" (You)":""}</span></div>
                        <div className="col-span-2 text-center text-yellow-400 font-black">{t.chickenDinners||0}🍗</div>
                        <span className={`col-span-2 text-center font-black ${isP?"text-cyan-400":"text-gray-300"}`}>{pts}</span>
                        <span className="col-span-2 text-center text-orange-400 font-black">{avgOvr}</span>
                      </div>
                    );})}
                  </div>
                </div>
              </div>
            )}

            {/* ── HALL OF FAME ── */}
            {tab==="halloffame"&&(
              <div className="space-y-5">
                <h2 className="orb font-black text-white text-xl">🧠 Hall of Fame</h2>
                {(game.hallOfFame||[]).length===0?(
                  <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-2xl"><div className="text-6xl mb-4 opacity-20">🧠</div><p className="text-gray-500 font-bold">Win tournaments to enter the Hall of Fame!</p></div>
                ):(
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[...(game.hallOfFame||[])].reverse().map((entry,i)=>(
                      <div key={i} className={`rounded-2xl p-5 border ${entry.type==="tournament"?"bg-yellow-500/10 border-yellow-500/30":"bg-purple-500/10 border-purple-500/30"}`}>
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{entry.type==="tournament"?"🏆":"🌟"}</div>
                          <div>
                            <div className="font-black text-white">{entry.name}</div>
                            <div className={`text-xs font-bold ${entry.type==="tournament"?"text-yellow-400":"text-purple-400"}`}>{entry.award}</div>
                            <div className="text-gray-400 text-xs">Season {entry.season} · {entry.stat}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── SOCIAL MEDIA ── */}
            {tab==="media"&&(
              <div className="space-y-5">
                <h2 className="orb font-black text-white text-xl">📱 Social Media & Drama</h2>
                {transferFeed.length>0&&(
                  <div>
                    <h3 className="font-black text-white mb-3">🔄 Transfer Drama</h3>
                    <div className="space-y-3">
                      {transferFeed.slice(0,8).map((post,i)=>(
                        <div key={post.id||i} className="bg-gray-900 border border-orange-500/20 rounded-2xl p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center font-black text-sm text-orange-400">{post.user?.[1]?.toUpperCase()||"U"}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1"><span className="font-black text-white text-sm">{post.user}</span><span className="text-[10px] text-gray-500">S{post.season}</span><span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-black">🔄 TRANSFER</span></div>
                              <p className="text-gray-200 text-sm">{post.text}</p>
                              <div className="text-xs text-gray-500 mt-1">❤️ {(post.likes||0).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <h3 className="font-black text-white">📣 Fan Reactions</h3>
                {(game.socialFeed||[]).filter(p=>!p.isTransfer).length===0?<div className="text-center py-12 text-gray-600 bg-gray-900/50 border border-gray-800 rounded-2xl"><div className="text-5xl mb-3">📱</div><p>Complete tournaments to generate buzz!</p></div>:(
                  <div className="space-y-3">{(game.socialFeed||[]).filter(p=>!p.isTransfer).map((post,i)=>(
                    <div key={post.id||i} className={`bg-gray-900 border rounded-2xl p-4 ${post.type==="hype"?"border-yellow-500/30":post.type==="rivalry"?"border-red-500/20":post.type==="positive"?"border-green-500/20":post.type==="negative"?"border-red-500/20":"border-gray-800"}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${post.type==="hype"?"bg-yellow-500/20 text-yellow-400":post.type==="rivalry"?"bg-red-500/20 text-red-400":"bg-gray-800 text-gray-400"}`}>{post.user?.[1]?.toUpperCase()||"U"}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1"><span className="font-black text-white text-sm">{post.user}</span><span className="text-[10px] text-gray-500">S{post.season}</span></div>
                          <p className="text-gray-300 text-sm">{post.text}</p>
                          <div className="text-xs text-gray-500 mt-1">❤️ {(post.likes||0).toLocaleString()} · 🔁 {Math.floor((post.likes||0)*0.3).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}</div>
                )}
              </div>
            )}

            {/* ── HISTORY ── */}
            {tab==="history"&&(
              <div className="space-y-5">
                <h2 className="orb font-black text-white text-xl">📜 Season History</h2>
                {game.tournamentHistory.length===0?<div className="text-center py-20 text-gray-500"><div className="text-5xl mb-3">📜</div><p>No history yet — compete!</p></div>:(
                  <div className="space-y-3">
                    {[...game.tournamentHistory].reverse().map((h,i)=>{
                      const winner=game.tournamentWinners?.[tKey(h.tournamentId,h.season)];
                      return(
                        <div key={i} className={`bg-gray-900 border rounded-2xl p-5 ${h.playerRank===1?"border-yellow-500/30":h.playerRank<=3?"border-green-500/20":"border-gray-800"}`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2"><TierBadge type={h.type}/><span className="text-xs text-gray-500">{MONTHS[h.month-1]} {h.season}</span></div>
                            <div className="flex items-center gap-2"><span className={`font-black text-sm ${h.playerRank===1?"text-yellow-400":h.playerRank<=3?"text-green-400":"text-gray-500"}`}>#{h.playerRank}</span>{h.prize>0&&<span className="text-green-400 text-xs">{fmtMoney(h.prize)}</span>}</div>
                          </div>
                          <div className="font-black text-white text-base">{h.tournamentName}</div>
                          {h.playerRank===1&&<div className="text-yellow-400 text-sm font-black mt-1">🏆 CHAMPION! 🍗 Chicken Dinner!</div>}
                          {winner&&h.playerRank>1&&<div className="mt-2 text-[10px] text-gray-500">🥇 {winner.winnerFlag} {winner.winner} · 🥈 {winner.runnerUp} · 🥉 {winner.third}</div>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-950/95 border-t border-gray-800 backdrop-blur px-4 py-2.5 flex justify-around text-xs z-30">
        <div className="text-center"><div className="text-gray-500">Budget</div><div className="text-green-400 font-black">{fmtMoney(pt.budget)}</div></div>
        <div className="text-center"><div className="text-gray-500">Rating</div><div className="text-orange-400 font-black">⭐{teamRatingVal}</div></div>
        <div className="text-center"><div className="text-gray-500">🍗</div><div className="text-yellow-400 font-black">{pt.chickenDinners||0}</div></div>
        <div className="text-center"><div className="text-gray-500">World</div><div className="text-cyan-400 font-black">#{playerWorldRank}</div></div>
        <div className="text-center"><div className="text-gray-500">Wins</div><div className="text-yellow-400 font-black">🏆{pt.trophies.length}</div></div>
      </div>
    </div>
  );
}