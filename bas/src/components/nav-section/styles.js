// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  fontSize: '17px',
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 23,
  height: 23,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
