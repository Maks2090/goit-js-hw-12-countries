import fetchCountries from'./js/fetchCountries';
import  debounce  from 'lodash.debounce';
import countryCard from './templase/countryCard.hbs';
import countryList from './templase/countryList.hbs';
import Notiflix from "notiflix";
import './css/styles.css';

const DEBOUNCE_DELAY = 500;

const refs ={
    countriesList : document.querySelector('.js-country-list'),
  inputCounrty : document.querySelector('#search-box'),
  countryInfo : document.querySelector('.js-country-info'),
}



refs.inputCounrty.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e){
  refs.countryInfo.innerHTML = '';
  refs.countriesList.innerHTML = '';

    fetchCountries(e.target.value.trim()).then(countries => {
      
       if(e.target.value.trim() === " ") { 
        
         return 
        }

     else if(countries.length === 1) {
            refs.countryInfo.innerHTML = countryCard(countries)
            Notiflix.Notify.success('Success')

         }

         else if (countries.length >= 2 && countries.length <= 10) {
            refs.countriesList.innerHTML = countryList(countries);
            
 
        }

        else if (countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        }

       
    } ).catch(()=>{Notiflix.Notify.failure('Oops, there is no country with that name');})
    
 }
