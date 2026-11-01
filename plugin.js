
/**
 * TV Latam – Canales en vivo (lista M3U)
 * Compatible con el sistema de TV online de la app (getHome + getStreams + type: channel).
 *
 * Métodos: getHome, getNews, getDiscoverFilters, getDiscover,
 *          search, getMeta, getStreams, getCatalogs, getCatalog, getAds
 *
 * Config opcional (userConfig.lista): URL de una lista M3U externa.
 */

var PAGINA = 200;
var MAX_CATEGORIA_CHICA = 3;
var CACHE_MS = 10 * 60 * 1000;

var EMBEBIDA = [
  ["13 C", "http://190.108.83.69:8000/play/a02o/index.m3u8"],
  ["A G WEST", "http://190.108.83.69:8000/play/a0c9/index.m3u8"],
  ["A H L1MAX", "http://190.108.83.69:8000/play/a0bl/index.m3u8"],
  ["A&E HD", "http://190.108.83.69:8000/play/a02y/index.m3u8"],
  ["AMC HD", "http://190.108.83.69:8000/play/a033/index.m3u8"],
  ["AMC SERIES", "http://190.108.83.69:8000/play/a00p/index.m3u8"],
  ["ATV", "http://190.108.83.69:8000/play/a019/index.m3u8"],
  ["AXN HD", "http://190.108.83.69:8000/play/a04c/index.m3u8"],
  ["Adult Swim", "http://190.108.83.69:8000/play/a02k/index.m3u8"],
  ["America TV HD", "http://190.108.83.69:8000/play/a00f/index.m3u8"],
  ["Animal Planet HD", "http://190.108.83.69:8000/play/a043/index.m3u8"],
  ["Antena 3", "http://190.108.83.69:8000/play/a01e/index.m3u8"],
  ["Atres Series HD", "http://190.108.83.69:8000/play/a0al/index.m3u8"],
  ["BBC World", "http://190.108.83.69:8000/play/a01c/index.m3u8"],
  ["BETHEL TV", "http://190.108.83.69:8000/play/a040/index.m3u8"],
  ["Baby TV", "http://190.108.83.69:8000/play/a022/index.m3u8"],
  ["CCTV-CGTN", "http://190.108.83.69:8000/play/a07h/index.m3u8"],
  ["CHV HD", "http://190.108.83.69:8000/play/a03g/index.m3u8"],
  ["CNN Chile", "http://190.108.83.69:8000/play/a0cs/index.m3u8"],
  ["CNN Espanol", "http://190.108.83.69:8000/play/a023/index.m3u8"],
  ["Canal 13 HD", "http://190.108.83.69:8000/play/a02v/index.m3u8"],
  ["Canal N", "http://190.108.83.69:8000/play/a07r/index.m3u8"],
  ["Cartoon Network HD", "http://190.108.83.69:8000/play/a08g/index.m3u8"],
  ["Cartoonito", "http://190.108.83.69:8000/play/a0aa/index.m3u8"],
  ["Cinecanal HD", "http://190.108.83.69:8000/play/a048/index.m3u8"],
  ["Cinemax", "http://190.108.83.69:8000/play/a06s/index.m3u8"],
  ["Comedy Central HD", "http://190.108.83.69:8000/play/a02z/index.m3u8"],
  ["DHE HD", "http://190.108.83.69:8000/play/a03v/index.m3u8"],
  ["DW Espanol", "http://190.108.83.69:8000/play/a01l/index.m3u8"],
  ["De Pelicula", "http://190.108.83.69:8000/play/a06o/index.m3u8"],
  ["Discovery Channel  HD", "http://190.108.83.69:8000/play/a044/index.m3u8"],
  ["Discovery Kids HD", "http://190.108.83.69:8000/play/a0bn/index.m3u8"],
  ["Discovery Science", "http://190.108.83.69:8000/play/a02b/index.m3u8"],
  ["Discovery Theater HD", "http://190.108.83.69:8000/play/a03e/index.m3u8"],
  ["Discovery Turbo", "http://190.108.83.69:8000/play/a026/index.m3u8"],
  ["Discovery World HD", "http://190.108.83.69:8000/play/a036/index.m3u8"],
  ["Disney HD", "http://190.108.83.69:8000/play/a04f/index.m3u8"],
  ["Disney Junior", "http://190.108.83.69:8000/play/a025/index.m3u8"],
  ["E! Entertainment TV", "http://190.108.83.69:8000/play/a02c/index.m3u8"],
  ["ESPN 2 HD", "http://190.108.83.69:8000/play/a0an/index.m3u8"],
  ["ESPN 3 HD", "http://190.108.83.69:8000/play/a039/index.m3u8"],
  ["ESPN 4HD", "http://190.108.83.69:8000/play/a04h/index.m3u8"],
  ["ESPN 5HD", "http://190.108.83.69:8000/play/a032/index.m3u8"],
  ["ESPN 6HD", "http://190.108.83.69:8000/play/a02w/index.m3u8"],
  ["ESPN 7HD", "http://190.108.83.69:8000/play/a049/index.m3u8"],
  ["ESPN HD", "http://190.108.83.69:8000/play/a03s/index.m3u8"],
  ["ESPN Premium HD", "http://190.108.83.69:8000/play/a03w/index.m3u8"],
  ["ETC", "http://190.108.83.69:8000/play/a08c/index.m3u8"],
  ["EWTN", "http://190.108.83.69:8000/play/a02h/index.m3u8"],
  ["El Gourmet HD", "http://190.108.83.69:8000/play/a030/index.m3u8"],
  ["El Trece", "http://190.108.83.69:8000/play/a01d/index.m3u8"],
  ["Enlace", "http://190.108.83.69:8000/play/a02j/index.m3u8"],
  ["Europa Europa", "http://190.108.83.69:8000/play/a00z/index.m3u8"],
  ["Exitosa TV", "http://190.108.83.69:8000/play/a07s/index.m3u8"],
  ["FX HD", "http://190.108.83.69:8000/play/a04i/index.m3u8"],
  ["Film&Arts", "http://190.108.83.69:8000/play/a00n/index.m3u8"],
  ["Food Network", "http://190.108.83.69:8000/play/a08e/index.m3u8"],
  ["France 24", "http://190.108.83.69:8000/play/a01j/index.m3u8"],
  ["G DS", "http://190.108.83.69:8000/play/a0cb/index.m3u8"],
  ["G LA KARIBENA", "http://190.108.83.69:8000/play/a0cd/index.m3u8"],
  ["GLOBAL", "http://190.108.83.69:8000/play/a01b/index.m3u8"],
  ["Golden Edge", "http://190.108.83.69:8000/play/a00w/index.m3u8"],
  ["Golden HD", "http://190.108.83.69:8000/play/a00i/index.m3u8"],
  ["H AMERICA TV", "http://190.108.83.69:8000/play/a097/index.m3u8"],
  ["H ATV SUR HD", "http://190.108.83.69:8000/play/a0cq/index.m3u8"],
  ["H ATV+ HD", "http://190.108.83.69:8000/play/a0cp/index.m3u8"],
  ["H LATELE HD", "http://190.108.83.69:8000/play/a0cr/index.m3u8"],
  ["H LATINA HD", "http://190.108.83.69:8000/play/a09a/index.m3u8"],
  ["H TV PERU", "http://190.108.83.69:8000/play/a092/index.m3u8"],
  ["HBO 2", "http://190.108.83.69:8000/play/a0cx/index.m3u8"],
  ["HBO Family HD", "http://190.108.83.69:8000/play/a03x/index.m3u8"],
  ["HBO HD", "http://190.108.83.69:8000/play/a035/index.m3u8"],
  ["HBO MUNDI", "http://190.108.83.69:8000/play/a01h/index.m3u8"],
  ["HBO POP HD", "http://190.108.83.69:8000/play/a03k/index.m3u8"],
  ["HBO Plus", "http://190.108.83.69:8000/play/a06b/index.m3u8"],
  ["HBO Signature", "http://190.108.83.69:8000/play/a01g/index.m3u8"],
  ["HBO XTREME HD", "http://190.108.83.69:8000/play/a03y/index.m3u8"],
  ["HEI HD", "http://190.108.83.69:8000/play/a072/index.m3u8"],
  ["HGTV", "http://190.108.83.69:8000/play/a02f/index.m3u8"],
  ["HOLA TV HD", "http://190.108.83.69:8000/play/a073/index.m3u8"],
  ["HTV", "http://190.108.83.69:8000/play/a00q/index.m3u8"],
  ["History 2", "http://190.108.83.69:8000/play/a00j/index.m3u8"],
  ["History Channel HD", "http://190.108.83.69:8000/play/a045/index.m3u8"],
  ["Home & Health HD", "http://190.108.83.69:8000/play/a08k/index.m3u8"],
  ["ID HD", "http://190.108.83.69:8000/play/a04d/index.m3u8"],
  ["Kanal D Drama", "http://190.108.83.69:8000/play/a084/index.m3u8"],
  ["L1", "http://190.108.83.69:8000/play/a08s/index.m3u8"],
  ["L1 MAX", "http://190.108.83.69:8000/play/a083/index.m3u8"],
  ["Las Estrellas HD", "http://190.108.83.69:8000/play/a09l/index.m3u8"],
  ["Latina HD", "http://190.108.83.69:8000/play/a00g/index.m3u8"],
  ["Lifetime", "http://190.108.83.69:8000/play/a02i/index.m3u8"],
  ["Love Nature", "http://190.108.83.69:8000/play/a085/index.m3u8"],
  ["MEGA HD", "http://190.108.83.69:8000/play/a03m/index.m3u8"],
  ["MTV HD", "http://190.108.83.69:8000/play/a03a/index.m3u8"],
  ["Movistar Deportes", "http://190.108.83.69:8000/play/a07o/index.m3u8"],
  ["NTN 24 Horas", "http://190.108.83.69:8000/play/a00r/index.m3u8"],
  ["Nat Geo HD", "http://190.108.83.69:8000/play/a046/index.m3u8"],
  ["Nick HD", "http://190.108.83.69:8000/play/a03l/index.m3u8"],
  ["Nuestra Tele", "http://190.108.83.69:8000/play/a00k/index.m3u8"],
  ["OROMAR TV", "http://190.108.83.69:8000/play/a017/index.m3u8"],
  ["POPU TV", "http://190.108.83.69:8000/play/a070/index.m3u8"],
  ["Panamericana", "http://190.108.83.69:8000/play/a018/index.m3u8"],
  ["Pasiones HD", "http://190.108.83.69:8000/play/a03h/index.m3u8"],
  ["Plim Plim TV", "http://190.108.83.69:8000/play/a07n/index.m3u8"],
  ["Plus TV Life", "http://190.108.83.69:8000/play/a086/index.m3u8"],
  ["R ALPHA", "http://190.108.83.69:8000/play/a09c/index.m3u8"],
  ["R CHARAPA TV", "http://190.108.83.69:8000/play/a067/index.m3u8"],
  ["R Estacion Tv", "http://190.108.83.69:8000/play/a07k/index.m3u8"],
  ["R Nex Tv", "http://190.108.83.69:8000/play/a06r/index.m3u8"],
  ["R ORIENTAL", "http://190.108.83.69:8000/play/a05y/index.m3u8"],
  ["R PREMIUM GO", "http://190.108.83.69:8000/play/a082/index.m3u8"],
  ["R PUCALLPA TV", "http://190.108.83.69:8000/play/a05z/index.m3u8"],
  ["R UCAYALINA TV", "http://190.108.83.69:8000/play/a060/index.m3u8"],
  ["RADIO BETHEL", "http://190.108.83.69:8000/play/a041/index.m3u8"],
  ["RPP", "http://190.108.83.69:8000/play/a01a/index.m3u8"],
  ["SONY CHANNEL HD", "http://190.108.83.69:8000/play/a04a/index.m3u8"],
  ["STAR CHANNEL HD", "http://190.108.83.69:8000/play/a04j/index.m3u8"],
  ["Sony Movies", "http://190.108.83.69:8000/play/a08j/index.m3u8"],
  ["Space HD", "http://190.108.83.69:8000/play/a04e/index.m3u8"],
  ["Stingray Concerts HD", "http://190.108.83.69:8000/play/a00d/index.m3u8"],
  ["Studio Universal HD", "http://190.108.83.69:8000/play/a074/index.m3u8"],
  ["Sun Channel HD", "http://190.108.83.69:8000/play/a03z/index.m3u8"],
  ["T NOVA TV", "http://190.108.83.69:8000/play/a07y/index.m3u8"],
  ["T PBO HD", "http://190.108.83.69:8000/play/a05r/index.m3u8"],
  ["TCM", "http://190.108.83.69:8000/play/a00y/index.m3u8"],
  ["TLC", "http://190.108.83.69:8000/play/a02a/index.m3u8"],
  ["TNT HD", "http://190.108.83.69:8000/play/a047/index.m3u8"],
  ["TNT Novelas HD", "http://190.108.83.69:8000/play/a038/index.m3u8"],
  ["TNT Series HD", "http://190.108.83.69:8000/play/a034/index.m3u8"],
  ["TNT Sports Premiun HD", "http://190.108.83.69:8000/play/a03i/index.m3u8"],
  ["TVE", "http://190.108.83.69:8000/play/a08m/index.m3u8"],
  ["TVN HD", "http://190.108.83.69:8000/play/a03f/index.m3u8"],
  ["Telefe", "http://190.108.83.69:8000/play/a08l/index.m3u8"],
  ["Telemundo", "http://190.108.83.69:8000/play/a02d/index.m3u8"],
  ["Tlnovelas", "http://190.108.83.69:8000/play/a06n/index.m3u8"],
  ["Tooncast", "http://190.108.83.69:8000/play/a02e/index.m3u8"],
  ["UNIVERSAL CHANNEL HD", "http://190.108.83.69:8000/play/a031/index.m3u8"],
  ["USA", "http://190.108.83.69:8000/play/a00v/index.m3u8"],
  ["Universal Cinema SD", "http://190.108.83.69:8000/play/a0cz/index.m3u8"],
  ["Universal Comedy SD", "http://190.108.83.69:8000/play/a0d0/index.m3u8"],
  ["Universal Premiere SD", "http://190.108.83.69:8000/play/a0cy/index.m3u8"],
  ["Via X Esports", "http://190.108.83.69:8000/play/a00u/index.m3u8"],
  ["Warner Channel HD", "http://190.108.83.69:8000/play/a04b/index.m3u8"],
  ["Willax", "http://190.108.83.69:8000/play/a07t/index.m3u8"]
];

