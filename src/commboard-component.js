import React from "react";
import ReactDOM from "react-dom";
import Radium from "radium";
const bs = require('browser-storage');


const langEN= [
	//english
	  ["the",10],["of",10],["and",10],["a",10],["to",10],["in",10],["is",10],["you",10],["that",10],["it",10],["he",10],["was",10],["for",10],["on",10],["are",10],["as",10],["with",10],["his",10],["they",10],["i",10],["at",10],["be",10],["this",10],["have",10],["from",10],["or",10],["one",10],["had",10],["by",10],["word",10],["but",10],["not",10],["what",10],["all",10],["were",10],["we",10],["when",10],["your",10],["can",10],["said",10],["there",10],["use",10],["an",10],["each",10],["which",10],["she",10],["do",10],["how",10],["their",10],["if",10],["will",10],["up",10],["other",10],["about",10],["out",10],["many",10],["then",10],["them",10],["these",10],["so",10],["some",10],["her",10],["would",10],["make",10],["like",10],["him",10],["into",10],["time",10],["has",10],["look",10],["two",10],["more",10],["write",10],["go",10],["see",10],["number",10],["no",10],["way",10],["could",10],["people",10],["my",10],["than",10],["first",10],["water",10],["been",10],["call",10],["who",10],["oil",10],["its",10],["now",10],["find",10],["long",10],["down",10],["day",10],["did",10],["get",10],["come",10],["made",10],["may",10],["part",10],	
	  ["over",9],["new",9],["sound",9],["take",9],["only",9],["little",9],["work",9],["know",9],["place",9],["year",9],["live",9],["me",9],["back",9],["give",9],["most",9],["very",9],["after",9],["thing",9],["our ",9],["just ",9],["name",9],["good",9],["sentence",9],["man",9],["think",9],["say",9],["great",9],["where",9],["help",9],["through ",9],["much",9],["before",9],["line",9],["right",9],["too ",9],["mean",9],["old",9],["any",9],["same",9],["tell",9],["boy",9],["follow",9],["came",9],["want",9],["show",9],["also",9],["around",9],["form",9],["three",9],["small",9],["set",9],["put",9],["end",9],["does",9],["another",9],["well",9],["large",9],["must",9],["big",9],["even",9],["such",9],["because",9],["turn",9],["here",9],["why",9],["ask",9],["went",9],["men",9],["read",9],["need",9],["land",9],["different ",9],["home",9],["us",9],["move",9],["try",9],["kind",9],["hand",9],["picture",9],["again",9],["change",9],["off",9],["play",9],["spell",9],["air",9],["away",9],["animal",9],["house",9],["point",9],["page",9],["letter",9],["mother",9],["answer",9],["found",9],["study",9],["still",9],["learn",9],["should",9],["america",9],["world",9],
	  ["high",8],["every",8],["near",8],["add",8],["food",8],["between",8],["own",8],["below",8],["country",8],["plant",8],["last",8],["school",8],["father",8],["keep",8],["tree",8],["never",8],["start",8],["city",8],["earth",8],["eye",8],["light",8],["thought",8],["head",8],["under",8],["story",8],["saw",8],["left",8],["don’t",8],["few",8],["while",8],["along",8],["might",8],["close",8],["something",8],["seem",8],["next",8],["hard",8],["open",8],["example",8],["begin",8],["life",8],["always",8],["those",8],["both",8],["paper",8],["together",8],["got",8],["group",8],["often",8],["run",8],["important",8],["until",8],["children",8],["side",8],["feet",8],["car",8],["mile",8],["night",8],["walk",8],["white",8],["sea",8],["began",8],["grow",8],["took",8],["river",8],["four",8],["carry",8],["state",8],["once",8],["book",8],["hear",8],["stop",8],["without",8],["second",8],["later",8],["miss",8],["idea",8],["enough",8],["eat",8],["face",8],["watch",8],["far",8],["indian",8],["really",8],["almost",8],["let",8],["above",8],["girl",8],["sometimes",8],["mountain",8],["cut",8],["young",8],["talk",8],["soon",8],["list",8],["song",8],["being",8],["leave",8],["family",8],["it’s",8],	
	  ["body",7],["music",7],["color",7],["stand",7],["sun",7],["question",7],["fish",7],["area",7],["mark",7],["dog",7],["horse",7],["birds",7],["problem",7],["complete",7],["room",7],["knew",7],["since",7],["ever",7],["piece",7],["told",7],["usually",7],["didn’t",7],["friends",7],["easy",7],["heard",7],["order",7],["red",7],["door",7],["sure",7],["become",7],["top",7],["ship",7],["across",7],["today",7],["during",7],["short",7],["better",7],["best",7],["however",7],["low",7],["hours",7],["black",7],["products",7],["happened",7],["whole",7],["measure",7],["remember",7],["early",7],["waves",7],["reached",7],["listen",7],["wind",7],["rock",7],["space",7],["covered",7],["fast",7],["several",7],["hold",7],["himself",7],["toward",7],["five",7],["step ",7],["morning",7],["passed",7],["vowel",7],["true",7],["hundred",7],["against",7],["pattern",7],["numeral",7],["table",7],["north",7],["slowly",7],["money",7],["map",7],["farm",7],["pulled",7],["draw",7],["voice",7],["seen",7],["cold",7],["cried",7],["plan",7],["notice",7],["south",7],["sing",7],["war",7],["ground",7],["fall",7],["king",7],["town",7],["i’ll",7],["unit",7],["figure",7],["certain",7],["field",7],["travel",7],["wood",7],["fire",7],["upon",7],	
	  ["done",6],["english",6],["road",6],["halt",6],["ten",6],["fly",6],["gave",6],["box",6],["finally",6],["wait",6],["correct",6],["oh",6],["quickly",6],["person",6],["became",6],["shown",6],["minutes",6],["strong",6],["verb",6],["stars",6],["front",6],["feel",6],["fact",6],["inches",6],["street",6],["decided",6],["contain",6],["course",6],["surface",6],["produce",6],["building",6],["ocean",6],["class",6],["note",6],["nothing",6],["rest",6],["carefully",6],["scientists",6],["inside ",6],["wheels",6],["stay",6],["green",6],["known",6],["island",6],["week",6],["less",6],["machine",6],["base",6],["ago",6],["stood",6],["plane",6],["system",6],["behind",6],["ran",6],["round",6],["boat",6],["game",6],["force",6],["brought",6],["understand",6],["warm",6],["common",6],["bring",6],["explain",6],["dry",6],["though",6],["language",6],["shape",6],["deep",6],["thousands",6],["yes",6],["clear",6],["equation",6],["yet",6],["government",6],["filled",6],["heat",6],["full",6],["hot",6],["check",6],["object",6],["am",6],["rule",6],["among",6],["noun",6],["power",6],["cannot",6],["able",6],["six",6],["size",6],["dark",6],["ball",6],["material",6],["special",6],["heavy",6],["fine",6],["pair",6],["circle",6],["include",6],["built",6],	 
	  ["can’t",5],["matter",5],["square",5],["syllables",5],["perhaps",5],["bill",5],["felt",5],["suddenly",5],["test",5],["direction",5],["center",5],["farmers",5],["ready",5],["anything",5],["divided",5],["general",5],["energy",5],["subject",5],["europe",5],["moon",5],["region",5],["return",5],["believe",5],["dance",5],["members",5],["picked",5],["simple",5],["cells",5],["paint",5],["mind",5],["love",5],["cause",5],["rain",5],["exercise",5],["eggs",5],["train",5],["blue",5],["wish",5],["drop",5],["developed",5],["window",5],["difference",5],["distance",5],["heart",5],["sit",5],["sum",5],["summer",5],["wall",5],["forest",5],["probably",5],["legs",5],["sat",5],["main",5],["winter",5],["wide",5],["written",5],["length",5],["reason",5],["kept",5],["interest",5],["arms",5],["brother",5],["race",5],["present",5],["beautiful",5],["store",5],["job",5],["edge",5],["past",5],["sign",5],["record",5],["finished",5],["discovered",5],["wild",5],["happy",5],["beside",5],["gone",5],["sky",5],["glass",5],["million",5],["west",5],["lay",5],["weather",5],["root",5],["instruments",5],["meet",5],["third",5],["months",5],["paragraph",5],["raised",5],["represent",5],["soft",5],["whether",5],["clothes",5],["flowers",5],["shall",5],["teacher",5],["held",5],["describe",5],["drive",5],
	  ["cross",4],["speak",4],["solve",4],["appear",4],["metal",4],["son",4],["either",4],["ice",4],["sleep",4],["village",4],["factors",4],["result",4],["jumped",4],["snow",4],["ride",4],["care",4],["floor",4],["hill",4],["pushed",4],["baby",4],["buy",4],["century",4],["outside",4],["everything",4],["tall",4],["already",4],["instead",4],["phrase",4],["soil",4],["bed",4],["copy",4],["free",4],["hope",4],["spring",4],["case",4],["laughed",4],["nation",4],["quite",4],["type",4],["themselves",4],["temperature",4],["bright",4],["lead",4],["everyone",4],["method",4],["section",4],["lake",4],["consonant",4],["within",4],["dictionary",4],["hair",4],["age",4],["amount",4],["scale",4],["pounds",4],["although",4],["per",4],["broken ",4],["moment",4],["tiny",4],["possible",4],["gold",4],["milk",4],["quiet",4],["natural",4],["lot",4],["stone",4],["act",4],["build",4],["middle",4],["speed",4],["count",4],["cat",4],["someone",4],["sail",4],["rolled",4],["bear",4],["wonder",4],["smiled",4],["angle",4],["fraction",4],["africa",4],["killed",4],["melody",4],["bottom",4],["trip",4],["hole",4],["poor",4],["let’s",4],["fight",4],["surprise",4],["french",4],["died",4],["beat",4],["exactly",4],["remain",4],["dress",4],["iron",4],["couldn’t",4],["fingers",4],	 
	  ["row",3],["least",3],["catch",3],["climbed",3],["wrote",3],["shouted",3],["continued",3],["itself",3],["else",3],["plains",3],["gas ",3],["england",3],["burning",3],["design",3],["joined",3],["foot",3],["law",3],["ears",3],["grass",3],["you’re",3],["grew",3],["skin",3],["valley",3],["cents",3],["key",3],["president",3],["brown",3],["trouble",3],["cool",3],["cloud",3],["lost",3],["sent",3],["symbols",3],["wear",3],["bad",3],["save",3],["experiment",3],["engine",3],["alone",3],["drawing",3],["east",3],["pay",3],["single",3],["touch",3],["information",3],["express",3],["mouth",3],["yard",3],["equal",3],["decimal",3],["yourself",3],["control",3],["practice",3],["report",3],["straight",3],["rise",3],["statement",3],["stick",3],["party",3],["seeds",3],["suppose",3],["woman",3],["coast",3],["bank",3],["period",3],["wire",3],["choose",3],["clean",3],["visit",3],["bit",3],["whose",3],["received",3],["garden",3],["please",3],["strange",3],["caught",3],["fell",3],["team",3],["god",3],["captain",3],["direct",3],["ring",3],["serve",3],["child",3],["desert",3],["increase",3],["history",3],["cost",3],["maybe",3],["business",3],["separate",3],["break",3],["uncle",3],["hunting",3],["flow",3],["lady",3],["students",3],["human",3],["art",3],["feeling",3],	 
	  ["supply",2],["corner",2],["electric",2],["insects",2],["crops",2],["tone",2],["hit",2],["sand",2],["doctor",2],["provide",2],["thus",2],["won’t",2],["cook",2],["bones",2],["tail",2],["board",2],["modern",2],["compound",2],["mine",2],["wasn’t",2],["fit",2],["addition",2],["belong",2],["safe",2],["soldiers",2],["guess",2],["silent",2],["trade",2],["rather",2],["compare",2],["crowd",2],["poem",2],["enjoy",2],["elements",2],["indicate",2],["except",2],["expect",2],["flat",2],["seven",2],["interesting",2],["sense",2],["string",2],["blow",2],["famous",2],["value",2],["wings",2],["movement",2],["pole",2],["exciting",2],["branches",2],["thick",2],["blood",2],["lie",2],["spot",2],["bell",2],["fun",2],["loud",2],["consider",2],["suggested",2],["thin",2],["position",2],["entered",2],["fruit",2],["tied",2],["rich",2],["dollars",2],["send",2],["sight",2],["chief",2],["japanese",2],["stream",2],["planets",2],["rhythm",2],["eight",2],["science",2],["major",2],["observe",2],["tube",2],["necessary",2],["weight",2],["meat",2],["lifted",2],["process",2],["army",2],["hat",2],["property",2],["particular",2],["swim",2],["terms",2],["current",2],["park",2],["sell",2],["shoulder",2],["industry",2],["wash",2],["block",2],["spread",2],["cattle",2],["wife",2],["sharp",2],	 
	  ["company",1],["radio",1],["we’ll",1],["action",1],["capital",1],["factories",1],["settled",1],["yellow",1],["isn’t",1],["southern",1],["truck",1],["fair",1],["printed",1],["wouldn’t",1],["ahead",1],["chance",1],["born",1],["level",1],["triangle",1],["molecules",1],["france",1],["repeated",1],["column",1],["western",1],["church",1],["sister",1],["oxygen",1],["plural",1],["various",1],["agreed",1],["opposite",1],["wrong",1],["chart",1],["prepared",1],["pretty",1],["solution",1],["fresh",1],["shop",1],["suffix",1],["especially",1],["shoes",1],["actually",1],["nose",1],["afraid",1],["dead",1],["sugar",1],["adjective",1],["fig",1],["office",1],["huge",1],["gun",1],["similar",1],["death",1],["score",1],["forward",1],["stretched",1],["experience",1],["rose",1],["allow",1],["fear",1],["workers",1],["washington",1],["greek",1],["women",1],["bought",1],["led",1],["march",1],["northern",1],["create",1],["british",1],["difficult",1],["match",1],["win",1],["doesn’t",1],["steel",1],["total",1],["deal",1],["determine",1],["evening",1],["nor",1],["rope",1],["cotton",1],["apple",1],["details",1],["entire",1],["corn",1],["substances",1],["smell",1],["tools",1],["conditions",1],["cows",1],["track",1],["arrived",1],["located",1],["sir",1],["seat",1],["division",1],["effect",1],["underline",1],["view",1] 
	  ]
