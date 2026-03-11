interface Story {
    profile: string
    picture: string
    seen: boolean
}

export function openStory(story: Story){
    const overlay = document.createElement('div')
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: black;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `

    overlay.innerHTML = `
        <div style="position: absolute; top: 16px; left: 16px; display: flex; align-items: center; gap: 8px;">
            <img src="${story.picture}" width="36" height="36" 
                style="border-radius: 50%; object-fit: cover; border: 2px solid white;">
            <span style="color: white; font-weight: bold; font-size: 0.9rem;">${story.profile}</span>
        </div>

        <button id="close-story" style="position: absolute; top: 16px; right: 16px; 
            background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">
            ✕
        </button>

        <img src="${story.picture}" style="max-height: 90vh; max-width: 100%; object-fit: contain;">
    `

    document.body.appendChild(overlay)

    overlay.querySelector('#close-story')?.addEventListener('click', () => overlay.remove())
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove()
    })
}