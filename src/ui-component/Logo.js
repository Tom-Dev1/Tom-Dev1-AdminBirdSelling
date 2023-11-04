import { useTheme } from '@mui/material/styles';

const Logo = () => {
  const theme = useTheme();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="72" version="1.1" viewBox="0 0 290.873 290.873" xmlSpace="preserve">
      <g fill="#1e88e5">
        <path d="M44.268 139.532L44.268 79.35 44.268 41.049 93.507 90.294z"></path>
        <path d="M0 73.384L32.334 41.049 32.334 73.384z"></path>
        <path d="M149.583 249.824L113.508 213.748 149.583 181.843z"></path>
        <path d="M103.066 202.799L47.216 153.823 160.968 48.77 290.873 48.77z"></path>
      </g>
    </svg>
  );
};

export default Logo;
