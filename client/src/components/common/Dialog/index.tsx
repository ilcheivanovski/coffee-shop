import { Dialog, Stack, Typography } from '@mui/material';

interface CreateCompanyDialogProps {
  open: boolean;
  title: string;
  children?: any;
  onClose: () => void;
}
const CustomDialog = ({ open, title, children, onClose }: CreateCompanyDialogProps) => (
  <Dialog open={open} onClose={onClose} sx={{ boxSizing: 'border-box' }}>
    <Stack direction='column' padding='50px' width={{ mobile: '100%', tablet: '448px' }} gap={'24px'} boxSizing={'border-box'}>
      <Typography fontSize={'20px'} fontWeight={700} letterSpacing={1}>
        {title}
      </Typography>
      {children}
    </Stack>
  </Dialog>
);
export default CustomDialog;
