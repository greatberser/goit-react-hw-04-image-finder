import { Rings } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <Rings
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="rings-loading"
          wrapperStyle={{
            top: '50%',
            left: '50%',
            opacity: '0.5',
            height: '200px',
            width: '200px',
            position: 'fixed',
            zIndex: '99',
          }}
          wrapperClass=""
        />
    ); 
}
