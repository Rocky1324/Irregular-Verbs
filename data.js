// Irregular verbs data organized by categories
const verbsData = {
    // Verbs that do not change (Base = Simple Past = Past Participle)
    noChange: [
        { base: 'bet', past: 'bet', pastParticiple: 'bet' },
        { base: 'bid', past: 'bid', pastParticiple: 'bid' },
        { base: 'broadcast', past: 'broadcast', pastParticiple: 'broadcast' },
        { base: 'burst', past: 'burst', pastParticiple: 'burst' },
        { base: 'cost', past: 'cost', pastParticiple: 'cost' },
        { base: 'cut', past: 'cut', pastParticiple: 'cut' },
        { base: 'hit', past: 'hit', pastParticiple: 'hit' },
        { base: 'hurt', past: 'hurt', pastParticiple: 'hurt' },
        { base: 'let', past: 'let', pastParticiple: 'let' },
        { base: 'put', past: 'put', pastParticiple: 'put' },
        { base: 'quit', past: 'quit', pastParticiple: 'quit' },
        { base: 'set', past: 'set', pastParticiple: 'set' },
        { base: 'shut', past: 'shut', pastParticiple: 'shut' },
        { base: 'split', past: 'split', pastParticiple: 'split' },
        { base: 'spread', past: 'spread', pastParticiple: 'spread' }
    ],

    // Verbs with vowel changes
    vowelChange: [
        { base: 'arise', past: 'arose', pastParticiple: 'arisen' },
        { base: 'awake', past: 'awoke', pastParticiple: 'awoken' },
        { base: 'be', past: 'was/were', pastParticiple: 'been' },
        { base: 'begin', past: 'began', pastParticiple: 'begun' },
        { base: 'blow', past: 'blew', pastParticiple: 'blown' },
        { base: 'break', past: 'broke', pastParticiple: 'broken' },
        { base: 'choose', past: 'chose', pastParticiple: 'chosen' },
        { base: 'do', past: 'did', pastParticiple: 'done' },
        { base: 'draw', past: 'drew', pastParticiple: 'drawn' },
        { base: 'drink', past: 'drank', pastParticiple: 'drunk' },
        { base: 'drive', past: 'drove', pastParticiple: 'driven' },
        { base: 'eat', past: 'ate', pastParticiple: 'eaten' },
        { base: 'fall', past: 'fell', pastParticiple: 'fallen' },
        { base: 'fly', past: 'flew', pastParticiple: 'flown' },
        { base: 'forget', past: 'forgot', pastParticiple: 'forgotten' },
        { base: 'freeze', past: 'froze', pastParticiple: 'frozen' },
        { base: 'give', past: 'gave', pastParticiple: 'given' },
        { base: 'grow', past: 'grew', pastParticiple: 'grown' },
        { base: 'know', past: 'knew', pastParticiple: 'known' },
        { base: 'ride', past: 'rode', pastParticiple: 'ridden' },
        { base: 'ring', past: 'rang', pastParticiple: 'rung' },
        { base: 'rise', past: 'rose', pastParticiple: 'risen' },
        { base: 'see', past: 'saw', pastParticiple: 'seen' },
        { base: 'shake', past: 'shook', pastParticiple: 'shaken' },
        { base: 'sing', past: 'sang', pastParticiple: 'sung' },
        { base: 'speak', past: 'spoke', pastParticiple: 'spoken' },
        { base: 'steal', past: 'stole', pastParticiple: 'stolen' },
        { base: 'swear', past: 'swore', pastParticiple: 'sworn' },
        { base: 'swim', past: 'swam', pastParticiple: 'swum' },
        { base: 'take', past: 'took', pastParticiple: 'taken' },
        { base: 'tear', past: 'tore', pastParticiple: 'torn' },
        { base: 'throw', past: 'threw', pastParticiple: 'thrown' },
        { base: 'wake', past: 'woke', pastParticiple: 'woken' },
        { base: 'wear', past: 'wore', pastParticiple: 'worn' },
        { base: 'weave', past: 'wove', pastParticiple: 'woven' },
        { base: 'write', past: 'wrote', pastParticiple: 'written' }
    ],

    // Verbs with identical Simple Past and Past Participle
    samePastParticiple: [
        { base: 'bend', past: 'bent', pastParticiple: 'bent' },
        { base: 'build', past: 'built', pastParticiple: 'built' },
        { base: 'burn', past: 'burnt', pastParticiple: 'burnt' },
        { base: 'deal', past: 'dealt', pastParticiple: 'dealt' },
        { base: 'dig', past: 'dug', pastParticiple: 'dug' },
        { base: 'feed', past: 'fed', pastParticiple: 'fed' },
        { base: 'feel', past: 'felt', pastParticiple: 'felt' },
        { base: 'fight', past: 'fought', pastParticiple: 'fought' },
        { base: 'find', past: 'found', pastParticiple: 'found' },
        { base: 'get', past: 'got', pastParticiple: 'got' },
        { base: 'hang', past: 'hung', pastParticiple: 'hung' },
        { base: 'have', past: 'had', pastParticiple: 'had' },
        { base: 'hear', past: 'heard', pastParticiple: 'heard' },
        { base: 'hold', past: 'held', pastParticiple: 'held' },
        { base: 'keep', past: 'kept', pastParticiple: 'kept' },
        { base: 'lay', past: 'laid', pastParticiple: 'laid' },
        { base: 'lead', past: 'led', pastParticiple: 'led' },
        { base: 'leave', past: 'left', pastParticiple: 'left' },
        { base: 'lend', past: 'lent', pastParticiple: 'lent' },
        { base: 'light', past: 'lit', pastParticiple: 'lit' },
        { base: 'lose', past: 'lost', pastParticiple: 'lost' },
        { base: 'make', past: 'made', pastParticiple: 'made' },
        { base: 'mean', past: 'meant', pastParticiple: 'meant' },
        { base: 'meet', past: 'met', pastParticiple: 'met' },
        { base: 'pay', past: 'paid', pastParticiple: 'paid' },
        { base: 'say', past: 'said', pastParticiple: 'said' },
        { base: 'sell', past: 'sold', pastParticiple: 'sold' },
        { base: 'send', past: 'sent', pastParticiple: 'sent' },
        { base: 'shine', past: 'shone', pastParticiple: 'shone' },
        { base: 'shoot', past: 'shot', pastParticiple: 'shot' },
        { base: 'sit', past: 'sat', pastParticiple: 'sat' },
        { base: 'sleep', past: 'slept', pastParticiple: 'slept' },
        { base: 'slide', past: 'slid', pastParticiple: 'slid' },
        { base: 'sow', past: 'sowed', pastParticiple: 'sown/sowed' },
        { base: 'spend', past: 'spent', pastParticiple: 'spent' },
        { base: 'spin', past: 'spun', pastParticiple: 'spun' },
        { base: 'spit', past: 'spat', pastParticiple: 'spat' },
        { base: 'stand', past: 'stood', pastParticiple: 'stood' },
        { base: 'stick', past: 'stuck', pastParticiple: 'stuck' },
        { base: 'sting', past: 'stung', pastParticiple: 'stung' },
        { base: 'strike', past: 'struck', pastParticiple: 'struck' },
        { base: 'sweep', past: 'swept', pastParticiple: 'swept' },
        { base: 'swing', past: 'swung', pastParticiple: 'swung' },
        { base: 'teach', past: 'taught', pastParticiple: 'taught' },
        { base: 'tell', past: 'told', pastParticiple: 'told' },
        { base: 'think', past: 'thought', pastParticiple: 'thought' },
        { base: 'understand', past: 'understood', pastParticiple: 'understood' },
        { base: 'win', past: 'won', pastParticiple: 'won' }
    ],

    // Verbs with only Past Participle change
    onlyPPChange: [
        { base: 'beat', past: 'beat', pastParticiple: 'beaten' }
    ],

    // Verbs with Past Participle ending in 'en'
    enEnding: [
        { base: 'arise', past: 'arose', pastParticiple: 'arisen' },
        { base: 'beat', past: 'beat', pastParticiple: 'beaten' },
        { base: 'be', past: 'was/were', pastParticiple: 'been' },
        { base: 'bite', past: 'bit', pastParticiple: 'bitten' },
        { base: 'break', past: 'broke', pastParticiple: 'broken' },
        { base: 'choose', past: 'chose', pastParticiple: 'chosen' },
        { base: 'do', past: 'did', pastParticiple: 'done' },
        { base: 'draw', past: 'drew', pastParticiple: 'drawn' },
        { base: 'drive', past: 'drove', pastParticiple: 'driven' },
        { base: 'eat', past: 'ate', pastParticiple: 'eaten' },
        { base: 'fall', past: 'fell', pastParticiple: 'fallen' },
        { base: 'fly', past: 'flew', pastParticiple: 'flown' },
        { base: 'forbid', past: 'forbade', pastParticiple: 'forbidden' },
        { base: 'forget', past: 'forgot', pastParticiple: 'forgotten' },
        { base: 'forgive', past: 'forgave', pastParticiple: 'forgiven' },
        { base: 'freeze', past: 'froze', pastParticiple: 'frozen' },
        { base: 'give', past: 'gave', pastParticiple: 'given' },
        { base: 'go', past: 'went', pastParticiple: 'gone' },
        { base: 'grow', past: 'grew', pastParticiple: 'grown' },
        { base: 'hide', past: 'hid', pastParticiple: 'hidden' },
        { base: 'know', past: 'knew', pastParticiple: 'known' },
        { base: 'lie', past: 'lay', pastParticiple: 'lain' },
        { base: 'mistake', past: 'mistook', pastParticiple: 'mistaken' },
        { base: 'overcome', past: 'overcame', pastParticiple: 'overcome' },
        { base: 'overtake', past: 'overtook', pastParticiple: 'overtaken' },
        { base: 'prove', past: 'proved', pastParticiple: 'proven' },
        { base: 'ride', past: 'rode', pastParticiple: 'ridden' },
        { base: 'rise', past: 'rose', pastParticiple: 'risen' },
        { base: 'see', past: 'saw', pastParticiple: 'seen' },
        { base: 'sew', past: 'sewed', pastParticiple: 'sewn' },
        { base: 'shake', past: 'shook', pastParticiple: 'shaken' },
        { base: 'show', past: 'showed', pastParticiple: 'shown' },
        { base: 'sow', past: 'sowed', pastParticiple: 'sown' },
        { base: 'speak', past: 'spoke', pastParticiple: 'spoken' },
        { base: 'steal', past: 'stole', pastParticiple: 'stolen' },
        { base: 'strike', past: 'struck', pastParticiple: 'stricken' },
        { base: 'swear', past: 'swore', pastParticiple: 'sworn' },
        { base: 'swell', past: 'swelled', pastParticiple: 'swollen' },
        { base: 'take', past: 'took', pastParticiple: 'taken' },
        { base: 'tear', past: 'tore', pastParticiple: 'torn' },
        { base: 'throw', past: 'threw', pastParticiple: 'thrown' },
        { base: 'wake', past: 'woke', pastParticiple: 'woken' },
        { base: 'wear', past: 'wore', pastParticiple: 'worn' },
        { base: 'weave', past: 'wove', pastParticiple: 'woven' },
        { base: 'withdraw', past: 'withdrew', pastParticiple: 'withdrawn' },
        { base: 'write', past: 'wrote', pastParticiple: 'written' }
    ],

    // Verbs with Simple Past or Past Participle ending in 'ght'
    ghtEnding: [
        { base: 'bring', past: 'brought', pastParticiple: 'brought' },
        { base: 'buy', past: 'bought', pastParticiple: 'bought' },
        { base: 'catch', past: 'caught', pastParticiple: 'caught' },
        { base: 'fight', past: 'fought', pastParticiple: 'fought' },
        { base: 'seek', past: 'sought', pastParticiple: 'sought' },
        { base: 'teach', past: 'taught', pastParticiple: 'taught' },
        { base: 'think', past: 'thought', pastParticiple: 'thought' }
    ]
};

