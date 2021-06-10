import styles from './app-shell.module.scss';

type AppShellProps = {
  children: React.ReactNode;
};
export default function AppShell({children}: AppShellProps) {
  return (
    <div>
      <div>
        <img
          className={styles.logo}
          alt='logo'
          src='https://www.sustain-cert.com/wp-content/uploads/2018/11/Logo-SC-SECONDARY-dark-bg-1.svg'
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
