
const apiResponse = async (URL) => {
   try {
      const resp = await fetch(URL);
      const respData = await resp.json();

      console.log(respData);

      displayResult(respData.result.original_link, respData.result.short_link);
   } catch (err) {
      // showError();
      console.log(err);
   }
};

/*====== SET LINK =====*/
const input = document.querySelector('#input-link');
const submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', function (e) {
   e.preventDefault();
   if (!input.value || !validURL(input.value)) {
      showInputError();
   }

   const inputURL = input.value;
   const fullURL = `https://api.shrtco.de/v2/shorten?url=${inputURL}`;
   apiResponse(fullURL);

   input.value = '';
});


/*====== SHOW RESULTS & COPY =====*/
function displayResult(toShort, shortened) {
   const resultsContainer = document.querySelector('.short-results');
   const SingleResult = document.createElement('div');

   SingleResult.classList.add('short-result');
   SingleResult.innerHTML = `
            <div class="link-to-shorten">
              <p>${toShort}</p>
            </div>
            <hr>
            <div class="result-copy">
              <div class="link-shortened">
                <a class="short-link  shortened-result" href="https://${shortened}" target="_blank">${shortened}</a>
              </div>
              <button class="copy-btn">Copy</button>
              </div>`;
   SingleResult.classList.add('active');
   resultsContainer.prepend(SingleResult);

   //COPY
   const copyBtn = document.querySelector('.copy-btn');

   copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(shortened);

      copyBtn.classList.add('copied');
      copyBtn.textContent = 'copied!';
   });
}

/*===== INPUT ERROR =====*/
function showInputError() {
   const msgErr = document.querySelector('.error');
   const inputErr = document.querySelector('#input-link');

   inputErr.classList.add('error-input');
   msgErr.classList.add('show-error');

   setTimeout(function () {
      inputErr.classList.remove('error-input');
      msgErr.classList.remove('show-error');
   }, 3000);
}

const nav = document.querySelector('.nav-links');
const navBtn = document.querySelector('.menu-btn');

navBtn.addEventListener('click', function () {
   nav.classList.toggle('active');
});

function validURL(str) {
   var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
         '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
         '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
         '(\\#[-a-z\\d_]*)?$',
      'i'
   ); // fragment locator
   return !!pattern.test(str);
}
