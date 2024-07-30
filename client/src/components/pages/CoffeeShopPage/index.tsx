import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { DataGrid, GridCallbackDetails, GridColDef, GridRowParams, GridToolbarContainer, MuiEvent } from '@mui/x-data-grid';
import { Box, Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';

import ALL_COFFEES_QUERY from '../../../graphql/queries/allCoffees';
import { Header } from '../../layout';
import { ICoffee } from '../../../interfaces/Coffee';
import CreateDialog from './dialogs/CreateUpdateDialog';
import { Spinner } from '../../common';
import DeleteDialog from './dialogs/DeleteDialog';

interface CoffeePageProps {}
interface FetchData {
  allCoffeTypes: ICoffee[];
}

const CoffeePage: React.FC<CoffeePageProps> = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editableCoffee, setEditableCoffee] = useState<ICoffee | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
  const [snackbarCoffee, setSnackbarCoffee] = useState<ICoffee | null>(null);

  const { loading, data } = useQuery<FetchData>(ALL_COFFEES_QUERY);
  const coffeeTypes = data?.allCoffeTypes;

  const onEditClick = useCallback(
    (editCoffeeModel: ICoffee) => {
      setEditableCoffee(editCoffeeModel);
      setDialogOpen(true);
    },
    [setDialogOpen]
  );

  const onCreateButtonClick = useCallback(() => {
    setDialogOpen(true);
  }, [setDialogOpen]);

  const onCloseClick = useCallback(() => {
    setEditableCoffee(undefined);
    setDialogOpen(false);
  }, [setDialogOpen]);

  const onDeleteCloseClick = useCallback(() => {
    setDeleteId(undefined);
  }, [setDeleteId]);

  // we are simulating order we do not save anything in db
  // but if we had one than we would have one to one relation
  const onRowClickHandler = useCallback(
    (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement>>, details: GridCallbackDetails) => {
      setSnackbarCoffee(params.row);
    },
    []
  );

  const onSnackbarClose = useCallback(() => {
    setSnackbarCoffee(null);
  }, [setSnackbarCoffee]);

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
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(params.row);
            }}
            aria-label='edit'
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(+params.id);
            }}
            aria-label='delete'
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Stack width={'100%'}>
      <Header />
      <Stack alignItems={'center'} justifyContent={'center'} pt={'50px'}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!snackbarCoffee}
          message={`You successfully ordered ${snackbarCoffee?.name} with: ${
            !!snackbarCoffee?.ingredients?.length
              ? snackbarCoffee.ingredients?.length > 1
                ? snackbarCoffee.ingredients.map((i: any) => `${i.size}ml ${i.name}`).join(', ')
                : snackbarCoffee.ingredients.map((i: any) => `${i.size}ml ${i.name}`)
              : '-'
          }`}
          key={'topcenter'}
          onClose={onSnackbarClose}
          autoHideDuration={3000}
        />
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
          onRowClick={onRowClickHandler}
          slots={{
            toolbar: () => (
              <GridToolbarContainer>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={onCreateButtonClick} sx={{ alignSelf: 'end' }}>
                  + Create Coffee
                </Button>
              </GridToolbarContainer>
            )
          }}
          sx={{
            '.MuiDataGrid-row': {
              cursor: 'pointer'
            }
          }}
        />
      </Stack>

      {dialogOpen && <CreateDialog coffeeModel={editableCoffee} onClose={onCloseClick} />}
      {deleteId && <DeleteDialog id={deleteId} onClose={onDeleteCloseClick} />}
    </Stack>
  );
};
export default CoffeePage;
