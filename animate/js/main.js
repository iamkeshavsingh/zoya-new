jQuery(document).ready(function($){

    var transitionLayer = $('.cd-transition-layer'),
        transitionBackground = transitionLayer.children(),
        modalWindow = $('.cd-modal');

    var frameProportion = 1.78,
        frames = 25,
        resize = false;

    // Set transition background size
    setLayerDimensions();

    $(window).on('resize', function(){
        if( !resize ) {
            resize = true;
            (!window.requestAnimationFrame) 
                ? setTimeout(setLayerDimensions, 300) 
                : window.requestAnimationFrame(setLayerDimensions);
        }
    });

    // 🔥 OPEN MODAL DIRECTLY (NO OPENING EFFECT)
    window.addEventListener("load", function () {
        modalWindow.addClass('visible'); // direct open
    });

    // CLOSE BUTTON
    modalWindow.on('click', '.modal-close', function(event){
        event.preventDefault();
        closeModal();
    });

    // AUTO CLOSE AFTER 5 SECONDS
    setTimeout(function(){ 
        closeModal(); 
    }, 2000);

    // 🔥 CLOSE MODAL WITH INK EFFECT ONLY
    function closeModal() {
        transitionLayer.addClass('visible closing');  // closing effect only
        modalWindow.removeClass('visible');

        transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
            transitionLayer.removeClass('closing visible');
            transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
        });
    }

    function setLayerDimensions() {
        var windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            layerHeight, layerWidth;

        if(windowWidth/windowHeight > frameProportion) {
            layerWidth = windowWidth;
            layerHeight = layerWidth/frameProportion;
        } else {
            layerHeight = windowHeight*1.2;
            layerWidth = layerHeight*frameProportion;
        }

        transitionBackground.css({
            'width': layerWidth * frames + 'px',
            'height': layerHeight + 'px'
        });

        resize = false;
    }
});