// Add category to each verb
Object.entries(verbsData).forEach(([category, verbs]) => {
    verbs.forEach(verb => {
        verb.category = category;
        // Create a search string for each verb for easier searching
        verb.searchString = `${verb.base} ${verb.past} ${verb.pastParticiple}`.toLowerCase();
    });
});

// Create a flattened array of all verbs for searching
export const allVerbs = Object.values(verbsData).flat();

// Map kebab-case to camelCase
const categoryMap = {
    'no-change': 'noChange',
    'vowel-change': 'vowelChange',
    'same-past-participle': 'samePastParticiple',
    'only-pp-change': 'onlyPPChange',
    'en-ending': 'enEnding',
    'ght-ending': 'ghtEnding'
};

export function getVerbsByCategory(category) {
    const mappedCategory = categoryMap[category] || category;
    if (mappedCategory === 'all') return allVerbs;
    return allVerbs.filter(verb => verb.category === mappedCategory);
};

export function searchVerbs(query) {
    if (!query || !query.trim()) return allVerbs;
    const searchTerm = query.toLowerCase().trim();
    return allVerbs.filter(verb => 
        verb.searchString.includes(searchTerm)
    );
};

export function getRandomVerb() {
    return allVerbs[Math.floor(Math.random() * allVerbs.length)];
};

