const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  console.log(phones);
  //   1. get element
  const phoneContainer = document.getElementById('phone-container');
  //   Clear phone container before adding cards
  phoneContainer.textContent = '';

  phones.forEach((phone) => {
    console.log(phone);
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
      <button class="btn btn-info">Show Details</button>
    </div>
  </div>
`;
    //   4. Append Child
    phoneContainer.appendChild(phoneCard);
  });
};

// handle search Button
const handleSearch = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText);
};
// loadPhone();
