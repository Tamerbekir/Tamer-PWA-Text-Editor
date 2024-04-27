const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //preventing default
    event.preventDefault();
    // Store the triggered events
    // This allows users to install the PWA / App
    window.deferredPrompt = event;
    // Store the triggered events
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return
    }

    // Show prompt to user when they click on the download button
    promptEvent.prompt()
    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null

    butInstall.classList.toggle('hidden', true)
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clears prompt
    window.deferredPrompt = null
});