var CATEGORIAS = [
  { id: "deportes", title: "Deportes", genre: "deportes" },
  { id: "abiertos", title: "Canales abiertos", genre: "entretenimiento" },
  { id: "regionales", title: "Regionales y locales", genre: "entretenimiento" },
  { id: "noticias", title: "Noticias", genre: "noticias" },
  { id: "cine", title: "Cine y series", genre: "peliculas" },
  { id: "novelas", title: "Novelas", genre: "entretenimiento" },
  { id: "documentales", title: "Documentales", genre: "documentales" },
  { id: "estilo", title: "Estilo de vida", genre: "entretenimiento" },
  { id: "infantil", title: "Infantil", genre: "infantil" },
  { id: "musica", title: "Música", genre: "musica" },
  { id: "religiosos", title: "Religiosos", genre: "otros" },
  { id: "otros", title: "Otros", genre: "otros" }
];

var REGLAS = [
  ["deportes", /espn|deportes|tnt sports|(^| )l1( |$)|esports|(^| )ds( |$)|movistar deportes/i],
  ["infantil", /cartoon|toonc|disney|discovery kids|(^| )nick( |$)|plim plim|baby tv/i],
  ["religiosos", /bethel|ewtn|(^| )enlace( |$)/i],
  ["noticias", /(^| )cnn|(^| )dw( |$)|france 24|ntn ?24|bbc|cctv|cgtn|(^| )rpp( |$)|(^| )canal n( |$)|exitosa|willax|noticias/i],
  ["musica", /musica|música|(^| )htv( |$)|(^| )mtv( |$)|stingray|karibena|concert/i],
  ["novelas", /pasiones|novelas|las estrellas|telemundo|kanal d/i],
  ["documentales", /discovery|animal planet|nat geo|history|(^| )a&e( |$)|(^| )id( |$)|love nature|(^| )dhe( |$)/i],
  ["estilo", /food network|gourmet|home & health|hgtv|(^| )tlc( |$)|lifetime|(^| )e!|hola tv/i],
  ["cine", /hbo|cinemax|cinecanal|(^| )amc( |$)|(^| )axn( |$)|(^| )tnt( |$)|(^| )tcm( |$)|universal|(^| )space( |$)|star channel|sony|(^| )fx( |$)|warner|de pelicula|golden|comedy central|(^| )usa( |$)|film ?& ?arts|europa europa|atres series|adult swim/i],
  ["abiertos", /america tv|(^| )atv|latina|panamericana|(^| )global( |$)|tv peru|(^| )etc( |$)|(^| )chv( |$)|(^| )tvn( |$)|(^| )mega( |$)|canal 13|(^| )13 c( |$)|el trece|telefe|(^| )tve( |$)|antena 3|latele|la tele/i],
  ["regionales", /oromar|popu tv|nuestra tele|charapa|pucallpa|ucayalina|oriental|nex tv|estacion tv|alpha|premium go|nova tv|(^| )pbo( |$)/i]
];