const langPOR=[
//portugese
	  ["que",10],["não",10],["de",10],["um",10],["para",10],["eu",10],["se",10],["me",10],["uma",10],["está",10],["com",10],["do",10],["por",10],["te",10],["os",10],["bem",10],["em",10],["ele",10],["isso",10],["mas",10],["da",10],["como",10],["no",10],["sim",10],["as",10],["mais",10],["na",10],["meu",10],["você",10],["aqui",10],["muito",10],["foi",10],["estou",10],["vamos",10],["ela",10],["fazer",10],["vai",10],["isto",10],["já",10],["tem",10],["só",10],["minha",10],["nos",10],["ser",10],["tudo",10],["ao",10],["tenho",10],["vou",10],["sei",10],["agora",10],["há",10],["lá",10],["tu",10],["quando",10],["porque",10],["estás",10],["quem",10],["onde",10],["nada",10],["ter",10],["então",10],["dizer",10],["lhe",10],["seu",10],["era",10],["sou",10],["ou",10],["coisa",10],["quero",10],["são",10],["sua",10],["pode",10],["nós",10],["mesmo",10],["ver",10],["disse",10],["eles",10],["bom",10],["estava",10],["esta",10],["todos",10],["mim",10],["posso",10],["dos",10],["lo",10],["estão",10],["temos",10],["nunca",10],["este",10],["casa",10],["até",10],["assim",10],["acho",10],["quer",10],["tens",10],["tempo",10],["ir",10],["falar",10],["quê",10],["ainda",10],
	  ["tua",9],["teu",9],["favor",9],["pai",9],["também",9],["obrigado",9],["vez",9],["deus",9],["certo",9],["tão",9],["sobre",9],["melhor",9],["noite",9],["és",9],["dia",9],["estamos",9],["talvez",9],["nem",9],["depois",9],["sempre",9],["sabe",9],["mãe",9],["vida",9],["sem",9],["alguém",9],["olá",9],["anos",9],["sabes",9],["ti",9],["homem",9],["dele",9],["alguma",9],["das",9],["algo",9],["parece",9],["sr",9],["tinha",9],["senhor",9],["boa",9],["vais",9],["coisas",9],["estar",9],["faz",9],["queres",9],["vocês",9],["dois",9],["ficar",9],["pelo",9],["preciso",9],["aí",9],["diz",9],["claro",9],["pessoas",9],["essa",9],["verdade",9],["dar",9],["esse",9],["antes",9],["ninguém",9],["tipo",9],["la",9],["vão",9],["trabalho",9],["oh",9],["grande",9],["comigo",9],["outra",9],["apenas",9],["espera",9],["saber",9],["vá",9],["podes",9],["pouco",9],["dinheiro",9],["qual",9],["qualquer",9],["pois",9],["podemos",9],["fora",9],["pela",9],["merda",9],["deve",9],["daqui",9],["olha",9],["cá",9],["filho",9],["disso",9],["toda",9],["hoje",9],["mulher",9],["meus",9],["todo",9],["nome",9],["seja",9],["num",9],["desculpa",9],["outro",9],["nosso",9],["nossa",9],["sair",9],
	  ["queria",8],["sério",8],["dá",8],["mundo",8],["quanto",8],["seus",8],["certeza",8],["mal",8],["dela",8],["têm",8],["amigo",8],["volta",8],["às",8],["carro",8],["três",8],["passa",8],["embora",8],["fez",8],["novo",8],["aconteceu",8],["deixa",8],["problema",8],["menos",8],["vem",8],["nas",8],["lugar",8],["consigo",8],["será",8],["dentro",8],["pensar",8],["ok",8],["vezes",8],["lado",8],["primeiro",8],["contigo",8],["numa",8],["todas",8],["tentar",8],["vi",8],["aos",8],["parte",8],["cara",8],["ei",8],["ali",8],["voltar",8],["algum",8],["hora",8],["porquê",8],["anda",8],["desculpe",8],["vê",8],["ajudar",8],["aquele",8],["obrigada",8],["querida",8],["sinto",8],["pensei",8],["los",8],["homens",8],["duas",8],["dias",8],["sabia",8],["fui",8],["matar",8],["gente",8],["uns",8],["gosto",8],["razão",8],["vos",8],["atrás",8],["deixar",8],["cabeça",8],["podem",8],["amor",8],["fica",8],["achas",8],["somos",8],["pronto",8],["família",8],["horas",8],["entre",8],["ajuda",8],["frente",8],["tal",8],["polícia",8],["ideia",8],["tarde",8],["suas",8],["porta",8],["passar",8],["tenha",8],["amigos",8],["ouvir",8],["precisa",8],["fiz",8],["encontrar",8],["deles",8],["ia",8],["nenhum",8],["momento",8],
	  ["devia",7],["acha",7],["aquilo",7],["cidade",7],["cima",7],["minutos",7],["desde",7],["foram",7],["si",7],["pessoa",7],["entrar",7],["pra",7],["diga",7],["morrer",7],["nova",7],["podia",7],["seria",7],["caso",7],["chegar",7],["outros",7],["tanto",7],["morto",7],["levar",7],["amanhã",7],["forma",7],["quase",7],["fosse",7],["medo",7],["lhes",7],["história",7],["conta",7],["óptimo",7],["contra",7],["irmão",7],["sido",7],["minhas",7],["aquela",7],["arma",7],["caminho",7],["morte",7],["sorte",7],["enquanto",7],["vir",7],["cuidado",7],["primeira",7],["cada",7],["deixe",7],["semana",7],["feliz",7],["trabalhar",7],["precisamos",7],["alguns",7],["espero",7],["maneira",7],["tive",7],["olhos",7],["faço",7],["ano",7],["vejo",7],["rapaz",7],["fala",7],["durante",7],["acabou",7],["desta",7],["pessoal",7],["pára",7],["quarto",7],["estes",7],["feito",7],["neste",7],["for",7],["mãos",7],["sangue",7],["fim",7],["acontecer",7],["dr",7],["ouve",7],["faça",7],["estas",7],["adeus",7],["querem",7],["causa",7],["meio",7],["filha",7],["água",7],["juntos",7],["lamento",7],["perto",7],["teus",7],["jogo",7],["cinco",7],["umas",7],["importante",7],["última",7],["logo",7],["manhã",7],["chefe",7],["senhora",7],["acredito",7],["nossos",7],
	  ["calma",6],["poder",6],["única",6],["querido",6],["ouvi",6],["deu",6],["terra",6],["disto",6],["guerra",6],["rápido",6],["algumas",6],["realmente",6],["poderia",6],["digo",6],["contar",6],["amo",6],["mão",6],["nisso",6],["baixo",6],["difícil",6],["começar",6],["viu",6],["comer",6],["ah",6],["espere",6],["mesma",6],["deste",6],["problemas",6],["capitão",6],["corpo",6],["dólares",6],["importa",6],["número",6],["usar",6],["disseste",6],["maior",6],["segundo",6],["significa",6],["escola",6],["sabem",6],["parar",6],["dormir",6],["andar",6],["quatro",6],["segurança",6],["coração",6],["raio",6],["havia",6],["sai",6],["teve",6],["buscar",6],["presidente",6],["nenhuma",6],["agente",6],["chega",6],["rapazes",6],["pequeno",6],["idiota",6],["fizeste",6],["tirar",6],["morreu",6],["força",6],["sabemos",6],["ontem",6],["prazer",6],["procura",6],["viver",6],["mau",6],["estado",6],["sentir",6],["meses",6],["chama",6],["festa",6],["mulheres",6],["pedir",6],["conheço",6],["crianças",6],["devo",6],["rapariga",6],["perder",6],["sra",6],["pergunta",6],["marido",6],["eram",6],["fazes",6],["altura",6],["porra",6],["olhe",6],["olhar",6],["velho",6],["muitas",6],["mil",6],["filhos",6],["näo",6],["trás",6],["fazendo",6],["muitos",6],["equipa",6],["pais",6],["telefone",6],
	  ["acabar",5],["dê",5],["teria",5],["possível",5],["depressa",5],["elas",5],["venha",5],["esperar",5],["muita",5],["tomar",5],["pena",5],["gosta",5],["armas",5],["nesta",5],["vivo",5],["vindo",5],["tivesse",5],["longe",5],["penso",5],["acordo",5],["demais",5],["vossa",5],["pensa",5],["errado",5],["conseguir",5],["gostaria",5],["estranho",5],["veio",5],["fácil",5],["sente",5],["essas",5],["brincar",5],["licença",5],["suficiente",5],["seis",5],["mudar",5],["passado",5],["estavam",5],["plano",5],["fogo",5],["livro",5],["esses",5],["irmã",5],["dizem",5],["falta",5],["fazem",5],["jantar",5],["rei",5],["devias",5],["matou",5],["cama",5],["leva",5],["nossas",5],["foste",5],["sozinho",5],["adoro",5],["exactamente",5],["paz",5],["tuas",5],["além",5],["pôr",5],["palavra",5],["sala",5],["consegue",5],["pagar",5],["seguir",5],["possa",5],["atenção",5],["fique",5],["passou",5],["comida",5],["ar",5],["culpa",5],["pelos",5],["ficou",5],["ligar",5],["bastante",5],["continua",5],["correr",5],["estavas",5],["precisas",5],["boca",5],["luz",5],["outras",5],["único",5],["menina",5],["deixou",5],["casamento",5],["acreditar",5],["médico",5],["próprio",5],["semanas",5],["chegou",5],["fico",5],["minuto",5],["especial",5],["chamar",5],["lembro",5],["forte",5],["esteja",5],
	  ["perguntar",4],["mostrar",4],["filme",4],["sequer",4],["provavelmente",4],["país",4],["cala",4],["houve",4],["pé",4],["partir",4],["fazê",4],["diferente",4],["pior",4],["rua",4],["deveria",4],["próxima",4],["café",4],["direito",4],["existe",4],["boas",4],["resto",4],["quiser",4],["pare",4],["toma",4],["quis",4],["viste",4],["lembra",4],["hospital",4],["estive",4],["arranjar",4],["portanto",4],["continuar",4],["descobrir",4],["conhece",4],["bebé",4],["sam",4],["sexo",4],["manter",4],["visto",4],["las",4],["jogar",4],["vim",4],["encontrei",4],["demasiado",4],["vosso",4],["ai",4],["raios",4],["ponto",4],["sentido",4],["dez",4],["milhões",4],["puta",4],["sinal",4],["aqueles",4],["ganhar",4],["haver",4],["querer",4],["consegues",4],["devem",4],["seguro",4],["criança",4],["último",4],["sistema",4],["gostava",4],["prisão",4],["cão",4],["queremos",4],["linda",4],["esposa",4],["local",4],["peço",4],["música",4],["acontece",4],["sítio",4],["irá",4],["trouxe",4],["esteve",4],["pequena",4],["conhecer",4],["precisar",4],["salvar",4],["oportunidade",4],["fazemos",4],["mr",4],["encontro",4],["capaz",4],["comprar",4],["avião",4],["achei",4],["vês",4],["chão",4],["natal",4],["jesus",4],["mortos",4],["jovem",4],["negócio",4],["banho",4],["beber",4],["grandes",4],["livre",4],
	  ["alto",3],["situação",3],["miúdo",3],["sob",3],["connosco",3],["tratar",3],["nao",3],["deves",3],["cedo",3],["veja",3],["apanhar",3],["entra",3],["futuro",3],["próximo",3],["entendo",3],["nave",3],["final",3],["vontade",3],["cabelo",3],["certa",3],["general",3],["perfeito",3],["dou",3],["lembras",3],["respeito",3],["devemos",3],["nisto",3],["lindo",3],["bonito",3],["guarda",3],["ordem",3],["miúda",3],["disseram",3],["preocupes",3],["perguntas",3],["interessa",3],["oi",3],["põe",3],["questão",3],["mensagem",3],["palavras",3],["começou",3],["senhores",3],["falando",3],["gajo",3],["notícias",3],["acabei",3],["estiver",3],["estávamos",3],["louco",3],["tira",3],["vista",3],["campo",3],["linha",3],["tinhas",3],["mesa",3],["finalmente",3],["própria",3],["assassino",3],["droga",3],["fizeram",3],["emprego",3],["amiga",3],["barco",3],["conversa",3],["terá",3],["faria",3],["simples",3],["missão",3],["viagem",3],["tom",3],["ataque",3],["consegui",3],["nessa",3],["gostas",3],["bonita",3],["grupo",3],["real",3],["completamente",3],["doente",3],["bocado",3],["abrir",3],["dessa",3],["ler",3],["tio",3],["pelas",3],["doutor",3],["lista",3],["crime",3],["novamente",3],["procurar",3],["chamada",3],["segunda",3],["acredita",3],["quiseres",3],["daí",3],["normal",3],["relação",3],["modo",3],["resposta",3],
	  ["sol",2],["desse",2],["viva",2],["lutar",2],["aonde",2],["tipos",2],["dizes",2],["saia",2],["estúpido",2],["meia",2],["assunto",2],["deixem",2],["melhores",2],["escritório",2],["serviço",2],["facto",2],["dor",2],["casar",2],["david",2],["dito",2],["exército",2],["fundo",2],["fugir",2],["acidente",2],["faças",2],["segundos",2],["nesse",2],["vale",2],["fixe",2],["george",2],["sonho",2],["nele",2],["quantos",2],["escuta",2],["ambos",2],["graças",2],["papá",2],["preso",2],["tinham",2],["professor",2],["trazer",2],["ajudá",2],["dei",2],["pensas",2],["fiquei",2],["sete",2],["esperem",2],["roupa",2],["hotel",2],["verdadeiro",2],["devíamos",2],["fantástico",2],["creio",2],["espaço",2],["idade",2],["bons",2],["tocar",2],["olho",2],["companhia",2],["saiu",2],["conseguiu",2],["jeito",2],["pensava",2],["escolha",2],["levou",2],["iria",2],["mente",2],["estivesse",2],["caixa",2],["ouça",2],["sozinha",2],["tiro",2],["programa",2],["esquerda",2],["breve",2],["parabéns",2],["voz",2],["chave",2],["gostar",2],["engraçado",2],["diabo",2],["costas",2],["informação",2],["olhem",2],["pegar",2],["erro",2],["falou",2],["namorada",2],["fome",2],["cabo",2],["abre",2],["volto",2],["incrível",2],["banco",2],["fazia",2],["estrada",2],["após",2],["posição",2],["excelente",2],["juro",2],
	  ["má",1],["parem",1],["morta",1],["loja",1],["coronel",1],["prometo",1],["povo",1],["presente",1],["tempos",1],["fomos",1],["carta",1],["mestre",1],["proteger",1],["explicar",1],["leve",1],["trata",1],["simplesmente",1],["ora",1],["the",1],["governo",1],["mata",1],["cair",1],["centro",1],["prova",1],["senhoras",1],["chamado",1],["céu",1],["mês",1],["aposto",1],["energia",1],["soube",1],["mamã",1],["norte",1],["destino",1],["quente",1],["tradução",1],["feira",1],["conversar",1],["ordens",1],["lembrar",1],["almoço",1],["metade",1],["direita",1],["mandar",1],["papel",1],["miúdos",1],["liga",1],["chamo",1],["pediu",1],["perdi",1],["indo",1],["ouviste",1],["diabos",1],["foda",1],["advogado",1],["tornar",1],["base",1],["conseguimos",1],["imediatamente",1],["lei",1],["através",1],["interessante",1],["planeta",1],["bolas",1],["cheio",1],["voltou",1],["esquece",1],["saiam",1],["james",1],["impossível",1],["tenente",1],["escrever",1],["funciona",1],["bela",1],["entendido",1],["pés",1],["reunião",1],["luta",1],["saída",1],["cena",1],["inferno",1],["percebo",1],["oito",1],["máquina",1],["comandante",1],["câmara",1],["falei",1],["segredo",1],["regras",1],["acerca",1],["odeio",1],["fizemos",1],["bomba",1],["precisam",1],["sargento",1],["passo",1],["trabalha",1],["honra",1],["vidas",1],["digas",1]
	 ]
