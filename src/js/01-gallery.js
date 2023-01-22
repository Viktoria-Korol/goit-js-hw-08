// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

//Селектор галереї
const galleryEl = document.querySelector(".gallery");

//Створюю функцію розмітки галереї в HTML
function addGalleryMarkup(galleryItems) {
    return galleryItems
    .map(({ preview, original, description }) => 

    `<a class="gallery__item" href="${original}">
        <img class="gallery__image" 
        src="${preview}"
         alt="${description}" />
      </a>`
    )
    .join("");
}

galleryEl.insertAdjacentHTML('beforeend', addGalleryMarkup(galleryItems));
galleryEl.addEventListener("click", onImgClick);

function onImgClick(event) {
    event.preventDefault();

}

// Додаю відображення підписів до зображень: з атрибута alt + з інтервалом 250 мілісекунд.
const test = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionsDelay: 250,
})