var SIGLAS = {hd:1,sd:1,tv:1,hbo:1,tnt:1,cnn:1,amc:1,axn:1,dhe:1,ds:1,fx:1,ntn:1,htv:1,tcm:1,espn:1,bbc:1,cctv:1,cgtn:1,atv:1,chv:1,tvn:1,tve:1,usa:1,etc:1,ewtn:1,rpp:1,mtv:1,tlc:1,hgtv:1,id:1,l1:1,max:1,hei:1,pbo:1,dw:1};
var ADULTO = /playboy|sextreme|^venus$|xxx|porn|erotic/i;

var HOST_BASE = "http://190.108.83.69:8000/";
var DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Referer": HOST_BASE,
  "Origin": "http://190.108.83.69:8000",
  "Accept": "*/*"
};

function cfg(key) {
  try {
    if (typeof globalThis !== "undefined" && globalThis.__nuvioConfig) {
      var root = globalThis.__nuvioConfig;
      var cur = root.current || root;
      // También por id del addon
      if ((!cur || cur[key] == null) && root["tv-latam-lista"]) {
        cur = root["tv-latam-lista"];
      }
      if (cur && cur[key] != null && String(cur[key]).trim() !== "") {
        return String(cur[key]).trim();
      }
    }
  } catch (e) {}
  return "";
}

