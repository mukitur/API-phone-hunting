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
  console.log(data);
};
// loadPhone();
