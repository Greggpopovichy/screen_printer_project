// $(document).ready(function() {
// //home page logic - carousel and masonry
//
//     // var $grid = $('.grid').imagesLoaded( function() {
//     //     // init Masonry after all images have loaded
//     //     $grid.masonry({
//     //         columnWidth: 80
//     //     });
//     //     // change size of item by toggling gigante class
//     //     $grid.on( 'click', '.grid-item', function() {
//     //         $(this).toggleClass('gigante');
//     //         // trigger layout after item size changes
//     //         $grid.masonry('layout');
//     //         // options...
//     //     });
//     // });
//
//
// //user form data post
// //     $("#signupSubmit").on("click", function (event) {
// //         // Make sure to preventDefault on a submit event.
// //         event.preventDefault();
// //
// //         var newUser = {
// //             User_first_name: $("#fName-input").val().trim(),
// //             User_last_name: $("#lName-input").val().trim(),
// //             User_number: $("#number-input").val().trim(),
// //             User_email: $("#email-input").val().trim(),
// //         };
// //
// //         console.log(newUser);
// //
// //         // Send the POST request.
// //         $.ajax("/signup", {
// //             type: "POST",
// //             data: newUser
// //         }).then(function () {
// //                 //this should log to browser console to let us know that the database has been updated
// //                 console.log("created new user");
// //                 // Reload the page to get the updated list
// //                 location.reload();
// //             }
// //         );
// //     });
//
//
//     $("#forgot").on("click", function (event) {
//         event.preventDefault();
//
//         var sendTo = $("[name=emailpw]").val().trim();
//
//         console.log("send to" + sendTo);
//         // Send the PUT request.
//         $.ajax("/forgotPassword/" + sendTo, {
//             type: "GET",
//             data: sendTo
//         }).then(
//             function () {
//                 console.log("updated id ", id);
//                 // Reload the page to get the updated list
//                 location.reload();
//             }
//         );
//
//     });
//
// });


