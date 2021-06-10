import Box from '@material-ui/core/Box';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadArea: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignSelf: 'center',
      border: `2px dashed ${theme.palette.primary.main}`,
    },
  })
);

export type UploadAreaProps = {
  children: React.ReactNode;
};
function UploadArea({children}: UploadAreaProps) {
  const styles = useStyles();
  return <Box className={styles.uploadArea}>{children}</Box>;
}

export {UploadArea};
