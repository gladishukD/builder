$(document).ready(function(){$(".slider-wrap").slick({arrow:false, autoplay:true,
	autoplaySpeed:4000,dots:true,infinite:true,speed:300,slidesToShow:1,slidesToScroll:1,arrows:false,asNavFor:'.slider-for'});$('.slider-for').slick({slidesToShow:1, autoplay:true,
	autoplaySpeed:4000,slidesToScroll:1,arrows:false,fade:true,asNavFor:'.slider-wrap'});function append(){var myDiv1Para=$('.wrap-article-content1');myDiv1Para.append($('.article-contain article .wrap-article-content .right-content .right-content-btn1'));var myDiv2Para=$('.wrap-article-content2');myDiv2Para.append($('.article-contain article .wrap-article-content .right-content .right-content-btn2'));var myDiv3Para=$('.wrap-article-content3');myDiv3Para.append($('.article-contain article .wrap-article-content .right-content .right-content-btn3'));}function appendPaste(){var myDiv1Para=$('.article-contain article .wrap-article-content1 .right-content');myDiv1Para.append($('.wrap-article-content1 .right-content-btn1'));var myDiv2Para=$('.article-contain article .wrap-article-content2 .right-content');myDiv2Para.append($('.wrap-article-content2 .right-content-btn2'));var myDiv3Para=$('.article-contain article .wrap-article-content3 .right-content');myDiv3Para.append($('.wrap-article-content3 .right-content-btn3'));}if($(window).width()<1130){append()}if($(window).width()>1131){appendPaste()}$(window).resize(function(){if($(window).width()<1130){append()}if($(window).width()>1131){appendPaste()}})
$(".burger-wrap .burger").click(function(){$(".burger-wrap .burger .burger-line").toggleClass("active"),$(this).toggleClass("active")
$('.wrap-menu .menu-bottom').toggleClass("active")})
$(".wrap-menu .menu-bottom ul li a").on('click',function(event){$(".burger-wrap .burger .burger-line").removeClass("active"),$('.burger-wrap .burger').removeClass("active")
$('.wrap-menu .menu-bottom').removeClass("active")
if(this.hash!=="")
{var hash=this.hash;
$('html, body').animate({scrollTop:($(hash).offset().top-100)},800,function(){window.location.hash=hash;});}});

$('.toBlock1').click(function(event) {
		var id = $(this).attr("href");
		var offset = 100;
		var target = $(id).offset().top - offset;
		$('html, body').animate({
			scrollTop: target
		}, 500);
		event.preventDefault();
	});
	// $('.toContact').click(function(event) {
	// 	var id = $(this).attr("href");
	// 	var offset = 100;
	// 	var target = $(id).offset().top - offset;
	// 	$('html, body').animate({
	// 		scrollTop: target
	// 	}, 500);
	// 	event.preventDefault();
	// });

$('.open-popup-link').magnificPopup({
		type: 'inline',
		closeBtnInside: !0,
		closeOnBgClick: !0,
		midClick: false,
		removalDelay: 500,
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = 'mfp-move-horizontal';
			}
		}
	});

	$(".popup-close").click(function() {
		$.magnificPopup.close();
	})

	//nice-select
	$('select').niceSelect();

	//checkbox
	$('#checkbox').on('change', function () {
		if (!$('#checkbox').prop('checked')) {
			$('.form-checkbox').removeClass('active');
		} else {
			$('.form-checkbox').addClass('active');
		}
	});
	//select category
	$('.link-form-popup').click(function () {
		$('.nice-select .list li').removeClass('selected');
		var dataId = $(this).data('id');
		switch (dataId){
			case 1: {
				$('.current').text('Basisplan');
				break;
			}
			case 2: {
				$('.current').text('Erweiterter');
				break;
			}
			case 3: {
				$('.current').text('VIP');
				break;
			}
			default: {
				alert('error');
			}
		}
		var currentCategory = $('.current').text();
		$('#select_category').val(currentCategory);
	});
	$(window).scroll(function(){
		var header = $('.header'),
			scroll = $(window).scrollTop();

		if (scroll >= 100) header.addClass('fixed'), $('.logo').addClass('fixed'), $('.contain-header').addClass('fixed');
		else header.removeClass('fixed'), $('.logo').removeClass('fixed'), $('.contain-header').removeClass('fixed');
	});
	var btn = $('#button');

	$(window).scroll(function() {
		if ($(window).scrollTop() > 300) {
			btn.addClass('show');
		} else {
			btn.removeClass('show');
		}
	});

	btn.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, '300');
	});
	if($( document ).width()<= 640){
		console.log('++++asd')
	}
	// $( window ).resize(function() {
	// 	if($( document ).width()<= 640){
	// 		console.log('++++asd')
	// 	}
	// });
	$('.btn1-click').on('click', function(e) {
		$( window ).resize(function() {
			if($( document ).width()<= 640){
				$('html, body').animate({scrollTop: 0}, '300');
			}
		});
		if($( document ).width()<= 640){
			$('html, body').animate({scrollTop: 0}, '300');
		}
		e.preventDefault();

	})
	$('.toContact').click(function (event) {
		$.magnificPopup.close();
		var id = $(this).attr("href");
		var offset = 100;
		var target = $(id).offset().top - offset;
		setTimeout(function(){
			$('html, body').animate({
				scrollTop: target
			}, 500);
			event.preventDefault();
		}, 500);
	})
	$('.mail_send').click(function () {
		console.log('++++')
		if($('#website').val() != '' &&
			$('#vorname').val() != '' &&
			$('#nachname').val() != '' &&
			$('#select_category').val() != '' &&
			$('#firmenname').val() != '' &&
			$('#telefon').val() != '' &&
			$('#email').val() != '' &&
			$('#message').val() != '' && $('.form-checkbox').hasClass('active') ){
			$.ajax({
				type: "POST",
				url: "/mail.php",
				data: {
					option: $('#select_category').val(),
					site: $('#website').val(),
					vorname: $('#vorname').val(),
					nachname: $('#nachname').val(),
					firmenname: $('#firmenname').val(),
					telefon: $('#telefon').val(),
					email: $('#email').val(),
					message: $('#message').val()
				}
			}).done(function(response){
				console.log(response);
				$.magnificPopup.open({
						removalDelay: 250,
						mainClass: "mfp-fade",
						items: {
							src: "#success-message",
							type: "inline"
						},
						callbacks: {
							open: function() {
								$(".wrapper").addClass("popup__bg")
							},
							close: function() {
								$(".wrapper").removeClass("popup__bg")
							}
						}
					})
				$('#website').val('');
				$('#select_category').val('');
				$('#vorname').val('');
				$('#nachname').val('');
				$('#firmenname').val('');
				$('#telefon').val('');
				$('#email').val('');
				$('#message').val('');
				$('#error').text('')
			})
		}else{
			// $('#send__message').parent("div").addClass("error").removeClass("valid")
			console.log('herovo vse')
			$('#error').text('Füllen Sie alle Felder aus!')
			return false;
			}
	})
	$('.feedback_mail').click(function () {
		console.log('++++')
		if($('#name').val() != '' &&
			$('#phone').val() != '' &&
			$('#mail').val() != '' &&
			$('#commentar').val() != ''){
			$.ajax({
				type: "POST",
				url: "/mail.php",
				data: {
					name: $('#name').val(),
					phone: $('#phone').val(),
					mail: $('#mail').val(),
					commentar: $('#commentar').val()
				}
			}).done(function(response){
				console.log(response);
				$.magnificPopup.open({
					removalDelay: 250,
					mainClass: "mfp-fade",
					items: {
						src: "#success-message",
						type: "inline"
					},
					callbacks: {
						open: function() {
							$(".wrapper").addClass("popup__bg")
						},
						close: function() {
							$(".wrapper").removeClass("popup__bg")
						}
					}
				})
				$('#name').val('');
				$('#phone').val('');
				$('#mail').val('');
				$('#commentar').val('');
				$('.error').text('')
			})
		}else{
			// $('#send__message').parent("div").addClass("error").removeClass("valid")
			console.log('herovo vse')
			$('.error').text('Füllen Sie alle Felder aus!')
			return false;
		}
	})
});
var textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', autosize);
function autosize(){
	var el = this;
	setTimeout(function(){
		el.style.cssText = 'height:auto; padding:0';
		el.style.cssText = 'height:' + el.scrollHeight + 'px';
	},0);
}