const langES =[//spanish
	  ["de",10],["que",10],["no",10],["a",10],["la",10],["el",10],["y",10],["es",10],["en",10],["lo",10],["un",10],["por",10],["qué",10],["me",10],["una",10],["te",10],["se",10],["los",10],["con",10],["para",10],["mi",10],["está",10],["si",10],["sí",10],["pero",10],["las",10],["bien",10],["yo",10],["su",10],["eso",10],["aquí",10],["del",10],["al",10],["como",10],["le",10],["tu",10],["más",10],["todo",10],["ya",10],["muy",10],["esto",10],["vamos",10],["ha",10],["ahora",10],["esta",10],["hay",10],["estoy",10],["algo",10],["tú",10],["tengo",10],["así",10],["nada",10],["nos",10],["cuando",10],["cómo",10],["él",10],["sé",10],["estás",10],["sólo",10],["o",10],["quiero",10],["este",10],["tiene",10],["gracias",10],["he",10],["puedo",10],["bueno",10],["soy",10],["era",10],["ser",10],["vez",10],["hacer",10],["todos",10],["ella",10],["son",10],["fue",10],["eres",10],["usted",10],["tienes",10],["puede",10],["señor",10],["ese",10],["voy",10],["quién",10],["casa",10],["creo",10],["porque",10],["tan",10],["favor",10],["hola",10],["dónde",10],["nunca",10],["sus",10],["sabes",10],["dos",10],["verdad",10],["quieres",10],["mucho",10],["entonces",10],["estaba",10],
	  ["tiempo",9],["mí",9],["esa",9],["mejor",9],["hombre",9],["hace",9],["va",9],["dios",9],["también",9],["has",9],["vida",9],["sin",9],["están",9],["ver",9],["sr",9],["siempre",9],["oh",9],["hasta",9],["ti",9],["ahí",9],["siento",9],["puedes",9],["decir",9],["ni",9],["sobre",9],["años",9],["tenemos",9],["uno",9],["día",9],["noche",9],["cosas",9],["alguien",9],["antes",9],["mis",9],["ir",9],["poco",9],["otra",9],["quiere",9],["solo",9],["nadie",9],["nosotros",9],["padre",9],["gente",9],["parece",9],["dinero",9],["estar",9],["hecho",9],["les",9],["mismo",9],["sea",9],["estamos",9],["mira",9],["pasa",9],["trabajo",9],["dijo",9],["ellos",9],["vas",9],["claro",9],["mañana",9],["han",9],["otro",9],["después",9],["desde",9],["mundo",9],["hablar",9],["tal",9],["había",9],["sabe",9],["acuerdo",9],["momento",9],["donde",9],["fuera",9],["hijo",9],["podría",9],["seguro",9],["mujer",9],["amigo",9],["días",9],["madre",9],["allí",9],["cosa",9],["tus",9],["lugar",9],["dice",9],["gusta",9],["será",9],["gran",9],["mierda",9],["tenía",9],["mamá",9],["papá",9],["espera",9],["hoy",9],["tener",9],["ven",9],["buena",9],["estado",9],["nuevo",9],["luego",9],["podemos",9],
	  ["tres",8],["dije",8],["nuestro",8],["sido",8],["menos",8],["debe",8],["tipo",8],["buen",8],["conmigo",8],["mal",8],["todas",8],["nombre",8],["haciendo",8],["crees",8],["toda",8],["amor",8],["mío",8],["visto",8],["estas",8],["quería",8],["eh",8],["tarde",8],["importa",8],["parte",8],["aún",8],["nuestra",8],["tienen",8],["tanto",8],["cada",8],["hora",8],["veces",8],["necesito",8],["contigo",8],["ve",8],["haber",8],["buenas",8],["dicho",8],["quien",8],["hacerlo",8],["demasiado",8],["oye",8],["ah",8],["haces",8],["hombres",8],["saber",8],["entre",8],["adiós",8],["problema",8],["unos",8],["vaya",8],["hemos",8],["cierto",8],["debo",8],["razón",8],["alguna",8],["esos",8],["pues",8],["veo",8],["idea",8],["chica",8],["realmente",8],["policía",8],["hizo",8],["estos",8],["amigos",8],["ustedes",8],["quizá",8],["serio",8],["cabeza",8],["hermano",8],["digo",8],["van",8],["pasado",8],["salir",8],["cuenta",8],["familia",8],["cariño",8],["vale",8],["algún",8],["muchas",8],["señora",8],["somos",8],["pueden",8],["noches",8],["muerto",8],["ud",8],["todavía",8],["rápido",8],["viejo",8],["lado",8],["debería",8],["ves",8],["sabía",8],["suerte",8],["cuidado",8],["buenos",8],["sería",8],["da",8],["mientras",8],["miedo",8],
	  ["primera",7],["contra",7],["puerta",7],["pronto",7],["e",7],["casi",7],["nueva",7],["espero",7],["cualquier",7],["esas",7],["agua",7],["os",7],["chico",7],["cuánto",7],["niños",7],["venga",7],["camino",7],["primero",7],["hacia",7],["pensé",7],["dentro",7],["pasó",7],["debes",7],["ciudad",7],["historia",7],["año",7],["viene",7],["deja",7],["durante",7],["forma",7],["volver",7],["feliz",7],["ojos",7],["guerra",7],["caso",7],["chicos",7],["esposa",7],["adelante",7],["cuál",7],["mano",7],["hice",7],["vi",7],["gustaría",7],["muerte",7],["allá",7],["mas",7],["loco",7],["supuesto",7],["toma",7],["minutos",7],["haré",7],["entiendo",7],["pasar",7],["iba",7],["corazón",7],["semana",7],["jefe",7],["venir",7],["manos",7],["ayuda",7],["problemas",7],["juntos",7],["supongo",7],["déjame",7],["importante",7],["vete",7],["niño",7],["arriba",7],["hija",7],["otros",7],["sra",7],["personas",7],["tierra",7],["manera",7],["hablando",7],["fin",7],["mujeres",7],["cara",7],["grande",7],["ningún",7],["nuestros",7],["cinco",7],["llama",7],["hey",7],["habla",7],["bajo",7],["dices",7],["poder",7],["cuándo",7],["quizás",7],["escucha",7],["persona",7],["horas",7],["tío",7],["aunque",7],["io",7],["único",7],["dijiste",7],["siquiera",7],["quieren",7],
	  ["ninguna",6],["cerca",6],["pequeño",6],["debemos",6],["cree",6],["dame",6],["sigue",6],["auto",6],["cuatro",6],["dejar",6],["muchos",6],["igual",6],["hago",6],["listo",6],["significa",6],["capitán",6],["clase",6],["llegar",6],["doctor",6],["suficiente",6],["tomar",6],["vivir",6],["joven",6],["trabajar",6],["haya",6],["abajo",6],["hubiera",6],["primer",6],["genial",6],["justo",6],["pensar",6],["misma",6],["puta",6],["comer",6],["necesita",6],["conozco",6],["fui",6],["algunos",6],["entrar",6],["fuerte",6],["número",6],["srta",6],["morir",6],["basta",6],["dar",6],["bastante",6],["amo",6],["atrás",6],["dicen",6],["difícil",6],["éste",6],["pueda",6],["punto",6],["vino",6],["hermana",6],["hijos",6],["unas",6],["final",6],["escuela",6],["podía",6],["pueblo",6],["haga",6],["sangre",6],["meses",6],["coche",6],["juego",6],["encontrar",6],["realidad",6],["cuerpo",6],["mayor",6],["última",6],["eran",6],["queda",6],["ok",6],["paz",6],["dime",6],["vuelta",6],["hiciste",6],["tenido",6],["sola",6],["hacen",6],["ido",6],["querida",6],["iré",6],["culpa",6],["malo",6],["chicas",6],["comida",6],["dólares",6],["dr",6],["saben",6],["fácil",6],["alto",6],["posible",6],["maldito",6],["dormir",6],["deberías",6],["maldita",6],["pregunta",6],["incluso",6],
	  ["fiesta",5],["tampoco",5],["cama",5],["lejos",5],["medio",5],["preocupes",5],["ay",5],["teléfono",5],["diga",5],["ei",5],["trata",5],["equipo",5],["palabra",5],["cuanto",5],["idiota",5],["esté",5],["luz",5],["tuve",5],["país",5],["segundo",5],["querido",5],["diablos",5],["hagas",5],["señorita",5],["oportunidad",5],["matar",5],["algunas",5],["esperando",5],["necesitamos",5],["adónde",5],["verte",5],["estará",5],["venido",5],["estabas",5],["fueron",5],["seis",5],["tenga",5],["cuarto",5],["cielo",5],["vivo",5],["recuerdo",5],["perdón",5],["falta",5],["pequeña",5],["oído",5],["creer",5],["john",5],["pienso",5],["ésta",5],["esperar",5],["necesitas",5],["aqui",5],["película",5],["además",5],["marido",5],["perro",5],["general",5],["calle",5],["exactamente",5],["rey",5],["padres",5],["lista",5],["habrá",5],["habitación",5],["carajo",5],["pensando",5],["par",5],["fuego",5],["niña",5],["seguir",5],["música",5],["di",5],["habría",5],["mucha",5],["paso",5],["sentido",5],["diré",5],["podrías",5],["afuera",5],["digas",5],["ia",5],["mía",5],["murió",5],["dio",5],["café",5],["entiendes",5],["nuestras",5],["piensa",5],["ello",5],["lleva",5],["estuvo",5],["último",5],["diciendo",5],["grandes",5],["sitio",5],["libro",5],["buscando",5],["bebé",5],["cállate",5],["vuelve",5],
	  ["jamás",4],["minuto",4],["arma",4],["viaje",4],["única",4],["muchachos",4],["perdido",4],["jugar",4],["diez",4],["vemos",4],["dado",4],["sabemos",4],["mil",4],["demás",4],["gusto",4],["peor",4],["irme",4],["jack",4],["estaban",4],["orden",4],["pasando",4],["cambio",4],["extraño",4],["pobre",4],["ropa",4],["queremos",4],["oficina",4],["sino",4],["modo",4],["ocurre",4],["muchacho",4],["otras",4],["hará",4],["libre",4],["conoces",4],["piensas",4],["presidente",4],["especial",4],["anoche",4],["millones",4],["acerca",4],["derecho",4],["negro",4],["acá",4],["caballeros",4],["semanas",4],["palabras",4],["buscar",4],["segura",4],["correcto",4],["frente",4],["hacemos",4],["seas",4],["detrás",4],["puesto",4],["asunto",4],["duro",4],["sucede",4],["llamar",4],["disculpe",4],["boca",4],["atención",4],["mire",4],["armas",4],["encima",4],["demonios",4],["mala",4],["llevar",4],["cual",4],["odio",4],["hospital",4],["deben",4],["sueño",4],["quieras",4],["resto",4],["llamo",4],["perder",4],["llamado",4],["perfecto",4],["estaré",4],["tranquilo",4],["york",4],["seguridad",4],["ayudar",4],["tuvo",4],["largo",4],["pena",4],["probablemente",4],["ayer",4],["dile",4],["prueba",4],["siendo",4],["bonito",4],["recuerdas",4],["haz",4],["real",4],["veras",4],["increíble",4],["quisiera",4],["tonto",4],
	  ["simplemente",3],["vámonos",3],["haría",3],["preguntas",3],["aire",3],["conoce",3],["fuerza",3],["carta",3],["trato",3],["plan",3],["ése",3],["verlo",3],["hambre",3],["vuelto",3],["empezar",3],["campo",3],["acaba",3],["hablas",3],["vive",3],["barco",3],["hotel",3],["poner",3],["grupo",3],["creí",3],["sol",3],["tuyo",3],["pase",3],["joe",3],["voz",3],["baño",3],["usar",3],["conseguir",3],["placer",3],["llegado",3],["decirte",3],["profesor",3],["noticias",3],["lamento",3],["decirle",3],["blanco",3],["quédate",3],["estuve",3],["pie",3],["anda",3],["espere",3],["edad",3],["secreto",3],["podríamos",3],["compañía",3],["tren",3],["recuerda",3],["tras",3],["siéntate",3],["prisa",3],["vista",3],["hermosa",3],["negocio",3],["deberíamos",3],["gustan",3],["pagar",3],["george",3],["futuro",3],["silencio",3],["siente",3],["médico",3],["maestro",3],["quiera",3],["llegó",3],["loca",3],["cambiar",3],["frank",3],["sal",3],["control",3],["raro",3],["viste",3],["novia",3],["diferente",3],["imposible",3],["i",3],["amiga",3],["enseguida",3],["llamada",3],["dan",3],["dejó",3],["mes",3],["llevo",3],["avión",3],["pelo",3],["the",3],["error",3],["haremos",3],["tendrá",3],["propia",3],["siguiente",3],["ganar",3],["ley",3],["dolor",3],["oro",3],["ten",3],["acabó",3],
	  ["maldición",2],["oficial",2],["situación",2],["daño",2],["sientes",2],["entendido",2],["deseo",2],["mente",2],["ejército",2],["comprar",2],["muertos",2],["pensaba",2],["darle",2],["estúpido",2],["decía",2],["acabo",2],["david",2],["suena",2],["mitad",2],["caballo",2],["asesino",2],["vio",2],["permiso",2],["ellas",2],["trabajando",2],["maravilloso",2],["mesa",2],["divertido",2],["mejores",2],["próxima",2],["entra",2],["tom",2],["mar",2],["siete",2],["hacía",2],["sexo",2],["encanta",2],["amable",2],["mensaje",2],["información",2],["traje",2],["alma",2],["encontrado",2],["coronel",2],["dale",2],["san",2],["cena",2],["encontré",2],["charlie",2],["tendrás",2],["eras",2],["propio",2],["culo",2],["asi",2],["adentro",2],["canción",2],["gobierno",2],["sam",2],["temo",2],["abre",2],["dijeron",2],["fuiste",2],["media",2],["das",2],["estábamos",2],["estaría",2],["daré",2],["vosotros",2],["frío",2],["foto",2],["accidente",2],["derecha",2],["funciona",2],["vayas",2],["centro",2],["necesario",2],["miren",2],["bonita",2],["ante",2],["terrible",2],["pude",2],["teniente",2],["luna",2],["izquierda",2],["uds",2],["doy",2],["servicio",2],["llamas",2],["normal",2],["junto",2],["tienda",2],["navidad",2],["dirección",2],["abuela",2],["alrededor",2],["vine",2],["tendré",2],["libertad",2],["sale",2],["línea",2],
	  ["abogado",1],["pies",1],["honor",1],["tratando",1],["regresar",1],["hablo",1],["vieja",1],["papel",1],["terminado",1],["dejado",1],["juro",1],["hermoso",1],["dulce",1],["sentir",1],["principio",1],["interesante",1],["caja",1],["cualquiera",1],["ocho",1],["horrible",1],["respuesta",1],["perra",1],["gracioso",1],["s",1],["trae",1],["personal",1],["mató",1],["completamente",1],["paul",1],["vienen",1],["sean",1],["llega",1],["abuelo",1],["tengas",1],["linda",1],["tendremos",1],["michael",1],["partes",1],["cárcel",1],["hubo",1],["sistema",1],["lindo",1],["director",1],["hazlo",1],["hicieron",1],["tía",1],["busca",1],["don",1],["baja",1],["pudo",1],["salud",1],["listos",1],["cita",1],["tenías",1],["negocios",1],["tipos",1],["cámara",1],["agente",1],["verás",1],["infierno",1],["regalo",1],["río",1],["través",1],["carne",1],["totalmente",1],["decirme",1],["piso",1],["esposo",1],["oír",1],["harry",1],["sargento",1],["deje",1],["tuya",1],["ambos",1],["beber",1],["calma",1],["vestido",1],["salvo",1],["ésa",1],["verdadero",1],["basura",1],["suelo",1],["carrera",1],["cumpleaños",1],["rato",1],["iremos",1],["universidad",1],["bailar",1],["triste",1],["iglesia",1],["m",1],["delante",1],["nena",1],["banco",1],["cuántos",1],["encuentra",1],["supone",1],["existe",1],["programa",1],["alegro",1]
	  
	  
	  ]

