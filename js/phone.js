const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  displayPhones(data.data, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  //   console.log(phones);
  //   1. get element
  const phoneContainer = document.getElementById('phone-container');
  //   Clear phone container before adding cards
  phoneContainer.textContent = '';

  //   display show all button if product is more than 12
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  } else {
    showAllContainer.classList.add('hidden');
  }
  //   console.log('is show all', isShowAll);
  //   show first 15  products at a time if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    //  2. create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 shadow-xl mt-5`;
    //   3. create inner HTML or InnerText
    phoneCard.innerHTML = `
    <figure>
    <img
        class="mt-5"
      src="${phone.image}"
      alt="phone"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-center mx-auto text-xl">${phone.phone_name}</h2>
    <p class="text-center">
      If a dog chews shoes whose shoes does he choose?
    </p>
    <h3 class="text-xl text-center my-3">$999</h3>
    <div class="card-actions justify-center">
      <button onClick="handleShowDetailsBtn('${phone.slug}')" class="btn btn-info">Show Details</button>
    </div>
  </div>
`;
    //   4. Append Child
    phoneContainer.appendChild(phoneCard);
  });
  //   hide loading spinner
  toggleLoadingSpinner(false);
};

// handle search Button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  //   clear search field
  //   searchField.value = '';

  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
};

// handle Show all
const handleShowAll = () => {
  handleSearch(true);
};

// Handle Show Details Button

const handleShowDetailsBtn = async (id) => {
  //   console.log('clicked show details', id);

  //   Load Data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  showPhoneDetails(data.data);
};

const showPhoneDetails = (phone) => {
  const showDetailsContainer = document.getElementById('showDetail-container');
  showDetailsContainer.innerHTML = `
    <img class="text-2xl text-center mx-auto my-3" src="${phone.image}" alt="">
    <h3 class="text-xl font-bold"> ${phone.slug}</h3>
    <p><span class ="text-bold">Storage:</span> ${
      phone.mainFeatures.storage
    } </p>
    <p><span class ="text-bold">Display Size:</span> ${
      phone.mainFeatures?.displaySize
    } </p>
    <p><span class ="text-bold">Chipset:</span> ${
      phone.mainFeatures?.chipSet
    } </p>
    <p><span class ="text-bold">Memory:</span> ${
      phone.mainFeatures?.memory
    } </p>
    <p><span class ="text-bold">Slug:</span> ${phone.slug} </p>
    <p><span class ="text-bold">Release Data:</span> ${phone.releaseDate} </p>
    <p><span class ="text-bold">Brand:</span> ${phone.brand}</p>
    <p><span class ="text-bold">GPS:</span> ${
      phone.others?.GPS || 'No GPS Avaolable'
    } </p>
`;
  show_details_modal.showModal();
  console.log(phone);
};
// loadPhone();
