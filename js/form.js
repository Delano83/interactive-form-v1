//*Interactive Form Javascript*//

//When the DOM is ready, select the Credit Card option in the payment value and hide the Paypal and the Bitcoin option.
$(function() {
  $("#payment").children("option[value='credit card']").attr("selected", true);
  $("p:contains('Paypal')").hide();
  $("p:contains('Bitcoin')").hide();
  $("#credit-card").show();
});

//When the page loads, give focus to the first text field
$("input:text:visible:first").focus();


//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
//I used the change event which is the same as .on('change', {handler})
$("#title").change(function() {
  var end = $("#title option:selected").val();
  if (end === "other") {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
});

//Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
$("form input[name=other]").attr("id", "other-title");
$("#other-title").hide();


//Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
$("#colors-js-puns").hide();

//On change, create two object which are my options for the dropdown
$("#design").change(function() {
  //These are my options for the dropdown in an object
  var jspuns = {
    cornflowerblue: "Cornflower Blue (JS Puns shirt only)",
    darkslategrey: "Dark Slate Grey (JS Puns shirt only)",
    gold: "Gold (JS Puns shirt only)"
  };

  var heartjs = {
    tomato: "Tomato (I &#9829; JS shirt only)",
    steelblue: "Steel Blue (I &#9829; JS shirt only)",
    dimgrey: "Dim Grey (I &#9829; JS shirt only)"
  };

//For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu
//Show color option on change of design
  $("#colors-js-puns").show();
//Remove all the options in the dropdown
  $("#color").children("option").remove();

  var mycolor = $("#color");
  var selectedDesign = $(this).val();
//After removing all the option in the color dropdown, show only the one that correpond to the choosen style
  if (selectedDesign.indexOf("js puns") >= 0) {
    myJsPuns();
  } else if (selectedDesign.indexOf("heart js") >= 0) {
    myHeartJs();
  } else {
    $("#colors-js-puns").hide();
  }

//If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
  function myJsPuns() {
    $.each(jspuns, function(val, text) {
      mycolor.append(
        $("<option></option>").val(val).html(text)
      );
    });
  }

//If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
  function myHeartJs() {
    $.each(heartjs, function(val, text) {
      mycolor.append(
        $("<option></option>").val(val).html(text)
      );
    });
  }
});

//Little extra function to map and display the selected activities above the total price.
function workshops() {
  var arr = $("input:checkbox:checked").map(function() {
    return $(this).closest("label").text();
  }).get();
  $(".myclasses").html("You enrolled for the following workshops: <br>" + arr.join("<br>"));
} workshops();
$(".activities").delegate("input:checkbox", "click", workshops);


//Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time
//Disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
//Simple if else statements for the checkboxes that take care of disabling conflicting workshops and add the price to the total variable.
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

  if ($("input[name=build-tools]").is(":checked")) {
      total += 100;
  }
  if ($("input[name=npm]").is(":checked")) {
      total += 100;
  }
  totalPrice(total);
});


//As a user selects activities, a running total should display below the list of checkboxes.
//For example, if the user selects "Main Conference", then Total: $200 should appear.
//If they add 1 workshop, the total should change to Total: $300
function totalPrice(total) {
  if (typeof total !== 0) {
    $("#totalDiv").remove();
    $(".activities").append("<div id='totalDiv'><strong>Your total is: $" + total + "</strong></div>");
  } else {
    $("#totalDiv").remove();
  }
}

//Create function that will take care of hiding/showing the right payment options depending on the user selection
$("#payment").change(function() {
    if ($(this).val() === "select_method") {
      $("#credit-card").hide();
      $("p:contains('Bitcoin')").hide();
      $("'p:contains('Paypal')").hide();
    }
  //When "PayPal" is selected, display the Paypal and hide CC and bitcoin info
  if ($(this).val() === "paypal") {
    $("#credit-card").hide();
    $("p:contains('Bitcoin')").hide();
    $("p:contains('Paypal')").show();
  }
  //When "Bitcoin" is selected, display Bitcoin and hide CC and paypal
  if ($(this).val() === "bitcoin") {
    $("#credit-card").hide();
    $("p:contains('Paypal')").hide();
    $("p:contains('Bitcoin')").show();
  }
  //When CC is selected, display the credit card information and hide the paypal and bitcoin info..
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
}

//Program at least one of your error messages so that more information is provided depending on the error.
//This function does 4 different checks on submit and displays a custom error message.
//To test all of the error messages out, try submitting the form with the following expressions: " ", "@", "123456", "510510510510510"
//And finally, try these valid card numbers: "5105105105105100", "4111111111111111", "4012888888881881" or even your own card number!
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
    return true;
  }
}