function sinTildes(s) {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function limpiarNombre(crudo) {
  var n = String(crudo || "");
  n = n.replace(/Ã¦/g, "ñ").replace(/[ÃÂÅ]¦/g, "í").replace(/Ã‘/g, "Ñ")
       .replace(/Ã˜/g, "é").replace(/Ã±/g, "ñ").replace(/Ã¡/g, "á")
       .replace(/Ã©/g, "é").replace(/Ã­/g, "í").replace(/Ã³/g, "ó").replace(/Ãº/g, "ú");
  n = n.replace(/^\d{4}\s+/, "");
  var prefijos = [];
  for (var i = 0; i < 2; i++) {
    var m = n.match(/^([AHRTG]) (?=\S)/);
    if (!m || n.length - 2 < 2) break;
    prefijos.push(m[1]);
    n = n.slice(2);
  }
  n = n.replace(/\bL1MAX\b/i, "L1 MAX");
  n = n.replace(/(\d)(HD)\b/gi, "$1 $2");
  n = n.replace(/\s*\([^)]*[a-z][^)]*\)/g, "");
  n = n.replace(/\s+/g, " ").trim();
  n = n.split(" ").map(function (t, idx) {
    var tieneMin = /[a-zà-ÿ]/.test(t);
    var tieneMay = /[A-Z]/.test(t);
    if (idx > 0 && /^(de|del|la|las|el|los|y)$/i.test(t)) return t.toLowerCase();
    if (tieneMay && !tieneMin) {
      return t.replace(/[A-Za-zÀ-ÿ]+/g, function (w) {
        return SIGLAS[w.toLowerCase()] ? w.toUpperCase() : (w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
      });
    }
    if (tieneMin && !tieneMay) return t.charAt(0).toUpperCase() + t.slice(1);
    return t;
  }).join(" ");
  n = n.replace(/\bMusica\b/g, "Música").replace(/\bPelicula\b/g, "Película")
       .replace(/\bEspanol\b/g, "Español").replace(/\bAmerica\b/g, "América")
       .replace(/\bPeru\b/g, "Perú").replace(/\bEstacion\b/g, "Estación")
       .replace(/\bPremiun\b/g, "Premium").replace(/\bLatele\b/g, "La Tele")
       .replace(/\bTv\b/g, "TV");
  return { titulo: n, prefijos: prefijos };
}

