import * as Yup from 'yup';
import { TrashCollectStatus } from '../entities/trash-collect.entity';

export const trashCollectSchema = (mode: 'updating' | 'creating' = 'updating') =>
  Yup.object().shape({
    ...(mode === 'creating' && {
      collectorId: Yup.string()
        .required('collectorId is required')
        .uuid('collectorId should be a valid id'),
      trashShareId: Yup.string()
        .required('trashShareId is required')
        .uuid('trashShareId should be a valid id'),
    }),
    ...(mode === 'updating' && {
      trashCollectStatus: Yup.mixed()
        .required('trashCollectStatus is required')
        .oneOf(Object.values(TrashCollectStatus)),
    }),
  });