const layout_en = {title: "letters", rows: 6, columns: 8, 
	//RC- labelLength is the longest a string of m...m can be inside a button without having to use a smaller font
	labelLength: 4,
	layout: [
		{title: "Guess"},
		{title: "1", buttons: [
			{mode: "simple", text: "a"},
			{mode: "simple", text: "b"},
			{mode: "simple", text: "c"},
			{mode: "simple", text: "d"},
			{mode: "simple", text: "e"},
			{mode: "simple", text: "f"},
			{mode: "complex", text: ".", label: ".", read: "period"}]},
		{title: "2", buttons: [
			{mode: "simple", text: "g"},
			{mode: "simple", text: "h"},
			{mode: "simple", text: "i"},
			{mode: "simple", text: "j"},
			{mode: "simple", text: "k"},
			{mode: "simple", text: "l"},
			{mode: "simple", text: "m"}]},
		{title: "3", buttons: [
			{mode: "simple", text: "n"},
			{mode: "simple", text: "o"},
			{mode: "simple", text: "p"},
			{mode: "simple", text: "q"},
			{mode: "simple", text: "r"},
			{mode: "simple", text: "s"},
			{mode: "complex", text: "?", label: "?", read: "questionmark"}]},
		{title: "4", buttons: [
			{mode: "simple", text: "t"},
			{mode: "simple", text: "u"},
			{mode: "simple", text: "v"},
			{mode: "simple", text: "w"},
			{mode: "simple", text: "x"},
			{mode: "simple", text: "y"},
			{mode: "simple", text: "z"}]},
		{title: "5", buttons: [
			{mode: "function", label: "Speak", read: "speak", action: "read"},
			{mode: "complex", text: " ", label: "Space", read: "space"},
			{mode: "function", label: "Phrases", read: "phrases", action: "phrasemode"},
			{mode: "function", label: "Delete", read: "delete", action: "delete"},
			{mode: "function", label: "Clear", read: "clear", action: "clear"},
			{mode: "function", label: "Stop", read: "stop", action: "stop"}]}]};