function categoriaDe(titulo, prefijos) {
  var k = sinTildes(titulo);
  for (var i = 0; i < REGLAS.length; i++) {
    if (REGLAS[i][1].test(k)) return REGLAS[i][0];
  }
  if (prefijos.indexOf("R") >= 0 || prefijos.indexOf("T") >= 0) return "regionales";
  return "otros";
}

function parsearM3U(texto) {
  var salida = [];
  var nombre = null;
  var logo = null;
  var lineas = String(texto).split(/\r?\n/);
  for (var i = 0; i < lineas.length; i++) {
    var linea = lineas[i].trim();
    if (!linea) continue;
    if (linea.indexOf("#EXTINF") === 0) {
      var idx = linea.indexOf(",");
      nombre = idx >= 0 ? linea.slice(idx + 1) : "";
      logo = null;
      var lm = linea.match(/tvg-logo="([^"]+)"/i) || linea.match(/tvg-logo='([^']+)'/i);
      if (lm) logo = lm[1];
      continue;
    }
    if (linea.charAt(0) === "#") continue;
    if (/^https?:\/\//i.test(linea)) {
      salida.push({ nombre: nombre || linea, url: linea, logo: logo });
    }
    nombre = null;
    logo = null;
  }
  return salida;
}

function idDe(url) {
  var m = String(url).match(/\/play\/([A-Za-z0-9]+)\//);
  if (m) return m[1];
  var h = 5381;
  for (var i = 0; i < url.length; i++) h = ((h * 33) ^ url.charCodeAt(i)) >>> 0;
  return "c" + h.toString(16);
}

function clave(titulo) {
  return sinTildes(titulo).replace(/(^| )hd( |$)/g, " ").replace(/\s+/g, " ").trim();
}

function comparar(a, b) {
  var ta = a.split(/(\d+)/);
  var tb = b.split(/(\d+)/);
  var n = Math.min(ta.length, tb.length);
  for (var i = 0; i < n; i++) {
    if (ta[i] === tb[i]) continue;
    if (i % 2 === 1) return Number(ta[i]) - Number(tb[i]);
    return ta[i] < tb[i] ? -1 : 1;
  }
  return ta.length - tb.length;
}

function preparar(entradas) {
  var urls = {}, ids = {}, nombres = {}, lista = [];
  for (var i = 0; i < entradas.length; i++) {
    var e = entradas[i];
    if (!e || !/^https?:\/\//i.test(e.url) || urls[e.url]) continue;
    if (ADULTO.test(String(e.nombre || "").trim())) continue;
    urls[e.url] = 1;
    var limpio = limpiarNombre(e.nombre);
    var titulo = limpio.titulo;
    if (!titulo) continue;
    var veces = (nombres[titulo] || 0) + 1;
    nombres[titulo] = veces;
    if (veces > 1) titulo += " (" + veces + ")";
    var id = idDe(e.url);
    while (ids[id]) id += "x";
    ids[id] = 1;
    lista.push({
      id: id,
      title: titulo,
      categoryId: categoriaDe(titulo, limpio.prefijos),
      url: e.url,
      logo: e.logo || null
    });
  }
  var cuenta = {};
  for (var j = 0; j < lista.length; j++) cuenta[lista[j].categoryId] = (cuenta[lista[j].categoryId] || 0) + 1;
  for (var k = 0; k < lista.length; k++) {
    var c = lista[k];
    if (c.categoryId !== "deportes" && c.categoryId !== "otros" && (cuenta[c.categoryId] || 0) <= MAX_CATEGORIA_CHICA) {
      c.categoryId = "otros";
    }
  }
  lista.sort(function (a, b) { return comparar(clave(a.title), clave(b.title)); });
  return lista;
}

function categoriaTitle(id) {
  for (var i = 0; i < CATEGORIAS.length; i++) if (CATEGORIAS[i].id === id) return CATEGORIAS[i].title;
  return id;
}

/** Item compatible con ContentItem de la app (type channel + extra.streamUrl). */
function toChannelItem(c) {
  var catTitle = categoriaTitle(c.categoryId) || c.categoryId || "En vivo";
  return {
    id: "ch-" + c.id,
    title: c.title,
    type: "channel",
    poster: c.logo || null,
    backdrop: c.logo || null,
    logo: c.logo || null,
    overview: "Canal en vivo · " + catTitle,
    genres: [catTitle, "En vivo"],
    seasons: [],
    // Campos planos también en raíz (ContentItem.fromJson guarda todo en extra)
    streamUrl: c.url,
    currentProgram: null,
    extra: {
      ref: c.id,
      postType: "channel",
      originalId: c.id,
      categoryId: c.categoryId,
      streamUrl: c.url,
      isLive: true,
      isHls: true
    }
  };
}

function streamHeadersFor(url) {
  var h = {};
  for (var k in DEFAULT_HEADERS) h[k] = DEFAULT_HEADERS[k];
  try {
    if (url && /^https?:\/\//i.test(url)) {
      var m = String(url).match(/^(https?:\/\/[^/]+)/i);
      if (m) {
        h["Referer"] = m[1] + "/";
        h["Origin"] = m[1];
      }
    }
  } catch (e) {}
  return h;
}

/** StreamServer compatible con StreamServer.fromJson de la app. */
function toStreamServer(c) {
  var headers = streamHeadersFor(c.url);
  return {
    url: c.url,
    name: c.title || "En vivo",
    title: c.title || "En vivo",
    quality: "Live",
    language: "es",
    type: "hls",
    isHls: true,
    headers: headers,
    behaviorHints: {
      notWebReady: false,
      bingeGroup: "tv-latam-" + (c.categoryId || "live"),
      proxyHeaders: {
        request: headers
      }
    }
  };
}

function normalizeId(id) {
  if (id == null) return "";
  if (typeof id === "object") {
    id = id.id || id.contentId || id.metaId || id.tmdbId || "";
  }
  return String(id).replace(/^ch-/, "").trim();
}

var _cacheLista = null;
var _cacheTs = 0;
var _byId = null;

function indexar(lista) {
  _byId = {};
  for (var i = 0; i < lista.length; i++) {
    _byId[lista[i].id] = lista[i];
    _byId["ch-" + lista[i].id] = lista[i];
  }
}

async function canalesActuales(force) {
  var ahora = Date.now();
  if (!force && _cacheLista && (ahora - _cacheTs) < CACHE_MS) return _cacheLista;

  var direccion = cfg("lista");
  var entradas = null;

  if (direccion && /^https?:\/\//i.test(direccion)) {
    try {
      var res = await fetch(direccion, {
        method: "GET",
        headers: {
          "User-Agent": DEFAULT_HEADERS["User-Agent"],
          "Accept": "application/vnd.apple.mpegurl,text/plain,*/*"
        }
      });
      if (res && (res.ok || res.status === 200)) {
        var texto = typeof res.text === "function" ? await res.text() : (res.data || "");
        var nuevas = parsearM3U(texto).slice(0, 2000);
        if (nuevas.length > 0) entradas = nuevas;
      }
    } catch (e) {
      // Si falla la lista externa, cae a embebida
    }
  }

  if (!entradas) {
    entradas = [];
    for (var i = 0; i < EMBEBIDA.length; i++) {
      entradas.push({ nombre: EMBEBIDA[i][0], url: EMBEBIDA[i][1], logo: null });
    }
  }

  _cacheLista = preparar(entradas);
  _cacheTs = ahora;
  indexar(_cacheLista);
  return _cacheLista;
}

function buscarCanal(id) {
  var raw = normalizeId(id);
  if (!raw) return null;
  if (_byId) {
    if (_byId[raw]) return _byId[raw];
    if (_byId["ch-" + raw]) return _byId["ch-" + raw];
  }
  return null;
}

async function getHome() {
  var canales = await canalesActuales();
  var porCat = {};
  for (var i = 0; i < canales.length; i++) {
    var c = canales[i];
    if (!porCat[c.categoryId]) porCat[c.categoryId] = [];
    porCat[c.categoryId].push(c);
  }

  var rows = [];

  // Hero / destacados (deportes o todos)
  var heroSrc = porCat["deportes"] || canales;
  if (heroSrc.length) {
    rows.push({
      id: "en-vivo",
      title: "En vivo ahora",
      type: "hero",
      imageStyle: "backdrop",
      items: heroSrc.slice(0, 12).map(toChannelItem)
    });
  }

  // Filas por categoría (la app RepoLivePage filtra type channel / títulos live)
  for (var ci = 0; ci < CATEGORIAS.length; ci++) {
    var cat = CATEGORIAS[ci];
    var list = porCat[cat.id];
    if (!list || !list.length) continue;
    rows.push({
      id: cat.id,
      title: cat.title,
      type: "row",
      imageStyle: "poster",
      items: list.slice(0, 48).map(toChannelItem)
    });
  }

  return rows;
}

async function getNews() {
  return (await canalesActuales()).slice(0, 16).map(toChannelItem);
}

async function getDiscoverFilters() {
  var canales = await canalesActuales();
  var presentes = {};
  for (var i = 0; i < canales.length; i++) presentes[canales[i].categoryId] = 1;
  var options = [{ id: "all", label: "Todos" }];
  for (var j = 0; j < CATEGORIAS.length; j++) {
    if (presentes[CATEGORIAS[j].id]) {
      options.push({ id: CATEGORIAS[j].id, label: CATEGORIAS[j].title });
    }
  }
  return [{ id: "category", title: "Categoría", label: "Categoría", type: "select", options: options }];
}

async function getDiscover(opts) {
  opts = opts || {};
  // La app a veces pasa args como objeto único
  if (typeof opts === "string") opts = { category: opts };
  var page = parseInt(opts.page, 10) || 1;
  var cat = opts.category || opts.filter || opts.filterId || opts.type || "all";
  if (cat === "channel" || cat === "live" || cat === "tv") cat = "all";
  var canales = await canalesActuales();
  if (cat && cat !== "all") canales = canales.filter(function (c) { return c.categoryId === cat; });
  var perPage = 24;
  var start = (page - 1) * perPage;
  return {
    items: canales.slice(start, start + perPage).map(toChannelItem),
    hasMore: start + perPage < canales.length,
    page: page
  };
}

async function search(query) {
  if (query && typeof query === "object") query = query.query || query.q || query.text || "";
  if (!query || typeof query !== "string" || !query.trim()) return [];
  var q = sinTildes(query.trim());
  var canales = await canalesActuales();
  var out = [];
  for (var i = 0; i < canales.length; i++) {
    if (sinTildes(canales[i].title).indexOf(q) >= 0) out.push(toChannelItem(canales[i]));
  }
  return out;
}

async function getMeta(id) {
  // Soporta getMeta(id) o getMeta({ id })
  var raw = normalizeId(id);
  var canales = await canalesActuales();
  var c = buscarCanal(raw);
  if (!c) {
    for (var i = 0; i < canales.length; i++) {
      if (canales[i].id === raw || ("ch-" + canales[i].id) === String(id)) {
        c = canales[i];
        break;
      }
    }
  }
  if (c) {
    var item = toChannelItem(c);
    item.seasons = [];
    return item;
  }
  return {
    id: String(id || raw || ""),
    title: "Canal",
    type: "channel",
    overview: "Canal en vivo",
    genres: ["En vivo"],
    seasons: [],
    extra: { postType: "channel", originalId: raw, isLive: true }
  };
}

/**
 * La app llama: getStreams(id, type, season, episode)
 * También puede llegar solo id o un objeto.
 */
async function getStreams(id, type, season, episode) {
  var raw = normalizeId(id);
  if (!raw && type && typeof type === "object") raw = normalizeId(type);

  var canales = await canalesActuales();
  var c = buscarCanal(raw);

  if (!c) {
    for (var i = 0; i < canales.length; i++) {
      if (
        canales[i].id === raw ||
        ("ch-" + canales[i].id) === String(id) ||
        canales[i].id === String(id)
      ) {
        c = canales[i];
        break;
      }
    }
  }

  if (!c || !c.url) return [];

  return [toStreamServer(c)];
}

async function getCatalogs() {
  var canales = await canalesActuales();
  var presentes = {};
  for (var i = 0; i < canales.length; i++) presentes[canales[i].categoryId] = 1;
  var out = [];
  for (var j = 0; j < CATEGORIAS.length; j++) {
    if (presentes[CATEGORIAS[j].id]) {
      out.push({
        id: CATEGORIAS[j].id,
        title: CATEGORIAS[j].title,
        type: "channel"
      });
    }
  }
  return out;
}

async function getCatalog(catalogId, opts) {
  opts = opts || {};
  if (typeof catalogId === "object") {
    opts = catalogId;
    catalogId = opts.id || opts.catalogId || opts.category;
  }
  var page = parseInt(opts.page, 10) || 1;
  var canales = (await canalesActuales()).filter(function (c) {
    return c.categoryId === catalogId;
  });
  var perPage = 24;
  var start = (page - 1) * perPage;
  return {
    items: canales.slice(start, start + perPage).map(toChannelItem),
    hasMore: start + perPage < canales.length,
    page: page
  };
}

async function getAds() {
  return [];
}

module.exports = {
  getHome: getHome,
  getNews: getNews,
  getDiscoverFilters: getDiscoverFilters,
  getDiscover: getDiscover,
  search: search,
  getMeta: getMeta,
  getStreams: getStreams,
  getCatalogs: getCatalogs,
  getCatalog: getCatalog,
  getAds: getAds
};
