import BackToTop from './BackToTop';
import LogoImg from './LogoImg';

function Footer() {
  return (
    <footer id='footer' className='w-full bg-primary'>
      <div className='relative  w-full px-4 py-8 md:py-16 md:px-8'>
        <BackToTop />

        <div className='lg:flex lg:items-end lg:justify-between'>
          <div>
            <LogoImg />

            <p className='mx-auto mt-6 max-w-md text-center leading-relaxed text-secondary lg:text-left'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              consequuntur amet culpa cum itaque neque.
            </p>
          </div>

          <ul className='mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12'>
            <li>
              <a
                className='text-secondary transition hover:text-gray-700/75'
                href='#'
              >
                {' '}
                About{' '}
              </a>
            </li>

            <li>
              <a
                className='text-secondary transition hover:text-gray-700/75'
                href='#'
              >
                {' '}
                Services{' '}
              </a>
            </li>

            <li>
              <a
                className='text-secondary transition hover:text-gray-700/75'
                href='#'
              >
                {' '}
                Projects{' '}
              </a>
            </li>

            <li>
              <a
                className='text-secondary transition hover:text-gray-700/75'
                href='#'
              >
                {' '}
                Blog{' '}
              </a>
            </li>
          </ul>
        </div>

        <p className='mt-12 text-center text-sm text-secondary lg:text-right'>
          Copyright &copy; 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

