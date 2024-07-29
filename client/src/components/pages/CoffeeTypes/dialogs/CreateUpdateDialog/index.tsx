import React from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@apollo/client';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import CustomDialog from '../../../../common/Dialog';
import { ICoffee } from '../../../../../interfaces/Coffee';
import CREATE_COFFEE_MUTATION from '../../../../../graphql/mutations/createCoffee';
import UPDATE_COFFEE_MUTATION from '../../../../../graphql/mutations/updateCoffee';
import ALL_COFFEES_QUERY from '../../../../../graphql/queries/allCoffees';

interface CreateUpdateDialogProps {
  coffeeModel?: ICoffee;
  onClose: () => void;
}

const CreateUpdateDialog: React.FC<CreateUpdateDialogProps> = ({ coffeeModel, onClose }) => {
  const [createCoffeeMutation, { loading }] = useMutation(CREATE_COFFEE_MUTATION, {
    update(cache, { data: { createCoffee } }) {
      const data: any = cache.readQuery({
        query: ALL_COFFEES_QUERY
      });
      cache.writeQuery({
        query: ALL_COFFEES_QUERY,
        data: {
          allCoffeTypes: [...data.allCoffeTypes, createCoffee]
        }
      });
    },
    optimisticResponse: () => ({
      createCoffee: {
        id: new Date().getTime(),
        __typename: 'Mutation',
        name: 'Test Optimistic Response',
        ingredients: [{ id: new Date().getTime(), name: 'Test ingredient', size: 45 }]
      } as ICoffee
    })
  });
  const [updateCoffeeMutation, { loading: updateLoading }] = useMutation(UPDATE_COFFEE_MUTATION, {
    update(cache, { data: { updateCoffee } }) {
      const data: any = cache.readQuery({
        query: ALL_COFFEES_QUERY
      });
      cache.writeQuery({
        query: ALL_COFFEES_QUERY,
        data: {
          allCoffeTypes: data.allCoffeTypes.map((c: ICoffee) => (c.id === updateCoffee.id ? updateCoffee : c))
        }
      });
    }
  });

  const isEditMode = !!coffeeModel;
  const title = isEditMode ? 'Edit Coffee' : 'Create Coffee';
  const submitButtonText = isEditMode ? 'Edit' : 'Create';

  return (
    <CustomDialog open={true} onClose={onClose} title={title}>
      <Formik
        initialValues={
          {
            name: coffeeModel?.name || '',
            ingredients: coffeeModel?.ingredients?.map((i) => ({
              name: i.name,
              size: i.size
            })) || [{ name: '', size: null }]
          } as ICoffee
        }
        onSubmit={async (values) => {
          try {
            if (isEditMode) {
              await updateCoffeeMutation({
                variables: {
                  id: coffeeModel ? Number(coffeeModel.id) : undefined,
                  name: values.name,
                  ingredients: values.ingredients.map((i) => ({ ...i, size: +i.size }))
                }
              });
            } else {
              await createCoffeeMutation({
                variables: {
                  name: values.name,
                  ingredients: values.ingredients.map((i) => ({ ...i, size: +i.size }))
                }
              });
            }
            onClose();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values }) => (
          <Form>
            <Field as={TextField} name={'name'} label='Coffe name' variant='outlined' fullWidth />
            <Typography py={'15px'}>Ingredients</Typography>
            <FieldArray name='ingredients'>
              {({ remove, push }) => (
                <>
                  {values.ingredients.length > 0 &&
                    values.ingredients.map((ingredient: any, index: any) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          gap: '5px',
                          alignItems: 'baseline'
                        }}
                        mb={'14px'}
                      >
                        <Field as={TextField} name={`ingredients.${index}.name`} label='Name' variant='outlined' fullWidth />
                        <Field
                          as={TextField}
                          name={`ingredients.${index}.size`}
                          label='Size'
                          variant='outlined'
                          fullWidth
                          type={'number'}
                          InputProps={{
                            endAdornment: <InputAdornment position='end'>ml</InputAdornment>
                          }}
                        />
                        {values.ingredients.length - 1 === index && (
                          <IconButton onClick={() => push({ name: '', size: '' })}>
                            <AddIcon />
                          </IconButton>
                        )}
                        {values.ingredients.length - 1 !== index && (
                          <IconButton onClick={() => remove(index)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                </>
              )}
            </FieldArray>
            <Box display={'flex'} width={'100%'} justifyContent={'flex-end'} pt={'30px'}>
              <LoadingButton loading={loading || updateLoading} type={'submit'} variant={'contained'}>
                {submitButtonText}
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </CustomDialog>
  );
};

export default CreateUpdateDialog;
