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
const allVerbs = Object.values(verbsData).flat();

// Map kebab-case to camelCase
const categoryMap = {
    'no-change': 'noChange',
    'vowel-change': 'vowelChange',
    'same-past-participle': 'samePastParticiple',
    'only-pp-change': 'onlyPPChange',
    'en-ending': 'enEnding',
    'ght-ending': 'ghtEnding'
};

// Make functions globally available
window.getVerbsByCategory = function(category) {
    const mappedCategory = categoryMap[category] || category;
    if (mappedCategory === 'all') return allVerbs;
    return allVerbs.filter(verb => verb.category === mappedCategory);
};

window.searchVerbs = function(query) {
    if (!query || !query.trim()) return allVerbs;
    const searchTerm = query.toLowerCase().trim();
    return allVerbs.filter(verb => 
        verb.searchString.includes(searchTerm)
    );
};

window.getRandomVerb = function() {
    return allVerbs[Math.floor(Math.random() * allVerbs.length)];
};

window.getRandomOptions = function(correctVerb, field, count = 4) {
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

// Make allVerbs available globally
window.allVerbs = allVerbs;
