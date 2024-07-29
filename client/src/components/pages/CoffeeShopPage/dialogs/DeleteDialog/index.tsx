import React, { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { ICoffee } from '../../../../../interfaces/Coffee';
import CustomDialog from '../../../../common/Dialog';
import DELETE_COFFEE_MUTATION from '../../../../../graphql/mutations/deleteCoffee';
import ALL_COFFEES_QUERY from '../../../../../graphql/queries/allCoffees';

interface DeleteDialogProps {
  id: number;
  onClose: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ id, onClose }) => {
  const [deleteCoffeeMutation, { loading }] = useMutation(DELETE_COFFEE_MUTATION, {
    update(cache, { data: { deleteCoffee } }) {
      const data: any = cache.readQuery({
        query: ALL_COFFEES_QUERY
      });
      cache.writeQuery({
        query: ALL_COFFEES_QUERY,
        data: {
          allCoffeTypes: data.allCoffeTypes.filter((c: ICoffee) => c.id !== deleteCoffee)
        }
      });
    }
  });

  const onDeleteClick = useCallback(async () => {
    try {
      await deleteCoffeeMutation({
        variables: {
          id
        }
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  }, [id, deleteCoffeeMutation, onClose]);

  return (
    <CustomDialog open={true} onClose={onClose} title={'Are you sure you want to delete?'}>
      <LoadingButton loading={loading} onClick={onDeleteClick}>
        Delete
      </LoadingButton>
    </CustomDialog>
  );
};

export default DeleteDialog;
