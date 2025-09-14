// Function to load reading list from about.html
async function loadReadingList() {
    try {
        const response = await fetch('about.html');
        const html = await response.text();
        
        // Create a temporary DOM element to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract the reading lists section
        const readingSection = doc.querySelector('#reading-lists');
        
        if (readingSection) {
            // Clone the reading section content
            const readingContent = readingSection.cloneNode(true);
            
            // Remove the main heading since we have our own
            const mainHeading = readingContent.querySelector('h2');
            if (mainHeading) {
                mainHeading.remove();
            }
            
            // Limit each subsection to 3 items
            const allLists = readingContent.querySelectorAll('ul');
            allLists.forEach(list => {
                const items = list.querySelectorAll('li');
                
                // If more than 3 items, keep only the first 3 and add "..."
                if (items.length > 3) {
                    // Remove items beyond the first 3
                    for (let i = items.length - 1; i >= 3; i--) {
                        items[i].remove();
                    }
                    
                    // Add a "..." indicator
                    const moreItem = document.createElement('li');
                    moreItem.style.fontStyle = 'italic';
                    moreItem.style.color = '#888';
                    moreItem.textContent = `... and ${items.length - 3} more`;
                    list.appendChild(moreItem);
                }
            });
            
            // Insert the content into the home page
            const targetElement = document.querySelector('#reading-list-content');
            if (targetElement) {
                targetElement.innerHTML = readingContent.innerHTML;
            }
        }
    } catch (error) {
        console.error('Error loading reading list:', error);
        // Fallback content if loading fails
        const targetElement = document.querySelector('#reading-list-content');
        if (targetElement) {
            targetElement.innerHTML = '<p>Reading list temporarily unavailable. <a href="about.html#reading-lists">View on About page</a></p>';
        }
    }
}

// Load the reading list when the page loads
document.addEventListener('DOMContentLoaded', loadReadingList);