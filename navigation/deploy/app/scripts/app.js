$(document).ready(function () {
	setTimeout(function(){
		$('.first').fadeOut().remove();
		$('.hello').fadeIn('slow');
	}, 1500);

	$('.register').on('click', function() {
		$('.wrapper-register').fadeIn();
	});

	$('form button').on('click', function() {
		$('.wrapper-register').fadeOut();
		$('.wrapper-login').fadeOut();
	});
});