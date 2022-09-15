import * as Yup from 'yup';
import { OccursEvery, TrashType, WeekDays } from '../entities/trash-share.entity';

export const trashShareSchema = Yup.object().shape({
  userId: Yup.string().required('userId is required').uuid('userId should be an uuid'),
  addressId: Yup.string()
    .required('addressId is required')
    .uuid('addressId should be an uuid'),
  trashType: Yup.mixed()
    .oneOf(Object.values(TrashType))
    .required('Trash type is required'),
  trashTypeDescription: Yup.string().when('trashType', {
    is: TrashType.OTHER,
    then: Yup.string().required(
      "You should provide a description when trashType is 'other'"
    ),
  }),
  intendedDay: Yup.mixed()
    .oneOf(Object.values(WeekDays))
    .required('Intended day required'),
  occursEvery: Yup.mixed()
    .oneOf(Object.values(OccursEvery))
    .required('occursEvery is required'),
});
