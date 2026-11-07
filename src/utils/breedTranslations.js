
const breedTranslations = {
    // Yksittäiset rodut
    'affenpinscher': 'affenpinseri',
    'african': 'afrikkalainen koira',
    'airedale': 'airedalenterrieri',
    'akita': 'akita',
    'appenzeller': 'appenzellinpaimenkoira',
    'basenji': 'basenji',
    'beagle': 'beagle',
    'bluetick': 'bluetick coonhound',
    'borzoi': 'venäjänvinttikoira',
    'bouvier': 'bouvier',
    'boxer': 'bokseri',
    'briard': 'briardi',
    'chihuahua': 'chihuahua',
    'chow': 'chow chow',
    'coonhound': 'coonhound',
    'dachshund': 'mäyräkoira',
    'dalmatian': 'dalmatialainen',
    'doberman': 'dobermanni',
    'entlebucher': 'entlebuchinpaimenkoira',
    'eskimo': 'amerikaneskimokoira',
    'husky': 'siperianhusky',
    'labrador': 'labradorinnoutaja',
    'malamute': 'alaskanmalamuutti',
    'maltese': 'maltankoira',
    'newfoundland': 'newfoundlandinkoira',
    'otterhound': 'saukkokoira',
    'papillon': 'perhoskoira',
    'pekinese': 'kiinanpalatsikoira',
    'pembroke': 'welsh corgi pembroke',
    'pitbull': 'pitbull',
    'pomeranian': 'pomeranian',
    'pug': 'mopsi',
    'pyrenees': 'pyreneittenkoira',
    'rottweiler': 'rottweiler',
    'samoyed': 'samojedinkoira',
    'shiba': 'shiba',
    'shihtzu': 'shih tzu',
    'vizsla': 'unkarinvizsla',
    'weimaraner': 'weimarinseisoja',
    'whippet': 'whippet',

    // Australianpaimenkoirat ja muut paimenkoirat
    'australian kelpie': 'australiankelpie',
    'australian shepherd': 'australianpaimenkoira',
    'border collie': 'bordercollie',
    'german shepherd': 'saksanpaimenkoira',
    'english sheepdog': 'vanhaenglanninlammaskoira',
    'shetland sheepdog': 'shetlanninlammaskoira',
    'irish wolfhound': 'irlanninsusikoira',

    // Bulldogit ja terrierit
    'boston bulldog': 'bostoninterrieri',
    'english bulldog': 'englanninbulldoggi',
    'french bulldog': 'ranskanbulldoggi',
    'staffordshire bullterrier': 'staffordshirenbullterrieri',
    'american terrier': 'amerikankarvatonterrieri',
    'australian terrier': 'australianterrieri',
    'border terrier': 'borderterrieri',
    'cairn terrier': 'cairnterrieri',
    'fox terrier': 'foxterrieri',
    'irish terrier': 'irlanninterrieri',
    'scottish terrier': 'skotlanninterrieri',
    'yorkshire terrier': 'yorkshirenterrieri',
    'westhighland terrier': 'valkoinen länsiylämaanterrieri',
    'tibetan terrier': 'tiibetinterrieri',

    // Noutajat
    'chesapeake retriever': 'chesapeakelahdennoutaja',
    'curly retriever': 'kiharakarvainen noutaja',
    'flatcoated retriever': 'flattinoutaja',
    'golden retriever': 'kultainennoutaja',

    // Ajokoirat
    'afghan hound': 'afgaaninvinttikoira',
    'basset hound': 'basset hound',
    'blood hound': 'verikoira',
    'english hound': 'englanninkoiratyyppinen ajokoira',
    'ibizan hound': 'ibizanpodenco',
    'rhodesian ridgeback': 'rhodesiankoira',

    // Villakoirat
    'medium poodle': 'keskikokoinen villakoira',
    'miniature poodle': 'kääpiövillakoira',
    'standard poodle': 'isovillakoira',
    'toy poodle': 'toy-villakoira',

    // Muut alarodut
    'bernese mountain': 'berninpaimenkoira',
    'swiss mountain': 'suursveitsinpaimenkoira',
    'scottish deerhound': 'skotlanninhirvikoira',
    'norwegian elkhound': 'harmaa norjanhirvikoira',
    'great dane': 'tanskandoggi',
    'indian greyhound': 'intianvinttikoira',
    'italian greyhound': 'italianvinttikoira',
    'irish setter': 'irlanninsetteri',
    'english setter': 'englanninsetteri',
    'gordon setter': 'gordoninsetteri',
    'english springer': 'englanninspringerspanieli',
    'cocker spaniel': 'cockerspanieli',
    'welsh springer': 'welshinspringerspanieli'
};

// Palautetaan suomenkielinen nimi, jos käännös löytyy
export function getFinnishBreedName(englishName) {
    const normalizedName = englishName.toLowerCase().trim();

    const translatedName = breedTranslations[normalizedName] || englishName;

    return translatedName.charAt(0).toUpperCase() + translatedName.slice(1);
}
// Tarkistetaan, löytyykö hakusana englannin- tai suomenkielisestä nimestä
export function matchesBreedSearch(englishName, search) {
    const english = englishName.toLowerCase();
    const finnish = getFinnishBreedName(englishName).toLowerCase();
    const searchTerm = search.toLowerCase().trim();

    return english.includes(searchTerm) || finnish.includes(searchTerm);
}
