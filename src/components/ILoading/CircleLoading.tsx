import { Oval } from 'react-loader-spinner';

function CircleLoading({ width = '75', height = '40' }) {
  return (
    <Oval
      height={height}
      width={width}
      color="rgb(var(--color-primary-900))"
      secondaryColor="rgb(var(--color-primary-100))"
      ariaLabel="oval-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
      }}
      visible={true}
    />
  );
}
export default CircleLoading;
