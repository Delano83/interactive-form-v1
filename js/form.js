//*Interactive Form Javascript*//
//**Helper CSS Classes**//
//is-hidden & clearfix
//Global Variables
//Create a function that sets focus on the first input field onload
$(document).ready(function() {
  $("#payment").children("option[value='credit card']").attr("selected", true);
  $("p:contains('Paypal')").hide();
  $("p:contains('Bitcoin')").hide();
  $("#credit-card").show();
  $("#").hide();

});

$("input:text:visible:first").focus();

//Create a function that hides the input field 'other' and show if option selected is "Other"
//Add an ID of other-title
$("form input[name=other]").attr('id', 'other-title');
$("#other-title").hide();

$("#title").change(function() {
  var end = $('#title option:selected').val();
  if (end === "other") {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
});

//Create a function that hides the color option field
//When the user checks one of the design options, make that field appear
//When punch is selected, show the punch options, else show the I love JS options
$("#colors-js-puns").hide();

$("#design").change(function() {

  var jspuns = {
    cornflowerblue: 'Cornflower Blue (JS Puns shirt only)',
    darkslategrey: 'Dark Slate Grey (JS Puns shirt only)',
    gold: 'Gold (JS Puns shirt only)'
  };

  var heartjs = {
    tomato: 'Tomato (I &#9829; JS shirt only)',
    steelblue: 'Steel Blue (I &#9829; JS shirt only)',
    dimgrey: 'Dim Grey (I &#9829; JS shirt only)'
  };

  //this option selected
  $("#colors-js-puns").show();
  $("#color").children('option').remove();

  var mycolor = $('#color');
  var selectedDesign = $(this).val();

  if (selectedDesign.indexOf("js puns") >= 0) {
    myJsPuns();
  } else if (selectedDesign.indexOf("heart js") >= 0) {
    myHeartJs();
  } else {
    $("#colors-js-puns").hide();
  }

  function myJsPuns() {
    $.each(jspuns, function(val, text) {
      mycolor.append(
        $('<option></option>').val(val).html(text)
      );
    })
  };

  function myHeartJs() {
    $.each(heartjs, function(val, text) {
      mycolor.append(
        $('<option></option>').val(val).html(text)
      );
    })
  };
});


function workshops() {

  var arr = $("input:checkbox:checked").map(function() {
    return $(this).closest("label").text();
  }).get();
  $(".myclasses").html("You enrolled for the following workshops: <br>" + arr.join("<br>"));
}

workshops();

$(".activities").delegate("input:checkbox", "click", workshops);



$(".activities").on("click", function() {
  var total = 0;
  if ($("input[name='all']").is(":checked")) {
    total += 200;
  }
  if ($("input[name='js-frameworks']").is(":checked")) {
    total += 100;
    $("input[name='express']").attr("disabled", true);
  } else {
    $("input[name='express']").attr("disabled", false);
  }
  if ($("input[name='js-libs']").is(":checked")) {
    total += 100;
    $("input[name='node']").attr("disabled", true);
    } else {
    $("input[name='node']").attr("disabled", false);
    }
  if ($("input[name='express']").is(":checked")) {
    total += 100;
    $("input[name='js-frameworks']").attr("disabled", true);
  } else {
    $("input[name='js-frameworks']").attr("disabled", false);
  }
  if ($("input[name='node']").is(":checked")) {
    total += 100;
    $("input[name='js-libs']").attr("disabled", true);
  } else {
    $("input[name='js-libs']").attr("disabled", false);
  }

  if ($('input[name=build-tools]').is(":checked")) {
      total += 100;
  }
  if ($('input[name=npm]').is(":checked")) {
      total += 100;
  }
  console.log(total);
  totalPrice(total);
});


//Create a running total function that selects the $ value of the selected checkbox and add it in an array
//this function is disabling the selected activities in conflict
function totalPrice(total) {
  if (typeof total !== 0) {
    $("#totalDiv").remove();
    $(".activities").append("<div id='totalDiv'><strong>Your total is: $" + total + "</strong></div>");
  } else {
    $("#totalDiv").remove();
  }
}

//Create a function that displays the CC div by default (onlad) and hides the two other options
//Payment Info section of the form: display payment sections based on chosen payment option
$("#payment").change(function() {
    if ($(this).val() === "select_method") {
      $("#credit-card").hide();
      $("p:contains('Bitcoin')").hide();
      $("'p:contains('Paypal')").hide();
    }
  //When a user selects the "PayPal" payment option, display the Paypal information, and hide the credit card information and the "Bitcoin" information.
  if ($(this).val() === "paypal") {
    $("#credit-card").hide();
    $("p:contains('Bitcoin')").hide();
    $("p:contains('Paypal')").show();
  }
  //When a user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card and paypal information.
  if ($(this).val() === "bitcoin") {
    $("#credit-card").hide();
    $("p:contains('Paypal')").hide();
    $("p:contains('Bitcoin')").show();
  }
  //When a user selects the CC payment option, display the credit card information, and hide the paypal and bitcoin information.
  if ($(this).val() === "credit card") {
    $("#credit-card").show();
    $("p:contains('Paypal')").hide();
    $("p:contains('Bitcoin')").hide();
  }
});

//Check if credit card number is valid or not with the Luhn check algorithm

function checkcc(number) {
  var len = number.length,
  mul = 0,
  prodArr = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
  ],
  sum = 0;

  while (len--) {
    sum += prodArr[mul][parseInt(number.charAt(len), 10)];
    mul ^= 1;
  }

  return sum % 10 === 0 && sum > 0;
};

