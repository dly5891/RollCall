import {
  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,
  FETCH_DATA_SUCCESS,
  FETCH_ANIMAL_SUCCESS,
  FETCH_ANIMAL_STATUS,
  FETCH_CHECK_OUT_ANIMAL_SUCCESS
} from '../actions/animal-actions.js';

const initialState = {
  cats: [],
  currentCat: null,
  currentCatCheckedOut: false,
  isRequesting: false
};

// Reducer
export default function animalReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_IS_LOADING:
      return state;

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        cats: action.payload
      };

    case FETCH_HAS_ERRORED:
      return state;

    case FETCH_ANIMAL_SUCCESS:
      let {
        pk,
        name,
        animal,
        image,
        image_description,
        birth_date,
        is_female,
        breed,
        joined,
        personal_history,
        preferences_cats,
        preferences_dogs,
        preferences_kids,
        declawed,
        spay_neuter,
        health,
        pet_id,
        biography,
      } = action.payload;

      let cat = {
        animalStory: biography,
        animalInfo: {
          dateJoined: joined,
          gender: is_female ? 'Female' : 'Male',
          breed,
          birthday: birth_date,
          history: personal_history,
          preferences: {
            cats: preferences_cats,
            dogs: preferences_dogs,
            children: preferences_kids
          },
          declawed,
          spayedOrNeutered: spay_neuter,
          health,
          petId: pet_id,
          petPk: pk
        },
        polaroid: {
          imageUrl: image,
          imageText: image_description,
          imageTitle: name
        }
      }

      return {
        ...state,
        currentCat: cat
      };

    case FETCH_ANIMAL_STATUS:
      return {
        ...state,
        currentCatCheckedOut: action.payload.checked_out
      };
    case FETCH_CHECK_OUT_ANIMAL_SUCCESS:
      return {
        ...state,
        currentCatCheckedOut: true
      };
    default:
      return state;
  }
};
