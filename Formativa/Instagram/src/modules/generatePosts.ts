import data from "../posts.json" with { type: "json" }

const postsDB = data;

export function getDate(dateCreated: string){
  const diffMs = Date.now() - new Date(dateCreated).getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  return diffMonths > 0
    ? `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
    : diffDays > 0
      ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
      : diffHours > 0
        ? `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
        : diffMinutes > 0
          ? `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
          : 'just now';
}

export function generatePosts(): void {
  const postsQuery = document.querySelector("[data-post-container]");
  postsDB.forEach((element, index) => {
    const postDiv = document.createElement('div');
    const carouselId = `carousel-${index}`;
    const postDate = getDate(element.created_at);

    const indicators = element.photos.map((_, i) => `
      <button type="button" data-bs-target="#${carouselId}"
        data-bs-slide-to="${i}"
        ${i === 0 ? 'class="active" aria-current="true"' : ''}
        aria-label="Slide ${i + 1}">
      </button>
    `).join('');

    const slides = element.photos.map((photo, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        ${photo.type === "video"
          ? `<video src="${photo.url}" class="d-block w-100" height="300"
              style="object-fit: cover;" controls playsinline muted></video>`
          : `<img src="${photo.url}" alt="${photo.alt_text}"
              class="d-block w-100" height="300" style="object-fit: cover;">`
        }
      </div>
    `).join('');

    postDiv.innerHTML = `
        <div class="card-header bg-white border-bottom d-flex align-items-center justify-content-between py-2">
          <div class="d-flex align-items-center gap-2">
            <img src="${element.profile.picture}" alt="avatar"
              width="38" height="38" class="rounded-circle border">
            <div>
              <strong style="font-size: 0.9rem;">${element.profile.username}</strong>
              <div class="text-muted" style="font-size: 0.75rem;">${element.location}</div>
            </div>
          </div>
          <button class="btn btn-link text-dark p-0 fs-5">
            <i class="bi bi-three-dots"></i>
          </button>
        </div>

        <div id="${carouselId}" class="carousel slide">
          <div class="carousel-indicators">${indicators}</div>
          <div class="carousel-inner">${slides}</div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div class="card-body pb-0 pt-2 px-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <div class="d-flex gap-3">
              <button class="btn btn-link text-dark p-0 fs-4"><i class="bi bi-heart"></i></button>
              <button class="btn btn-link text-dark p-0 fs-4"><i class="bi bi-chat"></i></button>
              <button class="btn btn-link text-dark p-0 fs-4"><i class="bi bi-send"></i></button>
            </div>
            <button class="btn btn-link text-dark p-0 fs-4"><i class="bi bi-bookmark"></i></button>
          </div>
          <p class="mb-1" style="font-size: 0.9rem;"><strong>${element.likes.toLocaleString()} likes</strong></p>
          <p class="mb-1" style="font-size: 0.9rem;">
            <strong>${element.profile.username}</strong> ${element.description}
          </p>
          <p class="text-muted mb-1" style="font-size: 0.85rem; cursor: pointer;">View all comments</p>
          <p class="mb-1" style="font-size: 0.85rem;">
            <strong>${element.comments[0]?.username}</strong> ${element.comments[0]?.text}
          </p>
          <p class="text-muted" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.03em;">
            ${postDate}
          </p>
        </div>

        <div class="card-footer bg-white border-top d-flex align-items-center gap-2 py-2 px-3">
          <i class="bi bi-emoji-smile fs-5 text-muted"></i>
          <input type="text" class="form-control border-0 shadow-none p-0"
            placeholder="Add a comment..." style="font-size: 0.9rem;">
          <button class="btn btn-link text-primary p-0 fw-bold" style="font-size: 0.9rem;">Post</button>
        </div>
    `;

    postsQuery?.append(postDiv);
  });
}