function reviewToolClass() {
  let currentSelectedButton = '';
  const reviewToolWrapper = document.createElement('div');
  reviewToolWrapper.setAttribute('class', 'reviewToolWrapper');
  document.querySelector('body').append(reviewToolWrapper);
  // ================================
  function createButton(text, holder) {
    const button = document.createElement('div');
    button.setAttribute('class', 'commbutton');
    button.setAttribute('data-name', text);
    holder.append(button);
    button.addEventListener('click', butnEvent);
    // -----------
    const buttonTxt = document.createElement('div');
    buttonTxt.innerText = text;
    buttonTxt.setAttribute('class', 'commbuttontext');
    button.append(buttonTxt);
    return button;
  }
  // ================================
  const addComBtn = createButton('Add Comment', reviewToolWrapper);
  const viewComBtn = createButton('View Comment', reviewToolWrapper);
  // ================================
  // ================================
  const framePanel = document.createElement('div');
  framePanel.setAttribute('class', 'framePanel');
  reviewToolWrapper.append(framePanel);
  // ================================
  // ================================
  const iframePanel = document.createElement('iframe');
  iframePanel.setAttribute('class', 'iframePanel');
  iframePanel.setAttribute('src', 'http://127.0.0.1:5501/');
  framePanel.append(iframePanel);
  // ================================
  // EVENTS
  // ================================
  function butnEvent(event) {
    reviewToolWrapper.classList.add('opened');
    addComBtn.classList.remove('selected');
    viewComBtn.classList.remove('selected');
    const target = event.currentTarget;
    target.classList.add('selected');
    // ================================
    // const pageNo = document.querySelector('.pgNum').innerHTML.split('/')[0].split(':')[1];
    currentSelectedButton = target.getAttribute('data-name');
    sendDataToFrame();
  }
  // ================================
  // ================================
  window.addEventListener('message', (event) => {
    // if (event.origin !== 'https://parent-site.com') {
    //   console.warn('Blocked message from untrusted origin:', event.origin);
    //   return;
    // }
    console.log('Received message parent:', event.data.text); // Process the message
    sendDataToFrame();
  });
  // ================================
  function sendDataToFrame() {
    iframePanel.contentWindow.postMessage(
      { type: 'fromCourse', text: `{"page": 1, "selected": "${currentSelectedButton}"}` }, // Message data
      '*' // Allowed domain (use "*" to allow all, but it's unsafe)
    );
  }
}
window.addEventListener('load', reviewToolClass);