const layout_es = {title: "letters", rows: 7, columns: 8, 
	//RC- labelLength is the longest a string of m...m can be inside a button without having to use a smaller font
	labelLength: 4,
	layout: [
		{title: "Guess"},
		{title: "1", buttons: [
			{mode: "simple", text: "a"},
			{mode: "simple", text: "b"},
			{mode: "simple", text: "c"},
			{mode: "simple", text: "d"},
			{mode: "simple", text: "e"},
			{mode: "simple", text: "f"},
			{mode: "complex", text: ".", label: ".", read: "period"}]},
		{title: "2", buttons: [
			{mode: "simple", text: "g"},
			{mode: "simple", text: "h"},
			{mode: "simple", text: "i"},
			{mode: "simple", text: "j"},
			{mode: "simple", text: "k"},
			{mode: "simple", text: "l"},
			{mode: "simple", text: "m"}]},
		{title: "3", buttons: [
			{mode: "simple", text: "n"},
			{mode: "simple", text: "o"},
			{mode: "simple", text: "p"},
			{mode: "simple", text: "q"},
			{mode: "simple", text: "r"},
			{mode: "simple", text: "s"},
			{mode: "complex", text: "?", label: "?", read: "questionmark"}]},
		{title: "4", buttons: [
			{mode: "simple", text: "t"},
			{mode: "simple", text: "u"},
			{mode: "simple", text: "v"},
			{mode: "simple", text: "w"},
			{mode: "simple", text: "x"},
			{mode: "simple", text: "y"},
			{mode: "simple", text: "z"}]},
		{title: "5", buttons: [
			{mode: "simple", text: "é"},
			{mode: "simple", text: "á"},
			{mode: "simple", text: "í"},
			{mode: "simple", text: "ü"},
			{mode: "simple", text: "ó"},
			{mode: "simple", text: "ú"},
			{mode: "simple", text: "ñ"}]},
		{title: "6", buttons: [
			{mode: "function", label: "Hablar", read: "speak", action: "read"},
			{mode: "complex", text: " ", label: "Espacio", read: "space"},
			{mode: "function", label: "Frases", read: "phrases", action: "phrasemode"},
			{mode: "function", label: "Borrar", read: "delete", action: "delete"},
			{mode: "function", label: "Limpiar", read: "clear", action: "clear"},
			{mode: "function", label: "Detener", read: "stop", action: "stop"}]}]};