//Live email onkeyup verification based on the regex before submitting the form.
//If the field is not empty and it does not pass the regex test, display error message. Otherwise, put default styling.
  $("#mail").keyup(function(){
  var email = $("#mail").val();
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if ($("#mail").val().length > 1 && regex.test(email) ) {
      $("label[for=mail").text("Email:").css("color", "black");
  } else {
      $("label[for=mail").text("Email: (please provide a valid email address)").css("color", "red");
  }
});

//Give properties to each one of the fields and if any of them are wrong or empty, then prevent the form submission.
function validateForm() {

  //Name field can't be blank
  function validateName() {
  if ($("#name").val().length < 1) {
    $('html, body').animate({
      scrollTop: $("label[for=name]").offset().top
    }, 2000);
      $("label[for=name]").text("Name: (please provide your name)").css("color", "red");
      $("input:text:visible:first").focus();
    } else {
      $("label[for=name]").text("Name:").css("color", "");
      return true;
    }
  } validateName();

  //In the name field onkeyup, display or remove error message.
  $("#name").keyup(function(){
  if ($("#name").val().length > 0) {
    $("label[for=name]").text("Name:").css("color", "");
    return true;
  } else {
    $("label[for=name]").text("Name: (please provide your name)").css("color", "red");
  }
  });

//Validate email when you submit the form by passing the regex test.
  function validateEmail() {
    var email = $("#mail").val();
    if ($("#mail").val().length > 1) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     if (regex.test(email)) {
        $("label[for=mail").text("Email:").css("color", "black");
        return true;
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
          return true;
    }
  } validateActivities();

//T-Shirt theme must be selected. If not, throw error.
  function validateShirtInfo() {
    if($("#design").val() === "Select Theme") {
        $("#validateShirt").remove();
        $(".shirt legend").append("<p id='validateShirt' style='font-size : 15px'>Please choose your T-Shirt</p>").css("color", "#ff0000");
    } else {
       $("#validateShirt").remove();
       $(".shirt legend").css("color", "#000");
       return true;
    }
  } validateShirtInfo();

//Payment option must be selected.
  function validatePaymentOption() {
  if ($('#payment').val() === "select_method"){
      $("label[for=payment]").text("I'm going to pay with: Please select a payment option.").css("color", "red");
  } else {
      $("label[for=payment]").text("I'm going to pay with:").css("color", "black");
      return true;
    }
} validatePaymentOption();
//Must enter a valid zip number of 5 digits. The regex says "digits only"
  function validateZip() {
    var zipval = $("#zip").val();
    if (zipval.length !== 5 || /\D+/g.test(zipval)) {
      $("label[for=zip]").text("Zip Code: Enter valid Zip").css("color", "red");
    } else {
      $("label[for=zip]").text("Zip Code:").css("color", "black");
      return true;
    }
  } validateZip();
//Must enter a valid CVV number of 3 digits. The regex says "digits only"
  function validateCVV() {
    var cvvval = $("#cvv").val();
    if (cvvval.length !== 3 || /\D+/g.test(cvvval)) {
      $("label[for=cvv]").text("CVV: Enter valid CVV").css("color", "red");
    } else {
      $("label[for=cvv]").text("CVV:").css("color", "black");
      return true;
    }
  } validateCVV();

//Return True if all fields are correct, else return false to prevent the submission of the form
var paymentVal = $("#payment").val();
  if (paymentVal === "credit card" && validateCVV() && validateZip() && validateCC() && validateShirtInfo() && validateActivities() && validateEmail() && validateName()) {
    return true;
  } else if (paymentVal === "bitcoin" || paymentVal === "paypal" && validateShirtInfo() && validateActivities() && validateEmail() && validateName()) {
    return true;
  } else {
    return false;
  }
}

//On sumbmit, prevent default and call all the form validation functions.
$("form").submit(function(e){
  if(!validateForm()) {e.preventDefault();}
      validateForm();
      validateCC();
  });
