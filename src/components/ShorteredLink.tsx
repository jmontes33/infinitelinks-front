import { useValueStore } from '../store/valueStore';

function ShorteredLink() {
  const { linkShortened, setLinkShortenedModal } = useValueStore((state) => ({
    linkShortened: state.linkShortened,
    setLinkShortenedModal: state.setLinkShortenedModal,
  }));

  return (
    <div className='flex flex-col gap-16 text-black bg-[#FBF7F5] p-10 min-w-[600px] max-w-[600px] rounded-xl'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-2xl'>Shortered Link</h2>
        <button
          onClick={() => setLinkShortenedModal(false)}
          className='bg-black text-white py-1 px-2'
        >
          X
        </button>
      </div>
      <h2 className='font-bold text-3xl'>{linkShortened}</h2>
    </div>
  );
}

export default ShorteredLink;