const layout_phrases = {title: "phrases", rows: 5, columns: 3, 
	//RC- labelLength is the longest a string of m...m can be inside a button without having to use a smaller font
	labelLength: 20, 
	//RC- don't render the row titles
	ignoreRowTitles: true,
	layout: [
		{title: "1", buttons: [
			{mode: "simple", text: "I'm uncomfortable"},
			{mode: "simple", text: "I'm hungry"}]},
		{title: "2", buttons: [
			{mode: "simple", text: "I'm thirsty"},
			{mode: "simple", text: "Medicine"}]},
		{title: "3", buttons: [
			{mode: "simple", text: "Toilet"},
			{mode: "simple", text: "I love You"}]},
		{title: "4", buttons: [
			{mode: "simple", text: "Cough Machine"},
			{mode: "simple", text: "Dry Mouth"},]},
		{title: "5", buttons: [
			{mode: "simple", text: "Sucker"},
			{mode: "function", label: "Finish", read: "finish", action: "lettermode"}]}]};

const styles = {
	container: {
		backgroundColor: "#D3D3D3",
		borderColor: "#657b83",
		borderWidth: "1px",
		borderStyle: "solid",
		borderRadius: "10px",
		padding: "5px",
		width: "81em"
	},
	table: {
		width: "80em",
		tableLayout: "fixed"
	},
	highlightedRow: {
		backgroundColor: "#dc322f",
		color: "#268bd2"
	},
	baseButton: {
		height: "1.333em",
		width: "95%",
		margin: "5px",
		fontSize: "300%",
		fontWeight: "bold"
	},
	textButton: {
		color: "#268bd2"
	},
	functionButton: {
		backgroundColor: "#dc322f"
	},
	highlightedButton: {
		backgroundColor: "#268bd2",
		color: "#ffffff"
	}
};

