$(document).ready(function () {
    let translator = new Translator();
    translator.load();

    jQuery('.translateButton[data-lang=' + translator._lang + ']').addClass('active');
    jQuery('.translateButton').on('click', function () {
        jQuery('.translateButton').removeClass('active');
        jQuery(this).addClass('active');
        let lang = jQuery(this)[0].dataset.lang;
        translator.load(lang);
    });

    jQuery('#burger').on('click', function() {
        jQuery('#NavBarDiv').addClass('open');
    })
    
    jQuery('#close').on('click', function() {
        jQuery('#NavBarDiv').removeClass('open');
    })
    captcha = new jCaptcha({
        el: '.jCaptcha',
        canvasClass: 'jCaptchaCanvas',
        canvasStyle: {
            // required properties for captcha stylings:
            width: 100,
            height: 15,
            textBaseline: 'top',
            font: '15px Arial',
            textAlign: 'left',
            fillStyle: '#ddd'
        },
        // set callback function for success and error messages:
        callback: (response, $captchaInputElement, numberOfTries) => {
            if (response == 'success') {
                jQuery('#form_contact').hide(300);
                jQuery('#form_info').html('<span>Please Wait...</span>');
                jQuery('#form_info').show(300);

                jQuery.ajax({ 
                    type: "POST",
                    url: "./PHP/mail.php",
                    data: jQuery('#form_contact').serialize(),
                    success: function (success) {
                        console.log(success);
                        if (success == '') { 
                            jQuery('#form_info').html('<span>message has been sent...</span>');
                            
                        }
                        else {
                            jQuery('#form_info').html('<span style="color:#ff0000">There is an Error... </span>');
                        }
                    }
                });
            }
            if (response == 'error') {
                jQuery('.e_captcha').show(300);

                if (numberOfTries === 3) {
                    
                }
            }
        }
    });
});

function hideFormInfo() {
    jQuery('#form_info').fadeOut(500);
}

function formSend() {
    hideFormInfo();
    jQuery('.e_subject, .e_message').hide(300);

    let name = jQuery.trim(jQuery('#name').val());
    let email = jQuery.trim(jQuery('#email').val());
    let subject = jQuery.trim(jQuery('#betreff').val());
    let message = jQuery.trim(jQuery('#text').val());

    if (!subject) {
        jQuery('.e_subject').show(300);
    }
    else if (!message) {
        jQuery('.e_message').show(300);

    }
    else {
        captcha.validate();
    }

}






