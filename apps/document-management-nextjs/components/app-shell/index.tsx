import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: '240px',
      height: '50px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    content: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  })
);

type AppShellProps = {
  children: React.ReactNode;
};
export default function AppShell({children}: AppShellProps) {
  const styles = useStyles();
  const msalAuth = useMsal();

  return (
    <>
      <AppBar position='relative'>
        <Container>
          <Toolbar className={styles.toolbar}>
            <Box display='flex' alignItems='center'>
              <img
                className={styles.logo}
                alt='logo'
                src='https://www.sustain-cert.com/wp-content/uploads/2018/11/Logo-SC-SECONDARY-dark-bg-1.svg'
              />
              <Typography variant='h6'>Document Management</Typography>
            </Box>
            <AuthenticatedTemplate>
              <Box display='flex' alignItems='center'>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
                <Box ml={1}>{msalAuth.accounts[0]?.name}</Box>
              </Box>
            </AuthenticatedTemplate>
          </Toolbar>
        </Container>
      </AppBar>

      <Container className={styles.content}>{children}</Container>
    </>
  );
}
