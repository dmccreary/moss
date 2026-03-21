document.addEventListener("DOMContentLoaded", function () {
    // Find all admonitions with the "prompt" class
    document.querySelectorAll(".admonition.prompt").forEach((admonition) => {
        // Create a "Copy" button
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.className = "copy-button";

        // Append the button to the admonition
        admonition.appendChild(copyButton);

        // Add event listener for the button
        copyButton.addEventListener("click", () => {
            // Collect all text content inside the admonition except the title and button
            const promptText = Array.from(admonition.querySelectorAll("p:not(.admonition-title)"))
                .map((p) => p.textContent.trim())
                .join("\n");

            if (promptText) {
                // Copy the collected text to the clipboard
                navigator.clipboard.writeText(promptText).then(
                    () => {
                        // Show feedback on successful copy
                        copyButton.textContent = "Copied!";
                        setTimeout(() => (copyButton.textContent = "Copy"), 2000);
                    },
                    (err) => {
                        console.error("Failed to copy text: ", err);
                    }
                );
            } else {
                console.error("No prompt text found to copy.");
            }
        });
    });
});

// Automatically resize iframes based on MicroSim height messages
// Every MicroSim must have a function at the end of the setup() like this:
//   window.parent.postMessage({type: 'microsim-resize', height: height}, '*');

window.addEventListener('message', function(event) {
    // Verify this is a MicroSim resize message
    if (event.data && event.data.type === 'microsim-resize') {
        // Find all iframes and check which one sent the message
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(function(iframe) {
            try {
                // Check if this iframe's window matches the message source
                if (iframe.contentWindow === event.source) {
                    // Set the iframe height to match the MicroSim
                    iframe.style.height = event.data.height + 'px';
                }
            } catch (e) {
                // Ignore cross-origin security errors
            }
        });
    }
});