import data from "../stories.json" with { type: "json" }
import { openStory } from "./openStory";

const storiesDB = data;


export function generateStories(): void {
    const storiesQuery = document.querySelector("[data-stories-container]");

    storiesDB.forEach((story)=> {
        const storiesDiv = document.createElement('div')

        storiesDiv.innerHTML = `
            <div class="d-flex flex-column align-items-center" style="cursor: pointer;">
                <div class="rounded-circle p-1 ${story.seen ? 'border border-secondary' : 'border border-danger border-3'}">
                    <img src="${story.picture}" alt="${story.profile}"
                        width="56" height="56" class="rounded-circle"
                        style="object-fit: cover;">
                </div>
                <small class="mt-1 text-truncate" style="max-width: 64px; font-size: 0.75rem;">
                    ${story.profile}
                </small>
            </div>
        `
        storiesQuery?.append(storiesDiv)
        storiesDiv.addEventListener('click', () => openStory(story))

    });
}