import { Stack, CircularProgress } from '@mui/material';

const Spinner: React.FC = () => (
  <Stack width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'}>
    <CircularProgress />
  </Stack>
);
export default Spinner;
