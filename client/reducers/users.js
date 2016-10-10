"use strict";


"use strict";

import { createStore } from "redux";

const USERS = [
  {
    "email": "hogandickerson@sfeir.com",
    "lastname": "Powers",
    "firstname": "Black",
    "gender": "male",
    "photo": "https://randomuser.me/portraits/men/86.jpg",
    "id": 9927,
    "twitter": "labore",
    "slack": "reprehenderit",
    "github": "aliquip",
    "linkedin": "qui",
    "url": "ex",
    "contactInfoPro": {
      "mail": "blackpowers@sfeir.com",
      "fixedPhone": "+33182449424",
      "mobilePhone": "+33684850125",
      "street": "220 Ide Court",
      "postalCode": "20636",
      "city": "Winchester"
    },
    "functionName": "Mcpherson",
    "functionDescription": "Wendi",
    "entity": "Sfeir-Paris",
    "currentClient": "Adeo",
    "workcity": "Luxembourg",
    "workAdress": "rue...",
    "manager": "Didier",
    "department": "Compta",
    "skills": [
      "Java",
      "AngularJS",
      "React",
      "git",
      "ES6",
      "JavaScript"
    ],
    "entryDate": "21/10/2014",
    "birthDate": "11/12/2001",
    "socialNumber": "4785882151",
    "contactInfoPerso": {
      "mail": "wendipowers@sfeir.com",
      "fixedPhone": "+33197859629",
      "mobilePhone": "+33682956737",
      "street": "789 Nolans Lane",
      "postalCode": "36734",
      "city": "Loretto"
    },
    "emergencyContact": "",
    "emergencyPhoneNumber": "",
    "driverLicence": "",
    "tshirtSize": "XL",
    "numberOfChild": 4,
    "geo": {
      "lat": 48.849014738923636,
      "lng": 2.3431512050201304
    }
  },
  {
    "email": "luannpowers@sfeir.com",
    "lastname": "Shaffer",
    "firstname": "Vargas",
    "gender": "male",
    "photo": "https://randomuser.me/portraits/men/57.jpg",
    "id": 4013,
    "twitter": "irure",
    "slack": "pariatur",
    "github": "aute",
    "linkedin": "enim",
    "url": "do",
    "contactInfoPro": {
      "mail": "vargasshaffer@sfeir.com",
      "fixedPhone": "+33197542822",
      "mobilePhone": "+33688258827",
      "street": "108 Covert Street",
      "postalCode": "66205",
      "city": "Saranap"
    },
    "functionName": "Greta",
    "functionDescription": "Teresa",
    "entity": "Sfeir-Luxembourg",
    "currentClient": "Adeo",
    "workcity": "Paris",
    "workAdress": "Place...",
    "manager": "Bruno",
    "department": "Recrutement",
    "skills": [
      "ad",
      "dolore",
      "ullamco",
      "sunt",
      "exercitation",
      "Lorem",
      "sint"
    ],
    "entryDate": "27/03/2005",
    "birthDate": "17/10/2008",
    "socialNumber": "16499299613",
    "contactInfoPerso": {
      "mail": "teresashaffer@sfeir.com",
      "fixedPhone": "+33180943636",
      "mobilePhone": "+33684757129",
      "street": "949 Montgomery Street",
      "postalCode": "51008",
      "city": "Tampico"
    },
    "emergencyContact": "",
    "emergencyPhoneNumber": "",
    "driverLicence": "",
    "tshirtSize": "XL",
    "numberOfChild": 2,
    "geo": {
      "lat": 48.849332568574255,
      "lng": 2.367236381364804
    }
  }
];

const INITIAL_STATE = [];

function usersUpdate (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_USERS':
      return action.users;
    default:
      return state;
  }
}

export default usersUpdate;
