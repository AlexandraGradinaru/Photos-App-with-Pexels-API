
//Pexels API key

const gallery = document.querySelector('.main-body__gallery');
const searchInput = document.querySelector('.form-input');
const form = document.querySelector('.main-body__form');
let searchValue;
const more = document.querySelector('.main-body__btn');
let page = 1;
let fetchLink;
let currentSearch;

searchInput.addEventListener('input', updateInput);
function updateInput(e){
  searchValue = e.target.value;
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener('click',loadMore);
//fetch API function
async function fetchAPI(url){
  const dataFetch = await fetch(url, {
  method: 'GET',
  headers:{
    Accept: 'application/json',
    Authorization: authKey
  }
  });
  const data = await dataFetch.json();
  return data;
}

function generatePhotos(data){
  data.photos.forEach(photo => {
   const galleryImage = document.createElement('div');
   galleryImage.classList.add('gallery-img');
   galleryImage.innerHTML =`<img class="pexels-img" src='${photo.src.large}'></img>
   <div class="gallery-options"><p class="style">${photo.photographer}</p>
   <a class='download style' href=${photo.src.original}>Download</a></div>
   `;
   gallery.appendChild(galleryImage);
 });
}

//fetching photos function
async function curatedPhotos(){
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchAPI(fetchLink);
  generatePhotos(data);
}

//searching photos function
async function searchPhotos(search){
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=1`;
  const data = await fetchAPI(fetchLink);
  generatePhotos(data);
}
function clear(){
  gallery.innerHTML = '';
  searchInput.value = '';
}
async function loadMore(){
  page++; //page 2
  if(currentSearch){
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  }else{
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchAPI(fetchLink);
  generatePhotos(data);
  
}
curatedPhotos();



