// next prev
var divs = $(".show-section section");
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first

const nombre = $("#nombre");
const instagram = $("#insta");
const comentarios = $("#comentarios");
const terminos = $("#terminos");

$(document).on('keydown', function(event) {
  // Check if the pressed key is Enter (keyCode 13)
  if (event.keyCode === 13) {
    // Prevent the default behavior of Enter key press
    event.preventDefault();
    
    // Optionally, replace this with your desired behavior
    console.log("Enter key pressed!");
  }
});

function next() {
  divs.eq(now).hide();
  now = now + 1 < divs.length ? now + 1 : 0;
  divs.eq(now).show(); // show next
  console.log(now);
}

$(".radioField2").click(function () {
  $(".radioField2").removeClass("checked");
  $(".radioField2 input").attr("checked", false);
  $(this).addClass("checked");
  $(this).children("input").attr("checked", true);
});

// quiz validation
var checkedradio = false;

function radiovalidate(stepnumber) {
  var checkradio = $("#step" + stepnumber + " input")
    .map(function () {
      if ($(this).is(":checked")) {
        return true;
      } else {
        return false;
      }
    })
    .get();

  checkedradio = checkradio.some(Boolean);
}

function obtenerValorCookie(nombreCookie) {
  // Buscar la cookie por nombre
  let cookie = document.cookie.match(new RegExp(`(^| )${nombreCookie}=([^;]+)`));

  // Si la cookie existe, retornar su valor
  if (cookie) {
    return decodeURIComponent(cookie[2]);
  }

  // Si la cookie no existe, retornar null
  return null;
}




// check step0
$("#step0btn").on("click", function (e) {
  const longitud = nombre.val().length;
  const longitudInsta = instagram.val().length;


  const nombreUsuario = obtenerValorCookie("nombreUsuario");
  var valoruser = document.getElementById("insta").value;

  if (nombreUsuario && nombreUsuario === valoruser) {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">El usuario ya existe</div>'
      )
    );
  } 

   else if (nombre.val() === "" || instagram.val() === "") {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">Debes llenar todos los campos</div>'
      )
    );
  } else if (longitud > 70 || longitud <= 3) {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">El nombre no cumple la longitud mínima</div>'
      )
    );
  } else if (longitudInsta > 30 || longitudInsta <= 3) {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">El usuario no cumple con la longitud mínima</div>'
      )
    );
  } else {
    next();
  }
});

// check step1
$("#step1btn").on("click", function () {
  radiovalidate(1);

  if (checkedradio == false) {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">Escoge una opción</div>'
      )
    );

    radiovalidate(1);
  } else {
    next();
  }
});

// check step2
$("#step2btn").on("click", function () {
  radiovalidate(2);

  if (checkedradio == false) {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">Escoge una opción</div>'
      )
    );

    radiovalidate(2);
  } else {
    next();
  }
});

// check step3
$("#step3btn").on("click", function () {
  radiovalidate(3);

  if (checkedradio == false) {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">Escoge una opción</div>'
      )
    );

    radiovalidate(3);
  } else {
    next();
  }
});

// check step4
$("#step4btn").on("click", function () {
  radiovalidate(4);

  if (checkedradio == false) {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">Escoge una opción</div>'
      )
    );

    radiovalidate(4);
  } else {
    next();
  }
});

// check last step
$("#sub").on("click", function (e) {
  // e.preventDefault();

  var nombreUsuario = document.getElementById("insta").value;

  // Establece la cookie con el nombre del usuario
  document.cookie = "nombreUsuario=" + nombreUsuario;

  if (comentarios.val() === "") {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">Cuéntanos tu historia</div>'
      )
    );
  } else if (!terminos.is(":checked")) {
    (function (el) {
      setTimeout(function () {
        el.children().remove(".reveal");
      }, 3000);
    })(
      $("#error").append(
        '<div class="reveal alert alert-danger">Debes aceptar terminos y condiciones</div>'
      )
    );
  } else {
    $(".surveyForm").addClass("d-none");
    $(".loading").addClass("d-grid");
    setTimeout(function () {
      $(".loading").removeClass("d-grid");
      $(".loading").addClass("d-none");
      $(".thankyou").addClass("d-grid");
    }, 2000);

    $("#sub").html("done");
    // $(this).unbind('submit').submit();
  }
});

// EVITAR ESCIBIR si no es texto válido

$(document).ready(function () {
  // Selecciona el campo de texto
  const nombrekey = $("#nombre");
  const instakey = $("#insta");

  // Función para evitar que se escriban más de 100 caracteres
  function limitarCaracteres() {
    // Obtiene la longitud del valor del campo de texto
    const longkey = nombrekey.val().length;
    const longkeyinsta = instakey.val().length;

    // Si la longkey es mayor a 100, elimina los caracteres sobrantes
    if (longkey > 70) {
      nombrekey.val(nombrekey.val().substring(0, 70));
    }
    if (longkeyinsta > 30) {
      instakey.val(instakey.val().substring(0, 30));
    }

    //  VALIDACIÓN SOLO LETRAS

    // Obtiene el valor del campo de texto
    const nombreval = nombre.val();
    const instaval = instagram.val();

    // Expresión regular para validar letras, incluyendo acentos y la ñ
    const regex = /^[a-záéíóúñA-Z ]+$/i;
    const regexInsta = /^(?!.*\.{2})^([a-zA-Z\d_]{1,30})$/i;

    // Valida si el nombre cumple con la expresión regular
    const valido = regex.test(nombrekey);
    const validoInsta = regexInsta.test(instakey);

    // Si el nombre no es válido, muestra un mensaje de error
    if (!valido) {
      nombrekey.val(nombreval.replace(/[^a-záéíóúñA-Z ]+/g, ""));
    }

    // Si el nombre no es válido, muestra un mensaje de error
    if (!validoInsta) {
      instakey.val(instaval.replace(/[^a-zA-Z\d_]+/g, ""));
    }
  }

  // Limita los caracteres al escribir en el campo de texto
  nombrekey.on("keyup", limitarCaracteres);
  instakey.on("keyup", limitarCaracteres);
});

//   const regex = /^(?!.*\.{2})^([a-z\d_]{1,30})$/i;
// nombrekey.val(nombreval.replace(/[^a-z\d_]+/g, ''));

$('input[type="checkbox"]').css({
  width: "20px",
  height: "20px",
});