class Button extends React.Component {
	constructor(props) {
		super(props);

		this.value = props.value;
		this.func = props.func;
	}
	componentWillReceiveProps(props) {
		this.value = props.value;
		this.func = props.func;
	}
	render() {
		return (<input type="button"
			value={this.props.value} 
			style={this.props.style}
			onClick={() => this.props.func()} />);
	}
}
Button = Radium(Button);

//Ryan Campbell
//The main input interface
class CommBoard extends React.Component {
	constructor(props) {
		super(props);
		this.rows = 0;
		this.columns = 0;
		this.buttons = [];
		if(props.functions) {
			this.functions = props.functions;
		} else {
			this.functions = {};
		}
		if(props.buffer) {
			Object.assign(this.functions, {
				read: () => {props.buffer.executeAction("read", () => 1);this.generateGuesses(false,"",false); 
				this.getFunc("stop")(); this.paused = true; console.log("i am here for gyro");this.gyroStart = false;},
				
				delete: () => props.buffer.executeAction("delete", () => 1),
				clear: () => props.buffer.executeAction("clear", () => 1)});
		}
		this.labelLength = props.layout.labelLength;
		this.scanstate = "stopped";
		this.paused = true;
		this.gyroStart = false;
		this.scaniterations = 0;
		this.state = {
			guesses: [],
			buttonHL: null,
			rowHL: null
		};

	}

	//SCANNING FUNCTIONS

	getState() {
		return this.scanstate;
	}
	getPaused(){
		//this.paused = resume;
		return this.paused;
	}
	setPaused(resume){
		this.paused = resume;
	}

	//RC- start a new scan if there isn't one already running
	startScan() {
		if(this.scanstate == "stopped") {
			this.scanstate = "rows";
			this.proceed();
			if(this.paused){
				this.paused = false; 
			}
		}
	}

	//RC- stop the scan that is currently running
	stopScan() {
		this.clearHighlight();
		this.scanstate = "stopped";
	}
	
	//RC- stop scanning buttons and scan rows, or back out of phrase mode, or just stop scanning
	backOut() {
		this.scaniterations = 0;
		if(this.scanstate == "buttons") {
			this.scanstate = "rows";
			let row = this.state.rowHL;
			this.clearHighlight();
			this.highlightRow(row);
		}
		else if(this.props.layout.title == "phrases") {
			this.getFunc("lettermode")();
		}
		else {
			this.getFunc("stop")();
		}
	}

	//RC- if a scan is running, proceed to the next step of the scan
	proceed() {
		let timeout; 
		//RC- proceed to the next row
		if(this.scanstate == "rows" && this.paused == false) {
			if(this.state.rowHL == null) {
				this.waitForGuess = true; 
				this.highlightRow(0);
				//timeout = setTimeout(() => {;}, 1500);					
			} 
			else if(this.scanstate == "rows" && this.paused == false){
				clearTimeout(timeout);
				let nextrow = this.state.rowHL + 1;

				//RC- loop back
				if(nextrow >= this.rows) {
					nextrow -= this.rows;
					this.scaniterations++;
					if(this.scaniterations >= 3) {
						this.backOut();
						return;
					}
				}
				return this.highlightRow(nextrow);
			}
		} 

		//RC- proceed to the next button
		else if(this.scanstate == "buttons" && this.paused == false) {
			let nextbutton = this.state.buttonHL + 1;
			//RC- loop back
			if(nextbutton >= (this.state.rowHL + 1) * this.columns) {
				nextbutton = this.columns * this.state.rowHL + 1;
				this.scaniterations++;
			} 
			//RC- skip blank spaces(blanks must all be at the end of a row)
			let button = this.highlightButton(nextbutton);
			
			try{		
				if(button.value == " ") {
				nextbutton = this.columns * this.state.rowHL + 1;
				button = this.highlightButton(nextbutton);
				this.scaniterations++;
				}
			}
			catch(err){
				console.log("scan paused!");
			}
			
			if(this.scaniterations >= 3) {
				this.backOut();
			}

			return button;
		}
	}

	//RC- highlight a given row (0 based index)
	highlightRow(i) {
		if(!this.paused && !this.waitForGuess){
			this.setState({rowHL: i,
				buttonHL: i * this.columns});
			return this.buttons[i * this.columns];
		}else if(!this.paused && this.waitForGuess){
			this.setState({rowHL: i,
				buttonHL: i * this.columns});
			console.log("wait for guess");
			this.waitForGuess = false;
			window.setTimeout(() => {return this.buttons[i * this.columns];}, 5000);
			
		}			
	}

	//RC- highlight the button at position i
	highlightButton(i) {
		if(!this.paused){
			this.setState({buttonHL: i});
			return this.buttons[i];
		}
	}

	//RC
	clearHighlight() {
		this.setState({buttonHL: null, rowHL: null});
	}

	//RC- perform the click action of the currently selected button or select a row
	select() {
		//RC- select a row and start scanning buttons
		if(this.scanstate == "rows") {
			this.scanstate = "buttons";
			this.scaniterations = 0;
			return this.highlightButton(this.state.buttonHL + 1);
		} 
		//RC- select a button
		else if(this.scanstate == "buttons") {
			let button = this.buttons[this.state.buttonHL]
			if(button) {
				button.func();
				this.generateGuesses(true,"",false);
			}
			this.clearHighlight();
			this.scanstate = "rows";
			return button;
		}
	}
	//END SCANNING FUNCTIONS

