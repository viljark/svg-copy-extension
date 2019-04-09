let input = document.getElementById('input');
let currentKey = document.getElementById('currentKey');

chrome.storage.sync.get('triggerButton', function({triggerButton}) {
    currentKey.textContent = triggerButton || "Shift";
});

input.addEventListener('keydown', function(e) {
    e.preventDefault();
    chrome.storage.sync.set({triggerButton: e.key}, function() {
        currentKey.textContent = e.key;
    })

});
            
