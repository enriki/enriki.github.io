 var colorEvent, demo_type;
(function(jQuery){
    jQuery(document).ready(function(){		//when DOM is ready
        demo.init();
    });
})(jQuery);

var demo = {
    settings: {
        news: {
            preset_color: 'yellow',
            bg_mode: 'none',
            bg_color: '#ffffff',
            bg_pattern: 'bg-9',
            bg_pattern_color: '#ffa200',
            bg_image: '',
            overlay: 0,
            overlay_one: '#ff4d00',
            overlay_two: '#0057ff'
        },
       
    },
	init: function() {
        //init UI
        demo.initEditorToggle();
        demo.initPresetColorSwitch();
        demo.initBgPatternSwitch();
        demo.initBgModeSwitch();
        demo.initColorPickers();
        demo.initOverlaySwitch();
        demo.initReset();
        
        //applly settings
        demo.applySettings();
	},
    get: function(name) {
        
        if(typeof demo.settings[demo_type][name] != 'undefined')
        {
            var value = demo.readCookie(demo_type + '_' + name);
            if(value === null)
            {
                return demo.settings[demo_type][name];  
            }
            else
            {
                return value;        
            }
        }
        
        return false;
    },
    set: function(name, value) {
        if(typeof demo.settings[demo_type][name] != 'undefined')
        {
            demo.createCookie(demo_type + '_' + name, value, 1);
        }
    },
    
    //UI
    
    initReset: function() {
        jQuery('.fire-reset').click(function() {
            
            var keys = Object.keys(demo.settings[demo_type]);
            for(i in keys)
            {
                var item = keys[i];
                demo.eraseCookie(demo_type + '_' + item);
            }
			
            if(jQuery('#extra-stylesheet').length > 0)
            {
                jQuery('#extra-stylesheet').remove();
            }
            
            demo.applySettings();
            
            return false;
        });
    },
    initPresetColorSwitch: function() {
        jQuery('.preset-switcher .color-presets a').on('click', function(e) {                                   
            var color = jQuery(this).attr('id');
            demo.apply_preset_color(color);
            demo.set('preset_color', color);
            
            e.preventDefault();
        });
    },
    initEditorToggle: function() {
		
		//hide on touch devices by default
		if(jQuery('html').hasClass('touch'))
		{
			jQuery('.customizer').addClass('off-canvas');
		}

        jQuery(".customizer .tab").click(function() {
            jQuery(".customizer").toggleClass("off-canvas");
            jQuery(".tab").toggleClass("close-tab").toggleClass("open-tab");
            
            return false;
        });
    },
    initBgPatternSwitch: function() {
        jQuery('.background-settings .color-presets a').on('click', function(e) {                                   
            var pattern = jQuery(this).attr('id');
            
            demo.apply_bg_pattern(pattern);
            demo.set('bg_pattern', pattern);
            
            e.preventDefault();
        });
    },
    initBgModeSwitch: function() {
        jQuery('.background-settings .background-mode a').on('click', function(e) {                                   
            var mode = jQuery(this).attr('id');
            demo.apply_bg_mode(mode);
            demo.set('bg_mode', mode);
            
            if(mode == 'pattern')
            {
                demo.apply_bg_pattern(demo.get('bg_pattern'));
                demo.apply_bg_pattern_color(demo.get('bg_pattern_color'));
            }
            
            if(mode == 'solid')
            {
                demo.apply_bg_color(demo.get('bg_color'));
            }
            
            if(mode == 'image')
            {
                demo.apply_bg_image(demo.get('bg_image'));
            }
            
            e.preventDefault();
        });
    },
    initColorPickers: function() {
        
        //background color
        jQuery('.background_colorpicker').colorpicker().on('changeColor', function(ev) {
            
            demo.apply_bg_color(ev.color.toHex());
            
            //timeout for cookie
            clearTimeout(colorEvent);
            colorEvent = setTimeout(function() {
                demo.set('bg_color', ev.color.toHex());
            }, 200);
            
        });
                
        jQuery('.background_colorpicker').siblings('input').on('keyup paste', function() {
            
            var color = jQuery(this).val();
            
            if(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color))
            {
                demo.set('bg_color', color);
                demo.apply_bg_color(color);
            }
        });
        
        //background pattern
        jQuery('.pattern_colorpicker').colorpicker().on('changeColor', function(ev) {
            
            demo.apply_bg_pattern_color(ev.color.toHex());
            
            //timeout for cookie
            clearTimeout(colorEvent);
            colorEvent = setTimeout(function() {
                demo.set('bg_pattern_color', ev.color.toHex());
            }, 200);
        });
        
        jQuery('.pattern_colorpicker').siblings('input').on('keyup paste', function() {
            
            var color = jQuery(this).val();
            
            if(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color))
            {
                demo.set('bg_pattern_color', color);
                demo.apply_bg_pattern_color(color);
            }
        });
        
        
        //overlay gradient1
        jQuery('.gradient_one_colorpicker').colorpicker().on('changeColor', function(ev) {
            
            demo.apply_overlay_one(ev.color.toHex());
            
            //timeout for cookie
            clearTimeout(colorEvent);
            colorEvent = setTimeout(function() {
                demo.set('overlay_one', ev.color.toHex());
            }, 200);
        });
        jQuery('.gradient_one_colorpicker').parent().siblings('input.hex-2-1').on('keyup paste', function() {
            
            var color = jQuery(this).val();
            
            if(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color))
            {
                demo.set('overlay_one', color);
                demo.apply_overlay_one(color);
            }
        });
        
        //overlay gradient2
        jQuery('.gradient_two_colorpicker').colorpicker().on('changeColor', function(ev) {
            
            demo.apply_overlay_two(ev.color.toHex());
            
            //timeout for cookie
            clearTimeout(colorEvent);
            colorEvent = setTimeout(function() {
                demo.set('overlay_two', ev.color.toHex());
            }, 200);
        });
        
        jQuery('.gradient_two_colorpicker').parent().siblings('input.hex-2-2').on('keyup paste', function() {
            
            var color = jQuery(this).val();
            
            if(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color))
            {
                demo.set('overlay_two', color);
                demo.apply_overlay_two(color);
            }
        });
    },
    initOverlaySwitch: function() {
        jQuery('.overlay-switch').change(function(){
            
            var value = 0;
            if(jQuery(this).is(':checked'))
            {
                value = 1;
            }
            
            demo.apply_overlay(value);
            demo.set('overlay', value);
        });
    },
    toggleOverlyVisibility: function(show) {
        
        if(show)
        {
            value = 1;

            jQuery('#overlay-gradient').addClass('visible');
            jQuery('#overlay-gradient').removeClass('hidden');
        }
        else
        {
            jQuery('#overlay-gradient').removeClass('visible');
            jQuery('#overlay-gradient').addClass('hidden');
        }
    },
    
    //APPLY
    
    applySettings: function() {
     var keys = Object.keys(demo.settings[demo_type]);
        for(i in keys)
        {
            var item = keys[i];
            var func_name = 'apply_' + item;
            
            if (typeof demo[func_name] === "function") {
                demo[func_name](demo.get(item));
            }            
        }
    },
    
    apply_preset_color: function(value) {
        
        jQuery('.preset-switcher a').removeClass('active');
        jQuery('#' + value).addClass('active');
        
        //load stylesheet here
        if(jQuery('#extra-stylesheet').length > 0)
		{
			jQuery('#extra-stylesheet').remove();
		}
		
        if(demo.settings[demo_type].preset_color != value)
        {
            jQuery('head').append('<link id="extra-stylesheet" rel="stylesheet" type="text/css" href="' + demo_base_url + 'demo/colors/' + demo_type + '/color-' + value + '.css">');
        }
        
    },
    apply_bg_color: function(value) {
               
        if(demo.get('bg_mode') == 'solid')
        {
            jQuery('body').css('background-color', value);
		
            jQuery('.background_colorpicker').children('span').css('background-color', value);
            jQuery('.background_colorpicker').siblings('input').val(value);
        }
    },
    apply_bg_mode: function(value) {

        jQuery('.background-mode a').removeClass('active');
        jQuery('#' + value).addClass('active');
        
        jQuery('.background-settings .additional').removeClass('visible').addClass('hidden');
                
        if(value == 'solid')
        {
            jQuery('#bg-solid').removeClass('hidden').addClass('visible'); 
        }
        
        if(value == 'pattern')
        {
            jQuery('#bg-pattern, #bg-pattern-tone').removeClass('hidden').addClass('visible'); 
        }

        
        //remove background images
        jQuery('body').css('background-image', 'none');
        jQuery('body').css('background-attachment', '');
        jQuery('body').css('background-position', 'center top');
        jQuery('body').css('background-repeat', '');
        jQuery('body').css('background-size', '');
        jQuery('body').css('background-color', '');
        
        //hide background pattern
        jQuery('.pattern-color').hide();
        
    },
    apply_bg_image: function(value) {
        if(demo.get('bg_mode') == 'image')
        {
            jQuery('body').css('background-image', 'url(' + demo_base_url + 'demo/img/bg-image/' + demo_type + '.jpg)');
            jQuery('body').css('background-attachment', 'fixed');
            jQuery('body').css('background-position', 'center top');
            jQuery('body').css('background-repeat', 'no-repeat');
            jQuery('body').css('background-size', 'cover');
        }
    },
    apply_bg_pattern: function(value) {
        
        jQuery('.background-settings .pattern a').removeClass('active');
        jQuery('#' + value).addClass('active');
        
        if(demo.get('bg_mode') == 'pattern')
        {
            jQuery('body').css('background-image', 'url(' + demo_base_url + 'demo/img/bg-pattern/body-' + value + '.png)');
            jQuery('body').css('background-attachment', '');
            jQuery('body').css('background-position', '');
            jQuery('body').css('background-repeat', 'repeat');
            jQuery('body').css('background-size', 'auto');
        }

    },
    apply_bg_pattern_color: function(value) {
        
        if(demo.get('bg_mode') == 'pattern')
        {
            jQuery('.pattern_colorpicker').children('span').css('background-color', value);
            jQuery('.pattern_colorpicker').siblings('input').val(value);
            
            var rgb = demo.hexToRgb(value);
            jQuery('.pattern-color').css('background-color', 'rgba(rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.05))');
            
            jQuery('.pattern-color').show();
        }
        else
        {
            jQuery('.pattern-color').hide();
        }
    },
    apply_overlay: function(value) {

        if(parseInt(value) !== 0)
        {
            jQuery('.overlay-switch').prop('checked', true);
            jQuery('body').addClass('img-fx-visible');
            
            demo.set_overlay_gradient_color();
        }
        else
        {
            jQuery('.overlay-switch').prop('checked', false);
            jQuery('body').removeClass('img-fx-visible');
        }
        
        demo.toggleOverlyVisibility(parseInt(value));
        
    },
    apply_overlay_one: function(value) {

        jQuery('.gradient_one_colorpicker').children('span').css('background-color', value);
        jQuery('.gradient_one_colorpicker').parent().siblings('.hex-2-1').val(value);
        
        demo.set_overlay_gradient_color();
    },
    apply_overlay_two: function(value) {

        jQuery('.gradient_two_colorpicker').children('span').css('background-color', value);
        jQuery('.gradient_two_colorpicker').parent().siblings('.hex-2-2').val(value);
        
        demo.set_overlay_gradient_color();
    },
    set_overlay_gradient_color: function() {
        
        var style = jQuery('#demo-inline-css');
        
        var content = '.image-fx:before { visibility: hidden; } .img-fx-visible .image-fx:before { visibility: visible; } .img-fx-visible .nav .image-fx:before { visibility: hidden; } .img-fx-visible .nav .hover .image-fx:before { visibility: visible; }';
        content += 'div.image-fx:before { background: linear-gradient(-45deg, ' + demo.get('overlay_one') + ', ' + demo.get('overlay_two') + ') !important;}';
        
        style.html(content);
    },
   
	createCookie: function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	},
	readCookie: function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	eraseCookie: function(name) {
		demo.createCookie(name,"",-1);
	},
    hexToRgb: function(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
};
