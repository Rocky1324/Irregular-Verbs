import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, Menu, X, BookOpen } from 'lucide-react';

const verbsData = {
  noChange: [
    ['bet', 'bet', 'bet'],
    ['bid', 'bid', 'bid'],
    ['broadcast', 'broadcast', 'broadcast'],
    ['burst', 'burst', 'burst'],
    ['cast', 'cast', 'cast'],
    ['cost', 'cost', 'cost'],
    ['cut', 'cut', 'cut'],
    ['hit', 'hit', 'hit'],
    ['hurt', 'hurt', 'hurt'],
    ['let', 'let', 'let'],
    ['put', 'put', 'put'],
    ['quit', 'quit', 'quit'],
    ['read', 'read', 'read'],
    ['set', 'set', 'set'],
    ['shut', 'shut', 'shut'],
    ['split', 'split', 'split'],
    ['spread', 'spread', 'spread'],
    ['thrust', 'thrust', 'thrust']
  ],
  vowelChange: [
    ['arise', 'arose', 'arisen'],
    ['awake', 'awoke', 'awoken'],
    ['be', 'was/were', 'been'],
    ['bear', 'bore', 'born/borne'],
    ['begin', 'began', 'begun'],
    ['blow', 'blew', 'blown'],
    ['break', 'broke', 'broken'],
    ['choose', 'chose', 'chosen'],
    ['do', 'did', 'done'],
    ['draw', 'drew', 'drawn'],
    ['drink', 'drank', 'drunk'],
    ['drive', 'drove', 'driven'],
    ['eat', 'ate', 'eaten'],
    ['fall', 'fell', 'fallen'],
    ['fly', 'flew', 'flown'],
    ['forget', 'forgot', 'forgotten'],
    ['forgive', 'forgave', 'forgiven'],
    ['freeze', 'froze', 'frozen'],
    ['give', 'gave', 'given'],
    ['go', 'went', 'gone'],
    ['grow', 'grew', 'grown'],
    ['hide', 'hid', 'hidden'],
    ['know', 'knew', 'known'],
    ['lie', 'lay', 'lain'],
    ['ride', 'rode', 'ridden'],
    ['ring', 'rang', 'rung'],
    ['rise', 'rose', 'risen'],
    ['run', 'ran', 'run'],
    ['see', 'saw', 'seen'],
    ['shake', 'shook', 'shaken'],
    ['show', 'showed', 'shown'],
    ['shrink', 'shrank', 'shrunk'],
    ['sing', 'sang', 'sung'],
    ['sink', 'sank', 'sunk'],
    ['speak', 'spoke', 'spoken'],
    ['spring', 'sprang', 'sprung'],
    ['steal', 'stole', 'stolen'],
    ['stink', 'stank', 'stunk'],
    ['swear', 'swore', 'sworn'],
    ['swim', 'swam', 'swum'],
    ['take', 'took', 'taken'],
    ['tear', 'tore', 'torn'],
    ['throw', 'threw', 'thrown'],
    ['wake', 'woke', 'woken'],
    ['wear', 'wore', 'worn'],
    ['write', 'wrote', 'written']
  ],
  samePastParticiple: [
    ['bend', 'bent', 'bent'],
    ['bleed', 'bled', 'bled'],
    ['breed', 'bred', 'bred'],
    ['build', 'built', 'built'],
    ['burn', 'burnt/burned', 'burnt/burned'],
    ['catch', 'caught', 'caught'],
    ['cling', 'clung', 'clung'],
    ['deal', 'dealt', 'dealt'],
    ['dig', 'dug', 'dug'],
    ['dream', 'dreamt/dreamed', 'dreamt/dreamed'],
    ['dwell', 'dwelt', 'dwelt'],
    ['feed', 'fed', 'fed'],
    ['feel', 'felt', 'felt'],
    ['fight', 'fought', 'fought'],
    ['find', 'found', 'found'],
    ['flee', 'fled', 'fled'],
    ['get', 'got', 'got/gotten'],
    ['grind', 'ground', 'ground'],
    ['hang', 'hung', 'hung'],
    ['have', 'had', 'had'],
    ['hear', 'heard', 'heard'],
    ['hold', 'held', 'held'],
    ['keep', 'kept', 'kept'],
    ['kneel', 'knelt', 'knelt'],
    ['lay', 'laid', 'laid'],
    ['lead', 'led', 'led'],
    ['lean', 'leant/leaned', 'leant/leaned'],
    ['leap', 'leapt/leaped', 'leapt/leaped'],
    ['learn', 'learnt/learned', 'learnt/learned'],
    ['leave', 'left', 'left'],
    ['lend', 'lent', 'lent'],
    ['light', 'lit', 'lit'],
    ['lose', 'lost', 'lost'],
    ['make', 'made', 'made'],
    ['mean', 'meant', 'meant'],
    ['meet', 'met', 'met'],
    ['pay', 'paid', 'paid'],
    ['sell', 'sold', 'sold'],
    ['send', 'sent', 'sent'],
    ['shine', 'shone', 'shone'],
    ['shoot', 'shot', 'shot'],
    ['sit', 'sat', 'sat'],
    ['sleep', 'slept', 'slept'],
    ['slide', 'slid', 'slid'],
    ['smell', 'smelt/smelled', 'smelt/smelled'],
    ['speed', 'sped', 'sped'],
    ['spell', 'spelt/spelled', 'spelt/spelled'],
    ['spend', 'spent', 'spent'],
    ['spill', 'spilt/spilled', 'spilt/spilled'],
    ['spin', 'spun', 'spun'],
    ['spit', 'spat', 'spat'],
    ['spoil', 'spoilt/spoiled', 'spoilt/spoiled'],
    ['stand', 'stood', 'stood'],
    ['stick', 'stuck', 'stuck'],
    ['sting', 'stung', 'stung'],
    ['strike', 'struck', 'struck'],
    ['string', 'strung', 'strung'],
    ['sweep', 'swept', 'swept'],
    ['swing', 'swung', 'swung'],
    ['teach', 'taught', 'taught'],
    ['tell', 'told', 'told'],
    ['think', 'thought', 'thought'],
    ['understand', 'understood', 'understood'],
    ['weep', 'wept', 'wept'],
    ['win', 'won', 'won'],
    ['wind', 'wound', 'wound'],
    ['wring', 'wrung', 'wrung']
  ],
  onlyParticipleDiff: [
    ['beat', 'beat', 'beaten']
  ],
  endingEn: [
    ['arise', 'arose', 'arisen'],
    ['awake', 'awoke', 'awoken'],
    ['bear', 'bore', 'born/borne'],
    ['beat', 'beat', 'beaten'],
    ['begin', 'began', 'begun'],
    ['bite', 'bit', 'bitten'],
    ['blow', 'blew', 'blown'],
    ['break', 'broke', 'broken'],
    ['choose', 'chose', 'chosen'],
    ['draw', 'drew', 'drawn'],
    ['drive', 'drove', 'driven'],
    ['eat', 'ate', 'eaten'],
    ['fall', 'fell', 'fallen'],
    ['fly', 'flew', 'flown'],
    ['forbid', 'forbade', 'forbidden'],
    ['forget', 'forgot', 'forgotten'],
    ['forgive', 'forgave', 'forgiven'],
    ['forsake', 'forsook', 'forsaken'],
    ['freeze', 'froze', 'frozen'],
    ['give', 'gave', 'given'],
    ['grow', 'grew', 'grown'],
    ['hide', 'hid', 'hidden'],
    ['know', 'knew', 'known'],
    ['mistake', 'mistook', 'mistaken'],
    ['ride', 'rode', 'ridden'],
    ['rise', 'rose', 'risen'],
    ['see', 'saw', 'seen'],
    ['shake', 'shook', 'shaken'],
    ['show', 'showed', 'shown'],
    ['shrink', 'shrank', 'shrunk/shrunken'],
    ['speak', 'spoke', 'spoken'],
    ['steal', 'stole', 'stolen'],
    ['swear', 'swore', 'sworn'],
    ['take', 'took', 'taken'],
    ['tear', 'tore', 'torn'],
    ['throw', 'threw', 'thrown'],
    ['tread', 'trod', 'trodden'],
    ['wake', 'woke', 'woken'],
    ['wear', 'wore', 'worn'],
    ['weave', 'wove', 'woven'],
    ['write', 'wrote', 'written']
  ],
  endingGht: [
    ['bring', 'brought', 'brought'],
    ['buy', 'bought', 'bought'],
    ['catch', 'caught', 'caught'],
    ['fight', 'fought', 'fought'],
    ['seek', 'sought', 'sought'],
    ['teach', 'taught', 'taught'],
    ['think', 'thought', 'thought']
  ]
};