function validateCC() {
  var ccnum = $("#cc-num").val();
  if(ccnum.length < 1) {
      $("label[for=cc-num]").text("Card Number: Can't be blank.").css("color", "red");
  } else if (/[^0-9]+/.test(ccnum)) {
    $("label[for=cc-num]").text("Card Number: Please enter digits only.").css("color", "red");
  } else if (ccnum.length < 13 || ccnum.length > 16) {
    $("label[for=cc-num]").text("Card Number: Must be between 13 and 16 digits.").css("color", "red");
  } else if (!checkcc(ccnum)) {
    $("label[for=cc-num]").text("Card Number: Your card number is invalid.").css("color", "red");
  } else {
    $("label[for=cc-num]").text("Card Number:").css("color", "black");
  }
}


  $("#mail").keyup(function(){
  var email = $("#mail").val();
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if ($("#mail").val().length > 1 && regex.test(email) ) {
      $("label[for=mail").text("Email:").css("color", "black");
  } else {
      $("label[for=mail").text("Email: (please provide a valid email address)").css("color", "red");
  }
});

//Give properties to each one of the fields (maxlength) and if any of them are wrong||empty, then disable the submit button
function validateForm() {

  function validateName() {
  if ($("#name").val().length < 1) {
    $('html, body').animate({
      scrollTop: $("label[for=name]").offset().top
    }, 2000);
      $("label[for=name]").text("Name: (please provide your name)").css("color", "red");
      $("input:text:visible:first").focus();
    } else {
      $("label[for=name]").text("Name:").css("color", "");
    }
  } validateName();

  $("#name").keyup(function(){
  if ($("#name").val().length > 0) {
    $("label[for=name]").text("Name:").css("color", "");
  } else {
    $("label[for=name]").text("Name: (please provide your name)").css("color", "red");
  }
  });

  function validateEmail() {
    var email = $("#mail").val();
    if ($("#mail").val().length > 1) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     if (regex.test(email)) {
        $("label[for=mail").text("Email:").css("color", "black");
      }
    } else {
        $("label[for=mail").text("Email: (please provide a valid email address)").css("color", "red");
    }
  } validateEmail();

  //At least one activity must be checked from the list under "Register for Actitivities."
  function validateActivities() {
    if ($("input:checkbox:checked").length < 1) {
        $(".activities legend").text("Register for activities: (please select an activity)").css("color", "red");
    } else {
          $(".activities legend").text("Register for activities:").css("color", "");
    }
  } validateActivities();

  function validateShirtInfo() {
    if($("#design").val() === "Select Theme") {
        $("#validateShirt").remove();
        $(".shirt legend").append("<p id='validateShirt' style='font-size : 15px'>Please choose your T-Shirt</p>").css('color', '#ff0000');
    } else {
       $("#validateShirt").remove();
       $(".shirt legend").css("color", "#000");

    }
  } validateShirtInfo();

  //Payment option must be selected.
  function validatePaymentOption() {
  if ($('#payment').val() === "select_method"){
      $("label[for=payment]").text("I'm going to pay with: Please select a payment option.").css("color", "red");
  } else {
      $("label[for=payment]").text("I'm going to pay with:").css("color", "black");
        }
} validatePaymentOption();

  function validateZip() {
    var zipval = $('#zip').val();
    if (zipval.length !== 5 || /\D+/g.test(zipval)) {
      $("label[for=zip]").text("Zip Code: Enter valid Zip").css("color", "red");
    } else {
      $("label[for=zip]").text("Zip Code:").css("color", "black");
    }
  } validateZip();

  function validateCVV() {
    var cvvval = $('#cvv').val();
    if (cvvval.length !== 3 || /\D+/g.test(cvvval)) {
      $("label[for=cvv]").text("CVV: Enter valid CVV").css("color", "red");
    } else {
      $("label[for=cvv]").text("CVV:").css("color", "black");
    }
  } validateCVV();

}
//Create all the if's for the display error messages

//Add all elements

$("button[type=submit]").click(function(event) {
  event.preventDefault();
  validateForm();
  validateCC();
});
