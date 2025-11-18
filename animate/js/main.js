jQuery(document).ready(function($){
	//cache some jQuery objects
	var modalTrigger = $('.cd-modal-trigger'),
		transitionLayer = $('.cd-transition-layer'),
		transitionBackground = transitionLayer.children(),
		modalWindow = $('.cd-modal');

	var frameProportion = 1.78, //png frame aspect ratio
		frames = 25, //number of png frames
		resize = false;

	//set transitionBackground dimentions
	setLayerDimensions();
	$(window).on('resize', function(){
		if( !resize ) {
			resize = true;
			(!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
		}
	});

	//open modal window
	// modalTrigger.on('click', function(event){	
	// 	event.preventDefault();
	// 	transitionLayer.addClass('visible opening');
	// 	var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
	// 	setTimeout(function(){
	// 		modalWindow.addClass('visible');
	// 	}, delay);
	// });

	window.addEventListener("load", function () {
    transitionLayer.addClass('visible opening');
    var delay = ($('.no-cssanimations').length > 0) ? 0 : 600;
    setTimeout(function () {
        modalWindow.addClass('visible');
    }, delay);
});


	//close modal window
	// Modal close on clicking close button
modalWindow.on('click', '.modal-close', function(event){
    event.preventDefault();
    closeModal();
});

// Auto close after 5 seconds
setTimeout(function(){
    closeModal();
}, 3000); // 5000ms = 5 seconds

// Function to close modal with animation
function closeModal() {
    transitionLayer.addClass('closing');
    modalWindow.removeClass('visible');

    transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
        transitionLayer.removeClass('closing opening visible');
        transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
        
        // Dispatch event to notify animations can start (after animation completes)
        setTimeout(function() {
            if (typeof window !== 'undefined') {
                window.modalClosed = true;
                if (window.modalCloseEvent) {
                    document.dispatchEvent(window.modalCloseEvent);
                }
            }
        }, 100); // Small delay to ensure modal is fully closed
    });
}
	function setLayerDimensions() {
		var windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			layerHeight, layerWidth;

		if( windowWidth/windowHeight > frameProportion ) {
			layerWidth = windowWidth;
			layerHeight = layerWidth/frameProportion;
		} else {
			layerHeight = windowHeight*1.2;
			layerWidth = layerHeight*frameProportion;
		}

		transitionBackground.css({
			'width': layerWidth*frames+'px',
			'height': layerHeight+'px',
		});

		resize = false;
	}
});