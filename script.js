function updateLog() {
var delta = 0;
if (window.localStorage.getItem('value')) {
  delta = ((new Date()).getTime() - (new Date()).setTime(window.localStorage.getItem('timestamp'))) / 1000;
  document.querySelector("#log").innerHTML = 'last saved: ' + delta + 's ago';
} 
  };
updateLog();
setInterval(updateLog, 20000); 

var area = document.createElement('textarea');
area.classList.add('scroll');

document.querySelector('#content').appendChild(area);

if (localStorage.getItem('value')){
  area.value = localStorage.getItem('value');
} else {
  area.placeholder = "Welcome to FireNote. No need to login, just type and your text will save in the background waiting for you when you revisit this page.";
}

area.addEventListener('keyup', function () {
window.localStorage.setItem('value', area.value);
window.localStorage.setItem('timestamp', (new Date()).getTime());
  }, false);
  
area.addEventListener('mouseup', function () {
window.localStorage.setItem('value', area.value);
window.localStorage.setItem('timestamp', (new Date()).getTime());
  }, false);
  
area.addEventListener('mousedown', function () {
window.localStorage.setItem('value', area.value);
window.localStorage.setItem('timestamp', (new Date()).getTime());
  }, false);
  
window.addEventListener('touchend', function () {
localStorage.setItem('value', area.value);
localStorage.setItem('timestamp', (new Date()).getTime());
  }, false);
  
function saveTextAsFile() {
var textToWrite = window.localStorage.getItem('value').replace(/^\s+|\s+$/g,"");
var BOM = new Uint8Array([0xEF,0xBB,0xBF]);
var textFileAsBlob = new Blob([ BOM, textToWrite ], { type: 'text/plain;charset=UTF-8' });
var fileDate = Date.now();
var exportFilename = "firenote-export-file-" + fileDate + ".txt"; 

var downloadLink = document.createElement("a");
downloadLink.download = exportFilename;
downloadLink.innerHTML = "Download File";

if (window.webkitURL != null) {
  /* Chrome allows the link to be clicked without actually adding it to the DOM */
  downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
} else {
  /* Firefox requires the link to be added to the DOM before it can be clicked */
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.onclick = destroyClickedElement;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
}

  downloadLink.click();
} 

var button = document.getElementById('saveTxtButton');
button.addEventListener('click', saveTextAsFile);

function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}