	//GUESS GENERATION
	
	
	generateGuesses(switcher,amend,merge) 
	{
 	  	const NUM_GUESSES = this.columns;
	  	var wordBank=[];//paired with wordBankPriority as wordBank has words and Priority has word priority 
	  	var wordBankPriority=[];//priority
		/*
		*Function ( or Main) Name:WordSearch                            
		*Author:ZachFokin		                         
		*Date:4/20/17	    	
		*Purpose:Given text input generates  guesses from the local prioritized dictionary 
		*			after having filled fills wordBank and wordBankPriority upon first guess after initialization      
		*Updates: (date)   Purpose: 
		*Inputs:Text from user input,algorithm/local languages dictionary                        
		*Outputs: guesses to be pressented on the guess row	or failure 	         
		*/

		//Include block comments as follows:
		/*  
		*     -all words have assosiated priority
		*/
  	
  	 		
  		let data=bs.getItem(this.props.language);//import the language for algorithum
  		let dataSplit=JSON.parse(data); // parse it
  		data=bs.getItem(this.props.language+'priority');// import the second array of 
  		let immportance= JSON.parse(data); // parse prior
  		var priotity =(immportance);//make int
  		if(dataSplit!=null)// if there was a prior save
  		{
  				wordBank=dataSplit;//set alg string Array
  				wordBankPriority=priotity; // set word priority
  		}
  		else
  		{ 
  			let defaltwordBank;
  			switch(this.props.language)
  			{
  				case "english":
  				{
  					defaltwordBank=langEN;// theese are dictionarys at the top of the file 
  					break;
  				}
  				case "spanish":
  				{
  					defaltwordBank=langES;
  					break;	  						
  				}
  				case "portuguese":
  				{
  					defaltwordBank=langPOR;
  					break; 						
  				}
  			}
  			for(let x=0;x<defaltwordBank.length;x++)
  			{
  				wordBank[x]=defaltwordBank[x][0];
  				wordBankPriority[x]=parseInt(defaltwordBank[x][1]);
  			}
  		}
  		
  		
  		
  		
  		
  		// this is here to tell what functions are running in what order, if at all.
  		if(switcher)
	  	{
		  	let text = this.props.buffer.getText().split(" ").slice(-1)[0].slice(0, -1);
      		if (text === "")
      		{
    	  		this.setState({guesses: []});
      		} 	
      		else 
      		{
      	   		WordSearch(text,(data,status)=>{
      	   			let guesses=data;
      	   			this.setState({guesses: guesses}),()=> console.log(status),setTimeout(1000*this.props.scanSpeed)},() => console.log("cannot find words."));
      		}	   
      	}
	  	else
	  	{
		  	if(merge)
    	  	{
    		  	let text = this.props.buffer.getText();
    			let defaltwordBank;
				switch(text)
				{
					case "english":
					{
						defaltwordBank=langEN;// theese are dictionarys at the top of the file 
						break;
					}
					case "spanish":
					{
						defaltwordBank=langES;
						break;	  						
					}
					case "portuguese":
					{
						defaltwordBank=langPOR;
						break; 						
					}
				}
				for(let x=0;x<defaltwordBank.length;x++)
				{
					wordBank.push(defaltwordBank[x][0]);
					wordBankPriority.push(parseInt(defaltwordBank[x][1]));
				}
    	 	}
    	  	else
    		{
				let text = this.props.buffer.getText();
    			let amend=[];
    			amend =  amendwordBank(wordBank,wordBankPriority,text);
    			if (amend.length>0)
    			{
    				for(let x=0;x<amend.length;x++)
    				{
    					wordBankPriority[wordBankPriority.length]=9;
    					wordBank[wordBank.length]=(amend[x]);
    				}
    			}
    		}
    	  	let json = JSON.stringify(wordBank);
    		bs.setItem(this.props.language, json);
    		let jso = JSON.stringify(wordBankPriority);
			bs.setItem(this.props.language+'priority', jso);
     	}
  		
  		//alt-Zach searches array to return words that have matching beginnings
  		/*search array, this section is a search function 
		* to return arrays of filtered results to words that have the same begining as the text input  
		* mary:searches through local dictionary to find words with the same beginings as the text input
		* joe:search local wordBank dictionary to return words whose begining letters match the text typed so far
  		*/
  		function WordSearch(text, success, failure) 
  		{
  			let arraywordBank=[];
  			let arraywordBankPriority=[];
  			let index=0; 
  	      	let newArraywordBank=[];
  	      	let newArraywordBankPriority=[];
  	      	for(let x=0;x<wordBank.length;x++)// itterate through array
  	      	{  
  	      		let words=wordBank[x];
  	      		if(words.slice(0,text.length)==text)//tests for the array 
  	      		{
  	      			newArraywordBank[index]=wordBank[x];
  	      			newArraywordBankPriority[index]=wordBankPriority[x];
  	      			index++; 
  	      		}
  	      	}
  	      	
  	      	arraywordBank = newArraywordBank.slice(); // these were from the now defunct search array functiuon now altered to still be functional
  	      	arraywordBankPriority = newArraywordBankPriority;
  	      	
  	      	if (arraywordBank== null)
  	      		failure();
  	      	else//priority finding and sorting
  	      	{
  	      		let r = [];
  	      		let disp1ind=[];
  	      		for(let x =0;x<NUM_GUESSES;x++)// alg array searching 
  	      		{
  	      			let max=-1;
  	      			for(index=0;index< arraywordBank.length;index++)
  	      			{
  	      				if(arraywordBankPriority[index]>max)
  	      				{
  	      					max=arraywordBankPriority[index];   
  	      					disp1ind[x]=index;	
  	      				}
  	      			}
  	      			r[x]=arraywordBank[disp1ind[x]];
  	      			arraywordBank.splice(disp1ind[x],1);
  	      			arraywordBankPriority.splice(disp1ind[x],1);
  	      		}
  	      		success(r);
  	      	}
  		}	
	  		
      // not so self explanitory but close if ammending is false then it will iterate the algorithums uasage count
	  // also speach is for the speach inclusion functionel
    
		  
		function amendwordBank(wordBank,wordBankPriority,words)
		{
			
			let jso,json;
			let storingwordBank=[],storingPriority=[];
			let returningArr=[];
			let index=0;
			let word=words.split(' ');
			for(let x=0;x<word.length;x++)
			{
					word[x]=word[x].replace(".","");
					word[x]=word[x].replace("?","");
					word[x]=word[x].replace("_","");
					if(wordBank.includes(word[x]))
					{
						wordBankPriority[wordBank.indexOf(word[x])]++;
					}
					else
					{
						returningArr[index]=word[x];
						index++;
					}
			}
				return returningArr;
		}
	}
	//END GUESS GENERATION

	//RC- given an action string, finds the associated function from either the function store or the props and returns it.
	getFunc(action) {
		let f = this.functions[action];
		if(f == null && this.props.functions) {
			f = this.props.functions[action];
		}
		if(f == null) {
			f = this.props[action];
		}
		if(f == null) {
			console.error("could not find action: " + action.toString())
		}
		return f;
	}
	//REACT STUFF
	//For all the following buttons, pos is the position in the commboard button array and display is what is displayed on the UI

	//RC- render a React function button.
	renderFunctionButton(pos, display, func) {
		return (<Button
			key={pos}
			value={display} 
			style={[styles.baseButton, styles.functionButton, this.state.buttonHL == pos && styles.highlightedButton, {fontSize: Math.floor(Math.min(this.labelLength / display.length, 1) * 300).toString() + "%", height: (1.333 / Math.min(this.labelLength / display.length, 1)).toString() + "em"}]}
			func={() => {func(); this.generateGuesses(true,"",false);}}
			ref={(i) => this.buttons[pos] = i} />);
	}

	//RC- render a React text button
	renderTextButton(pos, display, value) {//value is what is passed to the buffer
		let func = () => {this.props.buffer.write(value, "letter"); this.generateGuesses(true,"",false);};
		return (<Button 
			key={pos}
			value={display} 
			style={[styles.baseButton, styles.textButton, this.state.buttonHL == pos && styles.highlightedButton, {fontSize: Math.floor(Math.min(this.labelLength / display.length, 1) * 300).toString() + "%", height: (1.333 / Math.min(this.labelLength / display.length, 1)).toString() + "em"}]}
			func={func}
			ref={(i) => this.buttons[pos] = i} />);
	}

	//RC
	renderLetterButton(pos, value) {
		return this.renderTextButton(pos, value, value);
	}

	//RC- write the guess label, then iterate through the guesses and render each as a button across the row
	renderGuessButtons(row) {
		let r = [];
		
		r[0] = <td key={row * this.columns}>{this.renderTextButton(row * this.columns, "Guess", "")}</td>;
		for(let i = 1; i < this.columns; i++) {
			let word = this.state.guesses[i - 1] || " ";
			let pos = row * this.columns + i;
			r[i] = <td key={pos}>{this.renderGuessButton(pos, word)}</td>;
		}
		return r;
	}

	//RC
	renderGuessButton(pos, word) {
		let func = () => {this.props.buffer.write(word, "word"); this.generateGuesses(true,"",false);};
		return (<Button 
			key={pos}
			value={word} 
			style={[styles.baseButton, styles.textButton, this.state.buttonHL == pos && styles.highlightedButton, {fontSize: Math.floor(Math.min(this.labelLength / word.length, 1) * 300).toString() + "%", height: (1.333 / Math.min(this.labelLength / word.length, 1)).toString() + "em"}]} 
			func={func}
			ref={(i) => this.buttons[pos] = i} />);
	}

	//RC-render a row at position rowi according to rowLayout
	//if ignoreTitle is true, don't render the row title
	renderRow(rowi, rowLayout, ignoreTitle = false) {
		if(rowLayout.title == "Guess") { //render the guess row.
			return (
				<tr key={rowi} style={[this.state.rowHL == rowi && styles.highlightedRow]}>
					{this.renderGuessButtons(rowi)}
				</tr>);
		}

		let r = [];
		if(!ignoreTitle) {
			r[0] = <td key={rowi * this.columns}>{this.renderTextButton(rowi * this.columns, rowLayout.title, "")}</td>
		}
		let buttons = rowLayout.buttons;

		for(let i = 0; i < buttons.length; i++) {
			let pos = rowi * this.columns + i + 1;
			let ri = (ignoreTitle) ? i : i + 1;

			switch(buttons[i].mode) {
				case "simple":
					r[ri] = <td key={pos}>{this.renderLetterButton(pos, buttons[i].text)}</td>;
					break;
				case "complex":
					r[ri] = <td key={pos}>{this.renderTextButton(pos, buttons[i].label, buttons[i].text)}</td>;
					break;
				case "function":
					let func = this.getFunc(buttons[i].action);
					r[ri] = <td key={pos}>{this.renderFunctionButton(pos, buttons[i].label, func)}</td>;
					break;
				default:
					console.error("invalid button type: " + buttons[i].mode.toString());
			}
		}
		return (
			<tr key={rowi} style={[this.state.rowHL == rowi && styles.highlightedRow]}>
					{r}
				</tr>);
	}

	renderBoard(layout) {
		let r = [];
		let rows = this.rows = layout.rows;
		this.columns = layout.columns;
		this.labelLength = layout.labelLength;

		for(let i = 0; i < rows; i++) {
			r[i] = this.renderRow(i, layout.layout[i], layout.ignoreRowTitles);
		}
		return r;
	}

	render() {
		return(
			<div style={[styles.container]}>
				<table style={[styles.table]}><tbody>
					{this.renderBoard(this.props.layout)}
				</tbody></table>
			</div>);

	}
}

module.exports = {
	CommBoard: Radium(CommBoard),
	layout_en: layout_en,
	layout_es: layout_es,
	layout_phrases: layout_phrases,
};