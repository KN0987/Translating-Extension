
// Create menu option
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
      id: "menu",
      title: "Translate - %s", 
      contexts: ["selection"]
  });
});


// API call
async function callAPI(text, source_lang, target_lang){
  const api_key =  "your deepl api key";
  const api_url = "https://api-free.deepl.com/v2/translate";

  const headers = new Headers();
  headers.append("Authorization", `DeepL-Auth-Key ${api_key}`);
  headers.append('Content-Type', "application/x-www-form-urlencoded;charset=UTF-8");


  const body = "text=" + encodeURIComponent(text) + "&source_lang=" + source_lang + "&target_lang=" + target_lang;

  const options = {
  method: "post",
  headers,
  body,
  };

  const req = new Request(api_url, options);
  const res = await fetch(req);
  const jsn = await res.json();
  if(jsn.message){
    return `DeepL message: ${jsn.message}`
  }
  return jsn.translations[0].text;
}

// Repond to API call
chrome.contextMenus.onClicked.addListener(async (info, tabs) => {
  let { from, to } = await chrome.storage.local.get(["from", "to"]);
  from = from || 'EN';
  to = to || 'ES';

  const translation = await callAPI(info.selectionText, from, to);
  chrome.tabs.sendMessage(tabs.id, translation);

});