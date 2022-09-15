import * as Yup from 'yup';

export const userAddressValidator = Yup.object().shape({
  userId: Yup.string().required('UserId not found'),
  way: Yup.string().required('Way not found'),
  neighborhood: Yup.string().required('Neighborhood not found'),
  name: Yup.string().required('Name not found'),
  city: Yup.string().required('City not found'),
  province: Yup.string().required('Province not found'),
  country: Yup.string().required('Country not found'),
});
