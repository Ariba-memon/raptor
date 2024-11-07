const mockData = [
    {
      area: "Tallinn",
      number: "T13534",
      imei: "865423542524212",
      scooterModel: "EZlines",
      currentZone: "Bonus",
      status: "Available",
      locked: "Locked",
      battery: 95, // Green (85-100%)
    },
    {
      area: "Helsinki",
      number: "H24567",
      imei: "765423542524213",
      scooterModel: "CityScoot",
      currentZone: "Paid Parking",
      status: "In Use",
      locked: "Unlocked",
      battery: 75, // Yellow (35-84%)
    },
    {
      area: "Riga",
      number: "R35423",
      imei: "565423542524214",
      scooterModel: "QuickRide",
      currentZone: "No Parking",
      status: "Charging",
      locked: "Locked",
      battery: 20, // Red (Below 35%)
    },
    {
      area: "Vilnius",
      number: "V45678",
      imei: "965423542524215",
      scooterModel: "Swift",
      currentZone: "Neutral",
      status: "Available",
      locked: "Unlocked",
      battery: 50, // Yellow (35-84%)
    },
  ];
  
  export default mockData;
  