const categories = [
  { id: 'noChange', name: 'No Change', description: 'Verbs that remain the same in all forms' },
  { id: 'vowelChange', name: 'Vowel Changes', description: 'Verbs with vowel alterations between forms' },
  { id: 'samePastParticiple', name: 'Same Past & Past Participle', description: 'Simple Past = Past Participle ≠ Base' },
  { id: 'onlyParticipleDiff', name: 'Only Past Participle Changes', description: 'Base = Simple Past ≠ Past Participle' },
  { id: 'endingEn', name: 'Past Participle ending in "en"', description: 'Verbs with "-en" ending in Past Participle' },
  { id: 'endingGht', name: 'Ending in "ght"', description: 'Simple Past or Past Participle ending in "-ght"' }
];

function VerbTable({ verbs, searchTerm }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredAndSorted = useMemo(() => {
    let filtered = verbs.filter(verb =>
      verb.some(form => form.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortConfig.key !== null) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key].toLowerCase();
        const bVal = b[sortConfig.key].toLowerCase();
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [verbs, searchTerm, sortConfig]);

  const handleSort = (columnIndex) => {
    setSortConfig(prev => ({
      key: columnIndex,
      direction: prev.key === columnIndex && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ columnIndex }) => {
    if (sortConfig.key !== columnIndex) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            {['Base', 'Simple Past', 'Past Participle'].map((header, idx) => (
              <th
                key={idx}
                onClick={() => handleSort(idx)}
                className="py-3 px-4 text-left font-semibold cursor-pointer hover:bg-blue-800 transition-colors"
              >
                {header} <SortIcon columnIndex={idx} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSorted.map((verb, idx) => (
            <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
              {verb.map((form, formIdx) => (
                <td key={formIdx} className="py-3 px-4 text-gray-800">
                  {form}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {filteredAndSorted.length === 0 && (
        <div className="text-center py-8 text-gray-500">No verbs found matching your search.</div>
      )}
    </div>
  );
}

export default function IrregularVerbsApp() {
  const [activeCategory, setActiveCategory] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">English Irregular Verbs</h1>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className={`lg:w-64 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <nav className="bg-white rounded-lg shadow-md p-4 sticky top-24">
              <button
                onClick={() => { setActiveCategory('home'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeCategory === 'home' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                Home
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                    activeCategory === cat.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeCategory === 'home' ? (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome!</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  This application helps you master English irregular verbs by organizing them into logical categories. 
                  Irregular verbs don't follow the standard "-ed" pattern for past forms, making them essential to memorize 
                  for fluent English communication.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {categories.map(cat => (
                    <div
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                    >
                      <h3 className="font-semibold text-blue-700 mb-2">{cat.name}</h3>
                      <p className="text-sm text-gray-600">{cat.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> Use the search bar to find specific verbs quickly, and click on column headers to sort the tables!
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {categories.find(c => c.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {categories.find(c => c.id === activeCategory)?.description}
                  </p>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search verbs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <VerbTable verbs={verbsData[activeCategory]} searchTerm={searchTerm} />
                
                <div className="mt-4 text-sm text-gray-500">
                  Showing {verbsData[activeCategory].filter(verb =>
                    verb.some(form => form.toLowerCase().includes(searchTerm.toLowerCase()))
                  ).length} of {verbsData[activeCategory].length} verbs
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Master English irregular verbs through organized learning
          </p>
        </div>
      </footer>
    </div>
  );
}