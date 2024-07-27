import React, { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import { Box, Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ALL_COFFEES_QUERY from '../../../graphql/queries/allCoffees';
import { Header } from '../../layout';
import { ICoffee } from '../../../interfaces/Coffee';
import CreateDialog from './dialogs/CreateUpdateDialog';
import { Spinner } from '../../common';
import DELETE_COFFEE_MUTATION from '../../../graphql/mutations/deleteCoffee';

interface CoffeePageProps {}
interface FetchData {
  allCoffeTypes: ICoffee[];
}

const CoffeePage: React.FC<CoffeePageProps> = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editableCoffee, setEditableCoffee] = useState<ICoffee | undefined>(undefined);

  const { loading, data } = useQuery<FetchData>(ALL_COFFEES_QUERY);
  const [deleteCoffeeMutation] = useMutation(DELETE_COFFEE_MUTATION, {
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
  const coffeeTypes = data?.allCoffeTypes;

  const onEditClick = useCallback(
    (editCoffeeModel: ICoffee) => {
      setEditableCoffee(editCoffeeModel);
      setDialogOpen(true);
    },
    [setDialogOpen]
  );

  const onDeleteClick = useCallback(
    async (id: number) => {
      try {
        await deleteCoffeeMutation({
          variables: {
            id
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    [deleteCoffeeMutation]
  );

  const onCreateButtonClick = useCallback(() => {
    setDialogOpen(true);
  }, [setDialogOpen]);

  const onCloseClick = useCallback(() => {
    setEditableCoffee(undefined);
    setDialogOpen(false);
  }, [setDialogOpen]);

  if (loading) return <Spinner />;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', sortable: false },
    { field: 'name', headerName: 'Coffe', width: 150, sortable: false },
    {
      field: 'ingredients',
      headerName: 'Ingredients',
      width: 550,
      sortable: false,
      renderCell: (params) =>
        !!params.row.ingredients?.length
          ? params.row.ingredients?.length > 1
            ? params.row.ingredients.map((i: any) => `${i.size}ml ${i.name}`).join(', ')
            : params.row.ingredients.map((i: any) => `${i.size}ml ${i.name}`)
          : '-'
    },
    {
      field: 'option',
      headerName: '',
      sortable: false,
      minWidth: 50,
      renderCell: (params) => (
        <Box display={'flex'}>
          <IconButton
            onClick={() => {
              onEditClick(params.row);
            }}
            aria-label='edit'
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              onDeleteClick(+params.id);
            }}
            aria-label='delete'
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Box sx={{ flexGrow: 1 }} />
      <Button onClick={onCreateButtonClick} sx={{ alignSelf: 'end' }}>
        + Create Coffee
      </Button>
    </GridToolbarContainer>
  );

  return (
    <Stack width={'100%'}>
      <Header />
      <Stack alignItems={'center'} justifyContent={'center'} pt={'50px'}>
        <DataGrid
          rows={coffeeTypes}
          columns={columns}
          hideFooterPagination
          hideFooter
          disableColumnMenu
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false
              }
            }
          }}
          slots={{
            toolbar: CustomToolbar
          }}
        />
      </Stack>

      {dialogOpen && <CreateDialog coffeeModel={editableCoffee} onClose={onCloseClick} />}
    </Stack>
  );
};
export default CoffeePage;
