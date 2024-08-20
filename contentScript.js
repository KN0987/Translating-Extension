// Respond to request to clost the dialog box
let translatePopup;

document.addEventListener('click', () => translatePopup?.remove());
document.addEventListener('keydown', (e) => e.key === 'Escape' && translatePopup?.remove());

function showDialog(translation){
    const selection = window.getSelection();
    if(!selection){
        console.log('Nothing was selected')
        return;
    }

    const dialogHtml = `<p>${translation}</p>
    <form method="dialog">
        <button>Close</button>
    </form>`;

    translatePopup = document.querySelector('#my-dialog')
    if(translatePopup){
        translatePopup.remove();
    }
    translatePopup = document.createElement('dialog')
    translatePopup.innerHTML = dialogHtml
    translatePopup.id = 'my-dialog'
    translatePopup.open = true;
    translatePopup.style = "font-size: 18px; border: 1px solid #cccccc; z-index:999;";


    const range = selection.getRangeAt(0);
    const parent = range.commonAncestorContainer.parentNode;
    parent.appendChild(translatePopup);
    translatePopup.addEventListener('click', () => {
        translatePopup.remove();
    })
}

chrome.runtime.onMessage.addListener((translation) => {
    showDialog(translation);
});