export function getRandomOptions(correctVerb, field, count = 4) {
    const options = [correctVerb[field]];
    const allOptions = allVerbs.map(v => v[field]);
    
    while (options.length < Math.min(count, allOptions.length)) {
        const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    
    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
};

// Data moved from app.js
export const verbDetailsData = {
    'be': {
        explanation: 'Le verbe "be" (être) est l\'un des verbes les plus irréguliers en anglais. Il change complètement entre les formes.',
        examples: [
            'I am happy. (Je suis heureux.)',
            'She was at home yesterday. (Elle était à la maison hier.)',
            'They have been friends for years. (Ils sont amis depuis des années.)'
        ]
    },
    'go': {
        explanation: 'Le verbe "go" (aller) a une forme passée unique "went" qui ne ressemble pas à la forme de base.',
        examples: [
            'I go to school every day. (Je vais à l\'école tous les jours.)',
            'She went to Paris last summer. (Elle est allée à Paris l\'été dernier.)',
            'They have gone to the store. (Ils sont allés au magasin.)'
        ]
    },
    'do': {
        explanation: 'Le verbe "do" (faire) est très utilisé et a des formes irrégulières.',
        examples: [
            'I do my homework. (Je fais mes devoirs.)',
            'He did his best. (Il a fait de son mieux.)',
            'We have done the work. (Nous avons fait le travail.)'
        ]
    },
    'have': {
        explanation: 'Le verbe "have" (avoir) est utilisé pour exprimer la possession et dans les temps composés.',
        examples: [
            'I have a car. (J\'ai une voiture.)',
            'She had breakfast. (Elle a pris le petit-déjeuner.)',
            'They have had enough. (Ils en ont assez eu.)'
        ]
    },
    'get': {
        explanation: 'Le verbe "get" (obtenir, recevoir) est très polyvalent en anglais.',
        examples: [
            'I get up early. (Je me lève tôt.)',
            'She got a new job. (Elle a obtenu un nouveau travail.)',
            'We have gotten better. (Nous nous sommes améliorés.)'
        ]
    },
    'make': {
        explanation: 'Le verbe "make" (faire, fabriquer) est utilisé pour créer ou produire quelque chose.',
        examples: [
            'I make coffee every morning. (Je fais du café chaque matin.)',
            'She made a cake. (Elle a fait un gâteau.)',
            'They have made progress. (Ils ont fait des progrès.)'
        ]
    },
    'take': {
        explanation: 'Le verbe "take" (prendre) est utilisé dans de nombreux contextes.',
        examples: [
            'I take a shower. (Je prends une douche.)',
            'She took the bus. (Elle a pris le bus.)',
            'We have taken notes. (Nous avons pris des notes.)'
        ]
    },
    'see': {
        explanation: 'Le verbe "see" (voir) décrit l\'action de percevoir avec les yeux.',
        examples: [
            'I see a bird. (Je vois un oiseau.)',
            'She saw a movie. (Elle a vu un film.)',
            'We have seen this before. (Nous avons déjà vu cela.)'
        ]
    },
    'know': {
        explanation: 'Le verbe "know" (savoir, connaître) exprime la connaissance ou la familiarité.',
        examples: [
            'I know the answer. (Je connais la réponse.)',
            'She knew him well. (Elle le connaissait bien.)',
            'We have known each other for years. (Nous nous connaissons depuis des années.)'
        ]
    },
    'think': {
        explanation: 'Le verbe "think" (penser) exprime l\'activité mentale ou l\'opinion.',
        examples: [
            'I think it\'s a good idea. (Je pense que c\'est une bonne idée.)',
            'She thought about it. (Elle y a réfléchi.)',
            'We have thought it through. (Nous y avons réfléchi.)'
        ]
    },
    'come': {
        explanation: 'Le verbe "come" (venir) indique le mouvement vers le locuteur.',
        examples: [
            'I come here often. (Je viens souvent ici.)',
            'She came to visit. (Elle est venue visiter.)',
            'They have come a long way. (Ils ont fait beaucoup de chemin.)'
        ]
    },
    'give': {
        explanation: 'Le verbe "give" (donner) exprime l\'action de transférer quelque chose.',
        examples: [
            'I give presents. (Je donne des cadeaux.)',
            'She gave me a book. (Elle m\'a donné un livre.)',
            'We have given our best. (Nous avons donné notre meilleur.)'
        ]
    },
    'find': {
        explanation: 'Le verbe "find" (trouver) décrit la découverte de quelque chose.',
        examples: [
            'I find it interesting. (Je le trouve intéressant.)',
            'She found her keys. (Elle a trouvé ses clés.)',
            'We have found a solution. (Nous avons trouvé une solution.)'
        ]
    },
    'tell': {
        explanation: 'Le verbe "tell" (dire, raconter) est utilisé pour communiquer des informations.',
        examples: [
            'I tell stories. (Je raconte des histoires.)',
            'She told me the truth. (Elle m\'a dit la vérité.)',
            'We have told them everything. (Nous leur avons tout dit.)'
        ]
    },
    'feel': {
        explanation: 'Le verbe "feel" (sentir, ressentir) exprime les sensations physiques ou émotionnelles.',
        examples: [
            'I feel happy. (Je me sens heureux.)',
            'She felt tired. (Elle se sentait fatiguée.)',
            'We have felt better. (Nous nous sommes sentis mieux.)'
        ]
    }
};

export const verbTranslations = {
    'cut': 'couper', 'hit': 'frapper', 'put': 'mettre', 'set': 'placer', 'shut': 'fermer',
    'let': 'laisser', 'hurt': 'blesser', 'bet': 'parier', 'bid': 'enchérir', 'cost': 'coûter',
    'quit': 'quitter', 'split': 'diviser', 'spread': 'étaler', 'burst': 'éclater',
    'broadcast': 'diffuser', 'dig': 'creuser', 'build': 'construire', 'burn': 'brûler',
    'deal': 'traiter', 'feed': 'nourrir', 'feel': 'sentir', 'fight': 'se battre',
    'find': 'trouver', 'flee': 'fuir', 'get': 'obtenir', 'grind': 'moudre', 'hang': 'pendre',
    'hear': 'entendre', 'hold': 'tenir', 'keep': 'garder', 'kneel': 's\'agenouiller',
    'lay': 'poser', 'lead': 'mener', 'leave': 'partir', 'lend': 'prêter', 'light': 'allumer',
    'lose': 'perdre', 'mean': 'signifier', 'meet': 'rencontrer', 'pay': 'payer',
    'say': 'dire', 'sell': 'vendre', 'send': 'envoyer', 'shine': 'briller', 'shoot': 'tirer',
    'sit': 's\'asseoir', 'sleep': 'dormir', 'slide': 'glisser', 'spend': 'dépenser',
    'spin': 'tourner', 'spit': 'cracher', 'stand': 'se tenir debout', 'stick': 'coller',
    'sting': 'piquer', 'strike': 'frapper', 'sweep': 'balayer', 'swing': 'se balancer',
    'teach': 'enseigner', 'tell': 'dire', 'think': 'penser', 'understand': 'comprendre',
    'weep': 'pleurer', 'win': 'gagner', 'wind': 'enrouler', 'wring': 'tordre',
    'begin': 'commencer', 'blow': 'souffler', 'break': 'casser', 'choose': 'choisir',
    'draw': 'dessiner', 'drink': 'boire', 'drive': 'conduire', 'eat': 'manger',
    'fall': 'tomber', 'fly': 'voler', 'forget': 'oublier', 'freeze': 'geler',
    'give': 'donner', 'grow': 'grandir', 'hide': 'cacher', 'ride': 'monter',
    'ring': 'sonner', 'rise': 's\'élever', 'run': 'courir', 'shake': 'secouer',
    'sing': 'chanter', 'speak': 'parler', 'steal': 'voler', 'swear': 'jurer',
    'swim': 'nager', 'tear': 'déchirer', 'throw': 'lancer', 'wake': 'réveiller',
    'wear': 'porter', 'weave': 'tisser', 'write': 'écrire', 'arise': 'survenir',
    'awake': 'réveiller', 'bear': 'porter', 'bite': 'mordre', 'forbid': 'interdire',
    'forgive': 'pardonner', 'forsake': 'abandonner', 'mistake': 'se tromper',
    'overcome': 'surmonter', 'overtake': 'dépasser', 'prove': 'prouver', 'sew': 'coudre',
    'show': 'montrer', 'shrink': 'rétrécir', 'sow': 'semer', 'strike': 'frapper',
    'swell': 'gonfler', 'tread': 'marcher', 'withdraw': 'retirer', 'bring': 'apporter',
    'buy': 'acheter', 'catch': 'attraper', 'seek': 'chercher'
};

