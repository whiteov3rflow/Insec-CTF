// Fonction pour obtenir la valeur d'un cookie
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Vérifier si le cookie correspond au nom donné
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        // Décode la valeur du cookie
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Fonction pour vérifier la réponse à l'aide d'une requête AJAX
function checkAnswer(form) {
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      // Vérifier si l'URL est relative et ajouter le jeton CSRF à l'en-tête de la requête
      if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      }
    }
  });

  $.ajax({
    type: "POST",
    url: "/check",
    data: $(form).serialize(),
    beforeSend: function(xhr, settings) {
      // Appeler la fonction beforeSend définie dans les paramètres globaux de jQuery.ajaxSetup
      $.ajaxSettings.beforeSend(xhr, settings);
    },
    success: function(data) {
      console.log(data);
      if (data.trim() == "0") {
        // Afficher une notification en cas de réponse incorrecte
        $.notify({
          message: 'Flag is incorrect!'
        }, {
          type: 'danger'
        });
      } else if (data.trim() == "-1") {
        // Afficher une notification si le niveau de difficulté n'est pas sélectionné
        $.notify({
          message: 'Please select the difficulty level!'
        }, {
          type: 'warning'
        });
      } else if (data.trim() == "2") {
        // Afficher une notification si le problème est déjà résolu
        $.notify({
          message: 'Already Solved!'
        }, {
          type: 'info'
        });
      } else if (data.trim() == "1") {
        // Afficher une notification en cas de réponse correcte
        $.notify({
          message: 'Flag is correct!'
        }, {
          type: 'success'
        });
      }
    }
  });
}

// Fonction pour obtenir un indice à l'aide d'une requête AJAX
function getHint(hintId) {
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      // Vérifier si l'URL est relative et ajouter le jeton CSRF à l'en-tête de la requête
      if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      }
    }
  });

  $.ajax({
    type: "POST",
    url: "/hint",
    data: {
      id: hintId
    },
    beforeSend: function(xhr, settings) {
      // Appeler la fonction beforeSend définie dans les paramètres globaux de jQuery.ajaxSetup
      $.ajaxSettings.beforeSend(xhr, settings);
    },
    success: function(data) {
      console.log(data);
      // Mettre à jour le paragraphe contenant l'indice avec les données renvoyées
      $('#hintParagraph').html(data);
    }
  });
}
