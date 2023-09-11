const button = document.getElementById('letsGo');

// Get URL of current tab

function getCurrentTabURL(){
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            const url = currentTab.url;

            // Adding the medium-unblocker URL

            const unblockerURL = "https://medium-unlocker.onrender.com/unlock/?url=";
            const mainURL = unblockerURL + url;

            // Resolve the promise with the mainURL

            resolve(mainURL);
        });
    });
};

// Getting the URL from getCurrentTabURL() function

async function useCurrentURL(){
    try{
        const currentURL = await getCurrentTabURL();
        return currentURL;
    } catch(error){
        console.log(error);
        return null;
    }
}

// URL validation

function validateURL(url){
    const userURL = url;

    window.open(userURL, '_blank');
};


// getting the url

button.addEventListener('click', () => {
    useCurrentURL()
        .then((url) => {
            if(url){
                validateURL(url);
            } else{
                console.log("Can't get the URL!");
            }
        });
});