// wait for all objects in document to load, before doing anything!!
document.addEventListener('DOMContentLoaded', () => {
    /****
     * Get button/s + define behaviour:
     * Add 'touched' to class of element when mouse left event occurs:
     * NOTE: event.target = the HTML element
     ****/
    $('.sphere').mouseleave((event) => {
        event.target.classList.add('touched');
    });
});


// wait for all objects in document to load, before doing anything!!
document.addEventListener('DOMContentLoaded', () => {
    /****
     * Get button/s + define behaviour:
     * Add 'touched' to class of element when mouse left event occurs:
     * NOTE: event.target = the HTML element
     ****/
    $('.touched').mouseleave((event) => {
        event.target.classList.add('cleen');
    });
});
