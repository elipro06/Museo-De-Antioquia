import { findApproxKeyword, normalizeText } from './chatbotText';

export const CHATBOT_PDF_SOURCES = [
	{
		title: 'Informacion Front',
		path: 'public/assets/images/Documento/Informacion Front (6) (1).pdf',
		originalPath: 'public/assets/images/Documento/Información Front (6) (1).pdf',
		pages: 95,
	},
];

export const PDF_READY_NOTE = 'Museum PDF loaded into the local knowledge base.';

export const PDF_KNOWLEDGE_ENTRIES = [
	{
		id: 'museo-360',
		keywords: ['museo 360', 'palacio municipal', '80 puertas', 'casa del encuentro historia', 'maria del rosario escobar', 'conocenos'],
		textEs: 'El Museo de Antioquia impulsa el proyecto Museo 360 desde el Palacio Municipal, aprovechando sus multiples accesos para conectar las colecciones con el centro de Medellin y con programas como Calle Museo, Dialogos con Sentido, La Banca Azul, El Caldero y Ver para Leer. Tambien resalta el trabajo con la Casa del Encuentro y las comunidades del entorno como parte central de la mision del museo.',
		textEn: 'The Museum of Antioquia advances the Museo 360 project from the Palacio Municipal, using its many entrances to connect the collection with downtown Medellin and with programs such as Calle Museo, Dialogos con Sentido, La Banca Azul, El Caldero, and Ver para Leer. It also highlights Casa del Encuentro and community work around the museum as central to the institution\'s mission.',
	},
	{
		id: 'programas-educacion',
		keywords: ['exploradores del arte', 'dialogos con sentido', 'visual lab', 'calle museo', 'laboratorio de mediacion', 'yo maestre', 'programas educativos', 'programas del museo', 'education programs', 'teacher program'],
		textEs: 'La oferta educativa incluye programas concretos: Exploradores del Arte para ninos y ninas de 2 a 5 anos; Dialogos con Sentido para infancias entre 6 y 12 anos del centro de Medellin; Visual Lab para jovenes entre 13 y 18 anos; Calle Museo como experiencia artistica y territorial; Laboratorio de Mediacion para mediadores, artistas y agentes culturales; y Yo Maestre como formacion para docentes que usan el museo como aula expandida.',
		textEn: 'The education offer includes specific programs: Exploradores del Arte for children ages 2 to 5; Dialogos con Sentido for children ages 6 to 12 in downtown Medellin; Visual Lab for teenagers ages 13 to 18; Calle Museo as an artistic and territorial experience; Laboratorio de Mediacion for mediators, artists, and cultural agents; and Yo Maestre as teacher training that uses the museum as an expanded classroom.',
	},
	{
		id: 'casa-del-encuentro',
		keywords: ['casa del encuentro', 'pedrito botero', 'rasgaversos', '52con52', 'club de lectura', 'club de collage', 'club de experimentacion', 'sala de mediacion'],
		textEs: 'La Casa del Encuentro, junto al edificio central, es el espacio donde el museo desarrolla acciones educativas, artisticas y comunitarias en dialogo con las colecciones y exposiciones. Alli funciona la Sala de Mediacion Pedrito Botero con los talleres Lola Velez, Ethel Gilmour y Dora Ramirez, y tambien se anuncian actividades como el club de collage RasgaVersos, el club de lectura 52con52 y el Club de Experimentacion en Artes Plasticas.',
		textEn: 'Casa del Encuentro, next to the main museum building, is the space where the museum develops educational, artistic, and community actions in dialogue with the collection and exhibitions. It includes the Pedrito Botero Mediation Room with the Lola Velez, Ethel Gilmour, and Dora Ramirez workshops, as well as activities such as the RasgaVersos collage club, the 52con52 reading club, and the Visual Arts Experimentation Club.',
	},
	{
		id: 'biblioteca',
		keywords: ['biblioteca', 'library', 'centro de documentacion fernando botero', 'hemeroteca', 'lectura en sala', 'prestamo', 'referencia especializada', 'visitas guiadas biblioteca'],
		textEs: 'La Biblioteca del Museo de Antioquia existe desde la fundacion del museo en 1881 y hoy es una unidad especializada en artes plasticas y visuales. Sus colecciones abarcan arte, arquitectura, fotografia, museologia, literatura y memoria institucional. Ofrece servicios como afiliacion, circulacion y prestamo, referencia especializada, lectura en sala, visitas guiadas y el Centro de Documentacion Fernando Botero.',
		textEn: 'The Museum of Antioquia Library has existed since the museum\'s foundation in 1881 and is now a specialized information unit for visual arts. Its collections cover art, architecture, photography, museology, literature, and institutional memory. It offers services such as membership, circulation and loans, specialized reference, reading room access, guided visits, and the Fernando Botero Documentation Center.',
	},
	{
		id: 'horarios-tarifas-visita',
		keywords: ['horarios', 'tarifas', 'price', 'prices', 'ticket', 'tickets', 'gratis', 'free admission', 'animales de soporte emocional', 'support animal', 'fotografias', 'flash'],
		textEs: 'El museo abre de lunes a viernes de 10:00 a.m. a 5:30 p.m. y sabados, domingos y festivos de 10:00 a.m. a 4:30 p.m. Las tarifas son COP 18.000 para nacionales, COP 46.000 para extranjeros y COP 14.000 para estudiantes y mayores de 62 anos, con ingreso gratuito para varios grupos locales. Tambien recuerda que los alimentos solo se consumen en cafe y restaurante, en la Sala Botero no se toman fotos y en las otras salas deben ser sin flash.',
		textEn: 'The museum opens Monday to Friday from 10:00 a.m. to 5:30 p.m. and Saturdays, Sundays, and holidays from 10:00 a.m. to 4:30 p.m. Ticket prices are COP 18,000 for Colombian visitors, COP 46,000 for international visitors, and COP 14,000 for students and visitors over 62, with free admission for several local visitor groups. It also reminds visitors that food is only allowed in the cafe and restaurant areas, photography is not allowed in the Botero galleries, and photos in other galleries should be taken without flash.',
	},
	{
		id: 'como-llegar-parqueadero',
		keywords: ['como llegar', 'donde queda', 'ubicacion', 'metro', 'bus', 'carro', 'parking', 'parqueadero', 'cundinamarca', 'parque berrio'],
		textEs: 'El museo esta en Carrera 52 #52-43, cerca al Parque Berrio. Se puede llegar por el pasaje peatonal Carabobo desde la estacion Parque Berrio, por rutas de bus al centro, o en carro entrando por Cundinamarca. El parqueadero 2026 tiene hora carro COP 5.200, jornada de 12 horas COP 22.500, tiquetera de 10 dias COP 202.000 y mensualidad de moto COP 59.000; horario lunes a sabado de 6:20 a.m. a 9:00 p.m. y domingos y festivos de 9:45 a.m. a 5:00 p.m.',
		textEn: 'The museum is at Carrera 52 #52-43, near Parque Berrio. Visitors can arrive through the Carabobo pedestrian passage from Parque Berrio Station, by downtown bus routes, or by car entering through Cundinamarca. The 2026 parking rates are COP 5,200 per car hour, COP 22,500 for a 12-hour car stay, COP 202,000 for a 10-day pass, and COP 59,000 for a monthly motorcycle pass; hours are Monday to Saturday from 6:20 a.m. to 9:00 p.m. and Sundays and holidays from 9:45 a.m. to 5:00 p.m.',
	},
	{
		id: 'pisos-espacios-servicios',
		keywords: ['pisos', 'piso 1', 'piso 2', 'piso 3', 'sotano', 'floor', 'layout', 'mapa del museo', 'espacios', 'cafe urbania', 'laboratorio del cafe', 'el social', 'bukz'],
		textEs: 'El museo se organiza por niveles: en piso -1 hay sala de exposiciones temporales; en piso 1 estan El Barro Tiene Voz, Persistencia del Dogma, otra sala temporal y Ver para Leer; en piso 2 estan Historias para Repensar, Promesas de la Modernidad y la Sala Mural Botero; en piso 3 estan la Sala Fernando Botero, la coleccion internacional Sophia Vari y la Sala del Consejo. Tambien destaca servicios como Cafe Urbania en la terraza Sophia, Laboratorio del Cafe, Restaurante El Social, Libreria Bukz y la Tienda Museo de Antioquia.',
		textEn: 'The museum is organized by levels: floor -1 hosts a temporary exhibition gallery; floor 1 includes El Barro Tiene Voz, Persistencia del Dogma, another temporary gallery, and Ver para Leer; floor 2 includes Histories to Rethink, Promises of Modernity, and the Botero Mural Room; floor 3 includes the Fernando Botero galleries, the Sophia Vari international collection, and the Council Room. It also highlights services such as Cafe Urbania on the Sophia Terrace, the Coffee Lab, El Social Restaurant, Bukz Bookstore, and the Museum Store.',
	},
	{
		id: 'restaurantes-servicios',
		keywords: ['restaurante', 'restaurantes', 'restaurant', 'restaurants', 'cafe urbania', 'laboratorio del cafe', 'el social', 'comer', 'eat', 'food', 'coffee', 'dining'],
		textEs: 'En servicios de comida y bebida, el museo destaca Cafe Urbania en la terraza Sophia, el Laboratorio del Cafe y el Restaurante El Social. Tambien aparece la Libreria Bukz como servicio complementario dentro de la experiencia de visita.',
		textEn: 'For food and drink services, the museum highlights Cafe Urbania on the Sophia Terrace, the Coffee Lab, and El Social Restaurant. Bukz Bookstore also appears as a complementary service within the visit experience.',
	},
	{
		id: 'recorridos-grupos',
		keywords: ['recorridos mediados', 'guided tours', 'mediadores', 'botero mas alla del volumen', 'identidades en transito', 'memorias en tension', 'territorios en movimiento', 'en tiempo presente', 'cartografia esencial', 'grupos'],
		textEs: 'Los recorridos mediados semanales son: lunes 11:00 a.m. Botero mas alla del volumen en ingles; martes 3:30 p.m. Identidades en transito; miercoles 3:30 p.m. Memorias en tension; jueves 3:30 p.m. Territorios en movimiento; viernes 3:30 p.m. En tiempo presente; y sabado 3:30 p.m. Cartografia esencial. Para grupos, el museo cuenta con mediadores y la agenda depende de su disponibilidad, por lo que conviene pedir una fecha tentativa y confirmarla por WhatsApp.',
		textEn: 'The weekly guided routes are: Monday 11:00 a.m. Botero Beyond the Volume in English; Tuesday 3:30 p.m. Shifting Identities; Wednesday 3:30 p.m. Memories under Pressure; Thursday 3:30 p.m. Territories on the Move; Friday 3:30 p.m. The Present Moment; and Saturday 3:30 p.m. Essential Cartography. For groups, the museum works with mediators and the schedule depends on their availability, so visitors should request a tentative date and confirm it by WhatsApp.',
	},
	{
		id: 'tienda',
		keywords: ['tienda', 'store', 'bookstore', 'libro botero', 'panoleta', 'hoodie', 'agenda botero', 'afiche', 'abanico', 'willys', 'mini bar', 'perchero'],
		textEs: 'La tienda incluye referencias concretas del catalogo: Libro Botero y el Museo de Antioquia, separador magnetico, panoletas, hoodie Obra Botero, agenda o libreta Botero, afiches de reproduccion, abanico en iraca, Willys grande huila, mini bar de resina y perchero. Todo se concentra en la Tienda Museo de Antioquia y en la web tiendamuseodeantioquia.co.',
		textEn: 'The store includes concrete catalog references: the book Botero y el Museo de Antioquia, a magnetic bookmark, scarves, the Obra Botero hoodie, the Botero agenda or notebook, reproduction posters, an iraca hand fan, the Willys Grande Huila craft piece, a resin mini bar, and a coat rack. These are part of the Museum Store and its website at tiendamuseodeantioquia.co.',
	},
	{
		id: 'derivas-curatorial',
		keywords: ['derivas de lo indeleble', 'trans travesti', 'que otros sean lo normal', 'derivas', 'narrativas trans', 'travesti narratives'],
		textEs: 'Derivas de lo indeleble plantea una exposicion desde perspectivas y potencias creativas trans y travestis. La muestra se entiende como un acto de urgencia politica y afectiva frente a historias de exclusion, y busca tensionar las narrativas oficiales de ciudad, historia y cultura desde memorias encarnadas, deseo, archivo vivo y practicas colectivas.',
		textEn: 'Derivas de lo indeleble approaches the exhibition from trans and travesti perspectives and creative power. It is framed as an urgent political and affective gesture in response to histories of exclusion, challenging official narratives of the city, history, and culture through embodied memory, desire, living archives, and collective practices.',
	},
	{
		id: 'simulacro-curatorial',
		keywords: ['simulacro de lo imposible', 'laboratorio de practicas artisticas', 'simulacro', 'artificio', 'satira', 'metaficcion'],
		textEs: 'Simulacro de lo Imposible se presenta como un laboratorio de practicas artisticas para crisis contemporaneas. Explora el artificio, la simulacion y la falsificacion como estrategias criticas para desmontar ficciones del poder. La muestra trabaja con ironia, metaficcion, archivo intervenido y experimentacion para abrir grietas en aquello que solemos asumir como real.',
		textEn: 'Simulacro de lo Imposible is presented as a laboratory of artistic practices for contemporary crises. It explores artifice, simulation, and falsification as critical strategies to dismantle fictions of power. The exhibition works with irony, metafiction, intervened archives, and experimentation to open cracks in what is often taken for granted as real.',
	},
	{
		id: 'frijol-curatorial',
		keywords: ['uno de frijol cuatro de maiz', 'frijol', 'maiz', 'alimento', 'bodegon', 'food archive'],
		textEs: 'Uno de Frijol Cuatro de Maiz usa el alimento como archivo cultural para hablar de jerarquias sociales, conflictos economicos, heridas coloniales, afectos e identidades. La curaduria conecta bodegones, utensilios, archivo y obras de distintas epocas para preguntar que revelan las imagenes de comida sobre este territorio y sobre la dimension politica de lo cotidiano.',
		textEn: 'Uno de Frijol Cuatro de Maiz uses food as a cultural archive to address social hierarchies, economic conflicts, colonial wounds, affection, and identity. The curatorial approach connects still lifes, utensils, archival material, and works from different periods to ask what images of food reveal about this territory and about the political dimension of everyday life.',
	},
	{
		id: 'variaciones-curatorial',
		keywords: ['variaciones del presente', 'museo 360 arte del presente', 'archivo de lo comun', 'radicalidad en la comprension de lo existente', 'variaciones'],
		textEs: 'Variaciones del Presente es el resultado de un proceso de cerca de diez anos vinculado a Museo 360. La exposicion trabaja con el archivo de lo comun, la vida cotidiana y la relacion entre arte contemporaneo, comunidades y ciudad. Su apuesta es que los problemas del arte se conecten con las circunstancias de la vida diaria y con nuevas formas de habitar el museo.',
		textEn: 'Variaciones del Presente is the result of nearly ten years of work connected to Museo 360. The exhibition engages the archive of the ordinary, everyday life, and the relationship between contemporary art, communities, and the city. Its wager is that the questions of art should connect with daily life and with new ways of inhabiting the museum.',
	},
	{
		id: 'dogma-curatorial',
		keywords: ['persistencia del dogma', 'dogma', 'dialogos descoloniales', 'religion catolica', 'cielo purgatorio infierno'],
		textEs: 'Persistencia del Dogma reune alrededor de 150 obras y documentos desde el periodo precolombino hasta la contemporaneidad para cuestionar como las imagenes han moldeado valores, normas y jerarquias sociales. La sala relee imaginarios barrocos, coloniales y republicanos desde una mirada critica contemporanea, y se estructura alrededor de los ejes cielo, purgatorio e infierno.',
		textEn: 'Persistencia del Dogma brings together around 150 works and documents from the pre-Columbian period to the present to question how images have shaped values, norms, and social hierarchies. The gallery rereads baroque, colonial, and republican imaginaries from a contemporary critical perspective, structured around the axes of heaven, purgatory, and hell.',
	},
	{
		id: 'barro-curatorial',
		keywords: ['el barro tiene voz', 'barro', 'ceramica', 'raquira', 'la chamba', 'momil', 'el carmen de viboral'],
		textEs: 'El Barro Tiene Voz propone leer piezas prehispanicas, artesanales y contemporaneas no solo por su antiguedad sino por las historias y afectos que activan en el presente. Reune ceramicas de distintos tiempos y regiones para mostrar que el barro y la arcilla conectan memoria, tradicion, comunidad y arte contemporaneo.',
		textEn: 'El Barro Tiene Voz proposes reading pre-Hispanic, artisanal, and contemporary pieces not only through their age but through the stories and affective connections they activate in the present. It brings together ceramics from different times and regions to show how clay links memory, tradition, community, and contemporary art.',
	},
	{
		id: 'modernidad-curatorial',
		keywords: ['promesas de la modernidad', 'modernidad', 'bienales coltejer', 'arte urbano', '1950 1999'],
		textEs: 'Promesas de la Modernidad examina como la modernidad en Antioquia y Colombia combino promesas de progreso con desigualdad, luchas sociales y cambios profundos en la sensibilidad estetica. El recorrido atraviesa obras entre 1950 y 1999, pasando por imaginarios de lo moderno, las Bienales de Coltejer y el arte posterior a ese gran momento.',
		textEn: 'Promesas de la Modernidad examines how modernity in Antioquia and Colombia combined promises of progress with inequality, social struggle, and deep changes in aesthetic sensibility. The route moves through works from 1950 to 1999, including imaginaries of the modern, the Coltejer Biennials, and the art that followed that major moment.',
	},
	{
		id: 'historias-curatorial',
		keywords: ['historias para repensar', 'histories to rethink', 'biblioteca publica piloto', 'fotografia historica', 'historiografia'],
		textEs: 'Historias para Repensar invita a revisar criticamente la historiografia del arte en Antioquia y la manera en que la coleccion del museo ha consolidado ciertos relatos. La sala pone en dialogo obras del final del siglo XIX e inicios del XX con piezas contemporaneas, e incorpora un acuerdo con la Biblioteca Publica Piloto para destacar la importancia de la fotografia en ese periodo.',
		textEn: 'Historias para Repensar invites visitors to critically review the historiography of art in Antioquia and the way the museum collection has consolidated certain narratives. The gallery places late nineteenth- and early twentieth-century works in dialogue with contemporary pieces, and includes a collaboration with the Biblioteca Publica Piloto to emphasize the importance of photography in that period.',
	},
	{
		id: 'botero-salas',
		keywords: ['sala fernando botero', 'fernando botero gallery', 'pedrito botero', 'botero donation', 'escena con jinete'],
		textEs: 'Las salas Fernando Botero reunen una parte clave de la produccion del artista, con pinturas, dibujos, acuarelas y esculturas que muestran su interes por la historia del arte, la abundancia del tropico, la iconografia religiosa y la vida cotidiana. La Sala Mural destaca Escena con jinete como una pieza central del recorrido.',
		textEn: 'The Fernando Botero galleries gather a key part of the artist\'s production, with paintings, drawings, watercolors, and sculptures that show his interest in art history, tropical abundance, religious iconography, and everyday life. The Mural Room highlights Escena con jinete as a central piece in the visit.',
	},
	{
		id: 'sophia-vari-internacional',
		keywords: ['sala internacional', 'sophia vari', 'wifredo lam', 'rodin', 'max ernst', 'arte internacional'],
		textEs: 'La Sala Internacional Sophia Vari parte de la donacion internacional de Fernando Botero y plantea preguntas sobre referencia artistica, eurocentrismo, periferia y descolonizacion. Toma como eje obras como Liberacion de Wifredo Lam y permite leer de otra manera la presencia de Rodin, Max Ernst y otros artistas dentro del museo.',
		textEn: 'The Sophia Vari International Gallery grows out of Fernando Botero\'s international donation and raises questions about artistic reference, Eurocentrism, the periphery, and decolonization. It uses works such as Liberacion by Wifredo Lam as a key axis and offers another way to read the presence of Rodin, Max Ernst, and other artists in the museum.',
	},
];

export function getPdfKnowledgeEntries(query, limit = 2) {
	const normalizedQuery = normalizeText(query);
	const rankedEntries = PDF_KNOWLEDGE_ENTRIES
		.map((entry) => ({
			entry,
			score: entry.keywords.reduce(
				(total, keyword) => total + (findApproxKeyword(normalizedQuery, [keyword]) ? 1 : 0),
				0,
			),
		}))
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score);

	if (rankedEntries.length === 0) {
		return [];
	}

	const maxScore = rankedEntries[0].score;
	const filteredEntries = maxScore <= 1
		? rankedEntries.slice(0, 1)
		: rankedEntries.filter((item) => item.score === maxScore);

	return filteredEntries.slice(0, limit).map((item) => item.entry);
}