import NextLink from 'next/link'

const styles = {
  header:"py-3 px-4 sticky border-b ",
  nav:"flex items-center mx-auto justify-between max-w-screen-xl container",
  connectWallet:"bg-primary-900/25 text-primary-200 rounded-xl"
}

const Navbar = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NextLink href="/" className="font-semibold tracking-wider font-display text-2xl ">
            DESIGN 
          </NextLink>
        </nav>
      </header>
    </>
  );
};

export default Navbar;