let isShiftPressed = false;
let contentToCopy;
const defaultTriggerKey = 'Shift';
let triggerKey = defaultTriggerKey;

chrome.storage.sync.get('triggerButton', function({triggerButton}) {
    if (triggerButton) {
        triggerKey = triggerButton;
    } else {
        chrome.storage.sync.set({triggerButton: defaultTriggerKey}, function(item) {
        })
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === triggerKey && !isShiftPressed) {
        isShiftPressed = true;
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('copy', handleCopyEvent);
    }
});


document.addEventListener('keyup', () => {
    isShiftPressed = false;
    document.removeEventListener('mousedown', handleClick);
    document.removeEventListener('copy', handleCopyEvent);
})

function handleClick(e) {
    if (isShiftPressed) {
        const target = e.target;
        contentToCopy = undefined;
        let svgEl;
        e.preventDefault();
        svgEl = target.closest('svg');
        if (!svgEl) {
            svgEl = target.getElementsByTagName("svg")[0];
        };
        if (svgEl) {
            contentToCopy = svgEl.outerHTML;
        }
        if (contentToCopy) {
            document.execCommand('copy');
            chrome.runtime.sendMessage({action: "copied", content: 'SVG content was copied to clipboard!'}, function(response) {});
        }
        
    }
}

function handleCopyEvent(e) {
    e.clipboardData.setData('text/plain', contentToCopy);
    e.preventDefault();
}