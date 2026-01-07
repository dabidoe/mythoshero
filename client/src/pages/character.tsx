import React from 'react';
import CharacterSheet from '@/components/CharacterSheet';

const GARRUKH_DATA = {
  "guid": "26257c7a-f526-4f08-bd97-41929813361d",
  "characterName": "Garrukh the Savage",
  "characterClass": "Barbarian",
  "race": "Lizardfolk",
  "level": 10,
  "hp": 100,
  "ac": 15,
  "profilePicture": "garrukh_the_savage_lizardfolk_barbarian_portrait.png",
  "container": {
    "stats": [
      { "key": "Str", "value": "{key:'Str',value:'20 (+5)'}" },
      { "key": "Dex", "value": "{key:'Dex',value:'14 (+2)'}" },
      { "key": "Con", "value": "{key:'Con',value:'18 (+4)'}" },
      { "key": "Int", "value": "{key:'Int',value:'10 (0)'}" },
      { "key": "Wis", "value": "{key:'Wis',value:'12 (+1)'}" },
      { "key": "Cha", "value": "{key:'Cha',value:'8 (-1)'}" }
    ],
    "skills": [
      { "key": "Intimidation", "value": "{key:'Intimidation',value:'+3'}" },
      { "key": "Survival", "value": "{key:'Survival',value:'+4'}" },
      { "key": "Athletics", "value": "{key:'Athletics',value:'+9'}" },
      { "key": "Perception", "value": "{key:'Perception',value:'+4'}" },
      { "key": "Nature", "value": "{key:'Nature',value:'+2'}" }
    ],
    "saving_throws": [
      { "key": "Armor Class", "value": "{key:'Armor Class',value:15}" },
      { "key": "Initiative", "value": "{key:'Initiative',value:'+2'}" },
      { "key": "Speed", "value": "{key:'Speed',value:'30ft'}" },
      { "key": "Current HP", "value": "{key:'Current HP',value:135}" },
      { "key": "Proficiency", "value": "{key:'Proficiency',value:'+4'}" }
    ],
    "traits": [
      { "key": "Hungry Jaws", "value": "{key:'Hungry Jaws',value:'In battle, you can throw yourself into a vicious feeding frenzy.'}" },
      { "key": "Hold Breath", "value": "{\"key\":\"Hold Breath\",\"value\":\"You can hold your breath underwater for up to 15 minutes at a time.\"}" },
      { "key": "Natural Armor", "value": "{key:'Natural Armor',value:'You have tough, scaly skin. When you aren’t wearing armor, your AC is 13 + your Dexterity modifier.'}" }
    ],
    "abilities": [
      { "key": "Rage", "value": "{key:'Rage',value:'3 times per day, enter a berserk state for 1 minute, gaining advantage on Strength checks.'}" },
      { "key": "Unarmored Defense", "value": "{key:'Unarmored Defense',value:'When not wearing armor, AC equals 10 + Dex modifier + Con modifier.'}" },
      { "key": "Reckless Attack", "value": "{key:'Reckless Attack',value:'Gain advantage on melee weapon attacks using Strength during your turn.'}" }
    ]
  }
};

const CharacterPage = () => {
  return <CharacterSheet data={GARRUKH_DATA} />;
};

export default CharacterPage;