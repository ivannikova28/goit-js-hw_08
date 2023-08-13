// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

const ulGallary = document.querySelector(".gallery");

renderGallery(galleryItems)



function renderGallery(arr) {
    // console.log(arr)

    // console.log(Array.isArray(arr))
    // console.log(Array.isArray(5))

    if (!Array.isArray(arr)) {
        return null;
    }


    const html = arr.map(item => {
        // console.log(item);
        // 
        const { preview, original, description } = item;
        
        const liHtml = `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`;
        // console.log(liHtml);
        return liHtml;

    }).join("");
    console.log(html)
    ulGallary.innerHTML = html;
}
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });