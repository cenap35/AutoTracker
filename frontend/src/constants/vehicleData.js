const vehicleData = {
  Anadol: ["A1", "STC-16", "A8", "Boj", "Özel Kuş Serisi"],
  Alpine: ["A110", "A310", "A610", "GTA"],
  AstonMartin: [
    "DB11", "DB9", "DB7", "Vantage", "DBS", "Rapide", "Valhalla", "Valkyrie",
    "Vanquish", "Virage", "Lagonda", "Cygnet", "V8 Vantage", "V12 Vantage", "V8",
    "V12 Zagato", "DB5", "DB6", "DB4", "DB Mark III", "DB2", "DB1", "One-77",
    "V8 Zagato", "Vanish", "Volante", "Bulldog", "AMR21", "AMR22", "AMR23",
    "AMR24", "V12 Speedster", "Victor"
  ],
  AlfaRomeo: [
    "145","146","147","155","156","159","164","166","1750","2000","33","4C","75",
    "8C Competizione","90","Brera","Giulia","Giulietta","GTV","GT","Mito","Spider",
    "Stelvio","Tonale","Sprint","Montreal","SZ","RZ","Alfetta","Alfasud","Arna",
    "Junior","Giulia Sprint","Giulia Quadrifoglio","Giulia Super","Crosswagon",
    "33 Stradale","Gran Sport Quattroruote","2600","Sportwagon",
  ],
  Audi: [
    "A1","A2","A3","A3 Sedan","A3 Sportback","A3 Cabriolet","A4","A4 Avant","A4 Allroad",
    "A4 Cabriolet","A5","A5 Sportback","A5 Cabriolet","A5 Coupé","A6","A6 Avant",
    "A6 Allroad","A6 Sedan","A7","A7 Sportback","A8","A8 L","Q2","Q3","Q3 Sportback",
    "Q4 e-tron","Q4 Sportback e-tron","Q5","Q5 Sportback","Q7","Q8","Q8 e-tron",
    "Q8 Sportback e-tron","TT","TT Coupé","TT Roadster","TTS","TT RS","R8","R8 Coupé",
    "R8 Spyder","e-tron","e-tron Sportback","e-tron GT","RS e-tron GT","RS3","RS4",
    "RS4 Avant","RS5","RS5 Coupé","RS5 Sportback","RS6 Avant","RS7 Sportback","RS Q3",
    "RS Q5","RS Q8","S1","S3","S3 Sedan","S3 Sportback","S4","S4 Avant","S4 Cabriolet",
    "S5","S5 Coupé","S5 Cabriolet","S5 Sportback","S6","S6 Avant","S6 Sedan",
    "S7","S7 Sportback","S8","SQ2","SQ5","SQ7","SQ8",
  ],
  Bentley: [
    "Arnage", "Azure", "Bentayga", "Brooklands", "Continental", "Continental Flying Spur",
    "Continental GT", "Continental GTC", "Continental R", "Continental Supersports", "Eight",
    "Flying Spur", "Mulsanne", "S", "Turbo R", "Turbo RT", "Turbo S", "Turbo", "Brooklands Coupe",
    "Mark VI", "Mark V", "Mark IV", "Mark III", "T1", "T2", "S1", "S2", "S3",
    "Bentley 3 Litre", "Bentley 4½ Litre", "Bentley Speed 6", "Bentley 8 Litre",
    "Bentley Mark VI", "Bentley R Type", "Bentley S1", "Bentley S2", "Bentley S3",
    "Bentley T-series", "Bentley Corniche", "Bentley Camargue", "Bentley Turbo R",
    "Bentley Turbo RT", "Bentley Turbo S", "Bentley Turbo", "Bentley Brooklands",
    "Bentley State Limousine", "Bentley EXP 10 Speed 6", "Bentley EXP 12 Speed 6e",
    "Bentley EXP 100 GT", "Bentley Grand Convertible", "Bentley Hunaudières"
  ],
  Chery: [
    "Tiggo 2","Tiggo 3","Tiggo 3x","Tiggo 4","Tiggo 4 Pro","Tiggo 5","Tiggo 5x",
    "Tiggo 7","Tiggo 7 Pro","Tiggo 7 Pro Max","Tiggo 8","Tiggo 8 Pro","Tiggo 8 Pro Max",
    "Arrizo 3","Arrizo 5","Arrizo 5 Plus","Arrizo 6","Arrizo 6 Pro","Arrizo 7","Arrizo GX",
    "Arrizo EX","QQ","QQ Ice Cream","QQ Sweet","QQ3","QQ6","E3","E5","A3","A5",
    "A13","A15","Bonus","Cowin 1","Cowin 2","Cowin 3","Cowin 5","Fengyun","Fengyun 2",
    "Fengyun 3","Fengyun E","Omoda 5","Omoda C5","Omoda E5","E5 EV","E3 EV"
  ],
  Chevrolet: [
    "Aveo", "Aveo5", "Cruze", "Lacetti", "Epica", "Captiva", "Spark", "Matiz", "Camaro",
    "Corvette", "Malibu", "Orlando", "Sonic", "Malibu XL", "Cobalt", "Equinox", "Traverse",
    "Tahoe", "Suburban", "Silverado", "S10", "Trailblazer", "Colorado", "Trax", "Volt", "Bolt",
    "Blazer", "Onix", "Aveo U-VA", "Sail", "Spin", "Lanos", "Niva", "Evanda", "Rezzo", "Astra",
    "Zafira", "Prizm", "Monte Carlo", "Impala", "Caprice", "Cavalier", "HHR", "SSR", "Uplander",
    "Astro", "Venture", "Lumina", "Express", "Nova", "Viva", "Corsa", "Meriva", "Vectra", "Omega",
    "Avalanche", "Tracker", "Blazer S-10", "Spark EV", "Aveo Sedan", "Aveo Hatchback", "Citation",
    "Celebrity", "Malibu Classic", "Monte Carlo SS", "Corsica", "Beretta", "Monza", "Optra",
    "Biscayne", "El Camino", "Chevelle", "Corvair", "Impala SS", "Kalos", "Matiz Creative",
    "City Express", "Menlo", "Celta", "LUV", "Bel Air", "Chevy II", "Kingswood", "Caprice Classic",
    "Monte Carlo LS", "Caprice PPV", "Suburban HD", "Traverse RS"
  ],
  Chrysler: ["300", "Pacifica", "Voyager"],
  Cupra: ["Formentor", "Leon", "Born", "Ateca"],
  Dacia: ["Duster", "Sandero", "Jogger", "Lodgy", "Dokker"],
 
  Dodge: ["Charger", "Challenger", "Durango", "RAM", "Journey"],
  DS: ["DS 3", "DS 4", "DS 7", "DS 9"],
  Abarth: ["595", "695", "124 Spider"],
  Acura: ["MDX", "RDX", "TLX", "Integra"],

 
  
  BMW: [
    "1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7",
    "i3", "i4", "i8", "iX", "iX3"
  ],
  Buick: ["Enclave", "Encore", "Envision", "Regal"],
  BYD: ["ATTO 3", "Han", "Tang", "Dolphin", "Seal"],
  Cadillac: ["Escalade", "CT4", "CT5", "XT4", "XT5", "XT6"],
  Citroen: [
    "C3","C4","C5 Aircross","C3 Aircross","Berlingo","Jumpy","Jumper"
  ],
  Daihatsu: ["Cuore", "Sirion", "Terios", "Charade", "Applause"],
  "DS Automobiles": ["DS 3 Crossback", "DS 7 Crossback", "DS 9"],

  Ferrari: [
    "488","F8","Roma","Portofino","SF90","812 Superfast","296 GTB",
  ],
  Fiat: ["Egea", "500", "Panda", "Punto", "Doblo", "Fiorino", "Linea", "Tipo"],
  Ford: [
    "Fiesta", "Focus", "Mondeo", "Kuga", "Transit", "Tourneo", "Puma", "Mustang", "Ranger", "Explorer"
  ],

  Honda: [
    "Civic",
    "City",
    "Jazz",
    "CR-V",
    "HR-V",
    "Accord"
  ],
  
  Hyundai: [
    "i10",
    "i20",
    "i30",
    "Accent",
    "Accent Blue",
    "Era",
    "Elantra",
    "Bayon",
    "Kona",
    "Tucson",
    "Santa Fe"
  ],
  
  Kia: [
    "Picanto",
    "Rio",
    "Cerato",
    "Ceed",
    "Stonic",
    "Niro",
    "Sportage",
    "Sorento"
  ],
  
  Mazda: [
    "Mazda2",
    "Mazda3",
    "Mazda6",
    "CX-3",
    "CX-5",
    "CX-30"
  ],
  
  MercedesBenz: [
    "A180",
    "A200",
    "B180",
    "C180",
    "C200",
    "E200",
    "E220",
    "S350",
    "CLA",
    "CLS",
    "GLA",
    "GLB",
    "GLC",
    "GLE",
    "GLS",
    "Vito",
    "Sprinter"
  ],
  
  MG: [
    "ZS",
    "HS",
    "Marvel R",
    "MG4"
  ],
  
  Mini: [
    "One",
    "Cooper",
    "Cooper S",
    "Countryman",
    "Clubman"
  ],
  
  Mitsubishi: [
    "Lancer",
    "Colt",
    "ASX",
    "Outlander",
    "Pajero",
    "L200"
  ],
  
  Nissan: [
    "Micra",
    "Note",
    "Juke",
    "Qashqai",
    "X-Trail",
    "Navara"
  ],
  
  Opel: [
    "Corsa",
    "Astra",
    "Insignia",
    "Crossland",
    "Grandland",
    "Mokka",
    "Combo"
  ],
  
  Peugeot: [
    "106",
    "107",
    "206",
    "207",
    "208",
    "301",
    "306",
    "307",
    "308",
    "407",
    "408",
    "508",
    "2008",
    "3008",
    "5008",
    "Partner",
    "Rifter"
  ],
  
  Renault: [
    "Clio",
    "Megane",
    "Fluence",
    "Symbol",
    "Taliant",
    "Laguna",
    "Captur",
    "Kadjar",
    "Austral",
    "Koleos",
    "Kangoo"
  ],
  
  Seat: [
    "Ibiza",
    "Leon",
    "Toledo",
    "Cordoba",
    "Arona",
    "Ateca"
  ],
  
  Skoda: [
    "Fabia",
    "Scala",
    "Octavia",
    "Superb",
    "Kamiq",
    "Karoq",
    "Kodiaq"
  ],
  
  Suzuki: [
    "Swift",
    "Baleno",
    "Vitara",
    "S-Cross",
    "Jimny"
  ],
  
  Tesla: [
    "Model 3",
    "Model Y",
    "Model S",
    "Model X"
  ],
  
  TOGG: [
    "T10X"
  ],
  
  Toyota: [
    "Yaris",
    "Corolla",
    "Corolla Cross",
    "Auris",
    "Avensis",
    "C-HR",
    "RAV4",
    "Hilux"
  ],
  
  Volkswagen: [
    "Polo",
    "Golf",
    "Jetta",
    "Passat",
    "Arteon",
    "T-Cross",
    "Taigo",
    "T-Roc",
    "Tiguan",
    "Touareg",
    "Caddy",
    "Transporter"
  ],
  
  Volvo: [
    "S40",
    "S60",
    "S90",
    "V40",
    "V60",
    "XC40",
    "XC60",
    "XC90"
  ]
};

export default vehicleData;
