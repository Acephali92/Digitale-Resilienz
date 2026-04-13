/**
 * Widerstands-Toolkit - Passphrase Generator
 * ===========================================
 * Kryptographisch sicher, vollständig clientseitig.
 */

(function() {
    'use strict';

    // German word list (EFF-inspired, common German words, 4096 entries)
    const wordList = [
        'apfel', 'baum', 'wolke', 'haus', 'stern', 'fluss', 'berg', 'wald',
        'sonne', 'mond', 'blume', 'vogel', 'pferd', 'hund', 'katze', 'fisch',
        'brot', 'wasser', 'feuer', 'erde', 'wind', 'regen', 'schnee', 'himmel',
        'tisch', 'stuhl', 'lampe', 'buch', 'stift', 'papier', 'fenster', 'tuer',
        'strasse', 'bruecke', 'schiff', 'auto', 'rad', 'zug', 'flugzeug', 'boot',
        'garten', 'wiese', 'feld', 'see', 'meer', 'insel', 'kueste', 'strand',
        'morgen', 'abend', 'nacht', 'tag', 'woche', 'monat', 'jahr', 'zeit',
        'freund', 'kind', 'mutter', 'vater', 'schwester', 'bruder', 'oma', 'opa',
        'musik', 'tanz', 'lied', 'kunst', 'bild', 'farbe', 'form', 'licht',
        'kraft', 'mut', 'liebe', 'freude', 'hoffnung', 'traum', 'glueck', 'friede',
        'arbeit', 'spiel', 'sport', 'reise', 'wandern', 'laufen', 'schwimmen', 'fliegen',
        'kaffee', 'tee', 'milch', 'saft', 'kuchen', 'eis', 'salat', 'suppe',
        'mantel', 'schuh', 'hut', 'hemd', 'kleid', 'jacke', 'tasche', 'brille',
        'uhr', 'ring', 'kette', 'perle', 'gold', 'silber', 'stein', 'kristall',
        'tiger', 'loewe', 'baer', 'wolf', 'fuchs', 'hase', 'reh', 'eule',
        'rose', 'tulpe', 'lilie', 'nelke', 'veilchen', 'kaktus', 'efeu', 'moos',
        'buche', 'eiche', 'tanne', 'kiefer', 'birke', 'linde', 'ahorn', 'weide',
        'kerze', 'flamme', 'glut', 'asche', 'rauch', 'dampf', 'nebel', 'dunst',
        'gruen', 'blau', 'rot', 'gelb', 'weiss', 'schwarz', 'grau', 'braun',
        'klein', 'gross', 'lang', 'kurz', 'dick', 'duenn', 'alt', 'neu',
        'leise', 'laut', 'schnell', 'langsam', 'warm', 'kalt', 'hell', 'dunkel',
        'oben', 'unten', 'links', 'rechts', 'vorne', 'hinten', 'innen', 'aussen',
        'herz', 'kopf', 'hand', 'fuss', 'auge', 'ohr', 'nase', 'mund',
        'schloss', 'turm', 'mauer', 'tor', 'treppe', 'dach', 'keller', 'boden',
        'hammer', 'nagel', 'saege', 'zange', 'schraube', 'draht', 'kabel', 'rohr',
        'welle', 'sturm', 'blitz', 'donner', 'hagel', 'frost', 'tau', 'reif',
        'frieden', 'freiheit', 'wahrheit', 'recht', 'pflicht', 'ehre', 'treue', 'stolz',
        'denken', 'fuehlen', 'hoeren', 'sehen', 'riechen', 'schmecken', 'tasten', 'ahnen',
        'fragen', 'antwort', 'raetsel', 'loesung', 'problem', 'idee', 'plan', 'ziel',
        'anfang', 'ende', 'mitte', 'rand', 'grenze', 'weg', 'pfad', 'spur',
        'schulter', 'ellbogen', 'knie', 'knoekel', 'huelte', 'rippe', 'wirbel', 'muskel',
        'sehne', 'lunge', 'leber', 'niere', 'magen', 'darm', 'gehirn', 'nerv',
        'knochen', 'gelenk', 'haut', 'stirn', 'wange', 'kinn', 'lippe', 'zahn',
        'zunge', 'kehle', 'hals', 'nacken', 'ruecken', 'brust', 'bauch', 'finger',
        'daumen', 'zehe', 'ferse', 'wade', 'schenkel', 'becken', 'schaedel', 'ader',
        'blut', 'puls', 'atem', 'organ', 'druese', 'milz', 'galle', 'schilddruese',
        'kaese', 'butter', 'sahne', 'joghurt', 'quark', 'nudel', 'reis', 'mehl',
        'zucker', 'salz', 'pfeffer', 'senf', 'essig', 'honig', 'marmelade', 'sirup',
        'kartoffel', 'tomate', 'gurke', 'zwiebel', 'knoblauch', 'paprika', 'karotte', 'spinat',
        'brokkoli', 'bohne', 'erbse', 'linse', 'kohl', 'lauch', 'sellerie', 'kuerbis',
        'kirsche', 'birne', 'pflaume', 'traube', 'erdbeere', 'himbeere', 'brombeere', 'zitrone',
        'orange', 'banane', 'ananas', 'mango', 'melone', 'pfirsich', 'feige', 'dattel',
        'fleisch', 'wurst', 'schinken', 'speck', 'steak', 'braten', 'schnitzel', 'gulasch',
        'sosse', 'bruehe', 'eintopf', 'auflauf', 'knodel', 'kloess', 'pfannkuchen', 'waffel',
        'torte', 'keks', 'praline', 'schokolade', 'bonbon', 'marzipan', 'pudding', 'creme',
        'pfanne', 'topf', 'kessel', 'schuessel', 'teller', 'tasse', 'glas', 'kanne',
        'messer', 'gabel', 'loeffel', 'schneidebrett', 'sieb', 'reibe', 'quirl', 'ruehrloeffel',
        'backofen', 'herd', 'kuehlschrank', 'spuele', 'geschirrspueler', 'mikrowelle', 'mixer', 'toaster',
        'adler', 'falke', 'sperber', 'habicht', 'reiher', 'storch', 'schwan', 'gans',
        'ente', 'taube', 'spatz', 'amsel', 'meise', 'drossel', 'fink', 'lerche',
        'elster', 'rabe', 'kuckuck', 'specht', 'nachtigall', 'schwalbe', 'kranich', 'pelikan',
        'pinguin', 'papagei', 'flamingo', 'pfau', 'kolibri', 'moewe', 'albatros', 'eisvogel',
        'hirsch', 'elch', 'gemse', 'steinbock', 'wildschwein', 'dachs', 'marder', 'otter',
        'biber', 'igel', 'hamster', 'maus', 'ratte', 'eichhorn', 'fledermaus', 'maulwurf',
        'affe', 'giraffe', 'elefant', 'nashorn', 'zebra', 'krokodil', 'schildkroete', 'schlange',
        'eidechse', 'frosch', 'kroete', 'lachs', 'forelle', 'hecht', 'karpfen', 'aal',
        'delfin', 'wal', 'hai', 'robbe', 'krabbe', 'muschel', 'schnecke', 'wurm',
        'biene', 'wespe', 'hummel', 'kaefer', 'ameise', 'spinne', 'libelle', 'grille',
        'schmetterling', 'raupe', 'fliege', 'muecke', 'zikade', 'laus', 'floh', 'heuschrecke',
        'pilz', 'farn', 'gras', 'strauch', 'hecke', 'busch', 'ranke', 'halm',
        'bluete', 'knospe', 'wurzel', 'stamm', 'ast', 'zweig', 'blatt', 'nadel',
        'rinde', 'samen', 'frucht', 'nuesse', 'eichel', 'zapfen', 'beere', 'dorn',
        'orchidee', 'dahlie', 'aster', 'distel', 'sonnenblume', 'lavendel', 'thymian', 'salbei',
        'minze', 'basilikum', 'petersilie', 'rosmarin', 'dill', 'schnittlauch', 'oregano', 'koriander',
        'kirche', 'kloster', 'dom', 'kapelle', 'kathedrale', 'moschee', 'synagoge', 'tempel',
        'rathaus', 'schule', 'krankenhaus', 'apotheke', 'baeckerei', 'metzgerei', 'werkstatt', 'fabrik',
        'buero', 'laden', 'markt', 'kaufhaus', 'bank', 'hotel', 'gasthaus', 'wirtshaus',
        'museum', 'theater', 'kino', 'bibliothek', 'galerie', 'oper', 'arena', 'stadion',
        'bahnhof', 'flughafen', 'hafen', 'parkplatz', 'tankstelle', 'waschanlage', 'garage', 'halle',
        'scheune', 'stall', 'silo', 'muehle', 'brunnen', 'teich', 'kanal', 'damm',
        'deich', 'schleuse', 'staudamm', 'tunnel', 'viadukt', 'arkade', 'passage', 'balkon',
        'terrasse', 'veranda', 'loggia', 'erker', 'giebel', 'schornstein', 'kamin', 'flur',
        'diele', 'gang', 'korridor', 'foyer', 'vestibuel', 'atrium', 'innenhof', 'kueche',
        'bad', 'dusche', 'toilette', 'wohnzimmer', 'schlafzimmer', 'kinderzimmer', 'esszimmer', 'abstellraum',
        'dachboden', 'waschkueche', 'vorratsraum', 'arbeitszimmer', 'gaestezimmer', 'wintergarten', 'sauna', 'saeuele',
        'pfeiler', 'bogen', 'gewoelbe', 'kuppel', 'fassade', 'sockel', 'fundament', 'ziegel',
        'moertel', 'beton', 'zement', 'gips', 'kalk', 'sand', 'kies', 'holz',
        'balken', 'brett', 'latte', 'planke', 'bohle', 'parkett', 'fliese', 'platte',
        'schindel', 'schiefer', 'granit', 'marmor', 'sandstein', 'basalt', 'stahl', 'eisen',
        'kupfer', 'bronze', 'messing', 'zinn', 'blei', 'aluminium', 'schraubenzieher', 'bohrer',
        'feile', 'hobel', 'meissel', 'axt', 'beil', 'sense', 'sichel', 'harke',
        'rechen', 'spaten', 'schaufel', 'hacke', 'giesskanne', 'schere', 'faden', 'spule',
        'webrahmen', 'webstuhl', 'spinnrad', 'stricknadel', 'haekelnadel', 'pinsel', 'palette', 'staffelei',
        'leinwand', 'rahmen', 'farbtopf', 'tusche', 'kreide', 'lastwagen', 'lieferwagen', 'transporter',
        'traktor', 'bagger', 'kran', 'gabelstapler', 'walze', 'motorrad', 'roller', 'fahrrad',
        'dreirad', 'kutsche', 'schlitten', 'seilbahn', 'faehre', 'segelboot', 'yacht', 'kanu',
        'kajak', 'floss', 'tanker', 'frachter', 'kreuzer', 'hubschrauber', 'segelflugzeug', 'ballon',
        'rakete', 'fallschirm', 'drohne', 'gondel', 'lift', 'strassenbahn', 'omnibus', 'taxi',
        'ambulanz', 'feuerwehr', 'polizeiauto', 'lenkrad', 'pedal', 'bremse', 'kupplung', 'getriebe',
        'motor', 'reifen', 'felge', 'stossstange', 'kotfluegel', 'socke', 'strumpf', 'hose',
        'rock', 'bluse', 'pullover', 'weste', 'anzug', 'kostuem', 'uniform', 'schuerze',
        'kittel', 'pyjama', 'bademantel', 'bikini', 'badeanzug', 'guertel', 'krawatte', 'schal',
        'muetze', 'kappe', 'helm', 'handschuh', 'stiefel', 'sandale', 'pantoffel', 'turnschuh',
        'absatz', 'sohle', 'schnalle', 'reissverschluss', 'knopf', 'stoff', 'seide', 'wolle',
        'baumwolle', 'leinen', 'samt', 'cord', 'spitze', 'satin', 'filz', 'leder',
        'pelz', 'fleece', 'nylon', 'polyester', 'denim', 'oval', 'rund', 'eckig',
        'dreieckig', 'spitz', 'flach', 'steil', 'schief', 'gebogen', 'gerade', 'parallel',
        'diagonal', 'spirale', 'kreis', 'kugel', 'wuerfel', 'zylinder', 'kegel', 'pyramide',
        'prisma', 'quader', 'trapez', 'raute', 'hexagon', 'rosa', 'lila', 'violett',
        'tuerkis', 'beige', 'ocker', 'indigo', 'magenta', 'golden', 'silbern', 'kupfern',
        'elfenbein', 'scharlach', 'karmin', 'azur', 'wolkenbruch', 'nieselregen', 'graupel', 'eisregen',
        'gewitter', 'tornado', 'orkan', 'taifun', 'hurrikan', 'brise', 'boe', 'windstille',
        'hitzewelle', 'kaeltewelle', 'duerre', 'flut', 'ueberschwemmung', 'lawine', 'erdrutsch', 'erdbeben',
        'vulkan', 'tsunami', 'klimawandel', 'treibhaus', 'tal', 'schlucht', 'klamm', 'hoehle',
        'grotte', 'krater', 'huegel', 'klippe', 'felsen', 'gestein', 'gebirge', 'gipfel',
        'kamm', 'grat', 'hang', 'abhang', 'ebene', 'steppe', 'praerie', 'savanne',
        'wueste', 'oase', 'tundra', 'moor', 'sumpf', 'marsch', 'heide', 'alm',
        'lichtung', 'dickicht', 'urwald', 'quelle', 'bach', 'strom', 'wasserfall', 'muendung',
        'delta', 'fjord', 'bucht', 'lagune', 'riff', 'atoll', 'gletscher', 'eisberg',
        'packeis', 'schneeflocke', 'eiszapfen', 'sekunde', 'minute', 'stunde', 'mittag', 'mitternacht',
        'dawn', 'dusk', 'fruehling', 'sommer', 'herbst', 'winter', 'saison', 'epoche',
        'aera', 'dekade', 'jahrhundert', 'jahrtausend', 'kalender', 'datum', 'termin', 'frist',
        'stichtag', 'feiertag', 'werktag', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag',
        'samstag', 'sonntag', 'wochenende', 'januar', 'februar', 'maerz', 'april', 'mai',
        'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember', 'quartal',
        'halbjahr', 'semester', 'trimester', 'arzt', 'anwalt', 'richter', 'lehrer', 'professor',
        'forscher', 'ingenieur', 'architekt', 'maler', 'bildhauer', 'fotograf', 'journalist', 'redakteur',
        'autor', 'dichter', 'musiker', 'saenger', 'dirigent', 'komponist', 'regisseur', 'schauspieler',
        'taenzer', 'akrobat', 'jongleur', 'koch', 'baecker', 'metzger', 'gaertner', 'bauer',
        'fischer', 'jaeger', 'foerster', 'tischler', 'schreiner', 'zimmermann', 'dachdecker', 'maurer',
        'klempner', 'elektriker', 'mechaniker', 'schneider', 'schuster', 'goldschmied', 'uhrmacher', 'optiker',
        'zahnarzt', 'tierarzt', 'apotheker', 'pilot', 'kapitaen', 'matrose', 'lokfuehrer', 'busfahrer',
        'taxifahrer', 'kurier', 'postbote', 'polizist', 'soldat', 'feuerwehrmann', 'sanitaeter', 'krankenpfleger',
        'hebamme', 'therapeut', 'psychologe', 'trauer', 'angst', 'wut', 'ekel', 'scham',
        'schuld', 'neid', 'eifersucht', 'sehnsucht', 'heimweh', 'fernweh', 'staunen', 'neugier',
        'langeweile', 'ungeduld', 'zufriedenheit', 'dankbarkeit', 'mitgefuehl', 'mitleid', 'ehrfurcht', 'demut',
        'trotz', 'verzweiflung', 'resignation', 'erleichterung', 'begeisterung', 'euphorie', 'melancholie', 'nostalgie',
        'reue', 'fussball', 'handball', 'basketball', 'volleyball', 'tennis', 'tischtennis', 'badminton',
        'hockey', 'eishockey', 'rugby', 'golf', 'boxen', 'ringen', 'judo', 'karate',
        'fechten', 'turnen', 'leichtathletik', 'marathon', 'sprint', 'weitsprung', 'hochsprung', 'diskus',
        'speer', 'rudern', 'segeln', 'surfen', 'tauchen', 'klettern', 'bergsteigen', 'skifahren',
        'rodeln', 'schach', 'dame', 'domino', 'puzzle', 'kreuzwortraetsel', 'sudoku', 'brettspiel',
        'kartenspiel', 'wuerfeln', 'angeln', 'jagen', 'sammeln', 'basteln', 'stricken', 'naehen',
        'haekeln', 'malen', 'zeichnen', 'modellieren', 'toepfern', 'schnitzen', 'gravieren', 'lesen',
        'schreiben', 'fotografieren', 'filmen', 'kochen', 'backen', 'grillen', 'raeuchern', 'brauen',
        'keltern', 'klavier', 'gitarre', 'geige', 'cello', 'kontrabass', 'harfe', 'laute',
        'banjo', 'mandoline', 'ukulele', 'floete', 'klarinette', 'oboe', 'fagott', 'saxophon',
        'trompete', 'posaune', 'tuba', 'horn', 'trommel', 'pauke', 'xylophon', 'triangel',
        'akkordeon', 'mundharmonika', 'orgel', 'synthesizer', 'melodie', 'harmonie', 'rhythmus', 'akkord',
        'tonleiter', 'takt', 'tempo', 'dynamik', 'sinfonie', 'konzert', 'sonate', 'fuge',
        'arie', 'duett', 'chor', 'orchester', 'ensemble', 'quartett', 'solist', 'skulptur',
        'relief', 'fresko', 'mosaik', 'collage', 'grafik', 'druck', 'radierung', 'lithografie',
        'aquarell', 'oelgemaelde', 'zeichnung', 'skizze', 'portrait', 'stillleben', 'landschaft', 'abstrakt',
        'realistisch', 'impressionismus', 'expressionismus', 'kubismus', 'surrealismus', 'romantik', 'barock', 'atom',
        'molekuel', 'elektron', 'proton', 'neutron', 'photon', 'quant', 'ion', 'element',
        'verbindung', 'reaktion', 'katalysator', 'enzym', 'protein', 'zelle', 'gen', 'chromosom',
        'mutation', 'evolution', 'selektion', 'anpassung', 'vererbung', 'art', 'gattung', 'familie',
        'ordnung', 'klasse', 'reich', 'oekosystem', 'biotop', 'habitat', 'spannung', 'widerstand',
        'kondensator', 'transistor', 'diode', 'schaltung', 'platine', 'prozessor', 'speicher', 'festplatte',
        'bildschirm', 'tastatur', 'drucker', 'scanner', 'server', 'netzwerk', 'router', 'modem',
        'antenne', 'sensor', 'laser', 'radar', 'sonar', 'roboter', 'automat', 'maschine',
        'generator', 'turbine', 'pumpe', 'kompressor', 'ventil', 'software', 'programm', 'algorithmus',
        'datenbank', 'datei', 'ordner', 'passwort', 'verschluesselung', 'internet', 'webseite', 'browser',
        'suchmaschine', 'download', 'upload', 'streaming', 'podcast', 'sofa', 'sessel', 'hocker',
        'regal', 'schrank', 'kommode', 'vitrine', 'bett', 'matratze', 'kissen', 'decke',
        'bettwaesche', 'vorhang', 'jalousie', 'rollo', 'teppich', 'laeufer', 'matte', 'gardine',
        'polster', 'bezug', 'husse', 'quaste', 'kronleuchter', 'stehlampe', 'wandlampe', 'nachtlicht',
        'schreibtisch', 'drehstuhl', 'buecherregal', 'aktenschrank', 'spiegel', 'bilderrahmen', 'wanduhr', 'vase',
        'kerzenstaender', 'blumentopf', 'korb', 'dose', 'eimer', 'besen', 'staubsauger', 'wischmop',
        'schwamm', 'lappen', 'buerste', 'waschmaschine', 'trockner', 'buegeleisen', 'buegelbrett', 'waeschekorb',
        'kleiderschrank', 'kleiderbuegel', 'schublade', 'gerechtigkeit', 'gleichheit', 'wuerde', 'tugend', 'moral',
        'ethik', 'vernunft', 'weisheit', 'wissen', 'bildung', 'erfahrung', 'erkenntnis', 'einsicht',
        'ueberzeugung', 'glaube', 'zweifel', 'vertrauen', 'respekt', 'toleranz', 'geduld', 'fleiss',
        'ausdauer', 'disziplin', 'chaos', 'zufall', 'schicksal', 'bestimmung', 'verantwortung', 'gewissen',
        'charakter', 'identitaet', 'persoenlichkeit', 'bewusstsein', 'unterbewusstsein', 'phantasie', 'kreativitaet', 'intuition',
        'instinkt', 'logik', 'analyse', 'synthese', 'these', 'antithese', 'hypothese', 'theorie',
        'praxis', 'methode', 'strategie', 'taktik', 'prinzip', 'konzept', 'modell', 'system',
        'struktur', 'prozess', 'fortschritt', 'entwicklung', 'wandel', 'revolution', 'reform', 'tradition',
        'moderne', 'gehen', 'stehen', 'sitzen', 'liegen', 'rennen', 'springen', 'kriechen',
        'fallen', 'steigen', 'sinken', 'gleiten', 'rutschen', 'rollen', 'drehen', 'wenden',
        'heben', 'senken', 'tragen', 'ziehen', 'schieben', 'werfen', 'fangen', 'halten',
        'greifen', 'loslassen', 'druecken', 'pressen', 'klopfen', 'schlagen', 'stossen', 'treten',
        'schneiden', 'reissen', 'brechen', 'biegen', 'falten', 'knoten', 'binden', 'loesen',
        'oeffnen', 'schliessen', 'sperren', 'riegeln', 'verriegeln', 'drangen', 'blockieren', 'bauen',
        'errichten', 'abreissen', 'reparieren', 'flicken', 'montieren', 'demontieren', 'installieren', 'pflanzen',
        'saeen', 'ernten', 'giessen', 'duengen', 'jaeten', 'beschneiden', 'veredeln', 'waschen',
        'spuelen', 'putzen', 'schrubben', 'polieren', 'wischen', 'fegen', 'kehren', 'trocknen',
        'bleichen', 'faerben', 'beizen', 'lackieren', 'streichen', 'grundieren', 'versiegeln', 'sprechen',
        'reden', 'sagen', 'erzaehlen', 'berichten', 'melden', 'mitteilen', 'verkuenden', 'fluestern',
        'murmeln', 'schreien', 'rufen', 'bruellem', 'pfeifen', 'summen', 'singen', 'beten',
        'predigen', 'lehren', 'lernen', 'studieren', 'forschen', 'entdecken', 'erfinden', 'verstehen',
        'begreifen', 'erkennen', 'kennen', 'merken', 'erinnern', 'vergessen', 'planen', 'entwerfen',
        'gestalten', 'formen', 'praegen', 'schaffen', 'erschaffen', 'herstellen', 'erzeugen', 'produzieren',
        'fertigen', 'verarbeiten', 'bearbeiten', 'verfeinern', 'optimieren', 'verbessern', 'kaufen', 'verkaufen',
        'handeln', 'tauschen', 'leihen', 'borgen', 'mieten', 'pachten', 'zahlen', 'bezahlen',
        'ueberweisen', 'sparen', 'investieren', 'verdienen', 'profitieren', 'verlieren', 'helfen', 'unterstuetzen',
        'foerdern', 'ermutigen', 'troesten', 'pflegen', 'heilen', 'behandeln', 'schuetzen', 'verteidigen',
        'bewachen', 'retten', 'bergen', 'befreien', 'erlauben', 'erlassen', 'elbe', 'donau',
        'rhein', 'mosel', 'main', 'weser', 'oder', 'saale', 'isar', 'neckar',
        'ems', 'ruhr', 'lahn', 'nahe', 'fulda', 'werra', 'alpen', 'harz',
        'eifel', 'taunus', 'hunsrueck', 'spessart', 'schwarzwald', 'odenwald', 'erzgebirge', 'fichtelgebirge',
        'bayerwald', 'jura', 'bodensee', 'chiemsee', 'mueritz', 'plauersee', 'nordsee', 'ostsee',
        'atlantik', 'pazifik', 'mittelmeer', 'karibik', 'arktis', 'antarktis', 'kontinent', 'halbinsel',
        'kap', 'landzunge', 'archipel', 'plateau', 'senke', 'tafel', 'lineal', 'geodreieck',
        'zirkel', 'bleistift', 'radierer', 'fueller', 'tintenpatrone', 'heft', 'mappe', 'ranzen',
        'schulranzen', 'pausenbrot', 'pausenhof', 'klassenzimmer', 'lehrerzimmer', 'aula', 'turnhalle', 'labor',
        'werkraum', 'schulhof', 'mensa', 'unterricht', 'vorlesung', 'seminar', 'uebung', 'klausur',
        'pruefung', 'zeugnis', 'diplom', 'abitur', 'bachelor', 'master', 'doktor', 'stipendium',
        'praktikum', 'ausbildung', 'lehrplan', 'fach', 'aufgabe', 'hausaufgabe', 'referat', 'aufsatz',
        'diktat', 'mathematik', 'physik', 'chemie', 'biologie', 'geografie', 'geschichte', 'deutsch',
        'englisch', 'latein', 'franzoesisch', 'spanisch', 'religion', 'philosophie', 'sozialkunde', 'informatik',
        'rezept', 'diagnose', 'therapie', 'operation', 'impfung', 'spritze', 'tablette', 'kapsel',
        'salbe', 'tropfen', 'verband', 'pflaster', 'schiene', 'kruecke', 'rollstuhl', 'fieber',
        'husten', 'schnupfen', 'grippe', 'allergie', 'asthma', 'diabetes', 'rheuma', 'entzuendung',
        'infektion', 'virus', 'bakterie', 'parasit', 'epidemie', 'pandemie', 'impfstoff', 'blutdruck',
        'herzschlag', 'kreislauf', 'stoffwechsel', 'verdauung', 'immunsystem', 'hormon', 'vitamin', 'kalorie',
        'naehrstoff', 'mineral', 'spurenelement', 'antioxidant', 'ballaststoff', 'eiweiss', 'fett', 'kohlenhydrat',
        'glucose', 'insulin', 'cholesterin', 'haemoglobin', 'antikoerper', 'plasma', 'serum', 'gesetz',
        'verordnung', 'erlass', 'satzung', 'verfassung', 'grundgesetz', 'paragraph', 'artikel', 'vertrag',
        'abkommen', 'konvention', 'protokoll', 'charta', 'deklaration', 'resolution', 'petition', 'klage',
        'urteil', 'berufung', 'revision', 'freispruch', 'verurteilung', 'strafe', 'busse', 'gefaengnis',
        'bewaehrung', 'kaution', 'anklage', 'verteidigung', 'zeuge', 'beweis', 'indiz', 'parlament',
        'regierung', 'opposition', 'koalition', 'fraktion', 'ausschuss', 'plenum', 'debatte', 'abstimmung',
        'wahl', 'referendum', 'volksabstimmung', 'mandat', 'legislatur', 'exekutive', 'judikative', 'demokratie',
        'republik', 'monarchie', 'diktatur', 'anarchie', 'foederalismus', 'zentralismus', 'pluralismus', 'partei',
        'gewerkschaft', 'initiative', 'bewegung', 'demonstration', 'protest', 'streik', 'wirtschaft', 'handel',
        'gewerbe', 'industrie', 'handwerk', 'landwirtschaft', 'forstwirtschaft', 'bergbau', 'fischerei', 'tourismus',
        'dienstleistung', 'logistik', 'transport', 'versicherung', 'finanz', 'aktie', 'anleihe', 'fonds',
        'kredit', 'hypothek', 'zinsen', 'rendite', 'dividende', 'bilanz', 'umsatz', 'gewinn',
        'verlust', 'steuer', 'abgabe', 'zoll', 'subvention', 'inflation', 'deflation', 'rezession',
        'konjunktur', 'wachstum', 'wohlstand', 'armut', 'schulden', 'waehrung', 'muenze', 'geldschein',
        'konto', 'ueberweisung', 'lastschrift', 'scheck', 'quittung', 'rechnung', 'mahnung', 'gutschrift',
        'rabatt', 'skonto', 'provision', 'gebuehr', 'beitrag', 'angebot', 'nachfrage', 'preis',
        'kosten', 'wert', 'kapital', 'vermoegen', 'einkommen', 'telefon', 'handy', 'smartphone',
        'tablet', 'laptop', 'computer', 'monitor', 'kamera', 'mikrofon', 'lautsprecher', 'kopfhoerer',
        'fernseher', 'radio', 'zeitung', 'zeitschrift', 'magazin', 'nachricht', 'bericht', 'reportage',
        'interview', 'kommentar', 'leitartikel', 'glosse', 'kolumne', 'schlagzeile', 'ueberschrift', 'kapitel',
        'inhalt', 'index', 'vorwort', 'nachwort', 'verlag', 'redaktion', 'druckerei', 'buchhandlung',
        'archiv', 'mediathek', 'pressestelle', 'sendung', 'frequenz', 'empfang', 'signal', 'bandbreite',
        'reichweite', 'brief', 'postkarte', 'paket', 'einschreiben', 'eilbrief', 'telegramm', 'fax',
        'email', 'botschaft', 'mitteilung', 'hinweis', 'warnung', 'aufforderung', 'einladung', 'absage',
        'sprache', 'dialekt', 'mundart', 'akzent', 'aussprache', 'betonung', 'grammatik', 'wortschatz',
        'silbe', 'vokal', 'konsonant', 'umlaut', 'buchstabe', 'schrift', 'alphabet', 'zeichen',
        'satz', 'wort', 'verb', 'nomen', 'adjektiv', 'adverb', 'pronomen', 'praeposition',
        'konjunktion', 'interpunktion', 'komma', 'punkt', 'ausrufezeichen', 'fragezeichen', 'semikolon', 'roman',
        'novelle', 'erzaehlung', 'maerchen', 'fabel', 'sage', 'legende', 'mythos', 'gedicht',
        'ballade', 'hymne', 'elegie', 'ode', 'sonett', 'haiku', 'epos', 'drama',
        'komoedie', 'tragoedie', 'satire', 'parodie', 'groteske', 'farce', 'posse', 'szene',
        'akt', 'prolog', 'epilog', 'monolog', 'dialog', 'handlung', 'konflikt', 'held',
        'heldin', 'boesewicht', 'figur', 'rolle', 'maske', 'requisite', 'buehne', 'kulisse',
        'rampenlicht', 'scheinwerfer', 'ton', 'beleuchtung', 'regie', 'applaus', 'premiere', 'vorstellung',
        'auffuehrung', 'gastspiel', 'tournee', 'probe', 'generalprobe', 'muenster', 'basilika', 'pagode',
        'minarett', 'glockenturm', 'kreuzgang', 'altar', 'kanzel', 'sakristei', 'apsis', 'chorraum',
        'rosette', 'bleiglas', 'ikone', 'meditation', 'gebet', 'ritual', 'zeremonie', 'taufe',
        'hochzeit', 'beerdigung', 'pilgerfahrt', 'horizont', 'panorama', 'aussicht', 'fernsicht', 'perspektive',
        'blickwinkel', 'standpunkt', 'drehmoment', 'hebelkraft', 'reibung', 'schwerkraft', 'magnetismus', 'elektritzitaet',
        'optik', 'akustik', 'schwingung', 'amplitude', 'phase', 'resonanz', 'interferenz', 'diffraktion',
        'reflektion', 'brechung', 'absorption', 'emission', 'strahlung', 'spektrum', 'okular', 'teleskop',
        'mikroskop', 'fernrohr', 'lupe', 'kompass', 'barometer', 'thermometer', 'hygrometer', 'waage',
        'pendel', 'feder', 'magnet', 'batterie', 'solarzelle', 'windrad', 'wasserkraft', 'kernenergie',
        'fusion', 'spaltung', 'kettenreaktion', 'halbwertszeit', 'isotop', 'zerfall', 'strahlen', 'galaxie',
        'nebula', 'komet', 'asteroid', 'meteor', 'planet', 'trabant', 'orbit', 'umlaufbahn',
        'rotation', 'gravitation', 'expansion', 'urknall', 'schwarzesloch', 'supernova', 'pulsar', 'sonnensystem',
        'milchstrasse', 'sternbild', 'tierkreis', 'polarstern', 'abendstern', 'morgenstern', 'venus', 'mars',
        'jupiter', 'saturn', 'neptun', 'uranus', 'pluto', 'merkur', 'geruch', 'duft',
        'aroma', 'parfuem', 'gestank', 'mief', 'hauch', 'wohlgeruch', 'geschmack', 'bitter',
        'suess', 'sauer', 'salzig', 'scharf', 'mild', 'wuerzig', 'knusprig', 'saftig',
        'zart', 'zaeh', 'cremig', 'fluessig', 'fest', 'weich', 'alarm', 'sirene',
        'glocke', 'klingel', 'fanfare', 'pfeife', 'trommelwirbel', 'gong', 'schlag', 'klang',
        'nachhall', 'echo', 'stille', 'ruhe', 'laerm', 'geraeusch', 'krach', 'knall',
        'rummel', 'brummen', 'zischen', 'knirschen', 'rascheln', 'rauschen', 'plaetschern', 'gurgeln',
        'blubbern', 'knistern', 'prasseln', 'knarren', 'quietschen', 'klappern', 'rasseln', 'scheppern',
        'poltern', 'donnern', 'grollen', 'huette', 'villa', 'palast', 'burg', 'festung',
        'zitadelle', 'kaserne', 'bunker', 'pavillon', 'kiosk', 'laube', 'pergola', 'gewuechshaus',
        'orangerie', 'voliere', 'aquarium', 'terrarium', 'gehege', 'zaun', 'gitter', 'gelaender',
        'palisade', 'bruestung', 'rampe', 'stufe', 'podest', 'plattform', 'empore', 'anker',
        'mast', 'segel', 'ruder', 'kiel', 'bug', 'heck', 'backbord', 'steuerbord',
        'kajuete', 'kombeuese', 'deck', 'luke', 'leine', 'oese', 'haken', 'krampe',
        'klammer', 'clip', 'stecker', 'buchse', 'schalter', 'taste', 'hebel', 'griff',
        'kurbel', 'regler', 'drehknopf', 'achse', 'zahnrad', 'riemen', 'seil', 'flaschenzug',
        'winde', 'dichtung', 'flansch', 'muffe', 'gewinde', 'bolzen', 'unterlegscheibe', 'feuerwerk',
        'konfetti', 'luftballon', 'girlande', 'lampion', 'laterne', 'fackel', 'leuchtturm', 'blinklicht',
        'ampel', 'verkehrsschild', 'wegweiser', 'markierung', 'beschilderung', 'leitsystem', 'fahrplan', 'strecke',
        'route', 'umweg', 'abkuerzung', 'kreuzung', 'kreisverkehr', 'einbahnstrasse', 'autobahn', 'landstrasse',
        'feldweg', 'wanderweg', 'radweg', 'gehweg', 'buergersteig', 'zebrastreifen', 'haltestelle', 'station',
        'terminal', 'pier', 'anleger', 'steg', 'kai', 'mole', 'strick', 'schnur',
        'garn', 'zwirn', 'band', 'kordel', 'trosse', 'litze', 'leitung', 'schlauch',
        'rinne', 'mulde', 'graben', 'furche', 'rille', 'nut', 'falz', 'kerbe',
        'ritze', 'spalte', 'riss', 'bruch', 'kluft', 'spalt', 'naht', 'schweissnaht',
        'loetung', 'klebung', 'gabelung', 'abzweigung', 'einmuendung', 'zusammenfluss', 'oekonom', 'geologe',
        'meteorologe', 'biologe', 'physiker', 'chemiker', 'mathematiker', 'statistiker', 'informatiker', 'programmierer',
        'techniker', 'laborant', 'assistent', 'dozent', 'rektor', 'dekan', 'diplomat', 'botschafter',
        'konsul', 'attache', 'minister', 'kanzler', 'praesident', 'abgeordneter', 'buergermeister', 'landrat',
        'gouverneur', 'senator', 'delegierter', 'kommissar', 'inspektor', 'auditor', 'notar', 'staatsanwalt',
        'schoeffe', 'geschworener', 'mediator', 'schlichter', 'gutachter', 'sachverstaendiger', 'berater', 'makler',
        'treuhaender', 'verwalter', 'kurator', 'vormund', 'betreuer', 'haendler', 'vertreter', 'agent',
        'broker', 'spekulant', 'investor', 'aktionaer', 'unternehmer', 'gruender', 'geschaeftsfuehrer', 'vorstand',
        'aufsichtsrat', 'direktor', 'manager', 'teamleiter', 'abteilungsleiter', 'buchhalter', 'revisor', 'controller',
        'analyst', 'stratege', 'consultant', 'trainer', 'mentor', 'lehrling', 'geselle', 'meister',
        'facharbeiter', 'hilfsarbeiter', 'zeitarbeiter', 'freiberufler', 'selbststaendiger', 'tinte', 'kugelschreiber', 'textmarker',
        'filzstift', 'wachsmalstift', 'buntstift', 'kohle', 'graphit', 'knetmasse', 'wachs', 'bernstein',
        'koralle', 'jade', 'opal', 'rubin', 'saphir', 'smaragd', 'diamant', 'topas',
        'amethyst', 'granat', 'achat', 'quarz', 'obsidian', 'turmalin', 'lapislazuli', 'mondstein',
        'tigerauge', 'perkal', 'damast', 'brokat', 'chiffon', 'taft', 'organza', 'tuell',
        'jersey', 'flanell', 'tweed', 'kaschmir', 'mohair', 'angora', 'alpaka', 'viskose',
        'lyocell', 'stickerei', 'applikation', 'patchwork', 'quilten', 'kloeppeln', 'weben', 'filzen',
        'walken', 'einhorn', 'drache', 'phoenix', 'greif', 'sphinx', 'zentaur', 'meerjungfrau',
        'troll', 'zwerg', 'riese', 'elfe', 'kobold', 'nixe', 'fee', 'hexe',
        'zauberer', 'ritter', 'knappe', 'burgherr', 'vogt', 'graf', 'baron', 'herzog',
        'koenig', 'kaiser', 'prinz', 'prinzessin', 'hofdame', 'edelmann', 'raubritter', 'kreuzritter',
        'samurai', 'schwert', 'schild', 'lanze', 'pfeil', 'armbrust', 'dolch', 'streitaxt',
        'hellebarde', 'katapult', 'belagerungsturm', 'ruestung', 'kettenhemd', 'visier', 'wappen', 'flagge',
        'banner', 'standarte', 'fahne', 'wimpel', 'emblem', 'siegel', 'stempel', 'yoga',
        'pilates', 'stretching', 'aerobic', 'jogging', 'radfahren', 'inlineskaten', 'skateboard', 'snowboard',
        'langlauf', 'biathlon', 'triathlon', 'pentathlon', 'decathlon', 'sprungbrett', 'startblock', 'ziellinie',
        'schiedsrichter', 'mannschaft', 'spielfeld', 'spieler', 'torwart', 'stuermer', 'verteidiger', 'mittelfeld',
        'auswechslung', 'halbzeit', 'verlaengerung', 'elfmeter', 'pokal', 'medaille', 'trophae', 'urkunde',
        'rekord', 'bestzeit', 'weltrekord', 'olympiade', 'fasching', 'karneval', 'fastnacht', 'ostern',
        'pfingsten', 'weihnachten', 'silvester', 'neujahr', 'erntedank', 'nikolaus', 'advent', 'heiligabend',
        'christbaum', 'krippe', 'geschenk', 'bescherung', 'geburtstag', 'namenstag', 'jubilaeum', 'verlobung',
        'trauung', 'taufpate', 'kommunion', 'konfirmation', 'picknick', 'ausflug', 'wanderung', 'expedition',
        'safari', 'kreuzfahrt', 'rundreise', 'stadtrundgang', 'besichtigung', 'fuehrung', 'exkursion', 'schulausflug',
        'klassenfahrt', 'feriencamp', 'jugendherberge', 'zeltplatz', 'zelt', 'schlafsack', 'isomatte', 'rucksack',
        'wanderstab', 'landkarte', 'fernglas', 'taschenlampe', 'feuerzeug', 'streichholz', 'taschenmesser', 'feldstecher',
        'trinkflasche', 'proviant', 'notration', 'aquadukt', 'obelisk', 'kolosseum', 'amphitheater', 'forum',
        'therme', 'akropolis', 'ziggurat', 'stupa', 'dolmen', 'menhir', 'fruehstueck', 'mittagessen',
        'abendessen', 'imbiss', 'vesper', 'brunch', 'buffet', 'bankett', 'vorspeise', 'hauptgang',
        'beilage', 'nachtisch', 'dessert', 'aperitif', 'digestif', 'cocktail', 'bier', 'wein',
        'sekt', 'champagner', 'schnaps', 'likoer', 'whisky', 'rum', 'wodka', 'cognac',
        'weinbrand', 'obstler', 'grappa', 'absinth', 'met', 'bowle', 'limonade', 'sprudel',
        'eistee', 'smoothie', 'shake', 'kakao', 'espresso', 'cappuccino', 'nuance', 'facette',
        'aspekt', 'dimension', 'schicht', 'grad', 'masse', 'volumen', 'dichte', 'gewicht',
        'laenge', 'breite', 'hoehe', 'tiefe', 'umfang', 'radius', 'durchmesser', 'flaeche',
        'winkel', 'tangente', 'sekante', 'symmetrie', 'proportion', 'verhaeltnis', 'quotient', 'produkt',
        'summe', 'differenz', 'faktor', 'exponent', 'logarithmus', 'integral', 'differential', 'vektor',
        'matrix', 'tensor', 'skalar', 'funktion', 'gleichung', 'formel', 'variable', 'konstante',
        'parameter', 'koeffizient', 'nenner', 'zaehler', 'potenz', 'basis', 'mantisse', 'dezimal',
        'binaer', 'wahrscheinlichkeit', 'statistik', 'mittelwert', 'median', 'modus', 'varianz', 'abweichung',
        'korrelation', 'regression', 'verteilung', 'stichprobe', 'population', 'fehler', 'genauigkeit', 'praezision',
        'experiment', 'kontrolle', 'ergebnis', 'messung', 'einheit', 'standard', 'norm', 'patent',
        'lizenz', 'marke', 'copyright', 'urheberrecht', 'leistungsschutz', 'gebrauchsmuster', 'geschmacksmuster', 'innovation',
        'prototyp', 'serienreife', 'marktreife', 'pilotprojekt', 'machbarkeit', 'studie', 'gutachten', 'dokumentation',
        'handbuch', 'anleitung', 'leitfaden', 'richtlinie', 'vorschrift', 'spezifikation', 'entwurf', 'bauplan',
        'grundriss', 'schnitt', 'ansicht', 'detail', 'massstab', 'nachhaltigkeit', 'umweltschutz', 'naturschutz',
        'artenschutz', 'tierschutz', 'denkmalschutz', 'heimatschutz', 'datenschutz', 'recycling', 'kompost', 'muell',
        'abfall', 'entsorgung', 'klaeranlage', 'deponie', 'verbrennung', 'immission', 'abgas', 'feinstaub',
        'stickoxid', 'ozon', 'kohlendioxid', 'methan', 'energie', 'leistung', 'effizienz', 'wirkungsgrad',
        'verbrauch', 'einsparung', 'solarpanel', 'windkraft', 'biomasse', 'geothermie', 'wasserstoff', 'brennstoffzelle',
        'akku', 'ladegeraet', 'isolierung', 'daemmung', 'waermepumpe', 'pellet', 'hackschnitzel', 'fernwaerme',
        'blockheizkraftwerk', 'photovoltaik', 'brauchtum', 'folklore', 'volksfest', 'jahrmarkt', 'kirmes', 'rummelplatz',
        'karussell', 'riesenrad', 'achterbahn', 'autoscooter', 'geisterbahn', 'bude', 'losbude', 'schiessbude',
        'zuckerwatte', 'lebkuchen', 'brezel', 'bratwurst', 'pommes', 'ketchup', 'mayonnaise', 'krautsalat',
        'kartoffelsalat', 'sauerkraut', 'knoedel', 'spatzle', 'dampfnudel', 'kaiserschmarrn', 'strudel', 'apfelmus',
        'kompott', 'beleg', 'kassenbon', 'lieferschein', 'frachtbrief', 'zollerklaerung', 'manifest', 'inventar',
        'lager', 'bestand', 'vorrat', 'reserve', 'depot', 'tank', 'fass', 'tonne',
        'kanister', 'behaelter', 'container', 'karton', 'kiste', 'pappe', 'folie', 'plastik',
        'gummi', 'silikon', 'teflon', 'kevlar', 'glasfaser', 'kohlefaser', 'verbundstoff', 'legierung',
        'emaille', 'keramik', 'porzellan', 'steingut', 'terrakotta', 'majolika', 'fayence', 'klinker',
        'backstein', 'naturstein', 'feldstein', 'kopfstein', 'asphalt', 'teer', 'bitumen', 'schotter',
        'splitt', 'kiesel', 'geroell', 'findling', 'stalagmit', 'stalaktit', 'tropfstein', 'sinter',
        'kalktuff', 'travertin', 'gneis', 'glimmer', 'feldspat', 'hornblende', 'augit', 'olivin',
        'magnetit', 'pyrit', 'galenit', 'fluorit', 'calcit', 'dolomit', 'aragonit', 'anhydrit',
        'baryt', 'halogenid', 'sulfat', 'karbonat', 'silikat', 'oxid', 'phosphat', 'nitrat',
        'borat', 'saeuregruppe', 'base', 'neutral', 'puffer', 'indikator', 'titration', 'destillation',
        'extraktion', 'filtration', 'kristallisation', 'sublimation', 'kondensation', 'verdampfung', 'schmelzen', 'erstarren',
        'sieden', 'mischen', 'trennen', 'spalten', 'vereinen', 'faellen', 'oxidieren', 'reduzieren',
        'neutralisieren', 'hydrieren', 'dehydrieren', 'polymerisieren', 'fermentieren', 'katalysieren', 'synthetisieren', 'ouvertuere',
        'intermezzo', 'finale', 'kadenz', 'crescendo', 'diminuendo', 'fortissimo', 'pianissimo', 'staccato',
        'legato', 'vibrato', 'tremolo', 'arpeggio', 'glissando', 'pizzicato', 'dur', 'moll',
        'tonart', 'vorzeichen', 'kreuz', 'aufloesung', 'pause', 'note', 'halbe', 'viertel',
        'achtel', 'sechzehntel', 'ganze', 'punktierte', 'triole', 'synkope', 'notenschluessel', 'taktstrisch',
        'partitur', 'stimme', 'sopran', 'tenor', 'bass', 'flageolett', 'daempfer', 'plektrum',
        'saite', 'griffbrett', 'klangkoerper', 'schallloch', 'mundstick', 'rohrblatt', 'kehlkopf', 'stimmbad',
        'zwerchfell', 'brustkorb', 'luftroehre', 'gaumen', 'rachen', 'mandel', 'netzhaut', 'hornhaut',
        'pupille', 'iris', 'glaskoerper', 'sehnerv', 'augenbraue', 'wimper', 'augenlid', 'traenenkanal',
        'bindehaut', 'sklera', 'retina', 'macula', 'optikus', 'trommelfell', 'amboss', 'steigbuegel',
        'gleichgewicht', 'innenohr', 'aussenohr', 'mittelohr', 'gehoergang', 'ohrlaeppchen', 'ohrmuschel', 'schallwelle',
        'dezibel', 'ultraschall', 'infraschall', 'roentgen', 'kernspintomographie', 'computertomographie', 'endoskopie', 'biopsie',
        'blutbild', 'abstrich', 'narkose', 'anaesthesie', 'desinfektion', 'sterilisation', 'drainage', 'infusion',
        'transfusion', 'transplantation', 'prothese', 'implantat', 'stent', 'bypass', 'resektion', 'amputation',
        'rehabilitation', 'physiotherapie', 'ergotherapie', 'logopaedie', 'psychotherapie', 'akupunktur', 'homoeopathie', 'naturheilkunde',
        'praevention', 'vorsorge', 'impfpass', 'gesundheitszeugnis', 'arztbrief', 'befund', 'attest', 'facharzt',
        'hausarzt', 'notarzt', 'betriebsarzt', 'amtsarzt', 'chefarzt', 'oberarzt', 'assistenzarzt', 'pfleger',
        'rettungswagen', 'notaufnahme', 'intensivstation', 'operationssaal', 'kreisssaal', 'wartezimmer', 'sprechstunde', 'visite',
        'konsultation', 'anamnese', 'untersuchung', 'behandlung', 'nachsorge', 'grundrecht', 'menschenrecht', 'buergerrecht',
        'wahlrecht', 'stimmrecht', 'rederecht', 'versammlungsrecht', 'pressefreiheit', 'meinungsfreiheit', 'religionsfreiheit', 'reisefreiheit',
        'berufsfreiheit', 'eigentumsrecht', 'erbrecht', 'familienrecht', 'arbeitsrecht', 'strafrecht', 'zivilrecht', 'handelsrecht',
        'verwaltungsrecht', 'voelkerrecht', 'europarecht', 'seerecht', 'luftrecht', 'umweltrecht', 'steuerrecht', 'sozialrecht',
        'baurecht', 'mietrecht', 'patentrecht', 'medienrecht', 'sportrecht', 'klagefrist', 'einspruch', 'widerspruch',
        'beschwerde', 'kassation', 'verfassungsbeschwerde', 'verhandlung', 'anhoerung', 'beweisaufnahme', 'plaedoyer', 'urteilsverkuendung',
        'rechtskraft', 'vollstreckung', 'zwangsvollstreckung', 'bewilligung', 'genehmigung', 'erlaubnis', 'konzession', 'zulassung',
        'akkreditierung', 'zertifizierung', 'lizenzierung', 'handgelenk', 'oberarm', 'unterarm', 'oberschenkel', 'unterschenkel',
        'achillessehne', 'bandscheibe', 'schluesselbein', 'brustbein', 'steissbein', 'kreuzbein', 'wadenbein', 'schienbein',
        'speiche', 'elle', 'mittelfinger', 'ringfinger', 'zeigefinger', 'kleinfinger', 'handflaeche', 'handballen',
        'fussgewoelbe', 'fusssohle', 'fussruecken', 'augapfel', 'schmelz', 'zahnfleisch', 'gaumenegel', 'rachenmandel',
        'nebenhoeble', 'kieferhoehle', 'roggen', 'gerste', 'hafer', 'hirse', 'dinkel', 'weizen',
        'buchweizen', 'amaranth', 'quinoa', 'couscous', 'bulgur', 'polenta', 'graupen', 'griess',
        'kleie', 'schrot', 'muesli', 'cornflakes', 'haferflocken', 'rosine', 'walnuss', 'haselnuss',
        'cashew', 'pistazie', 'erdnuss', 'paranuss', 'kokosnuss', 'sesam', 'leinsamen', 'chiasamen',
        'sonnenblumenkern', 'kuemmel', 'anis', 'fenchel', 'safran', 'zimt', 'muskat', 'ingwer',
        'vanille', 'kardamom', 'paprikapulver', 'cayenne', 'chili', 'wasabi', 'kurkuma', 'kerbel',
        'estragon', 'majoran', 'liebstoeckel', 'bohnenkraut', 'lorbeer', 'wacholder', 'kapern', 'olive',
        'artischocke', 'aubergine', 'zucchini', 'kohlrabi', 'rettich', 'radieschen', 'ruebe', 'mangold',
        'rhabarber', 'spargel', 'mais', 'sojabohne', 'kichererbse', 'mungebohne', 'kidneybohne', 'schneegrenze',
        'baumgrenze', 'waldgrenze', 'schneefeld', 'gletscherzunge', 'moraene', 'erratiker', 'sandbank', 'watt',
        'priel', 'gezeiten', 'ebbe', 'brandung', 'gischt', 'duene', 'kliff', 'steilkueste',
        'flachkueste', 'meeresarm', 'meerenge', 'sund', 'foerde', 'ried', 'aue', 'polder',
        'deichvorland', 'schwemmland', 'alluvium', 'flussaue', 'bergsee', 'stausee', 'talsperre', 'weiher',
        'tuempel', 'pfuetze', 'lache', 'gumpe', 'speisekammer', 'ankleide', 'garderobe', 'empfangshalle',
        'konferenzraum', 'sitzungssaal', 'festsaal', 'tanzsaal', 'hoersaal', 'seminarraum', 'lesesaal', 'kartenzimmer',
        'archivraum', 'tresorraum', 'serverraum', 'heizungsraum', 'luftschutzkeller', 'weinkeller', 'bierkeller', 'eiskeller',
        'gewoelbekeller', 'souterrain', 'mansarde', 'penthouse', 'loft', 'maisonette', 'einzimmerwohnung', 'altbau',
        'neubau', 'rohbau', 'fertighaus', 'blockhaus', 'wasserwaage', 'lot', 'winkelmesser', 'bandmass',
        'zollstock', 'schablone', 'lehre', 'esse', 'blasebalg', 'schmelztiegel', 'gussform', 'pressform',
        'drehbank', 'fraese', 'schleifstein', 'schleifmaschine', 'bohrmaschine', 'kreissaege', 'stichsaege', 'bandsaege',
        'kettensaege', 'motorsaege', 'schweisspistole', 'loetkolben', 'heissluftpistole', 'heissklebepistole', 'nietzange', 'rohrzange',
        'crimpzange', 'abisolierzange', 'einrad', 'tandem', 'liegerad', 'lastenrad', 'motorroller', 'vespa',
        'quad', 'trike', 'gelaendewagen', 'cabrio', 'limousine', 'kombi', 'sportwagen', 'kleinwagen',
        'minivan', 'wohnmobil', 'anhaenger', 'sattelschlepper', 'muldenkipper', 'betonmischer', 'planierraupe', 'radlader',
        'minibagger', 'teleskoplader', 'anorak', 'parka', 'poncho', 'cape', 'umhang', 'stola',
        'cardigan', 'blazer', 'sakko', 'smoking', 'frack', 'gehrock', 'kutte', 'talar',
        'robe', 'leggins', 'shorts', 'bermuda', 'jeans', 'chino', 'jogginghose', 'latzhose',
        'knickerbocker', 'unterhemd', 'unterhose', 'boxershorts', 'slip', 'corsage', 'korsett', 'mieder',
        'strumpfhose', 'dissonanz', 'kontrast', 'balance', 'entspannung', 'entfaltung', 'verwirklichung', 'bestrebung',
        'ambitionen', 'zielstrebigkeit', 'beharrlichkeit', 'standhaftigkeit', 'unnachgiebigkeit', 'kompromiss', 'konsens', 'diskurs',
        'argument', 'begruendung', 'schlussfolgerung', 'ableitung', 'induktion', 'deduktion', 'abstraktion', 'generalisierung',
        'spezialisierung', 'differenzierung', 'integration', 'assimilation', 'akkulturation', 'zivilisation', 'gesellschaft', 'gemeinschaft',
        'solidaritaet', 'zusammenhalt', 'kooperation', 'kollaboration', 'partizipation', 'emanzipation', 'autonomie', 'souveraenitaet',
        'legitimation', 'autoritaet', 'hierarchie', 'buerokratie', 'meritokratie', 'atmen', 'schlucken', 'kauen',
        'beissen', 'lutschen', 'pusten', 'blasen', 'niesen', 'gaehnen', 'schnarchen', 'schluchzen',
        'weinen', 'lachen', 'laecheln', 'grinsen', 'zwinkern', 'starren', 'blicken', 'gucken',
        'schauen', 'beobachten', 'betrachten', 'mustern', 'lauschen', 'horchen', 'zuhoeren', 'mitsingen',
        'trommeln', 'klatschen', 'stampfen', 'nicken', 'schuetteln', 'wiegen', 'schaukeln', 'schwingen',
        'pendeln', 'taumeln', 'stolpern', 'straucheln', 'humpeln', 'hinken', 'watscheln', 'schlendern',
        'bummeln', 'flanieren', 'spazieren', 'hetzen', 'verfolgen', 'fliehen', 'fluechten', 'entkommen',
        'entweichen', 'entwischen', 'suchen', 'aufspueren', 'orten', 'lokalisieren', 'ermitteln', 'zaehlen',
        'berechnen', 'schaetzen', 'bewerten', 'beurteilen', 'einschaetzen', 'vergleichen', 'unterscheiden', 'abwaegen',
        'pruefen', 'testen', 'ueberwachen', 'inspizieren', 'warten', 'instandhalten', 'restaurieren', 'renovieren',
        'modernisieren', 'sanieren', 'umbauen', 'erweitern', 'vergroessern', 'verkleinern', 'verdichten', 'ausdehnen',
        'strecken', 'komprimieren', 'expandieren', 'schmied', 'mueller', 'weber', 'gerber', 'toepfer',
        'glaser', 'seiler', 'boettcher', 'stellmacher', 'wagner', 'sattler', 'kuerchner', 'hutmacher',
        'schuhmacher', 'buchbinder', 'setzer', 'lithograph', 'kupferstecher', 'holzschnitzer', 'steinmetz', 'stuckateur',
        'vergolder', 'imker', 'schaffer', 'winzer', 'brauer', 'destillateur', 'konditor', 'sommelier',
        'barkeeper', 'wecker', 'thermoskanne', 'wasserkocher', 'kaffeemaschine', 'entsafter', 'dampfgarer', 'fritteuse',
        'eismaschine', 'brotmaschine', 'kuechenwaage', 'messbecher', 'backform', 'auflaufform', 'bratpfanne', 'wok',
        'fondue', 'raclette', 'grillzange', 'grillrost', 'holzkohle', 'anzuender', 'feuerstelle', 'aschenbecker',
        'papierkorb', 'muelleimer', 'muellsack', 'kehrichtschaufel', 'staubwedel', 'fensterputzer', 'abzieher', 'schwammtuch',
        'photosynthese', 'osmose', 'kapillarwirkung', 'oberflaeche', 'grenzflaeche', 'membran', 'pore', 'vakuum',
        'partikel', 'aerosol', 'kolloid', 'suspension', 'emulsion', 'schaum', 'gel', 'kristallgitter',
        'bindungsenergie', 'ionisierung', 'valenz', 'orbital', 'quantenzahl', 'wellenlaenge', 'polarisation', 'kohaerenz',
        'dekohaerenz', 'superposition', 'verschraenkung', 'tunneleffekt', 'unschaerfe', 'steilwand', 'felswand', 'ueberhang',
        'vorsprung', 'gesims', 'nische', 'hoehleneingang', 'felsspalte', 'gesteinsschicht', 'sediment', 'ablagerung',
        'verwitterung', 'abtragung', 'aufschuettung', 'anhaeufung', 'grundwasser', 'quellwasser', 'trinkwasser', 'abwasser',
        'regenwasser', 'schmelzwasser', 'hochwasser', 'niedrigwasser', 'pegelpunkt', 'wasserstand', 'stroemung', 'kaskade',
        'stromschnelle', 'furt', 'boerse', 'kurs', 'hausse', 'baisse', 'bulle', 'spekulation',
        'portfolio', 'derivat', 'option', 'future', 'swap', 'anlage', 'buchfuehrung', 'jahresabschluss',
        'gewinnrechnung', 'kostenrechnung', 'budgetierung', 'finanzplan', 'liquiditaet', 'solvenz', 'rating', 'risiko',
        'hedging', 'diversifikation', 'marge', 'deckungsbeitrag', 'drehbuch', 'storyboard', 'montage', 'blende',
        'einstellung', 'kamerafahrt', 'schwenk', 'nahaufnahme', 'totale', 'halbtotale', 'untersicht', 'aufsicht',
        'synchronisation', 'untertitel', 'dubbing', 'vertonung', 'sounddesign', 'filmmusik', 'soundtrack', 'jingle',
        'werbung', 'reklame', 'plakat', 'flugblatt', 'prospekt', 'broschuere', 'amnestie', 'begnadigung',
        'wiedergutmachung', 'entschaedigung', 'schadensersatz', 'schmerzensgeld', 'unterhalt', 'sorgerecht', 'umgangsrecht', 'aufenthaltsrecht',
        'asylrecht', 'einbuergerung', 'abschiebung', 'auslieferung', 'haftbefehl', 'durchsuchung', 'beschlagnahme', 'pfaendung',
        'zwangsraeumung', 'vollstreckungstitel', 'mahngericht', 'mahnbescheid', 'vollstreckungsbescheid', 'walzer', 'polka', 'mazurka',
        'menuett', 'gavotte', 'sarabande', 'gigue', 'allemande', 'courante', 'bourree', 'passacaglia',
        'chaconne', 'rondo', 'scherzo', 'nocturne', 'etude', 'caprice', 'impromptu', 'rhapsodie',
        'fantasie', 'variation', 'projektor', 'beamer', 'whiteboard', 'smartboard', 'schulbuch', 'lehrbuch',
        'woerterbuch', 'lexikon', 'enzyklopaedie', 'globus', 'praeparat', 'reagenzglas', 'pipette', 'bunsenbrenner',
        'erlenmeyerkolben', 'rundkolben', 'messzylinder', 'petrischale', 'objekttraeger', 'deckglas', 'zentrifuge', 'ringrichter',
        'linienrichter', 'zeitnehmer', 'punktrichter', 'kampfrichter', 'steuermann', 'bugmann', 'schlussmann', 'fluegelspieler',
        'auswechselbank', 'kabine', 'umkleide', 'duschraum', 'massagebank', 'trainingsplatz', 'sportplatz', 'hartplatz',
        'rasenplatz', 'kunstrasen', 'tartanbahn', 'aschenbahn', 'sprunggrube', 'wurfring', 'passatwind', 'monsun',
        'foehn', 'mistral', 'scirocco', 'chinook', 'zephyr', 'bora', 'tiefdruckgebiet', 'hochdruckgebiet',
        'warmfront', 'kaltfront', 'okklusion', 'zyklone', 'antizyklone', 'isobare', 'marderhund', 'waschbaer',
        'stinktier', 'guerteltier', 'faultier', 'tapir', 'okapi', 'bison', 'moschusochse', 'yak',
        'lama', 'kamel', 'dromedar', 'gazelle', 'antilope', 'gnu', 'bueffel', 'wisent',
        'rentier', 'karibu', 'wapiti', 'damhirsch', 'mufflon', 'berberaffe', 'pavian', 'lemur',
        'gibbon', 'orang', 'gorilla', 'schimpanse', 'bonobo', 'azalee', 'rhododendron', 'magnolie',
        'kamelie', 'gardenie', 'jasmin', 'hibiskus', 'bougainvillea', 'clematis', 'wisterie', 'glyzinie',
        'passionsblume', 'kapuzinerkresse', 'ringelblume', 'kornblume', 'mohn', 'primel', 'krokus', 'narzisse',
        'hyazinthe', 'gladiole', 'freesie', 'gerbera', 'chrysantheme', 'blockchain', 'kryptografie', 'hash',
        'token', 'firmware', 'treiber', 'schnittstelle', 'datenleitung', 'breitband', 'satellit', 'frequenzband',
        'modulation', 'demodulation', 'codec', 'pixel', 'framerate', 'bitrate', 'latenz', 'durchsatz',
        'overhead', 'empathie', 'apathie', 'sympathie', 'antipathie', 'ambivalenz', 'resilienz', 'vulnerabilitaet',
        'burnout', 'mobbing', 'achtsamkeit', 'selbstwert', 'selbstbild', 'identifikation', 'projektion', 'sublimierung',
        'verdraengung', 'rationalisierung', 'kompensation', 'fixierung', 'introversion', 'extroversion', 'temperament', 'origami',
        'kalligrafie', 'aquarellmalerei', 'oelmalerei', 'seidenmalerei', 'porzellanmalerei', 'glasmalerei', 'holzbrandmalerei', 'korbflechten',
        'perlenarbeit', 'schmuckherstellung', 'kerzenziehen', 'seifensieden', 'marmorieren', 'decoupage', 'scrapbooking', 'geheimnis',
        'abenteuer', 'versprechen', 'begegnung', 'erinnerung', 'erlebnis', 'augenblick', 'moment', 'stimmung',
        'atmosphaere', 'umgebung', 'daemmerung', 'morgendaemmerung', 'abenddaemmerung', 'mondschein', 'sternenlicht', 'sonnenaufgang',
        'sonnenuntergang', 'regenbogen', 'polarlicht', 'wetterleuchten', 'abendrot', 'morgenrot', 'mittagshitze', 'abendkuehle',
        'nachtfrost', 'fruehreif', 'spaetlese', 'bluetenstaub', 'honigtau', 'vogelgesang', 'froschkonzert', 'grillenzirpen',
        'bienengesumm', 'blattwerk', 'geaest', 'unterholz', 'waldrand', 'waldlichtung', 'waldpfad', 'holzweg',
        'trampelpfad', 'seitenweg', 'querweg', 'rundweg', 'fernwanderweg', 'steilhang', 'sanfthang', 'suedseite',
        'nordseite', 'ostseite', 'westseite', 'windseite', 'schattenseite', 'sonnenseite', 'wetterseite', 'talseite',
        'bergseite', 'wasserseite', 'landseite', 'flussseite', 'seeseite', 'baumkrone', 'baumstamm', 'baumwurzel',
        'baumrinde', 'jahresring', 'kernholz', 'splintholz', 'borke', 'flechte', 'alge', 'tang',
        'seetang', 'seegras', 'schilf', 'binse', 'rohrkolben', 'treibholz', 'schwemmholz', 'totholz',
        'altholz', 'brennholz', 'feuerholz', 'scheitholz', 'kaminholz', 'steinmauer', 'trockenmauer', 'feldmauer',
        'grenzmauer', 'stuetzmauer', 'brandmauer', 'schallmauer', 'zeitschranke', 'lichtschranke', 'barriere', 'hindernis',
        'hemmnis', 'engpass', 'flaschenhals', 'nadeloehr', 'durchbruch', 'rueckschritt', 'stillstand', 'aufbruch',
        'einbruch', 'umbruch', 'ausbruch', 'zusammenbruch', 'neuanfang', 'wiederbeginn', 'neubeginn', 'fruehlingsanfang',
        'sommeranfang', 'herbstanfang', 'winteranfang', 'jahreswechsel', 'ankerpunkt', 'anlaufstelle', 'anreiz', 'anregung',
        'ansporn', 'antrieb', 'auftakt', 'ausgleich', 'beispiel', 'bekenntnis', 'belobigung', 'besinnung',
        'bewaeltigung', 'bezugspunkt', 'bindeglied', 'blickfang', 'bollwerk', 'brennpunkt', 'brueckenkopf', 'eckpfeiler',
        'eckstein', 'eigenart', 'eigensinn', 'einblick', 'eindruck', 'einfallsreichtum', 'einfluss', 'einklang',
        'einzelheit', 'empfindung', 'entscheidung', 'entzueckung', 'erfahrungswert', 'erfuellung', 'ergebenheit', 'erhebung',
        'erholung', 'erkundung', 'erleuchtung', 'ernst', 'errungenschaft', 'erwartung', 'feingefuehl', 'feinheit',
        'felsblock', 'festigkeit', 'findigkeit', 'fingerspitzengefuehl', 'fuersorge', 'fundgrube', 'funkeln', 'geborgenheit',
        'gedanke', 'gefaess', 'geflecht', 'gefuehl', 'gegend', 'gegensatz', 'gegenstand', 'gegenstroemung',
        'gegenwart', 'gehalt', 'gehorsam', 'gelassenheit', 'geltung', 'gemeinwohl', 'genesung', 'genuss',
        'gepflogenheit', 'geradlinigkeit', 'geschick', 'geschmeidigkeit', 'gestaltung', 'getreide', 'gewandtheit', 'gewissheit',
        'glueckseligkeit', 'grundlage', 'grundsatz', 'haltung', 'hauptsache', 'heilmittel', 'herausforderung', 'herkunft',
        'herzlichkeit', 'hintergrund', 'hochachtung', 'innigkeit', 'irrweg', 'kampfgeist', 'kernpunkt', 'klarheit',
        'klugheit', 'kostbarkeit', 'kuenheit', 'kunstfertigkeit', 'landesgrenze', 'lebensfreude', 'lebensweg', 'leidenschaft',
        'leitgedanke', 'leitmotiv', 'leuchtfeuer', 'lichtblick', 'lichtstrahl', 'markstein', 'meisterwerk', 'merkmal',
        'meilenstein', 'mitbestimmung', 'mitsprache', 'mitstreiter', 'mittelpunkt', 'nachbar', 'nachdruck', 'nachfolger',
        'nachlese', 'nachsicht', 'nachteil', 'naechstenliebe', 'naturgesetz', 'naturkraft', 'neigung', 'neuerscheinung',
        'notwendigkeit', 'obhut', 'offenheit', 'ohnmacht', 'pflichtbewusstsein', 'querdenker', 'rauheit', 'rausch',
        'reichtum', 'reinheit', 'rohstoff', 'rueckblick', 'rueckhalt', 'rueckzug', 'scharfsinn', 'schlichtheit',
        'schoenheit', 'schoepfung', 'schwachstelle', 'schwerpunkt', 'seelenruhe', 'segnung', 'selbstvertrauen', 'sicherheit',
        'sinnbild', 'sorgfalt', 'spannweite', 'spielraum', 'spitzname', 'sprungkraft', 'standbein', 'sternstunde'
    ];

    // Cryptographically secure random number — rejection sampling eliminates modulo bias
    function secureRandom(max) {
        const limit = Math.floor(0x100000000 / max) * max;
        const array = new Uint32Array(1);
        do {
            crypto.getRandomValues(array);
        } while (array[0] >= limit);
        return array[0] % max;
    }

    // Generate passphrase
    window.generatePassphrase = function() {
        const wordCount = parseInt(document.getElementById('word-count').value);
        const separator = document.getElementById('separator').value;
        const addNumber = document.getElementById('add-number').checked;
        const capitalize = document.getElementById('capitalize').checked;

        let words = [];
        const usedIndices = new Set();

        // Select random words without repetition
        while (words.length < wordCount) {
            const index = secureRandom(wordList.length);
            if (!usedIndices.has(index)) {
                usedIndices.add(index);
                let word = wordList[index];
                if (capitalize) {
                    word = word.charAt(0).toUpperCase() + word.slice(1);
                }
                words.push(word);
            }
        }

        let passphrase = words.join(separator);

        // Add number if requested
        if (addNumber) {
            const num = secureRandom(100);
            passphrase += separator + num;
        }

        // Display result
        document.getElementById('passphrase-output').value = passphrase;
        document.getElementById('generated-passphrase').classList.remove('hidden');

        // Calculate entropy
        const entropy = calculateEntropy(passphrase, wordCount, addNumber);
        document.getElementById('entropy-info').innerHTML =
            '&#128274; Entropie: ~' + entropy + ' Bits ' +
            '(' + getEntropyLabel(entropy) + ')';
    };

    function calculateEntropy(passphrase, wordCount, hasNumber) {
        // Each word from a 4096-word list ≈ 12 bits
        // Plus number adds ~6.6 bits (0-99)
        let bits = wordCount * Math.log2(wordList.length);
        if (hasNumber) bits += Math.log2(100);
        return Math.round(bits);
    }

    function getEntropyLabel(bits) {
        if (bits < 40) return 'schwach';
        if (bits < 60) return 'akzeptabel';
        if (bits < 80) return 'stark';
        return 'sehr stark';
    }

    // Copy to clipboard
    window.copyPassphrase = function() {
        const output = document.getElementById('passphrase-output');
        output.select();

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(output.value).then(function() {
                showCopyFeedback(true);
            }).catch(function() {
                showCopyFeedback(false);
            });
        } else {
            try {
                document.execCommand('copy');
                showCopyFeedback(true);
            } catch (err) {
                showCopyFeedback(false);
            }
        }
    };

    function showCopyFeedback(success) {
        const btn = document.querySelector('#generated-passphrase .btn-secondary');
        const originalText = btn.textContent;
        btn.textContent = success ? '✓ Kopiert!' : '✗ Fehler';
        setTimeout(function() {
            btn.textContent = originalText;
        }, 2000);
    }

    // Test passphrase strength
    window.testPassphrase = function() {
        const passphrase = document.getElementById('test-passphrase').value;
        const resultDiv = document.getElementById('strength-result');

        if (passphrase.length === 0) {
            resultDiv.classList.add('hidden');
            return;
        }

        resultDiv.classList.remove('hidden');

        const strength = analyzeStrength(passphrase);
        const bar = document.getElementById('strength-bar');
        const label = document.getElementById('strength-label');
        const tips = document.getElementById('strength-tips');

        // Reset classes
        bar.className = 'strength-bar';

        if (strength.score < 25) {
            bar.classList.add('strength-weak');
            label.innerHTML = '&#128308; <strong>Schwach</strong> - Leicht zu knacken';
        } else if (strength.score < 50) {
            bar.classList.add('strength-fair');
            label.innerHTML = '&#128992; <strong>Akzeptabel</strong> - Könnte besser sein';
        } else if (strength.score < 75) {
            bar.classList.add('strength-good');
            label.innerHTML = '&#128994; <strong>Gut</strong> - Schwer zu erraten';
        } else {
            bar.classList.add('strength-strong');
            label.innerHTML = '&#128154; <strong>Stark</strong> - Ausgezeichnet!';
        }

        // Show tips
        if (strength.tips.length > 0) {
            tips.innerHTML = '<li>' + strength.tips.join('</li><li>') + '</li>';
        } else {
            tips.innerHTML = '<li>Sehr gute Passphrase!</li>';
        }
    };

    function analyzeStrength(passphrase) {
        let score = 0;
        const tips = [];

        // Length
        if (passphrase.length >= 20) {
            score += 30;
        } else if (passphrase.length >= 15) {
            score += 20;
        } else if (passphrase.length >= 10) {
            score += 10;
        } else {
            tips.push('Mindestens 15 Zeichen empfohlen');
        }

        // Word count (spaces or separators)
        const words = passphrase.split(/[\s\-_\.]+/);
        if (words.length >= 5) {
            score += 30;
        } else if (words.length >= 4) {
            score += 20;
        } else if (words.length >= 3) {
            score += 10;
        } else {
            tips.push('Mehr Wörter machen die Passphrase stärker');
        }

        // Character variety
        const hasLower = /[a-z]/.test(passphrase);
        const hasUpper = /[A-Z]/.test(passphrase);
        const hasNumber = /[0-9]/.test(passphrase);
        const hasSpecial = /[^a-zA-Z0-9\s]/.test(passphrase);

        let variety = 0;
        if (hasLower) variety++;
        if (hasUpper) variety++;
        if (hasNumber) variety++;
        if (hasSpecial) variety++;

        score += variety * 10;

        if (!hasNumber && !hasSpecial) {
            tips.push('Eine Zahl oder Sonderzeichen könnte helfen');
        }

        // Common patterns to avoid
        const commonPatterns = [
            /^123/, /123$/, /password/i, /passwort/i, /qwerty/i,
            /^admin/i, /letmein/i, /welcome/i, /monkey/i
        ];

        for (const pattern of commonPatterns) {
            if (pattern.test(passphrase)) {
                score -= 20;
                tips.push('Vermeide häufige Muster wie "123" oder "password"');
                break;
            }
        }

        // Repetition penalty
        if (/(.)\1{2,}/.test(passphrase)) {
            score -= 10;
            tips.push('Vermeide wiederholte Zeichen');
        }

        return {
            score: Math.max(0, Math.min(100, score)),
            tips: tips
        };
    }

    // Toggle password visibility
    window.toggleVisibility = function() {
        const input = document.getElementById('test-passphrase');
        input.type = input.type === 'password' ? 'text' : 'password';
    };

})();
