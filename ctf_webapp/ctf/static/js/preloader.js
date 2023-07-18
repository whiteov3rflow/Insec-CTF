// Tableau de messages à afficher
var strings = [
  "Initialzing request",
  "Resolving internet address 127.0.0.1",
  "Requesting access to server",
  "Entering credentials",
  "Login denied",
  "Re-entering credentials",
  "Access granted",
  "Finding CTF backend services",
  "Services found on port 80",
  "Starting system message bus",
  "Starting Bluetooth services",
  "Starting other filesystems",
  "Starting PC/SC smart card daemon (pcscd)",
  "Starting hidd",
  "Enabling /etc/fstab swaps",
  "INIT: Entering runlevel 3",
  "Entering non-interactive startup",
  // "Applying INTEL CPU microcode update",
  // "Checking for hardware changes",
  // "Bringing up interface eth0",
  // "Determining IP information for eth0... done.",
  // "Starting mcstausd",
  // "Starting portmap",
  // "Starting setroubleshootd",
  // "Starting RPC idmapd",
  // "Starting mdmonitor",
  // "Starting system message bus",
  // "Starting Bluetooth services",
  // "Starting other filesystems",
  // "Starting PC/SC smart card daemon (pcscd)",
  "Starting hidd",
  "Enabling /etc/fstab swaps",
  "INIT: Entering runlevel 3",
  "Entering non-interactive startup",
  "Applying INTEL CPU microcode update",
  "Checking for hardware changes",
  "Bringing up interface eth0",
  "Determining IP information for eth0... done.",
  // "Connecting to backend service",
  // "Connected to backend service",
  "Finding CTF database services",
  "Services found on port 3306",
  "Establishing connection to the database",
  "Connection established",
  "Logging into the database server",
  "Login successful",
  "Reading database",
  "Fetching data from database",
  "Data acquired",
  "Finding other resources",
  "Fetching resources",
  "Processing DOM",
  "Loading images",
  "Loading content",
  "Page rendered",
  "Starting display manager",
  "WELCOME TO INSEC CTF INC 2023",
  "Initializing..."
];

// Récupérer l'élément du DOM avec l'ID "preloader"
var preloader = document.getElementById('preloader');

// Délai entre l'ajout de chaque message
var delay = 100;

// Compteur pour suivre le nombre de messages ajoutés
var count = 0;

// Variable pour gérer les répétitions de délai
var repeat = 0;

// Fonction pour ajouter un message à l'interface utilisateur
function addLog() {
  // Créer un nouvel élément "div" pour le message
  var row = createLog('ok', count);
  // Ajouter le message à l'élément "preloader"
  preloader.appendChild(row);

  // Faire défiler la fenêtre vers le bas pour afficher les nouveaux messages
  goScrollToBottom();

  // Incrémenter le compteur de messages
  count++;

  // Gérer les délais en fonction du nombre de messages ajoutés
  if (repeat == 0) {
    if (count > 3) {
      delay = 30;
    }

    if (count > 6) {
      delay = 40;
    }

    if (count > 8) {
      delay = 30;
    }

    if (count > 10) {
      delay = 30;
    }
  } else {
    if (count > 3) {
      delay = 40;
    }
  }

  // Vérifier s'il reste d'autres messages à ajouter
  if (count < strings.length) {
    // Ajouter un délai avant d'ajouter le prochain message
    setTimeout(function() {
      return addLog();
    }, delay);
  } else {
    // Ajouter un délai supplémentaire avant de créer le dernier message
    setTimeout(function() {
      delay = 1000;
      return createLog("ok");
    }, 1000);
  }
}

// Fonction pour créer un nouvel élément "div" pour un message donné
function createLog(type, index) {
  var row = document.createElement('div');

  // Créer un élément "span" pour afficher le statut du message (par ex. "ok")
  var spanStatus = document.createElement('span');
  spanStatus.className = type;
  spanStatus.innerHTML = type.toUpperCase();

  // Récupérer le message correspondant à l'index donné, ou un message par défaut
  var message = (index != null)
    ? strings[index]
    : 'kernel: Initializing...';

  // Si l'index est nul, c'est le dernier message, effectuer des actions supplémentaires
  if (index == null) {
    // Faire disparaître l'élément "preloader" avec une transition de fondu
    var preloader = $('#preloader');
    jQuery(preloader).fadeOut("slow");
    // Faire apparaître l'élément avec l'ID "main" avec une transition de fondu
    jQuery("#main").fadeIn("slow");
  }

  // Créer un élément "span" pour afficher le message
  var spanMessage = document.createElement('span');
  spanMessage.innerHTML = message;

  // Ajouter les éléments "span" à l'élément "div" principal
  row.appendChild(spanStatus);
  row.appendChild(spanMessage);

  // Renvoyer l'élément "div" créé
  return row;
}

// Fonction pour faire défiler la fenêtre vers le bas
function goScrollToBottom() {
  $(document).scrollTop($(document).height());
}

// Démarrer le processus d'ajout des messages
addLog();
